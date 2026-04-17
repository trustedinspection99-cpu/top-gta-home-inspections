/**
 * protasker-gap-tool.mjs
 * Interact with SEMrush Keyword Gap tool to get Protasker vs HomeStars vs Bark gaps.
 * Uses type-by-selector and retry approaches.
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Gap-Data.md';

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(45000);
  await pg.setRequestInterception(true);
  pg.on('request', req => {
    try {
      if (['image','font','media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch(_) {}
  });

  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  console.log('Loading Keyword Gap tool...');
  await pg.goto('https://www.semrush.com/analytics/keywordgap/?rankType=unique&db=ca',
    { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(6000);

  // Debug: screenshot + dump all inputs/buttons
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-debug1.png' });
  const debug = await pg.evaluate(() => ({
    url: window.location.href,
    inputs: Array.from(document.querySelectorAll('input, [contenteditable="true"], [role="textbox"]')).map((el, i) => ({
      i, tag: el.tagName, type: el.type||'', ph: el.placeholder||'', id: el.id||'',
      cls: (el.className||'').substring(0,50), text: (el.innerText||el.value||'').substring(0,30)
    })),
    buttons: Array.from(document.querySelectorAll('button')).map(b => ({
      text: (b.innerText||'').trim().substring(0,40), type: b.type||''
    })).filter(b => b.text),
    text: document.body.innerText.substring(0, 800)
  }));
  console.log('URL:', debug.url);
  console.log('Inputs:', JSON.stringify(debug.inputs, null, 2));
  console.log('Buttons:', JSON.stringify(debug.buttons, null, 2));
  console.log('\nPage text:\n', debug.text.substring(0,500));

  // Try filling form using page.type with fresh element lookup each time
  let filled = false;
  try {
    // Fill "You" domain (first domain input area)
    // Strategy: click the first domain area and type
    const firstDomainInput = await pg.$('input[placeholder*="domain"], input[placeholder*="Domain"], input[placeholder*="Add"], input[placeholder*="Enter"], input[placeholder*="URL"]');
    if (!firstDomainInput) {
      console.log('No standard input found, trying positional click...');

      // Try clicking where the "You" input area typically is
      await pg.evaluate(() => {
        // Find elements that look like input areas
        const els = Array.from(document.querySelectorAll('*')).filter(el => {
          const t = (el.innerText || '').trim().toLowerCase();
          const role = el.getAttribute('role') || '';
          return (t === 'you' || t === 'add domain' || role === 'textbox' || el.contentEditable === 'true')
            && el.getBoundingClientRect().height > 10;
        });
        return els.map(el => ({
          tag: el.tagName, text: (el.innerText||'').trim().substring(0,20),
          role: el.getAttribute('role')||'', rect: el.getBoundingClientRect()
        }));
      }).then(els => console.log('Editable-like elements:', JSON.stringify(els.slice(0,5), null, 2))).catch(()=>{});

      throw new Error('No domain input found');
    }

    // Type domains sequentially — use fresh selectors each time
    const domainInputs = await pg.$$('input[placeholder*="domain" i], input[placeholder*="Domain" i], input[placeholder*="Add" i]');
    console.log(`Found ${domainInputs.length} "Add domain" inputs`);

    // Check for the "You" row input too
    const allTextInputs = await pg.$$('input[type="text"], input:not([type])');
    console.log(`All text inputs: ${allTextInputs.length}`);

    // Print what each text input contains
    for (let i = 0; i < Math.min(allTextInputs.length, 5); i++) {
      const info = await allTextInputs[i].evaluate(el => ({ ph: el.placeholder, val: el.value, id: el.id }));
      console.log(`  Input ${i}:`, info);
    }

    // Fill in "You" domain (typically the first input on the page)
    if (allTextInputs.length >= 1) {
      await allTextInputs[0].evaluate(el => { el.value = ''; });
      await allTextInputs[0].click();
      await sleep(500);
      await pg.keyboard.type('protasker.ca', { delay: 80 });
      await sleep(1500);
      // Press Tab or Enter to confirm
      await pg.keyboard.press('Tab');
      await sleep(1000);
    }

    // Fill competitor 1
    if (allTextInputs.length >= 2) {
      await allTextInputs[1].evaluate(el => { el.value = ''; });
      await allTextInputs[1].click();
      await sleep(500);
      await pg.keyboard.type('homestars.com', { delay: 80 });
      await sleep(1500);
      await pg.keyboard.press('Tab');
      await sleep(1000);
    }

    // Fill competitor 2 — might need to use the "Add domain" button first
    // Find it again in case DOM refreshed
    const inputs2 = await pg.$$('input[type="text"], input:not([type])');
    if (inputs2.length >= 3) {
      await inputs2[2].evaluate(el => { el.value = ''; });
      await inputs2[2].click();
      await sleep(500);
      await pg.keyboard.type('bark.com', { delay: 80 });
      await sleep(1500);
      await pg.keyboard.press('Tab');
      await sleep(1000);
    }

    // Screenshot before clicking compare
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-debug2.png' });
    console.log('Screenshots: gap-debug1.png, gap-debug2.png');

    // Click Compare button
    const compareClicked = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
      const compare = btns.find(b => {
        const t = (b.innerText || b.textContent || '').trim().toLowerCase();
        return t === 'compare' || t.includes('compar') || t === 'search' || t === 'analyze';
      });
      if (compare) {
        compare.click();
        return (compare.innerText || '').trim();
      }
      return null;
    });
    console.log('Clicked:', compareClicked);

    if (compareClicked) {
      console.log('Waiting for results...');
      await sleep(18000);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-debug3.png' });

      // Read results
      const results = await pg.evaluate(() => {
        const rows = [];
        // Try table
        document.querySelectorAll('table tbody tr, [role="row"]').forEach((tr, i) => {
          if (i >= 100) return;
          const cells = tr.querySelectorAll('td, [role="cell"]');
          if (cells.length < 2) return;
          const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
          const vol = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
          const kd  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
          if (kw && kw.length > 2 && (vol || kd)) rows.push({ kw, vol, kd });
        });
        if (rows.length > 0) return { rows, method: 'table' };

        // Line scan
        const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const res = [];
        for (let i = 0; i < lines.length - 2 && res.length < 100; i++) {
          const vol = lines[i+1];
          if (/^[\d,]+$/.test(vol.replace(/,/g,'')) && parseInt(vol.replace(/,/g,'')) > 0) {
            const kw = lines[i];
            if (kw.length > 3 && kw.length < 80 && !kw.startsWith('Skip') &&
                !/^\d+$/.test(kw) && !kw.includes('©')) {
              res.push({ kw, vol, kd: lines[i+2]||'' });
              i += 2;
            }
          }
        }
        return { rows: res, method: 'linescan', pageText: document.body.innerText.substring(0, 1000) };
      });

      console.log(`Results: ${results.rows?.length || 0} rows (${results.method})`);
      if (results.rows?.length > 0) {
        console.log('Sample:', JSON.stringify(results.rows.slice(0,5), null, 2));
        filled = true;

        // Save gap data
        let md = `# Protasker vs HomeStars vs Bark — Keyword Gap\n*${new Date().toISOString().split('T')[0]}*\n\n`;
        md += `| Keyword | Volume | KD |\n|---|---|---|\n`;
        results.rows.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} |\n`; });
        writeFileSync(OUT, md, 'utf8');
        console.log(`✅ Gap data saved → ${OUT}`);
      } else {
        console.log('Page text sample:', results.pageText?.substring(0, 500));
      }
    }
  } catch(e) {
    console.log('Error:', e.message.substring(0, 100));
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-error.png' });
  }

  if (!filled) {
    console.log('\n⚠ Gap tool form interaction failed. Screenshots saved for manual review.');
    console.log('Manual URL to fill: https://www.semrush.com/analytics/keywordgap/?rankType=unique&db=ca');
    console.log('Domains: protasker.ca vs homestars.com vs bark.com');
  }

  try { await pg.close(); } catch(_) {}
  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
