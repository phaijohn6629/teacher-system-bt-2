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
| `sw.js` | PWA Service Worker | គ្រប់គ្រង Cache សម្រាប់ PWA ដើម្បីបើកលឿន |
| `index.html` | Main Entry Point | ទំព័រមេសម្រាប់ផ្ទុក UI និងហៅដំណើរការកម្មវិធី |

## Rules
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
- `firestore.rules` is **not** deployed by git push: after changing it, an Admin must paste it into Firebase Console → Firestore → Rules → Publish.
- Student pages (`test.html`, `exam.html`) use Firestore **Lite**, which has no timeout of its own: wrap every call with `to(promise, ms)` / `retry()`.

## Current State (up to date as of 2026-11-14 · `sw.js` cache = `ngs-app-v20`)

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

### ✅ Practice learning hub (Flipped Classroom) — `hub.js`, `practice.js`, `practice.html`, `lessonedit.js`, `style.css`, `firestore.rules`
- `practice.html`: a collapsible «📚 មេរៀនសង្ខេប · រូបមន្ត · គន្លឹះ · វីដេអូ» panel sits between the level bar and the questions. Each sub-topic is its own `<details>` with 📖 summary, 📐 formula box (KaTeX display), 💡 tips plus worked examples (solution hidden behind «👁»), and 🎬 a video button.
- Sub-topics are filtered by level (`sub.lv`; empty = all levels). 🌐 PISA shows every sub-topic plus a «real life → mathematics» modelling card.
- Open/closed state survives `draw()` (check, 🔄), because `hub.js` stores `toggle` events keyed by `g_l_v_i`.
- Video player (modal): YouTube (→ `youtube-nocookie` embed), Google Drive (→ `/preview`), and https MP4/WebM files. Anything else is rejected (`HUB.vparse`). Inside a `<dialog>` the player mounts in the dialog (top layer).
- Data priority: teacher version (Firestore `hub/{g}_{l}` = `{o,g,l,j,r,u}`) > starter content in `hub.js` (grade 9: 18 lessons, 39 sub-topics) > generic tips with the lesson name (other grades; English for Cambridge).
- Students read through the Firestore **REST** API (no SDK). A fresh fetch runs on the first view of each lesson per page load (so opening the page or pressing Refresh shows teacher edits at once). After that the result is cached in localStorage `hub{g}_{l}` for 1 min; on failure there is a 1 min backoff. The practice flow never waits on it.
- Teacher editor: «📖 មេរៀនសង្ខេប» tab → «🎓 ផ្ទាំងសិក្សាហ្វឹកហាត់».
  - Choose grade and lesson; sub-topic tabs (add, move, duplicate, delete); level checkboxes; summary, formulas (one LaTeX per line), tips, examples, video URL with validity chip and «▶ សាកចាក់»; live preview.
  - Drafts autosave to localStorage `hubDraft_{g}_{l}`. Save runs a transaction with a version check (`r` +1, `tx.update` when the doc exists); on a conflict it asks before overwriting. «↺ ត្រឡប់ទៅលំនាំដើម» deletes the teacher version.
- Rules `match /hub/{id}`: public `get`; any active teacher can create (`r==1`) or update (`r` +1, same `g`/`l`, `o`=self, `j`<200 KB); the last saver or Admin can delete. **Must be published in Firebase Console** before teachers can save; until then students see the starter content.
- Tests: `tests/hub.js` (starter completeness, every level has ≥1 sub-topic, no Khmer inside `$…$` or formulas, video URL accept/reject, escaping of teacher text). Verified in headless Chrome: 108/108 lesson×level sets show the hub, all correct answers → ✅ + trophy, state kept; editor flow create → update → conflict → reset → switch lesson.

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
  - **Publish `firestore.rules`** (new `hub/` rule), then save one hub lesson as a teacher and open it on a phone (students see changes on open/Refresh, or within 1 min).
  - `r00` round-trip between teacher and class monitor (code reviewed only).
  - Online exam with ក/ខ enabled: two adjacent students should see different papers.
  - Refresh during a quiz/exam on a weak connection (verified only in a Node simulation with an unresponsive Firestore).
