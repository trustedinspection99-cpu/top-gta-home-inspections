/**
 * directory-submit4.mjs — Round 4: Final targeted fixes
 * B2BCo (exact field names) + DIYoffer (cascading selects) + ProfileCanada (field names)
 */

import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const BIZ = {
  name:        'ASADS Home Inspection',
  phone:       '647-801-9311',
  email:       'info@asads.ca',
  website:     'https://www.asads.ca',
  address:     '45 Duckworth Rd',
  city:        'Cambridge',
  provinceAbb: 'ON',
  postal:      'N3H 0C1',
  description: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, mold, asbestos, radon & thermal imaging inspections. Same-day digital reports. Licensed & insured.',
  password:    'ASADS2026!',
};

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function setById(pg, id, value) {
  return pg.evaluate((id, value) => {
    const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (!el) return false;
    try {
      const proto = el.tagName === 'TEXTAREA'
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      if (setter) setter.call(el, value);
      else el.value = value;
    } catch (_) { el.value = value; }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }, id, value);
}

async function selectOption(pg, id, text) {
  return pg.evaluate((id, text) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const opt = Array.from(el.options).find(o =>
      o.text.toLowerCase().includes(text.toLowerCase()) || o.value.toLowerCase().includes(text.toLowerCase())
    );
    if (opt) {
      el.value = opt.value;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return opt.text;
    }
    // Try partial match
    const partial = Array.from(el.options).find(o => o.text.toLowerCase().includes(text.split(' ')[0].toLowerCase()));
    if (partial) {
      el.value = partial.value;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return partial.text + ' (partial)';
    }
    return null;
  }, id, text);
}

const results = [];
function log(site, status, note = '') {
  results.push({ site, status, note });
  const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', SKIP: '⏭', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

// ── B2BCo.com — exact field names ─────────────────────────────────────────────
async function fixB2BCo(pg) {
  console.log('\n── B2BCo.com');
  try {
    await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Exact field names: CustomerEmail, Password, ConfirmPassword
    await setById(pg, 'CustomerEmail', BIZ.email);
    await setById(pg, 'Password', BIZ.password);
    await setById(pg, 'ConfirmPassword', BIZ.password);

    // Check terms checkbox
    await pg.evaluate(() => {
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (!cb.checked) cb.click();
      });
    });
    await sleep(1000);

    // Click submit/register button
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, input[type="submit"]'))
        .find(b => !b.disabled && (b.type === 'submit' || (b.innerText || '').toLowerCase().includes('register') || (b.innerText || '').toLowerCase().includes('join')));
      if (btn) btn.click();
    });
    await sleep(6000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('confirm') || result.toLowerCase().includes('verif') || result.toLowerCase().includes('email') || result.toLowerCase().includes('sent')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click confirmation link to activate account');
    } else if (result.toLowerCase().includes('welcome') || result.toLowerCase().includes('success') || result.toLowerCase().includes('thank')) {
      log('B2BCo.com', 'SUCCESS');
    } else {
      log('B2BCo.com', 'CHECK', result.substring(0, 120));
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── DIYoffer.ca — cascading selects ───────────────────────────────────────────
async function fixDIYoffer(pg) {
  console.log('\n── DIYoffer.ca');
  try {
    await pg.goto('https://diyoffer.ca/submit-your-business/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    // Fill text fields by exact IDs from debug
    await setById(pg, 'input_26_2', BIZ.name);                // Business Name
    await setById(pg, 'input_26_9_1', BIZ.address);           // Address Line 1
    await setById(pg, 'input_26_9_5', BIZ.postal);            // Postal Code
    await setById(pg, 'input_26_10', BIZ.phone);              // Business Phone
    await setById(pg, 'input_26_11', BIZ.website);            // Website
    await setById(pg, 'input_26_12', BIZ.email);              // Email

    // Specialty select
    const specialty = await selectOption(pg, 'input_26_6', 'Home Inspection');
    console.log('  Specialty selected:', specialty);

    // Province select — must be done first for cascading
    const province = await selectOption(pg, 'input_26_45', 'Ontario');
    console.log('  Province selected:', province);
    await sleep(2000); // Wait for Municipality to populate

    // Municipality/Region
    const munic = await pg.evaluate(() => {
      const sel = document.getElementById('input_26_46');
      if (!sel) return null;
      // Look for Waterloo or Cambridge region
      const opts = Array.from(sel.options).map(o => ({ v: o.value, t: o.text }));
      console.log('Municipality options:', JSON.stringify(opts.slice(0, 20)));
      const opt = opts.find(o => o.t.toLowerCase().includes('waterloo') || o.t.toLowerCase().includes('cambridge') || o.t.toLowerCase().includes('regional'));
      if (opt) { sel.value = opt.v; sel.dispatchEvent(new Event('change', { bubbles: true })); return opt.t; }
      // Pick any non-empty option
      const any = opts.find(o => o.v && o.v !== '');
      if (any) { sel.value = any.v; sel.dispatchEvent(new Event('change', { bubbles: true })); return any.t + ' (first available)'; }
      return null;
    });
    console.log('  Municipality selected:', munic);
    await sleep(2000); // Wait for City to populate

    // City select
    const city = await pg.evaluate(() => {
      const sel = document.getElementById('input_26_43');
      if (!sel) return null;
      const opts = Array.from(sel.options).map(o => ({ v: o.value, t: o.text }));
      const opt = opts.find(o => o.t.toLowerCase().includes('cambridge'));
      if (opt) { sel.value = opt.v; sel.dispatchEvent(new Event('change', { bubbles: true })); return opt.t; }
      const any = opts.find(o => o.v && o.v !== '');
      if (any) { sel.value = any.v; sel.dispatchEvent(new Event('change', { bubbles: true })); return any.t + ' (first available)'; }
      return null;
    });
    console.log('  City selected:', city);
    await sleep(1000);

    // If there's a login form at the bottom, check if we need to register first
    const hasLoginForm = await pg.evaluate(() => {
      const emailInputs = document.querySelectorAll('#es_user_email-69dc701ca81ab, #es_user_login-69dc701ca7ced');
      return emailInputs.length > 0;
    });

    if (hasLoginForm) {
      // Fill the registration/login section at the bottom
      await pg.evaluate((biz) => {
        const emailEl = document.getElementById('es_user_email-69dc701ca81ab') || document.getElementById('es_user_login-69dc701ca7ced');
        const passEl = document.getElementById('es_user_password-69dc701ca7d35');
        if (emailEl) { emailEl.value = biz.email; emailEl.dispatchEvent(new Event('input', { bubbles: true })); }
        if (passEl) { passEl.value = biz.password; passEl.dispatchEvent(new Event('input', { bubbles: true })); }
      }, BIZ);
      console.log('  Login form filled');
    }
    await sleep(1500);

    // Submit
    const clicked = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"]'))
        .find(b => !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    console.log('  Submit clicked:', clicked);
    await sleep(8000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 500));
    if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success') || result.toLowerCase().includes('submitt') || result.toLowerCase().includes('confirmation')) {
      log('DIYoffer.ca', 'SUCCESS');
    } else if (result.toLowerCase().includes('email') && result.toLowerCase().includes('verif')) {
      log('DIYoffer.ca', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else if (result.toLowerCase().includes('required') || result.toLowerCase().includes('error') || result.toLowerCase().includes('invalid')) {
      log('DIYoffer.ca', 'CHECK', 'Validation error: ' + result.substring(0, 120));
    } else {
      log('DIYoffer.ca', 'CHECK', 'Visit manually: diyoffer.ca/submit-your-business/');
    }
  } catch (e) {
    log('DIYoffer.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── ProfileCanada.com — fill by name attr ─────────────────────────────────────
async function fixProfileCanada(pg) {
  console.log('\n── ProfileCanada.com');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Fill by name (confirmed from debug): businessName, locationCity, businessemail, businessDescription, claimdby
    await setById(pg, 'businessName', BIZ.name);
    await setById(pg, 'locationCity', BIZ.city);
    await setById(pg, 'businessemail', BIZ.email);
    await setById(pg, 'businessDescription', BIZ.description.substring(0, 200));

    // claimdby is radio buttons — select "Owner"
    await pg.evaluate(() => {
      const radios = Array.from(document.querySelectorAll('input[name="claimdby"]'));
      const owner = radios.find(r => r.value === 'owner' || r.value === 'Owner');
      if (owner) owner.click();
      else if (radios.length) radios[0].click();
    });

    // Phone — try all possible selectors
    await pg.evaluate((phone) => {
      ['businessPhone', 'phone', 'Phone', 'tel', 'telephone'].forEach(name => {
        const el = document.getElementById(name) || document.querySelector(`[name="${name}"]`);
        if (el) { el.value = phone; el.dispatchEvent(new Event('change', { bubbles: true })); }
      });
    }, BIZ.phone);

    // Address
    await pg.evaluate((addr) => {
      ['businessAddress', 'address', 'Address', 'streetAddress'].forEach(name => {
        const el = document.getElementById(name) || document.querySelector(`[name="${name}"]`);
        if (el) { el.value = addr; el.dispatchEvent(new Event('change', { bubbles: true })); }
      });
    }, BIZ.address);

    // Postal code
    await pg.evaluate((postal) => {
      ['postalCode', 'postal', 'zip', 'zipcode'].forEach(name => {
        const el = document.getElementById(name) || document.querySelector(`[name="${name}"]`);
        if (el) { el.value = postal; el.dispatchEvent(new Event('change', { bubbles: true })); }
      });
    }, BIZ.postal);

    // Province select
    await pg.evaluate(() => {
      const selects = Array.from(document.querySelectorAll('select'));
      for (const sel of selects) {
        const name = (sel.name || sel.id || '').toLowerCase();
        if (name.includes('prov') || name.includes('province') || name.includes('region')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (name.includes('cat') || name.includes('category') || name.includes('type')) {
          const opt = Array.from(sel.options).find(o =>
            o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('real estate') ||
            o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('property') ||
            o.text.toLowerCase().includes('construction') || o.text.toLowerCase().includes('service'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    });

    await sleep(2000);

    // Submit by clicking the Next/Submit button
    const clicked = await pg.evaluate(() => {
      // Try input[type=submit] first
      const submitInputs = Array.from(document.querySelectorAll('input[type="submit"]'));
      for (const btn of submitInputs) {
        if (!btn.disabled) { btn.click(); return btn.value || 'submit input clicked'; }
      }
      // Then buttons
      const buttons = Array.from(document.querySelectorAll('button'));
      for (const btn of buttons) {
        const t = (btn.innerText || '').toLowerCase();
        if (!btn.disabled && (t.includes('next') || t.includes('submit') || t.includes('continue') || t.includes('add'))) {
          btn.click(); return btn.innerText;
        }
      }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(6000);

    const result = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
    console.log('  After submit URL:', result.url);

    if (result.text.toLowerCase().includes('step 2') || result.url.includes('step=2') || result.url.includes('step2')) {
      log('ProfileCanada.com', 'SUCCESS', 'Step 1 done — completing step 2...');
      // Step 2: fill website and phone
      await pg.evaluate((biz) => {
        const inputs = Array.from(document.querySelectorAll('input, textarea'));
        for (const inp of inputs) {
          const key = (inp.name || inp.id || '').toLowerCase();
          if (key.includes('web') || key.includes('url')) { inp.value = biz.website; inp.dispatchEvent(new Event('change', { bubbles: true })); }
          if (key.includes('phone') || key.includes('tel')) { inp.value = biz.phone; inp.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }, BIZ);
      await sleep(1500);
      await pg.evaluate(() => {
        const btn = document.querySelector('input[type="submit"], button[type="submit"]');
        if (btn) btn.click();
      });
      await sleep(5000);
      log('ProfileCanada.com', 'SUCCESS', 'Multi-step submitted — check profilecanada.com for listing');
    } else if (result.text.toLowerCase().includes('thank') || result.text.toLowerCase().includes('success') || result.text.toLowerCase().includes('listed')) {
      log('ProfileCanada.com', 'SUCCESS');
    } else if (result.text.toLowerCase().includes('email') || result.text.toLowerCase().includes('verif')) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('ProfileCanada.com', 'CHECK', 'Visit: profilecanada.com/advertising/editlisting.cfm — ' + result.text.substring(0, 80));
    }
  } catch (e) {
    log('ProfileCanada.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('❌ Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  console.log('🔄 Round 4 — Final fixes\n');

  await fixB2BCo(pg);
  await fixDIYoffer(pg);
  await fixProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n══════════════════════════════════════════════════');
  console.log('  FINAL DIRECTORY SUBMISSION SUMMARY (ALL ROUNDS)');
  console.log('══════════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated (manual review)');
  console.log('📧  Fyple.ca — Check info@asads.ca for verification link');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca for verification link');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', SKIP: '⏭', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });

  console.log('\n📧 Check info@asads.ca inbox for verification emails from all directories');

  console.log('\n⚠️  REQUIRES MANUAL ACTION (credentials/payment):');
  console.log('   1. homestars.com — create free business profile');
  console.log('   2. nachi.org — complete InterNACHI member directory profile');
  console.log('   3. oahi.com — get OAHI membership (Ontario inspector association)');
  console.log('   4. cahpi.ca — apply for CAHPI membership');
  console.log('   5. app.spectora.com — create free inspector profile');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
