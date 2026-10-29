# Scope: E2E Testing Track (Playwright CLI)

## Architecture
- Standalone opaque-box E2E test harness using Playwright CLI (`playwright-cli` v0.1.22) and/or Node Playwright test scripts.
- Target Dev Server: `http://localhost:3000` (started via `npx vite --port 3000 --no-open`).
- Viewports: Desktop (1920x1080) and Mobile (390x844).

## Scope Deliverables
1. Automated Test Runner & Test Suite covering Tiers 1-4: [DONE]
   - Tier 1: Feature Coverage (Intro modal bypass, 6 main tabs + quiz navigation, header/nav active state).
   - Tier 2: Boundary & Corner Cases (empty review submit, invalid admin PIN, quick tab switching, search with no results).
   - Tier 3: Cross-Feature State (tab switching preserving state, dark theme consistency, admin auth state).
   - Tier 4: Real-World Student Study Workflow (Intro -> Home -> Timeline -> Battle Map -> Museum -> AI Chat -> Survey).
2. Screenshot Capture Engine: [DONE]
   - Save 18 crisp PNG screenshots in `screenshots/` directory (9 Desktop, 9 Mobile).
3. Zero Console Error Verification: [DONE]
   - Listen for uncaught runtime exceptions or errors in browser console.
4. Publish `d:\Projects\SchoolProjects\Su\.agents\TEST_READY.md`: [DONE]

## Verification Status
- Gate Result: **PASS** (101 assertions passed, 0 console errors, 18 screenshots captured, Auditor: CLEAN, Reviewers: APPROVE, Challengers: CONFIRMED)
- Status: **DONE**

## Code & File Ownership
- Exclusively owns: `tests/`, `e2e/`, `scripts/run-e2e.js` (or equivalent test runner scripts), `screenshots/`, and `d:\Projects\SchoolProjects\Su\.agents\TEST_READY.md`.
- MUST NOT modify production files in `src/` or `package.json`.
