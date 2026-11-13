# Teacher System

## Project Structure & Rules
- **Frameworks**: Firebase (Firestore, Auth), Service Worker (PWA).
- **Core Files**:
  - `script.js`: Firebase init, Auth, and main app logic.
  - `sched.js`: Schedule and Timesheet/Workplan logic.
  - `monitor.js`: Monitor account management and real-time sync for monitor class data.
  - `sw.js`: Service worker for PWA.
- **Rules**:
  - Use `tx.update` for Firestore updates to avoid overwriting existing fields (crucial for supporting new data).
  - Use Firebase transactions for any write operations on shared data (e.g., `mc` collection).

## Completed Fixes & Modified Files
- **Service Worker**: Updated cache version in `sw.js` to `ngs-app-v2` to force cache busting.
- **Data Overwrite**: Updated `monitor.js` in `tWrite` function to use `tx.update` instead of `tx.set` to prevent accidental overwriting of documents when adding new record fields (e.g., `r00`).

## Remaining Tasks for Next Session
- **Monitor Record Data**: Investigate if further schema updates are needed to correctly include the `r00` record field in `buildT` and `applyD` if `tx.update` is not sufficient to preserve new data structure.
- **Validation**: Verify if `r00` is being populated correctly in the `j` field.
