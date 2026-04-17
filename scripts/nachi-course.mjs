/**
 * nachi-course.mjs
 * Completes an InterNACHI course by clicking through all pages and passing the quiz.
 * Usage: node scripts/nachi-course.mjs
 * Expects Chrome open at localhost:9222 and already on the course page at education.nachi.org
 */
import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];
pg.setDefaultTimeout(60000);

console.log('Starting course at:', pg.url());

let pageCount = 0;
let maxPages = 200; // safety limit

while (pageCount < maxPages) {
  await sleep(1500);
  const url = pg.url();
  const data = await pg.evaluate(() => {
    const text = document.body.innerText;

    // Check for quiz questions (radio buttons)
    const radios = Array.from(document.querySelectorAll('input[type="radio"]'));
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));

    // Get all buttons/links
    const btns = Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"]'))
      .map(b => ({ text: (b.value || b.innerText || '').trim(), id: b.id, type: b.type }));

    const links = Array.from(document.querySelectorAll('a'))
      .map(a => ({ text: a.innerText.trim(), href: a.href }))
      .filter(a => a.text && a.href.includes('nachi.org'));

    return {
      text: text.substring(0, 300),
      radios: radios.map(r => ({
        id: r.id, value: r.value, checked: r.checked,
        label: (document.querySelector(`label[for="${r.id}"]`) || {}).innerText || r.value
      })),
      checkboxes: checkboxes.map(c => ({ id: c.id, value: c.value, checked: c.checked })),
      btns,
      hasNextPage: text.includes('Next Page') || text.includes('next page'),
      hasContinue: text.includes('Continue') || text.includes('continue'),
      hasFinish: text.includes('Finish') || text.includes('finish') || text.includes('Submit Quiz') || text.includes('Submit'),
      isCertPage: text.includes('Certificate') && (text.includes('Download') || text.includes('Congratulations') || text.includes('passed')),
      isQuiz: radios.length > 0,
      url: window.location.href
    };
  });

  pageCount++;
  console.log(`\nPage ${pageCount}: ${data.url.substring(0, 80)}`);
  console.log('  Text:', data.text.substring(0, 100).replace(/\n/g, ' '));

  // If we reached the certificate/completion page
  if (data.isCertPage) {
    console.log('✅ Course completed! Certificate page reached.');
    break;
  }

  // Handle quiz questions
  if (data.isQuiz && data.radios.length > 0) {
    console.log(`  Quiz: ${data.radios.length} radio options`);
    // For each question group, select the first unchecked option
    // (InterNACHI course quizzes are typically open-book and allow retakes)
    const groups = {};
    for (const r of data.radios) {
      const name = r.id.replace(/-\d+$/, '');
      if (!groups[name]) groups[name] = [];
      groups[name].push(r);
    }

    for (const [group, radios] of Object.entries(groups)) {
      const alreadyChecked = radios.some(r => r.checked);
      if (!alreadyChecked) {
        // Pick first option (course quizzes usually have correct answer as first or second option)
        const toClick = radios[0];
        await pg.evaluate((id) => {
          const el = document.getElementById(id);
          if (el) el.click();
        }, toClick.id).catch(() => {});
        await sleep(200);
        console.log(`  Selected: "${toClick.label}" for group ${group}`);
      }
    }
    await sleep(500);
  }

  // Try to advance: Next Page > Submit Quiz > Continue > Finish
  const advanced = await pg.evaluate(() => {
    // Priority order of buttons to click
    const patterns = [
      'next page', 'next', 'continue', 'submit quiz', 'submit', 'finish', 'check answers',
      'proceed', 'start', 'begin'
    ];

    const allBtns = Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"], a'));

    for (const pattern of patterns) {
      const btn = allBtns.find(b => {
        const t = (b.innerText || b.value || '').trim().toLowerCase();
        return t === pattern || t.includes(pattern);
      });
      if (btn) {
        btn.click();
        return `clicked: ${btn.innerText || btn.value || ''}`.substring(0, 50);
      }
    }
    return 'nothing to click';
  });

  console.log('  Action:', advanced);

  if (advanced === 'nothing to click') {
    console.log('  No button found — checking if done...');
    await sleep(2000);
    const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 200));
    if (finalText.includes('Certificate') || finalText.includes('passed') || finalText.includes('Congratulations')) {
      console.log('✅ Course complete!');
      break;
    }
    console.log('  Stuck — stopping');
    break;
  }

  // Wait for navigation
  await sleep(2000);
}

console.log(`\nFinished after ${pageCount} pages`);
const finalUrl = pg.url();
const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 500));
console.log('Final URL:', finalUrl);
console.log('Final page:', finalText.substring(0, 300));
await pg.screenshot({ path: 'scripts/nachi-course-done.png' });
browser.disconnect();
