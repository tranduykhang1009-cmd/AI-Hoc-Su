# Handoff Report: Visual Design, Motion Craft & Notification Audit

**Agent:** explorer_survey_2 (Design & Motion Explorer)  
**Recipient:** parent / orchestrator  
**Milestone:** survey_and_analysis  
**Handoff Type:** Hard  

---

## 1. Observation

### Visual Styling & Palette Observations
- `src/App.css` lines 12–28:
  ```css
  --bg-canvas: #0F0D0B;
  --bg-surface: #1A1614;
  --bg-elevated: #221D1A;
  --accent: #A64B3D;
  --accent-subtle: rgba(166, 75, 61, 0.12);
  --gold: #C9A961;
  ```
  The canvas is set to warm-charcoal brown `#0F0D0B` with terracotta accent `#A64B3D`, contrasting with user requirement R1 requiring Obsidian Black `#08090C`, Antique Bronze, and Imperial Amber Gold (`#F59E0B` / `#D97706`).
- `src/tabs/HomeTab.jsx` lines 48–50:
  ```html
  <div className="hero-bg-blob-left" />
  <div className="hero-bg-blob-right" />
  <div className="hero-bg-blob-center" />
  ```
  AI-slop blurred colored background blobs are present in the hero section.
- `src/App.css` lines 530, 4033, 5568, 7330:
  Neon glow elements present: `.ambient-radial-glow`, `.statue-gold-rim-glow`, `.btn-battle-glow` (`box-shadow: 0 0 25px rgba(234, 88, 12, 0.45)`), and `.bubble-glow-ring`.
- `src/App.css` lines 253, 1765, 2998, 4180, 5572, 7307 (55+ matches):
  Extensive use of multi-stop `linear-gradient` across buttons, text clipping, and background containers.

### Motion Craft & Micro-Interactions Observations
- `package.json` line 13: `"framer-motion": "^12.4.7"` is installed.
- `src/components/Navbar.jsx` lines 63–75:
  ```jsx
  {NAV_ITEMS.map((item) => (
    <li key={item.id}>
      <button
        type="button"
        className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
        onClick={() => handleTabClick(item.id)}
  ```
  Navigation uses plain CSS class toggle `.active` with static underline `::after`. No shared layout sliding pill (`layoutId`).
- `src/components/AdminKnowledgeModal.jsx` lines 528–561:
  Admin tab switching uses plain CSS `.active` on segmented buttons without `layoutId`.
- `grep_search` across `src/`:
  - `whileTap`: exactly 1 occurrence (`src/components/FloatingAiWidget.jsx:102`).
  - `whileHover`: exactly 2 occurrences (`src/components/FloatingAiWidget.jsx:101`, `src/tabs/QuizArenaTab.jsx:373`).
  - `prefers-reduced-motion`: 0 occurrences across `src/`.
- Transitions in JSX (`src/tabs/HomeTab.jsx`, `TimelineTab.jsx`, `BattleMapTab.jsx`, `MuseumTab.jsx`, `QuizArenaTab.jsx`, `AdminKnowledgeModal.jsx`):
  All use fixed duration-based timing (`transition={{ duration: 0.2 }}` or `0.3`) without spring physics (`stiffness: 350, damping: 28`).
- `src/App.css` lines 662, 848, 884, 913, 1288, 1574, 1809, 2148, 2253, 3373:
  `transition: all var(--transition-fast);` used in over 20 places, violating composite-only performance.
- `src/components/FloatingAiWidget.jsx:40` & `src/components/ContactBubbleWidget.jsx:67`:
  Popovers animate with `scale: 0.85` from default `transform-origin: center` rather than anchored to the trigger (`bottom right`).

### Toast & Notification Observations
- `package.json`: `sonner` is not installed.
- `src/components/Toast.jsx` lines 1–16:
  A custom 16-line non-stacking toast component used in `BattleMapTab.jsx:598` and `MuseumTab.jsx:508`.
- `grep_search` for `alert(` across `src/`:
  7 verbatim calls found:
  - `src/components/AdminKnowledgeModal.jsx:145`: `alert('Không thể lưu cấu hình: ' + err.message);`
  - `src/components/AdminKnowledgeModal.jsx:236`: `alert('File Word không có nội dung văn bản.');`
  - `src/components/AdminKnowledgeModal.jsx:247`: `alert('Không thể đọc file Word: ' + err.message);`
  - `src/components/AdminKnowledgeModal.jsx:282`: `alert('File JSON không đúng định dạng mảng tài liệu.');`
  - `src/components/AdminKnowledgeModal.jsx:303`: `alert('Vui lòng nhập đầy đủ tiêu đề và nội dung sử liệu.');`
  - `src/components/AdminKnowledgeModal.jsx:377`: `alert('Kích thước ảnh phải nhỏ hơn 5MB');`
  - `src/tabs/SurveyTab.jsx:260`: `alert('Vui lòng điền họ tên và nội dung đánh giá của bạn.');`
- Silent / ephemeral clipboard copying:
  - `src/tabs/SurveyTab.jsx:75`: `navigator.clipboard.writeText(url)`
  - `src/components/AdminKnowledgeModal.jsx:95`: `navigator.clipboard.writeText(url)`
  - `src/components/ContactBubbleWidget.jsx:41`: `navigator.clipboard.writeText(GMAIL_ADDRESS)`
- Asynchronous operations with local text banners:
  - `src/tabs/SurveyTab.jsx:284`: `sendReviewToCloud().then(...)`
  - `src/components/AdminKnowledgeModal.jsx:154`: `fetchReviewsFromCloud(...)`
  - `src/tabs/AiStationTab.jsx:63`: `saveGeminiApiKey(...)`

---

## 2. Logic Chain

1. **Premise 1:** The user specifications (R1, R2, R3) and Taste Skill rules prohibit artificial glows, AI background blobs, multi-color linear gradients, and terracotta assistant palettes, demanding Obsidian Black `#08090C`, Imperial Amber Gold `#F59E0B`/`#D97706`, and subtle hairline borders.
2. **Premise 2:** Observations confirm `#0F0D0B` canvas, terracotta `--accent: #A64B3D`, 55+ gradients, 4 glowing box-shadow selectors, and 3 background blobs in the hero.
3. **Inference 1:** The visual styling directly violates Taste Skill v2 rules (§397, §398, §399) and user requirement R1. Refactoring `:root` tokens and stripping blobs/glows is required.
4. **Premise 3:** Emil Kowalski motion principles require spring physics (`stiffness: 350, damping: 28`), tactile response on interactive controls (`whileTap={{ scale: 0.96 }}`), shared layout pill sliding tabs (`layoutId`), trigger-aware popover origins, and reduced motion accessibility.
5. **Premise 4:** Observations prove that 0 navigation tabs use `layoutId`, only 1 element has `whileTap`, 0 elements handle `prefers-reduced-motion`, all modals use duration-based timing, and `transition: all` is rampant.
6. **Inference 2:** The current motion lacks high-craft tactile feel and will stutter or drop frames. Introducing shared layout pills in `Navbar` and `AdminKnowledgeModal`, spring physics in dialogs, and a global reduced-motion query will satisfy R2.
7. **Premise 5:** R3 requires installing `sonner` (`<Toaster position="top-right" richColors theme="dark" />`) and replacing all alerts, silent actions, and custom toasts.
8. **Premise 6:** Observations locate exactly 7 raw `alert()` calls, 2 files using the legacy custom `Toast.jsx`, and 5 silent/ephemeral state handlers.
9. **Inference 3:** Mounting Sonner at the root of `App.jsx`, replacing the 7 alerts and silent actions with `toast.success`, `toast.error`, and `toast.promise`, and deleting `src/components/Toast.jsx` achieves complete compliance with R3.

---

## 3. Caveats

- **Network-dependent dependencies:** `npm install sonner` requires internet access in the execution phase. Since `package.json` uses React 19 (`^19.0.0`), `sonner` v1.7+ should be installed to ensure seamless peer dependency resolution.
- **Leaflet Map Integration:** `BattleMapTab.jsx` uses Leaflet DOM overlays (`leaflet-map-element`). Care must be taken not to apply Framer Motion transforms to the Leaflet tile canvas itself, only to the React UI container controls and HUD pills.
- **Audio Sound Effects:** Existing chime and war drum sound effects (`playChime`, `playWarDrum`, `playCorrectSound`) work well and should be preserved in sync with Sonner toast triggers.

---

## 4. Conclusion

The application is architecturally sound and functionally rich, but its visual and motion layers currently exhibit the hallmarks of an AI template. To attain international design engineering standards (Awwwards level):
1. **Visual:** Update `:root` to Obsidian Black `#08090C`, Imperial Amber Gold `#F59E0B`/`#D97706`, and Antique Bronze `#8C6D37`; strip hero background blobs and neon glows.
2. **Motion:** Wire `layoutId` pill indicators into `Navbar.jsx` and `AdminKnowledgeModal.jsx`; replace duration transitions with spring physics (`stiffness: 350, damping: 28`); equip buttons with `whileTap={{ scale: 0.96 }}`; anchor popovers to `bottom right`; and enforce `@media (prefers-reduced-motion: reduce)`.
3. **Notifications:** Install `sonner`, mount `<Toaster position="top-right" richColors theme="dark" />` in `App.jsx`, replace all 7 `alert()` calls and clipboard handlers with `toast.*`, and delete `src/components/Toast.jsx`.

---

## 5. Verification Method

To independently verify these findings and confirm resolution after implementation:

1. **Verify Visual Tokens & No Slop:**
   - Inspect `src/App.css`: verify `--bg-canvas` is `#08090C`, `--accent` is `#F59E0B`/`#D97706`.
   - Grep for banned glows:
     ```powershell
     rg -i "btn-battle-glow|statue-gold-rim-glow|hero-bg-blob" src/
     ```
     Result must be empty.
2. **Verify Motion Craft:**
   - Check `src/components/Navbar.jsx` and `AdminKnowledgeModal.jsx` for `layoutId`.
   - Check `src/App.css` for `@media (prefers-reduced-motion: reduce)`.
   - Grep for `whileTap`:
     ```powershell
     rg "whileTap" src/
     ```
     Result must show tactile tap feedback across buttons and cards.
3. **Verify Sonner Installation & 0 Raw Alerts:**
   - Check `package.json` contains `"sonner"`.
   - Check `src/App.jsx` mounts `<Toaster position="top-right" richColors theme="dark" />`.
   - Grep for raw `alert(` calls in `src/`:
     ```powershell
     rg "alert\(" src/
     ```
     Result must be 0 matches.
4. **Build & Runtime Validation:**
   - Run `npm run build` to confirm zero TypeScript/JSX bundling errors.
   - Run Playwright CLI to inspect interaction flow and capture desktop & mobile screenshots.
