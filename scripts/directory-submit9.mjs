/**
 * directory-submit9.mjs — Round 9: ProfileCanada — read submitStep1 JS, fix radio, direct POST
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

async function doProfileCanada(pg) {
  console.log('\n── ProfileCanada.com — Round 9');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Step 1: Read the submitStep1 function code
    const jsCode = await pg.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script:not([src])')).map(s => s.innerText).join('\n');
      // Extract submitStep1 function
      const match = scripts.match(/function\s+submitStep1[\s\S]*?(?=\nfunction|\n\/\/|$)/);
      return {
        submitStep1: match ? match[0].substring(0, 2000) : null,
        allFunctions: scripts.match(/function\s+\w+/g),
        fullScript: scripts.substring(0, 3000),
      };
    });
    console.log('  submitStep1 function:');
    console.log(jsCode.submitStep1 || '  NOT FOUND');
    console.log('  All functions:', JSON.stringify(jsCode.allFunctions));

    // Step 2: Fill form with proper approach
    const fillResult = await pg.evaluate((biz) => {
      const form = document.querySelectorAll('form')[1];
      if (!form) return { error: 'no form[1]' };

      const log = [];

      // Set text inputs using native setter for React-style inputs
      function setInput(name, value) {
        const el = form.querySelector(`[name="${name}"]`);
        if (!el) { log.push(`MISSING: ${name}`); return; }
        // Try native setter first, then direct
        try {
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
            || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
          if (nativeSetter) nativeSetter.call(el, value);
          else el.value = value;
        } catch (_) { el.value = value; }
        el.dispatchEvent(new Event('focus', { bubbles: true }));
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
        log.push(`SET: ${name}=${value.substring(0, 25)}`);
      }

      setInput('businessName', biz.name);
      setInput('locationCity', biz.city);
      setInput('address', biz.address);
      setInput('postal', biz.postal);
      setInput('phone', biz.phone);
      setInput('website', biz.website);
      setInput('businessemail', biz.email);  // hidden
      setInput('businessDescription', biz.description.substring(0, 200));

      // Radio: click 'owner' properly
      const ownerRadio = form.querySelector('input[name="claimdby"][value="owner"]');
      if (ownerRadio) {
        ownerRadio.click();  // use click() not checked=true
        log.push('CLICKED: claimdby=owner, checked=' + ownerRadio.checked);
      } else {
        log.push('MISSING: claimdby radio');
      }

      // Province/category selects
      form.querySelectorAll('select').forEach(sel => {
        const key = (sel.name || sel.id || '').toLowerCase();
        if (key.includes('prov')) {
          const opt = Array.from(sel.options).find(o => o.text.includes('Ontario') || o.value === 'ON');
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); log.push('SET: province=' + opt.value); }
        }
        if (key.includes('cat')) {
          const opts = Array.from(sel.options);
          const opt = opts.find(o => o.text.toLowerCase().includes('inspect'))
            || opts.find(o => o.text.toLowerCase().includes('home'))
            || opts.find(o => o.text.toLowerCase().includes('real estate'))
            || opts.find(o => o.text.toLowerCase().includes('service'))
            || (opts.length > 1 ? opts[1] : null);
          if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); log.push('SET: category=' + opt.text); }
        }
      });

      // Read back all values to verify
      const verify = {};
      Array.from(form.elements).forEach(el => {
        if (!el.name) return;
        if (el.type === 'radio') {
          if (el.checked) verify[el.name] = el.value;
        } else {
          verify[el.name] = el.value.substring(0, 40);
        }
      });

      return { log, verify };
    }, BIZ);

    console.log('  Fill log:', fillResult.log?.join(' | '));
    console.log('  Verified values:', JSON.stringify(fillResult.verify));
    await sleep(1500);

    // Step 3: Try submitStep1() again, then fall back to direct form.submit()
    const submitted = await pg.evaluate(() => {
      // Try calling submitStep1 directly
      if (typeof submitStep1 === 'function') {
        try { submitStep1(); return 'submitStep1() called'; } catch (e) { return 'submitStep1 error: ' + e.message; }
      }

      // Try clicking the Continue button
      const continueBtn = Array.from(document.querySelectorAll('div, button, a, input')).find(el => {
        const t = (el.innerText || el.value || '').toLowerCase().trim();
        return t === 'continue' || t === 'submit' || t === 'next' || t === 'add business';
      });
      if (continueBtn) {
        continueBtn.click();
        return 'Clicked: ' + (continueBtn.innerText || continueBtn.value);
      }

      // Direct POST via form.submit()
      const form = document.querySelectorAll('form')[1];
      if (form) { form.submit(); return 'form.submit()'; }

      return 'nothing found';
    });
    console.log('  Submit method:', submitted);
    await sleep(8000);

    const result = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 800),
    }));
    console.log('  After URL:', result.url);
    console.log('  After text:', result.text.substring(0, 400));

    const t = result.text.toLowerCase();
    const url = result.url;

    if (t.includes('step 2') || url.includes('step=2') || url.includes('editlisting2') || url.includes('step2')) {
      log('ProfileCanada.com', 'SUCCESS', 'Step 1 complete — at step 2');
    } else if (t.includes('thank') || t.includes('success') || t.includes('listed') || t.includes('submitted')) {
      log('ProfileCanada.com', 'SUCCESS', 'Submitted!');
    } else if (t.includes('verif') || (t.includes('email') && t.includes('sent'))) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
    } else if (url !== 'https://www.profilecanada.com/advertising/editlisting.cfm') {
      log('ProfileCanada.com', 'CHECK', 'Navigated to: ' + url);
    } else {
      // Last resort: try raw fetch POST
      console.log('\n  Trying direct fetch POST...');
      const fetchResult = await pg.evaluate(async (biz) => {
        try {
          const body = new URLSearchParams({
            step: '2',
            cmp: '',
            tollFree: '',
            fax: '',
            businessemail: biz.email,
            businessDescription: biz.description.substring(0, 200),
            category: '',
            question1: '',
            question2: '',
            claimdby: 'owner',
            businessName: biz.name,
            locationCity: biz.city,
            address: biz.address + ', ' + biz.city + ', ' + biz.provinceAbb,
            postal: biz.postal,
            phone: biz.phone,
            website: biz.website,
          });
          const resp = await fetch('https://www.profilecanada.com/advertising/editlisting.cfm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
          });
          const html = await resp.text();
          return {
            status: resp.status,
            finalUrl: resp.url,
            bodySnippet: html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 500),
          };
        } catch (e) {
          return { error: e.message };
        }
      }, BIZ);
      console.log('  Fetch POST result:', JSON.stringify(fetchResult));

      const ft = (fetchResult.bodySnippet || '').toLowerCase();
      if (ft.includes('step 2') || ft.includes('thank') || ft.includes('success') || ft.includes('listed')) {
        log('ProfileCanada.com', 'SUCCESS', 'Direct POST succeeded');
      } else if (ft.includes('verif') || (ft.includes('email') && ft.includes('sent'))) {
        log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
      } else {
        log('ProfileCanada.com', 'CHECK', 'Visit manually: profilecanada.com/advertising/editlisting.cfm');
      }
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

  console.log('🔄 Round 9 — ProfileCanada direct submit fix\n');

  await doProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  COMPLETE STATUS');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('📧  Fyple.ca — Check info@asads.ca');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca');
  console.log('✅  B2BCo.com — Registered (logged in confirmed)');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
