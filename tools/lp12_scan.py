#!/usr/bin/env python3
"""🔍 ស្កេន PDF កិច្ចតែងការក្នុង _pdf_tmp/ រកតែថ្នាក់ទី១២ ដែលអានបាន (Unicode ស្អាត) · មិនបោះអត្ថបទវែង
ត្រូវការ pymupdf ។ ប្រើ៖ python3 tools/lp12_scan.py [--dir _pdf_tmp]
លទ្ធផល៖ តារាង (ឯកសារ · ថ្នាក់ · ស្ថានភាព). ឯកសារ Font ចាស់ (ព្យញ្ជនៈ/ស្រៈខុសលំដាប់) ត្រូវរំលង ព្រោះបម្លែងមិនបានត្រឹមត្រូវ។"""
import glob, os, re, sys
try:
    import fitz
except ImportError:
    sys.exit("pip install pymupdf")
d = sys.argv[sys.argv.index("--dir") + 1] if "--dir" in sys.argv else "_pdf_tmp"
D = {"០": "0", "១": "1", "២": "2", "៣": "3", "៤": "4", "៥": "5", "៦": "6", "៧": "7", "៨": "8", "៩": "9"}
STEPS = ["រដ្ឋបាលថ្នាក់", "រំលឹកមេរៀនចាស់", "មេរៀនប្រចាំថ្ងៃ", "ពង្រឹង", "កិច្ចការផ្ទះ"]
rows = {"ok": [], "legacy": [], "not12": [], "noplan": []}
for f in sorted(glob.glob(os.path.join(d, "*.pdf"))):
    n = os.path.basename(f)
    try:
        t = " ".join("".join(p.get_text() for p in fitz.open(f)).split())
    except Exception:
        continue
    kh = len(re.findall("[ក-៿]", t)) or 1
    if len(re.findall(r"[េែៃ][ក-អ]", t)) / kh > 0.03 or re.search(r"[ƀ-˿]", t):
        rows["legacy"].append(n); continue
    g = re.search(r"(?:ថ្នាក់ទី|Grade)\s*[:៖]?\s*([0-9០-៩]+)", t)
    g = "".join(D.get(c, c) for c in g.group(1)) if g else "?"
    if g != "12":
        rows["not12"].append(n); continue
    (rows["ok"] if sum(s in t for s in STEPS) >= 4 else rows["noplan"]).append(n)
for k, v in rows.items():
    print(f"{k:7} {len(v):4}")
print("\nអាចបម្លែងបាន (ថ្នាក់១២ · Unicode ស្អាត · មាន ៥ ជំហាន)៖")
for n in rows["ok"]: print(" -", n)
print("\nថ្នាក់១២ ប៉ុន្តែមិនមែនកិច្ចតែងការ (សៀវភៅ/កម្មវិធី)៖", len(rows["noplan"]))
for n in rows["noplan"]: print(" ·", n[:60])
