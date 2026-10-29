const path = require('path');
const fs = require('fs');
const { BASE_URL, launchBrowser, createTestPage, navigateToTab } = require('../tests/helpers.cjs');

const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'screenshots');

async function captureAllScreenshots() {
  console.log('\n======================================================');
  console.log('--- STARTING SCREENSHOT CAPTURE MATRIX (18 IMAGES) ---');
  console.log('======================================================\n');

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await launchBrowser();
  const capturedFiles = [];

  try {
    // ====================================================
    // PART A: DESKTOP SCREENSHOTS (1920x1080)
    // ====================================================
    console.log('--- [DESKTOP] Viewport 1920x1080 ---');
    {
      const { page, context } = await createTestPage(browser, {
        viewport: { width: 1920, height: 1080 },
        isMobile: false,
        bypassIntro: true
      });

      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(800);

      // 1. desktop-01-home.png
      console.log('  Capturing: desktop-01-home.png');
      await page.waitForSelector('.home-page', { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(500);
      const file01 = path.join(SCREENSHOT_DIR, 'desktop-01-home.png');
      await page.screenshot({ path: file01, fullPage: false });
      capturedFiles.push({ name: 'desktop-01-home.png', path: file01, viewport: '1920x1080' });

      // 2. desktop-02-timeline.png
      console.log('  Capturing: desktop-02-timeline.png');
      await navigateToTab(page, 'Dòng Thời Gian', '.timeline-page');
      await page.waitForTimeout(600);
      const file02 = path.join(SCREENSHOT_DIR, 'desktop-02-timeline.png');
      await page.screenshot({ path: file02, fullPage: false });
      capturedFiles.push({ name: 'desktop-02-timeline.png', path: file02, viewport: '1920x1080' });

      // 3. desktop-03-battlemap-rachgam.png
      console.log('  Capturing: desktop-03-battlemap-rachgam.png');
      await navigateToTab(page, 'Sa Bàn', '.battle-map-page');
      const rachGamBtn = page.locator('button.battle-selector-btn:has-text("Rạch Gầm")');
      await rachGamBtn.click();
      await page.waitForTimeout(800);
      const file03 = path.join(SCREENSHOT_DIR, 'desktop-03-battlemap-rachgam.png');
      await page.screenshot({ path: file03, fullPage: false });
      capturedFiles.push({ name: 'desktop-03-battlemap-rachgam.png', path: file03, viewport: '1920x1080' });

      // 4. desktop-04-battlemap-ngochoi.png
      console.log('  Capturing: desktop-04-battlemap-ngochoi.png');
      const ngocHoiBtn = page.locator('button.battle-selector-btn:has-text("Ngọc Hồi")');
      await ngocHoiBtn.click();
      await page.waitForTimeout(800);
      const file04 = path.join(SCREENSHOT_DIR, 'desktop-04-battlemap-ngochoi.png');
      await page.screenshot({ path: file04, fullPage: false });
      capturedFiles.push({ name: 'desktop-04-battlemap-ngochoi.png', path: file04, viewport: '1920x1080' });

      // 5. desktop-05-museum-gallery.png
      console.log('  Capturing: desktop-05-museum-gallery.png');
      await navigateToTab(page, 'Bảo Tàng', '.museum-page');
      await page.waitForTimeout(600);
      const file05 = path.join(SCREENSHOT_DIR, 'desktop-05-museum-gallery.png');
      await page.screenshot({ path: file05, fullPage: false });
      capturedFiles.push({ name: 'desktop-05-museum-gallery.png', path: file05, viewport: '1920x1080' });

      // 6. desktop-06-museum-modal.png
      console.log('  Capturing: desktop-06-museum-modal.png');
      const firstArtifact = page.locator('article.museum-plaque-card').first();
      await firstArtifact.click();
      await page.waitForSelector('.museum-modal-frame[role="dialog"]', { state: 'visible', timeout: 5000 });
      await page.waitForTimeout(600);
      const file06 = path.join(SCREENSHOT_DIR, 'desktop-06-museum-modal.png');
      await page.screenshot({ path: file06, fullPage: false });
      capturedFiles.push({ name: 'desktop-06-museum-modal.png', path: file06, viewport: '1920x1080' });
      await page.click('button.museum-modal-close-btn');
      await page.waitForTimeout(400);

      // 7. desktop-07-ai-station.png
      console.log('  Capturing: desktop-07-ai-station.png');
      await navigateToTab(page, 'Sử Quan AI', '.ai-station-page');
      await page.waitForTimeout(600);
      const file07 = path.join(SCREENSHOT_DIR, 'desktop-07-ai-station.png');
      await page.screenshot({ path: file07, fullPage: false });
      capturedFiles.push({ name: 'desktop-07-ai-station.png', path: file07, viewport: '1920x1080' });

      // 8. desktop-08-survey-form.png
      console.log('  Capturing: desktop-08-survey-form.png');
      await navigateToTab(page, 'Đánh Giá', '.survey-page');
      const writeReviewBtn = page.locator('button.btn-write-review');
      await writeReviewBtn.click();
      await page.waitForSelector('.review-input-form', { state: 'visible', timeout: 5000 });
      await page.waitForTimeout(500);
      const file08 = path.join(SCREENSHOT_DIR, 'desktop-08-survey-form.png');
      await page.screenshot({ path: file08, fullPage: false });
      capturedFiles.push({ name: 'desktop-08-survey-form.png', path: file08, viewport: '1920x1080' });

      // 9. desktop-09-admin-modal.png
      console.log('  Capturing: desktop-09-admin-modal.png');
      await page.click('button.navbar-admin-btn');
      await page.waitForSelector('.admin-login-box', { state: 'visible', timeout: 5000 });
      await page.fill('.admin-login-box input[type="password"]', '1789');
      await page.click('.admin-login-box button.login-btn');
      await page.waitForSelector('.admin-segmented-nav', { state: 'visible', timeout: 5000 });
      await page.waitForTimeout(600);
      const file09 = path.join(SCREENSHOT_DIR, 'desktop-09-admin-modal.png');
      await page.screenshot({ path: file09, fullPage: false });
      capturedFiles.push({ name: 'desktop-09-admin-modal.png', path: file09, viewport: '1920x1080' });
      await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
      await page.waitForTimeout(400);

      await context.close();
    }
    console.log('  ✓ 9 Desktop Screenshots captured successfully.\n');

    // ====================================================
    // PART B: MOBILE SCREENSHOTS (390x844)
    // ====================================================
    console.log('--- [MOBILE] Viewport 390x844 (iPhone 15 Mobile Emulation) ---');
    {
      const { page, context } = await createTestPage(browser, {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        bypassIntro: true
      });

      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(800);

      // 10. mobile-01-home.png
      console.log('  Capturing: mobile-01-home.png');
      await page.waitForSelector('.home-page', { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(500);
      const file10 = path.join(SCREENSHOT_DIR, 'mobile-01-home.png');
      await page.screenshot({ path: file10, fullPage: false });
      capturedFiles.push({ name: 'mobile-01-home.png', path: file10, viewport: '390x844' });

      // 11. mobile-02-navbar-drawer.png
      console.log('  Capturing: mobile-02-navbar-drawer.png');
      const menuBtn = page.locator('button.mobile-nav-toggle');
      await menuBtn.click();
      await page.waitForSelector('#mobile-nav-overlay.mobile-menu-overlay', { state: 'visible', timeout: 5000 });
      await page.waitForTimeout(500);
      const file11 = path.join(SCREENSHOT_DIR, 'mobile-02-navbar-drawer.png');
      await page.screenshot({ path: file11, fullPage: false });
      capturedFiles.push({ name: 'mobile-02-navbar-drawer.png', path: file11, viewport: '390x844' });

      // Close drawer by navigating to Timeline
      await page.click('#mobile-nav-overlay button.mobile-nav-link:has-text("Dòng Thời Gian")');
      await page.waitForSelector('.timeline-page', { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(600);

      // 12. mobile-03-timeline.png
      console.log('  Capturing: mobile-03-timeline.png');
      const file12 = path.join(SCREENSHOT_DIR, 'mobile-03-timeline.png');
      await page.screenshot({ path: file12, fullPage: false });
      capturedFiles.push({ name: 'mobile-03-timeline.png', path: file12, viewport: '390x844' });

      // 13. mobile-04-battlemap.png
      console.log('  Capturing: mobile-04-battlemap.png');
      await menuBtn.click();
      await page.waitForSelector('#mobile-nav-overlay', { state: 'visible', timeout: 4000 });
      await page.click('#mobile-nav-overlay button.mobile-nav-link:has-text("Sa Bàn")');
      await page.waitForSelector('.battle-map-page', { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(800);
      const file13 = path.join(SCREENSHOT_DIR, 'mobile-04-battlemap.png');
      await page.screenshot({ path: file13, fullPage: false });
      capturedFiles.push({ name: 'mobile-04-battlemap.png', path: file13, viewport: '390x844' });

      // 14. mobile-05-museum-gallery.png
      console.log('  Capturing: mobile-05-museum-gallery.png');
      await menuBtn.click();
      await page.waitForSelector('#mobile-nav-overlay', { state: 'visible', timeout: 4000 });
      await page.click('#mobile-nav-overlay button.mobile-nav-link:has-text("Bảo Tàng")');
      await page.waitForSelector('.museum-page', { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(600);
      const file14 = path.join(SCREENSHOT_DIR, 'mobile-05-museum-gallery.png');
      await page.screenshot({ path: file14, fullPage: false });
      capturedFiles.push({ name: 'mobile-05-museum-gallery.png', path: file14, viewport: '390x844' });

      // 15. mobile-06-museum-modal.png
      console.log('  Capturing: mobile-06-museum-modal.png');
      const mobileArtifact = page.locator('article.museum-plaque-card').first();
      await mobileArtifact.click();
      await page.waitForSelector('.museum-modal-frame[role="dialog"]', { state: 'visible', timeout: 5000 });
      await page.waitForTimeout(600);
      const file15 = path.join(SCREENSHOT_DIR, 'mobile-06-museum-modal.png');
      await page.screenshot({ path: file15, fullPage: false });
      capturedFiles.push({ name: 'mobile-06-museum-modal.png', path: file15, viewport: '390x844' });
      await page.click('button.museum-modal-close-btn');
      await page.waitForTimeout(400);

      // 16. mobile-07-ai-station.png
      console.log('  Capturing: mobile-07-ai-station.png');
      await menuBtn.click();
      await page.waitForSelector('#mobile-nav-overlay', { state: 'visible', timeout: 4000 });
      await page.click('#mobile-nav-overlay button.mobile-nav-link:has-text("Sử Quan AI")');
      await page.waitForSelector('.ai-station-page', { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(600);
      const file16 = path.join(SCREENSHOT_DIR, 'mobile-07-ai-station.png');
      await page.screenshot({ path: file16, fullPage: false });
      capturedFiles.push({ name: 'mobile-07-ai-station.png', path: file16, viewport: '390x844' });

      // 17. mobile-08-survey.png
      console.log('  Capturing: mobile-08-survey.png');
      await menuBtn.click();
      await page.waitForSelector('#mobile-nav-overlay', { state: 'visible', timeout: 4000 });
      await page.click('#mobile-nav-overlay button.mobile-nav-link:has-text("Đánh Giá")');
      await page.waitForSelector('.survey-page', { state: 'visible', timeout: 6000 });
      await page.waitForTimeout(600);
      const file17 = path.join(SCREENSHOT_DIR, 'mobile-08-survey.png');
      await page.screenshot({ path: file17, fullPage: false });
      capturedFiles.push({ name: 'mobile-08-survey.png', path: file17, viewport: '390x844' });

      // 18. mobile-09-admin.png
      console.log('  Capturing: mobile-09-admin.png');
      await menuBtn.click();
      await page.waitForSelector('#mobile-nav-overlay', { state: 'visible', timeout: 5000 });
      await page.click('#mobile-nav-overlay button.navbar-admin-btn');
      await page.waitForSelector('.admin-login-box', { state: 'visible', timeout: 5000 });
      await page.fill('.admin-login-box input[type="password"]', '1789');
      await page.click('.admin-login-box button.login-btn');
      await page.waitForSelector('.admin-segmented-nav', { state: 'visible', timeout: 5000 });
      await page.waitForTimeout(600);
      const file18 = path.join(SCREENSHOT_DIR, 'mobile-09-admin.png');
      await page.screenshot({ path: file18, fullPage: false });
      capturedFiles.push({ name: 'mobile-09-admin.png', path: file18, viewport: '390x844' });
      await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
      await page.waitForTimeout(400);

      await context.close();
    }
    console.log('  ✓ 9 Mobile Screenshots captured successfully.\n');

    // ====================================================
    // VERIFICATION INVENTORY
    // ====================================================
    console.log('======================================================');
    console.log('--- SCREENSHOT INVENTORY VERIFICATION ---');
    console.log('======================================================');

    const expectedScreenshots = [
      'desktop-01-home.png',
      'desktop-02-timeline.png',
      'desktop-03-battlemap-rachgam.png',
      'desktop-04-battlemap-ngochoi.png',
      'desktop-05-museum-gallery.png',
      'desktop-06-museum-modal.png',
      'desktop-07-ai-station.png',
      'desktop-08-survey-form.png',
      'desktop-09-admin-modal.png',
      'mobile-01-home.png',
      'mobile-02-navbar-drawer.png',
      'mobile-03-timeline.png',
      'mobile-04-battlemap.png',
      'mobile-05-museum-gallery.png',
      'mobile-06-museum-modal.png',
      'mobile-07-ai-station.png',
      'mobile-08-survey.png',
      'mobile-09-admin.png'
    ];

    let allValid = true;
    const inventory = [];

    for (const name of expectedScreenshots) {
      const filePath = path.join(SCREENSHOT_DIR, name);
      const exists = fs.existsSync(filePath);
      const size = exists ? fs.statSync(filePath).size : 0;
      const isValid = exists && size > 1024; // > 1KB
      if (!isValid) allValid = false;

      inventory.push({ name, exists, sizeBytes: size, valid: isValid });
      console.log(`  ${isValid ? '✓' : '✗'} ${name.padEnd(36)} Size: ${(size / 1024).toFixed(1)} KB`);
    }

    console.log(`\nInventory: ${inventory.filter(i => i.valid).length}/18 valid PNG screenshots captured.`);
    return { success: allValid, inventory };
  } catch (err) {
    console.error('Screenshot Capture Failure:', err);
    return { success: false, error: err.message };
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  captureAllScreenshots().then(res => {
    if (!res.success) process.exit(1);
  });
}

module.exports = { captureAllScreenshots };
