import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org/my/exams'));
if (!pg) pg = pages[pages.length - 1];
const baseUrl = pg.url().replace(/\/\d+$/, '');

for (const q of [2, 11, 14, 22, 33, 55, 67, 99]) {
  await pg.goto(baseUrl + '/' + q);
  await sleep(500);
  const data = await pg.evaluate(() => {
    const body = document.body.innerText;
    const start = body.indexOf('Question ');
    const end = body.indexOf('Skip for Now');
    const block = start > -1 ? body.substring(start, end > -1 ? end : start + 600) : body.substring(0, 600);

    // For image-based questions, also get img src
    const imgs = Array.from(document.querySelectorAll('img')).filter(i => i.src && !i.src.includes('logo') && !i.src.includes('icon')).map(i => i.src);
    const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]')).map(c => {
      const lbl = document.querySelector('label[for="' + c.id + '"]') || c.parentElement;
      return lbl?.innerText?.trim() || c.value;
    });
    return { block: block.substring(0, 600), imgs, checkboxes };
  });
  console.log(`Q${q}: ${data.block.replace(/\n/g, ' | ')}`);
  if (data.imgs.length) console.log(`  IMAGES:`, data.imgs);
  if (data.checkboxes.length) console.log(`  CHECKBOXES:`, data.checkboxes);
  console.log();
}
browser.disconnect();
