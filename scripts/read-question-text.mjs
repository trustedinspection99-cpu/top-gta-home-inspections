import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org/my/exams'));
if (!pg) pg = pages[pages.length - 1];

const baseUrl = pg.url().replace(/\/\d+$/, '');

// Questions where we need the text to determine the answer
const questionNums = [3, 6, 9, 10, 11, 20, 21, 23, 26, 27, 28, 29, 34, 36, 41, 44, 45, 49, 51, 52, 54, 55, 56, 58, 59, 61, 64, 66, 67, 68, 69, 72, 77, 79, 81, 82, 84, 87, 90, 91, 92, 93, 95, 97, 98, 99, 100];

for (const q of questionNums) {
  await pg.goto(baseUrl + '/' + q);
  await sleep(300);
  const data = await pg.evaluate(() => {
    // Try to get the question from the main content
    const body = document.body.innerText;
    // Remove nav content
    const start = body.indexOf('Question ');
    const end = body.indexOf('Skip for Now');
    const questionBlock = start > -1 ? body.substring(start, end > -1 ? end : start + 500) : body.substring(0, 500);

    // Also get from HTML elements
    const h2 = document.querySelector('h1, h2, h3, .question, [class*="question"]');
    const p = document.querySelector('p, .question-text, [class*="text"]');

    const radios = Array.from(document.querySelectorAll('input[type=radio]'));
    const options = radios.map(r => {
      const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
      return (lbl?.innerText?.trim() || r.value);
    });

    return { questionBlock: questionBlock.substring(0, 400), options };
  });
  console.log(`Q${q}:`);
  console.log('  TEXT:', data.questionBlock.replace(/\n/g, ' | ').substring(0,200));
  console.log('  OPTIONS:', data.options.join(' / '));
  console.log();
}

browser.disconnect();
