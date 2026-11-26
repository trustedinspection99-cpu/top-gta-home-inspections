// Live test of every public booking form on asads.ca (owner request 2026-11-25).
// Fills each form like a customer and submits it, but INTERCEPTS the request to save-booking /
// Formspree and answers it with a fake 200, so no real booking, job or email is created.
// Reports: did the form submit, what it sent (required fields present?), and what the customer saw.
// Usage: node scripts/test-booking-forms.mjs
import puppeteer from 'puppeteer';

const BASE = 'https://www.asads.ca';
const NAME_FIRST = 'Test', NAME_LAST = 'O’Brien';
const results = [];

async function setup(page, rec) {
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const u = req.url();
    if (req.method() === 'POST' && (u.includes('/functions/v1/save-booking') || u.includes('formspree.io'))) {
      let body = req.postData() || '';
      try { body = JSON.parse(body); } catch {}
      rec.sent.push({ to: u.includes('formspree') ? 'formspree' : 'save-booking', body });
      return req.respond({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, ok: true }) });
    }
    if (req.method() === 'OPTIONS' && u.includes('/functions/v1/')) {
      return req.respond({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: 'ok' });
    }
    req.continue();
  });
  page.on('pageerror', (e) => rec.errors.push(String(e.message || e).slice(0, 160)));
}

// Fill a plain HTML form (native inputs/selects) the way React expects.
async function fillNativeForm(page, formHandle) {
  return page.evaluate((form, first, last) => {
    const set = (el, v) => {
      const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const filled = [];
    for (const el of form.querySelectorAll('input, select, textarea')) {
      if (el.type === 'hidden' || el.type === 'submit' || el.type === 'checkbox' || el.type === 'radio' || el.offsetParent === null) continue;
      const key = ((el.name || '') + ' ' + (el.placeholder || '') + ' ' + (el.id || '') + ' ' + (el.getAttribute('aria-label') || '')).toLowerCase();
      if (el.tagName === 'SELECT') {
        const opts = [...el.options].filter((o) => o.value);
        const pick = opts.find((o) => /listing/i.test(o.text)) || opts.find((o) => /toronto/i.test(o.text)) || opts[0];
        if (pick) { set(el, pick.value); filled.push(`${el.name || 'select'}=${pick.value}`); }
      } else if (el.type === 'email' || key.includes('email')) { set(el, 'test@example.com'); filled.push('email'); }
      else if (el.type === 'tel' || key.includes('phone')) { set(el, '6478019311'); filled.push('phone'); }
      else if (el.type === 'date' || key.includes('date')) { set(el, process.env.TEST_DATE || '2026-12-03'); filled.push('date'); }
      else if (key.includes('last')) { set(el, last); filled.push('last'); }
      else if (key.includes('first') || key.includes('name')) { set(el, key.includes('first') ? first : `${first} ${last}`); filled.push('name'); }
      else if (key.includes('city')) { set(el, 'Toronto'); filled.push('city'); }
      else if (key.includes('address') || key.includes('street')) { set(el, '12 St. John’s Rd'); filled.push('address'); }
      else if (key.includes('postal')) { set(el, 'M4M 1A1'); filled.push('postal'); }
      else if (el.tagName === 'TEXTAREA' || key.includes('message') || key.includes('note')) { set(el, 'Automated test, please ignore'); filled.push('message'); }
      else if (el.type === 'text') { set(el, 'Test'); filled.push(el.name || 'text'); }
    }
    return filled;
  }, formHandle, NAME_FIRST, NAME_LAST);
}

async function testNativeForms(browser, path, label) {
  const page = await browser.newPage();
  const rec = { label, path, sent: [], errors: [], forms: [] };
  await setup(page, rec);
  await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  const forms = await page.$$('form');
  for (let i = 0; i < forms.length; i++) {
    const hasContact = await forms[i].evaluate((f) => !!f.querySelector('input[type=tel], input[type=email], input[name*=phone i], input[name*=name i]') && f.offsetParent !== null);
    if (!hasContact) continue;
    const before = rec.sent.length;
    const filled = await fillNativeForm(page, forms[i]);
    await forms[i].evaluate((f) => (f.requestSubmit ? f.requestSubmit() : f.submit()));
    await new Promise((r) => setTimeout(r, 2500));
    const text = await page.evaluate(() => document.body.innerText);
    const msg = (text.match(/(within the next 7 days|Booking Request Received|Request received|Thank you[^\n]{0,80}|Something went wrong[^\n]{0,60}|Appointment Confirmed[^\n]{0,40}|Message sent[^\n]{0,40}|We[’']ll[^\n]{0,80})/i) || [])[0] || '';
    rec.forms.push({ form: i + 1, filled, submitted: rec.sent.length > before, customerSaw: msg.slice(0, 90) });
  }
  results.push(rec);
  await page.close();
}

async function clickText(page, selector, re) {
  const handles = await page.$$(selector);
  for (const h of handles) {
    const t = await h.evaluate((e) => e.innerText || e.textContent || '');
    if (re.test(t) && await h.evaluate((e) => e.offsetParent !== null)) { await h.click(); return true; }
  }
  return false;
}

async function testBookingWizard(browser) {
  const page = await browser.newPage();
  const rec = { label: 'Booking page wizard', path: '/booking', sent: [], errors: [], forms: [] };
  await setup(page, rec);
  await page.goto(BASE + '/booking', { waitUntil: 'networkidle2', timeout: 60000 });
  const step = [];
  const pickSelect = async (triggerIndex, re) => {
    const triggers = await page.$$('button[role=combobox]');
    if (!triggers[triggerIndex]) return false;
    await triggers[triggerIndex].click(); await new Promise((r) => setTimeout(r, 400));
    return clickText(page, '[role=option]', re);
  };
  step.push('service:' + await pickSelect(0, /Pre-Listing/i));
  // date: open the calendar popover and pick the first enabled day after today
  await clickText(page, 'button', /pick a date|select date|choose a date/i);
  await new Promise((r) => setTimeout(r, 400));
  const days = await page.$$('[role=gridcell] button:not([disabled]), button[name=day]:not([disabled])');
  let picked = false;
  for (const d of days.slice(3)) { if (await d.evaluate((e) => !e.disabled && e.offsetParent !== null)) { await d.click(); picked = true; break; } }
  step.push('date:' + picked);
  await page.keyboard.press('Escape');
  step.push('time:' + await pickSelect(1, /AM|PM/i));
  step.push('continue1:' + await clickText(page, 'button', /^\s*Continue/i));
  await new Promise((r) => setTimeout(r, 500));
  step.push('propertyType:' + await pickSelect(0, /Detached|House|Condo|.+/i));
  const fillByPlaceholder = async (re, v) => {
    const inputs = await page.$$('input');
    for (const el of inputs) {
      const k = await el.evaluate((e) => (e.placeholder + ' ' + e.id + ' ' + e.name).toLowerCase());
      if (re.test(k) && await el.evaluate((e) => e.offsetParent !== null)) { await el.click({ clickCount: 3 }); await el.type(v); return true; }
    }
    return false;
  };
  step.push('address:' + await fillByPlaceholder(/address|street/, '12 St. John’s Rd'));
  step.push('city:' + await fillByPlaceholder(/city/, 'Toronto'));
  step.push('continue2:' + await clickText(page, 'button', /^\s*Continue/i));
  await new Promise((r) => setTimeout(r, 500));
  step.push('first:' + await fillByPlaceholder(/first/, NAME_FIRST));
  step.push('last:' + await fillByPlaceholder(/last/, NAME_LAST));
  step.push('email:' + await fillByPlaceholder(/mail/, 'test@example.com'));
  step.push('phone:' + await fillByPlaceholder(/phone|tel/, '6478019311'));
  step.push('submit:' + await clickText(page, 'button[type=submit]', /.+/));
  await new Promise((r) => setTimeout(r, 3000));
  const text = await page.evaluate(() => document.body.innerText);
  const msg = (text.match(/(Booking Request Received|Request received|Something went wrong[^\n]{0,60}|Failed to submit[^\n]{0,60}|Appointment Confirmed)/i) || [])[0] || '';
  rec.forms.push({ form: 'wizard', filled: step, submitted: rec.sent.length > 0, customerSaw: msg });
  results.push(rec);
  await page.close();
}

const browser = await puppeteer.launch({ headless: true });
try {
  await testBookingWizard(browser);
  for (const [path, label] of [
    ['/', 'Homepage form'],
    ['/services/pre-listing', 'Pre-listing service page (hero box)'],
    ['/services/pre-listing/toronto', 'Pre-listing Toronto (hero + inline)'],
    ['/services/asbestos-testing/mississauga', 'Asbestos Mississauga (hero + inline)'],
    ['/locations/home-inspection-peterborough', 'Location page Peterborough'],
    ['/pricing', 'Pricing page (inline)'],
    ['/faq', 'FAQ page (hero box)'],
    ['/services/asbestos-testing', 'PROTECTED asbestos hub'],
    ['/services/asbestos-testing/toronto', 'PROTECTED asbestos Toronto'],
    ['/services/wett', 'PROTECTED WETT hub'],
    ['/services/wett/toronto', 'PROTECTED WETT Toronto'],
    ['/services/mold-inspection/mississauga', 'PROTECTED mould Mississauga'],
    ['/services/air-quality', 'Air quality hub'],
    ['/services/pre-purchase', 'Pre-purchase hub'],
    ['/contact', 'Contact page (Formspree)'],
  ]) await testNativeForms(browser, path, label);
} finally { await browser.close(); }

for (const r of results) {
  console.log(`\n=== ${r.label}  (${r.path})`);
  if (!r.forms.length) console.log('  NO BOOKING FORM FOUND');
  for (const f of r.forms) console.log(`  form ${f.form}: submitted=${f.submitted}  customer saw: "${f.customerSaw}"  filled: ${f.filled.join(', ')}`);
  for (const s of r.sent) {
    const b = s.body || {};
    const missing = s.to === 'save-booking' ? ['name', 'phone', 'service'].filter((k) => !b[k]) : [];
    console.log(`  -> ${s.to}: service="${b.service ?? ''}" name="${b.name ?? ''}" phone="${b.phone ?? ''}" email="${b.email ?? ''}" date="${b.preferred_date ?? ''}" city="${b.city ?? ''}"${missing.length ? '  MISSING ' + missing.join(',') : ''}`);
  }
  if (r.errors.length) console.log('  page errors:', r.errors.slice(0, 3).join(' | '));
}
