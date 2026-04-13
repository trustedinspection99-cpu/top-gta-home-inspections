import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ChevronRight, TrendingUp, Building2, Thermometer, FileText, DollarSign, Layers } from "lucide-react";

const metaTitle = "Home Inspection for Investors Ontario | Multi-Unit & Portfolio";
const metaDescription = "Real estate investors in Ontario trust ASADS for multi-unit, duplex, triplex, and portfolio inspections. Volume pricing, investor-focused reports, same-day delivery. Call (647) 801-9311.";

export default function ForInvestors() {
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
          "name": "Real Estate Investor Home Inspection Ontario",
          "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" },
          "description": metaDescription,
          "areaServed": "Ontario, Canada"
        })}</script>
      </Helmet>

      <section className="bg-gradient-to-br from-slate-900 to-emerald-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>For Real Estate Investors</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <TrendingUp className="w-10 h-10 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Home Inspections for Real Estate Investors in Ontario</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Investors don't need a feel-good report — they need the full picture: capital expenditure timeline, deferred maintenance, what's coming in years 1–5, and what the numbers actually mean for cash flow. ASADS delivers investor-grade reports, not buyer reassurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What investors need */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">What Real Estate Investors Need From an Inspection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Capital Expenditure Timeline",
                desc: "ASADS reports include estimated remaining service life for every major system — roof, furnace, water heater, windows, AC. This lets you build a realistic CapEx schedule for years 1–5 before you make an offer.",
              },
              {
                icon: Layers,
                title: "Multi-Unit Property Assessment",
                desc: "Duplexes, triplexes, and fourplexes require unit-by-unit assessment plus evaluation of shared systems — shared plumbing, shared HVAC, separate electrical panels, fire separation compliance. We cover all of it.",
              },
              {
                icon: Building2,
                title: "Tenant-Occupied Properties",
                desc: "Inspecting with tenants in place requires scheduling, communication, and efficiency. ASADS works with your timeline and tenant availability to complete thorough inspections without disruption.",
              },
              {
                icon: FileText,
                title: "Report Formats Useful for Due Diligence",
                desc: "Our reports are structured for decision-making, not just documentation. Safety issues, major defects, and maintenance items are clearly separated — and our inspectors are available for phone consults after delivery.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Property types */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Property Types We Inspect for Investors</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { type: "Single detached — buy & hold", detail: "Full inspection with CapEx timeline. Identify what's coming in years 1, 3, and 5." },
              { type: "Legal duplex / triplex", detail: "Unit-by-unit assessment + shared systems: plumbing, HVAC, electrical, fire separation." },
              { type: "Basement apartment conversion", detail: "Verify legality, fire separation, egress windows, separate electrical, and HVAC." },
              { type: "BRRR properties (before renovation)", detail: "Identify structural issues, Kitec/aluminum wiring, knob-and-tube — before you commit to renovation costs." },
              { type: "Pre-sale flip assessment", detail: "Identify what a buyer's inspector will find before you list — avoid surprises that kill deals." },
              { type: "Portfolio acquisition", detail: "Volume pricing for multiple properties. Book multiple inspections, coordinate scheduling across addresses." },
            ].map((p, i) => (
              <div key={i} className="bg-white border rounded-lg p-4">
                <p className="font-medium text-sm mb-1">{p.type}</p>
                <p className="text-xs text-slate-500">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor-specific issues */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Ontario Investment Property Issues That Kill Cash Flow</h2>
          <p className="text-slate-500 mb-6">These are the findings that change the numbers on a deal. ASADS inspectors look specifically for each of these on every investment property inspection.</p>
          <div className="space-y-3">
            {[
              { issue: "Kitec plumbing (1995–2007 builds)", impact: "Insurance surcharge or refusal to insure without remediation. Replacement cost: $4,500–$9,000." },
              { issue: "Aluminum branch circuit wiring (1965–1978)", impact: "Insurance issue in Ontario. Pigtailing or rewire may be required. Affects refinancing too." },
              { issue: "Knob-and-tube wiring (pre-1950)", impact: "Most Ontario insurers won't cover homes with active K&T. Rewire cost: $10,000–$20,000+." },
              { issue: "Attic mould from improper ventilation", impact: "Remediation $2,000–$8,000. Becomes a disclosure issue on resale." },
              { issue: "Foundation cracks with active water infiltration", impact: "Waterproofing $10,000–$30,000. Affects mortgage qualification on refinance." },
              { issue: "Unpermitted basement apartment", impact: "Insurance void if occupancy isn't legal. May require expensive legalization or eviction." },
              { issue: "HVAC at end of service life", impact: "Furnace replacement $3,500–$6,000. Central AC $4,000–$7,000. Major CapEx within 2 years." },
              { issue: "Flat roof deterioration", impact: "Commercial-grade flat roof replacement $8,000–$20,000+ depending on size." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.issue}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume pricing */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Volume Pricing for Portfolio Investors</h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">Acquiring multiple properties? ASADS offers volume pricing for investors booking 3+ inspections. Call to discuss your portfolio and timeline.</p>
          <a href="tel:+16478019311" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            <Phone className="w-4 h-4" /> Call (647) 801-9311 to Discuss
          </a>
        </div>
      </section>

      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">Book an Investor Inspection in Ontario</h2>
          <p className="text-white/80 mb-6">Same-day and next-day availability. Thermal imaging included. Reports structured for investment decision-making.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">Book Online</Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> (647) 801-9311
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
