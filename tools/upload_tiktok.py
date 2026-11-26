#!/usr/bin/env python3
"""🎵 បង្ហោះវីដេអូទៅ TikTok ជា Draft (Inbox) — ស្គ្រីបដាច់ដោយឡែក មិនប៉ះ YouTube/Facebook/hub.js

ប្រើ (ពីថតគម្រោង · មិនត្រូវការ library ក្រៅ)៖
  python3 tools/upload_tiktok.py --auth-only                 # Login ម្ដង → tiktok_token.json
  python3 tools/upload_tiktok.py --dry-run                   # មើលជាមុន (មិនផ្ញើ)
  python3 tools/upload_tiktok.py                             # ផ្ញើ .mp4 ថ្មីបំផុតទៅ Draft
  python3 tools/upload_tiktok.py --file X.mp4 --title "..." --hashtags "#គណិតវិទ្យា #ReanMaths" --grade 12
  python3 tools/upload_tiktok.py --status PUBLISH_ID         # ពិនិត្យស្ថានភាព

ការសម្ងាត់៖ .env និង tiktok_token.json នៅថតគម្រោង ហើយនៅក្នុង .gitignore (មិន push)។
ជំហាននេះ = Draft ប៉ុណ្ណោះ (scope video.upload) · ចំណងជើង/hashtag ត្រូវបិទភ្ជាប់ក្នុងកម្មវិធី TikTok ពេលបង្ហោះ
ឯកសារវីដេអូដើមមិនត្រូវបានកែ ឬផ្លាស់ទីទេ (អានតែប៉ុណ្ណោះ)។
"""
import argparse, base64, datetime, hashlib, json, os, secrets, sys, time
import urllib.parse, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_DIR = "/Users/phaijohn/Desktop/ReanMath_Videos"
ENV = os.path.join(ROOT, ".env")
TOKEN = os.path.join(ROOT, "tiktok_token.json")
LOG = os.path.join(ROOT, "tools", "tiktok_uploads.json")
YT_LOG = os.path.join(ROOT, "tools", "youtube_uploads.json")
SCOPES = "user.info.basic,video.upload"
API = "https://open.tiktokapis.com"
MAX_CAPTION = 2200
MB = 1024 * 1024


def die(msg, code=1):
    print("❌ " + msg)
    sys.exit(code)


def load_env():
    if not os.path.exists(ENV):
        die(".env មិនមាន — ចម្លង .env.example ជា .env ហើយបំពេញ TIKTOK_CLIENT_KEY/SECRET/REDIRECT_URI")
    out = {}
    for ln in open(ENV, encoding="utf-8"):
        ln = ln.strip()
        if ln and not ln.startswith("#") and "=" in ln:
            k, v = ln.split("=", 1)
            out[k.strip()] = v.strip().strip('"').strip("'")
    for k in ("TIKTOK_CLIENT_KEY", "TIKTOK_CLIENT_SECRET", "TIKTOK_REDIRECT_URI"):
        if not out.get(k):
            die(f"{k} ទទេក្នុង .env")
    return out


def http(method, url, data=None, headers=None, raw=False):
    req = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            body = r.read()
            return r.status, (body if raw else json.loads(body or b"{}"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        try:
            return e.code, json.loads(body)
        except Exception:
            return e.code, {"raw": body[:300]}
    except urllib.error.URLError as e:
        die(f"បណ្ដាញមានបញ្ហា៖ {e.reason}")


def token_call(env, fields):
    fields.update(client_key=env["TIKTOK_CLIENT_KEY"], client_secret=env["TIKTOK_CLIENT_SECRET"])
    st, js = http("POST", API + "/v2/oauth/token/", urllib.parse.urlencode(fields).encode(),
                  {"Content-Type": "application/x-www-form-urlencoded"})
    if st != 200 or "access_token" not in js:
        die(f"Token បរាជ័យ ({st}): {js.get('error_description') or js.get('error') or js}")
    js["obtained_at"] = int(time.time())
    return js


def save_token(js):
    fd = os.open(TOKEN, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w") as f:
        json.dump(js, f, ensure_ascii=False, indent=1)


def auth(env):
    """OAuth + PKCE (TikTok ប្រើ code_challenge = hex នៃ SHA256) · បិទភ្ជាប់តំណដែលបានបញ្ជូនបន្ត"""
    verifier = base64.urlsafe_b64encode(secrets.token_bytes(48)).decode().rstrip("=")
    challenge = hashlib.sha256(verifier.encode()).hexdigest()
    state = secrets.token_urlsafe(12)
    q = urllib.parse.urlencode(dict(client_key=env["TIKTOK_CLIENT_KEY"], scope=SCOPES, response_type="code",
                                    redirect_uri=env["TIKTOK_REDIRECT_URI"], state=state,
                                    code_challenge=challenge, code_challenge_method="S256"))
    print("1) បើកតំណនេះក្នុង Browser ហើយចុច Authorize ជាមួយគណនី TikTok របស់អ្នក៖\n\n" + "https://www.tiktok.com/v2/auth/authorize/?" + q)
    print("\n2) បន្ទាប់ពីអនុញ្ញាត Browser នឹងបញ្ជូនទៅ Redirect URI — ចម្លង URL ពេញពី Address bar បិទភ្ជាប់ខាងក្រោម។")
    url = input("\nURL: ").strip()
    p = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)
    if p.get("state", [""])[0] != state:
        die("state មិនត្រូវគ្នា (បដិសេធដើម្បីសុវត្ថិភាព)")
    if "code" not in p:
        die("រកមិនឃើញ code ក្នុង URL — " + str(p.get("error_description") or p.get("error") or ""))
    js = token_call(env, dict(code=p["code"][0], grant_type="authorization_code",
                              redirect_uri=env["TIKTOK_REDIRECT_URI"], code_verifier=verifier))
    save_token(js)
    print("✅ Login ជោគជ័យ → tiktok_token.json (mode 600) · scope:", js.get("scope"))
    return js


def access(env):
    if not os.path.exists(TOKEN):
        die("មិនទាន់ Login — រត់ --auth-only ជាមុន")
    js = json.load(open(TOKEN))
    if time.time() > js["obtained_at"] + js.get("expires_in", 0) - 300:
        js = token_call(env, dict(grant_type="refresh_token", refresh_token=js["refresh_token"]))
        save_token(js)
    return js["access_token"]


def pick_file(name):
    if name:
        p = name if os.path.isabs(name) else os.path.join(VIDEO_DIR, name)
        if not os.path.isfile(p):
            die("រកមិនឃើញឯកសារ៖ " + p)
        return p
    fs = [os.path.join(VIDEO_DIR, f) for f in os.listdir(VIDEO_DIR) if f.lower().endswith(".mp4")]
    if not fs:
        die("គ្មាន .mp4 ក្នុង " + VIDEO_DIR)
    return max(fs, key=os.path.getmtime)


def yt_meta(fname):
    try:
        for e in reversed(json.load(open(YT_LOG, encoding="utf-8"))):
            if e.get("file") == os.path.basename(fname):
                return e
    except Exception:
        pass
    return {}


def read_log():
    try:
        return json.load(open(LOG, encoding="utf-8"))
    except Exception:
        return []


def upload(tok, path):
    size = os.path.getsize(path)
    chunk = size if size <= 64 * MB else 10 * MB
    total = max(1, size // chunk)
    hdr = {"Authorization": "Bearer " + tok, "Content-Type": "application/json; charset=UTF-8"}
    body = json.dumps({"source_info": {"source": "FILE_UPLOAD", "video_size": size,
                                       "chunk_size": chunk, "total_chunk_count": total}}).encode()
    st, js = http("POST", API + "/v2/post/publish/inbox/video/init/", body, hdr)
    err = js.get("error", {})
    if st != 200 or err.get("code") not in (None, "ok"):
        die(f"init បរាជ័យ ({st}): {err.get('code')} — {err.get('message')}")
    pid, up = js["data"]["publish_id"], js["data"]["upload_url"]
    with open(path, "rb") as f:  # អានតែប៉ុណ្ណោះ
        for i in range(total):
            n = chunk if i < total - 1 else size - chunk * (total - 1)
            start = chunk * i
            data = f.read(n)
            for attempt in range(4):
                st, r = http("PUT", up, data, {"Content-Type": "video/mp4", "Content-Length": str(n),
                             "Content-Range": f"bytes {start}-{start + n - 1}/{size}"}, raw=True)
                if st in (200, 201, 206):
                    break
                print(f"  ⚠️ chunk {i + 1}/{total} បរាជ័យ ({st}) ព្យាយាមម្ដងទៀត…")
                time.sleep(2 ** attempt)
            else:
                die(f"chunk {i + 1}/{total} បរាជ័យ")
            print(f"  ⬆️ {i + 1}/{total}")
    return pid


def status(tok, pid):
    st, js = http("POST", API + "/v2/post/publish/status/fetch/", json.dumps({"publish_id": pid}).encode(),
                  {"Authorization": "Bearer " + tok, "Content-Type": "application/json; charset=UTF-8"})
    return js.get("data", js)


def main():
    a = argparse.ArgumentParser(description="បង្ហោះវីដេអូទៅ TikTok Draft")
    a.add_argument("--auth-only", action="store_true")
    a.add_argument("--file")
    a.add_argument("--title")
    a.add_argument("--hashtags", default="#គណិតវិទ្យា #ReanMaths")
    a.add_argument("--grade", type=int)
    a.add_argument("--dry-run", action="store_true")
    a.add_argument("--force", action="store_true")
    a.add_argument("--status", metavar="PUBLISH_ID")
    o = a.parse_args()
    env = load_env()
    if o.auth_only:
        return auth(env)
    if o.status:
        return print(json.dumps(status(access(env), o.status), ensure_ascii=False, indent=1))
    path = pick_file(o.file)
    base = os.path.basename(path)
    meta = yt_meta(base)
    title = o.title or meta.get("title") or os.path.splitext(base)[0]
    tags = o.hashtags + (f" #ថ្នាក់ទី{o.grade}" if o.grade else (f" #ថ្នាក់ទី{meta['g']}" if meta.get("g") else ""))
    caption = f"{title} {tags}".strip()
    if len(caption) > MAX_CAPTION:
        die(f"caption វែងពេក ({len(caption)}/{MAX_CAPTION})")
    print(f"📄 ឯកសារ : {base} ({os.path.getsize(path) / MB:.1f} MB)\n📝 Caption: {caption}\n📥 គោលដៅ: Draft (Inbox) ប៉ុណ្ណោះ")
    if not o.force and any(e.get("file") == base for e in read_log()):
        die("ឯកសារនេះបានផ្ញើរួចហើយ (tools/tiktok_uploads.json) — ប្រើ --force ដើម្បីផ្ញើម្ដងទៀត", 0)
    if o.dry_run:
        return print("🔎 --dry-run · មិនបានផ្ញើអ្វីទេ")
    tok = access(env)
    pid = upload(tok, path)
    log = read_log()
    log.append({"at": datetime.datetime.now().isoformat(timespec="seconds"), "file": base,
                "caption": caption, "publish_id": pid, "mode": "draft"})
    json.dump(log, open(LOG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"✅ ផ្ញើរួច · publish_id={pid}\n   បើកកម្មវិធី TikTok → Inbox/Notifications → កែ Draft ហើយបិទភ្ជាប់ Caption ខាងលើ។")
    time.sleep(3)
    print("   ស្ថានភាព:", json.dumps(status(tok, pid), ensure_ascii=False))


if __name__ == "__main__":
    main()
