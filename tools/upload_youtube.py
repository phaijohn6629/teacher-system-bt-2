#!/usr/bin/env python3
"""🎬 បង្ហោះវីដេអូ Manim ទៅ YouTube (Channel «Rean-Maths») ហើយភ្ជាប់តំណទៅផ្ទាំងសិក្សា (hub.js)

ប្រើ (ពីថតគម្រោង)៖
  .venv/bin/python tools/upload_youtube.py --auth-only                      # Login ម្ដង → token.json
  .venv/bin/python tools/upload_youtube.py                                   # បង្ហោះ .mp4 ថ្មីបំផុត (unlisted)
  .venv/bin/python tools/upload_youtube.py --file ExpLimitsLesson.mp4 \\
      --title "លីមីតអិចស្ប៉ូណង់ស្យែល" --grade 12 --lesson 3 --topic 1.2 --privacy public
  .venv/bin/python tools/upload_youtube.py --link https://youtu.be/XXXX --grade 9 --lesson 1 --topic 1.2   # ភ្ជាប់តំណដែលមានស្រាប់ (មិនបង្ហោះ)

--topic ៖ លេខចំណុចរង (1 = ទីមួយ) · ឬលេខចំណងជើង «1.2» / «១.២» (រកក្នុងមាតិកាគំរូ) · ទុកទទេ = បង្កើតចំណុចរង «🎬 …» ថ្មី
ឯកសារសម្ងាត់ client_secrets.json និង token.json នៅថតគម្រោង ហើយមាននៅក្នុង .gitignore (មិន push)
"""
import argparse, datetime, json, os, re, sys, time, urllib.request, urllib.error, warnings

warnings.filterwarnings("ignore")   # Python 3.9 EOL / LibreSSL warnings ពី google-auth
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_DIR = "/Users/phaijohn/Desktop/ReanMath_Videos"
SECRETS = os.path.join(ROOT, "client_secrets.json")
TOKEN = os.path.join(ROOT, "token.json")
HUB = os.path.join(ROOT, "hub.js")
LOG = os.path.join(ROOT, "tools", "youtube_uploads.json")
SCOPES = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.readonly"]
PROJECT = "math-teacher-system-bt"
KH = str.maketrans("0123456789", "០១២៣៤៥៦៧៨៩")
CHANNEL_HINT = "rean"


def die(msg, code=1):
    print("❌ " + msg)
    sys.exit(code)


# ---------------- OAuth ----------------
def creds():
    try:
        from google.oauth2.credentials import Credentials
        from google.auth.transport.requests import Request
        from google_auth_oauthlib.flow import InstalledAppFlow
    except ImportError:
        die("មិនទាន់ដំឡើងបណ្ណាល័យ · រត់៖ python3 -m venv .venv && .venv/bin/pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib")
    c = None
    if os.path.exists(TOKEN):
        try:
            c = Credentials.from_authorized_user_file(TOKEN, SCOPES)
        except Exception:
            c = None
    if c and c.valid:
        return c
    if c and c.expired and c.refresh_token:
        try:
            c.refresh(Request())
        except Exception as e:
            print("⚠️ token ផុតកំណត់/ត្រូវដកសិទ្ធិ (" + str(e)[:80] + ") → Login ម្ដងទៀត")
            c = None
    if not c or not c.valid:
        if not os.path.exists(SECRETS):
            die("រកមិនឃើញ client_secrets.json នៅថតគម្រោង")
        flow = InstalledAppFlow.from_client_secrets_file(SECRETS, SCOPES)
        print("🌐 កំពុងបើក Browser ដើម្បី Login Google · សូមជ្រើសគណនីដែលគ្រប់គ្រង Channel «Rean-Maths»")
        c = flow.run_local_server(port=0, open_browser=True, prompt="consent",
                                  authorization_prompt_message="បើកតំណនេះបើ Browser មិនបើកដោយខ្លួនឯង៖ {url}",
                                  success_message="✅ Login ជោគជ័យ · អាចបិទផ្ទាំងនេះបាន")
    with open(TOKEN, "w") as f:
        f.write(c.to_json())
    try:
        os.chmod(TOKEN, 0o600)
    except OSError:
        pass
    return c


def youtube(c):
    from googleapiclient.discovery import build
    return build("youtube", "v3", credentials=c, cache_discovery=False)


def channel(yt):
    r = yt.channels().list(part="snippet", mine=True).execute()
    it = r.get("items") or []
    if not it:
        die("គណនីនេះមិនមាន YouTube Channel ទេ")
    return it[0]["id"], it[0]["snippet"]["title"]


# ---------------- ឯកសារវីដេអូ ----------------
def latest_mp4():
    if not os.path.isdir(VIDEO_DIR):
        die("រកមិនឃើញថត " + VIDEO_DIR)
    fs = [os.path.join(VIDEO_DIR, f) for f in os.listdir(VIDEO_DIR) if f.lower().endswith(".mp4") and not f.startswith(".")]
    if not fs:
        die("គ្មានឯកសារ .mp4 ក្នុង " + VIDEO_DIR)
    return max(fs, key=os.path.getmtime)


def resolve_file(f):
    if not f:
        return latest_mp4()
    for p in (f, os.path.join(VIDEO_DIR, f)):
        if os.path.isfile(p):
            return os.path.abspath(p)
    die("រកមិនឃើញឯកសារ " + f)


def nice_title(path):
    b = os.path.splitext(os.path.basename(path))[0]
    b = re.sub(r"(?<=[a-z0-9])(?=[A-Z])", " ", b).replace("_", " ").replace("-", " ")
    return re.sub(r"\s+", " ", b).strip()


# ---------------- hub.js ----------------
def hub_text():
    with open(HUB, encoding="utf-8") as f:
        return f.read()


def videos_block(s):
    m = re.search(r"/\* @VIDEOS-START[^*]*\*/\s*var VIDEOS=(\{.*?\});\s*/\* @VIDEOS-END \*/", s, re.S)
    if not m:
        die("រកមិនឃើញប្លុក @VIDEOS-START/@VIDEOS-END ក្នុង hub.js")
    return m, json.loads(m.group(1))


def starter_titles(s, g, l):
    """ចំណងជើងចំណុចរងក្នុងមាតិកាគំរូ (តែ S{g} ដែលមាន · ឧ. ថ្នាក់ទី៩)"""
    m = re.search(r"\nvar S%d=\{(.*?)\n\};" % g, s, re.S)
    if not m:
        return []
    blk = re.split(r"\n(\d+):\[", "\n" + m.group(1))
    for i in range(1, len(blk) - 1, 2):
        if int(blk[i]) == l:
            return re.findall(r'U\("([^"]+)"', blk[i + 1])
    return []


def topic_index(s, g, l, topic, vids):
    titles = starter_titles(s, g, l)
    base = len(titles) if titles else 1   # គ្មានមាតិកាគំរូ → ចំណុចរងទូទៅ ១
    used = [int(k.split("_")[2]) for k in vids if k.startswith("%d_%d_" % (g, l))]
    if not topic:
        return max([base - 1] + used) + 1, None
    t = str(topic).strip()
    if re.fullmatch(r"\d+", t):
        return int(t) - 1, (titles[int(t) - 1] if 0 < int(t) <= len(titles) else None)
    kh = t.translate(KH)
    for i, ti in enumerate(titles):
        if ti.startswith(kh + " ") or ti.startswith(t + " ") or kh in ti:
            return i, ti
    print("⚠️ រកមិនឃើញចំណុចរង «%s» ក្នុងមាតិកាគំរូ (មាន៖ %s) → បង្កើតចំណុចរងថ្មី" % (t, " · ".join(titles) or "—"))
    return max([base - 1] + used) + 1, None


def put_hub(g, l, topic, url, title):
    s = hub_text()
    m, vids = videos_block(s)
    i, ti = topic_index(s, g, l, topic, vids)
    key = "%d_%d_%d" % (g, l, i)
    vids[key] = {"u": url, "t": title}
    body = json.dumps(dict(sorted(vids.items(), key=lambda kv: [int(x) for x in kv[0].split("_")])), ensure_ascii=False, indent=0).replace("\n", "")
    s2 = s[:m.start(1)] + body + s[m.end(1):]
    with open(HUB, "w", encoding="utf-8") as f:
        f.write(s2)
    print("🧩 hub.js ← VIDEOS[%s] (%s)" % (key, ti or "ចំណុចរង «🎬 %s» ថ្មី" % title))
    teacher_override(g, l)
    return key


def teacher_override(g, l):
    """បើគ្រូបានកែមេរៀននេះក្នុងកម្មវិធី (Firestore hub/{g}_{l}) កំណែនោះមានអាទិភាព → ត្រូវបិទភ្ជាប់តំណក្នុងកម្មវិធីកែដែរ"""
    u = "https://firestore.googleapis.com/v1/projects/%s/databases/(default)/documents/hub/%d_%d" % (PROJECT, g, l)
    try:
        urllib.request.urlopen(u, timeout=8)
        print("⚠️ មេរៀននេះមានកំណែគ្រូក្នុង Cloud (hub/%d_%d) ដែលមានអាទិភាពជាង hub.js · សូមបិទភ្ជាប់តំណក្នុង «🎓 ផ្ទាំងសិក្សាហ្វឹកហាត់» ផងដែរ" % (g, l))
    except urllib.error.HTTPError as e:
        if e.code != 404:
            print("ℹ️ មិនអាចពិនិត្យកំណែគ្រូបាន (HTTP %d)" % e.code)
    except Exception:
        pass


# ---------------- បង្ហោះ ----------------
def upload(yt, path, title, desc, privacy, tags):
    from googleapiclient.http import MediaFileUpload
    from googleapiclient.errors import HttpError
    body = {
        "snippet": {"title": title[:100], "description": desc[:4900], "tags": tags, "categoryId": "27",
                    "defaultLanguage": "km", "defaultAudioLanguage": "km"},
        "status": {"privacyStatus": privacy, "selfDeclaredMadeForKids": False, "embeddable": True},
    }
    media = MediaFileUpload(path, mimetype="video/mp4", chunksize=8 * 1024 * 1024, resumable=True)
    req = yt.videos().insert(part="snippet,status", body=body, media_body=media)
    resp, tries = None, 0
    size = os.path.getsize(path)
    print("⬆️ កំពុងបង្ហោះ %s (%.1f MB) …" % (os.path.basename(path), size / 1048576))
    while resp is None:
        try:
            st, resp = req.next_chunk()
            if st:
                print("   %3d%%" % int(st.progress() * 100), flush=True)
        except HttpError as e:
            if e.resp.status in (500, 502, 503, 504) and tries < 6:
                tries += 1
                time.sleep(2 ** tries)
                continue
            if e.resp.status == 403 and b"quotaExceeded" in (e.content or b""):
                die("អស់កូតា YouTube API ប្រចាំថ្ងៃ (≈ ៦ វីដេអូ/ថ្ងៃ) · សូមសាកថ្ងៃស្អែក")
            if e.resp.status == 401:
                die("សិទ្ធិ Login មិនត្រឹមត្រូវ · លុប token.json ហើយរត់ --auth-only ម្ដងទៀត")
            raise
        except (OSError, ConnectionError) as e:
            if tries < 6:
                tries += 1
                print("   📶 បណ្ដាញដាច់ (%s) · សាកម្ដងទៀត…" % str(e)[:60])
                time.sleep(2 ** tries)
                continue
            raise
    return resp["id"]


def log(entry):
    a = []
    if os.path.exists(LOG):
        try:
            with open(LOG, encoding="utf-8") as f:
                a = json.load(f)
        except Exception:
            a = []
    a.append(entry)
    with open(LOG, "w", encoding="utf-8") as f:
        json.dump(a, f, ensure_ascii=False, indent=1)


def main():
    ap = argparse.ArgumentParser(description="បង្ហោះវីដេអូ Manim ទៅ YouTube «Rean-Maths» ហើយភ្ជាប់ទៅ hub.js")
    ap.add_argument("--file", help="ឯកសារ .mp4 (ឈ្មោះក្នុង ReanMath_Videos ឬផ្លូវពេញ) · ទុកទទេ = ថ្មីបំផុត")
    ap.add_argument("--title", help="ចំណងជើង (លំនាំដើម = ពីឈ្មោះឯកសារ)")
    ap.add_argument("--desc", default="", help="ការពិពណ៌នា")
    ap.add_argument("--privacy", choices=["unlisted", "public", "private"], default="unlisted")
    ap.add_argument("--grade", type=int, help="ថ្នាក់ (7–12)")
    ap.add_argument("--lesson", type=int, help="លេខមេរៀនក្នុងទំព័រហ្វឹកហាត់")
    ap.add_argument("--topic", help="ចំណុចរង៖ លេខរៀង (1,2,…) ឬ «1.2» / «១.២»")
    ap.add_argument("--tags", default="គណិតវិទ្យា,Rean-Maths,Manim,Khmer Math", help="ស្លាក (ក្បៀស)")
    ap.add_argument("--link", help="មិនបង្ហោះ · ភ្ជាប់តំណ YouTube ដែលមានស្រាប់ទៅ hub.js")
    ap.add_argument("--auth-only", action="store_true", help="Login ហើយបង្ហាញ Channel តែប៉ុណ្ណោះ")
    ap.add_argument("--dry-run", action="store_true", help="បង្ហាញអ្វីដែលនឹងធ្វើ (មិនបង្ហោះ មិនកែ hub.js)")
    a = ap.parse_args()
    if (a.grade is None) != (a.lesson is None):
        die("ត្រូវបញ្ជាក់ --grade និង --lesson ជាមួយគ្នា")

    if a.link:
        m = re.search(r"(?:youtu\.be/|v=|shorts/|embed/)([\w-]{11})", a.link)
        if not m:
            die("តំណ YouTube មិនត្រឹមត្រូវ")
        if a.grade is None:
            die("--link ត្រូវការ --grade និង --lesson")
        url = "https://youtu.be/" + m.group(1)
        if a.dry_run:
            print("🔎 dry-run៖ នឹងភ្ជាប់", url, "→ ថ្នាក់", a.grade, "មេរៀន", a.lesson, "ចំណុចរង", a.topic or "(ថ្មី)")
            return
        put_hub(a.grade, a.lesson, a.topic, url, a.title or "វីដេអូពន្យល់")
        print("👉 បន្ទាប់៖ python3 tools/bump.py && ./tests/run.sh រួច commit/push")
        return

    if a.dry_run and not a.auth_only:
        path = resolve_file(a.file)
        print("🔎 dry-run៖", path, "·", a.title or nice_title(path), "·", a.privacy,
              "· hub:", ("ថ្នាក់ %d មេរៀន %d ចំណុចរង %s" % (a.grade, a.lesson, a.topic or "(ថ្មី)")) if a.grade else "—")
        return

    c = creds()
    yt = youtube(c)
    cid, cname = channel(yt)
    print("📺 Channel៖ %s (%s)" % (cname, cid))
    if CHANNEL_HINT not in cname.lower():
        print("⚠️ Channel នេះមិនមែន «Rean-Maths» ទេ · ប្រសិនបើខុស៖ លុប token.json ហើយ Login ម្ដងទៀតដោយជ្រើស Brand Account «Rean-Maths»")
    if a.auth_only:
        print("✅ token.json រួចរាល់ · លើកក្រោយបង្ហោះដោយមិនចាំបាច់ Login")
        return
    if CHANNEL_HINT not in cname.lower():
        die("ឈប់ ដើម្បីកុំបង្ហោះខុស Channel")

    path = resolve_file(a.file)
    title = a.title or nice_title(path)
    desc = a.desc or ("📚 " + title + ("\nថ្នាក់ទី%s · មេរៀនទី%s" % (str(a.grade).translate(KH), str(a.lesson).translate(KH)) if a.grade else "") +
                      "\n🧮 ហ្វឹកហាត់បន្ថែម៖ https://phaijohn6629.github.io/teacher-system-bt-2/practice.html" +
                      ("#g=%d&l=%d&v=1" % (a.grade, a.lesson) if a.grade else "") + "\n#Rean-Maths #គណិតវិទ្យា")
    tags = [t.strip() for t in a.tags.split(",") if t.strip()]
    vid = upload(yt, path, title, desc, a.privacy, tags)
    url = "https://youtu.be/" + vid
    print("\n✅ បង្ហោះរួច៖ " + url + "  (" + a.privacy + ")")
    key = put_hub(a.grade, a.lesson, a.topic, url, title) if a.grade else None
    log({"at": datetime.datetime.now().isoformat(timespec="seconds"), "file": os.path.basename(path), "title": title,
         "url": url, "privacy": a.privacy, "channel": cname, "hub": key})
    if key:
        print("👉 បន្ទាប់៖ python3 tools/bump.py && ./tests/run.sh រួច commit/push (ឬប្រាប់ Claude)")


if __name__ == "__main__":
    main()
