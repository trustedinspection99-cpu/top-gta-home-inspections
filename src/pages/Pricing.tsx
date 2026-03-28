import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InlineBookingForm } from "@/components/InlineBookingForm";

const mainInspections = [
  {
    title: "Pre-Purchase Inspection",
    description: "Complete home evaluation before buying — satisfaction guaranteed",
    prices: [
      { size: "Condo/Apartment", price: "$349" },
      { size: "Up to 1,500 sq ft", price: "$399" },
      { size: "1,500 - 2,500 sq ft", price: "$449" },
      { size: "2,500 - 3,500 sq ft", price: "$499" },
      { size: "3,500+ sq ft", price: "$549+" },
    ],
    features: [
      "Visual inspection of all accessible areas",
      "Roof, attic, and insulation assessment",
      "Foundation and structural evaluation",
      "Electrical and plumbing systems check",
      "HVAC system inspection",
      "Same-day digital report with photos",
      "Satisfaction guarantee — full refund if not happy",
    ],
    href: "/services/pre-purchase",
    popular: true,
  },
  {
    title: "Pre-Listing Inspection",
    description: "Sell your home with confidence",
    prices: [
      { size: "Condo/Apartment", price: "$299" },
      { size: "Up to 1,500 sq ft", price: "$349" },
      { size: "1,500 - 2,500 sq ft", price: "$399" },
      { size: "2,500 - 3,500 sq ft", price: "$449" },
      { size: "3,500+ sq ft", price: "$499+" },
    ],
    features: [
      "Identify issues before listing",
      "Avoid surprises during negotiations",
      "Comprehensive condition report",
      "Repair recommendations",
      "Increase buyer confidence",
      "Same-day report delivery",
    ],
    href: "/services/pre-listing",
  },
  {
    title: "New Construction Inspection",
    description: "Verify builder quality before closing",
    prices: [
      { size: "Single inspection", price: "$399" },
      { size: "Pre-drywall + Final", price: "$699" },
      { size: "3-phase package", price: "$999" },
    ],
    features: [
      "Foundation and framing check",
      "Pre-drywall inspection available",
      "Final walkthrough inspection",
      "Builder deficiency documentation",
      "Tarion warranty compliance",
      "Detailed photo documentation",
    ],
    href: "/services/new-construction",
  },
  {
    title: "Condo Inspection",
    description: "Specialized condo unit evaluations",
    prices: [
      { size: "Studio/1 Bedroom", price: "$299" },
      { size: "2 Bedroom", price: "$349" },
      { size: "3+ Bedroom", price: "$399" },
      { size: "Townhouse Condo", price: "$449" },
    ],
    features: [
      "Interior systems inspection",
      "Appliance functionality check",
      "Balcony/terrace assessment",
      "Common area observations",
      "Status certificate review tips",
      "Same-day report",
    ],
    href: "/services/condo",
  },
  {
    title: "Commercial Inspection",
    description: "Business property assessments",
    prices: [
      { size: "Up to 5,000 sq ft", price: "$599" },
      { size: "5,000 - 10,000 sq ft", price: "$899" },
      { size: "10,000+ sq ft", price: "Custom Quote" },
    ],
    features: [
      "Building envelope assessment",
      "Commercial HVAC evaluation",
      "Electrical systems review",
      "Life safety systems check",
      "ADA compliance observations",
      "Detailed commercial report",
    ],
    href: "/services/commercial",
  },
];

const specialtyServices = [
  {
    title: "Radon Testing",
    price: "$499+",
    duration: "2-visit · equipment left on-site",
    description: "Detect harmful radon gas in your home. Requires drop-off + retrieval visit.",
    href: "/services/radon-testing",
  },
  {
    title: "Mold Inspection",
    price: "$299+",
    duration: "Visual + air sampling",
    description: "Identify mold issues and moisture sources",
    href: "/services/mold-inspection",
  },
  {
    title: "Asbestos Testing",
    price: "$299",
    duration: "Lab results in 3-5 days",
    description: "Safe identification of asbestos materials",
    href: "/services/asbestos-testing",
  },
  {
    title: "WETT Inspection",
    price: "$249",
    duration: "Wood-burning appliances",
    description: "Fireplace and wood stove safety inspection",
    href: "/services/wett",
  },
  {
    title: "Thermal Imaging",
    price: "Included",
    duration: "Free in all inspections",
    description: "FLIR infrared included with every inspection. Standalone-only booking quoted separately.",
    href: "/services/thermal-imaging",
  },
  {
    title: "Lead Paint Testing",
    price: "$349",
    duration: "Lab results in 5-7 days",
    description: "Protect your family from lead hazards",
    href: "/services/lead-paint-testing",
  },
  {
    title: "Well Water Testing",
    price: "$199",
    duration: "Comprehensive panel",
    description: "Ensure safe drinking water quality",
    href: "/services/well-water-testing",
  },
  {
    title: "Air Quality Testing",
    price: "$249+",
    duration: "Indoor air analysis",
    description: "Test for VOCs, allergens, and pollutants",
    href: "/services/air-quality",
  },
];

export default function Pricing() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.asads.ca/pricing#service",
    "name": "Home Inspection Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection",
      "telephone": "+16478019311"
    },
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Inspection Pricing",
      "itemListElement": mainInspections.map((inspection) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": inspection.title,
          "description": inspection.description
        },
        "priceSpecification": inspection.prices.map(p => ({
          "@type": "UnitPriceSpecification",
          "name": p.size,
          "price": p.price.replace(/[^0-9]/g, ''),
          "priceCurrency": "CAD"
        }))
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.asads.ca" },
      { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://www.asads.ca/pricing" }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Cost Ontario | Prices From $299 | ASADS</title>
        <meta
          name="description"
          content="Compare home inspection prices in Ontario. Pre-purchase from $399, condos from $299. Infrared imaging + same-day report included. No hidden fees. Book online."
        />
        <link rel="canonical" href="https://www.asads.ca/pricing" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="How Much Does a Home Inspection Cost? Ontario | ASADS" />
        <meta property="og:description" content="How much does a home inspection cost in Ontario? Pre-purchase from $399, condos from $299. No hidden fees. View all packages." />
        <meta property="og:url" content="https://www.asads.ca/pricing" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How Much Does a Home Inspection Cost? Ontario | ASADS" />
        <meta name="twitter:description" content="How much does a home inspection cost in Ontario? Pre-purchase from $399, condos from $299. No hidden fees. View all packages." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(pricingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 py-14 md:py-20 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-700/40 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-blue-600/50 text-sm font-medium">
            Transparent Pricing · No Hidden Fees · OAHI &amp; InterNACHI Certified
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Home Inspection Cost in Ontario
          </h1>
          <p className="text-lg text-blue-100 mb-6 leading-relaxed">
            Pre-purchase from $399. Condos from $299. All inspections include same-day digital reports with photos, severity ratings, and repair guidance. Thermal imaging included at no extra charge.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { label: "Pre-Purchase", price: "From $399" },
              { label: "Condo", price: "From $299" },
              { label: "New Construction", price: "From $399" },
              { label: "Thermal Imaging", price: "Included Free" },
            ].map((c) => (
              <div key={c.label} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm">
                <span className="text-blue-200">{c.label} — </span>
                <span className="font-bold text-green-300">{c.price}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="bg-white text-blue-700 px-7 py-4 rounded-lg font-bold text-base hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
              Book Your Inspection
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="tel:6478019311" className="bg-transparent border-2 border-white px-7 py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              (647) 801-9311
            </a>
          </div>
        </div>
      </section>

      {/* Main Inspection Packages */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Inspection Packages & Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prices vary by property size and complexity. All packages include a same-day digital report.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainInspections.map((inspection) => (
              <Card
                key={inspection.title}
                className={`relative ${inspection.popular ? 'border-primary shadow-lg' : ''}`}
              >
                {inspection.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-heading">{inspection.title}</CardTitle>
                  <CardDescription>{inspection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {inspection.prices.map((price) => (
                      <div key={price.size} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{price.size}</span>
                        <span className="font-semibold">{price.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-6 space-y-3">
                    {inspection.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button asChild className="flex-1">
                      <Link to="/booking">Book Now</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link to={inspection.href}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Testing Services */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Specialty Testing & Add-Ons
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Standalone or bundled with any inspection. Protect your family's health and safety.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialtyServices.map((service) => (
              <Card key={service.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <span className="text-xl font-bold text-primary">{service.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to={service.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* City-by-City Cost Comparison */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-3">
              Home Inspection Cost by City — Ontario 2026
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Base pricing is consistent across Ontario — property size is the primary driver, not location.
              Travel surcharges apply only for properties more than 90 minutes from our Cambridge base.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left p-4 font-semibold">City</th>
                    <th className="text-left p-4 font-semibold">Condo</th>
                    <th className="text-left p-4 font-semibold">Townhouse</th>
                    <th className="text-left p-4 font-semibold">Detached (avg)</th>
                    <th className="text-left p-4 font-semibold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { city: "Toronto", condo: "$299", town: "$349", det: "$399–$549", note: "Pre-war homes common — allow extra time" },
                    { city: "Mississauga", condo: "$299", town: "$349", det: "$399–$499", note: "1970s–80s subdivision stock; crawl spaces common" },
                    { city: "Brampton", condo: "$299", town: "$349", det: "$399–$499", note: "Mix of new builds and 1990s subdivisions" },
                    { city: "Vaughan", condo: "$299", town: "$349", det: "$399–$549", note: "Newer builds + large executive homes" },
                    { city: "Markham", condo: "$299", town: "$349", det: "$399–$549", note: "Many 2000s–2010s townhouse communities" },
                    { city: "Richmond Hill", condo: "$299", town: "$349", det: "$399–$549", note: "Mix of older bungalows and newer builds" },
                    { city: "Oakville", condo: "$299", town: "$399", det: "$449–$599+", note: "Larger luxury homes; more systems to inspect" },
                    { city: "Burlington", condo: "$299", town: "$349", det: "$399–$549", note: "Older downtown core + newer north end builds" },
                    { city: "Hamilton", condo: "$299", town: "$349", det: "$399–$499", note: "Victorian-era homes in lower city — detailed electrical" },
                    { city: "Kitchener", condo: "$299", town: "$349", det: "$399–$499", note: "Suburban growth corridor; many new construction" },
                    { city: "Waterloo", condo: "$299", town: "$349", det: "$399–$499", note: "University proximity; many investor-owned properties" },
                    { city: "Cambridge", condo: "$299", town: "$349", det: "$399–$499", note: "Older industrial city; heritage homes require thorough review" },
                    { city: "Barrie", condo: "$299", town: "$349", det: "$399–$499", note: "Cottage-country proximity; some seasonal properties" },
                    { city: "Oshawa / Durham", condo: "$299", town: "$349", det: "$399–$499", note: "Post-war worker housing common in south Oshawa" },
                    { city: "Other Ontario", condo: "$299", town: "$349", det: "$399–$549", note: "Travel surcharge may apply beyond 90 min from Cambridge" },
                  ].map((row, i) => (
                    <tr key={row.city} className={i % 2 === 0 ? "bg-background" : "bg-muted/40"}>
                      <td className="p-4 font-semibold text-foreground">{row.city}</td>
                      <td className="p-4 text-primary font-bold">{row.condo}</td>
                      <td className="p-4 font-medium">{row.town}</td>
                      <td className="p-4 font-medium">{row.det}</td>
                      <td className="p-4 text-muted-foreground text-xs hidden md:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              * Thermal imaging included in all inspections. Prices shown are for standard residential properties. Commercial quotes are separate.
            </p>
          </div>
        </div>
      </section>

      {/* What Affects Home Inspection Cost */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-4">
              What Affects Home Inspection Cost in Ontario?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Home inspection prices in Ontario vary based on several factors. Understanding what drives cost helps you budget accurately and compare quotes.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { factor: "Property size", detail: "Square footage is the primary driver. A 500 sq ft condo costs less than a 4,000 sq ft detached home because the inspector covers more area, systems, and components." },
                { factor: "Age of the home", detail: "Older homes (pre-1980) take longer to inspect due to complex plumbing, knob-and-tube wiring, and aging systems that require more documentation." },
                { factor: "Property type", detail: "Condos, townhouses, semi-detached, and detached homes each have different scope. Commercial properties are priced separately based on size and system complexity." },
                { factor: "Add-on services", detail: "Radon testing ($499+ — 2 visits required), mold inspection ($299+), sewer scope ($299+), and asbestos testing ($299+) extend the inspection scope. Thermal imaging is included free in every inspection." },
                { factor: "Location", detail: "Travel time to rural properties in Ontario may add a small surcharge. Most GTA and Southern Ontario locations are covered at the base rate." },
                { factor: "Urgency", detail: "Same-day and rush inspections for tight closing deadlines are accommodated at no extra charge when availability allows." },
              ].map(({ factor, detail }) => (
                <div key={factor} className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">{factor}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-2xl font-bold mb-6">
              Home Inspection Cost Ontario — FAQs
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: "How much does a home inspection cost in Ontario in 2026?",
                  a: "In Ontario, a standard pre-purchase home inspection costs between $399 and $549 for most residential properties. Condos start from $299. Prices are based on size: condos and small homes (under 1,500 sq ft) start at $349–$399; larger detached homes (2,500–3,500 sq ft) run $499–$549. Commercial inspections are priced by quote."
                },
                {
                  q: "Is a home inspection worth the cost in Ontario?",
                  a: "Yes. A $399–$549 inspection routinely uncovers deficiencies that cost thousands to repair — aging electrical panels ($3,000–$8,000), roof replacement ($10,000–$25,000), or failing sewer laterals ($5,000–$20,000). Ontario buyers frequently negotiate credits 5–10x the inspection cost based on our findings."
                },
                {
                  q: "What is the cheapest home inspection in Ontario?",
                  a: "Condo inspections start at $299 for a studio or 1-bedroom unit. For detached homes, base pricing starts at $399 for properties under 1,500 sq ft. Be cautious of very low quotes — inspectors below $250 for houses typically use abbreviated checklists and offer minimal liability protection."
                },
                {
                  q: "Do home inspection prices include a written report?",
                  a: "Yes — all ASADS inspections include a same-day digital report with photographs, severity ratings (Safety/Monitor/Improvement), and repair recommendations. Reports are delivered by secure cloud link and are formatted for sharing directly with your realtor or lawyer."
                },
                {
                  q: "Can I get a same-day home inspection in Ontario?",
                  a: "Yes. ASADS offers same-day booking and same-day report delivery across the GTA and Southern Ontario. Call (647) 801-9311 or book online — we accommodate urgent inspection requests for tight closing deadlines 7 days a week."
                },
                {
                  q: "How much does a mold inspection cost in Ontario?",
                  a: "Mold inspection and testing in Ontario starts from $299 for a visual assessment with air sampling. Pricing depends on the number of samples required and the size of the affected area. Results from our AIHA-accredited lab are typically returned within 3–5 business days."
                },
              ].map(({ q, a }) => (
                <div key={q} className="border border-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-2">{q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">All Services</Link>
            <span className="text-border">•</span>
            <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">Service Areas</Link>
            <span className="text-border">•</span>
            <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
            <span className="text-border">•</span>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <span className="text-border">•</span>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      {/* Guarantee + CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Satisfaction Guarantee</h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                If you're not completely satisfied with the depth and detail of your report — we'll refund your inspection fee. No questions asked.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "400+ checkpoints documented with photos",
                  "Severity ratings on every finding",
                  "AI-assisted report narration for clarity",
                  "Same-day delivery — typically within 2 hours",
                  "OAHI & InterNACHI Standards of Practice",
                  "Fully insured — Intact · $2M liability",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="tel:6478019311" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Phone className="h-5 w-5" />
                (647) 801-9311
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Same-Day Availability</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">Book Your Inspection</h3>
              <InlineBookingForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
