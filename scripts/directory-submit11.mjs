/**
 * directory-submit11.mjs — Round 11:
 * ProfileCanada — Read full "Similar Businesses" HTML to find Add New path
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
  console.log('\n── ProfileCanada.com — Round 11 (read Similar Businesses HTML)');
  try {
    await pg.goto('https://www.profilecanada.com/advertising/editlisting.cfm', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // POST step 1 and get the full Similar Businesses HTML
    const step1Html = await pg.evaluate(async (biz) => {
      const body = new URLSearchParams({
        step: '2', cmp: '', tollFree: '', fax: '',
        businessemail: biz.email,
        businessDescription: biz.description.substring(0, 200),
        category: '', question1: '', question2: '',
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
      return await resp.text();
    }, BIZ);

    // Parse the full HTML in Node.js using DOMParser (via browser evaluate)
    const pageAnalysis = await pg.evaluate((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Get plain text
      const textContent = doc.body.innerText;

      // Find all forms and their full data
      const forms = Array.from(doc.querySelectorAll('form')).map((f, i) => ({
        index: i,
        action: f.action,
        method: f.method,
        allFields: Array.from(f.elements).map(el => ({
          name: el.name,
          type: el.type,
          value: el.value,
          id: el.id,
          checked: el.checked,
        })),
        buttons: Array.from(f.querySelectorAll('button, input[type=submit], input[type=button], input[type=radio]')).map(b => ({
          type: b.type,
          value: b.value,
          name: b.name,
          text: b.innerText,
        })),
        onclickEls: Array.from(f.querySelectorAll('[onclick]')).map(el => ({
          tag: el.tagName,
          onclick: el.getAttribute('onclick'),
          text: el.innerText?.substring(0, 50),
        })),
      }));

      // Get main content area (strip nav/header/footer)
      const mainContent = doc.querySelector('#content, .content, main, [id*="main"]')?.innerText
        || textContent;

      // Look for any links, inputs, buttons related to "add new" / "not listed"
      const addNewEls = Array.from(doc.querySelectorAll('*')).filter(el => {
        const t = (el.innerText || el.getAttribute('value') || el.getAttribute('onclick') || '').toLowerCase();
        return el.children.length === 0 && (
          t.includes('add new') || t.includes('not listed') || t.includes('none of') ||
          t.includes('my business') || t.includes('add my') || t.includes('create') ||
          t.includes('new listing') || t.includes('not here') || t.includes('not found')
        );
      }).map(el => ({
        tag: el.tagName,
        text: el.innerText?.substring(0, 60),
        href: el.href,
        onclick: el.getAttribute('onclick'),
        name: el.name,
        value: el.value,
      }));

      // Look for radio buttons with cmp values (business IDs to select from similar matches)
      const cmpRadios = Array.from(doc.querySelectorAll('input[name="cmp"]')).map(r => ({
        value: r.value,
        id: r.id,
        checked: r.checked,
        siblingText: r.closest('tr, div, li')?.innerText?.substring(0, 80),
      }));

      return {
        title: doc.title,
        textSnippet: mainContent.substring(0, 2000),
        forms: forms.map(f => ({
          ...f,
          allFields: f.allFields, // full fields
        })),
        addNewEls,
        cmpRadios,
        // Raw HTML of main area
        mainAreaHtml: (doc.querySelector('#content, .content, [id*="main"], table') || doc.body).innerHTML.substring(0, 5000),
      };
    }, step1Html);

    console.log('  Title:', pageAnalysis.title);
    console.log('\n  Text content:');
    console.log(pageAnalysis.textSnippet);
    console.log('\n  CMP radio buttons (similar businesses):');
    console.log(JSON.stringify(pageAnalysis.cmpRadios, null, 2));
    console.log('\n  Add-new elements:');
    console.log(JSON.stringify(pageAnalysis.addNewEls, null, 2));
    console.log('\n  Forms summary:');
    pageAnalysis.forms.forEach(f => {
      console.log(`  Form[${f.index}]: action=${f.action}`);
      console.log('    All fields:', JSON.stringify(f.allFields));
      console.log('    Onclick els:', JSON.stringify(f.onclickEls));
    });
    console.log('\n  Main area HTML:');
    console.log(pageAnalysis.mainAreaHtml);

    // Now decide what to do
    if (pageAnalysis.cmpRadios.length === 0) {
      // No similar businesses found — means ASADS isn't in their DB yet
      // The form should auto-add it. Let's try step 3 with cmp="" or cmp="0"
      console.log('\n  No similar businesses found — trying to add new with cmp=0...');

      const step2Result = await pg.evaluate(async (biz) => {
        // Try various cmp values to trigger "add new"
        for (const cmpVal of ['0', '-1', 'new', '']) {
          const body = new URLSearchParams({
            step: '3', cmp: cmpVal, tollFree: '', fax: '',
            businessemail: biz.email,
            businessDescription: biz.description.substring(0, 200),
            category: '', question1: '', question2: '',
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
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
          });
          const html = await resp.text();
          const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || '';
          console.log(`  cmp="${cmpVal}" → title="${title}" | text: ${text.substring(0, 150)}`);
          if (!title.includes('Similar')) {
            return { cmpVal, title, text: text.substring(0, 500) };
          }
        }
        return { cmpVal: 'all failed', title: 'Similar Businesses', text: 'Still on similar businesses' };
      }, BIZ);
      console.log('\n  Step 3 result:', JSON.stringify(step2Result));

      const t = (step2Result.text || '').toLowerCase();
      if (t.includes('thank') || t.includes('success') || t.includes('submitt') || t.includes('complete')) {
        log('ProfileCanada.com', 'SUCCESS', 'Added new listing!');
      } else if (t.includes('email') && (t.includes('verif') || t.includes('sent'))) {
        log('ProfileCanada.com', 'NEEDS_EMAIL', 'Check info@asads.ca');
      } else {
        log('ProfileCanada.com', 'CHECK', 'Title: ' + step2Result.title + ' — visit manually: profilecanada.com/advertising/editlisting.cfm');
      }
    } else {
      // Similar businesses found — check if ASADS is one of them, otherwise select "add new"
      console.log('\n  Similar businesses found:', pageAnalysis.cmpRadios.map(r => r.siblingText).join(' | '));
      log('ProfileCanada.com', 'CHECK', 'Similar businesses listed — visit manually to select/add: profilecanada.com/advertising/editlisting.cfm');
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

  console.log('🔄 Round 11 — ProfileCanada deep HTML analysis\n');

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
