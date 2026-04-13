import puppeteer from 'puppeteer';

const EMAIL = 'asadslandscapinginc@gmail.com';
const PASS  = 'Apple123@';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: false,
  args: ['--no-sandbox', '--window-size=1400,900'],
  defaultViewport: { width: 1400, height: 900 }
});

const page = await browser.newPage();
await page.goto('https://www.semrush.com/login/', { waitUntil: 'networkidle2' });
await sleep(3000);
await page.screenshot({ path: 'C:/Users/Owner/Documents/semrush-login.png', fullPage: false });

// Log all input fields on the page
const inputs = await page.evaluate(() =>
  Array.from(document.querySelectorAll('input')).map(i => ({
    type: i.type, name: i.name, id: i.id, placeholder: i.placeholder, className: i.className.substring(0,60)
  }))
);
console.log('Inputs found:', JSON.stringify(inputs, null, 2));

// Log all buttons
const buttons = await page.evaluate(() =>
  Array.from(document.querySelectorAll('button')).map(b => ({
    type: b.type, text: b.innerText.trim().substring(0,40), id: b.id, className: b.className.substring(0,60)
  }))
);
console.log('Buttons found:', JSON.stringify(buttons, null, 2));

await browser.close();
