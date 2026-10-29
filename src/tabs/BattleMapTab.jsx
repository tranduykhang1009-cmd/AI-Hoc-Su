import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  X, 
  Sparkles, 
  Swords, 
  Waves, 
  Flame, 
  Shield, 
  Trophy, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { BATTLES_DATA } from '../data/battlesData';
import { playChime } from '../utils/audio';
import { toast } from 'sonner';
import BackgroundMusic from '../components/BackgroundMusic';

const LUCIDE_ICONS = {
  Swords,
  Waves,
  Flame,
  Sparkles,
  Shield
};

export default function BattleMapTab() {
  const [activeBattleId, setActiveBattleId] = useState('rach-gam');
  const [mapLayerType, setMapLayerType] = useState('google-hybrid'); // 'google-hybrid' | 'google-roadmap' | 'google-terrain'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [isFunFactsOpen, setIsFunFactsOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth > 1024 : true);
  const [activeQuizPhase, setActiveQuizPhase] = useState(null);
  const [quizState, setQuizState] = useState({ selected: null, isSubmitted: false, isCorrect: false });
  const [score, setScore] = useState(0);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const layersGroupRef = useRef(null);
  const viewedPhasesRef = useRef(new Set([0]));

  const battle = BATTLES_DATA[activeBattleId];
  const activeBattle = battle;
  const currentPhaseIndex = activePhaseIndex !== null ? activePhaseIndex : 0;

  // Leaflet map initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: battle.center,
      zoom: battle.zoom,
      zoomControl: false,
      attributionControl: false
    });

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    mapInstanceRef.current = map;
    layersGroupRef.current = L.layerGroup().addTo(map);

    updateTileLayer(map, mapLayerType);
    renderTacticalLayers(map, battle);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activeBattleId]);

  // Fix Leaflet resize when drawer toggles
  useEffect(() => {
    if (mapInstanceRef.current) {
      const timer = setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  // Fix Leaflet resize on window change
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateTileLayer = (map, type) => {
    if (!map) return;
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = '';
    let options = { maxZoom: 20 };

    if (type === 'google-hybrid') {
      // Live Google Maps Satellite Imagery with street and place names
      url = 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
      options = {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      };
    } else if (type === 'google-roadmap') {
      // Live Google Maps Street / Administrative boundaries & road network
      url = 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
      options = {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      };
    } else if (type === 'google-terrain') {
      // Live Google Maps Terrain
      url = 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
      options = {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      };
    } else {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      options = { maxZoom: 19, attribution: '&copy; OpenStreetMap' };
    }

    tileLayerRef.current = L.tileLayer(url, options).addTo(map);
  };

  const handleLayerChange = (type) => {
    setMapLayerType(type);
    if (mapInstanceRef.current) {
      updateTileLayer(mapInstanceRef.current, type);
    }
    playChime(500, 'sine', 0.1);
  };

  const renderTacticalLayers = (map, battleData) => {
    if (!layersGroupRef.current) return;
    layersGroupRef.current.clearLayers();

    // 1. Render zones (Polygons)
    battleData.zones?.forEach((zone) => {
      const polygon = L.polygon(zone.coords, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.18,
        weight: 2,
        dashArray: zone.type === 'enemy' ? '4, 4' : undefined
      });

      const popupContent = `
        <div class="tactical-popup">
          <span class="popup-zone-tag" style="background: ${zone.color}22; color: ${zone.color};">
            ${zone.type === 'friendly' ? 'Quân Tây Sơn' : zone.type === 'enemy' ? 'Đối Phương' : 'Chiến Địa'}
          </span>
          <h4 class="popup-zone-title">${zone.title}</h4>
          ${zone.modernLocation ? `
            <div style="margin: 4px 0 6px; padding: 4px 8px; background: rgba(229, 169, 60, 0.08); border: 1px solid rgba(229, 169, 60, 0.25); border-radius: 6px;">
              <span style="font-size: 11px; color: #F4D06F; font-weight: 600; display: block;">📍 Đơn vị hành chính hiện nay:</span>
              <span style="font-size: 11px; color: #E5E7EB; line-height: 1.35;">${zone.modernLocation}</span>
            </div>
          ` : ''}
          <p class="popup-zone-desc">${zone.desc}</p>
        </div>
      `;

      polygon.bindPopup(popupContent);
      polygon.on('click', () => {
        playChime(600, 'sine', 0.1);
      });

      layersGroupRef.current.addLayer(polygon);
    });

    // 2. Render directional flows (Polylines + Marker Arrow)
    battleData.flows?.forEach((flow) => {
      const polyline = L.polyline(flow.points, {
        color: flow.color,
        weight: 3.5,
        dashArray: flow.dashArray || undefined,
        opacity: 0.85
      });

      const lastPoint = flow.points[flow.points.length - 1];
      const arrowIcon = L.divIcon({
        className: 'tactical-arrowhead',
        html: `<div style="display: flex; align-items: center; justify-content: center; width: 16px; height: 16px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="${flow.color}"><path d="M5 3l14 9-14 9V3z"/></svg></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const arrowMarker = L.marker(lastPoint, { icon: arrowIcon });

      const popupContent = `
        <div class="tactical-popup">
          <span class="popup-flow-tag" style="background: ${flow.color}22; color: ${flow.color};">
            ${flow.type === 'friendly' ? 'Hướng Tiến Công Tây Sơn' : 'Hướng Di Chuyển Đối Phương'}
          </span>
          <h4 class="popup-zone-title">${flow.title}</h4>
          ${flow.modernLocation ? `
            <div style="margin: 4px 0 6px; padding: 4px 8px; background: rgba(229, 169, 60, 0.08); border: 1px solid rgba(229, 169, 60, 0.25); border-radius: 6px;">
              <span style="font-size: 11px; color: #F4D06F; font-weight: 600; display: block;">📍 Tuyến đường theo địa giới ngày nay:</span>
              <span style="font-size: 11px; color: #E5E7EB; line-height: 1.35;">${flow.modernLocation}</span>
            </div>
          ` : ''}
          <p class="popup-zone-desc">${flow.desc}</p>
        </div>
      `;

      polyline.bindPopup(popupContent);
      arrowMarker.bindPopup(popupContent);

      polyline.on('click', () => {
        playChime(650, 'sine', 0.1);
      });

      layersGroupRef.current.addLayer(polyline);
      layersGroupRef.current.addLayer(arrowMarker);
    });
  };

  const handleSwitchBattle = (id) => {
    setActivePhaseIndex(0);
    viewedPhasesRef.current = new Set([0]);
    setIsDrawerOpen(false);
    setActiveQuizPhase(null);
    playChime(600, 'sine', 0.15);
    setActiveBattleId(id);
  };

  const handleSelectPhase = (tac, idx) => {
    setActivePhaseIndex(idx);
    setIsDrawerOpen(true);
    playChime(680, 'triangle', 0.12);
    if (mapInstanceRef.current && tac.center) {
      const drawerWidth = window.innerWidth <= 768 ? window.innerWidth : 400;
      mapInstanceRef.current.flyTo(tac.center, tac.zoom || 13, {
        animate: true,
        duration: 1.4,
        paddingBottomRight: [drawerWidth, 0]
      });
    }

    const phases = activeBattle.phases || activeBattle.tactics;
    const updated = new Set(viewedPhasesRef.current);
    updated.add(idx);
    viewedPhasesRef.current = updated;
    if (updated.size >= phases.length) {
      toast.success('🏆 Đã khám phá toàn bộ diễn biến!');
    }
  };

  const handlePhaseChange = (idx) => {
    const phases = activeBattle.phases || activeBattle.tactics;
    if (phases[idx]) {
      handleSelectPhase(phases[idx], idx);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    playChime(500, 'sine', 0.1);
  };

  const handleOpenQuiz = (tac) => {
    setActiveQuizPhase(tac);
    setQuizState({ selected: null, isSubmitted: false, isCorrect: false });
    playChime(650, 'sine', 0.12);
  };

  const handleSelectOption = (idx, quiz) => {
    if (quizState.isSubmitted) return;
    const isCorrect = idx === quiz.correct;
    setQuizState({ selected: idx, isSubmitted: true, isCorrect });
    if (isCorrect) {
      playChime(750, 'triangle', 0.2);
      setScore(prev => prev + 10);
    } else {
      playChime(320, 'sine', 0.15);
    }
  };

  const phasesList = activeBattle.phases || activeBattle.tactics;

  return (
    <motion.div 
      className="battle-map-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Nhạc nền sa bàn hào hùng Tây Sơn */}
      <BackgroundMusic 
        src="/audio/tay_son_epic_theme.mp3"
        volume={0.25}
      />
      {/* Leaflet map */}
      <div ref={mapContainerRef} className="leaflet-map-element" />

      {/* Battle selector - top-left */}
      <div className="battle-selector-bar">
        <button 
          className={`battle-selector-btn ${activeBattleId === 'rach-gam' ? 'active' : ''}`}
          onClick={() => handleSwitchBattle('rach-gam')}
        >
          Rạch Gầm – Xoài Mút (1785)
        </button>
        <button 
          className={`battle-selector-btn ${activeBattleId === 'phu-xuan-hue' ? 'active' : ''}`}
          onClick={() => handleSwitchBattle('phu-xuan-hue')}
        >
          Phú Xuân – Núi Bân (1788)
        </button>
        <button 
          className={`battle-selector-btn ${activeBattleId === 'ngoc-hoi-dong-da' ? 'active' : ''}`}
          onClick={() => handleSwitchBattle('ngoc-hoi-dong-da')}
        >
          Ngọc Hồi – Đống Đa (1789)
        </button>
        <div className="battle-gis-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(18, 16, 14, 0.85)', border: '1px solid rgba(229, 169, 60, 0.4)', borderRadius: '20px', color: '#F4D06F', fontSize: '0.75rem', fontWeight: 500, backdropFilter: 'blur(8px)', boxShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }}></span>
          <span>Google Maps Trực Tuyến · Địa Giới Mới Nhất</span>
        </div>
      </div>

      {/* Fun Facts Panel - top left */}
      <div className={`battle-funfacts-panel ${isFunFactsOpen ? 'open' : 'collapsed'}`}>
        <div 
          className="funfacts-title" 
          onClick={() => setIsFunFactsOpen(!isFunFactsOpen)}
          role="button"
          tabIndex={0}
          aria-label="Thu gọn hoặc mở rộng Sự thật thú vị"
          style={{ cursor: 'pointer' }}
        >
          <Sparkles size={14} />
          <span>Sự thật thú vị</span>
          <span style={{ marginLeft: 'auto', opacity: 0.7 }}>
            {isFunFactsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>
        {isFunFactsOpen && activeBattle.funFacts?.map((fact, i) => {
          const Icon = LUCIDE_ICONS[fact.icon] || Sparkles;
          return (
            <div key={i} className="funfact-item">
              <div className="funfact-icon"><Icon size={16} /></div>
              <div className="funfact-content">
                <h4>{fact.title}</h4>
                <p>{fact.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase selector pills - bottom center */}
      <div className="battle-phase-pills" role="tablist" aria-label="Giai đoạn trận đánh">
        {phasesList.map((tac, idx) => (
          <button
            key={idx}
            type="button"
            className={`battle-phase-pill ${activePhaseIndex === idx ? 'active' : ''}`}
            onClick={() => handleSelectPhase(tac, idx)}
            aria-selected={activePhaseIndex === idx}
          >
            {tac.label || `Giai đoạn ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* Layer control - bottom right */}
      <div className="battle-layer-control" role="group" aria-label="Tùy chọn bản đồ">
        <button 
          type="button"
          className={`battle-layer-btn ${mapLayerType === 'google-hybrid' ? 'active' : ''}`}
          onClick={() => handleLayerChange('google-hybrid')}
          title="Google Maps ảnh vệ tinh trực tiếp kèm địa danh và đường bộ"
        >
          🛰️ Google Vệ Tinh
        </button>
        <button 
          type="button"
          className={`battle-layer-btn ${mapLayerType === 'google-roadmap' ? 'active' : ''}`}
          onClick={() => handleLayerChange('google-roadmap')}
          title="Google Maps bản đồ giao thông và địa giới hành chính mới"
        >
          🗺️ Google Bản Đồ
        </button>
        <button 
          type="button"
          className={`battle-layer-btn ${mapLayerType === 'google-terrain' ? 'active' : ''}`}
          onClick={() => handleLayerChange('google-terrain')}
          title="Google Maps địa hình đồi núi"
        >
          ⛰️ Địa Hình
        </button>
      </div>

      {/* Drawer backdrop (mobile) */}
      <div 
        className={`battle-drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
      />

      {/* Drawer trượt */}
      <div className={`battle-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <button className="drawer-close-btn" onClick={closeDrawer} aria-label="Đóng chi tiết">
          <X size={16} />
        </button>
        
        <div className="drawer-header">
          <h2 className="drawer-title">{battle.title}</h2>
          <p className="drawer-subtitle">{battle.subtitle}</p>
        </div>

        <div className="drawer-meta">
          <div className="meta-item">
            <span className="meta-label">Chỉ huy Tây Sơn</span>
            <strong>{battle.commander}</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">Chỉ huy đối phương</span>
            <strong>{battle.enemyCommander}</strong>
          </div>
          <div className="meta-item">
            <span className="meta-label">Thời gian</span>
            <strong>{battle.time}</strong>
          </div>
          {battle.gpsCoordinates && (
            <div className="meta-item">
              <span className="meta-label">Tọa độ GPS thực tế</span>
              <strong style={{ color: '#34D399', fontSize: '0.8rem' }}>{battle.gpsCoordinates}</strong>
            </div>
          )}
          {battle.modernLocation && (
            <div className="meta-item" style={{ gridColumn: '1 / -1', background: 'rgba(229, 169, 60, 0.08)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(229, 169, 60, 0.25)', margin: '4px 0' }}>
              <span className="meta-label" style={{ color: '#F4D06F', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                📍 Đơn vị hành chính hiện nay:
              </span>
              <strong style={{ color: '#FFFFFF', fontSize: '0.84rem', fontWeight: 500, lineHeight: 1.45, display: 'block', marginTop: '2px' }}>
                {battle.modernLocation}
              </strong>
            </div>
          )}
          <div style={{ gridColumn: '1 / -1', marginTop: '4px' }}>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${(activePhaseIndex !== null && phasesList[activePhaseIndex]?.center) ? phasesList[activePhaseIndex].center.join(',') : battle.center.join(',')}`}
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '9px 12px',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.22) 0%, rgba(30, 58, 138, 0.45) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.45)',
                borderRadius: '8px',
                color: '#93C5FD',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                transition: 'all 0.2s'
              }}
            >
              <ExternalLink size={14} />
              <span>Xem vị trí thực tế trên Google Maps ↗</span>
            </a>
          </div>
        </div>

        <div className="drawer-summary">
          <p>{battle.summary}</p>
        </div>

        {/* Phase details khi user click vào phase pill hoặc kéo timeline */}
        {activePhaseIndex !== null && phasesList[activePhaseIndex] && (
          <div className="drawer-phase-detail">
            <h3>Giai đoạn {activePhaseIndex + 1}: {phasesList[activePhaseIndex].phase}</h3>
            {phasesList[activePhaseIndex].modernLocation && (
              <div style={{ margin: '6px 0 10px', padding: '6px 10px', background: 'rgba(229, 169, 60, 0.08)', border: '1px solid rgba(229, 169, 60, 0.25)', borderRadius: '6px', fontSize: '0.8rem' }}>
                <span style={{ color: '#F4D06F', fontWeight: 600 }}>📍 Địa bàn hiện nay: </span>
                <span style={{ color: '#E5E7EB' }}>{phasesList[activePhaseIndex].modernLocation}</span>
              </div>
            )}
            <p>{phasesList[activePhaseIndex].desc}</p>
            {phasesList[activePhaseIndex].miniQuiz && (
              <button 
                type="button"
                className="battle-mini-quiz-btn"
                onClick={() => handleOpenQuiz(phasesList[activePhaseIndex])}
              >
                <HelpCircle size={14} />
                <span>Thử thách Trắc nghiệm (+10 điểm)</span>
              </button>
            )}
          </div>
        )}

        {/* Forces comparison - dạng progress bars đơn giản */}
        {battle.forcesComparison && (
          <div className="drawer-forces">
            <div className="force-row">
              <div className="force-label">
                <span>{battle.forcesComparison.ourForces.name}</span>
                <strong>{battle.forcesComparison.ourForces.count}</strong>
              </div>
              <div className="force-bar">
                <div 
                  className="force-bar-fill ally"
                  style={{ width: `${battle.forcesComparison.ourForces.percent}%` }}
                />
              </div>
            </div>
            <div className="force-row">
              <div className="force-label">
                <span>{battle.forcesComparison.enemyForces.name}</span>
                <strong>{battle.forcesComparison.enemyForces.count}</strong>
              </div>
              <div className="force-bar">
                <div 
                  className="force-bar-fill enemy"
                  style={{ width: `${battle.forcesComparison.enemyForces.percent}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mini Quiz Modal Popup */}
      {activeQuizPhase && activeQuizPhase.miniQuiz && (
        <div className="battle-quiz-modal-backdrop" onClick={() => setActiveQuizPhase(null)}>
          <div className="battle-quiz-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="battle-quiz-close" 
              onClick={() => setActiveQuizPhase(null)}
              aria-label="Đóng câu hỏi"
            >
              <X size={18} />
            </button>
            <div className="battle-quiz-title">
              <Trophy size={16} />
              <span>Thử Thách Sa Bàn · Điểm: {score}</span>
            </div>
            <p className="battle-quiz-question">{activeQuizPhase.miniQuiz.question}</p>
            <div className="battle-quiz-options">
              {activeQuizPhase.miniQuiz.options.map((opt, oIdx) => {
                let btnClass = 'battle-quiz-option-btn';
                if (quizState.isSubmitted) {
                  if (oIdx === activeQuizPhase.miniQuiz.correct) btnClass += ' correct';
                  else if (oIdx === quizState.selected) btnClass += ' wrong';
                }
                return (
                  <button
                    key={oIdx}
                    type="button"
                    className={btnClass}
                    disabled={quizState.isSubmitted}
                    onClick={() => handleSelectOption(oIdx, activeQuizPhase.miniQuiz)}
                  >
                    <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                  </button>
                );
              })}
            </div>
            {quizState.isSubmitted && (
              <div className="battle-quiz-feedback">
                <strong>{quizState.isCorrect ? '✅ Chính xác! (+10 điểm)' : '❌ Chưa chính xác!'}</strong>
                <p style={{ marginTop: '4px', margin: 0 }}>{activeQuizPhase.miniQuiz.explain}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
