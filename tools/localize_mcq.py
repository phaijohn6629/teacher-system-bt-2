#!/usr/bin/env python3
"""🇰🇭 កែសម្រួលលំហាត់ក្នុងធនាគារ (qbq/) ឱ្យត្រូវបរិបទកម្ពុជា + ជួសជុល LaTeX

ប្រើ (ពីថតគម្រោង)៖
  .venv/bin/python tools/localize_mcq.py --dry-run            # មើលតែការកែ (ចាស់ → ថ្មី) · មិនសរសេរ
  .venv/bin/python tools/localize_mcq.py --apply              # រក្សាទុកពិតប្រាកដ (បម្រុងទុកមុនជានិច្ច)
  .venv/bin/python tools/localize_mcq.py --restore tools/localize_backup_….json   # ត្រឡប់វិញ
  ជម្រើស៖ --grade 9 · --owner T002 · --decimal-comma (2.5 → 2{,}5 ក្នុង $…$) · --key ផ្លូវ.json · --file export.json (សាកក្រៅ DB)
  python3 tools/localize_mcq.py --selftest

ការធានា៖
  - កែតែ q (សំណួរ) · ch[] (ជម្រើស) · sl (ដំណោះស្រាយ) · មិនប៉ះ a (ចម្លើយត្រូវ) · លំដាប់ជម្រើស · o (អ្នកបញ្ចូល) ឡើយ
  - បើលេខ (0–9 / ០–៩) ក្នុងវាលណាមួយប្រែប្រួលក្រោយកែ → បោះបង់ការកែវាលនោះ (មិនប៉ះតម្លៃលេខដាច់ខាត)
  - រូបិយប័ណ្ណ/ខ្នាតដែលត្រូវបំប្លែងលេខ (ដុល្លារ · ម៉ាយ · ផោន …) → រាយការណ៍ «⚠️ ពិនិត្យដោយដៃ» មិនកែស្វ័យប្រវត្តិ
  - $ មិនគូ → រាយការណ៍ មិនទាយកែ
  - --apply៖ Transaction ម្ដងមួយឯកសារ · ពិនិត្យថាអត្ថបទមិនទាន់ត្រូវគ្រូកែក្រោយ dry-run · tx.update តែវាលដែលប្ដូរ + ub/u
  - Key Firebase Admin (Service Account) នៅក្រៅ git (.gitignore) · មិនបោះពុម្ពអត្ថបទទៅកន្លែងផ្សេងក្រៅពី Terminal/ឯកសារ backup ក្នុងម៉ាស៊ីន
"""
import argparse, json, os, re, sys, time, unicodedata, warnings
warnings.filterwarnings("ignore")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RULES = os.path.join(ROOT, "tools", "localize_rules.json")
DEF_KEY = os.path.join(ROOT, "firebase-admin-key.json")
PROJECT = "math-teacher-system-bt"
BY = "AUTO-KH"  # ub ពេលកែដោយ Script (បង្ហាញ «កែចុងក្រោយដោយ៖ AUTO-KH»)

MATH = re.compile(r"\$\$[\s\S]*?\$\$|\$[^$]*\$")
DIGITS = re.compile(r"[0-9០-៩]+")
KH_LETTER = re.compile(r"[\u1780-\u17B3]")          # ព្យញ្ជនៈ/ស្រៈពេញ
KH_MARK = re.compile(r"[\u17B4-\u17D3\u17DD]")       # ស្រៈនិស្ស័យ · ជើង · វណ្ណយុត្តិ
HONOR = ("លោក", "អ្នក", "កញ្ញា", "ឈ្មោះ", "បងប្រុស", "បងស្រី", "ប្អូន", "លោកស្រី", "សិស្ស", "និង")


def load_rules():
    with open(RULES, encoding="utf-8") as f:
        r = json.load(f)
    return {k: r.get(k, {}) for k in ("names", "places", "khmer", "english")} | {"flag": r.get("flag", [])}


# ---------- អត្ថបទក្រៅ $…$ ----------
def kh_replace(text, old, new):
    """ប្ដូរពាក្យខ្មែរតែពេលនៅដាច់ជាពាក្យ៖ តួអក្សរបន្ទាប់មិនមែនជាស្រៈ/ជើង (មិនមែនផ្នែកនៃពាក្យ) · មុន = ដើម/ដកឃ្លា/សញ្ញា/គោរពនាម"""
    out, i, n = [], 0, len(old)
    while True:
        j = text.find(old, i)
        if j < 0:
            out.append(text[i:]); break
        nxt = text[j + n] if j + n < len(text) else ""
        prev = text[:j]
        ok_next = not (nxt and (KH_MARK.match(nxt) or KH_LETTER.match(nxt)))
        ok_prev = (not prev) or not KH_LETTER.match(prev[-1]) and not KH_MARK.match(prev[-1]) or prev.endswith(HONOR)
        if ok_next and ok_prev:
            out.append(text[i:j] + new)
        else:
            out.append(text[i:j + n])
        i = j + n
    return "".join(out)


def fix_text(seg, R):
    for d in (R["khmer"],):                       # កំហុសពាក្យ (ជាផ្នែកនៃពាក្យក៏បាន · វែង → ខ្លី)
        for o in sorted(d, key=len, reverse=True):
            seg = seg.replace(o, d[o])
    for d in (R["names"], R["places"]):
        for o in sorted(d, key=len, reverse=True):
            if re.match(r"^[A-Za-z ]+$", o):
                seg = re.sub(r"(?<![A-Za-z])" + re.escape(o) + r"(?![A-Za-z])", d[o], seg)
            else:
                seg = kh_replace(seg, o, d[o])
    for o in sorted(R["english"], key=len, reverse=True):
        seg = re.sub(r"(?<![A-Za-z])" + re.escape(o) + r"(?![A-Za-z])", R["english"][o], seg)
    seg = re.sub(r"[ \t]{2,}", " ", seg)
    return seg


# ---------- រូបមន្ត $…$ ----------
FUN = r"(?<![\\A-Za-z])(sin|cos|tan|cot|ln|log|lim|exp|max|min)(?![A-Za-z])"


def fix_math(m, decimal_comma=False):
    dd = m.startswith("$$")
    k = 2 if dd else 1
    body = m[k:-k]
    b = body.strip() if not dd else body
    b = re.sub(FUN, r"\\\1", b)                                               # sin x → \sin x
    b = re.sub(r"\\log_\{?e\}?(?![A-Za-z0-9])", r"\\ln", b)                  # log មូលដ្ឋាន e → ln
    b = re.sub(r"\\vec\{([A-Z]{2})\}", r"\\overrightarrow{\1}", b)            # វ៉ិចទ័រពីរចំណុច
    b = re.sub(r"\\vec\s+([A-Z])([A-Z])(?![A-Za-z])", r"\\overrightarrow{\1\2}", b)
    b = re.sub(r"(?<!\^)(?<=[\w)}\]])\s*\*\s*(?=[\w(\\{\[])", r" \\times ", b)  # * → ×
    b = b.replace("<=", r"\le ").replace(">=", r"\ge ").replace("!=", r"\ne ").replace("->", r"\to ")
    b = b.replace("≤", r"\le ").replace("≥", r"\ge ").replace("≠", r"\ne ").replace("×", r"\times ")
    b = re.sub(r"\s*°", r"^{\\circ}", b)
    if decimal_comma:
        b = re.sub(r"(?<=\d)\.(?=\d)", "{,}", b)
    b = re.sub(r"(\\(?:le|ge|ne|to|times)) +(?=[\s}$)])", r"\1", b)
    b = re.sub(r"[ ]{2,}", " ", b)
    if not dd:
        b = b.strip()
    return ("$$" if dd else "$") + b + ("$$" if dd else "$")


def fix_field(s, R, dc=False):
    if not isinstance(s, str) or not s:
        return s
    s = unicodedata.normalize("NFC", s)
    s = re.sub(r"\\\((.+?)\\\)", lambda x: "$" + x.group(1) + "$", s, flags=re.S)   # \( \) → $ $
    out, i = [], 0
    for mm in MATH.finditer(s):
        out.append(fix_text(s[i:mm.start()], R)); out.append(fix_math(mm.group(0), dc)); i = mm.end()
    out.append(fix_text(s[i:], R))
    return "".join(out)


def flags_of(s, R):
    if not isinstance(s, str):
        return []
    f = []
    plain = MATH.sub(" ", s)
    if s.replace("$$", "").count("$") % 2:
        f.append("$ មិនគូ")
    for w in R["flag"]:
        if w.lower() in plain.lower():
            f.append("ខ្នាត/រូបិយប័ណ្ណ «" + w + "» ត្រូវបំប្លែងលេខដោយដៃ")
    if re.search(r"[A-Za-z]{4,}", plain):
        f.append("មានពាក្យអង់គ្លេសនៅសល់")
    for mm in MATH.finditer(s):
        if KH_LETTER.search(mm.group(0)) and r"\text" not in mm.group(0):
            f.append("អក្សរខ្មែរនៅក្នុង $…$"); break
    return f


def same_numbers(a, b):
    return DIGITS.findall(a or "") == DIGITS.findall(b or "")


def plan(doc, R, dc=False):
    """→ (changes {field: (old,new)}, flags) · ch = បញ្ជី · a មិនប៉ះ"""
    ch, fl = {}, []
    for f in ("q", "sl"):
        v = doc.get(f)
        if isinstance(v, str) and v:
            n = fix_field(v, R, dc)
            if n != v:
                if same_numbers(v, n):
                    ch[f] = (v, n)
                else:
                    fl.append(f + ": លេខប្រែប្រួល → មិនកែ")
            fl += [f + ": " + x for x in flags_of(ch.get(f, (v, v))[1], R)]
    if isinstance(doc.get("ch"), list):
        old = doc["ch"]; new = []
        for i, c in enumerate(old):
            n = fix_field(c, R, dc) if isinstance(c, str) else c
            if n != c and not same_numbers(c, n):
                fl.append("ch[%d]: លេខប្រែប្រួល → មិនកែ" % i); n = c
            new.append(n)
            fl += ["ch[%d]: %s" % (i, x) for x in flags_of(n, R)]
        if new != old:
            if len(new) != len(old):
                raise AssertionError("ch length")
            ch["ch"] = (old, new)
    return ch, fl


# ---------- Firestore ----------
def db_client(key):
    if not os.path.exists(key):
        sys.exit("❌ រកមិនឃើញ Key៖ %s\n   Firebase Console › ⚙️ Project settings › Service accounts › «Generate new private key»\n   រក្សាទុកជា firebase-admin-key.json ក្នុងថតគម្រោង (មាននៅក្នុង .gitignore រួចហើយ · កុំ commit)" % key)
    import firebase_admin
    from firebase_admin import credentials, firestore
    firebase_admin.initialize_app(credentials.Certificate(key), {"projectId": PROJECT})
    return firestore.client(), firestore


def load_docs(a):
    if a.file:
        with open(a.file, encoding="utf-8") as f:
            d = json.load(f)
        docs = d.get("qbq", d) if isinstance(d, dict) else d
        if isinstance(docs, dict):
            docs = [dict(v, _id=k) for k, v in docs.items()]
        return None, None, [dict(x, _id=x.get("_id") or x.get("id")) for x in docs]
    db, fs = db_client(a.key)
    q = db.collection("qbq")
    if a.grade:
        q = q.where("g", "==", int(a.grade))
    if a.owner:
        q = q.where("o", "==", a.owner)
    return db, fs, [dict(s.to_dict(), _id=s.id) for s in q.stream()]


def show(v):
    return json.dumps(v, ensure_ascii=False) if isinstance(v, list) else v


def main():
    p = argparse.ArgumentParser(description="កែលំហាត់ក្នុងធនាគារ (qbq) ឱ្យត្រូវបរិបទកម្ពុជា + LaTeX")
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--dry-run", action="store_true"); g.add_argument("--apply", action="store_true")
    g.add_argument("--restore"); g.add_argument("--selftest", action="store_true")
    p.add_argument("--grade"); p.add_argument("--owner"); p.add_argument("--decimal-comma", action="store_true")
    p.add_argument("--key", default=DEF_KEY); p.add_argument("--file"); p.add_argument("--limit", type=int, default=0)
    p.add_argument("--quiet", action="store_true", help="dry-run៖ បង្ហាញតែសរុប")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if a.restore:
        return restore(a)
    R = load_rules()
    db, fs, docs = load_docs(a)
    todo, nflag = [], 0
    for d in docs:
        c, fl = plan(d, R, a.decimal_comma)
        if fl:
            nflag += 1
        if c or (fl and not a.quiet and a.dry_run):
            todo.append((d, c, fl))
    chg = [x for x in todo if x[1]]
    if a.limit:
        chg = chg[:a.limit]
    for d, c, fl in todo if a.dry_run else chg:
        if a.dry_run and a.quiet:
            break
        print("━━ %s · ថ្នាក់ %s · មេរៀន %s · %s" % (d["_id"], d.get("g", "?"), d.get("ls", "?"), d.get("t", "?")))
        for f, (o, n) in c.items():
            print("  [%s]\n   - %s\n   + %s" % (f, show(o), show(n)))
        for x in fl:
            print("   ⚠️ " + x)
    print("\nសរុប៖ %d លំហាត់ · ត្រូវកែ %d · ⚠️ ពិនិត្យដោយដៃ %d" % (len(docs), len(chg), nflag))
    if a.dry_run or not chg:
        if a.dry_run:
            print("👉 ពិនិត្យរួច រត់ --apply ដើម្បីរក្សាទុក (មិនទាន់សរសេរអ្វីទេ)")
        return
    if db is None:
        sys.exit("❌ --apply ជាមួយ --file មិនសរសេរ DB ទេ")
    bk = os.path.join(ROOT, "tools", "localize_backup_%s.json" % time.strftime("%Y%m%d_%H%M%S"))
    with open(bk, "w", encoding="utf-8") as f:
        json.dump({d["_id"]: {k: d.get(k) for k in list(c) + ["ub", "u"]} for d, c, _ in chg}, f, ensure_ascii=False, indent=1)
    os.chmod(bk, 0o600)
    print("💾 បម្រុងទុក៖ " + os.path.relpath(bk, ROOT))
    ok = skip = 0
    from google.cloud.firestore_v1 import transactional
    for d, c, _ in chg:
        ref = db.collection("qbq").document(d["_id"])

        @transactional
        def run(tx):
            cur = ref.get(transaction=tx).to_dict() or {}
            if any(cur.get(f) != o for f, (o, n) in c.items()):
                return False                      # គ្រូកែក្រោយ dry-run → រំលង
            up = {f: n for f, (o, n) in c.items()}
            up["ub"] = BY; up["u"] = time.strftime("%Y-%m-%dT%H:%M:%S")
            tx.update(ref, up)
            return True
        if run(db.transaction()):
            ok += 1
        else:
            skip += 1
    print("✅ បានកែ %d · រំលង %d (ត្រូវបានកែក្រោយ dry-run → រត់ --dry-run ម្ដងទៀត)" % (ok, skip))


def restore(a):
    with open(a.restore, encoding="utf-8") as f:
        B = json.load(f)
    db, fs = db_client(a.key)
    for k, v in B.items():
        db.collection("qbq").document(k).update({f: (x if x is not None else fs.DELETE_FIELD) for f, x in v.items()})
    print("↩️ បានត្រឡប់ %d លំហាត់" % len(B))


def selftest():
    R = load_rules()
    bad = 0
    cases = [
        ("ចន មាន $5$ ផ្លែ។", "សុខា មាន $5$ ផ្លែ។"),
        ("ចន្ទា មានសៀវភៅ", "ចន្ទា មានសៀវភៅ"),                       # ចន ក្នុង ចន្ទា មិនប៉ះ
        ("John went to New York", "សុខា went to ភ្នំពេញ"),
        ("Find $ x $ if $log_e x=2$", "រក $x$ if $\\ln x=2$"),
        ("$\\vec{AB}+\\vec{u}$", "$\\overrightarrow{AB}+\\vec{u}$"),
        ("$2*3 = sin x$", "$2 \\times 3 = \\sin x$"),
        ("$\\sin x$ និង $\\arcsin x$", "$\\sin x$ និង $\\arcsin x$"),
        ("$x>=2$ និង $x<=5$", "$x\\ge 2$ និង $x\\le 5$"),
        ("$z^*$", "$z^*$"),
        ("\\(a^2\\)", "$a^2$"),
        ("រកផ្ទៃក្រឡាត្រីកោណ", "រកក្រឡាផ្ទៃត្រីកោណ"),
        ("$$\\int_0^1 x\\,dx$$", "$$\\int_0^1 x\\,dx$$"),
        ("$60°$", "$60^{\\circ}$"),
    ]
    for i, o in cases:
        n = fix_field(i, R)
        if n != o:
            bad += 1; print("✗", repr(i), "→", repr(n), "≠", repr(o))
    if fix_field("$2.5$", R, True) != "$2{,}5$":
        bad += 1; print("✗ decimal comma")
    d = {"q": "John មាន $5$ ដុល្លារ", "ch": ["$log_e 2$", "$2.5$", "", "x"], "a": 1, "t": "mc"}
    c, fl = plan(d, R)
    if "a" in c or c["ch"][1][0] != "$\\ln 2$" or len(c["ch"][1]) != 4 or not any("ដុល្លារ" in x for x in fl):
        bad += 1; print("✗ plan", c, fl)
    if not any("មិនគូ" in x for x in flags_of("$x+1", R)):
        bad += 1; print("✗ unbalanced")
    # លេខមិនប្រែ
    for i, _ in cases:
        if not same_numbers(i, fix_field(i, R)):
            bad += 1; print("✗ digits", i)
    print("localize: cases %d bad %d" % (len(cases) + 4, bad))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
