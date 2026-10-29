# Handoff Report: E2E Testing Architecture & DOM Element Mapping

- Author: Explorer E2E 1
- Target Audience: Sub-Orchestrator E2E & Test Writer
- Target Working Directory: `d:\Projects\SchoolProjects\Su\.agents\explorer_e2e_1`
- Date: 2026-10-29T13:53:00Z

---

## 1. Observation

### 1.1 Dependency & Execution Environment
- **`package.json`**:
  Lines 11-25 specify:
  ```json
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "framer-motion": "^12.4.7",
    "idb-keyval": "^6.3.0",
    "leaflet": "^1.9.4",
    "lucide-react": "^1.16.0",
    "mammoth": "^1.13.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sonner": "^2.0.8"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.2.0"
  }
  ```
- **Playwright Availability**:
  - Global CLI command: `playwright-cli` (v0.1.22) is installed at `C:\Users\DUY KHANG\AppData\Roaming\npm\playwright-cli`.
  - Node module: `playwright` is installed at `C:\Users\DUY KHANG\AppData\Roaming\npm\node_modules\@playwright\cli\node_modules\playwright`.
  - Browser Execution on Windows:
    - Attempting `chromium.launch({ headless: true })` fails with:
      `Executable doesn't exist at C:\Users\DUY KHANG\AppData\Local\ms-playwright\chromium_headless_shell-1247\chrome-headless-shell-win64\chrome-headless-shell.exe`.
    - Executing with system Chrome channel: `chromium.launch({ channel: 'chrome', headless: true })` succeeds immediately without downloading external browser shells.
    - Executing via `playwright-cli`: `playwright-cli open --browser=chrome http://localhost:3000` succeeds immediately.

### 1.2 Dev Server Configuration
- **`vite.config.js`**: Lines 30-33:
  ```javascript
  server: {
    port: 3000,
    open: true
  }
  ```
- Command to run headlessly: `npx vite --port 3000 --no-open`. Port 3000 listens on IPv6 `[::1]:3000` and IPv4 `127.0.0.1:3000`.

### 1.3 3D Cinematic Intro Modal
- **`src/App.jsx`**: Lines 29-43:
  ```javascript
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('su_intro_seen_session');
    } catch (e) {
      return true;
    }
  });
  ```
- **`src/components/CinematicIntro.jsx`**:
  - Root dialog: `.cinematic-intro-root` (`role="dialog"`, `aria-label="Giới thiệu điện ảnh Hào Khí Tây Sơn"`, line 105).
  - Dismiss button (instant, no delay): `button.intro-skip-btn` (text: `Bỏ qua giới thiệu (Esc)`, line 228).
  - Enter button (triggers 850ms gate transition before entry): `button.intro-enter-btn` (text: `BƯỚC VÀO ĐẠI BẢN DOANH`, line 214).
  - Fast programmatic bypass:
    `page.addInitScript(() => sessionStorage.setItem('su_intro_seen_session', 'v1'));` completely prevents the intro modal from rendering.

### 1.4 Sonner Notification System
- **`src/App.jsx`**: Line 3 and Line 96:
  `import { Toaster } from 'sonner';`
  `<Toaster position="top-right" richColors theme="dark" />`
- **DOM Container**:
  Verified present in live DOM snapshot:
  `<section aria-label="Notifications alt+T" tabindex="-1" data-sonner-toaster="true">`
  Selector: `[data-sonner-toaster]` or `section[aria-label*="Notifications"]`.
  Toast item selector: `[data-sonner-toast]` or `[data-sonner-toast][data-type="success"]`.

### 1.5 Navigation Bar (Navbar.jsx)
- **`src/components/Navbar.jsx`**: Lines 7-15, 63-75, 80-88:
  - Header: `header.navbar`
  - Logo button: `button.navbar-logo` (text: `HÀO KHÍ TÂY SƠN`)
  - 7 Tab navigation buttons (`ul.navbar-nav-list li button.nav-link`):
    1. **Trang Chủ**: `button.nav-link:has-text("Trang Chủ")` (activates `home`, container `.home-page`)
    2. **Dòng Thời Gian**: `button.nav-link:has-text("Dòng Thời Gian")` (activates `timeline`, container `.timeline-page`)
    3. **Sa Bàn**: `button.nav-link:has-text("Sa Bàn")` (activates `battle-map`, container `.battle-map-page`)
    4. **Bảo Tàng**: `button.nav-link:has-text("Bảo Tàng")` (activates `museum`, container `.museum-page`)
    5. **Sử Quan AI**: `button.nav-link:has-text("Sử Quan AI")` (activates `ai-station`, container `.ai-station-page`)
    6. **Đố Vui**: `button.nav-link:has-text("Đố Vui")` (activates `quiz`, container `.quiz-page`)
    7. **Đánh Giá**: `button.nav-link:has-text("Đánh Giá")` (activates `survey`, container `.survey-page`)
  - Active Tab State: class `.active` and attribute `aria-current="page"`.
  - Admin button (Navbar): `button.navbar-admin-btn` (text: `Admin`). When logged in: `button.navbar-admin-btn.active-admin`.
  - Sound toggle: `.navbar-actions button.btn-icon[aria-label*="âm thanh"]`.
  - Mobile Menu Toggle: `button.mobile-nav-toggle[aria-label="Mở menu"]`.
  - Mobile Overlay: `#mobile-nav-overlay.mobile-menu-overlay`, close button: `#mobile-nav-overlay button[aria-label="Đóng menu"]`.

### 1.6 HomeTab (Trang Chủ)
- **`src/tabs/HomeTab.jsx`**:
  - Container: `.tab-page.home-page`
  - Hero Title: `#hero-title.hero-title-gold-3d`
  - Hero CTA 1: `button.btn-battle-glow` (text: `Khám phá Sa Bàn Trận Đánh`) -> switches to `battle-map`.
  - Hero CTA 2: `button.btn-scholar-trans` (text: `Đàm đạo cùng Sử Quan AI`) -> switches to `ai-station`.
  - Bento Feature Cards:
    - Sa Bàn: `.bento-card.bento-card-map`
    - Other Bento Cards: `.bento-card`

### 1.7 TimelineTab (Dòng Thời Gian)
- **`src/tabs/TimelineTab.jsx`**:
  - Container: `.tab-page.timeline-page`
  - 4 Era filter pills (`.timeline-era-nav button.timeline-era-btn`):
    - "Toàn bộ 10 mốc son" (`activeEra === 'all'`)
    - "1753–1777: Khởi nghĩa Tây Sơn"
    - "1785–1786: Đánh Xiêm & Phù Lê"
    - "1788–1792: Đại phá Thanh & Canh tân"
  - Timeline Cards: `article.timeline-zigzag-card`
  - Card Action 1 (Modal): `button.timeline-btn-gold-outline` (text: `Khảo Cứu Sử Tích`) -> opens `.timeline-modal-content[role="dialog"]`, close button: `button.timeline-modal-close`.
  - Card Action 2 (Sa Bàn): `button.timeline-btn-gold-solid` (text: `Sa Bàn Trận Đánh`).
  - Card Action 3 (Ask AI): `button.timeline-btn-ghost` (text: `Hỏi AI`) -> switches to `ai-station`.

### 1.8 BattleMapTab (Sa Bàn Chiến Trận)
- **`src/tabs/BattleMapTab.jsx`**:
  - Container: `.battle-map-page`
  - Leaflet Map: `.leaflet-map-element`
  - Battle Selectors (Top-Left): `.battle-selector-bar button.battle-selector-btn`:
    - `button.battle-selector-btn:has-text("Rạch Gầm")` (id: `'rach-gam'`)
    - `button.battle-selector-btn:has-text("Phú Xuân")` (id: `'phu-xuan-hue'`)
    - `button.battle-selector-btn:has-text("Ngọc Hồi")` (id: `'ngoc-hoi-dong-da'`)
  - Tactical Phase Pills (Bottom-Center): `.battle-phase-pills button.battle-phase-pill`
  - Map Layers (Bottom-Right): `.battle-layer-control button.battle-layer-btn`:
    - Google Hybrid: `button.battle-layer-btn:has-text("Google Vệ Tinh")`
    - Google Roadmap: `button.battle-layer-btn:has-text("Google Bản Đồ")`
    - Terrain: `button.battle-layer-btn:has-text("Địa Hình")`
  - Tactical Drawer: `.battle-drawer` (has class `.open` when active), close button: `button.drawer-close-btn`.
  - Mini-Quiz in Drawer: `button.battle-mini-quiz-btn` (text: `Thử thách Trắc nghiệm (+10 điểm)`).
  - Mini-Quiz Popup Dialog: `.battle-quiz-modal`
    - Close: `button.battle-quiz-close`
    - Options: `button.battle-quiz-option-btn`
    - Feedback: `.battle-quiz-feedback`

### 1.9 MuseumTab (Bảo Tàng Hiện Vật)
- **`src/tabs/MuseumTab.jsx`**:
  - Container: `.tab-page.museum-page`
  - Search Input: `input.museum-search-input` (placeholder: `Tìm kiếm bảo vật, vũ khí, cổ vật...`)
  - Clear Search: `button.museum-clear-search-btn`
  - Category Filter Select: `select.museum-category-select`
  - Plaque Cards: `.museum-grid article.museum-plaque-card`
  - Artifact Title: `.museum-plaque-title`
  - Card Action Button: `button.museum-plaque-action-btn` (text: `Khảo Cứu Hiện Vật`)
  - 60/40 Exhibition Modal:
    - Container: `.museum-modal-frame[role="dialog"]`
    - Title: `#modal-artifact-title`
    - Close button: `button.museum-modal-close-btn`
    - Media column: `.museum-modal-media-col img.museum-modal-img`
    - Info column: `.museum-modal-info-col`

### 1.10 AiStationTab (Sử Quan AI)
- **`src/tabs/AiStationTab.jsx`**:
  - Container: `.tab-page.ai-station-page`
  - Clear / Reset Chat: `button.btn-chat-header-action[title*="Làm mới"]` (line 223)
  - Quick Prompt Edict Chips (Chiếu Thư Khởi Vấn):
    - Container: `.inline-prompts-edict-container`
    - Chips: `button.scroll-edict-chip` (e.g. `button.scroll-edict-chip:has-text("Bí quyết hành quân")`)
  - Chat Input: `input.ai-input-field` (placeholder: `Hỏi Sử Quan về thân thế...`)
  - Send Button: `button.ai-send-btn-gold`
  - Message Bubbles: `.chat-bubble-row` (bot: `.bot-row`, user: `.user-row`)
  - Bot Text Content: `.chat-bubble-box.bot-box-scroll .chat-text-content`
  - Thinking Indicator: `.thinking-dots`

### 1.11 QuizArenaTab (Đấu Trường Đố Vui)
- **`src/tabs/QuizArenaTab.jsx`**:
  - Container: `.tab-page.quiz-page`
  - 3 Level Cards: `.quiz-card-3d`
    - Level 1: `.quiz-card-3d:has-text("Khởi Khái Môn")` (key: `'co-ban'`)
    - Level 2: `.quiz-card-3d:has-text("Binh Pháp Khắc Địch")` (key: `'nang-cao'`)
    - Level 3: `.quiz-card-3d:has-text("Kỳ Tài Vương Triều")` (key: `'chuyen-sau'`)
  - In-Play Quiz Box: `.quiz-play-box`
  - Question Text: `h3.quiz-question-text`
  - Option Buttons: `button.quiz-option-btn` (includes `.opt-letter` and `.opt-text`)
  - Explanation & Next Button: `.quiz-explanation-box .explanation-actions button` (`Câu tiếp theo`)
  - Result Card: `.quiz-result-card`

### 1.12 SurveyTab (Khảo Sát & Đánh Giá)
- **`src/tabs/SurveyTab.jsx`**:
  - Container: `.tab-page.survey-page`
  - View Switchers (`.survey-tab-switch button.survey-toggle-btn`):
    - Reviews: `button.survey-toggle-btn:has-text("Đánh Giá & Nhận Xét Cộng Đồng")`
    - Google Form: `button.survey-toggle-btn:has-text("Biểu Mẫu Khảo Sát (Google Form)")`
    - Google Sheet (Admin only): `button.survey-toggle-btn:has-text("Bảng Tính Excel Đồng Bộ (Admin)")`
  - Cloud Refresh Button: `button.btn-sync-refresh-pill` (text: `Làm mới`)
  - Write Review Toggle: `button.btn-write-review` (text: `Viết Đánh Giá Của Bạn` / `Đóng Biểu Mẫu`)
  - Review Input Form: `.review-input-form`
    - Rating Stars (1-5): `.star-picker-interactive button.star-btn` (index 0 to 4)
    - Name Input: `.review-input-form input[placeholder*="Nguyễn Văn An"]`
    - Role Input: `.review-input-form input[placeholder*="12A8"]`
    - Comment Textarea: `.review-input-form textarea[placeholder*="Chia sẻ cảm nghĩ"]`
    - Submit Button: `.review-input-form button[type="submit"]` (text: `Đăng Đánh Giá Lên Bảng Tin`)
  - Review Feed Cards: `.reviews-feed-container`
  - Admin button inside Survey: `button.config-link-btn` / `button.btn-admin-config-link`

### 1.13 Admin Control Center (AdminKnowledgeModal.jsx)
- **`src/components/AdminKnowledgeModal.jsx`**:
  - Open Trigger: `button.navbar-admin-btn` (Navbar) or `button.btn-admin-config-link` (SurveyTab)
  - Unauthenticated State:
    - Login Box: `.admin-login-box`
    - PIN input: `.admin-login-box input[type="password"]`
    - Submit Button: `.admin-login-box button.login-btn` (text: `Mở Khóa`)
    - Valid PIN: `1789` (from `AdminContext.jsx`: `VALID_PINS = ['1789', '12a8', '1234', 'admin123', 'lequangtrung']`)
    - Error message on invalid PIN: `.admin-login-box div` with red text
  - Authenticated State:
    - 4 Segmented Tabs (`.admin-segmented-nav button.admin-segmented-tab`):
      1. `button.admin-segmented-tab:has-text("Khảo Sát & Google Sheets")`
      2. `button.admin-segmented-tab:has-text("Kho Tri Thức Sử Liệu AI")`
      3. `button.admin-segmented-tab:has-text("Bảo Tàng Hiện Vật")`
      4. `button.admin-segmented-tab:has-text("Thông Tin & Hệ Thống")`
    - Logout Admin: `button:has-text("Thoát Admin")`
    - Close Modal: `button.close-btn[aria-label="Đóng cửa sổ"]`

---

## 2. Logic Chain

1. **Test Environment Strategy**:
   - Playwright requires an available Chromium engine. On this Windows machine, the standalone `chromium_headless_shell` is absent, but Google Chrome and Microsoft Edge are fully installed.
   - Supplying `{ channel: 'chrome', headless: true }` (or `playwright-cli open --browser=chrome`) immediately leverages the local Chrome installation, achieving 100% headless test execution without network downloads or package installation.
   - Setting `$env:NODE_PATH = "C:\Users\DUY KHANG\AppData\Roaming\npm\node_modules\@playwright\cli\node_modules"` allows standard Node.js scripts in `tests/` or `scripts/` to import `const { chromium } = require('playwright');` directly.

2. **3D Intro Modal Flow**:
   - When loading `http://localhost:3000`, `App.jsx` evaluates `sessionStorage.getItem('su_intro_seen_session')`.
   - If not set, `.cinematic-intro-root` renders. Clicking `button.intro-skip-btn` immediately closes it; alternatively, `page.addInitScript(() => sessionStorage.setItem('su_intro_seen_session', 'v1'))` cleanly bypasses it before React mounts.
   - For Tier 1 feature verification of the intro itself, test without the bypass and verify `button.intro-enter-btn` and `button.intro-skip-btn`.

3. **DOM Selector Stability**:
   - `Navbar.jsx` renders all 7 navigation items as `button.nav-link` with explicit text labels ("Trang Chủ", "Dòng Thời Gian", "Sa Bàn", "Bảo Tàng", "Sử Quan AI", "Đố Vui", "Đánh Giá").
   - Each tab's root container has unique, stable classes:
     - Home: `.home-page`
     - Timeline: `.timeline-page`
     - Battle Map: `.battle-map-page`
     - Museum: `.museum-page`
     - AI: `.ai-station-page`
     - Quiz: `.quiz-page`
     - Survey: `.survey-page`
   - Tab switching uses Framer Motion `<AnimatePresence mode="wait">`. Waiting for tab transitions requires at least 500ms or `waitForSelector(..., { timeout: 5000 })` to allow unmount animation to settle.

4. **Live Verification Proof**:
   - In `scripts/verify-probe.cjs`, we automated the entire flow (intro bypass -> all 7 tabs -> admin PIN 1789 auth -> 4 admin tabs -> battle selection -> museum search & modal -> AI quick prompt chips -> survey review form & 5-star rating).
   - Execution finished with code 0 and **0 console errors**.

---

## 3. Caveats

1. **Audio Autoplay**:
   - Several components include `<audio>` or `BackgroundMusic.jsx`. In headless browsers, autoplay policies may prevent sounds from playing; however, this causes no fatal exceptions.
2. **Google Hybrid Satellite Tiles in Leaflet**:
   - The battle map loads Google Maps tiles from `{s}.google.com`. In an offline environment, tile network requests might fail silently, but Leaflet and all tactical UI controls (buttons, drawers, mini-quiz) remain 100% operational.
3. **Google Sheets GViz & Gemini API**:
   - Real-world cloud sync or AI chat depends on external internet connection. In offline tests, fallback local knowledge and sample review caches are used gracefully.

---

## 4. Conclusion & Recommended Blueprint

The test infrastructure is fully viable without modifying `package.json` or production source code.

### Recommended Playwright Runner Structure
Create `scripts/run-e2e.cjs` (or `tests/e2e.test.cjs`) with:
1. `const { chromium } = require('playwright');`
2. Launch with `{ channel: 'chrome', headless: true }`.
3. Configure viewports:
   - Desktop: `1920x1080`
   - Mobile: `390x844` with `isMobile: true`, `hasTouch: true`.
4. Capture all 18 PNG screenshots into `d:\Projects\SchoolProjects\Su\screenshots/`:
   - `desktop-01-home.png` to `desktop-09-admin-modal.png`
   - `mobile-01-home.png` to `mobile-09-admin.png`
5. Collect and assert `errors.length === 0` from `page.on('console', ...)` and `page.on('pageerror', ...)`.

---

## 5. Verification Method

To verify these findings independently on Windows PowerShell:

1. **Verify Dev Server Listening on Port 3000**:
   ```powershell
   Get-NetTCPConnection -LocalPort 3000
   ```
   *Expected*: `Listen` state on `127.0.0.1` or `::1`.

2. **Verify Playwright Engine with Chrome Channel**:
   ```powershell
   $env:NODE_PATH = "C:\Users\DUY KHANG\AppData\Roaming\npm\node_modules\@playwright\cli\node_modules"
   node -e "const { chromium } = require('playwright'); (async () => { const b = await chromium.launch({ channel: 'chrome', headless: true }); console.log('LAUNCH_OK'); await b.close(); })();"
   ```
   *Expected*: Prints `LAUNCH_OK`.

3. **Run the Verified Probe Script**:
   ```powershell
   $env:NODE_PATH = "C:\Users\DUY KHANG\AppData\Roaming\npm\node_modules\@playwright\cli\node_modules"
   node scripts/verify-probe.cjs
   ```
   *Expected*:
   ```
   --- Starting Playwright Full Flow Probe ---
   App loaded without intro: true
   Sonner container found count: 1
   Navigated to Dòng Thời Gian successfully!
   Navigated to Sa Bàn successfully!
   Navigated to Bảo Tàng successfully!
   Navigated to Sử Quan AI successfully!
   Navigated to Đố Vui successfully!
   Navigated to Đánh Giá successfully!
   Navigated to Trang Chủ successfully!
   Admin login box opened successfully!
   Admin authenticated and 4 segmented tabs displayed!
   ...
   Console errors recorded: 0
   --- Playwright Full Flow Probe: ALL PASSED PERFECTLY ---
   ```
