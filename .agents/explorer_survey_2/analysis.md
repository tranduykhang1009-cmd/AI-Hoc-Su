# Visual Design, Motion Craft & Notification Audit Report

**Author:** Explorer Survey 2 (Design & Motion Explorer)  
**Date:** 2026-10-29  
**Target Application:** Nền Tảng Số Hóa Di Sản "Hào Khí Tây Sơn" (`d:\Projects\SchoolProjects\Su`)  
**Specification References:** `ORIGINAL_REQUEST.md` (R1, R2, R3), Taste Skill v2, Emil Kowalski Motion Craft, Sonner Skill  

---

## 1. Executive Summary

A comprehensive, read-only audit of the visual styling, animation physics, and notification system of the "Hào Khí Tây Sơn" codebase reveals strong historical research foundations, but significant opportunities to elevate the aesthetic and interaction craft from a standard AI-generated template to an award-winning, museum-grade digital heritage experience.

Key findings across the three core domains:
1. **Visual Styling & Anti-Slop (Taste Skill v2 / R1):**  
   The current styling relies on a warm-dark charcoal base (`#0F0D0B`), terracotta accent (`#A64B3D`), and over 55 instances of bright CSS `linear-gradient` / neon glows (such as `.ambient-radial-glow`, `.btn-battle-glow`, `.statue-gold-rim-glow`, and `.hero-bg-blob-*`). This creates an "AI-slop / gaming template" impression rather than a solemn national heritage museum. It must transition to Obsidian Black (`#08090C`), Antique Bronze (`#8C6D37` / `#B8860B`), and Imperial Amber Gold (`#F59E0B` / `#D97706`), with subtle hairline borders, dignified tonal surface stepping, and pure typographic hierarchy.
2. **Motion Craft & Micro-interactions (Emil Kowalski / R2):**  
   Framer Motion v12 is installed, but animations across all tabs and modals currently use mechanical, duration-based transitions (`transition={{ duration: 0.2 }}` or `0.3s`) with default CSS easings. Only *one* component uses `whileTap`, and only *two* use `whileHover`. There are *no* shared-layout sliding pill tabs (`layoutId`), popovers lack trigger-origin awareness, `transition: all` is rampant (violating the 60fps composite-only rule), and `@media (prefers-reduced-motion: reduce)` is completely missing across CSS, Framer Motion, and the HTML5 canvas ember particle engine.
3. **Toast & Notification System (Sonner / R3):**  
   The application is currently fragmented: a custom, non-stackable `<Toast />` component is used in `BattleMapTab.jsx` and `MuseumTab.jsx`, 7 raw `window.alert()` dialogs exist in `AdminKnowledgeModal.jsx` and `SurveyTab.jsx`, 7 `window.confirm()` native alerts block the thread, and key actions (clipboard copying, Google Sheets sync, API key saves) rely on ephemeral local state text banners. Installing official `sonner` in React 19 and mounting `<Toaster position="top-right" richColors theme="dark" />` at the root of `App.jsx` provides an immediate, unified solution.

---

## 2. Visual Styling & Anti-Slop Audit (R1 & Taste Skill)

### 2.1 Color Palette: Current vs. R1 Imperial Heritage

| Token / Concept | Current Implementation (`src/App.css`) | Target Specification (R1 & Taste v2) | Anti-Slop Rationale |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--bg-canvas: #0F0D0B;` (warm brownish charcoal) | `--bg-canvas: #08090C;` (Obsidian Black) | Replaces generic warm-brown AI tone with infinite deep obsidian, creating sharp museum contrast. |
| **Card / Surface** | `--bg-surface: #1A1614;`<br>`--bg-elevated: #221D1A;` | `--bg-surface: #101216;`<br>`--bg-elevated: #16181F;` | Tonal steps with cool dark obsidian undertones instead of muddy reddish brown. |
| **Primary Accent** | `--accent: #A64B3D;` (Terracotta / Reddish rust)<br>`--accent-hover: #B85344;` | `--accent: #D97706;`<br>`--accent-hover: #F59E0B;` (Imperial Amber Gold) | Eliminates the banned "assistant terracotta palette" (Taste rule 399: *No assistant palette with terracotta or rust*); elevates royal Tây Sơn insignia. |
| **Historical Gold** | `--gold: #C9A961;`<br>`--cin-gold-bright: #FFEAA7;`<br>`raw #FFD700` in quiz/cards | `--gold-primary: #F59E0B;`<br>`--gold-deep: #D97706;`<br>`--bronze-antique: #8C6D37;` | Unifies 8 discordant gold hues into an authoritative Imperial Amber & Antique Bronze pairing. |
| **Border Tone** | `--border-subtle: rgba(240, 232, 220, 0.06);`<br>`--border-visible: rgba(240, 232, 220, 0.12);` | `--border-subtle: rgba(217, 119, 6, 0.12);`<br>`--border-hairline: rgba(245, 158, 11, 0.20);` | Subtle amber-tinted hairline borders that define cards without heavy gray outlines. |
| **Text Primary** | `--text-primary: #F0E8DC;` (cream yellow) | `--text-primary: #F3F4F6;` (High-contrast pure stone ivory) | Ensures AA/AAA readability against `#08090C`, eliminating yellowish cast. |
| **Text Secondary** | `--text-secondary: #B5A898;` (dusty brown) | `--text-secondary: #9CA3AF;` (neutral stone gray) | Clean editorial legibility with 7:1+ contrast against obsidian background. |

### 2.2 Identification of AI-Slop & Neon Patterns

Taste Skill v2 explicitly penalizes generic AI design artifacts:
1. **Background Blurs & Blobs (`src/tabs/HomeTab.jsx:48-50`):**
   ```html
   <div className="hero-bg-blob-left" />
   <div className="hero-bg-blob-right" />
   <div className="hero-bg-blob-center" />
   ```
   *Issue:* Floating blurry colored circles behind the hero text are the archetype of generic AI landing pages.
   *Fix:* Replace with a subtle historical scrim or authentic archival bronze drum watermark texture; let typography and real artifacts carry the stage.
2. **Neon Glows & Radiance Rings (`src/App.css`):**
   - Line 530: `.ambient-radial-glow` (large red & gold radial blur gradients in `App.jsx:100-101`)
   - Line 4033: `.statue-gold-rim-glow` (box-shadow glow on statue)
   - Line 5568: `.btn-battle-glow` (`box-shadow: 0 0 25px rgba(234, 88, 12, 0.45)`)
   - Line 7330: `.bubble-glow-ring` (pulsing neon ring around contact bubble)
   *Rule (Taste §398):* *"No shadows on things at rest. No glows. A tone step between surfaces. Shadows only on what truly floats."*
   *Fix:* Remove glowing halos. Buttons should be styled with crisp, solid imperial amber backgrounds or refined hairline borders.
3. **Overuse of Linear Gradients (55+ occurrences in `src/App.css`):**
   - Text gradient clipping (`background: linear-gradient(...)`, `-webkit-background-clip: text`) on titles.
   - Button gradients (`#991B1B` to `#EA580C`).
   *Rule (Taste §397):* *"No gradients. Not as backgrounds, not on buttons, not in text. Flat colour, or a real photograph."*
   *Fix:* Use solid Imperial Amber Gold (`#F59E0B`) or deep obsidian with bronze borders.

### 2.3 Typography & Visual Hierarchy

- **Display Serif Font:** `Fraunces` is loaded (`index.html`) and configured as `--font-display`. Its variable optical size (`opsz`) and bold historical serifs are ideal for Vietnamese imperial history.
- **Body Sans-Serif Font:** `Be Vietnam Pro` is loaded and handles Vietnamese tone marks cleanly.
- **Typography Sizing Table for Editorial Excellence:**
  - `Hero Title`: `clamp(2.5rem, 6vw, 4.25rem)` (Fraunces 900, tight tracking `-0.02em`, line-height `1.1`).
  - `Section Headings (h2)`: `clamp(1.75rem, 3.5vw, 2.5rem)` (Fraunces 700, line-height `1.2`).
  - `Card / Modal Titles (h3)`: `1.25rem - 1.5rem` (Fraunces 600).
  - `Body Text (p)`: `1rem` (16px, `Be Vietnam Pro`, line-height `1.65`, `--text-primary`).
  - `Academic Quotes / Proclamations`: `1.125rem` (Newsreader / Fraunces italic, with subtle left border in Antique Bronze).
  - *Eyebrows eliminated:* The tiny pill badges above headers ("New ·", category chips with uppercase spacing) should be integrated into proper subtext sentences per Taste rule 393.

---

## 3. Motion & Micro-Interactions Audit (Emil Kowalski Craft)

### 3.1 Framer Motion Component Inventory

| Component / Tab | File Path | Current Motion Implementation | Audit Finding & Emil Kowalski Fix |
| :--- | :--- | :--- | :--- |
| **Main Navigation** | `src/components/Navbar.jsx` | Plain CSS class toggle `.active` (underline `::after`) | Missing `layoutId` pill sliding background tab (`layoutId="navbar-pill"`). |
| **Hero Section & Bento** | `src/tabs/HomeTab.jsx` | `variants={containerVariants}` with staggered children, cards have hover CSS translateY(-2px) | Missing `whileHover={{ y: -2, scale: 1.01 }}` and `whileTap={{ scale: 0.96 }}` on Bento cards. |
| **Timeline Stream** | `src/tabs/TimelineTab.jsx` | Row entrance `transition={{ duration: 0.35, delay: idx * 0.04 }}` | Duration-based linear ease; era filter lacks sliding pill `layoutId="timeline-era-pill"`. |
| **Timeline Detail Modal** | `src/tabs/TimelineTab.jsx:293` | Modal scale from `0.95` with `duration: 0.25` | Needs spring physics (`stiffness: 350, damping: 28`). |
| **Battle Map Controls** | `src/tabs/BattleMapTab.jsx:319` | Top-left battle switcher buttons use `.active` CSS | Missing shared layout sliding pill (`layoutId="battle-map-pill"`). |
| **Museum Artifacts Grid** | `src/tabs/MuseumTab.jsx:375` | Modal detail uses `duration: 0.2` | Needs spring physics; artifact cards lack tactile `whileTap={{ scale: 0.98 }}`. |
| **AI Station Messages** | `src/tabs/AiStationTab.jsx:261` | Messages animate `y: 4` with `duration: 0.2` | Clean, but needs custom curve `cubic-bezier(0.16, 1, 0.3, 1)`. |
| **Quiz Level 3D Cards** | `src/tabs/QuizArenaTab.jsx:370` | `whileHover={{ y: -8, scale: 1.02 }}` with `duration: 0.25` | `y: -8` is exaggerated; change to `whileHover={{ y: -3, scale: 1.015 }}`, add `whileTap={{ scale: 0.96 }}`. |
| **Quiz Answer Buttons** | `src/tabs/QuizArenaTab.jsx:568` | Plain HTML `<button>` with CSS class | Needs `motion.button` with `whileTap={{ scale: 0.97 }}` for instant tactile feedback. |
| **Admin Control Center** | `src/components/AdminKnowledgeModal.jsx:528` | 4 admin segmented tabs use plain CSS `.active` | Missing `layoutId="admin-active-pill"` shared sliding tab. |
| **Admin PIN Modal** | `src/components/AdminPinModal.jsx:36` | Modal entrance `scale: 0.9, y: 16, duration: 0.2` | Needs spring physics (`stiffness: 350, damping: 28`). |
| **Floating AI Widget** | `src/components/FloatingAiWidget.jsx:40` | Popover scales from center `scale: 0.85, y: 15` | Default center origin is incorrect; needs `transform-origin: bottom right`. |
| **Contact Bubble Widget** | `src/components/ContactBubbleWidget.jsx:67` | Popover scales from center `scale: 0.85, y: 15` | Needs `transform-origin: bottom right`, spring physics on popup. |

### 3.2 Emil Kowalski Before/After Review Table

| Before | After | Why (Emil Kowalski Philosophy) |
| :--- | :--- | :--- |
| `transition={{ duration: 0.3 }}` | `transition={{ type: "spring", stiffness: 350, damping: 28 }}` | Fixed durations feel mechanical. Spring physics simulate natural momentum and settle instantly without sluggish drag. |
| `transition={{ ease: "easeOut", duration: 0.22 }}` | `transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.22 }}` | Standard `ease-out` is too weak; custom cubic-bezier `(0.16, 1, 0.3, 1)` provides decisive initial movement and natural deceleration. |
| `transition: all var(--transition-fast);` (CSS) | `transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), opacity 160ms ease-out;` | `all` recalculates layout and paint properties, causing dropped frames. Composite-only transitions preserve 60fps budget. |
| No active press feedback on buttons | `whileTap={{ scale: 0.96 }}` | Buttons must feel physically responsive when clicked or tapped on mobile. |
| `whileHover={{ y: -8, scale: 1.02 }}` on cards | `whileHover={{ y: -2, scale: 1.01 }}` | Subtle lifts feel high-craft; exaggerated jumps feel like cheap toy widgets. |
| Tab change with instant CSS color swap | Shared layout pill `<motion.div layoutId="nav-pill" />` | Seamless sliding pill conveys spatial consistency across navigation modes. |
| Popover `transform-origin: center` | `style={{ transformOrigin: "bottom right" }}` | Popovers must scale directly out from the trigger button, not float in from nowhere. |
| No reduced-motion handling | `@media (prefers-reduced-motion: reduce)` + `useReducedMotion()` | Essential accessibility standard; preserves opacity feedback while eliminating motion sickness triggers. |

### 3.3 Shared Layout Pill Sliding Tab Implementation Recipe

For `src/components/Navbar.jsx`:
```jsx
// Before:
<li key={item.id}>
  <button
    type="button"
    className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
    onClick={() => handleTabClick(item.id)}
  >
    {item.label}
  </button>
</li>

// After:
<li key={item.id} style={{ position: 'relative' }}>
  <motion.button
    type="button"
    className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
    onClick={() => handleTabClick(item.id)}
    whileTap={{ scale: 0.96 }}
    whileHover={{ scale: 1.02 }}
    style={{ position: 'relative', zIndex: 2 }}
  >
    {item.label}
  </motion.button>
  {activeTab === item.id && (
    <motion.div
      layoutId="navbar-active-pill"
      className="navbar-pill-indicator"
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '8px',
        backgroundColor: 'rgba(217, 119, 6, 0.18)',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        zIndex: 1
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    />
  )}
</li>
```
*Exact same pattern to be applied to `src/components/AdminKnowledgeModal.jsx:528` (`layoutId="admin-active-pill"`).*

### 3.4 Accessibility: Prefers-Reduced-Motion Specification

1. **Global CSS Reset (`src/App.css`):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
2. **Canvas Particle Throttling (`src/components/AmbientEmbersCanvas.jsx`):**
Add guard in animation loop:
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  // Render static soft embers once, do not invoke requestAnimationFrame loop
  return;
}
```

---

## 4. Toast & Notification Audit (R3 Sonner Integration)

### 4.1 Complete Catalog of Existing Notification Calls

| # | File Path | Line | Current Code / Behavior | Triggering User Action | Proposed Sonner Replacement |
| :- | :--- | :--- | :--- | :--- | :--- |
| **1** | `src/components/AdminKnowledgeModal.jsx` | 145 | `alert('Không thể lưu cấu hình: ' + err.message);` | Lưu cấu hình Google Sheets thất bại | `toast.error('Không thể lưu cấu hình: ' + err.message)` |
| **2** | `src/components/AdminKnowledgeModal.jsx` | 236 | `alert('File Word không có nội dung văn bản.');` | Tải file Word rỗng | `toast.warning('File Word không chứa nội dung văn bản.')` |
| **3** | `src/components/AdminKnowledgeModal.jsx` | 247 | `alert('Không thể đọc file Word: ' + err.message);` | Lỗi phân tích cú pháp mammoth.js | `toast.error('Không thể đọc file Word: ' + err.message)` |
| **4** | `src/components/AdminKnowledgeModal.jsx` | 282 | `alert('File JSON không đúng định dạng mảng tài liệu.');` | File JSON sai schema tư liệu | `toast.error('File JSON không đúng cấu trúc mảng tài liệu sử liệu.')` |
| **5** | `src/components/AdminKnowledgeModal.jsx` | 303 | `alert('Vui lòng nhập đầy đủ tiêu đề và nội dung sử liệu.');` | Thêm tài liệu thiếu trường bắt buộc | `toast.warning('Vui lòng nhập đầy đủ tiêu đề và nội dung sử liệu.')` |
| **6** | `src/components/AdminKnowledgeModal.jsx` | 377 | `alert('Kích thước ảnh phải nhỏ hơn 5MB');` | Tải ảnh bảo tàng > 5MB | `toast.warning('Dung lượng ảnh vượt quá giới hạn 5MB.')` |
| **7** | `src/tabs/SurveyTab.jsx` | 260 | `alert('Vui lòng điền họ tên và nội dung đánh giá của bạn.');` | Gửi đánh giá chưa điền tên/bình luận | `toast.warning('Vui lòng điền họ tên và nội dung cảm nghĩ của bạn.')` |
| **8** | `src/tabs/BattleMapTab.jsx` | 598 | Custom `<Toast message={toastMessage} type="success" />` | Hoàn thành khám phá toàn bộ giai đoạn trận đánh | `toast.success('🏆 Đã khám phá toàn bộ diễn biến chiến trận!', { description: 'Bạn đã mở khóa toàn bộ tư liệu sa bàn.' })` |
| **9** | `src/tabs/MuseumTab.jsx` | 508 | Custom `<Toast message={toastMessage.text} type={toastMessage.type} />` | Lưu ảnh hiện vật, cảnh báo dung lượng, khôi phục ảnh | `toast.success(msg)`, `toast.warning(msg)`, `toast.info(msg)` |
| **10** | `src/tabs/SurveyTab.jsx` | 75 | `navigator.clipboard.writeText(url)` (Silent / timeout state) | Nhấn sao chép link biểu mẫu Google Form | `toast.success('Đã sao chép liên kết khảo sát vào bộ nhớ tạm!')` |
| **11** | `src/components/AdminKnowledgeModal.jsx` | 95 | `navigator.clipboard.writeText(url)` (Silent / timeout state) | Admin copy URL Form/Sheet/Webhook | `toast.success('Đã sao chép liên kết URL quản trị!')` |
| **12** | `src/components/ContactBubbleWidget.jsx` | 41 | `navigator.clipboard.writeText(GMAIL_ADDRESS)` (Local boolean) | Nhấn sao chép Gmail tác giả | `toast.success('Đã sao chép địa chỉ Gmail tác giả!')` |
| **13** | `src/tabs/SurveyTab.jsx` | 284 | `sendReviewToCloud().then(...)` (Local msg banner) | Gửi đánh giá lên Google Sheets Webhook | `toast.promise(...)` (Đang gửi... -> Thành công!) |
| **14** | `src/tabs/SurveyTab.jsx` | 248 | `setSaveSuccess(true)` (Local banner) | Lưu URL cấu hình Form/Sheets mới | `toast.success('Đã lưu cấu hình khảo sát thành công!')` |
| **15** | `src/components/AdminKnowledgeModal.jsx` | 142 | `setSurveySaveSuccess(true)` (Local banner) | Admin lưu cấu hình Form/Sheets | `toast.success('Đã lưu cấu hình Google Form & Sheets!')` |
| **16** | `src/components/AdminKnowledgeModal.jsx` | 159 | `setSurveySyncMsg(...)` (Local banner) | Admin kéo dữ liệu từ Google Sheets | `toast.success('Đã đồng bộ ' + cloudData.length + ' đánh giá từ Google Sheets!')` |
| **17** | `src/components/AdminKnowledgeModal.jsx` | 243, 276, 319, 348 | `setSuccessMsg(...)` (Local banner) | Trích xuất Word, JSON, thêm tư liệu, sync Google Docs | `toast.success(...)` theo từng ngữ cảnh |
| **18** | `src/tabs/AiStationTab.jsx` | 64 | `setKeySavedMsg(...)` (Local banner) | Lưu mã Gemini API Key | `toast.success('Đã lưu Gemini API Key thành công!')` |
| **19** | `src/components/AdminPinModal.jsx` | 16 | `loginAdmin(pin)` (Silent form success / error boolean) | Đăng nhập mã PIN quản trị | `toast.success('Đã kích hoạt chế độ Quản trị viên (Lê Trường Thịnh)!')` hoặc `toast.error('Mã PIN không chính xác!')` |
| **20** | `src/context/AdminContext.jsx` | 44 | `logoutAdmin()` (Silent) | Đăng xuất chế độ Admin | `toast.info('Đã thoát chế độ Quản trị viên.')` |

### 4.2 Sonner Integration Blueprint

#### Step 1: Package Installation
Run in root directory:
```bash
npm install sonner
```
*Note on React 19:* Sonner v1.7+ fully supports React 19 without peer dependency conflicts.

#### Step 2: Root Mounting in `src/App.jsx`
Import and mount `<Toaster />` directly inside `.app-container`:
```jsx
import { Toaster } from 'sonner';

export default function App() {
  // ...
  return (
    <AdminProvider onOpenAdmin={() => setIsAdminOpen(true)}>
      <div className="app-container">
        {/* Global Toast Notification System */}
        <Toaster 
          position="top-right" 
          richColors 
          theme="dark" 
          closeButton
          toastOptions={{
            style: {
              background: '#101216',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#F3F4F6',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }
          }}
        />
        {/* ... remaining components */}
      </div>
    </AdminProvider>
  );
}
```

#### Step 3: Idiomatic Usage Patterns

1. **Simple Notifications:**
   ```javascript
   import { toast } from 'sonner';

   // Success
   toast.success('Đã sao chép liên kết vào bộ nhớ tạm!');

   // Error
   toast.error('Không thể kết nối đến máy chủ Google Sheets');

   // Warning
   toast.warning('Dung lượng ảnh vượt quá giới hạn 5MB.');

   // Info
   toast.info('Đã khôi phục ảnh gốc của bảo tàng');
   ```

2. **Promise-Driven Toasts (Google Sheets Sync):**
   ```javascript
   // In SurveyTab.jsx and AdminKnowledgeModal.jsx:
   toast.promise(sendReviewToCloud(reviewItem, webhookUrl), {
     loading: 'Đang gửi đánh giá lên Google Sheets...',
     success: 'Đánh giá của bạn đã được ghi nhận vào Google Sheets thành công!',
     error: 'Không thể kết nối Google Sheets. Dữ liệu đã lưu tạm trên máy.'
   });
   ```

3. **Confirmation Toasts (Replacing window.confirm):**
   ```javascript
   toast('Bạn có chắc chắn muốn xóa đánh giá này?', {
     action: {
       label: 'Xác nhận xóa',
       onClick: () => executeDelete(id)
     },
     cancel: {
       label: 'Hủy'
     }
   });
   ```

#### Step 4: Deprecate `src/components/Toast.jsx`
Once Sonner is wired into `BattleMapTab.jsx` and `MuseumTab.jsx`, remove imports of `Toast` and delete `src/components/Toast.jsx`. Clean up `.toast` CSS rules in `src/App.css:1431-1470`.

---

## 5. Implementation Roadmap for Execution Phase

1. **Phase 1: Foundation & Toast System**
   - Run `npm install sonner`.
   - Mount `<Toaster />` in `src/App.jsx`.
   - Replace all 7 `alert()` calls, 4 clipboard silent handlers, and Google Sheets sync handlers with `toast.*`.
   - Deprecate `src/components/Toast.jsx`.

2. **Phase 2: Visual Styling & Anti-Slop (R1)**
   - Update CSS variables in `:root` (`#08090C` canvas, `#101216` surface, `#F59E0B`/`#D97706` imperial gold, `#8C6D37` antique bronze).
   - Strip out background blobs in `HomeTab.jsx`.
   - Remove neon glows (`.ambient-radial-glow`, `.btn-battle-glow`, `.bubble-glow-ring`, `.statue-gold-rim-glow`).
   - Clean up excessive text/button gradients; standardize hairline bronze card borders.

3. **Phase 3: Motion Craft & Spring Physics (R2)**
   - Implement `layoutId="navbar-pill"` in `Navbar.jsx`.
   - Implement `layoutId="admin-active-pill"` in `AdminKnowledgeModal.jsx`.
   - Implement `layoutId="battle-map-pill"` in `BattleMapTab.jsx`.
   - Upgrade modal dialog transitions to spring physics (`type: "spring", stiffness: 350, damping: 28`).
   - Add tactile micro-interactions (`whileTap={{ scale: 0.96 }}`, `whileHover={{ y: -2, scale: 1.01 }}`) to primary buttons, bento cards, quiz options, and timeline cards.
   - Fix popover transform origins to `bottom right` on `FloatingAiWidget` and `ContactBubbleWidget`.
   - Inject `@media (prefers-reduced-motion: reduce)` in `App.css` and throttle canvas particle engine.

4. **Phase 4: Verification & Playwright Acceptance (R4)**
   - Validate with Playwright CLI screenshots across Desktop (1440px) and Mobile (390px).
   - Verify 0 console errors and 60fps frame rate.
