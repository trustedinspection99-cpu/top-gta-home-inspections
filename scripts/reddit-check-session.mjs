import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('reddit.com')) || pages[0];
await pg.goto('https://www.reddit.com', { waitUntil: 'networkidle2', timeout: 20000 });
await sleep(3000);
const result = await pg.evaluate(() => {
  const hasUserDrawer = !!document.querySelector('shreddit-async-loader[bundlename="user_drawer"]');
  const hasLogOut = document.body.innerText.includes('Log Out');
  const hasLogIn = document.body.innerText.includes('Log In');
  const username = document.querySelector('a[href*="/user/"]')?.getAttribute('href') || '';
  return { hasUserDrawer, hasLogOut, hasLogIn, username };
});
console.log(JSON.stringify(result, null, 2));
browser.disconnect();
