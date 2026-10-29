# Original User Request

## 2026-10-29T13:27:01Z

Multi-agent engineering team with specialized Design Directors, Motion Engineers, and QA Test Automators.

Nâng cấp toàn diện giao diện website "Hào Khí Tây Sơn" (Trường THCS và THPT Nguyễn Huệ) đạt chuẩn Design Engineering quốc tế và giải thưởng Awwwards bằng cách hiệp đồng 4 kỹ năng tinh hoa: Taste (chống AI-slop, visual di sản sang trọng), Emil Kowalski (micro-interactions, spring physics, tactile feel), Sonner (hệ thống thông báo toast xếp chồng mượt mà), và Playwright CLI (tự động kiểm thử tương tác và chụp ảnh màn hình nghiệm thu).

Working directory: d:\Projects\SchoolProjects\Su
Integrity mode: development

## Requirements

### R1. Taste-Driven Heritage Art Direction (Chống AI-Slop Toàn Diện)
Áp dụng nguyên lý của Taste Skill (v2) để nâng tầm toàn diện 6 tab giao diện chính (Trang chủ, Dòng thời gian, Sa bàn chiến trận, Bảo tàng, Sử quan AI, Khảo sát & Admin):
- Xóa bỏ mọi tàn dư thiết kế rập khuôn (card đơn điệu, glow neon chói, bố cục chia cột đều nhàm chán).
- Thiết lập hệ thị giác di sản Tây Sơn trang trọng: Nền Obsidian Black `#08090C` sâu thẳm, kim loại đồng cổ (Antique Bronze) và ánh vàng hoàng tộc (Imperial Amber Gold `#F59E0B`/`#D97706`).
- Tối ưu khoảng cách nhịp thở (spacing rhythm) và typography chuẩn mực, phân cấp thị giác rõ ràng giữa tiêu đề di sản uy nghiêm và nội dung học thuật dễ đọc.

### R2. Emil Kowalski Motion & Micro-Interactions Craft
Triển khai bộ quy chuẩn chuyển động của Emil Kowalski trên nền tảng Framer Motion v12:
- Tinh chỉnh toàn bộ easing: loại bỏ `linear` hoặc `ease-in` lỗi thời; sử dụng Spring Physics (`type: "spring", stiffness: 350, damping: 28`) và đường cong giảm tốc tự nhiên `cubic-bezier(0.16, 1, 0.3, 1)`.
- Micro-interactions nảy xúc giác (tactile feel): Nút bấm có độ lún phản hồi khi nhấn (`whileTap={{ scale: 0.96 }}`) và nâng nhẹ khi hover (`whileHover={{ y: -2, scale: 1.01 }}`).
- Thanh chuyển đổi Tab dạng Pill trượt mượt mà (`layoutId` shared layout) cho thanh điều hướng chính và Bảng điều khiển Admin.
- Tôn trọng thuộc tính `@media (prefers-reduced-motion: reduce)` và đảm bảo hiệu năng 60fps mượt mà, chỉ animate `transform` và `opacity`.

### R3. Hệ Thống Thông Báo Hiện Đại Với Thư Viện Sonner
Tích hợp thư viện `sonner` chính thức do chính Emil Kowalski sáng lập:
- Cài đặt `npm install sonner` và gắn component `<Toaster position="top-right" richColors theme="dark" />` vào ứng dụng.
- Thay thế toàn bộ các alert/thông báo thông thường bằng Toast Sonner: thông báo lưu đánh giá, kết nối Google Sheets, sao chép liên kết URL, nạp tư liệu sử liệu mới.
- Hỗ trợ xếp chồng (stacking toasts), tự động giãn chiều cao theo nội dung và vuốt để tắt (swipe to dismiss).

### R4. Tự Động Hóa Kiểm Thử & Chụp Ảnh Nghiệm Thu Bằng Playwright CLI
Sử dụng công cụ `playwright-cli` (v0.1.22) để kiểm chứng sản phẩm thực tế:
- Tự động mở trình duyệt và tương tác qua tất cả các màn hình (Trang chủ, Sa bàn, Dòng thời gian, Đố vui, Sử quan AI, Khảo sát).
- Chụp ảnh màn hình (screenshots) ở chế độ Desktop và Mobile để nghiệm thu trực quan.
- Xác nhận không có lỗi JavaScript console hay tràn vỡ bố cục trên trình duyệt thực tế.

## Acceptance Criteria

### Thẩm Mỹ & Đẳng Cấp Visual (Taste Skill)
- [ ] Giao diện mang phong cách Bảo tàng số di sản sang trọng, không còn dấu vết của web game hay template AI rẻ tiền.
- [ ] Phối màu chuẩn Obsidian & Amber Gold, các mảng tương phản sắc nét, viền siêu mảnh thanh lịch.
- [ ] Typography có hệ thống cấp bậc rõ ràng, font hiển thị trang nghiêm kết hợp font nội dung dễ đọc.

### Chuyển Động & Xúc Giác (Emil Kowalski Craft)
- [ ] Toàn bộ nút bấm, card hiện vật, tab navigation đều phản hồi nảy mượt (Spring feedback) khi bấm hoặc hover.
- [ ] Tab navigation lướt pill mượt mà không bị đổi màu giật cục.
- [ ] Giữ vững 60fps, không gây giật lag khung hình khi chuyển động.

### Trải Nghiệm Thông Báo (Sonner)
- [ ] Thư viện `sonner` hoạt động trơn tru trong React 19.
- [ ] Các tác vụ Lưu, Copy link, Gửi form đều bật toast Sonner đúng ngữ cảnh với icon sinh động.

### Kiểm Thử Trình Duyệt (Playwright CLI)
- [ ] Có bộ ảnh chụp màn hình kiểm chứng (screenshots) cho thấy giao diện hoạt động hoàn hảo trên trình duyệt.
- [ ] Không có lỗi runtime hoặc crash giao diện.
