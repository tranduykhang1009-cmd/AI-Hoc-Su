import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  ExternalLink, 
  Table, 
  Settings, 
  CheckCircle, 
  RefreshCw, 
  Share2, 
  Layers,
  Star,
  MessageSquare,
  ThumbsUp,
  Send,
  PlusCircle,
  Award,
  ArrowRight,
  Trash2,
  RotateCcw,
  Database,
  Cloud,
  Check,
  Copy
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { playChime, playCorrectSound, playVictorySound } from '../utils/audio';
import { 
  DEFAULT_SURVEY_FORM_URL, 
  DEFAULT_SURVEY_SHEET_URL, 
  DEFAULT_SURVEY_SHEET_ID,
  DEFAULT_SURVEY_WEBHOOK_URL,
  fetchReviewsFromCloud, 
  sendReviewToCloud,
  getSurveyWebhookUrl,
  saveSurveyWebhookUrl
} from '../services/surveySyncService';

const STORAGE_FORM_URL = 'su_survey_google_form_url';
const STORAGE_SHEET_URL = 'su_survey_google_sheet_url';
const STORAGE_REVIEWS_KEY = 'su_community_reviews_v2';

const DEFAULT_FORM_URL = DEFAULT_SURVEY_FORM_URL;
const DEFAULT_SHEET_URL = DEFAULT_SURVEY_SHEET_URL;

const DEFAULT_REVIEWS = [];

const isAllowedReview = (r) => {
  if (!r) return false;
  if (['rev-1', 'rev-2', 'rev-3', 'rev-4'].includes(r.id)) return false;
  const name = String(r.name || r.author || '').toLowerCase();
  const avatar = String(r.avatar || '').toUpperCase();
  if (name.includes('khang') || name.includes('duy khang') || avatar === 'DK') return false;
  return true;
};

export default function SurveyTab() {
  const { isAdmin, openAdmin } = useAdmin();
  const [formUrl, setFormUrl] = useState(DEFAULT_FORM_URL);
  const [sheetUrl, setSheetUrl] = useState(DEFAULT_SHEET_URL);
  const [activeView, setActiveView] = useState('reviews'); // 'reviews' | 'form' | 'sheet'
  const [sheetSubView, setSheetSubView] = useState('table'); // 'table' | 'embed'
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [inputFormUrl, setInputFormUrl] = useState('');
  const [inputSheetUrl, setInputSheetUrl] = useState('');
  const [webhookUrl, setWebhookUrl] = useState(() => getSurveyWebhookUrl());
  const [inputWebhookUrl, setInputWebhookUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopyUrl = (url, key) => {
    if (!url) return;
    try {
      navigator.clipboard.writeText(url);
      setCopiedKey(key);
      playChime(700, 'sine', 0.1);
      toast.success('Đã sao chép liên kết vào bộ nhớ tạm!');
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      toast.error('Không thể sao chép liên kết.');
    }
  };

  // Trạng thái Đánh giá cộng đồng & Cloud Sync (Khởi tạo sạch từ Google Sheets)
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REVIEWS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(isAllowedReview);
        }
      }
    } catch (e) {}
    return [];
  });

  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [cloudSyncMsg, setCloudSyncMsg] = useState('');
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Học sinh Lớp 12A8');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Đồng bộ đánh giá từ Google Sheets / Webhook về máy (Google Sheet là nguồn dữ liệu chuẩn)
  const handleSyncCloud = async (customSheetUrl = sheetUrl, silent = false) => {
    setIsSyncingCloud(true);
    if (!silent) {
      setCloudSyncMsg('Đang kiểm tra dữ liệu từ Google Sheets...');
      toast.loading('Đang kiểm tra dữ liệu từ Google Sheets...', { id: 'gviz-cloud-sync' });
    }
    try {
      const cloudData = await fetchReviewsFromCloud(customSheetUrl, webhookUrl);
      if (cloudData && Array.isArray(cloudData)) {
        // Dữ liệu trên web cập nhật 100% theo Google Sheets (xóa trên Sheet thì web cũng mất theo)
        const cleanData = cloudData.filter(isAllowedReview);
        setReviews(cleanData);
        try {
          localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(cleanData));
        } catch (e) {}
        if (!silent) {
          setCloudSyncMsg(`Đã đồng bộ ${cleanData.length} đánh giá từ Google Sheets!`);
          playCorrectSound();
          toast.success(`Đã đồng bộ ${cleanData.length} đánh giá từ Google Sheets!`, { id: 'gviz-cloud-sync' });
          setTimeout(() => setCloudSyncMsg(''), 4000);
        }
      } else {
        if (!silent) {
          setCloudSyncMsg('Dữ liệu đã ở trạng thái mới nhất!');
          toast.info('Dữ liệu từ Google Sheets đã là mới nhất!', { id: 'gviz-cloud-sync' });
          setTimeout(() => setCloudSyncMsg(''), 3000);
        }
      }
    } catch (e) {
      if (!silent) {
        setCloudSyncMsg('Tạm thời dùng dữ liệu cục bộ.');
        toast.error('Không thể đồng bộ từ Google Sheets, tạm thời dùng dữ liệu cục bộ.', { id: 'gviz-cloud-sync' });
      }
    } finally {
      setIsSyncingCloud(false);
    }
  };

  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(STORAGE_FORM_URL);
      const savedSheet = localStorage.getItem(STORAGE_SHEET_URL);

      // Nếu link cũ là link sample mặc định trước đây, tự động cập nhật sang link mới của người dùng
      if (savedForm && !savedForm.includes('sample_form')) {
        setFormUrl(savedForm);
      } else {
        setFormUrl(DEFAULT_FORM_URL);
        localStorage.setItem(STORAGE_FORM_URL, DEFAULT_FORM_URL);
      }

      if (savedSheet && !savedSheet.includes('1VGSKa__Ge1KRXKrvok5pihtK_mnQeW302tZffFFk3HE')) {
        setSheetUrl(savedSheet);
      } else {
        setSheetUrl(DEFAULT_SHEET_URL);
        localStorage.setItem(STORAGE_SHEET_URL, DEFAULT_SHEET_URL);
      }

      // Làm sạch cache đánh giá mẫu cũ nếu còn tồn tại
      const savedReviews = localStorage.getItem(STORAGE_REVIEWS_KEY);
      if (savedReviews) {
        const parsed = JSON.parse(savedReviews);
        if (Array.isArray(parsed)) {
          const clean = parsed.filter(isAllowedReview);
          localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(clean));
          setReviews(clean);
        }
      }
    } catch (e) {}

    // Tự động kiểm tra đồng bộ dữ liệu Cloud ngầm khi vào tab
    handleSyncCloud(DEFAULT_SHEET_URL, true);
  }, []);

  // Tự động lắng nghe khi Admin cập nhật URL từ Bảng điều khiển Quản Trị
  useEffect(() => {
    const handleConfigUpdated = () => {
      const f = localStorage.getItem(STORAGE_FORM_URL) || DEFAULT_FORM_URL;
      const s = localStorage.getItem(STORAGE_SHEET_URL) || DEFAULT_SHEET_URL;
      const w = getSurveyWebhookUrl();
      setFormUrl(f);
      setSheetUrl(s);
      setWebhookUrl(w);
      const saved = localStorage.getItem(STORAGE_REVIEWS_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setReviews(parsed.filter(isAllowedReview));
        } catch (e) {}
      }
    };
    window.addEventListener('su_config_updated', handleConfigUpdated);
    window.addEventListener('storage', handleConfigUpdated);
    return () => {
      window.removeEventListener('su_config_updated', handleConfigUpdated);
      window.removeEventListener('storage', handleConfigUpdated);
    };
  }, []);

  // Nếu người dùng thông thường vô tình ở view 'sheet', tự động quay về 'reviews'
  useEffect(() => {
    if (!isAdmin && activeView === 'sheet') {
      setActiveView('reviews');
    }
  }, [isAdmin, activeView]);

  const handleDeleteReview = (id) => {
    if (window.confirm('Quản trị viên: Bạn có chắc chắn muốn xóa đánh giá này?')) {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      try {
        localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(updated));
      } catch (e) {}
      playChime(450, 'sine', 0.1);
    }
  };

  const handleRestoreDefaultReviews = () => {
    if (window.confirm('Quản trị viên: Khôi phục lại 4 đánh giá mẫu ban đầu?')) {
      setReviews(DEFAULT_REVIEWS);
      try {
        localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(DEFAULT_REVIEWS));
      } catch (e) {}
      playCorrectSound();
    }
  };

  const handleOpenConfig = () => {
    openAdmin('survey');
    playChime(500, 'sine', 0.1);
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    const finalForm = inputFormUrl.trim() || DEFAULT_FORM_URL;
    const finalSheet = inputSheetUrl.trim() || DEFAULT_SHEET_URL;
    const finalWebhook = inputWebhookUrl.trim();

    setFormUrl(finalForm);
    setSheetUrl(finalSheet);
    setWebhookUrl(finalWebhook);

    try {
      localStorage.setItem(STORAGE_FORM_URL, finalForm);
      localStorage.setItem(STORAGE_SHEET_URL, finalSheet);
      saveSurveyWebhookUrl(finalWebhook);
    } catch (e) {}

    playCorrectSound();
    setSaveSuccess(true);
    handleSyncCloud(finalSheet, false);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsConfigOpen(false);
    }, 1200);
  };

  // Gửi đánh giá mới (Lưu ngay trên máy + Tự động gửi lên Cloud / Google Sheets)
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) {
      toast.warning('Vui lòng điền họ tên và nội dung đánh giá của bạn.');
      return;
    }

    const reviewItem = {
      id: 'rev-' + Date.now(),
      name: newName.trim(),
      role: newRole.trim() || 'Học sinh',
      school: 'Trường THCS và THPT Nguyễn Huệ',
      rating: newRating,
      date: 'Vừa xong',
      comment: newComment.trim(),
      likes: 1,
      liked: true,
      badge: newRole.includes('Giáo viên') ? 'Giáo viên' : 'Học sinh'
    };

    const updated = [reviewItem, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(updated));
    } catch (e) {}

    // Bắn dữ liệu ngầm lên Google Sheets / Apps Script Webhook
    sendReviewToCloud(reviewItem, webhookUrl).then(res => {
      if (res && res.success) {
        setCloudSyncMsg('Đánh giá của bạn đã được gửi thành công lên Google Sheets!');
        toast.success('Đánh giá đã được lưu vào Google Sheets!');
        setTimeout(() => setCloudSyncMsg(''), 4000);
      }
    });

    toast.success('Cảm ơn bạn đã gửi đánh giá!');
    playVictorySound();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5A93C', '#F4D06F', '#FF6B4A', '#10B981']
      });
    } catch (e) {}

    setNewName('');
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsAddingReview(false);
    }, 1500);
  };

  // Thả tim đánh giá
  const handleToggleLike = (reviewId) => {
    playChime(620, 'sine', 0.1);
    const updated = reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          likes: r.liked ? r.likes - 1 : r.likes + 1,
          liked: !r.liked
        };
      }
      return r;
    });
    setReviews(updated);
    try {
      localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  // Tính toán điểm số và tỷ lệ phân bổ sao động 100% theo thời gian thực
  const totalReviewsCount = reviews.length;
  const avgRating = totalReviewsCount > 0 
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
    starCounts[star] = (starCounts[star] || 0) + 1;
  });

  const starPercentages = {
    5: totalReviewsCount > 0 ? Math.round((starCounts[5] / totalReviewsCount) * 100) : 0,
    4: totalReviewsCount > 0 ? Math.round((starCounts[4] / totalReviewsCount) * 100) : 0,
    3: totalReviewsCount > 0 ? Math.round((starCounts[3] / totalReviewsCount) * 100) : 0,
    2: totalReviewsCount > 0 ? Math.round((starCounts[2] / totalReviewsCount) * 100) : 0,
    1: totalReviewsCount > 0 ? Math.round((starCounts[1] / totalReviewsCount) * 100) : 0,
  };

  // Chuyển link Google Sheet sang dạng xem nhúng trực tiếp an toàn
  const getEmbedSheetUrl = (url) => {
    if (!url) return '';
    if (url.includes('/edit')) {
      return url.replace(/\/edit.*$/, '/preview');
    }
    return url;
  };

  return (
    <motion.div 
      className="tab-page survey-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-title-box">
        <h2 className="section-heading">KHẢO SÁT & ĐÁNH GIÁ TRẢI NGHIỆM</h2>
        <p className="section-subtext">
          Đánh giá cộng đồng kết hợp thu thập ý kiến qua Google Form & đồng bộ Google Sheets theo thời gian thực.
        </p>
        <div className="title-divider-gold"></div>
      </div>

      {/* 3 Tabs Điều Khiển Chính: Đánh Giá Cộng Đồng | Google Form | Google Sheets */}
      <div className="survey-toolbar-card card">
        <div className="survey-tab-switch">
          <button 
            className={`survey-toggle-btn ${activeView === 'reviews' ? 'active' : ''}`}
            onClick={() => {
              playChime(600, 'sine', 0.1);
              setActiveView('reviews');
            }}
          >
            <Star size={17} className="text-gold" />
            <span>Đánh Giá & Nhận Xét Cộng Đồng</span>
          </button>

          <button 
            className={`survey-toggle-btn ${activeView === 'form' ? 'active' : ''}`}
            onClick={() => {
              playChime(600, 'sine', 0.1);
              setActiveView('form');
            }}
          >
            <FileText size={17} />
            <span>Biểu Mẫu Khảo Sát (Google Form)</span>
          </button>

          {/* CHỈ HIỂN THỊ TAB BẢNG TÍNH GOOGLE SHEETS KHI Ở CHẾ ĐỘ ADMIN */}
          {isAdmin && (
            <button 
              className={`survey-toggle-btn ${activeView === 'sheet' ? 'active' : ''}`}
              onClick={() => {
                playChime(600, 'sine', 0.1);
                setActiveView('sheet');
              }}
            >
              <Table size={17} />
              <span>Bảng Tính Excel Đồng Bộ (Admin)</span>
            </button>
          )}
        </div>

        <div className="survey-toolbar-actions">
          {/* Nút Làm mới dữ liệu tinh gọn cho học sinh / giáo viên */}
          <button 
            className="btn-sync-refresh-pill"
            onClick={() => handleSyncCloud(sheetUrl, false)}
            disabled={isSyncingCloud}
            title="Cập nhật kết quả mới nhất từ Google Sheets"
          >
            <RefreshCw size={14} className={isSyncingCloud ? 'animate-spin' : ''} />
            <span>{isSyncingCloud ? 'Đang tải...' : 'Làm mới'}</span>
          </button>

          {/* CHỈ HIỂN THỊ NÚT CÀI ĐẶT CHO ADMIN (ẨN HOÀN TOÀN KHỎI USER) */}
          {isAdmin && (
            <button 
              className="config-link-btn"
              onClick={handleOpenConfig}
              title="Cài đặt link Google Form, Google Sheet và Webhook (Dành riêng cho Quản trị viên)"
            >
              <Settings size={14} />
              <span>Cài đặt (Admin)</span>
            </button>
          )}
        </div>
      </div>

      {cloudSyncMsg && (
        <div className="cloud-sync-status-bar" style={{
          margin: '0 0 16px 0',
          padding: '10px 16px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '8px',
          color: '#34D399',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={16} />
          <span>{cloudSyncMsg}</span>
        </div>
      )}

      {/* Modal Cài Đặt Link Google Form / Google Sheets */}
      {isConfigOpen && (
        <div className="modal-backdrop" onClick={() => setIsConfigOpen(false)}>
          <div className="modal-dialog-box card" onClick={e => e.stopPropagation()}>
            <h3>Cài Đặt Link Khảo Sát Google Form & Sheet</h3>
            <p className="dialog-desc">
              Hệ thống đã cố định đường link Google Form và Google Sheets của bạn. Bạn cũng có thể cấu hình Apps Script Webhook để đánh giá từ web bắn thẳng vào Google Sheets theo thời gian thực.
            </p>

            <form onSubmit={handleSaveConfig} className="dialog-form">
              <div className="dialog-group">
                <label>1. Link Google Form (Để người dùng điền):</label>
                <div className="url-action-input-row">
                  <input 
                    type="url"
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    value={inputFormUrl}
                    onChange={e => setInputFormUrl(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn-url-copy" 
                    title="Sao chép link"
                    onClick={() => handleCopyUrl(inputFormUrl, 'form')}
                  >
                    {copiedKey === 'form' ? <Check size={14} style={{ color: '#34D399' }} /> : <Copy size={14} />}
                  </button>
                  {inputFormUrl && (
                    <a 
                      href={inputFormUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-url-open"
                      title="Mở liên kết"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div className="dialog-group">
                <label>2. Link Google Sheets (Chứa kết quả đồng bộ):</label>
                <div className="url-action-input-row">
                  <input 
                    type="url"
                    placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                    value={inputSheetUrl}
                    onChange={e => setInputSheetUrl(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn-url-copy" 
                    title="Sao chép link"
                    onClick={() => handleCopyUrl(inputSheetUrl, 'sheet')}
                  >
                    {copiedKey === 'sheet' ? <Check size={14} style={{ color: '#34D399' }} /> : <Copy size={14} />}
                  </button>
                  {inputSheetUrl && (
                    <a 
                      href={inputSheetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-url-open"
                      title="Mở liên kết"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div className="dialog-group">
                <label>3. Link Google Apps Script Webhook (Để nhận đánh giá trực tiếp từ web):</label>
                <div className="url-action-input-row">
                  <input 
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={inputWebhookUrl}
                    onChange={e => setInputWebhookUrl(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn-url-copy" 
                    title="Sao chép link"
                    onClick={() => handleCopyUrl(inputWebhookUrl, 'webhook')}
                  >
                    {copiedKey === 'webhook' ? <Check size={14} style={{ color: '#34D399' }} /> : <Copy size={14} />}
                  </button>
                  {inputWebhookUrl && (
                    <a 
                      href={inputWebhookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-url-open"
                      title="Mở liên kết"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <small style={{ color: 'rgba(255,255,255,0.5)', marginTop: '4px', display: 'block' }}>
                  Triển khai Web App từ Apps Script gắn với Google Sheet (Execute as: Me, Access: Anyone) để lưu realtime.
                </small>
              </div>

              {saveSuccess && (
                <div className="dialog-success-msg">
                  <CheckCircle size={16} /> Đã lưu thành công link khảo sát & đồng bộ dữ liệu!
                </div>
              )}

              <div className="dialog-btn-row">
                <button type="submit" className="btn btn-primary">
                  Lưu & Áp Dụng Ngay
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsConfigOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          VIEW 1: ĐÁNH GIÁ & NHẬN XÉT CỘNG ĐỒNG
          ============================================================ */}
      {activeView === 'reviews' && (
        <div className="survey-editorial-grid">
          {/* CỘT TRÁI (1/3): TỔNG QUAN ĐIỂM SỐ & NÚT VIẾT ĐÁNH GIÁ */}
          <aside className="survey-overview-sidebar">
            <div className="gmaps-summary-card card">
              <div className="gmaps-score-col">
                <span className="big-rating-number">{avgRating}</span>
                <div className="stars-row gold-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      size={22} 
                      fill={parseFloat(avgRating) >= s ? "#F59E0B" : (parseFloat(avgRating) >= s - 0.5 ? "#F59E0B88" : "transparent")} 
                      color="#F59E0B" 
                    />
                  ))}
                </div>
                <span className="total-reviews-count">
                  Dựa trên {totalReviewsCount} lượt đánh giá thực tế từ cộng đồng
                </span>
              </div>

              {/* Cột Thanh Phân Bổ Sao Thời Gian Thực */}
              <div className="gmaps-breakdown-col">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="breakdown-row">
                    <span className="star-num">{s} sao</span>
                    <div className="bar-track">
                      <div 
                        className="bar-fill" 
                        style={{ 
                          width: `${starPercentages[s]}%`
                        }} 
                      />
                    </div>
                    <span className="bar-pct">{starPercentages[s]}% ({starCounts[s]})</span>
                  </div>
                ))}
              </div>

              {/* Nút Kêu Gọi Viết Đánh Giá */}
              <div className="gmaps-action-col">
                <button 
                  className="btn-write-review"
                  onClick={() => {
                    playChime(680, 'triangle', 0.12);
                    setIsAddingReview(prev => !prev);
                  }}
                >
                  <PlusCircle size={18} />
                  <span>{isAddingReview ? 'Đóng Biểu Mẫu' : 'Viết Đánh Giá Của Bạn'}</span>
                </button>
                <span className="action-hint">Đánh giá lưu ngay vào cơ sở dữ liệu trên web</span>
              </div>
            </div>
          </aside>

          {/* CỘT PHẢI (2/3): FORM NHẬP & BẢNG TIN NHẬN XÉT */}
          <section className="survey-feed-main">

          {/* Form Nhập Đánh Giá Mới (Ẩn/Hiện) */}
          <AnimatePresence>
            {isAddingReview && (
              <motion.div 
                className="add-review-card card"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="review-form-header">
                  <h4>Đánh Giá Trải Nghiệm Nền Tảng & Sử Quan AI</h4>
                  <span className="form-sub">Nhận xét của bạn sẽ được lưu và hiển thị công khai ngay lập tức</span>
                </div>

                <form onSubmit={handleSubmitReview} className="review-input-form">
                  {/* Chọn số sao trực quan */}
                  <div className="rating-select-group">
                    <label>Mức độ hài lòng của bạn:</label>
                    <div className="star-picker-interactive">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className="star-btn"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => {
                            playChime(500 + star * 60, 'sine', 0.1);
                            setNewRating(star);
                          }}
                        >
                          <Star 
                            size={28} 
                            fill={(hoverRating || newRating) >= star ? '#F4D06F' : 'transparent'} 
                            color={(hoverRating || newRating) >= star ? '#E5A93C' : '#6B7280'} 
                          />
                        </button>
                      ))}
                      <span className="rating-score-label">
                        {newRating === 5 ? 'Tuyệt vời (5/5)' : newRating === 4 ? 'Rất tốt (4/5)' : `${newRating}/5 sao`}
                      </span>
                    </div>
                  </div>

                  <div className="form-two-cols">
                    <div className="input-field">
                      <label>Họ và tên của bạn:</label>
                      <input 
                        type="text" 
                        placeholder="Ví dụ: Nguyễn Văn An"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Vai trò / Lớp:</label>
                      <input 
                        type="text" 
                        placeholder="Ví dụ: Học sinh 12A8 / Giáo viên"
                        value={newRole}
                        onChange={e => setNewRole(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-field">
                    <label>Nội dung nhận xét & cảm nghĩ về dự án:</label>
                    <textarea 
                      rows="3"
                      placeholder="Chia sẻ cảm nghĩ về giao diện, sa bàn chiến trận 3D, độ thông minh của Sử Quan AI..."
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      required
                    />
                  </div>

                  {reviewSubmitted && (
                    <div className="review-success-badge">
                      <CheckCircle size={18} /> Đã gửi và lưu thành công đánh giá của bạn!
                    </div>
                  )}

                  <div className="review-submit-row">
                    <button type="submit" className="btn btn-primary">
                      <Send size={15} />
                      <span>Đăng Đánh Giá Lên Bảng Tin</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Danh Sách Đánh Giá Cộng Đồng */}
          <div className="reviews-feed-container">
            <div className="feed-title-row">
              <div className="feed-title-left">
                <MessageSquare size={18} className="text-gold" />
                <h3>Ý Kiến Đóng Góp Từ Cộng Đồng ({reviews.length})</h3>
              </div>
              <div className="feed-actions-right">
                {isAdmin && (
                  <>
                    <button 
                      className="btn-admin-config-link" 
                      onClick={handleOpenConfig}
                      title="Cài đặt liên kết Google Form & Sheets"
                    >
                      <Settings size={14} />
                      <span>Cấu hình Link</span>
                    </button>
                    {reviews.length < DEFAULT_REVIEWS.length && (
                      <button 
                        className="btn-restore-samples" 
                        onClick={handleRestoreDefaultReviews}
                        title="Khôi phục lại 4 đánh giá mẫu ban đầu"
                      >
                        <RotateCcw size={14} />
                        <span>Khôi phục mẫu</span>
                      </button>
                    )}
                  </>
                )}
                <span className="feed-tag">Cập nhật thời gian thực</span>
              </div>
            </div>

            {/* Banner kết nối Bảng Tính Google Sheets chứa kết quả Google Form (CHỈ HIỂN THỊ KHI Ở CHẾ ĐỘ ADMIN) */}
            {isAdmin && (
              <div 
                className="google-sheet-sync-banner card" 
                onClick={() => {
                  playChime(600, 'sine', 0.1);
                  setActiveView('sheet');
                }} 
                style={{ 
                  cursor: 'pointer', 
                  marginBottom: '20px', 
                  padding: '14px 18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  border: '1px solid rgba(229, 169, 60, 0.35)', 
                  borderRadius: '8px', 
                  background: 'var(--bg-card)',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Table size={22} className="text-gold" />
                  <div>
                    <strong style={{ color: '#F4D06F', fontSize: '0.94rem' }}>Xem Kết Quả Đồng Bộ Từ Google Form (Quản Trị)</strong>
                    <p style={{ margin: '3px 0 0', color: '#9CA3AF', fontSize: '0.82rem' }}>Toàn bộ phiếu khảo sát của học sinh &amp; giáo viên được tự động lưu 100% sang Bảng tính Google Sheets.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    type="button"
                    className="btn btn-secondary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveView('sheet');
                    }}
                    style={{ padding: '7px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    <span>Xem Bảng Dữ Liệu</span> <ArrowRight size={14} />
                  </button>
                  <a 
                    href={sheetUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    onClick={(e) => e.stopPropagation()}
                    style={{ padding: '7px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', background: 'rgba(229, 169, 60, 0.18)', borderColor: 'var(--accent-gold)', color: 'var(--accent-gold-light)' }}
                  >
                    <span>Mở Google Sheets</span> <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

            <div className="reviews-grid">
              {reviews.filter(isAllowedReview).length === 0 ? (
                <div className="empty-reviews-card card" style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '48px 24px',
                  border: '1px dashed rgba(229, 169, 60, 0.3)',
                  borderRadius: '12px',
                  background: 'rgba(25, 23, 20, 0.4)'
                }}>
                  <Star size={36} className="text-gold" style={{ margin: '0 auto 12px', opacity: 0.6 }} />
                  <h4 style={{ color: '#F4D06F', margin: '0 0 8px', fontSize: '1.08rem' }}>Chưa Có Đánh Giá Nào</h4>
                  <p style={{ color: '#D1D5DB', margin: 0, fontSize: '0.88rem', maxWidth: '500px', marginInline: 'auto' }}>
                    Dữ liệu được làm sạch 100% để đồng bộ trực tiếp từ Google Sheets của bạn. Hãy bấm <strong>"Viết Đánh Giá Của Bạn"</strong> ở trên để gửi nhận xét đầu tiên nhé!
                  </p>
                </div>
              ) : (
                reviews.filter(isAllowedReview).map((rev) => (
                <div key={rev.id} className="review-card card">
                  <div className="review-card-top">
                    {/* Avatar tròn với ký tự viết tắt */}
                    <div className="reviewer-avatar">
                      {rev.name.split(' ').map(n => n[0]).slice(-2).join('')}
                    </div>

                    <div className="reviewer-meta">
                      <strong className="reviewer-name">{rev.name}</strong>
                      <div className="reviewer-role-row">
                        <span className={`badge-role ${rev.badge === 'Giáo viên' ? 'teacher' : 'student'}`}>
                          {rev.role}
                        </span>
                        <span className="review-date-dot">•</span>
                        <span className="review-date">{rev.date}</span>
                      </div>
                    </div>

                    {/* Dãy sao vàng */}
                    <div className="review-stars-badge">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                  </div>

                  <p className="review-comment-text">{rev.comment}</p>

                  <div className="review-card-footer">
                    <button 
                      className={`btn-like-review ${rev.liked ? 'active' : ''}`}
                      onClick={() => handleToggleLike(rev.id)}
                    >
                      <ThumbsUp size={14} />
                      <span>Hữu ích ({rev.likes})</span>
                    </button>

                    {isAdmin && (
                      <button 
                        className="btn-delete-review"
                        onClick={() => handleDeleteReview(rev.id)}
                        title="Xóa đánh giá này (Dành riêng cho Quản trị viên)"
                      >
                        <Trash2 size={13} />
                        <span>Xóa</span>
                      </button>
                    )}
                  </div>
                </div>
              )))}
            </div>
          </div>
        </section>
      </div>
    )}

      {/* ============================================================
          VIEW 2: BIỂU MẪU KHẢO SÁT CHI TIẾT (GOOGLE FORM)
          ============================================================ */}
      {activeView === 'form' && (
        <div className="form-view-section">
          <div className="survey-embed-container card">
            <div className="form-embed-wrapper">
              <div className="embed-header-bar">
                <div className="embed-info">
                  <strong>Biểu Mẫu Khảo Sát Trực Tuyến</strong>
                </div>
                <div className="embed-actions-row">
                  <a 
                    href={formUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="open-ext-link-btn"
                  >
                    <span>Mở Google Form (Tab Mới)</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="survey-device-bezel">
                <iframe 
                  key={formUrl}
                  src={formUrl} 
                  title="Khảo sát Google Form"
                  width="100%" 
                  height="650" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  className="survey-inner-frame"
                >
                  Đang tải biểu mẫu khảo sát Google Form...
                </iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          VIEW 3: BẢNG TÍNH EXCEL ĐỒNG BỘ (GOOGLE SHEETS)
          ============================================================ */}
      {activeView === 'sheet' && (
        <div className="sheet-view-section">
          {/* Sub Navigation: Chọn chế độ xem Sổ Dữ Liệu hoặc Nhúng Trực Tiếp */}
          <div className="sheet-subnav-bar">
            <button 
              className={`sheet-subnav-btn ${sheetSubView === 'table' ? 'active' : ''}`}
              onClick={() => setSheetSubView('table')}
            >
              <Table size={15} />
              <span>Sổ Dữ Liệu Đồng Bộ ({reviews.length} phiếu)</span>
            </button>
            <button 
              className={`sheet-subnav-btn ${sheetSubView === 'embed' ? 'active' : ''}`}
              onClick={() => setSheetSubView('embed')}
            >
              <ExternalLink size={15} />
              <span>Nhúng Trực Tiếp Google Sheets</span>
            </button>
          </div>

          <div className="survey-embed-container card">
            <div className="sheet-embed-wrapper">
              <div className="embed-header-bar">
                <div className="embed-info" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <strong style={{ fontSize: '0.98rem', color: '#F4D06F', letterSpacing: '0.3px' }}>
                    {sheetSubView === 'table' ? 'Bảng Dữ Liệu Khảo Sát Thời Gian Thực' : 'Bảng Tính Google Sheets Trực Tiếp'}
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
                    {sheetSubView === 'table' ? 'Đối chiếu kết quả đóng góp của học sinh & giáo viên' : 'Nhúng trực tiếp từ file Google Sheets của tác giả'}
                  </span>
                </div>
                <div className="embed-actions-row">
                  {isAdmin && (
                    <button 
                      className="open-ext-link-btn" 
                      onClick={handleOpenConfig}
                      style={{ marginRight: '8px' }}
                    >
                      <Settings size={14} />
                      <span>Cấu hình (Admin)</span>
                    </button>
                  )}
                  <a 
                    href={sheetUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="open-ext-link-btn"
                  >
                    <span>Mở Google Sheets (Tab Mới)</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {sheetSubView === 'table' ? (
                /* Bảng dữ liệu trực quan phong cách sổ sách di sản */
                <div className="live-sheet-table-wrapper">
                  <table className="heritage-sheet-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Dấu Thời Gian</th>
                        <th>Họ Và Tên</th>
                        <th>Lớp / Đơn Vị</th>
                        <th>Đánh Giá</th>
                        <th>Nội Dung Ý Kiến</th>
                        <th>Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((rev, idx) => (
                        <tr key={rev.id}>
                          <td><strong>{idx + 1}</strong></td>
                          <td className="col-date">{rev.date}</td>
                          <td className="col-name"><strong>{rev.name}</strong></td>
                          <td className="col-role"><span className="table-role-pill">{rev.role}</span></td>
                          <td className="col-rating">
                            <span className="table-star-chip">
                              <Star size={12} fill="#C5A059" color="#C5A059" />
                              <span>{rev.rating}/5</span>
                            </span>
                          </td>
                          <td className="col-comment">{rev.comment}</td>
                          <td className="col-status">
                            <span className="synced-status-tag">
                              <CheckCircle size={12} /> Đã đồng bộ
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="table-summary-footer">
                    <span>Tổng cộng: <strong>{reviews.length} phiếu khảo sát</strong></span>
                    <span>Đánh giá trung bình: <strong>{avgRating}/5 sao</strong></span>
                  </div>
                </div>
              ) : (
                /* Khung nhúng Google Sheets Iframe với /preview */
                <div className="survey-device-bezel">
                  <iframe 
                    key={sheetUrl}
                    src={getEmbedSheetUrl(sheetUrl)} 
                    title="Google Sheets Kết quả khảo sát"
                    width="100%" 
                    height="650" 
                    frameBorder="0" 
                    className="survey-inner-frame"
                  >
                    Đang tải bảng tính Google Sheets...
                  </iframe>
                  <div className="embed-helper-footer">
                    <span>Nếu khung hiển thị báo quyền truy cập, bạn có thể bấm nút <strong>"Mở Google Sheets (Tab Mới)"</strong> ở trên để xem trực tiếp hoặc chuyển sang tab <strong>"Sổ Dữ Liệu Đồng Bộ Trực Tiếp"</strong>.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
