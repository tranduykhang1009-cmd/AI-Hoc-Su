# Plan: Milestone 4 — 6 Tabs Deep Heritage Polish & Micro-Interactions

## Objective
Elevate all 6 main tabs (Home, Timeline, BattleMap, Museum, AiStation, Survey & Admin) plus Quiz Arena to international museum caliber by harmonizing Taste visual aesthetics, Emil Kowalski tactile physics, and Sonner notifications.

## Execution Steps

### Step 1: Worker Implementation (teamwork_preview_worker)
- **Target Files**:
  - `src/tabs/HomeTab.jsx`
  - `src/tabs/TimelineTab.jsx`
  - `src/tabs/BattleMapTab.jsx`
  - `src/tabs/MuseumTab.jsx`
  - `src/tabs/AiStationTab.jsx`
  - `src/tabs/SurveyTab.jsx`
  - `src/tabs/QuizArenaTab.jsx`
  - `src/components/AdminKnowledgeModal.jsx`
  - `src/App.css`
- **Requirements**:
  1. Tactile feedback: `whileTap={{ scale: 0.96 }}`, `whileHover={{ y: -2, scale: 1.01 }}` on all interactive elements.
  2. Visual tokens: Obsidian Black `#08090C`, Amber Gold `#F59E0B`/`#D97706`, Antique Bronze `#8C6D37`, refined hairline borders.
  3. Typography: Fraunces display for imperial titles, Be Vietnam Pro for scholarly body.
  4. Sonner notifications: Sonner toast triggers on review submit, cloud sync, link copy, bookmarking.
  5. Build verification: `npm run build` must exit 0.

### Step 2: Independent Reviewers (teamwork_preview_reviewer x2)
- Reviewer 1: Comprehensive design engineering, micro-interaction, and typography audit.
- Reviewer 2: Functional verification, Sonner integration, and build regression test.

### Step 3: Adversarial Challengers (teamwork_preview_challenger x2)
- Challenger 1: Interaction flow stress test, modal focus & escape handling, mobile responsiveness.
- Challenger 2: Edge cases in data display, search/filters, and toast triggers under stress.

### Step 4: Forensic Audit (teamwork_preview_auditor)
- Verify authentic implementation (no mock/dummy returns, no hardcoded bypasses).

### Step 5: Gate Verdict & Handoff
- Record all results in `GATE_STATUS.md`.
- Compile final `handoff.md` and notify parent orchestrator via `send_message`.
