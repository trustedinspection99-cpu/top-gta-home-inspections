/**
 * Debug: Extract from the backlinks page with role=row elements
 */
import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  await pg.goto(
    'https://www.semrush.com/analytics/backlinks/backlinks/?q=mikeholmesinspections.com&searchType=domain',
    { waitUntil: 'networkidle2', timeout: 60000 }
  );
  await sleep(6000);
  console.log('URL:', pg.url());

  const data = await pg.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('[role="row"]'));
    // Sample first 10 rows — text and any links inside
    const samples = rows.slice(0, 12).map(row => {
      const links = Array.from(row.querySelectorAll('a[href]')).map(a => a.href).filter(h => h);
      return {
        text: row.innerText?.substring(0, 200),
        links,
      };
    });

    // Also try: look for the "Page" and "Domain" columns specifically
    // Check what the first row (header) looks like
    const headerRow = rows[0];
    const headerCells = Array.from(headerRow?.querySelectorAll('[role="cell"],[role="columnheader"],th,td') || []);

    return {
      totalRows: rows.length,
      headerText: headerRow?.innerText?.substring(0, 200),
      headerCells: headerCells.map(c => c.innerText?.trim()),
      rowSamples: samples,
    };
  });

  console.log('Total rows:', data.totalRows);
  console.log('Header:', data.headerText);
  console.log('Header cells:', data.headerCells);
  console.log('\nRow samples:');
  data.rowSamples.forEach((r, i) => {
    console.log(`\n--- Row ${i} ---`);
    console.log('Text:', r.text?.substring(0, 150));
    console.log('Links:', r.links.slice(0, 5));
  });

  browser.disconnect();
}

main().catch(e => console.error('Fatal:', e.message));
