# Scope: Milestone 3 — Emil Kowalski Motion Craft (R2)

## Objective
Apply Emil Kowalski motion engineering principles and Framer Motion v12 to elevate website interactivity to fluid, tactile 60fps luxury standards.

## Scope Deliverables
1. Shared Layout Sliding Pill Navigation (`layoutId`):
   - In `src/components/Navbar.jsx`: implement Framer Motion shared layout `layoutId="nav-active-pill"` on the active tab indicator so the pill glides smoothly across nav items instead of jumping or flashing.
   - In `src/components/AdminKnowledgeModal.jsx`: implement shared layout `layoutId="admin-active-pill"` for the 4 segmented admin tabs.
2. Tactile Micro-Interactions:
   - Add tactile press feedback `whileTap={{ scale: 0.96 }}` and hover lift `whileHover={{ y: -2, scale: 1.01 }}` across primary buttons, nav items, and floating triggers.
3. Spring Physics & Easing Curves:
   - Replace linear / ease-in / fixed duration transitions with Emil Kowalski spring physics (`type: "spring", stiffness: 350, damping: 28`) and natural deceleration curve `cubic-bezier(0.16, 1, 0.3, 1)`.
4. Trigger-Anchored Origin:
   - In `src/components/FloatingAiWidget.jsx` and `src/components/ContactBubbleWidget.jsx`: set popover origin to `transformOrigin: "bottom right"` so panels expand outward from their floating trigger button.
5. 60fps Budget & Reduced Motion Accessibility:
   - Guarantee strictly composite-only properties (`transform`, `opacity`).
   - Respect `@media (prefers-reduced-motion: reduce)` globally so users with vestibular sensitivity experience immediate, non-animated state changes.
6. Verify production build (`npm run build`) with exit code 0.

## Exclusive File Ownership
- `src/components/Navbar.jsx`
- `src/components/AdminKnowledgeModal.jsx`
- `src/components/FloatingAiWidget.jsx`
- `src/components/ContactBubbleWidget.jsx`
- `src/App.css` (for motion helper classes, spring transitions, and reduced motion rules)

## Milestone Status
Status: **DONE**
Gate: **PASS** (Worker DONE, Reviewer 1 APPROVE, Reviewer 2 APPROVE, Challenger 1 APPROVE, Challenger 2 APPROVE, Auditor CLEAN)
Production Build: `npm run build` exit code 0 (`✓ built in 6.12s`)
