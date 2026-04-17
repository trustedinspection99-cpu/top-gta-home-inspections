/**
 * protasker-gap-fill.mjs
 * Handle multi-login warning then fill keyword gap tool.
 */
import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Gap-Data.md';

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });

  // Use existing pages rather than opening a new one to avoid session issues
  const pages = await browser.pages();
  console.log(`Open pages: ${pages.length}`);

  // Close all pages except first to reduce session count
  for (let i = pages.length - 1; i > 0; i--) {
    try { await pages[i].close(); } catch(_) {}
  }
  await sleep(2000);

  const pg = pages[0];
  pg.setDefaultTimeout(45000);
  await pg.setRequestInterception(true).catch(()=>{});
  pg.on('request', req => {
    try {
      if (['image','font','media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch(_) {}
  });

  // First, dismiss any multi-login warning
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  // Click Continue if multi-login warning shows
  const dismissed = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => (b.innerText||'').trim() === 'Continue');
    if (cont) { cont.click(); return true; }
    return false;
  });
  if (dismissed) {
    console.log('Dismissed multi-login warning');
    await sleep(3000);
  }

  console.log('Navigating to Keyword Gap...');
  await pg.goto('https://www.semrush.com/analytics/keywordgap/?db=ca',
    { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(6000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-fill1.png' });

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    inputs: Array.from(document.querySelectorAll('input')).map((el,i) => ({
      i, ph: el.placeholder||'', val: el.value||'', id: el.id||''
    })),
    text: document.body.innerText.substring(0,500)
  }));

  console.log('Page:', state.title, state.url);
  console.log('Inputs:', JSON.stringify(state.inputs, null, 2));

  // Use page.type by targeting inputs directly
  const inputEls = await pg.$$('input');
  console.log(`Found ${inputEls.length} inputs on gap page`);

  if (inputEls.length >= 1) {
    console.log('Filling domains...');
    // Type protasker.ca into first input
    await pg.click(inputEls[0] ? 'input' : 'body');
    const inputs = await pg.$$('input');
    await inputs[0].triple_click?.() || await inputs[0].click({ clickCount: 3 });
    await pg.keyboard.type('protasker.ca', { delay: 60 });
    await sleep(1500);
    await pg.keyboard.press('Tab');
    await sleep(1000);

    // Get fresh inputs
    const inputs2 = await pg.$$('input');
    console.log(`After first fill: ${inputs2.length} inputs`);
    if (inputs2.length >= 2) {
      await inputs2[1].click({ clickCount: 3 });
      await pg.keyboard.type('homestars.com', { delay: 60 });
      await sleep(1500);
      await pg.keyboard.press('Tab');
      await sleep(1000);
    }

    const inputs3 = await pg.$$('input');
    console.log(`After second fill: ${inputs3.length} inputs`);
    if (inputs3.length >= 3) {
      await inputs3[2].click({ clickCount: 3 });
      await pg.keyboard.type('bark.com', { delay: 60 });
      await sleep(1500);
      await pg.keyboard.press('Tab');
      await sleep(1000);
    }

    await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-fill2.png' });

    // Click Compare
    const clicked = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
      const cmp = btns.find(b => /compar|search|analyz/i.test((b.innerText||b.textContent||'')));
      if (cmp) { cmp.click(); return (cmp.innerText||'').trim(); }
      // Try submit button
      const sub = document.querySelector('button[type="submit"], input[type="submit"]');
      if (sub) { sub.click(); return 'submit'; }
      return null;
    });
    console.log('Clicked:', clicked);

    if (clicked) {
      console.log('Waiting for gap results...');
      await sleep(20000);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-fill3.png' });

      const results = await pg.evaluate(() => {
        const rows = [];
        document.querySelectorAll('table tbody tr, [role="row"]').forEach((tr, i) => {
          if (i >= 100) return;
          const cells = tr.querySelectorAll('td, [role="cell"]');
          if (cells.length < 2) return;
          const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
          const vol = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
          const kd  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
          if (kw && kw.length > 2) rows.push({ kw, vol, kd });
        });
        const text = document.body.innerText;
        return { rows, pageText: text.substring(0, 2000) };
      });

      console.log(`Gap rows: ${results.rows.length}`);
      if (results.rows.length > 0) {
        let md = `# Protasker vs HomeStars vs Bark — Keyword Gap\n*${new Date().toISOString().split('T')[0]}*\n\n`;
        md += `| Keyword | Volume | KD |\n|---|---|---|\n`;
        results.rows.forEach(r => { md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} |\n`; });
        writeFileSync(OUT, md, 'utf8');
        console.log(`✅ Saved → ${OUT}`);
      } else {
        console.log('Page text:', results.pageText.substring(0,600));
      }
    }
  }

  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
