import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(40000);

  console.log('Navigating to SEMrush AI Prompt Research...');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(5000);

  // Click "Prompts" tab - try multiple methods
  const clicked = await pg.evaluate(() => {
    // Method 1: button with text starting with Prompts
    const btns = Array.from(document.querySelectorAll('button, [role="tab"], a'));
    const btn = btns.find(b => {
      const t = (b.innerText || b.textContent || '').trim();
      return t.startsWith('Prompts') && t.length < 30;
    });
    if (btn) { btn.click(); return 'clicked ' + btn.tagName; }
    return 'no button found';
  });
  console.log('Click result:', clicked);
  await sleep(4000);

  // Try clicking at the coordinates that worked before
  await pg.mouse.click(308, 380);
  await sleep(3000);

  // Screenshot to see current state
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/prompts-state.png' });

  // Get page info
  const pageInfo = await pg.evaluate(() => {
    const text = document.body.innerText;
    const m = text.match(/Page:\s*(\d+)\s*of\s*(\d+)/);
    const total = m ? parseInt(m[2]) : null;
    // Also look for prompt count
    const countMatch = text.match(/Prompts\s+(\d+)/);
    return { total, countMatch: countMatch ? countMatch[1] : null, urlInfo: window.location.href };
  });
  console.log('Page info:', pageInfo);

  const allPrompts = [];

  async function extractPromptsFromPage() {
    return await pg.evaluate(() => {
      const results = [];

      // Method 1: table rows with role="row"
      const rows = Array.from(document.querySelectorAll('[role="row"]'));
      if (rows.length > 1) {
        rows.slice(1).forEach(row => {
          const cells = Array.from(row.querySelectorAll('[role="cell"], td'));
          const prompt = cells[0]?.innerText?.trim();
          if (prompt && prompt.length > 10 && prompt.length < 400) {
            results.push(prompt);
          }
        });
      }

      if (results.length > 0) return { method: 'rows', prompts: results };

      // Method 2: look for specific CSS classes that contain prompt text
      const promptEls = Array.from(document.querySelectorAll('[class*="prompt"], [class*="Prompt"]'));
      promptEls.forEach(el => {
        const t = el.innerText?.trim();
        if (t && t.length > 15 && t.length < 400 && !t.includes('\n')) {
          results.push(t);
        }
      });
      if (results.length > 0) return { method: 'classes', prompts: results };

      // Method 3: innerText parsing
      const text = document.body.innerText;

      // Find table header
      const headers = ['Prompt\nAI Response\nBrands\nSources', 'Prompt\tAI Response'];
      let tableStart = -1;
      for (const h of headers) {
        const idx = text.indexOf(h);
        if (idx >= 0) { tableStart = idx + h.length; break; }
      }

      if (tableStart < 0) {
        // Try finding "View full response" pattern which appears after each prompt
        const vfrParts = text.split('View full response');
        if (vfrParts.length > 2) {
          vfrParts.slice(0, -1).forEach((part, i) => {
            if (i === 0) return; // Skip before first
            const lines = part.split('\n').map(l => l.trim()).filter(l => l.length > 10);
            if (lines.length > 0) results.push(lines[lines.length - 1]);
          });
          if (results.length > 0) return { method: 'vfr-reverse', prompts: results };
        }
        return { method: 'none', prompts: [], rawSnippet: text.substring(1000, 3000) };
      }

      const tableText = text.substring(tableStart);
      const endIdx = tableText.search(/\nPrev\n|\nPage:\s*\d+\s*of\s*\d+/);
      const content = endIdx > 0 ? tableText.substring(0, endIdx) : tableText.substring(0, 10000);

      // Split by View full response
      const blocks = content.split(/\nView full response\n/).filter(b => b.trim().length > 5);
      blocks.forEach(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 10 && l !== '...');
        // First non-empty line after stripping numbers is usually the prompt
        const prompt = lines.find(l => l.length > 15 && !/^\d+$/.test(l));
        if (prompt && prompt.length < 400) results.push(prompt);
      });

      return { method: 'text-parse', prompts: results, tableStart, blockCount: blocks.length };
    });
  }

  // First page extract
  let result = await extractPromptsFromPage();
  console.log('Page 1 extraction:', result.method, `→ ${result.prompts?.length} prompts`);
  if (result.rawSnippet) console.log('Raw snippet:', result.rawSnippet.substring(0, 500));

  result.prompts?.forEach(p => allPrompts.push(p));
  if (result.prompts?.length > 0) result.prompts.slice(0, 5).forEach(p => console.log(' •', p.substring(0, 80)));

  // Get total pages
  const totalPages = await pg.evaluate(() => {
    const m = document.body.innerText.match(/Page:\s*\d+\s*of\s*(\d+)/);
    return m ? parseInt(m[1]) : 33;
  });
  console.log('Total pages:', totalPages);

  // Paginate
  for (let p = 2; p <= Math.min(totalPages, 40); p++) {
    // Click Next
    const moved = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const next = btns.find(b => (b.innerText || '').trim() === 'Next' && !b.disabled);
      if (next) { next.click(); return true; }
      // Also try aria-label
      const nextAria = document.querySelector('[aria-label="Next page"], [aria-label="next"]');
      if (nextAria) { nextAria.click(); return true; }
      return false;
    });
    if (!moved) {
      console.log(`No Next button on page ${p-1}, stopping`);
      break;
    }
    await sleep(2500);

    result = await extractPromptsFromPage();
    const before = allPrompts.length;
    result.prompts?.forEach(p2 => allPrompts.push(p2));
    console.log(`Page ${p}/${totalPages}: ${result.method} → ${result.prompts?.length} new → ${allPrompts.length} total`);
    if (result.prompts?.length > 0) result.prompts.slice(0, 2).forEach(p2 => console.log(' •', p2.substring(0, 80)));

    // If consistently getting 0, try screenshot and break
    if (allPrompts.length === before && allPrompts.length > 0) {
      console.log('No new prompts extracted, stopping early');
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/prompts-stuck.png' });
      break;
    }
  }

  // Deduplicate
  const unique = [...new Set(allPrompts)].filter(p => p.length > 10);
  console.log(`\n=== FINAL: ${unique.length} unique prompts ===`);

  // Categorize
  const trainingWords = ['course', 'training', 'become a home inspector', 'how to become', 'career', 'school', 'certification exam', 'inspector software', 'inspection equipment', 'inspector tools', 'inspector groups', 'association', 'home inspection business', 'start a home inspection'];
  const service = unique.filter(p => !trainingWords.some(w => p.toLowerCase().includes(w)));
  const training = unique.filter(p => trainingWords.some(w => p.toLowerCase().includes(w)));

  console.log(`\nService prompts: ${service.length}`);
  console.log(`Training prompts: ${training.length}`);
  console.log('\n=== SERVICE PROMPTS ===');
  service.forEach((p, i) => console.log(`${i+1}. ${p}`));

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/all-ai-prompts.json',
    JSON.stringify({ service, training, all: unique }, null, 2));
  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/all-ai-prompts.txt',
    unique.join('\n'));

  console.log('\nSaved to all-ai-prompts.json and all-ai-prompts.txt');
  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
