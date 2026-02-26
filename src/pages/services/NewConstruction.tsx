import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
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

const featuredLocations = [
  { name: "Toronto", slug: "toronto" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Brampton", slug: "brampton" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Markham", slug: "markham" },
  { name: "Oakville", slug: "oakville" },
  { name: "Milton", slug: "milton" },
  { name: "Whitby", slug: "whitby" },
];

const title = "New Construction & Tarion Warranty Inspection";
const metaTitle = "Tarion Warranty & New Construction Inspection Toronto | ASADS";
const metaDescription = "Professional PDI, 30-Day, and 1-Year Tarion Warranty inspections for new GTA homes. We identify builder shortcuts and structural defects before deadlines pass.";
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
      "serviceType": "New Construction Inspection",
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
        <script type="application/ld+json">{JSON.stringify(schemas)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <HardHat className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">Builder Quality Control</p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">New Construction & Tarion Warranty</h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              New doesn't mean perfect. From PDI walkthroughs to 1-Year Tarion deadlines, we identify builder shortcuts before they become your financial burden.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2"><Clock className="h-5 w-5" /><span>{duration}</span></div>
              <div className="flex items-center gap-2"><ShieldAlert className="h-5 w-5" /><span>Tarion Experts</span></div>
              <div className="flex items-center gap-2"><Thermometer className="h-5 w-5" /><span>Infrared Scanning</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary"><Link to="/booking">Book New Build Audit</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><a href="tel:+16478019311"><Phone className="mr-2 h-5 w-5" />(647) 801-9311</a></Button>
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
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Independent Audit for New GTA Homes</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>In the rush to meet closing deadlines, builders often overlook critical details. Our **New Construction Audit** acts as your independent quality control, ensuring your new GTA home meets professional standards—not just the bare minimum code.</p>
                  
                  

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
