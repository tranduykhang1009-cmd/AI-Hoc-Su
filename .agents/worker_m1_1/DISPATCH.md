# Dispatch Assignment: worker_m1_1

## 2026-10-29T13:43:56Z

You are worker_m1_1, the Worker for Milestone 1: Sonner Notification System.
Your working directory is: d:\Projects\SchoolProjects\Su\.agents\worker_m1_1
Your parent conversation ID is: ddd07b14-7b84-47b5-aba3-7aafdb1e4a71

MANDATORY FIRST STEPS:
1. Read the following authoritative specification files:
   - d:\Projects\SchoolProjects\Su\.agents\ORIGINAL_REQUEST.md
   - d:\Projects\SchoolProjects\Su\.agents\PROJECT.md
   - d:\Projects\SchoolProjects\Su\.agents\sub_orch_m1_sonner\SCOPE.md
   - Sonner skill: d:\Projects\SchoolProjects\Su\.agents\skills\ask-sonner\SKILL.md

YOUR EXCLUSIVE FILE OWNERSHIP:
- package.json
- src/App.jsx
- src/components/AdminKnowledgeModal.jsx
- src/tabs/SurveyTab.jsx
- src/tabs/BattleMapTab.jsx
- src/tabs/MuseumTab.jsx
- src/components/Toast.jsx
- src/components/ContactBubbleWidget.jsx
(CRITICAL: Do NOT touch src/App.css or src/tabs/HomeTab.jsx)

TASK INSTRUCTIONS:
1. In the project root (d:\Projects\SchoolProjects\Su), install sonner:
   Run `npm install sonner`
   Ensure compatibility with React 19 (^19.0.0). Verify package.json.
2. In src/App.jsx:
   Import { Toaster } from 'sonner' and mount:
   `<Toaster position="top-right" richColors theme="dark" />`
   Mount it at the top level of the application shell.
3. In src/components/AdminKnowledgeModal.jsx and src/tabs/SurveyTab.jsx:
   Eliminate ALL 7 raw `alert()` calls and replace them with Sonner toasts:
   - AdminKnowledgeModal.jsx:145: config save failure -> `toast.error(...)`
   - AdminKnowledgeModal.jsx:236: word file empty -> `toast.error(...)`
   - AdminKnowledgeModal.jsx:247: word read error -> `toast.error(...)`
   - AdminKnowledgeModal.jsx:282: json format error -> `toast.error(...)`
   - AdminKnowledgeModal.jsx:303: missing title/content -> `toast.warning(...)`
   - AdminKnowledgeModal.jsx:377: image > 5MB -> `toast.error(...)`
   - SurveyTab.jsx:260: missing review name/content -> `toast.warning(...)`
   Import `toast` from 'sonner'.
4. Replace legacy Toast.jsx usage in:
   - src/tabs/BattleMapTab.jsx:598 -> replace custom toast state/component with `toast.info(...)` / `toast.success(...)`
   - src/tabs/MuseumTab.jsx:508 -> replace custom toast state/component with `toast.info(...)` / `toast.success(...)`
   - Clean up or deprecate src/components/Toast.jsx cleanly so there are no broken imports anywhere.
5. Add interactive Sonner toast feedback for:
   - Copy URL / link / contact email in src/components/ContactBubbleWidget.jsx or wherever link copying happens: `toast.success('Đã sao chép liên kết vào bộ nhớ tạm!')`
   - Review submission in src/tabs/SurveyTab.jsx: `toast.success('Cảm ơn bạn đã gửi đánh giá!')`
   - Google Sheets GViz cloud sync in src/tabs/SurveyTab.jsx: provide toast notification during or upon sync (`toast.success` or `toast.promise`).
6. Run build verification:
   Execute `npm run build` in d:\Projects\SchoolProjects\Su and ensure exit code 0 without any errors.

REPORTING:
Write a comprehensive handoff report to:
`d:\Projects\SchoolProjects\Su\.agents\worker_m1_1\handoff.md`
