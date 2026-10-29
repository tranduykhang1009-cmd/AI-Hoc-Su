/**
 * Empirical Verification Harness for Milestone 2: Heritage Visual System & Anti-Slop (R1)
 * Challenger: challenger_m2_2
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_CSS_PATH = path.join(ROOT_DIR, 'src', 'App.css');
const HOME_TAB_PATH = path.join(ROOT_DIR, 'src', 'tabs', 'HomeTab.jsx');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');

console.log('--- Starting Empirical Verification for Milestone 2 ---');

let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    failedTests++;
  }
}

// 1. Verify CSS exists and is non-empty
const appCss = fs.readFileSync(APP_CSS_PATH, 'utf-8');
const homeTab = fs.readFileSync(HOME_TAB_PATH, 'utf-8');
const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

// Check 1: No legacy #0F0D0B in src/
runTest('No legacy #0F0D0B in App.css', () => {
  const match = appCss.match(/#0F0D0B/i);
  assert.strictEqual(match, null, `Found legacy #0F0D0B in App.css: ${match ? match[0] : ''}`);
});

runTest('Root defines --bg-canvas as Obsidian #08090C', () => {
  assert.ok(
    /--bg-canvas:\s*#08090C;/i.test(appCss),
    'Expected --bg-canvas: #08090C; in :root'
  );
});

runTest('Root defines --accent as Imperial Amber Gold #F59E0B', () => {
  assert.ok(
    /--accent:\s*#F59E0B;/i.test(appCss),
    'Expected --accent: #F59E0B; in :root'
  );
});

runTest('Root defines --bronze as Antique Bronze #8C6D37', () => {
  assert.ok(
    /--bronze:\s*#8C6D37;/i.test(appCss),
    'Expected --bronze: #8C6D37; in :root'
  );
});

// Check 2: Verify button hover states, hero statue frame, and floating chat bubble do not have neon blur artifacts
runTest('.btn-battle-glow does not have neon red/orange/yellow drop-shadow', () => {
  // Extract .btn-battle-glow rule
  const match = appCss.match(/\.btn-battle-glow\s*\{([^}]+)\}/);
  assert.ok(match, 'Found .btn-battle-glow rule');
  const body = match[1];
  assert.ok(!/rgba\(\s*220\s*,\s*38\s*,\s*38/i.test(body), 'Should not have red drop shadow');
  assert.ok(!/linear-gradient\(90deg,\s*#991B1B/i.test(body), 'Should not have red fire linear-gradient');
  assert.ok(!/filter:\s*blur/i.test(body), 'Should not have blur filter');
});

runTest('.btn-battle-glow:hover does not have neon red glow', () => {
  const match = appCss.match(/\.btn-battle-glow:hover\s*\{([^}]+)\}/);
  assert.ok(match, 'Found .btn-battle-glow:hover rule');
  const body = match[1];
  assert.ok(!/rgba\(\s*220\s*,\s*38\s*,\s*38/i.test(body), 'Hover should not have red drop shadow');
  assert.ok(!/rgba\(\s*245\s*,\s*158\s*,\s*11\s*,\s*0\.[6-9]/i.test(body), 'Hover should not have harsh neon glow');
});

runTest('.hero-statue-frame does not have 40px neon glow', () => {
  const match = appCss.match(/\.hero-statue-frame\s*\{([^}]+)\}/);
  assert.ok(match, 'Found .hero-statue-frame rule');
  const body = match[1];
  assert.ok(!/box-shadow:[^;]*0\s+0\s+40px/i.test(body), 'Should not have 0 0 40px neon rim glow');
  assert.ok(!/border:\s*3\.5px/i.test(body), 'Should not have 3.5px neon gold border');
});

runTest('.hero-statue-frame-editorial does not have neon blur', () => {
  const match = appCss.match(/\.hero-statue-frame-editorial\s*\{([^}]+)\}/);
  assert.ok(match, 'Found .hero-statue-frame-editorial rule');
  const body = match[1];
  assert.ok(!/box-shadow:[^;]*0\s+0\s+[2-9]\dpx/i.test(body), 'Should not have neon glow box-shadow');
});

runTest('.floating-chat-bubble-btn does not have fire red-orange gradient or harsh neon box-shadow', () => {
  const match = appCss.match(/\.floating-chat-bubble-btn\s*\{([^}]+)\}/);
  assert.ok(match, 'Found .floating-chat-bubble-btn rule');
  const body = match[1];
  assert.ok(!/#FF4500/i.test(body), 'Should not have #FF4500');
  assert.ok(!/#DC2626/i.test(body), 'Should not have #DC2626');
  assert.ok(!/linear-gradient/i.test(body), 'Should use obsidian surface background, not gradient');
});

runTest('.bubble-glow-ring does not have neon pulse animation or saturated background', () => {
  const match = appCss.match(/\.bubble-glow-ring\s*\{([^}]+)\}/);
  assert.ok(match, 'Found .bubble-glow-ring rule');
  const body = match[1];
  assert.ok(/background:\s*transparent;/i.test(body), 'bubble-glow-ring should be transparent');
  assert.ok(!/animation:[^;]*pulse/i.test(body), 'Should not have pulsing neon animation');
});

// Check 3: prefers-reduced-motion
runTest('@media (prefers-reduced-motion: reduce) is properly structured', () => {
  const match = appCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([^}]+(?:\{[^}]+\}[^}]*)*)\}/);
  assert.ok(match, 'Found @media (prefers-reduced-motion: reduce)');
  const inner = match[1];
  assert.ok(inner.includes('animation-duration: 0.01ms !important'), 'Includes animation-duration: 0.01ms !important');
  assert.ok(inner.includes('transition-duration: 0.01ms !important'), 'Includes transition-duration: 0.01ms !important');
  assert.ok(inner.includes('scroll-behavior: auto !important'), 'Includes scroll-behavior: auto !important');
});

// Check 4: HomeTab.jsx does not render hero-bg-blob-*
runTest('HomeTab.jsx hero-bg-blob-* elements are removed', () => {
  assert.ok(!homeTab.includes('hero-bg-blob-left'), 'hero-bg-blob-left should not exist in HomeTab');
  assert.ok(!homeTab.includes('hero-bg-blob-right'), 'hero-bg-blob-right should not exist in HomeTab');
  assert.ok(!homeTab.includes('hero-bg-blob-center'), 'hero-bg-blob-center should not exist in HomeTab');
});

console.log(`\nResults: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('All empirical assertions PASSED!\n');
}
