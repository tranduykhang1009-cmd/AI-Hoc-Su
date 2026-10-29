# Scope: Milestone 1 — Sonner Notification System (R3)

## Objective
Implement official `sonner` stacked toast notification system across the application and eliminate all legacy raw `alert()` and un-stacked `Toast.jsx` instances.

## Status: DONE (Gate PASS)

## Scope Deliverables & Results
1. [x] Install `sonner` dependency in `package.json` compatible with React 19 (`sonner@^2.0.8`).
2. [x] Mount `<Toaster position="top-right" richColors theme="dark" />` in `src/App.jsx`.
3. [x] Eliminate all 7 raw `alert()` calls:
   - [x] `src/components/AdminKnowledgeModal.jsx:150`: config save failure -> `toast.error`
   - [x] `src/components/AdminKnowledgeModal.jsx:244`: word file empty -> `toast.error`
   - [x] `src/components/AdminKnowledgeModal.jsx:257`: word read error -> `toast.error`
   - [x] `src/components/AdminKnowledgeModal.jsx:290`: json format error -> `toast.error`
   - [x] `src/components/AdminKnowledgeModal.jsx:313`: missing title/content -> `toast.warning`
   - [x] `src/components/AdminKnowledgeModal.jsx:387`: image > 5MB -> `toast.error`
   - [x] `src/tabs/SurveyTab.jsx:272`: missing review name/content -> `toast.warning`
4. [x] Replace legacy `src/components/Toast.jsx` usage:
   - [x] `src/tabs/BattleMapTab.jsx`: replaced with `toast.success`
   - [x] `src/tabs/MuseumTab.jsx`: replaced with `toast.warning`, `toast.info`, `toast.success`
   - [x] `src/components/Toast.jsx` cleanly deprecated with safe backward-compatibility proxy.
5. [x] Add interactive Sonner toast feedback for:
   - [x] Copy URL / link / contact email (`toast.success('Đã sao chép liên kết vào bộ nhớ tạm!')`)
   - [x] Review submission (`toast.success('Cảm ơn bạn đã gửi đánh giá!')`)
   - [x] Google Sheets GViz cloud sync (`toast.loading`, `toast.success`, `toast.info`, `toast.error` using deduplicated toast ID `'gviz-cloud-sync'`)
6. [x] Zero console errors, verified production build (`npm run build` exits 0).

## Exclusive File Ownership Adherence
- `package.json` [MODIFIED]
- `src/App.jsx` [MODIFIED]
- `src/components/AdminKnowledgeModal.jsx` [MODIFIED]
- `src/tabs/SurveyTab.jsx` [MODIFIED]
- `src/tabs/BattleMapTab.jsx` [MODIFIED]
- `src/tabs/MuseumTab.jsx` [MODIFIED]
- `src/components/Toast.jsx` [MODIFIED]
- `src/components/ContactBubbleWidget.jsx` [MODIFIED]
- `src/App.css` [UNTOUCHED by M1]
- `src/tabs/HomeTab.jsx` [UNTOUCHED by M1]
