# Dispatch to Worker E2E 1 (Test Writer)

## Working Directory
`d:\Projects\SchoolProjects\Su\.agents\worker_e2e_1`

## Mandatory Authoritative References
- ORIGINAL_REQUEST.md: `d:\Projects\SchoolProjects\Su\.agents\ORIGINAL_REQUEST.md`
- PROJECT.md: `d:\Projects\SchoolProjects\Su\.agents\PROJECT.md`
- TEST_INFRA.md: `d:\Projects\SchoolProjects\Su\.agents\TEST_INFRA.md`
- SCOPE.md: `d:\Projects\SchoolProjects\Su\.agents\sub_orch_e2e_testing\SCOPE.md`
- Explorer Blueprint: `d:\Projects\SchoolProjects\Su\.agents\explorer_e2e_1\handoff.md`

## Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## File Ownership
- Allowed: `tests/`, `e2e/`, `scripts/`, `screenshots/`
- FORBIDDEN: Do NOT touch `src/` or `package.json`

## Mission
1. Build automated Playwright E2E test scripts covering Tiers 1-4:
   - Tier 1: Feature Coverage (Intro modal bypass, 6 main tabs + quiz navigation, header/nav active states, battle selectors, museum modal open/close, AI chat interaction, survey form submission, admin modal PIN unlock).
   - Tier 2: Boundary & Corner Cases (form validation, invalid admin PIN rejection, rapid tab switches, search with no results, empty inputs, zero console errors).
   - Tier 3: Cross-Feature State (tab switching preserving state, dark theme consistency, admin auth state, sonner toast stacking and auto-dismiss).
   - Tier 4: Real-World Student & Teacher Scenarios:
     - Scenario 1 (Student Journey): Intro -> Home -> Timeline (Filter Tây Sơn) -> Battle Map (Ngọc Hồi Đống Đa quiz) -> Museum (Search súng thần công) -> AI Historian (Ask Quang Trung tactics) -> Survey (Submit 5-star review with Sonner toast).
     - Scenario 2 (Teacher/Admin Audit Journey): Enter Admin PIN `1789` -> Check Review Sync -> Inspect Knowledge Base -> Test Toast Alerts -> Exit Admin.
2. Build an automated Screenshot Capture runner that captures 18 high-resolution PNG screenshots into `d:\Projects\SchoolProjects\Su\screenshots/`:
   - Desktop (1920x1080):
     1. `desktop-01-home.png`
     2. `desktop-02-timeline.png`
     3. `desktop-03-battlemap-rachgam.png`
     4. `desktop-04-battlemap-ngochoi.png`
     5. `desktop-05-museum-gallery.png`
     6. `desktop-06-museum-modal.png`
     7. `desktop-07-ai-station.png`
     8. `desktop-08-survey-form.png`
     9. `desktop-09-admin-modal.png`
   - Mobile (390x844):
     10. `mobile-01-home.png`
     11. `mobile-02-navbar-drawer.png`
     12. `mobile-03-timeline.png`
     13. `mobile-04-battlemap.png`
     14. `mobile-05-museum-gallery.png`
     15. `mobile-06-museum-modal.png`
     16. `mobile-07-ai-station.png`
     17. `mobile-08-survey.png`
     18. `mobile-09-admin.png`
3. Execute the full test suite and screenshot runner against `http://localhost:3000`.
   Note: On Windows, use `channel: 'chrome'` and `$env:NODE_PATH = "C:\Users\DUY KHANG\AppData\Roaming\npm\node_modules\@playwright\cli\node_modules"` as verified by Explorer.
4. Verify all tests pass with exit code 0 and zero console errors.
5. Write your complete handoff report in `d:\Projects\SchoolProjects\Su\.agents\worker_e2e_1\handoff.md`.
