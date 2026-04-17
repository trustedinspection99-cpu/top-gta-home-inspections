import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org/membership') || p.url().includes('nachi.org/my'));
if (!pg) { console.log('No nachi tab'); browser.disconnect(); process.exit(); }
console.log('URL:', pg.url());
const t = await pg.evaluate(() => document.body.innerText);
console.log(t.substring(0, 2000));
browser.disconnect();
