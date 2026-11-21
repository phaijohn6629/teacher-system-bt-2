#!/usr/bin/env python3
"""🎬 បង្ហោះវីដេអូគណិតវិទ្យា ថ្នាក់ទី ១១ (៤២ វីដេអូ) ទៅ YouTube «Rean-Maths» ហើយភ្ជាប់ទៅ hub.js

ប្រើ (ពីថតគម្រោង Teacher_System)៖
  .venv/bin/python tools/upload_grade11.py --dry-run          # បង្ហាញបញ្ជី ៤២ (មិនហៅ API · មិនកែអ្វី)
  .venv/bin/python tools/upload_grade11.py --only Asequence_L1 --max 1    # សាកល្បងវីដេអូទី ១
  .venv/bin/python tools/upload_grade11.py                    # បង្ហោះបន្ត (≤ ៥ វីដេអូថ្មី/ដង · ស្របតាមកូតា)
  .venv/bin/python tools/upload_grade11.py --status           # មើលស្ថានភាពក្នុង state

ប្រភព៖ ~/Desktop/ReanMath_Videos/Ready_For_YouTube/<ឈ្មោះ>.mp4 + <ឈ្មោះ>.png (Thumbnail 1280x720)
Resume៖ tools/g11_upload_state.json កត់ត្រា ៤ ជំហានដាច់ដោយឡែកក្នុងមួយវីដេអូ (Upload → Thumbnail → Playlist → hub.js)
  · Video ID ត្រូវរក្សាភ្លាមក្រោយ Upload → ដាច់/ជាប់កូតាត្រង់ណាក៏បន្តត្រង់នោះ ដោយមិនបង្ហោះស្ទួន
កូតា YouTube ១០,០០០/ថ្ងៃ · វីដេអូ ១ ≈ ១,៦០០ (Upload) + ៥០ (Thumbnail) + ៥០ (Playlist) → ≈ ៥ វីដេអូ/ថ្ងៃ (៤២ វីដេអូ ≈ ៩ ថ្ងៃ)
ប្រើ OAuth/មុខងារពី tools/upload_youtube.py (Channel ត្រូវមានពាក្យ «rean» ទើបបង្ហោះ)
"""
import argparse, datetime, json, os, sys, time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import upload_youtube as U   # noqa: E402  (មិនដំណើរការ main នៅពេល import)

SRC = "/Users/phaijohn/Desktop/ReanMath_Videos/Ready_For_YouTube"
STATE = os.path.join(U.ROOT, "tools", "g11_upload_state.json")
GRADE = 11
SITE = "https://phaijohn6629.github.io/teacher-system-bt-2/"
FOOT = "រៀនគណិតវិទ្យា - Rean Math | វិទ្យាល័យបឹងត្របែក (NGS)"
PRIVACY = "public"
# លេខមេរៀន (CUR[11]) → (ឈ្មោះមេរៀន · ឈ្មោះឯកសារ prefix) · ឈ្មោះឯកសារ Rsequcence (L2–PISA) នៅតាមដើម
LESSONS = [
    (11, "ស្វ៊ីតចំនួនពិត", ["Rsequence_L1", "Rsequcence_L2", "Rsequcence_L3", "Rsequcence_L4", "Rsequcence_L5", "Rsequcence_PISA"]),
    (12, "ស្វ៊ីតនព្វន្ត", ["Asequence_%s" % x for x in ("L1", "L2", "L3", "L4", "L5", "PISA")]),
    (13, "ស្វ៊ីតធរណីមាត្រ", ["Gsequence_%s" % x for x in ("L1", "L2", "L3", "L4", "L5", "PISA")]),
    (14, "ផលបូកតួនៃស្វ៊ីតផ្សេងៗ", ["Sumsequence_%s" % x for x in ("L1", "L2", "L3", "L4", "L5", "PISA")]),
    (15, "ទំនាក់ទំនងកំណើននៃស្វ៊ីត", ["Relationsequence_%s" % x for x in ("L1", "L2", "L3", "L4", "L5", "PISA")]),
    (21, "អនុគមន៍អិចស្ប៉ូណង់ស្យែល", ["Exponential_%s" % x for x in ("L1", "L2", "L3", "L4", "L5", "PISA")]),
    (22, "អនុគមន៍លោការីត", ["Logarithm_%s" % x for x in ("L1", "L2", "L3", "L4", "L5", "PISA")]),
]
LV = ["1", "2", "3", "4", "5", "pisa"]                                   # --level (បង្ហាញ)
LVTXT = {"1": "កម្រិត ១", "2": "កម្រិត ២", "3": "កម្រិត ៣", "4": "កម្រិត ៤", "5": "កម្រិត ៥", "pisa": "PISA · បញ្ហាជីវិតពិត"}
LVKEY = {"1": 1, "2": 5, "3": 2, "4": 6, "5": 3, "pisa": 4}              # កូដខាងក្នុង (practice.html#…&v=)


def items():
    out = []
    for l, name, files in LESSONS:
        for lv, f in zip(LV, files):
            title = "គណិតវិទ្យា ថ្នាក់ទី១១ | %s - %s | វិទ្យាល័យបឹងត្របែក (NGS)" % (name, LVTXT[lv])
            out.append({"file": f + ".mp4", "png": f + ".png", "l": l, "lname": name, "lv": lv, "title": title,
                        "hub": "%s - %s" % (name, LVTXT[lv]),
                        "playlist": "គណិតវិទ្យា ថ្នាក់ទី១១ - " + name,
                        "mp4": os.path.join(SRC, f + ".mp4"), "thumb": os.path.join(SRC, f + ".png")})
    return out


def desc(it):
    link = "%spractice.html#g=%d&l=%d&v=%d" % (SITE, GRADE, it["l"], LVKEY[it["lv"]])
    return ("📚 គណិតវិទ្យា ថ្នាក់ទី១១ · %s · %s\n\n"
            "វីដេអូពន្យល់មេរៀន «%s» ត្រង់ %s ដោយប្រើគំនូរសកម្ម (Manim) ជាភាសាខ្មែរ។\n\n"
            "🧮 ហ្វឹកហាត់លំហាត់ត្រង់កម្រិតនេះ៖ %s\n"
            "🌐 គេហទំព័រ៖ %s\n\n%s\n#Rean-Maths #គណិតវិទ្យា #ថ្នាក់ទី១១") % (
        it["lname"], LVTXT[it["lv"]], it["lname"], LVTXT[it["lv"]], link, SITE, FOOT)


def load():
    try:
        with open(STATE, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def save(st):
    tmp = STATE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(st, f, ensure_ascii=False, indent=1)
    os.replace(tmp, STATE)


def quota_exit(st, why):
    save(st)
    print("⛔ ជាប់កូតា YouTube ប្រចាំថ្ងៃ (%s) · state បានរក្សាទុក · រត់ម្ដងទៀតថ្ងៃស្អែក (បន្តពីកន្លែងដែលបាក់)" % why)
    sys.exit(3)


def is_quota(e):
    return b"quotaExceeded" in (getattr(e, "content", b"") or b"") or b"uploadLimitExceeded" in (getattr(e, "content", b"") or b"")


def step_status(s):
    return "%s%s%s%s" % ("⬆️" if s.get("id") else "·", "🖼️" if s.get("thumb") in ("ok", "denied") else "·",
                         "📂" if s.get("playlist") else "·", "🧩" if s.get("hub") else "·")


def main():
    ap = argparse.ArgumentParser(description="បង្ហោះវីដេអូថ្នាក់ទី ១១ (៤២) ទៅ YouTube + hub.js", formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true", help="បង្ហាញបញ្ជី · មិនហៅ API · មិនកែអ្វី")
    ap.add_argument("--only", help="តែឯកសារដែលឈ្មោះមានអក្សរនេះ (ឧ. Asequence_L1 · Logarithm)")
    ap.add_argument("--max", type=int, default=5, help="ចំនួនវីដេអូថ្មីអតិបរមាក្នុងមួយដង (លំនាំដើម ៥ ស្របតាមកូតា)")
    ap.add_argument("--status", action="store_true", help="បង្ហាញស្ថានភាពក្នុង state")
    a = ap.parse_args()
    its = items()
    if a.only:
        its = [x for x in its if a.only in x["file"]]
    st = load()

    if a.status or a.dry_run:
        print("ជំហាន៖ ⬆️ Upload · 🖼️ Thumbnail · 📂 Playlist · 🧩 hub.js\n")
        miss = 0
        for i, it in enumerate(its, 1):
            s = st.get(it["file"], {})
            ok = os.path.isfile(it["mp4"]) and os.path.isfile(it["thumb"])
            miss += (not ok)
            print("%2d. %s %-26s ម.%d %-12s %s" % (i, step_status(s), it["file"], it["l"], LVTXT[it["lv"]], "" if ok else "❌ ខ្វះ mp4/png"))
            if a.dry_run:
                print("      ចំណងជើង YouTube : " + it["title"])
                print("      ចំណងជើង hub.js  : 🎬 " + it["hub"] + "   (lv=%s)" % it["lv"])
                print("      Playlist         : " + it["playlist"] + " (public)")
                if s.get("id"):
                    print("      https://youtu.be/" + s["id"])
        print("\nសរុប %d · Upload រួច %d · Playlist រួច %d · hub រួច %d%s" % (
            len(its), sum(1 for it in its if st.get(it["file"], {}).get("id")), sum(1 for it in its if st.get(it["file"], {}).get("playlist")),
            sum(1 for it in its if st.get(it["file"], {}).get("hub")), (" · ខ្វះឯកសារ %d" % miss) if miss else ""))
        if a.dry_run:
            print("\nឧទាហរណ៍ពិពណ៌នា (%s)៖\n---\n%s\n---" % (its[0]["file"], desc(its[0])) if its else "")
        return

    bad = [x["file"] for x in its if not (os.path.isfile(x["mp4"]) and os.path.isfile(x["thumb"]))]
    if bad:
        U.die("ខ្វះឯកសារក្នុង %s៖ %s" % (SRC, ", ".join(bad[:5])))
    # ពិនិត្យជាន់គ្នាមុន Login (មិនចំណាយកូតា)
    c = U.creds()
    yt = U.youtube(c)
    cid, cname = U.channel(yt)
    print("📺 Channel៖ %s (%s)" % (cname, cid))
    if U.CHANNEL_HINT not in cname.lower():
        U.die("Channel នេះមិនមែន «Rean-Maths» ទេ · ឈប់ ដើម្បីកុំបង្ហោះខុស Channel")
    from googleapiclient.errors import HttpError
    from googleapiclient.http import MediaFileUpload

    new_n, denied = 0, 0
    for it in its:
        s = st.setdefault(it["file"], {})
        # ១) Upload (មួយដងគត់ · មាន id រួច → រំលង)
        if not s.get("id"):
            if new_n >= a.max:
                continue
            why = U.find_dup(file=it["mp4"], title=it["title"], g=GRADE, l=it["l"], level=it["lv"])
            if why:
                print("⏭️ រំលង (ការពារជាន់គ្នា)៖ " + why)
                continue
            print("\n━━ %s · ម.%d · %s" % (it["file"], it["l"], LVTXT[it["lv"]]))
            tags = ["គណិតវិទ្យា", "ថ្នាក់ទី១១", it["lname"], "Rean-Maths", "Manim", "Khmer Math"]
            try:
                vid = U.upload(yt, it["mp4"], it["title"], desc(it), PRIVACY, tags)   # ជាប់កូតា → die(…,3) ចេញ (មិនទាន់មាន id)
            except SystemExit:
                save(st)
                raise
            s.update({"id": vid, "title": it["title"], "uploaded_at": datetime.datetime.now().isoformat(timespec="seconds")})
            save(st)   # ⚠️ រក្សា Video ID ភ្លាម
            new_n += 1
            print("✅ បង្ហោះរួច៖ https://youtu.be/" + vid)
        else:
            print("\n━━ %s · បន្ត (https://youtu.be/%s)" % (it["file"], s["id"]))
        vid = s["id"]
        # ២) Thumbnail
        if s.get("thumb") not in ("ok", "denied"):
            try:
                yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(it["thumb"], mimetype="image/png")).execute()
                s["thumb"] = "ok"
                print("   🖼️ Thumbnail ✓")
            except HttpError as e:
                if is_quota(e):
                    quota_exit(st, "thumbnails")
                body = (e.content or b"").decode("utf-8", "ignore")
                if e.resp.status == 403:
                    s["thumb"] = "denied"
                    denied += 1
                    print("   ⚠️ YouTube មិនអនុញ្ញាត Thumbnail ផ្ទាល់ខ្លួន (403) · បន្តដោយមិនមាន · ដាក់ដោយដៃក្នុង Studio បាន៖ " + it["thumb"])
                    if "custom" in body.lower():
                        print("      (Channel ត្រូវបញ្ជាក់អត្តសញ្ញាណតាមទូរស័ព្ទ ទើបអាចដាក់ Thumbnail ផ្ទាល់ខ្លួន)")
                else:
                    print("   ⚠️ Thumbnail បរាជ័យ (%s) · នឹងសាកម្ដងទៀតពេលរត់លើកក្រោយ" % str(e)[:90])
            save(st)
        # ៣) Playlist
        if not s.get("playlist"):
            for k in range(2):
                try:
                    U.add_to_playlist(yt, it["playlist"], PRIVACY, [vid])
                    s["playlist"] = it["playlist"]
                    break
                except HttpError as e:
                    if is_quota(e):
                        quota_exit(st, "playlist")
                    if k == 0:
                        time.sleep(5)   # Playlist ទើបបង្កើត → 404/409 មួយរយៈ
                        continue
                    print("   ⚠️ Playlist បរាជ័យ (%s) · នឹងសាកម្ដងទៀតពេលរត់លើកក្រោយ" % str(e)[:90])
            save(st)
        # ៤) hub.js + log
        if not s.get("hub"):
            s["hub"] = U.put_hub(GRADE, it["l"], None, "https://youtu.be/" + vid, it["hub"], it["lv"])
            U.log({"at": datetime.datetime.now().isoformat(timespec="seconds"), "file": it["file"], "title": it["title"],
                   "url": "https://youtu.be/" + vid, "privacy": PRIVACY, "channel": cname, "hub": s["hub"],
                   "playlist": it["playlist"], "g": GRADE, "l": it["l"], "lv": it["lv"], "via": "upload_grade11"})
            save(st)

    done = sum(1 for it in its if st.get(it["file"], {}).get("hub") and st[it["file"]].get("playlist"))
    left = len(its) - sum(1 for it in its if st.get(it["file"], {}).get("id"))
    print("\n✅ រួចក្នុងដងនេះ៖ បង្ហោះថ្មី %d · ពេញលេញ %d/%d · នៅសល់មិនទាន់ Upload %d%s" % (new_n, done, len(its), left,
          (" · Thumbnail ត្រូវបានបដិសេធ %d" % denied) if denied else ""))
    if new_n:
        print("👉 បន្ទាប់ (ពេលរួចគ្រប់ ឬចង់ push កណ្ដាលទី)៖ python3 tools/bump.py && ./tests/run.sh រួច bump sw.js · commit · push")


if __name__ == "__main__":
    main()
