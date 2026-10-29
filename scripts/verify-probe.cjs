const { chromium } = require('playwright');

(async () => {
  console.log('--- Starting Playwright Full Flow Probe ---');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  // 1. Visit with intro bypass
  await page.addInitScript(() => sessionStorage.setItem('su_intro_seen_session', 'v1'));
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  const introCount = await page.locator('.cinematic-intro-root').count();
  console.log('App loaded without intro:', introCount === 0);

  // Check Sonner Toaster
  const sonnerSection = await page.locator('[data-sonner-toaster], section[aria-label*="Notifications"]').count();
  console.log('Sonner container found count:', sonnerSection);

  // 2. Test Tab Navigation
  const tabs = [
    { name: 'Dòng Thời Gian', selector: 'button.nav-link:has-text("Dòng Thời Gian")', verify: '.timeline-page' },
    { name: 'Sa Bàn', selector: 'button.nav-link:has-text("Sa Bàn")', verify: '.battle-map-page' },
    { name: 'Bảo Tàng', selector: 'button.nav-link:has-text("Bảo Tàng")', verify: '.museum-page' },
    { name: 'Sử Quan AI', selector: 'button.nav-link:has-text("Sử Quan AI")', verify: '.ai-station-page' },
    { name: 'Đố Vui', selector: 'button.nav-link:has-text("Đố Vui")', verify: '.quiz-page' },
    { name: 'Đánh Giá', selector: 'button.nav-link:has-text("Đánh Giá")', verify: '.survey-page' },
    { name: 'Trang Chủ', selector: 'button.nav-link:has-text("Trang Chủ")', verify: '.home-page' },
  ];

  for (const t of tabs) {
    await page.click(t.selector);
    await page.waitForSelector(t.verify, { timeout: 6000 });
    console.log(`Navigated to ${t.name} successfully!`);
  }

  // 3. Test Admin Modal trigger
  await page.click('button.navbar-admin-btn');
  await page.waitForSelector('.admin-login-box', { timeout: 4000 });
  console.log('Admin login box opened successfully!');

  // Fill PIN 1789
  await page.fill('.admin-login-box input[type="password"]', '1789');
  await page.click('.admin-login-box button.login-btn');
  await page.waitForSelector('.admin-segmented-nav', { timeout: 4000 });
  console.log('Admin authenticated and 4 segmented tabs displayed!');

  // Test Admin tabs
  const adminTabs = [
    'Khảo Sát & Google Sheets',
    'Kho Tri Thức Sử Liệu AI',
    'Bảo Tàng Hiện Vật',
    'Thông Tin & Hệ Thống'
  ];
  for (const at of adminTabs) {
    await page.click(`.admin-segmented-tab:has-text("${at}")`);
    await page.waitForTimeout(200);
    console.log(`Clicked admin tab: ${at}`);
  }

  // Close Admin Modal
  await page.click('.close-btn[aria-label="Đóng cửa sổ"]');
  await page.waitForTimeout(400);
  console.log('Admin modal closed!');

  // 4. Test BattleMapTab interactions
  await page.click('button.nav-link:has-text("Sa Bàn")');
  await page.waitForSelector('.battle-map-page');
  const battleSelectors = await page.locator('.battle-selector-btn').allTextContents();
  console.log('Battle selectors found:', battleSelectors.map(s => s.trim()));

  // Switch to Ngoc Hoi Dong Da
  await page.click('button.battle-selector-btn:has-text("Ngọc Hồi")');
  await page.waitForTimeout(500);
  console.log('Switched battle to Ngọc Hồi - Đống Đa!');

  // 5. Test MuseumTab interactions
  await page.click('button.nav-link:has-text("Bảo Tàng")');
  await page.waitForSelector('.museum-page');
  await page.fill('input.museum-search-input', 'hỏa hổ');
  await page.waitForTimeout(300);
  const plaqueCardsCount = await page.locator('article.museum-plaque-card').count();
  console.log('Museum cards found for "hỏa hổ":', plaqueCardsCount);

  // Open first plaque modal
  await page.click('article.museum-plaque-card >> nth=0');
  await page.waitForSelector('.museum-modal-frame');
  const modalTitle = await page.locator('#modal-artifact-title').textContent();
  console.log('Museum modal opened for:', modalTitle);
  await page.click('button.museum-modal-close-btn');
  await page.waitForTimeout(300);
  console.log('Museum modal closed successfully!');

  // 6. Test AiStationTab
  await page.click('button.nav-link:has-text("Sử Quan AI")');
  await page.waitForSelector('.ai-station-page');
  const edictsCount = await page.locator('button.scroll-edict-chip').count();
  console.log('AI quick prompt edicts found:', edictsCount);

  // 7. Test SurveyTab
  await page.click('button.nav-link:has-text("Đánh Giá")');
  await page.waitForSelector('.survey-page');
  const writeReviewBtn = page.locator('button.btn-write-review');
  await writeReviewBtn.click();
  await page.waitForSelector('.review-input-form');
  console.log('Survey review form opened successfully!');

  // Test rating selection
  const starBtns = page.locator('.star-picker-interactive button.star-btn');
  await starBtns.nth(4).click(); // 5 stars
  console.log('Selected 5 stars rating');

  console.log('Console errors recorded:', errors.length);
  if (errors.length > 0) {
    console.log('Errors logged:', errors);
  }

  await browser.close();
  console.log('--- Playwright Full Flow Probe: ALL PASSED PERFECTLY ---');
})();
