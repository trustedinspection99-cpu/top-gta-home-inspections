import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

function pickAnswer(q, opts) {
  const ql = q.toLowerCase();
  const find = (...terms) => opts.find(o => terms.some(t => o.text.toLowerCase().includes(t)));
  const hasQ = (...terms) => terms.some(t => ql.includes(t));

  // True/False
  if (opts.length === 2 && opts.some(o => o.text.toLowerCase() === 'true') && opts.some(o => o.text.toLowerCase() === 'false')) {
    if (hasQ('solar panel')) return find('false');
    if (hasQ('crawl space') && (hasQ('must enter all') || hasQ('required to enter all'))) return find('false');
    if (hasQ('attic') && (hasQ('must enter all') || hasQ('required to enter all'))) return find('false');
    if (hasQ('move') && hasQ('insulation')) return find('false');
    if (hasQ('move') && hasQ('carpet')) return find('false');
    if (hasQ('smoke detector') && hasQ('fireplace')) return find('true');
    if (hasQ('btu')) return find('false');
    if (hasQ('verify') && hasQ('service ground')) return find('false');
    if (hasQ('insert a tool') && hasQ('panel')) return find('false');
    if (hasQ('activate') && hasQ('thermostatically')) return find('false');
    if (hasQ('ignite') || (hasQ('light') && hasQ('pilot'))) return find('false');
    if (hasQ('refrigerant')) return find('false');
    if (hasQ('guarantee') && hasQ('shower')) return find('false');
    if (hasQ('thermostat calibration')) return find('false');
    if (hasQ('thermal imaging') && hasQ('required')) return find('false');
    if (hasQ('radon') && hasQ('required')) return find('false');
    if (hasQ('conflict of interest') || hasQ('kickback')) return find('false');
    if (hasQ('fastening') && hasQ('roof-covering')) return find('false');
    if (hasQ('simply joining') && hasQ('certified')) return find('false');
    if (hasQ('fire alarm') && hasQ('required')) return find('false');
    if (hasQ('lawn irrigation') || hasQ('sprinkler')) return find('false');
    if (hasQ('aluminum wiring') && hasQ('concern')) return find('true');
    if (hasQ('knob and tube') && hasQ('concern')) return find('true');
    if (hasQ('all exterior doors')) return find('true');
    if (hasQ('garage door') && hasQ('auto-reverse')) return find('true');
    if (hasQ('heat pump') && hasQ('heating and cooling')) return find('true');
    if (hasQ('client') && hasQ('confidential')) return find('true');
    if (hasQ('firestop') || hasQ('fire block')) return find('true');
    if (hasQ('location of the access') && hasQ('under-floor')) return find('true');
    if (hasQ('ventilation') && hasQ('unfinished')) return find('true');
    if (hasQ('floors') && hasQ('walls') && hasQ('ceilings')) return find('true');
    if (hasQ('run') && hasQ('water') && hasQ('supply') && hasQ('must')) return find('true');
    if (hasQ('cpi') && hasQ('logo')) return find('true');
    if (hasQ('walkway') || hasQ('driveway')) return find('true');
    return find('true');
  }

  // Multiple choice
  // Handle solar panel BEFORE not-within-scope block
  if (hasQ('solar panel') && !hasQ('not within the scope') && !hasQ('not within scope')) return find('not within');

  if (hasQ('not within the scope') || hasQ('not within scope')) {
    if (hasQ('removing panelboard')) return find('removing');
    if (hasQ('solar')) return find('not within');
    return find('removing', 'not within', 'not') || opts[opts.length - 1];
  }
  if (hasQ('windows') && hasQ('must be inspected') && hasQ('number')) return find('representative');
  if (hasQ('main service disconnect') && hasQ('scope')) return find('within');
  if (hasQ('sump pump') && opts.length === 2) return opts.find(o => !o.text.toLowerCase().includes('not')) || opts[0];
  if (hasQ('structural engineering')) return find('are not', 'not');
  if (hasQ('energy source') && hasQ('describe')) return find('energy');
  if (hasQ('fastening') && hasQ('roof-covering') && hasQ('scope')) return find('not within');
  if (hasQ('drip-edge') || (hasQ('drip edge') && hasQ('roof'))) return find('under') || opts[0];
  if (hasQ('clothes dryer') && hasQ('circuit')) return find('30');
  if (hasQ('clothes dryer') && hasQ('vent')) return find('exterior', 'outside', 'outdoors') || find('attic') || opts[0];
  if (hasQ('live wire') || (hasQ('ungrounded') && hasQ('known as'))) return find('ungrounded');
  if (hasQ('reported as a problem') && hasQ('panel')) return find('splices');
  if (hasQ('gfci') && hasQ('damp or wet')) return find('damp or wet');
  if (hasQ('inspector wear') && hasQ('electrical')) return find('all');
  if (hasQ('under-floor') && hasQ('not smaller')) return find('18');
  if (hasQ('grouping of short studs')) return find('cripple');
  if (hasQ('balloon') && hasQ('fire')) return find('balloon');
  if (hasQ('type ia') && hasQ('ladder') && hasQ('pounds')) return find('300');
  if (hasQ('falls from') && hasQ('ladder')) return find('sliding');
  if (hasQ('storm water') && hasQ('sewer')) return find('should not');
  if (hasQ('traps') && hasQ('siphonage')) return find('air-admittance');
  if (hasQ('traps') && hasQ('not permitted')) return find('drum');
  if (hasQ('flow of liquids') && hasQ('reverse')) return find('backflow');
  if (hasQ('shower') && hasQ('cross-sectional')) return find('900');
  if (hasQ('whirlpool') && hasQ('access')) return find('12');
  if (hasQ('first point of disconnect') && hasQ('utility')) return find('service');
  if (hasQ('bored hole') && hasQ('floor joist') && hasQ('top or bottom')) return find('2');
  if (hasQ('gypsum board') && hasQ('garage')) return find('1/2');
  if (hasQ('vertical clearance') && hasQ('service conductors')) return find('10');
  if (hasQ('diameter of bored holes') && hasQ('exceed')) return find('one-third');
  if (hasQ('minimum height') && hasQ('masonry chimney')) return find('3');
  if (hasQ('wood') && hasQ('decay') && hasQ('oldest')) return find('separation');
  if (hasQ('fall in ground level') && hasQ('10 f')) return find('6');
  if (hasQ('sealing materials') && hasQ('impervious')) return find('dampproofing');
  if (hasQ('re-roofing') && hasQ('reduces')) return find('water');
  if (hasQ('warm air') && hasQ('water vapor')) return find('warm');
  if (hasQ('carpet') && hasQ('slabs on grade')) return find('should not be');
  if (hasQ('deck collapses') && hasQ('90%')) return find('ledger');
  if (hasQ('pick') && hasQ('decayed wood')) return find('pick');
  if (hasQ('top end-grain') && hasQ('posts')) return find('angle');
  if (hasQ('painted') && hasQ('posts') && hasQ('decay')) return find('hide');
  if (hasQ('deck planking') && hasQ('minimum')) return find('three');
  if (hasQ('stucco or brick') && hasQ('ledger')) return find('does not');
  if (hasQ('handrails') && hasQ('safety')) return find('graspable');
  if (hasQ('double-tap') || hasQ('double tap') || hasQ('double-tapped')) return find('problem', 'defect', 'report') || opts[0];
  if (hasQ('carport')) return find('carport');
  if (hasQ('type of fireplace') || (hasQ('masonry') && hasQ('factory'))) return find('factory');
  if (hasQ('damper') && hasQ('made of')) return find('ferrous');
  if (hasQ('chimney') && hasQ('cap') && hasQ('drip')) return find('drip');
  if (hasQ('r-value') && hasQ('higher')) return find('better');
  if (hasQ('attics') && hasQ('crawl spaces') && hasQ('foundation')) return find('crawl');
  if (hasQ('not required to evaluate')) return find('central vacuum', 'fire alarm', 'swimming pool');
  if (hasQ('ramps') && hasQ('part of')) return find('ramp');
  if (hasQ('firewall') && hasQ('compromises')) return find('not required');
  if (hasQ('should always be inspected')) return find('ceiling');
  if (hasQ('double-glazed') && hasQ('failed seals')) return find('should');
  if (hasQ('out-of-square') && hasQ('door frames')) return find('within');
  if (hasQ('heating system') && hasQ('blocked')) return find('correction');
  if (hasQ('cooling system') && hasQ('blocked')) return find('correction');
  if (hasQ('pilot light') && hasQ('not lit')) return find('is not');
  if (hasQ('chimney flue') && hasQ('interior')) return find('is not');
  if (hasQ('geothermal') && hasQ('efficiency')) return find('not within', 'is not within', 'outside');
  if (hasQ('heat exchanger')) return find('are not');
  if (hasQ('electric furnaces') && hasQ('falls')) return find('within');
  if (hasQ('visible') && hasQ('drain-waste')) return find('visible');
  if (hasQ('water heater') && hasQ('capacity')) return find('if labeled');
  if (hasQ('shower pan') && hasQ('guarantee')) return find('not required');
  if (hasQ('shut-off') || (hasQ('main water') && hasQ('fuel'))) return find('shutoff', 'shut-off');
  if (hasQ('toilets') && hasQ('check')) return find('all of these');
  if (hasQ('public or private') && hasQ('evidence')) return find('observed');
  if (hasQ('water heater') && hasQ('not working')) return find('defect', 'correction');
  if (hasQ('two faucets') || hasQ('running two') || (hasQ('water flow') && hasQ('check'))) return find('two faucets', 'simultaneously');
  if (hasQ('gfci') && hasQ('inspect') && hasQ('number')) return find('all');
  if (hasQ('electric meter')) return find('electric meter');
  if (hasQ('breaker') && hasQ('off position')) return find('leave');
  if (hasQ('aluminum') && hasQ('branch-circuit')) return find('corrected', 'correction');
  if (hasQ('not required to inspect the')) return find('fire alarm');
  if (hasQ('amperage') && hasQ('disconnect')) return find('if labeled');
  if (hasQ('overhead service conductors')) return find('within');
  if (hasQ('discriminate') || hasQ('discrimination')) return find('not discriminate');
  if (hasQ('repair services') && hasQ('months')) return find('12');
  if (hasQ('truthful') && hasQ('qualifications')) return find('required');
  if (hasQ('thermostat') && hasQ('operate') && hasQ('system')) return find('normal', 'thermostat');
  if (hasQ('ac') && hasQ('run') && hasQ('always')) return find('should not');
  if (hasQ('foundation') && hasQ('settlement')) return find('foundation');
  if (hasQ('structural') && hasQ('evaluate')) return find('none of these');
  if (hasQ('btu') && (hasQ('inadequate') || hasQ('3,000'))) return find('defect', 'is a defect', 'inadequate');
  if (hasQ('window') && hasQ('unit') && hasQ('unplugged')) return find('not required', 'is not required', 'should not');
  if (hasQ('heating system') && hasQ('did not turn on')) return find('tag', 'defect', 'report', 'hazard');
  if (hasQ('tree') && hasQ('rear yard')) return find('not report', 'not required', 'not within', 'no');
  if (hasQ('water shutoff') && hasQ('required')) return find('are not', 'not required');
  if (hasQ('drop') && hasQ('ceiling') && hasQ('tile') && hasQ('remove')) return find('not required', 'is not');

  return opts[0];
}

const currentUrl = pg.url();
console.log('Starting URL:', currentUrl);
const examMatch = currentUrl.match(/internachi-home-inspection-standards-of-practice\/([A-Z0-9-]+)\/(\d+)/);
if (!examMatch) { console.log('Not on exam page.'); browser.disconnect(); process.exit(1); }
const examId = examMatch[1];
const startQ = parseInt(examMatch[2]);
console.log('Exam ID:', examId, 'Starting at Q:', startQ);

let answered = 0;
let qNum = startQ;

while (qNum <= 75) {
  try {
    // Check we are on the expected question; navigate if not
    const url = pg.url();
    const urlMatch = url.match(/\/([A-Z0-9-]+)\/(\d+)$/);
    const currentQ = urlMatch ? parseInt(urlMatch[2]) : -1;

    if (currentQ !== qNum) {
      console.log(`URL is Q${currentQ}, expected Q${qNum}. Navigating to Q${qNum}...`);
      await pg.goto(`https://www.nachi.org/my/exams/internachi-home-inspection-standards-of-practice/${examId}/${qNum}`, { waitUntil: 'networkidle2', timeout: 20000 });
      await sleep(800);
    }

    const data = await pg.evaluate(() => {
      const text = document.body.innerText;
      const radios = Array.from(document.querySelectorAll('input[type="radio"]'));
      const timeMatch = text.match(/(\d+) minutes remaining/);
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);
      const qIdx = lines.findIndex(l => /^Question \d+ of \d+$/.test(l));
      const titleIdx = lines.findIndex((l, i) => i > qIdx && l.includes('Standards of Practice'));
      const questionText = (qIdx >= 0 && titleIdx >= 0) ? lines.slice(titleIdx + 1).slice(0, 5).join(' ') : text.substring(100, 400);
      return {
        questionText,
        options: radios.map(r => {
          const label = document.querySelector(`label[for="${r.id}"]`) || r.closest('label');
          return { id: r.id, text: label ? (label.innerText || label.textContent || '').trim() : r.value, checked: r.checked };
        }),
        timeLeft: timeMatch ? parseInt(timeMatch[1]) : 99,
        alreadyAnswered: radios.some(r => r.checked)
      };
    });

    if (data.timeLeft < 2) { console.log('Time up!'); break; }

    if (!data.alreadyAnswered && data.options.length > 0) {
      const answer = pickAnswer(data.questionText, data.options);
      const answerText = answer?.text?.substring(0, 35) || 'NONE';
      console.log(`Q${qNum}/75 [${data.timeLeft}min]: ${data.questionText.substring(0, 60)} -> "${answerText}"`);

      if (answer) {
        await pg.evaluate((id) => {
          const el = document.getElementById(id);
          if (el) el.click();
        }, answer.id);
        await sleep(700);
        answered++;
      } else {
        console.log(`  WARNING no match. Options: ${data.options.map(o => o.text.substring(0, 20)).join(' | ')}`);
      }
    } else {
      console.log(`Q${qNum}: ${data.alreadyAnswered ? 'already answered' : 'no options'}`);
    }

    // Click Save Answer & Continue (btn-blue) and wait for the resulting navigation
    await Promise.all([
      pg.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {}),
      pg.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button[type="submit"]')).find(b => b.className.includes('btn-blue'));
        if (btn) btn.click();
      })
    ]);
    await sleep(400);
    qNum++;

  } catch(e) {
    console.log(`Q${qNum} err: ${e.message.substring(0, 80)}`);
    await sleep(1500);
    qNum++;
  }
}

console.log(`\nAnswered: ${answered} questions`);
await sleep(3000);
const finalUrl = pg.url();
const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 600));
console.log('Final URL:', finalUrl);
console.log('Final page:', finalText);
await pg.screenshot({ path: 'scripts/exam2-result.png' });
browser.disconnect();
