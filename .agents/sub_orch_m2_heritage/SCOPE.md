# Scope: Milestone 2 — Taste Heritage Visual System & Anti-Slop (R1)

## Status: DONE
- **Gate Result**: PASS (Iteration 1)
- **Verified by**: reviewer_m2_1 (APPROVE), reviewer_m2_2 (APPROVE), challenger_m2_1 (APPROVE), challenger_m2_2 (APPROVE), auditor_m2_1 (CLEAN)
- **Build Status**: `npm run build` exits 0 (2692 modules transformed)

## Objective
Apply Taste Skill v2 art direction to establish an international museum-grade visual aesthetic for "Hào Khí Tây Sơn", eradicating all AI-slop patterns, raw neon glows, and muddy color tokens.

## Scope Deliverables
1. Refactor Color Tokens in `src/App.css` [COMPLETED]:
   - Canvas background: Obsidian Black `--bg-canvas: #08090C;` (replacing `#0F0D0B`)
   - Surface: `--bg-surface: #121318;`, Elevated: `--bg-elevated: #1B1C23;`
   - Primary Accent: Imperial Amber Gold `--accent: #F59E0B;`, `--accent-hover: #D97706;`, `--accent-subtle: rgba(245, 158, 11, 0.12);`
   - Secondary Metallic: Antique Bronze `--bronze: #8C6D37;`, `--bronze-subtle: rgba(140, 109, 55, 0.15);`
   - Hairline borders: 1px subtle metallic boundaries (`rgba(245, 158, 11, 0.15)` or `rgba(255, 255, 255, 0.08)`)
2. Eradicate AI-Slop & Neon Artifacts [COMPLETED]:
   - In `src/tabs/HomeTab.jsx`: eliminated the 3 blurred colored blobs (`.hero-bg-blob-left`, `.hero-bg-blob-right`, `.hero-bg-blob-center`).
   - In `src/App.css`: stripped neon glowing box-shadows (`.btn-battle-glow`, `.statue-gold-rim-glow`, `.bubble-glow-ring`, `.ambient-radial-glow`).
   - Tamed multi-stop bright gradients into refined, deep museum depth overlays.
3. Typography & Spacing Rhythm [COMPLETED]:
   - Enforced clear visual hierarchy between Fraunces/Newsreader display titles and Be Vietnam Pro reading text.
   - Refined letter-spacing and line-height for imperial grandeur and scholarly legibility.
4. Verify production build (`npm run build`) with zero CSS syntax or layout errors [COMPLETED: exit 0].

## Exclusive File Ownership
- `src/App.css`
- `src/tabs/HomeTab.jsx`
