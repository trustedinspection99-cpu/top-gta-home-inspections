/**
 * directory-submit5.mjs — Round 5: Final two — B2BCo + ProfileCanada
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
  description: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, mold, asbestos, radon & thermal imaging inspections. Same-day digital reports.',
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
async function fixB2BCo(pg) {
  console.log('\n── B2BCo.com');
  try {
    await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(5000);

    // Dump all visible inputs
    const fields = await pg.evaluate(() => {
      return Array.from(document.querySelectorAll('input, select, textarea'))
        .filter(el => el.type !== 'hidden')
        .map(el => ({ tag: el.tagName, type: el.type, name: el.name, id: el.id, placeholder: el.placeholder, visible: el.offsetParent !== null }));
    });
    console.log('  All fields:', JSON.stringify(fields, null, 2));

    // Try filling by name
    for (const f of fields) {
      if (!f.visible) continue;
      const sel = f.id ? `#${f.id}` : f.name ? `[name="${f.name}"]` : null;
      if (!sel) continue;

      let val = null;
      const key = (f.name || f.id || f.placeholder || '').toLowerCase();
      if (f.name === 'CustomerEmail' || key.includes('email')) val = BIZ.email;
      else if (f.name === 'Password' || (f.type === 'password' && !key.includes('confirm'))) val = BIZ.password;
      else if (f.name === 'ConfirmPassword' || (f.type === 'password' && key.includes('confirm'))) val = BIZ.password;
      else if (key.includes('name') || key.includes('brand') || key.includes('company')) val = BIZ.name;

      if (val) {
        await pg.evaluate((sel, val) => {
          const el = document.querySelector(sel);
          if (!el) return;
          try {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            if (setter) setter.call(el, val);
            else el.value = val;
          } catch (_) { el.value = val; }
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, sel, val);
        console.log(`  Filled ${f.name || f.id} = ${val.substring(0, 30)}`);
      }
    }

    // Check all visible checkboxes
    await pg.evaluate(() => {
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.offsetParent !== null && !cb.checked) cb.click();
      });
    });
    await sleep(1000);

    // Find and click submit button
    const clicked = await pg.evaluate(() => {
      // Try all buttons visible on page
      const allBtns = Array.from(document.querySelectorAll('button, input[type="submit"]'))
        .filter(b => b.offsetParent !== null && !b.disabled);
      const btn = allBtns.find(b => {
        const t = (b.innerText || b.value || b.type || '').toLowerCase();
        return t.includes('register') || t.includes('join') || t.includes('sign') || t.includes('create') || t.includes('submit') || t === 'submit';
      });
      if (btn) { btn.click(); return btn.innerText || btn.value || btn.type; }
      // Last resort: submit the form containing the email field
      const emailField = document.querySelector('[name="CustomerEmail"], input[type="email"]');
      if (emailField?.form) { emailField.form.submit(); return 'form.submit'; }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(7000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 500));
    if (result.toLowerCase().includes('confirm') || result.toLowerCase().includes('verif') || result.toLowerCase().includes('email sent')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click confirmation link');
    } else if (result.toLowerCase().includes('welcome') || result.toLowerCase().includes('success') || result.toLowerCase().includes('thank') || result.toLowerCase().includes('logged')) {
      log('B2BCo.com', 'SUCCESS');
    } else {
      log('B2BCo.com', 'CHECK', 'Page: ' + result.substring(0, 100));
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── ProfileCanada.com — target the Add Business form specifically ─────────────
async function fixProfileCanada(pg) {
  console.log('\n── ProfileCanada.com');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Inspect all forms on the page
    const forms = await pg.evaluate(() => {
      return Array.from(document.querySelectorAll('form')).map((form, i) => ({
        index: i,
        action: form.action,
        method: form.method,
        inputCount: form.querySelectorAll('input, textarea, select').length,
        inputs: Array.from(form.querySelectorAll('input:not([type="hidden"]), textarea, select')).map(el => ({
          name: el.name, id: el.id, type: el.type, placeholder: el.placeholder
        })),
        submitBtns: Array.from(form.querySelectorAll('input[type="submit"], button[type="submit"]')).map(b => b.value || b.innerText || b.type)
      }));
    });
    console.log('  Forms on page:');
    forms.forEach(f => console.log(`    Form ${f.index}: action=${f.action} inputs=${f.inputCount} submits=${f.submitBtns.join(',')}`));

    // Find the Add Business form (the one with businessName or most inputs)
    const addBizForm = forms.find(f =>
      f.inputs.some(i => i.name === 'businessName' || i.name === 'businessemail' || i.name === 'locationCity')
    ) || forms.reduce((max, f) => f.inputCount > max.inputCount ? f : max, forms[0]);

    if (!addBizForm) {
      log('ProfileCanada.com', 'CHECK', 'Could not find Add Business form — visit manually');
      return;
    }

    console.log('  Using form', addBizForm.index, 'with', addBizForm.inputCount, 'inputs');
    console.log('  Fields:', addBizForm.inputs.map(i => i.name || i.id).join(', ').substring(0, 200));

    // Fill the form using the specific form index
    await pg.evaluate((formIndex, biz) => {
      const form = document.querySelectorAll('form')[formIndex];
      if (!form) return;

      function fill(name, value) {
        const el = form.querySelector(`[name="${name}"], #${name}`);
        if (!el) return;
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }

      fill('businessName', biz.name);
      fill('locationCity', biz.city);
      fill('businessemail', biz.email);
      fill('businessDescription', biz.description.substring(0, 200));

      // Radio buttons for claimdby
      const radios = form.querySelectorAll('input[name="claimdby"]');
      if (radios.length) radios[0].click();

      // All other inputs
      const inputs = Array.from(form.querySelectorAll('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]):not([type="submit"]), textarea'));
      for (const inp of inputs) {
        const key = (inp.name || inp.id || inp.placeholder || '').toLowerCase();
        if (!inp.value) {
          if (key.includes('phone') || key.includes('tel')) { inp.value = biz.phone; inp.dispatchEvent(new Event('change', { bubbles: true })); }
          if (key.includes('web') || key.includes('url')) { inp.value = biz.website; inp.dispatchEvent(new Event('change', { bubbles: true })); }
          if (key.includes('address')) { inp.value = biz.address; inp.dispatchEvent(new Event('change', { bubbles: true })); }
          if (key.includes('postal') || key.includes('zip')) { inp.value = biz.postal; inp.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }

      // Province select
      const selects = Array.from(form.querySelectorAll('select'));
      for (const sel of selects) {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('prov') || key.includes('province')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (key.includes('cat') || key.includes('category')) {
          const opt = Array.from(sel.options).find(o =>
            o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('real estate') || o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('property'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    }, addBizForm.index, BIZ);

    await sleep(2000);

    // Click the submit button WITHIN that specific form
    const clicked = await pg.evaluate((formIndex) => {
      const form = document.querySelectorAll('form')[formIndex];
      if (!form) return null;
      const btn = form.querySelector('input[type="submit"], button[type="submit"]');
      if (btn) { btn.click(); return btn.value || btn.innerText || 'clicked'; }
      form.submit();
      return 'form.submit';
    }, addBizForm.index);
    console.log('  Submit clicked:', clicked);
    await sleep(6000);

    const result = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
    console.log('  Result URL:', result.url);
    if (result.text.toLowerCase().includes('step 2') || result.url.includes('step=2')) {
      // Fill step 2
      await pg.evaluate((biz) => {
        const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]), textarea'));
        for (const inp of inputs) {
          const key = (inp.name || inp.id || '').toLowerCase();
          if (key.includes('web') || key.includes('url')) { inp.value = biz.website; inp.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }, BIZ);
      await sleep(1500);
      await pg.evaluate(() => { const btn = document.querySelector('input[type="submit"]'); if (btn) btn.click(); });
      await sleep(4000);
      log('ProfileCanada.com', 'SUCCESS', 'Multi-step form submitted');
    } else if (result.text.toLowerCase().includes('thank') || result.text.toLowerCase().includes('success') || result.text.toLowerCase().includes('listed')) {
      log('ProfileCanada.com', 'SUCCESS');
    } else if (result.text.toLowerCase().includes('email') || result.text.toLowerCase().includes('verif')) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('ProfileCanada.com', 'CHECK', 'Visit manually: profilecanada.com/advertising/editlisting.cfm');
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

  console.log('🔄 Round 5 — Final two\n');

  await fixB2BCo(pg);
  await fixProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  COMPLETE SUBMISSION SUMMARY');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated (12 competitors listed there)');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('📧  Fyple.ca — Check info@asads.ca → click verification link');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca → click verification link');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
  console.log('\n📧 Check info@asads.ca for verification emails and click all links');
  console.log('\n⚠️  Still needs YOU (requires credentials/payment):');
  console.log('   1. homestars.com → homestars.com/business — free profile, huge ranking impact');
  console.log('   2. nachi.org → Complete your InterNACHI member profile');
  console.log('   3. oahi.com → OAHI membership (shows up #1-2 in 20+ Ontario cities)');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
