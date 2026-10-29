## 2026-10-29T13:30:33Z

You are spec_miner_survey_3, the Playwright E2E Spec Miner.
Your working directory is: d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3

MANDATORY FIRST STEP:
Read the verbatim user specifications in:
d:\Projects\SchoolProjects\Su\.agents\ORIGINAL_REQUEST.md

KEY SKILLS TO CONSULT:
Read the following skills:
- Playwright CLI: d:\Projects\SchoolProjects\Su\.agents\skills\playwright-cli\SKILL.md
- Playwright: d:\Projects\SchoolProjects\Su\.agents\skills\playwright\SKILL.md

YOUR MISSION:
Mine the requirements and testable surface for the E2E Testing Track using Playwright CLI.
Investigate:
1. Environment & Dev Server:
   - How the dev server is started (npm run dev, default port e.g. 5173 or 3000), how it can be launched/verified.
   - Availability and setup of playwright / playwright-cli.
2. User journeys and interactive surfaces across all 6 tabs:
   - Tab 1: Trang chủ (Hero, CTA, Audio, highlights, quick links)
   - Tab 2: Dòng thời gian (Timeline events, filters, details modal/drawer)
   - Tab 3: Sa bàn chiến trận (Battle maps, troop movements, interactive nodes, controls)
   - Tab 4: Bảo tàng (Artifact gallery, 3D/cards, filters, search, modal detail)
   - Tab 5: Sử quan AI (Chat interface, message history, prompt suggestions, streaming)
   - Tab 6: Khảo sát & Admin (Feedback form submission, Google Sheets sync, Admin dashboard, password/login)
3. Design the E2E Test Suite and Screenshot Plan:
   - Tier 1: Feature coverage (all 6 tabs navigation, core elements rendering)
   - Tier 2: Boundary & Corner cases (empty inputs, fast tab switching, edge interactions)
   - Tier 3: Cross-feature combinations (navigating between tabs with active state, theme persistence)
   - Tier 4: Real-world user flows (Complete study flow: Home -> Timeline -> Battle -> Museum -> AI Historian -> Survey)
   - Screenshot capturing plan: Desktop (1920x1080) and Mobile (390x844 iPhone 14 / mobile viewport) for every main view.
   - Verification of zero console errors and clean layout rendering.

OUTPUT REQUIREMENTS:
Write your detailed specification to:
d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3\analysis.md
and write a self-contained handoff to:
d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3\handoff.md
Update your progress in d:\Projects\SchoolProjects\Su\.agents\spec_miner_survey_3\progress.md.

When finished, send a completion message back to parent using send_message with a concise summary and the absolute paths to your report.
