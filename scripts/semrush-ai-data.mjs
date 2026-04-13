import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // SEMrush AI Overview / AI Narratives tool
  // This shows what AI models (ChatGPT, Gemini, Perplexity) are saying about keywords
  console.log('Checking SEMrush AI tools...');

  // Try the AI Narratives / AI Overview feature
  const urls = [
    'https://www.semrush.com/ai-narratives/',
    'https://www.semrush.com/trends/ai-narratives/',
    'https://www.semrush.com/analytics/ai-overview/',
  ];

  for (const url of urls) {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await sleep(2000);
    const s = await pg.evaluate(() => ({ url: window.location.href, title: document.title, text: document.body.innerText.substring(0, 200) }));
    console.log(url, '→', s.url);
    console.log('Title:', s.title);
    console.log('Text:', s.text.substring(0, 150));
    console.log('---');
  }

  // Try the keyword overview with AI data for home inspection terms
  console.log('\nChecking keyword AI overview for "home inspection ontario"...');
  await pg.goto('https://www.semrush.com/analytics/keywordoverview/?q=home+inspection+ontario&db=ca', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(4000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-kw-overview.png' });

  const kwState = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 1500)
  }));
  console.log('KW Overview text:', kwState.text.substring(0, 800));

  // Try SEMrush Copilot / AI features
  console.log('\nChecking SEMrush Copilot...');
  await pg.goto('https://www.semrush.com/copilot/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  const copilot = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 500) }));
  console.log('Copilot URL:', copilot.url);
  console.log('Text:', copilot.text.substring(0, 300));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
