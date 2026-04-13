import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Try Prompt Research with different terms
  const topics = ['home inspection', 'home inspector', 'mold inspection', 'house inspection'];

  for (const topic of topics) {
    console.log(`\n=== Prompt Research: "${topic}" ===`);
    await pg.goto(`https://www.semrush.com/ai-seo/prompt-research/?q=${encodeURIComponent(topic)}&db=ca`, {
      waitUntil: 'networkidle2', timeout: 25000
    });
    await sleep(3000);

    const data = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 2000)
    }));

    if (!data.text.includes("couldn't find") && !data.text.includes('got lost')) {
      console.log('URL:', data.url);
      console.log('DATA:', data.text.substring(0, 800));
      await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-prompt-${topic.replace(/ /g,'-')}.png` });
      break; // Found data, stop
    } else {
      console.log('No data for this topic');
    }
  }

  // Check what topics/keywords asads.ca is mentioned for in AI
  console.log('\n=== asads.ca AI Citations detail ===');
  await pg.goto('https://www.semrush.com/ai-seo/citations/?q=asads.ca', { waitUntil: 'networkidle2', timeout: 25000 });
  await sleep(3000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-ai-citations.png' });
  const citations = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 2000) }));
  console.log('Citations URL:', citations.url);
  console.log('Citations data:', citations.text.substring(0, 1000));

  // Check competitors in AI - Mike Holmes
  console.log('\n=== Competitor AI Visibility: mikeholmesinspections.com ===');
  await pg.goto('https://www.semrush.com/ai-seo/overview/?q=mikeholmesinspections.com', { waitUntil: 'networkidle2', timeout: 25000 });
  await sleep(3000);
  const competitor = await pg.evaluate(() => document.body.innerText.substring(0, 1200));
  console.log('Mike Holmes AI:', competitor.substring(0, 700));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
