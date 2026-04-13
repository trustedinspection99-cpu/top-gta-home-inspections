import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(40000);

  const report = { brandMentions: {}, promptBrands: [], asadsVisibility: {}, competitors: [], topCitedDomains: [] };

  // ─── 1. Brand mentions in AI prompts ───
  console.log('\n═══ PHASE 1: Brand mentions in home inspection AI prompts ═══');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca&report=brands', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-brands1.png' });

  const brandsRaw = await pg.evaluate(() => {
    const text = document.body.innerText;
    return text.substring(0, 8000);
  });
  console.log('Brands page text (first 4000):\n', brandsRaw.substring(0, 4000));
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-brands-raw.txt', brandsRaw);

  // ─── 2. Also grab brands from prompts table ───
  console.log('\n═══ PHASE 2: Scraping brand column from prompts table ═══');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca&report=prompts', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(5000);

  // Click Prompts tab
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText?.trim().startsWith('Prompts'));
    if (btn) btn.click();
  });
  await sleep(3000);

  const allBrands = {};
  for (let p = 1; p <= 33; p++) {
    const data = await pg.evaluate(() => {
      // Get all class-based elements that might contain brand data
      const allEls = Array.from(document.querySelectorAll('[class*="brand"], [class*="Brand"]'));
      const brandTexts = allEls.map(e => e.innerText?.trim()).filter(t => t && t.length > 0 && t.length < 200);

      // Also try to get the full row data
      const text = document.body.innerText;
      // Find brand mentions - they appear after "View full response\n{number}\n{number}\n"
      // Pattern: after source count, brands appear
      const rows = [];
      const viewFRSections = text.split('View full response');
      viewFRSections.forEach(section => {
        const lines = section.split('\n').map(l => l.trim()).filter(l => l);
        // After the numbers (source counts), remaining text may be brand names
        const numLines = lines.filter(l => /^\d+$/.test(l));
        const nonNumLines = lines.filter(l => !/^\d+$/.test(l) && l.length > 1);
        if (nonNumLines.length > 0) {
          rows.push({ brands: brandTexts, nonNum: nonNumLines.slice(0, 5) });
        }
      });

      return { brandEls: brandTexts.slice(0, 50), rows: rows.slice(0, 10) };
    });

    if (data.brandEls.length > 0) {
      data.brandEls.forEach(b => {
        allBrands[b] = (allBrands[b] || 0) + 1;
      });
    }
    console.log(`Page ${p}: ${data.brandEls.length} brand elements`);
    if (data.brandEls.length > 0) data.brandEls.slice(0, 5).forEach(b => console.log('  •', b));

    // Next page
    const moved = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const next = btns.find(b => b.innerText?.trim() === 'Next' && !b.disabled);
      if (next) { next.click(); return true; }
      return false;
    });
    if (!moved) break;
    await sleep(2000);
  }

  // ─── 3. Source Domains tab ───
  console.log('\n═══ PHASE 3: Source Domains (sites AI cites) ═══');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca&report=source-domains', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-sourcedomains.png' });

  const sourceDomainsText = await pg.evaluate(() => document.body.innerText.substring(0, 6000));
  console.log('Source domains:\n', sourceDomainsText.substring(0, 3000));
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-sourcedomains-raw.txt', sourceDomainsText);

  // ─── 4. ASADS AI Visibility details ───
  console.log('\n═══ PHASE 4: ASADS.ca AI Visibility detail ═══');
  await pg.goto('https://www.semrush.com/ai-seo/overview/?domain=asads.ca', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(6000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-asads-ai.png' });

  const asadsText = await pg.evaluate(() => document.body.innerText.substring(0, 8000));
  console.log('ASADS AI overview:\n', asadsText.substring(0, 4000));
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-asads-ai-raw.txt', asadsText);

  // ─── 5. Competitor AI scores ───
  const competitors = [
    'mikeholmesinspections.com',
    'carsondunlop.com',
    'pillartopost.com',
    'amerispec.ca',
    'inchbyinchinspections.com',
  ];

  console.log('\n═══ PHASE 5: Competitor AI Visibility scores ═══');
  const compScores = [];
  for (const domain of competitors) {
    await pg.goto(`https://www.semrush.com/ai-seo/overview/?domain=${domain}`, {
      waitUntil: 'networkidle2', timeout: 30000
    });
    await sleep(4000);

    const score = await pg.evaluate(() => {
      const text = document.body.innerText;
      // Look for score patterns
      const scoreMatch = text.match(/AI\s*(?:Visibility\s*)?Score[:\s]+(\d+)/i) ||
                         text.match(/(\d+)\s*\/\s*100/) ||
                         text.match(/Score\s*(\d+)/i);
      const mentionsMatch = text.match(/(\d+)\s*(?:AI\s*)?[Mm]ention/);
      const citationsMatch = text.match(/(\d+)\s*[Cc]itation/);
      return {
        score: scoreMatch ? scoreMatch[1] : null,
        mentions: mentionsMatch ? mentionsMatch[1] : null,
        citations: citationsMatch ? citationsMatch[1] : null,
        snippet: text.substring(200, 1200)
      };
    });

    console.log(`\n${domain}:`);
    console.log('  Score:', score.score, '| Mentions:', score.mentions, '| Citations:', score.citations);
    console.log('  Snippet:', score.snippet.substring(0, 300));
    compScores.push({ domain, ...score });
  }

  // ─── 6. Brand Monitoring — "asads" mentions ───
  console.log('\n═══ PHASE 6: SEMrush Brand Monitoring (if available) ═══');
  await pg.goto('https://www.semrush.com/brand-monitoring/', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(4000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-brand-monitor.png' });
  const bmText = await pg.evaluate(() => document.body.innerText.substring(0, 3000));
  console.log('Brand monitoring page:', bmText.substring(0, 1000));

  // ─── 7. Backlink overview for asads.ca ───
  console.log('\n═══ PHASE 7: Backlink overview for asads.ca ═══');
  await pg.goto('https://www.semrush.com/analytics/backlinks/overview/?target=asads.ca&targetType=root_domain', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-backlinks-asads.png' });
  const backlinkText = await pg.evaluate(() => document.body.innerText.substring(0, 5000));
  console.log('Backlinks overview:\n', backlinkText.substring(0, 3000));
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-backlinks-raw.txt', backlinkText);

  // ─── Save report ───
  report.brandMentions = allBrands;
  report.competitors = compScores;

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-brand-report.json',
    JSON.stringify(report, null, 2));

  console.log('\n\n═══ BRAND MENTION SUMMARY ═══');
  const sorted = Object.entries(allBrands).sort((a,b) => b[1]-a[1]);
  sorted.slice(0, 30).forEach(([b, c]) => console.log(`  ${c}x — ${b}`));

  console.log('\nSaved: sr-brand-report.json, sr-brands-raw.txt, sr-sourcedomains-raw.txt, sr-asads-ai-raw.txt, sr-backlinks-raw.txt');

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
