/**
 * email-check-links.mjs — Log into Hostinger webmail, find verification emails,
 * click all verification links from Fyple, 411, B2BCo, ProfileCanada, CanadianBizDir
 */
import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const EMAIL = 'info@asads.ca';
const EMAIL_PASS = 'ASADS2026!';

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function setVal(pg, selector, value) {
  await pg.evaluate((sel, val) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.value = val;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, selector, value);
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });

  // Open new tab for email
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  console.log('🔐 Logging into Hostinger webmail...');
  await pg.goto('https://mail.hostinger.com/auth/login', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Fill credentials
  await pg.click('#email');
  await pg.type('#email', EMAIL, { delay: 50 });
  await pg.click('#password');
  await pg.type('#password', EMAIL_PASS, { delay: 50 });
  await sleep(500);

  // Click login
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b =>
      (b.innerText || b.value || '').toLowerCase().includes('login') ||
      (b.innerText || b.value || '').toLowerCase().includes('log in') ||
      (b.innerText || b.value || '').toLowerCase().includes('sign in')
    );
    if (btn) btn.click();
  });
  await sleep(6000);

  const afterLogin = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 300),
  }));
  console.log('After login URL:', afterLogin.url);
  console.log('After login title:', afterLogin.title);
  console.log('Text:', afterLogin.text.substring(0, 200));

  if (afterLogin.url.includes('login') || afterLogin.text.toLowerCase().includes('incorrect') || afterLogin.text.toLowerCase().includes('invalid')) {
    console.log('❌ Login failed — wrong password. Checking if session already active...');
    await pg.close();
    browser.disconnect();
    return;
  }

  console.log('✅ Logged in!');
  await sleep(3000);

  // Get inbox emails
  console.log('\nReading inbox...');
  await pg.goto('https://mail.hostinger.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(4000);

  // List all emails in inbox
  const emails = await pg.evaluate(() => {
    // Try various selectors for email list
    const rows = document.querySelectorAll('[data-testid="email-list-item"], .email-item, [class*="email-row"], [class*="message-row"], .list-item, tr[data-id]');
    if (rows.length > 0) {
      return Array.from(rows).map(row => ({
        subject: row.querySelector('[class*="subject"], [data-testid*="subject"]')?.innerText || row.innerText?.substring(0, 80),
        from: row.querySelector('[class*="from"], [data-testid*="from"]')?.innerText || '',
        date: row.querySelector('[class*="date"], time')?.innerText || '',
      }));
    }
    return { text: document.body.innerText.substring(0, 1000) };
  });
  console.log('Inbox emails:', JSON.stringify(emails, null, 2));

  // Take screenshot
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/email-inbox.png' });
  console.log('Screenshot saved: scripts/email-inbox.png');

  // Try to find and click verification emails
  // Look for emails from Fyple, 411, YP, B2BCo
  const verificationKeywords = ['fyple', '411', 'yp', 'b2bco', 'profilecanada', 'verify', 'confirm', 'activation'];

  // Get all email subjects/links visible on page
  const emailLinks = await pg.evaluate(() => {
    const allText = document.body.innerText;
    return {
      text: allText.substring(0, 2000),
      links: Array.from(document.querySelectorAll('a[href]')).slice(0, 20).map(a => ({ text: a.innerText?.substring(0, 40), href: a.href })),
    };
  });
  console.log('\nInbox content:', emailLinks.text.substring(0, 800));

  // Try to find and open verification emails by clicking on matching subjects
  for (const keyword of verificationKeywords) {
    const found = await pg.evaluate((kw) => {
      const allEls = Array.from(document.querySelectorAll('*'));
      const matching = allEls.find(el =>
        el.children.length === 0 &&
        (el.innerText || '').toLowerCase().includes(kw) &&
        el.offsetParent !== null
      );
      if (matching) {
        const clickable = matching.closest('[onclick], a, [role="row"], [data-testid]') || matching;
        clickable.click();
        return { found: true, text: matching.innerText?.substring(0, 80) };
      }
      return { found: false };
    }, keyword);

    if (found.found) {
      console.log(`\n  Found email with "${keyword}": ${found.text}`);
      await sleep(3000);

      // Look for verification link in the opened email
      const emailContent = await pg.evaluate(() => {
        return {
          url: window.location.href,
          text: document.body.innerText.substring(0, 1000),
          links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
            text: a.innerText?.substring(0, 50),
            href: a.href,
          })).filter(l => l.href && !l.href.startsWith('javascript') && l.href.length > 20),
        };
      });
      console.log('  Email text:', emailContent.text.substring(0, 300));
      console.log('  Email links:', JSON.stringify(emailContent.links.slice(0, 10)));

      // Click verification/confirmation links
      for (const link of emailContent.links) {
        const lhref = link.href.toLowerCase();
        const ltext = (link.text || '').toLowerCase();
        if (lhref.includes('verif') || lhref.includes('confirm') || lhref.includes('activ') ||
            ltext.includes('verify') || ltext.includes('confirm') || ltext.includes('activate') || ltext.includes('click')) {
          console.log(`  Clicking: ${link.text} → ${link.href.substring(0, 80)}`);
          // Open link in new tab
          const newTab = await browser.newPage();
          newTab.setDefaultTimeout(30000);
          try {
            await newTab.goto(link.href, { waitUntil: 'networkidle2', timeout: 30000 });
            await sleep(3000);
            const result = await newTab.evaluate(() => ({
              url: window.location.href,
              title: document.title,
              text: document.body.innerText.substring(0, 300),
            }));
            console.log(`  ✅ Clicked → ${result.url} | ${result.text.substring(0, 100)}`);
          } catch (e) {
            console.log(`  Error: ${e.message.substring(0, 60)}`);
          }
          await newTab.close();
          break;
        }
      }

      // Go back to inbox
      await pg.goto('https://mail.hostinger.com/', { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(3000);
    }
  }

  await pg.close();
  browser.disconnect();
  console.log('\nDone checking email!');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
