import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

await pg.evaluate(() => window.scrollTo(0, 0));
await sleep(500);

const result = await pg.evaluate(() => {
  const log = [];

  // 1. Fill Inspect radios - click No Defect for unchecked items
  const inspectItems = Array.from(document.querySelectorAll('div.rounded.border'));
  for (const item of inspectItems) {
    const radios = Array.from(item.querySelectorAll('input[type=radio]'));
    const anyChecked = radios.some(r => r.checked);
    if (!anyChecked) {
      const labels = Array.from(item.querySelectorAll('label'));
      const noDefect = labels.find(l => l.innerText.toLowerCase().includes('no defect'));
      if (noDefect) { noDefect.click(); log.push('Inspect: No Defect clicked'); }
    }
  }

  // 2. Fill text areas / inputs in Describe section
  const textareas = Array.from(document.querySelectorAll('textarea'));
  const textValues = [
    'Main floor hallway near the furnace',
    'Natural gas',
    'Forced air furnace'
  ];
  textareas.forEach((ta, i) => {
    if (!ta.value && textValues[i]) {
      ta.value = textValues[i];
      ta.dispatchEvent(new Event('input', {bubbles: true}));
      ta.dispatchEvent(new Event('change', {bubbles: true}));
      log.push('Text: ' + textValues[i]);
    }
  });

  // 3. Click "No / Not applicable" for Report questions
  const allLabels = Array.from(document.querySelectorAll('label'));
  const noLabels = allLabels.filter(l => l.innerText.trim().toLowerCase().includes('no / not applicable') || l.innerText.trim().toLowerCase() === 'no');
  noLabels.forEach(l => { l.click(); log.push('Report: No/Not applicable'); });

  return log;
});

console.log('Done:');
result.forEach(l => console.log(' ', l));

await pg.screenshot({ path: 'scripts/heating-done.png', fullPage: false });
browser.disconnect();
