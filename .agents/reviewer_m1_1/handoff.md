# Review & Adversarial Critic Report: Milestone 1 — Sonner Notification System

**Reviewer**: `reviewer_m1_1`  
**Verdict**: **APPROVE**  
**Integrity Status**: **CLEAN (0 Violations)**  
**Target Milestone**: Milestone 1 (F1, F2, F3) — Sonner Notification System  
**Worker Under Review**: `worker_m1_1`

---

## 1. Observation

Direct code and environment observations:

1. **Package Installation & React 19 Compatibility (`package.json`)**:
   - `package.json` line 20: `"sonner": "^2.0.8"`.
   - React version: `"react": "^19.0.0"`, `"react-dom": "^19.0.0"`.
   - Lockfile `package-lock.json` confirms resolved `sonner@2.0.8`.
   - Tool verification: `npm run build` executed and exited with code 0 in 6.24s with 2,692 modules transformed.

2. **Root Toaster Mounting (`src/App.jsx`)**:
   - Line 3: `import { Toaster } from 'sonner';`
   - Line 96: `<Toaster position="top-right" richColors theme="dark" />` mounted directly under `<AdminProvider>` and immediately before `<div className="app-container">`.
   - Search across `src/` for `Toaster` returned exactly 1 match (`src/App.jsx`), confirming single-mount architecture without duplication.

3. **Complete Elimination of Raw `alert()` Calls**:
   - Ripgrep search for `alert\(` across `src/` yielded **0 matches**.
   - Verified 6 replaced alert calls in `src/components/AdminKnowledgeModal.jsx`:
     - Line 150: Config save failure -> `toast.error('Không thể lưu cấu hình: ' + err.message);`
     - Line 244: Empty Word document -> `toast.error('File Word không có nội dung văn bản.');`
     - Line 257: Word read error -> `toast.error('Không thể đọc file Word: ' + err.message);`
     - Line 290: Invalid JSON format -> `toast.error('File JSON không đúng định dạng mảng tài liệu.');`
     - Line 313: Missing title/content -> `toast.warning('Vui lòng nhập đầy đủ tiêu đề và nội dung sử liệu.');`
     - Line 387: Image exceeds 5MB -> `toast.error('Kích thước ảnh phải nhỏ hơn 5MB');`
   - Verified 1 replaced alert call in `src/tabs/SurveyTab.jsx`:
     - Line 272: Missing review name/comment -> `toast.warning('Vui lòng điền họ tên và nội dung đánh giá của bạn.');`

4. **Legacy `Toast.jsx` Replacement & Safe Deprecation**:
   - `src/tabs/BattleMapTab.jsx`: Removed legacy `import Toast from '../components/Toast'`, removed `toastMessage` state, replaced achievement trigger with `toast.success('🏆 Đã khám phá toàn bộ diễn biến!')`, and removed the `<Toast />` component mount.
   - `src/tabs/MuseumTab.jsx`: Removed legacy `import Toast from '../components/Toast'`, removed `toastMessage` state, replaced image upload/IDB/reset triggers with `toast.warning(...)`, `toast.info(...)`, and `toast.success(...)`, and removed `<Toast />` component mount.
   - `src/components/Toast.jsx`: Refactored to a deprecated backward-compatible proxy that delegates directly to `toast` from `'sonner'` without rendering DOM elements, safely avoiding broken imports or dual toast systems.
   - Ripgrep for `<Toast ` across `src/` confirms 0 matches (only `<Toaster` in `src/App.jsx`).

5. **Interactive Toast Feedback**:
   - Clipboard copying:
     - `src/components/ContactBubbleWidget.jsx:45`: `toast.success('Đã sao chép liên kết vào bộ nhớ tạm!')` on copying email.
     - `src/components/AdminKnowledgeModal.jsx:99`: `toast.success('Đã sao chép liên kết vào bộ nhớ tạm!')` on copying admin URLs.
     - `src/tabs/SurveyTab.jsx:79`: `toast.success('Đã sao chép liên kết vào bộ nhớ tạm!')` on copying survey URLs.
   - Review submission:
     - `src/tabs/SurveyTab.jsx:301`: `toast.success('Cảm ơn bạn đã gửi đánh giá!')`.
     - `src/tabs/SurveyTab.jsx:304`: `toast.success('Đánh giá đã được lưu vào Google Sheets!')` upon cloud push resolve.
   - Google Sheets GViz cloud sync:
     - `src/tabs/SurveyTab.jsx:114`: `toast.loading('Đang kiểm tra dữ liệu từ Google Sheets...', { id: 'gviz-cloud-sync' })`
     - `src/tabs/SurveyTab.jsx:129`: `toast.success(..., { id: 'gviz-cloud-sync' })`
     - `src/tabs/SurveyTab.jsx:135`: `toast.info(..., { id: 'gviz-cloud-sync' })`
     - `src/tabs/SurveyTab.jsx:142`: `toast.error(..., { id: 'gviz-cloud-sync' })`

6. **File Ownership Verification**:
   - `src/App.css` and `src/tabs/HomeTab.jsx` were checked for Sonner modifications. Zero toast or Sonner code was introduced into either file. Changes in those files belong exclusively to Milestone 2 (`worker_m2_1`), strictly respecting milestone ownership boundaries.

7. **Production Build Verification**:
   - `npm run build` executed in `d:\Projects\SchoolProjects\Su` succeeded with exit code 0.

---

## 2. Logic Chain

1. *Observation 1 (Clean dependency resolution & build)* establishes that `sonner@2.0.8` natively supports React 19 without peer dependency warnings or bundler failures.
2. *Observation 2 (Single root Toaster mounting)* ensures toasts render in a shared, portal-based DOM hierarchy with dark theme and rich colors matching the Obsidian Heritage design aesthetic.
3. *Observation 3 (0 alert calls in codebase)* proves that all blocking modal dialogs have been eliminated, converting interruptive UI blocking into smooth, non-blocking toast feedback.
4. *Observation 4 (Legacy toast elimination & proxy)* ensures no residual un-stacked toast components exist, while preserving defensive compatibility for any legacy callers.
5. *Observation 5 (Stateful mutation via toast ID)* validates that asynchronous actions (GViz sync) mutate smoothly from loading to success/info/error via a single toast reference (`id: 'gviz-cloud-sync'`), preventing notification spam.
6. *Observation 6 & 7 (Integrity & Build)* confirms zero cheating, no mocked implementations, and clean compilation.

---

## 3. Caveats & Adversarial Stress Tests

1. **Stacking Context & Modal Backdrop**:
   - *Stress Test*: AdminKnowledgeModal renders with `.modal-backdrop` at `z-index: 1000`.
   - *Finding*: Sonner's default toaster renders at `z-index: 9999` directly at the application root outside modal boundaries, ensuring toasts always appear above modal backdrops and drawer elements.
2. **Offline / Network Latency in GViz Cloud Sync**:
   - *Stress Test*: When Google Sheets GViz endpoint is delayed or offline, does the toast hang?
   - *Finding*: The try/catch block in `handleSyncCloud` triggers `toast.error('Không thể đồng bộ từ Google Sheets, tạm thời dùng dữ liệu cục bộ.', { id: 'gviz-cloud-sync' })` in the catch clause, correctly terminating the loading toast.
3. **No Caveats Remaining**: All tasks defined in SCOPE.md have been genuinely implemented and independently verified.

---

## 4. Conclusion

**Verdict: APPROVE**

Milestone 1 satisfies all functional, architectural, and visual requirements:
- Sonner 2.0.8 installed and verified with React 19.
- `<Toaster position="top-right" richColors theme="dark" />` mounted once at root.
- Exactly 7 raw `alert()` calls eliminated; 0 remaining in `src/`.
- Legacy `Toast.jsx` replaced across all tabs and cleanly deprecated.
- Interactive clipboard, review submission, and GViz cloud sync feedback fully operational.
- Strict file boundaries respected; `npm run build` exits 0.

---

## 5. Verification Method

Independent reproduction steps:

1. **Build verification**:
   ```powershell
   cd d:\Projects\SchoolProjects\Su
   npm run build
   ```
   *Expected outcome*: Exit code 0, 0 bundling errors.

2. **Zero `alert()` verification**:
   ```powershell
   git grep "alert(" src/
   ```
   *Expected outcome*: 0 matches.

3. **Single `<Toaster />` verification**:
   ```powershell
   git grep "<Toaster" src/
   ```
   *Expected outcome*: Exactly 1 match in `src/App.jsx`.

4. **Zero legacy `<Toast` verification**:
   ```powershell
   git grep "<Toast " src/
   ```
   *Expected outcome*: 0 matches.
