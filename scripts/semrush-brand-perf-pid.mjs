import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('semrush')) || pages[0];
  pg.setDefaultTimeout(40000);

  await pg.goto('https://www.semrush.com/ai-seo/brand-performance/?pid=165377', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/brand-perf-pid.png' });

  // Scroll through full page
  await pg.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, 400);
        total += 400;
        if (total >= 12000) { clearInterval(interval); resolve(); }
      }, 200);
    });
  });
  await sleep(3000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/brand-perf-pid-bottom.png' });

  const text = await pg.evaluate(() => document.body.innerText);
  console.log('URL:', pg.url());
  console.log('FULL TEXT:\n', text);

  // Get all tabs/sections visible
  const tabs = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('[role="tab"], button, a'))
      .map(el => ({ tag: el.tagName, text: el.innerText?.trim(), href: el.href }))
      .filter(t => t.text && t.text.length > 1 && t.text.length < 80);
  });
  console.log('\nTABS/BUTTONS:', JSON.stringify(tabs.slice(0, 40), null, 2));

  // Try clicking through any tabs to get more data
  const tabNames = ['Overview', 'Share of Voice', 'Sentiment', 'Narrative', 'Mentions', 'Competitors', 'Brand'];
  for (const tabName of tabNames) {
    const clicked = await pg.evaluate((name) => {
      const els = Array.from(document.querySelectorAll('[role="tab"], button, a, li'));
      const el = els.find(e => e.innerText?.trim().toLowerCase().includes(name.toLowerCase()));
      if (el) { el.click(); return el.innerText?.trim(); }
      return null;
    }, tabName);
    if (clicked) {
      await sleep(2500);
      const tabText = await pg.evaluate(() => document.body.innerText);
      console.log(`\n--- TAB: ${clicked} ---\n`, tabText.substring(0, 4000));
      await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/brand-perf-tab-${tabName}.png` });
    }
  }

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/brand-perf-full-data.json',
    JSON.stringify({ url: pg.url(), fullText: text, tabs }, null, 2));
  console.log('\n✅ Saved');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
