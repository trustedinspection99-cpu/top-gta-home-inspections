import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCanonicalUrl, SITE_URL } from "@/lib/seo";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import {
  Building,
  Thermometer,
  Droplets,
  ShieldCheck,
  CheckCircle,
  Phone,
  Clock,
  AlertTriangle,
  FileText,
  Shield,
  MapPin
} from "lucide-react";
import { locationData } from "@/data/locationData";

const featuredLocations = locationData.map(loc => ({ name: loc.city, slug: loc.slug }));

const metaTitle =
  "Condo Inspection Ontario | From $299 | Certified | ASADS";

const metaDescription =
  "Certified condo inspection across Ontario from $299. Kitec plumbing, fan coil, moisture & electrical — full in-suite assessment. Same-day report. (647) 801-9311.";

const duration = "1.5 – 2.5 Hours";

const whatWeInspect = [
  "In-suite plumbing supply and drain systems",
  "Kitec & Poly-B plumbing identification",
  "Fan coil / heat pump operation and drainage",
  "Electrical panel, breakers & load issues",
  "Appliance safety and functional lifespan",
  "Bathroom and laundry moisture intrusion",
  "Ceiling moisture from unit-above leaks",
  "Window wall seals & thermal performance",
  "Balcony floor, guardrail & door thresholds",
  "Dryer vents and exhaust ducting",
  "Smoke, CO detectors & life-safety items",
  "Owner-responsibility vs HOA responsibility mapping"
];

const benefits = [
  "Avoid hidden in-suite repair costs",
  "Identify recalled Kitec plumbing early",
  "Reduce insurance and financing risk",
  "Protect against unit-to-unit liability",
  "Same-day digital inspection reports",
  "Licensed & Certified Master Inspector",
  "Ontario-wide condo inspection coverage",
  "Evening & weekend availability"
];

const faqs = [
  {
    q: "How is a condo inspection different from a house inspection?",
    a: "A condo inspection focuses entirely on in-suite systems you are legally responsible for. Unlike a house, the roof, foundation, and main structure are excluded — but plumbing, electrical, HVAC, moisture, and balconies can still cost tens of thousands if they fail."
  },
  {
    q: "Do you check for Kitec plumbing in condos?",
    a: "Yes. Kitec plumbing is one of the biggest insurance red flags in Toronto condos built between 1995–2007. We visually identify it and document its presence so buyers can negotiate or plan replacement."
  },
  {
    q: "Is thermal imaging included?",
    a: "Yes. Thermal imaging is essential for condos. It allows us to detect moisture from leaking units above, failing window seals, and hidden condensation inside walls and ceilings."
  },
  {
    q: "Does the condo corporation inspection replace this?",
    a: "No. A Status Certificate and building inspection do not evaluate your unit’s plumbing joints, fan coil condition, electrical panel, or moisture damage. Those liabilities belong to the owner."
  },
  {
    q: "How much does a condo inspection cost?",
    a: "Pricing depends on unit size, HVAC type, and inspection complexity. Contact ASADS at (647) 801-9311 for an exact quote."
  }
];

export default function CondoInspection() {
  const location = useLocation();
  const canonical = getCanonicalUrl(location.pathname);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.asads.ca/#localbusiness",
      "name": "ASADS Home Inspection",
      "url": "https://www.asads.ca",
      "telephone": "+16478019311",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "45 Duckworth Rd",
        "addressLocality": "Cambridge",
        "addressRegion": "ON",
        "postalCode": "N3H 0C1",
        "addressCountry": "CA"
      },
      "areaServed": "Ontario, Canada"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Condo & Townhome Inspection",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ASADS Home Inspection"
      },
      "areaServed": "Ontario, Canada",
      "description": metaDescription,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "CAD",
        "price": "299",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.asads.ca/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.asads.ca/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Condo & Townhome Inspection",
          "item": canonical
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": metaTitle,
      "description": metaDescription,
      "url": canonical
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ASADS Home Inspection - Professional Home Inspectors in Toronto & GTA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
        {schemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

            <HeroBookingSection
        badge="ASADS Condo Inspection · Ontario Specialists"
        title="Condo Inspection & Townhouse Inspection Ontario"
        subtitle="Condo ownership comes with hidden in-suite liabilities. Our certified condo inspection identifies Kitec plumbing, fan coil failures, moisture intrusion, and safety issues before they become expensive surprises."
        priceCards={[
          { label: "Condo Inspection", price: "From $299" },
          { label: "Kitec Plumbing", price: "Audit Included" },
          { label: "Duration", price: duration },
        ]}
        defaultService="Condo Inspection"
        formTitle="Book Condo Inspection"
        ctaPrimary={{ text: "Book Condo Inspection", href: "/booking" }}
      />

      {/* CONTENT */}
      <section className="py-20 bg-background">
        <div className="container grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">
            <div className="prose prose-lg max-w-none">
              <h2>Understanding Condo & Townhome Liability in Ontario</h2>
              <p>
                In Ontario, condo ownership typically ends at the drywall. While
                the condominium corporation maintains common elements, the
                systems hidden behind your walls — plumbing joints, electrical
                panels, fan coils, and moisture damage — are the unit owner’s
                responsibility.
              </p>

              <p>
                Buyers often assume the Status Certificate protects them from
                defects. In reality, it does not evaluate in-suite conditions.
                Our condo inspection focuses exclusively on the systems that can
                trigger insurance claims, special assessments, or personal
                liability.
              </p>

              <h3>Kitec Plumbing & Insurance Risk</h3>
              <p>
                Kitec plumbing is a recalled aluminum-PEX system widely installed
                in Toronto condos between the late 1990s and mid-2000s. It is
                prone to sudden failure and is frequently excluded by insurers.
                We identify Kitec visually and document it clearly in your
                inspection report.
              </p>

              <h3>Fan Coil & HVAC Failures</h3>
              <p>
                Condo HVAC systems are commonly neglected. Blocked condensate
                drains, mold growth, and failing actuators can cause leaks into
                neighbouring units — creating liability far beyond your own
                repair costs.
              </p>

              <h3>Moisture & Unit-to-Unit Leaks</h3>
              <p>
                Thermal imaging allows us to detect moisture intrusion from
                plumbing failures above or beside your unit. These issues are
                often invisible but can result in drywall damage, mold growth,
                and disputes with neighbours or the condo corporation.
              </p>

              {/* PATCH 1: Inspection Process */}
              <h2>Our Condo & Townhome Inspection Process</h2>

              <h3>Before the Inspection</h3>
              <p>
                Once booked, we review the property type, age, and known building systems
                (fan coil vs heat pump, window wall construction, plumbing era). This allows
                us to anticipate common failure points specific to Toronto condos and
                townhomes before arriving on site.
              </p>

              <h3>During the Inspection</h3>
              <p>
                The inspection focuses exclusively on <strong>in-suite systems</strong>.
                We test plumbing supply and drains, evaluate the electrical panel and breakers,
                inspect HVAC fan coils or heat pumps, and perform thermal imaging to identify
                hidden moisture from neighbouring units or failed window seals.
              </p>

              <h3>After the Inspection</h3>
              <p>
                You receive a <strong>same-day digital report</strong> outlining defects,
                risk levels, and recommended actions. Findings are clearly categorized so
                buyers can prioritize negotiations, future repairs, or insurance concerns
                before closing.
              </p>

              {/* PATCH 4: Internal Pillar Links */}
              <p>
                For buyers concerned about specific risks, you may also want to review our
                related inspection services, including{" "}
                <Link to="/blog/kitec-plumbing-toronto-guide" className="text-primary underline">
                  Kitec plumbing guide
                </Link>,{" "}
                <Link to="/services/thermal-imaging" className="text-primary underline">
                  thermal imaging inspections
                </Link>,{" "}
                <Link to="/services/pdi-inspection" className="text-primary underline">
                  PDI inspection for new condos
                </Link>, and{" "}
                <Link to="/services/pre-purchase" className="text-primary underline">
                  pre-purchase inspections
                </Link>.
              </p>

              {/* Service Areas */}
              <div>
                <h2 className="font-heading text-3xl mb-6">
                  Condo & Townhome Inspections Across Ontario
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: "Toronto Condo Inspection — Downtown, North York & Etobicoke",
                      body: "Toronto's condo market spans 1980s co-ops in Etobicoke to post-2010 glass towers in King West, the Distillery District, and Yonge-Sheppard. Units in buildings from the late 1990s to mid-2000s carry significant Kitec plumbing exposure. Fan coil units in high-rise buildings are frequently at or beyond their 20-year service life — blocked condensate drains and mold growth inside coils are among the most common findings in Toronto condo inspections. Ground-level and podium units face higher moisture intrusion risk from below-grade parking garage waterproofing. ASADS provides condo inspections throughout Toronto — downtown core, midtown, North York, Etobicoke, Scarborough, and all waterfront neighbourhoods.",
                    },
                    {
                      title: "Mississauga Condo Inspection — Square One & Hurontario Corridor",
                      body: "Mississauga's Square One district — the Hurontario corridor between Burnhamthorpe and Eglinton — contains towers spanning several decades of construction. Fan coil condition varies dramatically by building management quality — poorly maintained fan coils are among the highest-cost in-suite deficiencies in Square One buildings. Kitec plumbing is present in Mississauga condo buildings from the 1997–2007 construction window. Port Credit's waterfront mid-rise developments carry balcony waterproofing concerns that thermal imaging can identify. ASADS provides same-day condo inspection services across all Mississauga communities.",
                    },
                    {
                      title: "Vaughan & Markham Townhome Inspection — York Region New Construction",
                      body: "York Region's new townhome market — Cornell and Wismer in Markham, Kleinburg and Woodbridge in Vaughan — produces consistent Tarion warranty inspection demand. Townhomes under 7 years old benefit from milestone inspections at 30 days, 1 year, and 2 years after possession to document builder deficiencies while warranty coverage remains active. Common findings include improper HRV commissioning, spray foam insulation gaps at rim joists, and exterior grading that hasn't settled to proper drainage slopes. ASADS provides condo and townhome inspections across all York Region communities.",
                    },
                    {
                      title: "Hamilton & Burlington Condo Inspection — Heritage to New Builds",
                      body: "Hamilton's condo market ranges from heritage loft conversions in the James Street North arts district to new suburban townhomes on the Mountain and in Stoney Creek. Heritage building conversions present structural masonry, fire separation between units, and original cast iron plumbing concerns not found in modern construction. Burlington's newer condominium towers along Brant Street carry Kitec plumbing exposure in mid-2000s construction. Waterdown and Ancaster townhomes face soil settlement concerns — drywall cracking at ceiling-wall junctions is a common finding in Mountain-area new builds. ASADS provides condo and townhome inspections across Hamilton, Burlington, and all of Hamilton-Niagara Region.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-700">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {featuredLocations.map((loc) => (
                    <Link key={loc.slug} to={`/services/condo/${loc.slug.replace('home-inspection-', '')}`} className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors text-sm text-foreground">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />{loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* PATCH 2: Pricing Section */}
            <div>
              <h2 className="font-heading text-3xl mb-6">
                Condo Inspection Pricing & What Affects Cost
              </h2>

              <p className="text-muted-foreground mb-4">
                Condo and townhome inspection pricing varies based on unit size, building
                systems, and inspection complexity. Unlike houses, condos often require
                specialized HVAC, plumbing, and moisture analysis.
              </p>

              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Square footage and number of bathrooms</li>
                <li>Fan coil vs heat pump HVAC systems</li>
                <li>Presence of Kitec or Poly-B plumbing</li>
                <li>Balconies, terraces, or stacked townhome layouts</li>
                <li>Thermal imaging and moisture investigation time</li>
              </ul>

              <p className="text-muted-foreground mt-4">
                For an exact quote, contact ASADS at <strong>(647) 801-9311</strong>.
                Transparent pricing with no hidden add-ons.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-3xl mb-6">
                Condo Inspection Cost Ontario
              </h2>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Unit Size</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: "Studio / 1 Bedroom", price: "$299" },
                      { size: "2 Bedroom", price: "$349" },
                      { size: "3+ Bedroom", price: "$399" },
                      { size: "Townhouse Condo", price: "$449" },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                        <td className="px-4 py-3 text-foreground">{row.size}</td>
                        <td className="px-4 py-3 text-right font-semibold text-foreground">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-3">Thermal imaging & Kitec plumbing audit included. Same-day digital report. Call <a href="tel:+16478019311" className="text-primary">(647) 801-9311</a> for a quote.</p>
            </div>

            <div>
              <h2 className="font-heading text-3xl mb-6">
                Condo Inspection Checklist
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {whatWeInspect.map(i => (
                  <div key={i} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="text-accent" />
                    <span>{i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-3xl mb-6">
                Frequently Asked Questions
              </h2>
              {faqs.map((f, i) => (
                <div key={i} className="border rounded-lg p-6 mb-4">
                  <h3 className="font-semibold mb-2">{f.q}</h3>
                  <p className="text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Why Choose ASADS
                </h3>
                <ul className="space-y-3">
                  {benefits.map(b => (
                    <li key={b} className="flex gap-3">
                      <Shield className="text-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full mt-6" size="lg">
                  <Link to="/booking">Book Inspection</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Protect Your Condo Investment
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Identify in-suite risks before closing day. Same-day digital reports
            with clear repair guidance.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/booking">Schedule Your Inspection</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
