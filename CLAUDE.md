# Teacher System

## Project Structure & Rules
- **Frameworks**: Firebase (Firestore, Auth), Service Worker (PWA).
## File Map & Architecture

| File | Purpose (English) | Description (Khmer) |
| :--- | :--- | :--- |
| `script.js` | App logic & Auth | គ្រប់គ្រង Firebase Auth និងតក្កវិជ្ជាមេនៃកម្មវិធី |
| `sched.js` | Schedule & Timesheet | គ្រប់គ្រងកាលវិភាគ និងតារាងម៉ោងបង្រៀន |
| `monitor.js` | Class Monitoring & Sync | គ្រប់គ្រងគណនីប្រធានថ្នាក់ និងការ Sync ទិន្នន័យថ្នាក់ |
| `sw.js` | PWA Service Worker | គ្រប់គ្រង Cache សម្រាប់ PWA ដើម្បីបើកលឿន |
| `exam.js` | Exam generator | គ្រប់គ្រងការបង្កើតវិញ្ញាសាប្រឡង |
| `att.js` | Attendance logic | គ្រប់គ្រងការចុះវត្តមាន |
| `exgen.js` | Exercise Generator | គ្រប់គ្រងកិច្ចតែងការ និងការបង្កើតលំហាត់ |
| `index.html` | Main Entry Point | ទំព័រមេសម្រាប់ផ្ទុក UI និងហៅដំណើរការកម្មវិធី |

- **Rules**:
  - Use `tx.update` for Firestore updates to avoid overwriting existing fields (crucial for supporting new data).
  - Use Firebase transactions for any write operations on shared data (e.g., `mc` collection).

## Completed Fixes & Modified Files
- **Service Worker**: Updated cache version in `sw.js` to `ngs-app-v5` to force cache busting.
- **Data Overwrite**: Updated `monitor.js` in `tWrite` function to use `tx.update` instead of `tx.set` to prevent accidental overwriting of documents when adding new record fields (e.g., `r00`).
- **Monitor Record Data**: Included `r00` in `buildT` and `teachApply` in `monitor.js` to ensure data persistence across syncs.
- **Group & Exam Seat Randomizer**: 
  - Added `abMap` to `c.seat` in `classorg.js` to store seat-based A/B paper assignment.
  - Implemented Animated Group Picker and Seat Randomizer logic in `classorg.js`.
  - Integrated `abMap` into `exam.js`'s online exam opening logic to pass A/B paper assignment to students.

- **Remaining Tasks for Next Session**:
- **UI Implementation**: Implement the "🎲 ចាប់ក្រុម 3D" button and the associated 3D Card Flip/Confetti animation modal in `classorg.js`.
- **UI Implementation**: Implement "👆 ចាប់រើសអ្នកឡើងបទបង្ហាញ" (Animated Pointer Hand) functionality in the Group Picker and the Seat Map.
- **Validation**: Verify if `r00` is being populated correctly in the `j` field.
- **Verification**: Test online exam A/B paper assignment sync with `abMap` in `classorg.js`.
