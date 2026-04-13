import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import {
  CheckCircle, Phone, ChevronRight, Package, Clock,
  DollarSign, Thermometer, Wind, Microscope, Droplets, Flame, ArrowRight
} from "lucide-react";

const metaTitle = "Bundled Home Inspection Ontario | Mold Radon Asbestos Same Day";
const metaDescription = "Book your home inspection plus mold, radon, asbestos, or air quality testing in one visit. ASADS bundles specialty tests with every inspection across Ontario. Same-day results.";

const addOns = [
  {
    icon: Thermometer,
    name: "Thermal Imaging",
    included: true,
    price: "Included",
    time: "During inspection",
    what: "FLIR infrared scan of every accessible wall, ceiling, and floor. Detects hidden moisture, missing insulation, heat loss, and electrical hotspots invisible to the naked eye.",
    why: "Already included in every inspection — no extra booking needed.",
    link: "/services/thermal-imaging",
  },
  {
    icon: Microscope,
    name: "Mold Air Sampling",
    included: false,
    price: "From $149",
    time: "Samples collected during inspection · Lab results 3–5 business days",
    what: "Air cassette samples collected from inside the home and a control sample from outside. Sent to an AIHA-accredited lab. Results show spore types and counts compared to outdoor baseline.",
    why: "Recommended when there is visible mould, a musty odour, moisture history, or when any household member has respiratory sensitivities. Pre-1985 homes with poor attic ventilation.",
    link: "/services/mold-inspection",
  },
  {
    icon: Wind,
    name: "Radon Testing",
    included: false,
    price: "From $199",
    time: "Test device placed during inspection · Long-term 90-day result or short-term 48-hr available",
    what: "C-NRPP certified radon testing using approved measurement devices. Radon is a colourless, odourless radioactive gas — the leading environmental cause of lung cancer in Canada.",
    why: "Recommended for all lower-level or below-grade living areas, rural properties, and homes in areas with known elevated geological radon. Health Canada guideline: 200 Bq/m³.",
    link: "/services/radon-testing",
  },
  {
    icon: Droplets,
    name: "Asbestos Sample Collection",
    included: false,
    price: "From $149 per sample",
    time: "Samples collected during inspection · Lab results 3–5 business days",
    what: "Bulk material sampling of suspected asbestos-containing materials (ACM) — vermiculite insulation, floor tiles, ceiling texture, pipe insulation, drywall compound. Sent to CALA-accredited lab.",
    why: "Required for any home built before 1985 undergoing renovation or demolition. Recommended as standard practice for pre-1985 homes due to widespread use of asbestos-containing products.",
    link: "/services/asbestos-testing",
  },
  {
    icon: Wind,
    name: "Air Quality Testing (IAQ)",
    included: false,
    price: "From $249",
    time: "Samples collected during inspection · Lab results 3–5 business days",
    what: "Sampling for VOCs, particulate matter, and biological contaminants. Appropriate for buyers with respiratory conditions, homes with known indoor air quality concerns, or post-renovation properties.",
    why: "Recommended for buyers with asthma, allergies, or immunocompromised household members; older homes with history of chemical storage or industrial use nearby.",
    link: "/services/air-quality",
  },
  {
    icon: Droplets,
    name: "Lead Paint Screening",
    included: false,
    price: "From $99",
    time: "Swab tests conducted during inspection · Results same or next day",
    what: "XRF screening or swab testing of painted surfaces in homes built before 1978. Common locations: window trim, baseboards, doors, exterior painted surfaces.",
    why: "Required disclosure in Ontario for homes built before 1978. Essential if renovation work is planned — disturbing lead paint without proper precautions creates serious exposure risk.",
    link: "/services/lead-paint-testing",
  },
  {
    icon: Droplets,
    name: "Well Water Testing",
    included: false,
    price: "From $149",
    time: "Sample collected during inspection · Lab results 5–7 business days",
    what: "Water sample collection from private well for bacterial testing (E. coli, coliform) and chemical analysis. Sent to accredited lab. Includes nitrate, pH, hardness, and metals panel.",
    why: "Required for all properties with a private well supply. Ontario MOE recommends annual bacterial testing at minimum. Many lenders require a water test report for rural properties.",
    link: "/services/well-water-testing",
  },
  {
    icon: Flame,
    name: "WETT Inspection (Wood-Burning Appliances)",
    included: false,
    price: "From $199",
    time: "Conducted during inspection or as standalone",
    what: "WETT-certified inspection of wood stoves, fireplaces, and chimneys. Required by most Ontario insurers for wood-burning appliances. Covers clearances, installation, liner condition, and draft.",
    why: "Required by most Ontario home insurers if the property has a wood stove, fireplace insert, or wood-burning appliance. Many buyers don't know this until they apply for coverage.",
    link: "/services/wett",
  },
];

const bundles = [
  {
    name: "Core Bundle",
    description: "Standard pre-purchase inspection for most GTA detached and semi-detached homes.",
    includes: ["Full home inspection (2.5–4 hrs on site)", "Thermal imaging — every inspection", "Same-day PDF report with photos"],
    price: "From $399",
    bestFor: "Standard residential properties with no specific environmental concerns.",
  },
  {
    name: "Pre-1985 Bundle",
    description: "For homes built before 1985 where asbestos and lead are common concerns.",
    includes: ["Full home inspection + thermal imaging", "Asbestos sample collection (2 samples)", "Lead paint swab screening", "Same-day report"],
    price: "From $649",
    bestFor: "Century homes, 1950s–1980s bungalows, and pre-1985 builds in any Ontario city.",
  },
  {
    name: "Environmental Bundle",
    description: "Full environmental screening — mold, radon, and asbestos in one visit.",
    includes: ["Full home inspection + thermal imaging", "Mold air sampling (2 samples)", "Radon test device placement", "Asbestos sample collection (2 samples)", "Same-day report + lab analysis on all samples"],
    price: "From $849",
    bestFor: "Buyers with health sensitivities, rural properties, lower-level living areas, or homes with visible moisture history.",
  },
  {
    name: "Rural / Well Water Bundle",
    description: "For rural properties with private well water supply.",
    includes: ["Full home inspection + thermal imaging", "Well water bacterial + chemical analysis", "Radon test placement", "Same-day report"],
    price: "From $699",
    bestFor: "Rural Ontario properties — Barrie, Simcoe County, Prince Edward County, Grey Bruce, Northumberland.",
  },
];

export default function BundledInspection() {
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
          "name": "Bundled Home Inspection with Specialty Testing Ontario",
          "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" },
          "description": metaDescription,
          "areaServed": "Ontario, Canada",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bundled Inspection Packages",
            "itemListElement": bundles.map(b => ({
              "@type": "Offer",
              "name": b.name,
              "description": b.description,
              "price": b.price,
              "priceCurrency": "CAD"
            }))
          }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Bundled Inspection + Testing</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Package className="w-10 h-10 text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Home Inspection + Specialty Testing in One Visit</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Mold testing, radon, asbestos, lead paint, well water, and WETT inspections can all be done during the same appointment as your home inspection. One booking, one visit, one coordinated report — no separate scheduling with multiple vendors.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:+16478019311" className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-5 h-5" /> (647) 801-9311 — Discuss Your Bundle
            </a>
            <Link to="/booking" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
              Book Online
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-3">Thermal imaging included in every inspection at no extra charge · Lab samples collected on-site</p>
        </div>
      </section>

      {/* Why bundle */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Why Book Add-Ons at the Same Appointment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "One visit to the property",
                detail: "Access needs to be arranged only once with the seller or listing agent. One window, one set of keys, one coordination call. This is especially important in competitive markets where repeated access requests are unwelcome.",
              },
              {
                icon: DollarSign,
                title: "Inspector context improves sampling",
                detail: "When the inspector is on-site, they place air samples and test devices in the locations most likely to yield meaningful results — not arbitrary locations. A separate IAQ firm arriving without inspection context doesn't have this advantage.",
              },
              {
                icon: Package,
                title: "One coordinated report",
                detail: "Inspection findings and specialty test results reference the same property observations. If the inspector identifies suspect material in the attic, the asbestos sample is taken there — not from a random location.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="border rounded-xl p-5">
                  <Icon className="w-6 h-6 text-indigo-500 mb-3" />
                  <p className="font-semibold mb-2">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">Common Bundle Combinations</h2>
          <p className="text-slate-500 text-sm mb-8">These are the most common inspection + testing combinations. Custom combinations are also available — call to discuss your property's specific needs.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {bundles.map((bundle, i) => (
              <div key={i} className="bg-white border rounded-xl p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-base">{bundle.name}</h3>
                  <span className="text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full whitespace-nowrap">{bundle.price}</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">{bundle.description}</p>
                <ul className="space-y-1.5 mb-3">
                  {bundle.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400 mt-2"><span className="font-semibold">Best for:</span> {bundle.bestFor}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">* Prices are estimates. Final pricing depends on property size, number of samples, and specific test requirements. Call (647) 801-9311 for a quote.</p>
        </div>
      </section>

      {/* All add-ons */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">All Available Add-Ons</h2>
          <p className="text-slate-500 text-sm mb-8">Any of these can be added to your home inspection at booking or on-site. Thermal imaging is always included — it's not optional.</p>
          <div className="space-y-4">
            {addOns.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b">
                    <Icon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.included
                      ? <span className="ml-auto text-xs font-bold bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">Included Free</span>
                      : <span className="ml-auto text-xs font-semibold text-indigo-700">{item.price}</span>
                    }
                    <Link to={item.link} className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 ml-2">
                      Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="px-5 py-4 grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">What it covers</p>
                      <p className="text-slate-700">{item.what}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">When to add it</p>
                      <p className="text-slate-600">{item.why}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Timing</p>
                      <p className="text-slate-600">{item.time}</p>
                    </div>
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
            <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Lab Analysis Is Always Independent</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Every sample ASADS collects goes to an <strong className="text-white">accredited third-party lab</strong> — AIHA-accredited for mold, CALA-accredited for asbestos, C-NRPP certified for radon. ASADS does not operate its own lab. We collect, they analyze.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                We also don't perform remediation. If a test result warrants action, we refer to independent licensed contractors with no financial relationship to ASADS. The test result is the test result — there's no financial incentive for us to find or exaggerate problems.
              </p>
              <Link to="/our-promise" className="inline-flex items-center gap-2 mt-4 text-green-400 hover:text-green-300 text-sm font-medium">
                Read our independence policy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Property types where bundling matters */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-5">When Add-On Testing Is Particularly Important</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              { trigger: "Built before 1985", tests: "Asbestos, lead paint — both were in common use" },
              { trigger: "Basement or lower-level bedrooms", tests: "Radon accumulates in lowest occupied space" },
              { trigger: "Attic with bathroom fan venting in", tests: "Mold air sampling — chronic moisture source" },
              { trigger: "Visible water staining or musty smell", tests: "Mold air sampling to confirm and quantify" },
              { trigger: "Rural property with private well", tests: "Well water bacterial + chemical analysis" },
              { trigger: "Wood stove or fireplace insert", tests: "WETT inspection — required by most Ontario insurers" },
              { trigger: "Vermiculite insulation in attic", tests: "Asbestos sample — ~70% of vermiculite was Zonolite (asbestos-contaminated)" },
              { trigger: "Buyers with respiratory conditions", tests: "IAQ full panel, mold, VOC screening" },
              { trigger: "Pre-renovation purchase (BRRR/flip)", tests: "Asbestos DSS — required before disturbing materials" },
            ].map((item, i) => (
              <div key={i} className="bg-white border rounded-lg p-3">
                <p className="font-semibold text-xs text-indigo-700 mb-1">{item.trigger}</p>
                <p className="text-slate-600 text-xs">{item.tests}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Package className="w-10 h-10 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">Book Your Inspection + Add-On Testing</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            One appointment. All tests collected on-site. Lab results coordinated with your inspection report. Same-day and next-day availability across Ontario.
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
            <Link to="/environmental-screening" className="underline hover:text-white">Environmental screening</Link> ·{" "}
            <Link to="/our-promise" className="underline hover:text-white">Our independence promise</Link> ·{" "}
            <Link to="/pricing" className="underline hover:text-white">Pricing</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
