const { BASE_URL, assert, launchBrowser, createTestPage, navigateToTab } = require('./helpers.cjs');

async function runTier4Tests() {
  console.log('\n======================================================');
  console.log('--- STARTING TIER 4: REAL-WORLD APPLICATION FLOWS ---');
  console.log('======================================================\n');

  const browser = await launchBrowser();
  let totalAssertions = 0;

  try {
    // ====================================================
    // SCENARIO 1: Complete Student Journey
    // ====================================================
    console.log('--- [SCENARIO 1] Full Student Learning Journey ---');
    const { page, context, consoleErrors } = await createTestPage(browser, { bypassIntro: true });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Step 1: Land on Home Page
    console.log('  [Step 1] Inspecting Home Hero & Bento Cards...');
    const heroTitle = page.locator('#hero-title');
    assert(await heroTitle.isVisible(), 'Hero title should be visible on Home page');
    const heroText = await heroTitle.textContent();
    assert(heroText.includes('HÀO KHÍ TÂY SƠN'), `Hero title contains "HÀO KHÍ TÂY SƠN": "${heroText}"`);
    totalAssertions += 2;

    // Step 2: Navigate to Timeline & Filter Tây Sơn Era
    console.log('  [Step 2] Navigating to Timeline & Applying Era Filter...');
    await navigateToTab(page, 'Dòng Thời Gian', '.timeline-page');
    const eraBtn = page.locator('button.timeline-era-btn:has-text("Khởi nghĩa Tây Sơn")');
    await eraBtn.click();
    await page.waitForTimeout(400);

    const timelineCards = page.locator('article.timeline-zigzag-card');
    const cardCount = await timelineCards.count();
    assert(cardCount > 0, `Filtered timeline events displayed: ${cardCount}`);
    totalAssertions++;

    // Step 3: Navigate to Battle Map & Take Ngọc Hồi Đống Đa Quiz
    console.log('  [Step 3] Navigating to Battle Map & Taking Ngọc Hồi - Đống Đa Mini-Quiz...');
    await navigateToTab(page, 'Sa Bàn', '.battle-map-page');

    // Select Ngoc Hoi - Dong Da
    const ngocHoiBtn = page.locator('button.battle-selector-btn:has-text("Ngọc Hồi")');
    await ngocHoiBtn.click();
    await page.waitForTimeout(500);

    // Click first phase pill to show phase details in tactical drawer
    const firstPhasePill = page.locator('.battle-phase-pills button.battle-phase-pill').first();
    if (await firstPhasePill.isVisible()) {
      await firstPhasePill.click();
      await page.waitForTimeout(400);
    }

    // Check if tactical drawer mini quiz button is visible
    const miniQuizBtn = page.locator('button.battle-mini-quiz-btn');
    if (await miniQuizBtn.isVisible()) {
      await miniQuizBtn.click();
      await page.waitForSelector('.battle-quiz-modal', { state: 'visible', timeout: 5000 });
      assert(await page.locator('.battle-quiz-modal').isVisible(), 'Battle mini-quiz modal opened');
      totalAssertions++;

      // Click first option
      const firstOpt = page.locator('button.battle-quiz-option-btn').first();
      await firstOpt.click();
      await page.waitForTimeout(400);
      assert(await firstOpt.evaluate(el => el.classList.contains('correct') || el.classList.contains('wrong')), 'Quiz option shows answer feedback');
      totalAssertions++;

      // Close mini quiz modal
      await page.click('button.battle-quiz-close');
      await page.waitForTimeout(300);
    }

    // Step 4: Navigate to Museum & Search "thần công"
    console.log('  [Step 4] Navigating to Museum & Searching "thần công" (Đại Pháo Thần Công)...');
    await navigateToTab(page, 'Bảo Tàng', '.museum-page');

    const searchInput = page.locator('input.museum-search-input');
    await searchInput.fill('thần công');
    await page.waitForTimeout(400);

    const matchingCards = page.locator('article.museum-plaque-card');
    const matchingCount = await matchingCards.count();
    console.log(`    Found ${matchingCount} artifact(s) matching "thần công"`);
    assert(matchingCount > 0, 'Should find at least 1 artifact for "thần công"');
    totalAssertions++;

    // Open exhibition modal for first matching artifact
    await matchingCards.first().click();
    await page.waitForSelector('.museum-modal-frame[role="dialog"]', { state: 'visible', timeout: 5000 });
    const modalTitle = await page.locator('#modal-artifact-title').textContent();
    assert(modalTitle && modalTitle.length > 0, 'Exhibition modal title displayed');
    totalAssertions++;

    // Close exhibition modal
    await page.click('button.museum-modal-close-btn');
    await page.waitForTimeout(300);

    // Step 5: Navigate to AI Historian & Ask Tactics Question
    console.log('  [Step 5] Navigating to AI Historian & Inquiring Quang Trung Tactics...');
    await navigateToTab(page, 'Sử Quan AI', '.ai-station-page');

    await page.fill('input.ai-input-field', 'Chiến thuật hành quân thần tốc của vua Quang Trung');
    await page.click('button.ai-send-btn-gold');

    // Verify user bubble appears
    await page.waitForSelector('.chat-bubble-row.user-row', { state: 'visible', timeout: 5000 });
    assert(await page.locator('.chat-bubble-row.user-row').count() > 0, 'User question bubble rendered');
    totalAssertions++;

    // Wait for AI response
    await page.waitForSelector('.chat-bubble-row.bot-row .chat-text-content', { state: 'visible', timeout: 10000 });
    const botResponse = await page.locator('.chat-bubble-row.bot-row .chat-text-content').last().textContent();
    assert(botResponse.includes('Quang Trung') || botResponse.includes('hành quân'), 'AI response mentions Quang Trung tactics');
    totalAssertions++;

    // Step 6: Navigate to Survey & Submit 5-Star Review
    console.log('  [Step 6] Navigating to Survey & Submitting 5-Star Review...');
    await navigateToTab(page, 'Đánh Giá', '.survey-page');

    await page.click('button.btn-write-review');
    await page.waitForSelector('.review-input-form', { state: 'visible', timeout: 5000 });

    // Select 5-star rating
    await page.locator('.star-picker-interactive button.star-btn').nth(4).click();

    // Fill form fields
    await page.fill('.review-input-form input[placeholder*="Nguyễn Văn An"]', 'Nguyễn Hoàng Nam');
    await page.fill('.review-input-form textarea[placeholder*="Chia sẻ cảm nghĩ"]', 'Học sinh lớp 12 rất hào hứng với sa bàn chiến trận và sử quan AI của trường!');
    await page.click('.review-input-form button[type="submit"]');

    // Verify Sonner toast confirms submission
    const successToast = page.locator('[data-sonner-toast]:has-text("Cảm ơn bạn đã gửi đánh giá")');
    await successToast.waitFor({ state: 'visible', timeout: 5000 });
    assert(await successToast.isVisible(), 'Sonner success toast appeared on student review submission');
    totalAssertions++;
    console.log('  ✓ [SCENARIO 1] Student Learning Journey completed with 100% success.');

    // ====================================================
    // SCENARIO 2: Teacher / Admin Audit Journey
    // ====================================================
    console.log('\n--- [SCENARIO 2] Teacher / Admin Audit Journey ---');

    // Step 1: Open Admin Modal and Unlock with PIN 1789
    console.log('  [Step 1] Opening Admin Center & Unlocking with PIN 1789...');
    await page.click('button.navbar-admin-btn');
    await page.waitForSelector('.admin-login-box', { state: 'visible', timeout: 5000 });
    await page.fill('.admin-login-box input[type="password"]', '1789');
    await page.click('.admin-login-box button.login-btn');
    await page.waitForSelector('.admin-segmented-nav', { state: 'visible', timeout: 5000 });
    assert(await page.locator('.admin-segmented-nav').isVisible(), 'Admin center unlocked');
    totalAssertions++;

    // Step 2: Audit "Khảo Sát & Google Sheets"
    console.log('  [Step 2] Auditing Khảo Sát & Google Sheets Sync...');
    const surveyTabBtn = page.locator('.admin-segmented-tab:has-text("Khảo Sát & Google Sheets")');
    await surveyTabBtn.click();
    await page.waitForTimeout(300);
    assert(await surveyTabBtn.evaluate(el => el.classList.contains('active')), 'Survey admin tab active');
    totalAssertions++;

    // Step 3: Audit "Kho Tri Thức Sử Liệu AI"
    console.log('  [Step 3] Auditing Kho Tri Thức Sử Liệu AI...');
    const knowledgeTabBtn = page.locator('.admin-segmented-tab:has-text("Kho Tri Thức Sử Liệu AI")');
    await knowledgeTabBtn.click();
    await page.waitForTimeout(300);
    assert(await knowledgeTabBtn.evaluate(el => el.classList.contains('active')), 'Knowledge admin tab active');
    totalAssertions++;

    // Step 4: Audit "Bảo Tàng Hiện Vật"
    console.log('  [Step 4] Auditing Bảo Tàng Hiện Vật Management...');
    const museumAdminBtn = page.locator('.admin-segmented-tab:has-text("Bảo Tàng Hiện Vật")');
    await museumAdminBtn.click();
    await page.waitForTimeout(300);
    assert(await museumAdminBtn.evaluate(el => el.classList.contains('active')), 'Museum admin tab active');
    totalAssertions++;

    // Step 5: Audit "Thông Tin & Hệ Thống"
    console.log('  [Step 5] Auditing Thông Tin & Hệ Thống...');
    const systemAdminBtn = page.locator('.admin-segmented-tab:has-text("Thông Tin & Hệ Thống")');
    await systemAdminBtn.click();
    await page.waitForTimeout(300);
    assert(await systemAdminBtn.evaluate(el => el.classList.contains('active')), 'System admin tab active');
    totalAssertions++;

    // Step 6: Exit Admin Mode
    console.log('  [Step 6] Exiting Admin Mode (Logout)...');
    const exitAdminBtn = page.locator('button:has-text("Thoát Admin")');
    await exitAdminBtn.click();
    await page.waitForTimeout(400);

    // Close admin modal
    await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
    await page.waitForTimeout(400);
    assert(await page.locator('button.navbar-admin-btn:not(.active-admin)').isVisible(), 'Logged out and returned to normal student mode');
    totalAssertions++;
    console.log('  ✓ [SCENARIO 2] Teacher / Admin Audit Journey completed with 100% success.');

    // Verify 0 console errors throughout Tier 4
    assert(consoleErrors.length === 0, `Zero console errors required in Tier 4. Found: ${consoleErrors.join(', ')}`);
    totalAssertions++;

    await context.close();
    console.log(`\n>>> TIER 4 COMPLETE: All assertions passed (${totalAssertions} assertions, 0 errors) <<<\n`);
    return { success: true, totalAssertions, errors: [] };
  } catch (err) {
    console.error('Tier 4 Test Failure:', err);
    return { success: false, totalAssertions, error: err.message };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  runTier4Tests().then(result => {
    if (!result.success) process.exit(1);
  });
}

module.exports = { runTier4Tests };
