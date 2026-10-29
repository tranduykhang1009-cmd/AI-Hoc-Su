# Milestone 1 Plan: Sonner Notification System

## Scope & Deliverables
- Install `sonner` package compatible with React 19.
- Mount `<Toaster position="top-right" richColors theme="dark" />` in `src/App.jsx`.
- Replace all 7 raw `alert()` calls in `src/components/AdminKnowledgeModal.jsx` and `src/tabs/SurveyTab.jsx`.
- Replace legacy `Toast.jsx` usage in `src/tabs/BattleMapTab.jsx` and `src/tabs/MuseumTab.jsx`.
- Clean up / deprecate `src/components/Toast.jsx`.
- Add rich toast feedback on URL copying, ContactBubbleWidget email copying, and Google Sheets GViz cloud sync.
- Verify `npm run build` exits with code 0.

## Iteration Loop (2B)
1. **Worker Implementation**:
   - Agent: `teamwork_preview_worker`
   - Armed with Sonner skill (`d:\Projects\SchoolProjects\Su\.agents\skills\ask-sonner\SKILL.md`)
   - Mandatory Integrity Warning included.
   - Files owned: `package.json`, `src/App.jsx`, `src/components/AdminKnowledgeModal.jsx`, `src/tabs/SurveyTab.jsx`, `src/tabs/BattleMapTab.jsx`, `src/tabs/MuseumTab.jsx`, `src/components/Toast.jsx`, `src/components/ContactBubbleWidget.jsx`.
   - Verification: run `npm run build`.
2. **Reviewers**:
   - Spawn 2 `teamwork_preview_reviewer` independently.
   - Review code quality, complete elimination of raw alerts and legacy toasts, correct Sonner API usage (`toast.success`, `toast.error`, `toast.warning`, `toast.info`).
   - Run verification builds.
3. **Challengers**:
   - Spawn 2 `teamwork_preview_challenger`.
   - Grep/AST search for any remaining `alert(` or broken references.
   - Verify toast triggering logic on interactions.
4. **Forensic Auditor**:
   - Spawn 1 `teamwork_preview_auditor`.
   - Integrity forensics: verify zero dummy code, genuine dependency installation, proper function calls, zero cheating.
5. **Gate**:
   - Record verdicts in `GATE_STATUS.md`.
   - All pass -> Write `handoff.md`, notify parent orchestrator via `send_message`.
