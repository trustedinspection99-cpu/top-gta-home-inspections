import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(4000);

  // Click the METRIC BLOCK "Prompts 326" (not the pill button) - what worked before
  await pg.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('*'));
    // Find the metric block title "Prompts" (class pr-metric-block__title)
    const el = allEls.find(e => e.className?.includes('pr-metric-block') && e.innerText?.trim() === 'Prompts\n326');
    if (el) { el.click(); return 'clicked pr-metric-block Prompts'; }
    // Try metric block title
    const title = allEls.find(e => e.className?.includes('pr-metric-block__title') && e.innerText?.trim() === 'Prompts');
    if (title) { title.closest('[class*="pr-metric-block"]')?.click(); return 'clicked via title'; }
  });
  await sleep(1000);

  // Also click the pill button
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText?.trim().startsWith('Prompts'));
    if (btn) btn.click();
  });
  await sleep(3000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/prompts-loaded.png' });

  // Dump raw innerText to see what's there
  const rawText = await pg.evaluate(() => document.body.innerText);
  console.log('RAW TEXT (first 5000 chars):');
  console.log(rawText.substring(0, 5000));

  // Save raw text for analysis
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-raw.txt', rawText);
  console.log('\nSaved raw text to semrush-raw.txt');

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
