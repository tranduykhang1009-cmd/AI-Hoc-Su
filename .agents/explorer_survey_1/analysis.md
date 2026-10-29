# BÁO CÁO KHẢO SÁT KIẾN TRÚC FRONTEND DỰ ÁN "HÀO KHÍ TÂY SƠN"
**Người thực hiện:** explorer_survey_1 (Frontend Architecture Explorer)  
**Thời gian:** 2026-10-29  
**Mục tiêu:** Khảo sát toàn diện mã nguồn frontend hiện có, nhận diện cấu trúc, các tab chức năng, quản lý trạng thái, thư viện chuyển động, thiết kế giao diện, và kiểm tra tính khả thi của quy trình build.

---

## 1. TỔNG QUAN CẤU HÌNH & THƯ VIỆN (PACKAGE.JSON & BUNDLER)

### 1.1. Công nghệ Lõi & Phiên bản
- **Framework:** `React 19` (`"react": "^19.0.0"`, `"react-dom": "^19.0.0"`).
- **Bundler & Dev Server:** `Vite 6` (`"vite": "^6.2.0"`, `"@vitejs/plugin-react": "^4.3.4"`).
- **Module System:** ES Modules (`"type": "module"`).
- **Motion & Physics:** `Framer Motion v12` (`"framer-motion": "^12.4.7"`).
- **Hệ thống Icon:** `Lucide React` (`"lucide-react": "^1.16.0"`).
- **Bản đồ tương tác:** `Leaflet` (`"leaflet": "^1.9.4"`).
- **Xử lý tài liệu & lưu trữ:** `mammoth` (`^1.13.0` để đọc file Word .docx), `idb-keyval` (`^6.3.0` để lưu ảnh hiện vật vào IndexedDB).
- **Hiệu ứng đặc biệt:** `canvas-confetti` (`^1.9.4`).
- **Thư viện Toast:** `sonner` **chưa được cài đặt** trong `package.json`. Hiện tại hệ thống đang dùng component thủ công tự tạo `src/components/Toast.jsx` và một số hàm `alert()` thông thường.

### 1.2. Hiện trạng Hệ thống Styling (Tailwind vs Vanilla CSS)
- **Không sử dụng Tailwind CSS:** Dự án hoàn toàn không cài đặt `tailwindcss`, `postcss` hay `autoprefixer`.
- **Hệ thống CSS tùy chỉnh thuần túy:** Toàn bộ visual được kiểm soát tập trung qua file `src/App.css` (7,911 dòng CSS). File này định nghĩa hệ thống token CSS biến toàn cục (`:root`) bao gồm:
  - Bảng màu canvas: `--bg-canvas: #0F0D0B;`, `--bg-surface: #1A1614;`, `--bg-elevated: #221D1A;`
  - Bảng màu điểm nhấn: `--accent: #A64B3D;`, `--gold: #C9A961;`, `--cin-gold-bright: #FFEAA7;`, `--cin-red-crimson: #B91C1C;`
  - Typography: `--font-display: 'Fraunces', 'Newsreader', Georgia, serif;`, `--font-body: 'Be Vietnam Pro', system-ui, sans-serif;`
  - Spacing, border-radius, shadows, transitions.
- **Yêu cầu nâng cấp (Theo R1):** Chuyển màu nền sang Obsidian Black `#08090C`, kim loại đồng cổ (Antique Bronze), và ánh vàng hoàng tộc Imperial Amber Gold (`#F59E0B`/`#D97706`).

### 1.3. Scripts & Kiểm thử Build
- `npm run dev`: Khởi chạy Vite server tại port `3000` (được cấu hình trong `vite.config.js`). Có kèm middleware proxy `/api/doc` để xuất văn bản từ Google Docs.
- `npm run build`: Thực hiện `vite build`.
  - **Kết quả kiểm thử thực tế:** Chạy lệnh `npm run build` thành công xuất sắc với **Exit code 0** trong `18.94s`.
  - **Đầu ra tại `dist/`:**
    - `dist/index.html`: 2.08 kB (gzip: 1.06 kB)
    - `dist/assets/index-3Jdw2ca9.css`: 147.89 kB (gzip: 28.71 kB)
    - `dist/assets/index-CNDaqoP9.js`: 1,160.06 kB (gzip: 357.59 kB)

---

## 2. CẤU TRÚC THƯ MỤC MÃ NGUỒN `src/`

```
src/
├── main.jsx                     # Điểm khởi đầu của ứng dụng React 19
├── App.jsx                      # Component gốc: điều phối Tab, Modal, Router Hash, Nhạc nền, Embers
├── App.css                      # Design system 7,911 dòng CSS tùy chỉnh
├── components/                  # Các component dùng chung và widget nổi
│   ├── Navbar.jsx               # Header điều hướng 7 tab, nút Admin, toggle âm thanh, menu mobile
│   ├── Footer.jsx               # Chân trang với thông tin tác giả Lê Trường Thịnh (12A8)
│   ├── CinematicIntro.jsx       # Màn mở đầu điện ảnh 3D Parallax & Tượng Quang Trung
│   ├── AdminKnowledgeModal.jsx  # Bảng điều khiển quản trị toàn diện (57KB, 4 tab quản trị)
│   ├── AdminPinModal.jsx        # Hộp thoại nhập mã PIN quản trị viên
│   ├── FloatingAiWidget.jsx     # Nút trợ lý AI Sử Quan nổi góc dưới màn hình
│   ├── ContactBubbleWidget.jsx  # Bong bóng liên hệ Facebook/Gmail cạnh phải
│   ├── AmbientEmbersCanvas.jsx  # Canvas hiệu ứng tàn tro bay nền 60fps
│   ├── EmberCanvas.jsx          # Canvas tàn tro cục bộ cho Hero section
│   ├── DrumBackground.jsx       # Đồ họa trống đồng Đông Sơn xoay nhẹ
│   ├── BackgroundMusic.jsx      # Phát nhạc nền hào hùng theo tab
│   ├── HeroStatueFrame.jsx      # Khung ảnh tượng đài Quang Trung
│   ├── HeroQuoteFrame.jsx       # Khung trích dẫn hịch xuất quân
│   ├── AnimatedCounter.jsx      # Bộ đếm số động khi cuộn
│   ├── DesignSystemPreview.jsx  # Trang kiểm tra giao diện mẫu
│   └── Toast.jsx                # Component Toast đơn giản (cần thay thế bằng Sonner)
├── context/
│   └── AdminContext.jsx         # Context quản lý quyền Admin, mã PIN, tab mở
├── data/
│   ├── battlesData.js           # Dữ liệu chiến thuật, tọa độ, lực lượng, mini-quiz cho Sa bàn
│   ├── defaultKnowledgeBase.js  # 80+ mục kiến thức lịch sử phục vụ bot AI
│   ├── museumData.js            # Dữ liệu 8+ hiện vật bảo tàng (vũ khí, sắc phong, tiền, trang phục)
│   ├── quizData.js              # Ngân hàng câu hỏi đố vui 3 cấp độ
│   └── timelineData.js          # 10 mốc son biên niên sử 1753–1792
├── services/
│   ├── geminiService.js         # Kết nối Google Gemini API (1.5-flash, 2.0-flash, 1.5-pro) & Webhook Google Docs
│   ├── surveySyncService.js     # Đồng bộ 2 chiều đánh giá với Google Sheets qua GViz API và Webhook
│   └── speechService.js         # Tổng hợp giọng nói (Text-to-Speech)
└── utils/
    ├── audio.js                 # Web Audio API tạo tiếng chuông chime, đúng/sai, chiến thắng
    ├── battleSound.js           # Âm thanh chiến trận
    ├── certificateGenerator.js  # Vẽ Giấy chứng nhận hoàn thành đố vui bằng HTML5 Canvas
    └── museumImageStore.js      # Lưu trữ và tải ảnh bảo tàng tùy biến qua IndexedDB
```

---

## 3. KHẢO SÁT CHI TIẾT 6 TAB CHÍNH (+ ĐỐ VUI)

### 3.1. Trang Chủ (`src/tabs/HomeTab.jsx`)
- **Vị trí gọi:** `App.jsx` dòng 72-73 khi `activeTab === 'home'`.
- **Thành phần giao diện:**
  - `Hero Cinematic Section`: Tựa đề 3D "HÀO KHÍ TÂY SƠN", trích đoạn Hiểu dụ xuất quân thần tốc ("Đánh cho để dài tóc / Đánh cho để đen răng..."), nút kêu gọi hành động (CTA) dẫn sang Sa Bàn và Sử Quan AI, tượng Quang Trung đóng khung trang trọng.
  - `Bento Grid 4 Trải Nghiệm Học Sử`: Card Sa bàn chiến trận (có ảnh nền lược đồ), Card Bảo tàng hiện vật số, Card Biên niên sử 1753–1792, Card Trạm Sử Quan AI, Card Đấu trường đố vui.
  - `Quote Footer`: Lời dạy của Chủ tịch Hồ Chí Minh ("Dân ta phải biết sử ta...").
- **Tình trạng Motion & Taste:** Đã có Framer Motion cơ bản với staggerChildren và itemVariants, nhưng chưa áp dụng trọn vẹn bộ thông số Spring Physics của Emil Kowalski (`stiffness: 350, damping: 28`) và layoutId trượt mượt mà.

### 3.2. Dòng Thời Gian (`src/tabs/TimelineTab.jsx`)
- **Vị trí gọi:** `App.jsx` dòng 74-75 khi `activeTab === 'timeline'`.
- **Thành phần giao diện:**
  - 4 nút lọc phân kỳ lịch sử (Toàn bộ 10 mốc son, 1753–1777 Khởi nghĩa, 1785–1786 Đánh Xiêm & Phù Lê, 1788–1792 Đại phá Thanh & Canh tân).
  - Trục laser dọc `timeline-spine-laser-center` nối các mốc so le (Alternating Zigzag) theo tiến trình cuộn `scrollYProgress` thông qua `useSpring`.
  - Thẻ sự kiện: Ảnh 16:9, thẻ năm ánh kim, phân tích tác động lịch sử, nút xem khảo cứu sâu và nút hỏi nhanh Sử Quan AI.

### 3.3. Sa Bàn Chiến Trận (`src/tabs/BattleMapTab.jsx`)
- **Vị trí gọi:** `App.jsx` dòng 76-77 khi `activeTab === 'battle-map'`.
- **Thành phần giao diện:**
  - Bản đồ chiến thuật Leaflet tương tác, hỗ trợ chuyển đổi lớp vệ tinh Google Hybrid (`https://{s}.google.com/vt/lyrs=y`), địa hình Terrain và bản đồ đường sá Roadmap.
  - 3 trận đánh lớn được mô phỏng chi tiết trong `battlesData.js`: Rạch Gầm – Xoài Mút (1785), Đại phá quân Thanh - Ngọc Hồi Đống Đa (1789), Công thành Quy Nhơn (1773).
  - Thanh tiến trình giai đoạn tác chiến (Phases) kèm các mũi tên chuyển quân, điểm phục kích, tàu chiến, đồn lũy.
  - Mini-quiz tại chỗ kiểm tra kiến thức chiến thuật và thanh so sánh tương quan lực lượng hai bên.
  - Sử dụng `<Toast>` cục bộ khi mở khóa thành tựu.

### 3.4. Bảo Tàng Hiện Vật Số (`src/tabs/MuseumTab.jsx`)
- **Vị trí gọi:** `App.jsx` dòng 78-79 khi `activeTab === 'museum'`.
- **Thành phần giao diện:**
  - Bộ lọc phân loại danh mục (Tất cả, Vũ khí & Khí tài, Sắc phong & Thư tịch, Tiền tệ & Ấn tín, Trang phục & Quân trang).
  - Lưới hiện vật bảo tàng kèm hiệu ứng loading skeleton.
  - Modal khảo cứu chi tiết hỗ trợ bẫy tiêu điểm (focus trap) và phím `Escape`.
  - Tính năng quản trị viên tải ảnh hiện vật độ phân giải cao lưu vào IndexedDB thông qua `idb-keyval`.
  - Thông báo tải ảnh thành công/thất bại bằng component Toast tự tạo.

### 3.5. Sử Quan AI (`src/tabs/AiStationTab.jsx`)
- **Vị trí gọi:** `App.jsx` dòng 80-81 khi `activeTab === 'ai-station'`.
- **Thành phần giao diện:**
  - Khung hội thoại tương tác phong cách cổ kính với nhân vật "Sử Quan Tây Sơn".
  - Kết nối Google Gemini API thông qua `geminiService.js` với chiến lược fallback đa tầng: `gemini-1.5-flash` → `gemini-2.0-flash` → `gemini-1.5-pro`.
  - Tự động nạp tư liệu từ Google Docs và bộ tri thức mặc định `defaultKnowledgeBase.js` để trả lời chính xác, trích dẫn chuẩn sử liệu thế kỷ XVIII.
  - Khả năng lưu lịch sử chat vào `localStorage` (`su_ai_chat_history_v2`).
  - Hộp thoại cấu hình khóa Gemini API Key riêng biệt.

### 3.6. Khảo Sát & Admin (`src/tabs/SurveyTab.jsx` & `src/components/AdminKnowledgeModal.jsx`)
- **Vị trí gọi:**
  - `SurveyTab.jsx`: `App.jsx` dòng 84-85 khi `activeTab === 'survey'`.
  - `AdminKnowledgeModal.jsx`: `App.jsx` dòng 143-146 (mở khi click nút Admin tại Navbar hoặc từ SurveyTab).
- **Thành phần giao diện:**
  - `SurveyTab`:
    - Xem bảng đánh giá cộng đồng dạng thẻ ý kiến học sinh, giáo viên.
    - Đồng bộ thời gian thực hai chiều với Google Sheets thông qua Google Visualization API (GViz).
    - Biểu mẫu gửi phản hồi mới trực tiếp lên Google Apps Script Webhook.
    - Nhúng iframe Google Form và Google Sheets trực tiếp để đối soát.
  - `AdminKnowledgeModal`:
    - Bảo vệ bằng mã PIN (`1789`, `12a8`, `1234`, `admin123`, `lequangtrung`).
    - Tab 1: Quản lý liên kết Khảo sát & Google Sheets Webhook.
    - Tab 2: Quản lý kho tri thức Sử Quan AI (thêm/sửa/xóa, import file Word `.docx` qua `mammoth`, import JSON, kéo từ Google Docs).
    - Tab 3: Quản lý và khôi phục ảnh bảo tàng trong IndexedDB.
    - Tab 4: Cấu hình hệ thống.
  - **Điểm cần cải tiến:** Nhiều thao tác trong `AdminKnowledgeModal` và `SurveyTab` đang dùng hàm `alert(...)` thô sơ của trình duyệt thay vì hệ thống Toast Sonner cao cấp.

### 3.7. Bổ sung: Đấu Trường Đố Vui (`src/tabs/QuizArenaTab.jsx`)
- **Vị trí gọi:** `App.jsx` dòng 82-83 khi `activeTab === 'quiz'`.
- **Thành phần:** 3 cấp độ thử thách (Khởi Khái Môn, Binh Pháp Khắc Địch, Kỳ Tài Vương Triều), tính điểm, hiệu ứng pháo hoa `canvas-confetti`, và tự động xuất Giấy Chứng Nhận vinh danh bằng HTML5 Canvas (`certificateGenerator.js`).

---

## 4. QUẢN LÝ TRẠNG THÁI VÀ ĐỒNG BỘ DỮ LIỆU ĐÁM MÂY

1. **Global React Context:**
   - `AdminContext` (`src/context/AdminContext.jsx`): Điều phối trạng thái đăng nhập admin, lưu phiên vào `sessionStorage` và `localStorage` (`su_admin_mode_active`), kiểm soát hiển thị modal.
2. **Local Component State & Routing:**
   - Điều hướng tab bằng State kết hợp Hash Router URL (`window.location.hash`). Khi hash thay đổi, `App.jsx` tự động cập nhật tab và cuộn trang mượt về đỉnh.
3. **Bộ nhớ cục bộ (Browser Storage):**
   - `sessionStorage`: Cờ xem phim mở đầu (`su_intro_seen_session`), prompt chuyển tiếp nhanh sang Sử Quan AI (`su_quick_ai_prompt`).
   - `localStorage`: Lịch sử chat AI, khóa API Gemini, kho dữ liệu tri thức admin, URL Webhook, đánh giá cộng đồng đã lưu offline.
   - `IndexedDB` (`idb-keyval`): Lưu trữ dữ liệu nhị phân (ảnh hiện vật tự upload) để không làm tràn hạn mức 5MB của localStorage.
4. **Tích hợp Đám Mây Bên Ngoài (Google Cloud Ecosystem):**
   - **Google Gemini API:** Gọi trực tiếp REST endpoint `https://generativelanguage.googleapis.com/v1beta/models/...:generateContent`.
   - **Google Sheets GViz API:** Đọc dữ liệu đánh giá từ bảng tính công khai không cần API key thông qua định dạng JSON của Google Visualization (`/gviz/tq?tqx=out:json`).
   - **Google Apps Script Webhooks:** Gửi dữ liệu bằng HTTP POST chế độ `no-cors` để ghi đánh giá và cập nhật sử liệu lên Google Drive / Sheets.
   - **Google Docs TXT Export:** Đồng bộ kho tư liệu nghiên cứu trực tiếp từ link văn bản Google Docs.

---

## 5. ĐÁNH GIÁ SỰ PHÙ HỢP VỚI 4 YÊU CẦU NÂNG CẤP (ORIGINAL_REQUEST)

| Yêu cầu | Hiện trạng | Nhiệm vụ cần thực hiện |
|---|---|---|
| **R1. Taste Heritage Art Direction** | Đã có nền tảng CSS Design System với tông màu ấm tối (`#0F0D0B`), nhưng chưa áp dụng chuẩn Obsidian Black `#08090C`, Imperial Amber Gold (`#F59E0B`/`#D97706`), Antique Bronze. Còn một số thẻ viền hoặc glow cần tinh lọc. | Điều chỉnh `:root` tokens và toàn bộ các class card, bento, nav để đạt chuẩn visual di sản bảo tàng quốc tế sang trọng, xóa bỏ card đơn điệu. |
| **R2. Emil Kowalski Motion Craft** | Đã có Framer Motion v12, nhưng nhiều nơi dùng easing cubic-bezier cố định hoặc linear/ease thông thường, thiếu feedback xúc giác khi tap/hover. Thanh Navbar chưa có Pill shared layout (`layoutId`). | Cấu hình Spring Physics (`type: "spring", stiffness: 350, damping: 28`) cho nút bấm (`whileTap={{ scale: 0.96 }}`, `whileHover={{ y: -2, scale: 1.01 }}`), làm thanh trượt pill cho Navbar và Admin tabs. |
| **R3. Toast Sonner** | Chưa cài đặt thư viện `sonner`. Đang dùng `Toast.jsx` thủ công và các hàm `alert()` thông thường trong Admin và Survey. | Chạy `npm install sonner`, đặt `<Toaster position="top-right" richColors theme="dark" />` ở `App.jsx`, thay thế toàn bộ `alert()` và `Toast` bằng `toast.success`, `toast.error`, `toast.promise`. |
| **R4. Playwright CLI Testing** | `playwright-cli` v0.1.22 đã sẵn sàng trong môi trường/skills, website build thành công sạch sẽ. | Thiết lập kịch bản duyệt tự động qua toàn bộ 6 tab, tương tác các tính năng chính và chụp ảnh màn hình Desktop & Mobile. |
