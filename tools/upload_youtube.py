#!/usr/bin/env python3
"""🎬 បង្ហោះវីដេអូ Manim ទៅ YouTube (Channel «Rean-Maths») ហើយភ្ជាប់តំណទៅផ្ទាំងសិក្សា (hub.js)

ប្រើ (ពីថតគម្រោង)៖
  .venv/bin/python tools/upload_youtube.py --auth-only                      # Login ម្ដង → token.json
  .venv/bin/python tools/upload_youtube.py                                   # បង្ហោះ .mp4 ថ្មីបំផុត (unlisted)
  .venv/bin/python tools/upload_youtube.py --file ExpLimitsLesson.mp4 \\
      --title "លីមីតអិចស្ប៉ូណង់ស្យែល" --grade 12 --lesson 3 --topic 1.2 --privacy public
  .venv/bin/python tools/upload_youtube.py --link https://youtu.be/XXXX --grade 9 --lesson 1 --topic 1.2   # ភ្ជាប់តំណដែលមានស្រាប់ (មិនបង្ហោះ)
  ... --playlist "លីមីតនៃអនុគមន៍ - ថ្នាក់ទី១២"                         # បង្ហោះ + បញ្ចូល Playlist (រក ឬបង្កើត)
  .venv/bin/python tools/upload_youtube.py --playlist "ឈ្មោះ" --add URL1,URL2   # បញ្ចូលវីដេអូមានស្រាប់ទៅ Playlist
  ... --level 1|2|3|4|5|pisa|all   # បង្ហាញតែក្នុងកម្រិតនោះ (លំនាំដើម all) · ឯកសារ/ចំណងជើងដដែលក្នុង ថ្នាក់+មេរៀន+កម្រិត ដដែល → រំលង (--force)

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
# upload = បង្ហោះ · force-ssl = អាន/គ្រប់គ្រង Playlist · កែព័ត៌មានវីដេអូ (មិនលុប Channel)
SCOPES = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.force-ssl"]
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
            have = set(json.load(open(TOKEN)).get("scopes") or [])
            if not set(SCOPES) <= have:
                print("🔑 token.json មិនទាន់មានសិទ្ធិថ្មី (Playlist) → ត្រូវ Login អនុញ្ញាតម្ដងទៀត")
                os.remove(TOKEN)
        except Exception:
            pass
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
    from googleapiclient.errors import HttpError
    try:
        r = yt.channels().list(part="snippet", mine=True).execute()
    except HttpError as e:
        why = (e.content or b"").decode("utf-8", "ignore")
        if "authenticatedUserAccountSuspended" in why:
            try:
                os.remove(TOKEN)
            except OSError:
                pass
            die("YouTube ឆ្លើយថា Channel/គណនីដែលបានជ្រើស ត្រូវបានផ្អាក (suspended) · token ត្រូវបានលុប\n"
                "   → ពិនិត្យ https://studio.youtube.com ឬជ្រើស Channel «Rean-Maths» ផ្សេង ហើយរត់ --auth-only ម្ដងទៀត")
        if e.resp.status in (401, 403):
            die("គ្មានសិទ្ធិចូល YouTube (" + str(e.resp.status) + ") · លុប token.json ហើយរត់ --auth-only ម្ដងទៀត")
        raise
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
    out = []
    for i in range(1, len(blk) - 1, 2):
        if int(blk[i]) == l:
            out = re.findall(r'U\("([^"]+)"', blk[i + 1])
    # ចំណុចរងបន្ថែមនៅចុងមេរៀន៖ add9(l,[AD("★ …"), PZ("🌐 …")]) (តាមលំដាប់)
    for a in re.finditer(r"\nadd%d\(%d,\[(.*?)\]\);" % (g, l), s, re.S):
        out += [("★ " if k == "AD" else "🌐 ") + t for k, t in re.findall(r'\b(AD|PZ)\("([^"]+)"', a.group(1))]
    return out


def topic_index(s, g, l, topic, vids, level="all"):
    titles = starter_titles(s, g, l)
    base = len(titles) if titles else 1   # គ្មានមាតិកាគំរូ → ចំណុចរងទូទៅ ១
    used = [int(k.split("_")[2]) for k in vids if k.startswith("%d_%d_" % (g, l))]
    if level != "all":   # វីដេអូតាមកម្រិត → ចំណុចរង «🎬» ដាច់ដោយឡែកជានិច្ច (hub.js មិនភ្ជាប់ចូលចំណុចរងដែលមានស្រាប់)
        if topic:
            print("ℹ️ --level %s៖ វីដេអូបង្ហាញជាចំណុចរង «🎬» ដាច់ដោយឡែក (មិនភ្ជាប់ក្នុង %s)" % (level, topic))
        return max([base - 1] + used) + 1, None
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


def put_hub(g, l, topic, url, title, level="all"):
    s = hub_text()
    m, vids = videos_block(s)
    i, ti = topic_index(s, g, l, topic, vids, level)
    key = "%d_%d_%d" % (g, l, i)
    vids[key] = {"u": url, "t": title}
    if level != "all":
        vids[key]["lv"] = level
    body = json.dumps(dict(sorted(vids.items(), key=lambda kv: [int(x) for x in kv[0].split("_")])), ensure_ascii=False, indent=0).replace("\n", "")
    s2 = s[:m.start(1)] + body + s[m.end(1):]
    with open(HUB, "w", encoding="utf-8") as f:
        f.write(s2)
    print("🧩 hub.js ← VIDEOS[%s] (%s · កម្រិត %s)" % (key, ti or "ចំណុចរង «🎬 %s» ថ្មី" % title, LVNAME.get(level, level)))
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
            if b"quotaExceeded" in (e.content or b""):
                die("អស់កូតា YouTube API ប្រចាំថ្ងៃ (≈ ៦ វីដេអូ/ថ្ងៃ · កំណត់ឡើងវិញម៉ោង ០០:០០ Pacific ≈ ១៤:០០–១៥:០០ ម៉ោងកម្ពុជា) · សូមសាកថ្ងៃស្អែក", 3)
            if b"uploadLimitExceeded" in (e.content or b""):
                die("Channel បានដល់កំណត់ចំនួនបង្ហោះប្រចាំថ្ងៃ (uploadLimitExceeded) · សូមសាកថ្ងៃស្អែក", 3)
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


# ---------------- ការពារការបង្ហោះជាន់គ្នា ----------------
LEVELS = ["1", "2", "3", "4", "5", "pisa", "all"]
LVNAME = {"1": "Level 1", "2": "Level 2", "3": "Level 3", "4": "Level 4", "5": "Level 5", "pisa": "PISA", "all": "គ្រប់កម្រិត"}


def log_entries():
    try:
        with open(LOG, encoding="utf-8") as f:
            a = json.load(f)
    except Exception:
        return []
    for e in a:   # កំណត់ត្រាចាស់គ្មាន g/l/lv → ទាញពី hub key «g_l_i»
        if "g" not in e and e.get("hub"):
            p = e["hub"].split("_")
            e["g"], e["l"] = int(p[0]), int(p[1])
        e.setdefault("lv", "all")
    return a


def norm(t):
    return re.sub(r"\s+", " ", str(t or "")).strip().lower()


def find_dup(file=None, title=None, g=None, l=None, level="all", url=None):
    """ឯកសារ .mp4 / ចំណងជើង / តំណ ដូចគ្នា ធ្លាប់ចូល ថ្នាក់+មេរៀន+កម្រិត ដដែល (ឬបង្ហោះរួច ពេលគ្មាន --grade) → ហេតុផល"""
    fb, tt = (os.path.basename(file) if file else None), norm(title)
    for e in log_entries():
        what = ("ឯកសារ «%s»" % fb if fb and e.get("file") == fb else "ចំណងជើង «%s»" % title if tt and norm(e.get("title")) == tt
                else "តំណ %s" % url if url and e.get("url", "")[-11:] == url[-11:] else None)
        if not what:
            continue
        if g is None:
            return "%s ធ្លាប់បង្ហោះរួច (%s · %s)" % (what, e.get("url"), e.get("at", "")[:10])
        if e.get("g") == g and e.get("l") == l and e.get("lv", "all") == level:
            return "%s ធ្លាប់ចូល ថ្នាក់ %d មេរៀន %d (%s) រួច · %s" % (what, g, l, LVNAME.get(level, level), e.get("url"))
    if g is not None:
        _, vids = videos_block(hub_text())
        for k, v in vids.items():
            if not k.startswith("%d_%d_" % (g, l)) or str(v.get("lv", "all")) != level:
                continue
            if (tt and norm(v.get("t")) == tt) or (url and v.get("u", "")[-11:] == url[-11:]):
                return "hub.js មានរួច៖ VIDEOS[%s] «%s» %s (%s)" % (k, v.get("t"), v.get("u"), LVNAME.get(level, level))
    return None


def skip_if_dup(a, **kw):
    why = find_dup(**kw)
    if why and not a.force:
        print("⏭️ រំលង (ការពារជាន់គ្នា)៖ " + why + "\n   (ប្រើ --force ដើម្បីបង្ហោះ/ភ្ជាប់ម្ដងទៀត)")
        sys.exit(0)
    if why:
        print("⚠️ --force៖ " + why)


# ---------------- Playlist ----------------
def vid_of(x):
    m = re.search(r"(?:youtu\.be/|v=|shorts/|embed/)([\w-]{11})", x) or re.fullmatch(r"([\w-]{11})", x.strip())
    if not m:
        die("តំណ/ID វីដេអូមិនត្រឹមត្រូវ៖ " + x)
    return m.group(1)


def find_playlist(yt, name, privacy, create=True):
    tok = None
    while True:
        r = yt.playlists().list(part="snippet,status", mine=True, maxResults=50, pageToken=tok).execute()
        for it in r.get("items", []):
            if it["snippet"]["title"].strip() == name.strip():
                return it["id"], False
        tok = r.get("nextPageToken")
        if not tok:
            break
    if not create:
        return None, False
    body = {"snippet": {"title": name[:150], "description": "📚 " + name + " · Rean-Maths · វិទ្យាល័យបឹងត្របែក (NGS)",
                        "defaultLanguage": "km"}, "status": {"privacyStatus": privacy}}
    r = yt.playlists().insert(part="snippet,status", body=body).execute()
    return r["id"], True


def playlist_ids(yt, pid):
    from googleapiclient.errors import HttpError
    out, tok = [], None
    while True:
        for i in range(4):   # Playlist ទើបបង្កើត → YouTube អាចឆ្លើយ 404 មួយរយៈ
            try:
                r = yt.playlistItems().list(part="contentDetails", playlistId=pid, maxResults=50, pageToken=tok).execute()
                break
            except HttpError as e:
                if e.resp.status != 404 or i == 3:
                    if e.resp.status == 404:
                        return out
                    raise
                time.sleep(2 * (i + 1))
        out += [it["contentDetails"]["videoId"] for it in r.get("items", [])]
        tok = r.get("nextPageToken")
        if not tok:
            return out


def add_to_playlist(yt, name, privacy, vids):
    """រក Playlist តាមឈ្មោះ (ឬបង្កើត) រួចបញ្ចូលវីដេអូតាមលំដាប់ · វីដេអូដែលមានរួច → រំលង"""
    pid, new = find_playlist(yt, name, privacy)
    print("📂 Playlist «%s» %s · https://www.youtube.com/playlist?list=%s" % (name, "(បង្កើតថ្មី)" if new else "(មានស្រាប់)", pid))
    have = set() if new else set(playlist_ids(yt, pid))
    for v in vids:
        if v in have:
            print("   ↷ មានរួច  https://youtu.be/" + v)
            continue
        yt.playlistItems().insert(part="snippet", body={"snippet": {"playlistId": pid, "resourceId": {"kind": "youtube#video", "videoId": v}}}).execute()
        have.add(v)
        print("   ＋ បញ្ចូល https://youtu.be/" + v)
    return pid


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
    ap.add_argument("--level", choices=LEVELS, default="all", help="កម្រិតដែលបង្ហាញវីដេអូ (1–5 · pisa · all = គ្រប់កម្រិត)")
    ap.add_argument("--force", action="store_true", help="បង្ហោះ/ភ្ជាប់ ទោះធ្លាប់មានរួច (មិនពិនិត្យជាន់គ្នា)")
    ap.add_argument("--tags", default="គណិតវិទ្យា,Rean-Maths,Manim,Khmer Math", help="ស្លាក (ក្បៀស)")
    ap.add_argument("--link", help="មិនបង្ហោះ · ភ្ជាប់តំណ YouTube ដែលមានស្រាប់ទៅ hub.js")
    ap.add_argument("--auth-only", action="store_true", help="Login ហើយបង្ហាញ Channel តែប៉ុណ្ណោះ")
    ap.add_argument("--dry-run", action="store_true", help="បង្ហាញអ្វីដែលនឹងធ្វើ (មិនបង្ហោះ មិនកែ hub.js)")
    ap.add_argument("--playlist", help="ឈ្មោះ Playlist · រកដែលមានស្រាប់ ឬបង្កើតថ្មី ហើយបញ្ចូលវីដេអូ")
    ap.add_argument("--playlist-privacy", choices=["unlisted", "public", "private"], default="unlisted", help="ពេលបង្កើត Playlist ថ្មី")
    ap.add_argument("--add", help="ជាមួយ --playlist៖ បញ្ចូលវីដេអូដែលមានស្រាប់ (តំណ/ID ក្បៀស តាមលំដាប់) ដោយមិនបង្ហោះ")
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
        skip_if_dup(a, title=a.title, g=a.grade, l=a.lesson, level=a.level, url=url)
        if a.dry_run:
            print("🔎 dry-run៖ នឹងភ្ជាប់", url, "→ ថ្នាក់", a.grade, "មេរៀន", a.lesson, "ចំណុចរង", a.topic or "(ថ្មី)", "·", LVNAME[a.level])
            return
        put_hub(a.grade, a.lesson, a.topic, url, a.title or "វីដេអូពន្យល់", a.level)
        print("👉 បន្ទាប់៖ python3 tools/bump.py && ./tests/run.sh រួច commit/push")
        return

    if not a.auth_only and not a.add:   # ពិនិត្យជាន់គ្នាមុន Login/បង្ហោះ (មិនចំណាយកូតា)
        p0 = resolve_file(a.file)
        skip_if_dup(a, file=p0, title=a.title or nice_title(p0), g=a.grade, l=a.lesson, level=a.level)
    if a.dry_run and not a.auth_only:
        path = resolve_file(a.file)
        print("🔎 dry-run៖", path, "·", a.title or nice_title(path), "·", a.privacy,
              "· hub:", ("ថ្នាក់ %d មេរៀន %d ចំណុចរង %s · %s" % (a.grade, a.lesson, a.topic or "(ថ្មី)", LVNAME[a.level])) if a.grade else "—")
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
    if a.add:
        if not a.playlist:
            die("--add ត្រូវការ --playlist")
        if CHANNEL_HINT not in cname.lower():
            die("ឈប់ ដើម្បីកុំកែ Playlist ខុស Channel")
        add_to_playlist(yt, a.playlist, a.playlist_privacy, [vid_of(x) for x in a.add.split(",") if x.strip()])
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
    if a.playlist:
        try:
            add_to_playlist(yt, a.playlist, a.playlist_privacy, [vid])
        except Exception as e:   # វីដេអូបង្ហោះរួចហើយ → កុំឱ្យបរាជ័យ Playlist បង្អាក់ hub.js
            print("⚠️ មិនអាចបញ្ចូល Playlist បានទេ (%s) · រត់ម្ដងទៀត៖ --playlist \"%s\" --add %s" % (str(e)[:80], a.playlist, url))
    key = put_hub(a.grade, a.lesson, a.topic, url, title, a.level) if a.grade else None
    log({"at": datetime.datetime.now().isoformat(timespec="seconds"), "file": os.path.basename(path), "title": title,
         "url": url, "privacy": a.privacy, "channel": cname, "hub": key, "playlist": a.playlist or "",
         "g": a.grade, "l": a.lesson, "lv": a.level})
    if key:
        print("👉 បន្ទាប់៖ python3 tools/bump.py && ./tests/run.sh រួច commit/push (ឬប្រាប់ Claude)")


if __name__ == "__main__":
    main()
