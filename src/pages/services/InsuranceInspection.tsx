import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ChevronRight, Shield, AlertTriangle, FileText, Clock, Home } from "lucide-react";

const metaTitle = "Insurance Home Inspection Ontario | Insurer Required";
const metaDescription = "Ontario insurer requiring a home inspection before coverage? ASADS provides insurance-compliant home inspections for older homes. Same-day report. Call (647) 801-9311.";

const whatInsurersCare = [
  {
    system: "Electrical",
    issues: [
      "Knob-and-tube wiring (active) — most Ontario insurers refuse coverage",
      "Aluminum branch circuit wiring — requires pigtailing or rewire",
      "Federal Pacific, Zinsco, or Pushmatic panels — flagged by most insurers",
      "Fuse boxes — many insurers require upgrade to breakers",
      "Double-tapped breakers, improper wiring",
    ],
  },
  {
    system: "Plumbing",
    issues: [
      "Kitec plumbing — insurance surcharge or refusal without remediation",
      "Lead supply pipes — common pre-1960, material concern for insurers",
      "Galvanized steel pipes — corrosion and flow restriction at 50+ years",
      "Active leaks or evidence of previous unrepaired water damage",
    ],
  },
  {
    system: "Roof",
    issues: [
      "Shingles at end of service life (typically 20–25 years for asphalt)",
      "Active leaks or interior water damage from roof",
      "Flat roof — age and membrane condition",
      "Mixed shingle materials (patch jobs over original)",
    ],
  },
  {
    system: "Heating",
    issues: [
      "No central heating — space heaters only (insurability concern)",
      "Wood stove without WETT certification (required by most Ontario insurers)",
      "Furnace at extreme end of service life",
      "Oil tank — age, indoor tank vs underground, condition",
    ],
  },
  {
    system: "Structural & Exterior",
    issues: [
      "Significant foundation cracks with active water infiltration",
      "Roof structure — visible sagging or failure",
      "Chimney — deteriorated mortar, missing cap, no liner",
      "Vacancy — insurers want confirmation property is occupied and maintained",
    ],
  },
];

const scenarios = [
  {
    scenario: "Insurer requires inspection before issuing new policy",
    when: "When purchasing a home and insurer flags it as a high-risk property (older home, lapsed coverage, flagged by previous insurer)",
    whatWeDeliver: "Full written inspection report documenting condition of electrical, plumbing, roof, heating, and structure. Same-day PDF delivery for insurer submission.",
  },
  {
    scenario: "Insurer requests inspection at renewal on older home",
    when: "Insurers increasingly require inspections on homes 25+ years old at renewal. Often triggered after a claim or by underwriting review.",
    whatWeDeliver: "Detailed current-condition report addressing every system insurers flag. Inspector available to clarify findings with your insurance broker if needed.",
  },
  {
    scenario: "Mortgage lender requires inspection for financing",
    when: "Some lenders require inspections as a condition of mortgage approval, particularly for older homes or fixer-uppers.",
    whatWeDeliver: "Full inspection report meeting standard lender requirements. Same-day delivery. Inspector available for follow-up questions.",
  },
  {
    scenario: "Switching insurers — new insurer requires inspection",
    when: "When moving to a new insurance provider, particularly if the property is older or coverage has lapsed.",
    whatWeDeliver: "Independent inspection report from InterNACHI-certified inspector. Not affiliated with any insurer or brokerage.",
  },
];

export default function InsuranceInspection() {
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
          "@type": "Service",
          "name": "Insurance Home Inspection Ontario",
          "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" },
          "description": metaDescription,
          "areaServed": "Ontario, Canada",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://www.asads.ca/booking",
            "availableLanguage": "English"
          }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Insurance Home Inspection</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-10 h-10 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Insurance-Required Home Inspection in Ontario</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Your insurer wants a home inspection before they'll issue or renew coverage. ASADS provides the inspection report your broker needs — same-day delivery, independent certified inspector, no affiliation with any insurer or brokerage.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:+16478019311" className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-5 h-5" /> Call (647) 801-9311
            </a>
            <Link to="/booking" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
              Book Online
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-3">Same-day and next-day availability · Report delivered same day · Serving 106+ Ontario cities</p>
        </div>
      </section>

      {/* Why insurers require inspections */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Why Insurers Require Home Inspections in Ontario</h2>
          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-3 text-slate-700">
            <p>Ontario home insurers are requiring inspections more frequently on older properties — particularly homes built before 1990. The reasons:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kitec plumbing</strong> (1995–2007) — widely associated with fitting failures. Many insurers refuse to underwrite without remediation confirmation.</li>
              <li><strong>Knob-and-tube and aluminum wiring</strong> — both flagged as elevated fire risk by Ontario insurers. Active K&T is often a flat refusal.</li>
              <li><strong>Wood stoves and fireplace inserts</strong> — WETT inspection required before most Ontario insurers will cover homes with these appliances.</li>
              <li><strong>Roof age</strong> — insurers increasingly require confirmation that roofing materials are within acceptable remaining service life.</li>
              <li><strong>Older homes generally</strong> — underwriting requirements have tightened; homes 25+ years old are routinely required to pass inspection at renewal.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">When an Insurance Inspection Is Required</h2>
          <div className="space-y-4">
            {scenarios.map((item, i) => (
              <div key={i} className="bg-white border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <Home className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold">{item.scenario}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm pl-8">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Typically triggered when</p>
                    <p className="text-slate-600">{item.when}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">What ASADS delivers</p>
                    <p className="text-slate-700">{item.whatWeDeliver}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What insurers look at */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">What Ontario Insurers Focus On</h2>
          <p className="text-slate-500 text-sm mb-6">These are the systems and conditions that Ontario home insurers flag most consistently. ASADS inspectors assess and document every one.</p>
          <div className="space-y-4">
            {whatInsurersCare.map((section, i) => (
              <div key={i} className="border rounded-xl overflow-hidden">
                <div className="bg-slate-800 text-white px-5 py-2.5 text-sm font-semibold">{section.system}</div>
                <ul className="divide-y divide-slate-100">
                  {section.issues.map((issue, j) => (
                    <li key={j} className="px-5 py-2.5 text-sm text-slate-700 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">What the ASADS Insurance Inspection Report Includes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: FileText, label: "Written narrative report", desc: "Full condition report in PDF format — not a checkbox form. Plain language, photographed findings, suitable for insurer and broker submission." },
              { icon: Clock, label: "Same-day delivery", desc: "Report emailed within 4–6 hours of inspection completion. If your insurer has a deadline, we can accommodate urgent timelines." },
              { icon: Shield, label: "Independent certified inspector", desc: "InterNACHI-certified, E&O insured. No affiliation with any insurer, broker, or remediation contractor. Our report reflects the actual condition." },
              { icon: CheckCircle, label: "All systems documented", desc: "Electrical, plumbing, roof, heating, structure, and exterior — the full scope insurers require. Includes thermal imaging for moisture and electrical." },
              { icon: Phone, label: "Inspector available for broker questions", desc: "If your broker needs clarification on any finding, our inspector is available by phone after report delivery." },
              { icon: FileText, label: "WETT inspection available", desc: "If your property has a wood stove or fireplace insert, WETT inspection can be completed in the same visit. Most Ontario insurers require it." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white border rounded-xl p-4 flex gap-3">
                  <Icon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
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

      {/* Independence note */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">We Don't Work for Your Insurer — We Work for You</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                ASADS has no financial relationship with any insurance company, broker, or remediation contractor. Our report reflects the actual condition of the property. If the inspection finds issues, we document them accurately — we don't soften findings to satisfy any third party, and we don't inflate findings to generate remediation work. What we see is what we report.
              </p>
              <Link to="/our-promise" className="inline-flex items-center gap-2 mt-3 text-green-400 hover:text-green-300 text-sm font-medium">
                Read our independence policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Shield className="w-10 h-10 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">Book Your Insurance Home Inspection in Ontario</h2>
          <p className="text-white/80 mb-2">Same-day and next-day availability. Report delivered same day — ready for insurer or broker submission.</p>
          <p className="text-white/60 text-sm mb-6">Serving Toronto, Mississauga, Hamilton, Kitchener, Barrie, and 100+ Ontario cities.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">Book Online</Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> (647) 801-9311
            </a>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also:{" "}
            <Link to="/sample-report" className="underline hover:text-white">Sample report</Link>
            {" · "}
            <Link to="/services/wett" className="underline hover:text-white">WETT inspection</Link>
            {" · "}
            <Link to="/our-promise" className="underline hover:text-white">Our independence promise</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
