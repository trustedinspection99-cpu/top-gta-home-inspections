/**
 * directory-submit.mjs
 * Auto-submits ASADS Home Inspection to Canadian business directories.
 * Run: node scripts/directory-submit.mjs
 * Requires: Chrome open and logged into Semrush (same setup as other scripts)
 */

import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── ASADS Business Info ────────────────────────────────────────────────────────
const BIZ = {
  name:        'ASADS Home Inspection',
  phone:       '647-801-9311',
  phoneClean:  '6478019311',
  email:       'info@asads.ca',
  website:     'https://www.asads.ca',
  address:     '45 Duckworth Rd',
  city:        'Cambridge',
  province:    'Ontario',
  provinceAbb: 'ON',
  postal:      'N3H 0C1',
  country:     'Canada',
  category:    'Home Inspection',
  description: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, mold, asbestos, radon & thermal imaging inspections. Same-day digital reports. Licensed & insured.',
  keywords:    'home inspection, home inspector, pre-purchase inspection, mold inspection, asbestos testing, thermal imaging, Ontario',
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
  const icon = status === 'SUCCESS' ? '✅' : status === 'NEEDS_EMAIL' ? '📧' : status === 'SKIP' ? '⏭' : '⚠️';
  console.log(`${icon} ${site}: ${status}${note ? ' — ' + note : ''}`);
}

// ── 1. BestProsInTown.com ─────────────────────────────────────────────────────
async function submitBestProsInTown(pg) {
  console.log('\n── BestProsInTown.com');
  try {
    await pg.goto('https://www.bestprosintown.com/addbusiness.php', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Fill: Business Name, Address, Email (only required fields)
    await pg.evaluate((biz) => {
      const inputs = document.querySelectorAll('input, textarea');
      for (const inp of inputs) {
        const name = (inp.name || inp.id || inp.placeholder || '').toLowerCase();
        if (name.includes('name') || name.includes('business')) inp.value = biz.name;
        else if (name.includes('address')) inp.value = biz.address + ', ' + biz.city + ', ' + biz.provinceAbb;
        else if (name.includes('email')) inp.value = biz.email;
        else if (name.includes('phone')) inp.value = biz.phone;
        else if (name.includes('web') || name.includes('url') || name.includes('site')) inp.value = biz.website;
      }
    }, BIZ);
    await sleep(1000);

    // Submit
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, input[type="submit"]'))
        .find(b => (b.innerText || b.value || '').toLowerCase().includes('submit') || (b.innerText || b.value || '').toLowerCase().includes('add'));
      if (btn) btn.click();
    });
    await sleep(4000);

    const pageText = await pg.evaluate(() => document.body.innerText.substring(0, 300));
    if (pageText.toLowerCase().includes('thank') || pageText.toLowerCase().includes('success') || pageText.toLowerCase().includes('received')) {
      log('BestProsInTown.com', 'SUCCESS', 'Submitted — 3-4 month review queue (or pay for priority)');
    } else {
      log('BestProsInTown.com', 'CHECK', pageText.substring(0, 100));
    }
  } catch (e) {
    log('BestProsInTown.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── 2. DIYoffer.ca ────────────────────────────────────────────────────────────
async function submitDIYoffer(pg) {
  console.log('\n── DIYoffer.ca');
  try {
    await pg.goto('https://diyoffer.ca/submit-your-business/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    await pg.evaluate((biz) => {
      function fill(selector, value) {
        const el = document.querySelector(selector);
        if (el) { el.value = value; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }
      }
      function fillByLabel(text, value) {
        const labels = Array.from(document.querySelectorAll('label'));
        const label = labels.find(l => (l.innerText || '').toLowerCase().includes(text.toLowerCase()));
        if (label) {
          const forId = label.getAttribute('for');
          const inp = forId ? document.getElementById(forId) : label.querySelector('input, select, textarea');
          if (inp) { inp.value = value; inp.dispatchEvent(new Event('input', { bubbles: true })); inp.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }

      // Try all inputs by label/name
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      for (const inp of inputs) {
        const key = (inp.name || inp.id || inp.placeholder || inp.getAttribute('aria-label') || '').toLowerCase();
        if (key.includes('business') && key.includes('name')) inp.value = biz.name;
        else if (key === 'name' || key.includes('company')) inp.value = biz.name;
        else if (key.includes('specialty') || key.includes('service')) inp.value = biz.category;
        else if (key.includes('phone') && !key.includes('cell')) inp.value = biz.phone;
        else if (key.includes('cell') || key.includes('mobile')) inp.value = biz.phone;
        else if (key.includes('web') || key.includes('url') || key.includes('site')) inp.value = biz.website;
        else if (key.includes('email')) inp.value = biz.email;
        else if (key.includes('address') && !key.includes('2')) inp.value = biz.address;
        else if (key.includes('city') || key.includes('town')) inp.value = biz.city;
        else if (key.includes('postal') || key.includes('zip') || key.includes('code')) inp.value = biz.postal;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Province/state selects
      const selects = Array.from(document.querySelectorAll('select'));
      for (const sel of selects) {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('province') || key.includes('state') || key.includes('region')) {
          const opt = Array.from(sel.options).find(o => o.value === 'ON' || o.text.includes('Ontario'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    }, BIZ);
    await sleep(2000);

    // Submit
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
        .find(b => {
          const t = (b.innerText || b.value || '').toLowerCase();
          return t.includes('submit') || t.includes('add') || t.includes('save') || t.includes('send');
        });
      if (btn) btn.click();
    });
    await sleep(5000);

    const pageText = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (pageText.toLowerCase().includes('thank') || pageText.toLowerCase().includes('success') || pageText.toLowerCase().includes('submitt')) {
      log('DIYoffer.ca', 'SUCCESS', 'Submitted successfully');
    } else {
      log('DIYoffer.ca', 'CHECK', 'Verify manually — ' + pageText.substring(0, 80));
    }
  } catch (e) {
    log('DIYoffer.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── 3. ThreeBestRated.ca ──────────────────────────────────────────────────────
async function submitThreeBestRated(pg) {
  console.log('\n── ThreeBestRated.ca (nomination)');
  try {
    await pg.goto('https://threebestrated.ca/submit-business?reason=new', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    await pg.evaluate((biz) => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      for (const inp of inputs) {
        const key = (inp.name || inp.id || inp.placeholder || inp.getAttribute('aria-label') || '').toLowerCase();
        if (key.includes('business') && key.includes('name')) inp.value = biz.name;
        else if (key.includes('name') && !key.includes('last') && !key.includes('first')) inp.value = biz.name;
        else if (key.includes('first')) inp.value = 'Asad';
        else if (key.includes('last')) inp.value = 'S';
        else if (key.includes('phone')) inp.value = biz.phone;
        else if (key.includes('email')) inp.value = biz.email;
        else if (key.includes('web') || key.includes('url')) inp.value = biz.website;
        else if (key.includes('city')) inp.value = biz.city;
        else if (key.includes('address')) inp.value = biz.address + ', ' + biz.city + ', ' + biz.provinceAbb;
        else if (key.includes('desc') || key.includes('message') || key.includes('about')) inp.value = biz.description;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }
      // Province/category selects
      const selects = Array.from(document.querySelectorAll('select'));
      for (const sel of selects) {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('province') || key.includes('state')) {
          const opt = Array.from(sel.options).find(o => o.value === 'ON' || o.text.includes('Ontario'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
        if (key.includes('cat') || key.includes('type')) {
          const opt = Array.from(sel.options).find(o => o.text.toLowerCase().includes('inspect') || o.text.toLowerCase().includes('home'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    }, BIZ);
    await sleep(2000);

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
        .find(b => {
          const t = (b.innerText || b.value || '').toLowerCase();
          return t.includes('submit') || t.includes('nominate') || t.includes('send');
        });
      if (btn) btn.click();
    });
    await sleep(5000);

    const pageText = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (pageText.toLowerCase().includes('thank') || pageText.toLowerCase().includes('success') || pageText.toLowerCase().includes('received')) {
      log('ThreeBestRated.ca', 'SUCCESS', 'Nomination submitted — they review manually, no guarantee');
    } else {
      log('ThreeBestRated.ca', 'CHECK', 'Verify manually — ' + pageText.substring(0, 100));
    }
  } catch (e) {
    log('ThreeBestRated.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── 4. CanadianBusinessDirectory.ca ───────────────────────────────────────────
async function submitCanadianBizDir(pg) {
  console.log('\n── CanadianBusinessDirectory.ca');
  try {
    await pg.goto('https://www.canadianbusinessdirectory.ca/login.php', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Check if it's a registration or login page
    const pageText = await pg.evaluate(() => document.body.innerText.substring(0, 500));
    const isReg = pageText.toLowerCase().includes('register') || pageText.toLowerCase().includes('first name') || pageText.toLowerCase().includes('create');

    if (isReg) {
      await pg.evaluate((biz) => {
        const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
        for (const inp of inputs) {
          const key = (inp.name || inp.id || inp.placeholder || '').toLowerCase();
          if (key.includes('first')) inp.value = 'Asad';
          else if (key.includes('last')) inp.value = 'S';
          else if (key.includes('email')) inp.value = biz.email;
          else if (key.includes('business') && key.includes('name')) inp.value = biz.name;
          else if (key.includes('phone')) inp.value = biz.phone;
          else if (key.includes('postal') || key.includes('zip')) inp.value = biz.postal;
          else if (key.includes('city')) inp.value = biz.city;
          else if (key.includes('address')) inp.value = biz.address;
          else if (key.includes('desc') || key.includes('about')) inp.value = biz.description.substring(0, 255);
          else if (key.includes('keyword')) inp.value = biz.keywords.substring(0, 255);
          inp.dispatchEvent(new Event('input', { bubbles: true }));
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        }
        // Province selects
        const selects = Array.from(document.querySelectorAll('select'));
        for (const sel of selects) {
          const key = (sel.name || sel.id || '').toLowerCase();
          if (key.includes('province') || key.includes('prov')) {
            const opt = Array.from(sel.options).find(o => o.value === 'ON' || o.text.includes('Ontario'));
            if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
          }
          if (key.includes('cat')) {
            const opt = Array.from(sel.options).find(o => o.text.toLowerCase().includes('real estate') || o.text.toLowerCase().includes('home') || o.text.toLowerCase().includes('service'));
            if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
          }
        }
      }, BIZ);
      await sleep(2000);

      await pg.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button, input[type="submit"]'))
          .find(b => (b.innerText || b.value || '').toLowerCase().includes('submit') || (b.innerText || b.value || '').toLowerCase().includes('register'));
        if (btn) btn.click();
      });
      await sleep(5000);

      const result = await pg.evaluate(() => document.body.innerText.substring(0, 300));
      if (result.toLowerCase().includes('verif') || result.toLowerCase().includes('email')) {
        log('CanadianBusinessDirectory.ca', 'NEEDS_EMAIL', 'Check info@asads.ca for verification code');
      } else if (result.toLowerCase().includes('thank') || result.toLowerCase().includes('success')) {
        log('CanadianBusinessDirectory.ca', 'SUCCESS');
      } else {
        log('CanadianBusinessDirectory.ca', 'CHECK', result.substring(0, 100));
      }
    } else {
      log('CanadianBusinessDirectory.ca', 'CHECK', 'Page structure unexpected — manual visit needed');
    }
  } catch (e) {
    log('CanadianBusinessDirectory.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── 5. B2BCo.com ──────────────────────────────────────────────────────────────
async function submitB2BCo(pg) {
  console.log('\n── B2BCo.com');
  try {
    await pg.goto('https://www.b2bco.com/p/register/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    await pg.evaluate((biz) => {
      const inputs = Array.from(document.querySelectorAll('input, textarea'));
      for (const inp of inputs) {
        const key = (inp.name || inp.id || inp.type || inp.placeholder || '').toLowerCase();
        if (key.includes('email')) inp.value = biz.email;
        else if (key === 'password' || key.includes('pass')) inp.value = 'ASADS2026!';
        else if (key.includes('name') && !key.includes('user')) inp.value = biz.name;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }
      // Check terms checkbox
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => { if (!cb.checked) cb.click(); });
    }, BIZ);
    await sleep(1000);

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
        .find(b => (b.innerText || b.value || '').toLowerCase().includes('register') || (b.innerText || b.value || '').toLowerCase().includes('join') || (b.innerText || b.value || '').toLowerCase().includes('sign up'));
      if (btn) btn.click();
    });
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('confirm') || result.toLowerCase().includes('email') || result.toLowerCase().includes('verif')) {
      log('B2BCo.com', 'NEEDS_EMAIL', 'Check info@asads.ca to click confirmation link');
    } else if (result.toLowerCase().includes('success') || result.toLowerCase().includes('thank') || result.toLowerCase().includes('welcome')) {
      log('B2BCo.com', 'SUCCESS');
    } else {
      log('B2BCo.com', 'CHECK', result.substring(0, 100));
    }
  } catch (e) {
    log('B2BCo.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── 6. Fyple.ca ───────────────────────────────────────────────────────────────
async function submitFyple(pg) {
  console.log('\n── Fyple.ca');
  try {
    await pg.goto('https://www.fyple.ca/addcompany/addcompany/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    const url = pg.url();
    // May redirect to login
    if (url.includes('login') || url.includes('sign')) {
      // Try registering first
      await pg.goto('https://www.fyple.ca/register/', { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(3000);
    }

    await pg.evaluate((biz) => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      for (const inp of inputs) {
        const key = (inp.name || inp.id || inp.placeholder || '').toLowerCase();
        if (key.includes('email')) inp.value = biz.email;
        else if (key.includes('password') || key === 'pass') inp.value = 'ASADS2026!';
        else if (key.includes('name') || key.includes('company')) inp.value = biz.name;
        else if (key.includes('phone')) inp.value = biz.phone;
        else if (key.includes('web') || key.includes('url')) inp.value = biz.website;
        else if (key.includes('address')) inp.value = biz.address;
        else if (key.includes('city')) inp.value = biz.city;
        else if (key.includes('postal') || key.includes('zip')) inp.value = biz.postal;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => { if (!cb.checked) cb.click(); });
    }, BIZ);
    await sleep(2000);

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
        .find(b => {
          const t = (b.innerText || b.value || '').toLowerCase();
          return t.includes('register') || t.includes('submit') || t.includes('add') || t.includes('create') || t.includes('continue');
        });
      if (btn) btn.click();
    });
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('verif') || result.toLowerCase().includes('confirm') || result.toLowerCase().includes('email sent')) {
      log('Fyple.ca', 'NEEDS_EMAIL', 'Check info@asads.ca to verify account');
    } else if (result.toLowerCase().includes('success') || result.toLowerCase().includes('thank') || result.toLowerCase().includes('listed')) {
      log('Fyple.ca', 'SUCCESS');
    } else {
      log('Fyple.ca', 'CHECK', result.substring(0, 100));
    }
  } catch (e) {
    log('Fyple.ca', 'ERROR', e.message.substring(0, 80));
  }
}

// ── 7. ProfileCanada.com ──────────────────────────────────────────────────────
async function submitProfileCanada(pg) {
  console.log('\n── ProfileCanada.com');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    await pg.evaluate((biz) => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      for (const inp of inputs) {
        const key = (inp.name || inp.id || inp.placeholder || '').toLowerCase();
        if (key.includes('business') || key.includes('company')) inp.value = biz.name;
        else if (key.includes('city')) inp.value = biz.city;
        else if (key.includes('address')) inp.value = biz.address;
        else if (key.includes('postal') || key.includes('zip')) inp.value = biz.postal;
        else if (key.includes('phone')) inp.value = biz.phone;
        else if (key.includes('email')) inp.value = biz.email;
        else if (key.includes('relationship') || key.includes('title')) inp.value = 'Owner';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const selects = Array.from(document.querySelectorAll('select'));
      for (const sel of selects) {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('province') || key.includes('prov')) {
          const opt = Array.from(sel.options).find(o => o.value === 'ON' || o.text.includes('Ontario'));
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      }
    }, BIZ);
    await sleep(2000);

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
        .find(b => {
          const t = (b.innerText || b.value || '').toLowerCase();
          return t.includes('submit') || t.includes('next') || t.includes('continue') || t.includes('add');
        });
      if (btn) btn.click();
    });
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('step 2') || result.toLowerCase().includes('next') || result.toLowerCase().includes('success')) {
      log('ProfileCanada.com', 'SUCCESS', 'Step 1 submitted — may need further steps');
    } else if (result.toLowerCase().includes('email') || result.toLowerCase().includes('verif')) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else {
      log('ProfileCanada.com', 'CHECK', result.substring(0, 120));
    }
  } catch (e) {
    log('ProfileCanada.com', 'ERROR', e.message.substring(0, 80));
  }
}

// ── 8. 411.ca (YP Canada) ─────────────────────────────────────────────────────
async function submit411(pg) {
  console.log('\n── 411.ca / YP Canada');
  try {
    await pg.goto('https://solutions.yp.ca/free-listing', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    const url = pg.url();
    const title = await pg.title();

    await pg.evaluate((biz) => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      for (const inp of inputs) {
        const key = (inp.name || inp.id || inp.placeholder || inp.getAttribute('aria-label') || '').toLowerCase();
        if (key.includes('business') || key.includes('company')) inp.value = biz.name;
        else if (key.includes('email')) inp.value = biz.email;
        else if (key.includes('password') || key === 'pass') inp.value = 'ASADS2026!';
        else if (key.includes('phone')) inp.value = biz.phone;
        else if (key.includes('web') || key.includes('url')) inp.value = biz.website;
        else if (key.includes('address')) inp.value = biz.address;
        else if (key.includes('city')) inp.value = biz.city;
        else if (key.includes('postal') || key.includes('zip')) inp.value = biz.postal;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, BIZ);
    await sleep(2000);

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button'))
        .find(b => {
          const t = (b.innerText || b.value || '').toLowerCase();
          return t.includes('get started') || t.includes('submit') || t.includes('claim') || t.includes('list') || t.includes('next') || t.includes('continue');
        });
      if (btn) btn.click();
    });
    await sleep(5000);

    const result = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    if (result.toLowerCase().includes('verif') || result.toLowerCase().includes('email') || result.toLowerCase().includes('confirm')) {
      log('411.ca / YP Canada', 'NEEDS_EMAIL', 'Check info@asads.ca to verify');
    } else if (result.toLowerCase().includes('success') || result.toLowerCase().includes('thank') || result.toLowerCase().includes('listed')) {
      log('411.ca / YP Canada', 'SUCCESS');
    } else {
      log('411.ca / YP Canada', 'CHECK', 'URL: ' + url + ' | ' + result.substring(0, 80));
    }
  } catch (e) {
    log('411.ca / YP Canada', 'ERROR', e.message.substring(0, 80));
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!await checkPort(DEBUG_PORT)) {
    console.error('❌ Chrome not running on port 9222. Open Chrome first.');
    return;
  }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  console.log('🚀 Starting directory submissions for ASADS Home Inspection\n');

  await submitBestProsInTown(pg);
  await submitDIYoffer(pg);
  await submitThreeBestRated(pg);
  await submitCanadianBizDir(pg);
  await submitB2BCo(pg);
  await submitFyple(pg);
  await submitProfileCanada(pg);
  await submit411(pg);

  browser.disconnect();

  console.log('\n\n══════════════════════════════════════════');
  console.log('  SUBMISSION SUMMARY');
  console.log('══════════════════════════════════════════');
  results.forEach(r => {
    const icon = r.status === 'SUCCESS' ? '✅' : r.status === 'NEEDS_EMAIL' ? '📧' : r.status === 'SKIP' ? '⏭' : '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}`);
    if (r.note) console.log(`    → ${r.note}`);
  });

  const needsEmail = results.filter(r => r.status === 'NEEDS_EMAIL');
  if (needsEmail.length) {
    console.log('\n📧 CHECK EMAIL: info@asads.ca for verification emails from:');
    needsEmail.forEach(r => console.log(`   - ${r.site}`));
  }

  console.log('\n⚠️  Sites requiring manual action (paid/credentialed):');
  console.log('   - nachi.org → Complete InterNACHI member profile at nachi.org');
  console.log('   - cahpi.ca  → Apply for CAHPI membership at cahpi.ca');
  console.log('   - certifiedmasterinspector.org → Get CMI designation then list');
  console.log('   - homestars.com → Create/claim free profile at homestars.com');
  console.log('   - oahi.com  → Get OAHI membership (inspector association)');
  console.log('   - app.spectora.com → Create Spectora profile (free tier available)');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
