const { BASE_URL, assert, launchBrowser, createTestPage, navigateToTab } = require('./helpers.cjs');

async function runTier2Tests() {
  console.log('\n=================================================');
  console.log('--- STARTING TIER 2: BOUNDARY & CORNER CASES ---');
  console.log('=================================================\n');

  const browser = await launchBrowser();
  let totalAssertions = 0;

  try {
    const { page, context, consoleErrors } = await createTestPage(browser, { bypassIntro: true });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // ----------------------------------------------------
    // Test 2.1: Survey Form Validation on Empty Inputs
    // ----------------------------------------------------
    console.log('[Test 2.1] Testing Survey Form Validation (Empty Fields)...');
    await navigateToTab(page, 'Đánh Giá', '.survey-page');

    const writeBtn = page.locator('button.btn-write-review');
    await writeBtn.click();
    await page.waitForSelector('.review-input-form', { state: 'visible', timeout: 5000 });

    // 1. Verify HTML5 required constraint on empty inputs
    const nameInput = page.locator('.review-input-form input[placeholder*="Nguyễn Văn An"]');
    const commentInput = page.locator('.review-input-form textarea[placeholder*="Chia sẻ cảm nghĩ"]');
    await nameInput.fill('');
    await commentInput.fill('');

    const isNameValid = await nameInput.evaluate(el => el.checkValidity());
    assert(isNameValid === false, 'Empty name input must fail HTML5 checkValidity()');
    totalAssertions++;

    // 2. Test whitespace-only boundary input: bypasses HTML5 required, triggers Sonner warning
    await nameInput.fill('   ');
    await commentInput.fill('   ');
    await page.click('.review-input-form button[type="submit"]');

    // Verify warning toast appears
    const warningToast = page.locator('[data-sonner-toast]:has-text("Vui lòng điền họ tên")');
    await warningToast.waitFor({ state: 'visible', timeout: 5000 });
    const warningText = await warningToast.textContent();
    assert(warningText.includes('Vui lòng điền họ tên'), `Expected validation warning toast, got: "${warningText}"`);
    totalAssertions++;

    // Verify review form is still present (not submitted/closed)
    assert(await page.locator('.review-input-form').isVisible(), 'Review form should remain visible when validation fails');
    totalAssertions++;

    // Close review form
    await writeBtn.click();
    await page.waitForTimeout(400);
    console.log('  ✓ [Test 2.1] Survey empty validation handled correctly.');

    // ----------------------------------------------------
    // Test 2.2: Invalid Admin PIN Rejection
    // ----------------------------------------------------
    console.log('[Test 2.2] Testing Invalid Admin PIN Rejection...');
    await page.click('button.navbar-admin-btn');
    await page.waitForSelector('.admin-login-box', { state: 'visible', timeout: 5000 });

    // Enter wrong PIN
    await page.fill('.admin-login-box input[type="password"]', '9999');
    await page.click('.admin-login-box button.login-btn');
    await page.waitForTimeout(500);

    // Verify error message is shown
    const errorMsgLocator = page.locator('.admin-login-box div:has-text("Mã PIN không chính xác")');
    assert(await errorMsgLocator.isVisible(), 'Error message should appear on invalid PIN');
    totalAssertions++;

    // Verify admin dashboard is NOT unlocked
    assert(await page.locator('.admin-segmented-nav').count() === 0, 'Admin control center must not be unlocked with invalid PIN');
    totalAssertions++;

    // Close admin modal
    await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
    await page.waitForTimeout(400);
    console.log('  ✓ [Test 2.2] Invalid PIN rejected cleanly.');

    // ----------------------------------------------------
    // Test 2.3: Rapid Tab Switching (Stress Test)
    // ----------------------------------------------------
    console.log('[Test 2.3] Testing Rapid Tab Switching (Stress Test)...');
    const rapidTabs = [
      'button.nav-link:has-text("Trang Chủ")',
      'button.nav-link:has-text("Dòng Thời Gian")',
      'button.nav-link:has-text("Bảo Tàng")',
      'button.nav-link:has-text("Sa Bàn")',
      'button.nav-link:has-text("Sử Quan AI")',
      'button.nav-link:has-text("Đánh Giá")',
      'button.nav-link:has-text("Trang Chủ")'
    ];

    for (const sel of rapidTabs) {
      await page.click(sel, { timeout: 2000 });
      await page.waitForTimeout(60); // 60ms rapid switch
    }

    // Wait for the final tab (Trang Chủ) to settle
    await page.waitForSelector('.home-page', { state: 'visible', timeout: 7000 });
    const homeVisible = await page.locator('.home-page').isVisible();
    assert(homeVisible, 'Final tab (.home-page) must settle correctly after rapid switching');
    totalAssertions++;
    console.log('  ✓ [Test 2.3] Rapid tab switching settled with no unmount crash.');

    // ----------------------------------------------------
    // Test 2.4: Search With No Results in Museum
    // ----------------------------------------------------
    console.log('[Test 2.4] Testing Museum Search with No Results...');
    await navigateToTab(page, 'Bảo Tàng', '.museum-page');

    const searchInput = page.locator('input.museum-search-input');
    await searchInput.fill('xyznonexistentartifact99999');
    await page.waitForTimeout(400);

    // Verify plaque cards count is 0
    const plaqueCount = await page.locator('article.museum-plaque-card').count();
    assert(plaqueCount === 0, 'Zero artifact cards should be rendered for non-matching query');
    totalAssertions++;

    // Verify empty state container and text
    const emptyState = page.locator('.museum-empty-state');
    assert(await emptyState.isVisible(), 'Empty state container should be displayed');
    totalAssertions++;

    const emptyTitle = await page.locator('.museum-empty-title').textContent();
    assert(emptyTitle.includes('Không tìm thấy hiện vật phù hợp'), `Expected empty title, got: "${emptyTitle}"`);
    totalAssertions++;

    // Click "Đặt lại bộ lọc" to reset
    await page.click('.museum-empty-state button.btn-secondary:has-text("Đặt lại bộ lọc")');
    await page.waitForTimeout(400);
    const restoredCount = await page.locator('article.museum-plaque-card').count();
    assert(restoredCount > 0, `Artifacts should be restored after reset, found: ${restoredCount}`);
    totalAssertions++;
    console.log('  ✓ [Test 2.4] Search with no results handled with empty state and restored.');

    // ----------------------------------------------------
    // Test 2.5: Empty Inputs & Clear Search Button
    // ----------------------------------------------------
    console.log('[Test 2.5] Testing Empty Inputs & Clear Buttons...');
    
    // Type in Museum search and click clear button
    await searchInput.fill('hỏa hổ');
    await page.waitForTimeout(300);
    const clearBtn = page.locator('button.museum-clear-search-btn');
    assert(await clearBtn.isVisible(), 'Clear search button should be visible when input has text');
    totalAssertions++;

    await clearBtn.click();
    await page.waitForTimeout(300);
    const searchValAfterClear = await searchInput.inputValue();
    assert(searchValAfterClear === '', 'Search input should be cleared');
    totalAssertions++;

    // AI Chat empty input send test
    await navigateToTab(page, 'Sử Quan AI', '.ai-station-page');
    const aiInput = page.locator('input.ai-input-field');
    const sendBtn = page.locator('button.ai-send-btn-gold');
    await aiInput.fill('   '); // whitespace only

    // Verify send button is disabled when input has only whitespace
    assert(await sendBtn.isDisabled(), 'AI send button must be disabled when input is whitespace/empty');
    totalAssertions++;

    // Press Enter to verify it doesn't submit either
    const initialBubbleCount = await page.locator('.chat-bubble-row').count();
    await aiInput.press('Enter');
    await page.waitForTimeout(300);
    const bubbleCountAfterEnter = await page.locator('.chat-bubble-row').count();
    assert(bubbleCountAfterEnter === initialBubbleCount, 'Enter on empty/whitespace input should not create message bubble');
    totalAssertions++;
    console.log('  ✓ [Test 2.5] Empty inputs & clear buttons validated.');

    // ----------------------------------------------------
    // Test 2.6: Zero Console Errors Assertion
    // ----------------------------------------------------
    assert(consoleErrors.length === 0, `Zero console errors required in Tier 2. Found: ${consoleErrors.join(', ')}`);
    totalAssertions++;

    await context.close();
    console.log(`\n>>> TIER 2 COMPLETE: All assertions passed (${totalAssertions} assertions, 0 errors) <<<\n`);
    return { success: true, totalAssertions, errors: [] };
  } catch (err) {
    console.error('Tier 2 Test Failure:', err);
    return { success: false, totalAssertions, error: err.message };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  runTier2Tests().then(result => {
    if (!result.success) process.exit(1);
  });
}

module.exports = { runTier2Tests };
