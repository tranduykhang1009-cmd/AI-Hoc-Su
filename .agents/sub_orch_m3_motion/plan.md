# Milestone 3 Execution Plan: Emil Kowalski Motion Craft & Micro-Interactions (R2)

## Goal
Implement world-class Emil Kowalski motion craft using Framer Motion v12 in the designated components, achieving 60fps composite-only animations, smooth shared layout sliding pills, tactile button micro-interactions, trigger-anchored popovers, and reduced-motion accessibility.

## Plan Steps
1. **Worker Dispatch (`teamwork_preview_worker`)**:
   - Assign directory `.agents/worker_m3_1/`.
   - Provide domain skill references:
     - `d:\Projects\SchoolProjects\Su\.agents\skills\emil-kowalski\SKILL.md`
     - `d:\Projects\SchoolProjects\Su\.agents\skills\emil-design-eng\SKILL.md`
     - `d:\Projects\SchoolProjects\Su\.agents\skills\animate\SKILL.md`
   - Explicitly instruct changes on owned files:
     - `src/components/Navbar.jsx`: Add `layoutId="nav-active-pill"` to the active tab indicator pill with spring transition `{ type: "spring", stiffness: 350, damping: 28 }`. Inject tactile feedback `whileTap={{ scale: 0.96 }}` and hover lift `whileHover={{ y: -2, scale: 1.01 }}` on nav items.
     - `src/components/AdminKnowledgeModal.jsx`: Add `layoutId="admin-active-pill"` to the active sub-tab pill with spring transition. Add tactile feedback to modal buttons and tab switches.
     - `src/components/FloatingAiWidget.jsx`: Set `transformOrigin: "bottom right"` on the expanding popover panel. Add spring entrance/exit and tactile trigger feedback.
     - `src/components/ContactBubbleWidget.jsx`: Set `transformOrigin: "bottom right"` on the expanding popover panel. Add spring entrance/exit and tactile trigger feedback.
     - `src/App.css`: Add global `@media (prefers-reduced-motion: reduce)` rules overriding animations to instant opacity/fade transitions. Add helper classes for smooth spring transitions.
   - Enforce mandatory integrity warning.
   - Require `npm run build` verification in handoff.
2. **Reviewer Dispatch (2 x `teamwork_preview_reviewer`)**:
   - `reviewer_m3_1` and `reviewer_m3_2` independently review code changes, adherence to Emil Kowalski motion principles, build verification, and absence of layout shift.
3. **Challenger Dispatch (2 x `teamwork_preview_challenger`)**:
   - `challenger_m3_1` and `challenger_m3_2` test for:
     - Shared layoutId behavior and absence of visual glitches.
     - Spring configuration correctness (`stiffness: 350, damping: 28`).
     - Composite-only properties (`transform`, `opacity`) avoiding layout thrashing.
     - Proper reduced motion support.
4. **Forensic Auditor Dispatch (`teamwork_preview_auditor`)**:
   - `auditor_m3_1` checks for genuine logic, absence of mock bypasses, and authentic implementation.
5. **Gate Evaluation**:
   - Record verdicts in `GATE_STATUS.md`.
   - If all criteria pass, finalize handoff and notify parent orchestrator.
