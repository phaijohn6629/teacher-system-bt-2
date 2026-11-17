Perform a full autonomous health check and version sync on `Teacher_System`:
1. Verify scoring correctness, read-only (do NOT modify scoring code): in `expaper.js`/`exam.js` check that `EXP.total(E)` is still the sum of each section's `pts` (missing = 0); in `monthly.js` check that `maxes(c)` is still `T = rs.mx[parseInt(c.n)] || 100` with `a/t/h/b/c/o = T*W.x` and `act = T*(W.a+W.t+W.h+W.b)`, and that `scaleC()` still guards against dividing by zero. Report any difference from CLAUDE.md rule 2; never add 25/20-point caps unless the user asks.
2. Check `git status` and `git diff` for any modified `.js` or `.css` files.
3. If any frontend assets were modified, run `python3 tools/bump.py` (bumps `?v=` in the HTML files), run `./tests/run.sh` (all lines `bad 0`), and increment the cache name `C` in `sw.js`.
4. Report a concise summary of findings and fixes in Khmer.
