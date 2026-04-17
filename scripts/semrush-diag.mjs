/**
 * semrush-diag.mjs - Diagnose SEMrush organic positions page structure
 */
import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  // Navigate to homestars organic positions
  console.log('Navigating...');
  await pg.goto(
    'https://www.semrush.com/analytics/organic/positions/?q=homestars.com&db=ca&sortby=Po&order=asc',
    { waitUntil: 'domcontentloaded', timeout: 40000 }
  ).catch(e => console.log('Nav note:', e.message.substring(0,60)));

  await sleep(12000);

  // Take screenshot
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/semrush-diag1.png', fullPage: false });
  console.log('Screenshot 1 saved');

  // Get full page structure
  const info = await pg.evaluate(() => {
    const tables = Array.from(document.querySelectorAll('table'));
    const tableInfo = tables.map(t => ({
      rows: t.querySelectorAll('tbody tr').length,
      headers: Array.from(t.querySelectorAll('th')).map(th => th.innerText?.trim()),
      firstRowCells: Array.from(t.querySelectorAll('tbody tr')).slice(0,3).map(tr =>
        Array.from(tr.querySelectorAll('td')).map(td => td.innerText?.trim()?.substring(0,50))
      )
    }));

    // Get all text in chunks
    const text = document.body.innerText;
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    return {
      tableCount: tables.length,
      tableInfo,
      totalLines: lines.length,
      first100Lines: lines.slice(0, 100),
      url: window.location.href
    };
  });

  console.log('URL:', info.url);
  console.log('Tables found:', info.tableCount);
  info.tableInfo.forEach((t, i) => {
    console.log(`Table ${i}: ${t.rows} rows`);
    console.log('  Headers:', t.headers.slice(0,8));
    console.log('  First rows:', JSON.stringify(t.firstRowCells.slice(0,2)));
  });
  console.log('\nFirst 100 lines:');
  info.first100Lines.forEach((l, i) => console.log(`  ${i}: ${l}`));

  // Scroll and check again
  console.log('\nScrolling...');
  for (let s = 0; s < 5; s++) {
    await pg.evaluate(s => window.scrollTo(0, s * 500), s);
    await sleep(800);
  }
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/semrush-diag2.png', fullPage: false });
  console.log('Screenshot 2 saved');

  const info2 = await pg.evaluate(() => {
    const tables = Array.from(document.querySelectorAll('table'));
    return {
      tableCount: tables.length,
      firstTable: tables[0] ? {
        rows: tables[0].querySelectorAll('tbody tr').length,
        headers: Array.from(tables[0].querySelectorAll('th')).map(th => th.innerText?.trim()),
        allRows: Array.from(tables[0].querySelectorAll('tbody tr')).slice(0,10).map(tr =>
          Array.from(tr.querySelectorAll('td')).map(td => td.innerText?.trim()?.substring(0,60))
        )
      } : null
    };
  });

  console.log('\nAfter scroll:');
  console.log('Tables:', info2.tableCount);
  if (info2.firstTable) {
    console.log('Table rows:', info2.firstTable.rows);
    console.log('Headers:', info2.firstTable.headers);
    console.log('Rows:', JSON.stringify(info2.firstTable.allRows, null, 2));
  }

  writeFileSync('C:/Users/Owner/Documents/semrush-diag.json', JSON.stringify({ info, info2 }, null, 2));
  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
