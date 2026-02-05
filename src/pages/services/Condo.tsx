import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Building, 
  Thermometer, 
  Droplets, 
  Zap, 
  ShieldCheck, 
  ClipboardList,
  CheckCircle, 
  Phone, 
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  AlertTriangle,
  Home
} from "lucide-react";

const featuredLocations = [
  { name: "Downtown Toronto", slug: "downtown-toronto" },
  { name: "North York", slug: "north-york" },
  { name: "Etobicoke", slug: "etobicoke" },
  { name: "Scarborough", slug: "scarborough" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Markham", slug: "markham" },
  { name: "Oakville", slug: "oakville" },
];

const title = "Condo & Townhome Inspection Services";
const metaTitle = "Condo Inspection Toronto & GTA | Certified Suite Specialist | ASADS";
const metaDescription = "Expert pre-purchase & pre-listing condo inspections. Detect Kitec plumbing, Fan Coil failures, and balcony envelope risks. Same-day digital reports.";
const price = "Specialist Rates";
const duration = "1.5 - 2.5 Hours";

const whatWeInspect = [
  "In-Suite Fan Coil / Heat Pump Operation",
  "Kitec & Polybutylene Plumbing Audit",
  "Main Water Shut-off Valve Functionality",
  "Electrical Panel & Breaker Safety (Thermal Scan)",
  "Appliance Functional Lifetime Analysis",
  "Window Wall Seal & Thermal Performance",
  "Balcony Guardrail & Floor Integrity",
  "Dryer Vent & Exhaust Duct Health",
  "Laundry Room Moisture & Leak Detection",
  "Ceiling/Wall Moisture Mapping (Unit-to-Unit Leaks)",
  "HOA & Common Element Compliance Checks",
  "Status Certificate Contextual Notes",
];

const features = [
  {
    title: "Fan Coil & HVAC Specialist",
    description: "In-suite HVAC systems are often neglected. We check internal actuators, drain pans, and condensate lines for mold and mechanical wear."
  },
  {
    title: "Infrared & Moisture Detection",
    description: "FLIR® thermal imaging finds hidden leaks from units above, cold spots in window walls, and mold risk behind drywall."
  },
  {
    title: "Status Certificate Alignment",
    description: "We document condo-specific technical issues that help your lawyer interpret the Status Certificate and potential special assessments."
  },
  {
    title: "Insurance-Ready Documentation",
    description: "Our reports provide professional proof of in-suite conditions, often required by lenders or for Kitec-related insurance riders."
  },
];

const benefits = [
  "Identify Recalled Kitec Plumbing",
  "Prevent HVAC/Fan Coil Mold Growth",
  "Window Wall Thermal Efficiency Scan",
  "Protect Against Unit-to-Unit Liability",
  "Same-Day Digital PDF Reports",
  "Certified Master Inspector Expertise",
  "Evening & Weekend Appointments",
  "Pre-Purchase & Pre-Listing Ready",
];

const faqs = [
  {
    question: "Do you inspect condos differently than houses?",
    answer: "Yes. While a house inspection focuses on the roof and foundation, a condo inspection focuses on 'In-Suite' liabilities: plumbing joints, electrical panels, HVAC Fan Coils, and the balcony envelope. These are the components the owner—not the HOA—is financially responsible for."
  },
  {
    question: "Do you check for Kitec plumbing in condos?",
    answer: "Absolutely. Kitec was common in GTA condos built between 1995 and 2007. It is a major insurance red flag. We identify it visually and thermally so you can negotiate a replacement credit or plan for the cost."
  },
  {
    question: "Is thermal imaging included in condo inspections?",
    answer: "Yes. Thermal scanning is non-negotiable for condos. It allows us to see moisture from a leaking unit above or heat loss through the 'window wall' systems common in modern high-rises."
  },
  {
    question: "How much does a condo inspection cost in Toronto?",
    answer: "Pricing varies based on square footage and the complexity of the HVAC system (e.g., heat pumps vs. fan coils). Contact us at (647) 801-9311 for a quote tailored to your specific building."
  }
];

export default function Condo() {
  const location = useLocation();
  const serviceUrl = getCanonicalUrl(location.pathname);

  // --- FULL 7-SCHEMA SUITE ---
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Condo Inspection",
      "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection" },
      "description": metaDescription,
      "areaServed": "Toronto & GTA",
      "offers": { "@type": "Offer", "priceCurrency": "CAD", "price": "350.00" }
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
        <script type="application/ld+json">{JSON.stringify(schemas)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">Suite Specialist Audit</p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">Condo & Townhome Inspections</h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Don't assume the HOA covers everything. From Kitec plumbing to Fan Coil mold, we audit the high-risk components you are legally responsible for.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2"><Clock className="h-5 w-5" /><span>{duration}</span></div>
              <div className="flex items-center gap-2"><Droplets className="h-5 w-5" /><span>Kitec Plumbing Audit</span></div>
              <div className="flex items-center gap-2"><Thermometer className="h-5 w-5" /><span>HVAC Specialist</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary"><Link to="/booking">Book Condo Audit</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="tel:+16478019311"><Phone className="mr-2 h-5 w-5" />(647) 801-9311</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Navigating In-Suite Liability in Toronto</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>In a standard Toronto high-rise, your ownership stops at the drywall. However, the systems tucked behind those walls—the plumbing, the electrical panel, and the HVAC unit—are your financial burden. An ASADS Condo Audit protects you from inheriting thousands in "hidden" repair costs.</p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The "Kitec" Crisis & Plumbing Red Flags</h3>
                  <p>Recalled <strong>Kitec plumbing</strong> is one of the most significant red flags in the GTA condo market. Often used for hot/cold water lines and in-floor heating, Kitec is prone to premature failure and can make a unit uninsurable. We perform a visual and thermal sweep of all visible piping to verify the health of your plumbing infrastructure.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
                      <Droplets className="text-red-600 mb-2" size={32} />
                      <h4 className="font-bold text-red-900">Plumbing Audit</h4>
                      <p className="text-xs text-red-800">Kitec detection and unit-to-unit leak mapping.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                      <Thermometer className="text-blue-600 mb-2" size={32} />
                      <h4 className="font-bold text-blue-900">HVAC/Fan Coil</h4>
                      <p className="text-xs text-blue-800">Mechanical testing of actuators and condensate pans.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-5 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                      <ShieldCheck className="text-amber-600 mb-2" size={32} />
                      <h4 className="font-bold text-amber-900">Envelope Scan</h4>
                      <p className="text-xs text-amber-800">Window wall and balcony thermal integrity.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Fan Coil & HVAC Maintenance Issues</h3>
                  <p>Most condo HVAC units (Fan Coils) are neglected by previous owners. We inspect the internal components for <strong>mold growth</strong>, failing actuators, and clogged drain lines that lead to basement floods and poor air quality. Our audit ensures your mechanical systems are operating efficiently before you close.</p>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Condo Specialist Checklist</h2>
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
              <div className="space-y-4">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
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
                    <Button asChild className="w-full" size="lg"><Link to="/booking">Book Now</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Secure Your Condo Investment</h2>
          <p className="text-xl opacity-90 mb-8">Professional in-suite audits delivered same-day. Don't let a "Common Element" mask a major repair.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/booking">Book Your Inspection</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <a href="tel:+16478019311">(647) 801-9311</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
