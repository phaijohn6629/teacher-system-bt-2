#!/usr/bin/env python3
"""🎬 បង្ហោះវីដេអូ «ដេរីវេនៃអនុគមន៍» ថ្នាក់ទី១២ ទាំង ៦ តាមលំដាប់ (កម្រិត ១ → ៥ → PISA)

ស្គ្រីបនេះកំណត់ចំណងជើង · ការពិពណ៌នា · Playlist · កម្រិត រួចហៅ tools/upload_youtube.py ដែលមានស្រាប់ (OAuth · ការពារឆានែល «Rean-Maths» ·
បង្ហោះត្រឡប់បន្តបន្ទាប់ · ការពារជាន់គ្នា · ភ្ជាប់ទៅ hub.js ថ្នាក់ 12 មេរៀន 31 តាមកម្រិត) · មិនបង្កើតប្រព័ន្ធ Login ថ្មីទេ។

ប្រើ (ពីថតគម្រោង)៖
  .venv/bin/python tools/upload_to_youtube.py --dry-run          # មើលតែ (មិនបង្ហោះ មិនចំណាយ Quota)
  .venv/bin/python tools/upload_to_youtube.py                    # បង្ហោះទាំងអស់ (unlisted)
  .venv/bin/python tools/upload_to_youtube.py --privacy public
  .venv/bin/python tools/upload_to_youtube.py --only 1,2         # តែកម្រិតខ្លះ (1–5 · pisa)

ការរៀបចំ Google API (ម្ដងគត់ · ធ្វើរួចហើយ បើ token.json មាន)៖
  1. console.cloud.google.com › APIs & Services › បើក «YouTube Data API v3»
  2. Credentials › Create OAuth client ID › Desktop app › ទាញយក JSON ដាក់ឈ្មោះ client_secrets.json ក្នុងថតគម្រោង
  3. .venv/bin/python tools/upload_youtube.py --auth-only  → Browser បើក → ជ្រើស Brand Account «Rean-Maths» (បង្កើត token.json)
  ⚠️ client_secrets.json និង token.json ត្រូវបានដាក់ក្នុង .gitignore · កុំ push ឡើង GitHub
  កំណត់ចំណាំ៖ ប្រើ google-auth (google-api-python-client) · oauth2client ត្រូវបានបោះបង់ចោលហើយ
Quota YouTube ≈ ៦ វីដេអូ/ថ្ងៃ (ទាំង ៦ ភាគ = ១ ថ្ងៃ) · ជាប់ Quota → ស្គ្រីបឈប់ ហើយបន្តថ្ងៃស្អែកបាន (វីដេអូរួចហើយនឹងត្រូវរំលង)
"""
import argparse, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VID = "/Users/phaijohn/Desktop/ReanMath_Videos"
PLAYLIST = "គណិតវិទ្យា ថ្នាក់ទី១២ - ដេរីវេ"
FOOT = "វិទ្យាល័យបឹងត្របែក ( NGS ) • រៀនគណិតវិទ្យា - Rean Math"
GRADE, LESSON = 12, 31   # hub.js ៖ ថ្នាក់ 12 មេរៀន 31 = ដេរីវេ

# (--level, ឈ្មោះឯកសារ, ឈ្មោះកម្រិតក្នុងចំណងជើង, ការពិពណ៌នាមេរៀន)
ITEMS = [
    ("1", "Deriv_1_Level1Basic", "កម្រិត ១៖ ដេរីវេមូលដ្ឋាន (Basic Derivatives)",
     "ដេរីវេនៃពហុធា និងឫស · រូបមន្ត (xⁿ)′ = n·xⁿ⁻¹ · ដេរីវេនៃផលបូក និងមេគុណថេរ។"),
    ("2", "Deriv_2_Level2ProductQuotient", "កម្រិត ២៖ ផលគុណ និងផលចែក (Product & Quotient)",
     "ដេរីវេនៃផលគុណ (uv)′ និងផលចែក (u/v)′ ព្រមទាំងអនុគមន៍លោការីតមូលដ្ឋាន។"),
    ("3", "Deriv_3_Level3ChainTrig", "កម្រិត ៣៖ អនុគមន៍បណ្តាក់ និងត្រីកោណមាត្រ (Chain & Trig)",
     "ដេរីវេនៃអនុគមន៍បណ្តាក់ (f∘g)′ និងអនុគមន៍ត្រីកោណមាត្រ sin · cos · tan។"),
    ("4", "Deriv_4_Level4ExpLog", "កម្រិត ៤៖ អិចស្ប៉ូណង់ស្យែល និងលោការីតកម្រិតខ្ពស់ (Exp & Log Advanced)",
     "ដេរីវេនៃ eᵘ · aᵘ · ln u លក្ខខណ្ឌផ្សំ និងលំហាត់កម្រិតខ្ពស់។"),
    ("5", "Deriv_5_Level5Mastery", "កម្រិត ៥៖ កម្រិតជំនាញ និងប្រឡង (Mastery)",
     "លំហាត់ដេរីវេកម្រិតជំនាញ ក្នុងទម្រង់ប្រឡងថ្នាក់ជាតិ។"),
    ("pisa", "Deriv_PISA_RealWorld", "PISA និងបញ្ហាជីវិតពិត (Real-world)",
     "លំហាត់អនុវត្តដេរីវេក្នុងជីវិតពិត ៖ ល្បឿន អត្រាប្រែប្រួល និងការបង្កើនប្រសិទ្ធភាព ជាទម្រង់ PISA។"),
]


def find(name):
    """ស្វែងរកក្នុង G12_Deriv_FINAL មុន · រួចក្នុង ReanMath_Videos/<name>/<name>.mp4"""
    for p in (os.path.join(VID, "G12_Deriv_FINAL", name + ".mp4"), os.path.join(VID, name, name + ".mp4")):
        if os.path.isfile(p):
            return p
    return None


def main():
    ap = argparse.ArgumentParser(description="បង្ហោះវីដេអូដេរីវេ ថ្នាក់ទី១២ ទាំង ៦ ភាគ")
    ap.add_argument("--privacy", choices=["unlisted", "public", "private"], default="unlisted")
    ap.add_argument("--only", help="កម្រិតខ្លះ ឧ. 1,2 ឬ pisa")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--no-hub", action="store_true", help="មិនភ្ជាប់ទៅ hub.js (បង្ហោះតែ YouTube)")
    a = ap.parse_args()
    only = set(x.strip().lower() for x in a.only.split(",")) if a.only else None

    todo, missing = [], []
    for lv, name, lvname, about in ITEMS:
        if only and lv not in only:
            continue
        p = find(name)
        (todo if p else missing).append((lv, name, lvname, about, p))
    for m in missing:
        print("⚠️ រកមិនឃើញឯកសារ៖ %s.mp4 (រំលង)" % m[1])
    if not todo:
        sys.exit("❌ គ្មានវីដេអូត្រូវបង្ហោះ")

    py = sys.executable
    for lv, name, lvname, about, path in todo:
        title = "គណិតវិទ្យា ថ្នាក់ទី១២ - មេរៀនដេរីវេ [%s]" % lvname
        desc = ("📚 គណិតវិទ្យា ថ្នាក់ទី១២ · មេរៀនដេរីវេនៃអនុគមន៍ · %s\n\n%s\n\n"
                "ទំព័រហ្វឹកហាត់៖ មេរៀនដេរីវេ (ថ្នាក់ទី១២) តាមកម្រិត ១–៥ និង PISA\n\n%s") % (lvname, about, FOOT)
        cmd = [py, os.path.join(ROOT, "tools", "upload_youtube.py"), "--file", path, "--title", title, "--desc", desc,
               "--privacy", a.privacy, "--playlist", PLAYLIST, "--playlist-privacy", a.privacy, "--tags", "គណិតវិទ្យា,ថ្នាក់ទី១២,ដេរីវេ,Rean-Maths,Manim,Khmer Math"]
        if not a.no_hub:
            cmd += ["--grade", str(GRADE), "--lesson", str(LESSON), "--level", lv]
        if a.dry_run:
            cmd.append("--dry-run")
        print("\n━━ [%s] %s" % (lv, title))
        r = subprocess.run(cmd, cwd=ROOT)
        if r.returncode == 3:
            sys.exit("⛔ ជាប់ Quota/កំណត់ប្រចាំថ្ងៃ · រត់ម្ដងទៀតថ្ងៃស្អែក (វីដេអូដែលបង្ហោះរួចនឹងត្រូវរំលង)")
        if r.returncode:
            sys.exit("❌ បរាជ័យលើ «%s» (exit %d) · ឈប់ · កែរួចរត់ម្ដងទៀតបាន" % (name, r.returncode))
    print("\n✅ រួចរាល់ · បន្ទាប់៖ python3 tools/bump.py && ./tests/run.sh រួច commit/push (hub.js ត្រូវបានកែ បើមិនប្រើ --no-hub)")


if __name__ == "__main__":
    main()
