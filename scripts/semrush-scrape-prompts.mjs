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

  // Click Prompts tab button
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText?.trim().startsWith('Prompts'));
    if (btn) btn.click();
  });
  await sleep(3000);

  const allPrompts = [];
  let pageNum = 1;
  const maxPages = 10; // Get first 10 pages = ~100 prompts (highest volume ones)

  while (pageNum <= maxPages) {
    const rows = await pg.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('[role="row"]'));
      return rows.slice(1).map(r => { // skip header row
        const cells = Array.from(r.querySelectorAll('[role="cell"], td'));
        return {
          prompt: cells[0]?.innerText?.trim().substring(0, 300),
          aiResponse: cells[1]?.innerText?.trim().substring(0, 200),
          brands: cells[2]?.innerText?.trim().substring(0, 100),
          sources: cells[3]?.innerText?.trim(),
        };
      }).filter(r => r.prompt && r.prompt.length > 5);
    });

    console.log(`Page ${pageNum}: ${rows.length} prompts`);
    rows.forEach(r => {
      console.log(`  Q: ${r.prompt}`);
      if (r.brands) console.log(`     Brands: ${r.brands}`);
    });
    allPrompts.push(...rows);

    // Check if there's a next page
    const hasNext = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const nextBtn = btns.find(b => (b.innerText || '').trim() === 'Next' && !b.disabled);
      if (nextBtn) { nextBtn.click(); return true; }
      return false;
    });
    if (!hasNext) break;
    await sleep(2500);
    pageNum++;
  }

  console.log(`\n\nTotal prompts collected: ${allPrompts.length}`);

  // Filter for service-related (not training/education)
  const trainingWords = ['course', 'training', 'become', 'career', 'school', 'program', 'certification', 'degree', 'study', 'learn', 'student', 'certification exam', 'equipment', 'software', 'tool'];
  const servicePrompts = allPrompts.filter(p => {
    const text = (p.prompt || '').toLowerCase();
    return !trainingWords.some(w => text.includes(w));
  });

  console.log(`\n=== SERVICE-RELATED PROMPTS (${servicePrompts.length} total) ===`);
  console.log('These are what people ask AI when looking to HIRE a home inspector:\n');
  servicePrompts.forEach((p, i) => {
    console.log(`${i+1}. ${p.prompt}`);
    if (p.brands && p.brands.trim()) console.log(`   → AI mentions: ${p.brands}`);
  });

  // Save all to file
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/ai-prompts-data.json',
    JSON.stringify({ total: allPrompts.length, service: servicePrompts, all: allPrompts }, null, 2)
  );
  console.log('\nSaved to ai-prompts-data.json');

  // Also check Home Inspection Costs specifically (high commercial intent)
  console.log('\n\n=== CHECKING: Home Inspection Costs topic ===');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection%20costs&db=ca', {
    waitUntil: 'networkidle2', timeout: 25000
  });
  await sleep(3000);

  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText?.trim().startsWith('Prompts'));
    if (btn) btn.click();
  });
  await sleep(3000);

  const costRows = await pg.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('[role="row"]'));
    return rows.slice(1).map(r => {
      const cells = Array.from(r.querySelectorAll('[role="cell"], td'));
      return cells[0]?.innerText?.trim().substring(0, 300);
    }).filter(t => t && t.length > 5);
  });
  console.log('Cost prompts:');
  costRows.forEach((r, i) => console.log(`  ${i+1}. ${r}`));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
