import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ShieldCheck } from 'lucide-react';
import { playChime, getSoundEnabled, setSoundEnabled } from '../utils/audio';
import { useAdmin } from '../context/AdminContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Trang Chủ' },
  { id: 'timeline', label: 'Dòng Thời Gian' },
  { id: 'battle-map', label: 'Sa Bàn' },
  { id: 'museum', label: 'Bảo Tàng' },
  { id: 'ai-station', label: 'Sử Quan AI' },
  { id: 'quiz', label: 'Đố Vui' },
  { id: 'survey', label: 'Đánh Giá' }
];

export default function Navbar({ activeTab, onSelectTab, onOpenAdmin }) {
  const { isAdmin, openAdmin, logoutAdmin } = useAdmin();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => getSoundEnabled());

  // Khóa cuộn trang khi menu mobile mở
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleTabClick = (tabId) => {
    playChime(600, 'sine', 0.1);
    onSelectTab(tabId);
    setIsMobileOpen(false);
  };

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) playChime(680, 'triangle', 0.15);
  };

  return (
    <>
      <header className="navbar">
        {/* Logo text-only Fraunces 900 */}
        <motion.button
          type="button"
          className="navbar-logo"
          onClick={() => handleTabClick('home')}
          aria-label="Trang chủ Hào Khí Tây Sơn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        >
          HÀO KHÍ TÂY SƠN
        </motion.button>

        {/* 6 Menu items trên 1 dòng duy nhất */}
        <nav className="navbar-nav" aria-label="Điều hướng chính">
          <ul className="navbar-nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} style={{ position: 'relative' }}>
                  <motion.button
                    type="button"
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="nav-active-pill"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="nav-link-text">{item.label}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Khu vực Actions bên phải: Nút text Admin + Icon Sound + Hamburger Mobile */}
        <div className="navbar-actions">
          {!isAdmin ? (
            <motion.button
              type="button"
              className="navbar-admin-btn"
              onClick={() => openAdmin('survey')}
              aria-label="Mở quản trị"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              Admin
            </motion.button>
          ) : (
            <div className="navbar-admin-badge-group" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <motion.button
                type="button"
                className="navbar-admin-btn active-admin"
                onClick={() => openAdmin('survey')}
                title="Mở Bảng Điều Khiển Quản Trị Hệ Thống (Lê Trường Thịnh)"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{
                  background: 'rgba(229, 169, 60, 0.2)',
                  borderColor: '#E5A93C',
                  color: '#F4D06F',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px'
                }}
              >
                <ShieldCheck size={14} />
                <span>Quản Trị</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  logoutAdmin();
                  playChime(400, 'sine', 0.1);
                }}
                className="btn-admin-nav-logout"
                title="Thoát chế độ Admin để kiểm tra góc nhìn học sinh thông thường"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#9CA3AF',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Thoát
              </motion.button>
            </div>
          )}

          <motion.button
            type="button"
            className="btn-icon"
            onClick={toggleSound}
            aria-label={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </motion.button>

          <motion.button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Mở menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-overlay"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            <Menu size={20} />
          </motion.button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav-overlay"
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-menu-header">
              <span className="navbar-logo">HÀO KHÍ TÂY SƠN</span>
              <motion.button
                type="button"
                className="btn-icon"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Đóng menu"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <nav aria-label="Điều hướng trên di động">
              <ul className="mobile-nav-list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <motion.button
                      type="button"
                      className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => handleTabClick(item.id)}
                      aria-current={activeTab === item.id ? 'page' : undefined}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    >
                      <span>{item.label}</span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-menu-footer">
              {!isAdmin ? (
                <motion.button
                  type="button"
                  className="navbar-admin-btn"
                  onClick={() => {
                    setIsMobileOpen(false);
                    openAdmin('survey');
                  }}
                  aria-label="Mở quản trị"
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                >
                  Admin
                </motion.button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.button
                    type="button"
                    className="navbar-admin-btn active-admin"
                    onClick={() => {
                      setIsMobileOpen(false);
                      openAdmin('survey');
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    style={{
                      background: 'rgba(229, 169, 60, 0.2)',
                      borderColor: '#E5A93C',
                      color: '#F4D06F',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <ShieldCheck size={14} />
                    <span>Quản Trị (Admin)</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setIsMobileOpen(false);
                      logoutAdmin();
                      playChime(400, 'sine', 0.1);
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#9CA3AF',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    Thoát
                  </motion.button>
                </div>
              )}

              <motion.button
                type="button"
                className="btn-icon"
                onClick={toggleSound}
                aria-label={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              >
                {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
