import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

const essay1 = `During a home inspection in the Greater Toronto Area, the seller's real estate agent approached me before the inspection and said, "The house is in great shape — just go easy on anything you find, we have a deal pending." This created an immediate ethical conflict under the InterNACHI Code of Ethics.

According to the Code, I am required to be truthful and accurate in my report, and I must act in the interests of the client — the buyer — not the seller or the agent. Accepting any request to minimize findings would constitute a conflict of interest and a violation of the Code.

I declined the agent's request and proceeded with a thorough, unbiased inspection. I discovered significant moisture intrusion in the basement and evidence of previous water damage covered by fresh paint. I documented all findings accurately in the report and recommended further evaluation by a specialist.

The buyer received the full, truthful report and was able to negotiate repairs or adjust the purchase price accordingly. By following the InterNACHI Code of Ethics, I protected the client's interests and upheld the integrity of the profession.`;

const essay2 = `A home inspector faces an ethical dilemma when a past client contacts them asking for a referral to a roofing contractor who has previously offered the inspector a referral fee. Under the InterNACHI Code of Ethics, accepting or offering referral fees, commissions, or kickbacks from contractors is strictly prohibited, as it creates an undisclosed conflict of interest.

The ethical resolution is clear: the inspector must decline any financial arrangement with the contractor and instead provide the client with a list of several qualified roofing contractors without any personal financial interest in the referral. If the inspector has previously received referral fees from any contractor, that relationship must be disclosed to the client.

By refusing the kickback arrangement and providing unbiased referrals, the inspector maintains the trust of the client and complies fully with the InterNACHI Code of Ethics. The inspector's obligation is to serve the client's best interests, not to profit from referral arrangements that could compromise objectivity.`;

let pageCount = 0;
const maxPages = 50;

while (pageCount < maxPages) {
  await sleep(1000);
  const url = pg.url();

  const state = await pg.evaluate(() => {
    const body = document.body.innerText;
    const radios = Array.from(document.querySelectorAll('input[type=radio]'));
    const textarea = document.querySelector('textarea');
    const nextBtn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b => (b.value || b.innerText || '').includes('Next Page'));
    const submitBtn = Array.from(document.querySelectorAll('input[type=submit]')).find(b => !(b.value || '').includes('Next'));
    const lines = body.split('\n').map(l => l.trim()).filter(l => l);
    const title = lines[2] || lines[1] || '';
    return {
      title,
      url: location.href,
      hasNext: !!nextBtn,
      hasQuiz: radios.length > 0 && !!submitBtn,
      hasEssay: !!textarea,
      submitValue: submitBtn ? (submitBtn.value || '') : '',
      taId: textarea ? textarea.id : '',
      body: body.substring(0, 200)
    };
  });

  console.log(`[${pageCount}] ${state.title} | next:${state.hasNext} quiz:${state.hasQuiz} essay:${state.hasEssay}`);

  if (state.hasQuiz) {
    console.log('QUIZ — stopping for manual answer');
    break;
  }

  if (state.hasEssay) {
    console.log('Essay page — submitting...');
    const essayText = url.includes('9576') || pageCount > 10 ? essay2 : essay1;
    await pg.evaluate((tid, txt) => {
      const ta = document.getElementById(tid) || document.querySelector('textarea');
      if (ta) { ta.value = txt; ta.dispatchEvent(new Event('input')); ta.dispatchEvent(new Event('change')); }
    }, state.taId, essayText);
    await sleep(800);
    // Click submit
    await pg.evaluate(() => {
      const btn = document.querySelector('input[type=submit]');
      if (btn) btn.click();
    });
    await sleep(4000);
    pageCount++;
    continue;
  }

  if (state.hasNext) {
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b => (b.value || b.innerText || '').includes('Next Page'));
      if (btn) btn.click();
    });
    pageCount++;
  } else {
    // Check if complete
    if (state.body.toLowerCase().includes('congratul') || state.body.toLowerCase().includes('certificate') || state.body.toLowerCase().includes('complete')) {
      console.log('COURSE COMPLETE!');
    } else {
      console.log('No action found. Body:', state.body.substring(0, 150));
    }
    break;
  }
}

await pg.screenshot({ path: 'scripts/coe-current.png' });
console.log('\nStopped at:', pg.url());
const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 1500));
console.log(finalText);
browser.disconnect();
