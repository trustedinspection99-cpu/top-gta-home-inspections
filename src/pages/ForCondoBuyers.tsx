import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ChevronRight, Building2, Thermometer, FileText, AlertTriangle, Clock } from "lucide-react";

const metaTitle = "Condo Home Inspection Ontario | ASADS Condo Specialists";
const metaDescription = "Buying a condo in Ontario? ASADS condo inspections start at $299. Thermal imaging included, same-day report. We know what condo buyers need to check — and what most inspectors miss.";

const condoFindings = [
  { finding: "Balcony door seal failure", detail: "Failed seals allow water infiltration and heat loss — common in high-rise condos 10+ years old." },
  { finding: "In-suite laundry drain connection", detail: "Improperly connected drain lines cause slow leaks that damage ceilings in units below." },
  { finding: "HVAC fan coil unit condition", detail: "Most condos use fan coil units rather than central furnaces — requires specific inspection knowledge." },
  { finding: "Electrical panel assessment", detail: "Some older Ontario condos have sub-panels with aluminum branch circuit wiring — an insurance concern." },
  { finding: "Water damage from units above", detail: "Thermal imaging reveals ceiling moisture from previous leaks that may not be visible on surfaces." },
  { finding: "Ventilation — suite vs building system", detail: "Proper ventilation varies by building; inadequate HRV or ERV leads to moisture, condensation, and air quality issues." },
];

const pricing = [
  { type: "Studio or 1-Bed Condo", size: "Up to 700 sq ft", price: "$299" },
  { type: "1-Bed + Den or 2-Bed Condo", size: "700–1,000 sq ft", price: "$329" },
  { type: "2-Bed+ or Penthouse", size: "1,000–1,400 sq ft", price: "$359" },
  { type: "Condo Townhouse", size: "1,400–2,000 sq ft", price: "$399" },
];

export default function ForCondoBuyers() {
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
          "name": "Condo Home Inspection Ontario",
          "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" },
          "description": metaDescription,
          "areaServed": "Ontario, Canada",
          "offers": { "@type": "Offer", "priceRange": "$299–$399" }
        })}</script>
      </Helmet>

      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>For Condo Buyers</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Building2 className="w-10 h-10 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Condo Inspections in Ontario — Starting at $299</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Condos aren't just cheaper to inspect — they require <em>different</em> expertise. ASADS inspectors know what condo buyers actually need to know: fan coil units, shared building systems, balcony envelope, and moisture from units above. Thermal imaging included.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-6">
            <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-2">
              <Clock className="w-4 h-4 text-blue-300" />
              <span>1.5–2 hours on-site</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-2">
              <Thermometer className="w-4 h-4 text-orange-300" />
              <span>Thermal imaging included</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded px-3 py-2">
              <FileText className="w-4 h-4 text-green-300" />
              <span>Same-day report</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Condo Inspection Pricing — Ontario</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {pricing.map((p, i) => (
              <div key={i} className="border rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.type}</p>
                  <p className="text-sm text-slate-500">{p.size}</p>
                </div>
                <div className="text-2xl font-bold text-primary">{p.price}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-4">Thermal imaging, full narrative report, same-day delivery — all included. No add-ons.</p>
        </div>
      </section>

      {/* What Condo Inspectors Check */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">What ASADS Checks in a Condo Inspection</h2>
          <p className="text-slate-500 mb-8">Condo inspections aren't shorter because there's less to check — they focus on different systems than detached home inspections.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {condoFindings.map((f, i) => (
              <div key={i} className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{f.finding}</p>
                    <p className="text-xs text-slate-500 mt-1">{f.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="font-semibold text-blue-900 mb-2">What a condo inspection does NOT cover</p>
            <p className="text-sm text-slate-600">Common areas (lobby, garage, gym, rooftop) are the building's responsibility and are not part of the suite inspection. We inspect the unit you're buying. For building-level issues, request the Status Certificate and reserve fund study from the seller — those reveal building financial health and deferred maintenance.</p>
          </div>
        </div>
      </section>

      {/* Why thermal matters for condos */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Thermometer className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-bold">Why Thermal Imaging Matters More in Condos</h2>
          </div>
          <p className="text-slate-300 mb-6">In a condo, you share walls, ceilings, and floors with neighbours. Leaks from units above — sometimes slow drips from plumbing or HVAC condensate — can cause hidden moisture damage inside your unit's ceiling and walls before any surface staining appears.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Ceiling moisture from above unit", desc: "Infrared shows temperature differentials in ceilings that indicate active or previous water infiltration from the suite above." },
              { title: "Exterior wall envelope", desc: "Balcony door and window frame cold zones reveal seal failures that cause heat loss and condensation risk in winter." },
              { title: "In-suite bathroom fans", desc: "Thermal shows whether bathroom exhaust is drawing properly or creating a cold/warm zone suggesting blocked or improperly terminated ductwork." },
            ].map((t, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-4">
                <p className="font-medium mb-2">{t.title}</p>
                <p className="text-sm text-slate-300">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Ontario Cities We Serve for Condo Inspections</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Richmond Hill", "North York", "Scarborough", "Etobicoke", "Oakville", "Burlington", "Hamilton", "Kitchener", "Waterloo", "Cambridge", "Guelph", "Barrie", "Oshawa", "Ajax", "Whitby", "Pickering", "Newmarket"].map(city => (
              <Link key={city} to={`/services/condo/home-inspection-${city.toLowerCase().replace(/ /g, '-')}`} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors">
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">Book Your Condo Inspection</h2>
          <p className="text-white/80 mb-6">Same-day and next-day appointments available across Ontario. Thermal imaging included.</p>
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
