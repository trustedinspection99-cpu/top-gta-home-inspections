/**
 * directory-submit7.mjs — Round 7: B2BCo state check + ProfileCanada step 1
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
  provinceAbb: 'ON',
  postal: 'N3H 0C1',
  description: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, mold, asbestos, radon & thermal imaging. Same-day reports. Licensed & insured.',
  password: 'ASADS2026!',
};

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function setVal(pg, selector, value) {
  return pg.evaluate((sel, val) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    try {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (setter) setter.call(el, val);
      else el.value = val;
    } catch (_) { el.value = val; }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }, selector, value);
}

const results = [];
function log(site, status, note = '') {
  results.push({ site, status, note });
  const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

// ── B2BCo.com — Check state after Round 6 attempt ────────────────────────────
async function checkB2BCo(pg) {
  console.log('\n── B2BCo.com — checking current state');
  try {
    // Check if we're already logged in / registration worked
    await pg.goto('https://www.b2bco.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    const state = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 600),
      hasLogout: !!document.querySelector('a[href*="logout"], a[href*="signout"], [href*="account"]'),
      hasLogin: !!document.querySelector('a[href*="login"], a[href*="register"]'),
    }));
    console.log('  Current URL:', state.url);
    console.log('  Has logout link:', state.hasLogout);
    console.log('  Has login link:', state.hasLogin);
    console.log('  Page text:', state.text.substring(0, 200));

    if (state.hasLogout || state.text.toLowerCase().includes('my account') || state.text.toLowerCase().includes('dashboard') || state.text.toLowerCase().includes('logout')) {
      log('B2BCo.com', 'SUCCESS', 'Registered and logged in!');
      return;
    }

    // Try registering fresh — go to register page
    console.log('\n  Attempting fresh registration...');
    await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    // Dump page state
    const pageState = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      bodyText: document.body.innerText.substring(0, 400),
      inputs: Array.from(document.querySelectorAll('input')).map(el => ({
        type: el.type, name: el.name, id: el.id, value: el.value.substring(0, 30), visible: el.offsetParent !== null
      })),
    }));
    console.log('  Register page URL:', pageState.url);
    console.log('  Inputs:', JSON.stringify(pageState.inputs));
    console.log('  Body:', pageState.bodyText.substring(0, 200));

    // Check if already registered (email exists)
    if (pageState.bodyText.toLowerCase().includes('already') || pageState.bodyText.toLowerCase().includes('exist')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Account may exist — check info@asads.ca for confirmation email');
      return;
    }

    // Fill fields
    await setVal(pg, '#CustomerEmail', BIZ.email);
    await sleep(500);
    await setVal(pg, '#Password', BIZ.password);
    await sleep(500);
    await setVal(pg, '#ConfirmPassword', BIZ.password);
    await sleep(500);

    // Check all checkboxes
    await pg.evaluate(() => {
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => { if (!cb.checked) cb.click(); });
    });
    await sleep(1000);

    // Verify values were set
    const vals = await pg.evaluate(() => ({
      email: document.querySelector('#CustomerEmail')?.value,
      pass: document.querySelector('#Password')?.value ? '(filled)' : '(empty)',
      confirm: document.querySelector('#ConfirmPassword')?.value ? '(filled)' : '(empty)',
    }));
    console.log('  Values set:', JSON.stringify(vals));

    // Click the button[type=button] — the actual submit trigger
    const clicked = await pg.evaluate(() => {
      // input[type=button] first
      const typeBtn = document.querySelector('input[type="button"]');
      if (typeBtn) { typeBtn.click(); return 'input[type=button]: ' + typeBtn.value; }

      // Any button with register/join text
      const btns = Array.from(document.querySelectorAll('button, input[type="submit"]'));
      const regBtn = btns.find(b => {
        const t = (b.innerText || b.value || '').toLowerCase();
        return t.includes('register') || t.includes('join') || t.includes('agree');
      });
      if (regBtn) { regBtn.click(); return 'button: ' + (regBtn.innerText || regBtn.value); }

      // Last: any visible button
      const anyBtn = btns.find(b => b.offsetParent !== null);
      if (anyBtn) { anyBtn.click(); return 'any: ' + (anyBtn.innerText || anyBtn.value || anyBtn.type); }

      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(8000);

    const after = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 500),
    }));
    console.log('  After URL:', after.url);
    console.log('  After text:', after.text.substring(0, 300));

    if (after.text.toLowerCase().includes('confirm') || after.text.toLowerCase().includes('verif') || after.text.toLowerCase().includes('email') || after.text.toLowerCase().includes('sent')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click confirmation link');
    } else if (after.text.toLowerCase().includes('welcome') || after.text.toLowerCase().includes('success') || after.text.toLowerCase().includes('thank') || after.text.toLowerCase().includes('dashboard') || after.url.includes('account') || after.url.includes('dashboard')) {
      log('B2BCo.com', 'SUCCESS');
    } else if (after.text.toLowerCase().includes('already') || after.text.toLowerCase().includes('exist')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Email already registered — check info@asads.ca');
    } else {
      log('B2BCo.com', 'CHECK', 'URL: ' + after.url + ' | ' + after.text.substring(0, 100));
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── ProfileCanada.com — Find actual step 1 add-business URL ─────────────────
async function fixProfileCanada(pg) {
  console.log('\n── ProfileCanada.com — finding step 1');
  try {
    // Try the direct add listing URL
    const urlsToTry = [
      'https://www.profilecanada.com/advertising/addlisting.cfm',
      'https://www.profilecanada.com/advertising/newlisting.cfm',
      'https://www.profilecanada.com/advertising/',
      'https://www.profilecanada.com/advertising/editlisting.cfm?step=1',
    ];

    for (const url of urlsToTry) {
      await pg.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
      await sleep(2000);
      const info = await pg.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        hasForm: document.querySelectorAll('form').length,
        text: document.body.innerText.substring(0, 200),
      }));
      console.log(`  Tried ${url} → ${info.url} | forms:${info.hasForm} | "${info.text.substring(0, 80)}"`);
      if (!info.url.includes('error') && info.hasForm > 0 && info.text.toLowerCase().includes('business')) {
        console.log('  *** Looks like a valid form page! Inspecting...');

        const formData = await pg.evaluate(() => {
          return Array.from(document.querySelectorAll('form')).map((f, i) => ({
            index: i,
            action: f.action,
            hiddenStep: f.querySelector('[name="step"]')?.value,
            inputCount: f.querySelectorAll('input:not([type="hidden"]), textarea, select').length,
            firstInputNames: Array.from(f.querySelectorAll('input, textarea, select')).slice(0, 10).map(el => el.name || el.id),
            submitBtns: Array.from(f.querySelectorAll('input[type="submit"], button[type="submit"], button')).map(b => b.value || b.innerText || b.type),
          }));
        });
        console.log('  Forms:', JSON.stringify(formData, null, 2));
        break;
      }
    }

    // Now go to editlisting.cfm and see the actual page structure more carefully
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    const pageInfo = await pg.evaluate(() => {
      // Get ALL form details
      const allForms = Array.from(document.querySelectorAll('form')).map((f, i) => ({
        index: i,
        action: f.action,
        method: f.method,
        allFields: Array.from(f.elements).map(el => ({
          tag: el.tagName,
          type: el.type,
          name: el.name,
          id: el.id,
          value: el.value.substring(0, 30),
          hidden: el.type === 'hidden',
        })),
        submitBtns: Array.from(f.querySelectorAll('button, input[type="submit"], input[type="button"]')).map(b => ({
          type: b.type,
          value: b.value,
          text: b.innerText,
          onclick: b.getAttribute('onclick'),
        })),
      }));

      return {
        url: window.location.href,
        title: document.title,
        allForms,
        bodySnippet: document.body.innerText.substring(0, 300),
      };
    });

    console.log('\n  editlisting.cfm full analysis:');
    console.log('  URL:', pageInfo.url);
    console.log('  Title:', pageInfo.title);
    console.log('  Body:', pageInfo.bodySnippet.substring(0, 150));
    pageInfo.allForms.forEach(f => {
      console.log(`\n  Form[${f.index}]: action=${f.action} method=${f.method}`);
      console.log('    All fields:', JSON.stringify(f.allFields));
      console.log('    Submit buttons:', JSON.stringify(f.submitBtns));
    });

    // Identify the right form — look for one with businessName field or most visible inputs
    const targetForm = pageInfo.allForms.find(f =>
      f.allFields.some(el => el.name === 'businessName' || el.name === 'businessemail')
    );

    if (!targetForm) {
      console.log('\n  No businessName field found in any form.');
      // Check if there is a direct "Add Business" button/link we should click
      const addLink = await pg.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        const addBiz = links.find(l => {
          const t = (l.innerText || l.href || '').toLowerCase();
          return t.includes('add') || t.includes('submit') || t.includes('list');
        });
        return addBiz ? { href: addBiz.href, text: addBiz.innerText } : null;
      });
      console.log('  Add business link:', addLink);
      log('ProfileCanada.com', 'CHECK', 'Visit manually: profilecanada.com/advertising/editlisting.cfm');
      return;
    }

    console.log('\n  Target form index:', targetForm.index);
    const visibleInputs = targetForm.allFields.filter(el => !el.hidden);
    console.log('  Visible inputs:', visibleInputs.map(el => el.name || el.id).join(', '));

    // Fill the form
    await pg.evaluate((formIndex, biz) => {
      const form = document.querySelectorAll('form')[formIndex];
      if (!form) return;

      function setInput(name, value) {
        const el = form.querySelector(`[name="${name}"]`);
        if (!el || el.type === 'hidden') return false;
        try {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          if (setter) setter.call(el, value);
          else el.value = value;
        } catch (_) { el.value = value; }
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }

      setInput('businessName', biz.name);
      setInput('locationCity', biz.city);
      setInput('businessemail', biz.email);
      setInput('businessDescription', biz.description.substring(0, 200));
      setInput('address', biz.address);
      setInput('postal', biz.postal);
      setInput('phone', biz.phone);
      setInput('website', biz.website);

      // Radio: claimdby = owner
      const radio = form.querySelector('input[name="claimdby"][value="owner"]')
        || form.querySelector('input[name="claimdby"]');
      if (radio && !radio.checked) radio.click();

      // Province select
      form.querySelectorAll('select').forEach(sel => {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('prov') || key.includes('province')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (key.includes('cat') || key.includes('category') || key.includes('type')) {
          const opt = Array.from(sel.options).find(o =>
            o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('real estate') ||
            o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('property') ||
            o.text.toLowerCase().includes('service'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      });
    }, targetForm.index, BIZ);

    await sleep(2000);

    // Verify what was filled
    const filled = await pg.evaluate((formIndex) => {
      const form = document.querySelectorAll('form')[formIndex];
      if (!form) return {};
      const result = {};
      Array.from(form.elements).forEach(el => {
        if (el.name && !el.type === 'hidden') result[el.name] = el.value?.substring(0, 40);
      });
      return result;
    }, targetForm.index);
    console.log('  Filled values:', JSON.stringify(filled));

    // Click submit — try all approaches
    const clicked = await pg.evaluate((formIndex) => {
      const form = document.querySelectorAll('form')[formIndex];
      if (!form) return null;

      // input[type=submit]
      const submitInput = form.querySelector('input[type="submit"]');
      if (submitInput) { submitInput.click(); return 'input[type=submit]: ' + submitInput.value; }

      // button[type=submit]
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.click(); return 'button[type=submit]: ' + submitBtn.innerText; }

      // Any button inside form
      const anyBtn = form.querySelector('button');
      if (anyBtn) { anyBtn.click(); return 'button: ' + anyBtn.innerText; }

      // requestSubmit
      try { form.requestSubmit(); return 'requestSubmit()'; } catch (_) {}

      // Direct submit
      form.submit();
      return 'form.submit()';
    }, targetForm.index);
    console.log('  Submit clicked:', clicked);
    await sleep(8000);

    const result = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 500),
    }));
    console.log('  Result URL:', result.url);
    console.log('  Result text:', result.text.substring(0, 300));

    if (result.text.toLowerCase().includes('step 2') || result.url.includes('step=2') || result.url.includes('editlisting2')) {
      log('ProfileCanada.com', 'SUCCESS', 'Step 1 done — proceeding to step 2');
    } else if (result.text.toLowerCase().includes('thank') || result.text.toLowerCase().includes('success') || result.text.toLowerCase().includes('listed')) {
      log('ProfileCanada.com', 'SUCCESS');
    } else if (result.text.toLowerCase().includes('email') || result.text.toLowerCase().includes('verif')) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else if (result.url !== 'https://www.profilecanada.com/advertising/editlisting.cfm') {
      log('ProfileCanada.com', 'CHECK', 'Navigated to: ' + result.url);
    } else {
      log('ProfileCanada.com', 'CHECK', 'Visit manually: profilecanada.com/advertising/editlisting.cfm');
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
  pg.setDefaultTimeout(30000);

  console.log('🔄 Round 7 — B2BCo state check + ProfileCanada step 1\n');

  await checkB2BCo(pg);
  await fixProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  COMPLETE STATUS');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('📧  Fyple.ca — Check info@asads.ca');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
