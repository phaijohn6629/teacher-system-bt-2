# lp_check — print/pagination audit of every lesson plan (headless Chrome)

`python3 mkh.py batch drv.js harness.html` builds a page from the real `index.html` section p21 + the lp-code of `script.js`;
`run1.sh ""` renders every plan (45 and 90 min) and reports: sheets, rows cut at the sheet bottom, cells overflowing,
KaTeX errors, remaining `\square`. `pchk.sh "<key>" 90` prints a plan to PDF (`--print-to-pdf`); `pdfcheck.py` compares the
PDF page count with the sheets and flags empty pages / text at the bottom edge (PyMuPDF). Paths inside are for the
scratch directory used when written — adjust `R`, `katex/` before reuse.
