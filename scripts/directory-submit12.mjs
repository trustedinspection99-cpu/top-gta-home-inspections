/**
 * directory-submit12.mjs — Round 12:
 * ProfileCanada — real browser automation:
 *   1) Type in locationCity to trigger autocomplete
 *   2) Select from dropdown
 *   3) Continue through all 3 steps
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
  console.log('\n── ProfileCanada.com — Round 12 (browser autocomplete)');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);

    // Fill businessName
    await pg.click('#businessName');
    await sleep(300);
    await pg.evaluate(() => {
      const el = document.querySelector('#businessName');
      el.value = '';
    });
    await pg.type('#businessName', BIZ.name, { delay: 50 });
    await pg.keyboard.press('Tab');
    await sleep(500);

    // Fill address
    await pg.click('#address');
    await sleep(300);
    await pg.evaluate(() => { document.querySelector('#address').value = ''; });
    await pg.type('#address', BIZ.address, { delay: 50 });
    await pg.keyboard.press('Tab');
    await sleep(500);

    // Fill postal
    await pg.click('#postal');
    await sleep(300);
    await pg.evaluate(() => { document.querySelector('#postal').value = ''; });
    await pg.type('#postal', BIZ.postal, { delay: 50 });
    await pg.keyboard.press('Tab');
    await sleep(800);

    // Fill phone
    await pg.click('#phone');
    await sleep(300);
    await pg.evaluate(() => { document.querySelector('#phone').value = ''; });
    await pg.type('#phone', BIZ.phone, { delay: 50 });
    await pg.keyboard.press('Tab');
    await sleep(500);

    // Fill website
    await pg.click('#website');
    await sleep(300);
    await pg.evaluate(() => { document.querySelector('#website').value = ''; });
    await pg.type('#website', BIZ.website, { delay: 50 });
    await pg.keyboard.press('Tab');
    await sleep(500);

    // Fill business description
    await pg.click('[name="businessDescription"]');
    await sleep(300);
    await pg.evaluate(() => { document.querySelector('[name="businessDescription"]').value = ''; });
    await pg.type('[name="businessDescription"]', BIZ.description.substring(0, 200), { delay: 30 });
    await sleep(500);

    // Click owner radio
    await pg.click('#owner');
    await sleep(500);

    // The tricky part: locationCity with autocomplete
    console.log('  Typing in locationCity field...');
    await pg.click('#locationCity');
    await sleep(500);
    // Clear existing value
    await pg.evaluate(() => { document.querySelector('#locationCity').value = ''; });
    await sleep(200);

    // Type slowly to trigger autocomplete
    await pg.type('#locationCity', 'Cam', { delay: 150 });
    await sleep(2000);

    // Check for autocomplete dropdown
    const autocomplete = await pg.evaluate(() => {
      // Look for UI autocomplete, jQuery UI, or custom dropdown
      const dropdowns = document.querySelectorAll('.ui-autocomplete, .autocomplete, [class*="autocomplete"], [class*="dropdown"], .ui-menu, [id*="autocomplete"]');
      const allVisible = Array.from(dropdowns).filter(el => el.offsetParent !== null);
      return {
        count: dropdowns.length,
        visible: allVisible.length,
        items: allVisible.length > 0 ? Array.from(allVisible[0].querySelectorAll('li, div, a')).map(el => ({
          text: el.innerText?.substring(0, 50),
          classes: typeof el.className === 'string' ? el.className : '',
        })) : [],
        allDropdownTexts: Array.from(dropdowns).map(d => d.innerText?.substring(0, 100)),
      };
    });
    console.log('  Autocomplete:', JSON.stringify(autocomplete));

    if (autocomplete.visible > 0 && autocomplete.items.length > 0) {
      // Click the first matching "Cambridge" option
      const clicked = await pg.evaluate(() => {
        const dropdowns = document.querySelectorAll('.ui-autocomplete, .autocomplete, [class*="autocomplete"], [class*="dropdown"], .ui-menu, [id*="autocomplete"]');
        for (const dropdown of dropdowns) {
          if (dropdown.offsetParent === null) continue;
          const items = dropdown.querySelectorAll('li, div[onclick], a');
          for (const item of items) {
            const t = (item.innerText || item.textContent || '').toLowerCase();
            if (t.includes('cambridge') && (t.includes('ontario') || t.includes('on'))) {
              item.click();
              return 'Clicked: ' + item.innerText?.substring(0, 50);
            }
          }
          // Just click first item if no exact match
          if (items.length > 0) {
            items[0].click();
            return 'First item: ' + items[0].innerText?.substring(0, 50);
          }
        }
        return 'No items found';
      });
      console.log('  Autocomplete click:', clicked);
    } else {
      // Try typing more and checking again
      console.log('  No autocomplete visible. Typing more...');
      await pg.type('#locationCity', 'bridge', { delay: 150 });
      await sleep(2000);

      const ac2 = await pg.evaluate(() => {
        const dropdowns = document.querySelectorAll('.ui-autocomplete, [class*="autocomplete"], .ui-menu, ul[role="listbox"]');
        const allVisible = Array.from(dropdowns).filter(el => el.offsetParent !== null);
        return {
          visible: allVisible.length,
          items: allVisible.length > 0 ? Array.from(allVisible[0].querySelectorAll('li, div')).map(el => el.innerText?.substring(0, 50)) : [],
        };
      });
      console.log('  Autocomplete (2nd attempt):', JSON.stringify(ac2));

      if (ac2.visible > 0 && ac2.items.length > 0) {
        await pg.keyboard.press('ArrowDown');
        await sleep(300);
        await pg.keyboard.press('Enter');
        console.log('  Selected via keyboard');
      } else {
        // Try triggering the onBlur manually after setting value
        console.log('  Trying to trigger onBlureCheckLocation manually...');
        const triggerResult = await pg.evaluate(() => {
          const cityField = document.querySelector('#locationCity');
          if (!cityField) return 'no field';

          // Try to find the location via the internal API
          // First, look for what XHR calls are made
          const originalFetch = window.fetch;
          const calls = [];
          window.fetch = function(...args) {
            calls.push(args[0]);
            return originalFetch.apply(this, args);
          };

          // Trigger blur
          cityField.dispatchEvent(new Event('blur', { bubbles: true }));
          cityField.dispatchEvent(new Event('focusout', { bubbles: true }));

          setTimeout(() => { window.fetch = originalFetch; }, 3000);
          return 'triggered blur, tracked fetch calls: will check';
        });
        console.log('  Trigger result:', triggerResult);
        await sleep(3000);

        // Check if any validation error appeared
        const errMsg = await pg.evaluate(() => {
          const err = document.querySelector('#sp_login_error, .classErrorMsg, [id*="error"]');
          return err?.innerText || 'no error shown';
        });
        console.log('  Error message:', errMsg);
      }
    }

    await sleep(1000);

    // Check city field value
    const cityVal = await pg.evaluate(() => document.querySelector('#locationCity')?.value);
    console.log('  City field value:', cityVal);

    // Now try to intercept what city validation is looking for
    console.log('  Intercepting network to find city validation endpoint...');
    const networkCalls = [];
    pg.on('request', req => {
      if (req.url().includes('profilecanada') && !req.url().includes('.gif') && !req.url().includes('.js') && !req.url().includes('.css')) {
        networkCalls.push({ url: req.url(), method: req.method(), body: req.postData() });
      }
    });

    // Click city field again and trigger autocomplete
    await pg.click('#locationCity');
    await sleep(300);
    await pg.evaluate(() => {
      const el = document.querySelector('#locationCity');
      el.value = '';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await pg.type('#locationCity', 'Cambridge', { delay: 100 });
    await sleep(3000);

    // Trigger blur
    await pg.keyboard.press('Tab');
    await sleep(2000);

    console.log('  Network calls during city input:', JSON.stringify(networkCalls.slice(-5)));

    // Check error state
    const afterCity = await pg.evaluate(() => {
      return {
        cityVal: document.querySelector('#locationCity')?.value,
        errorMsg: document.querySelector('#sp_login_error, .classErrorMsg')?.innerText,
        imgCity: document.querySelector('#img_locationCity')?.src,
      };
    });
    console.log('  After city input:', JSON.stringify(afterCity));

    // Try clicking Continue regardless
    console.log('\n  Clicking Continue (submitStep1)...');
    await pg.evaluate(() => {
      const continueBtn = Array.from(document.querySelectorAll('div, button')).find(el =>
        (el.innerText || '').trim().toLowerCase() === 'continue'
      );
      if (continueBtn) continueBtn.click();
    });
    await sleep(8000);

    const state = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 500),
    }));
    console.log('  After Continue URL:', state.url);
    console.log('  After Continue title:', state.title);
    console.log('  After Continue text:', state.text.substring(0, 300));

    const t = state.text.toLowerCase();
    if (state.title.includes('Step 2') || t.includes('step 2') || t.includes('email') && t.includes('confirm')) {
      console.log('  Reached Step 2! Filling email...');
      // Fill step 2 (email validation step)
      await pg.evaluate((email) => {
        const emailField = document.querySelector('#businessemail, [name="businessemail"]');
        if (emailField) { emailField.value = email; emailField.dispatchEvent(new Event('change', { bubbles: true })); }
      }, BIZ.email);
      await sleep(1000);
      await pg.evaluate(() => {
        if (typeof submitStep2 === 'function') submitStep2();
        else {
          const btn = document.querySelector('[onclick*="submitStep2"], .dv_login_profile_btn, input[type=submit]');
          if (btn) btn.click();
        }
      });
      await sleep(6000);

      const step2 = await pg.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        text: document.body.innerText.substring(0, 400),
      }));
      console.log('  Step 2 result:', step2.title, '|', step2.text.substring(0, 200));

      if (step2.text.toLowerCase().includes('step 3') || step2.text.toLowerCase().includes('verif')) {
        log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca to complete step 3 verification');
      } else if (step2.text.toLowerCase().includes('thank') || step2.text.toLowerCase().includes('success')) {
        log('ProfileCanada.com', 'SUCCESS');
      } else {
        log('ProfileCanada.com', 'CHECK', 'Step 2 done — URL: ' + step2.url);
      }
    } else if (t.includes('similar')) {
      log('ProfileCanada.com', 'CHECK', 'City validation blocking — visit manually: profilecanada.com/advertising/editlisting.cfm');
    } else if (t.includes('thank') || t.includes('success') || t.includes('complete')) {
      log('ProfileCanada.com', 'SUCCESS');
    } else {
      log('ProfileCanada.com', 'CHECK', 'URL: ' + state.url + ' title: ' + state.title);
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

  console.log('🔄 Round 12 — ProfileCanada browser autocomplete\n');

  await doProfileCanada(pg);

  browser.disconnect();

  console.log('\n\n════════════════════════════════════════════');
  console.log('  COMPLETE STATUS');
  console.log('════════════════════════════════════════════');
  console.log('✅  ThreeBestRated.ca — Nominated');
  console.log('✅  DIYoffer.ca — Submitted');
  console.log('📧  Fyple.ca — Check info@asads.ca');
  console.log('📧  411.ca / YP Canada — Check info@asads.ca');
  console.log('✅  B2BCo.com — Registered (confirmed)');
  results.forEach(r => {
    const icon = { SUCCESS: '✅', NEEDS_EMAIL: '📧', ERROR: '❌', CHECK: '⚠️' }[r.status] || '⚠️';
    console.log(`${icon}  ${r.site}: ${r.status}${r.note ? ' — ' + r.note : ''}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
