const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  await page.addInitScript(() => sessionStorage.setItem('su_intro_seen_session', 'v1'));
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(500);

  await page.click('button.nav-link:has-text("Đánh Giá")');
  await page.waitForTimeout(400);
  await page.click('button.btn-write-review');
  await page.waitForTimeout(400);
  await page.fill('.review-input-form input[placeholder*="Nguyễn Văn An"]', 'A');
  await page.fill('.review-input-form textarea[placeholder*="Chia sẻ cảm nghĩ"]', 'B');
  await page.click('.review-input-form button[type="submit"]');
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const section = document.querySelector('section[aria-label*="Notifications"]');
    const toast = document.querySelector('[data-sonner-toast]');
    return {
      sectionHTML: section?.outerHTML,
      toastHTML: toast?.outerHTML,
      toastAttrs: toast ? toast.getAttributeNames().map(a => `${a}="${toast.getAttribute(a)}"`) : [],
      olAttrs: section?.querySelector('ol') ? section.querySelector('ol').getAttributeNames().map(a => `${a}="${section.querySelector('ol').getAttribute(a)}"`) : []
    };
  });
  console.log('ACTIVE SONNER DETAILS:', JSON.stringify(res, null, 2));
  await browser.close();
})();
