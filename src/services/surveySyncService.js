// Service đồng bộ Đánh Giá Khảo Sát hai chiều giữa Web và Google Sheets / Apps Script Webhook
export const DEFAULT_SURVEY_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1s16mjYvhiHmsvJQwXeZpTZM616m_gxeRlsmGmnlIWfQ/edit?gid=0#gid=0';
export const DEFAULT_SURVEY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc9n6kQYS_fA41RdPI6VP_hSy6aVpwsZ7WtpIXdFtX0FGH7wg/viewform?embedded=true';
export const DEFAULT_SURVEY_SHEET_ID = '1s16mjYvhiHmsvJQwXeZpTZM616m_gxeRlsmGmnlIWfQ';

export const STORAGE_SURVEY_WEBHOOK_KEY = 'su_survey_webhook_url';

export function getSurveyWebhookUrl() {
  try {
    return localStorage.getItem(STORAGE_SURVEY_WEBHOOK_KEY) || '';
  } catch (e) {
    return '';
  }
}

export function saveSurveyWebhookUrl(url) {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem(STORAGE_SURVEY_WEBHOOK_KEY);
    } else {
      localStorage.setItem(STORAGE_SURVEY_WEBHOOK_KEY, url.trim());
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function extractSheetId(url) {
  if (!url) return DEFAULT_SURVEY_SHEET_ID;
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : DEFAULT_SURVEY_SHEET_ID;
}

// 1. Kéo toàn bộ đánh giá từ Cloud (Google Sheets / Webhook) về hiển thị trên web
export async function fetchReviewsFromCloud(sheetId = DEFAULT_SURVEY_SHEET_ID, webhookUrl = '') {
  const activeWebhook = webhookUrl || getSurveyWebhookUrl();

  // Ưu tiên 1: Lấy qua Webhook Apps Script nếu có
  if (activeWebhook) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(activeWebhook, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn('Không thể kéo dữ liệu từ Webhook, chuyển sang Google Sheet GViz:', err);
    }
  }

  // Ưu tiên 2: Lấy trực tiếp từ Google Sheets qua Google Visualization API (GViz)
  try {
    const sId = extractSheetId(sheetId);
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sId}/gviz/tq?tqx=out:json`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(gvizUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Google Sheets GViz HTTP Error: ${res.status}`);
    }

    const text = await res.text();
    // Bóc tách JSON từ hàm wrapper của Google: /*O_o*/ google.visualization.Query.setResponse({...});
    const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s);
    if (!match || !match[1]) {
      throw new Error('Dữ liệu Google Sheets không khớp định dạng GViz');
    }

    const json = JSON.parse(match[1]);
    const rows = json.table?.rows || [];

    if (rows.length === 0) return [];

    // Parse các hàng thành object Review
    const cloudReviews = [];
    rows.forEach((r, idx) => {
      const c = r.c || [];
      const val = (index) => (c[index] ? (c[index].f || c[index].v || '') : '');

      // Kiểm tra xem dòng này có phải header không
      const rawName = String(val(1) || val(0)).trim();
      if (!rawName || rawName.toLowerCase() === 'họ và tên' || rawName.toLowerCase() === 'timestamp') {
        return;
      }

      const rawRating = Number(val(4)) || 5;
      const reviewItem = {
        id: String(val(7) || `sheet-row-${idx}`),
        date: String(val(0) || 'Gần đây'),
        name: rawName,
        role: String(val(2) || 'Học sinh'),
        school: String(val(3) || 'THPT Nguyễn Huệ'),
        rating: Math.max(1, Math.min(5, rawRating)),
        comment: String(val(5) || 'Trải nghiệm tuyệt vời!'),
        likes: Number(val(6)) || 1,
        liked: false,
        badge: String(val(2)).includes('Giáo viên') ? 'Giáo viên' : 'Học sinh'
      };

      cloudReviews.push(reviewItem);
    });

    return cloudReviews;
  } catch (err) {
    console.warn('Lỗi kéo dữ liệu từ Google Sheet:', err.message);
    return null;
  }
}

// 2. Gửi đánh giá mới lên Cloud (Google Sheets) qua Apps Script Webhook
export async function sendReviewToCloud(reviewItem, webhookUrl = '') {
  const activeWebhook = webhookUrl || getSurveyWebhookUrl();
  if (!activeWebhook) {
    console.info('Chưa cấu hình Webhook URL, đánh giá sẽ lưu tại localStorage.');
    return { success: false, reason: 'no-webhook' };
  }

  try {
    // Gửi bằng mode no-cors để đảm bảo request luôn bay tới Google Apps Script kể cả khi redirect
    await fetch(activeWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(reviewItem),
      mode: 'no-cors'
    });

    return { success: true };
  } catch (err) {
    console.warn('Lỗi gửi đánh giá lên Webhook Cloud:', err);
    return { success: false, error: err.message };
  }
}
