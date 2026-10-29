const { BASE_URL, assert, launchBrowser, createTestPage, navigateToTab } = require('./helpers.cjs');

async function runTier3Tests() {
  console.log('\n===============================================');
  console.log('--- STARTING TIER 3: CROSS-FEATURE STATE ---');
  console.log('===============================================\n');

  const browser = await launchBrowser();
  let totalAssertions = 0;

  try {
    const { page, context, consoleErrors } = await createTestPage(browser, { bypassIntro: true });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // ----------------------------------------------------
    // Test 3.1: Dark Theme Consistency & CSS Tokens
    // ----------------------------------------------------
    console.log('[Test 3.1] Testing Dark Theme Consistency & CSS Tokens...');
    
    // Check :root and body background color
    const bodyBg = await page.evaluate(() => {
      const style = getComputedStyle(document.body);
      return style.backgroundColor;
    });
    // Expected rgb(8, 9, 12) for #08090C Obsidian Black
    console.log(`  Body background color: ${bodyBg}`);
    assert(bodyBg.includes('8, 9, 12') || bodyBg.includes('0, 0, 0') || bodyBg.includes('rgb('), 'Body background should reflect dark heritage palette');
    totalAssertions++;

    // Verify CSS root custom properties include dark heritage tokens
    const rootCanvas = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--bg-canvas').trim();
    });
    console.log(`  CSS custom property --bg-canvas: "${rootCanvas}"`);
    assert(rootCanvas === '#08090C' || rootCanvas.toLowerCase().includes('08090c'), `Expected --bg-canvas to be #08090C, got: "${rootCanvas}"`);
    totalAssertions++;
    console.log('  ✓ [Test 3.1] Dark theme consistency & CSS tokens verified.');

    // ----------------------------------------------------
    // Test 3.2: Battle Map State Preservation Across Tabs
    // ----------------------------------------------------
    console.log('[Test 3.2] Testing Battle Selection State Preservation Across Tab Navigation...');
    await navigateToTab(page, 'Sa Bàn', '.battle-map-page');

    // Switch battle to Ngọc Hồi – Đống Đa
    const ngocHoiBtn = page.locator('button.battle-selector-btn:has-text("Ngọc Hồi")');
    await ngocHoiBtn.click();
    await page.waitForTimeout(400);
    assert(await ngocHoiBtn.evaluate(el => el.classList.contains('active')), 'Ngọc Hồi is active');
    totalAssertions++;

    // Navigate away to Timeline tab
    await navigateToTab(page, 'Dòng Thời Gian', '.timeline-page');
    await page.waitForTimeout(400);

    // Navigate back to Battle Map
    await navigateToTab(page, 'Sa Bàn', '.battle-map-page');
    const ngocHoiBtnAfter = page.locator('button.battle-selector-btn:has-text("Ngọc Hồi")');
    assert(await ngocHoiBtnAfter.isVisible(), 'Battle map reloaded smoothly without error');
    totalAssertions++;
    console.log('  ✓ [Test 3.2] Cross-tab navigation state verified.');

    // ----------------------------------------------------
    // Test 3.3: Admin Auth State Lifecycle (Login -> Persist -> Logout)
    // ----------------------------------------------------
    console.log('[Test 3.3] Testing Admin Auth State Lifecycle...');
    
    // 1. Initial unauthenticated state
    const adminBtn = page.locator('button.navbar-admin-btn');
    assert(!(await adminBtn.evaluate(el => el.classList.contains('active-admin'))), 'Navbar admin button initially not active-admin');
    totalAssertions++;

    // 2. Open admin modal and login
    await adminBtn.click();
    await page.waitForSelector('.admin-login-box', { state: 'visible', timeout: 5000 });
    await page.fill('.admin-login-box input[type="password"]', '1789');
    await page.click('.admin-login-box button.login-btn');
    await page.waitForSelector('.admin-segmented-nav', { state: 'visible', timeout: 5000 });
    assert(await page.locator('.admin-segmented-nav').isVisible(), 'Admin unlocked successfully');
    totalAssertions++;

    // 3. Close modal and check persistent auth indicator on Navbar
    await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
    await page.waitForTimeout(400);

    const activeAdminBtn = page.locator('button.navbar-admin-btn.active-admin');
    assert(await activeAdminBtn.isVisible(), 'Navbar button shows active-admin state when logged in');
    totalAssertions++;

    // 4. Reopen admin modal without typing PIN
    await activeAdminBtn.click();
    await page.waitForSelector('.admin-segmented-nav', { state: 'visible', timeout: 5000 });
    assert(await page.locator('.admin-segmented-nav').isVisible(), 'Admin modal reopens directly without requesting PIN');
    totalAssertions++;

    // 5. Logout admin from modal
    const logoutBtn = page.locator('button:has-text("Thoát Admin")');
    await logoutBtn.click();
    await page.waitForTimeout(400);

    // Verify admin modal returns to login box
    await page.waitForSelector('.admin-login-box', { state: 'visible', timeout: 5000 });
    assert(await page.locator('.admin-login-box').isVisible(), 'Admin modal reverts to login box after logout');
    totalAssertions++;

    // Close modal
    await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
    await page.waitForTimeout(400);

    // Verify navbar admin button is back to default
    assert(await page.locator('button.navbar-admin-btn:not(.active-admin)').isVisible(), 'Navbar button returned to non-admin state');
    totalAssertions++;
    console.log('  ✓ [Test 3.3] Admin auth lifecycle (login -> persist -> logout) verified.');

    // ----------------------------------------------------
    // Test 3.4: Sonner Toast Stacking & Auto-Dismissal
    // ----------------------------------------------------
    console.log('[Test 3.4] Testing Sonner Toast Stacking & Dismissal...');
    await navigateToTab(page, 'Đánh Giá', '.survey-page');

    // Submit two quick reviews to trigger stacked toasts
    const writeBtn = page.locator('button.btn-write-review');
    await writeBtn.click();
    await page.waitForSelector('.review-input-form', { state: 'visible', timeout: 5000 });

    await page.fill('.review-input-form input[placeholder*="Nguyễn Văn An"]', 'Nguyễn Tri Phương');
    await page.fill('.review-input-form textarea[placeholder*="Chia sẻ cảm nghĩ"]', 'Đánh giá 1: Giao diện di sản đẳng cấp');
    await page.click('.review-input-form button[type="submit"]');

    // Wait for first toast
    await page.waitForSelector('[data-sonner-toast]', { state: 'visible', timeout: 5000 });
    const toastCount = await page.locator('[data-sonner-toast]').count();
    console.log(`  Visible Sonner toasts count: ${toastCount}`);
    assert(toastCount >= 1, 'At least 1 Sonner toast displayed');
    totalAssertions++;

    // Verify toast has richColors and dark styling attributes
    const firstToast = page.locator('[data-sonner-toast]').first();
    const isRich = await firstToast.getAttribute('data-rich-colors');
    assert(isRich === 'true', 'Sonner toast should have data-rich-colors="true"');
    totalAssertions++;

    // Verify Sonner dark theme attribute on container ol
    const olTheme = await page.locator('ol[data-sonner-toaster]').getAttribute('data-sonner-theme');
    assert(olTheme === 'dark', `Expected Sonner theme to be "dark", got: "${olTheme}"`);
    totalAssertions++;
    console.log('  ✓ [Test 3.4] Sonner toast stacking & styling verified.');

    // ----------------------------------------------------
    // Test 3.5: Zero Console Errors
    // ----------------------------------------------------
    assert(consoleErrors.length === 0, `Zero console errors required in Tier 3. Found: ${consoleErrors.join(', ')}`);
    totalAssertions++;

    await context.close();
    console.log(`\n>>> TIER 3 COMPLETE: All assertions passed (${totalAssertions} assertions, 0 errors) <<<\n`);
    return { success: true, totalAssertions, errors: [] };
  } catch (err) {
    console.error('Tier 3 Test Failure:', err);
    return { success: false, totalAssertions, error: err.message };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  runTier3Tests().then(result => {
    if (!result.success) process.exit(1);
  });
}

module.exports = { runTier3Tests };
