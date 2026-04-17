import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// COE knowledge-based answers
function pickAnswer(questionText, labels) {
  const q = questionText.toLowerCase();
  const find = (...terms) => labels.find(l => terms.some(t => l.text.toLowerCase().includes(t)));

  // COE-specific rules
  if (q.includes('discredit')) return find('not permitted', 'shall not');
  if (q.includes('conflict of interest')) return find('not permitted', 'shall not', 'false', 'no');
  if (q.includes('kickback') || q.includes('referral fee') || q.includes('commission')) return find('not permitted', 'shall not', 'false', 'prohibited');
  if (q.includes('discriminate') || q.includes('discrimination')) return find('not permitted', 'shall not', 'false');
  if (q.includes('repair') && q.includes('month')) return find('12');
  if (q.includes('confidential') || q.includes('privacy')) return find('shall', 'required', 'true', 'must');
  if (q.includes('honest') || q.includes('truthful') || q.includes('accurate')) return find('shall', 'required', 'true');
  if (q.includes('client') && q.includes('interest')) return find('shall', 'best interest', 'true');
  if (q.includes('scope') && q.includes('limit')) return find('shall', 'true', 'must');
  if (q.includes('advertise') && (q.includes('false') || q.includes('mislead'))) return find('not permitted', 'shall not', 'false');
  if (q.includes('fee') && q.includes('undisclosed')) return find('not permitted', 'shall not', 'false');
  if (q.includes('inspect') && q.includes('standard')) return find('shall', 'true', 'must', 'required');
  if (q.includes('shall not')) return find('true', 'correct'); // "an inspector shall not X" -> true that they shall not
  if (q.includes('prohibited')) return find('true', 'correct', 'shall not');
  if (q.includes('must') || q.includes('required to') || q.includes('shall')) return find('true', 'shall', 'required', 'yes');
  if (q.includes('may not') || q.includes('cannot') || q.includes('not allowed')) return find('false', 'no', 'not permitted');
  if (q.includes('true or false') && (q.includes('ethical') || q.includes('code'))) return find('true');

  // Default: for ethics questions, "not permitted" / "false" for prohibitions, "true" for requirements
  return find('not permitted', 'is not permitted') || find('true') || labels[0];
}

let qNum = 1;
const maxQ = 20;

while (qNum <= maxQ) {
  await sleep(1000);
  const url = pg.url();
  console.log(`\n[Q${qNum}] URL: ${url}`);

  const state = await pg.evaluate(() => {
    const body = document.body.innerText;
    const radios = Array.from(document.querySelectorAll('input[type=radio]'));
    const labels = Array.from(document.querySelectorAll('label'));

    // Get question text
    const qEl = document.querySelector('h1, h2, p.question, .question-text') || document.body;
    const allText = body.substring(0, 600);

    // Find "Question X of Y" pattern
    const qMatch = allText.match(/Question (\d+) of (\d+)/);
    const qNum = qMatch ? parseInt(qMatch[1]) : null;
    const totalQ = qMatch ? parseInt(qMatch[2]) : null;

    // Extract question text (after "Question X of Y\n")
    const lines = allText.split('\n').map(l => l.trim()).filter(l => l);
    const qLineIdx = lines.findIndex(l => l.match(/Question \d+ of \d+/));
    const questionText = qLineIdx >= 0 ? lines.slice(qLineIdx + 2, qLineIdx + 6).join(' ') : '';

    const labelData = labels.map(l => ({
      id: l.htmlFor,
      text: l.innerText.trim()
    })).filter(l => l.id && l.text);

    return {
      qNum,
      totalQ,
      questionText,
      labels: labelData,
      hasRadios: radios.length > 0,
      bodySnippet: allText.substring(0, 400),
      done: allText.toLowerCase().includes('congratul') || allText.toLowerCase().includes('your score') || allText.toLowerCase().includes('passed') || allText.toLowerCase().includes('results'),
      timeRemaining: allText.match(/(\d+) minutes? remaining/)?.[1] || '?'
    };
  });

  console.log(`Time: ${state.timeRemaining}min | Q${state.qNum}/${state.totalQ}`);
  console.log(`Question: "${state.questionText}"`);
  console.log(`Options:`, state.labels.map(l => l.text));

  if (state.done) {
    console.log('\nEXAM DONE!');
    console.log(state.bodySnippet);
    break;
  }

  if (!state.hasRadios) {
    console.log('No radios found. Body:', state.bodySnippet.substring(0, 200));
    break;
  }

  // Pick answer
  const answer = pickAnswer(state.questionText, state.labels);
  console.log(`Picking: "${answer ? answer.text : 'NONE'}" (id: ${answer ? answer.id : 'N/A'})`);

  if (!answer || !answer.id) {
    console.log('Could not find answer, picking first option');
    const firstId = state.labels[0]?.id;
    if (firstId) await pg.click('#' + firstId);
  } else {
    await pg.click('#' + answer.id);
  }

  // Wait for URL to change (auto-advance) or content to change
  const prevUrl = url;
  await sleep(3000);
  const newUrl = pg.url();

  if (newUrl === prevUrl) {
    // Try screenshot to see what happened
    await pg.screenshot({ path: `scripts/coe-exam-q${qNum}.png`, fullPage: false });
    console.log('URL unchanged, checking state...');
    const newState = await pg.evaluate(() => document.body.innerText.substring(0, 300));
    console.log(newState);
  }

  qNum++;
}

await pg.screenshot({ path: 'scripts/coe-exam-final.png', fullPage: false });
console.log('\nFinal URL:', pg.url());
const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 1000));
console.log(finalText);
browser.disconnect();
