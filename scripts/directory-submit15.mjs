/**
 * directory-submit15.mjs — Round 15: ProfileCanada Step 2 submit
 * Browser is on "Edit Listing - Step 2" — fill and submit it
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

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('❌ Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  console.log('🔄 Round 15 — ProfileCanada Step 2 submit\n');

  try {
    // Check current page
    const cur = await pg.evaluate(() => ({ url: window.location.href, title: document.title }));
    console.log('Current:', cur.title);

    // If not on step 2, navigate back to step 1 and redo
    if (!cur.title.includes('Step 2')) {
      console.log('Not on Step 2, redoing step 1...');
      await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(3000);

      await pg.evaluate((biz) => {
        function set(sel, val) {
          const el = document.querySelector(sel);
          if (!el) return;
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          el.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        set('#businessName', biz.name);
        set('#locationCity', biz.cityProvince);
        set('#address', biz.address);
        set('#postal', biz.postal);
        set('#phone', biz.phone);
        set('#website', biz.website);
        set('[name="businessDescription"]', biz.description.substring(0, 200));
        set('[name="businessemail"]', biz.email);
        const locationIdEl = document.querySelector('#locationId');
        if (locationIdEl) locationIdEl.value = biz.cityId;
        const radio = document.querySelector('input[name="claimdby"][value="owner"]');
        if (radio) radio.click();
        if (typeof setImageValidator === 'function') {
          setImageValidator('img_locationCity', true, true);
          setImageValidator('img_location', true, true);
        }
      }, BIZ);
      await sleep(500);

      await pg.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('[onclick*="submitStep1"], .dv_login_profile_btn')).find(el =>
          (el.innerText || '').toLowerCase().includes('continue'));
        if (btn) btn.click();
        else if (typeof submitStep1 === 'function') submitStep1();
      });
      await sleep(12000);

      const afterStep1 = await pg.evaluate(() => ({ title: document.title }));
      console.log('After step 1:', afterStep1.title);
    }

    // Now we should be on Step 2
    // Read all fields on step 2
    const step2Info = await pg.evaluate(() => {
      const form = document.querySelector('#frm_st2') || document.querySelectorAll('form')[1];
      if (!form) return null;

      const allFields = Array.from(form.elements).map(el => ({
        name: el.name,
        type: el.type,
        id: el.id,
        value: el.value?.substring(0, 50),
        visible: el.type !== 'hidden' && el.offsetParent !== null,
      }));

      const onclickEls = Array.from(form.querySelectorAll('[onclick]')).map(el => ({
        tag: el.tagName,
        onclick: el.getAttribute('onclick'),
        text: el.innerText?.substring(0, 30),
      }));

      return {
        action: form.action,
        id: form.id,
        allFields,
        onclickEls,
        pageText: document.body.innerText.substring(0, 800),
      };
    });

    console.log('Step 2 form ID:', step2Info?.id);
    console.log('Step 2 all fields:');
    step2Info?.allFields.forEach(f => console.log(`  [${f.visible ? 'VISIBLE' : 'hidden'}] ${f.type} name="${f.name}" id="${f.id}" value="${f.value}"`));
    console.log('Step 2 onclick elements:', JSON.stringify(step2Info?.onclickEls));
    console.log('Page text:', step2Info?.pageText.substring(0, 400));

    // Fill step 2 visible fields
    const fillResult = await pg.evaluate((biz) => {
      const form = document.querySelector('#frm_st2') || document.querySelectorAll('form')[1];
      if (!form) return 'no form';

      const log = [];

      function setField(name, value) {
        // Try by name first
        const el = form.querySelector(`[name="${name}"]`) || form.querySelector(`#${name}`);
        if (!el) { log.push(`MISSING: ${name}`); return; }
        el.value = value;
        el.dispatchEvent(new Event('focus', { bubbles: true }));
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
        log.push(`SET ${el.type}[${name}] = "${value.substring(0, 25)}"`);
      }

      // Set email (required on step 2)
      setField('businessemail', biz.email);
      setField('tollFree', '');
      setField('fax', '');

      // Set description if visible
      const descEl = form.querySelector('[name="businessDescription"]');
      if (descEl && descEl.type !== 'hidden') {
        setField('businessDescription', biz.description.substring(0, 200));
      }

      // All visible inputs — fill any empty ones
      Array.from(form.elements).forEach(el => {
        if (el.type === 'hidden' || !el.name || el.offsetParent === null) return;
        if (el.value) return; // already has value
        const key = (el.name || el.id || '').toLowerCase();
        if (key.includes('phone') || key.includes('tel')) { el.value = biz.phone; el.dispatchEvent(new Event('change', { bubbles: true })); log.push('SET phone: ' + el.name); }
        if (key.includes('web') || key.includes('url')) { el.value = biz.website; el.dispatchEvent(new Event('change', { bubbles: true })); log.push('SET web: ' + el.name); }
      });

      // Mark email as valid
      if (typeof setImageValidator === 'function') setImageValidator('img_businessemail', true, true);

      // Verify
      const verify = {};
      Array.from(form.elements).forEach(el => {
        if (el.name && el.type !== 'radio') verify[el.name] = el.value?.substring(0, 40);
      });

      return { log, verify };
    }, BIZ);

    console.log('\nFill result:', fillResult.log?.join(' | '));
    console.log('Verified:', JSON.stringify(fillResult.verify));

    await sleep(1500);

    // Submit step 2
    console.log('\nSubmitting step 2...');
    const clicked = await pg.evaluate(() => {
      // Try submitStep2 function
      if (typeof submitStep2 === 'function') { submitStep2(); return 'submitStep2()'; }

      // Try Continue onclick div
      const continueDiv = Array.from(document.querySelectorAll('[onclick*="submitStep2"], .dv_login_profile_btn')).find(el =>
        (el.innerText || el.getAttribute('onclick') || '').toLowerCase().includes('continue') ||
        (el.getAttribute('onclick') || '').includes('submitStep2'));
      if (continueDiv) { continueDiv.click(); return 'div.click: ' + continueDiv.getAttribute('onclick'); }

      // Direct form submit
      const form = document.querySelector('#frm_st2') || document.querySelectorAll('form')[1];
      if (form) { form.submit(); return 'form#frm_st2.submit()'; }

      return 'nothing found';
    });
    console.log('Clicked:', clicked);
    await sleep(12000);

    // Check result
    const finalState = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 1000),
    }));
    console.log('\nFinal URL:', finalState.url);
    console.log('Final title:', finalState.title);
    console.log('Final text:', finalState.text.substring(0, 500));

    const ft = finalState.text.toLowerCase();
    const ftitle = finalState.title.toLowerCase();

    if (ftitle.includes('step 3') || ft.includes('step 3')) {
      console.log('\nStep 3 reached! Reading...');
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Steps 1+2 done — check info@asads.ca for step 3 verification email');
    } else if (ft.includes('thank you') || ft.includes('success') || ft.includes('listing added') || ft.includes('business listed')) {
      log('ProfileCanada.com', 'SUCCESS', 'All steps submitted!');
    } else if (ft.includes('verif') || (ft.includes('email') && (ft.includes('sent') || ft.includes('check')))) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca for verification link/code');
    } else if (ft.includes('code') || ft.includes('update code')) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca — verification code will be emailed');
    } else if (ftitle.includes('step 2') || ft.includes('please correct')) {
      log('ProfileCanada.com', 'CHECK', 'Still on step 2 — validation issue. Visit manually: profilecanada.com/advertising/editlisting.cfm');
    } else {
      log('ProfileCanada.com', 'CHECK', 'URL: ' + finalState.url + ' title: ' + finalState.title + ' text: ' + finalState.text.substring(0, 80));
    }

  } catch (e) {
    log('ProfileCanada.com', 'ERROR', e.message.substring(0, 80));
  }

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
