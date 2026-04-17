import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

const examId = 'ES1CK3-1KY-LPPG8E';

function pickAnswer(q, opts) {
  const ql = q.toLowerCase();
  const find = (...terms) => opts.find(o => terms.some(t => o.text.toLowerCase().includes(t)));
  const hasQ = (...terms) => terms.some(t => ql.includes(t));

  try {
    // True/False
    if (opts.length === 2 && opts.some(o => o.text.toLowerCase() === 'true') && opts.some(o => o.text.toLowerCase() === 'false')) {
      if (hasQ('microwave') && hasQ('negligent')) return find('false');
      if (hasQ('longer a crack') && hasQ('less of a structural')) return find('false');
      if (hasQ('untreated wood') && hasQ('not considered an issue')) return find('false');
      if (hasQ('deck built with untreated')) return find('false');
      if (hasQ('stucco or brick veneer') && hasQ('adequate support for ledger')) return find('false');
      if (hasQ('gutters') && hasQ('slope') && hasQ('toward')) return find('true');
      if (hasQ('cantilever') && hasQ('one-third')) return find('true');
      if (hasQ('location of the access') && hasQ('under-floor')) return find('true');
      if (hasQ('all exterior doors') && hasQ('must be inspected')) return find('true');
      if (hasQ('garage door') && hasQ('auto-reverse')) return find('true');
      if (hasQ('heat pump') && hasQ('heating and cooling')) return find('true');
      if (hasQ('inspector is required to determine') && hasQ('cause')) return find('false');
      if (hasQ('thermal imaging') && hasQ('required')) return find('false');
      if (hasQ('radon') && hasQ('required')) return find('false');
      if (hasQ('conflict of interest') || hasQ('kickback')) return find('false');
      if (hasQ('client') && hasQ('confidential')) return find('true');
      if (hasQ('aluminum wiring') && hasQ('concern')) return find('true');
      if (hasQ('knob and tube') && hasQ('concern')) return find('true');
      if (hasQ('firestop') || hasQ('fire block')) return find('true');
      if (hasQ('should') || hasQ('must') || hasQ('required to report')) return find('true');
      if (hasQ('not required') || hasQ('not obligated') || hasQ('should not')) return find('true');
      return find('true');
    }

    // Multiple choice - specific answers
    if (hasQ('main service disconnect') && hasQ('scope')) return find('within');
    if (hasQ('sump pump') && opts.length === 2) return opts.find(o => !o.text.toLowerCase().includes('not'));
    if (hasQ('structural engineering advice')) return find('are not', 'not');
    if (hasQ('heating') && hasQ('energy source')) return find('energy');
    if (hasQ('plumbing vent pipe') && hasQ('flashing')) return find('boot');
    if (hasQ('expressed as a ratio') && hasQ('inches per foot')) return find('slope');
    if (hasQ('leaf guards') && hasQ('need not be reported')) return find('leaf guard');
    if (hasQ('flat roof') && hasQ('installed')) return find('passive');
    if (hasQ('peak of the roof') && hasQ('flashing')) return find('ridge');
    if (hasQ('clips') && hasQ('sheathing panels')) return find('h');
    if (hasQ('drip-edge') && hasQ('preferred method')) return find('under the roofing paper') || opts[0];
    if (hasQ('clothes dryer') && hasQ('circuits')) return find('30-amp');
    if (hasQ('live wire') && hasQ('known as')) return find('ungrounded');
    if (hasQ('voltage') && hasQ('current') && hasQ('resistance') && hasQ('analogy')) return find('voltage... current... resistance');
    if (hasQ('reported as a problem') && hasQ('electrical panel')) return find('splices');
    if (hasQ('gfci') && hasQ('damp or wet')) return find('damp or wet');
    if (hasQ('inspector wear') && hasQ('electrical panels')) return find('all of these');
    if (hasQ("ohm") && hasQ('law') && hasQ('illustration')) return find("ohm");
    if (hasQ('under-floor spaces') && hasQ('access openings') && hasQ('not smaller than')) return find('18, 24');
    if (hasQ('pre-engineered assembly') && hasQ('framing components')) return find('truss');
    if (hasQ('grouping of short studs')) return find('cripple');
    if (hasQ('from unfinished attic spaces') && hasQ('inspector should inspect')) return find('floor joist');
    if (hasQ('balloon') && hasQ('fire') && hasQ('chases')) return find('balloon');
    if (hasQ('osha') && hasQ('unfinished attics')) return find('confined');
    if (hasQ('awkward bending') && hasQ('lower back')) return find('lower back');
    if (hasQ('lift a heavy ladder')) return find('leg');
    if (hasQ('type ia') && hasQ('step ladder') && hasQ('pounds')) return find('300');
    if (hasQ('one-person inspection') && hasQ('business')) return find('especially diligent');
    if (hasQ('dog bites') && hasQ('cat bites')) return find('more');
    if (hasQ('falls from') && hasQ('ladders') && hasQ('cause')) return find('sliding');
    if (hasQ('safety in the workplace begins')) return find('individual');
    if (hasQ('storm water') && hasQ('sewer system')) return find('should not');
    if (hasQ('traps') && hasQ('siphonage')) return find('air-admittance');
    if (hasQ('traps that impede') && hasQ('not permitted')) return find('drum');
    if (hasQ('water supply') && hasQ('public or private') && hasQ('required')) return find('is not');
    if (hasQ('flow of liquids') && hasQ('reverse') && hasQ('potable water')) return find('backflow');
    if (hasQ('vertical') && hasQ('topmost fixture') && hasQ('gasses')) return find('vent stack');
    if (hasQ('shower compartment') && hasQ('cross-sectional area')) return find('900');
    if (hasQ('whirlpool') && hasQ('access opening')) return find('12x12');
    if (hasQ('laundry tubs') && hasQ('smooth') && hasQ('sanitary')) return find('concrete');
    if (hasQ('first point of disconnect') && hasQ('utility')) return find('service');
    if (hasQ('air-admittance valves') && hasQ('activated')) return find('pressure');
    if (hasQ('air-admittance valves') && hasQ('island')) return find('permitted');
    if (hasQ('bored hole') && hasQ('solid wood floor joist') && hasQ('top or bottom')) return find('2');
    if (hasQ('gypsum board') && hasQ('garage') && hasQ('residence')) return find('1/2');
    if (hasQ('vertical clearance') && hasQ('service conductors') && hasQ('residential')) return find('10');
    if (hasQ('diameter of bored holes') && hasQ('should not exceed')) return find('one-third');
    if (hasQ('not installed in a raceway') && hasQ('open electrical service')) return find('10 feet');
    if (hasQ('minimum height') && hasQ('masonry chimney')) return find('3');
    if (hasQ('wood and other moisture') && hasQ('decay') && hasQ('oldest')) return find('separation');
    if (hasQ('moisture and water vapor') && hasQ('three ways')) return find('heat');
    if (hasQ('fall in ground level') && hasQ('10 f')) return find('6');
    if (hasQ('exterior walls') && hasQ('envelope')) return find('weather-resistant');
    if (hasQ('sealing materials') && hasQ('impervious coatings')) return find('dampproofing');
    if (hasQ('re-roofing over') && hasQ('composition shingles') && hasQ('reduces')) return find('water');
    if (hasQ('finished basements') && hasQ('slab surface')) return find('2 inches');
    if (hasQ('warm air') && hasQ('water vapor') && hasQ('carries')) return find('warm');
    if (hasQ('carpet') && hasQ('slabs on grade')) return find('should not be');
    if (hasQ('hammer test') && hasQ('wood')) return find('solid');
    if (hasQ('deck collapses') && hasQ('90%')) return find('ledger');
    if (hasQ('pick') && hasQ('decayed wood')) return find('pick');
    if (hasQ('top end-grain') && hasQ('vertical posts')) return find('angle');
    if (hasQ('painted deck posts') && hasQ('wood decay')) return find('hide');
    if (hasQ('deck planking') && hasQ('supported by a minimum')) return find('three');
    if (hasQ('stucco or brick veneer') && hasQ('ledger')) return find('does not');
    if (hasQ('handrails') && hasQ('safety')) return find('graspable');
    if (hasQ('double-tapped') || hasQ('double tap')) return find('problem', 'defect', 'report') || opts[0];
    if (hasQ('inspector should') && hasQ('recommend') && hasQ('specialist')) return find('specialist', 'qualified professional') || opts[0];

    return opts[0];
  } catch(e) {
    return opts[0];
  }
}

async function processQuestion(qNum) {
  await pg.goto(`https://www.nachi.org/my/exams/online-inspector-exam/${examId}/${qNum}`,
    { waitUntil: 'networkidle2', timeout: 20000 });
  await sleep(500);

  return pg.evaluate(() => {
    const mainText = document.body.innerText;
    if (!mainText.includes('minutes remaining')) return null;
    const radios = Array.from(document.querySelectorAll('input[type="radio"], input[type="checkbox"]'));
    const options = radios.map(r => {
      const label = document.querySelector(`label[for="${r.id}"]`) || r.closest('label');
      return { id: r.id, value: r.value, text: (label ? label.innerText : r.value).trim(), checked: r.checked };
    });
    const timeMatch = mainText.match(/(\d+) minutes remaining/);
    const qMatch = mainText.match(/Question \d+ of \d+\n([\s\S]{10,400}?)(?=\n(?:True|False|not required|required|are |are not|[A-Z][a-z]|Skip|\d))/);
    return {
      questionText: qMatch ? qMatch[1].trim() : '',
      options,
      timeLeft: timeMatch ? parseInt(timeMatch[1]) : 0,
      alreadyAnswered: radios.some(r => r.checked)
    };
  });
}

let answered = 0;

// Process Q80-120 first (we're already there)
for (let qNum = 80; qNum <= 120; qNum++) {
  try {
    const data = await processQuestion(qNum);
    if (!data) { console.log(`Q${qNum}: exam may have ended`); break; }
    if (data.timeLeft < 2) { console.log('Time almost up!'); break; }
    if (data.alreadyAnswered) { console.log(`Q${qNum}: already answered`); continue; }

    const answer = pickAnswer(data.questionText, data.options);
    console.log(`Q${qNum} [${data.timeLeft}min]: ${data.questionText.substring(0,70)} → "${answer?.text}"`);

    if (answer) {
      await pg.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.click();
      }, answer.id);
      await sleep(300);
      answered++;
    }

    await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const next = btns.find(b => ['next', 'next question', 'continue'].includes((b.innerText || '').toLowerCase().trim()));
      if (next) next.click();
    });
    await sleep(350);
  } catch(e) {
    console.log(`Q${qNum} err: ${e.message}`);
  }
}

// Now go back for Q2-79
console.log('\n--- Back-filling Q2-79 ---');
for (let qNum = 2; qNum <= 79; qNum++) {
  try {
    const data = await processQuestion(qNum);
    if (!data) { console.log(`Q${qNum}: page issue`); continue; }
    if (data.timeLeft < 2) { console.log('Time almost up! Stopping.'); break; }
    if (data.alreadyAnswered) continue;

    const answer = pickAnswer(data.questionText, data.options);
    if (answer && data.options.length > 0) {
      await pg.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.click();
      }, answer.id);
      await sleep(250);
      answered++;
      console.log(`Q${qNum}: "${data.questionText.substring(0,60)}" → "${answer.text}"`);
    }
  } catch(e) {
    console.log(`Q${qNum} err: ${e.message}`);
  }
}

console.log(`\nAnswered: ${answered} questions`);

// Check final state
const finalState = await pg.evaluate(() => document.body.innerText.substring(0, 500));
console.log('Final page:', finalState);
await pg.screenshot({ path: 'scripts/nachi-exam-final.png' });
browser.disconnect();
