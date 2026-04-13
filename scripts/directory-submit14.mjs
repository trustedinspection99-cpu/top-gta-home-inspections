/**
 * directory-submit14.mjs — Round 14: ProfileCanada Step 2 + Step 3
 * Browser is currently on "Edit Listing - Step 2" from Round 13
 */

import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const BIZ = {
  name: 'ASADS Home Inspection',
  phone: '647-801-9311',
  email: 'info@asads.ca',
  website: 'https://www.asads.ca',
  address: '45 Duckworth Rd',
  city: 'Cambridge',
  cityProvince: 'Cambridge, ON',
  cityId: '725',
  provinceAbb: 'ON',
  postal: 'N3H 0C1',
  description: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, mold, asbestos, radon & thermal imaging. Same-day reports. Licensed & insured.',
};

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

const results = [];
function log(site, status, note = '') {
  results.push({ site, status, note });
  const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

async function setField(pg, selector, value) {
  await pg.evaluate((sel, val) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    el.value = val;
    el.dispatchEvent(new Event('focus', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
    return true;
  }, selector, value);
}

async function handleStep(pg, stepNum) {
  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 600),
    forms: Array.from(document.querySelectorAll('form')).map((f, i) => ({
      index: i,
      action: f.action,
      id: f.id,
      fields: Array.from(f.elements).map(el => ({
        name: el.name, type: el.type, id: el.id, value: el.value?.substring(0, 50),
      })).filter(el => el.name),
      buttons: Array.from(f.querySelectorAll('button, input[type=submit], .dv_login_profile_btn[onclick]')).map(b => ({
        type: b.type || 'div', text: b.innerText || b.value, onclick: b.getAttribute('onclick'),
      })),
    })),
  }));

  console.log(`\n  Current: title="${state.title}" url=${state.url}`);
  console.log(`  Forms:`, JSON.stringify(state.forms.map(f => ({ id: f.id, action: f.action, fieldCount: f.fields.length, buttons: f.buttons }))));

  const title = state.title.toLowerCase();
  const text = state.text.toLowerCase();

  // Already done?
  if (text.includes('thank') || text.includes('success') || text.includes('complete') || text.includes('submitted')) {
    return 'SUCCESS';
  }
  if (text.includes('step 3') || title.includes('step 3')) {
    return 'STEP3';
  }
  if (text.includes('verif') || (text.includes('email') && text.includes('sent'))) {
    return 'EMAIL';
  }

  if (title.includes('step 1') || (title.includes('step') && !title.includes('step 2') && !title.includes('step 3'))) {
    // Back on step 1 — redo it
    return 'STEP1';
  }

  if (title.includes('step 2') || title.includes('similar') || text.includes('step 2')) {
    // Fill step 2
    console.log(`\n  Filling Step 2 fields...`);
    console.log('  All step 2 fields:', JSON.stringify(state.forms.find(f => f.fields.length > 2)?.fields));

    // Fill email (visible on step 2)
    await setField(pg, '#businessemail, [name="businessemail"]', BIZ.email);
    await setField(pg, '#tollFree, [name="tollFree"]', '');
    await setField(pg, '#fax, [name="fax"]', '');

    // Also fill description if visible
    const descFilled = await pg.evaluate((desc) => {
      const el = document.querySelector('#businessDescription, [name="businessDescription"]');
      if (el && (el.type !== 'hidden')) {
        el.value = desc;
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      return false;
    }, BIZ.description.substring(0, 200));
    if (descFilled) console.log('  Description filled');

    await sleep(1000);

    // Verify email field
    const emailVal = await pg.evaluate(() => {
      const el = document.querySelector('#businessemail, [name="businessemail"]');
      return { value: el?.value, type: el?.type, id: el?.id };
    });
    console.log('  Email field:', JSON.stringify(emailVal));

    // Submit step 2
    const clicked = await pg.evaluate(() => {
      // Try submitStep2
      if (typeof submitStep2 === 'function') { submitStep2(); return 'submitStep2()'; }

      // Try Continue div
      const continueDiv = Array.from(document.querySelectorAll('[onclick*="submitStep"], .dv_login_profile_btn')).find(el =>
        (el.innerText || '').toLowerCase().includes('continue') || (el.getAttribute('onclick') || '').includes('submitStep2')
      );
      if (continueDiv) { continueDiv.click(); return 'div: ' + continueDiv.innerText + ' onclick: ' + continueDiv.getAttribute('onclick'); }

      // Try submit input
      const submitBtn = document.querySelector('input[type="submit"], button[type="submit"]');
      if (submitBtn) { submitBtn.click(); return 'submit btn'; }

      // Form submit
      const form = document.querySelector('#frm_st2') || document.querySelectorAll('form')[1];
      if (form) { form.submit(); return 'form#' + (form.id || 'index1') + '.submit()'; }

      return 'nothing found';
    });
    console.log('  Step 2 submit:', clicked);
    await sleep(10000);
    return 'SUBMITTED_STEP2';
  }

  return 'UNKNOWN:' + state.title;
}

async function runFullFlow(pg) {
  // First check current state
  const cur = await pg.evaluate(() => ({ url: window.location.href, title: document.title }));
  console.log('  Current page:', cur.title, cur.url);

  // If not on ProfileCanada, navigate there
  if (!cur.url.includes('profilecanada')) {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
  }

  // Check if we're already on step 2 (from Round 13)
  const initState = await pg.evaluate(() => ({ title: document.title, url: window.location.href }));
  console.log('  Initial state:', initState.title);

  let currentStep = 'unknown';
  if (initState.title.includes('Step 2')) {
    currentStep = 'step2';
  } else if (initState.title.includes('Similar')) {
    currentStep = 'similar';
  } else {
    // Need to redo step 1
    currentStep = 'step1';
  }

  if (currentStep === 'step1') {
    console.log('  On step 1 — filling and submitting...');
    // Fill step 1
    await setField(pg, '#businessName', BIZ.name);
    await setField(pg, '#locationCity', BIZ.cityProvince);
    await setField(pg, '#address', BIZ.address);
    await setField(pg, '#postal', BIZ.postal);
    await setField(pg, '#phone', BIZ.phone);
    await setField(pg, '#website', BIZ.website);
    await setField(pg, '[name="businessDescription"]', BIZ.description.substring(0, 200));
    await setField(pg, '[name="businessemail"]', BIZ.email);

    await pg.evaluate((id) => {
      const el = document.querySelector('#locationId');
      if (el) el.value = id;
      const radio = document.querySelector('input[name="claimdby"][value="owner"]');
      if (radio) radio.click();
      if (typeof setImageValidator === 'function') {
        setImageValidator('img_locationCity', true, true);
        setImageValidator('img_location', true, true);
      }
    }, BIZ.cityId);

    await sleep(500);

    // Click Continue
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('[onclick*="submitStep1"], .dv_login_profile_btn')).find(el =>
        (el.innerText || '').toLowerCase().includes('continue')
      );
      if (btn) btn.click();
      else if (typeof submitStep1 === 'function') submitStep1();
    });
    await sleep(12000);
  }

  if (currentStep === 'similar') {
    // Handle similar businesses
    await pg.evaluate(() => {
      const radios = document.querySelectorAll('input[name="cmp"]');
      const addNew = Array.from(radios).find(r => r.value === '' || r.value === '0');
      if (addNew) { addNew.checked = true; addNew.dispatchEvent(new Event('change', { bubbles: true })); }
      if (typeof submitStep2 === 'function') submitStep2();
      else {
        const btn = document.querySelector('input[type="submit"], .dv_login_profile_btn');
        if (btn) btn.click();
      }
    });
    await sleep(10000);
  }

  // Now handle step 2
  const result2 = await handleStep(pg, 2);
  console.log('  handleStep result:', result2);

  if (result2 === 'SUBMITTED_STEP2') {
    // Check state after step 2
    const state3 = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 800),
    }));
    console.log('\n  After step 2 title:', state3.title);
    console.log('  After step 2 text:', state3.text.substring(0, 400));

    const t3 = state3.text.toLowerCase();
    const title3 = state3.title.toLowerCase();

    if (title3.includes('step 3') || t3.includes('step 3') || t3.includes('verif') || (t3.includes('email') && t3.includes('sent'))) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Steps 1+2 complete — check info@asads.ca for step 3 verification link');
    } else if (t3.includes('thank') || t3.includes('success') || t3.includes('complete') || t3.includes('submitted')) {
      log('ProfileCanada.com', 'SUCCESS', 'All 3 steps complete!');
    } else if (t3.includes('code') || t3.includes('enter') || t3.includes('confirm')) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca for verification code');
    } else {
      log('ProfileCanada.com', 'CHECK', 'URL: ' + state3.url + ' title: ' + state3.title + ' text: ' + state3.text.substring(0, 100));
    }
  } else if (result2 === 'SUCCESS') {
    log('ProfileCanada.com', 'SUCCESS', 'All steps complete!');
  } else if (result2 === 'EMAIL') {
    log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca for verification link');
  } else {
    log('ProfileCanada.com', 'CHECK', 'Result: ' + result2 + ' — visit manually: profilecanada.com/advertising/editlisting.cfm');
  }
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('❌ Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  console.log('🔄 Round 14 — ProfileCanada Step 2 + 3\n');

  await runFullFlow(pg);

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  COMPLETE STATUS');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('📧  Fyple.ca — Check info@asads.ca');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca');
  console.log('✅  B2BCo.com — Registered (confirmed logged in)');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
