import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
await pg.goto('https://education.nachi.org/show.php?course_id=13&element_id=200');
await sleep(2000);

// Map question name -> correct answer
const answerMap = {
  question251: 'Nylon clothing',           // unsuitable to wear
  question260: 'the water pressure',        // voltage equals
  question257: 'wires to the outlets',      // branch circuit conductors
  question9373: 'American Wire Gauge',      // AWG means
  question253: 'any of these conditions',   // don't open panel
  question262: 'aluminum',                  // sized larger than copper
  question252: 'none of these',             // safe to insert
  question261: 'amps',                      // watts = volts x
  question256: 'service panel',             // no disconnect = called
};

const result = await pg.evaluate((amap) => {
  const radios = Array.from(document.querySelectorAll('input[type=radio]'));
  const log = [];
  radios.forEach(r => {
    const ans = amap[r.name];
    if (!ans) return;
    const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
    const txt = (lbl?.innerText?.trim() || r.value);
    if (txt.toLowerCase() === ans.toLowerCase()) {
      r.click();
      log.push('✓ ' + r.name + ': ' + txt);
    }
  });
  return log;
}, answerMap);

result.forEach(r => console.log(r));

await sleep(500);
const submitted = await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b =>
    (b.value||b.innerText||'').toLowerCase().match(/submit|grade|next/));
  if (btn) { btn.click(); return btn.value || btn.innerText; }
  return null;
});
console.log('Submitted:', submitted);
await sleep(3000);
const final = await pg.evaluate(() => document.body.innerText.substring(0, 800));
console.log('\nResult:', final);
browser.disconnect();
