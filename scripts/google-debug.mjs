import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages[0];
pg.setDefaultTimeout(30000);

await pg.goto('https://www.google.com/search?q=Toronto+home+inspection&hl=en&gl=ca&num=10', { waitUntil: 'domcontentloaded' });
await sleep(3000);

// Take screenshot
await pg.screenshot({ path: 'C:/Users/Owner/Documents/google-debug.png', fullPage: false });
console.log('Screenshot saved');

// Dump all links with href starting http
const data = await pg.evaluate(() => {
  const out = {};

  // All cite tags
  out.cites = Array.from(document.querySelectorAll('cite')).map(c => c.innerText.trim()).slice(0, 20);

  // All h3 tags (result titles)
  out.h3s = Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim()).slice(0, 15);

  // All result links
  out.links = Array.from(document.querySelectorAll('a[href^="http"]'))
    .map(a => { try { return new URL(a.href).hostname; } catch(_) { return ''; } })
    .filter(h => h && !h.includes('google'))
    .slice(0, 30);

  // div.g links
  out.divG = Array.from(document.querySelectorAll('div.g a[href^="http"]'))
    .map(a => { try { return new URL(a.href).hostname; } catch(_) { return ''; } })
    .filter(Boolean).slice(0, 20);

  // data-ved links
  out.vedLinks = Array.from(document.querySelectorAll('a[data-ved][href^="http"]'))
    .map(a => { try { return new URL(a.href).hostname; } catch(_) { return ''; } })
    .filter(Boolean).slice(0, 20);

  // Try common Google result containers
  const selectors = [
    'div[data-hveid] a[href^="http"]',
    '.g a[href^="http"]',
    '[jsname] a[href^="http"]',
    'div[lang] a[href^="http"]',
  ];
  out.bySelector = {};
  for (const sel of selectors) {
    out.bySelector[sel] = Array.from(document.querySelectorAll(sel))
      .map(a => { try { return new URL(a.href).hostname; } catch(_) { return ''; } })
      .filter(h => h && !h.includes('google')).slice(0, 10);
  }

  // Body text snippet
  out.bodySnippet = document.body.innerText.substring(0, 1000);

  return out;
});

writeFileSync('C:/Users/Owner/Documents/google-debug.json', JSON.stringify(data, null, 2));
console.log('\nCite tags:', data.cites);
console.log('\nH3s:', data.h3s);
console.log('\nAll links:', data.links);
console.log('\ndiv.g links:', data.divG);
console.log('\ndata-ved links:', data.vedLinks.slice(0, 10));
console.log('\nBy selector:', JSON.stringify(data.bySelector, null, 2));
console.log('\nBody snippet:\n', data.bodySnippet.substring(0, 500));

browser.disconnect();
