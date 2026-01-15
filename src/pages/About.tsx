import { ShieldCheck, Search, FileText, UserCheck, Users, GraduationCap, Award, Shield, Target, CheckCircle, ArrowRight, Building } from 'lucide-react';
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.asads.ca/#organization",
  "name": "ASADS Home Inspection",
  "alternateName": "ASADS",
  "url": "https://www.asads.ca/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.asads.ca/logo.png",
    "width": 512,
    "height": 512
  },
  "image": "https://www.asads.ca/images/toronto-home-inspection-hero.webp",
  "description": "Professional home inspection services in the Greater Toronto Area since 2009. Certified inspectors providing comprehensive property assessments with same-day reports.",
  "foundingDate": "2015",
  "foundingLocation": {
    "@type": "Place",
    "name": "Toronto, Ontario, Canada"
  },
  "founder": {
    "@type": "Person",
    "name": "Haroon Choudhry",
    "jobTitle": "Founder & Master Inspector"
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 3
  },
  "slogan": "Protecting Your Investment, Giving You Peace of Mind",
  "knowsAbout": [
    "Home Inspection",
    "Pre-Purchase Inspection",
    "Pre-Listing Inspection",
    "Condo Inspection",
    "Commercial Property Inspection",
    "Radon Testing",
    "Mold Inspection",
    "Thermal Imaging",
    "WETT Inspection"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 43.653226,
      "longitude": -79.383184
    },
    "geoRadius": "150000"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-647-801-9311",
      "contactType": "customer service",
      "availableLanguage": ["English"],
      "areaServed": "CA"
    },
    {
      "@type": "ContactPoint",
      "email": "info@asads.ca",
      "contactType": "customer service"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/share/1ZhWQk97YY/",
    "https://www.instagram.com/asads_home_inspection",
    "https://youtube.com/@asadshomeinspection",
    "https://x.com/AsadsInspection",
    "https://tiktok.com/@asads_home_inspection"
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.asads.ca" },
    { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.asads.ca/about" }
  ]
};

// About Page specific schema - ProfilePage
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About ASADS Home Inspection",
  "description": "Learn about ASADS Home Inspection - trusted Ontario home inspectors since 2015 with rigorous standards and commitment to home safety.",
  "url": "https://www.asads.ca/about",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://www.asads.ca/#organization"
  }
};

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We provide honest, unbiased assessments. Our only loyalty is to you and your safety.",
  },
  {
    icon: Target,
    title: "Thoroughness",
    description: "Our 200+ point inspection leaves no stone unturned. We inspect every accessible area.",
  },
  {
    icon: Users,
    title: "Education",
    description: "We take time to explain our findings and help you understand your home's condition.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Continuous training and the latest technology ensure you get the best inspection possible.",
  },
];

const certifications = [
  "Ontario Association of Home Inspectors (OAHI)",
  "InterNACHI Certified Professional Inspector",
  "WETT Certified Technician",
  "Thermography Certified",
  "Radon Measurement Professional",
  "Mold Assessment Technician",
];

const team = [
  {
    name: "Haroon Choudhry",
    role: "Founder & Master Inspector",
    experience: "15+ years experience",
    certifications: ["OAHI", "InterNACHI", "WETT"],
    bio: "Haroon founded ASADS with a mission to provide GTA homeowners with honest, thorough inspections. With over 2,000 inspections completed, he brings unmatched expertise to every home.",
  },
  {
    name: "Kapil Sharma",
    role: "Senior Inspector",
    experience: "10+ years experience",
    certifications: ["OAHI", "Thermal Imaging"],
    bio: "Kapil specializes in thermal imaging and moisture detection. Her attention to detail has helped countless clients avoid costly repairs.",
  },
  {
    name: "Marcus Thompson",
    role: "Commercial Inspector",
    experience: "12+ years experience",
    certifications: ["InterNACHI", "Commercial"],
    bio: "Marcus leads our commercial inspection division, bringing extensive experience in multi-unit and commercial property assessments.",
  },
];

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>Expert Home Inspectors in Ontario | ASADS Certified</title>
        <meta name="description" content="Trusted Ontario home inspectors since 2015. Learn about our rigorous standards, honest reporting, and commitment to your home safety." />
        <link rel="canonical" href="https://www.asads.ca/about" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutPageSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Expert Home Inspectors in Ontario
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Since 2015, we've been the GTA's trusted partner for comprehensive home inspections. 
              Our mission is simple: protect your investment and give you peace of mind.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">2,000+ Inspections</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">3 Certified Inspectors</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">10+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Professional & SEO-Optimized 'Our Story' Section */}
<section className="py-16 md:py-24 bg-background" aria-labelledby="about-haroon">
  <div className="container">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <h2 id="about-haroon" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
          Master Home Inspection & Structural Expertise in the GTA
        </h2>
        
        <div className="space-y-5 text-muted-foreground text-lg">
          <p>
            <strong>ASADS Home Inspection</strong> is led by Haroon Choudhry, a <strong>Master Home Inspector</strong> with over 15 years of deep-rooted experience in the Greater Toronto Area’s construction and inspection sectors.
          </p>

          <p>
            With a professional foundation as the former Owner and Principal Contractor of <strong>Aro Construction Inc.</strong>, Haroon provides a rare "inside-out" perspective. His background in <strong>structural restorations</strong> and general contracting allows him to identify critical mechanical and structural issues that standard inspections often overlook.
          </p>

          <p>
            We specialize in high-detail <strong>residential and commercial inspections</strong>, ensuring every property remains in strict alignment with the <strong>Ontario Building Code (OBC)</strong> and municipal safety standards.
          </p>

          <p>
            With a proven track record of over <strong>1,000 comprehensive property assessments</strong>, Haroon delivers technical clarity and actionable insights through professional, photographic reporting.
          </p>
        </div>

        {/* SEO Keywords for Search Crawlers */}
        <div className="flex flex-wrap gap-3 mt-8">
          {["OBC Compliance", "Structural Integrity", "MEP Systems", "Building Envelopes", "Technical Reporting"].map((skill) => (
            <span key={skill} className="bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 relative">
        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl"></div>
        <div className="relative bg-card border border-border p-8 md:p-12 rounded-2xl shadow-xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
            <GraduationCap className="h-10 w-10" />
          </div>
          <h3 className="text-4xl font-bold text-foreground mb-2">15+ Years</h3>
          <p className="text-muted-foreground font-semibold uppercase tracking-widest text-sm mb-6">Construction Advisory Experience</p>
          
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-primary font-bold">
              <span className="h-2 w-2 bg-primary rounded-full"></span>
              Ontario Building Code (OBC) Expert
            </div>
            <p className="text-sm text-muted-foreground italic">
              Serving Toronto, Mississauga, Brampton & the Greater Toronto Area
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Our Values - Professionalized & Fixed for Haroon Choudhry */}
<section className="py-16 md:py-24 bg-muted/30">
  <div className="container">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
        Accuracy, Transparency & Experience
      </h2>
      <p className="text-lg text-muted-foreground">
        Guided by over 15 years of hands-on structural expertise in the Greater Toronto Area.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Box 1: Structural Expertise */}
      <Card className="text-center border-border/50 hover:border-primary/50 transition-colors shadow-sm">
        <CardContent className="pt-8 pb-6 px-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-tight">
            Structural & MEP Expertise
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Leveraging 15+ years of general contracting experience to identify critical structural, electrical, and plumbing issues.
          </p>
        </CardContent>
      </Card>

      {/* Box 2: Code Compliance */}
      <Card className="text-center border-border/50 hover:border-primary/50 transition-colors shadow-sm">
        <CardContent className="pt-8 pb-6 px-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Search className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-tight">
            OBC Code Compliance
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Expert knowledge of the Ontario Building Code (OBC) ensures your property meets all legal and safety requirements.
          </p>
        </CardContent>
      </Card>

      {/* Box 3: Technical Reporting */}
      <Card className="text-center border-border/50 hover:border-primary/50 transition-colors shadow-sm">
        <CardContent className="pt-8 pb-6 px-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-tight">
            Photographic Reporting
          </h3>
          <p className="text-sm text-muted-relaxed">
            Delivering high-quality, technical reports with actionable insights to empower your investment decisions.
          </p>
        </CardContent>
      </Card>

      {/* Box 4: Master Inspector Authority */}
      <Card className="text-center border-border/50 hover:border-primary/50 transition-colors shadow-sm">
        <CardContent className="pt-8 pb-6 px-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <UserCheck className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-tight">
            Master Inspector Lead
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            As a Master Inspector, my loyalty is to your safety. We move beyond surface-level observations to protect your asset.
          </p>
        </CardContent>
      </Card>

    </div>
  </div>
</section>


      {/* Team Section - SEO Optimized & Founder Focused */}
<section className="py-16 md:py-24 bg-background" aria-labelledby="team-heading">
  <div className="container">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 id="team-heading" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
        Serving Ontario Buyers, Sellers & Investors
      </h2>
      <p className="text-lg text-muted-foreground">
        Our certified Master Inspectors bring decades of structural and technical experience to every property assessment.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Member 1: Haroon Choudhry */}
      <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center relative">
          <div className="h-24 w-24 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-primary/20">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <div className="absolute bottom-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            Founder
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading font-bold text-xl text-foreground mb-1">
            Haroon Choudhry
          </h3>
          <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">Master Inspector & Founder</p>
          <p className="text-foreground font-semibold text-sm mb-2 italic">15+ Years Experience</p>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            Haroon founded ASADS with a mission to provide GTA homeowners with unmatched expertise. Having completed over 2,000 inspections, he leverages his background in structural restoration to identify issues others miss.
          </p>
          <div className="flex flex-wrap gap-2">
            {["OAHI", "InterNACHI", "WETT", "OBC Expert"].map((cert) => (
              <span key={cert} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase">
                {cert}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member 2: Kapil Sharma */}
      <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-slate-300">
            <Users className="h-12 w-12 text-slate-400" />
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading font-bold text-xl text-foreground mb-1">
            Kapil Sharma
          </h3>
          <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">Senior Inspector</p>
          <p className="text-foreground font-semibold text-sm mb-2 italic">10+ Years Experience</p>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            Kapil specializes in thermal imaging and advanced moisture detection. His meticulous attention to detail has helped countless clients avoid costly structural repairs through proactive identification.
          </p>
          <div className="flex flex-wrap gap-2">
            {["OAHI", "Thermal Imaging", "Mold Certified"].map((cert) => (
              <span key={cert} className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bold uppercase border">
                {cert}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member 3: Rashid Hussain */}
      <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-slate-300">
            <Users className="h-12 w-12 text-slate-400" />
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading font-bold text-xl text-foreground mb-1">
            Rashid Hussain
          </h3>
          <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">Commercial Inspector</p>
          <p className="text-foreground font-semibold text-sm mb-2 italic">12+ Years Experience</p>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            Rashid leads our commercial division, specializing in multi-unit residential complexes and commercial facility assessments, ensuring large-scale investments meet strict municipal standards.
          </p>
          <div className="flex flex-wrap gap-2">
            {["InterNACHI", "Commercial Facility Expert"].map((cert) => (
              <span key={cert} className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bold uppercase border">
                {cert}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  </div>
</section>


      {/* Certifications */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Certifications
            </h2>
            <p className="text-lg text-primary-foreground/80">
              We maintain the highest industry standards and continuously update our training.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div 
                key={cert}
                className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4"
              >
                <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-muted/30 border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 text-center">
              Explore Our Services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <Link to="/services/pre-purchase/" className="p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Pre-Purchase Inspection
              </Link>
              <Link to="/services/pre-listing/" className="p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Pre-Listing Inspection
              </Link>
              <Link to="/services/radon-testing/" className="p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Radon Testing
              </Link>
              <Link to="/services/mold-inspection/" className="p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                Mold Inspection
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <Link to="/services/" className="text-primary hover:underline">All Services</Link>
              <span className="text-border">•</span>
              <Link to="/locations/" className="text-primary hover:underline">Service Areas</Link>
              <span className="text-border">•</span>
              <Link to="/testimonials/" className="text-primary hover:underline">Customer Reviews</Link>
              <span className="text-border">•</span>
              <Link to="/faq/" className="text-primary hover:underline">FAQ</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the ASADS difference. Book your inspection today and 
              see why thousands of GTA homeowners trust us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/booking/">
                  Book Your Inspection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact/">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
