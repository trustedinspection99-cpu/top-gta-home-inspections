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

  // Click Prompts tab - find it by looking at all clickable elements with text "Prompts"
  await pg.evaluate(() => {
    // Find the exact "Prompts" tab element (not the count badge)
    const allClickable = Array.from(document.querySelectorAll('button, [role="tab"], li, [class*="tab"]'));
    const tab = allClickable.find(el => el.innerText?.trim() === 'Prompts' || el.textContent?.trim() === 'Prompts');
    if (tab) tab.click();
  });
  await sleep(3000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/prompts-tab-clicked.png' });

  // Dump full DOM of main content area to understand structure
  const domInfo = await pg.evaluate(() => {
    // Find main table/list area
    const tables = document.querySelectorAll('table');
    const lists = document.querySelectorAll('[class*="list"], [class*="table"], [class*="grid"]');

    // Get all text in the content area
    const main = document.querySelector('main, [role="main"], #root') || document.body;
    const allText = main.innerText;

    // Find all elements that could be prompt rows
    const rows = Array.from(document.querySelectorAll('tr, [role="row"]'));

    return {
      tablesCount: tables.length,
      rowsCount: rows.length,
      rowTexts: rows.map(r => r.innerText?.trim().substring(0, 200)).filter(t => t && t.length > 5),
      // Look for any text with AI volume numbers and question-like text
      pageTextSample: allText.substring(0, 5000)
    };
  });

  console.log('Tables:', domInfo.tablesCount);
  console.log('Rows:', domInfo.rowsCount);
  console.log('\nRow texts:');
  domInfo.rowTexts.slice(0, 30).forEach((r, i) => console.log(`${i+1}. ${r}`));
  console.log('\nPage text sample:\n', domInfo.pageTextSample.substring(0, 3000));

  // Try clicking "Canadian Home Inspection" specifically as a link
  console.log('\n\nTrying to navigate to Canadian Home Inspection topic...');
  const topicLink = await pg.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const found = links.find(a => a.innerText?.includes('Canadian Home Inspection'));
    if (found) { return found.href; }
    // Try clicking any element with this text
    const els = Array.from(document.querySelectorAll('*'));
    const el = els.find(e => e.innerText?.trim() === 'Canadian Home Inspection' && e.children.length < 3);
    if (el) {
      el.click();
      return 'clicked element: ' + el.tagName;
    }
    return null;
  });
  console.log('Topic link/click:', topicLink);

  if (topicLink && topicLink.startsWith('http')) {
    await pg.goto(topicLink, { waitUntil: 'networkidle2', timeout: 25000 });
    await sleep(3000);
    const topicData = await pg.evaluate(() => document.body.innerText.substring(0, 4000));
    console.log('\nTopic page:\n', topicData.substring(0, 2000));
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/canadian-hi-topic.png' });
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
