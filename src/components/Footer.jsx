import React from 'react';
import { Award, Swords } from 'lucide-react';

export default function Footer({ onSelectTab, onReplayIntro }) {
  const handleReplayIntro = () => {
    try {
      localStorage.removeItem('su_intro_seen');
    } catch (e) {}
    if (onReplayIntro) {
      onReplayIntro();
    } else {
      window.location.reload();
    }
  };

  return (
    <footer className="footer-heritage">
      <div className="footer-top-accent"></div>
      <div className="footer-content">
        <div className="footer-grid">
          {/* Cột 1: Thông tin đề tài */}
          <div className="footer-col brand-col">
            <div className="footer-brand-title">
              <span className="footer-icon imperial-emblem">
                <Swords size={20} className="emblem-sword text-gold" />
              </span>
              <h3>HÀO KHÍ TÂY SƠN</h3>
            </div>
            <p className="footer-desc">
              Nền tảng số hóa di sản và học tập Lịch sử về Hoàng đế Quang Trung – Nguyễn Huệ, hỗ trợ học sinh tiếp cận kiến thức trực quan và sinh động.
            </p>
            <div className="footer-award-badge">
              <Award size={16} className="badge-icon" />
              <span>Dự án Học tập Lịch sử – THPT Nguyễn Huệ</span>
            </div>
          </div>

          {/* Cột 2: Điều hướng nhanh */}
          <div className="footer-col links-col">
            <h4>Danh Mục Khám Phá</h4>
            <ul>
              <li><button onClick={() => onSelectTab('timeline')}>Biên Niên Sử (1753 - 1792)</button></li>
              <li><button onClick={() => onSelectTab('battle-map')}>Sa Bàn Trận Đánh Trực Quan</button></li>
              <li><button onClick={() => onSelectTab('museum')}>Bảo Tàng Hiện Vật & Thuyết Minh</button></li>
              <li><button onClick={() => onSelectTab('ai-station')}>Sử Quan Ảo (Google Gemini)</button></li>
              <li><button onClick={() => onSelectTab('quiz')}>Đố Vui Lịch Sử 3 Cấp Độ</button></li>
              <li><button onClick={() => onSelectTab('survey')}>Khảo Sát Đánh Giá Dự Án</button></li>
            </ul>
          </div>

          {/* Cột 3: Tác giả chính thức */}
          <div className="footer-col author-col">
            <h4>Tác Giả Dự Án</h4>
            <div className="author-card" style={{ marginBottom: '10px' }}>
              <div className="author-avatar">TT</div>
              <div className="author-info">
                <strong className="author-name">LÊ TRƯỜNG THỊNH</strong>
                <span className="author-class">Học sinh Lớp 12A8 · THPT Nguyễn Huệ</span>
              </div>
            </div>
            <div className="author-card">
              <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)' }}>NA</div>
              <div className="author-info">
                <strong className="author-name">TRẦN NGỌC ANH</strong>
                <span className="author-class">Học sinh Lớp 11A5 · THPT Nguyễn Huệ</span>
              </div>
            </div>
            <div className="author-card" style={{ marginTop: '10px' }}>
              <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}>DK</div>
              <div className="author-info">
                <strong className="author-name">TRẦN DUY KHANG</strong>
                <span className="author-class">Hỗ trợ &amp; Phát triển kỹ thuật hệ thống</span>
              </div>
            </div>
            <p className="author-quote" style={{ marginTop: '12px' }}>
              <em>"Khơi dậy ngọn lửa tự hào dân tộc và lòng biết ơn tiền nhân trong trái tim thế hệ trẻ bằng sức mạnh của công nghệ số."</em>
            </p>
          </div>
        </div>

        {/* Dòng bản quyền đáy trang */}
        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div className="footer-copyright" style={{ width: '100%', textAlign: 'center' }}>
            © 2026 <strong>Bản quyền dự án: Lê Trường Thịnh (12A8) &amp; Trần Ngọc Anh (11A5) — Trường THPT Nguyễn Huệ</strong>.
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', letterSpacing: '0.5px' }}>
            Phát triển &amp; Kỹ thuật hệ thống: Trần Duy Khang
          </div>
        </div>
      </div>
    </footer>
  );
}
