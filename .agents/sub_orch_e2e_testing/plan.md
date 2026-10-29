# Execution Plan — E2E Testing Track

## Objective
Establish a fully automated, rock-solid Playwright test harness and screenshot capture suite covering Tiers 1-4 and 18 verification screenshots (9 Desktop, 9 Mobile), verify against `http://localhost:3000`, validate through rigorous multi-agent review, adversarial challenge, and forensic audit, then publish `TEST_READY.md`.

## Work Breakdown Structure

### Step 1: Investigation (Explorer / Spec Miner)
- Spawn an Explorer (`teamwork_preview_explorer` or `teamwork_preview_spec_miner`) to:
  - Check current test setup, package dependencies (`@playwright/test`, `playwright`, `playwright-cli`).
  - Inspect DOM structure, test IDs, navigation selectors, intro modal dismiss triggers, battle selectors, museum modal trigger, AI station chat inputs, survey form fields, and admin modal triggers in the project.
  - Check if Vite dev server starts and responds at `localhost:3000`.
  - Provide a crisp implementation blueprint with precise selectors and commands for the Test Writer.

### Step 2: Implementation (Test Writer / Worker)
- Spawn a Worker (`teamwork_preview_test_writer` or `teamwork_preview_worker`) with Playwright skills to:
  - Create test directory (`tests/` or `e2e/`) and test runner scripts in `scripts/`.
  - Implement Tier 1 (Feature Coverage): Intro bypass, 6 main tabs navigation, header/nav active states, battle selectors, museum modal open/close, AI chat interaction, survey form submission, admin modal PIN unlock.
  - Implement Tier 2 (Boundary & Corner Cases): Form validation, invalid admin PIN, rapid tab switches, empty search queries, zero console errors.
  - Implement Tier 3 (Cross-Feature Combinations): Preserved state across tabs, toast stacking and dismissal with Sonner.
  - Implement Tier 4 (Real-World Student & Teacher Scenarios): Full end-to-end user workflows.
  - Implement Automated Screenshot Runner: Capture 18 high-res PNG screenshots into `screenshots/` (9 Desktop 1920x1080 and 9 Mobile 390x844) matching TEST_INFRA.md matrix exactly.
  - Run tests and screenshot script against dev server, verifying 100% pass and 0 console errors.

### Step 3: Independent Review (2 Reviewers)
- Spawn 2 `teamwork_preview_reviewer` subagents to:
  - Verify compliance with TEST_INFRA.md and SCOPE.md.
  - Check selector stability, assertion coverage, timeout safety, and zero console error listener.
  - Verify all 18 screenshots exist, are non-empty, and visually match required views.

### Step 4: Empirical Verification (2 Challengers)
- Spawn 2 `teamwork_preview_challenger` subagents to:
  - Stress-test the test runner.
  - Verify that tests actively catch genuine bugs and do not trivially pass on false positives.

### Step 5: Integrity Verification (Forensic Auditor)
- Spawn 1 `teamwork_preview_auditor` subagent to:
  - Conduct forensic check: ensure tests actually connect to Chrome/Playwright, execute against the real app, do not mock test results or hardcode success logs.

### Step 6: Gate & Publish
- Synthesize all verdicts in `GATE_STATUS.md`.
- When all pass, write and publish `d:\Projects\SchoolProjects\Su\.agents\TEST_READY.md`.
- Write `handoff.md` and send completion notification to parent orchestrator (`4dff887a-e2dd-40f4-84b6-f8bffd83e9fe`).
