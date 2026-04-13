/**
 * directory-captcha-check.mjs — Check captcha on step 3 and try to fill account form
 */
import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  console.log('Current title:', await pg.evaluate(() => document.title));
  console.log('Current URL:', pg.url());

  // Find captcha
  const captchaInfo = await pg.evaluate(() => {
    const form = document.querySelector('#frm_acct');
    if (!form) return { error: 'no frm_acct' };

    const imgs = Array.from(form.querySelectorAll('img')).map(img => ({
      src: img.src, id: img.id, width: img.width, height: img.height, alt: img.alt,
      parentHtml: img.parentElement?.outerHTML?.substring(0, 200),
    }));

    // Look for captcha container
    const captchaField = form.querySelector('#captchatxt');
    const hashField = form.querySelector('#hashtxt');

    // Get createAdsAccount function
    const createFn = typeof createAdsAccount === 'function' ? createAdsAccount.toString().substring(0, 1000) : 'undefined';

    return {
      imgs,
      captchaValue: captchaField?.value,
      hashValue: hashField?.value,
      createFn,
      formHtml: form.innerHTML.substring(0, 3000),
    };
  });

  console.log('\nCaptcha images:');
  captchaInfo.imgs?.forEach(img => console.log('  ', img.src, img.width, 'x', img.height));
  console.log('Captcha field value:', captchaInfo.captchaValue);
  console.log('Hash value:', captchaInfo.hashValue);
  console.log('\ncreateAdsAccount fn:', captchaInfo.createFn);

  // Save screenshot of captcha area
  const captchaEl = await pg.$('#captchatxt');
  if (captchaEl) {
    // Screenshot the form area
    const formEl = await pg.$('#frm_acct');
    if (formEl) {
      await formEl.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/captcha-screenshot.png' });
      console.log('\nScreenshot saved: scripts/captcha-screenshot.png');
    }
  }

  // Try to fill account form with info (except captcha)
  await pg.evaluate(() => {
    function setField(sel, val) {
      const el = document.querySelector(sel);
      if (!el) return;
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
    setField('#fname', 'ASADS');
    setField('#lname', 'Inspections');
    setField('#login_city', 'Cambridge');
    setField('#email', 'info@asads.ca');
    setField('#userpwd', 'ASADS2026!');
    setField('#userconfirmpwd', 'ASADS2026!');
  });

  // Try to get createAdsAccount JS to understand captcha validation
  const createFnFull = await pg.evaluate(() => {
    return typeof createAdsAccount === 'function' ? createAdsAccount.toString() : 'not found';
  });
  console.log('\nFull createAdsAccount:');
  console.log(createFnFull);

  // Check frm_st3 — can we just submit it directly?
  const st3Info = await pg.evaluate(() => {
    const form = document.querySelector('#frm_st3');
    return form ? {
      action: form.action,
      fields: Array.from(form.elements).map(el => ({ name: el.name, value: el.value?.substring(0, 40) })).filter(el => el.name),
    } : null;
  });
  console.log('\nfrm_st3 data:', JSON.stringify(st3Info?.fields));

  // Try submitting frm_st3 directly (maybe server creates listing without account)
  console.log('\nTrying frm_st3.submit() directly...');
  await pg.evaluate(() => {
    const form = document.querySelector('#frm_st3');
    if (form) form.submit();
  });
  await sleep(8000);

  const final = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 600),
  }));
  console.log('\nAfter frm_st3.submit():');
  console.log('URL:', final.url);
  console.log('Title:', final.title);
  console.log('Text:', final.text.substring(0, 400));

  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
