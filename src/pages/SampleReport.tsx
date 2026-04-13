import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import {
  Camera, Thermometer, FileText, Phone, ChevronRight,
  AlertCircle, AlertTriangle, Clock, CheckCircle, Shield
} from "lucide-react";

const metaTitle = "Sample Home Inspection Report | ASADS Ontario";
const metaDescription = "See a real ASADS home inspection report — P1 safety hazards, P2 deficiencies, P3 maintenance items. Observation, implication, recommendation format. Same-day PDF delivery across Ontario.";

// Matches the actual ASADS report template priority system
const PRIORITIES = {
  P1: { label: "P1 — Unsafe / Urgent", color: "bg-red-50 border-red-300", badge: "bg-red-100 text-red-700 border border-red-200", icon: AlertCircle, iconColor: "text-red-500", bar: "border-l-red-500" },
  P2: { label: "P2 — Significant Deficiency", color: "bg-orange-50 border-orange-300", badge: "bg-orange-100 text-orange-700 border border-orange-200", icon: AlertTriangle, iconColor: "text-orange-500", bar: "border-l-orange-500" },
  P3: { label: "P3 — Monitor / Maintenance", color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-700 border border-yellow-200", icon: Clock, iconColor: "text-yellow-600", bar: "border-l-yellow-500" },
  OK: { label: "✅ Satisfactory", color: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-700 border border-green-200", icon: CheckCircle, iconColor: "text-green-500", bar: "border-l-green-500" },
};

const sections = [
  {
    name: "Roof System",
    icon: "🏠",
    findings: [
      {
        priority: "P2" as const,
        location: "South-facing main roof slope",
        observation: "Architectural asphalt shingles exhibit significant granule loss, edge curling, and cracking at multiple locations across the south-facing slope. Granule deposits visible in the east gutter. Estimated age: 17–19 years based on condition.",
        implication: "Shingles are at or near end of service life. Active water infiltration is not occurring at time of inspection, but risk of leak initiation is elevated in the next 1–3 years, particularly at the rake edges and around the two roof penetrations.",
        recommendation: "Obtain quotes from licensed roofing contractors for full roof replacement. Budget $9,000–$16,000 depending on removal requirements and decking condition. No emergency action required at this time.",
        hasPhoto: true, hasThermal: false,
      },
      {
        priority: "P3" as const,
        location: "Chimney counter-flashing",
        observation: "Counter-flashing at chimney base has lifted at one corner. Sealant visible — appears to have been previously repaired.",
        implication: "Periodic resealing is a normal maintenance requirement. Lifted counter-flashing can allow water tracking behind flashing during heavy rain.",
        recommendation: "Reseal lifted corner with appropriate flashing sealant. Monitor annually.",
        hasPhoto: true, hasThermal: false,
      },
    ],
    satisfactory: ["Ridge cap installation", "Downspout connections at eaves troughs", "Roof ventilation — soffit and ridge vents present"],
  },
  {
    name: "Electrical System",
    icon: "⚡",
    findings: [
      {
        priority: "P1" as const,
        location: "Garage — east wall, three standard outlets",
        observation: "Three standard 15A outlets on the east garage wall lack GFCI protection. No GFCI receptacle or breaker providing protection for these circuits.",
        implication: "Ontario Electrical Safety Code requires GFCI protection for all garage receptacle outlets. Absence creates shock hazard risk in a damp environment.",
        recommendation: "Hire a licensed electrician to install GFCI receptacles or a GFCI breaker protecting these circuits. This is a code deficiency and should be corrected prior to occupancy.",
        hasPhoto: true, hasThermal: false,
      },
      {
        priority: "P2" as const,
        location: "Main electrical panel — basement",
        observation: "200A Siemens panel, appears original to construction (2003). Panel is functional; breakers responding normally. One double-tapped breaker identified at 15A circuit on breaker 14. Two breaker spaces available.",
        implication: "Double-tapping a breaker (two conductors under one breaker terminal) is a code violation. It creates risk of overheating and nuisance tripping. Not urgent but should be corrected.",
        recommendation: "Hire a licensed electrician to install a tandem breaker or route the second conductor to the available breaker space. Estimated cost: $150–$300.",
        hasPhoto: true, hasThermal: false,
      },
      {
        priority: "P3" as const,
        location: "Second floor hallway — junction box",
        observation: "Open junction box with wire connections exposed in the second floor hallway ceiling. Cover plate is missing.",
        implication: "Missing cover plate is a code deficiency — junction boxes must remain accessible but covered to contain any arcing.",
        recommendation: "Install appropriate cover plate. This is a simple repair.",
        hasPhoto: true, hasThermal: false,
      },
    ],
    satisfactory: ["Grounding and bonding", "Arc fault protection — bedrooms", "Service entry condition", "Breaker labelling (partially complete — acceptable)"],
  },
  {
    name: "Plumbing System",
    icon: "🚿",
    findings: [
      {
        priority: "P2" as const,
        location: "Visible supply lines — basement utility room",
        observation: "Orange and blue Kitec flexible piping identified at the water heater inlet/outlet and furnace humidifier supply line. Piping labelled 'FlowGuard Gold' — confirmed Kitec product.",
        implication: "Kitec plumbing (manufactured 1995–2007) is subject to accelerated internal corrosion, particularly at brass fittings. Many Ontario insurers require remediation as a condition of coverage. A class action settlement was completed in 2011 for product defects. Failure risk increases with water age and mineral content.",
        recommendation: "Verify insurance requirements with provider. Obtain quotes from licensed plumbers for full remediation — scope will depend on how extensively Kitec was used (basement utility connections vs. supply to all fixtures). Estimated remediation cost: $4,500–$9,000. This is a significant financial consideration.",
        hasPhoto: true, hasThermal: false,
      },
      {
        priority: "P3" as const,
        location: "Master bathroom — tub surround",
        observation: "Caulk joint at the tub-to-surround perimeter is cracked and partially missing at two locations. No active moisture damage observed to the surrounding drywall.",
        implication: "Compromised caulk allows water infiltration over time. Tile and drywall damage is not currently present but will develop if not maintained.",
        recommendation: "Remove old caulk and apply new 100% silicone caulk. This is a straightforward DIY or handyman repair.",
        hasPhoto: true, hasThermal: false,
      },
    ],
    satisfactory: ["Water pressure — 65 PSI (normal range)", "Hot water temperature at fixtures", "Drain flow — all fixtures tested", "Water heater — Bradford White 40-gal, 2019 (5 years old, in good condition)"],
  },
  {
    name: "Heating & HVAC",
    icon: "🔥",
    findings: [
      {
        priority: "P1" as const,
        location: "Basement mechanical room — Carrier gas furnace (2003)",
        observation: "Visible crack identified in the primary heat exchanger on the 2003 Carrier gas furnace during inspection with furnace running. Crack is approximately 2 cm, located on the secondary heat exchanger plenum. Confirmed with mirror and flashlight.",
        implication: "A cracked heat exchanger allows combustion gases — including carbon monoxide (CO) — to mix with the air being circulated through the home. This is a life-safety deficiency. CO is colourless, odourless, and potentially fatal. This finding requires immediate action.",
        recommendation: "Do NOT operate the furnace until it has been assessed and repaired or replaced by a licensed HVAC contractor. Install CO detector at minimum immediately. HVAC contractor to determine repairability — in most cases a heat exchanger of this age warrants full furnace replacement. Budget $3,500–$6,000 for replacement. This is a Priority 1 safety deficiency.",
        hasPhoto: true, hasThermal: true,
      },
      {
        priority: "P3" as const,
        location: "Central air conditioning — exterior condensing unit",
        observation: "Lennox 2.5-ton central AC, estimated age 12–14 years based on condition (data plate not accessible). Unit operated and cooled during test. Some fin damage on one side of the condensing coil.",
        implication: "Unit is operational. Age and fin damage suggest reduced efficiency. Approaching end of typical 15-year service life.",
        recommendation: "Have HVAC contractor evaluate efficiency and refrigerant charge at next seasonal service. Budget for replacement within 2–4 years. Estimated cost: $4,500–$7,500.",
        hasPhoto: true, hasThermal: false,
      },
    ],
    satisfactory: ["Furnace filter — recently replaced", "Ductwork connections visible in basement — no gaps observed", "Thermostat functional"],
  },
  {
    name: "Attic & Insulation",
    icon: "🌡️",
    findings: [
      {
        priority: "P2" as const,
        location: "Attic — northeast quadrant above main bathroom",
        observation: "Active mould growth on roof sheathing in the northeast attic quadrant. Bathroom exhaust fan duct terminated into the attic space rather than exiting through the roof or soffit. Moisture readings on sheathing: 24–28% (elevated; normal below 19%). Thermal imaging confirms cold/wet pattern consistent with moisture-laden sheathing.",
        implication: "Bathroom exhaust fan venting directly into the attic is a common Ontario deficiency that causes chronic condensation. Active mould is both a health risk (spore exposure) and a structural concern over time. The sheathing moisture reading at 24–28% indicates active moisture — this is not a dry historic stain.",
        recommendation: "1. Reroute bathroom exhaust fan duct to exterior (roof cap or soffit with proper backflow damper). 2. Engage a mould remediation contractor for assessment and treatment. 3. Allow affected area to dry after ventilation is corrected before finalizing remediation scope. Estimated total cost: $1,500–$5,000 depending on mould extent. This finding has disclosure obligations.",
        hasPhoto: true, hasThermal: true,
      },
    ],
    satisfactory: ["Insulation depth — approximately R-38 at centre (adequate)", "Roof deck — no visible sagging", "Ventilation — ridge and soffit vents present in unaffected areas"],
  },
  {
    name: "Exterior & Grading",
    icon: "🌿",
    findings: [
      {
        priority: "P3" as const,
        location: "Northeast corner downspout",
        observation: "Downspout on northeast corner discharges within 18 inches of the foundation. Grade at this corner slopes slightly toward the foundation over approximately 4 feet.",
        implication: "Improper grading and short downspout discharge are common contributors to basement water infiltration in Ontario homes. Not currently causing visible damage, but conditions are unfavourable.",
        recommendation: "Extend downspout discharge at least 6 feet from foundation using splash block or underground extension. Regrade the 4-foot area to achieve a 1-inch drop per foot away from foundation. Monitor basement at this corner during heavy rain events.",
        hasPhoto: true, hasThermal: false,
      },
    ],
    satisfactory: ["Driveway — minor cracking only (normal wear)", "Window caulking — recently renewed", "Soffit and fascia — in good condition", "Foundation visible above grade — no significant cracks observed"],
  },
];

// Summary counts from the findings above
const p1Count = sections.reduce((n, s) => n + s.findings.filter(f => f.priority === "P1").length, 0);
const p2Count = sections.reduce((n, s) => n + s.findings.filter(f => f.priority === "P2").length, 0);
const p3Count = sections.reduce((n, s) => n + s.findings.filter(f => f.priority === "P3").length, 0);
const okCount = sections.reduce((n, s) => n + s.satisfactory.length, 0);

// All non-OK findings in priority order for summary table
const allFindings = sections.flatMap(s =>
  s.findings.map(f => ({ section: s.name, ...f }))
).sort((a, b) => {
  const order = { P1: 0, P2: 1, P3: 2, OK: 3 };
  return order[a.priority] - order[b.priority];
});

export default function SampleReport() {
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
          "name": "ASADS Sample Home Inspection Report",
          "description": metaDescription,
          "url": canonical,
          "publisher": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Sample Inspection Report</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">What an ASADS Home Inspection Report Looks Like</h1>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl">
            Every ASADS report uses a three-part finding format — Observation, Implication, Recommendation — with findings prioritized P1 through P3. Below is an annotated walkthrough of an actual inspection using our standard report format.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              { icon: Camera, label: "Every finding photo-documented" },
              { icon: Thermometer, label: "Thermal imaging — every inspection, no charge" },
              { icon: FileText, label: "Same-day PDF delivery" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2 bg-slate-800 rounded px-3 py-2">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cover page summary */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-50 rounded-xl border p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">ASADS Home Inspection Report</div>
            <p className="font-semibold text-slate-700 mb-4">Semi-Detached Residential · 1,780 sq ft · Built 2003 · [Address anonymized]</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 text-sm">
              <div><p className="text-slate-400 text-xs uppercase tracking-wide mb-0.5">Inspection Date</p><p className="font-semibold">Sample report</p></div>
              <div><p className="text-slate-400 text-xs uppercase tracking-wide mb-0.5">Duration on site</p><p className="font-semibold">3 hrs 10 min</p></div>
              <div><p className="text-slate-400 text-xs uppercase tracking-wide mb-0.5">Report delivered</p><p className="font-semibold">Same day, 4:22 PM</p></div>
              <div><p className="text-slate-400 text-xs uppercase tracking-wide mb-0.5">Inspector</p><p className="font-semibold">CMI® — ASADS</p></div>
            </div>
            {/* Priority summary badges */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t">
              {[
                { count: p1Count, label: "Unsafe / Urgent", cls: "border-red-400 text-red-600 bg-red-50" },
                { count: p2Count, label: "Significant Deficiency", cls: "border-orange-400 text-orange-600 bg-orange-50" },
                { count: p3Count, label: "Monitor / Maintenance", cls: "border-yellow-400 text-yellow-600 bg-yellow-50" },
                { count: okCount, label: "Satisfactory", cls: "border-green-400 text-green-600 bg-green-50" },
              ].map((item, i) => (
                <div key={i} className={`border-2 rounded-xl text-center p-3 ${item.cls}`}>
                  <div className="text-3xl font-black">{item.count}</div>
                  <div className="text-xs font-semibold mt-1 leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priority legend */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-lg font-bold mb-4">How to Read This Report — Priority System</h2>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            {[
              { level: "P1", label: "Unsafe / Urgent", desc: "Life-safety deficiency or condition requiring action before or immediately after purchase. Examples: cracked heat exchanger, live ungrounded wiring.", cls: "border-red-200 bg-red-50 text-red-700" },
              { level: "P2", label: "Significant Deficiency", desc: "Major cost ($2,000+) or affects insurability/mortgage. Primary negotiating leverage. Examples: Kitec plumbing, active attic mould, roof at end of life.", cls: "border-orange-200 bg-orange-50 text-orange-700" },
              { level: "P3", label: "Monitor / Maintenance", desc: "Normal wear items. Budget for these in years 1–3. Not typically grounds for renegotiation but important for planning.", cls: "border-yellow-200 bg-yellow-50 text-yellow-700" },
              { level: "OK", label: "Satisfactory", desc: "Component inspected and functioning as intended at time of inspection.", cls: "border-green-200 bg-green-50 text-green-700" },
            ].map((item, i) => (
              <div key={i} className={`border rounded-lg p-4 ${item.cls}`}>
                <div className="font-black text-sm mb-1">{item.level} — {item.label}</div>
                <p className="text-xs leading-relaxed opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary Table */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold mb-1">Executive Summary</h2>
          <p className="text-slate-500 text-sm mb-5">All deficiency findings sorted by priority. This table appears at the front of every ASADS report so buyers and realtors can immediately identify what needs action.</p>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wide">Priority</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wide">Section</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wide">Location / Item</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wide hidden md:table-cell">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {allFindings.map((f, i) => {
                  const p = PRIORITIES[f.priority];
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.badge}`}>{f.priority}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{f.section}</td>
                      <td className="px-4 py-3 font-medium">{f.location}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs hidden md:table-cell">{f.recommendation.slice(0, 100)}{f.recommendation.length > 100 ? "…" : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Full section-by-section findings */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold mb-1">Section-by-Section Findings</h2>
          <p className="text-slate-500 text-sm mb-8">Each ASADS report covers all accessible systems in a structured format. Every finding includes Observation, Implication, and Recommendation — in that order.</p>
          <div className="space-y-8">
            {sections.map((section, si) => (
              <div key={si}>
                {/* Section header */}
                <div className="flex items-center gap-3 bg-blue-800 text-white rounded-t-xl px-5 py-3">
                  <span className="text-xl">{section.icon}</span>
                  <h3 className="font-bold text-base">{section.name}</h3>
                  <div className="ml-auto flex gap-1.5">
                    {(["P1","P2","P3"] as const).map(p => {
                      const c = section.findings.filter(f => f.priority === p).length;
                      if (!c) return null;
                      const colors = { P1: "bg-red-500", P2: "bg-orange-500", P3: "bg-yellow-500" };
                      return <span key={p} className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${colors[p]}`}>{c} {p}</span>;
                    })}
                    {section.findings.length === 0 && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓ All OK</span>}
                  </div>
                </div>
                <div className="border border-t-0 border-slate-200 rounded-b-xl bg-white overflow-hidden">
                  {/* Deficiency findings */}
                  {section.findings.map((f, fi) => {
                    const p = PRIORITIES[f.priority];
                    const Icon = p.icon;
                    return (
                      <div key={fi} className={`border-l-4 ${p.bar} p-5 ${fi < section.findings.length - 1 || section.satisfactory.length > 0 ? "border-b border-slate-100" : ""}`}>
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${p.iconColor} flex-shrink-0`} />
                            <p className="font-semibold text-slate-900">{f.location}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.badge}`}>{p.label}</span>
                            {f.hasPhoto && <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1"><Camera className="w-3 h-3" /> Photo documented</span>}
                            {f.hasThermal && <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1"><Thermometer className="w-3 h-3" /> Thermal detected</span>}
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-semibold text-slate-700">Observation: </span>
                            <span className="text-slate-600">{f.observation}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-700">Implication: </span>
                            <span className="text-slate-600">{f.implication}</span>
                          </div>
                          <div className="bg-blue-50 border-l-2 border-blue-400 px-3 py-2 rounded-r-lg">
                            <span className="font-semibold text-blue-800">Recommendation: </span>
                            <span className="text-slate-700">{f.recommendation}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Satisfactory items */}
                  {section.satisfactory.length > 0 && (
                    <div className="bg-green-50 border-l-4 border-l-green-400 p-4">
                      <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">✅ Satisfactory Items</p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {section.satisfactory.map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thermal imaging section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <Thermometer className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Thermal Imaging Findings</h2>
            <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-semibold">Included — No Extra Charge</span>
          </div>
          <p className="text-slate-300 mb-8 max-w-2xl text-sm">Infrared thermal imaging detects temperature anomalies indicating hidden moisture, missing insulation, and heat loss — conditions invisible to visual inspection alone. Both thermal findings in this report were confirmed visually after IR detection prompted closer investigation.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Furnace heat exchanger crack — Basement",
                finding: "P1 — Unsafe",
                description: "IR scan showed asymmetric heat pattern at the heat exchanger plenum inconsistent with normal furnace operation. Visual follow-up confirmed the crack. The P1 finding for the cracked heat exchanger originated from the thermal scan before visual confirmation.",
                benefit: "Cracked heat exchangers are difficult to see visually — thermal imaging identified this life-safety deficiency.",
              },
              {
                title: "Attic moisture — Northeast quadrant",
                finding: "P2 — Significant Deficiency",
                description: "IR scan of the attic ceiling showed a cold/wet anomaly pattern in the northeast quadrant consistent with saturated sheathing. This was the trigger for investigating the exhaust fan termination and taking moisture meter readings.",
                benefit: "Without thermal imaging, moisture-saturated sheathing above the insulation line would not have been detected visually from below.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-xl overflow-hidden">
                <div className="w-full h-28 bg-gradient-to-br from-blue-900 via-purple-700 to-orange-500 flex items-center justify-center">
                  <span className="text-xs text-white/50 italic">IR thermal image — {item.title}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-orange-900 text-orange-300 px-2 py-0.5 rounded-full">{item.finding}</span>
                    <p className="font-semibold text-sm">{item.title}</p>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{item.description}</p>
                  <p className="text-orange-300 text-xs flex items-start gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    {item.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspector declaration preview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold mb-6">Every Report Includes an Inspector Declaration Page</h2>
          <div className="border rounded-xl p-6 bg-slate-50">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center text-white text-xl font-black flex-shrink-0">A</div>
              <div>
                <p className="font-bold text-lg">ASADS Home Inspection Inspector</p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  CMI® — Certified Master Inspector<br />
                  Licensed under the Ontario Home Inspection Act, 2017<br />
                  OAHI/CAHPI 2023 National Standards Compliant<br />
                  Insured by Intact Insurance (E&O &amp; General Liability)<br />
                  (647) 801-9311 · info@asads.ca · asads.ca
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-slate-700 mb-4">
              <p className="font-semibold mb-1 text-yellow-800">90-Day Inspection Warranty</p>
              If a covered defect is discovered following the inspection that was accessible and should have been reported, ASADS Home Inspection will work to make it right. Contact (647) 801-9311 or info@asads.ca.
            </div>
            <p className="text-xs text-slate-400">Report Reference: ASADS-YYMMDD-CITY · © ASADS Home Inspection. Report prepared per OAHI Standards of Practice.</p>
          </div>
        </div>
      </section>

      {/* What every report includes */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold mb-6">What Every ASADS Report Includes</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: FileText, label: "Cover page", desc: "Property address, inspection type, date, inspector, and P1/P2/P3 count at a glance." },
              { icon: FileText, label: "Scope & notices", desc: "Standards of practice (OAHI/CAHPI 2023), scope limitations, and what is not included." },
              { icon: FileText, label: "Table of contents", desc: "All sections listed with finding counts — so buyers can navigate directly to the findings that matter." },
              { icon: AlertCircle, label: "Executive summary table", desc: "All deficiencies sorted P1→P2→P3 with location and recommendation in one reference table." },
              { icon: Camera, label: "Section-by-section findings", desc: "Observation, Implication, Recommendation format. Every deficiency photo-documented." },
              { icon: Thermometer, label: "Thermal imaging findings", desc: "IR images and analysis for every thermal anomaly detected — included at no extra charge." },
              { icon: CheckCircle, label: "Satisfactory items", desc: "Components inspected and found acceptable — not just the problems, but what's working." },
              { icon: Shield, label: "Inspector declaration", desc: "Inspector credentials, E&O insurance confirmation, 90-day warranty, and report reference number." },
              { icon: FileText, label: "Same-day PDF delivery", desc: "Report emailed within 4–6 hours of inspection completion. Always before your condition deadline." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-3 bg-white border rounded-xl p-4">
                  <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">Book Your Inspection — Report Delivered the Same Day</h2>
          <p className="text-white/80 mb-6">CMI® certified. E&O insured. Thermal imaging included. Serving the GTA and all of Ontario.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">Book Online</Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> (647) 801-9311
            </a>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also: <Link to="/our-promise" className="underline hover:text-white">Our independence promise</Link> · <Link to="/for-first-time-buyers" className="underline hover:text-white">First-time buyer guide</Link> · <Link to="/pricing" className="underline hover:text-white">Pricing</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
