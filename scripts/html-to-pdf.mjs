import puppeteer from 'puppeteer';
import fs from 'fs';
import { pathToFileURL } from 'url';

const htmlPath = 'C:/Users/Owner/Downloads/CSIO_Filled_Tareq_Kawar.html';
const pdfPath = 'C:/Users/Owner/Downloads/CSIO_Filled_Tareq_Kawar.pdf';

// Connect to running Chrome instead of launching new
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pg = await browser.newPage();
const html = fs.readFileSync(htmlPath, 'utf8');
await pg.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
await pg.pdf({
  path: pdfPath,
  format: 'Letter',
  printBackground: true,
  margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' },
});
await pg.close();
browser.disconnect();
console.log('PDF saved to:', pdfPath);
