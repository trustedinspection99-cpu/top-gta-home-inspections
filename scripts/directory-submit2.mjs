/**
 * directory-submit2.mjs — Round 2: Fix failed submissions + check email verifications
 * Handles React/Vue controlled inputs via native value setter
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
  province:    'Ontario',
  provinceAbb: 'ON',
  postal:      'N3H 0C1',
  description: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, mold, asbestos, radon & thermal imaging. Same-day digital reports. Licensed & insured.',
  keywords:    'home inspection, home inspector, pre-purchase inspection, mold inspection, Ontario',
  password:    'ASADS2026!',
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
  const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', SKIP: '⏭', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

// React-compatible fill function
async function fillForm(pg, biz) {
  return pg.evaluate((biz) => {
    function setNative(el, value) {
      try {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
          || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        if (nativeSetter) nativeSetter.call(el, value);
        else el.value = value;
      } catch (_) { el.value = value; }
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]), textarea'));
    for (const inp of inputs) {
      const key = (inp.name || inp.id || inp.placeholder || inp.getAttribute('aria-label') || inp.getAttribute('autocomplete') || '').toLowerCase();
      const type = (inp.type || '').toLowerCase();
      if (type === 'submit' || type === 'button' || type === 'checkbox' || type === 'radio') continue;

      if (key.includes('first') && key.includes('name')) setNative(inp, 'Asad');
      else if (key.includes('last') && key.includes('name')) setNative(inp, 'S');
      else if ((key.includes('business') || key.includes('company')) && key.includes('name')) setNative(inp, biz.name);
      else if (key === 'name' || key.includes('your name') || key.includes('full name')) setNative(inp, 'Asad S');
      else if (key.includes('email')) setNative(inp, biz.email);
      else if (key.includes('password') || key === 'pass' || type === 'password') setNative(inp, biz.password);
      else if (key.includes('phone') || key.includes('tel') || type === 'tel') setNative(inp, biz.phone);
      else if (key.includes('web') || key.includes('url') || key.includes('site')) setNative(inp, biz.website);
      else if (key.includes('address') && !key.includes('2') && !key.includes('line2')) setNative(inp, biz.address);
      else if (key.includes('city') || key.includes('town')) setNative(inp, biz.city);
      else if (key.includes('postal') || key.includes('zip') || key.includes('postcode')) setNative(inp, biz.postal);
      else if (key.includes('desc') || key.includes('about') || key.includes('message') || key.includes('detail')) setNative(inp, biz.description);
      else if (key.includes('keyword') || key.includes('tag')) setNative(inp, biz.keywords);
      else if (key.includes('category') || key.includes('service') || key.includes('specialty')) setNative(inp, 'Home Inspection');
    }

    // Selects
    const selects = Array.from(document.querySelectorAll('select'));
    for (const sel of selects) {
      const key = (sel.name || sel.id || sel.getAttribute('aria-label') || '').toLowerCase();
      if (key.includes('province') || key.includes('state') || key.includes('region')) {
        const opt = Array.from(sel.options).find(o => o.value === 'ON' || o.value === 'Ontario' || o.text.includes('Ontario'));
        if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      }
      if (key.includes('country')) {
        const opt = Array.from(sel.options).find(o => o.value === 'CA' || o.value === 'Canada' || o.text.includes('Canada'));
        if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      }
      if (key.includes('cat') || key.includes('type') || key.includes('industry')) {
        const opt = Array.from(sel.options).find(o =>
          o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('real estate') ||
          o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('property') ||
          o.text.toLowerCase().includes('service') || o.text.toLowerCase().includes('construction'));
        if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      }
    }

    // Checkboxes (terms/agree)
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      const key = (cb.name || cb.id || cb.getAttribute('aria-label') || '').toLowerCase();
      if (key.includes('term') || key.includes('agree') || key.includes('accept') || key.includes('policy')) {
        if (!cb.checked) cb.click();
      }
    });
  }, biz);
}

async function clickSubmit(pg) {
  return pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
      .find(b => {
        if (b.disabled) return false;
        const t = (b.innerText || b.value || b.getAttribute('aria-label') || '').toLowerCase().trim();
        return t.includes('submit') || t.includes('register') || t.includes('sign up') ||
               t.includes('add') || t.includes('save') || t.includes('send') ||
               t.includes('continue') || t.includes('next') || t.includes('nominate') ||
               t.includes('join') || t.includes('list') || t.includes('create');
      });
    if (btn) { btn.click(); return true; }
    return false;
  });
}

// ── ThreeBestRated.ca ─────────────────────────────────────────────────────────
async function fixThreeBestRated(pg) {
  console.log('\n── ThreeBestRated.ca');
  try {
    await pg.goto('https://threebestrated.ca/submit-business?reason=new', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    // Inspect what's on the page
    const pageInfo = await pg.evaluate(() => ({
      inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
        tag: el.tagName, type: el.type, name: el.name, id: el.id, placeholder: el.placeholder
      })),
      text: document.body.innerText.substring(0, 300),
    }));
    console.log('  Page text:', pageInfo.text.substring(0, 150));
    console.log('  Inputs found:', pageInfo.inputs.length);

    if (pageInfo.inputs.length === 0) {
      log('ThreeBestRated.ca', 'CHECK', 'No form inputs found — may require JS interaction. Visit manually: threebestrated.ca/submit-business');
      return;
    }

    await fillForm(pg, BIZ);
    await sleep(2000);
    await clickSubmit(pg);
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 300));
    if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success') || result.toLowerCase().includes('received') || result.toLowerCase().includes('submit')) {
      log('ThreeBestRated.ca', 'SUCCESS', 'Nomination submitted — manual review, no guarantee of listing');
    } else if (result.toLowerCase().includes('email') || result.toLowerCase().includes('verif')) {
      log('ThreeBestRated.ca', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('ThreeBestRated.ca', 'CHECK', 'Visit manually: threebestrated.ca/submit-business');
    }
  } catch (e) {
    log('ThreeBestRated.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── CanadianBusinessDirectory.ca ──────────────────────────────────────────────
async function fixCanadianBizDir(pg) {
  console.log('\n── CanadianBusinessDirectory.ca');
  try {
    // Try registration directly
    await pg.goto('https://www.canadianbusinessdirectory.ca', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Find add/register link
    const regUrl = await pg.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const reg = links.find(l => {
        const t = (l.innerText || l.href || '').toLowerCase();
        return t.includes('register') || t.includes('add') || t.includes('submit') || t.includes('free');
      });
      return reg?.href || null;
    });

    if (regUrl) {
      await pg.goto(regUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(3000);
    }

    const pageText = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    console.log('  Page:', pageText.substring(0, 150));

    await fillForm(pg, BIZ);
    await sleep(2000);
    await clickSubmit(pg);
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 300));
    if (result.toLowerCase().includes('verif') || result.toLowerCase().includes('email')) {
      log('CanadianBusinessDirectory.ca', 'NEEDS_EMAIL', 'Check info@asads.ca for verification');
    } else if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success')) {
      log('CanadianBusinessDirectory.ca', 'SUCCESS');
    } else {
      log('CanadianBusinessDirectory.ca', 'CHECK', 'Visit: canadianbusinessdirectory.ca — ' + result.substring(0, 80));
    }
  } catch (e) {
    log('CanadianBusinessDirectory.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── BestProsInTown.com ────────────────────────────────────────────────────────
async function fixBestProsInTown(pg) {
  console.log('\n── BestProsInTown.com');
  try {
    await pg.goto('https://www.bestprosintown.com/addbusiness.php', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    const pageInfo = await pg.evaluate(() => ({
      text: document.body.innerText.substring(0, 400),
      inputs: Array.from(document.querySelectorAll('input, textarea')).map(el => ({ name: el.name, id: el.id, type: el.type, placeholder: el.placeholder }))
    }));
    console.log('  Page:', pageInfo.text.substring(0, 200));
    console.log('  Inputs:', JSON.stringify(pageInfo.inputs));

    if (pageInfo.inputs.length > 0) {
      await fillForm(pg, BIZ);
      await sleep(2000);
      await clickSubmit(pg);
      await sleep(5000);
      const result = await pg.evaluate(() => document.body.innerText.substring(0, 300));
      if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success') || result.toLowerCase().includes('review')) {
        log('BestProsInTown.com', 'SUCCESS', 'Submitted — 3-4 month review');
      } else {
        log('BestProsInTown.com', 'CHECK', result.substring(0, 100));
      }
    } else {
      log('BestProsInTown.com', 'CHECK', 'Visit manually: bestprosintown.com/addbusiness.php');
    }
  } catch (e) {
    log('BestProsInTown.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── B2BCo.com ─────────────────────────────────────────────────────────────────
async function fixB2BCo(pg) {
  console.log('\n── B2BCo.com');
  try {
    await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    await fillForm(pg, BIZ);
    await sleep(1500);
    await clickSubmit(pg);
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('confirm') || result.toLowerCase().includes('email') || result.toLowerCase().includes('verif') || result.toLowerCase().includes('sent')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca — click confirmation link');
    } else if (result.toLowerCase().includes('success') || result.toLowerCase().includes('welcome') || result.toLowerCase().includes('thank')) {
      log('B2BCo.com', 'SUCCESS');
    } else {
      log('B2BCo.com', 'CHECK', result.substring(0, 120));
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── DIYoffer.ca ───────────────────────────────────────────────────────────────
async function fixDIYoffer(pg) {
  console.log('\n── DIYoffer.ca');
  try {
    await pg.goto('https://diyoffer.ca/submit-your-business/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    const pageInfo = await pg.evaluate(() => ({
      text: document.body.innerText.substring(0, 300),
      inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
        name: el.name, id: el.id, type: el.type, placeholder: el.placeholder, tag: el.tagName
      }))
    }));
    console.log('  Inputs found:', pageInfo.inputs.length);
    console.log('  Fields:', pageInfo.inputs.map(i => i.name || i.id || i.placeholder).join(', ').substring(0, 200));

    await fillForm(pg, BIZ);
    await sleep(2000);

    // Also handle dropdowns specifically
    await pg.evaluate((biz) => {
      const selects = Array.from(document.querySelectorAll('select'));
      for (const sel of selects) {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('province') || key.includes('prov')) {
          const opt = Array.from(sel.options).find(o => o.value === 'ON' || o.text.includes('Ontario'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (key.includes('municipality') || key.includes('region') || key.includes('county')) {
          const opt = Array.from(sel.options).find(o => o.text.toLowerCase().includes('cambridge') || o.text.toLowerCase().includes('waterloo'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (key.includes('city')) {
          const opt = Array.from(sel.options).find(o => o.text.toLowerCase().includes('cambridge'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    }, BIZ);
    await sleep(1500);

    await clickSubmit(pg);
    await sleep(6000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success') || result.toLowerCase().includes('submitt')) {
      log('DIYoffer.ca', 'SUCCESS');
    } else if (result.toLowerCase().includes('email') || result.toLowerCase().includes('verif')) {
      log('DIYoffer.ca', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('DIYoffer.ca', 'CHECK', 'Visit manually: diyoffer.ca/submit-your-business/ — ' + result.substring(0, 80));
    }
  } catch (e) {
    log('DIYoffer.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── ProfileCanada.com ─────────────────────────────────────────────────────────
async function fixProfileCanada(pg) {
  console.log('\n── ProfileCanada.com');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    const pageInfo = await pg.evaluate(() => ({
      text: document.body.innerText.substring(0, 400),
      inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
        name: el.name, id: el.id, type: el.type, placeholder: el.placeholder
      }))
    }));
    console.log('  Inputs:', pageInfo.inputs.length, pageInfo.inputs.map(i => i.name || i.id).join(', ').substring(0, 200));

    await fillForm(pg, BIZ);
    await sleep(2000);
    await clickSubmit(pg);
    await sleep(5000);

    const result = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
    if (result.text.toLowerCase().includes('step 2') || result.url.includes('step2')) {
      // Fill step 2
      await fillForm(pg, BIZ);
      await sleep(2000);
      await clickSubmit(pg);
      await sleep(5000);
      const result2 = await pg.evaluate(() => document.body.innerText.substring(0, 300));
      if (result2.toLowerCase().includes('step 3') || result2.toLowerCase().includes('success') || result2.toLowerCase().includes('thank')) {
        log('ProfileCanada.com', 'SUCCESS', 'Multi-step form completed');
      } else {
        log('ProfileCanada.com', 'CHECK', 'Partially submitted — visit profilecanada.com to complete');
      }
    } else if (result.text.toLowerCase().includes('thank') || result.text.toLowerCase().includes('success')) {
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

// ── Check email for Fyple + 411 verifications ─────────────────────────────────
async function checkEmailVerifications(pg) {
  console.log('\n── Checking email verifications (info@asads.ca)');
  try {
    // Try to navigate to webmail or Gmail if open
    const pages2 = await (await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` })).pages();
    for (const p of pages2) {
      const url = p.url();
      if (url.includes('mail.google') || url.includes('gmail') || url.includes('webmail') || url.includes('outlook')) {
        console.log('  Found email tab:', url);
        return;
      }
    }
    console.log('  ℹ️  No email tab detected. Please manually check info@asads.ca for:');
    console.log('     - Fyple.ca verification email → click the link');
    console.log('     - 411.ca / YP Canada verification email → click the link');
  } catch (_) {}
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!await checkPort(DEBUG_PORT)) {
    console.error('❌ Chrome not running'); return;
  }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  console.log('🔄 Round 2 — Fixing failed submissions\n');

  await fixThreeBestRated(pg);
  await fixCanadianBizDir(pg);
  await fixBestProsInTown(pg);
  await fixB2BCo(pg);
  await fixDIYoffer(pg);
  await fixProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n══════════════════════════════════════════');
  console.log('  ROUND 2 RESULTS');
  console.log('══════════════════════════════════════════');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', SKIP: '⏭', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}`);
    if (r.note) console.log(`    → ${r.note}`);
  });

  console.log('\n📧 ACTION NEEDED — Check info@asads.ca for verification emails:');
  console.log('   1. Fyple.ca — click verification link');
  console.log('   2. 411.ca / YP Canada — click verification link');
  results.filter(r => r.status === 'NEEDS_EMAIL').forEach(r => console.log(`   3. ${r.site}`));

  console.log('\n⚠️  MANUAL ACTION NEEDED (require payment or credentials):');
  console.log('   - nachi.org → Complete InterNACHI profile (membership required)');
  console.log('   - cahpi.ca  → CAHPI membership required');
  console.log('   - homestars.com → Create free profile at homestars.com/business');
  console.log('   - oahi.com  → OAHI membership (inspector association)');
  console.log('   - app.spectora.com → Free inspector profile at app.spectora.com');
  console.log('   - certifiedmasterinspector.org → Requires CMI designation');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
