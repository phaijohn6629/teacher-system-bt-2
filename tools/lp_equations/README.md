# lp_equations — recover pictured equations in the lesson-plan .docx files

Why: `lp7.js … lp11.js` were converted from NGS .docx; equations stored as WMF pictures (not MathType/OMML)
used to become `$\square$`. These tools turn them back into KaTeX.

Pipeline (per grade; the grade scripts `ext*.py / run*.py / wjs*.py` that build `plansN.json` are not kept in git):
1. `ex11.py` (patched) emits `\sq{<sha1[:10]>}` for every pictured equation and writes a registry `sqN.json` {hash:[docx, media path]}.
2. `review.py sqN.json <docx dir>` → `sqN_auto.json` {hash:{t:latex, f:flags, e:ext}} using `wmf.py` (WMF parser) + `w2l.py`
   (glyph positions → LaTeX: fractions, radicals, sup/sub, rows, overline, vec, ℕ ℝ, big brackets). Also writes
   side-by-side montages (`rv/*.png`: original | KaTeX) for visual review (`SEL=cx2|rows|chg`).
3. `resolve.py in.js out.js sqN_auto.json sqN.json <docx dir> [manual.json]` replaces tokens by LaTeX; PNG pictures become
   `⟦img:hash⟧` + `window.LP_IMG` (downscaled with `sips`; rendered by `lpTx()` in script.js); empty MathType boxes stay `$\square$`.
   Manual overrides = `{hash: latex}`.
`docole.py` = .doc (OLE) reader for MathType objects; it could not link a field to its ObjectPool storage, so legacy .doc
lessons (grade 8 lessons 2 and 3#1, grade 7 lesson 21) still contain `$\square$`.
