import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { AlertCircle, AlertTriangle, ChevronRight, TrendingUp, Home, Zap, Droplets, Thermometer, Wind } from "lucide-react";

const metaTitle = "What Home Inspectors Find in Ontario | ASADS Findings Data";
const metaDescription = "What do home inspectors actually find in Ontario? ASADS data from thousands of inspections: common deficiencies by home era, property type, and region. Real findings, real numbers.";

const eraFindings = [
  {
    era: "Pre-1960 (Century Homes)",
    commonIn: "Toronto, Hamilton, Kitchener, Guelph, Brantford",
    p1Rate: "High",
    topFindings: [
      { finding: "Knob-and-tube wiring (active or partially active)", freq: "Majority of homes", severity: "P1", note: "Most Ontario insurers won't cover active K&T. Rewire cost $10,000–$20,000+." },
      { finding: "Lead paint on interior trim, windows, and exterior", freq: "Nearly all", severity: "P2", note: "Standard in all pre-1960 painted surfaces. Disclosure and renovation protocol required." },
      { finding: "Asbestos pipe insulation, floor tiles, ceiling texture", freq: "Common", severity: "P2", note: "Multiple forms of ACM in most pre-1960 homes. Lab confirmation required." },
      { finding: "Foundation — stone or brick rubble mortar deterioration", freq: "Frequent", severity: "P2", note: "Original lime mortar in older foundations deteriorates. Tuckpointing or full parging may be needed." },
      { finding: "Single-pane windows — heat loss, condensation", freq: "Most homes", severity: "P3", note: "Significant heat loss. Thermal imaging shows air infiltration at frames clearly." },
    ],
  },
  {
    era: "1960–1979",
    commonIn: "Mississauga, Brampton, North York, East York, Hamilton mountain",
    p1Rate: "Moderate to High",
    topFindings: [
      { finding: "Aluminum branch circuit wiring", freq: "Very common (1965–1978 peak)", severity: "P2", note: "Insurance issue in Ontario. Pigtailing or rewire required. Affects refinancing." },
      { finding: "Asbestos — floor tiles, ceiling texture, pipe lagging", freq: "Very common", severity: "P2", note: "1960s–70s construction used asbestos extensively. Bulk sampling always recommended." },
      { finding: "UFFI insulation (urea formaldehyde foam)", freq: "Occasional", severity: "P2", note: "Injected into wall cavities as retrofit. Banned 1980. Thermal imaging can detect voids left behind." },
      { finding: "Drainage systems — cast iron failure", freq: "Common", severity: "P2", note: "50+ year-old cast iron drains show scale buildup, corrosion, and root intrusion." },
      { finding: "Electrical panel — fuse box or early breaker panels", freq: "Common", severity: "P2", note: "Federal Pacific, Zinsco, and similar panels flagged by most Ontario insurers." },
    ],
  },
  {
    era: "1980–1999",
    commonIn: "Vaughan, Markham, Ajax, Whitby, Pickering, Oakville, Burlington",
    p1Rate: "Moderate",
    topFindings: [
      { finding: "Kitec plumbing (1995–2007 installation)", freq: "Very common in late 90s builds", severity: "P2", note: "Insurance surcharge or refusal without remediation. $4,500–$9,000 to remediate." },
      { finding: "Vermiculite insulation with asbestos contamination", freq: "Common pre-1990 attics", severity: "P2", note: "~70% of vermiculite from Libby Mine (Zonolite). Lab test required." },
      { finding: "Bathroom exhaust fans venting into attic", freq: "Very common", severity: "P2", note: "The #1 cause of attic mould in Ontario suburbs built 1980–2000." },
      { finding: "HVAC at or near end of service life", freq: "Frequent", severity: "P3", note: "1990s furnaces and AC units often at 25–30 years. Budget $3,500–$7,500 for replacement." },
      { finding: "Deck — ledger connection issues, inadequate footings", freq: "Common", severity: "P2", note: "Many 1980s–90s decks added without permit. Ledger flashing and footing depth are primary concerns." },
    ],
  },
  {
    era: "2000–2015",
    commonIn: "Milton, Barrie, Newmarket, Richmond Hill, Brampton north, Cambridge",
    p1Rate: "Low to Moderate",
    topFindings: [
      { finding: "Kitec plumbing (peak: 2001–2006)", freq: "Common in early 2000s builds", severity: "P2", note: "Still the most financially significant finding in this era. Orange/blue FlowGuard piping." },
      { finding: "Truss uplift — interior partition wall cracks", freq: "Common in large 2-storey", severity: "P3", note: "Normal seasonal movement in engineered trusses. Cosmetic but misidentified as structural." },
      { finding: "Grading — directs water toward foundation", freq: "Very common", severity: "P3", note: "Settlement of backfill over 15–20 years creates negative grade. Common contributor to sump pump reliance." },
      { finding: "Radon levels above Health Canada guideline", freq: "10–15% of tested homes", severity: "P2", note: "Ontario geology creates radon risk province-wide. Lower-level bedrooms at highest risk." },
      { finding: "HVAC — furnace heat exchanger cracking (15+ yr units)", freq: "Occasional", severity: "P1", note: "P1 safety finding. 2000-era furnaces at 25 years are at end of heat exchanger life." },
    ],
  },
  {
    era: "2016–Present (New Builds)",
    commonIn: "All Ontario growth areas — Waterloo, Hamilton, Niagara, Barrie",
    p1Rate: "Low",
    topFindings: [
      { finding: "Improper site grading and drainage at builder turnover", freq: "Very common", severity: "P3", note: "Builders finish grading before full settlement. Buyers should recheck after first year." },
      { finding: "Missing attic insulation — sections near eaves", freq: "Common", severity: "P3", note: "Thermal imaging finds attic insulation voids builders miss at eaves and around recessed lights." },
      { finding: "Tarion deficiency items — builder snag list", freq: "Most new builds", severity: "P2/P3", note: "PDI inspections consistently find 15–40 items requiring builder remedy under Tarion warranty." },
      { finding: "Incomplete or missing HVAC commissioning", freq: "Occasional", severity: "P3", note: "Air balancing and duct testing rarely completed on new builds. Some zones over/under supplied." },
      { finding: "Exterior caulking and sealing — missed at initial install", freq: "Common", severity: "P3", note: "Window and door caulking often incomplete or improperly installed at builder handover." },
    ],
  },
];

const byPropertyType = [
  {
    type: "Detached House",
    topIssues: ["HVAC end of life", "Roof — shingle deterioration", "Electrical panel deficiencies", "Foundation grading and drainage", "Attic ventilation and insulation"],
  },
  {
    type: "Semi-Detached",
    topIssues: ["Party wall moisture transfer", "Shared drainage issues", "Attic mould from bathroom fans", "Electrical — single panel serving both units", "Window and door sealing"],
  },
  {
    type: "Condo Unit",
    topIssues: ["Fan coil unit maintenance", "In-suite plumbing — valves and shut-offs", "Balcony membrane condition", "Ceiling moisture from unit above", "Electrical — proper panel capacity for unit"],
  },
  {
    type: "Townhouse / Row",
    topIssues: ["Roofline flashing at shared walls", "Garage fire separation", "Laundry venting", "Foundation drainage at end units", "Window and sliding door sealing"],
  },
  {
    type: "Legal Duplex / Triplex",
    topIssues: ["Fire separation compliance between units", "Separate electrical panel verification", "Shared plumbing stack condition", "Egress window compliance in lower unit", "HVAC — heating coverage for all units"],
  },
  {
    type: "Rural / Acreage",
    topIssues: ["Well water — bacterial and chemical testing", "Septic system age and condition", "Radon accumulation in lower levels", "Basement moisture — high water table", "Propane system condition and tank age"],
  },
];

const thermalStats = [
  { stat: "Hidden moisture", desc: "Detected in attics and behind walls via thermal anomaly, not visible to naked eye" },
  { stat: "Missing insulation zones", desc: "Linear cold zones at exterior walls indicating batt compression or complete gaps" },
  { stat: "Electrical hotspots", desc: "Overloaded circuits or failing connections detected as heat anomalies at panels and outlets" },
  { stat: "Air infiltration at windows and doors", desc: "Cold air entry along frame perimeters invisible without thermal imaging" },
];

const severityColors = {
  P1: "bg-red-100 text-red-700 border border-red-200",
  P2: "bg-orange-100 text-orange-700 border border-orange-200",
  P3: "bg-yellow-100 text-yellow-700 border border-yellow-200",
};

export default function WhatWeFind() {
  const location = useLocation();
  const canonical = getCanonicalUrl(SITE_URL, location.pathname);

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "What Home Inspectors Find in Ontario Homes",
          "description": metaDescription,
          "url": canonical,
          "publisher": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>What We Find</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <TrendingUp className="w-10 h-10 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">What Home Inspectors Actually Find in Ontario Homes</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                After thousands of inspections across Ontario, patterns are clear. What you find depends almost entirely on when the home was built. Here's what ASADS inspectors consistently identify — organized by era, property type, and system.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm mt-4">
            {[
              { icon: AlertCircle, label: "P1 — Unsafe / Urgent", color: "text-red-400" },
              { icon: AlertTriangle, label: "P2 — Significant Deficiency", color: "text-orange-400" },
              { icon: AlertTriangle, label: "P3 — Monitor / Maintenance", color: "text-yellow-400" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className="text-slate-300">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "97%", label: "of Ontario homes inspected have at least one deficiency finding" },
              { number: "~30%", label: "of pre-2010 homes have a P1 (unsafe/urgent) finding" },
              { number: "68%", label: "of pre-1985 homes have suspected or confirmed asbestos-containing materials" },
              { number: "10–15%", label: "of tested Ontario homes have radon above Health Canada's 200 Bq/m³ guideline" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-blue-700 mb-1">{item.number}</div>
                <p className="text-sm text-slate-500 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-4">Based on ASADS inspection data across Ontario. P1 rate varies by property age and type.</p>
        </div>
      </section>

      {/* By era */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-2">Findings by Home Era</h2>
          <p className="text-slate-500 text-sm mb-8">The single most predictive factor in what an inspector will find is the decade the home was built. Ontario's housing stock spans 150+ years — each era has its own signature deficiencies.</p>
          <div className="space-y-6">
            {eraFindings.map((era, i) => (
              <div key={i} className="bg-white border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-5 py-3 bg-slate-800 text-white flex-wrap">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-slate-400" />
                    <h3 className="font-bold">{era.era}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span>Common in: {era.commonIn}</span>
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs">P1 risk: {era.p1Rate}</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {era.topFindings.map((f, j) => (
                    <div key={j} className="px-5 py-3 flex flex-wrap items-start gap-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 ${severityColors[f.severity as keyof typeof severityColors]}`}>{f.severity}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-900">{f.finding}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{f.freq} · {f.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By property type */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-2">Findings by Property Type</h2>
          <p className="text-slate-500 text-sm mb-8">Beyond era, the type of property shapes what an inspector focuses on. Each property type has a specific set of high-priority systems.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {byPropertyType.map((item, i) => (
              <div key={i} className="border rounded-xl p-4">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  {item.type}
                </h3>
                <ul className="space-y-1.5">
                  {item.topIssues.map((issue, j) => (
                    <li key={j} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="text-slate-300 mt-0.5">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thermal imaging finds */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <Thermometer className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">What Thermal Imaging Finds That Visual Inspection Misses</h2>
          </div>
          <p className="text-slate-300 text-sm mb-8">Thermal imaging is included in every ASADS inspection. These are the categories of findings that thermal cameras regularly reveal that a visual-only inspection would miss entirely.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {thermalStats.map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-4 flex gap-3">
                <Thermometer className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm mb-1">{item.stat}</p>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/services/thermal-imaging" className="inline-flex items-center gap-2 mt-6 text-orange-400 hover:text-orange-300 text-sm font-medium">
            Learn more about thermal imaging →
          </Link>
        </div>
      </section>

      {/* Common P1 scenarios */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-2">The Most Common P1 (Unsafe) Findings in Ontario</h2>
          <p className="text-slate-500 text-sm mb-6">P1 findings are life-safety deficiencies requiring immediate action. These are the ones ASADS inspectors identify most frequently across Ontario's housing stock.</p>
          <div className="space-y-3">
            {[
              { icon: Zap, title: "Cracked heat exchanger", detail: "Carbon monoxide risk from combustion gas mixing with circulated air. Found most often in furnaces 18+ years old. Do not operate — replace furnace." },
              { icon: Zap, title: "Missing GFCI protection at required locations", detail: "Required at garage, bathroom, kitchen, exterior, and basement outlets. Code violation and shock hazard. Common in homes built before 2000." },
              { icon: Zap, title: "Active knob-and-tube wiring", detail: "Pre-1940 wiring without ground conductor. Insurance refusal in most Ontario policies. Rewire required: $10,000–$20,000+." },
              { icon: Droplets, title: "Carbon monoxide detector absent — fuel-burning appliance present", detail: "Ontario law requires CO detector within 5m of every sleeping area in homes with fuel-burning appliances. Missing detectors are a P1 compliance and safety issue." },
              { icon: Wind, title: "Gas appliance improper venting", detail: "Water heater or furnace venting terminating improperly, into enclosed space, or back-drafting. CO risk. Requires licensed HVAC contractor." },
              { icon: Home, title: "Structural — significant sagging or deflection", detail: "Roof rafters, floor joists, or load-bearing walls showing visible structural failure or excessive deflection. Requires structural engineer assessment." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="border-l-4 border-l-red-500 bg-red-50 border border-red-200 rounded-r-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-red-800">{item.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What inspectors can't see */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold mb-4">What a Home Inspection Cannot Determine</h2>
          <p className="text-slate-500 text-sm mb-5">An inspection is a visual assessment of accessible components at a point in time. ASADS inspectors follow OAHI/CAHPI Standards of Practice, which define the scope and its limitations.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              "Concealed or latent defects behind finished surfaces",
              "Remaining service life of any component",
              "Code compliance (inspectors assess condition, not code)",
              "Engineering determination of structural adequacy",
              "Underground drainage — without camera scope",
              "Septic system capacity and compliance",
              "Environmental hazards (mold, radon, asbestos) — unless separately contracted",
              "Market value or advisability of purchase",
              "Future performance of any component",
            ].map((item, i) => (
              <div key={i} className="bg-white border rounded-lg p-3 text-slate-600 text-xs">
                <span className="text-slate-300 mr-2">—</span>{item}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Environmental screening (mold, radon, asbestos, lead, IAQ) can be added to any ASADS inspection. <Link to="/bundled-inspection" className="text-primary hover:underline">See bundled testing options →</Link></p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">Book an Inspection — Know What You're Buying</h2>
          <p className="text-white/80 mb-6">Same-day and next-day availability across Ontario. P1/P2/P3 findings with full Observation, Implication, Recommendation narrative. Report delivered the same day.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">Book Online</Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              (647) 801-9311
            </a>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also:{" "}
            <Link to="/sample-report" className="underline hover:text-white">Sample report format</Link>
            {" · "}
            <Link to="/our-promise" className="underline hover:text-white">Our independence promise</Link>
            {" · "}
            <Link to="/bundled-inspection" className="underline hover:text-white">Add environmental testing</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
