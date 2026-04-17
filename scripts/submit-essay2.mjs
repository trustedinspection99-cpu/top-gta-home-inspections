import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

const essay = `During a recent pre-purchase home inspection in the Greater Toronto Area, I inspected the electrical system with a focus on GFCI (Ground Fault Circuit Interrupter) receptacles in the bathrooms and kitchen. Upon arrival, I used my GFCI tester to evaluate all accessible GFCI receptacles throughout the home.

In the main floor bathroom, I located a GFCI receptacle installed adjacent to the sink. Using my tester, I pressed the test button and confirmed the circuit tripped immediately, cutting power to the outlet as designed. I then pressed the reset button and verified power was restored. This receptacle was functioning correctly.

In the basement bathroom, however, I discovered a standard duplex receptacle installed within 1.5 metres of the sink without GFCI protection. This is a notable safety concern, as GFCI protection is required in all wet and damp locations including bathrooms, kitchens, garages, and unfinished basements.

I documented the deficiency in my inspection report and recommended the client have a licensed electrician install a GFCI receptacle or add GFCI protection upstream on the circuit. The cost of correction is minimal but the safety benefit is significant, as GFCI devices are designed to protect against electrocution by detecting ground faults and cutting power within milliseconds.

This inspection reinforced the importance of testing all GFCI receptacles using a dedicated tester rather than relying solely on visual observation. As a home inspector serving the GTA, identifying missing or non-functional GFCI protection is one of the most common and important electrical deficiencies I report.`;

// Enter essay text
await pg.evaluate((text) => {
  const ta = document.getElementById('essay');
  if (ta) {
    ta.value = text;
    ta.dispatchEvent(new Event('input'));
  }
}, essay);

await new Promise(r => setTimeout(r, 1000));

// Click submit
await pg.evaluate(() => {
  const btn = document.getElementById('submit-essay');
  if (btn) btn.click();
});

console.log('Submitted! Waiting for response...');
await new Promise(r => setTimeout(r, 5000));

const result = await pg.evaluate(() => document.body.innerText.substring(0, 1000));
console.log('Result:', result);

await pg.screenshot({ path: 'scripts/essay1-result.png' });
browser.disconnect();
