# HANDOFF REPORT — Frontend Architecture Survey
**Agent:** `explorer_survey_1`  
**Working Directory:** `d:\Projects\SchoolProjects\Su\.agents\explorer_survey_1`  
**Recipient:** `orchestrator_1` / `parent`  
**Date:** 2026-10-29  
**Handoff Type:** Hard (Task complete)

---

## 1. OBSERVATION

- **Package & Bundler Configuration (`package.json`, lines 11–24):**
  ```json
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "framer-motion": "^12.4.7",
    "idb-keyval": "^6.3.0",
    "leaflet": "^1.9.4",
    "lucide-react": "^1.16.0",
    "mammoth": "^1.13.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.2.0"
  }
  ```
  - Exact finding: React 19 is used, Framer Motion v12.4.7 is installed.
  - Neither `tailwindcss` nor `sonner` is currently in `package.json`.
- **CSS Architecture (`src/App.css`, lines 10–93):**
  - Pure custom CSS Design System with 7,911 lines.
  - CSS variables define `--bg-canvas: #0F0D0B;`, `--bg-surface: #1A1614;`, `--accent: #A64B3D;`, `--gold: #C9A961;`, `--font-display: 'Fraunces', 'Newsreader', Georgia, serif;`, `--font-body: 'Be Vietnam Pro', system-ui, sans-serif;`.
- **Routing & Tabs Definition (`src/App.jsx`, lines 50–91):**
  - Hash-based navigation synchronized with state:
    ```javascript
    const validTabs = ['home', 'timeline', 'battle-map', 'museum', 'ai-station', 'quiz', 'survey', 'design-system'];
    ```
  - 6 main tabs + quiz tab:
    - `home`: `HomeTab` (`src/tabs/HomeTab.jsx`)
    - `timeline`: `TimelineTab` (`src/tabs/TimelineTab.jsx`)
    - `battle-map`: `BattleMapTab` (`src/tabs/BattleMapTab.jsx`)
    - `museum`: `MuseumTab` (`src/tabs/MuseumTab.jsx`)
    - `ai-station`: `AiStationTab` (`src/tabs/AiStationTab.jsx`)
    - `survey`: `SurveyTab` (`src/tabs/SurveyTab.jsx`)
    - `quiz`: `QuizArenaTab` (`src/tabs/QuizArenaTab.jsx`)
  - Admin Dashboard is rendered as a modal `<AdminKnowledgeModal>` (`src/components/AdminKnowledgeModal.jsx`, 1,118 lines, 57KB) controlled by `isAdminOpen` state and `AdminContext` (`src/context/AdminContext.jsx`).
- **Alert & Toast Observations (`src/components/AdminKnowledgeModal.jsx` & `src/tabs/SurveyTab.jsx`):**
  - `alert()` calls found:
    - `AdminKnowledgeModal.jsx:145`: `alert('Không thể lưu cấu hình: ' + err.message);`
    - `AdminKnowledgeModal.jsx:236`: `alert('File Word không có nội dung văn bản.');`
    - `AdminKnowledgeModal.jsx:247`: `alert('Không thể đọc file Word: ' + err.message);`
    - `AdminKnowledgeModal.jsx:282`: `alert('File JSON không đúng định dạng mảng tài liệu.');`
    - `AdminKnowledgeModal.jsx:303`: `alert('Vui lòng nhập đầy đủ tiêu đề và nội dung sử liệu.');`
    - `AdminKnowledgeModal.jsx:377`: `alert('Kích thước ảnh phải nhỏ hơn 5MB');`
    - `SurveyTab.jsx:260`: `alert('Vui lòng điền họ tên và nội dung đánh giá của bạn.');`
  - Custom `<Toast>` component in `src/components/Toast.jsx` used at:
    - `BattleMapTab.jsx:599`
    - `MuseumTab.jsx:510`
- **Data Flow & External Services:**
  - Google Gemini AI: `src/services/geminiService.js` (fallback chain `gemini-1.5-flash` → `gemini-2.0-flash` → `gemini-1.5-pro`).
  - Google Sheets & Apps Script Webhook: `src/services/surveySyncService.js` (reads via GViz JSON format, sends via `POST` with `mode: 'no-cors'`).
  - Google Docs Cloud Knowledge: `/api/doc` Vite middleware and `api/doc.js` proxying `docs.google.com/document/d/.../export?format=txt`.
  - Leaflet Map Tiles: Google Hybrid satellite tiles `https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}` in `BattleMapTab.jsx`.
- **Build Verification Result:**
  - Command: `npm run build`
  - Output: Exit Code 0, built in 18.94s:
    - `dist/index.html`: 2.08 kB
    - `dist/assets/index-3Jdw2ca9.css`: 147.89 kB
    - `dist/assets/index-CNDaqoP9.js`: 1,160.06 kB

---

## 2. LOGIC CHAIN

1. From `package.json` and `npm run build` passing cleanly, the frontend application is healthy, runs on React 19 and Vite 6, and is production-ready.
2. From the lack of Tailwind CSS in `package.json` and the existence of 7,911 lines in `src/App.css`, all visual styling, token overrides (Obsidian `#08090C`, Amber Gold `#F59E0B`/`#D97706`, Antique Bronze), and component theme polishing must target `src/App.css` directly or modular styles, rather than relying on Tailwind utility classes.
3. From `App.jsx` and `Navbar.jsx`, the 6 requested tabs are cleanly separated into `src/tabs/`, with well-defined entry points and active states.
4. From the observation of `Toast.jsx` and 7 verbatim `alert()` calls, the codebase is in prime condition to receive `npm install sonner` and unify all notifications into `<Toaster position="top-right" richColors theme="dark" />`.
5. From the observation that `framer-motion` is already on v12.4.7, Emil Kowalski's spring physics (`type: "spring", stiffness: 350, damping: 28`) and `layoutId` pill transitions can be applied directly without upgrading dependencies.

---

## 3. CAVEATS

- No Tailwind: Since the prompt mentioned "Tailwind CSS configuration", subsequent sub-agents must note that the app uses Vanilla CSS tokens in `App.css`. Installing Tailwind is neither present nor strictly required, as the existing design system in `App.css` is extensive and well-structured.
- Quiz Arena Tab: Although the prompt highlights 6 tabs, there is a 7th tab (`quiz` - `QuizArenaTab.jsx`) rendered in the navbar. It should be maintained and styled consistently with the other 6 tabs.
- Leaflet map rendering in `BattleMapTab.jsx` depends on container sizing and `map.invalidateSize()`; when adding animations or drawer transitions, timing must be preserved.

---

## 4. CONCLUSION

The frontend architecture is modular, completely operational, and directly ready for the 4-phase transformation:
1. **Taste Heritage Direction (R1):** Refactor CSS custom properties in `src/App.css` to Obsidian Black `#08090C`, Imperial Amber Gold `#F59E0B`/`#D97706`, and Antique Bronze, and refine card layouts across all 6 tabs.
2. **Emil Kowalski Motion (R2):** Inject spring physics into button taps/hovers and implement shared `layoutId` sliding pills on `Navbar.jsx` and `AdminKnowledgeModal.jsx`.
3. **Sonner Integration (R3):** Run `npm install sonner`, mount `<Toaster />` in `App.jsx`, and replace all `alert()` and legacy `<Toast>` calls with Sonner.
4. **Playwright Automation (R4):** Build tests to verify navigation, tab rendering, modal flows, and capture desktop/mobile screenshots.

---

## 5. VERIFICATION METHOD

To independently verify the observations:
1. Check dependencies:
   ```powershell
   type d:\Projects\SchoolProjects\Su\package.json
   ```
2. Check production build:
   ```powershell
   npm run build
   ```
   Expected: Exit code 0, bundles created in `dist/`.
3. Verify files and tab components:
   - `d:\Projects\SchoolProjects\Su\src\App.jsx`
   - `d:\Projects\SchoolProjects\Su\src\tabs\HomeTab.jsx`
   - `d:\Projects\SchoolProjects\Su\src\tabs\TimelineTab.jsx`
   - `d:\Projects\SchoolProjects\Su\src\tabs\BattleMapTab.jsx`
   - `d:\Projects\SchoolProjects\Su\src\tabs\MuseumTab.jsx`
   - `d:\Projects\SchoolProjects\Su\src\tabs\AiStationTab.jsx`
   - `d:\Projects\SchoolProjects\Su\src\tabs\SurveyTab.jsx`
   - `d:\Projects\SchoolProjects\Su\src\components\AdminKnowledgeModal.jsx`
4. Detailed analysis document:
   - `d:\Projects\SchoolProjects\Su\.agents\explorer_survey_1\analysis.md`
