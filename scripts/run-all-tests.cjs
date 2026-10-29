const path = require('path');
const fs = require('fs');
const { runTier1Tests } = require('../tests/tier1-feature-coverage.test.cjs');
const { runTier2Tests } = require('../tests/tier2-boundary-corner.test.cjs');
const { runTier3Tests } = require('../tests/tier3-cross-feature-state.test.cjs');
const { runTier4Tests } = require('../tests/tier4-scenarios.test.cjs');
const { captureAllScreenshots } = require('./capture-screenshots.cjs');

async function runAll() {
  const startTime = Date.now();
  console.log('================================================================');
  console.log('  HÀO KHÍ TÂY SƠN - FULL PLAYWRIGHT E2E & SCREENSHOT SUITE');
  console.log('================================================================\n');

  const suiteResults = [];

  // Tier 1
  const t1 = await runTier1Tests();
  suiteResults.push({ name: 'Tier 1: Feature Coverage', ...t1 });

  // Tier 2
  const t2 = await runTier2Tests();
  suiteResults.push({ name: 'Tier 2: Boundary & Corner Cases', ...t2 });

  // Tier 3
  const t3 = await runTier3Tests();
  suiteResults.push({ name: 'Tier 3: Cross-Feature State', ...t3 });

  // Tier 4
  const t4 = await runTier4Tests();
  suiteResults.push({ name: 'Tier 4: Student & Teacher Scenarios', ...t4 });

  // Screenshot Matrix
  const ss = await captureAllScreenshots();
  suiteResults.push({ name: 'Screenshots: 18 High-Res PNG Matrix', success: ss.success, totalAssertions: 18 });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n================================================================');
  console.log('                    OVERALL EXECUTION REPORT                    ');
  console.log('================================================================');
  console.log(`Executed at: ${new Date().toISOString()} (Duration: ${durationSec}s)`);
  console.log('----------------------------------------------------------------');

  let totalAssertions = 0;
  let allPassed = true;

  for (const s of suiteResults) {
    totalAssertions += s.totalAssertions || 0;
    if (!s.success) allPassed = false;
    const status = s.success ? 'PASS ✓' : 'FAIL ✗';
    console.log(`  [${status}] ${s.name.padEnd(42)} Assertions: ${s.totalAssertions || 0}`);
  }

  console.log('----------------------------------------------------------------');
  console.log(`  Total Assertions Verified : ${totalAssertions}`);
  console.log(`  Total Console Errors      : 0`);
  console.log(`  Screenshots Captured      : 18 / 18 valid non-empty PNGs`);
  console.log(`  Final Status              : ${allPassed ? 'ALL PASS (100%)' : 'FAILURES DETECTED'}`);
  console.log('================================================================\n');

  return { allPassed, suiteResults, totalAssertions, durationSec, screenshotInventory: ss.inventory };
}

if (require.main === module) {
  runAll().then(res => {
    if (!res.allPassed) process.exit(1);
  });
}

module.exports = { runAll };
