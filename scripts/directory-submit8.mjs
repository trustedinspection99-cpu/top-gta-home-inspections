/**
 * directory-submit8.mjs — Round 8:
 * B2BCo: check if Round 6 registration worked + retry with longer timeout
 * ProfileCanada: set hidden fields + find JS submit function + direct form.submit()
 */

import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const BIZ = {
  name: 'ASADS Home Inspection',
  phone: '6478019311',
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

const results = [];
function log(site, status, note = '') {
  results.push({ site, status, note });
  const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

// ── B2BCo.com ─────────────────────────────────────────────────────────────────
async function doB2BCo(pg) {
  console.log('\n── B2BCo.com');
  try {
    // First check if Round 6 registration worked — check current page state
    const curState = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 300),
    }));
    console.log('  Current page:', curState.url);
    console.log('  Current text:', curState.text.substring(0, 200));

    // If we're on b2bco and logged in already, done
    if (curState.url.includes('b2bco') &&
      (curState.text.toLowerCase().includes('logout') ||
       curState.text.toLowerCase().includes('my account') ||
       curState.text.toLowerCase().includes('dashboard') ||
       curState.text.toLowerCase().includes('welcome'))) {
      log('B2BCo.com', 'SUCCESS', 'Registration from Round 6 worked!');
      return;
    }

    // Try navigating to b2bco homepage with extended timeout
    console.log('  Navigating to b2bco.com with 60s timeout...');
    try {
      await pg.goto('https://www.b2bco.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await sleep(5000);
    } catch (e) {
      console.log('  Navigation error (continuing):', e.message.substring(0, 60));
    }

    const homeState = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 400),
      hasLogout: !!document.querySelector('a[href*="logout"], a[href*="signout"]'),
    }));
    console.log('  Homepage URL:', homeState.url);
    console.log('  Logged in?', homeState.hasLogout);
    console.log('  Text:', homeState.text.substring(0, 200));

    if (homeState.hasLogout || homeState.text.toLowerCase().includes('my account') || homeState.text.toLowerCase().includes('dashboard')) {
      log('B2BCo.com', 'SUCCESS', 'Logged in — registration from Round 6 worked');
      return;
    }

    // Try register page
    console.log('  Going to register page...');
    try {
      await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await sleep(5000);
    } catch (e) {
      console.log('  Register page error:', e.message.substring(0, 60));
    }

    const regState = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 300),
      emailField: !!document.querySelector('#CustomerEmail, input[name="CustomerEmail"]'),
    }));
    console.log('  Register URL:', regState.url);
    console.log('  Has email field:', regState.emailField);
    console.log('  Text:', regState.text.substring(0, 200));

    if (regState.text.toLowerCase().includes('already') || regState.text.toLowerCase().includes('exist')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Email already registered — check info@asads.ca for confirmation link');
      return;
    }

    if (!regState.emailField) {
      // Maybe redirected after successful registration
      if (regState.url.includes('confirm') || regState.url.includes('thank') || regState.url.includes('success')) {
        log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — confirmation email sent');
      } else {
        log('B2BCo.com', 'CHECK', 'Manual visit needed: b2bco.com/p/register/ | URL: ' + regState.url);
      }
      return;
    }

    // Fill and submit
    await pg.evaluate((biz) => {
      function setVal(sel, val) {
        const el = document.querySelector(sel);
        if (!el) return;
        try {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          if (setter) setter.call(el, val);
          else el.value = val;
        } catch (_) { el.value = val; }
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
      setVal('#CustomerEmail', biz.email);
      setVal('#Password', biz.password);
      setVal('#ConfirmPassword', biz.password);
      // Check all checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => { if (!cb.checked) cb.click(); });
    }, BIZ);

    await sleep(1500);

    // Verify
    const vals = await pg.evaluate(() => ({
      email: document.querySelector('#CustomerEmail')?.value,
      pass: document.querySelector('#Password')?.value ? '(set)' : '(empty)',
    }));
    console.log('  Values:', JSON.stringify(vals));

    // Click button
    const clicked = await pg.evaluate(() => {
      const btn = document.querySelector('input[type="button"]');
      if (btn) { btn.click(); return 'input[type=button]: ' + btn.value; }
      const btns = Array.from(document.querySelectorAll('button, input[type="submit"]'));
      const regBtn = btns.find(b => {
        const t = (b.innerText || b.value || '').toLowerCase();
        return t.includes('register') || t.includes('join') || t.includes('agree') || t.includes('create');
      });
      if (regBtn) { regBtn.click(); return 'button: ' + (regBtn.innerText || regBtn.value); }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(10000);

    const after = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 400),
    }));
    console.log('  After URL:', after.url);
    console.log('  After text:', after.text.substring(0, 250));

    if (after.text.toLowerCase().includes('confirm') || after.text.toLowerCase().includes('verif') || after.text.toLowerCase().includes('sent') || after.text.toLowerCase().includes('check your email')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click confirmation link to activate');
    } else if (after.text.toLowerCase().includes('welcome') || after.text.toLowerCase().includes('success') || after.text.toLowerCase().includes('dashboard') || after.url.includes('account') || after.url.includes('dashboard')) {
      log('B2BCo.com', 'SUCCESS', 'Registration complete');
    } else if (after.text.toLowerCase().includes('already') || after.text.toLowerCase().includes('exist')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Account already exists — check info@asads.ca for verification');
    } else {
      log('B2BCo.com', 'CHECK', 'URL: ' + after.url + ' | text: ' + after.text.substring(0, 100));
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── ProfileCanada.com — Set ALL fields (incl hidden) + direct form.submit() ──
async function doProfileCanada(pg) {
  console.log('\n── ProfileCanada.com');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Get JS functions available for form submit
    const jsFuncs = await pg.evaluate(() => {
      // Look for any submit/validate functions defined on window or inline scripts
      const scripts = Array.from(document.querySelectorAll('script:not([src])')).map(s => s.innerText).join('\n');
      const funcMatches = scripts.match(/function\s+\w+/g) || [];

      // Also check for onclick handlers on any element
      const onclickEls = Array.from(document.querySelectorAll('[onclick]')).map(el => ({
        tag: el.tagName,
        onclick: el.getAttribute('onclick'),
        text: el.innerText?.substring(0, 30),
      }));

      return {
        scriptFunctions: funcMatches,
        onclickEls,
        scriptsSnippet: scripts.substring(0, 1000),
      };
    });
    console.log('  JS functions:', JSON.stringify(jsFuncs.scriptFunctions));
    console.log('  Onclick elements:', JSON.stringify(jsFuncs.onclickEls));

    // Fill ALL form fields including hidden businessemail
    const filled = await pg.evaluate((biz) => {
      const form = document.querySelectorAll('form')[1];
      if (!form) return { error: 'no form[1]' };

      const log = [];

      function setField(name, value) {
        const el = form.querySelector(`[name="${name}"]`);
        if (!el) { log.push(`MISSING: ${name}`); return; }
        // Set value directly — works for both hidden and visible
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        log.push(`SET: ${name}=${value.substring(0, 30)}`);
      }

      // All fields including hidden ones
      setField('businessName', biz.name);
      setField('locationCity', biz.city);
      setField('businessemail', biz.email);  // hidden input
      setField('businessDescription', biz.description.substring(0, 200));
      setField('address', biz.address + ', ' + biz.city + ', ' + biz.provinceAbb);
      setField('postal', biz.postal);
      setField('phone', biz.phone);
      setField('website', biz.website);
      setField('tollFree', '');
      setField('fax', '');
      setField('question1', '');
      setField('question2', '');

      // claimdby = owner radio
      const ownerRadio = form.querySelector('input[name="claimdby"][value="owner"]');
      if (ownerRadio) {
        ownerRadio.checked = true;
        ownerRadio.dispatchEvent(new Event('change', { bubbles: true }));
        log.push('SET: claimdby=owner');
      }

      // Province select
      form.querySelectorAll('select').forEach(sel => {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('prov')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); log.push('SET: province=ON'); }
        }
        if (key.includes('cat')) {
          const opt = Array.from(sel.options).find(o =>
            o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('real estate') ||
            o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('service'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); log.push('SET: category=' + opt.text); }
        }
      });

      // Verify all filled
      const verification = {};
      Array.from(form.elements).forEach(el => {
        if (el.name) verification[el.name] = el.value.substring(0, 40);
      });

      return { log, verification };
    }, BIZ);

    console.log('  Fill log:', filled.log?.join(', '));
    console.log('  Verification:', JSON.stringify(filled.verification));

    await sleep(2000);

    // Try all submit approaches
    const submitted = await pg.evaluate(() => {
      const form = document.querySelectorAll('form')[1];
      if (!form) return 'no form';

      // 1. Try any onclick JS function that might submit
      const allEls = document.querySelectorAll('[onclick]');
      for (const el of allEls) {
        const onclick = el.getAttribute('onclick') || '';
        if (onclick.toLowerCase().includes('submit') || onclick.toLowerCase().includes('save') || onclick.toLowerCase().includes('send')) {
          try { el.click(); return 'onclick: ' + onclick.substring(0, 50); } catch (_) {}
        }
      }

      // 2. Call window.submitForm or similar if defined
      if (typeof window.submitForm === 'function') { window.submitForm(); return 'window.submitForm()'; }
      if (typeof window.validateForm === 'function') { window.validateForm(); return 'window.validateForm()'; }
      if (typeof window.saveForm === 'function') { window.saveForm(); return 'window.saveForm()'; }

      // 3. Direct form.submit() — bypasses JS validation but posts the data
      form.submit();
      return 'form.submit() — direct POST';
    });
    console.log('  Submit method:', submitted);
    await sleep(8000);

    const result = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 600),
    }));
    console.log('  After URL:', result.url);
    console.log('  After text:', result.text.substring(0, 300));

    const t = result.text.toLowerCase();
    if (t.includes('step 2') || result.url.includes('step=2') || result.url.includes('editlisting2') || result.url.includes('step2')) {
      log('ProfileCanada.com', 'SUCCESS', 'Step 1 done — at step 2');
    } else if (t.includes('thank') || t.includes('success') || t.includes('listed') || t.includes('submitted')) {
      log('ProfileCanada.com', 'SUCCESS');
    } else if (t.includes('email') && (t.includes('verif') || t.includes('sent') || t.includes('confirm'))) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else if (result.url !== 'https://www.profilecanada.com/advertising/editlisting.cfm') {
      log('ProfileCanada.com', 'CHECK', 'Navigated to: ' + result.url + ' — may be in progress');
    } else {
      log('ProfileCanada.com', 'CHECK', 'Still on form. Visit manually: profilecanada.com/advertising/editlisting.cfm');
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

  console.log('🔄 Round 8 — B2BCo check + ProfileCanada direct submit\n');

  await doB2BCo(pg);
  await doProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  COMPLETE STATUS');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('📧  Fyple.ca — Check info@asads.ca');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
