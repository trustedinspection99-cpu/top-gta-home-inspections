import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

const essay = `After studying InterNACHI's materials on deck safety and ledger board connections, I gained a deeper understanding of one of the most critical and commonly overlooked areas in residential home inspection. According to InterNACHI research, approximately 90% of deck collapses are caused by ledger board failures — the connection point where the deck attaches to the house.

During inspections, I have observed that many decks are improperly attached using nails instead of the required lag screws or through-bolts. Additionally, flashing is frequently missing or improperly installed at the ledger, allowing water to penetrate behind the ledger board and cause wood rot, often hidden from view. Painted deck posts are another common concern, as paint can conceal advanced wood decay.

When inspecting decks, I now apply a systematic approach: I check the ledger attachment hardware, inspect for proper flashing, probe wood members for decay using a screwdriver or pick, evaluate the spacing between spindles for fall hazards, and assess the condition of handrails and guards. I also confirm that the deck planking is supported by a minimum of three joists and that the cantilever does not exceed one-third of the overall span.

This research reinforced that decks require the same rigorous attention as any structural component, and that visual observation alone is not sufficient — physical probing of wood is essential to identify hidden decay.`;

// Enter essay
await pg.evaluate((text) => {
  const ta = document.getElementById('essay');
  if (ta) {
    ta.value = text;
    ta.dispatchEvent(new Event('input'));
  }
}, essay);

await new Promise(r => setTimeout(r, 500));

// Check word count
const wc = await pg.evaluate(() => {
  const wcEl = document.querySelector('.essay-word-count');
  return wcEl ? wcEl.innerText : '';
});
console.log('Word count:', wc);

// Upload photo
const photoPath = 'C:\\Users\\Owner\\Pictures\\1000001304.jpg';
const fileInput = await pg.$('#essay-photo');
if (fileInput) {
  await fileInput.uploadFile(photoPath);
  console.log('Photo uploaded');
}

await new Promise(r => setTimeout(r, 1000));

// Submit
await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('input[type="submit"], button'))
    .find(b => (b.value || b.innerText || '').includes('Submit'));
  if (btn) btn.click();
});

console.log('Submitted! Waiting...');
await new Promise(r => setTimeout(r, 6000));

const result = await pg.evaluate(() => document.body.innerText.substring(0, 800));
console.log('Result:', result);

await pg.screenshot({ path: 'scripts/essay2-result.png' });
browser.disconnect();
