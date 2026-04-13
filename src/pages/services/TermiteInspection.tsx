import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ChevronRight, Bug, AlertTriangle, FileText, Clock, Shield, Eye } from "lucide-react";

const metaTitle = "Termite Inspection Ontario | Wood-Destroying Pest Inspection";
const metaDescription = "Termite and wood-destroying insect inspection in Ontario. ASADS certified inspector identifies active infestations, frass, damaged wood, and mud tubes. Same-day report. Call (647) 801-9311.";

const whatWeLookFor = [
  {
    category: "Active Infestation Signs",
    items: [
      "Live termites or swarmers (winged reproductives) — seasonally active spring through fall",
      "Mud tubes on foundation walls, floor joists, or exterior concrete",
      "Frass (termite droppings) — looks like tiny wood-coloured pellets near infested wood",
      "Discarded wings near windows and doors after a swarm event",
    ],
  },
  {
    category: "Structural Wood Damage",
    items: [
      "Hollowed or damaged floor joists, sill plates, and subfloor framing",
      "Wood that sounds hollow when tapped — termites consume from the inside out",
      "Sagging floors, soft spots, or doors/windows that suddenly stick (sign of frame damage)",
      "Paint bubbling or discolouration over wood that appears intact — moisture trapped inside damaged wood",
    ],
  },
  {
    category: "Other Wood-Destroying Insects",
    items: [
      "Carpenter ants — do not eat wood but excavate it; frass looks like coarse sawdust",
      "Wood-boring beetles — round exit holes (1–3mm) in hardwood floors, furniture, or framing",
      "Carpenter bees — perfectly round 1cm holes in exterior wood trim and fascia boards",
      "Powder post beetles — very fine powdery frass, affects hardwoods",
    ],
  },
  {
    category: "High-Risk Areas Inspected",
    items: [
      "Basement and crawlspace framing — sill plates, rim joists, floor joists",
      "Exterior foundation perimeter — soil contact, wood mulch against foundation, deck ledgers",
      "Attic framing — rafters, collar ties, ridge board",
      "Interior wood trim, window and door frames, hardwood flooring",
    ],
  },
];

const scenarios = [
  {
    scenario: "Pre-purchase inspection add-on",
    when: "Before closing on any Ontario home, particularly older properties, homes with wood-to-soil contact, or properties with previous moisture issues.",
    deliver: "Written termite and WDI inspection report documenting any evidence of infestation, damage, or high-risk conditions. Same-day delivery alongside your home inspection report.",
  },
  {
    scenario: "Insurer or lender requirement",
    when: "Some mortgage lenders and insurers require a wood-destroying insect report as a condition of financing or coverage, particularly on rural properties and older homes.",
    deliver: "Formal written WDI inspection report from a certified inspector. Independent, no affiliation with pest control companies.",
  },
  {
    scenario: "Suspected infestation",
    when: "You've noticed mud tubes, frass, hollow-sounding wood, swarming insects in spring, or unexplained structural damage.",
    deliver: "Detailed inspection documenting findings with photos, identification of insect species (where possible), and assessment of damage extent.",
  },
  {
    scenario: "Post-treatment verification",
    when: "After pest control treatment, to confirm evidence of active infestation is no longer present and assess remaining structural damage.",
    deliver: "Written report documenting current conditions vs. previous findings. Inspector available to discuss remediation scope with contractors.",
  },
];

export default function TermiteInspection() {
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
          "name": "Termite Inspection Ontario",
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
      <section className="bg-gradient-to-br from-slate-900 to-amber-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Termite Inspection</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Bug className="w-10 h-10 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Termite & Wood-Destroying Insect Inspection in Ontario</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Termites and wood-destroying insects cause billions in structural damage annually — and most infestations are invisible until significant damage is done. ASADS provides certified WDI inspections with same-day written reports. No pest control affiliation. Independent findings only.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:+16478019311" className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-5 h-5" /> Call (647) 801-9311
            </a>
            <Link to="/booking" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
              Book Online
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-3">Can be combined with any home inspection · Same-day report · Serving 106+ Ontario cities</p>
        </div>
      </section>

      {/* Why termite inspection matters */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Termites in Ontario — What You Need to Know</h2>
          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-3 text-slate-700">
            <p>Eastern Subterranean Termites (<em>Reticulitermes flavipes</em>) are the most common termite species in Ontario and are found throughout the province — not just in the south. They live underground in colonies of up to one million insects and enter homes through foundation cracks, wood-to-soil contact, and utility penetrations.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Damage is hidden:</strong> Termites consume wood from the inside out, leaving a paper-thin shell. Structural members can be significantly compromised before any visible sign appears.</li>
              <li><strong>Swarm season:</strong> Termite swarmers (winged reproductives) emerge in spring — typically April to June in Ontario — and are often the first visible sign of an established colony.</li>
              <li><strong>Wood-to-soil contact</strong> is the #1 risk factor. Deck posts, porch stairs, wood mulch against the foundation, and buried wood debris all attract subterranean termites.</li>
              <li><strong>Carpenter ants</strong> are often mistaken for termites and cause significant damage in their own right — common in Ontario homes with moisture issues or rotting wood.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What we look for */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">What the Inspector Looks For</h2>
          <p className="text-slate-500 text-sm mb-6">A complete WDI inspection covers four categories. Every accessible area is physically checked — not estimated from the doorway.</p>
          <div className="space-y-4">
            {whatWeLookFor.map((section, i) => (
              <div key={i} className="border rounded-xl overflow-hidden">
                <div className="bg-slate-800 text-white px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4" />{section.category}
                </div>
                <ul className="divide-y divide-slate-100">
                  {section.items.map((item, j) => (
                    <li key={j} className="px-5 py-2.5 text-sm text-slate-700 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">When to Book a Termite Inspection</h2>
          <div className="space-y-4">
            {scenarios.map((item, i) => (
              <div key={i} className="bg-slate-50 border rounded-xl p-5">
                <h3 className="font-semibold mb-3">{item.scenario}</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Typically when</p>
                    <p className="text-slate-600">{item.when}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">What ASADS delivers</p>
                    <p className="text-slate-700">{item.deliver}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">What the Report Includes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: FileText, label: "Written WDI report", desc: "Formal written Wood-Destroying Insect inspection report in PDF format. Documents all findings with photos, location of evidence, and severity assessment." },
              { icon: Clock, label: "Same-day delivery", desc: "Report emailed within 4–6 hours of inspection. Can be completed alongside your home inspection in the same visit — no second appointment needed." },
              { icon: Shield, label: "Independent — no pest control affiliation", desc: "ASADS has no financial relationship with any pest control or remediation company. Our report reflects what we found. We don't refer to specific contractors." },
              { icon: CheckCircle, label: "All accessible areas inspected", desc: "Basement framing, crawlspace, attic, exterior foundation perimeter, interior wood trim — every accessible area physically checked." },
              { icon: Bug, label: "All WDI species covered", desc: "Subterranean termites, carpenter ants, carpenter bees, wood-boring beetles, and powder post beetles — all documented in the same report." },
              { icon: Eye, label: "Thermal imaging assists detection", desc: "Infrared camera included at no extra charge. Identifies moisture pockets and temperature anomalies in walls that indicate active infestation or conditions conducive to WDI." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white border rounded-xl p-4 flex gap-3">
                  <Icon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
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
              <h2 className="text-xl font-bold mb-2">We Inspect. We Don't Treat.</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                ASADS does not perform pest control treatment, remediation, or fumigation — and we have no referral arrangements with pest control companies. Our inspector's only job is to accurately document what they find. If an infestation is confirmed, you choose your own licensed pest control provider without any influence from us.
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
          <Bug className="w-10 h-10 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">Book a Termite & WDI Inspection in Ontario</h2>
          <p className="text-white/80 mb-2">Add to any home inspection or book standalone. Same-day report delivered after inspection.</p>
          <p className="text-white/60 text-sm mb-6">Serving Toronto, Mississauga, Hamilton, Kitchener, Barrie, and 100+ Ontario cities.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">Book Online</Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> (647) 801-9311
            </a>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also:{" "}
            <Link to="/services/pre-purchase" className="underline hover:text-white">Pre-purchase inspection</Link>
            {" · "}
            <Link to="/bundled-inspection" className="underline hover:text-white">Bundled inspections</Link>
            {" · "}
            <Link to="/our-promise" className="underline hover:text-white">Our independence promise</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
