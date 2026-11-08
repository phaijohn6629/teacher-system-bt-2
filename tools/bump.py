#!/usr/bin/env python3
"""🔢 ដំឡើងលេខកំណែ ?v= ដោយស្វ័យប្រវត្តិ (cache-busting)

ស្កេន *.html និង *.js រកការយោង «ឈ្មោះ.js?v=N» / «ឈ្មោះ.css?v=N»។
បើខ្លឹមសារឯកសារណាផ្លាស់ប្ដូរ (ធៀបនឹង tools/versions.json) → ដំឡើង N នៅគ្រប់កន្លែងដែលយោង។
ធ្វើម្ដងទៀតរហូតស្ងប់ (ឧ. practiceen4.js ប្ដូរ → exam.js ប្ដូរ → index.html ប្ដូរ)។

ប្រើ (ពីថតគម្រោង)៖
  python3 tools/bump.py           ដំឡើងលេខកំណែ ហើយរក្សាទុក
  python3 tools/bump.py --check   ពិនិត្យតែប៉ុណ្ណោះ (exit 1 បើត្រូវដំឡើង ឬលេខមិនដូចគ្នា)
  python3 tools/bump.py --init    កត់ត្រាស្ថានភាពបច្ចុប្បន្ន (មិនប្ដូរអ្វី)
"""
import hashlib, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STORE = os.path.join(ROOT, "tools", "versions.json")
REF = re.compile(r'(?<![A-Za-z0-9_\-./])([A-Za-z0-9_\-]+\.(?:js|css))\?v=(\d+)')


def texts():
    return sorted(f for f in os.listdir(ROOT) if f.endswith((".html", ".js")) and os.path.isfile(os.path.join(ROOT, f)))


def read(f):
    with open(os.path.join(ROOT, f), encoding="utf-8") as h:
        return h.read()


def sha(f):
    return hashlib.sha1(read(f).encode("utf-8")).hexdigest()


def refs():
    """{ឯកសារដែលត្រូវយោង: {លេខកំណែ,...}}"""
    r = {}
    for f in texts():
        for m in REF.finditer(read(f)):
            if os.path.isfile(os.path.join(ROOT, m.group(1))):
                r.setdefault(m.group(1), set()).add(int(m.group(2)))
    return r


def setv(name, v):
    pat = re.compile(r'(?<![A-Za-z0-9_\-./])' + re.escape(name) + r'\?v=\d+')
    for f in texts():
        s = read(f)
        t = pat.sub(name + "?v=" + str(v), s)
        if t != s:
            with open(os.path.join(ROOT, f), "w", encoding="utf-8") as h:
                h.write(t)


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    store = json.load(open(STORE, encoding="utf-8")) if os.path.isfile(STORE) else {}
    if mode == "--init" or not store:
        store = {n: {"hash": sha(n), "v": max(vs)} for n, vs in refs().items()}
        json.dump(store, open(STORE, "w", encoding="utf-8"), indent=1, sort_keys=True, ensure_ascii=False)
        print("init: recorded", len(store), "files")
        return 0
    need = []
    for n, vs in refs().items():
        if len(vs) > 1:
            need.append((n, "mixed " + ",".join(map(str, sorted(vs)))))
        elif n not in store or store[n]["hash"] != sha(n):
            need.append((n, "changed"))
    if mode == "--check":
        for n, why in need:
            print("needs bump:", n, why)
        return 1 if need else 0
    bumped = []
    for _ in range(10):
        changed = False
        for n, vs in sorted(refs().items()):
            old = store.get(n)
            if len(vs) == 1 and old and old["hash"] == sha(n):
                continue
            v = max(max(vs), old["v"] if old else 0) + (0 if old and old["hash"] == sha(n) else 1)
            setv(n, v)
            store[n] = {"hash": sha(n), "v": v}
            bumped.append(n + "?v=" + str(v))
            changed = True
        if not changed:
            break
    for n in refs():  # hash ចុងក្រោយ (ក្រោយការជំនួសទាំងអស់)
        store[n] = {"hash": sha(n), "v": max(refs()[n])}
    json.dump(store, open(STORE, "w", encoding="utf-8"), indent=1, sort_keys=True, ensure_ascii=False)
    print("bumped:", ", ".join(bumped) if bumped else "nothing")
    return 0


if __name__ == "__main__":
    sys.exit(main())
