import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getPromptsFromPage(pg) {
  // Extract from the rendered row elements
  return await pg.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('[role="row"]'));
    if (rows.length > 1) {
      return rows.slice(1).map(r => {
        const cells = Array.from(r.querySelectorAll('[role="cell"]'));
        return {
          prompt: cells[0]?.innerText?.trim().substring(0, 300),
          response: cells[1]?.innerText?.trim().substring(0, 150),
          brands: cells[2]?.innerText?.trim(),
          sources: cells[3]?.innerText?.trim(),
        };
      }).filter(r => r.prompt && r.prompt.length > 5);
    }
    // Fallback: parse full text
    const text = document.body.innerText;
    const promptSection = text.substring(text.indexOf('Prompt\nAI Response'));
    const lines = promptSection.split('\n').map(l => l.trim()).filter(l => l.length > 10);
    return lines.slice(1, 30).map(l => ({ prompt: l, response: '', brands: '', sources: '' }));
  });
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Navigate and click Prompts tab with mouse coordinates (what worked before)
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(4000);

  // Get coordinates of Prompts button and click it
  const promptsBtnBox = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText?.trim().startsWith('Prompts'));
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    return { x: rect.x + rect.width/2, y: rect.y + rect.height/2 };
  });

  if (promptsBtnBox) {
    await pg.mouse.click(promptsBtnBox.x, promptsBtnBox.y);
    console.log('Clicked Prompts tab at:', promptsBtnBox);
    await sleep(3000);
  }

  const allPrompts = [];

  // Extract from full page text - parse the prompt rows
  async function extractCurrentPage() {
    return await pg.evaluate(() => {
      const text = document.body.innerText;
      // Find the table section - it starts after "Prompt\nAI Response\nBrands\nSources"
      const tableStart = text.indexOf('Prompt\nAI Response\nBrands\nSources');
      if (tableStart < 0) return [];

      const tableText = text.substring(tableStart + 40); // skip header
      const tableEnd = tableText.indexOf('\nPrev\n');
      const tableContent = tableEnd > 0 ? tableText.substring(0, tableEnd) : tableText.substring(0, 5000);

      // Split by "View full response\n" to get individual prompt blocks
      const blocks = tableContent.split('View full response\n').filter(b => b.trim().length > 10);

      return blocks.map(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const prompt = lines[0] || '';
        const response = lines.slice(1).join(' ').substring(0, 200);
        // Find numbers at end (sources count)
        return { prompt, response: response.substring(0, 200) };
      }).filter(r => r.prompt.length > 10 && r.prompt.length < 300);
    });
  }

  // Get page info
  const pageInfo = await pg.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/Page:\s*(\d+)\s*of\s*(\d+)/);
    return match ? { current: parseInt(match[1]), total: parseInt(match[2]) } : { current: 1, total: 1 };
  });
  console.log('Total pages:', pageInfo.total);

  const maxPages = Math.min(pageInfo.total, 15);

  for (let p = 1; p <= maxPages; p++) {
    const prompts = await extractCurrentPage();
    console.log(`Page ${p}: ${prompts.length} prompts`);
    prompts.forEach(r => console.log(`  - ${r.prompt}`));
    allPrompts.push(...prompts);

    if (p < maxPages) {
      const hasNext = await pg.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const nextBtn = btns.find(b => b.innerText?.trim() === 'Next' && !b.disabled);
        if (nextBtn) { nextBtn.click(); return true; }
        return false;
      });
      if (!hasNext) break;
      await sleep(2500);
    }
  }

  // Filter for service intent (not training/education)
  const trainingWords = ['course', 'training', 'become', 'career', 'school', 'program', 'certification', 'equipment', 'software', 'tool kit', 'study'];
  const servicePrompts = allPrompts.filter(p => {
    const text = (p.prompt || '').toLowerCase();
    return !trainingWords.some(w => text.includes(w));
  });

  console.log(`\n=== ALL ${allPrompts.length} PROMPTS COLLECTED ===`);
  console.log(`\n=== SERVICE PROMPTS (${servicePrompts.length}) — people asking AI to HIRE/FIND an inspector ===`);
  servicePrompts.forEach((p, i) => console.log(`${i+1}. ${p.prompt}`));

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/ai-prompts-data.json',
    JSON.stringify({ total: allPrompts.length, serviceCount: servicePrompts.length, service: servicePrompts, all: allPrompts }, null, 2)
  );
  console.log('\nSaved to scripts/ai-prompts-data.json');

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
