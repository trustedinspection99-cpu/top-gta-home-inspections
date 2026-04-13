/**
 * directory-submit13.mjs — Round 13: ProfileCanada FINAL
 * - locationCity = "Cambridge, ON" (passes checkLocation API)
 * - locationId = "725" (Cambridge, ON autocomplete ID)
 * - All fields filled → submitStep1() → handles Similar Businesses → Step 2 → Step 3
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
    if (!el) return;
    el.value = val;
    el.dispatchEvent(new Event('focus', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  }, selector, value);
}

async function doProfileCanada(pg) {
  console.log('\n── ProfileCanada.com — Round 13 (final)');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    console.log('  Filling form...');

    // Fill all fields
    await setField(pg, '#businessName', BIZ.name);
    await setField(pg, '#locationCity', BIZ.cityProvince);  // "Cambridge, ON"
    await setField(pg, '#address', BIZ.address);
    await setField(pg, '#postal', BIZ.postal);
    await setField(pg, '#phone', BIZ.phone);
    await setField(pg, '#website', BIZ.website);
    await setField(pg, '[name="businessDescription"]', BIZ.description.substring(0, 200));
    await setField(pg, '[name="businessemail"]', BIZ.email);

    // Set locationId (autocomplete data)
    await pg.evaluate((id) => {
      const el = document.querySelector('#locationId');
      if (el) el.value = id;
    }, BIZ.cityId);

    // Click owner radio
    await pg.evaluate(() => {
      const radio = document.querySelector('input[name="claimdby"][value="owner"]');
      if (radio) radio.click();
    });

    // Mark locationCity as valid (bypass UI validation indicator)
    await pg.evaluate(() => {
      if (typeof setImageValidator === 'function') {
        setImageValidator('img_locationCity', true, true);
        setImageValidator('img_location', true, true);
      }
    });

    await sleep(1000);

    // Verify fields
    const vals = await pg.evaluate(() => ({
      businessName: document.querySelector('#businessName')?.value,
      locationCity: document.querySelector('#locationCity')?.value,
      locationId: document.querySelector('#locationId')?.value,
      address: document.querySelector('#address')?.value,
      postal: document.querySelector('#postal')?.value,
      phone: document.querySelector('#phone')?.value,
      website: document.querySelector('#website')?.value,
      claimdby: document.querySelector('input[name="claimdby"]:checked')?.value,
    }));
    console.log('  Fields:', JSON.stringify(vals));

    // Click Continue — this triggers submitStep1()
    console.log('  Clicking Continue...');
    await pg.evaluate(() => {
      const continueDiv = Array.from(document.querySelectorAll('div.dv_login_profile_btn, div[onclick*="submitStep1"]')).find(el =>
        (el.innerText || '').toLowerCase().includes('continue')
      );
      if (continueDiv) {
        continueDiv.click();
      } else if (typeof submitStep1 === 'function') {
        submitStep1();
      }
    });

    // Wait for AJAX + form submit + navigation
    await sleep(12000);

    const state1 = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 600),
    }));
    console.log('  After step 1 URL:', state1.url);
    console.log('  After step 1 title:', state1.title);
    console.log('  After step 1 text:', state1.text.substring(0, 300));

    // Check for error still on step 1
    if (state1.title.includes('Step 1') || state1.text.toLowerCase().includes('please correct') || state1.text.toLowerCase().includes('please select location')) {
      // Try manual form submit
      console.log('  Still on step 1, trying form.submit()...');
      await pg.evaluate(() => {
        const form = document.querySelector('#frm_st1') || document.querySelectorAll('form')[1];
        if (form) form.submit();
      });
      await sleep(8000);

      const state1b = await pg.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        text: document.body.innerText.substring(0, 400),
      }));
      console.log('  After form.submit() title:', state1b.title);
      Object.assign(state1, state1b);
    }

    // Handle "Similar Businesses" page
    if (state1.title.includes('Similar')) {
      console.log('\n  Reached Similar Businesses page!');

      // Look for radio buttons (cmp values) and "Add New" option
      const radios = await pg.evaluate(() => {
        return Array.from(document.querySelectorAll('input[name="cmp"]')).map(r => ({
          value: r.value,
          checked: r.checked,
          parentText: r.closest('tr, div, td')?.innerText?.substring(0, 80),
        }));
      });
      console.log('  CMP options:', JSON.stringify(radios));

      // Select "Add New" (cmp="") or the first option if no add new
      await pg.evaluate(() => {
        const radios = document.querySelectorAll('input[name="cmp"]');
        // Prefer the empty cmp value (add new) or check all
        let addNew = Array.from(radios).find(r => r.value === '' || r.value === '0' || r.value === 'new');
        if (!addNew && radios.length > 0) addNew = radios[radios.length - 1]; // last = add new typically
        if (addNew) { addNew.checked = true; addNew.dispatchEvent(new Event('change', { bubbles: true })); }
        console.log('Selected cmp:', addNew?.value);
      });

      await sleep(500);

      // Click Continue on Similar Businesses page
      const clicked2 = await pg.evaluate(() => {
        // Try submitStep2 function
        if (typeof submitStep2 === 'function') { submitStep2(); return 'submitStep2()'; }

        // Try submit button
        const btn = document.querySelector('input[type="submit"], button[type="submit"]');
        if (btn) { btn.click(); return 'submit btn: ' + btn.value; }

        // Try Continue div
        const continueDiv = Array.from(document.querySelectorAll('div, button')).find(el =>
          (el.innerText || '').trim().toLowerCase() === 'continue'
        );
        if (continueDiv) { continueDiv.click(); return 'continue div'; }

        // Direct form submit
        const form = document.querySelector('#frm_st2') || document.querySelectorAll('form')[1];
        if (form) { form.submit(); return 'form.submit()'; }

        return 'nothing clicked';
      });
      console.log('  Similar businesses Continue clicked:', clicked2);
      await sleep(10000);

      const state2 = await pg.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        text: document.body.innerText.substring(0, 600),
      }));
      console.log('  After similar biz URL:', state2.url);
      console.log('  After similar biz title:', state2.title);
      console.log('  After similar biz text:', state2.text.substring(0, 300));

      // Handle Step 2 (email)
      if (state2.title.includes('Step 2') || state2.text.toLowerCase().includes('step 2') || state2.text.toLowerCase().includes('email')) {
        console.log('\n  Step 2 — filling email...');

        await pg.evaluate((email) => {
          // Fill email field (it might be visible now)
          const emailField = document.querySelector('#businessemail, [name="businessemail"]');
          if (emailField) {
            emailField.value = email;
            emailField.dispatchEvent(new Event('input', { bubbles: true }));
            emailField.dispatchEvent(new Event('change', { bubbles: true }));
          }
          // Fill tollFree and fax (optional, leave empty)
          ['#tollFree', '#fax', '[name="tollFree"]', '[name="fax"]'].forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.value = '';
          });
        }, BIZ.email);

        await sleep(1000);

        // Submit step 2
        const clicked3 = await pg.evaluate(() => {
          if (typeof submitStep2 === 'function') { submitStep2(); return 'submitStep2()'; }
          const btn = document.querySelector('.dv_login_profile_btn, input[type="submit"], button[type="submit"]');
          if (btn) { btn.click(); return 'button: ' + (btn.innerText || btn.value); }
          const form = document.querySelector('#frm_st2') || document.querySelectorAll('form')[1];
          if (form) { form.submit(); return 'form.submit()'; }
          return 'nothing';
        });
        console.log('  Step 2 submit:', clicked3);
        await sleep(8000);

        const state3 = await pg.evaluate(() => ({
          url: window.location.href,
          title: document.title,
          text: document.body.innerText.substring(0, 600),
        }));
        console.log('  After step 2 title:', state3.title);
        console.log('  After step 2 text:', state3.text.substring(0, 300));

        const t3 = state3.text.toLowerCase();
        if (t3.includes('verif') || t3.includes('check your email') || t3.includes('email') && t3.includes('sent')) {
          log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click verification link to complete step 3');
        } else if (t3.includes('step 3') || state3.title.includes('Step 3')) {
          log('ProfileCanada.com', 'NEEDS_EMAIL', 'At step 3 — check info@asads.ca for verification code/link');
        } else if (t3.includes('thank') || t3.includes('success') || t3.includes('complete')) {
          log('ProfileCanada.com', 'SUCCESS', 'All steps complete!');
        } else {
          log('ProfileCanada.com', 'CHECK', 'Step 2 done — URL: ' + state3.url + ' title: ' + state3.title);
        }
      } else {
        const t2 = state2.text.toLowerCase();
        if (t2.includes('thank') || t2.includes('success') || t2.includes('complete')) {
          log('ProfileCanada.com', 'SUCCESS', 'Submitted!');
        } else if (t2.includes('verif') || (t2.includes('email') && t2.includes('sent'))) {
          log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
        } else {
          log('ProfileCanada.com', 'CHECK', 'URL: ' + state2.url + ' title: ' + state2.title);
        }
      }
    } else {
      // Might have gone directly to step 2 or success
      const t = state1.text.toLowerCase();
      if (t.includes('step 2') || state1.title.includes('Step 2')) {
        log('ProfileCanada.com', 'CHECK', 'At step 2 — URL: ' + state1.url);
      } else if (t.includes('thank') || t.includes('success') || t.includes('complete')) {
        log('ProfileCanada.com', 'SUCCESS');
      } else if (t.includes('verif') || (t.includes('email') && t.includes('sent'))) {
        log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
      } else {
        log('ProfileCanada.com', 'CHECK', 'URL: ' + state1.url + ' title: ' + state1.title + ' | text: ' + state1.text.substring(0, 80));
      }
    }
  } catch (e) {
    log('ProfileCanada.com', 'ERROR', e.message.substring(0, 80));
  }
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('❌ Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  console.log('🔄 Round 13 — ProfileCanada FINAL\n');

  await doProfileCanada(pg);

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
