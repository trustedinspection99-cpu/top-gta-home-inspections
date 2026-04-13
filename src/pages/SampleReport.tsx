import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, AlertCircle, Camera, Thermometer, FileText, Phone, ChevronRight } from "lucide-react";

const metaTitle = "Sample Home Inspection Report | ASADS Ontario";
const metaDescription = "See what an ASADS home inspection report looks like — photo documentation, thermal imaging, findings categorized by severity. Same-day delivery across Ontario.";

const findings = [
  {
    severity: "safety",
    label: "Safety Hazard",
    color: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-700",
    icon: AlertCircle,
    iconColor: "text-red-500",
    items: [
      {
        title: "Cracked Heat Exchanger — Furnace",
        location: "Basement mechanical room",
        description: "Visible crack in the primary heat exchanger on the 2003 Carrier gas furnace. A cracked heat exchanger allows combustion gases (including carbon monoxide) to mix with circulated air. This is a serious safety defect. Recommend immediate shut-down and replacement by a licensed HVAC contractor before occupancy.",
        hasPhoto: true,
        hasThermal: false,
      },
      {
        title: "Missing GFCI Protection — Garage Outlets",
        location: "Attached garage, east wall",
        description: "Three standard outlets in the garage are not GFCI protected. Ontario Electrical Safety Code requires GFCI protection for all garage outlets. Recommend replacement with GFCI outlets or installation of GFCI breaker.",
        hasPhoto: true,
        hasThermal: false,
      },
    ],
  },
  {
    severity: "major",
    label: "Major Defect",
    color: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
    items: [
      {
        title: "Kitec Plumbing Identified Throughout",
        location: "Basement utility room, visible supply lines",
        description: "Orange and blue Kitec flexible piping (also labelled FlowGuard) identified at the water heater and furnace connections. Kitec plumbing (manufactured 1995–2007) is subject to accelerated corrosion and fitting failure. Many Ontario insurers require remediation as a condition of coverage. Full replacement by a licensed plumber recommended. Estimated cost: $4,500–$8,000 depending on scope.",
        hasPhoto: true,
        hasThermal: false,
      },
      {
        title: "Attic Moisture and Mould — Bathroom Fan Venting into Attic",
        location: "Attic, east section above main bathroom",
        description: "Moisture staining and active mould growth identified on roof sheathing in the northeast quadrant of the attic. Bathroom exhaust fan is venting directly into the attic space rather than through the roof or soffit — a common Ontario defect causing chronic condensation. Moisture readings: 24–28% (elevated). Recommend: (1) reroute bathroom fan to exterior, (2) antimicrobial treatment and monitoring by a remediation contractor. Thermal imaging shows cold spot pattern consistent with attic moisture.",
        hasPhoto: true,
        hasThermal: true,
      },
      {
        title: "Roof — Shingles at End of Service Life",
        location: "Main roof, south-facing slope",
        description: "Architectural asphalt shingles show significant granule loss, curling at edges, and multiple areas of cracking. Estimated remaining life: 1–3 years. No visible active leaks at time of inspection, but roof is approaching end of useful service life. Recommend budgeting for full replacement within 2 years. Approximate cost: $8,000–$14,000 depending on removal requirements.",
        hasPhoto: true,
        hasThermal: false,
      },
    ],
  },
  {
    severity: "monitor",
    label: "Monitor / Maintenance",
    color: "bg-yellow-50 border-yellow-200",
    badgeColor: "bg-yellow-100 text-yellow-700",
    icon: CheckCircle,
    iconColor: "text-yellow-500",
    items: [
      {
        title: "Water Heater — Age and Condition",
        location: "Basement, beside furnace",
        description: "Bradford White 40-gallon natural gas water heater, installed 2011 per data plate. Unit is 14 years old — past typical 10–12 year service life but operating without signs of active leakage or failure. Recommend budgeting for replacement within 1–2 years. Anode rod condition unknown.",
        hasPhoto: true,
        hasThermal: false,
      },
      {
        title: "Driveway — Settlement Cracking",
        location: "Front driveway apron",
        description: "Moderate settlement cracking along the driveway apron where it meets the public sidewalk. No structural implication — cosmetic and functional maintenance item. Recommend crack sealing to prevent water infiltration and freeze-thaw expansion.",
        hasPhoto: true,
        hasThermal: false,
      },
      {
        title: "Caulking — Master Bathroom Tub Surround",
        location: "Second floor master bathroom",
        description: "Caulking at the tub-to-surround joint is cracked and partially missing in two locations. While no active water damage was observed, deteriorated caulk allows moisture penetration over time. Recommend recaulking.",
        hasPhoto: true,
        hasThermal: false,
      },
      {
        title: "Downspout Discharge — Directs Toward Foundation",
        location: "Northeast corner of property",
        description: "One downspout discharges within 18 inches of the foundation wall. Grade also slopes slightly toward the foundation at this corner. Recommend extending downspout discharge at least 6 feet from foundation and monitoring for basement moisture during heavy rain events.",
        hasPhoto: true,
        hasThermal: false,
      },
    ],
  },
];

const thermalFindings = [
  {
    title: "Attic Moisture Pattern",
    description: "Thermal anomaly above main bathroom matches location of mould growth identified visually. Cold zone consistent with wet sheathing and compromised insulation.",
    benefit: "Not visible to naked eye — only detected via IR camera",
  },
  {
    title: "Missing Wall Insulation — North Bedroom",
    description: "Linear cold zone running horizontally across the exterior north wall, consistent with a gap or compression in batt insulation. No moisture detected. Energy loss and condensation risk at this wall.",
    benefit: "Invisible without thermal imaging — would not appear in standard inspection",
  },
  {
    title: "Basement Cold Spot — Foundation Wall",
    description: "Cold zone at the northeast foundation wall corner, suggesting either missing insulation or minor water infiltration path. Moisture readings in this area were borderline elevated (16%). Recommend monitoring.",
    benefit: "Allows proactive monitoring before a minor issue becomes a major one",
  },
];

export default function SampleReport() {
  const location = useLocation();
  const canonical = getCanonicalUrl(SITE_URL, location.pathname);

  const safetyCount = findings[0].items.length;
  const majorCount = findings[1].items.length;
  const monitorCount = findings[2].items.length;

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Sample Inspection Report</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">What an ASADS Inspection Report Looks Like</h1>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl">
            Every ASADS report is a full written narrative with photos, thermal imaging, and findings categorized by severity. Delivered the same day — typically within 4 hours of the inspection.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-slate-800 rounded px-3 py-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <span>Photo documentation of every finding</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 rounded px-3 py-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span>Thermal imaging included — no extra charge</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 rounded px-3 py-2">
              <FileText className="w-4 h-4 text-green-400" />
              <span>Same-day digital delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Report Summary Bar */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-50 rounded-xl border p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-slate-500">Property</p>
                <p className="font-semibold">Semi-Detached, 1,780 sq ft</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Year Built</p>
                <p className="font-semibold">2003</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Inspection Duration</p>
                <p className="font-semibold">3 hours 10 minutes</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Report Delivered</p>
                <p className="font-semibold">Same day, 4:22 PM</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{safetyCount}</div>
                <div className="text-sm text-slate-600">Safety Hazards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{majorCount}</div>
                <div className="text-sm text-slate-600">Major Defects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{monitorCount}</div>
                <div className="text-sm text-slate-600">Monitor / Maintenance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Read the Report */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold mb-4">How to Read This Report</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-red-700">Safety Hazard</span>
              </div>
              <p className="text-slate-600">Requires action before or immediately after purchase. Cracked heat exchangers, exposed live wiring, structural instability. Non-negotiable repairs.</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-orange-700">Major Defect</span>
              </div>
              <p className="text-slate-600">Significant cost to repair ($2,000+) or affects insurability. Kitec plumbing, mould, roof replacement, foundation issues. Primary negotiating leverage.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-yellow-700">Monitor / Maintain</span>
              </div>
              <p className="text-slate-600">Expected wear and maintenance items. Budget for these over the first few years of ownership — not typically grounds for renegotiation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Findings */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          {findings.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.severity}>
                <div className={`flex items-center gap-2 mb-4`}>
                  <Icon className={`w-5 h-5 ${group.iconColor}`} />
                  <h2 className="text-xl font-bold">{group.label}s ({group.items.length})</h2>
                </div>
                <div className="space-y-4">
                  {group.items.map((item, i) => (
                    <div key={i} className={`border rounded-xl p-5 ${group.color}`}>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          <p className="text-sm text-slate-500">{item.location}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${group.badgeColor}`}>{group.label}</span>
                          {item.hasPhoto && (
                            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                              <Camera className="w-3 h-3" /> Photo documented
                            </span>
                          )}
                          {item.hasThermal && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                              <Thermometer className="w-3 h-3" /> Thermal detected
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Thermal Imaging Section */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <Thermometer className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Thermal Imaging Findings</h2>
            <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded-full">Included at No Extra Charge</span>
          </div>
          <p className="text-slate-300 mb-8 max-w-2xl">Infrared thermal imaging detects temperature differences that indicate hidden moisture, missing insulation, and air leakage — problems that are invisible during a visual-only inspection. ASADS includes thermal scanning in every inspection.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {thermalFindings.map((tf, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-5">
                <div className="w-full h-32 bg-gradient-to-br from-blue-900 via-purple-800 to-orange-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-xs text-white/60 italic">Thermal image — {tf.title}</span>
                </div>
                <h3 className="font-semibold mb-2">{tf.title}</h3>
                <p className="text-sm text-slate-300 mb-3">{tf.description}</p>
                <p className="text-xs text-orange-300 flex items-start gap-1">
                  <Thermometer className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  {tf.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Every ASADS Report Includes</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { title: "Narrative descriptions", desc: "Written in plain language — not checkbox forms. Each finding explained with context and recommended action." },
              { title: "Photos for every finding", desc: "Every deficiency documented with a photograph clearly labelled with location and finding number." },
              { title: "Thermal imaging scans", desc: "Infrared images included wherever relevant — moisture, insulation gaps, cold air infiltration." },
              { title: "Severity categorization", desc: "Every finding categorized as Safety Hazard, Major Defect, or Monitor/Maintain — so you know what to negotiate." },
              { title: "Contractor recommendations", desc: "Suggested trades for follow-up — HVAC contractor, plumber, roofer — appropriate to each finding." },
              { title: "Same-day delivery", desc: "Report emailed within 4–6 hours of inspection completion — always before your condition expires." },
            ].map((f, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{f.title}</p>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">Book Your Inspection — Report Delivered the Same Day</h2>
          <p className="text-white/80 mb-6">InterNACHI certified. E&O insured. Thermal imaging included. Serving the GTA and all of Ontario.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
              Book Online
            </Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" />
              (647) 801-9311
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
