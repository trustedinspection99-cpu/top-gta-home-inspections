import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(40000);

  // Source Domains tab - navigate correctly
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca', {
    waitUntil: 'networkidle2', timeout: 40000
  });
  await sleep(5000);

  // Click "Source Domains" tab
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, [role="tab"]'));
    const btn = btns.find(b => (b.innerText||'').trim().startsWith('Source Domains'));
    if (btn) btn.click();
  });
  await sleep(3000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-srcdom-tab.png' });

  const allDomains = [];

  for (let p = 1; p <= 10; p++) {
    const raw = await pg.evaluate(() => document.body.innerText);
    // Find table content
    const start = raw.indexOf('Source Domain\nSource URLs\nMentions');
    const end = raw.indexOf('\nPrev\n', start > 0 ? start : 0);
    const content = start > 0
      ? raw.substring(start + 40, end > 0 ? end : start + 6000)
      : raw.substring(1500, 4000);

    console.log(`Page ${p} raw table:\n${content.substring(0, 1000)}\n---`);

    // Parse lines
    const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      // Domain pattern
      if (/\.[a-z]{2,4}(\/|$)/.test(line) && line.length < 80 && !line.includes(' ')) {
        const domainEntry = { domain: line };
        // Next lines should be numbers
        let j = i + 1;
        const nums = [];
        while (j < Math.min(i + 5, lines.length) && nums.length < 3) {
          const n = lines[j].replace(/,/g, '');
          if (/^\d+(\.\d+)?[KM]?$/.test(lines[j])) nums.push(lines[j]);
          else if (/^\d+$/.test(n)) nums.push(n);
          else break;
          j++;
        }
        if (nums.length >= 2) {
          domainEntry.sourceUrls = nums[0];
          domainEntry.mentions = nums[1];
          domainEntry.traffic = nums[2] || null;
          allDomains.push(domainEntry);
          i = j;
          continue;
        }
      }
      i++;
    }
    console.log(`  → Parsed ${allDomains.length} domains so far`);

    // Next page
    const moved = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const next = btns.find(b => b.innerText?.trim() === 'Next' && !b.disabled);
      if (next) { next.click(); return true; }
      return false;
    });
    if (!moved) break;
    await sleep(2500);
  }

  console.log(`\n\nTOTAL SOURCE DOMAINS: ${allDomains.length}`);
  allDomains.forEach(d => console.log(`  ${d.mentions || '?'}x mentions — ${d.domain} (${d.sourceUrls} URLs, ${d.traffic} traffic)`));

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-source-domains.json',
    JSON.stringify(allDomains, null, 2));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
