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
- Student pages (`test.html`, `exam.html`) use Firestore **Lite**, which has no timeout of its own: wrap every call with `to(promise, ms)` / `retry()`.

## Current State (up to date as of 2026-11-13 · `sw.js` cache = `ngs-app-v11`)

### ✅ Seat plan (ប្លង់តុ) — `classorg.js`
- The «🪑 ប្លង់តុ» tab renders correctly. The old crash came from seat plans saved without `abMap`. `seat()` now adds it when missing.
- The seat view shows the blackboard, ក/ខ badges, «🎲 ចាប់ក្រុម 3D» (shuffled group cards) and «👆 ចាប់រើសតុ/សិស្ស».
- `monitor.js` `seatSig()` compares only layout and seat order, so re-derived data doesn't log a false «បានរៀបកៅអីឡើងវិញ».

### ✅ Exam papers ក/ខ (A/B) — `classorg.js` → `exam.js` → `exam.html`
- `abMap` is derived from seat position in a checkerboard (`abOf`/`syncAB`): students next to each other (left/right and front/back) always get different papers. It is re-synced on shuffle, layout change, clear and manual moves.
- `exam.js` `abFor()` assigns each student's paper: `abMap` first, then seat index, then alternating by roll number. `pub()` publishes paper ខ (`itB`/`instB`) when `E.ab`.
- `exam.html` renders paper ខ for students assigned ខ.

### ✅ Seat/student picker speed — `classorg.js`
- `animatePointer()` picks the winner up front, makes 12 hops with ease-out pacing (~1.6 s), then plays a win chime, fires confetti and shows a name label. A double-click guard prevents overlapping runs.

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

### ✅ Audit fixes of 2026-11-13
- `meetings.js`: the recorder signature is restored on every meeting type (AU and joint meetings had lost it).
- `script.js`: a blocking alert is shown before a forced logout.
- `exam.js`: `mkItem` avoids duplicates against the session history plus the items already in the section.
- `exgen.js`: dead code removed.
- Picker modal uses the scoped `.pk-modal` class and is readable in dark mode.

## Remaining Tasks
- None pending in code. **Not yet tested on the live site / real phones:**
  - `r00` round-trip between teacher and class monitor (code reviewed only).
  - Online exam with ក/ខ enabled: two adjacent students should see different papers.
  - Refresh during a quiz/exam on a weak connection (verified only in a Node simulation with an unresponsive Firestore).
