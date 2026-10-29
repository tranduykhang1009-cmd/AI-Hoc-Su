# Dispatch to Explorer E2E 1

## Task
Survey the codebase for the E2E Testing Track.
Working Directory: `d:\Projects\SchoolProjects\Su\.agents\explorer_e2e_1`
Project Root: `d:\Projects\SchoolProjects\Su`

## Objectives:
1. Examine `package.json` to see existing dependencies (Playwright, Vite, scripts).
2. Check existing `tests/`, `e2e/`, `scripts/` directories if any exist.
3. Investigate the UI components in `src/` to extract all critical selectors and interaction patterns:
   - Intro modal (how is it displayed, how to close or bypass, e.g. localStorage key or close button selector).
   - Navigation bar: Tab buttons/links for the 6 tabs (Trang chủ, Dòng thời gian, Sa bàn chiến trận, Bảo tàng, Sử quan AI, Khảo sát & Admin) + Quiz Arena if present.
   - BattleMapTab: battle selector buttons (Rạch Gầm - Xoài Mút, Ngọc Hồi - Đống Đa, Quy Nhơn), tactical drawer, mini-quiz.
   - MuseumTab: search input, category filters, artifact cards, modal popup selector and close button.
   - AiStationTab: chat input textarea/input, send button, edict prompt chips, message stream container.
   - SurveyTab: rating stars/inputs, form fields (name, school, feedback), submit button, Sonner toast container.
   - AdminKnowledgeModal: trigger button (PIN button), PIN input, submit PIN (default PIN `1789`), 4 tab selectors in admin modal, close button.
4. Verify how Vite dev server is run (`npx vite --port 3000 --no-open`) and how Playwright or `playwright-cli` can interact with it.
5. Provide a clear, actionable report in `d:\Projects\SchoolProjects\Su\.agents\explorer_e2e_1\handoff.md` with:
   - Concrete CSS / role / test-id selectors for each user interaction.
   - Exact commands for running dev server and running Playwright tests.
   - Recommended test architecture and screenshot runner structure.

## 2026-10-29T13:44:02Z
TASK:
Explore the codebase to map exact selectors, DOM elements, dev server configuration, and Playwright execution requirements for the Test Writer.
1. Inspect package.json to identify available testing packages (playwright, @playwright/test, etc.).
2. Inspect src/App.jsx, src/components/Navbar.jsx, src/tabs/HomeTab.jsx, src/tabs/TimelineTab.jsx, src/tabs/BattleMapTab.jsx, src/tabs/MuseumTab.jsx, src/tabs/AiStationTab.jsx, src/tabs/SurveyTab.jsx, src/components/AdminKnowledgeModal.jsx, and any intro modal component.
3. Identify:
   - How the 3D Intro Modal is presented and how to dismiss/bypass it (button selector or localStorage).
   - Exact selectors for navigating all 6 tabs (Trang chủ, Dòng thời gian, Sa bàn chiến trận, Bảo tàng, Sử quan AI, Khảo sát & Admin) + Quiz Arena.
   - Exact selectors for BattleMapTab (battle selector buttons: Rạch Gầm - Xoài Mút, Ngọc Hồi - Đống Đa, Quy Nhơn, mini-quiz).
   - Exact selectors for MuseumTab (search bar, category chips, artifact cards, artifact detail modal, close modal).
   - Exact selectors for AiStationTab (quick prompt chips, chat input, send button, message bubble).
   - Exact selectors for SurveyTab (star ratings, inputs for name/school/feedback, submit button, sonner toast feedback).
   - Exact selectors for AdminKnowledgeModal (admin trigger button in navbar/survey, PIN input, submit PIN '1789', admin tabs, close button).
   - Verification of Sonner toast container in the DOM.
4. Check whether dev server runs on port 3000 and how to reliably run headless Playwright test scripts on Windows.
5. Compile your findings and an actionable blueprint into:
   d:\Projects\SchoolProjects\Su\.agents\explorer_e2e_1\handoff.md

When complete, send a message to your parent orchestrator with your summary and handoff path.
