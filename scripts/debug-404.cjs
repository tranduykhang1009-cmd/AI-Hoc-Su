const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  page.on('response', r => {
    if (r.status() >= 400) console.log('HTTP 404 URL:', r.status(), r.url());
  });
  page.on('console', m => {
    if (m.type() === 'error') console.log('CONSOLE ERROR:', m.text(), JSON.stringify(m.location()));
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.addInitScript(() => sessionStorage.setItem('su_intro_seen_session', 'v1'));
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  const tabs = ['Dòng Thời Gian', 'Sa Bàn', 'Bảo Tàng', 'Sử Quan AI', 'Đố Vui', 'Đánh Giá', 'Trang Chủ'];
  for (const t of tabs) {
    console.log(`--- Tab: ${t} ---`);
    await page.click(`button.nav-link:has-text("${t}")`);
    await page.waitForTimeout(1000);
  }

  console.log('--- Admin Open ---');
  await page.click('button.navbar-admin-btn');
  await page.waitForTimeout(500);
  await page.fill('.admin-login-box input[type="password"]', '1789');
  await page.click('.admin-login-box button.login-btn');
  await page.waitForTimeout(500);

  const adminTabs = [
    'Khảo Sát & Google Sheets',
    'Kho Tri Thức Sử Liệu AI',
    'Bảo Tàng Hiện Vật',
    'Thông Tin & Hệ Thống'
  ];
  for (const at of adminTabs) {
    console.log(`--- Admin Tab: ${at} ---`);
    await page.click(`.admin-segmented-tab:has-text("${at}")`);
    await page.waitForTimeout(500);
  }

  await browser.close();
})();
