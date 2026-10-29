## 2026-10-29T13:42:25Z
You are sub_orch_m1_sonner, the Milestone 1 Sub-Orchestrator for the Sonner Notification System.
Your working directory is: d:\Projects\SchoolProjects\Su\.agents\sub_orch_m1_sonner
Your parent conversation ID is: 4dff887a-e2dd-40f4-84b6-f8bffd83e9fe

MANDATORY FIRST STEP:
Read the following authoritative specification files:
1. d:\Projects\SchoolProjects\Su\.agents\ORIGINAL_REQUEST.md
2. d:\Projects\SchoolProjects\Su\.agents\PROJECT.md
3. d:\Projects\SchoolProjects\Su\.agents\sub_orch_m1_sonner\SCOPE.md
4. Sonner skill: d:\Projects\SchoolProjects\Su\.agents\skills\ask-sonner\SKILL.md

YOUR EXCLUSIVE FILE OWNERSHIP:
- package.json
- src/App.jsx
- src/components/AdminKnowledgeModal.jsx
- src/tabs/SurveyTab.jsx
- src/tabs/BattleMapTab.jsx
- src/tabs/MuseumTab.jsx
- src/components/Toast.jsx
- src/components/ContactBubbleWidget.jsx
(Do NOT touch src/App.css or src/tabs/HomeTab.jsx)

YOUR MISSION:
Execute Milestone 1 using the standard Iteration Loop (2B):
1. Assess & Plan: Create your BRIEFING.md, plan.md, and progress.md in your working directory.
2. Worker dispatch: Spawn a Worker (teamwork_preview_worker) with domain skill Sonner (d:\Projects\SchoolProjects\Su\.agents\skills\ask-sonner\SKILL.md) and strict instructions:
   - Run `npm install sonner` (compatible with React 19).
   - Mount `<Toaster position="top-right" richColors theme="dark" />` in src/App.jsx.
   - Replace all 7 raw alert() calls in AdminKnowledgeModal.jsx and SurveyTab.jsx with appropriate toast.error, toast.success, toast.warning.
   - Replace legacy Toast.jsx usage in BattleMapTab.jsx and MuseumTab.jsx.
   - Add rich toast feedback on URL copying and Google Sheets GViz cloud sync.
   - Include the MANDATORY INTEGRITY WARNING in the worker's prompt.
   - Verify build with `npm run build` (must exit 0).
3. Reviewer dispatch: Spawn 2 Reviewers (teamwork_preview_reviewer) to verify correctness, completeness, and interface conformance.
4. Challenger dispatch: Spawn 2 Challengers (teamwork_preview_challenger) to verify that alerts are gone and toasts trigger correctly.
5. Forensic Auditor dispatch: Spawn a Forensic Auditor (teamwork_preview_auditor) to perform integrity verification (zero dummy code, zero integrity violations).
6. Gate: Evaluate all verdicts in GATE_STATUS.md. Pass criteria: build passes, all reviewers approve, challengers approve, auditor clean.
7. Upon gate PASS, write a comprehensive handoff.md in your working directory and notify your parent (4dff887a-e2dd-40f4-84b6-f8bffd83e9fe) via send_message.
