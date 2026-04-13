/**
 * directory-step3.mjs — Read and submit ProfileCanada Step 3
 */
import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const BIZ = { email: 'info@asads.ca' };

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  console.log('Current title:', await pg.evaluate(() => document.title));

  const info = await pg.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form')).map((f, i) => ({
      index: i, id: f.id, action: f.action,
      fields: Array.from(f.elements).map(el => ({
        name: el.name, type: el.type, id: el.id,
        value: el.value?.substring(0, 60),
        visible: el.type !== 'hidden' && el.offsetParent !== null,
      })).filter(el => el.name || el.id),
      onclickEls: Array.from(f.querySelectorAll('[onclick]')).map(el => ({
        tag: el.tagName, onclick: el.getAttribute('onclick'), text: el.innerText?.substring(0, 40),
      })),
    }));

    return {
      title: document.title,
      text: document.body.innerText.substring(0, 1200),
      forms,
      submitStep3: typeof submitStep3 === 'function' ? submitStep3.toString().substring(0, 800) : 'undefined',
      allFunctions: Object.keys(window).filter(k => typeof window[k] === 'function' && k.includes('step')).join(', '),
    };
  });

  console.log('Page text:');
  console.log(info.text);
  console.log('\nForms:');
  info.forms.forEach(f => {
    console.log('Form', f.index, f.id, f.action);
    f.fields.forEach(el => console.log(`  [${el.visible ? 'VISIBLE' : 'hidden'}] ${el.type} ${el.name} id=${el.id} = "${el.value?.substring(0, 40)}"`));
    console.log('  onclick:', JSON.stringify(f.onclickEls));
  });
  console.log('\nsubmitStep3 fn:', info.submitStep3);
  console.log('Step functions:', info.allFunctions);

  // Now submit step 3
  console.log('\nAttempting to submit step 3...');

  // Fill any required fields
  await pg.evaluate((email) => {
    // Fill email if visible
    const emailEl = document.querySelector('#businessemail, [name="businessemail"]');
    if (emailEl && emailEl.type !== 'hidden' && emailEl.offsetParent !== null) {
      emailEl.value = email;
      emailEl.dispatchEvent(new Event('change', { bubbles: true }));
    }
    // Fill any other required visible fields
    const inputs = Array.from(document.querySelectorAll('input:not([type=hidden]):not([type=radio]):not([type=checkbox]):not([type=submit]):not([type=button]), textarea'));
    inputs.forEach(el => {
      if (!el.value && el.offsetParent !== null) {
        const key = (el.name || el.id || '').toLowerCase();
        if (key.includes('email')) el.value = email;
      }
    });
  }, BIZ.email);

  await sleep(1000);

  // Try to submit
  const clicked = await pg.evaluate(() => {
    // Reset submission
    if (typeof submission !== 'undefined') submission = false;

    // Try submitStep3
    if (typeof submitStep3 === 'function') { submitStep3(); return 'submitStep3()'; }

    // Try Continue onclick div
    const btns = Array.from(document.querySelectorAll('[onclick*="submit"], .dv_login_profile_btn, button, input[type="submit"]'));
    const continueBtn = btns.find(el => (el.innerText || '').toLowerCase().includes('continue') || (el.innerText || '').toLowerCase().includes('submit') || (el.innerText || '').toLowerCase().includes('finish') || (el.getAttribute('onclick') || '').includes('Step3'));
    if (continueBtn) { continueBtn.click(); return 'btn: ' + (continueBtn.innerText || continueBtn.getAttribute('onclick')); }

    // Direct form submit
    const form = document.querySelector('#frm_st3') || document.querySelector('#frm_st2') || document.querySelectorAll('form')[1];
    if (form) { form.submit(); return 'form#' + (form.id || 'form1') + '.submit()'; }

    return 'nothing found';
  });
  console.log('Clicked:', clicked);
  await sleep(12000);

  const final = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 800),
  }));
  console.log('\nFinal title:', final.title);
  console.log('Final URL:', final.url);
  console.log('Final text:', final.text.substring(0, 500));

  const ft = final.text.toLowerCase();
  if (ft.includes('thank') || ft.includes('success') || ft.includes('listing added') || ft.includes('business listed') || ft.includes('complete')) {
    console.log('\n✅ ProfileCanada.com — SUBMITTED SUCCESSFULLY!');
  } else if (ft.includes('verif') || (ft.includes('email') && (ft.includes('sent') || ft.includes('check')))) {
    console.log('\n📧 ProfileCanada.com — Check info@asads.ca for verification email');
  } else if (ft.includes('code') || ft.includes('update code')) {
    console.log('\n📧 ProfileCanada.com — Verification code sent to info@asads.ca');
  } else {
    console.log('\n⚠️ ProfileCanada.com — Status unclear. URL:', final.url);
  }

  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
