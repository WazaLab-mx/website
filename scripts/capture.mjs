import { chromium } from 'playwright';

const url = process.argv[2];
const out = process.argv[3];
const width = parseInt(process.argv[4] || '1600', 10);
const height = parseInt(process.argv[5] || '1200', 10);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);

await page.evaluate(() => {
  const style = document.createElement('style');
  style.textContent = `
    [class*="cookie" i], [id*="cookie" i], [class*="consent" i], [id*="consent" i],
    [class*="newsletter" i], [class*="popup" i], [class*="modal-overlay" i],
    [class*="banner" i][class*="bottom" i], [class*="notice" i],
    iframe[src*="tawk"], iframe[src*="googleads"], iframe[src*="doubleclick"],
    [data-google-vignette], [id*="google_ads"], [id^="google_vignette"],
    ins.adsbygoogle, [class*="adsbygoogle"] { display: none !important; }
  `;
  document.head.appendChild(style);

  // Text-based fallback for cookie/consent UI
  const keywords = ['cookie', 'consent', 'analítica', 'analytic', 'acepto', 'accept', 'rechazar', 'reject'];
  document.querySelectorAll('*').forEach(el => {
    const t = (el.textContent || '').toLowerCase();
    if (t.length > 500) return;
    if (keywords.some(k => t.includes(k))) {
      const s = window.getComputedStyle(el);
      if (s.position === 'fixed' || s.position === 'sticky') el.style.display = 'none';
    }
  });
});
await page.waitForTimeout(500);

await page.screenshot({ path: out, fullPage: false });
console.log('Saved', out);
await browser.close();
