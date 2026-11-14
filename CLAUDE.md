# Teacher System

## Project Structure & Rules
- **Frameworks**: Firebase (Firestore, Auth), Service Worker (PWA). Hosted on GitHub Pages (`main` branch = live site).

## File Map & Architecture

| File | Purpose (English) | Description (Khmer) |
| :--- | :--- | :--- |
| `script.js` | App logic & Auth | គ្រប់គ្រង Firebase Auth និងតក្កវិជ្ជាមេនៃកម្មវិធី |
| `sched.js` | Schedule & Timesheet | គ្រប់គ្រងកាលវិភាគ និងតារាងម៉ោងបង្រៀន |
| `monitor.js` | Class Monitoring & Sync | គ្រប់គ្រងគណនីប្រធានថ្នាក់ និងការ Sync ទិន្នន័យថ្នាក់ (`mc`) |
| `classorg.js` | Class structure & seat plan | រចនាសម្ព័ន្ធថ្នាក់ · ប្លង់តុ · វិញ្ញាសា ក/ខ តាមកៅអី · ចាប់ក្រុម 3D · ចាប់រើសតុ/សិស្ស |
| `monthly.js` | Monthly scores | ពិន្ទុប្រចាំខែ (តេស្ត ១/២ ស្វ័យប្រវត្តិ + វាយដោយដៃ) |
| `quiz.js` | Quiz builder (teacher side) | បង្កើតតេស្ត · ធនាគារលំហាត់ · លទ្ធផលតេស្ត |
| `test.html` | Quiz page (student side) | ទំព័រសិស្សធ្វើតេស្ត (ជ្រើសចម្លើយ · ផ្ញើ) |
| `exam.js` | Exam builder (teacher side) | បង្កើតវិញ្ញាសាប្រឡង · វិញ្ញាសា ក/ខ · បើកប្រឡងអនឡាញ |
| `exam.html` | Online exam page (student side) | ទំព័រសិស្សមើលវិញ្ញាសា (សរសេរចម្លើយលើក្រដាស) |
| `expaper.js` | Exam paper renderer | បង្ហាញ/បោះពុម្ពវិញ្ញាសា (ប្រើទាំង exam.js និង exam.html) |
| `hub.js` | Practice learning hub (Flipped Classroom) | ផ្ទាំងសិក្សាពីលើលំហាត់៖ មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ តាមចំណុចរង + មាតិកាគំរូថ្នាក់ទី៩ |
| `lessons.js` / `lessonedit.js` | Slide lessons + teacher CMS | មេរៀនសង្ខេបជាស្លាយ (ផ្ទាំង p20) · កម្មវិធីកែរបស់គ្រូ (រួមទាំង «🎓 ផ្ទាំងសិក្សាហ្វឹកហាត់») |
| `practice*.js` | Question generators per grade | ម៉ាស៊ីនបង្កើតលំហាត់តាមថ្នាក់ (ប្រើទាំងទំព័រហ្វឹកហាត់ និងវិញ្ញាសា) |
| `exgen.js` | Cambodian-format exam templates | គំរូលំហាត់ប្រឡងទម្រង់កម្ពុជា (BacII · ឌីប្លូម) |
| `att.js` | Attendance logic | គ្រប់គ្រងការចុះវត្តមាន |
| `meetings.js` | Meeting minutes / PLC | កំណត់ហេតុប្រជុំ និង PLC |
| `lsguard.js` | Browser storage guard | ការពារ localStorage/sessionStorage ពេញ (សម្អាតស្វ័យប្រវត្តិ · TTL) — គ្រប់ទំព័រ |
| `storeadm.js` | Storage panel in ⚙️ Settings | ទំហំផ្ទុកឧបករណ៍ · ចំនួន/ទំហំឯកសារ Firestore · សម្អាតតេស្តចាស់ (Admin) |
| `tools/upload_youtube.py` | Manim → YouTube uploader | បង្ហោះវីដេអូទៅ Channel «Rean-Maths» ហើយភ្ជាប់តំណទៅ `hub.js` (`VIDEOS`) |
| `tools/localize_mcq.py` | Bank localizer (Khmer context + LaTeX) | កែលំហាត់ qbq ឱ្យត្រូវបរិបទកម្ពុជា + ជួសជុល LaTeX (`--dry-run` → `--apply` · `--restore`) · ច្បាប់ក្នុង `tools/localize_rules.json` |
| `sw.js` | PWA Service Worker | គ្រប់គ្រង Cache សម្រាប់ PWA ដើម្បីបើកលឿន |
| `index.html` | Main Entry Point | ទំព័រមេសម្រាប់ផ្ទុក UI និងហៅដំណើរការកម្មវិធី |

## Rules
- `tools/localize_mcq.py` needs `firebase-admin-key.json` (Service Account, gitignored). It edits only `q`/`ch`/`sl`, never `a` or choice order; a field whose digits would change is skipped. Currency or units that need number conversion are only flagged. `--apply` writes a backup in `tools/localize_backup_*.json` (gitignored) and uses one transaction per doc (`tx.update`, `ub=AUTO-KH`).
- Use `tx.update` for Firestore updates to avoid overwriting existing fields (crucial for supporting new data).
- Use Firebase transactions for any write operations on shared data (e.g., `mc` collection).
- Before every push: run `python3 tools/bump.py` (bumps `?v=` for changed JS/CSS) and `./tests/run.sh` (all lines must be `bad 0`), then bump the cache name `C` in `sw.js`.
- Exam/practice generators are lazy-loaded: their `?v=` lives inside `exam.js` (`bump.py` handles it).
- Question generators: `G[lesson][level]()` returns `{q, a:[A(v,tex,kind,label)], s, fig, kd}`. Every template must have a unique `kd`, because the exam engine detects repeats by `kd`. Build the answer first, then derive the data from it.
  - Grades 7–12: add forms with `vx(lesson, level, [fn…])`. In `practice.js`, which holds grade 12 and the shared core, use `vx12`/`K12`. `kd` prefixes: `s7_`, `s8_`, `n_` (grade 9), `s10_`, `s11_`, and `t…_` for grade 12. Base templates are auto-labeled `kd = b{lesson}_{level}`. `tests/practice.js` fails if any grade 7–12 lesson×level has fewer than 4 forms.
  - Grade 12 lives in `practice.js`; there is no `practice12.js`.
  - Grade 10 logic items answer `1` = true, `0` = false.
  - Never write a retry loop that can fail to terminate (e.g. waiting for a perfect square or a divisor that may not exist). Pick the answer first and derive the data from it.
  - Grade 9 probability: multiplication rule only (no combinations).
  - **Level keys (5 levels + PISA):** internal keys stay `1,2,3,4` so saved exams, trophies and progress remain valid. Display order is `LVO=[1,5,2,6,3,4]`: key 1 = Level 1 (basics), **5 = Level 2** (2 steps), 2 = Level 3 (medium), **6 = Level 4** (brackets/fractions), 3 = Level 5 (hard), 4 = 🌐 PISA. Never renumber.
  - `fill56()` in `practice.js` back-fills missing keys 5/6 from neighbouring levels (5 ← 1|2, 6 ← 2|3) for every grade registered via `X.reg`. A grade with its own content defines `G[l][5]`/`G[l][6]` before `X.reg`, and fill56 then leaves them alone.
  - Grade 9 new forms use `kd` prefixes `g9_` and `g9p_` (PISA). Levels 2/4 are set with `lvset(l,5|6,[fn…])`. `tests/practice.js` fails if any grade 9 lesson×level (all 6) has fewer than 6 forms.
- Anything rendered from `script.js` `refreshView()` (called on every cloud snapshot) must be idempotent: never rebuild a view that is already showing the same data, or open selects close and previews flicker.
- Security:
  - Every user-supplied image `src` (signatures, student photos, question images, lesson images) goes through `safeSrc()` (script.js), which accepts only `data:image/…;base64` or quote-free `https://`.
  - Text goes through `esc()`. Never put user data in `innerHTML` raw.
  - Monitor passwords live in `mcp/{k}` (owner/Admin only), never in `mc`.
  - Every page has a CSP `<meta>` (GitHub Pages can't send headers). When adding an external script, iframe or fetch host, add it to the CSP of the page that uses it.
- **Secrets never go to git:** `client_secrets.json`, `client_secret*.json` and `token.json` (YouTube OAuth) are in `.gitignore`. Never `git add -f` them, never print their contents, and check `git status` before committing.
- Storage: write large or optional browser caches through `LSG.set(storage,k,v)` (`lsguard.js`), which frees caches and retries when the quota is full. Never delete `pend_*` (unsent answers), `firebase:*` or settings.
- `firestore.rules` is **not** deployed by git push: after changing it, an Admin must paste it into Firebase Console → Firestore → Rules → Publish.
- Student pages (`test.html`, `exam.html`) use Firestore **Lite**, which has no timeout of its own: wrap every call with `to(promise, ms)` / `retry()`.

## Current State (up to date as of 2026-11-14 · `sw.js` cache = `ngs-app-v36`)

### ✅ Seat plan (ប្លង់តុ) — `classorg.js`
- The «🪑 ប្លង់តុ» tab renders correctly. The old crash came from seat plans saved without `abMap`. `seat()` now adds it when missing.
- The seat view shows the blackboard, ក/ខ badges, «🎲 ចាប់ក្រុម 3D» (shuffled group cards) and «👆 ចាប់រើសតុ/សិស្ស».
- `monitor.js` `seatSig()` compares only layout and seat order, so re-derived data doesn't log a false «បានរៀបកៅអីឡើងវិញ».

### ✅ Exam papers ក/ខ (A/B) — `classorg.js` → `exam.js` → `exam.html`
- `abMap` is derived from seat position in a checkerboard (`abOf`/`syncAB`): students next to each other (left/right and front/back) always get different papers. It is re-synced on shuffle, layout change, clear and manual moves.
- `exam.js` `abFor()` assigns each student's paper: `abMap` first, then seat index, then alternating by roll number. `pub()` publishes paper ខ (`itB`/`instB`) when `E.ab`.
- `exam.html` renders paper ខ for students assigned ខ.

### ✅ Seat/student picker speed — `classorg.js`
- `animatePointer()` picks the winner up front, makes 12 hops with ease-out pacing (~1.6 s), then plays a win chime and fires confetti. A guard prevents overlapping runs.
- ✅ Spotlight card (`showSpotlight`): a centered card shows the photo or initial, the large name, seat number, paper ក/ខ and role. «🔄 ចាប់ម្ដងទៀត» picks again from students not yet chosen (reset when everyone has been picked or the class changes). Esc, ✓ or a backdrop click closes it. Colours come from theme variables, and it fits a 390 px phone.

### ✅ Monthly scores Test 1 / Test 2 — `monthly.js`
- The t1/t2 cells (and their full-score cells) are editable inputs. Auto-sync from quizzes still works.
- Manual entries set `r.t1m`/`r.t2m` (full score: `R.fm`). `syncTests` skips these cells, so it never overwrites them. Clearing a cell returns it to auto.
- Auto and manual values go through the same `calc()` for average, total and grade.

### ✅ Refresh protection on student pages — `test.html`, `exam.html`, `sw.js`
- On refresh, the page resumes instantly from localStorage (cached test/paper plus saved answers and start time) without waiting for Firestore. Checks for closed / already sent / time changes run in the background.
- Every Firestore call has a timeout plus auto-retry. A timed-out write that later gets `permission-denied` is treated as our own write.
- `try/catch` around render, global error handlers, and a 12 s boot watchdog that shows a reload button.
- `test.html`: on auto-resume, a «👤 មិនមែន …? ប្ដូរឈ្មោះ» link lets another student use a shared device.
- `sw.js`: HTML is network-first with a 3.5 s timeout, then falls back to cache (`ignoreSearch`, so `?t=`/`?e=` links work offline).

### ✅ Monitor sync & data safety — `monitor.js`
- `tWrite` uses `tx.update`, and adds `acc` when a legacy `mc` doc lacks it (otherwise those docs were rewritten on every sync).
- `r00` is included in `buildT` and `teachApply`, so it persists across syncs.

### ✅ Exam editor stable during cloud sync — `exam.js`
- `EXAM.render()` is a no-op while the same exam's editor is on screen (`data-exid` marker), and `prev()` skips unchanged HTML. Before this fix, every sync rebuilt the editor: open selects closed and the preview flickered. Verified in headless Chrome.

### ✅ Audit fixes of 2026-11-13
- `meetings.js`: the recorder signature is restored on every meeting type (AU and joint meetings had lost it).
- `script.js`: a blocking alert is shown before a forced logout.
- `exam.js`: `mkItem` avoids duplicates against the session history plus the items already in the section.
- `exgen.js`: dead code removed.
- Picker modal uses the scoped `.pk-modal` class and is readable in dark mode.

### ✅ YouTube uploader for Manim videos — `tools/upload_youtube.py`, `hub.js`
- Setup is done once: `.venv` (google-api-python-client, google-auth-oauthlib, google-auth-httplib2) and the OAuth client `client_secrets.json` (Desktop app). Run `.venv/bin/python tools/upload_youtube.py --auth-only` to log in; the browser opens, and you must choose the **Rean-Maths** brand account. This writes `token.json` (mode 600, auto-refresh).
- Usage (from the project root):
  - `.venv/bin/python tools/upload_youtube.py` uploads the newest `.mp4` in `/Users/phaijohn/Desktop/ReanMath_Videos` as **unlisted**.
  - `--file X.mp4 --title "…" --desc "…" --privacy public --grade 9 --lesson 1 --topic 1.2` uploads, prints `https://youtu.be/…`, and writes `VIDEOS["9_1_1"]` into `hub.js`.
  - `--topic`: a 1-based index, or a heading number such as `1.2`/`១.២` matched against the starter titles. Without it, a new «🎬 title» sub-topic is appended.
  - `--link https://youtu.be/… --grade … --lesson … [--topic …]` attaches an existing video without uploading. `--dry-run` previews.
  - `--level 1|2|3|4|5|pisa|all` (default `all`) stores `lv` in the `VIDEOS` entry. Level names map to internal keys (1→1, 2→5, 3→2, 4→6, 5→3, pisa→4). A level-specific video always becomes its own «🎬» sub-topic with `lv:[key]`, shown **only** at that level (never attached into an existing sub-topic).
  - In `hub.js`, `lvVid()` marks a video-only sub-topic that has `lv`. `pickSubs` keeps those out of other levels: PISA shows all content plus PISA videos only, and the fallback when nothing matches excludes other levels' videos. The PISA modelling card still appears. Old entries without `lv` = all levels.
  - Duplicate guard (`find_dup`, checked before login/upload so no quota is spent): the same `.mp4` filename, title or link already logged in `tools/youtube_uploads.json` (old entries derive `g`/`l` from `hub`) or present in `VIDEOS` for the same grade+lesson+level is skipped with a notice. Without `--grade`, any previous upload of the same file or title is skipped. Override with `--force`.
  - `--playlist "name"` adds the uploaded video to that playlist: it finds the playlist by exact title or creates it (`--playlist-privacy`, default unlisted), and skips videos already in it.
  - `--playlist "name" --add URL1,URL2,…` adds existing videos in the given order without uploading.
  - Scopes are `youtube.upload` + `youtube.force-ssl` (playlists, video edits). An older `token.json` without them is deleted automatically and asks for login again.
  - Playlist «លីមីតនៃអនុគមន៍ - ថ្នាក់ទី១២» = https://www.youtube.com/playlist?list=PLEGSjUxJctik (unlisted, 11 videos: exp → log lessons, 1^∞, trig tip, then practice). A newly created playlist can return 404 on `playlistItems.list` for a few seconds; the script handles this.
- Safety: it refuses to upload if the token's channel name doesn't contain «rean» (prevents posting to the wrong channel). It handles resumable 8 MB chunks with retries, and gives clear messages for a quota limit (~6 uploads/day) or a revoked token. Every upload is logged in `tools/youtube_uploads.json`.
- `hub.js`: `VIDEOS` sits between `@VIDEOS-START`/`@VIDEOS-END` (the only part the script edits). `withVids()` applies it to starter and generic content (also in the teacher editor). A teacher version in Firestore takes priority, and the script warns when `hub/{g}_{l}` exists.
- After a hub change: `python3 tools/bump.py && ./tests/run.sh` (`tests/hub.js` validates every `VIDEOS` key and link), bump `sw.js`, then commit and push.

### ✅ Security audit & storage protection (2026-11-14)
- **Rules (`firestore.rules` — must be published):**
  - `exq` and `timg` `update` now check the **existing** owner. Before, any teacher could overwrite another teacher's live online exam or test images by setting `o` to themselves.
  - Owners can no longer transfer `o` on `exams`/`tests`/`exm`/`pcls`/`tkeys` updates.
  - `subs` (no-login student answers): type and size checks on `t`, `sid`, `at`, `dur` (0–86400), `dv`. They were already create-only (no update/delete), and scores are computed by the teacher from `tkeys`, never sent by students. `test.html` clamps `dur`.
  - `prt`: types for `c`, `k`, `g`.
  - `sig`: `j` must be a string under 500 KB.
  - `timg`: Admin `list` (for cleanup).
- **Monitor passwords:** they were stored in plain text in `mc/{k}.acc`, which class monitors (students) can read, so a monitor could see the vice-monitors' passwords.
  - They now live in `mcp/{k}` = `{o, p:{h,v1,v2}}`, readable only by the owner teacher and Admin. The `mc` rules reject any `pw`.
  - `accTx` writes `mc` and `mcp` in one transaction. Passwords are fetched on demand (👁, copy, change, delete, class rename).
  - Legacy docs migrate automatically when the owner opens the app (`migPw`). If the rules aren't published yet (`permission-denied`), it falls back to the old behaviour.
- **XSS:** 18 places built `<img src='…'>` from user data (signatures, student photos that monitors can edit, question bank images, lesson images, test images in `test.html`). Values like `x' onerror=…` could run script for teachers or Admin; they now go through `safeSrc()`. Names, answers and error logs were already escaped (`esc`/`tx`).
- **Secrets:** none hard-coded. The Firebase `apiKey` is a public identifier; security relies on the rules.
- **CSP** `<meta>` on `index.html`, `practice.html`, `test.html` and `exam.html`:
  - Scripts are allowed only from self, cdnjs, gstatic (Firebase) and Google Sign-in. `'unsafe-inline'` is needed for inline `onclick`; `'unsafe-eval'` only on `index.html`, for html2pdf polyfills.
  - Network: `*.googleapis.com`, gstatic, cdnjs, Google accounts. Frames: YouTube (nocookie), Drive, Google accounts, firebaseapp.
  - `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`. Verified with real network in headless Chrome: 0 violations on all 4 pages.
- **Browser storage (`lsguard.js`):**
  - Student pages never deleted per-test keys, so shared phones accumulated them toward the 5 MB quota. `LSG.sweep(id)` now drops tests or exams not opened for more than 21 days (index `lsT`), but **never** `pend_*` (unsent answers).
  - `LSG.set` frees re-downloadable caches on `QuotaExceededError` (hub → exam content → snapshots → old test copies) and retries.
  - Hub cache TTL is 30 days. The exam content cache is 6 × ≤300 KB. The startup snapshot total is ≤ ~2.6 MB, because sessionStorage also holds the Firebase session.
- **⚙️ Settings → «🗄️ ទំហំផ្ទុក» (`storeadm.js`):**
  - Device usage, with «🧹 សម្អាត cache» (keeps login, settings and unsent answers).
  - Admin only: document counts per collection (`getCountFromServer`, cheap) and «📏 រកឯកសារធំ» (top 12 documents as a % of the 1 MB limit; reads all docs in 14 collections, so it asks first).
  - «🗑️ លុបតេស្តចាស់» deletes closed **general** tests older than N months (default 12), with their `subs`, `st`, `rcpt`, `timg` and `tkeys`. It shows counts and asks first, and never touches tests linked to monthly scores (`kind` t1/t2).
  - «🗑️ លុបកំណត់ត្រាអ្នកមើលប្រឡង» deletes `exv` records of exams that ended more than 30 days ago.
  - Backup (`BKC`) now also includes `mcp`, `hub`, `att` and `exams`.
- Tests: `tests/storage.js` (sweep, quota recovery, TTL, `safeSrc`). Headless check with a fake Firebase as Admin: the cleanup deleted exactly the 6 documents of the old general test and kept the monthly-linked and recent tests.
- **Known limits:**
  - Rules cannot bound the size of each answer inside the `subs.a` map; the 1 MB document limit still applies.
  - `'unsafe-inline'` remains until inline `onclick` handlers are removed.
  - Clickjacking (`frame-ancestors`) can't be set from a `<meta>` on GitHub Pages.

### ✅ «ប្រឡងបើក» list never stuck on «⏳ កំពុងផ្ទុកបញ្ជីវិញ្ញាសា…» — `exam.js`
- **Causes found:**
  - `loadList()` ran `migrate()` first. On a new device (no `exMig2_` flag), that downloaded every exam **with full content** (Admin: the whole `exams` collection, 60 s timeout) before the list query (another 25 s timeout).
  - There was no local cache: every visit and every «‹ វិញ្ញាសាទាំងអស់» (`X.list=null`) refetched the list, and opening an exam always waited for the server.
  - The list was rebuilt on every cloud sync.
- **Fixes (Stale-While-Revalidate):**
  - The list summary is cached (`exList_{id}[_a]`) and the 8 most recently opened or saved exams are cached (`exC_{id}` = `{u,E}`, ≤400 KB, index `exCi`). Storage is localStorage when «ចងចាំខ្ញុំ» is on (`FBPERSIST`), otherwise sessionStorage.
  - `render()` shows the cached list at once, and `refreshList()` refreshes it in the background (once per entry or after 60 s). With no cache, an empty list with «＋ វិញ្ញាសាថ្មី» appears after 3.5 s even if the cloud never answers. `loadList()` waits for `FBREADY` if Firebase isn't ready.
  - `migrate()` now runs in the background **after** the list; if it converted anything, the list reloads.
  - «បើក» opens instantly from `exC_` and checks the cloud in the background. A newer cloud version replaces it only if the teacher hasn't started editing (`X.dirty`). `save()` refreshes the cache, and «back» updates the list locally (`upList`) without refetching.
  - `renderList()` is idempotent (`data-exl` marker + HTML compare).
- Measured in headless Chrome with the real `index.html` and a fake Firebase (40 KB/s, 10 exams ≈ 1.5 MB of content, new device):
  - Old code: the list never appeared within 90 s.
  - New code: list in 0.38 s; reopen after Refresh: list and editor instant. With `exams` never answering, an empty list with the new-exam button appears at 3.8 s.
  - Editor: name/class/level selects work, preview updates, 0 rebuilds across 5 `refreshView()` calls, and the open select keeps its node and value.

### ✅ Fast startup sync (Stale-While-Revalidate + 2 phases) — `script.js`
- **Causes found:**
  - Without «ចងចាំខ្ញុំ», Firestore uses a memory cache, so every open or Refresh waited for the network.
  - The first-load guard rejected empty cache snapshots, so collections that are genuinely empty (e.g. a new teacher's Timesheet, signature, `cx`, `mc`) waited for the server on every open, even on remembered devices.
  - All 13 collections plus every profile photo (`profiles`, large data URLs) were requested at once, competing for bandwidth with the Dashboard data.
  - Every arriving collection triggered a full `refreshView()`.
- **Fixes:**
  - `snapLoad`/`snapSave`: non-remembered sessions keep a per-key snapshot of server-confirmed data in **sessionStorage** (`syS_{uid}_{k}`, ≤1.5 MB per key, cleared on tab close and on logout). It is shown instantly on Refresh. Remembered devices already have the Firestore IndexedDB cache.
  - `syE_{uid}` (localStorage) remembers which subscriptions the server last returned empty; an empty cache snapshot for those is accepted immediately.
  - Two phases: `CRIT=["teachers","tasks","rs","sched","sig","mc"]` (monitor: `mc`) subscribe first. `Promise.allSettled` of their first data races a 3 s timeout, then `phase2()` subscribes the rest plus `subProfiles()`. `show(p)` for any tab other than `p0` starts phase 2 immediately.
  - `applyCloud` uses `refreshSoon()` (one render per frame).
  - The sync indicator is a small «🔄 Sync N» pill at the top-right from 1.5 s (missing data listed in its `title`). The red bar still appears only on real errors, when offline, or after 30 s.
- Writes stay protected by `flush()`: blocked before the first data arrives, and delayed (≤20 s) until server-confirmed. A snapshot shown from cache never causes a write by itself (it becomes `sy.synced`).
- Measured in headless Chrome against the real `index.html` with a fake Firebase (HTTPS-mapped `www.gstatic.com`, shared 40 KB/s link, 300 ms RTT):
  - Refresh in the same session: critical data 600 → 40 ms, all data 6.8 s → 40 ms.
  - Remembered device with empty collections: critical data 580 → 90 ms.
  - A collection that never answers: Dashboard unaffected; small pill instead of the 12 s bar.
  - No spurious writes in any scenario.

### ✅ Practice learning hub (Flipped Classroom) — `hub.js`, `practice.js`, `practice.html`, `lessonedit.js`, `style.css`, `firestore.rules`
- `practice.html`: a collapsible «📚 មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ» panel sits between the level bar and the questions. Each sub-topic is its own `<details>` with 📖 summary, 📐 formula box (KaTeX display), 💡 tips plus worked examples (solution hidden behind «👁»), and 🎬 a video button.
- Sub-topics are filtered by level (`sub.lv`; empty = all levels). 🌐 PISA shows every sub-topic plus a «real life → mathematics» modelling card.
- Open/closed state survives `draw()` (check, 🔄), because `hub.js` stores `toggle` events keyed by `g_l_v_i`.
- Video player (modal): YouTube (→ `youtube-nocookie` embed), Google Drive (→ `/preview`), and https MP4/WebM files. Anything else is rejected (`HUB.vparse`). Inside a `<dialog>` the player mounts in the dialog (top layer).
- **Grade 12 Gold-Standard module** (`S12`, `STARTER={9:S9,12:S12}`), matched to the real forms in `practice.js` `G[22]`/`G[42]`/`G[43]`:
  - 22 limits: direct substitution (L1–2); 0/0 by factoring, conjugate and cube root (L2–4); limits at infinity (L3–4); reference limits sin/e/ln/aˣ (L2–5); ★ 1^∞; ★ advanced trig and change of variable; ★ finding a, b and growth comparison; 🌐 logistic population and continuous interest.
  - 42 exponential: properties (L1–2); equations and inequalities (L2–4); ★ quadratic in eˣ; ★ derivative, tangent and minimum; 🌐 doubling, half-life and interest.
  - 43 logarithm: properties (L1–2); equations and inequalities with domain (L2–5); ★ quadratic in ln x and derivative; 🌐 dB, pH, Richter and doubling time.
  - Exercise-form findings: every exp/ln/trig/1^∞ **limit** exercise lives in 12·22, and 42/43 are equations, inequalities, derivatives and variation. The 11 Rean-Maths videos are therefore placed in 12·22 by the levels where those forms appear: exp lesson L2–3, exp practice L3–4, log lesson and practice, 1^∞, trig tip and trig demo L4–5, exercise 5.1.2 and practice 1–3/3 L5. The exp/log videos are also in 42/43 at L4–5.
  - **Package 2** (31 derivative · 32 applications/variation · 41 rational functions and graphing), matched to the real forms:
    - 31: polynomial/root rules (L1–2); reference functions + linear chain (L2–4); ★ product, quotient, uⁿ, (ax+b)/(cx+d); 🌐 velocity and flow rate.
    - 32: tangent line and velocity (L1–3); variation table and relative extrema (L2–4); ★ optimisation (x+k/x, fixed perimeter, sum→product, closed can r³=V/2π, profit); 🌐 river fence L/4 and open box a/6.
    - 41: asymptotes and domain (L1–3); oblique asymptote by division and N=ad−bc (L2–4); ★ centre of symmetry, intercepts, min of x+k/x and the graphing steps; 🌐 dilution m/(V+x) and average cost → c.
    - Checks: 36 numeric checks of every example (numeric derivative, extremum search, limits) gave 0 wrong. 24 views showed 0 KaTeX errors, 0 raw `$`, and 24/24 practice sets OK.
    - A visual check caught two clipped formulas (fixed perimeter, closed can); they were split or shortened. Keep each formula short enough to fit a half-width box.
  - 12·22 Level 5: the three «លំហាត់អនុវត្តបន្ថែម ១–៣» videos were collapsed into one **playlist** entry (`PLEGSjUxJctik`), so Level 5 went from 9 to 7 items. `HUB.vparse` accepts playlist links (`youtube.com/playlist?list=…` or `watch?…&list=…` without `v`) and embeds them as `videoseries?list=…`.
  - 12·22 one Manim video **per level** (2026-11-14, `12_22_17`…`22`, also appended to the playlist): L1 direct substitution `zKCqsRkwz0c`, L2 0/0 + reference limits `q5SyyPkbzjQ`, L3 mixed medium `7uyN9Jo9TiU`, L4 BacII `b6Yg-zsnHAA`, L5 national/olympiad `4RdfRy2SR50`, PISA real world `nWc9-GoBOkM`. Each shows only at its own level (checked by rendering all 6 levels).
  - `VIDEOS.lv` accepts a list (`"4,5"`) via `vlvKeys()`, and `--level 4,5` in the uploader (normalised order). `youtube_uploads.json` records each video's primary placement plus `also`.
  - Verified: 28 example answers recomputed. In headless Chrome, 3 lessons × 6 levels with every sub-topic open showed 0 KaTeX errors and 0 raw `$`, and 18/18 practice sets still check ✅.
  - Bug found and fixed: titles were plain `"…"` strings, so `\f`/`\i`/`\l` were lost (`\frac` turned into a form-feed). `tests/hub.js` now fails on control characters or LaTeX words missing `\` (verified by injecting both mistakes). **Write sub-topic titles that contain LaTeX as `"…\\frac…"` or use `R\`…\``.**
- Grade 9 starter content was completed on 2026-11-14 with sub-topics appended at the **end** of each lesson through `add9(l,[…])`, so existing sub-topic indices and `VIDEOS` keys stay stable:
  - `AD(…)` «★ កម្រិត ៤–៥» (`lv` = Level 4/5) in 11 lessons, filling gaps found by comparing the hub with the real L4/L5 forms: successive % / 3-part ratio / average speed; $x^2+y^2$ from $x+y$, $xy$; median from a frequency table and corrected mean; two-dice sums; triangle area from coordinates; collinearity and perpendicular bisector; digit problems and no-solution systems; two circles and the tangential quadrilateral; sector arc and area; Pythagoras with leg sums; hexagon apothem and area, interior:exterior ratio; volume formulas and melting; sin/cos via tan.
  - `PZ(…)` «🌐 ជីវិតពិត» (`lv` = PISA) in all 18 lessons, with worked examples matching the actual PISA forms (promotions, tax on the excess, plans, lifts, surveys, salary median, traffic lights, maps and Wi-Fi, linear models, wheels and circumference, clock angles, shadows and mirrors, scale models, kites and elevation with eye height). A lesson PISA sub-topic replaces the generic modelling card, and its tips start with the modelling steps.
  - Lesson 4.2 (fraction equations) is now also shown at Level 5.
  - Verified: all 31 example answers recomputed. In headless Chrome, all 18 lessons × 6 levels with every sub-topic open showed 0 KaTeX errors and 0 unrendered `$`. 🌐 appears only in PISA; ★ appears in Level 4/5 (and in PISA, which by design shows all of the lesson's concept sub-topics).
  - `tools/upload_youtube.py` `starter_titles()` also counts `add9` sub-topics, so new «all» videos never attach to a ★/🌐 sub-topic by index.
- **✏️ Auto worked example (Dynamic Summary Engine, step 1)** in every hub (grades 7–12 + Cambridge), placed after the sub-topics:
  - `exHtml()` calls `PRACT.GR[g].G[l][v]()` for the level the student has selected, and picks one whose text isn't on screen, preferring a `kd` not in the current set (up to 30 tries).
  - It is cached per `g_l_v` in `EXS`, so `draw()` keeps it, and it is regenerated if a new set happens to contain it.
  - Shows the question, `FIG.svg`, the answers, and the solution split at `⇒` **outside** `$…$` (`exSteps`) into a numbered list behind «👁». Labels are in English for Cambridge.
  - «🔄 ឧទាហរណ៍ថ្មី» (`data-hubnew` → `exNew`) replaces only `#hubEx` and re-renders KaTeX there; exercises and typed answers are untouched.
  - `HUB._reset(k)` is a test helper.
  - **Bug fixed in passing, also in `practice.js`:** generator text like `$d<R$` made the browser parse `<R…` as an HTML tag and **delete** the rest of the solution or question. `mathSafe()` now escapes `<`/`>` only inside `$…$`, and is used for question, solution and answers in both files.
  - Tests: `tests/hub.js` renders the example for every grade × lesson × level 3 times (3,816 renders; checks on-screen duplicates, `$` balance per step, no raw `<` in math). Headless Chrome: 1,272 views (all 13 grades incl. Cambridge) gave 0 KaTeX errors; «🔄» kept exercises and typed answers 1272/1272 and produced a new example 1272/1272.
  - Next steps (planned): step 2 is `formulas.js` (formula metadata keyed by `kd` patterns, per-level table built automatically) plus `tools/formula_coverage.js`; step 3 fills formulas grade by grade; step 4 (optional) expands short generator solutions.
- Data priority: teacher version (Firestore `hub/{g}_{l}` = `{o,g,l,j,r,u}`) > starter content in `hub.js` (grade 9: 18 lessons, 39 sub-topics) > generic tips with the lesson name (other grades; English for Cambridge).
- Students read through the Firestore **REST** API (no SDK). A fresh fetch runs on the first view of each lesson per page load (so opening the page or pressing Refresh shows teacher edits at once). After that the result is cached in localStorage `hub{g}_{l}` for 1 min; on failure there is a 1 min backoff. The practice flow never waits on it.
- Teacher editor: «📖 មេរៀនសង្ខេប» tab → «🎓 ផ្ទាំងសិក្សាហ្វឹកហាត់».
  - Choose grade and lesson; sub-topic tabs (add, move, duplicate, delete); level checkboxes; summary, formulas (one LaTeX per line), tips, examples, video URL with validity chip and «▶ សាកចាក់»; live preview.
  - Drafts autosave to localStorage `hubDraft_{g}_{l}`. Save runs a transaction with a version check (`r` +1, `tx.update` when the doc exists); on a conflict it asks before overwriting. «↺ ត្រឡប់ទៅលំនាំដើម» deletes the teacher version.
- Rules `match /hub/{id}`: public `get`; any active teacher can create (`r==1`) or update (`r` +1, same `g`/`l`, `o`=self, `j`<200 KB); the last saver or Admin can delete. **Must be published in Firebase Console** before teachers can save; until then students see the starter content.
- Tests: `tests/hub.js` (starter completeness, every level has ≥1 sub-topic, no Khmer inside `$…$` or formulas, video URL accept/reject, escaping of teacher text). Verified in headless Chrome: 108/108 lesson×level sets show the hub, all correct answers → ✅ + trophy, state kept; editor flow create → update → conflict → reset → switch lesson.

### ✅ Answer parser: cube and 4th roots — `practice.js`
- `norm()` maps `∛`→`cbrt`, `∜`→`qrt`, and `root(n,x)` / `root(n;x)`→`rtN@(x)` (before `,`→`.`). `FN` has `cbrt`/`qrt`; `atom()` reads `rtN@`. Implicit multiplication works like `√` (`11∛5`, `11 ∛(5)`, `11*∛5`, `១១∛៥`).
- Real odd roots of negatives: `∛(-8) = -2`. `tex()` → `\sqrt[n]{…}`. The keyboard has a «∛» key (inserts `∛(`).
- `tests/practice.js` checks 13 root forms, TeX output, and that `11∛5` ≠ `11√5`.

### ✅ Shared edit of bank questions + audit trail — `quiz.js`, `firestore.rules` (**must be published**)
- Every teacher/Admin sees ✏️ on every bank question (bank list and the test draft «៣. វិញ្ញាសា», where the edited item is refreshed in `mk.items`). The lesson-point select is also open to all. 🗑️ delete and multi-select stay owner/Admin only.
- Audit: `o` = original author, never changed; `qDoc` writes `ub` (last editor id) and `u` (time). Cards show «បញ្ចូលដោយ៖ X | កែចុងក្រោយដោយ៖ Y (date)».
- Rules: `qbq` update = any active teacher, `o` unchanged, and non-owners must set `ub` = themselves. `qimg` create/update/delete is also allowed to any active teacher when `qbq/{id}` exists.

### ✅ MCQ test report: per-question breakdown + student mistakes — `quiz.js`, `style.css`
- Data was already there: `subs/{t}_{sid}.a[qid]` holds every chosen answer (MC = **original** choice index 0–3 before the per-student shuffle; num = text). No change to `test.html` or the rules was needed.
- «📊 វិភាគតាមលំហាត់» (`qBreak`): for each question, «✅ ត្រូវ X នាក់ · ❌ ខុស Y នាក់ · ⬜ មិនឆ្លើយ Z នាក់ ក្នុងចំណោម N នាក់».
  - MC: choice distribution A–D (bank order, because students see shuffled letters) with bars, the correct choice in green and the most-chosen wrong choice flagged «⚠️ ច្រឡំច្រើនជាងគេ».
  - num: the top 5 wrong answers.
  - «👁 មើលបញ្ជីសិស្សធ្វើខុស (X នាក់)» `<details>`: name · chosen answer · correct answer. Its open state survives re-renders on new submissions (`WOPEN`, keyed `t_q`).
- 📄 Student attempt detail (`stDlg`): click a name in the table or the wrong list. It shows every question with ✅/❌/⬜, choices marked «← សិស្សរើស» / «✓ ចម្លើយត្រូវ», solution (opened on wrong ones), a «បង្ហាញតែសំណួរដែលធ្វើខុស» filter (CSS-only, kept across students), and ‹ › to move between students. Opening it from the wrong list scrolls to that question.
- 💡 Solutions: the bank editor has an optional `sl` field (`qDoc`/`toQ`, ≤8000 chars). New tests copy it into **`tkeys`** (`keys[q].s`, teacher-only, never into `tests/`). Old tests fall back to the bank item with the same id.
- `QUIZ._res(t,keys,subs)` is a headless test helper. Headless check (35 students, 6 questions incl. `$d<R$`, a figure, num answers, blanks; plus a legacy run with no `s` and some subs lacking `a`): every count and the wrong-list size match, 0 KaTeX errors, 0 raw `$`, details stay open, filter/next/focus work, 0 JS errors, no horizontal scroll at 390 px (`.qz-list>.qz-q{min-width:0}`).

### ✅ 5 levels + 🌐 PISA — `practice.js`, `practice.html`, `practice9.js`, `exam.js`, `quiz.js`
- Every grade shows 6 level buttons in a 6-column grid on desktop and a 3×2 grid on phone. On phone, the lesson title moves to its own line under the 6 cups. Each lesson card has 6 trophies, and «បន្តទៅកម្រិតបន្ទាប់» follows `LVO`.
- Answer timers per level: `SOLT={1:120,5:180,2:240,6:300,3:360,4:360}`.
- `open()` avoids repeating a form within one set (1 per `kd`, relaxed to 2 only when a level has too few forms).
- The exam level select and the teacher trophy count (`quiz.js`) handle all 6 keys.
- **Grade 9 (full content):** all 18 lessons × 6 levels have ≥6 own forms (≈330 new forms). PISA gained 4 new real-life scenarios per lesson (shopping and promotions, taxi/plan costs, tax, salary median vs mean, Wi-Fi range, drones, shadows and mirrors, scale models, ladders and kites, everyday probability), and the old PISA templates are now tagged `kd=p{l}_{i}`.
- Verified: 108/108 lesson×level sets checked in the real `practice.html` (correct answers → all ✅ → trophy → next level, plus 🔄). In the engine simulation, paper ខ matches paper ក's form on ≈98.6% of grade 9 items (PISA 100%).
- Other grades: levels 2/4 are back-filled by `fill56` and are not yet distinct content.

### ✅ Exam question variety — `practice7.js` … `practice11.js`, `practice.js` (grade 12), `exam.js`
- Grades 11 and 12: every lesson×level now has ≥4 forms (≈165 new forms for grade 11 and ≈63 for grade 12's gaps: sequences, exponentials/logarithms, trigonometry, derivatives and their applications, counting/probability, solid geometry, 3D vectors and planes, continuity, rational functions, differential equations, conics). Also fixed grade 11 52.2, which wrote `s(t)` in terms of `x`.
- Every Khmer-curriculum grade (7–12) now has ≥4 forms per lesson×level. In a realistic single exam, paper ខ uses the same form as paper ក in 97.6–100% of items.
- Grade 10 (25 lessons: polynomials, logic and sets, radicals, equations and inequalities, coordinate geometry, trigonometry, functions, statistics, vectors, transformations): each lesson×level went from 1 form to 4 (≈225 new forms). In the engine simulation, paper ខ uses the same form as paper ក in ≈98% of items.
- Grade 7 (22 lessons) and grade 8 (19 lessons): each lesson×level went from 1 form to 4 (≈370 new forms: computation, find the unknown, real-life, reasoning). In the engine simulation, paper ខ uses the same form as paper ក in ≈98% of items.
- Grade 9: about 125 new question forms (direct computation, find the unknown, applied, reasoning). Every lesson×level has ≥4 forms (most have 5–6). Fixed two broken templates: a degenerate midpoint and an impossible pentagon apothem.
- `exam.js` `mkItem()`: anti-repetition by **form** (`shapeOf` = `kd`, or a text/LaTeX fallback for other grades).
  - Within a section, it prefers forms not yet used.
  - Across exams, it prefers the least-used forms (stored in localStorage `exShp`).
  - Exact repeated text is never used.
- Paper ខ: item j has the same form as paper ក item j, with different numbers (≈99%). 🔄 on one item gives a new form, and paper ខ follows it.
- The exam generator makes open-response items, so there are no auto-generated distractors. Multiple-choice options exist only in the quiz bank (`quiz.js`), entered by teachers.

## Status
- ✅ **All planned code tasks are completed.** No code work is pending.
- Optional future work: starter hub content for grades 7, 8, 10, 11, 12 and Cambridge (currently generic tips); give grades 7, 8, 10, 11 and 12 their own Level 2/Level 4 forms (key 5/6, currently back-filled) and 6–10 forms per level like grade 9; richer PISA for those grades (`P4`/`pisa12.js`); add forms to the Cambridge (English) grades.

## Recommended manual checks (live site / real phones — not automatable here)
  - **Publish `firestore.rules`** (2026-11-14 security update: `mcp`, `exq`/`timg` owner checks, `subs`/`prt`/`sig` validation). Then open «ប្រធានថ្នាក់» once as each teacher so old monitor passwords move to `mcp`, and check 👁 still shows them.
  - **Publish `firestore.rules`** (shared `qbq`/`qimg` edit), then edit another teacher's question and check «កែចុងក្រោយដោយ».
  - **Publish `firestore.rules`** (new `hub/` rule), then save one hub lesson as a teacher and open it on a phone (students see changes on open/Refresh, or within 1 min).
  - `r00` round-trip between teacher and class monitor (code reviewed only).
  - Online exam with ក/ខ enabled: two adjacent students should see different papers.
  - Refresh during a quiz/exam on a weak connection (verified only in a Node simulation with an unresponsive Firestore).
