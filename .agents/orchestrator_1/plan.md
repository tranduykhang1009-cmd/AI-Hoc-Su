# Orchestration Master Plan: Hào Khí Tây Sơn Awwwards Upgrade

## Objectives
1. Eliminate all AI-slop / generic web game styles; establish a high-end Digital Heritage Museum visual design (Obsidian `#08090C`, Amber Gold `#F59E0B`, Antique Bronze, elegant typography & spacing rhythm).
2. Implement Emil Kowalski motion craft: Framer Motion v12 spring physics (`stiffness: 350, damping: 28`), tactile button micro-interactions, layoutId pill tabs, prefers-reduced-motion support, strictly composite-only 60fps animations.
3. Integrate official `sonner` toast system for all alerts, copying, Google Sheets sync, and form actions.
4. Set up Playwright automated browser test suite and capture desktop & mobile screenshots verifying layout, interactions, and zero console errors.

## Phase 0: Survey & Discovery (Current)
- Spawn 3 parallel Explorers:
  1. Explorer 1 (`survey_codebase`): Investigate current frontend stack (React/Vite/Next, Tailwind, CSS vars, components layout, 6 main tabs, dependencies).
  2. Explorer 2 (`survey_design_motion`): Investigate current styling, themes, colors, motion implementations, animations, cards, buttons, tabs.
  3. Spec Miner / Explorer 3 (`survey_playwright_test`): Investigate test setup, scripts, Playwright availability, port/dev server startup commands, interactive flows across the 6 tabs.

## Phase 1: Architecture & Decomposition
- Merge explorer findings into `PROJECT.md` (Feature Inventory, Architecture, Code Layout, Interface Contracts).
- Set up `TEST_INFRA.md` for Playwright E2E testing track.

## Phase 2: Dual Track Execution
- Implementation Track:
  - M1: Sonner Toast Infrastructure (`npm install sonner`, `<Toaster />`, replacement of alerts/notifications).
  - M2: Visual Design System (Obsidian Black palette, Amber Gold accents, typography, spacing rhythm, anti-slop overhaul).
  - M3: Emil Kowalski Motion System (Framer Motion spring curves, tactile micro-interactions, pill tab navigation).
  - M4: Deep Tab Polish across all 6 tabs (Trang chủ, Dòng thời gian, Sa bàn, Bảo tàng, Sử quan AI, Khảo sát & Admin).
- E2E Testing Track (Playwright CLI):
  - Setup Playwright test runner, create comprehensive test cases for all 6 tabs, take Desktop and Mobile screenshots.
  - Publish `TEST_READY.md`.

## Phase 3: Verification & Gate Checks
- Iterate on any failing tests or visual defects.
- Run Forensic Auditor to guarantee authentic, high-quality implementation.
- Capture full suite of acceptance screenshots.

## Phase 4: Delivery
- Synthesize all artifacts, verify criteria, write final handoff, and report to Sentinel parent.
