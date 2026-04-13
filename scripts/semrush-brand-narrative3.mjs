import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function scrollAndGetText(pg) {
  // Scroll through page to load lazy content
  await pg.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, 400);
        total += 400;
        if (total >= 8000) { clearInterval(interval); resolve(); }
      }, 200);
    });
  });
  await sleep(2000);
  return pg.evaluate(() => document.body.innerText);
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('semrush')) || pages[0];
  pg.setDefaultTimeout(40000);

  const results = {};

  // ── Start at the AI Visibility overview for asads.ca ──
  await pg.goto('https://www.semrush.com/ai-seo/overview/?q=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);

  // ── 1. Scroll down and click "Explore your brand performance" CTA ──
  console.log('\n━━━ Finding Brand Performance CTA ━━━');
  const brandPerfClicked = await pg.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('a, button, [role="button"], span'));
    const match = allEls.find(el => {
      const t = el.innerText?.toLowerCase() || '';
      return t.includes('brand perf') || t.includes('explore your brand') || t.includes('brand narrative') || t.includes('own your narrative') || t.includes('perception') || t.includes('sentiment');
    });
    if (match) { match.click(); return match.innerText; }
    return null;
  });
  console.log('Brand perf clicked:', brandPerfClicked);
  await sleep(4000);
  console.log('URL:', pg.url());
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/brand-perf-click.png' });

  // ── 2. Pull all sidebar nav links from within the tool ──
  const sideNav = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('[class*="sidebar"] a, [class*="nav"] a, [class*="menu"] a, [class*="side"] a'))
      .map(a => ({ text: a.innerText?.trim(), href: a.href }))
      .filter(a => a.text && a.href?.includes('semrush'));
  });
  console.log('\nSide nav:', JSON.stringify(sideNav, null, 2));

  // ── 3. Try known AI SEO sub-pages ──
  const subpages = [
    { url: 'https://www.semrush.com/ai-seo/brand-performance/?q=asads.ca', label: 'brand-performance' },
    { url: 'https://www.semrush.com/ai-seo/brand/?q=asads.ca', label: 'brand' },
    { url: 'https://www.semrush.com/ai-seo/topics/?q=asads.ca', label: 'topics' },
    { url: 'https://www.semrush.com/ai-seo/topic-opportunities/?q=asads.ca', label: 'topic-opportunities' },
    { url: 'https://www.semrush.com/ai-seo/sources/?q=asads.ca', label: 'sources' },
    { url: 'https://www.semrush.com/ai-seo/source-opportunities/?q=asads.ca', label: 'source-opportunities' },
    { url: 'https://www.semrush.com/ai-seo/cited-pages/?q=asads.ca', label: 'cited-pages' },
    { url: 'https://www.semrush.com/ai-seo/health/?q=asads.ca', label: 'ai-health' },
    { url: 'https://www.semrush.com/ai-seo/competitors/?q=asads.ca', label: 'competitors' },
    { url: 'https://www.semrush.com/ai-seo/sentiment/?q=asads.ca', label: 'sentiment' },
    { url: 'https://www.semrush.com/ai-seo/narrative/?q=asads.ca', label: 'narrative' },
  ];

  for (const { url, label } of subpages) {
    await pg.goto(url, { waitUntil: 'networkidle2', timeout: 35000 });
    await sleep(3000);
    const text = await pg.evaluate(() => document.body.innerText.substring(0, 200));
    const is404 = text.includes('got lost') || text.includes("doesn't exist");
    const isRedirected = !pg.url().includes(url.split('semrush.com')[1].split('?')[0]);
    if (!is404) {
      console.log(`\n✅ FOUND: ${label} → ${pg.url()}`);
      const fullText = await scrollAndGetText(pg);
      results[label] = fullText.substring(0, 6000);
      console.log(fullText.substring(0, 2000));
      await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-${label}.png` });
    } else {
      console.log(`❌ 404: ${label}`);
    }
  }

  // ── 4. Back to overview, extract ALL topic data by scrolling ──
  console.log('\n━━━ Full Topic Data from Overview ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/overview/?q=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);

  // Click "Topic Opportunities" tab
  const topicTabClicked = await pg.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('[role="tab"], button, a'));
    const t = tabs.find(el => el.innerText?.toLowerCase().includes('topic opportunit'));
    if (t) { t.click(); return t.innerText; }
    return null;
  });
  console.log('Topic opportunities tab:', topicTabClicked);
  await sleep(3000);
  const topicOppText = await scrollAndGetText(pg);
  results.topicOpportunities = topicOppText.substring(0, 6000);
  console.log(topicOppText.substring(0, 3000));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-topic-opportunities.png' });

  // Click "Source Opportunities"
  const srcTabClicked = await pg.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('[role="tab"], button, a'));
    const t = tabs.find(el => el.innerText?.toLowerCase().includes('source opportunit'));
    if (t) { t.click(); return t.innerText; }
    return null;
  });
  console.log('Source opportunities tab:', srcTabClicked);
  await sleep(3000);
  const srcOppText = await scrollAndGetText(pg);
  results.sourceOpportunities = srcOppText.substring(0, 8000);
  console.log(srcOppText.substring(0, 3000));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-source-opportunities.png' });

  // Click "Cited Pages"
  const citedTabClicked = await pg.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('[role="tab"], button, a'));
    const t = tabs.find(el => el.innerText?.toLowerCase().includes('cited pages'));
    if (t) { t.click(); return t.innerText; }
    return null;
  });
  console.log('Cited pages tab:', citedTabClicked);
  await sleep(3000);
  const citedText = await scrollAndGetText(pg);
  results.citedPages = citedText.substring(0, 6000);
  console.log(citedText.substring(0, 3000));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-cited-pages.png' });

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-brand-narrative3.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\n✅ All saved');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
