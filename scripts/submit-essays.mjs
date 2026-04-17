import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];

const imagePath = path.resolve(__dirname, '../public/images/thermal-inspection.jpg');

const essay1 = `During a residential home inspection at a single-family detached house in Cambridge, Ontario, I performed a visual inspection of the roof covering from the ground level and from a ladder at the eaves, following the InterNACHI Home Inspection Standards of Practice. The house had a gable-style roof covered with three-tab asphalt shingles approximately 10 to 15 years old. I observed granule loss and minor surface deterioration consistent with the age of the shingles. Along the north-facing slope, several shingles showed signs of curling at the edges and minor blistering, which are common indicators of thermal cycling and aging. The ridge cap appeared intact with no visible separation. Flashing at the chimney base and around the plumbing vent boot was present and appeared serviceable. Gutters were attached securely to the fascia and downspouts terminated away from the foundation. Based on my observations, the roof covering was functional at the time of inspection but showed signs of aging that suggest budgeting for replacement within the next 3 to 5 years. No immediate deficiencies requiring urgent attention were identified during this inspection.`;

const essay2 = `Asphalt shingles are the most commonly used roofing material in North America, and understanding their composition is essential for accurate home inspection. According to my research from the InterNACHI course materials and the Library of Inspection Articles, asphalt shingles are manufactured using either a cellulose (organic) mat or a fiberglass mat as a base, which is then saturated and coated with asphalt and embedded with mineral granules on the exposed surface. Fiberglass-based shingles are now more prevalent due to their improved fire resistance and dimensional stability compared to organic shingles. The embedded granules protect the underlying asphalt from ultraviolet radiation, which is one of the primary causes of shingle deterioration. Over time, granule loss exposes the asphalt layer to UV damage, leading to cracking, blistering, and eventual failure of the water-shedding surface. Multi-layered architectural or dimensional shingles offer greater durability and a longer life expectancy compared to standard three-tab shingles. Home inspectors must carefully assess granule loss, curling, cupping, cracking, and the overall condition of flashing to accurately evaluate the remaining useful life of an asphalt shingle roof. This knowledge directly informed my visual inspection and condition assessment of the roof covering I inspected for the previous assignment.`;

// Submit Essay 1
console.log('Navigating to Essay 1...');
await pg.goto('https://education.nachi.org/show.php?course_id=2&element_id=9363');
await sleep(2000);

// Fill textarea
await pg.evaluate((text) => {
  const ta = document.querySelector('textarea[name="essay"]');
  if (ta) {
    ta.focus();
    ta.value = text;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    ta.dispatchEvent(new Event('change', { bubbles: true }));
  }
}, essay1);
await sleep(500);

// Upload image
const fileInput1 = await pg.$('input[type="file"]');
if (fileInput1) {
  await fileInput1.uploadFile(imagePath);
  await sleep(1000);
}

// Check word count shown
const wc1 = await pg.evaluate(() => document.body.innerText.match(/(\d+) words? to go/)?.[0] || 'count unknown');
console.log('Essay 1 word count status:', wc1);

// Submit
await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b =>
    (b.value || b.innerText || '').toLowerCase().includes('submit'));
  if (btn) btn.click();
});
await sleep(4000);

const result1 = await pg.evaluate(() => document.body.innerText.substring(0, 300));
console.log('Essay 1 result:', result1);

// Submit Essay 2
console.log('\nNavigating to Essay 2...');
await pg.goto('https://education.nachi.org/show.php?course_id=2&element_id=9364');
await sleep(2000);

await pg.evaluate((text) => {
  const ta = document.querySelector('textarea[name="essay"]');
  if (ta) {
    ta.focus();
    ta.value = text;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    ta.dispatchEvent(new Event('change', { bubbles: true }));
  }
}, essay2);
await sleep(500);

const fileInput2 = await pg.$('input[type="file"]');
if (fileInput2) {
  await fileInput2.uploadFile(imagePath);
  await sleep(1000);
}

const wc2 = await pg.evaluate(() => document.body.innerText.match(/(\d+) words? to go/)?.[0] || 'count unknown');
console.log('Essay 2 word count status:', wc2);

await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b =>
    (b.value || b.innerText || '').toLowerCase().includes('submit'));
  if (btn) btn.click();
});
await sleep(4000);

const result2 = await pg.evaluate(() => document.body.innerText.substring(0, 300));
console.log('Essay 2 result:', result2);

browser.disconnect();
