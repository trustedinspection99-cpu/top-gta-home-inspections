import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Gap-Data.md';

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(50000);

  // Navigate to multilogin page first
  await pg.goto('https://www.semrush.com/analytics/keywordgap/?db=ca', { waitUntil: 'domcontentloaded', timeout: 50000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-session1.png' });

  // Click "Terminate another session"
  const terminated = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const term = btns.find(b => /terminate/i.test(b.innerText || b.textContent || ''));
    if (term) { term.click(); return (term.innerText||term.textContent||'').trim(); }
    // Also try "Continue" or "Keep this session"
    const keep = btns.find(b => /continue|keep this session/i.test(b.innerText||''));
    if (keep) { keep.click(); return (keep.innerText||'').trim(); }
    return null;
  });
  console.log('Session action:', terminated);
  await sleep(4000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-session2.png' });

  // Now navigate to gap tool
  await pg.goto('https://www.semrush.com/analytics/keywordgap/?db=ca', { waitUntil: 'networkidle2', timeout: 50000 });
  await sleep(7000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-session3.png' });

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    inputs: Array.from(document.querySelectorAll('input')).slice(0,6).map((el,i) => ({
      i, ph: el.placeholder||'', val: el.value||''
    })),
    text: document.body.innerText.substring(0, 600)
  }));
  console.log('Gap page state:', state.url);
  console.log('Inputs:', JSON.stringify(state.inputs));
  console.log('Text:', state.text.substring(0,300));

  const isGapPage = state.url.includes('keywordgap') && !state.url.includes('multilogin');
  console.log('On gap page:', isGapPage);

  if (isGapPage && state.inputs.length >= 2) {
    // Fill domains using keyboard navigation
    // Focus first real domain input
    const domainInputIdx = state.inputs.findIndex(i => i.ph.includes('domain') || i.ph.includes('URL') || i.ph.includes('Enter'));
    console.log('Domain input at index:', domainInputIdx);

    const inputs = await pg.$$('input');

    // Type into first domain input (for "You" section)
    if (inputs.length >= 1) {
      await inputs[0].click({ clickCount: 3 });
      await sleep(300);
      await pg.keyboard.type('protasker.ca', { delay: 80 });
      await sleep(1500);

      // Press Enter or Tab to confirm
      await pg.keyboard.press('Enter');
      await sleep(1000);
    }

    // Get fresh inputs after React re-render
    const inputs2 = await pg.$$('input');
    console.log('Inputs after first entry:', inputs2.length);
    if (inputs2.length >= 2) {
      const info2 = await inputs2[1].evaluate(e => ({ ph: e.placeholder, val: e.value }));
      console.log('Input 1:', info2);
      await inputs2[1].click({ clickCount: 3 });
      await sleep(300);
      await pg.keyboard.type('homestars.com', { delay: 80 });
      await sleep(1500);
      await pg.keyboard.press('Enter');
      await sleep(1000);
    }

    const inputs3 = await pg.$$('input');
    console.log('Inputs after second entry:', inputs3.length);
    if (inputs3.length >= 3) {
      await inputs3[2].click({ clickCount: 3 });
      await sleep(300);
      await pg.keyboard.type('bark.com', { delay: 80 });
      await sleep(1500);
      await pg.keyboard.press('Enter');
      await sleep(1000);
    }

    await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-session4.png' });

    // Click Compare
    const compareText = await pg.evaluate(() => {
      const all = Array.from(document.querySelectorAll('button'));
      const cmp = all.find(b => /compar/i.test(b.innerText||''));
      if (cmp) { cmp.click(); return cmp.innerText; }
      return all.map(b => (b.innerText||'').trim().substring(0,20)).filter(Boolean).slice(0,8).join(' | ');
    });
    console.log('Compare action:', compareText);

    if (/compar/i.test(compareText||'')) {
      console.log('Waiting for results (18s)...');
      await sleep(18000);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-session5.png' });

      const results = await pg.evaluate(() => {
        const rows = [];
        document.querySelectorAll('table tbody tr').forEach((tr, i) => {
          if (i >= 80) return;
          const cells = Array.from(tr.querySelectorAll('td'));
          const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
          const vol = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
          const kd  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
          if (kw && kw.length > 2) rows.push({ kw, vol, kd });
        });
        return { rows, pageText: document.body.innerText.substring(0, 2000) };
      });

      console.log(`Gap rows: ${results.rows.length}`);
      if (results.rows.length > 0) {
        let md = `# Protasker vs HomeStars vs Bark — Keyword Gap\n*${new Date().toISOString().split('T')[0]}*\n\n`;
        md += `| Keyword | Volume | KD |\n|---|---|---|\n`;
        results.rows.forEach(r => { md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} |\n`; });
        writeFileSync(OUT, md, 'utf8');
        console.log(`✅ Saved → ${OUT}`);
      }
      console.log('Page sample:', results.pageText.substring(0, 500));
    }
  }

  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
