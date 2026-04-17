import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org/my/exams'));
if (!pg) pg = pages[pages.length - 1];
const baseUrl = pg.url().replace(/\/\d+$/, '');
console.log('Base URL:', baseUrl);

// Answer key: indexed 1-100
// For radio (single answer): string
// For checkbox (multiple): array of strings
const answers = {
  1: '100',
  2: '2 feet',
  3: 'rafter spread',
  4: 'boot',
  5: 'protect the roof from sunlight',
  6: 'hand..... machine',
  7: 'cellulose..... fiberglass',
  8: '2 to 4 inches (51 - 102 mm)',
  9: 'should not',
  10: 'shake',
  11: 'terne roofing',
  12: 'copper or stainless steel',
  13: 'ribboning in it',
  14: 'fascia',
  15: '24',
  16: 'pan',
  17: 'a ridge and soffit',
  18: 'open',
  19: 'over the roofing paper/felt along the rake edge',
  20: 'ponding',
  21: 'True',
  22: 'Counter flashing',
  23: 'is not',
  24: 'Tar-and-gravel',
  25: '4:12',
  26: 'are not',
  27: 'do not',
  28: 'should',
  29: 'are not',
  30: 'asphalt shingles',
  31: 'standing seams or flashings',
  32: 'rafter sag or spread',
  33: 'bird stop',
  34: 'could',
  35: 'insulation and lack of air sealing',
  36: 'True',
  37: 'structure, flue',
  38: '150',
  39: 'dental molding',
  40: 'run',
  41: 'False',
  42: 'ponding',
  43: '100',
  44: 'presence of TV antennae',
  45: 'should',
  46: 'Depression between the rafters',
  47: '24',
  48: 'two',
  49: 'are not',
  50: 'Cricket',
  51: 'hailstones',
  52: 'is not',
  53: '3',
  54: '1930s and 1960s',
  55: 'The vent flashing was incorrectly installed and requires repair or replacement.',
  56: 'True',
  57: 'Tar and gravel',
  58: 'perpendicular',
  59: 'do',
  60: 'plys',
  61: 'not acceptable',
  62: 'kickout',
  63: 'saddleback or swayback',
  64: 'challenging',
  65: '2',
  66: 'should',
  67: ['steel'], // checkbox: choose all that apply - image shows rust = steel
  68: 'are not',
  69: '1/8-inch to 3/8-inch',
  70: 'thimble',
  71: 'H',
  72: 'require',
  73: 'all of these',
  74: 'steel',
  75: 'Slope',
  76: 'Architectural',
  77: 'True',
  78: 'Ridge',
  79: '3 feet',
  80: 'counter-flashing',
  81: 'True',
  82: 'are not',
  83: 'water or air expanding beneath the covering',
  84: '4:12',
  85: 'screwing or spiking them through the fascia and into the rafter tails',
  86: 'moss or mildew on the covering',
  87: 'True',
  88: 'galvanic reaction',
  89: 'Pointing',
  90: 'slope',
  91: 'the presence of leaf guards',
  92: 'darker',
  93: 'compression',
  94: 'span',
  95: 'All',
  96: 'Spalling',
  97: 'Steel',
  98: 'Adequate knee walls',
  99: ['The cap is cracked.', 'A rain cap is required.'], // checkbox
  100: 'Slope',
};

const results = [];

for (let q = 1; q <= 100; q++) {
  await pg.goto(baseUrl + '/' + q);
  await sleep(400);

  const answer = answers[q];
  const isArray = Array.isArray(answer);

  const result = await pg.evaluate((ans, isArr) => {
    const log = [];
    if (isArr) {
      // Checkbox questions
      const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
      ans.forEach(a => {
        const cb = checkboxes.find(c => {
          const lbl = document.querySelector('label[for="' + c.id + '"]') || c.parentElement;
          const txt = lbl?.innerText?.trim() || c.value;
          return txt.toLowerCase() === a.toLowerCase();
        });
        if (cb) { cb.click(); log.push('✓ ' + a); }
        else log.push('✗ no match: ' + a);
      });
    } else {
      // Radio questions
      const radios = Array.from(document.querySelectorAll('input[type=radio]'));
      const match = radios.find(r => {
        const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
        const txt = lbl?.innerText?.trim() || r.value;
        return txt.toLowerCase() === ans.toLowerCase();
      });
      if (match) { match.click(); log.push('✓ ' + ans); }
      else {
        log.push('✗ no match: ' + ans + ' in ' + radios.map(r => {
          const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
          return lbl?.innerText?.trim() || r.value;
        }).join(' | '));
      }
    }
    return log;
  }, answer, isArray);

  // Wait for "Save Answer & Continue" button to appear after selection, then click
  await sleep(600);
  const saved = await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      (b.innerText || '').toLowerCase().includes('save') ||
      (b.innerText || '').toLowerCase().includes('continue') ||
      (b.innerText || '').toLowerCase().includes('finish'));
    if (btn) { btn.click(); return btn.innerText.trim(); }
    return null;
  });

  results.push('Q' + q + ': ' + result.join(', ') + (saved ? ' → ' + saved : ' → NO BUTTON'));
  if (q % 10 === 0) console.log('Progress: Q' + q + ' | btn:', saved);
  await sleep(300);
}

await sleep(2000);

console.log('\n=== RESULTS ===');
results.forEach(r => console.log(r));

const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 500));
console.log('\nFinal page:', finalText);
browser.disconnect();
