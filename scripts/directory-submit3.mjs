/**
 * directory-submit3.mjs — Round 3: Targeted fixes for remaining directories
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
  keywords:    'home inspection, home inspector, pre-purchase inspection, Ontario',
  password:    'ASADS2026!',
};

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

function setVal(pg, selector, value) {
  return pg.evaluate((sel, val) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    try {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
        || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
      if (nativeSetter) nativeSetter.call(el, val);
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
  const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', SKIP: '⏭', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

// ── BestProsInTown.com — fill by known IDs ────────────────────────────────────
async function fixBestProsInTown(pg) {
  console.log('\n── BestProsInTown.com');
  try {
    await pg.goto('https://www.bestprosintown.com/addbusiness.php', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Fill by known IDs: bz_name, bz_adr, bz_tel, bz_web, yr_email
    await setVal(pg, '#bz_name', BIZ.name);
    await setVal(pg, '#bz_adr', BIZ.address + ', ' + BIZ.city + ', ' + BIZ.provinceAbb + ' ' + BIZ.postal);
    await setVal(pg, '#bz_tel', BIZ.phone);
    await setVal(pg, '#bz_web', BIZ.website);
    await setVal(pg, '#yr_email', BIZ.email);
    await sleep(1500);

    // Click submit button
    const clicked = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, input[type="submit"], a'));
      const btn = btns.find(b => {
        const t = (b.innerText || b.value || '').toLowerCase();
        return t.includes('submit') || t.includes('add') || t.includes('list') || t.includes('send');
      });
      if (btn) { btn.click(); return btn.innerText || btn.value || 'clicked'; }
      // Try form submit
      const form = document.querySelector('form');
      if (form) { form.submit(); return 'form.submit()'; }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 300));
    if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success') || result.toLowerCase().includes('review') || result.toLowerCase().includes('received')) {
      log('BestProsInTown.com', 'SUCCESS', 'Submitted — 3-4 month review queue');
    } else {
      log('BestProsInTown.com', 'CHECK', result.substring(0, 100));
    }
  } catch (e) {
    log('BestProsInTown.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── DIYoffer.ca — Gravity Forms specific ─────────────────────────────────────
async function fixDIYoffer(pg) {
  console.log('\n── DIYoffer.ca');
  try {
    await pg.goto('https://diyoffer.ca/submit-your-business/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    // Dump all Gravity Forms fields with labels
    const fields = await pg.evaluate(() => {
      const items = [];
      const labels = document.querySelectorAll('label');
      for (const label of labels) {
        const forId = label.getAttribute('for');
        const text = label.innerText.trim();
        const el = forId ? document.getElementById(forId) : null;
        if (el) {
          items.push({ id: forId, label: text, tag: el.tagName, type: el.type, name: el.name });
        }
      }
      return items;
    });
    console.log('  Gravity Forms fields:');
    fields.forEach(f => console.log(`    #${f.id} "${f.label}" (${f.tag} type=${f.type})`));

    // Fill based on label text
    for (const field of fields) {
      const label = field.label.toLowerCase();
      let val = null;
      if (label.includes('business name') || label.includes('company')) val = BIZ.name;
      else if (label.includes('specialty') || label.includes('type of business') || label.includes('service')) val = 'Home Inspection';
      else if (label.includes('phone') && !label.includes('cell') && !label.includes('fax')) val = BIZ.phone;
      else if (label.includes('cell') || label.includes('mobile')) val = BIZ.phone;
      else if (label.includes('website') || label.includes('url') || label.includes('web address')) val = BIZ.website;
      else if (label.includes('email')) val = BIZ.email;
      else if (label.includes('address') && !label.includes('address 2')) val = BIZ.address;
      else if (label.includes('postal') || label.includes('zip')) val = BIZ.postal;
      else if (label.includes('city') || label.includes('town')) val = BIZ.city;

      if (val && field.tag === 'SELECT') {
        await pg.evaluate((id, val) => {
          const sel = document.getElementById(id);
          if (!sel) return;
          const opt = Array.from(sel.options).find(o =>
            o.text.toLowerCase().includes(val.toLowerCase()) || o.value.toLowerCase().includes(val.toLowerCase())
          );
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }, field.id, val);
      } else if (val) {
        await setVal(pg, '#' + field.id, val);
      }
    }

    // Handle province select
    await pg.evaluate(() => {
      const selects = Array.from(document.querySelectorAll('select'));
      for (const sel of selects) {
        const label = document.querySelector(`label[for="${sel.id}"]`);
        const labelText = (label?.innerText || sel.name || sel.id || '').toLowerCase();
        if (labelText.includes('province') || labelText.includes('prov') || labelText.includes('region')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    });

    await sleep(2000);

    // Click submit
    const clicked = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"]'))
        .find(b => !b.disabled);
      if (btn) { btn.click(); return true; }
      return false;
    });
    console.log('  Submit clicked:', clicked);
    await sleep(7000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success') || result.toLowerCase().includes('submitt') || result.toLowerCase().includes('confirmation')) {
      log('DIYoffer.ca', 'SUCCESS');
    } else if (result.toLowerCase().includes('email') || result.toLowerCase().includes('verif')) {
      log('DIYoffer.ca', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else if (result.toLowerCase().includes('error') || result.toLowerCase().includes('required') || result.toLowerCase().includes('invalid')) {
      log('DIYoffer.ca', 'CHECK', 'Form validation error: ' + result.substring(0, 100));
    } else {
      log('DIYoffer.ca', 'CHECK', 'Visit: diyoffer.ca/submit-your-business/');
    }
  } catch (e) {
    log('DIYoffer.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── B2BCo.com — debug then fill ───────────────────────────────────────────────
async function fixB2BCo(pg) {
  console.log('\n── B2BCo.com');
  try {
    await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    const fields = await pg.evaluate(() => {
      return Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
        tag: el.tagName, type: el.type, name: el.name, id: el.id, placeholder: el.placeholder, required: el.required
      })).filter(f => f.type !== 'hidden');
    });
    console.log('  Fields:', fields.map(f => `${f.name||f.id}(${f.type})`).join(', '));

    for (const f of fields) {
      const key = (f.name || f.id || f.placeholder || '').toLowerCase();
      let val = null;
      if (key.includes('email') || f.type === 'email') val = BIZ.email;
      else if (key.includes('password') || f.type === 'password') val = BIZ.password;
      else if (key.includes('name') || key.includes('brand') || key.includes('company')) val = BIZ.name;
      if (val) {
        const sel = f.id ? '#' + f.id : f.name ? `[name="${f.name}"]` : null;
        if (sel) await setVal(pg, sel, val);
      }
    }

    // Agree to terms
    await pg.evaluate(() => {
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (!cb.checked) cb.click();
      });
    });
    await sleep(1500);

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
        .find(b => !b.disabled);
      if (btn) btn.click();
    });
    await sleep(6000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('confirm') || result.toLowerCase().includes('email') || result.toLowerCase().includes('sent')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click confirmation link');
    } else if (result.toLowerCase().includes('welcome') || result.toLowerCase().includes('success') || result.toLowerCase().includes('thank')) {
      log('B2BCo.com', 'SUCCESS');
    } else {
      log('B2BCo.com', 'CHECK', result.substring(0, 120));
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── ProfileCanada.com — fill by known field names ─────────────────────────────
async function fixProfileCanada(pg) {
  console.log('\n── ProfileCanada.com');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Known field names from debug: businessName, locationCity, tollFree, fax, businessemail, businessDescription, category, claimdby
    await setVal(pg, '[name="businessName"], #businessName', BIZ.name);
    await setVal(pg, '[name="locationCity"], #locationCity', BIZ.city);
    await setVal(pg, '[name="businessemail"], #businessemail', BIZ.email);
    await setVal(pg, '[name="businessDescription"], #businessDescription', BIZ.description.substring(0, 255));
    await setVal(pg, '[name="claimdby"]', 'Owner');

    // Phone — try multiple selectors
    await pg.evaluate((phone) => {
      for (const sel of ['[name="phone"]', '[name="Phone"]', '[name="businessPhone"]', '#phone', '#Phone']) {
        const el = document.querySelector(sel);
        if (el) { el.value = phone; el.dispatchEvent(new Event('change', { bubbles: true })); break; }
      }
      // Also set address
      for (const sel of ['[name="address"]', '[name="Address"]', '#address']) {
        const el = document.querySelector(sel);
        if (el) { el.value = '45 Duckworth Rd, Cambridge, ON N3H 0C1'; el.dispatchEvent(new Event('change', { bubbles: true })); break; }
      }
    }, BIZ.phone);

    // Province select
    await pg.evaluate(() => {
      const selects = Array.from(document.querySelectorAll('select'));
      for (const sel of selects) {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('prov') || key.includes('province') || key.includes('region')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (key.includes('cat') || key.includes('category') || key.includes('type')) {
          const opt = Array.from(sel.options).find(o =>
            o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('real estate') ||
            o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('property'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    });

    await sleep(2000);

    const clicked = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button, input[type="button"]'))
        .find(b => {
          const t = (b.innerText || b.value || '').toLowerCase();
          return t.includes('submit') || t.includes('next') || t.includes('add') || t.includes('continue') || t.includes('save');
        });
      if (btn) { btn.click(); return btn.innerText || btn.value; }
      const form = document.querySelector('form');
      if (form) { form.submit(); return 'form.submit'; }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(6000);

    const result = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
    if (result.text.toLowerCase().includes('step 2') || result.url.includes('step2') || result.url.includes('step=2')) {
      console.log('  On step 2 — filling...');
      await fillStep2ProfileCanada(pg);
    } else if (result.text.toLowerCase().includes('thank') || result.text.toLowerCase().includes('success')) {
      log('ProfileCanada.com', 'SUCCESS');
    } else if (result.text.toLowerCase().includes('email') || result.text.toLowerCase().includes('verif')) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('ProfileCanada.com', 'CHECK', 'Visit: profilecanada.com — ' + result.text.substring(0, 80));
    }
  } catch (e) {
    log('ProfileCanada.com', 'ERROR', e.message.substring(0, 80));
  }
}

async function fillStep2ProfileCanada(pg) {
  await pg.evaluate((biz) => {
    const inputs = Array.from(document.querySelectorAll('input, textarea'));
    for (const inp of inputs) {
      const key = (inp.name || inp.id || inp.placeholder || '').toLowerCase();
      if (key.includes('web') || key.includes('url')) inp.value = biz.website;
      if (key.includes('phone') || key.includes('tel')) inp.value = biz.phone;
      if (key.includes('email')) inp.value = biz.email;
      inp.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, BIZ);
  await sleep(2000);
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('input[type="submit"], button'))
      .find(b => (b.value || b.innerText || '').toLowerCase().includes('next') || (b.value || b.innerText || '').toLowerCase().includes('submit'));
    if (btn) btn.click();
  });
  await sleep(5000);
  const result2 = await pg.evaluate(() => document.body.innerText.substring(0, 300));
  if (result2.toLowerCase().includes('thank') || result2.toLowerCase().includes('success') || result2.toLowerCase().includes('step 3')) {
    log('ProfileCanada.com', 'SUCCESS', 'Multi-step form completed');
  } else {
    log('ProfileCanada.com', 'CHECK', 'Partially completed — check profilecanada.com');
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('❌ Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  console.log('🔄 Round 3 — Targeted fixes\n');

  await fixBestProsInTown(pg);
  await fixDIYoffer(pg);
  await fixB2BCo(pg);
  await fixProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n══════════════════════════════════════════');
  console.log('  ROUND 3 RESULTS');
  console.log('══════════════════════════════════════════');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', SKIP: '⏭', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}`);
    if (r.note) console.log(`    → ${r.note}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
