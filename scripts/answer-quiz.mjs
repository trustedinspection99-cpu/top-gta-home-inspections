import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org') || p.url().includes('education.nachi.org')) || pages[0];

// Answer key for current quiz questions
const answers = {
  // Q1: Slope can be expressed by ratio or inches per foot
  'can be expressed either by a ratio': 'Slope',
  // Q2: pitch is a fraction
  'vertical rise over the entire span': 'False',
  // Q3: 4 in 12
  '"4 in 12" slope': '4',
  // Q4: base of triangle = run
  'base of the triangle': 'run',
  // Q5: flat roofs have very little slope
  'Flat roofs have very little slope': 'True',
  // Q6: slope = incline ratio
  'incline of the roof expressed as a ratio': 'Slope',
};

const result = await pg.evaluate((ans) => {
  const questions = Array.from(document.querySelectorAll('p, div, td')).filter(el => {
    const text = el.innerText?.trim();
    return text && text.length > 20 && el.querySelectorAll('input[type=radio]').length > 0;
  });

  // More reliable: get all radio groups and their labels
  const groups = {};
  document.querySelectorAll('input[type=radio]').forEach(r => {
    const name = r.name;
    if (!groups[name]) groups[name] = [];
    const label = r.parentElement?.innerText?.trim() || r.value;
    groups[name].push({ radio: r, label, value: r.value });
  });

  const log = [];

  // For each question, find the right answer and click it
  for (const [questionSnippet, answer] of Object.entries(ans)) {
    // Find question text element
    const allText = document.body.innerText;
    if (!allText.includes(questionSnippet)) continue;

    // Find radio inputs near this text
    const allEls = Array.from(document.querySelectorAll('*'));
    for (const el of allEls) {
      if (el.innerText?.includes(questionSnippet)) {
        // Find radios in parent/sibling
        let container = el;
        for (let i = 0; i < 5; i++) {
          container = container.parentElement;
          if (!container) break;
          const radios = container.querySelectorAll('input[type=radio]');
          if (radios.length > 0) {
            for (const r of radios) {
              const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
              const txt = lbl?.innerText?.trim() || r.value;
              if (txt.toLowerCase().includes(answer.toLowerCase())) {
                r.click();
                log.push('Answered: ' + questionSnippet.substring(0, 30) + ' -> ' + answer);
              }
            }
            break;
          }
        }
        break;
      }
    }
  }
  return log;
}, answers);

console.log('Answers selected:');
result.forEach(l => console.log(' ', l));

await pg.screenshot({ path: 'scripts/screen.png', fullPage: false });
browser.disconnect();
