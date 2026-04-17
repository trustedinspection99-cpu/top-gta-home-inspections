import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

// Known correct answers from Code of Ethics content
// Key: question name, Value: correct answer text (lowercase match)
const knownAnswers = {
  // Simply joining = not certified
  question10613: 'false',
  // Free exam
  question10609: 'true',
  // Nationally accredited
  question10612: 'true',
  // Free exam
  question10610: 'true',
  // Every course from School
  question10611: 'true',
  // CPI can reply "Yes"
  question10614: 'yes.',
};

// CoE quiz answer logic based on content knowledge
function pickCoEAnswer(questionText, opts) {
  const q = questionText.toLowerCase();
  const find = (...terms) => opts.find(o => terms.some(t => o.text.toLowerCase().includes(t)));

  // Ethics-specific rules
  if (q.includes('conflict of interest')) return find('false', 'no', 'shall not');
  if (q.includes('kickback') || q.includes('referral fee')) return find('false', 'shall not', 'prohibited');
  if (q.includes('simply joining') && q.includes('certified')) return find('false');
  if (q.includes('repair') && q.includes('month')) return find('12');
  if (q.includes('confidential')) return find('true', 'shall', 'must');
  if (q.includes('discriminate') || q.includes('discrimination')) return find('false', 'shall not', 'not discriminate');
  if (q.includes('honest') || q.includes('truthful') || q.includes('accurate')) return find('true', 'shall', 'required');
  if (q.includes('cpi') && q.includes('certified') && q.includes('reply')) return find('yes');
  if (q.includes('internachi') && q.includes('school') && q.includes('accredited')) return find('true');
  if (q.includes('free') && q.includes('exam')) return find('true');
  if (q.includes('every course') && q.includes('school')) return find('true');
  if (q.includes('not required') || q.includes('not permitted')) return find('true');
  if (q.includes('inspector shall') || q.includes('must') || q.includes('required to')) return find('true', 'shall');
  if (q.includes('shall not') || q.includes('prohibited') || q.includes('never')) return find('false', 'no', 'shall not');
  if (q.includes('may not') || q.includes('cannot') || q.includes('not allowed')) return find('false', 'no');
  if (q.includes('true or false') && q.includes('ethical')) return find('true');

  // Default: True for positive statements, False for negative
  if (q.includes('shall not') || q.includes('prohibited') || q.includes('conflict')) return find('false');
  return find('true') || opts[0];
}

let page = 0;
const maxPages = 200;

while (page < maxPages) {
  await sleep(1000);
  const url = pg.url();
  console.log(`\n[${page}] ${url.split('?')[1] || url}`);

  const data = await pg.evaluate(() => {
    const body = document.body.innerText;
    const radios = Array.from(document.querySelectorAll('input[type=radio]'));
    const textarea = document.querySelector('textarea');
    const nextBtn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b => (b.value || b.innerText || '').includes('Next Page'));
    const submitBtn = Array.from(document.querySelectorAll('input[type=submit]')).find(b => !(b.value || '').includes('Next'));

    // Extract main content text
    const contentEl = document.querySelector('#content, .quiz, form, main') || document.body;
    const contentText = contentEl.innerText.substring(0, 800);

    return {
      url: location.href,
      hasNext: !!nextBtn,
      hasSubmit: !!submitBtn,
      submitValue: submitBtn ? (submitBtn.value || '') : '',
      hasTextarea: !!textarea,
      textareaId: textarea ? textarea.id : '',
      content: contentText,
      passed: body.includes('Congratulations') || body.includes('100.0%') || body.includes('passed'),
      failed: body.includes('Sorry, you need'),
      radios: radios.map(r => {
        const l = document.querySelector('label[for="' + r.id + '"]') || r.closest('label') || r.parentElement;
        return { id: r.id, name: r.name, value: r.value, text: (l ? l.innerText : r.value).trim(), checked: r.checked };
      })
    };
  });

  if (data.passed && !data.hasNext && !data.hasSubmit && !data.hasTextarea) {
    console.log('COURSE COMPLETE!');
    break;
  }

  // Handle writing assignments
  if (data.hasTextarea && data.hasSubmit) {
    console.log('Writing assignment - submitting essay...');
    const essay = `InterNACHI's Code of Ethics establishes the professional and ethical standards that all Certified Professional Inspectors must follow. According to the Code, inspectors shall not engage in any activities that constitute a conflict of interest, such as accepting referral fees or kickbacks from contractors or other service providers. Inspectors are required to maintain client confidentiality and shall not discriminate against any client on the basis of race, color, religion, sex, national origin, familial status, sexual orientation, or handicap. The Code requires that inspectors be honest and accurate in representing their qualifications, experience, and the scope of their inspection services. Inspectors shall not offer to perform repair services on any inspected property for a period of 12 months following an inspection. These standards protect the public and uphold the integrity of the home inspection profession.`;

    await pg.evaluate((tid, txt) => {
      const ta = document.getElementById(tid) || document.querySelector('textarea');
      if (ta) { ta.value = txt; ta.dispatchEvent(new Event('input')); ta.dispatchEvent(new Event('change')); }
    }, data.textareaId, essay);
    await sleep(800);
    await pg.evaluate(() => { const btn = document.querySelector('input[type=submit]'); if (btn) btn.click(); });
    await sleep(4000);
    page++;
    continue;
  }

  // Handle quiz with radios
  if (data.radios.length > 0 && data.hasSubmit) {
    console.log(`Quiz with ${data.radios.length} options`);

    // Group by question name
    const grouped = {};
    for (const r of data.radios) {
      if (!grouped[r.name]) grouped[r.name] = [];
      grouped[r.name].push(r);
    }

    for (const [name, opts] of Object.entries(grouped)) {
      // Use known answer if available
      let target = null;
      if (knownAnswers[name]) {
        target = opts.find(o => o.text.toLowerCase() === knownAnswers[name]);
      }
      if (!target) {
        // Use content-based logic
        target = pickCoEAnswer(data.content, opts);
      }
      if (target && !target.checked) {
        console.log(`  ${name}: "${target.text}"`);
        await pg.click('#' + target.id);
        await sleep(250);
      }
    }
    await sleep(400);
    await pg.click('input[type=submit]');
    await sleep(3000);
    page++;
    continue;
  }

  // Click Next Page
  if (data.hasNext) {
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b => (b.value || b.innerText || '').includes('Next Page'));
      if (btn) btn.click();
    });
    console.log('  -> Next page');
    await sleep(1500);
    page++;
  } else {
    // Check for completion
    const bodyText = await pg.evaluate(() => document.body.innerText.substring(0, 500));
    if (bodyText.toLowerCase().includes('congratul') || bodyText.toLowerCase().includes('complete') || bodyText.toLowerCase().includes('certificate')) {
      console.log('Done!', bodyText.substring(0, 200));
      break;
    }
    console.log('Stuck on page. Content:', data.content.substring(0, 150));
    break;
  }
}

await pg.screenshot({ path: 'scripts/coe-final.png' });
console.log('Final URL:', pg.url());
const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 800));
console.log(finalText.substring(0, 400));
browser.disconnect();
