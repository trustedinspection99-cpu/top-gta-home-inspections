import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages[0];
const formUrl = pathToFileURL('C:/Users/Owner/Downloads/chimney-tareq/CAA Oil Tank Woodstove Questionnaire (2).pdf').href;
await pg.goto(formUrl, { waitUntil: 'load', timeout: 20000 }).catch(()=>{});
await sleep(4000);
// Check if there are fillable fields
const fields = await pg.evaluate(() => {
  const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
  return inputs.map(el => ({ tag: el.tagName, type: el.type, name: el.name, id: el.id, value: el.value }));
});
console.log('Form fields found:', fields.length);
fields.slice(0, 20).forEach(f => console.log(f));
browser.disconnect();
