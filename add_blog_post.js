const fs = require('fs');
const file = fs.readFileSync('src/data/blogPosts.ts', 'utf8');

const content = `
      <p class="mb-4 text-lg">You have found the home, your offer was accepted, and now you are facing the home inspection — one of the most important steps in buying property in Ontario.</p>
      <p class="mb-6">This guide is written by <strong>Haroon Choudhry</strong>, founder of ASADS Home Inspection and a certified Master Inspector with 15+ years and 2,000+ inspections across the Greater Toronto Area.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">What Is a Home Inspection?</h2>
      <p class="mb-4">A home inspection is a comprehensive, non-invasive visual examination of a property's accessible systems and components conducted by a licensed inspector. It covers the structure, roof, electrical, plumbing, HVAC, insulation, and more.</p>
      <p class="mb-4">In Ontario, home inspectors have been <strong>licensed under the Home Inspection Act, 2017</strong> since 2023. Every inspector must carry errors-and-omissions (E&amp;O) insurance and follow the Ontario Standards of Practice. Always confirm your inspector is licensed before booking.</p>
      <p class="mb-4">The purpose is not to pass or fail a home — <strong>no home inspection results in a pass or fail</strong>. It gives you an objective, documented picture of the property's condition so you can make an informed purchase decision.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">Do You Need a Home Inspection in Ontario?</h2>
      <p class="mb-4">Home inspections are not legally mandatory for resale properties in Ontario. However, since 2023, <strong>Ontario's Trust in Real Estate Services Act (TRESA)</strong> entitles buyers to a reasonable opportunity to conduct a home inspection before making a firm offer.</p>
      <p class="mb-4">Skipping a home inspection is one of the most financially risky decisions a buyer can make. A $400 to $500 inspection can identify issues worth tens of thousands of dollars. We have inspected Toronto homes where buyers discovered:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Active knob-and-tube wiring hidden behind drywall — $12,000 to $20,000 to rewire</li>
        <li>Abandoned underground oil tanks requiring environmental remediation — $50,000 to $200,000</li>
        <li>Failing flat roofs with no insulation — $15,000 to $40,000 to replace</li>
        <li>Foundation wall cracking requiring underpinning — $30,000 to $80,000</li>
        <li>Kitec plumbing in condos — insurance refusal and $5,000 to $15,000 per unit to replace</li>
      </ul>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">How to Choose a Home Inspector in Ontario</h2>
      <p class="mb-4">Do not just hire the first inspector your agent recommends. Here is what to look for:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Provincial license</strong> — required since 2023 under the Home Inspection Act, 2017</li>
        <li><strong>OAHI membership</strong> — RHI designation indicates advanced training</li>
        <li><strong>InterNACHI certification</strong> — international certification with ongoing education requirements</li>
        <li><strong>E&amp;O and liability insurance</strong> — protects you if something is missed</li>
        <li><strong>Construction background</strong> — inspectors with contracting experience identify issues others miss</li>
        <li><strong>Sample reports</strong> — a good report has photos, severity ratings, and clear recommendations</li>
        <li><strong>Verified Google reviews</strong> — not just testimonials on the inspector's own site</li>
      </ul>
      <p class="mb-4">ASADS inspectors are OAHI-registered, InterNACHI-certified, and carry full E&amp;O plus $2M liability insurance. Haroon's background as a former principal contractor means he brings structural and mechanical depth most inspectors cannot match. <a href="/about" class="text-primary underline font-medium">Learn more about our team</a>.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">Before the Inspection: What to Do</h2>
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">As the Buyer</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Book immediately</strong> — Ontario inspection conditions typically give you 5 to 10 business days. Do not wait.</li>
        <li><strong>Attend the inspection</strong> — attending is worth far more than reading the report alone.</li>
        <li><strong>Prepare questions</strong> — write down anything you noticed during showings: stains, smells, cracks, or deferred maintenance.</li>
        <li><strong>Bring your agent</strong> — they need to understand findings to negotiate effectively.</li>
      </ul>
      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">If You Are the Seller</h3>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Clear access to the attic hatch, crawlspace, electrical panel, and water shutoff</li>
        <li>Ensure all utilities are on — gas, hydro, water</li>
        <li>Replace burnt-out lightbulbs — a non-functioning light looks like an electrical issue</li>
        <li>Leave all appliance manuals and maintenance records available</li>
      </ul>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">How Long Does a Home Inspection Take?</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Condo or apartment: <strong>1.5 to 2.5 hours</strong></li>
        <li>Townhouse: <strong>2 to 3 hours</strong></li>
        <li>Detached house up to 2,000 sq ft: <strong>2.5 to 3.5 hours</strong></li>
        <li>Large house 2,000 to 3,500 sq ft: <strong>3 to 4.5 hours</strong></li>
        <li>Older home pre-1970: add 30 to 60 minutes</li>
      </ul>
      <p class="mb-4">Plan to attend the entire inspection. At minimum, arrive for the last 45 to 60 minutes for the verbal walkthrough.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">The Ontario Home Inspection Checklist: What We Inspect</h2>
      <p class="mb-4">A comprehensive Ontario home inspection covers over <strong>200 inspection points</strong> across all accessible systems and components.</p>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Roof and Attic</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1.5">
        <li>Shingle condition, age, and remaining lifespan</li>
        <li>Flashing at chimneys, skylights, and roof penetrations</li>
        <li>Gutters, downspouts, and drainage extensions</li>
        <li>Attic insulation depth — Ontario code requires minimum R-50 for most zones</li>
        <li>Attic ventilation — soffit and ridge vents, bathroom fan terminations</li>
        <li>Signs of moisture, ice damming, or mold in the attic</li>
        <li>Structural condition of rafters and sheathing</li>
      </ul>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Foundation and Structure</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1.5">
        <li>Foundation type — poured concrete, block, stone, or wood</li>
        <li>Cracks — horizontal cracks in block foundations are serious; vertical cracks less so</li>
        <li>Signs of water infiltration, efflorescence, or active seepage</li>
        <li>Floor beam and joist condition in the basement</li>
        <li>Crawlspace — vapour barrier, insulation, moisture</li>
        <li>Evidence of past repairs or underpinning</li>
      </ul>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Electrical System</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1.5">
        <li>Main service size — 60A is inadequate, 100A is minimum modern, 200A is recommended</li>
        <li>Panel type — Federal Pacific and Zinsco panels are recommended for replacement</li>
        <li>Wiring type — knob-and-tube pre-1950s, aluminum 1965 to 1978, copper</li>
        <li>Double-tapped breakers, improper wire gauges, missing knockouts</li>
        <li>GFCI protection in kitchens, bathrooms, garages, and outdoors</li>
        <li>Smoke and CO detectors per Ontario Fire Code</li>
      </ul>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Plumbing</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1.5">
        <li>Supply pipe material — copper, galvanized, PEX, or Kitec which is recalled</li>
        <li>Kitec plumbing identification — orange or blue flexible pipe with brass fittings, common in GTA homes built 1995 to 2007</li>
        <li>Water pressure and flow at multiple fixtures</li>
        <li>Water heater age, fuel type, TPR valve, and venting</li>
        <li>Signs of leaks at supply lines, drain connections, and shut-off valves</li>
        <li>Backwater valve presence — recommended in Ontario basements</li>
      </ul>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Heating and Cooling</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1.5">
        <li>Furnace — age, filter condition, heat exchanger cracks which are a CO risk, venting</li>
        <li>Air conditioner — age, condenser condition, refrigerant lines, condensate drain</li>
        <li>HRV — required in new Ontario homes, beneficial in older ones</li>
        <li>Fireplace and wood stove — WETT inspection recommended for wood-burning appliances</li>
      </ul>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-3">Exterior</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1.5">
        <li>Grading — soil should slope away from the foundation, minimum 6 inches drop in 10 feet</li>
        <li>Siding — brick, stucco, wood, vinyl — cracks, gaps, rot, or moisture damage</li>
        <li>Deck and porch — ledger board connection, post bases, guardrail height and strength</li>
        <li>Garage — door operation, auto-reverse function, separation from living space</li>
        <li>Evidence of abandoned oil fill pipes or vent pipes which indicate an underground oil tank</li>
      </ul>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">Ontario-Specific Issues Generic Checklists Miss</h2>
      <p class="mb-4">Generic home inspection checklists — like those published by banks — cover the basics. Ontario buyers face specific risks that only a locally experienced inspector will catch:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Kitec plumbing</strong> — recalled, insurance-excluded, and common in GTA homes and condos built 1995 to 2007</li>
        <li><strong>Knob-and-tube wiring</strong> — most Ontario insurers refuse coverage; common in pre-1950 Toronto homes</li>
        <li><strong>Underground oil tanks</strong> — remediation can cost $200,000 or more</li>
        <li><strong>Radon gas</strong> — Health Canada identifies Ontario as a moderate-to-high radon risk province; testing recommended</li>
        <li><strong>Attic mold from bathroom fans</strong> — extremely common; fans ducted into attics instead of outside</li>
        <li><strong>Federal Pacific and Zinsco electrical panels</strong> — defective breakers that may not trip during overloads</li>
        <li><strong>Aluminum wiring</strong> — fire risk without proper remediation; widespread in 1965 to 1978 Ontario homes</li>
        <li><strong>UFFI insulation</strong> — banned in Canada in 1980, still found in some Ontario walls and must be disclosed in real estate transactions</li>
      </ul>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">During the Inspection: What Happens</h2>
      <p class="mb-4">A typical ASADS inspection follows this sequence:</p>
      <ol class="list-decimal pl-6 mb-6 space-y-3">
        <li><strong>Exterior walkthrough</strong> — grading, foundation, siding, roof, garage, and deck</li>
        <li><strong>Attic</strong> — insulation, ventilation, rafters, and moisture</li>
        <li><strong>Top floor to basement</strong> — systematic room-by-room interior inspection</li>
        <li><strong>Mechanical systems</strong> — furnace, AC, water heater, electrical panel, plumbing</li>
        <li><strong>Basement and crawlspace</strong> — foundation walls, beams, moisture, sump pump</li>
        <li><strong>Thermal imaging</strong> — infrared scan of walls, ceilings, and electrical panel included with every ASADS inspection</li>
        <li><strong>Verbal walkthrough</strong> — inspector reviews all findings with you at the end and answers questions on site</li>
      </ol>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">What the Inspection Report Looks Like</h2>
      <p class="mb-4">ASADS delivers a <strong>same-day digital inspection report</strong> — typically within 2 to 4 hours of completing the inspection. It includes:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Photos of every significant finding — annotated with arrows and descriptions</li>
        <li>Severity ratings — Safety Hazard, Major Deficiency, Maintenance Item, or Improvement</li>
        <li>Detailed descriptions — what was found, where it is, and why it matters</li>
        <li>Recommendations — repair, monitor, or specialist evaluation</li>
        <li>Summary section — all significant findings in one place for review with your agent</li>
      </ul>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">What to Do After the Inspection</h2>
      <p class="mb-4">If significant deficiencies are found, you have several options under a standard Ontario inspection condition:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Request a price reduction</strong> — based on estimated repair costs from licensed contractors</li>
        <li><strong>Request seller remediation</strong> — seller fixes the issue before closing</li>
        <li><strong>Request a closing credit</strong> — money held back at closing for repairs</li>
        <li><strong>Walk away</strong> — if issues are too severe or the purchase price will not move</li>
      </ul>
      <p class="mb-4">If only minor maintenance items are found, use the report to plan your first-year priorities and budget for deferred repairs before moving in.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">The Final Walkthrough Before Closing</h2>
      <p class="mb-4">Ontario buyers are entitled to a final property walkthrough before closing — typically 24 to 48 hours before possession. Bring your original inspection report, a list of agreed repairs, your purchase agreement, and your phone or camera. Verify agreed repairs were completed, check all included items are present, and test major appliances and systems.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">How Much Does a Home Inspection Cost in Ontario?</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Condo inspection: <strong>$299 to $449</strong></li>
        <li>Pre-purchase up to 1,500 sq ft: <strong>$399 to $449</strong></li>
        <li>Pre-purchase 1,500 to 2,500 sq ft: <strong>$449 to $499</strong></li>
        <li>Large home 3,500 sq ft and over: <strong>$549 and up</strong></li>
        <li>Radon testing add-on: <strong>$199</strong></li>
        <li>Mold air sampling add-on: <strong>$299 and up</strong></li>
      </ul>
      <p class="mb-4">Do not choose an inspector based on price alone. A cheap inspection that misses Kitec plumbing or an underground oil tank can cost you hundreds of thousands of dollars. <a href="/pricing" class="text-primary underline font-medium">View ASADS pricing</a>.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-2">Can a home fail a home inspection?</h3>
      <p class="mb-4">No. A home inspection is not a pass or fail test. Every home including brand new construction will have findings. The report documents current condition and you decide what to do with that information.</p>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-2">Should I get a home inspection on a new build in Ontario?</h3>
      <p class="mb-4">Yes. New homes in Ontario are protected by Tarion warranty but that does not mean they are defect-free. A <a href="/services/new-construction" class="text-primary underline font-medium">new construction inspection</a> — particularly pre-drywall — catches issues before they are buried in the walls.</p>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-2">Can I get a home inspection on a condo?</h3>
      <p class="mb-4">Yes. A <a href="/services/condo" class="text-primary underline font-medium">condo inspection</a> focuses on in-suite systems — plumbing, electrical, HVAC fan coil, moisture, balcony, and appliances. The Status Certificate covers building financials, not unit condition.</p>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-2">Is thermal imaging included in a home inspection?</h3>
      <p class="mb-4">ASADS includes <a href="/services/thermal-imaging" class="text-primary underline font-medium">thermal imaging</a> in every inspection at no extra cost — revealing hidden moisture, missing insulation, and electrical hotspots invisible to the naked eye.</p>

      <h3 class="font-heading text-xl font-semibold mt-6 mb-2">How long do I have to get an inspection after my offer is accepted?</h3>
      <p class="mb-4">A standard Ontario inspection condition gives you 5 to 10 business days. Book immediately after your offer is accepted. ASADS offers same-day and next-day availability across 106 Ontario cities.</p>

      <h2 class="font-heading text-2xl font-bold mt-10 mb-4">Book a Home Inspection in Ontario</h2>
      <p class="mb-4">ASADS Home Inspection serves <strong>106 cities across Ontario</strong>. Every inspection includes a 200-plus point assessment by an OAHI and InterNACHI certified inspector, thermal imaging at no extra charge, a same-day digital report with photos and severity ratings, and a verbal walkthrough on site.</p>
      <p class="mb-4">Call <a href="tel:6478019311" class="text-primary underline font-medium">(647) 801-9311</a>, <a href="/booking" class="text-primary underline font-medium">book online</a>, or <a href="/contact" class="text-primary underline font-medium">send us a message</a>. Available 7 days a week across the GTA and Ontario.</p>
    `;

const newPost = `  {
    id: 50,
    slug: "what-to-expect-from-a-home-inspection",
    title: "What to Expect from a Home Inspection in Ontario (Complete 2025 Guide)",
    metaTitle: "What to Expect from a Home Inspection Ontario | 2025 Guide",
    metaDescription: "What happens during a home inspection in Ontario? Duration, checklist, report, costs & what to do after. Written by a certified inspector. Book ASADS today.",
    excerpt: "A certified Ontario home inspector walks you through exactly what happens before, during, and after a home inspection — what is checked, how long it takes, what the report looks like, and how to use findings to negotiate.",
    category: "Buying Tips",
    author: "Haroon Choudhry — Master Inspector, ASADS",
    date: "2025-03-10",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=500&fit=crop",
    featured: false,
    content: \`${content}\`,
  },
`;

const marker = '];\n\n// Helper function';
const idx = file.indexOf(marker);
if (idx === -1) { console.log('MARKER NOT FOUND'); process.exit(1); }
const updated = file.slice(0, idx) + newPost + file.slice(idx);
fs.writeFileSync('src/data/blogPosts.ts', updated);
console.log('Done. File length:', updated.length);
