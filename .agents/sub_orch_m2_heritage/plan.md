# Plan: Milestone 2 — Heritage Visual System & Anti-Slop (R1)

## Objectives
Establish an international museum-grade visual aesthetic for "Hào Khí Tây Sơn":
1. Refactor `:root` tokens in `src/App.css` to Obsidian Black `#08090C`, Imperial Amber Gold `#F59E0B`/`#D97706`, Antique Bronze `#8C6D37`, and subtle hairline borders.
2. Eliminate AI-slop in `src/tabs/HomeTab.jsx`: remove the 3 blurred background blobs (`.hero-bg-blob-left`, `.hero-bg-blob-right`, `.hero-bg-blob-center`).
3. Eliminate harsh neon glows in `src/App.css`: strip `.btn-battle-glow`, `.statue-gold-rim-glow`, `.bubble-glow-ring`, `.ambient-radial-glow`.
4. Refine multi-stop gradients into dignified museum depth overlays.
5. Enforce typography hierarchy between Fraunces/Newsreader display titles and Be Vietnam Pro body text.
6. Verify production build with `npm run build` (must exit 0).

## Execution Steps
- [x] Step 1: Initialize metadata (BRIEFING.md, DISPATCH.md, plan.md, progress.md) and heartbeat cron.
- [ ] Step 2: Prepare worker directory and dispatch `teamwork_preview_worker` with Taste skill.
- [ ] Step 3: Await worker handoff and verify build success.
- [ ] Step 4: Dispatch parallel Reviewers (2), Challengers (2), and Forensic Auditor (1).
- [ ] Step 5: Evaluate gate in `GATE_STATUS.md` (all verdicts must pass, auditor clean).
- [ ] Step 6: Write `handoff.md` and send completion notification to parent orchestrator.
