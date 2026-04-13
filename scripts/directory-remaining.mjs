/**
 * directory-remaining.mjs — Remaining directories:
 * 1. CanadianBusinessDirectory.ca — retry with different approach
 * 2. Homestars.com — free business profile registration
 * 3. BestProsInTown.com — listed in gap analysis (5 competitors)
 * 4. YellowPages.ca — separate from 411.ca
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
  province: 'Ontario',
  provinceAbb: 'ON',
  postal: 'N3H 0C1',
  description: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, mold, asbestos, radon & thermal imaging inspections. Same-day digital reports. Licensed & insured.',
  password: 'ASADS2026!',
  firstName: 'ASADS',
  lastName: 'Inspections',
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
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
        || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
      if (setter) setter.call(el, val);
      else el.value = val;
    } catch (_) { el.value = val; }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
    return true;
  }, selector, value);
}

const results = [];
function log(site, status, note = '') {
  results.push({ site, status, note });
  const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

// ── CanadianBusinessDirectory.ca ─────────────────────────────────────────────
async function doCanadianBizDir(pg) {
  console.log('\n── CanadianBusinessDirectory.ca');
  try {
    // Try the add business page
    await pg.goto('https://canadianbusinessdirectory.ca/add-your-business/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(4000);

    const state = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 400),
      inputs: Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select')).filter(el => el.offsetParent !== null).map(el => ({
        type: el.type, name: el.name, id: el.id, placeholder: el.placeholder,
      })),
    }));
    console.log('  URL:', state.url);
    console.log('  Title:', state.title);
    console.log('  Text:', state.text.substring(0, 200));
    console.log('  Inputs:', JSON.stringify(state.inputs));

    if (state.url.includes('error') || state.text.toLowerCase().includes('not found') || state.text.toLowerCase().includes('404')) {
      // Try alternate URLs
      for (const url of ['https://canadianbusinessdirectory.ca/submit-business/', 'https://canadianbusinessdirectory.ca/add-listing/', 'https://canadianbusinessdirectory.ca/submit/']) {
        await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
        await sleep(2000);
        const st = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 100) }));
        console.log('  Tried:', st.url, '|', st.text.substring(0, 60));
        if (!st.url.includes('error') && !st.text.includes('404')) break;
      }
    }

    // Try filling the form
    const filled = await pg.evaluate((biz) => {
      const inputs = Array.from(document.querySelectorAll('input:not([type=hidden]):not([type=radio]):not([type=checkbox]):not([type=submit]), textarea, select'));
      let count = 0;
      inputs.forEach(el => {
        if (!el.offsetParent) return;
        const key = (el.name || el.id || el.placeholder || '').toLowerCase();
        let val = null;
        if (key.includes('name') || key.includes('company') || key.includes('business')) val = biz.name;
        else if (key.includes('email')) val = biz.email;
        else if (key.includes('phone') || key.includes('tel')) val = biz.phone;
        else if (key.includes('web') || key.includes('url')) val = biz.website;
        else if (key.includes('address')) val = biz.address + ', ' + biz.city + ', ' + biz.province;
        else if (key.includes('city')) val = biz.city;
        else if (key.includes('prov') || key.includes('state')) {
          if (el.tagName === 'SELECT') {
            const opt = Array.from(el.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
            if (opt) { el.value = opt.value; el.dispatchEvent(new Event('change', { bubbles: true })); count++; }
            return;
          }
          val = biz.province;
        }
        else if (key.includes('postal') || key.includes('zip')) val = biz.postal;
        else if (key.includes('desc') || key.includes('about')) val = biz.description;
        if (val) {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          count++;
        }
      });
      return count;
    }, BIZ);
    console.log('  Filled', filled, 'fields');

    if (filled === 0) {
      log('CanadianBusinessDirectory.ca', 'CHECK', 'No form found or site blocking — visit manually: canadianbusinessdirectory.ca/add-your-business/');
      return;
    }

    await sleep(1000);

    // Submit
    const clicked = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b => b.offsetParent !== null && !b.disabled);
      if (btn) { btn.click(); return btn.innerText || btn.value; }
      return null;
    });
    console.log('  Submit clicked:', clicked);
    await sleep(8000);

    const result = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 400),
    }));
    const t = result.text.toLowerCase();
    if (t.includes('thank') || t.includes('success') || t.includes('submitted') || t.includes('review')) {
      log('CanadianBusinessDirectory.ca', 'SUCCESS', 'Submitted!');
    } else if (t.includes('email') && (t.includes('verif') || t.includes('sent'))) {
      log('CanadianBusinessDirectory.ca', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('CanadianBusinessDirectory.ca', 'CHECK', 'URL: ' + result.url + ' | text: ' + result.text.substring(0, 80));
    }
  } catch (e) {
    log('CanadianBusinessDirectory.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── BestProsInTown.com ────────────────────────────────────────────────────────
async function doBestProsInTown(pg) {
  console.log('\n── BestProsInTown.com');
  try {
    await pg.goto('https://www.bestprosintown.com/ca/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(3000);

    const state = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 400),
    }));
    console.log('  URL:', state.url);
    console.log('  Text:', state.text.substring(0, 200));

    // Try to find add business link
    const addLink = await pg.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const add = links.find(l => {
        const t = (l.innerText || l.href || '').toLowerCase();
        return t.includes('add') || t.includes('list') || t.includes('submit') || t.includes('register');
      });
      return add ? { href: add.href, text: add.innerText } : null;
    });
    console.log('  Add link:', addLink);

    if (!addLink) {
      // Try direct URLs
      await pg.goto('https://www.bestprosintown.com/ca/add-business/', { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
      await sleep(2000);
    } else {
      await pg.goto(addLink.href, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
      await sleep(3000);
    }

    const formState = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      inputs: Array.from(document.querySelectorAll('input:not([type=hidden]), textarea')).filter(el => el.offsetParent !== null).map(el => ({
        type: el.type, name: el.name, id: el.id, placeholder: el.placeholder,
      })),
    }));
    console.log('  Form URL:', formState.url);
    console.log('  Inputs:', JSON.stringify(formState.inputs));

    if (formState.inputs.length === 0) {
      log('BestProsInTown.com', 'CHECK', 'No form found — visit manually: bestprosintown.com/ca/');
      return;
    }

    // Fill form
    const filled = await pg.evaluate((biz) => {
      const count = { n: 0 };
      function set(selector, val) {
        const el = document.querySelector(selector);
        if (!el || !el.offsetParent) return;
        el.value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        count.n++;
      }
      // Try common field names
      ['input[name*="name"], input[id*="name"], input[placeholder*="name"]'].forEach(sel => set(sel, biz.name));
      set('input[type="email"], input[name*="email"], input[id*="email"]', biz.email);
      set('input[name*="phone"], input[id*="phone"], input[type="tel"]', biz.phone);
      set('input[name*="web"], input[id*="web"], input[name*="url"]', biz.website);
      set('input[name*="city"], input[id*="city"]', biz.city);
      set('input[name*="address"]', biz.address);
      set('input[name*="postal"], input[name*="zip"]', biz.postal);
      set('textarea[name*="desc"], textarea[id*="desc"]', biz.description);
      return count.n;
    }, BIZ);
    console.log('  Filled:', filled, 'fields');
    await sleep(1000);

    const clicked = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type=submit], input[type=submit]')).find(b => b.offsetParent !== null);
      if (btn) { btn.click(); return btn.innerText || btn.value; }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(8000);

    const result = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 300),
    }));
    const t = result.text.toLowerCase();
    if (t.includes('thank') || t.includes('success') || t.includes('submit')) {
      log('BestProsInTown.com', 'SUCCESS');
    } else if (t.includes('email') && t.includes('verif')) {
      log('BestProsInTown.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('BestProsInTown.com', 'CHECK', 'URL: ' + result.url + ' text: ' + result.text.substring(0, 60));
    }
  } catch (e) {
    log('BestProsInTown.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── Homestars.com — Free business profile ─────────────────────────────────────
async function doHomestars(pg) {
  console.log('\n── Homestars.com');
  try {
    await pg.goto('https://homestars.com/companies/create', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(4000);

    const state = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 400),
      inputs: Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select')).filter(el => el.offsetParent !== null).map(el => ({
        type: el.type, name: el.name, id: el.id, placeholder: el.placeholder, label: el.labels?.[0]?.innerText,
      })),
    }));
    console.log('  URL:', state.url);
    console.log('  Title:', state.title);
    console.log('  Text:', state.text.substring(0, 200));
    console.log('  Inputs:', JSON.stringify(state.inputs));

    if (state.inputs.length === 0) {
      // Try business signup URL
      await pg.goto('https://homestars.com/business/sign-up', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
      await sleep(3000);
      const st2 = await pg.evaluate(() => ({
        url: window.location.href,
        text: document.body.innerText.substring(0, 300),
        inputs: Array.from(document.querySelectorAll('input:not([type=hidden])')).filter(el => el.offsetParent !== null).map(el => ({ name: el.name, type: el.type, placeholder: el.placeholder })),
      }));
      console.log('  Signup URL:', st2.url, '| inputs:', JSON.stringify(st2.inputs));
    }

    const curState = await pg.evaluate(() => ({
      url: window.location.href,
      inputs: Array.from(document.querySelectorAll('input:not([type=hidden]), textarea')).filter(el => el.offsetParent !== null).map(el => ({
        type: el.type, name: el.name, id: el.id, placeholder: el.placeholder,
      })),
    }));

    if (curState.inputs.length === 0) {
      log('Homestars.com', 'CHECK', 'No registration form found — visit manually: homestars.com/business → free profile');
      return;
    }

    // Fill
    for (const input of curState.inputs) {
      const sel = input.id ? `#${input.id}` : input.name ? `[name="${input.name}"]` : null;
      if (!sel) continue;
      const key = (input.name || input.id || input.placeholder || '').toLowerCase();
      let val = null;
      if (key.includes('email')) val = BIZ.email;
      else if (key.includes('password') || key.includes('pwd')) val = BIZ.password;
      else if (key.includes('first') || key.includes('fname')) val = BIZ.firstName;
      else if (key.includes('last') || key.includes('lname')) val = BIZ.lastName;
      else if (key.includes('company') || key.includes('business') || (key.includes('name') && !key.includes('first') && !key.includes('last'))) val = BIZ.name;
      else if (key.includes('phone') || key.includes('tel')) val = BIZ.phone;
      else if (key.includes('city')) val = BIZ.city;
      else if (key.includes('postal') || key.includes('zip')) val = BIZ.postal;
      if (val) await setVal(pg, sel, val);
    }

    await sleep(1000);

    const clicked = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[type=submit], input[type=submit], button')).filter(b => b.offsetParent !== null);
      const regBtn = btns.find(b => {
        const t = (b.innerText || b.value || '').toLowerCase();
        return t.includes('create') || t.includes('sign up') || t.includes('register') || t.includes('join') || t.includes('next');
      });
      if (regBtn) { regBtn.click(); return regBtn.innerText || regBtn.value; }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(8000);

    const result = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 500),
    }));
    const t = result.text.toLowerCase();
    if (t.includes('thank') || t.includes('success') || t.includes('welcome') || t.includes('verify') || t.includes('confirm')) {
      log('Homestars.com', 'NEEDS_EMAIL', 'Check info@asads.ca for activation/welcome email');
    } else {
      log('Homestars.com', 'CHECK', 'URL: ' + result.url + ' text: ' + result.text.substring(0, 80));
    }
  } catch (e) {
    log('Homestars.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── MapleLeafWeb.com / LocalsConnect.ca ──────────────────────────────────────
async function doExtraDir(pg, name, url) {
  console.log(`\n── ${name}`);
  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await sleep(3000);

    const state = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 300),
      inputs: Array.from(document.querySelectorAll('input:not([type=hidden]), textarea')).filter(el => el.offsetParent !== null).length,
    }));
    console.log('  URL:', state.url, '| inputs:', state.inputs);
    console.log('  Text:', state.text.substring(0, 150));

    if (state.inputs < 2) {
      log(name, 'CHECK', 'No form — visit manually: ' + url);
      return;
    }

    // Fill form
    const filled = await pg.evaluate((biz) => {
      let n = 0;
      Array.from(document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=radio]):not([type=checkbox]), textarea')).forEach(el => {
        if (!el.offsetParent) return;
        const key = (el.name || el.id || el.placeholder || '').toLowerCase();
        let val = null;
        if (key.includes('name') || key.includes('company') || key.includes('business')) val = biz.name;
        else if (key.includes('email')) val = biz.email;
        else if (key.includes('phone') || key.includes('tel')) val = biz.phone;
        else if (key.includes('web') || key.includes('url')) val = biz.website;
        else if (key.includes('city')) val = biz.city;
        else if (key.includes('address')) val = biz.address;
        else if (key.includes('postal') || key.includes('zip')) val = biz.postal;
        else if (key.includes('desc') || key.includes('about')) val = biz.description.substring(0, 200);
        if (val) { el.value = val; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); n++; }
      });
      return n;
    }, BIZ);
    console.log('  Filled:', filled);
    await sleep(1000);

    const clicked = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b => b.offsetParent !== null);
      if (btn) { btn.click(); return btn.innerText || btn.value || 'button'; }
      return null;
    });
    console.log('  Clicked:', clicked);
    await sleep(7000);

    const result = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 200) }));
    const t = result.text.toLowerCase();
    if (t.includes('thank') || t.includes('success') || t.includes('submit')) {
      log(name, 'SUCCESS');
    } else if (t.includes('email') && t.includes('verif')) {
      log(name, 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log(name, 'CHECK', 'URL: ' + result.url + ' text: ' + result.text.substring(0, 60));
    }
  } catch (e) {
    log(name, 'ERROR', e.message.substring(0, 80));
  }
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('❌ Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  console.log('🔄 Remaining Directories\n');

  await doCanadianBizDir(pg);
  await doBestProsInTown(pg);
  await doHomestars(pg);
  await doExtraDir(pg, 'LocalsConnect.ca', 'https://www.localsconnect.ca/submit-business/');
  await doExtraDir(pg, 'Cylex.ca', 'https://ca.cylex.com/register/');

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  FULL DIRECTORY SUBMISSION STATUS');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('✅  B2BCo.com — Registered + logged in');
  console.log('✅  ProfileCanada.com — Submitted (pending review)');
  console.log('📧  Fyple.ca — Verify via info@asads.ca');
  console.log('📧  411.ca / YP Canada — Verify via info@asads.ca');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
