import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  const allPrompts = [];

  // We'll scrape by navigating to each topic and getting its prompts
  // First get topic list
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(4000);

  // Click Prompts pill button
  const box = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => (b.innerText || '').trim().startsWith('Prompts'));
    if (!btn) return null;
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width/2, y: r.y + r.height/2 };
  });
  if (box) { await pg.mouse.click(box.x, box.y); await sleep(3000); }

  // Get total pages
  const totalPages = await pg.evaluate(() => {
    const text = document.body.innerText;
    const m = text.match(/Page:\s*of\s*(\d+)/);
    return m ? parseInt(m[1]) : 33;
  });
  console.log('Total pages:', totalPages);

  // Extract prompts from current page using raw text parsing
  async function extractPage() {
    const text = await pg.evaluate(() => document.body.innerText);
    const start = text.indexOf('Prompt\nAI Response\nBrands\nSources');
    if (start < 0) {
      // Try alternate header
      const start2 = text.indexOf('AI Response\n');
      if (start2 < 0) return [];
      // Parse differently
    }
    const tableText = start >= 0 ? text.substring(start + 35) : text.substring(text.indexOf('\nExport\n') + 10);
    const endMarker = tableText.indexOf('\nPrev\n');
    const content = endMarker > 0 ? tableText.substring(0, endMarker) : tableText.substring(0, 8000);

    // Split by "View full response"
    const blocks = content.split(/\nView full response\n\d+\n\d+\n/).filter(b => b.trim());
    return blocks.map(block => {
      const lines = block.split('\n').map(l => l.trim()).filter(l => l && l !== '...');
      return lines[0] || '';
    }).filter(p => p.length > 10 && p.length < 400);
  }

  for (let p = 1; p <= Math.min(totalPages, 33); p++) {
    const prompts = await extractPage();
    prompts.forEach(q => allPrompts.push(q));
    console.log(`Page ${p}/${totalPages}: ${prompts.length} prompts → ${allPrompts.length} total`);
    prompts.slice(0, 3).forEach(q => console.log('  •', q.substring(0, 80)));

    if (p < totalPages) {
      const moved = await pg.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const next = btns.find(b => b.innerText?.trim() === 'Next' && !b.disabled);
        if (next) { next.click(); return true; }
        return false;
      });
      if (!moved) break;
      await sleep(2000);
    }
  }

  // Deduplicate
  const unique = [...new Set(allPrompts)];
  console.log(`\nUnique prompts: ${unique.length}`);

  // Categorize
  const trainingWords = ['course', 'training', 'become a home inspector', 'career', 'school', 'certification exam', 'inspector software', 'inspection tools', 'inspection equipment', 'inspector groups', 'association'];
  const service = unique.filter(p => !trainingWords.some(w => p.toLowerCase().includes(w)));
  const training = unique.filter(p => trainingWords.some(w => p.toLowerCase().includes(w)));

  console.log(`\nService prompts: ${service.length}`);
  console.log(`Training prompts: ${training.length}`);

  console.log('\n=== SERVICE PROMPTS (people looking to hire/use an inspector) ===');
  service.forEach((p, i) => console.log(`${i+1}. ${p}`));

  console.log('\n=== ALL PROMPTS ===');
  unique.forEach((p, i) => console.log(`${i+1}. ${p}`));

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/all-ai-prompts.json',
    JSON.stringify({ service, training, all: unique }, null, 2));
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/all-ai-prompts.txt',
    unique.join('\n'));

  console.log('\nSaved to all-ai-prompts.json and all-ai-prompts.txt');
  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
