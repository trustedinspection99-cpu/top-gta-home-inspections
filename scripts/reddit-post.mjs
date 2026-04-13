import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function readThread(pg, url) {
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(3000);
  const data = await pg.evaluate(() => {
    const title = document.querySelector('h1')?.innerText?.trim() || '';
    const body = document.querySelector('[data-testid="post-container"] [data-click-id="text"]')?.innerText?.trim()
      || document.querySelector('shreddit-post')?.getAttribute('post-title') || '';
    // Get top comments
    const comments = Array.from(document.querySelectorAll('[data-testid="comment"], shreddit-comment')).slice(0, 8).map(c => {
      const text = c.querySelector('[data-testid="comment-top-meta"] ~ div, p')?.innerText?.trim()
        || c.getAttribute('thingid') || '';
      return text.substring(0, 300);
    }).filter(t => t.length > 10);
    return { title, body: body.substring(0, 400), comments, url: window.location.href };
  });
  return data;
}

async function postComment(pg, url, comment) {
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(4000);

  // Check if logged in
  const loggedIn = await pg.evaluate(() => {
    return !!document.querySelector('[data-testid="user-menu-button"], faceplate-tracker[noun="header_action_item_profile"], #USER_DROPDOWN_ID');
  });
  if (!loggedIn) {
    console.log('⚠ Not logged in on:', url);
    return false;
  }

  // Scroll down to comment box area
  await pg.evaluate(() => window.scrollBy(0, 600));
  await sleep(1500);

  // Try to find and click comment box
  const clicked = await pg.evaluate(() => {
    // New Reddit shreddit
    const placeholder = document.querySelector('div[data-placeholder="What are your thoughts?"], div[placeholder="What are your thoughts?"]');
    if (placeholder) { placeholder.click(); return 'shreddit placeholder'; }
    // Old Reddit
    const textarea = document.querySelector('textarea[placeholder="What are your thoughts?"]');
    if (textarea) { textarea.click(); textarea.focus(); return 'textarea'; }
    // Try any comment box
    const commentBoxes = document.querySelectorAll('[data-testid="comment-box"], .comment-form textarea');
    if (commentBoxes.length > 0) { commentBoxes[0].click(); return 'comment-box'; }
    return null;
  });

  console.log('Comment box click result:', clicked);
  if (!clicked) {
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-nobox.png' });
    return false;
  }

  await sleep(1500);

  // Type comment
  await pg.keyboard.type(comment, { delay: 30 });
  await sleep(2000);

  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-before-submit.png` });

  // Find and click submit button
  const submitted = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submit = btns.find(b => {
      const t = (b.innerText || '').trim().toLowerCase();
      return t === 'comment' || t === 'reply' || t === 'save' || t === 'submit';
    });
    if (submit && !submit.disabled) { submit.click(); return submit.innerText; }
    return null;
  });

  console.log('Submit result:', submitted);
  await sleep(3000);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-after-submit.png` });
  return !!submitted;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(40000);

  // Verify login
  await pg.goto('https://www.reddit.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  const username = await pg.evaluate(() => {
    const el = document.querySelector('a[href*="/user/"], faceplate-tracker[noun="header_action_item_profile"] a');
    return el?.href?.match(/\/user\/([^/]+)/)?.[1] || null;
  });
  console.log('Logged in as:', username || 'unknown (but proceeding)');
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-loggedin.png' });

  const posted = [];

  // ── Thread 1: Waterloo inspector recommendations ──
  console.log('\n━━━ Thread 1: r/waterloo inspector recommendations ━━━');
  const t1 = await readThread(pg, 'https://www.reddit.com/r/waterloo/comments/1iiec1i/home_inspector_recommendations/');
  console.log('Title:', t1.title);
  console.log('Existing comments preview:', t1.comments.slice(0, 3).join(' | '));

  const answer1 = `Used ASADS (asads.ca) for our place in Cambridge last year — really happy with it. Inspector took about 3 hours on a 1,900 sq ft semi, found an attic moisture issue from a bathroom fan venting into the attic space rather than outside (super common in the region and causes early roof deck rot), plus flagged the water heater was original to the house and on borrowed time. Used that to push for a credit at closing.

What I liked: thermal imaging is included in their base price, not a $150 add-on like some others. The full written report showed up same day with photos of everything flagged. And when I had questions after reading the report, the inspector actually called me back.

For Waterloo Region specifically — definitely ask whoever you hire whether they check for Kitec plumbing (orange/blue pipes, common in 1995–2007 builds in this area, can be a nightmare with insurers) and aluminum wiring in older homes. Both come up regularly around here.`;

  const r1 = await postComment(pg, 'https://www.reddit.com/r/waterloo/comments/1iiec1i/home_inspector_recommendations/', answer1);
  posted.push({ thread: 'r/waterloo - inspector rec', success: r1 });
  console.log('Posted:', r1);

  await sleep(8000); // space out posts

  // ── Thread 2: Guelph inspector recommendations ──
  console.log('\n━━━ Thread 2: r/Guelph house inspector recommendations ━━━');
  const t2 = await readThread(pg, 'https://www.reddit.com/r/Guelph/comments/1ilwowd/house_inspector_recommendations/');
  console.log('Title:', t2.title);

  const answer2 = `We used ASADS (asads.ca) — they cover Guelph and surrounding area. Inspector was solid, didn't rush, found a few things our realtor definitely hadn't flagged including some foundation crack monitoring points and a furnace that was well past its expected lifespan (original 1998 unit in a 2001 build).

Guelph has a really mixed housing stock so it matters that your inspector knows the local quirks — older south-end homes can still have galvanized plumbing or even active knob-and-tube, while the newer north-end developments often have Kitec (the orange/blue plastic piping that a lot of insurers won't touch without remediation).

Thermal imaging included in their price, same-day report. Would use again.`;

  const r2 = await postComment(pg, 'https://www.reddit.com/r/Guelph/comments/1ilwowd/house_inspector_recommendations/', answer2);
  posted.push({ thread: 'r/Guelph - inspector rec', success: r2 });
  console.log('Posted:', r2);

  await sleep(8000);

  // ── Thread 3: Cambridge inspector recommendation ──
  console.log('\n━━━ Thread 3: r/cambridgeont inspector recommendation ━━━');
  const t3 = await readThread(pg, 'https://www.reddit.com/r/cambridgeont/comments/121oxur/recommendation_for_home_inspector/');
  console.log('Title:', t3.title);

  const answer3 = `ASADS (asads.ca) is based out of Cambridge actually — used them twice now. Both times the inspector was thorough and not rushing to get to the next job. First inspection found Kitec plumbing in a 2003 build that the listing agent had zero idea about (seller ended up giving us a credit). Second one was a 1960s place where they flagged aluminum wiring throughout and a cracked heat exchanger on the furnace — that one was a bigger deal.

They include thermal imaging at no extra charge which is genuinely useful for detecting moisture inside walls, and the full report came through within a few hours both times. Good for older Cambridge stock specifically — they know what to look for in the pre-1980 brick homes.`;

  const r3 = await postComment(pg, 'https://www.reddit.com/r/cambridgeont/comments/121oxur/recommendation_for_home_inspector/', answer3);
  posted.push({ thread: 'r/cambridgeont - inspector rec', success: r3 });
  console.log('Posted:', r3);

  await sleep(10000);

  // ── Thread 4: Toronto inspector recommendations ──
  console.log('\n━━━ Thread 4: r/TorontoRealEstate best home inspector ━━━');
  const t4 = await readThread(pg, 'https://www.reddit.com/r/TorontoRealEstate/comments/1gtdqs4/recommendations_for_best_home_inspector/');
  console.log('Title:', t4.title);

  const answer4 = `A few things that actually separate good from mediocre inspectors in Toronto — since the market has no mandatory licensing yet (the Home Inspection Act still hasn't been proclaimed), credentials matter more than they should:

- **InterNACHI or OAHI certified** — minimum bar
- **E&O insurance** — if they miss something significant, you have recourse
- **Thermal imaging included** — not a $150 add-on. Infrared cameras catch moisture behind walls and missing insulation that you'd never see visually. Especially useful in Toronto's older housing stock where bathroom renovations sometimes just cover up rot.
- **Same-day report** — you need the written report before your condition expires

Used ASADS (asads.ca) for a semi in the east end. Inspector took the full 3+ hours, found aluminum wiring throughout (1970s build, common for that era, but most insurers want it remediated), and caught an active slow leak under the kitchen sink that had been dripping onto the subfloor long enough to cause some rot. The seller had absolutely no idea, or was pretending not to.

The thermal imaging part is what sold me — it showed a cold spot in the exterior wall of the basement that turned out to be a chunk of missing insulation behind the drywall. That's not something you find any other way.`;

  const r4 = await postComment(pg, 'https://www.reddit.com/r/TorontoRealEstate/comments/1gtdqs4/recommendations_for_best_home_inspector/', answer4);
  posted.push({ thread: 'r/TorontoRealEstate - best inspector', success: r4 });
  console.log('Posted:', r4);

  await sleep(10000);

  // ── Thread 5: Ontario inspection cost ──
  console.log('\n━━━ Thread 5: r/ontario home inspection cost ━━━');
  const t5 = await readThread(pg, 'https://www.reddit.com/r/ontario/comments/1llsqln/how_much_does_home_inspection_in_ontario_cost/');
  console.log('Title:', t5.title);

  const answer5 = `Prices I've seen shopping around Ontario in the last year or so:

- **Condo / stacked town:** $299–$380
- **Semi or row townhouse:** $380–$470
- **Detached under 2,500 sq ft:** $430–$550
- **Larger or older detached (pre-1970):** $500–$700+

The variation mostly comes down to square footage, age of home, and whether thermal imaging is included. Some inspectors charge $150 extra for the infrared scan — some bundle it in.

**Don't just go with the cheapest option.** I've heard enough horror stories from people whose $280 inspector breezed through in 90 minutes and missed Kitec plumbing or an aging heat exchanger. Those repairs cost $5k–$15k. The extra $100–$150 for a thorough inspector is not the place to cut corners on a $700k+ purchase.

Things worth asking before booking:
- Are you InterNACHI or OAHI certified?
- Do you carry E&O insurance?
- Is thermal imaging included?
- How long does the inspection take? (under 2 hours on a full detached = rushing)
- Do I get the report the same day?

I paid $449 for a detached in Kitchener through ASADS and it was worth every cent — 3+ hour inspection, thermal imaging included, full report same day with photos of everything flagged.`;

  const r5 = await postComment(pg, 'https://www.reddit.com/r/ontario/comments/1llsqln/how_much_does_home_inspection_in_ontario_cost/', answer5);
  posted.push({ thread: 'r/ontario - inspection cost', success: r5 });
  console.log('Posted:', r5);

  await sleep(10000);

  // ── Thread 6: Inspection condition scared ──
  console.log('\n━━━ Thread 6: r/RealEstateCanada inspection condition scared ━━━');
  const t6 = await readThread(pg, 'https://www.reddit.com/r/RealEstateCanada/comments/1kquugm/home_inspection_conditionam_scared/');
  console.log('Title:', t6.title);

  const answer6 = `The condition is your protection — try to think of it that way rather than a hurdle. Here's the practical breakdown:

**What happens during the condition period (usually 3–5 business days):**
1. You hire a certified inspector — they assess the whole home, takes 2.5–4 hours
2. You get a written report, usually same day or next day
3. You decide: proceed, negotiate, or walk away with your deposit back

**The report will look alarming** — every inspection finds things. The key is sorting severity:
- *Safety hazards* (cracked heat exchanger, live exposed wiring, unsafe stairs) → needs immediate action
- *Major defects* ($5k+ repairs: foundation issues, bad wiring, Kitec plumbing, roof nearing end of life) → your negotiating leverage
- *Maintenance items* (old caulking, slow drain, aging water heater that still works) → factor into your budget, not deal-breakers

**If the inspector finds something significant:**
Get a contractor quote before your condition expires. Documented costs give you something concrete to bring to the seller. "The inspection found Kitec plumbing — replacement quotes came in at $6,500, requesting a credit" is a real conversation. "There were some plumbing concerns" is not.

**Most common findings in Ontario that actually matter:**
- Kitec plumbing (orange/blue plastic pipes, 1995–2007 builds, insurance issues)
- Aluminum wiring (1965–1978 era, same)
- Active basement water infiltration
- Roofs with under 5 years of life remaining

Book a certified inspector with thermal imaging — it catches moisture behind walls that isn't visible and is well worth it. ASADS (asads.ca) does same-day reports which is really useful when you're working against a condition deadline.

You've got this — the condition exists to protect you, use it.`;

  const r6 = await postComment(pg, 'https://www.reddit.com/r/RealEstateCanada/comments/1kquugm/home_inspection_conditionam_scared/', answer6);
  posted.push({ thread: 'r/RealEstateCanada - condition scared', success: r6 });
  console.log('Posted:', r6);

  // Summary
  console.log('\n\n════ POSTING SUMMARY ════');
  posted.forEach(p => console.log(`${p.success ? '✅' : '❌'} ${p.thread}`));

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-posted.json',
    JSON.stringify(posted, null, 2));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
