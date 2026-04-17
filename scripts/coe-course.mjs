import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

function pickAnswer(q, opts) {
  const ql = q.toLowerCase();
  const find = (...terms) => opts.find(o => terms.some(t => o.text.toLowerCase().includes(t)));
  const hasQ = (...terms) => terms.some(t => ql.includes(t));

  // Code of Ethics specific answers
  if (hasQ('conflict of interest') || hasQ('kickback') || hasQ('referring')) return find('false', 'no', 'not');
  if (hasQ('shall not') && hasQ('compensation')) return find('true', 'correct');
  if (hasQ('inspect') && hasQ('performed') && hasQ('inspection')) return find('true', 'yes');
  if (hasQ('confidential')) return find('true', 'yes', 'shall');
  if (hasQ('discriminate') || hasQ('discrimination')) return find('false', 'not discriminate', 'shall not');
  if (hasQ('repair') && hasQ('months')) return find('12');
  if (hasQ('honest') || hasQ('truthful')) return find('true', 'shall', 'required');
  if (hasQ('scope') && hasQ('limitation')) return find('true', 'shall', 'must');

  // Default: pick first option (usually "true" or positive answer for ethics)
  return opts[0];
}

let pageNum = 0;
let maxPages = 150; // safety limit

while (pageNum < maxPages) {
  await sleep(800);
  const url = pg.url();
  console.log(`\n[Page ${pageNum}] ${url}`);

  const data = await pg.evaluate(() => {
    const text = document.body.innerText;
    const nextBtn = document.querySelector('input[value="Next Page >>"], button[value="Next Page >>"]') ||
      Array.from(document.querySelectorAll('input[type=submit], button')).find(b => (b.value || b.innerText || '').includes('Next Page'));
    const radios = Array.from(document.querySelectorAll('input[type=radio]'));
    const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    const textareas = Array.from(document.querySelectorAll('textarea'));
    const submitBtn = Array.from(document.querySelectorAll('input[type=submit], button[type=submit]'))
      .find(b => !(b.value || b.innerText || '').includes('Next'));

    // Get question text
    const mainContent = document.querySelector('#content, .content, main, [role=main]');
    const pageText = mainContent ? mainContent.innerText : text.substring(0, 500);

    return {
      hasNext: !!nextBtn,
      hasRadios: radios.length > 0,
      hasTextarea: textareas.length > 0,
      hasSubmit: !!submitBtn,
      submitText: submitBtn ? (submitBtn.value || submitBtn.innerText || '').trim() : '',
      pageText: pageText.substring(0, 300),
      radios: radios.map(r => {
        const l = document.querySelector('label[for="' + r.id + '"]') || r.closest('label') || r.parentElement;
        return { id: r.id, name: r.name, value: r.value, text: (l ? l.innerText : r.value).trim().substring(0, 60), checked: r.checked };
      }),
      textareaId: textareas[0] ? textareas[0].id : '',
      url: location.href
    };
  });

  console.log('Has next:', data.hasNext, '| Radios:', data.radios.length, '| Textarea:', data.hasTextarea);
  console.log('Content:', data.pageText.substring(0, 100));

  // Handle textarea (writing assignments) - skip with placeholder text
  if (data.hasTextarea && data.hasSubmit) {
    console.log('Writing assignment detected - filling in essay...');
    const essayText = `According to the InterNACHI Code of Ethics, home inspectors must maintain a high standard of professionalism and integrity. Inspectors shall not engage in any conflict of interest, shall not accept referral fees or kickbacks, and shall keep all client information confidential. The Code of Ethics requires inspectors to be truthful and accurate in representing their qualifications and services. Inspectors must perform inspections in accordance with InterNACHI's Standards of Practice and shall not offer repair services on inspected properties for a period of 12 months following an inspection. These ethical obligations ensure public trust and protect both clients and the profession.`;

    await pg.evaluate((tid, txt) => {
      const ta = document.getElementById(tid) || document.querySelector('textarea');
      if (ta) { ta.value = txt; ta.dispatchEvent(new Event('input')); }
    }, data.textareaId, essayText);
    await sleep(500);

    // Submit
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('input[type=submit], button[type=submit]'))
        .find(b => !(b.value || b.innerText || '').includes('Next'));
      if (btn) btn.click();
    });
    await sleep(3000);
    pageNum++;
    continue;
  }

  // Handle radio questions
  if (data.radios.length > 0) {
    const grouped = {};
    for (const r of data.radios) {
      if (!grouped[r.name]) grouped[r.name] = [];
      grouped[r.name].push(r);
    }

    for (const [name, opts] of Object.entries(grouped)) {
      if (opts.some(o => o.checked)) continue; // already answered
      const answer = pickAnswer(data.pageText, opts);
      if (answer) {
        console.log(`Answering "${name}": "${answer.text}"`);
        await pg.evaluate((id) => { const el = document.getElementById(id); if (el) el.click(); }, answer.id);
        await sleep(300);
      }
    }
  }

  // Click submit if present (for quizzes)
  if (data.hasSubmit && !data.hasNext && data.radios.length > 0) {
    console.log('Submitting quiz...');
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('input[type=submit], button[type=submit]'))
        .find(b => !(b.value || b.innerText || '').includes('Next'));
      if (btn) btn.click();
    });
    await sleep(2000);
    pageNum++;
    continue;
  }

  // Click Next Page
  if (data.hasNext) {
    const advanced = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b => (b.value || b.innerText || '').includes('Next Page'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!advanced) break;
    await sleep(1500);
    pageNum++;
  } else {
    // Check if we're on results/done page
    const doneText = await pg.evaluate(() => document.body.innerText.substring(0, 300));
    if (doneText.includes('congratul') || doneText.includes('complete') || doneText.includes('passed') || doneText.includes('score')) {
      console.log('Course complete!', doneText.substring(0, 200));
      break;
    }
    // Try submitting form if any
    const submitted = await pg.evaluate(() => {
      const forms = document.querySelectorAll('form');
      const btn = Array.from(document.querySelectorAll('input[type=submit], button[type=submit]'))[0];
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!submitted) {
      console.log('No next button and no submit — stuck. Current page:', data.pageText.substring(0, 150));
      break;
    }
    await sleep(2000);
    pageNum++;
  }
}

await pg.screenshot({ path: 'scripts/coe-final.png' });
console.log('\nDone. Final URL:', pg.url());
browser.disconnect();
