import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 120000 });
const pg = await browser.newPage();
await pg.setViewport({ width: 1400, height: 1100 });
// Use embed tag to render PDF in page
const fileUrl = pathToFileURL('C:/Users/Owner/Downloads/CSIO_Form_Tareq_Kawar_Filled.pdf').href;
await pg.setContent(`<html><body style="margin:0"><embed src="${fileUrl}" width="1400" height="1100" type="application/pdf"></body></html>`);
await sleep(6000);
await pg.screenshot({ path: 'scripts/csio-embed.png' });
await pg.close();
browser.disconnect();
console.log('done');
