import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(40000);

  // ─── 1. All 44 pages of brand mentions ───
  console.log('═══ Scraping all 44 pages of brand mentions ═══');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca&report=brands', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(5000);

  const allBrands = [];

  async function extractBrandsPage() {
    return await pg.evaluate(() => {
      const text = document.body.innerText;
      // Find the table section
      const tableStart = text.indexOf('Brand\nMentions\nSource Domains\nPrompt Example');
      if (tableStart < 0) return [];
      const tableEnd = text.indexOf('\nPrev\n', tableStart);
      const tableText = tableEnd > 0 ? text.substring(tableStart + 50, tableEnd) : text.substring(tableStart + 50, tableStart + 5000);

      // Each brand entry: "brand name\n{number}\n{number}\n{prompt example}\nView full response\nAnalyze"
      const rows = [];
      const blocks = tableText.split(/\nView full response\n/).filter(b => b.trim().length > 5);
      blocks.forEach(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        // Lines: [brand, mentions, sourceDomains, promptExample..., Analyze?]
        const nums = [];
        const textLines = [];
        lines.forEach(l => {
          if (/^\d+$/.test(l)) nums.push(parseInt(l));
          else if (l !== 'Analyze' && l !== 'Sortable' && l !== 'Monitor') textLines.push(l);
        });
        if (textLines.length > 0 && nums.length >= 2) {
          rows.push({
            brand: textLines[0],
            mentions: nums[0],
            sourceDomains: nums[1],
            promptExample: textLines.slice(1).join(' ').substring(0, 150)
          });
        }
      });
      return rows;
    });
  }

  // First page
  let page1 = await extractBrandsPage();
  console.log(`Page 1: ${page1.length} brands`);
  page1.forEach(b => console.log(`  ${b.mentions}x — ${b.brand}`));
  allBrands.push(...page1);

  // Paginate through all 44 pages
  for (let p = 2; p <= 44; p++) {
    const moved = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const next = btns.find(b => b.innerText?.trim() === 'Next' && !b.disabled);
      if (next) { next.click(); return true; }
      return false;
    });
    if (!moved) { console.log(`No Next on page ${p-1}, stopping`); break; }
    await sleep(2000);

    const rows = await extractBrandsPage();
    allBrands.push(...rows);
    console.log(`Page ${p}/44: ${rows.length} brands → ${allBrands.length} total`);
    if (rows.length > 0) rows.slice(0, 2).forEach(b => console.log(`  ${b.mentions}x — ${b.brand}`));
  }

  // ─── 2. Source Domains — all pages ───
  console.log('\n═══ Scraping source domains (sites AI cites most) ═══');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca&report=source-domains', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(5000);

  // Navigate to Source Domains tab
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, [role="tab"]'));
    const btn = btns.find(b => b.innerText?.trim().startsWith('Source Domains'));
    if (btn) btn.click();
  });
  await sleep(3000);

  const allDomains = [];

  async function extractDomainsPage() {
    return await pg.evaluate(() => {
      const text = document.body.innerText;
      const tableStart = text.indexOf('Source Domain\nMentions\nPrompts');
      if (tableStart < 0) {
        // Try alternate header
        const alt = text.indexOf('Domain\nMentions');
        if (alt < 0) return { rows: [], raw: text.substring(500, 2000) };
        const section = text.substring(alt, alt + 5000);
        const lines = section.split('\n').map(l => l.trim()).filter(l => l);
        const rows = [];
        for (let i = 0; i < lines.length - 2; i++) {
          if (/\.(com|ca|org|net|io|gov)$/.test(lines[i]) && /^\d+$/.test(lines[i+1])) {
            rows.push({ domain: lines[i], mentions: parseInt(lines[i+1]) });
          }
        }
        return { rows, raw: '' };
      }
      const tableEnd = text.indexOf('\nPrev\n', tableStart);
      const tableText = tableEnd > 0 ? text.substring(tableStart + 30, tableEnd) : text.substring(tableStart + 30, tableStart + 5000);
      const lines = tableText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const rows = [];
      for (let i = 0; i < lines.length - 1; i++) {
        if (/\.(com|ca|org|net|io|gov|co)/.test(lines[i]) && /^\d+$/.test(lines[i+1])) {
          rows.push({ domain: lines[i], mentions: parseInt(lines[i+1]) });
        }
      }
      return { rows, raw: '' };
    });
  }

  let d = await extractDomainsPage();
  console.log(`Page 1: ${d.rows.length} domains`);
  if (d.raw) console.log('Raw:', d.raw.substring(0, 500));
  d.rows.forEach(r => console.log(`  ${r.mentions}x — ${r.domain}`));
  allDomains.push(...d.rows);

  for (let p = 2; p <= 10; p++) {
    const moved = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const next = btns.find(b => b.innerText?.trim() === 'Next' && !b.disabled);
      if (next) { next.click(); return true; }
      return false;
    });
    if (!moved) break;
    await sleep(2000);
    d = await extractDomainsPage();
    allDomains.push(...d.rows);
    console.log(`Page ${p}: ${d.rows.length} → ${allDomains.length} total domains`);
    d.rows.slice(0, 3).forEach(r => console.log(`  ${r.mentions}x — ${r.domain}`));
  }

  // ─── 3. Competitor scores via the AI visibility tool ───
  console.log('\n═══ Competitor AI Visibility scores ═══');
  const domains = ['mikeholmesinspections.com', 'carsondunlop.com', 'pillartopost.com', 'amerispec.ca', 'inchbyinchinspections.com'];
  const compScores = [];

  for (const domain of domains) {
    await pg.goto(`https://www.semrush.com/ai-seo/overview/?domain=${domain}`, {
      waitUntil: 'networkidle2', timeout: 35000
    });
    await sleep(5000);

    const data = await pg.evaluate(() => {
      const text = document.body.innerText;
      // Extract key metrics from the overview page
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

      // Find numeric values after known labels
      const find = (label) => {
        const idx = lines.findIndex(l => l.toLowerCase().includes(label.toLowerCase()));
        if (idx >= 0) {
          for (let i = idx + 1; i < Math.min(idx + 5, lines.length); i++) {
            if (/^[\d,]+$/.test(lines[i].replace(/[,%]/g, ''))) return lines[i];
          }
        }
        return null;
      };

      return {
        score: find('ai visibility') || find('visibility score') || find('score'),
        mentions: find('mention'),
        citations: find('citation'),
        citedPages: find('cited page'),
        snippet: lines.slice(0, 30).join(' | ').substring(0, 600)
      };
    });

    console.log(`\n${domain}:`);
    console.log(`  Score: ${data.score} | Mentions: ${data.mentions} | Citations: ${data.citations} | Cited Pages: ${data.citedPages}`);
    console.log(`  Lines: ${data.snippet.substring(0, 300)}`);
    compScores.push({ domain, ...data });
  }

  // ─── ASADS.ca ───
  await pg.goto('https://www.semrush.com/ai-seo/overview/?domain=asads.ca', {
    waitUntil: 'networkidle2', timeout: 35000
  });
  await sleep(5000);

  // Try clicking "Check AI Visibility" button if needed
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const btn = btns.find(b => b.innerText?.trim().includes('Check AI Visibility') || b.innerText?.trim().includes('asads.ca'));
    if (btn) btn.click();
  });
  await sleep(3000);

  const asadsData = await pg.evaluate(() => {
    const text = document.body.innerText;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    return { lines: lines.slice(0, 50), fullText: text.substring(0, 3000) };
  });

  console.log('\nasads.ca lines:', asadsData.lines.slice(0, 30).join('\n'));

  // Save everything
  const report = {
    topicMeta: {
      aiVolume: '42.4K',
      totalBrands: 437,
      totalSourceDomains: 872,
      totalPrompts: 326,
      intentBreakdown: { informational: '54%', commercial: '17%', navigational: '15%', transactional: '7%', task: '4%' }
    },
    topBrandsPage1: [
      { brand: 'carson dunlop', mentions: 91, sourceDomains: 151 },
      { brand: 'cahpi', mentions: 63, sourceDomains: 154 },
      { brand: 'internachi', mentions: 55, sourceDomains: 238 },
      { brand: 'consumer protection bc', mentions: 38, sourceDomains: 71 },
      { brand: 'oahi', mentions: 36, sourceDomains: 90 },
      { brand: 'canadian institute of home inspectors', mentions: 26, sourceDomains: 53 },
      { brand: 'spectora', mentions: 24, sourceDomains: 130 },
      { brand: 'nait', mentions: 24, sourceDomains: 57 },
      { brand: 'sait', mentions: 24, sourceDomains: 57 },
      { brand: 'youtube', mentions: 22, sourceDomains: 128 },
    ],
    topicsWithVolume: [
      { topic: 'Canadian Home Inspection', volume: 29000 },
      { topic: 'Home Inspection Checklists', volume: 4200 },
      { topic: 'Canadian Home Inspection Courses', volume: 3000 },
      { topic: 'BC Home Inspection & Training', volume: 1400 },
      { topic: 'Termite Signs & Home Inspection', volume: 1400 },
      { topic: 'Home Inspection Costs', volume: 1000 },
      { topic: 'Home Inspection Duration', volume: 901 },
      { topic: 'Carson Dunlop Home Inspection & Training', volume: 690 },
      { topic: 'Home Inspection Groups', volume: 389 },
      { topic: 'Home/Inspection Tools & Equipment', volume: 309 },
    ],
    allBrandsScraped: allBrands,
    allDomainsScraped: allDomains,
    competitors: compScores,
    asadsRaw: asadsData.lines,
  };

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-full-brand-report.json',
    JSON.stringify(report, null, 2));

  // Print final summaries
  console.log('\n\n════════════════════════════════════════');
  console.log('FULL BRANDS SCRAPED:', allBrands.length);
  allBrands.slice(0, 30).forEach(b => console.log(`  ${b.mentions}x — ${b.brand} (${b.sourceDomains} domains)`));

  console.log('\nFULL SOURCE DOMAINS SCRAPED:', allDomains.length);
  allDomains.slice(0, 20).forEach(d => console.log(`  ${d.mentions}x — ${d.domain}`));

  console.log('\nSaved to sr-full-brand-report.json');
  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
