import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function extractTableRows(pg) {
  return pg.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tr, [role="row"], [class*="row"]'));
    return rows.map(row => {
      const cells = Array.from(row.querySelectorAll('td, th, [role="cell"], [role="columnheader"], [class*="cell"]'));
      return cells.map(c => c.innerText?.trim()).filter(t => t);
    }).filter(r => r.length > 0);
  });
}

async function clickTab(pg, tabText) {
  return pg.evaluate((text) => {
    const tabs = Array.from(document.querySelectorAll('[role="tab"], button, a, li'));
    const t = tabs.find(el => el.innerText?.toLowerCase().includes(text.toLowerCase()));
    if (t) { t.click(); return t.innerText?.trim(); }
    return null;
  }, tabText);
}

async function loadAllRows(pg, nextBtnText = 'Next') {
  const allRows = [];
  let page = 1;
  while (true) {
    await sleep(2000);
    const rows = await extractTableRows(pg);
    allRows.push(...rows);
    console.log(`  Page ${page}: ${rows.length} rows`);
    // Try next page
    const hasNext = await pg.evaluate((btnText) => {
      const btns = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      const next = btns.find(b => {
        const t = b.innerText?.trim().toLowerCase();
        return t === btnText.toLowerCase() || t === '>' || t === 'next page';
      });
      if (next && !next.disabled) { next.click(); return true; }
      return false;
    }, nextBtnText);
    if (!hasNext || page >= 15) break;
    page++;
  }
  return allRows;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('semrush')) || pages[0];
  pg.setDefaultTimeout(40000);

  const results = {};

  await pg.goto('https://www.semrush.com/ai-seo/overview/?q=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);

  // ── 1. All Performing Topics ──
  console.log('\n━━━ All Performing Topics ━━━');
  await clickTab(pg, 'Your Performing Topics');
  await sleep(2000);
  const performingTopics = await loadAllRows(pg);
  results.performingTopics = performingTopics;
  console.log('Performing topics rows:', performingTopics.length);
  performingTopics.forEach(r => console.log(r.join(' | ')));

  // ── 2. All Topic Opportunities ──
  console.log('\n━━━ All Topic Opportunities ━━━');
  await clickTab(pg, 'Topic Opportunities');
  await sleep(2000);
  const topicOpps = await loadAllRows(pg);
  results.topicOpportunities = topicOpps;
  console.log('Topic opportunity rows:', topicOpps.length);
  topicOpps.forEach(r => console.log(r.join(' | ')));

  // ── 3. Cited Sources ──
  console.log('\n━━━ Cited Sources ━━━');
  await clickTab(pg, 'Cited Sources');
  await sleep(2000);
  const citedSources = await loadAllRows(pg);
  results.citedSources = citedSources;
  console.log('Cited source rows:', citedSources.length);
  citedSources.forEach(r => console.log(r.join(' | ')));

  // ── 4. Source Opportunities ──
  console.log('\n━━━ Source Opportunities (top 50) ━━━');
  await clickTab(pg, 'Source Opportunities');
  await sleep(2000);
  const sourceOpps = await loadAllRows(pg);
  results.sourceOpportunities = sourceOpps;
  console.log('Source opportunity rows:', sourceOpps.length);
  sourceOpps.slice(0, 50).forEach(r => console.log(r.join(' | ')));

  // ── 5. Cited Pages ──
  console.log('\n━━━ Cited Pages ━━━');
  await clickTab(pg, 'Cited Pages');
  await sleep(2000);
  const citedPages = await loadAllRows(pg);
  results.citedPages = citedPages;
  console.log('Cited pages rows:', citedPages.length);
  citedPages.forEach(r => console.log(r.join(' | ')));

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-full-opportunities.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\n✅ Saved');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
