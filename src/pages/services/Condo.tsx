import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/seo";
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
  Shield
} from "lucide-react";

const metaTitle =
  "Condo Inspection & Townhome Inspection Toronto | Kitec Plumbing | ASADS";

const metaDescription =
  "Certified condo inspection and townhouse inspection in Toronto & GTA. We identify Kitec plumbing, fan coil failures, moisture intrusion, and in-suite liabilities before you buy. From $350.";

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
  "Toronto condo specialist experience",
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
      "@type": "Organization",
      "name": "ASADS Home Inspection",
      "url": canonical,
      "telephone": "+1-647-801-9311",
      "areaServed": "Ontario, Canada"
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection",
      "url": canonical,
      "telephone": "+1-647-801-9311",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Condo & Townhome Inspection",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ASADS Home Inspection"
      },
      "areaServed": "Toronto & Greater Toronto Area",
      "description": metaDescription,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "CAD",
        "price": "350",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://asads.ca/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://asads.ca/services"
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
        <script type="application/ld+json">
          {JSON.stringify(schemas)}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Building />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Condo Inspection & Townhouse Inspection Toronto
            </h1>
          </div>

          <p className="text-xl opacity-90 mb-8">
            Condo and townhome ownership comes with hidden in-suite liabilities. Our certified condo inspection identifies Kitec plumbing, fan coil failures, moisture intrusion, and safety issues before they become expensive surprises.
          </p>

          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-2">
              <Clock /> {duration}
            </div>
            <div className="flex items-center gap-2">
              <Droplets /> Kitec Plumbing Audit
            </div>
            <div className="flex items-center gap-2">
              <Thermometer /> HVAC & Fan Coil Inspection
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Button asChild size="lg" variant="secondary">
              <Link to="/booking">Book Condo Inspection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+16478019311">
                <Phone className="mr-2 h-5 w-5" />
                (647) 801-9311
              </a>
            </Button>
          </div>
        </div>
      </section>

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
                </Link>, and{" "}
                <Link to="/services/pre-purchase" className="text-primary underline">
                  HVAC system inspections
                </Link>.
              </p>

              {/* PATCH 3: Service Areas */}
              <div>
                <h2 className="font-heading text-3xl mb-6">
                  Condo & Townhome Inspections Across Toronto & the GTA
                </h2>

                <p className="text-muted-foreground mb-4">
                  ASADS provides condo and townhome inspections throughout Toronto and the
                  Greater Toronto Area, including:
                </p>

                <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                  <li>Toronto (Downtown, North York, Etobicoke, Scarborough)</li>
                  <li>Mississauga</li>
                  <li>Vaughan</li>
                  <li>Markham</li>
                  <li>Richmond Hill</li>
                  <li>Oakville & Burlington</li>
                </ul>
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
