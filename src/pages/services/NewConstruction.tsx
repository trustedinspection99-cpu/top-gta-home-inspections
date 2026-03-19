import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import {
  Hammer,
  ShieldAlert,
  FileCheck,
  HardHat,
  Ruler,
  Search,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  Thermometer,
  Zap,
  Droplets,
  AlertTriangle
} from "lucide-react";
import { locationData } from "@/data/locationData";

const featuredLocations = locationData.map(loc => ({ name: loc.city, slug: loc.slug }));

const title = "New Construction & Tarion Warranty Inspection";
const metaTitle = "PDI Inspection Ontario | New Construction & Tarion | ASADS";
const metaDescription = "Certified PDI & new construction inspection across Ontario. Pre-Delivery, 30-Day & 1-Year Tarion deadlines. Same-day report. From $449. (647) 801-9311.";
const price = "Contact for Quote";
const duration = "3-5 Hours";

const whatWeInspect = [
  "Truss & Framing Integrity (Structural Audit)",
  "Attic Insulation Depth & Vapour Barrier Continuity",
  "Proper HRV/ERV Installation & Air Exchange Balance",
  "Exterior Grading & Sump Pump Discharge Performance",
  "Electrical Panel Labelling & GFCI/AFCI Safety",
  "Roofing Flashing & Ice/Water Shield Verification",
  "Windows, Doors & Weather-Stripping Seals",
  "Basement Foundation Walls (Thermal Moisture Scan)",
];

const features = [
  {
    title: "Thermal Bypass Imaging",
    description: "We use infrared cameras to detect cold spots and missing insulation—the #1 cause of high energy bills and mold in new Ontario homes."
  },
  {
    title: "Tarion Form Preparation",
    description: "Our reports use the specific terminology required by Tarion, making it much harder for builders to deny your warranty claims."
  },
  {
    title: "HVAC & Ductwork Audit",
    description: "We check for unsealed ducts, restricted airflows, and improper furnace venting that can lead to premature system failure."
  },
  {
    title: "Grading & Drainage Analysis",
    description: "Builder grading often settles after the first year. We identify negative slopes early to prevent basement flooding."
  },
];

const benefits = [
  "Independent Quality Control",
  "Tarion-Compliant Technical Reports",
  "Infrared Thermal Scanning Included",
  "Structural 7-Year Warranty Protection",
  "HVAC & HRV Balancing Verification",
  "Licensed & Insured Inspectors",
  "Detailed Photo Evidence",
  "Builder Accountability Audit",
];

const faqs = [
  {
    question: "Why do I need an inspection if the City already inspected it?",
    answer: "Municipal inspectors only check for minimum Ontario Building Code (OBC) life-safety compliance. They do not check for quality of workmanship, attic insulation levels, thermal bypasses, or mechanical performance. We identify 'builder shortcuts' that fall through the cracks of city inspections."
  },
  {
    question: "When is the best time for a Tarion inspection?",
    answer: "There are three critical windows: 1. The Pre-Delivery Inspection (PDI) before you move in. 2. The 30-Day Form deadline. 3. The 1-Year Year-End Form. Missing these deadlines can cost you thousands in uncovered repairs."
  },
  {
    question: "What issues do you commonly find in new construction homes?",
    answer: "Common issues include missing attic insulation, unsealed HVAC ducts, improper grading causing water pooling, missing caulking around windows, and incomplete electrical labeling. These are often missed by municipal inspectors during the rush to close."
  },
  {
    question: "Can you help with my Tarion warranty claim?",
    answer: "Yes. Our reports are specifically formatted to meet Tarion's documentation requirements, making it easier to file successful warranty claims and harder for builders to deny responsibility."
  },
  {
    question: "What is included in a PDI inspection with ASADS?",
    answer: "We attend your PDI as your independent inspector. We systematically check all finishes, appliances, mechanical systems, windows, doors, and exterior. We help you document deficiencies on your Tarion PDI form, take timestamped photos as evidence, and provide a written report you can reference throughout the warranty period."
  },
  {
    question: "When should I schedule my 1-Year Tarion inspection?",
    answer: "Book your inspection 45–60 days before your 1-year possession anniversary. This gives you time to receive the report, review all deficiencies, and submit the Tarion 1-Year Form before the deadline. Missing the Tarion deadline means losing your warranty coverage for those items permanently."
  },
  {
    question: "Do you find issues that the builder's own trades missed?",
    answer: "Yes — consistently. New construction inspections typically identify 15–40 deficiencies beyond what was noted at PDI. Common findings include missing attic insulation, improperly vented bath fans, incomplete caulking at penetrations, and grading issues. Builders correct these at no cost when submitted through proper Tarion channels."
  },
  {
    question: "Can ASADS help me if Tarion denies my claim?",
    answer: "While we can't provide legal advice, our detailed inspection reports — with timestamped photos and technical descriptions — serve as independent evidence if you need to escalate a Tarion denial to the Licence Appeal Tribunal (LAT). Many clients find that presenting a professional third-party inspection report is enough to get the builder to address the issue without formal dispute."
  }
];

export default function NewConstruction() {
  const location = useLocation();
  const serviceUrl = getCanonicalUrl(location.pathname);

  // --- FULL 7-SCHEMA SUITE ---
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "PDI Inspection & New Construction Inspection",
      "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection" },
      "description": metaDescription,
      "areaServed": "Ontario"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={serviceUrl} />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={serviceUrl} />
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
        badge="ASADS New Construction · PDI & Tarion Specialists"
        title="PDI Inspection & New Construction Home Inspection"
        subtitle="New doesn't mean perfect. Our new build inspection covers PDI walkthroughs through to 1-Year Tarion deadlines — identifying builder shortcuts before they become your financial burden."
        priceCards={[
          { label: "New Construction / PDI", price: "From $449" },
          { label: "Tarion Experts", price: "All 3 Stages" },
          { label: "Duration", price: duration },
        ]}
        defaultService="New Construction / PDI"
        formTitle="Book New Build Audit"
        ctaPrimary={{ text: "Book New Build Audit", href: "/booking" }}
      />

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Independent Audit for New Ontario Homes</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>In the rush to meet closing deadlines, builders often overlook critical details. Our **New Construction Audit** acts as your independent quality control, ensuring your new Ontario home meets professional standards—not just the bare minimum code.</p>
                  
                  

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">PDI, 30-Day, and 1-Year Inspection Milestones</h3>
                  <p>In Ontario, your warranty protection is tied to strict deadlines. Our inspectors are specialists in navigating the Tarion Warranty process:</p>
                  
                  <ul className="space-y-4">
                    <li><strong>PDI (Pre-Delivery Inspection):</strong> The first official walkthrough. We find surface defects, missing components, and installation errors before you take possession.</li>
                    <li><strong>30-Day Audit:</strong> After living in the home, mechanical and plumbing issues start to surface. We document these for your first warranty submission.</li>
                    <li><strong>1-Year Year-End:</strong> The most critical deadline. We perform a deep-dive audit of the building envelope, attic, and foundation to catch defects before your comprehensive coverage expires.</li>
                  </ul>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Structural & Mechanical Deep-Dive</h3>
                  <p>We don't just look for paint chips. We climb into the attic to verify <strong>insulation R-values</strong> and check the mechanical room for proper <strong>HRV (Heat Recovery Ventilator)</strong> balancing—two items builders frequently get wrong, leading to mold and high energy costs.</p>
                </div>
              </div>

              {/* Tarion Warranty Timeline */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-bold text-foreground">Understanding the Tarion Warranty Timeline</h3>
                <ol className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "PDI (Pre-Delivery Inspection)",
                      body: "Done before you take possession. The builder walks you through the home and you note deficiencies on the PDI form. Tip: having an independent inspector present gives you a second set of trained eyes before you sign.",
                    },
                    {
                      step: "2",
                      title: "30-Day Form",
                      body: "Submitted within 30 days of possession. Covers items missed at PDI plus new issues that appeared. This is your final chance to address cosmetic defects under Tarion.",
                    },
                    {
                      step: "3",
                      title: "1-Year Form",
                      body: "Covers workmanship, material, and Ontario Building Code violations that appear within the first year. Deadline is 30 days before the 1-year anniversary of possession. This is the most important deadline for structural and system deficiencies.",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-bold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Common Defects Grid */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-bold text-foreground">Common Defects Found in Ontario New Construction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Improper Attic Insulation & Air Sealing",
                      body: "Missing insulation, bypasses around pot lights, and incomplete air barrier cause energy loss and ice dams in Ontario winters.",
                    },
                    {
                      title: "Grading & Drainage Issues",
                      body: "Improper lot grading directs water toward the foundation. Extremely common in new subdivisions where grading settles post-construction.",
                    },
                    {
                      title: "HVAC Sizing & Commissioning",
                      body: "Undersized or oversized furnaces and A/C units. Ducts not balanced for room-by-room airflow.",
                    },
                    {
                      title: "Window & Door Flashing Defects",
                      body: "Improper flashing installation leads to water infiltration behind brick veneer. May not be visible for 1–2 years.",
                    },
                    {
                      title: "Concrete Slab Cracks",
                      body: "Shrinkage cracks in garage and basement slabs. Structural vs non-structural determination requires inspection.",
                    },
                    {
                      title: "Electrical & Plumbing Rough-In Errors",
                      body: "Wrong wire gauge, missing bonding, incorrect trap configurations that pass the city inspection but violate code.",
                    },
                  ].map((card) => (
                    <div key={card.title} className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                      <h4 className="font-bold text-foreground mb-1">{card.title}</h4>
                      <p className="text-sm text-muted-foreground">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why City Inspection Isn't Enough */}
              <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Why a City Inspection Isn't Enough</h3>
                <p className="text-sm text-muted-foreground">
                  Municipal building inspectors check for code compliance at rough-in stages only — they are not there to catch workmanship quality, specification compliance, or builder shortcuts. Tarion's mandate is dispute resolution, not pre-emptive inspection. An independent inspector catches what falls between the cracks.
                </p>
              </div>

              {/* Icon Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100">
                  <ShieldAlert className="text-blue-600 mb-2" size={32} />
                  <h4 className="font-bold text-blue-900">Tarion Experts</h4>
                  <p className="text-xs text-blue-800">Technical documentation matched to Tarion claim standards.</p>
                </div>
                <div className="flex flex-col items-center text-center p-5 bg-amber-50 rounded-xl border border-amber-100">
                  <Search className="text-amber-600 mb-2" size={32} />
                  <h4 className="font-bold text-amber-900">Thermal Scans</h4>
                  <p className="text-xs text-amber-800">Finding missing insulation behind new drywall.</p>
                </div>
                <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <FileCheck className="text-slate-600 mb-2" size={32} />
                  <h4 className="font-bold text-slate-900">Ready-To-File</h4>
                  <p className="text-xs text-slate-800">Reports ready to attach directly to your warranty forms.</p>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">What We Inspect</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatWeInspect.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Warranty FAQ</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-6">
                      <h3 className="font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Why ASADS?</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button asChild className="w-full" size="lg"><Link to="/booking">Book Audit</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">New Construction Inspections Across Ontario</h2>
            <p className="text-muted-foreground">Serving new subdivisions and condos across Ontario and the GTA.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featuredLocations.map((loc) => (
              <Link key={loc.slug} to={`/locations/${loc.slug}`} className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors text-sm text-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />{loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Protect Your 7-Year Warranty</h2>
          <p className="text-xl opacity-90 mb-8">Ensure your builder meets Ontario standards. Book your PDI or 1-Year inspection today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/booking">Book Online</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><a href="tel:+16478019311">(647) 801-9311</a></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
