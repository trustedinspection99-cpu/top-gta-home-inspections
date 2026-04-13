import { ShieldCheck, Search, FileText, UserCheck, GraduationCap, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { InlineBookingForm } from "@/components/InlineBookingForm";

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
  "foundingDate": "2009",
  "foundingLocation": {
    "@type": "Place",
    "name": "Toronto, Ontario, Canada"
  },
  "founder": {
    "@type": "Person",
    "@id": "https://www.asads.ca/#haroon-choudhry",
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
    "streetAddress": "45 Duckworth Rd",
    "addressLocality": "Cambridge",
    "addressRegion": "ON",
    "postalCode": "N3H 0C1",
    "addressCountry": "CA"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+16478019311",
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

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About ASADS Home Inspection",
  "description": "Learn about ASADS Home Inspection - trusted Ontario home inspectors since 2009 with rigorous standards and commitment to home safety.",
  "url": "https://www.asads.ca/about",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://www.asads.ca/#organization"
  }
};

const haroonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.asads.ca/#haroon-choudhry",
  "name": "Haroon Choudhry",
  "jobTitle": "Master Home Inspector & Founder",
  "description": "Founder of ASADS Home Inspection. 15+ years experience as a certified home inspector in Ontario. OAHI member, InterNACHI Certified Professional Inspector, WETT Certified Technician. Former principal contractor at Aro Construction Inc.",
  "worksFor": {
    "@type": "Organization",
    "@id": "https://www.asads.ca/#organization"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "OAHI Member",
      "credentialCategory": "Professional Membership",
      "recognizedBy": { "@type": "Organization", "name": "Ontario Association of Home Inspectors (OAHI)" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "InterNACHI Certified Professional Inspector (CPI)",
      "credentialCategory": "Professional Certification",
      "recognizedBy": { "@type": "Organization", "name": "International Association of Certified Home Inspectors (InterNACHI)" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "WETT Certified Technician",
      "credentialCategory": "Professional Certification",
      "recognizedBy": { "@type": "Organization", "name": "Wood Energy Technology Transfer Inc. (WETT)" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Thermography Certified Inspector",
      "credentialCategory": "Professional Certification"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Radon Measurement Professional",
      "credentialCategory": "Professional Certification"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Mold Assessment Technician",
      "credentialCategory": "Professional Certification"
    }
  ],
  "knowsAbout": [
    "Home Inspection", "Pre-Purchase Home Inspection", "Pre-Listing Inspection",
    "WETT Inspection", "Thermal Imaging", "Radon Testing", "Mold Inspection",
    "Asbestos Testing", "Commercial Property Inspection", "Structural Assessment",
    "Kitec Plumbing", "Aluminum Wiring", "Knob and Tube Wiring"
  ],
  "telephone": "+16478019311",
  "email": "info@asads.ca",
  "url": "https://www.asads.ca/about",
  "sameAs": [
    "https://www.instagram.com/asads_home_inspection",
    "https://youtube.com/@asadshomeinspection",
    "https://x.com/AsadsInspection"
  ]
};

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
    role: "Master Inspector & Founder",
    experience: "15+ Years Experience",
    certs: ["OAHI", "InterNACHI", "WETT", "Thermography"],
    bio: "Haroon founded ASADS with a mission to provide GTA homeowners with unmatched expertise. Having completed over 2,000 inspections, he leverages his background in structural restoration and general contracting to identify issues others miss.",
    founder: true,
  },
  {
    name: "Kapil Sharma",
    role: "Senior Inspector",
    experience: "10+ Years Experience",
    certs: ["OAHI", "Thermal Imaging", "Mold Certified"],
    bio: "Kapil specializes in thermal imaging and advanced moisture detection. His meticulous attention to detail has helped countless clients avoid costly structural repairs through proactive identification.",
    founder: false,
  },
  {
    name: "Rashid Hussain",
    role: "Commercial Inspector",
    experience: "12+ Years Experience",
    certs: ["InterNACHI", "Commercial Facility Expert"],
    bio: "Rashid leads our commercial division, specializing in multi-unit residential complexes and commercial facility assessments, ensuring large-scale investments meet strict municipal standards.",
    founder: false,
  },
];

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>Home Inspector Ontario | OAHI &amp; InterNACHI Certified | ASADS</title>
        <meta name="description" content="Certified home inspector in Ontario — ASADS. OAHI & InterNACHI certified, 2,000+ inspections across 106 cities. Same-day digital reports. Call (647) 801-9311." />
        <link rel="canonical" href="https://www.asads.ca/about" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home Inspector Ontario | OAHI &amp; InterNACHI Certified | ASADS" />
        <meta property="og:description" content="Certified home inspector in Ontario — ASADS. OAHI & InterNACHI certified, 2,000+ inspections across 106 cities. Same-day digital reports." />
        <meta property="og:url" content="https://www.asads.ca/about" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Inspector Ontario | OAHI &amp; InterNACHI Certified | ASADS" />
        <meta name="twitter:description" content="Certified home inspector in Ontario — ASADS. OAHI & InterNACHI certified, 2,000+ inspections across 106 cities. Same-day digital reports." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(haroonSchema)}</script>
      </Helmet>

      {/* Hero — info only */}
      <section className="relative py-14 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=70&auto=format&fit=crop" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/93 to-blue-800/90" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-700/40 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-blue-600/50 text-sm font-medium">
            OAHI & InterNACHI Certified · Founded 2009 · 2,000+ Inspections
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight">
            Certified Home Inspector in Ontario
          </h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            We're a small, experienced team that takes home inspection seriously. Every inspection is led by a certified inspector who gives you straight answers — not vague observations — so you can make your decision with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "2,000+", label: "Inspections" },
              { value: "106", label: "Cities Served" },
              { value: "4.9★", label: "Avg. Rating" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-blue-200 text-xs uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+16478019311" className="bg-white text-blue-700 px-7 py-4 rounded-lg font-bold text-base hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              (647) 801-9311
            </a>
            <a href="/booking" className="bg-transparent border-2 border-white px-7 py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Book an Inspection
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background" aria-labelledby="about-haroon">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 id="about-haroon" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                Master Home Inspection & Structural Expertise in Ontario
              </h2>
              <div className="space-y-5 text-muted-foreground text-lg">
                <p>
                  <strong>ASADS Home Inspection</strong> is led by Haroon Choudhry, a <strong>Master Home Inspector</strong> with over 15 years of deep-rooted experience in Ontario's construction and inspection sectors.
                </p>
                <p>
                  With a professional foundation as the former Owner and Principal Contractor of <strong>Aro Construction Inc.</strong>, Haroon provides a rare "inside-out" perspective. His background in <strong>structural restorations</strong> and general contracting allows him to identify critical mechanical and structural issues that standard inspections often overlook.
                </p>
                <p>
                  We specialize in high-detail <strong>residential and commercial inspections</strong>, following the OAHI and InterNACHI Standards of Practice. Haroon's construction background means he understands how buildings are built — and how they fail — giving every inspection a depth that goes beyond a standard visual assessment.
                </p>
                <p>
                  With a proven track record of over <strong>2,000 comprehensive property assessments</strong>, Haroon delivers technical clarity and actionable insights through professional, photographic reporting.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                {["OAHI Standards", "Structural Integrity", "MEP Systems", "Building Envelopes", "Technical Reporting"].map((skill) => (
                  <span key={skill} className="bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative bg-card border border-border p-8 rounded-2xl shadow-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-5">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">Haroon Choudhry</h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-5">Master Inspector & Founder</p>
                <ul className="space-y-3">
                  {[
                    "OAHI Member — Ontario Association of Home Inspectors",
                    "InterNACHI Certified Professional Inspector",
                    "WETT Certified Technician",
                    "Former Principal Contractor — Aro Construction Inc.",
                    "Thermography & Radon Certified",
                    "15+ years in structural restoration & contracting",
                  ].map(cred => (
                    <li key={cred} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Accuracy, Transparency & Experience
            </h2>
            <p className="text-lg text-muted-foreground">
              Guided by over 15 years of hands-on structural expertise across Ontario.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Structural & MEP Expertise", desc: "Leveraging 15+ years of general contracting experience to identify critical structural, electrical, and plumbing issues." },
              { icon: Search,      title: "OAHI & InterNACHI Standards", desc: "Every inspection follows OAHI and InterNACHI Standards of Practice — the two most recognized inspection frameworks in Ontario." },
              { icon: FileText,    title: "Photographic Reporting",     desc: "Delivering high-quality, technical reports with actionable insights to empower your investment decisions." },
              { icon: UserCheck,   title: "Master Inspector Lead",      desc: "As a Master Inspector, our loyalty is to your safety. We move beyond surface-level observations to protect your asset." },
            ].map(item => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="text-center border-border/50 hover:border-primary/50 transition-colors shadow-sm">
                  <CardContent className="pt-8 pb-6 px-4">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3 leading-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
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
            {team.map((member) => (
              <Card key={member.name} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-extrabold ${member.founder ? 'bg-primary text-primary-foreground' : 'bg-slate-200 text-slate-600'}`}>
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground leading-tight">{member.name}</h3>
                      <p className="text-primary font-semibold text-xs uppercase tracking-wide">{member.role}</p>
                      <p className="text-muted-foreground text-xs">{member.experience}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.certs.map((cert) => (
                      <span key={cert} className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase border ${member.founder ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                        {cert}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Certifications</h2>
            <p className="text-lg text-primary-foreground/80">
              We maintain the highest industry standards and continuously update our training.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
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
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 text-center">What We Inspect</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Pre-Purchase Inspection",   href: "/services/pre-purchase" },
                { label: "Pre-Listing Inspection",    href: "/services/pre-listing" },
                { label: "Condo Inspection",          href: "/services/condo" },
                { label: "New Construction / PDI",    href: "/services/new-construction" },
                { label: "Radon Testing",             href: "/services/radon-testing" },
                { label: "Mold Inspection",           href: "/services/mold-inspection" },
                { label: "Asbestos Testing",          href: "/services/asbestos-testing" },
                { label: "WETT Inspection",           href: "/services/wett" },
                { label: "Thermal Imaging",           href: "/services/thermal-imaging" },
                { label: "Air Quality Testing",       href: "/services/air-quality-testing" },
                { label: "Lead Paint Testing",        href: "/services/lead-paint-testing" },
                { label: "Well Water Testing",        href: "/services/well-water-testing" },
                { label: "Commercial Inspection",     href: "/services/commercial" },
                { label: "Same-Day Inspection",       href: "/services/same-day-home-inspection" },
              ].map(link => (
                <Link key={link.href} to={link.href} className="p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 text-sm text-center hover:bg-primary/5 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <Link to="/services"     className="text-primary hover:underline">All Services</Link>
              <span className="text-border">•</span>
              <Link to="/locations"    className="text-primary hover:underline">Service Areas</Link>
              <span className="text-border">•</span>
              <Link to="/testimonials" className="text-primary hover:underline">Customer Reviews</Link>
              <span className="text-border">•</span>
              <Link to="/faq"          className="text-primary hover:underline">FAQ</Link>
              <span className="text-border">•</span>
              <Link to="/our-promise"  className="text-primary hover:underline">Independence Promise</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Home Inspector Ontario — SEO Section */}
      <section className="py-16 md:py-20 bg-background border-t border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Makes a Certified Home Inspector in Ontario?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-5">
              <p>
                Hiring a certified home inspector in Ontario is one of the most important steps in any real estate transaction. Under Ontario's <strong>Home Inspection Act, 2017</strong>, home inspectors must be licensed through <strong>TICO-regulated associations</strong> such as the <strong>Ontario Association of Home Inspectors (OAHI)</strong> and follow a strict Code of Ethics. ASADS inspectors hold active OAHI and <strong>InterNACHI</strong> certifications — the two most recognized credentials for home inspectors in Ontario.
              </p>
              <p>
                A qualified <strong>home inspector Ontario</strong> property buyers rely on should cover all major systems: <strong>roof</strong>, <strong>foundation</strong>, <strong>HVAC</strong>, <strong>electrical</strong>, <strong>plumbing</strong>, <strong>attic</strong>, <strong>basement</strong>, and <strong>exterior envelope</strong>. At ASADS, our 400-point checklist ensures nothing is overlooked. Every inspection comes with a <strong>same-day digital report</strong> — photo-rich, easy to read, and actionable.
              </p>
              <p>
                Ontario's diverse housing stock — from <strong>Toronto</strong> Victorian rowhouses and <strong>Mississauga</strong> condos to <strong>Barrie</strong> new builds and <strong>Hamilton</strong> century homes — means your home inspector needs localized knowledge. Our inspectors have completed thousands of assessments across the province and understand the specific failure patterns in each region's housing stock.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                {[
                  { title: "Licensed & Certified", body: "OAHI member + InterNACHI certified. Fully compliant with Ontario's Home Inspection Act, 2017." },
                  { title: "400-Point Checklist", body: "Every major system and structure assessed — structural, MEP, envelope, and environmental." },
                  { title: "Same-Day Reports", body: "Photo-rich digital reports delivered the same day as the inspection, every time." },
                  { title: "106 Cities Served", body: "From Toronto and the GTA to Kitchener, Hamilton, Barrie, and all of Southern Ontario." },
                ].map(item => (
                  <div key={item.title} className="p-5 rounded-xl border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <h3 className="font-bold text-foreground text-base">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
              <p>
                When searching for a <strong>home inspector in Ontario</strong>, look for clear reporting standards, liability insurance (Intact + $2M general liability), and availability for same-day or next-day bookings. ASADS checks every box — and our <strong>4.9-star average</strong> across hundreds of verified reviews reflects the standard we hold ourselves to.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/services/pre-purchase" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                <ArrowRight className="h-4 w-4" />
                View All Services
              </Link>
              <Link to="/locations" className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                Our Service Areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Experience the ASADS difference. Book your inspection today and see why thousands of Ontario homeowners trust us.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "OAHI & InterNACHI certified inspectors",
                  "Same-day digital reports with photos",
                  "Available 7 days a week",
                  "Fully insured — Intact · $2M liability",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-blue-100 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
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
