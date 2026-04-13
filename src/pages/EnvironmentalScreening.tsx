import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import {
  CheckCircle, Phone, ChevronRight, Wind, AlertTriangle,
  Microscope, ShieldCheck, ArrowRight, HelpCircle
} from "lucide-react";

const metaTitle = "Environmental Home Inspection Ontario | Mold Asbestos Radon";
const metaDescription = "ASADS screens for mold, asbestos, radon, and air quality during home inspections across Ontario. We test during the inspection and refer to accredited labs — no conflict of interest.";

const screeningItems = [
  {
    issue: "Mold & Moisture",
    howWeFind: "Thermal imaging detects moisture behind walls and ceilings. Visual inspection of attic, basement, and crawl space. Air sampling available when visual signs are present.",
    whenWeRefer: "When sampling indicates spore counts requiring professional remediation, we refer to accredited environmental hygienists — not our own crew.",
    risk: "Health risk, disclosure obligation, mortgage/insurance issues on resale.",
    serviceLink: "/services/mold-inspection",
    serviceLabel: "Mold Inspection",
  },
  {
    issue: "Asbestos",
    howWeFind: "Identify materials of concern in homes built before 1985: vermiculite insulation, floor tiles, pipe insulation, ceiling texture. Sample collection during inspection.",
    whenWeRefer: "Lab analysis by accredited asbestos testing lab (CALA-accredited). If abatement is required, we refer to licensed abatement contractors — not affiliated with ASADS.",
    risk: "Carcinogen. Disclosure required. Major renovation cost if disturbed.",
    serviceLink: "/services/asbestos-testing",
    serviceLabel: "Asbestos Testing",
  },
  {
    issue: "Radon Gas",
    howWeFind: "Long-term radon testing (90+ days) or short-term test devices placed during inspection. Radon is a colourless, odourless gas and cannot be detected visually.",
    whenWeRefer: "If levels exceed Health Canada's guideline of 200 Bq/m³, we refer to certified radon mitigation contractors for sub-slab depressurization systems.",
    risk: "Leading environmental cause of lung cancer in Canada. Mitigation typically $1,500–$3,000.",
    serviceLink: "/services/radon-testing",
    serviceLabel: "Radon Testing",
  },
  {
    issue: "Indoor Air Quality",
    howWeFind: "Air quality sampling for VOCs, particulate matter, and biological contaminants when indicated by property conditions, age, or buyer health concerns.",
    whenWeRefer: "Full IAQ assessment and lab analysis by accredited environmental hygienists. ASADS does not operate a lab — we collect samples and direct to accredited third parties.",
    risk: "Health impact. Relevant for buyers with respiratory conditions, young children, or immunocompromised household members.",
    serviceLink: "/services/air-quality",
    serviceLabel: "Air Quality Testing",
  },
  {
    issue: "Lead Paint",
    howWeFind: "XRF screening and/or swab testing for lead-based paint in homes built before 1978. Common in trim, windows, doors, and older interior finishes.",
    whenWeRefer: "If abatement is required, refer to licensed contractors experienced in lead paint removal protocols.",
    risk: "Neurological risk. Material disclosure requirement. Renovation permit requirement if disturbed.",
    serviceLink: "/services/lead-paint-testing",
    serviceLabel: "Lead Paint Testing",
  },
];

const faq = [
  {
    q: "Is ASADS a specialized environmental testing lab?",
    a: "No — and we're clear about that. ASADS is a home inspection firm that integrates environmental screening into the inspection process. We collect samples, use thermal imaging, and identify risk indicators. Lab analysis is handled by accredited third-party labs. This separation is intentional and protects your interests.",
  },
  {
    q: "Why not hire a dedicated IAQ firm instead?",
    a: "A dedicated IAQ firm is the right choice when you already have a specific concern — you've seen mold, you know the property has asbestos, or a family member has severe respiratory conditions. For most home buyers, screening during the inspection is the right first step: it identifies whether a specialist is actually needed, saves you from paying for full IAQ analysis on every property, and gives the inspector context for interpreting what they find.",
  },
  {
    q: "Do you recommend specific remediation contractors?",
    a: "We recommend categories of licensed professionals (licensed abatement contractors, certified radon mitigators) but we do not have financial relationships with specific companies. We have no incentive to recommend remediation you don't need.",
  },
  {
    q: "Can environmental testing be added on the same day as the inspection?",
    a: "Yes. Mold air sampling, asbestos sample collection, and radon test placement can all be done during the home inspection visit. Results from lab analysis typically come back within 3–5 business days.",
  },
  {
    q: "What's the difference between asbestos testing and a Designated Substance Survey?",
    a: "A Designated Substance Survey (DSS) is a comprehensive pre-renovation or pre-demolition survey required under Ontario's Occupational Health and Safety Act. It covers all designated substances, not just asbestos. ASADS offers both — see our Designated Substance Survey page for commercial and renovation projects.",
  },
];

export default function EnvironmentalScreening() {
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
          "name": "Environmental Home Inspection Screening Ontario",
          "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" },
          "description": metaDescription,
          "areaServed": "Ontario, Canada",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Environmental Screening Services",
            "itemListElement": screeningItems.map(s => ({
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": s.issue + " Inspection" }
            }))
          }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Environmental Screening</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Wind className="w-10 h-10 text-teal-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Environmental Screening During Your Home Inspection</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Mold, asbestos, radon, lead, and indoor air quality are health and financial risks hiding in Ontario homes — especially those built before 1990. ASADS integrates environmental screening into the inspection and directs testing to accredited labs, not in-house remediation crews.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:+16478019311" className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-5 h-5" /> (647) 801-9311
            </a>
            <Link to="/booking" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
              Book Inspection + Screening
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-3">Environmental add-ons scheduled during the same visit · No separate booking required</p>
        </div>
      </section>

      {/* Why integrated screening matters */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Why Environmental Screening Should Happen at the Inspection</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "The inspector already has context",
                detail: "When your home inspector identifies moisture staining, suspicious insulation, or poor ventilation, they know exactly where to sample. An IAQ firm arriving separately doesn't have that on-site context.",
              },
              {
                title: "One visit instead of two",
                detail: "Adding environmental testing to the inspection means one trip to the property, one coordination window with the seller, and faster results — important when your condition period is tight.",
              },
              {
                title: "Screening, not assumption",
                detail: "Not every home needs full environmental analysis. Integrated screening identifies whether a specialist is actually warranted — saving you from paying for comprehensive IAQ analysis on every property you inspect.",
              },
            ].map((item, i) => (
              <div key={i} className="border rounded-xl p-5">
                <CheckCircle className="w-6 h-6 text-teal-500 mb-3" />
                <p className="font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we screen for */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">Environmental Issues We Screen For</h2>
          <p className="text-slate-500 mb-8">Each entry below includes how we identify the risk, when we refer to a specialist, and what the stakes are.</p>
          <div className="space-y-5">
            {screeningItems.map((item, i) => (
              <div key={i} className="bg-white border rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b flex items-center gap-3">
                  <Microscope className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <h3 className="font-bold">{item.issue}</h3>
                  <Link to={item.serviceLink} className="ml-auto text-xs text-teal-600 hover:underline flex items-center gap-1">
                    {item.serviceLabel} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="px-5 py-4 grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">How we find it</p>
                    <p className="text-slate-700">{item.howWeFind}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">When we refer out</p>
                    <p className="text-slate-700">{item.whenWeRefer}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Risk if missed</p>
                    <p className="text-slate-600">{item.risk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Independence statement */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-10 h-10 text-teal-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">ASADS Does Not Remediate. That's Intentional.</h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                The single biggest conflict of interest in environmental inspection is when the same company that finds the problem also sells the fix. ASADS does not perform mold remediation, asbestos abatement, radon mitigation, or any repair work on properties we inspect. We collect samples, analyze findings, and refer to <strong className="text-white">independent, accredited professionals</strong> when remediation is needed.
              </p>
              <p className="text-slate-300 leading-relaxed">
                This means our findings are never influenced by what remediation work we could sell you afterward. When we tell you there's a problem, it's because there's a problem.
              </p>
              <Link to="/our-promise" className="inline-flex items-center gap-2 mt-4 text-teal-400 hover:text-teal-300 text-sm font-medium">
                Read our full independence policy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl font-bold">Environmental Screening — Common Questions</h2>
          </div>
          <div className="space-y-5">
            {faq.map((item, i) => (
              <div key={i} className="border rounded-xl p-5">
                <p className="font-semibold mb-2">{item.q}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties where env screening is especially important */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4">When Environmental Screening Is Especially Important</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              "Homes built before 1985 (asbestos risk)",
              "Homes built before 1978 (lead paint risk)",
              "Properties with visible moisture staining or musty odour",
              "Basement or crawl space with water infiltration history",
              "Rural or lower-level properties (radon accumulation risk)",
              "Buyers with respiratory conditions or young children",
              "Investment properties with prior tenant activity",
              "Properties near industrial sites or older commercial zones",
              "Renovation projects (disturbing materials = exposure risk)",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-white border rounded-lg p-3">
                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Wind className="w-10 h-10 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">Book Inspection + Environmental Screening</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Environmental add-ons are scheduled during the same visit as your home inspection. Same-day and next-day availability across Ontario.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
              Book Online
            </Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> (647) 801-9311
            </a>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also:{" "}
            <Link to="/services/mold-inspection" className="underline hover:text-white">Mold inspection</Link> ·{" "}
            <Link to="/services/asbestos-testing" className="underline hover:text-white">Asbestos testing</Link> ·{" "}
            <Link to="/services/radon-testing" className="underline hover:text-white">Radon testing</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
