import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import {
  Factory,
  ShieldCheck,
  BarChart3,
  HardHat,
  Zap,
  Droplets,
  Building2,
  SearchCheck,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  Thermometer,
  ClipboardList,
  AlertTriangle
} from "lucide-react";

const featuredLocations = [
  { name: "Toronto", slug: "toronto" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Brampton", slug: "brampton" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Markham", slug: "markham" },
  { name: "Oakville", slug: "oakville" },
  { name: "Hamilton", slug: "hamilton" },
  { name: "Burlington", slug: "burlington" },
  { name: "Richmond Hill", slug: "richmond-hill" },
  { name: "Kitchener", slug: "kitchener" },
];

const title = "Commercial Property Inspection & PCA";
const metaTitle = "Commercial Building Inspection Toronto | PCA & Phase 1 ESA | ASADS";
const metaDescription = "Expert ASTM E2018-15 compliant Property Condition Assessments (PCA) and Phase 1 ESA in Toronto & GTA. Detailed CapEx forecasting and MEP audits for investors.";
const price = "Quote Based";
const duration = "Expedited Reporting";

const whatWeInspect = [
  "Structural Framing, Foundations & Slab Integrity",
  "Building Envelope, Curtain Walls & Glazing",
  "Flat & Low-Slope Roofing Systems",
  "Central HVAC Plants (Chillers & Boilers)",
  "Electrical Switchgear & Distribution Panels",
  "Life Safety Systems (Fire Alarms & Sprinklers)",
  "AODA / ADA Accessibility Compliance",
  "Parking Structures & Stormwater Management",
  "Industrial Loading Docks & Levelers",
  "Commercial Plumbing & Backflow Systems",
  "Vertical Transportation (Elevator Log Review)",
  "Phase 1 Environmental Site Assessment (ESA)",
];

const features = [
  {
    title: "ASTM E2018-15 Compliance",
    description: "Institutional-standard PCA methodology ensuring audits are defensible, comprehensive, and recognized by lenders and REITs."
  },
  {
    title: "Asset Life Cycle Analysis",
    description: "We calculate Remaining Useful Life (RUL) for major systems to enable accurate 20-year CapEx financial planning."
  },
  {
    title: "Infrared Thermography",
    description: "Advanced thermal imaging of flat roofs and electrical switchgear to find hidden moisture and thermal anomalies."
  },
  {
    title: "Integrated ESA Phase 1",
    description: "Seamlessly combine your physical building audit with environmental risk assessments per MECP standards."
  },
];

const benefits = [
  "ASTM E2018-15 Institutional Standards",
  "20-Year Capital Reserve Forecasting",
  "MEP & Structural Forensic Audits",
  "AODA Accessibility Verification",
  "Expedited Executive Summaries",
  "Certified Master Inspector (CMI®) Lead",
  "Errors & Omissions Insurance Cover",
  "Multi-Family & Industrial Specialists",
];

const faqs = [
  {
    question: "What is the difference between a PCA and a standard home inspection?",
    answer: "A PCA is an institutional-grade audit following ASTM E2018-15 standards. It includes detailed financial forecasting (CapEx), Remaining Useful Life (RUL) analysis, and MEP operational assessments designed for investors and lenders."
  },
  {
    question: "How long until I receive the full Property Condition Report?",
    answer: "An oral briefing is provided immediately post-inspection. The technical digital report is delivered within 3-5 business days, with an optional 48-hour expedited track for fast-moving acquisitions."
  },
  {
    question: "Do you include cost estimates for repairs?",
    answer: "Yes. Every PCA includes an 'Opinion of Probable Cost' for immediate and short-term repairs, which is essential for valuation adjustments and purchase price negotiations."
  },
  {
    question: "Which commercial asset classes do you inspect?",
    answer: "We inspect all asset classes: Industrial warehouses, retail plazas, Class-A office buildings, multi-family mid-rise apartments, and hospitality properties across the GTA."
  }
];

export default function Commercial() {
  const location = useLocation();
  const serviceUrl = getCanonicalUrl(location.pathname);

  // --- 7-SCHEMA SUITE ---
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": title,
      "serviceType": "Commercial Property Condition Assessment",
      "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection" },
      "areaServed": "Ontario",
      "description": metaDescription
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    },
    // Add additional schemas here (Organization, Breadcrumb, etc. following your Pre-Purchase pattern)
  ];

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={serviceUrl} />
        <script type="application/ld+json">{JSON.stringify(schemas)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Factory className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  Industrial & Commercial Due Diligence
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Commercial Property Condition Assessment & PCA
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Institutional-grade due diligence for commercial assets in Toronto & GTA. Identify structural, MEP, and environmental risks before you invest.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" /> <span>ASTM E2018-15 Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" /> <span>20-Year CapEx Forecast</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> <span>Phase 1 ESA Ready</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Request A Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="tel:+16478019311"><Phone className="mr-2 h-5 w-5" />(647) 801-9311</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Comprehensive Asset Evaluation & Risk Mitigation
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Commercial real estate acquisitions in the Greater Toronto Area require more than a visual walkthrough. Our **Property Condition Assessments (PCA)** provide institutional investors, lenders, and asset managers with a forensic understanding of a building's physical health.
                  </p>
                  
                  

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Structural & Building Envelope Forensic Audit</h3>
                  <p>
                    We evaluate the structural performance of the foundation, slabs, and framing. Our building envelope assessment focuses on high-risk areas like <strong>curtain walls</strong>, <strong>glazing systems</strong>, and <strong>low-slope roofing membranes</strong>. We identify undisclosed water infiltration and thermal bypasses that threaten building longevity.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">MEP (Mechanical, Electrical, Plumbing) Performance</h3>
                  <p>
                    Large-scale assets rely on complex central plants. Our inspectors evaluate <strong>chiller/boiler efficiency</strong>, electrical switchgear via thermal imaging, and commercial plumbing risers. We analyze maintenance logs to determine if deferred maintenance is masking imminent system failure.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <Thermometer className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Infrared Scan</h4>
                      <p className="text-xs text-muted-foreground">Roof moisture & electrical hotspot detection.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20">
                      <BarChart3 className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">CapEx Planning</h4>
                      <p className="text-xs text-muted-foreground">Detailed 20-year reserve fund forecasting.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary">
                      <ClipboardList className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">ASTM Standard</h4>
                      <p className="text-xs text-muted-foreground">Reports recognized by major Canadian lenders.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Phase 1 ESA & Environmental Liability</h3>
                  <p>
                    A physical building audit is incomplete without environmental due diligence. Our integrated <strong>Phase 1 Environmental Site Assessment (ESA)</strong> reviews historical usage, soil, and groundwater records to identify Potential Environmental Concerns (PECs) such as underground storage tanks or past industrial contamination.
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  PCA Technical Checklist
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatWeInspect.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Features */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Commercial Service Features
                </h2>
                <div className="grid gap-6">
                  {features.map((feature) => (
                    <Card key={feature.title} className="border-border/50">
                      <CardContent className="p-6">
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Commercial Due Diligence FAQ
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-6">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    The ASADS Advantage
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/booking">Request Quote</Link>
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-3 italic">
                      Lender-approved reports delivered GTA-wide.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Serving the Ontario Commercial Market
            </h2>
            <p className="text-muted-foreground">PCA & Phase 1 ESA specialists across the Greater Golden Horseshoe</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {featuredLocations.map((loc) => (
              <div key={loc.slug} className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50 text-xs font-medium text-foreground">
                <MapPin className="h-3 w-3 text-primary" /> {loc.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground text-center">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Lender-Grade Due Diligence
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Protect your commercial portfolio with ASTM-standard inspections and environmental assessments. Expedited reporting available for tight closing schedules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/booking">Schedule Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="tel:+16478019311">(647) 801-9311</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
