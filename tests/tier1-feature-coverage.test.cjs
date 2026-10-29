const { BASE_URL, assert, launchBrowser, createTestPage, navigateToTab } = require('./helpers.cjs');

async function runTier1Tests() {
  console.log('\n========================================');
  console.log('--- STARTING TIER 1: FEATURE COVERAGE ---');
  console.log('========================================\n');

  const browser = await launchBrowser();
  let totalAssertions = 0;

  try {
    // ----------------------------------------------------
    // Test 1.1: 3D Intro Modal Flow & Bypass
    // ----------------------------------------------------
    console.log('[Test 1.1] Testing 3D Intro Modal Flow & Dismissal...');
    {
      const { page, context, consoleErrors } = await createTestPage(browser, { bypassIntro: false });
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);

      const introDialog = page.locator('.cinematic-intro-root');
      assert(await introDialog.isVisible(), 'Intro modal should render on first visit without session flag');
      totalAssertions++;

      const skipBtn = page.locator('button.intro-skip-btn');
      assert(await skipBtn.isVisible(), 'Skip intro button should be visible');
      totalAssertions++;

      await skipBtn.click();
      await page.waitForSelector('.cinematic-intro-root', { state: 'hidden', timeout: 5000 });
      assert(await introDialog.count() === 0 || !(await introDialog.isVisible()), 'Intro modal dismissed on skip click');
      totalAssertions++;

      assert(consoleErrors.length === 0, `No console errors during intro: ${consoleErrors.join(', ')}`);
      totalAssertions++;
      await context.close();
    }
    console.log('  ✓ [Test 1.1] 3D Intro Modal flow passed.');

    // ----------------------------------------------------
    // Main testing session with intro bypassed
    // ----------------------------------------------------
    const { page, context, consoleErrors } = await createTestPage(browser, { bypassIntro: true });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Verify Intro is NOT shown when bypassed
    const introCount = await page.locator('.cinematic-intro-root').count();
    assert(introCount === 0, 'Intro modal should not render when sessionStorage flag is set');
    totalAssertions++;

    // Verify Sonner Toaster container is mounted
    const sonnerToaster = page.locator('section[aria-label*="Notifications"], [data-sonner-toaster]');
    assert(await sonnerToaster.count() > 0, 'Sonner Toaster container is present in DOM');
    totalAssertions++;

    // ----------------------------------------------------
    // Test 1.2: 7 Main Tabs & Active Header States
    // ----------------------------------------------------
    console.log('[Test 1.2] Testing 7 Main Tabs Navigation & Active States...');
    const tabsToTest = [
      { name: 'Trang Chủ', selector: 'button.nav-link:has-text("Trang Chủ")', verify: '.home-page' },
      { name: 'Dòng Thời Gian', selector: 'button.nav-link:has-text("Dòng Thời Gian")', verify: '.timeline-page' },
      { name: 'Sa Bàn', selector: 'button.nav-link:has-text("Sa Bàn")', verify: '.battle-map-page' },
      { name: 'Bảo Tàng', selector: 'button.nav-link:has-text("Bảo Tàng")', verify: '.museum-page' },
      { name: 'Sử Quan AI', selector: 'button.nav-link:has-text("Sử Quan AI")', verify: '.ai-station-page' },
      { name: 'Đố Vui', selector: 'button.nav-link:has-text("Đố Vui")', verify: '.quiz-page' },
      { name: 'Đánh Giá', selector: 'button.nav-link:has-text("Đánh Giá")', verify: '.survey-page' },
    ];

    for (const t of tabsToTest) {
      const link = page.locator(t.selector);
      await link.click();
      await page.waitForSelector(t.verify, { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(300);

      const isActive = await link.evaluate(el => el.classList.contains('active'));
      const ariaCurrent = await link.getAttribute('aria-current');
      assert(isActive, `Tab "${t.name}" should have .active class when active`);
      assert(ariaCurrent === 'page', `Tab "${t.name}" should have aria-current="page"`);
      totalAssertions += 2;
      console.log(`  ✓ Navigated to "${t.name}" with verified active state`);
    }

    // ----------------------------------------------------
    // Test 1.3: BattleMapTab Battle Selectors
    // ----------------------------------------------------
    console.log('[Test 1.3] Testing Battle Map Selectors...');
    await navigateToTab(page, 'Sa Bàn', '.battle-map-page');

    const battleBtns = page.locator('.battle-selector-btn');
    const battleCount = await battleBtns.count();
    assert(battleCount === 3, `Expected 3 battles, found ${battleCount}`);
    totalAssertions++;

    // Switch to Ngoc Hoi - Dong Da
    const ngocHoiBtn = page.locator('button.battle-selector-btn:has-text("Ngọc Hồi")');
    await ngocHoiBtn.click();
    await page.waitForTimeout(400);
    const isNgocHoiActive = await ngocHoiBtn.evaluate(el => el.classList.contains('active'));
    assert(isNgocHoiActive, 'Ngọc Hồi Đống Đa battle button should be active after click');
    totalAssertions++;

    // Switch to Phu Xuan - Nui Ban
    const phuXuanBtn = page.locator('button.battle-selector-btn:has-text("Phú Xuân")');
    await phuXuanBtn.click();
    await page.waitForTimeout(400);
    const isPhuXuanActive = await phuXuanBtn.evaluate(el => el.classList.contains('active'));
    assert(isPhuXuanActive, 'Phú Xuân Núi Bân battle button should be active after click');
    totalAssertions++;

    // Switch back to Rach Gam - Xoai Mut
    const rachGamBtn = page.locator('button.battle-selector-btn:has-text("Rạch Gầm")');
    await rachGamBtn.click();
    await page.waitForTimeout(400);
    const isRachGamActive = await rachGamBtn.evaluate(el => el.classList.contains('active'));
    assert(isRachGamActive, 'Rạch Gầm Xoài Mút battle button should be active after click');
    totalAssertions++;
    console.log('  ✓ Battle selectors tested successfully.');

    // ----------------------------------------------------
    // Test 1.4: MuseumTab Modal Open / Close
    // ----------------------------------------------------
    console.log('[Test 1.4] Testing Museum Artifact Modal...');
    await navigateToTab(page, 'Bảo Tàng', '.museum-page');

    const firstCard = page.locator('article.museum-plaque-card').first();
    await firstCard.waitFor({ state: 'visible', timeout: 5000 });
    await firstCard.click();

    const museumModal = page.locator('.museum-modal-frame[role="dialog"]');
    await museumModal.waitFor({ state: 'visible', timeout: 5000 });
    assert(await museumModal.isVisible(), 'Museum 60/40 modal is displayed');
    totalAssertions++;

    const modalTitle = await page.locator('#modal-artifact-title').textContent();
    assert(modalTitle && modalTitle.trim().length > 0, `Museum modal title should not be empty: "${modalTitle}"`);
    totalAssertions++;

    const closeMuseumBtn = page.locator('button.museum-modal-close-btn');
    await closeMuseumBtn.click();
    await page.waitForSelector('.museum-modal-frame', { state: 'hidden', timeout: 5000 });
    assert(await museumModal.count() === 0 || !(await museumModal.isVisible()), 'Museum modal closed successfully');
    totalAssertions++;
    console.log('  ✓ Museum modal open/close tested successfully.');

    // ----------------------------------------------------
    // Test 1.5: AiStationTab Chat Interaction
    // ----------------------------------------------------
    console.log('[Test 1.5] Testing AI Historian Interaction...');
    await navigateToTab(page, 'Sử Quan AI', '.ai-station-page');

    const firstEdict = page.locator('button.scroll-edict-chip').first();
    if (await firstEdict.isVisible()) {
      const edictText = await firstEdict.textContent();
      await firstEdict.click();
      console.log(`  Clicked quick edict: "${edictText?.trim()}"`);
    } else {
      await page.fill('input.ai-input-field', 'Kể cho tôi nghe về trận Ngọc Hồi Đống Đa');
      await page.click('button.ai-send-btn-gold');
    }

    // Wait for at least one user message bubble
    await page.waitForSelector('.chat-bubble-row.user-row', { state: 'visible', timeout: 6000 });
    assert(await page.locator('.chat-bubble-row.user-row').count() > 0, 'User chat message bubble rendered');
    totalAssertions++;

    // Wait for bot response to finish or render
    await page.waitForSelector('.chat-bubble-row.bot-row .chat-text-content', { state: 'visible', timeout: 10000 });
    const botText = await page.locator('.chat-bubble-row.bot-row .chat-text-content').last().textContent();
    assert(botText && botText.trim().length > 0, 'Bot reply should contain non-empty response text');
    totalAssertions++;
    console.log('  ✓ AI Historian chat interaction tested successfully.');

    // ----------------------------------------------------
    // Test 1.6: SurveyTab Form Submission & Sonner Toast
    // ----------------------------------------------------
    console.log('[Test 1.6] Testing Survey Review Form Submission...');
    await navigateToTab(page, 'Đánh Giá', '.survey-page');

    const writeBtn = page.locator('button.btn-write-review');
    await writeBtn.click();
    await page.waitForSelector('.review-input-form', { state: 'visible', timeout: 5000 });

    // Pick 5-star rating
    const star5 = page.locator('.star-picker-interactive button.star-btn').nth(4);
    await star5.click();

    // Fill inputs
    await page.fill('.review-input-form input[placeholder*="Nguyễn Văn An"]', 'Nguyễn Tri Phương');
    await page.fill('.review-input-form textarea[placeholder*="Chia sẻ cảm nghĩ"]', 'Website giao diện di sản tuyệt đẹp, trải nghiệm 60fps mượt mà!');
    
    // Submit review
    await page.click('.review-input-form button[type="submit"]');

    // Verify Sonner toast
    const toast = page.locator('[data-sonner-toast]:has-text("Cảm ơn bạn đã gửi đánh giá")');
    await toast.waitFor({ state: 'visible', timeout: 5000 });
    const toastContent = await toast.textContent();
    assert(toastContent.includes('Cảm ơn bạn đã gửi đánh giá'), `Expected success toast, got: "${toastContent}"`);
    totalAssertions++;
    console.log('  ✓ Survey review submitted with Sonner toast feedback.');

    // ----------------------------------------------------
    // Test 1.7: Admin Modal PIN Unlock & Tabs
    // ----------------------------------------------------
    console.log('[Test 1.7] Testing Admin Modal PIN Unlock & 4 Segmented Tabs...');
    await page.click('button.navbar-admin-btn');
    await page.waitForSelector('.admin-login-box', { state: 'visible', timeout: 5000 });

    await page.fill('.admin-login-box input[type="password"]', '1789');
    await page.click('.admin-login-box button.login-btn');

    await page.waitForSelector('.admin-segmented-nav', { state: 'visible', timeout: 5000 });
    assert(await page.locator('.admin-segmented-nav').isVisible(), 'Admin authenticated and segmented nav visible');
    totalAssertions++;

    const adminTabs = [
      'Khảo Sát & Google Sheets',
      'Kho Tri Thức Sử Liệu AI',
      'Bảo Tàng Hiện Vật',
      'Thông Tin & Hệ Thống'
    ];

    for (const at of adminTabs) {
      const tabBtn = page.locator(`.admin-segmented-tab:has-text("${at}")`);
      await tabBtn.click();
      await page.waitForTimeout(200);
      assert(await tabBtn.evaluate(el => el.classList.contains('active')), `Admin tab "${at}" should be active`);
      totalAssertions++;
    }

    // Close admin modal
    await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
    await page.waitForTimeout(400);
    assert(await page.locator('.admin-segmented-nav').count() === 0, 'Admin modal closed');
    totalAssertions++;
    console.log('  ✓ Admin modal authenticated, 4 tabs navigated and closed.');

    // Verify 0 console errors throughout Tier 1
    assert(consoleErrors.length === 0, `Zero console errors required in Tier 1. Found: ${consoleErrors.join(', ')}`);
    totalAssertions++;

    await context.close();
    console.log(`\n>>> TIER 1 COMPLETE: All assertions passed (${totalAssertions} assertions, 0 errors) <<<\n`);
    return { success: true, totalAssertions, errors: [] };
  } catch (err) {
    console.error('Tier 1 Test Failure:', err);
    return { success: false, totalAssertions, error: err.message };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  runTier1Tests().then(result => {
    if (!result.success) process.exit(1);
  });
}

module.exports = { runTier1Tests };
