/**
 * directory-submit10.mjs — Round 10:
 * ProfileCanada multi-step fetch:
 *   1) POST step 1 → get "similar businesses" page
 *   2) Parse → find "add new" option
 *   3) POST step 2 (add new) → confirmation
 * All done via fetch in the browser context (same-origin, cookies preserved)
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
  console.log('\n── ProfileCanada.com — Round 10 (multi-step fetch)');
  try {
    // Navigate to the form page first to get cookies/session
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // Step 1: POST the form data — let server return the "similar businesses" or step 2 page
    console.log('  Step 1: POSTing to editlisting.cfm...');
    const step1Result = await pg.evaluate(async (biz) => {
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
          address: biz.address,
          postal: biz.postal,
          phone: biz.phone,
          website: biz.website,
        });
        const resp = await fetch('https://www.profilecanada.com/advertising/editlisting.cfm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'https://www.profilecanada.com/advertising/editlisting.cfm',
          },
          body: body.toString(),
        });
        const html = await resp.text();
        const textContent = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                                .replace(/<style[\s\S]*?<\/style>/gi, '')
                                .replace(/<[^>]+>/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim();
        return {
          status: resp.status,
          url: resp.url,
          title: html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || '',
          textSnippet: textContent.substring(0, 1000),
          // Extract all form fields from the response
          forms: (() => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            return Array.from(doc.querySelectorAll('form')).map((f, i) => ({
              index: i,
              action: f.action,
              method: f.method,
              fields: Array.from(f.elements).map(el => ({
                name: el.name,
                type: el.type,
                value: el.value?.substring(0, 60),
                id: el.id,
              })).filter(el => el.name),
              buttons: Array.from(f.querySelectorAll('button, input[type=submit], input[type=button]')).map(b => b.value || b.innerText || b.type),
            }));
          })(),
          // Look for "add new" or "none" links/buttons
          addNewOptions: (() => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const allEls = Array.from(doc.querySelectorAll('a, button, input, div[onclick]'));
            return allEls
              .filter(el => {
                const t = (el.innerText || el.value || el.getAttribute('onclick') || el.href || '').toLowerCase();
                return t.includes('add') || t.includes('new') || t.includes('none') || t.includes('not listed') || t.includes('not found') || t.includes('create');
              })
              .map(el => ({
                tag: el.tagName,
                text: el.innerText?.substring(0, 50),
                value: el.value,
                href: el.href,
                onclick: el.getAttribute('onclick'),
              }));
          })(),
        };
      } catch (e) {
        return { error: e.message };
      }
    }, BIZ);

    console.log('  Step 1 response status:', step1Result.status);
    console.log('  Step 1 title:', step1Result.title);
    console.log('  Step 1 text:', step1Result.textSnippet?.substring(0, 400));
    console.log('  Step 1 forms:', JSON.stringify(step1Result.forms?.map(f => ({ action: f.action, fieldCount: f.fields.length, buttons: f.buttons }))));
    console.log('  Add-new options:', JSON.stringify(step1Result.addNewOptions));

    if (step1Result.error) {
      log('ProfileCanada.com', 'ERROR', step1Result.error.substring(0, 80));
      return;
    }

    const t1 = (step1Result.textSnippet || '').toLowerCase();

    // Check if step 1 already succeeded (thank you / confirmation)
    if (t1.includes('thank') || t1.includes('success') || t1.includes('listed') || t1.includes('submitted')) {
      log('ProfileCanada.com', 'SUCCESS', 'Submitted via fetch POST!');
      return;
    }

    if (t1.includes('email') && (t1.includes('verif') || t1.includes('sent'))) {
      log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
      return;
    }

    // Check if it's the "similar businesses" page
    const isSimilarBiz = t1.includes('similar') || t1.includes('match') || t1.includes('found') || step1Result.title.toLowerCase().includes('similar');

    console.log('\n  Is "similar businesses" page?', isSimilarBiz);
    console.log('  Full forms detail:');
    step1Result.forms?.forEach(f => {
      console.log(`    Form[${f.index}]: action=${f.action} | fields:`, JSON.stringify(f.fields));
    });

    // Now try step 2: look for the "add new" form or the email step
    // Find the form in step 1 response with the most fields or matching email/description
    const step2Form = step1Result.forms?.find(f =>
      f.fields.some(el => el.name === 'businessemail' || el.name === 'cmp' || el.name === 'step')
    );

    if (step2Form) {
      console.log('\n  Found step 2 form, fields:', JSON.stringify(step2Form.fields));

      // Build step 2 POST data from the form fields
      const step2Body = {};
      step2Form.fields.forEach(el => {
        if (el.type === 'hidden') step2Body[el.name] = el.value || '';
      });
      // Override/add our data
      step2Body.businessemail = BIZ.email;
      step2Body.tollFree = '';
      step2Body.fax = '';

      console.log('  Step 2 POST body:', JSON.stringify(step2Body));

      const step2Result = await pg.evaluate(async (formAction, body) => {
        try {
          const resp = await fetch(formAction, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Referer': 'https://www.profilecanada.com/advertising/editlisting.cfm',
            },
            body: new URLSearchParams(body).toString(),
          });
          const html = await resp.text();
          const text = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/\s+/g, ' ').trim().substring(0, 1000);
          return {
            status: resp.status,
            url: resp.url,
            title: html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || '',
            text,
          };
        } catch (e) {
          return { error: e.message };
        }
      }, step2Form.action || 'https://www.profilecanada.com/advertising/editlisting.cfm', step2Body);

      console.log('  Step 2 result:', step2Result.title, '|', step2Result.text?.substring(0, 200));

      const t2 = (step2Result.text || '').toLowerCase();
      if (t2.includes('thank') || t2.includes('success') || t2.includes('listed') || t2.includes('complete')) {
        log('ProfileCanada.com', 'SUCCESS', 'Multi-step submission complete!');
      } else if (t2.includes('verif') || (t2.includes('email') && t2.includes('sent'))) {
        log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca for verification link');
      } else {
        log('ProfileCanada.com', 'CHECK', 'Step 2 result: ' + step2Result.title + ' | ' + step2Result.text?.substring(0, 80));
      }
    } else {
      // No step 2 form found — try navigating browser directly with form.submit()
      console.log('\n  No step 2 form found in response. Trying browser form.submit()...');

      const fillAndSubmit = await pg.evaluate((biz) => {
        const form = document.querySelectorAll('form')[1];
        if (!form) return 'no form';

        // Set all fields including hidden
        ['businessName', 'locationCity', 'address', 'postal', 'phone', 'website', 'businessDescription', 'businessemail'].forEach(name => {
          const el = form.querySelector(`[name="${name}"]`);
          if (!el) return;
          const val = {
            businessName: biz.name, locationCity: biz.city, address: biz.address,
            postal: biz.postal, phone: biz.phone, website: biz.website,
            businessDescription: biz.description.substring(0, 200), businessemail: biz.email,
          }[name] || '';
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
        });

        // Click owner radio
        const radio = form.querySelector('input[name="claimdby"][value="owner"]');
        if (radio) radio.click();

        // Direct submit — bypasses all JS
        form.submit();
        return 'form.submit() called';
      }, BIZ);
      console.log('  Browser form.submit():', fillAndSubmit);
      await sleep(8000);

      const afterState = await pg.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        text: document.body.innerText.substring(0, 400),
      }));
      console.log('  After URL:', afterState.url);
      console.log('  After title:', afterState.title);
      console.log('  After text:', afterState.text.substring(0, 300));

      const ta = afterState.text.toLowerCase();
      if (ta.includes('similar') || afterState.title.toLowerCase().includes('similar')) {
        console.log('  Reached similar businesses page! Looking for "Add New" option...');
        // Find and click "Add New" or "None of the above"
        const addNewClicked = await pg.evaluate(() => {
          const allEls = Array.from(document.querySelectorAll('a, button, input, div'));
          const addNew = allEls.find(el => {
            const t = (el.innerText || el.value || el.textContent || '').toLowerCase().trim();
            return t.includes('add new') || t.includes('none') || t.includes('not listed') || t.includes('add business') || t.includes('create new');
          });
          if (addNew) {
            addNew.click();
            return 'Clicked: ' + (addNew.innerText || addNew.value || addNew.textContent || 'unknown');
          }
          // Log all links/buttons for debugging
          return 'Not found. Elements: ' + allEls
            .filter(el => el.innerText || el.value)
            .slice(0, 20)
            .map(el => (el.innerText || el.value || '').substring(0, 30))
            .join(' | ');
        });
        console.log('  Add new:', addNewClicked);
        await sleep(5000);

        const finalState = await pg.evaluate(() => ({
          url: window.location.href,
          text: document.body.innerText.substring(0, 400),
        }));
        console.log('  Final URL:', finalState.url);
        console.log('  Final text:', finalState.text.substring(0, 200));
        log('ProfileCanada.com', 'CHECK', 'Similar biz page reached — visit manually to complete: profilecanada.com/advertising/editlisting.cfm');
      } else if (ta.includes('thank') || ta.includes('success') || ta.includes('complete')) {
        log('ProfileCanada.com', 'SUCCESS');
      } else if (ta.includes('email') && ta.includes('sent')) {
        log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
      } else {
        log('ProfileCanada.com', 'CHECK', 'URL: ' + afterState.url + ' — visit manually if needed');
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

  console.log('🔄 Round 10 — ProfileCanada multi-step fetch\n');

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
