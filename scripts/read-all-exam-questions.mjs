import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org/my/exams'));
if (!pg) pg = pages[pages.length - 1];

const baseUrl = pg.url().replace(/\/\d+$/, '');
console.log('Base URL:', baseUrl);

const allQuestions = [];

for (let q = 1; q <= 100; q++) {
  await pg.goto(baseUrl + '/' + q);
  await sleep(400);
  const data = await pg.evaluate(() => {
    const text = document.body.innerText;
    const radios = Array.from(document.querySelectorAll('input[type=radio]'));
    const options = radios.map(r => {
      const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
      return (lbl?.innerText?.trim() || r.value);
    });
    // Get question text - it's in the main content area
    const qMatch = text.match(/Question \d+ of 100\n([^\n]+)\n([\s\S]+?)(?:Skip for Now|$)/);
    const question = qMatch ? qMatch[1] : '';
    return { question, options };
  });
  allQuestions.push({ q, question: data.question, options: data.options });
  if (q % 10 === 0) console.log('Read', q, 'questions...');
}

console.log('\n=== ALL 100 QUESTIONS ===');
allQuestions.forEach(item => {
  console.log(`Q${item.q}: ${item.question}`);
  item.options.forEach((o, i) => console.log(`  ${i+1}. ${o}`));
  console.log();
});

browser.disconnect();
