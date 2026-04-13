import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(4000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-before.png' });

  // Look at all interactive elements near the tab area
  const tabArea = await pg.evaluate(() => {
    // Find elements with text Topics, Prompts, Brands, Source Domains - these are the tabs
    const everything = Array.from(document.querySelectorAll('*'));
    const tabs = everything.filter(el =>
      el.offsetParent !== null &&
      el.children.length <= 3 &&
      ['Topics', 'Prompts', 'Brands', 'Source Domains'].some(t => el.innerText?.trim().startsWith(t))
    );
    return tabs.map(el => ({
      tag: el.tagName,
      class: el.className?.substring(0, 80),
      text: el.innerText?.trim().substring(0, 50),
      clickable: !!el.onclick || el.tagName === 'BUTTON' || el.tagName === 'A' || el.getAttribute('role') === 'tab'
    }));
  });
  console.log('Tab elements:', JSON.stringify(tabArea, null, 2));

  // Click by coordinates - take screenshot first to find tabs visually
  // Use evaluate to get the bounding box of the Prompts tab text
  const promptsBox = await pg.evaluate(() => {
    const everything = Array.from(document.querySelectorAll('*'));
    const promptsEl = everything.find(el =>
      el.offsetParent !== null &&
      el.innerText?.trim().startsWith('Prompts') &&
      el.innerText?.trim().length < 20
    );
    if (!promptsEl) return null;
    const rect = promptsEl.getBoundingClientRect();
    return { x: rect.x + rect.width/2, y: rect.y + rect.height/2, text: promptsEl.innerText, tag: promptsEl.tagName };
  });
  console.log('Prompts element box:', promptsBox);

  if (promptsBox) {
    // Click at coordinates
    await pg.mouse.click(promptsBox.x, promptsBox.y);
    console.log('Clicked at:', promptsBox.x, promptsBox.y);
    await sleep(3000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/sr-after-prompts-click.png' });

    const afterClick = await pg.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('[role="row"], tr'));
      return {
        url: window.location.href,
        rows: rows.map(r => r.innerText?.trim().substring(0, 200)).filter(t => t && t.length > 5),
        text: document.body.innerText.substring(2000, 5000) // Skip header, get table content
      };
    });
    console.log('\nAfter click rows:');
    afterClick.rows.slice(0, 30).forEach((r, i) => console.log(`${i+1}. ${r}`));
    console.log('\nPage text (middle):', afterClick.text.substring(0, 2000));
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
