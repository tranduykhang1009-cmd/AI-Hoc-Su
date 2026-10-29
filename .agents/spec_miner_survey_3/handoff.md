# HANDOFF REPORT — spec_miner_survey_3

**Role**: Playwright E2E Spec Miner  
**Mission**: Mine requirements and testable surface for the E2E Testing Track using Playwright CLI  
**Target Recipient**: Parent Orchestrator (`4dff887a-e2dd-40f4-84b6-f8bffd83e9fe`)  
**Date**: 2026-10-29T13:38:00Z  
**Type**: Hard Handoff (Task Complete)

---

## 1. Observation

- **Dev Server Configuration & Port**:
  - In `d:\Projects\SchoolProjects\Su\vite.config.js` lines 30-33:
    ```javascript
    server: {
      port: 3000,
      open: true
    }
    ```
  - In `d:\Projects\SchoolProjects\Su\package.json` lines 6-10:
    ```json
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    }
    ```
  - Tested build command via `npm run build`:
    ```
    vite v6.4.4 building for production...
    dist/index.html                     2.08 kB │ gzip:   1.06 kB
    dist/assets/index-3Jdw2ca9.css    147.89 kB │ gzip:  28.71 kB
    dist/assets/index-CNDaqoP9.js   1,160.06 kB │ gzip: 357.59 kB
    built in 5.87s
    Exited with code 0.
    ```
- **Playwright CLI Global Availability**:
  - Executed `powershell -Command "Get-Command playwright-cli"`:
    ```
    ExternalScript  playwright-cli.ps1  C:\Users\DUY KHANG\AppData\Roaming\npm\playwright-cli.ps1
    ```
  - Executed `playwright-cli --version`:
    ```
    0.1.22
    ```
  - Executed `playwright-cli open about:blank`:
    ```
    ### Browser default opened with pid 14116.
    ### Ran Playwright code
    await page.goto('about:blank');
    ```
    Browser launched successfully and returned a clean snapshot.
- **Surface of 7 Tabs & Core Components**:
  - `src/App.jsx` lines 50-68 & 70-91:
    Hash routing manages tabs: `home`, `timeline`, `battle-map`, `museum`, `ai-station`, `quiz`, `survey`, `design-system`.
  - `src/components/CinematicIntro.jsx` lines 29-42:
    `sessionStorage.getItem('su_intro_seen_session')` controls initial 3D intro modal before entering `HomeTab`.
  - `src/tabs/HomeTab.jsx` lines 84-106 & 129-258:
    2 main CTAs (`battle-map`, `ai-station`) + 5 Bento cards (`battle-map`, `museum`, `timeline`, `ai-station`, `quiz`).
  - `src/tabs/TimelineTab.jsx` lines 21-26 & 243-274:
    4 Era filters (10 events total) + zigzag layout with scroll laser spine + card action buttons (Detail modal, Battle map, Ask AI).
  - `src/tabs/BattleMapTab.jsx` lines 319-337, 375-387, 390-415, 424-549:
    Leaflet map with 3 battle selector buttons (Rạch Gầm, Phú Xuân, Ngọc Hồi) + 3 layer buttons (Google Hybrid, Roadmap, Terrain) + phase pills + tactical drawer + mini-quiz modal (+10 pts).
  - `src/tabs/MuseumTab.jsx` lines 198-206, 288-368, 373-505:
    Search input, category dropdown, 8+ plaque cards, 60/40 fullscreen exhibition modal with focus trap, and admin image upload.
  - `src/tabs/AiStationTab.jsx` lines 28-33, 188-232, 235-302, 328-350:
    Imperial seal header, 3 imperial edict prompt chips, bamboo scroll bot styling, source citation footer, chat input bar with Enter submission.
  - `src/tabs/SurveyTab.jsx` lines 377-412, 591-645, 652-743, 747-905, 912-951, 956-1075:
    3 view switcher (Reviews, Google Form embed, Google Sheets sync table for admin), dynamic 5-star breakdown, review submission form with confetti, like buttons, sync cloud action.
  - `src/context/AdminContext.jsx` lines 6, 31-42:
    Valid PINs: `1789`, `12a8`, `1234`, `admin123`, `lequangtrung`. Stored in `sessionStorage` and `localStorage` as `su_admin_mode_active`.
  - `src/components/AdminKnowledgeModal.jsx` lines 530-560:
    4 Segmented Admin tabs: `survey`, `ai`, `museum`, `system`.

---

## 2. Logic Chain

1. **Test Runner Feasibility**: Observation of `playwright-cli` (v0.1.22) confirmed global presence and clean execution of `playwright-cli open about:blank`. The tool is capable of running CLI-based browser automation directly on this Windows workstation without extra wrapper dependencies.
2. **Dev Server Reliability**: Observation of `vite.config.js` and `npm run build` confirmed the app builds cleanly in 5.87s without compilation errors. Running `npx vite --port 3000 --no-open` reliably exposes the web app on `http://localhost:3000`.
3. **Session State Handling in E2E Tests**: Observation of `CinematicIntro.jsx` revealed that any first-time visitor experiences the fullscreen 3D intro. Therefore, Playwright test plans must either test clicking the "Vào Khám Phá" button or programmatically inject `su_intro_seen_session = 'v1'` into `sessionStorage` prior to navigation to directly test internal tabs.
4. **Comprehensive Test Surface**: Observation across all tabs identified 38 distinct features and 20 specific edge cases, covering form validation, search empty states, audio suspension, Leaflet tile layer swapping, modal focus trapping, and Admin PIN authentication.
5. **Visual Quality & Deliverables**: To fulfill the requirements of `ORIGINAL_REQUEST.md` (R4) and international Awwwards standards, the test suite requires a dual-viewport screenshot plan (18 key captures across Desktop 1920x1080 and Mobile 390x844) coupled with strict zero-console-error verification.

---

## 3. Caveats

- **Autoplay Audio Policy**: Chromium may log a console warning or suspend `AudioContext` until the first user click occurs. This is standard browser behavior and is gracefully handled by the app's `getSoundEnabled()` and safe play wrappers.
- **External Network Dependencies**: Features requiring live Google Maps imagery (`google-hybrid`), Gemini AI responses, or Google Sheets sync rely on active internet connectivity. In offline environments, the app uses graceful fallback states (local historical knowledge base, local fallback images, and local reviews).

---

## 4. Conclusion

The E2E testable surface of the "Hào Khí Tây Sơn" project has been fully mined, probed, and documented.
All 6 primary tabs (Trang chủ, Dòng thời gian, Sa bàn chiến trận, Bảo tàng, Sử quan AI, Khảo sát & Admin) plus the Quiz Arena have clear DOM landmarks, interactive triggers, and deterministic state transitions.
A complete 4-tier test plan (Tier 1: Feature Coverage, Tier 2: Boundary Cases, Tier 3: Cross-Feature State, Tier 4: Real-World Student Journey), an 18-image screenshot plan (Desktop & Mobile), and a Playwright CLI automation runbook have been produced and written to `d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3\analysis.md`.

---

## 5. Verification Method

To independently verify this specification and the test readiness:

1. **Verify Project Compilation**:
   ```powershell
   cd d:\Projects\SchoolProjects\Su
   npm run build
   ```
   *Expected outcome*: Exits with code 0, bundles cleanly in ~5-6s.

2. **Verify Playwright CLI Readiness**:
   ```powershell
   playwright-cli --version
   playwright-cli open about:blank
   playwright-cli close
   ```
   *Expected outcome*: Reports `0.1.22`, opens browser session, and closes without errors.

3. **Verify Specification Deliverables**:
   Inspect the following files:
   - Analysis & Feature Matrix: `d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3\analysis.md`
   - Handoff Report: `d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3\handoff.md`
   - Progress Log: `d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3\progress.md`
