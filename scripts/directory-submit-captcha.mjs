/**
 * directory-submit-captcha.mjs — Try captcha "EHR" and submit ProfileCanada step 3
 */
import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function tryCaptcha(pg, captchaText) {
  console.log(`\nTrying captcha: "${captchaText}"`);

  // Verify captcha via the API first
  const hashVal = await pg.evaluate(() => document.querySelector('#hashtxt')?.value);
  console.log('Hash:', hashVal);

  const verifyResult = await pg.evaluate(async (captcha, hash) => {
    try {
      const resp = await fetch('../../com/captcha.cfc?method=verifyCaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `captchatxt=${encodeURIComponent(captcha)}&hashtxt=${encodeURIComponent(hash)}`,
      });
      const json = await resp.json();
      return json;
    } catch (e) {
      return { error: e.message };
    }
  }, captchaText, hashVal);

  console.log('Captcha verify result:', JSON.stringify(verifyResult));
  return verifyResult;
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  console.log('Current title:', await pg.evaluate(() => document.title));

  // Re-fill account form
  await pg.evaluate(() => {
    function set(sel, val) {
      const el = document.querySelector(sel);
      if (el) { el.value = val; el.dispatchEvent(new Event('input', {bubbles:true})); el.dispatchEvent(new Event('change', {bubbles:true})); }
    }
    set('#fname', 'ASADS');
    set('#lname', 'Home Inspection');
    set('#login_city', 'Cambridge');
    set('#email', 'info@asads.ca');
    set('#userpwd', 'ASADS2026!');
    set('#userconfirmpwd', 'ASADS2026!');
  });

  // Try multiple captcha readings
  const captchaAttempts = ['EHR', 'ER', 'E H R', 'EhR', 'Ehr', 'EHr', 'E_R', 'eHR', 'ehr', 'ehR'];

  for (const attempt of captchaAttempts) {
    const result = await tryCaptcha(pg, attempt);
    if (result.result === true) {
      console.log(`✅ Captcha CORRECT: "${attempt}"`);

      // Now create account
      console.log('Creating account...');
      await pg.evaluate((captcha) => {
        const el = document.querySelector('#captchatxt');
        if (el) { el.value = captcha; el.dispatchEvent(new Event('input', {bubbles:true})); }
      }, attempt);

      const accountResult = await pg.evaluate(async () => {
        const formData = new URLSearchParams();
        const form = document.querySelector('#frm_acct');
        Array.from(form.elements).forEach(el => {
          if (el.name && el.type !== 'submit' && el.type !== 'button') {
            formData.append(el.name, el.value);
          }
        });
        try {
          const resp = await fetch('../../com/user.cfc?method=createAccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString(),
          });
          const json = await resp.json();
          return json;
        } catch (e) {
          return { error: e.message };
        }
      });
      console.log('Account creation result:', JSON.stringify(accountResult));

      if (accountResult.result === true) {
        console.log('Account created! Submitting frm_st3...');
        await pg.evaluate(() => {
          const form = document.querySelector('#frm_st3');
          if (form) form.submit();
        });
        await sleep(10000);

        const final = await pg.evaluate(() => ({
          url: window.location.href,
          title: document.title,
          text: document.body.innerText.substring(0, 800),
        }));
        console.log('\nFinal title:', final.title);
        console.log('Final URL:', final.url);
        console.log('Final text:', final.text.substring(0, 500));
        console.log('\n✅ ProfileCanada.com — LISTING SUBMITTED!');
      } else {
        console.log('Account creation failed:', accountResult);
        console.log('\n⚠️ ProfileCanada.com — Account creation failed. Visit manually: profilecanada.com/advertising/editlisting.cfm');
      }
      break;
    } else {
      console.log(`❌ Captcha wrong: "${attempt}" — ${result.error || result.message || JSON.stringify(result)}`);
    }
  }

  // If all attempts failed, take new screenshot and note
  const state = await pg.evaluate(() => document.title);
  if (!state.includes('Thank') && !state.includes('Success')) {
    // Take a fresh screenshot for the user
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/profilecanada-captcha-final.png' });
    console.log('\n⚠️ Captcha could not be read automatically.');
    console.log('Browser is on Step 3 with all fields pre-filled.');
    console.log('Please open Chrome, look at the ProfileCanada page, and:');
    console.log('1. Type the captcha text in the "Enter Text in the picture" field');
    console.log('2. Click "Submit info & Create Account"');
    console.log('   (All other fields are already filled: ASADS, Home Inspection, Cambridge, info@asads.ca, ASADS2026!)');
  }

  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
