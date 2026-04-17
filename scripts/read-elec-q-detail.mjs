import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
await pg.goto('https://education.nachi.org/show.php?course_id=13&element_id=200');
await sleep(2000);

// Get all question blocks with their options
const questions = await pg.evaluate(() => {
  // Find all radio inputs and their parent question blocks
  const radios = Array.from(document.querySelectorAll('input[type=radio]'));
  const groups = {};
  radios.forEach(r => {
    if (!groups[r.name]) groups[r.name] = { name: r.name, options: [] };
    const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
    groups[r.name].options.push(lbl?.innerText?.trim() || r.value);
  });
  
  // Try to find question text near each group
  const body = document.body.innerHTML;
  return Object.values(groups).map(g => ({ name: g.name, options: g.options }));
});

questions.forEach((q, i) => {
  console.log(`Group ${i+1} [${q.name}]: ${q.options.join(' | ')}`);
});

// Also get full body text to see question order
const bodyText = await pg.evaluate(() => {
  // Get paragraphs and their associated radio groups
  const items = [];
  document.querySelectorAll('p, .question, h3, h4').forEach(el => {
    const text = el.innerText?.trim();
    if (text && text.length > 10 && text.length < 300 && !text.includes('Copyright')) {
      items.push(text.substring(0,150));
    }
  });
  return items;
});
console.log('\nQuestion texts:');
bodyText.forEach((t,i) => console.log(i+1, t));
browser.disconnect();
