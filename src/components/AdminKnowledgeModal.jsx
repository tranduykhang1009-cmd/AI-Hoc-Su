import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  RotateCcw, 
  CheckCircle, 
  X, 
  Lock, 
  BookOpen, 
  Upload,
  FileText,
  AlertCircle,
  RefreshCw,
  Cloud,
  ExternalLink,
  Key,
  Table,
  Image as ImageIcon,
  LogOut,
  Info,
  Check,
  Star,
  Settings,
  Link as LinkIcon
} from 'lucide-react';
import { 
  getKnowledgeBase, 
  addKnowledgeItem, 
  deleteKnowledgeItem, 
  resetKnowledgeBase,
  saveKnowledgeBase,
  fetchCloudKnowledgeBase,
  DEFAULT_GOOGLE_DOC_URL,
  saveGeminiApiKey
} from '../services/geminiService';
import { 
  DEFAULT_SURVEY_FORM_URL,
  DEFAULT_SURVEY_SHEET_URL,
  DEFAULT_SURVEY_WEBHOOK_URL,
  getSurveyWebhookUrl,
  saveSurveyWebhookUrl,
  fetchReviewsFromCloud
} from '../services/surveySyncService';
import { MUSEUM_ITEMS } from '../data/museumData';
import { getAllImages, saveImage, deleteImage } from '../utils/museumImageStore';
import { playChime, playCorrectSound, playVictorySound, playWrongSound } from '../utils/audio';
import { useAdmin } from '../context/AdminContext';
import mammoth from 'mammoth';

const STORAGE_FORM_URL = 'su_survey_google_form_url';
const STORAGE_SHEET_URL = 'su_survey_google_sheet_url';
const STORAGE_REVIEWS_KEY = 'su_community_reviews_v2';

export default function AdminKnowledgeModal({ isOpen, onClose }) {
  const { 
    isAdmin, 
    isAdminModalOpen, 
    closeAdmin, 
    adminActiveTab, 
    setAdminActiveTab, 
    loginAdmin, 
    logoutAdmin 
  } = useAdmin();

  // Xác định trạng thái mở/đóng dựa trên props hoặc Context
  const isModalOpen = isOpen !== undefined ? isOpen : isAdminModalOpen;
  const handleClose = () => {
    if (onClose) onClose();
    closeAdmin();
  };

  // State xác thực PIN
  const [passcode, setPasscode] = useState('');
  const [pinErrorMsg, setPinErrorMsg] = useState('');

  // Tab đang hoạt động
  const activeTab = adminActiveTab || 'survey';
  const setActiveTab = (t) => setAdminActiveTab(t);

  // ==========================================================
  // TAB 1: KHẢO SÁT & GOOGLE SHEETS
  // ==========================================================
  const [surveyFormUrl, setSurveyFormUrl] = useState(() => localStorage.getItem(STORAGE_FORM_URL) || DEFAULT_SURVEY_FORM_URL);
  const [surveySheetUrl, setSurveySheetUrl] = useState(() => localStorage.getItem(STORAGE_SHEET_URL) || DEFAULT_SURVEY_SHEET_URL);
  const [surveyWebhookUrl, setSurveyWebhookUrl] = useState(() => getSurveyWebhookUrl());
  const [surveySaveSuccess, setSurveySaveSuccess] = useState(false);
  const [isSyncingSurvey, setIsSyncingSurvey] = useState(false);
  const [surveySyncMsg, setSurveySyncMsg] = useState('');
  const [surveyReviews, setSurveyReviews] = useState([]);

  // Load reviews từ localStorage
  const loadReviewsFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_REVIEWS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSurveyReviews(parsed);
          return;
        }
      }
    } catch (e) {}
    setSurveyReviews([]);
  };

  useEffect(() => {
    if (isModalOpen) {
      setSurveyFormUrl(localStorage.getItem(STORAGE_FORM_URL) || DEFAULT_SURVEY_FORM_URL);
      setSurveySheetUrl(localStorage.getItem(STORAGE_SHEET_URL) || DEFAULT_SURVEY_SHEET_URL);
      setSurveyWebhookUrl(getSurveyWebhookUrl());
      loadReviewsFromStorage();
    }
  }, [isModalOpen]);

  const handleSaveSurveyConfig = (e) => {
    e?.preventDefault();
    const finalForm = surveyFormUrl.trim() || DEFAULT_SURVEY_FORM_URL;
    const finalSheet = surveySheetUrl.trim() || DEFAULT_SURVEY_SHEET_URL;
    const finalWebhook = surveyWebhookUrl.trim();

    try {
      localStorage.setItem(STORAGE_FORM_URL, finalForm);
      localStorage.setItem(STORAGE_SHEET_URL, finalSheet);
      saveSurveyWebhookUrl(finalWebhook);
      window.dispatchEvent(new Event('su_config_updated'));
      playCorrectSound();
      setSurveySaveSuccess(true);
      setTimeout(() => setSurveySaveSuccess(false), 3000);
    } catch (err) {
      alert('Không thể lưu cấu hình: ' + err.message);
    }
  };

  const handleSyncSurveyNow = async () => {
    setIsSyncingSurvey(true);
    setSurveySyncMsg('Đang kiểm tra và kéo dữ liệu từ Google Sheets...');
    playChime(550, 'sine', 0.1);
    try {
      const cloudData = await fetchReviewsFromCloud(surveySheetUrl, surveyWebhookUrl);
      if (cloudData && Array.isArray(cloudData)) {
        setSurveyReviews(cloudData);
        localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(cloudData));
        window.dispatchEvent(new Event('su_config_updated'));
        setSurveySyncMsg(`Đã đồng bộ thành công ${cloudData.length} đánh giá từ Google Sheets!`);
        playVictorySound();
      } else {
        setSurveySyncMsg('Dữ liệu từ Google Sheets đã là mới nhất.');
      }
    } catch (e) {
      setSurveySyncMsg('Lỗi khi kéo dữ liệu từ Google Sheets.');
    } finally {
      setIsSyncingSurvey(false);
      setTimeout(() => setSurveySyncMsg(''), 4000);
    }
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đánh giá này khỏi danh sách?')) {
      const filtered = surveyReviews.filter(r => r.id !== id);
      setSurveyReviews(filtered);
      localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event('su_config_updated'));
      playChime(400, 'sine', 0.1);
    }
  };

  const handleClearMockReviews = () => {
    if (window.confirm('Làm sạch toàn bộ đánh giá thử nghiệm và chỉ tải lại từ Google Sheets thật?')) {
      localStorage.removeItem(STORAGE_REVIEWS_KEY);
      handleSyncSurveyNow();
    }
  };

  // ==========================================================
  // TAB 2: TRI THỨC RAG & GEMINI AI
  // ==========================================================
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Chiến dịch & Nhân vật');
  const [source, setSource] = useState('');
  const [content, setContent] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [ragErrorMsg, setRagErrorMsg] = useState('');
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiKeySavedMsg, setApiKeySavedMsg] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      setKnowledgeList(getKnowledgeBase());
      const currentKey = localStorage.getItem('su_gemini_api_key') || '';
      setApiKeyInput(currentKey);
    }
  }, [isModalOpen]);

  const handleSaveApiKey = (e) => {
    e?.preventDefault();
    saveGeminiApiKey(apiKeyInput);
    setApiKeySavedMsg('Đã lưu Gemini API Key thành công!');
    playCorrectSound();
    setTimeout(() => setApiKeySavedMsg(''), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    setUploadedFileName(fileName);

    if (fileName.toLowerCase().endsWith('.docx')) {
      const docxReader = new FileReader();
      docxReader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          const text = result.value || '';
          if (!text.trim()) {
            alert('File Word không có nội dung văn bản.');
            return;
          }
          const defaultTitle = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setTitle(defaultTitle.charAt(0).toUpperCase() + defaultTitle.slice(1));
          setContent(text.trim());
          setSource(`Tài liệu Word: ${fileName} (Lê Trường Thịnh phê duyệt)`);
          setSuccessMsg(`Đã trích xuất thành công nội dung từ file Word "${fileName}"!`);
          playCorrectSound();
          setTimeout(() => setSuccessMsg(''), 4000);
        } catch (err) {
          alert('Không thể đọc file Word: ' + err.message);
        }
      };
      docxReader.readAsArrayBuffer(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileText = event.target?.result;
      if (typeof fileText !== 'string') return;

      if (fileName.endsWith('.json')) {
        try {
          const parsed = JSON.parse(fileText);
          if (Array.isArray(parsed)) {
            const currentKb = getKnowledgeBase();
            const formatted = parsed.map((item, idx) => ({
              id: 'kb-' + Date.now() + '-' + idx,
              title: item.title || `Tư liệu ${idx + 1}`,
              category: item.category || 'Tư liệu bổ sung',
              authorApproved: 'Lê Trường Thịnh (12A8 - Trường THCS và THPT Nguyễn Huệ)',
              source: item.source || fileName,
              content: item.content || ''
            }));
            const combined = [...formatted, ...currentKb];
            saveKnowledgeBase(combined);
            setKnowledgeList(combined);
            setSuccessMsg(`Đã nhập thành công ${formatted.length} mục từ file ${fileName}!`);
            playCorrectSound();
            setTimeout(() => setSuccessMsg(''), 4000);
            return;
          }
        } catch (err) {
          alert('File JSON không đúng định dạng mảng tài liệu.');
          return;
        }
      }

      const defaultTitle = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(defaultTitle.charAt(0).toUpperCase() + defaultTitle.slice(1));
      setContent(fileText.trim());
      setSource(`Tệp đính kèm: ${fileName} (Lê Trường Thịnh)`);
      setSuccessMsg(`Đã đọc nội dung file "${fileName}". Bạn hãy kiểm tra lại và nhấn "Lưu vào kho tư liệu"!`);
      playCorrectSound();
      setTimeout(() => setSuccessMsg(''), 4000);
    };

    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung sử liệu.');
      return;
    }

    addKnowledgeItem({
      title: title.trim(),
      category: category,
      source: source.trim() || 'Tư liệu khảo cứu (Lê Trường Thịnh phê duyệt)',
      content: content.trim()
    });

    setKnowledgeList(getKnowledgeBase());
    setTitle('');
    setSource('');
    setContent('');
    setUploadedFileName('');
    setSuccessMsg('Đã lưu thành công tư liệu mới vào hệ thống RAG!');
    playCorrectSound();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteKnowledge = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài liệu này khỏi kho?')) {
      const updated = deleteKnowledgeItem(id);
      setKnowledgeList(updated);
      playChime(400, 'sine', 0.1);
    }
  };

  const handleResetKnowledge = () => {
    if (window.confirm('Khôi phục lại kho tư liệu sử học chuẩn ban đầu?')) {
      const reseted = resetKnowledgeBase();
      setKnowledgeList(reseted);
      playChime(600, 'triangle', 0.2);
    }
  };

  const handleManualSyncCloud = async () => {
    setIsSyncingCloud(true);
    playChime(550, 'sine', 0.1);
    try {
      const updated = await fetchCloudKnowledgeBase();
      if (updated && updated.length > 0) {
        setKnowledgeList(updated);
        playVictorySound();
        setSuccessMsg('Đã đồng bộ thành công kho tri thức từ Google Docs!');
      } else {
        setSuccessMsg('Đã kết nối Google Docs. Dữ liệu hiện đã đồng bộ!');
      }
    } catch (e) {
      setRagErrorMsg('Chưa thể đồng bộ: Vui lòng kiểm tra quyền truy cập Google Docs.');
    } finally {
      setIsSyncingCloud(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // ==========================================================
  // TAB 3: BẢO TÀNG HIỆN VẬT
  // ==========================================================
  const [customMuseumImages, setCustomMuseumImages] = useState({});
  const [museumUrlInputs, setMuseumUrlInputs] = useState({});

  useEffect(() => {
    if (isModalOpen && activeTab === 'museum') {
      getAllImages().then(imgs => setCustomMuseumImages(imgs || {}));
    }
  }, [isModalOpen, activeTab]);

  const handleMuseumUpload = (e, itemId) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh phải nhỏ hơn 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result;
      if (base64) {
        await saveImage(itemId, base64);
        setCustomMuseumImages(prev => ({ ...prev, [itemId]: base64 }));
        playCorrectSound();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMuseumUrlSave = async (itemId) => {
    const url = (museumUrlInputs[itemId] || '').trim();
    if (!url) return;
    await saveImage(itemId, url);
    setCustomMuseumImages(prev => ({ ...prev, [itemId]: url }));
    setMuseumUrlInputs(prev => ({ ...prev, [itemId]: '' }));
    playCorrectSound();
  };

  const handleResetMuseumImage = async (itemId) => {
    if (window.confirm('Khôi phục lại ảnh mặc định của hiện vật này?')) {
      await deleteImage(itemId);
      setCustomMuseumImages(prev => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
      playChime(400, 'sine', 0.1);
    }
  };

  // ==========================================================
  // XỬ LÝ ĐĂNG NHẬP ADMIN PIN
  // ==========================================================
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(passcode)) {
      playCorrectSound();
      setPasscode('');
      setPinErrorMsg('');
    } else {
      playWrongSound();
      setPinErrorMsg('Mã PIN không chính xác. Vui lòng thử lại!');
      setTimeout(() => setPinErrorMsg(''), 3000);
    }
  };

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={handleClose}>
        <motion.div 
          className="admin-modal-card card"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          style={{ maxWidth: '980px', width: '96%', maxHeight: '90vh' }}
        >
          {/* Header Quản Trị Hệ Thống */}
          <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(229, 169, 60, 0.25)' }}>
            <div className="header-badge-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(229, 169, 60, 0.15)', border: '1px solid #E5A93C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} style={{ color: '#F4D06F' }} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#F4D06F', fontFamily: 'var(--font-display)', letterSpacing: '0.3px' }}>
                  Trung Tâm Quản Trị Hệ Thống
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                  Tác giả: <strong>Lê Trường Thịnh</strong> (12A8 - Trường THCS và THPT Nguyễn Huệ)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isAdmin && (
                <button 
                  type="button" 
                  onClick={() => {
                    logoutAdmin();
                    playChime(400, 'sine', 0.1);
                  }}
                  className="btn btn-secondary"
                  title="Thoát chế độ Admin để kiểm tra giao diện học sinh thông thường"
                  style={{ fontSize: '0.78rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '5px', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <LogOut size={13} />
                  <span>Thoát Admin</span>
                </button>
              )}
              <button 
                type="button" 
                className="close-btn" 
                onClick={handleClose}
                aria-label="Đóng cửa sổ"
                style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="admin-modal-body" style={{ padding: '20px 24px', overflowY: 'auto' }}>
            {!isAdmin ? (
              // Màn hình xác thực PIN bảo mật
              <div className="admin-login-box" style={{ maxWidth: '420px', margin: '40px auto', textAlign: 'center' }}>
                <div className="lock-icon-wrapper" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(229, 169, 60, 0.12)', border: '1px solid #E5A93C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Lock size={30} style={{ color: '#F4D06F' }} />
                </div>
                <h4 style={{ color: '#F4D06F', fontSize: '1.2rem', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
                  Xác Thực Quyền Tác Giả
                </h4>
                <p style={{ color: '#9CA3AF', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '20px' }}>
                  Dành riêng cho tác giả (Lê Trường Thịnh) cấu hình Google Form, Google Sheets, kho tri thức AI và quản trị toàn bộ hệ thống.
                </p>

                <form onSubmit={handlePinSubmit}>
                  <div className="pin-input-group" style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input 
                      type="password"
                      placeholder="Nhập mã PIN bí mật (vd: 1789)..."
                      value={passcode}
                      onChange={e => setPasscode(e.target.value)}
                      autoFocus
                      maxLength={12}
                      style={{ flex: 1, padding: '10px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(229, 169, 60, 0.35)', borderRadius: '8px', color: '#fff', fontSize: '0.95rem' }}
                    />
                    <button 
                      type="submit" 
                      className="login-btn"
                      style={{ padding: '10px 18px', background: 'var(--accent-gold)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Mở Khóa
                    </button>
                  </div>
                  {pinErrorMsg && <div style={{ color: '#EF4444', fontSize: '0.82rem', marginTop: '6px' }}>{pinErrorMsg}</div>}
                </form>
              </div>
            ) : (
              // BẢNG ĐIỀU KHIỂN QUẢN TRỊ TOÀN DIỆN (FULL ADMIN CONTROL CENTER)
              <div>
                {/* Thanh điều hướng 4 Tab Quản Trị */}
                <div className="admin-nav-tabs" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(229, 169, 60, 0.2)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className={`sheet-subnav-btn ${activeTab === 'survey' ? 'active' : ''}`}
                    onClick={() => setActiveTab('survey')}
                  >
                    <Table size={15} />
                    <span>Khảo Sát &amp; Google Sheets</span>
                  </button>
                  <button 
                    type="button" 
                    className={`sheet-subnav-btn ${activeTab === 'ai' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ai')}
                  >
                    <BookOpen size={15} />
                    <span>Kho Tri Thức AI &amp; RAG</span>
                  </button>
                  <button 
                    type="button" 
                    className={`sheet-subnav-btn ${activeTab === 'museum' ? 'active' : ''}`}
                    onClick={() => setActiveTab('museum')}
                  >
                    <ImageIcon size={15} />
                    <span>Bảo Tàng Hiện Vật</span>
                  </button>
                  <button 
                    type="button" 
                    className={`sheet-subnav-btn ${activeTab === 'system' ? 'active' : ''}`}
                    onClick={() => setActiveTab('system')}
                  >
                    <Settings size={15} />
                    <span>Thông Tin &amp; Hệ Thống</span>
                  </button>
                </div>

                {/* ======================================================== */}
                {/* TAB 1: KHẢO SÁT, GOOGLE FORM & GOOGLE SHEETS            */}
                {/* ======================================================== */}
                {activeTab === 'survey' && (
                  <div className="admin-tab-pane">
                    {/* Hàng nút tác vụ nhanh */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <a 
                        href={surveySheetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(229, 169, 60, 0.15)', borderColor: '#E5A93C', color: '#F4D06F', textDecoration: 'none' }}
                      >
                        <Table size={15} />
                        <span>Mở Google Sheets (Tác Giả)</span>
                        <ExternalLink size={13} />
                      </a>

                      <a 
                        href={surveyFormUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                      >
                        <FileText size={15} />
                        <span>Mở Google Form Khảo Sát</span>
                        <ExternalLink size={13} />
                      </a>

                      <button 
                        type="button"
                        onClick={handleSyncSurveyNow}
                        disabled={isSyncingSurvey}
                        className="btn btn-secondary"
                        style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <RefreshCw size={14} className={isSyncingSurvey ? 'animate-spin' : ''} />
                        <span>{isSyncingSurvey ? 'Đang kéo...' : 'Đồng bộ từ Google Sheets'}</span>
                      </button>

                      <button 
                        type="button"
                        onClick={handleClearMockReviews}
                        className="btn btn-secondary"
                        style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#FCA5A5' }}
                        title="Xóa cache đánh giá trên máy và chỉ tải dữ liệu chuẩn từ Google Sheets"
                      >
                        <Trash2 size={14} />
                        <span>Làm sạch dữ liệu thử nghiệm</span>
                      </button>
                    </div>

                    {surveySyncMsg && (
                      <div style={{ marginBottom: '16px', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '8px', color: '#34D399', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={15} />
                        <span>{surveySyncMsg}</span>
                      </div>
                    )}

                    {/* Form Cấu Hình 3 URL */}
                    <div className="card" style={{ padding: '18px', background: 'var(--bg-card)', border: '1px solid rgba(229, 169, 60, 0.25)', borderRadius: '10px', marginBottom: '22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <LinkIcon size={17} style={{ color: '#F4D06F' }} />
                        <strong style={{ color: '#F4D06F', fontSize: '0.98rem' }}>Cài Đặt Đường Link Khảo Sát &amp; Cơ Sở Dữ Liệu</strong>
                      </div>

                      <form onSubmit={handleSaveSurveyConfig}>
                        <div style={{ marginBottom: '14px' }}>
                          <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '5px' }}>
                            1. Link Google Form (Để học sinh &amp; giáo viên gửi khảo sát):
                          </label>
                          <input 
                            type="url"
                            value={surveyFormUrl}
                            onChange={e => setSurveyFormUrl(e.target.value)}
                            placeholder="https://docs.google.com/forms/d/e/.../viewform"
                            style={{ width: '100%', padding: '9px 12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '0.88rem' }}
                          />
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                          <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '5px' }}>
                            2. Link Google Sheets (File bảng tính chứa kết quả đồng bộ của tác giả):
                          </label>
                          <input 
                            type="url"
                            value={surveySheetUrl}
                            onChange={e => setSurveySheetUrl(e.target.value)}
                            placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                            style={{ width: '100%', padding: '9px 12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '0.88rem' }}
                          />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ display: 'block', fontSize: '0.84rem', color: '#D1D5DB', marginBottom: '5px' }}>
                            3. Link Google Apps Script Webhook (Để nhận đánh giá trực tiếp từ web theo thời gian thực):
                          </label>
                          <input 
                            type="url"
                            value={surveyWebhookUrl}
                            onChange={e => setSurveyWebhookUrl(e.target.value)}
                            placeholder="https://script.google.com/macros/s/.../exec"
                            style={{ width: '100%', padding: '9px 12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '0.88rem' }}
                          />
                          <small style={{ color: '#9CA3AF', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>
                            Dữ liệu khi người dùng gửi đánh giá trên website sẽ được Webhook đẩy thẳng 100% vào Google Sheets mà không cần qua bên thứ ba.
                          </small>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button 
                            type="submit"
                            style={{ padding: '9px 20px', background: 'var(--accent-gold)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem' }}
                          >
                            Lưu Cấu Hình
                          </button>
                          {surveySaveSuccess && (
                            <span style={{ color: '#34D399', fontSize: '0.84rem' }}>✓ Đã lưu cấu hình và đồng bộ toàn hệ thống!</span>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Danh Sách Đánh Giá Đã Đồng Bộ */}
                    <div className="card" style={{ padding: '18px', background: 'var(--bg-card)', border: '1px solid rgba(229, 169, 60, 0.25)', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <strong style={{ color: '#F4D06F', fontSize: '0.98rem' }}>
                          Quản Lý Đánh Giá Trên Website ({surveyReviews.length} phiếu)
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
                          Xóa đánh giá spam hoặc không phù hợp tại đây
                        </span>
                      </div>

                      {surveyReviews.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '24px', color: '#9CA3AF', fontSize: '0.88rem' }}>
                          Chưa có dữ liệu đánh giá nào được tải. Hãy bấm "Đồng bộ từ Google Sheets" ở trên!
                        </div>
                      ) : (
                        <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {surveyReviews.map(r => (
                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <strong style={{ color: '#F4D06F', fontSize: '0.88rem' }}>{r.name}</strong>
                                  <span style={{ fontSize: '0.76rem', color: '#9CA3AF' }}>({r.role || 'Học sinh'})</span>
                                  <div style={{ display: 'flex', gap: '2px', color: '#F59E0B' }}>
                                    {[...Array(r.rating || 5)].map((_, i) => (
                                      <Star key={i} size={11} fill="currentColor" />
                                    ))}
                                  </div>
                                </div>
                                <p style={{ margin: '4px 0 0', color: '#E5E7EB', fontSize: '0.82rem' }}>
                                  "{r.comment}"
                                </p>
                              </div>
                              <button 
                                type="button"
                                onClick={() => handleDeleteReview(r.id)}
                                title="Xóa đánh giá này"
                                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '6px' }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* TAB 2: TRI THỨC RAG & GEMINI AI                         */}
                {/* ======================================================== */}
                {activeTab === 'ai' && (
                  <div className="admin-content-layout">
                    {/* Cột trái: Thêm tài liệu & Gemini API Key */}
                    <div className="admin-add-col">
                      <div className="upload-file-card" style={{ marginBottom: '14px', border: '1px solid rgba(218, 165, 32, 0.45)', background: 'rgba(218, 165, 32, 0.05)' }}>
                        <div className="upload-header">
                          <Key size={18} className="upload-icon text-gold" />
                          <strong>Cấu Hình Gemini API Key (Không Giới Hạn)</strong>
                        </div>
                        <p className="upload-desc" style={{ marginBottom: '10px' }}>
                          Nhập mã API Key từ Google AI Studio (bắt đầu bằng <code>AIzaSy...</code>) để kết nối trực tiếp với Sử Quan AI:
                        </p>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input 
                            type="password"
                            placeholder="Dán mã Gemini API Key..."
                            value={apiKeyInput}
                            onChange={e => setApiKeyInput(e.target.value)}
                            style={{ flex: 1, padding: '8px 12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,215,0,0.35)', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                          />
                          <button 
                            type="button" 
                            onClick={handleSaveApiKey}
                            className="btn-select-file"
                            style={{ width: 'auto', padding: '8px 16px', background: 'var(--gold-primary)', color: '#000', fontWeight: 'bold' }}
                          >
                            Lưu Key
                          </button>
                        </div>
                        {apiKeySavedMsg && <div style={{ color: '#10b981', fontSize: '12px', marginTop: '6px' }}>✓ {apiKeySavedMsg}</div>}
                        <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}>
                          Chưa có Key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>Lấy mã miễn phí tại Google AI Studio ↗</a>
                        </div>
                      </div>

                      {/* Upload File */}
                      <div className="upload-file-card">
                        <div className="upload-header">
                          <Upload size={18} className="upload-icon" />
                          <strong>Tải File Word (.docx), Văn Bản (.txt) hoặc Dữ Liệu (.json)</strong>
                        </div>
                        <p className="upload-desc">
                          Tự động trích xuất nội dung văn bản để nạp vào kho tri thức RAG của Sử Quan AI.
                        </p>

                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileUpload} 
                          accept=".docx,.txt,.md,.json" 
                          style={{ display: 'none' }} 
                        />

                        <button 
                          type="button" 
                          className="btn-select-file"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FileText size={16} />
                          <span>{uploadedFileName ? `Đã chọn: ${uploadedFileName}` : 'Chọn file Word (.docx) hoặc Text (.txt, .md)'}</span>
                        </button>
                      </div>

                      <div className="divider-or">
                        <span>HOẶC NHẬP THỦ CÔNG</span>
                      </div>

                      <form onSubmit={handleAdd} className="add-kb-form">
                        <div className="form-group">
                          <label>Tiêu đề sử liệu:</label>
                          <input 
                            type="text" 
                            placeholder="Vd: Chi tiết chiến thuật nghi binh tại Hà Hồi..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>Phân loại chủ đề:</label>
                          <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Chiến dịch & Nhân vật">Chiến dịch &amp; Nhân vật</option>
                            <option value="Nghệ thuật quân sự">Nghệ thuật quân sự</option>
                            <option value="Văn hóa & Chính sách">Văn hóa &amp; Chính sách</option>
                            <option value="Hành quân & Hậu cần">Hành quân &amp; Hậu cần</option>
                            <option value="Tư liệu bổ sung">Tư liệu bổ sung</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Nguồn trích dẫn:</label>
                          <input 
                            type="text" 
                            placeholder="Vd: Đại Nam Thực Lục, Hoàng Lê Nhất Thống Chí..."
                            value={source}
                            onChange={e => setSource(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>Nội dung chi tiết (AI sẽ ưu tiên 100% phần này):</label>
                          <textarea 
                            rows="5"
                            placeholder="Nhập nội dung tư liệu sử học hoặc nội dung đã đọc từ file..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                          />
                        </div>

                        {successMsg && (
                          <div className="add-success-banner">
                            <CheckCircle size={16} /> {successMsg}
                          </div>
                        )}

                        <button type="submit" className="submit-kb-btn">
                          <Plus size={18} /> Lưu Vào Kho Tư Liệu
                        </button>
                      </form>
                    </div>

                    {/* Cột phải: Danh mục tài liệu đã nạp */}
                    <div className="admin-list-col">
                      <div className="list-col-header">
                        <div>
                          <h4>Kho Sử Liệu Đã Nạp ({knowledgeList.length} tài liệu)</h4>
                          <div className="cloud-sync-status-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <Cloud size={13} className="text-emerald" />
                            <span>Google Docs: <strong>Tự động đồng bộ</strong></span>
                            <a 
                              href={DEFAULT_GOOGLE_DOC_URL} 
                              target="_blank" 
                              rel="noreferrer"
                              className="gdoc-external-link"
                              style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '3px', textDecoration: 'underline', fontSize: '11px', fontWeight: '500' }}
                            >
                              <span>Mở Docs</span>
                              <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>
                        <div className="list-header-actions">
                          <button 
                            className={`sync-cloud-btn ${isSyncingCloud ? 'loading' : ''}`} 
                            onClick={handleManualSyncCloud} 
                            disabled={isSyncingCloud}
                          >
                            <RefreshCw size={13} className={isSyncingCloud ? 'spin-icon' : ''} />
                            <span>{isSyncingCloud ? 'Đang kéo...' : 'Đồng bộ'}</span>
                          </button>
                          <button className="reset-kb-btn" onClick={handleResetKnowledge} title="Khôi phục mặc định">
                            <RotateCcw size={13} /> Khôi phục
                          </button>
                        </div>
                      </div>

                      <div className="knowledge-cards-scroll">
                        {knowledgeList.map((item) => (
                          <div key={item.id} className="admin-doc-card">
                            <div className="doc-card-header">
                              <span className="doc-cat-tag">{item.category}</span>
                              <button 
                                className="del-doc-btn" 
                                onClick={() => handleDeleteKnowledge(item.id)}
                                title="Xóa tài liệu này"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <h5 className="doc-title">{item.title}</h5>
                            <p className="doc-excerpt">{item.content.slice(0, 150)}...</p>
                            <div className="doc-source-footer">
                              <span>Nguồn: {item.source}</span>
                              <span>Kiểm duyệt: {item.authorApproved}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* TAB 3: BẢO TÀNG HIỆN VẬT                                */}
                {/* ======================================================== */}
                {activeTab === 'museum' && (
                  <div className="admin-tab-pane">
                    <p style={{ color: '#9CA3AF', fontSize: '0.86rem', marginBottom: '16px' }}>
                      Cập nhật hình ảnh cho 10 hiện vật lịch sử Tây Sơn. Ảnh được lưu trữ an toàn trong IndexedDB của trình duyệt.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                      {MUSEUM_ITEMS.map(item => {
                        const currentImg = customMuseumImages[item.id] || item.img;
                        const isCustom = !!customMuseumImages[item.id];
                        return (
                          <div key={item.id} className="card" style={{ padding: '14px', background: 'var(--bg-card)', border: '1px solid rgba(229, 169, 60, 0.25)', borderRadius: '8px' }}>
                            <div style={{ width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden', marginBottom: '10px', background: '#000' }}>
                              <img src={currentImg} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <strong style={{ color: '#F4D06F', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                              {item.title}
                            </strong>
                            <span style={{ color: '#9CA3AF', fontSize: '0.78rem', display: 'block', marginBottom: '10px' }}>
                              {item.category} {isCustom && <span style={{ color: '#34D399' }}>· (Đã đổi ảnh riêng)</span>}
                            </span>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(229, 169, 60, 0.15)', border: '1px solid rgba(229, 169, 60, 0.4)', borderRadius: '6px', color: '#F4D06F', fontSize: '0.78rem', cursor: 'pointer' }}>
                                <Upload size={13} />
                                <span>Tải ảnh từ máy (&lt;5MB)</span>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  style={{ display: 'none' }} 
                                  onChange={e => handleMuseumUpload(e, item.id)} 
                                />
                              </label>

                              <div style={{ display: 'flex', gap: '6px' }}>
                                <input 
                                  type="url"
                                  placeholder="Hoặc dán URL ảnh..."
                                  value={museumUrlInputs[item.id] || ''}
                                  onChange={e => setMuseumUrlInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                                  style={{ flex: 1, padding: '5px 8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#fff', fontSize: '0.75rem' }}
                                />
                                <button 
                                  type="button"
                                  onClick={() => handleMuseumUrlSave(item.id)}
                                  style={{ padding: '5px 10px', background: 'var(--accent-gold)', border: 'none', borderRadius: '4px', color: '#000', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}
                                >
                                  Lưu
                                </button>
                              </div>

                              {isCustom && (
                                <button 
                                  type="button"
                                  onClick={() => handleResetMuseumImage(item.id)}
                                  style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
                                >
                                  <RotateCcw size={11} /> Khôi phục ảnh mặc định
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* TAB 4: THÔNG TIN HỆ THỐNG & BẢN QUYỀN                   */}
                {/* ======================================================== */}
                {activeTab === 'system' && (
                  <div className="admin-tab-pane">
                    <div className="card" style={{ padding: '20px', background: 'var(--bg-card)', border: '1px solid rgba(229, 169, 60, 0.25)', borderRadius: '10px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#F4D06F', margin: '0 0 12px', fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                        Thông Tin Đề Tài &amp; Bản Quyền Dự Án
                      </h4>
                      <p style={{ color: '#D1D5DB', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 16px' }}>
                        Dự án <strong>"Hào Khí Tây Sơn"</strong> là giải pháp số hóa di sản và học tập Lịch sử trực quan về Hoàng đế Quang Trung – Nguyễn Huệ, tích hợp bản đồ sa bàn 3D, trí tuệ nhân tạo Google Gemini RAG và hệ thống khảo sát đồng bộ đám mây.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                        <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <span style={{ fontSize: '0.78rem', color: '#9CA3AF', display: 'block' }}>Tác giả đại diện:</span>
                          <strong style={{ color: '#F4D06F', fontSize: '0.94rem' }}>LÊ TRƯỜNG THỊNH</strong>
                          <span style={{ fontSize: '0.8rem', color: '#D1D5DB', display: 'block' }}>Học sinh Lớp 12A8 · Trường THCS và THPT Nguyễn Huệ</span>
                        </div>

                        <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <span style={{ fontSize: '0.78rem', color: '#9CA3AF', display: 'block' }}>Đồng tác giả:</span>
                          <strong style={{ color: '#F4D06F', fontSize: '0.94rem' }}>TRẦN NGỌC ANH</strong>
                          <span style={{ fontSize: '0.8rem', color: '#D1D5DB', display: 'block' }}>Học sinh Lớp 11A5 · Trường THCS và THPT Nguyễn Huệ</span>
                        </div>

                        <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <span style={{ fontSize: '0.78rem', color: '#9CA3AF', display: 'block' }}>Hỗ trợ kỹ thuật:</span>
                          <strong style={{ color: '#F4D06F', fontSize: '0.94rem' }}>TRẦN DUY KHANG</strong>
                          <span style={{ fontSize: '0.8rem', color: '#D1D5DB', display: 'block' }}>Phát triển hạ tầng đồng bộ Google Sheets</span>
                        </div>
                      </div>
                    </div>

                    <div className="card" style={{ padding: '20px', background: 'var(--bg-card)', border: '1px solid rgba(229, 169, 60, 0.25)', borderRadius: '10px' }}>
                      <h4 style={{ color: '#F4D06F', margin: '0 0 14px', fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                        Trạng Thái Kết Nối Dịch Vụ
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
                          <span style={{ color: '#E5E7EB', fontSize: '0.86rem' }}>Bảng tính Google Sheets:</span>
                          <span style={{ color: '#34D399', fontSize: '0.82rem', fontWeight: 'bold' }}>✓ Đang hoạt động (Đồng bộ thời gian thực)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
                          <span style={{ color: '#E5E7EB', fontSize: '0.86rem' }}>Biểu mẫu Google Form:</span>
                          <span style={{ color: '#34D399', fontSize: '0.82rem', fontWeight: 'bold' }}>✓ Đã kết nối nhúng trực tiếp</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
                          <span style={{ color: '#E5E7EB', fontSize: '0.86rem' }}>Google Apps Script Webhook:</span>
                          <span style={{ color: '#34D399', fontSize: '0.82rem', fontWeight: 'bold' }}>✓ Sẵn sàng nhận đánh giá realtime</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
                          <span style={{ color: '#E5E7EB', fontSize: '0.86rem' }}>Sử Quan AI (Google Gemini):</span>
                          <span style={{ color: '#34D399', fontSize: '0.82rem', fontWeight: 'bold' }}>✓ Sẵn sàng (Kho tri thức RAG {knowledgeList.length} tài liệu)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
