# Project: Hào Khí Tây Sơn — International Design Engineering & Awwwards Upgrade

## Architecture
- **Framework**: React 19 (`react: ^19.0.0`), Vite 6 (`vite: ^6.2.0`)
- **Animation Engine**: Framer Motion v12 (`framer-motion: ^12.4.7`)
- **Notification System**: Sonner (`sonner: ^2.0.0` or `^1.7.5`)
- **Styling Architecture**: Custom CSS Design System (`src/App.css`), tokenized via CSS custom properties on `:root`
- **Iconography**: Lucide React (`^1.16.0`)
- **Geo / Mapping**: Leaflet (`^1.9.4`) with Google Hybrid satellite tiles
- **Test Runner & Verification**: Playwright CLI (`v0.1.22`) with Chromium headless/headed engine

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---|---|---|---|
| F1 | Sonner Library Integration | Install `sonner`, mount `<Toaster position="top-right" richColors theme="dark" />` in `src/App.jsx` | M1 | Survey / R3 |
| F2 | Alert & Legacy Toast Replacement | Eliminate 7 raw `alert()` in `AdminKnowledgeModal.jsx` and `SurveyTab.jsx`, deprecate `Toast.jsx` in `BattleMapTab.jsx` and `MuseumTab.jsx` | M1 | Survey / R3 |
| F3 | Interactive Toast Feedback | Provide responsive toast notifications on URL copy, review submission, Google Sheets GViz sync, sound effect sync | M1 | Survey / R3 |
| F4 | Obsidian & Amber Gold Heritage Palette | Refactor `:root` tokens in `App.css`: `--bg-canvas: #08090C`, `--accent: #F59E0B`, `--accent-hover: #D97706`, `--bronze: #8C6D37`, hairline borders | M2 | Survey / R1 |
| F5 | Anti-Slop Eradication | Remove hero background blobs (`.hero-bg-blob-*`), eliminate harsh neon glows (`.btn-battle-glow`, `.statue-gold-rim-glow`), refine 55+ gradients | M2 | Survey / R1 |
| F6 | Typography & Spacing Rhythm | Enforce Fraunces display font for imperial titles, Be Vietnam Pro for academic body text, dignified spacing rhythm | M2 | Survey / R1 |
| F7 | Emil Kowalski Spring Physics | Replace fixed duration transitions with spring curves (`type: "spring", stiffness: 350, damping: 28`) and `cubic-bezier(0.16, 1, 0.3, 1)` | M3 | Survey / R2 |
| F8 | Tactile Micro-Interactions | Inject `whileTap={{ scale: 0.96 }}` and `whileHover={{ y: -2, scale: 1.01 }}` into all buttons, cards, and interactive chips | M3 | Survey / R2 |
| F9 | Sliding Pill Navigation | Implement shared layout `layoutId="active-pill"` for active tab transitions in `Navbar.jsx` and `AdminKnowledgeModal.jsx` | M3 | Survey / R2 |
| F10 | 60fps & Reduced Motion Support | Add `@media (prefers-reduced-motion: reduce)` in `App.css`, limit animated properties strictly to `transform` and `opacity` | M3 | Survey / R2 |
| F11 | Trang chủ (HomeTab) Polish | Refine hero banner, interactive CTAs, and bento cards with heritage aesthetics and spring micro-interactions | M4 | Survey / R1, R2 |
| F12 | Dòng thời gian (TimelineTab) Polish | Polish laser timeline spine, 4 era filters with spring pills, and 10 event card actions | M4 | Survey / R1, R2 |
| F13 | Sa bàn chiến trận (BattleMapTab) Polish | Polish 3 battle selector pills, Leaflet HUD overlays, tactical drawer, and battle mini-quiz feedback | M4 | Survey / R1, R2, R3 |
| F14 | Bảo tàng (MuseumTab) Polish | Polish exhibition plaque cards, category filters, and 60/40 fullscreen modal with focus trap | M4 | Survey / R1, R2 |
| F15 | Sử quan AI (AiStationTab) Polish | Polish imperial seal header, prompt edict chips with spring hover, scroll chat stream, and source citations | M4 | Survey / R1, R2 |
| F16 | Khảo sát & Admin Polish | Polish review submission form, confetti, GViz cloud sync, and 4-tab admin control center with Sonner toasts | M4 | Survey / R1, R2, R3 |
| F17 | Playwright E2E Test Suite (Tiers 1-4) | Comprehensive automated test suite verifying navigation, interaction, edge cases, and 0 console errors | M5 | Survey / R4 |
| F18 | Desktop & Mobile Screenshot Matrix | Capture 18 high-resolution screenshots verifying visual perfection on Desktop (1920x1080) and Mobile (390x844) | M5 | Survey / R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M1 | Sonner Notification System | F1, F2, F3: Install sonner, mount `<Toaster>`, replace all 7 `alert()` and legacy toasts | none | DONE |
| M2 | Taste Heritage Visual System | F4, F5, F6: Obsidian `#08090C`, Amber Gold `#F59E0B`, Antique Bronze `#8C6D37`, eliminate AI-slop glows/blobs | none (can parallel M1) | DONE |
| M3 | Emil Kowalski Motion Craft | F7, F8, F9, F10: Spring physics, tactile button feedback, `layoutId` sliding pill navigation, reduced motion | M1, M2 | DONE |
| M4 | 6 Tabs Deep Heritage Polish | F11, F12, F13, F14, F15, F16: Complete component & tab refinement across Home, Timeline, BattleMap, Museum, AI, Survey & Admin | M2, M3 | IN_PROGRESS |
| M5 | Final Milestone: Playwright E2E & Screenshots | F17, F18: Run full Playwright test suite (Tiers 1-4), adversarial test hardening (Tier 5), capture 18 screenshots | M1, M2, M3, M4 | PLANNED |

## Code Layout
- `src/App.jsx`: Global app shell, routing, `<Toaster />` mounting
- `src/App.css`: Global CSS custom properties, typography, utility classes, reduced-motion rules, anti-slop tokens
- `src/components/Navbar.jsx`: Global navigation bar with shared `layoutId` pill
- `src/components/AdminKnowledgeModal.jsx`: Admin dashboard with 4 segmented tabs and sonner notifications
- `src/tabs/HomeTab.jsx`: Tab 1 — Hero, CTAs, Bento cards
- `src/tabs/TimelineTab.jsx`: Tab 2 — Chronology, era filters, laser timeline
- `src/tabs/BattleMapTab.jsx`: Tab 3 — Tactical map, battle selectors, mini-quiz
- `src/tabs/MuseumTab.jsx`: Tab 4 — Plaque cards, 60/40 exhibition modal
- `src/tabs/AiStationTab.jsx`: Tab 5 — AI Historian chat, imperial edicts
- `src/tabs/SurveyTab.jsx`: Tab 6 — Feedback form, reviews, GViz cloud sync
- `src/tabs/QuizArenaTab.jsx`: Tab 7 — Historical quiz arena
- `e2e/` or `tests/`: Playwright E2E test scripts and automated runner
- `screenshots/`: 18 Desktop & Mobile verification screenshots
