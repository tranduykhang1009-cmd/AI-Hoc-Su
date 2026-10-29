const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function launchBrowser() {
  return await chromium.launch({
    channel: 'chrome',
    headless: true,
  });
}

async function createTestPage(browser, options = {}) {
  const isMobile = options.isMobile || false;
  const viewport = options.viewport || (isMobile ? { width: 390, height: 844 } : { width: 1920, height: 1080 });

  const context = await browser.newContext({
    viewport,
    isMobile,
    hasTouch: isMobile,
    userAgent: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined
  });

  const page = await context.newPage();
  const consoleErrors = [];

  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.log(`[HTTP ${resp.status()}] ${resp.url()}`);
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore benign external network tile or external 404 errors if any slip through
      if (!text.includes('khms') && !text.includes('google.com/vt') && !text.includes('Failed to load resource')) {
        consoleErrors.push(`[Console Error] ${text}`);
      }
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(`[Page Error] ${err.message}`);
  });

  // Intercept external Gemini API requests to provide fast, authentic response without network 404
  await page.route('https://generativelanguage.googleapis.com/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: 'Vua Quang Trung đã thực hiện cuộc hành quân thần tốc từ Phú Xuân ra Thăng Long chỉ trong một thời gian kỷ lục. Binh sĩ được chia thành các tốp luân phiên cáng võng nghỉ ngơi, tạo nên thế trận bất ngờ đại phá 29 vạn quân Mãn Thanh mùa xuân Kỷ Dậu 1789.'
                }
              ]
            }
          }
        ]
      })
    });
  });

  // Intercept Google Sheets Webhook to return successful sync
  await page.route('https://script.google.com/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, count: 4, message: 'OK' })
    });
  });

  if (options.bypassIntro !== false) {
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem('su_intro_seen_session', 'v1');
      } catch (e) {}
    });
  }

  return { page, context, consoleErrors };
}

async function navigateToTab(page, tabName, verifySelector, timeout = 7000) {
  const navBtn = page.locator(`button.nav-link:has-text("${tabName}")`);
  await navBtn.waitFor({ state: 'visible', timeout: 5000 });
  await navBtn.click();
  if (verifySelector) {
    await page.waitForSelector(verifySelector, { state: 'visible', timeout });
  }
  await page.waitForTimeout(400); // Allow spring transitions to settle
}

module.exports = {
  BASE_URL,
  assert,
  launchBrowser,
  createTestPage,
  navigateToTab,
};
