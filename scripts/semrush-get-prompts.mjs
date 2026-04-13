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

  // Find and click the Prompts tab specifically
  const tabClicked = await pg.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('*'));
    const promptsEl = allEls.find(el =>
      el.children.length === 0 &&
      (el.innerText || '').trim() === 'Prompts' &&
      el.offsetParent !== null
    );
    if (promptsEl) {
      const clickable = promptsEl.closest('button, a, [role="tab"], [onclick]') || promptsEl;
      clickable.click();
      return 'clicked Prompts tab';
    }
    // Try all tabs
    const tabs = Array.from(document.querySelectorAll('[role="tab"], [class*="tab"]'));
    return 'tabs found: ' + tabs.map(t => t.innerText?.trim()).join(', ');
  });
  console.log('Tab click result:', tabClicked);
  await sleep(3000);

  // Get page content after clicking Prompts tab
  let allPromptText = await pg.evaluate(() => document.body.innerText);
  console.log('After Prompts tab click:');
  console.log(allPromptText.substring(0, 3000));

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-prompts-view.png' });

  // Try clicking "Canadian Home Inspection" topic to drill into prompts
  console.log('\n\nDrilling into "Canadian Home Inspection" topic...');
  await pg.goto('https://www.semrush.com/ai-seo/prompt-research/?q=home%20inspection&db=ca', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(3000);

  // Click on "Canadian Home Inspection" row
  await pg.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr, [role="row"]'));
    const target = rows.find(r => r.innerText?.includes('Canadian Home Inspection'));
    if (target) {
      const link = target.querySelector('a') || target;
      link.click();
      return 'clicked row';
    }
    return 'row not found';
  });
  await sleep(3000);

  const drillDown = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 3000) }));
  console.log('Drill-down URL:', drillDown.url);
  console.log('Text:', drillDown.text.substring(0, 2000));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-canadian-hi.png' });

  // Navigate to the prompts directly for each major topic cluster
  const topicQueries = [
    'Canadian Home Inspection',
    'Home Inspection Costs',
    'Home Inspection Checklists',
  ];

  for (const topic of topicQueries) {
    console.log(`\n=== Topic: ${topic} ===`);
    await pg.goto(`https://www.semrush.com/ai-seo/prompt-research/?q=${encodeURIComponent(topic)}&db=ca`, {
      waitUntil: 'networkidle2', timeout: 25000
    });
    await sleep(3000);

    // Click Prompts tab
    await pg.evaluate(() => {
      const allEls = Array.from(document.querySelectorAll('*'));
      const el = allEls.find(e => e.children.length === 0 && (e.innerText || '').trim() === 'Prompts' && e.offsetParent !== null);
      if (el) (el.closest('button, a, [role="tab"]') || el).click();
    });
    await sleep(3000);

    const data = await pg.evaluate(() => {
      const text = document.body.innerText;
      // Extract question-like lines
      const lines = text.split('\n').map(l => l.trim()).filter(l =>
        l.length > 20 && l.length < 250 &&
        (l.includes('?') || l.toLowerCase().startsWith('what') || l.toLowerCase().startsWith('how') ||
         l.toLowerCase().startsWith('when') || l.toLowerCase().startsWith('why') || l.toLowerCase().startsWith('where') ||
         l.toLowerCase().startsWith('is ') || l.toLowerCase().startsWith('can ') || l.toLowerCase().startsWith('should ') ||
         l.toLowerCase().startsWith('does ') || l.toLowerCase().startsWith('do '))
      );
      return { prompts: lines, volume: text.match(/AI Volume\s*[\n\r]*(\d[\d,\.K]*)/i)?.[1] };
    });
    console.log('Volume:', data.volume);
    console.log('Prompts:');
    data.prompts.forEach((p, i) => console.log(`  ${i+1}. ${p}`));
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
