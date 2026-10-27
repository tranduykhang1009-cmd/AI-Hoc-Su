import React from 'react';

export default function HeroStatueFrame({ children }) {
  return (
    <div className="hero-statue-frame-editorial">
      {/* Decorative refined corner accents */}
      <div className="statue-corner-accent tl" aria-hidden="true" />
      <div className="statue-corner-accent tr" aria-hidden="true" />
      <div className="statue-corner-accent bl" aria-hidden="true" />
      <div className="statue-corner-accent br" aria-hidden="true" />

      {/* Main Image Container */}
      <div className="statue-image-container-editorial">
        {children}
        <div className="statue-vignette-overlay" aria-hidden="true" />
      </div>

      {/* Dignified Museum Plinth with Inscribed Gold Typography */}
      <div className="hero-statue-plinth-editorial">
        <figcaption className="hero-statue-caption-editorial">
          <span className="statue-title-line">QUANG TRUNG HOÀNG ĐẾ</span>
          <span className="statue-era-line">1753 — 1792 · TƯỢNG ĐÀI BẢO TÀNG BÌNH ĐỊNH</span>
        </figcaption>
      </div>
    </div>
  );
}
