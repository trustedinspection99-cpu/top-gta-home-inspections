/**
 * directory-submit6.mjs — Round 6: B2BCo (click type=button) + ProfileCanada (check hidden fields)
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

// ── B2BCo.com — click input[type=button] ──────────────────────────────────────
async function fixB2BCo(pg) {
  console.log('\n── B2BCo.com');
  try {
    await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    await setVal(pg, '#CustomerEmail', BIZ.email);
    await setVal(pg, '#Password', BIZ.password);
    await setVal(pg, '#ConfirmPassword', BIZ.password);

    await pg.evaluate(() => {
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => { if (!cb.checked) cb.click(); });
    });
    await sleep(1000);

    // Click input[type="button"] — the actual register trigger
    const clicked = await pg.evaluate(() => {
      const btn = document.querySelector('input[type="button"]');
      if (btn) { btn.click(); return btn.value || 'type=button clicked'; }
      // Also try onclick buttons
      const allBtns = Array.from(document.querySelectorAll('button, input'));
      const anyBtn = allBtns.find(b => b.onclick || b.getAttribute('onclick'));
      if (anyBtn) { anyBtn.click(); return 'onclick clicked'; }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(8000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 500));
    if (result.toLowerCase().includes('confirm') || result.toLowerCase().includes('verif') || result.toLowerCase().includes('email') || result.toLowerCase().includes('sent')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click confirmation link to activate');
    } else if (result.toLowerCase().includes('welcome') || result.toLowerCase().includes('success') || result.toLowerCase().includes('thank') || result.toLowerCase().includes('registered')) {
      log('B2BCo.com', 'SUCCESS');
    } else {
      // Check if there's a specific error
      const errorMsg = await pg.evaluate(() => {
        const errEl = document.querySelector('.error, .alert, [class*="error"], [class*="alert"]');
        return errEl?.innerText || null;
      });
      if (errorMsg) {
        log('B2BCo.com', 'CHECK', 'Error: ' + errorMsg.substring(0, 80));
      } else {
        log('B2BCo.com', 'CHECK', 'URL: ' + pg.url() + ' | ' + result.substring(0, 80));
      }
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── ProfileCanada.com — inspect hidden fields + fill via fetch ────────────────
async function fixProfileCanada(pg) {
  console.log('\n── ProfileCanada.com');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Get ALL fields including hidden ones from form 1
    const formData = await pg.evaluate(() => {
      const form = document.querySelectorAll('form')[1];
      if (!form) return null;
      const data = {};
      Array.from(form.elements).forEach(el => {
        if (el.name) {
          if (el.type === 'radio') {
            if (el.checked) data[el.name] = el.value;
          } else {
            data[el.name] = el.value;
          }
        }
      });
      return {
        action: form.action,
        method: form.method,
        fields: data,
        submitBtn: Array.from(form.querySelectorAll('input[type="submit"], button[type="submit"]')).map(b => ({ val: b.value, text: b.innerText }))
      };
    });
    console.log('  Form action:', formData?.action);
    console.log('  Hidden/pre-filled fields:', JSON.stringify(formData?.fields, null, 2));
    console.log('  Submit buttons:', JSON.stringify(formData?.submitBtn));

    if (!formData) {
      log('ProfileCanada.com', 'CHECK', 'Visit manually: profilecanada.com/advertising/editlisting.cfm');
      return;
    }

    // Fill the form using the form element
    await pg.evaluate((biz) => {
      const form = document.querySelectorAll('form')[1];
      if (!form) return;

      function fill(name, value) {
        const el = form.querySelector(`[name="${name}"]`);
        if (!el || el.type === 'radio' || el.type === 'hidden') return;
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }

      fill('businessName', biz.name);
      fill('locationCity', biz.city);
      fill('businessemail', biz.email);
      fill('businessDescription', biz.description.substring(0, 200));
      fill('address', biz.address + ', ' + biz.city + ', ' + biz.provinceAbb);
      fill('postal', biz.postal);
      fill('phone', biz.phone);
      fill('website', biz.website);

      // Radio button — claimdby
      const radio = form.querySelector('input[name="claimdby"][value="owner"]')
        || form.querySelector('input[name="claimdby"]');
      if (radio && !radio.checked) radio.click();

      // Province and category selects
      const selects = form.querySelectorAll('select');
      selects.forEach(sel => {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('prov') || key.includes('province')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (key.includes('cat') || key.includes('category') || key.includes('type')) {
          const opt = Array.from(sel.options).find(o =>
            o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('real estate') ||
            o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('property') ||
            o.text.toLowerCase().includes('construct') || o.text.toLowerCase().includes('service'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      });
    }, BIZ);

    await sleep(2000);

    // Click submit using form[1]'s submit button
    const clicked = await pg.evaluate(() => {
      const form = document.querySelectorAll('form')[1];
      if (!form) return null;

      // Try submit input
      const submitInput = form.querySelector('input[type="submit"]');
      if (submitInput) { submitInput.click(); return 'input[type=submit]: ' + submitInput.value; }

      // Try submit button
      const submitBtn = form.querySelector('button[type="submit"], button');
      if (submitBtn) { submitBtn.click(); return 'button: ' + submitBtn.innerText; }

      // Use requestSubmit which triggers validation
      try { form.requestSubmit(); return 'requestSubmit()'; } catch (_) {}

      // Last resort — direct POST via fetch
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(7000);

    const result = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 500) }));
    console.log('  After submit URL:', result.url);
    console.log('  Page text:', result.text.substring(0, 200));

    if (result.url !== 'https://www.profilecanada.com/advertising/editlisting.cfm') {
      // URL changed = progress
      if (result.text.toLowerCase().includes('step 2') || result.url.includes('step=2') || result.url.includes('editlisting2')) {
        log('ProfileCanada.com', 'SUCCESS', 'Step 1 complete — proceeding to step 2');
      } else if (result.text.toLowerCase().includes('thank') || result.text.toLowerCase().includes('success')) {
        log('ProfileCanada.com', 'SUCCESS');
      } else {
        log('ProfileCanada.com', 'CHECK', 'Progressed to: ' + result.url);
      }
    } else {
      // Stayed on same page — need manual completion
      log('ProfileCanada.com', 'CHECK', 'Form has JS validation — visit manually to complete: profilecanada.com/advertising/editlisting.cfm');
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

  console.log('🔄 Round 6 — Final two\n');

  await fixB2BCo(pg);
  await fixProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  FINAL COMPLETE SUMMARY');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('📧  Fyple.ca — Check info@asads.ca → click link');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca → click link');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
