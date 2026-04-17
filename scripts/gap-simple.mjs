/**
 * gap-simple.mjs — Single page, no request interception, just fill gap tool
 */
import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });

  // Close extra pages
  const pages = await browser.pages();
  console.log('Tabs open:', pages.length);
  for (let i = pages.length - 1; i > 0; i--) {
    try { await pages[i].close(); } catch(_) {}
  }

  const pg = pages[0];
  pg.setDefaultTimeout(50000);

  // Navigate to gap tool
  console.log('Navigating...');
  await pg.goto('https://www.semrush.com/analytics/keywordgap/?db=ca', { waitUntil: 'domcontentloaded', timeout: 50000 });
  await sleep(8000);

  // Handle multi-login popup if present
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => (b.innerText||'').trim() === 'Continue');
    if (cont) cont.click();
  });
  await sleep(2000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-s1.png' });

  const pageInfo = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    inputs: Array.from(document.querySelectorAll('input')).map((el,i) => ({
      i, ph: el.placeholder||'', val: el.value||''
    })),
    text: document.body.innerText.substring(0,400)
  }));

  console.log('URL:', pageInfo.url);
  console.log('Title:', pageInfo.title);
  console.log('Inputs:', JSON.stringify(pageInfo.inputs));
  console.log('Text:', pageInfo.text.substring(0,300));

  // Fill inputs
  if (pageInfo.inputs.length > 0) {
    // Use evaluate to directly set values
    const filled = await pg.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      const domains = ['protasker.ca', 'homestars.com', 'bark.com'];
      let filled = 0;
      inputs.forEach((inp, i) => {
        if (i < domains.length) {
          // Trigger React-compatible input change
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(inp, domains[i]);
          inp.dispatchEvent(new Event('input', { bubbles: true }));
          inp.dispatchEvent(new Event('change', { bubbles: true }));
          filled++;
        }
      });
      return filled;
    });
    console.log(`Filled ${filled} inputs via React setter`);
    await sleep(2000);

    await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-s2.png' });

    // Click Compare
    const btn = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cmp = btns.find(b => /compar/i.test(b.innerText||''));
      if (cmp) { cmp.click(); return cmp.innerText; }
      // Try any submit
      const sub = btns.find(b => b.type === 'submit' && b.innerText.length > 1);
      if (sub) { sub.click(); return sub.innerText; }
      return btns.map(b => b.innerText?.trim()).filter(Boolean).join(', ');
    });
    console.log('Compare btn:', btn);

    if (btn && /compar/i.test(btn)) {
      await sleep(18000);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-s3.png' });

      const gapText = await pg.evaluate(() => document.body.innerText.substring(0, 3000));
      console.log('Gap page after submit:\n', gapText.substring(0, 600));
    }
  }

  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
