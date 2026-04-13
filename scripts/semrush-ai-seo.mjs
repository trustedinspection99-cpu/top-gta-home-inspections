import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Check AI SEO Overview for asads.ca
  console.log('=== AI SEO Overview for asads.ca ===');
  await pg.goto('https://www.semrush.com/ai-seo/overview/?q=asads.ca', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(4000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-ai-seo-asads.png' });

  const asadsData = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 2000)
  }));
  console.log('URL:', asadsData.url);
  console.log('AI SEO data for asads.ca:\n', asadsData.text.substring(0, 1200));

  // Check keyword prompts tool - what are people asking AI about home inspection
  console.log('\n=== AI Prompts / Questions for home inspection ===');
  await pg.goto('https://www.semrush.com/ai-seo/prompts/?q=home+inspection&db=ca', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-ai-prompts.png' });

  const promptsData = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 2000)
  }));
  console.log('Prompts URL:', promptsData.url);
  console.log('AI Prompts data:\n', promptsData.text.substring(0, 1000));

  // Check AI Mentions for home inspection industry
  console.log('\n=== AI Visibility - home inspector keyword ===');
  await pg.goto('https://www.semrush.com/ai-seo/overview/?q=home+inspector+ontario', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(4000);
  const kw = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 1500) }));
  console.log('KW data:', kw.text.substring(0, 800));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
