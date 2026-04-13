import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function scrollFullPage(pg) {
  await pg.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, 300);
        total += 300;
        if (total >= 15000) { clearInterval(interval); resolve(); }
      }, 150);
    });
  });
  await sleep(2000);
}

async function clickTabAndGetText(pg, tabText) {
  const clicked = await pg.evaluate((text) => {
    const els = Array.from(document.querySelectorAll('button, a, [role="tab"], li, span'));
    const t = els.find(el => el.innerText?.trim().toLowerCase().includes(text.toLowerCase()));
    if (t) { t.click(); return t.innerText?.trim(); }
    return null;
  }, tabText);
  console.log(`Tab click "${tabText}":`, clicked);
  await sleep(3000);
  await scrollFullPage(pg);
  return pg.evaluate(() => document.body.innerText);
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('semrush')) || pages[0];
  pg.setDefaultTimeout(40000);

  const results = {};

  await pg.goto('https://www.semrush.com/ai-seo/overview/?q=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);

  // ── 1. Performing Topics ──
  console.log('\n━━━ Performing Topics ━━━');
  const perfText = await clickTabAndGetText(pg, 'Your Performing Topics');
  // Extract the table section
  const perfSection = perfText.match(/Your Performing Topics[\s\S]{0,5000}/)?.[0] || perfText.substring(0, 5000);
  results.performingTopics = perfSection;
  console.log(perfSection.substring(0, 3000));

  // ── 2. Topic Opportunities ──
  console.log('\n━━━ Topic Opportunities ━━━');
  const topicText = await clickTabAndGetText(pg, 'Topic Opportunities');
  const topicSection = topicText.match(/Topic Opportunities[\s\S]{0,6000}/)?.[0] || '';
  results.topicOpportunities = topicSection;
  console.log(topicSection.substring(0, 4000));

  // ── 3. Cited Sources ──
  console.log('\n━━━ Cited Sources ━━━');
  const srcText = await clickTabAndGetText(pg, 'Cited Sources');
  const srcSection = srcText.match(/Cited Sources[\s\S]{0,5000}/)?.[0] || '';
  results.citedSources = srcSection;
  console.log(srcSection.substring(0, 3000));

  // ── 4. Source Opportunities ──
  console.log('\n━━━ Source Opportunities ━━━');
  const srcOppText = await clickTabAndGetText(pg, 'Source Opportunities');
  const srcOppSection = srcOppText.match(/Source Opportunities[\s\S]{0,8000}/)?.[0] || '';
  results.sourceOpportunities = srcOppSection;
  console.log(srcOppSection.substring(0, 5000));

  // ── 5. Cited Pages ──
  console.log('\n━━━ Cited Pages ━━━');
  const citedText = await clickTabAndGetText(pg, 'Cited Pages');
  const citedSection = citedText.match(/Cited Pages[\s\S]{0,5000}/)?.[0] || '';
  results.citedPages = citedSection;
  console.log(citedSection.substring(0, 3000));

  // ── 6. Brand Performance page (screenshot) ──
  console.log('\n━━━ Brand Performance ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/brand-performance/?q=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(4000);
  await scrollFullPage(pg);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/brand-perf-full.png' });
  const brandPerfText = await pg.evaluate(() => document.body.innerText);
  results.brandPerformance = brandPerfText.substring(0, 5000);
  console.log(brandPerfText.substring(0, 3000));

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-full-opportunities2.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\n✅ Saved');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
