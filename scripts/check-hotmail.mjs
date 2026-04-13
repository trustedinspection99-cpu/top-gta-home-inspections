import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  console.log('Opening Outlook/Hotmail...');
  await pg.goto('https://outlook.live.com/mail/0/inbox', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/hotmail-state.png' });

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 500)
  }));
  console.log('URL:', state.url);
  console.log('Title:', state.title);
  console.log('Text:', state.text.substring(0, 400));

  if (state.url.includes('login') || state.url.includes('account') || state.text.toLowerCase().includes('sign in')) {
    console.log('\n❌ Not logged in to Hotmail. User needs to log in manually.');
  } else {
    console.log('\n✅ Logged in! Searching for verification emails...');

    // Search for verification emails from directory sites
    const keywords = ['fyple', '411', 'profilecanada', 'b2bco', 'verify', 'confirm', 'activation', 'listing'];
    for (const kw of keywords) {
      await pg.goto(`https://outlook.live.com/mail/0/search?q=${kw}`, { waitUntil: 'networkidle2', timeout: 25000 });
      await sleep(2000);
      const results = await pg.evaluate(() => document.body.innerText.substring(0, 600));
      if (!results.toLowerCase().includes('no results') && !results.toLowerCase().includes('no messages')) {
        console.log(`\n📧 Results for "${kw}":`);
        console.log(results.substring(0, 300));
      }
    }
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
