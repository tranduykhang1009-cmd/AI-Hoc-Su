# Scope: Milestone 4 — 6 Tabs Deep Heritage Polish & Micro-interactions (R1, R2, R3)

## Objective
Unify and polish all 6 main tabs (Trang chủ, Dòng thời gian, Sa bàn chiến trận, Bảo tàng, Sử quan AI, Khảo sát & Admin) plus Quiz Arena to international museum caliber, ensuring full synergy of Taste visual design, Emil Kowalski tactile spring physics, and Sonner notifications.

## Scope Deliverables
1. **Tab 1: Trang chủ (`src/tabs/HomeTab.jsx`)**:
   - Bento cards with tactile hover (`whileHover={{ y: -3, scale: 1.01 }}`) and press feedback (`whileTap={{ scale: 0.97 }}`).
   - Crisp Amber Gold hairline card borders, Fraunces serif typography.
2. **Tab 2: Dòng thời gian (`src/tabs/TimelineTab.jsx`)**:
   - 4 Era filter buttons with spring pills, smooth transition between eras.
   - Laser chronology spine with high-contrast amber node markers.
   - Event card action buttons (Xem sa bàn, Hỏi Sử Quan AI) with tactile feedback.
3. **Tab 3: Sa bàn chiến trận (`src/tabs/BattleMapTab.jsx`)**:
   - 3 Battle selector buttons (Rạch Gầm, Phú Xuân, Ngọc Hồi) with active pill indicators and tactile press.
   - Tactical drawer and mini-quiz modal with spring physics (`stiffness: 350, damping: 28`).
   - Sonner toast integration for battle actions and quiz score updates.
4. **Tab 4: Bảo tàng (`src/tabs/MuseumTab.jsx`)**:
   - Search input & category filter pills with spring feedback.
   - Plaque artifact cards with subtle bronze borders and hover elevation.
   - 60/40 fullscreen modal with focus trap, smooth spring entrance, and escape key listener.
5. **Tab 5: Sử quan AI (`src/tabs/AiStationTab.jsx`)**:
   - Imperial seal header, 3 imperial edict prompt chips with spring hover.
   - Chat input with tactile send button and Enter key trigger.
   - Bamboo scroll aesthetic for AI messages with source citation cards.
6. **Tab 6: Khảo sát (`src/tabs/SurveyTab.jsx`) & Admin (`src/components/AdminKnowledgeModal.jsx`)**:
   - 3-view switcher (Reviews, Google Form, Admin sync) with smooth tab switching.
   - Review submission form with 5-star rating, confetti, and Sonner toast.
   - Google Sheets GViz cloud sync with `toast.promise` / `toast.loading` feedback.
   - Admin Knowledge modal with 4 segmented tabs, search filter, and knowledge import.
7. **Tab 7: Đấu trường Sử học (`src/tabs/QuizArenaTab.jsx`)**:
   - Quiz option buttons with spring feedback, correct/incorrect score feedback with sound and toast.
8. **Build & Quality Check**:
   - `npm run build` must succeed with exit code 0.
   - Zero console errors, responsive on Desktop and Mobile.

## Exclusive File Ownership
- `src/tabs/HomeTab.jsx`
- `src/tabs/TimelineTab.jsx`
- `src/tabs/BattleMapTab.jsx`
- `src/tabs/MuseumTab.jsx`
- `src/tabs/AiStationTab.jsx`
- `src/tabs/SurveyTab.jsx`
- `src/tabs/QuizArenaTab.jsx`
- `src/components/AdminKnowledgeModal.jsx`
- `src/App.css` (for tab-specific heritage styles, hairline borders, and micro-interactions)
