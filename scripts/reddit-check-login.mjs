import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://www.reddit.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-state.png' });

  const state = await pg.evaluate(() => {
    const userEl = document.querySelector('[data-testid="user-menu-button"], #USER_DROPDOWN_ID, [aria-label="My Account"]');
    const loginBtn = document.querySelector('a[href*="login"], button[data-click-id="login"]');
    return {
      url: window.location.href,
      hasUserMenu: !!userEl,
      hasLoginBtn: !!loginBtn,
      userText: userEl?.innerText?.trim() || null,
      bodySnippet: document.body.innerText.substring(0, 500)
    };
  });

  console.log('Reddit state:', JSON.stringify(state, null, 2));
  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error(e.message));
