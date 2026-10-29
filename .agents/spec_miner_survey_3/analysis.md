# BÁO CÁO ĐẶC TẢ KIỂM THỬ E2E TOÀN DIỆN VỚI PLAYWRIGHT CLI
**Dự án**: Hào Khí Tây Sơn (Trường THCS và THPT Nguyễn Huệ)  
**Tác giả**: Spec Miner Survey 3 (`spec_miner_survey_3`)  
**Công cụ kiểm thử chính**: `playwright-cli` (v0.1.22), Chromium / WebKit, Node.js, Vite 6  
**Mục tiêu**: Khai phá toàn bộ bề mặt tương tác, thiết kế bộ kiểm thử đa tầng (Tier 1 - 4), kế hoạch chụp ảnh nghiệm thu (Desktop 1920x1080 & Mobile 390x844) và quy chuẩn kiểm chứng 0 lỗi console.

---

## 1. Môi Trường Thực Thi & Máy Chủ Phát Triển (Dev Server)

### 1.1. Cấu hình Máy chủ & Cổng mạng
- **Nền tảng**: Vite v6.4.4 + React 19.0.0 + Framer Motion v12.4.7 + Tailwind / Custom Heritage CSS.
- **Tập lệnh khởi động tiêu chuẩn**:
  ```bash
  # Khởi động chế độ phát triển (port 3000, vô hiệu hóa tự động bật trình duyệt hệ thống)
  npx vite --port 3000 --no-open
  # hoặc
  npm run dev -- --port 3000 --no-open
  ```
- **Tập lệnh kiểm tra bản build và chạy preview production**:
  ```bash
  npm run build
  npm run preview -- --port 3000
  ```
- **Cơ chế Dev Middleware tích hợp (`vite.config.js`)**:
  - Middleware `/api/doc`: Tự động kéo kho sử liệu từ Google Docs (`https://docs.google.com/document/d/1yWiKZdHJlovfvMzfBOaFTW3auEaKyKcEMBUOU68BPSE/export?format=txt`) và phản hồi dạng JSON `{ success: true, text }`.
  - Cổng mặc định: `3000` (được cấu hình trong `vite.config.js: server.port = 3000`).
  - Base path: `./` (hỗ trợ triển khai tĩnh và CDN).

### 1.2. Công cụ Playwright CLI
- **Phiên bản cài đặt**: `0.1.22` (vị trí: `C:\Users\DUY KHANG\AppData\Roaming\npm\playwright-cli.ps1`).
- **Khả năng kiểm chứng thực tế**:
  - Đã kiểm tra mở phiên trình duyệt độc lập: `playwright-cli open about:blank` -> Trình duyệt Chromium (pid 14116) mở và phản hồi snapshot tức thời.
  - Đã xác nhận hỗ trợ đầy đủ các lệnh: `resize`, `screenshot`, `snapshot`, `click`, `fill`, `eval`, `console`, `open --mobile`, `open --device="iPhone 15"`.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Global / Intro | Màn mở đầu Điện ảnh 3D Parallax (`CinematicIntro`) | Màn mở đầu hiệu ứng 3D Parallax tượng Quang Trung, âm thanh trống trận, trích đoạn hịch và nút mở cổng vào web | Di chuột (desktop) / Gyroscope (mobile), click nút "Vào Khám Phá" | Lưu cờ `su_intro_seen_session = 'v1'` vào `sessionStorage`, hiệu ứng mở cổng âm thanh, giải phóng màn hình chính | Nếu trình duyệt chặn AudioContext, fallback chạy im lặng không gây crash | `src/components/CinematicIntro.jsx`, `src/App.jsx` |
| 2 | Global / Navigation | Thanh điều hướng Pill đa năng (`Navbar`) | Điều hướng 7 tab: Trang Chủ, Dòng Thời Gian, Sa Bàn, Bảo Tàng, Sử Quan AI, Đố Vui, Đánh Giá | Click chuột hoặc chạm vào tab link | Đổi trạng thái `activeTab`, cập nhật `window.location.hash`, cuộn mượt lên đầu trang (`scrollTo(0,0)`), phát tiếng chuông chime | Nhập hash lạ trên URL tự động chuyển về fallback `home` | `src/components/Navbar.jsx`, `src/App.jsx` |
| 3 | Global / Navigation | Menu điều hướng toàn màn hình trên di động (`MobileNavOverlay`) | Menu trượt toàn màn hình khi màn hình hẹp (< 768px), khóa cuộn `body.style.overflow = 'hidden'` | Chạm icon Hamburger (`.mobile-nav-toggle`) | Hiển thị danh sách 7 tab dọc, nút Admin, nút âm thanh; chạm chọn tab hoặc nút X để đóng | Tự động khôi phục `body.style.overflow = ''` khi unmount | `src/components/Navbar.jsx` |
| 4 | Global / Audio | Quản lý Âm thanh & Nhạc nền (`BackgroundMusic` / `audio.js`) | Quản lý Web Audio API và HTML5 Audio tự động phát nhạc theo từng tab, có nút bật/tắt toàn cục | Click nút loa trên Navbar (`.btn-icon`) | Bật/tắt cờ `soundEnabled` trong `localStorage`, phát âm thanh hiệu ứng khi thao tác | Trình duyệt chặn autoplay thì chờ tương tác click đầu tiên | `src/components/BackgroundMusic.jsx`, `src/utils/audio.js` |
| 5 | Global / Visual | Hệ thống Hạt tàn tro lửa lơ lửng (`AmbientEmbersCanvas` & `EmberCanvas`) | Hiệu ứng tàn tro lửa bay 60fps mô phỏng hào khí Tây Sơn trên nền than nhung Obsidian | Tự động vẽ canvas theo vòng lặp `requestAnimationFrame` | Hạt tàn tro chuyển động ngẫu nhiên, tự hủy khi ra ngoài khung nhìn | Hủy animation frame khi tab ẩn hoặc unmount | `src/components/AmbientEmbersCanvas.jsx`, `src/components/EmberCanvas.jsx` |
| 6 | Global / Widget | Quả cầu Sử Quan AI trôi nổi (`FloatingAiWidget`) | Nút trôi nổi góc dưới màn hình mở popover câu hỏi nhanh hoặc chuyển nhanh vào trạm AI | Click vào widget, hoặc chọn câu hỏi mẫu trong popover | Chuyển sang tab `ai-station`, nạp câu hỏi vào `sessionStorage.su_quick_ai_prompt` | Ẩn hoàn toàn khi đang ở tab `ai-station` hoặc `battle-map` để không che khuất UI | `src/components/FloatingAiWidget.jsx` |
| 7 | Global / Widget | Bong bóng Liên hệ Draggable (`ContactBubbleWidget`) | Bong bóng kéo thả góc phải màn hình chứa liên kết Facebook và nút sao chép Gmail | Drag di chuyển, click icon Facebook / Gmail | Mở link Facebook tab mới, chép địa chỉ `letruongthinh02092009@gmail.com` vào clipboard | Phân biệt drag và click qua khoảng cách/thời gian 150ms để không mở nhầm popup | `src/components/ContactBubbleWidget.jsx` |
| 8 | Tab 1: Trang chủ | Khối Hero Hoàng Triều Tây Sơn (`HomeHero`) | Tiêu đề 3D "HÀO KHÍ TÂY SƠN", trích đoạn Hiểu Dụ Xuất Quân Thần Tốc 1788, tượng đài Quang Trung và 2 nút CTA | Click "Khám phá Sa Bàn Trận Đánh" hoặc "Đàm đạo cùng Sử Quan AI" | Chuyển ngay sang tab `battle-map` hoặc `ai-station` với âm thanh phản hồi | Xử lý fallback ảnh tượng qua CSS frame | `src/tabs/HomeTab.jsx` |
| 9 | Tab 1: Trang chủ | Lưới Bento Grid 4+1 Trải nghiệm (`HomeBentoGrid`) | Lưới thẻ Bento trực quan dẫn vào 5 phân hệ: Sa Bàn, Bảo Tàng, Biên Niên Sử, Sử Quan AI, Đấu Trường Đố Vui | Click vào bất kỳ thẻ bento | Điều hướng mượt mà đến tab tương ứng kèm hiệu ứng hover nảy nhẹ | Hỗ trợ ảnh nền lazy loading | `src/tabs/HomeTab.jsx` |
| 10 | Tab 2: Dòng thời gian | Lọc 4 Phân kỳ Lịch sử (`TimelineEraFilter`) | Thanh lọc 4 nút: Toàn bộ 10 mốc son (10), 1753–1777 (4), 1785–1786 (2), 1788–1792 (4) | Click chọn phân kỳ (`.timeline-era-btn`) | Lọc danh sách mốc sử hiển thị tương ứng, hiển thị số lượng mốc son | Giữ nguyên trạng thái cuộn trang | `src/tabs/TimelineTab.jsx` |
| 11 | Tab 2: Dòng thời gian | Dòng chảy sự kiện Zigzag & Trục Laser (`TimelineZigzagStream`) | Trục laser vàng kim chạy giữa màn hình co giãn theo cuộn trang (`useScroll` + `useSpring`), các thẻ mốc sử so le chẵn/lẻ | Cuộn trang (Scroll) | Vệt laser kéo dài tương ứng vị trí cuộn, các node chấm phát sáng hiển thị số thứ tự mốc | Tối ưu hóa render chuyển động mượt 60fps | `src/tabs/TimelineTab.jsx` |
| 12 | Tab 2: Dòng thời gian | Thẻ sự kiện & Điều hướng chéo (`TimelineCardActions`) | Mỗi thẻ gồm ảnh thumbnail 16:9, năm, danh hiệu, mô tả, hộp tác động lịch sử và 3 nút hành động | Click "Khảo Cứu Sử Tích", "Sa Bàn Trận Đánh" (1785/1789), hoặc "Hỏi AI" | Mở modal khảo cứu sâu, chuyển sang Sa bàn trận đánh tương ứng, hoặc chuyển vào AI kèm prompt tạo sẵn | Tự ẩn nút "Sa Bàn Trận Đánh" nếu mốc sử không có sa bàn | `src/tabs/TimelineTab.jsx` |
| 13 | Tab 2: Dòng thời gian | Modal Khảo cứu Sử tích Chi Tiết (`TimelineModal`) | Cửa sổ modal hiển thị bối cảnh, diễn biến, tác động và ý nghĩa chiến lược sâu sắc | Click thẻ hoặc nút "Khảo Cứu Sử Tích" | Mở modal nổi, khóa cuộn trang, hỗ trợ phím Esc để thoát | Nhấn Esc hoặc click backdrop đóng modal an toàn | `src/tabs/TimelineTab.jsx` |
| 14 | Tab 3: Sa bàn | Bản đồ Leaflet GIS Chiến dịch (`BattleMapLeaflet`) | Bản đồ tác chiến tương tác render các vùng chiến địa (Polygons) và mũi tên hành quân (Polylines + Arrowhead Markers) | Kéo bản đồ, phóng to thu nhỏ, click vào đa giác/mũi tên | Hiển thị Popup quân sự chi tiết kèm đơn vị hành chính thực tế ngày nay | Hủy và tái tạo map instance sạch sẽ khi chuyển trận | `src/tabs/BattleMapTab.jsx` |
| 15 | Tab 3: Sa bàn | Bộ chọn 3 Đại Chiến Dịch (`BattleSelector`) | Chuyển đổi giữa 3 chiến dịch: Rạch Gầm – Xoài Mút (1785), Phú Xuân – Núi Bân (1788), Ngọc Hồi – Đống Đa (1789) | Click chọn nút chiến dịch ở góc trên bên trái | Map tự động bay (`flyTo`) đến tọa độ trung tâm, nạp các lớp tác chiến và danh sách giai đoạn mới | Tự động đặt lại giai đoạn về 0 | `src/tabs/BattleMapTab.jsx` |
| 16 | Tab 3: Sa bàn | Bộ chuyển đổi Lớp bản đồ Vệ tinh (`MapLayerSwitch`) | 3 chế độ nền: Google Vệ Tinh (`google-hybrid`), Google Bản Đồ (`google-roadmap`), Địa Hình (`google-terrain`) | Click chọn chế độ ở góc dưới bên phải | Thay đổi URL tile layer bản đồ tức thì không cần tải lại trang | Giữ nguyên zoom và center hiện tại | `src/tabs/BattleMapTab.jsx` |
| 17 | Tab 3: Sa bàn | Thanh Giai đoạn & Camera FlyTo (`BattlePhasePills`) | Thanh nút bấm giai đoạn tác chiến ở cạnh đáy màn hình | Click chọn giai đoạn | Camera map bay mượt mà (`map.flyTo`) đến tâm điểm chiến sự, mở Drawer chi tiết bên phải | Tự động bù trừ chiều rộng Drawer để điểm chiến sự không bị che | `src/tabs/BattleMapTab.jsx` |
| 18 | Tab 3: Sa bàn | Ngăn kéo Chi tiết Tác chiến (`BattleDrawer`) | Ngăn kéo trượt hiển thị tướng lĩnh, thời gian, tọa độ GPS, địa danh hiện nay, tương quan lực lượng, link Google Maps ngoài | Mở tự động khi chọn phase hoặc click chi tiết | Hiển thị thanh so sánh lực lượng, nút mở vị trí trên Google Maps thực tế | Nút đóng X hoặc click backdrop trên mobile | `src/tabs/BattleMapTab.jsx` |
| 19 | Tab 3: Sa bàn | Thử thách Trắc nghiệm Sa bàn (+10 điểm) (`BattleMiniQuiz`) | Modal câu hỏi trắc nghiệm chiến thuật gắn liền với giai đoạn đang xem | Click nút "Thử thách Trắc nghiệm" trong Drawer | Chọn đáp án A, B, C, D; phản hồi Đúng/Sai lập tức, cộng 10 điểm, giải thích sử liệu | Khóa chọn đáp án sau khi đã nộp | `src/tabs/BattleMapTab.jsx` |
| 20 | Tab 3: Sa bàn | Bảng Sự thật thú vị thu gọn (`BattleFunFactsPanel`) | Khung thông tin bên trái hiển thị các phát hiện quân sự thú vị của trận đánh | Click tiêu đề để thu gọn/mở rộng | Co giãn danh sách sự thật với icon sinh động | Tự động mở trên desktop, thu gọn trên mobile | `src/tabs/BattleMapTab.jsx` |
| 21 | Tab 4: Bảo tàng | Tìm kiếm & Phân loại Hiện vật (`MuseumToolbar`) | Ô tìm kiếm theo từ khóa tức thì + Dropdown lọc theo thể loại (Vũ khí, Quân trang, Tiền tệ, Châu bản...) | Nhập text vào ô input, chọn option trong select | Lọc danh sách hiện vật realtime theo cả 2 điều kiện, nút '×' xóa nhanh text | Hiển thị Empty State nếu không có kết quả | `src/tabs/MuseumTab.jsx` |
| 22 | Tab 4: Bảo tàng | Lưới Biển hiệu Hiện vật (`MuseumPlaqueCard`) | Lưới thẻ hiện vật đồng điệu 16:9 với 4 ốc vít đồng, mã số #0X, nguồn lưu giữ, bản quyền ảnh | Click vào thẻ hiện vật | Mở Modal triển lãm chi tiết 60/40 toàn màn hình | Fallback ảnh tự động sang ảnh mặc định nếu URL hỏng | `src/tabs/MuseumTab.jsx` |
| 23 | Tab 4: Bảo tàng | Modal Triển lãm Toàn màn hình 60/40 (`MuseumModal`) | Cột trái 60% hiển thị ảnh lớn; cột phải 40% hiển thị khảo cứu, giá trị lịch sử, tác chiến và nguồn gốc | Click thẻ bất kỳ | Khóa cuộn `body`, gài Focus Trap (Tab/Shift+Tab), đóng bằng Esc | Focus trở về phần tử đã click trước đó khi đóng | `src/tabs/MuseumTab.jsx` |
| 24 | Tab 4: Bảo tàng | Quản trị Cập nhật Ảnh Hiện vật (`MuseumAdminImage`) | Công cụ cho Admin tải ảnh từ máy tính (< 5MB) hoặc dán link URL, lưu trữ vào IndexedDB (`idb-keyval`) | Admin chọn file ảnh hoặc dán URL | Ảnh mới cập nhật ngay trên toàn bộ bảo tàng, có nút khôi phục ảnh gốc | Chặn file > 5MB với thông báo Toast cảnh báo | `src/tabs/MuseumTab.jsx`, `src/utils/museumImageStore.js` |
| 25 | Tab 5: Sử quan AI | Khung đàm đạo Lịch sử Tự nhiên (`AiChatInterface`) | Trò chuyện tự nhiên với Sử Quan Tây Sơn (Google Gemini 2.0), lưu trữ lịch sử chat trong `localStorage` | Nhập câu hỏi vào ô input hoặc click gợi ý | AI phân tích sử liệu, trả lời dưới dạng Cuộn Trúc Hoàng Gia (`bot-box-scroll`) kèm trích dẫn văn bản | Xử lý lỗi mất mạng/hết quota, thông báo nhẹ nhàng | `src/tabs/AiStationTab.jsx`, `src/services/geminiService.js` |
| 26 | Tab 5: Sử quan AI | Chiếu Thư Khởi Vấn (`InlinePromptsEdict`) | Các chip gợi ý câu hỏi nhanh dạng chiếu chỉ khi mới mở khung chat | Click vào bất kỳ chip gợi ý | Tự động gửi câu hỏi vào luồng chat và kích hoạt AI suy nghĩ | Vô hiệu hóa nút khi AI đang trả lời | `src/tabs/AiStationTab.jsx` |
| 27 | Tab 5: Sử quan AI | Cài đặt Nhanh Gemini API Key (`AiKeyModal`) | Hộp thoại cài đặt API Key Gemini trực tiếp cho Quản trị viên lưu vào `localStorage` | Admin dán khóa `AIzaSy...` và bấm Lưu | Cập nhật API key cho các yêu cầu kế tiếp, hiển thị thông báo thành công | Hướng dẫn link lấy key miễn phí từ Google AI Studio | `src/tabs/AiStationTab.jsx` |
| 28 | Tab 5: Sử quan AI | Làm mới Hội thoại (`AiResetChat`) | Xóa sạch lịch sử trò chuyện và bắt đầu phiên đàm đạo mới | Click icon xoay tròn (`RotateCcw`) trên header | Xóa bộ nhớ `localStorage`, đặt lại tin nhắn chào ban đầu và phát âm thanh | An toàn, không gây crash | `src/tabs/AiStationTab.jsx` |
| 29 | Tab 6: Khảo sát | Tổng quan Điểm số & Phân bổ Sao (`SurveyRatingSummary`) | Tính toán điểm trung bình động và thanh tỷ lệ phần trăm phân bổ cho từng mức sao (1 đến 5 sao) | Dựa trên mảng dữ liệu đánh giá thực tế | Hiển thị điểm số (ví dụ: 5.0), số sao vàng, tổng số lượt nhận xét | Tính đúng tỷ lệ cả khi chưa có đánh giá nào | `src/tabs/SurveyTab.jsx` |
| 30 | Tab 6: Khảo sát | Form Gửi Đánh Giá Trực Tuyến (`SurveyAddReviewForm`) | Biểu mẫu nhập mức độ hài lòng (1-5 sao tương tác), họ tên, vai trò/lớp, nội dung nhận xét | Nhập dữ liệu và nhấn "Đăng Đánh Giá Lên Bảng Tin" | Bắn pháo hoa Confetti, lưu vào `localStorage`, gửi ngầm lên Google Sheets Webhook, chèn đánh giá lên đầu bảng tin | Kiểm tra bắt buộc họ tên và nhận xét không được rỗng | `src/tabs/SurveyTab.jsx` |
| 31 | Tab 6: Khảo sát | Thả Tim & Tương Tác Nhận Xét (`SurveyReviewLikes`) | Nút "Hữu ích" trên từng đánh giá cho phép cộng đồng thả tim ủng hộ | Click nút "Hữu ích" | Tăng/giảm số lượt thích, đổi màu active, lưu lại vào bộ nhớ cục bộ | Giữ nguyên trạng thái sau khi tải lại trang | `src/tabs/SurveyTab.jsx` |
| 32 | Tab 6: Khảo sát | Nhúng Biểu mẫu Google Form (`SurveyFormEmbed`) | Khung nhúng iframe Google Form chính thức đặt trong khung viền giả lập thiết bị thanh lịch | Chuyển sang tab "Biểu Mẫu Khảo Sát (Google Form)" | Render trực tiếp Google Form cho học sinh điền chi tiết, kèm nút mở Tab Mới | Fallback hiển thị text nếu mạng chậm | `src/tabs/SurveyTab.jsx` |
| 33 | Tab 6: Khảo sát | Sổ Dữ Liệu Đồng Bộ & Nhúng Google Sheets (`SurveySheetEmbed`) | Tab Bảng tính dành riêng cho Admin với 2 chế độ: Sổ Dữ Liệu Di Sản dạng bảng HTML hoặc Nhúng Google Sheets preview | Chuyển sang tab "Bảng Tính Excel Đồng Bộ (Admin)" | Hiển thị bảng tổng hợp toàn bộ phiếu khảo sát hoặc iframe Google Sheets | Ẩn hoàn toàn khỏi người dùng thông thường nếu chưa đăng nhập Admin | `src/tabs/SurveyTab.jsx` |
| 34 | Tab 6: Khảo sát | Đồng bộ Đám mây Thời gian thực (`SurveyCloudSync`) | Nút "Làm mới" kéo dữ liệu mới nhất từ Google Sheets CSV/Webhook về trình duyệt | Click nút "Làm mới" (`.btn-sync-refresh-pill`) | Hiển thị spinner quay, cập nhật mảng reviews từ Google Sheets, hiển thị thanh thông báo xanh | Bắt lỗi mạng và giữ lại dữ liệu cục bộ an toàn | `src/tabs/SurveyTab.jsx`, `src/services/surveySyncService.js` |
| 35 | Đố Vui (Quiz) | Đấu Trường Đố Vui 3 Cấp Độ (`QuizArenaTab`) | 3 cấp độ: Khởi Khái Môn (Ⅰ), Binh Pháp Khắc Địch (Ⅱ), Kỳ Tài Vương Triều (Ⅲ); mỗi lượt rút 10 câu ngẫu nhiên | Chọn cấp độ và bấm "Bắt Đầu Thử Thách" | Hiển thị câu hỏi, 4 đáp án xáo trộn, thanh tiến trình, tính điểm, âm thanh Đúng/Sai | Không lặp lại câu hỏi vừa làm ở lượt trước | `src/tabs/QuizArenaTab.jsx` |
| 36 | Đố Vui (Quiz) | Xuất Giấy Chứng Nhận Vinh Danh (`QuizCertificate`) | Tự động vẽ canvas Giấy Chứng Nhận Hào Khí Tây Sơn kèm họ tên học sinh, số điểm và con dấu triều đình | Hoàn thành bài thi và nhập họ tên nhận chứng nhận | Render Canvas độ phân giải cao, hỗ trợ tải file ảnh PNG về máy | Kiểm tra tên người nhận không được để trống | `src/tabs/QuizArenaTab.jsx`, `src/utils/certificateGenerator.js` |
| 37 | Quản Trị Hệ Thống | Xác thực Mã PIN Bảo Mật (`AdminPinAuth`) | Modal yêu cầu mã PIN khi mở Bảng Quản Trị hoặc các chức năng cấu hình nhạy cảm | Nhập mã PIN (Hỗ trợ: `1789`, `12a8`, `1234`, `admin123`, `lequangtrung`) | Chuyển trạng thái sang Quản trị viên (`isAdmin = true`), lưu vào `sessionStorage` & `localStorage` | Nhập sai rung lắc và báo lỗi, không cấp quyền | `src/context/AdminContext.jsx`, `src/components/AdminKnowledgeModal.jsx` |
| 38 | Quản Trị Hệ Thống | Bảng Điều Khiển Quản Trị 4 Phân Hệ (`AdminKnowledgeModal`) | Trung tâm kiểm soát toàn diện gồm 4 tab: Khảo Sát & Sheets, Quản Trị Sử Liệu AI, Quản Trị Hiện Vật Bảo Tàng, Thông Tin Hệ Thống | Chuyển đổi giữa 4 tab quản trị | Cấu hình URL Form/Sheets/Webhook, nạp tư liệu Google Docs, thay ảnh bảo tàng, xem thông tin bản quyền tác giả Lê Trường Thịnh | Lưu cấu hình an toàn, phát sự kiện `su_config_updated` để đồng bộ toàn web | `src/components/AdminKnowledgeModal.jsx` |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Khởi động ứng dụng (`App.jsx`) | Mở web lần đầu tiên trong phiên (`sessionStorage.su_intro_seen_session` chưa có) | `CinematicIntro` hiển thị toàn màn hình, che khuất giao diện chính cho đến khi user nhấn "Vào Khám Phá" |
| 2 | Khởi động ứng dụng (`App.jsx`) | Tải lại trang (F5) khi đã xem intro trong phiên | `showIntro` bằng `false`, trang chủ hiển thị ngay lập tức, không bắt user xem lại intro |
| 3 | Điều hướng Hash (`App.jsx`) | Nhập hash không hợp lệ trên thanh địa chỉ (ví dụ: `http://localhost:3000/#invalid-tab-xyz`) | `handleHashChange` kiểm tra danh sách `validTabs`; nếu không hợp lệ thì fallback an toàn hiển thị `HomeTab` |
| 4 | Điều hướng Tab nhanh (Chuyển tab liên tục) | Click chuyển đổi liên tục giữa 7 tab trong thời gian dưới 100ms | `AnimatePresence mode="wait"` hủy transition cũ sạch sẽ, không sinh ra duplicate DOM hay lỗi React hydration |
| 5 | Âm thanh Web Audio | Mở trang trên trình duyệt có chính sách Autoplay nghiêm ngặt (chưa có tương tác người dùng) | AudioContext ở trạng thái `suspended`; code kiểm tra an toàn không throw Uncaught Error; tự kích hoạt khi click đầu tiên |
| 6 | Menu Di Động (`Navbar.jsx`) | Mở menu Hamburger rồi thay đổi kích thước cửa sổ trình duyệt lên độ phân giải Desktop (> 768px) | Media query CSS tự động ẩn overlay; khi đóng menu `document.body.style.overflow` được trả về bình thường |
| 7 | Modal Dòng thời gian (`TimelineTab.jsx`) | Mở modal khảo cứu rồi nhấn phím `Escape` trên bàn phím | Lắng nghe sự kiện `keydown`, bắt phím `Escape` và đóng modal ngay lập tức |
| 8 | Bản đồ Sa Bàn (`BattleMapTab.jsx`) | Chuyển đổi giữa các trận đánh khi đang mở Drawer hoặc đang có popup hiển thị | Xóa sạch instance Leaflet cũ (`map.remove()`), dọn dẹp layer group, khởi tạo map mới tại tọa độ chuẩn, không rò rỉ bộ nhớ |
| 9 | Bản đồ Sa Bàn (`BattleMapTab.jsx`) | Mở/đóng Drawer chi tiết | Gọi `mapInstance.invalidateSize()` sau 300ms để Leaflet tính toán lại viewport, tránh tình trạng bản đồ bị xám một phần |
| 10 | Tìm kiếm Bảo tàng (`MuseumTab.jsx`) | Nhập ký tự đặc biệt hoặc từ khóa không tồn tại (ví dụ: `@@@###!!!` hoặc `súng_laser_2026`) | Danh sách hiện vật trả về rỗng; hiển thị khối `museum-empty-state` kèm nút "Đặt lại bộ lọc" |
| 11 | Tìm kiếm Bảo tàng (`MuseumTab.jsx`) | Nhập khoảng trắng thừa ở đầu/cuối (ví dụ: `   hỏa hổ   `) | Hàm filter sử dụng `.trim()` và `.toLowerCase()`, vẫn tìm chính xác hiện vật "Hỏa hổ Tây Sơn" |
| 12 | Ảnh Hiện vật Bảo tàng | Đường dẫn ảnh bị hỏng (mất mạng hoặc link 404) | Thẻ `<img>` có sự kiện `onError` tự động gán nguồn ảnh fallback `./images/artifacts/hoa_ho_tay_son.jpg`, không hiển thị icon ảnh gãy |
| 13 | Sử Quan AI (`AiStationTab.jsx`) | Nhấn phím `Enter` khi ô input rỗng hoặc chỉ có dấu cách | Bị chặn bởi điều kiện `!textToSend || isLoading`, không gửi tin nhắn rác, ô nhập liệu giữ nguyên |
| 14 | Sử Quan AI (`AiStationTab.jsx`) | Nhấn tổ hợp phím `Shift + Enter` trong ô nhập liệu | Không kích hoạt gửi tin nhắn, cho phép nhập xuống dòng trong trường hợp mở rộng |
| 15 | Sử Quan AI (`AiStationTab.jsx`) | Mất kết nối internet hoặc API Gemini trả về lỗi HTTP 500/429 | Khối `catch` bắt lỗi, thêm tin nhắn bot lịch sự: *"Rất tiếc, kết nối đến máy chủ AI đang gặp gián đoạn..."*, không crash giao diện |
| 16 | Đánh giá Cộng đồng (`SurveyTab.jsx`) | Bỏ trống Họ tên hoặc Nội dung nhận xét rồi bấm gửi | Bị chặn bởi `required` của HTML form và hàm kiểm tra `!newName.trim()`, bật thông báo yêu cầu điền đủ |
| 17 | Đánh giá Cộng đồng (`SurveyTab.jsx`) | Điền họ tên chứa ký tự đặc biệt, emoji hoặc chuỗi rất dài | Giao diện hiển thị an toàn bằng flex layout, tự động xuống dòng (`word-break`), không làm vỡ bố cục thẻ card |
| 18 | Xác thực Admin (`AdminContext.jsx`) | Nhập sai mã PIN (ví dụ: `0000`, `abc`, `pass`) | Hàm `loginAdmin` trả về `false`, hiển thị thông báo lỗi màu đỏ, trạng thái `isAdmin` vẫn là `false` |
| 19 | Quyền Admin (`SurveyTab.jsx` / `Navbar.jsx`) | Người dùng thường cố tình truy cập tab Bảng tính Excel bằng hash hoặc state cũ | `useEffect` kiểm tra `if (!isAdmin && activeView === 'sheet') setActiveView('reviews')`, tự động đẩy về tab công khai |
| 20 | Đố Vui (`QuizArenaTab.jsx`) | Bắt đầu lượt chơi mới ở cùng một cấp độ | Hàm `prepareShuffledQuiz` loại bỏ 10 câu hỏi đã làm ở lượt trước (`excludedQuestionTexts`), đảm bảo câu hỏi mới mẻ |

---

## 2. Thiết Kế Bộ Kiểm Thử E2E Đa Tầng (Tiers 1 - 4) Với Playwright CLI

### Tier 1: Kiểm Thử Độ Bao Phủ Tính Năng & Thành Phần Cốt Lõi (Core Surface Coverage)
- **Mục tiêu**: Đảm bảo tất cả 7 tab và các khối chức năng chính đều render hoàn hảo, không có thẻ HTML gãy, không lỗi runtime.
- **Kịch bản chi tiết**:
  1. **Khởi tạo & Bỏ qua Intro**:
     - Mở trình duyệt với `playwright-cli open http://localhost:3000`.
     - Kiểm tra snapshot: Nếu thấy màn hình Cinematic Intro, thực hiện click nút "Vào Khám Phá" (`playwright-cli click "text=Vào Khám Phá"`).
     - Hoặc thiết lập trước trạng thái phiên:
       ```bash
       playwright-cli sessionstorage-set su_intro_seen_session v1
       playwright-cli reload
       ```
  2. **Duyệt qua 7 Tab chính trên Navbar**:
     - **Tab 1 (Trang Chủ)**: Kiểm tra tiêu đề `HÀO KHÍ TÂY SƠN`, sự hiện diện của 2 nút CTA chính và 5 thẻ Bento.
     - **Tab 2 (Dòng Thời Gian)**: Click nút `Dòng Thời Gian` trên Navbar, kiểm tra sự hiện diện của 4 nút phân kỳ và các thẻ mốc sử so le.
     - **Tab 3 (Sa Bàn)**: Click nút `Sa Bàn`, kiểm tra container Leaflet map `.leaflet-map-element`, bộ chọn 3 trận đánh và thanh phase pills.
     - **Tab 4 (Bảo Tàng)**: Click nút `Bảo Tàng`, kiểm tra ô tìm kiếm, select danh mục và các biển hiệu hiện vật `.museum-plaque-card`.
     - **Tab 5 (Sử Quan AI)**: Click nút `Sử Quan AI`, kiểm tra header Sử Quan Tây Sơn, tin nhắn chào mừng, các chip gợi ý chiếu thư và ô nhập liệu.
     - **Tab 6 (Đố Vui)**: Click nút `Đố Vui`, kiểm tra 3 cấp độ thử thách và nút "Bắt Đầu Thử Thách".
     - **Tab 7 (Đánh Giá)**: Click nút `Đánh Giá`, kiểm tra bảng điểm sao lớn, nút "Viết Đánh Giá Của Bạn" và danh sách nhận xét cộng đồng.

### Tier 2: Kiểm Thử Biên & Góc Nhọn (Boundary & Corner Cases)
- **Mục tiêu**: Kiểm tra phản ứng của hệ thống khi nhận input bất thường, thao tác nhanh và thay đổi kích thước màn hình.
- **Kịch bản chi tiết**:
  1. **Input rỗng và validation**:
     - Tại `ai-station`: Cố tình click nút gửi khi ô input rỗng -> Xác nhận không có tin nhắn rỗng nào được thêm vào DOM.
     - Tại `survey`: Mở form đánh giá, để trống họ tên hoặc nhận xét và click gửi -> Xác nhận form hiển thị cảnh báo, không gửi dữ liệu rác.
  2. **Tìm kiếm rác trong Bảo tàng**:
     - Tại `museum`: Gõ `kiem_khong_ton_tai_9999` vào ô tìm kiếm -> Xác nhận hiển thị hộp thông báo `museum-empty-state` và nút "Đặt lại bộ lọc".
     - Click nút "Đặt lại bộ lọc" -> Xác nhận danh sách hiện vật phục hồi đầy đủ.
  3. **Chuyển Tab tốc độ cao (Fast Tab Switching)**:
     - Thực hiện chuỗi lệnh click liên tiếp giữa các tab cách nhau dưới 150ms: `home` -> `timeline` -> `battle-map` -> `museum` -> `ai-station`.
     - Xác nhận không có ngoại lệ JavaScript trong `playwright-cli console`, DOM hiển thị đúng tab cuối cùng.
  4. **Nhập sai mã PIN Admin**:
     - Mở form đăng nhập Admin, nhập mã PIN `9999` -> Xác nhận hiển thị thông báo lỗi, quyền Admin không được kích hoạt.

### Tier 3: Kiểm Thử Liên Phân Hệ & Lưu Trữ Trạng Thái (Cross-Feature & State Persistence)
- **Mục tiêu**: Kiểm tra tính liền mạch giữa các luồng dữ liệu bắt chéo giữa các tab.
- **Kịch bản chi tiết**:
  1. **Từ Dòng Thời Gian -> Sử Quan AI**:
     - Tại tab `timeline`, tìm mốc sử năm 1789, click nút `Hỏi AI`.
     - Xác nhận hệ thống tự động chuyển sang tab `ai-station`, câu hỏi về chiến thắng Ngọc Hồi – Đống Đa tự động được nạp và kích hoạt AI đối thoại.
  2. **Từ Dòng Thời Gian -> Sa Bàn Chiến Trận**:
     - Tại tab `timeline`, click nút `Sa Bàn Trận Đánh` ở mốc 1785.
     - Xác nhận hệ thống chuyển sang tab `battle-map`, trận Rạch Gầm – Xoài Mút được kích hoạt.
  3. **Đăng nhập Quản Trị -> Mở quyền toàn hệ thống**:
     - Click nút `Admin` trên Navbar, nhập mã PIN `1789` -> Xác nhận đăng nhập thành công.
     - Chuyển sang tab `survey`: Thấy xuất hiện thêm tab "Bảng Tính Excel Đồng Bộ (Admin)" và các nút xóa nhận xét.
     - Chuyển sang tab `museum`: Mở chi tiết hiện vật -> Thấy xuất hiện bảng điều khiển "Quản trị: Cập nhật ảnh hiện vật".
     - Click nút `Thoát` trên Navbar -> Xác nhận các quyền và giao diện Admin lập tức ẩn đi, bảo mật dữ liệu an toàn.
  4. **Kiểm tra đồng bộ Hash URL**:
     - Nhập lệnh `playwright-cli goto http://localhost:3000/#battle-map` -> Xác nhận tab Sa Bàn hiển thị trực tiếp.
     - Nhấn `playwright-cli go-back` -> Xác nhận quay lại tab trước đó chính xác.

### Tier 4: Kịch Bản Trải Nghiệm Học Sử Thực Tế (Real-World Complete Flow)
- **Mục tiêu**: Tái hiện trọn vẹn hành trình 1 buổi học sử sinh động của học sinh THPT Nguyễn Huệ.
- **Trình tự tương tác**:
  1. **Bước 1 (Nhập môn)**: Học sinh mở trang web -> Chiêm ngưỡng màn mở đầu 3D điện ảnh -> Click "Vào Khám Phá" -> Nghe lời Hiểu Dụ xuất quân tại Trang Chủ.
  2. **Bước 2 (Khảo cứu sa bàn)**: Click CTA "Khám phá Sa Bàn Trận Đánh" -> Khám phá 3 giai đoạn trận Rạch Gầm -> Tham gia câu hỏi mini quiz nhận 10 điểm -> Xem vị trí Google Maps thực tế.
  3. **Bước 3 (Biên niên sử)**: Chuyển sang tab Dòng Thời Gian -> Lọc thời kỳ "1788–1792" -> Mở modal khảo cứu đại phá quân Thanh -> Đọc xong nhấn phím Escape để đóng.
  4. **Bước 4 (Chiêm ngưỡng bảo vật)**: Chuyển sang Bảo Tàng -> Tìm kiếm "hỏa hổ" -> Mở modal chi tiết 60/40 khảo cứu ống phóng lửa huyền thoại -> Đóng modal.
  5. **Bước 5 (Đàm đạo AI)**: Chuyển sang Sử Quan AI -> Chọn câu hỏi chiếu thư "Bí quyết hành quân thần tốc của vua Quang Trung?" -> Đọc lời giải thích sâu sắc của AI.
  6. **Bước 6 (Thử thách tri thức)**: Chuyển sang Đấu Trường Đố Vui -> Chọn cấp độ "Khởi Khái Môn" -> Trả lời câu hỏi -> Nhận lời chúc mừng chiến thắng.
  7. **Bước 7 (Đóng góp ý kiến)**: Chuyển sang Khảo Sát & Đánh Giá -> Bấm "Viết Đánh Giá Của Bạn" -> Chọn 5 sao -> Điền tên "Trần Hoàng Quân - 12A8" -> Nhận xét "Giao diện di sản tuyệt đẹp và sa bàn 3D rất trực quan" -> Bấm gửi -> Pháo hoa nổ chúc mừng -> Nhận xét xuất hiện ngay trên đầu trang -> Bấm "Hữu ích" để thả tim.

---

## 3. Kế Hoạch Chụp Ảnh Màn Hình Nghiệm Thu (Screenshot Matrix Plan)

Để phục vụ nghiệm thu hình ảnh trực quan chuẩn quốc tế và báo cáo thẩm mỹ, bộ ảnh sẽ được chụp tự động ở cả 2 độ phân giải chuẩn:
- **Desktop Viewport**: `1920 x 1080` (Màn hình máy tính Full HD chuẩn mực).
- **Mobile Viewport**: `390 x 844` (Tỷ lệ iPhone 14 / Smartphone hiện đại, mô phỏng cảm ứng di động).

### Danh Sách 16 Ảnh Nghiệm Thu Bắt Buộc:

| STT | Mã Tệp Ảnh Chụp | Chế Độ | Viewport | Mục Tiêu Nghiệm Thu Trực Quan |
|---|---|---|---|---|
| 1 | `screen_01_desktop_intro.png` | Desktop | 1920x1080 | Màn mở đầu Điện ảnh 3D Parallax tượng Quang Trung, trích dẫn hịch và hiệu ứng tàn tro |
| 2 | `screen_01_mobile_intro.png` | Mobile | 390x844 | Giao diện Intro co giãn hoàn hảo trên màn hình dọc điện thoại |
| 3 | `screen_02_desktop_home.png` | Desktop | 1920x1080 | Trang chủ với Hero Hoàng triều, 2 nút CTA vàng rực, khung tượng đài và lưới Bento 5 phân hệ |
| 4 | `screen_02_mobile_home.png` | Mobile | 390x844 | Trang chủ trên điện thoại: bố cục xếp chồng mượt mà, menu hamburger, nút CTA dễ chạm |
| 5 | `screen_03_desktop_timeline.png` | Desktop | 1920x1080 | Biên niên sử so le Zigzag, vệt laser vàng chạy dọc giữa trang, 4 nút phân kỳ lịch sử |
| 6 | `screen_03_mobile_timeline.png` | Mobile | 390x844 | Dòng thời gian thu về 1 cột trên mobile, node chấm phát sáng và thẻ card vừa vặn màn hình |
| 7 | `screen_04_desktop_battlemap.png` | Desktop | 1920x1080 | Sa bàn chiến trận với Google Hybrid vệ tinh, mũi tên tiến công và Drawer mở bên phải |
| 8 | `screen_04_mobile_battlemap.png` | Mobile | 390x844 | Sa bàn trên mobile: Drawer vuốt trượt từ dưới lên, các nút phase pill cuộn ngang mượt |
| 9 | `screen_05_desktop_museum.png` | Desktop | 1920x1080 | Bảo tàng hiện vật số với lưới plaque đồng nhất tỷ lệ 16:9, thanh tìm kiếm và lọc phân loại |
| 10 | `screen_05_mobile_museum.png` | Mobile | 390x844 | Lưới bảo tàng trên mobile hiển thị 1 cột trang nhã, không bị tràn ngang |
| 11 | `screen_06_desktop_aistation.png` | Desktop | 1920x1080 | Trạm Sử Quan AI với giao diện Cuộn Trúc Hoàng Gia, các chip chiếu thư và thanh nhập liệu |
| 12 | `screen_06_mobile_aistation.png` | Mobile | 390x844 | Khung chat AI trên điện thoại với khung tin nhắn cuộn độc lập và ô nhập cố định dưới đáy |
| 13 | `screen_07_desktop_quiz.png` | Desktop | 1920x1080 | Đấu trường đố vui với 3 thẻ cấp độ La Mã cổ (Ⅰ, Ⅱ, Ⅲ) và thanh trạng thái tiến trình |
| 14 | `screen_07_mobile_quiz.png` | Mobile | 390x844 | Giao diện đố vui trên điện thoại: các lựa chọn trắc nghiệm dạng nút bấm lớn dễ thao tác |
| 15 | `screen_08_desktop_survey.png` | Desktop | 1920x1080 | Bảng khảo sát & đánh giá: điểm số trung bình lớn, thanh phân bổ sao và bảng tin nhận xét |
| 16 | `screen_08_mobile_survey.png` | Mobile | 390x844 | Màn hình khảo sát mobile với form gửi đánh giá và thẻ nhận xét có nút thả tim |
| 17 | `screen_09_desktop_admin_modal.png` | Desktop | 1920x1080 | Bảng điều khiển Quản Trị Hệ Thống Toàn Diện với 4 tab (Survey, AI, Museum, System) |
| 18 | `screen_10_desktop_museum_modal.png` | Desktop | 1920x1080 | Modal triển lãm hiện vật 60/40 toàn màn hình với hình ảnh độ phân giải cao và khảo cứu sâu |

---

## 4. Tiêu Chuẩn Nghiệm Thu & Kiểm Chứng Lỗi Console (Zero Console Errors)

Để đạt chuẩn chất lượng Awwwards và quy chuẩn nghiệm thu cao nhất:
1. **Kiểm tra nhật ký trình duyệt bằng Playwright CLI**:
   - Sử dụng lệnh `playwright-cli console` ở mọi màn hình.
   - **Tiêu chuẩn bắt buộc**: Không có thông báo `[error]` nào trong console log. Các thông báo thông tin (`[info]`, `[log]`) và warning của thư viện ngoài nếu có phải ở mức không ảnh hưởng đến giao diện người dùng.
2. **Kiểm tra bố cục không tràn (Zero Layout Overflow)**:
   - Sử dụng `playwright-cli eval "document.documentElement.scrollWidth <= window.innerWidth"` để xác nhận chiều rộng nội dung không bị tràn ngang sinh ra thanh cuộn ngang ngoài ý muốn (horizontal scrollbar).
3. **Kiểm tra ảnh không bị lỗi tải (No Broken Images)**:
   - Sử dụng `playwright-cli eval "[...document.querySelectorAll('img')].every(img => img.naturalWidth > 0)"` để xác minh mọi thẻ ảnh trên trang đều được tải thành công hoặc kích hoạt fallback hợp lệ.
4. **Kiểm tra Focus & Khả năng truy cập (Accessibility - A11y)**:
   - Các modal (`MuseumModal`, `TimelineModal`, `AdminKnowledgeModal`) phải có Focus trap, nút đóng có thuộc tính `aria-label`, và hỗ trợ đóng bằng phím `Escape`.

---

## 5. Quy Trình Chạy Kiểm Thử Mẫu Bằng Playwright CLI (Runbook)

```powershell
# 1. Khởi động Dev Server ở cửa sổ nền
# npx vite --port 3000 --no-open

# 2. Khởi tạo phiên kiểm thử Desktop
playwright-cli open http://localhost:3000
playwright-cli resize 1920 1080

# 3. Chụp ảnh màn hình Intro
playwright-cli screenshot --filename=screen_01_desktop_intro.png

# 4. Vào màn hình chính và chụp Trang Chủ
playwright-cli click "text=Vào Khám Phá"
playwright-cli screenshot --filename=screen_02_desktop_home.png

# 5. Kiểm tra lỗi console
playwright-cli console error

# 6. Chuyển sang Dòng Thời Gian và chụp
playwright-cli click "text=Dòng Thời Gian"
playwright-cli screenshot --filename=screen_03_desktop_timeline.png

# 7. Chuyển sang Sa Bàn và chụp
playwright-cli click "text=Sa Bàn"
playwright-cli screenshot --filename=screen_04_desktop_battlemap.png

# 8. Chuyển sang Bảo Tàng và chụp
playwright-cli click "text=Bảo Tàng"
playwright-cli screenshot --filename=screen_05_desktop_museum.png

# 9. Chuyển sang Sử Quan AI và chụp
playwright-cli click "text=Sử Quan AI"
playwright-cli screenshot --filename=screen_06_desktop_aistation.png

# 10. Chuyển sang Đố Vui và chụp
playwright-cli click "text=Đố Vui"
playwright-cli screenshot --filename=screen_07_desktop_quiz.png

# 11. Chuyển sang Đánh Giá và chụp
playwright-cli click "text=Đánh Giá"
playwright-cli screenshot --filename=screen_08_desktop_survey.png

# 12. Kiểm tra chế độ Mobile
playwright-cli resize 390 844
playwright-cli screenshot --filename=screen_08_mobile_survey.png

# 13. Đóng phiên kiểm thử
playwright-cli close
```

---
*Tài liệu này là đặc tả thẩm định chính thức, cung cấp đầy đủ thông số và bề mặt tương tác phục vụ kiểm thử tự động hóa và nghiệm thu chất lượng sản phẩm.*
