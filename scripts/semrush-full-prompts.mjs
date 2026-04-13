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

  // Switch to "Prompts" tab to see the actual questions
  console.log('Clicking Prompts tab...');
  await pg.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('[role="tab"], button, a'));
    const promptsTab = tabs.find(t => (t.innerText || '').trim() === 'Prompts');
    if (promptsTab) promptsTab.click();
  });
  await sleep(3000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-prompts-tab.png' });

  const page1 = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 4000)
  }));
  console.log('Prompts page text:\n', page1.text.substring(0, 3000));

  // Try to get all rows from the table
  const rows = await pg.evaluate(() => {
    const allRows = Array.from(document.querySelectorAll('tr, [role="row"], [class*="row"], [class*="table-item"]'));
    return allRows.map(r => r.innerText?.trim()).filter(t => t && t.length > 10 && t.length < 500);
  });
  console.log('\nTable rows:', rows.slice(0, 50).join('\n'));

  // Try showing more results - look for pagination or "show more"
  const hasMore = await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(b =>
      (b.innerText || '').toLowerCase().match(/show more|load more|next|see all|view all/));
    if (btn) { btn.click(); return 'clicked: ' + btn.innerText; }
    return 'no more button';
  });
  console.log('\nMore button:', hasMore);
  await sleep(3000);

  // Try export to get all data
  console.log('\nTrying to set per-page to max...');
  const perPage = await pg.evaluate(() => {
    const selects = Array.from(document.querySelectorAll('select'));
    const perPageSel = selects.find(s => s.options && Array.from(s.options).some(o => o.value === '100' || o.text === '100'));
    if (perPageSel) {
      perPageSel.value = Array.from(perPageSel.options).find(o => o.value === '100' || o.text === '100')?.value;
      perPageSel.dispatchEvent(new Event('change', { bubbles: true }));
      return 'set to 100';
    }
    return 'no select found';
  });
  console.log('Per page:', perPage);
  await sleep(3000);

  // Get all prompt text now
  const allPrompts = await pg.evaluate(() => {
    // Try to get all prompt text from the page
    const cells = Array.from(document.querySelectorAll('td, [class*="cell"], [class*="prompt"], [class*="query"]'));
    const prompts = cells.map(c => c.innerText?.trim()).filter(t => t && t.includes('?') && t.length > 15 && t.length < 300);
    if (prompts.length > 0) return prompts;

    // Fallback: get all text that looks like a question
    const allText = document.body.innerText;
    const lines = allText.split('\n').map(l => l.trim()).filter(l => l.includes('?') && l.length > 15 && l.length < 300);
    return lines;
  });
  console.log('\n=== PROMPTS (questions people ask AI) ===');
  allPrompts.forEach((p, i) => console.log(`${i+1}. ${p}`));

  // Also get the full page text for analysis
  const fullText = await pg.evaluate(() => document.body.innerText);
  console.log('\n=== FULL PAGE TEXT ===');
  console.log(fullText.substring(0, 5000));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
