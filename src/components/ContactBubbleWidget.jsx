import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle, ExternalLink, Copy, Check, ChevronLeft } from 'lucide-react';
import { playChime, playCorrectSound } from '../utils/audio';

const FB_URL = "https://www.facebook.com/letruongthinh.02092009?mibextid=wwXIfr&rdid=yWcReV2kt8J3mlg1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18ftPPDFTS%2F%3Fmibextid%3DwwXIfr#";
const GMAIL_ADDRESS = "letruongthinh02092009@gmail.com";
const STORAGE_DOCKED_KEY = "su_contact_bubble_docked";

export default function ContactBubbleWidget() {
  const [isDocked, setIsDocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_DOCKED_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Tự động thu gọn bong bóng gợi ý sau 12 giây nếu người dùng không tương tác
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Xử lý khi bấm nút đóng (x) -> Thu vào mép phải
  const handleCloseToDock = (e) => {
    e.stopPropagation();
    playChime(420, 'sine', 0.1);
    setIsDocked(true);
    setIsOpenMenu(false);
    setShowSpeechBubble(false);
    try {
      localStorage.setItem(STORAGE_DOCKED_KEY, 'true');
    } catch (err) {}
  };

  // Xử lý khi bấm vào nửa nút ở mép phải -> Bung mở lại
  const handleUndock = () => {
    playChime(620, 'sine', 0.1);
    setIsDocked(false);
    setShowSpeechBubble(true);
    try {
      localStorage.setItem(STORAGE_DOCKED_KEY, 'false');
    } catch (err) {}
  };

  // Mở / đóng menu 2 nền tảng
  const handleToggleMenu = () => {
    if (isDocked) {
      handleUndock();
      return;
    }
    playChime(560, 'sine', 0.1);
    setIsOpenMenu(prev => !prev);
    setShowSpeechBubble(false);
  };

  // Copy email
  const handleCopyEmail = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(GMAIL_ADDRESS);
      setCopiedEmail(true);
      playCorrectSound();
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {}
  };

  return (
    <div className={`contact-bubble-wrapper ${isDocked ? 'is-docked' : ''}`}>
      {/* 1. TRẠNG THÁI THU GỌN VÀO THÀNH BÊN PHẢI (DOCKED) */}
      {isDocked ? (
        <button 
          className="docked-edge-btn"
          onClick={handleUndock}
          title="Bấm để mở liên hệ tác giả"
          aria-label="Mở liên hệ tác giả"
        >
          <div className="docked-pulse-wave" />
          <div className="docked-inner-icon">
            <MessageCircle size={20} color="#ffffff" />
          </div>
          <span className="docked-label-hint">
            <ChevronLeft size={14} /> Liên hệ
          </span>
        </button>
      ) : (
        /* 2. TRẠNG THÁI MỞ ĐẦY ĐỦ (FULL FLOATING BUBBLE) */
        <div className="contact-full-container">
          {/* Bong bóng chữ trắng nhọn đầu chỉ sang icon */}
          <AnimatePresence>
            {showSpeechBubble && !isOpenMenu && (
              <motion.div 
                className="contact-speech-bubble"
                initial={{ opacity: 0, scale: 0.85, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 10 }}
                transition={{ duration: 0.2 }}
                onClick={handleToggleMenu}
              >
                <span>Liên hệ & Góp ý tác giả</span>
                <div className="speech-arrow-right" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu popup 2 nền tảng: Facebook & Gmail */}
          <AnimatePresence>
            {isOpenMenu && (
              <motion.div 
                className="contact-popup-menu card"
                initial={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="contact-menu-header">
                  <strong>Kênh Liên Hệ Tác Giả</strong>
                  <button 
                    className="menu-close-btn"
                    onClick={() => setIsOpenMenu(false)}
                    title="Đóng menu"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="contact-menu-items">
                  {/* Nút 1: Facebook */}
                  <a 
                    href={FB_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-item-btn fb-item"
                    onClick={() => playChime(640, 'triangle', 0.1)}
                  >
                    <div className="item-icon-box fb-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="item-info">
                      <span className="item-title">Facebook</span>
                      <span className="item-sub">Lê Trường Thịnh</span>
                    </div>
                    <ExternalLink size={14} className="item-arrow text-gold" />
                  </a>

                  {/* Nút 2: Gmail */}
                  <div className="contact-item-btn gmail-item">
                    <a 
                      href={`mailto:${GMAIL_ADDRESS}?subject=G%C3%B3p%20%C3%BD%20D%E1%BB%B1%20%C3%A1n%20H%E1%BB%8Dc%20S%E1%BB%AD%20T%C3%A2y%20S%C6%A1n`}
                      className="gmail-direct-link"
                      onClick={() => playChime(600, 'sine', 0.1)}
                    >
                      <div className="item-icon-box gmail-box">
                        <Mail size={18} color="#ffffff" />
                      </div>
                      <div className="item-info">
                        <span className="item-title">Hòm Thư Gmail</span>
                        <span className="item-sub" title={GMAIL_ADDRESS}>{GMAIL_ADDRESS}</span>
                      </div>
                    </a>
                    <button 
                      className="btn-copy-mail" 
                      onClick={handleCopyEmail}
                      title="Sao chép địa chỉ email"
                    >
                      {copiedEmail ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="contact-menu-footer">
                  <span>Trường THPT Nguyễn Huệ · Bình Định</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nút tròn chính (Main Trigger Button) */}
          <div className="contact-trigger-wrapper">
            {/* Dấu x nhỏ ở góc trên để ẩn vào mép */}
            <button 
              className="contact-close-corner-btn"
              onClick={handleCloseToDock}
              title="Ẩn vào mép phải"
              aria-label="Ẩn vào mép phải"
            >
              <X size={11} strokeWidth={2.5} />
            </button>

            {/* Vòng tròn gradient nổi */}
            <button 
              className={`contact-main-circle-btn ${isOpenMenu ? 'is-active' : ''}`}
              onClick={handleToggleMenu}
              title="Liên hệ Facebook & Gmail tác giả"
              aria-label="Liên hệ Facebook & Gmail tác giả"
            >
              <div className="circle-halo-glow" />
              <div className="circle-inner-icon">
                {isOpenMenu ? (
                  <X size={24} color="#ffffff" />
                ) : (
                  <MessageCircle size={26} color="#ffffff" />
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
