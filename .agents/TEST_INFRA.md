# E2E Test Infra: Hào Khí Tây Sơn

## Test Philosophy
- Opaque-box, requirement-driven.
- Automated using Playwright CLI (`playwright-cli`, v0.1.22) with Chromium engine.
- Methodologies: Category-Partition, Boundary Value Analysis, Pairwise Combinations, Real-World Student Study Workflow.

## Feature Inventory & Test Mapping
| # | Feature | Requirement | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|:---:|:---:|:---:|
| 1 | 3D Intro Modal Bypass | R4 | ✓ | ✓ | ✓ |
| 2 | HomeTab Hero & Bento Cards | R1, R2, R4 | ✓ | ✓ | ✓ |
| 3 | TimelineTab Chronology & Filters | R1, R2, R4 | ✓ | ✓ | ✓ |
| 4 | BattleMapTab Battles & Layers | R1, R2, R3, R4 | ✓ | ✓ | ✓ |
| 5 | MuseumTab Search & Plaque Modal | R1, R2, R3, R4 | ✓ | ✓ | ✓ |
| 6 | AiStationTab Imperial Chatbot | R1, R2, R4 | ✓ | ✓ | ✓ |
| 7 | SurveyTab Form, GViz & Toasts | R1, R2, R3, R4 | ✓ | ✓ | ✓ |
| 8 | AdminKnowledgeModal Tabs & PIN | R1, R2, R3, R4 | ✓ | ✓ | ✓ |
| 9 | Sonner Toast Stack & Dismissal | R3, R4 | ✓ | ✓ | ✓ |

## Test Architecture
- **Dev Server**: `npx vite --port 3000 --no-open`
- **Runner**: Node.js script invoking Playwright directly via `@playwright/test` or `playwright` or `playwright-cli` session commands.
- **Pass/Fail Criteria**:
  - Exit code 0 on all test assertions.
  - Zero unhandled JavaScript errors or fatal exceptions in console (`page.on('console', msg => ...)`).
  - All visual elements render within viewport bounds without layout clipping.
- **Output Artifacts**:
  - 18 Desktop (1920x1080) and Mobile (390x844) PNG screenshots saved to `d:\Projects\SchoolProjects\Su\screenshots/`.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|---|---|---|
| 1 | Complete Student Journey | Intro -> Home -> Timeline (Filter Tây Sơn) -> Battle Map (Ngọc Hồi Đống Đa quiz) -> Museum (Search súng thần công) -> AI Historian (Ask Quang Trung tactics) -> Survey (Submit 5-star review with Sonner toast) | High |
| 2 | Teacher / Admin Audit Journey | Enter Admin PIN `1789` -> Check Review Sync -> Inspect Knowledge Base -> Test Toast Alerts -> Exit Admin | Medium |

## Visual Screenshot Matrix (18 Images)
- Desktop (1920x1080):
  1. `desktop-01-home.png`
  2. `desktop-02-timeline.png`
  3. `desktop-03-battlemap-rachgam.png`
  4. `desktop-04-battlemap-ngochoi.png`
  5. `desktop-05-museum-gallery.png`
  6. `desktop-06-museum-modal.png`
  7. `desktop-07-ai-station.png`
  8. `desktop-08-survey-form.png`
  9. `desktop-09-admin-modal.png`
- Mobile (390x844):
  10. `mobile-01-home.png`
  11. `mobile-02-navbar-drawer.png`
  12. `mobile-03-timeline.png`
  13. `mobile-04-battlemap.png`
  14. `mobile-05-museum-gallery.png`
  15. `mobile-06-museum-modal.png`
  16. `mobile-07-ai-station.png`
  17. `mobile-08-survey.png`
  18. `mobile-09-admin.png`
