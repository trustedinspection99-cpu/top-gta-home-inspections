import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Check SEMrush project for asads.ca and AI overview tracking
  console.log('Checking SEMrush projects...');
  await pg.goto('https://www.semrush.com/projects/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  const projects = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 800)
  }));
  console.log('Projects:', projects.text.substring(0, 500));

  // Look for asads.ca project
  const asadsLink = await pg.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]'));
    return links.find(a => a.href.includes('asads') || a.innerText.toLowerCase().includes('asads'))?.href;
  });
  console.log('asads project link:', asadsLink);

  // Try AI Overview keyword data - check keyword magic tool for home inspection queries
  console.log('\nChecking keyword magic for home inspection AI queries...');
  const keywords = [
    'home inspection toronto',
    'home inspector ontario',
    'mold inspection toronto',
    'pre purchase home inspection'
  ];

  for (const kw of keywords) {
    await pg.goto(`https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(kw)}&db=ca`, {
      waitUntil: 'networkidle2', timeout: 25000
    });
    await sleep(3000);

    const data = await pg.evaluate(() => {
      const text = document.body.innerText;
      // Extract key metrics
      const volumeMatch = text.match(/Volume\s*\n?\s*(\d[\d,\.K]*)/i);
      const kdMatch = text.match(/Keyword Difficulty\s*\n?\s*(\d+)/i);
      const intentMatch = text.match(/Intent\s*\n?\s*(\w+)/i);
      // Check for AI Overview mention
      const hasAIOverview = text.toLowerCase().includes('ai overview') || text.toLowerCase().includes('ai-powered');
      return {
        volume: volumeMatch?.[1],
        kd: kdMatch?.[1],
        intent: intentMatch?.[1],
        hasAIOverview,
        aiText: hasAIOverview ? text.substring(text.toLowerCase().indexOf('ai'), text.toLowerCase().indexOf('ai') + 200) : null
      };
    });
    console.log(`\n"${kw}": vol=${data.volume} KD=${data.kd}% intent=${data.intent} AI=${data.hasAIOverview}`);
    if (data.aiText) console.log('AI text:', data.aiText.substring(0, 150));
  }

  // Check if SEMrush has AI visibility / brand mentions tool
  console.log('\n\nChecking AI brand visibility tools...');
  const aiTools = [
    'https://www.semrush.com/ai-brand-visibility/',
    'https://www.semrush.com/analytics/ai-brand/',
    'https://www.semrush.com/trends/',
  ];

  for (const url of aiTools) {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await sleep(1500);
    const s = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 300)
    }));
    if (!s.text.includes('got lost') && !s.text.includes('exist')) {
      console.log('\nFound:', url, '→', s.title);
      console.log('Text:', s.text.substring(0, 200));
      await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-ai-tool.png` });
    } else {
      console.log(url, '→ 404');
    }
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
