/**
 * semrush-debug.mjs
 * Takes screenshots + dumps HTML to find correct selectors
 */

import puppeteer from 'puppeteer';
import { mkdirSync, copyFileSync, existsSync, rmSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const CHROME_DEFAULT = 'C:/Users/Owner/AppData/Local/Google/Chrome/User Data/Default';
const TEMP_PROFILE   = 'C:/Users/Owner/AppData/Local/Puppeteer-SEMrush-Debug';
const OUT_DIR        = 'C:/Users/Owner/Documents/semrush-debug';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function setupTempProfile() {
  if (existsSync(TEMP_PROFILE)) {
    try { rmSync(TEMP_PROFILE, { recursive: true, force: true }); } catch (_) {}
  }
  mkdirSync(join(TEMP_PROFILE, 'Default', 'Network'), { recursive: true });

  const srcCookies = join(CHROME_DEFAULT, 'Network', 'Cookies');
  const dstCookies = join(TEMP_PROFILE, 'Default', 'Network', 'Cookies');
  if (existsSync(srcCookies)) {
    copyFileSync(srcCookies, dstCookies);
    console.log('✓ Copied Cookies');
  }

  const srcLS = join(CHROME_DEFAULT, 'Local Storage');
  const dstLS = join(TEMP_PROFILE, 'Default', 'Local Storage');
  if (existsSync(srcLS)) {
    mkdirSync(dstLS, { recursive: true });
    for (const f of readdirSync(srcLS)) {
      try { copyFileSync(join(srcLS, f), join(dstLS, f)); } catch (_) {}
    }
    console.log('✓ Copied Local Storage');
  }
}

mkdirSync(OUT_DIR, { recursive: true });
setupTempProfile();

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  userDataDir: TEMP_PROFILE,
  headless: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  defaultViewport: { width: 1440, height: 900 }
});

const page = await browser.newPage();

// ── 1. Check login ──────────────────────────────────────────────────────────
console.log('Navigating to SEMrush dashboard...');
await page.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
await sleep(3000);
console.log('URL:', page.url());
await page.screenshot({ path: join(OUT_DIR, '1-dashboard.png'), fullPage: false });

if (page.url().includes('login') || page.url().includes('signin')) {
  console.log('⚠ Not logged in! Waiting 3 min for manual login...');
  for (let i = 0; i < 36; i++) {
    await sleep(5000);
    if (!page.url().includes('login') && !page.url().includes('signin')) break;
    process.stdout.write(`\r  ${(i+1)*5}s...`);
  }
}

// ── 2. Keyword overview page ────────────────────────────────────────────────
console.log('\nNavigating to keyword overview...');
await page.goto(
  'https://www.semrush.com/analytics/keywordoverview/?q=wett+inspection+ontario&db=ca',
  { waitUntil: 'networkidle2', timeout: 45000 }
);
await sleep(5000);
await page.screenshot({ path: join(OUT_DIR, '2-keyword-overview.png'), fullPage: true });
console.log('Screenshot saved: 2-keyword-overview.png');

// Dump body text (first 3000 chars)
const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 3000));
writeFileSync(join(OUT_DIR, '2-body-text.txt'), bodyText, 'utf8');
console.log('Body text saved: 2-body-text.txt');

// Dump all visible numbers with surrounding context
const numbers = await page.evaluate(() => {
  const results = [];
  // Look for elements containing numbers that look like volume/KD/CPC
  document.querySelectorAll('*').forEach(el => {
    if (el.children.length > 0) return; // leaf nodes only
    const txt = el.innerText?.trim();
    if (!txt) return;
    if (/^[\d,]+$/.test(txt) || /^\$[\d.]+$/.test(txt) || /^\d+%$/.test(txt)) {
      const parent = el.parentElement;
      const grandparent = el.parentElement?.parentElement;
      results.push({
        value: txt,
        elClass: el.className?.substring(0, 80) || '',
        parentClass: parent?.className?.substring(0, 80) || '',
        grandClass: grandparent?.className?.substring(0, 80) || '',
        parentText: parent?.innerText?.trim()?.substring(0, 100) || ''
      });
    }
  });
  return results.slice(0, 60);
});
writeFileSync(join(OUT_DIR, '2-numbers.json'), JSON.stringify(numbers, null, 2), 'utf8');
console.log('Numbers dump saved: 2-numbers.json');

// Dump page title + h1/h2
const headings = await page.evaluate(() => ({
  title: document.title,
  h1: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()),
  h2: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()),
  // Look for metric/summary containers
  metrics: Array.from(document.querySelectorAll('[class*="metric"],[class*="Metric"],[class*="summary"],[class*="Summary"],[class*="overview"],[class*="Overview"]'))
    .slice(0, 20)
    .map(el => ({ class: el.className?.substring(0,80), text: el.innerText?.trim()?.substring(0, 150) }))
}));
writeFileSync(join(OUT_DIR, '2-headings.json'), JSON.stringify(headings, null, 2), 'utf8');
console.log('Headings dump saved: 2-headings.json');

// ── 3. Domain organic positions page ───────────────────────────────────────
console.log('\nNavigating to domain organic positions...');
await page.goto(
  'https://www.semrush.com/analytics/organic/positions/?q=asads.ca&db=ca&sortby=Po&order=asc',
  { waitUntil: 'networkidle2', timeout: 45000 }
);
await sleep(6000);
await page.screenshot({ path: join(OUT_DIR, '3-organic-positions.png'), fullPage: false });
console.log('Screenshot saved: 3-organic-positions.png');

// Dump table structure
const tableInfo = await page.evaluate(() => {
  const tables = document.querySelectorAll('table');
  return Array.from(tables).slice(0, 3).map(t => ({
    rowCount: t.querySelectorAll('tbody tr').length,
    headers: Array.from(t.querySelectorAll('thead th, thead td')).map(h => h.innerText.trim()),
    firstRows: Array.from(t.querySelectorAll('tbody tr')).slice(0, 5).map(tr =>
      Array.from(tr.querySelectorAll('td')).map(td => td.innerText.trim().substring(0, 50))
    )
  }));
});
writeFileSync(join(OUT_DIR, '3-table-info.json'), JSON.stringify(tableInfo, null, 2), 'utf8');
console.log('Table info saved: 3-table-info.json');

// Also check for non-table row data (some SEMrush pages use divs)
const rowDivs = await page.evaluate(() => {
  const rows = [];
  document.querySelectorAll('[class*="row"],[class*="Row"],[class*="item"],[class*="Item"],[class*="keyword"],[class*="Keyword"]').forEach((el, i) => {
    if (i > 30) return;
    const txt = el.innerText?.trim()?.substring(0, 150);
    if (txt && txt.length > 10) rows.push({ class: el.className?.substring(0,80), text: txt });
  });
  return rows.slice(0, 30);
});
writeFileSync(join(OUT_DIR, '3-row-divs.json'), JSON.stringify(rowDivs, null, 2), 'utf8');
console.log('Row divs saved: 3-row-divs.json');

console.log('\n✅ Debug complete. Check:', OUT_DIR);
await browser.close();
try { rmSync(TEMP_PROFILE, { recursive: true, force: true }); } catch (_) {}
