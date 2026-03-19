import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import {
  Home,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  Thermometer,
  PhoneCall,
  TrendingUp,
  Scale,
  Zap,
  Droplets,
  HardHat,
  Search
} from "lucide-react";
import { locationData } from "@/data/locationData";

// Featured locations for service pages internal linking
const featuredLocations = locationData.map(loc => ({ name: loc.city, slug: loc.slug }));

const title = "Pre-Listing Home Inspection";
const metaTitle = "Pre-Listing Home Inspection Ontario | From $450 | ASADS";
const metaDescription = "Certified pre-listing inspection Ontario from $450. Find defects before buyers do — firm offers, faster closing & same-day digital report. (647) 801-9311.";
const price = "$450-$750";
const duration = "2-4 Hours";

const whatWeInspect = [
  "Structural Foundation & Support Beams",
  "Roof Shingles, Flashing & Attic Health",
  "Main Supply Plumbing & Drainage Lines",
  "Electrical Panel Capacity & Safety Wiring",
  "HVAC System Longevity & Efficiency",
  "Basement Moisture & Envelope Integrity",
  "Exterior Grading & Water Diversion",
  "Interior Safety & Disclosure Items",
];

const features = [
  {
    title: "The Disclosure Shield",
    description: "Our technical audit provides the data required for an accurate SPIS (Seller Property Information Statement), reducing post-sale liability."
  },
  {
    title: "Infrared Moisture Scans",
    description: "Every pre-listing audit includes thermal imaging to find hidden leaks before the buyer's inspector does."
  },
  {
    title: "Equity Protection Strategy",
    description: "Identify high-ROI repairs you can fix cheaply now, rather than paying thousands in credits later."
  },
  {
    title: "Marketing-Ready Reports",
    description: "Receive a professional, high-resolution digital report to share with prospective buyers to build immediate trust."
  },
];

const benefits = [
  "Maximize Resale Value",
  "Facilitate Unconditional Offers",
  "Full SPIS Disclosure Data",
  "Infrared Thermal Scanning",
  "Detailed Photo Documentation",
  "Licensed & Insured Inspectors",
  "24/7 Seller Technical Support",
  "Flexible Listing Schedule",
];

const faqs = [
  {
    question: "Why should I get an inspection before listing my home?",
    answer: "A pre-listing inspection puts you in the driver's seat. Instead of a buyer's inspector finding a major issue and using it to kill the deal or demand a $10,000 credit, you find it first. You can then fix it on your own budget or price the home accordingly, which encourages firm, unconditional offers."
  },
  {
    question: "Do I have to fix everything found in the report?",
    answer: "Absolutely not. We categorize findings into 'Major Defects' and 'Maintenance Items.' You can choose to fix the big things (like a leaking pipe or double-tapped breaker) and simply disclose the rest. This transparency builds buyer confidence and prevents the 'fear of the unknown' that stalls sales."
  },
  {
    question: "How does this report help with my legal liability?",
    answer: "In Ontario, sellers are legally obligated to disclose latent defects they are aware of. An ASADS Pre-Listing Audit provides a professional technical record. By providing this report to buyers, you demonstrate full transparency, which acts as a legal shield against future claims of non-disclosure."
  },
  {
    question: "Will buyers still want their own inspection?",
    answer: "In some cases, yes. However, when you provide an ASADS report upfront—complete with infrared scans and high-res photos—many buyers feel comfortable enough to submit firm offers or rely on your report, especially in competitive GTA markets like Toronto and Mississauga."
  },
  {
    question: "Does the report include a repair estimate?",
    answer: "As third-party neutral inspectors, we do not provide cost estimates to avoid conflicts of interest. However, we clearly explain the severity of each issue, which helps you obtain accurate quotes from contractors before the house hits the market."
  },
  {
    question: "What if the inspection finds a serious structural issue?",
    answer: "Finding it now is much better than finding it while you're under contract. You can hire a structural engineer to provide a remediation plan, which you can show to buyers as 'work already managed.' This preserves your sale price better than a last-minute discovery."
  }
];

const relatedServices = [
  { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
  { title: "Mold & Air Quality Audit", href: "/services/mold-inspection" },
  { title: "Thermal Imaging Scan", href: "/services/thermal-imaging" },
  { title: "Commercial Building Audit", href: "/services/commercial" },
];

export default function PreListing() {
  const location = useLocation();
  const serviceUrl = getCanonicalUrl(location.pathname);

  // --- FULL 7-SCHEMA SUITE MATCHED TO PRE-PURCHASE ---
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection",
    "image": `${SITE_URL}/images/logo.png`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": "+16478019311",
    "email": "info@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "45 Duckworth Rd",
      "addressLocality": "Cambridge",
      "addressRegion": "ON",
      "postalCode": "N3H 0C1",
      "addressCountry": "CA"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 43.3990, "longitude": -80.3271 },
    "areaServed": featuredLocations.map(loc => ({ "@type": "City", "name": loc.name })),
    "priceRange": "$$",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.9, "reviewCount": 158 }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Pre-Listing Home Inspection",
    "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection" },
    "description": "Comprehensive seller-side technical audits across Ontario to maximize resale value, provide SPIS data, and ensure smooth real estate transactions.",
    "offers": { "@type": "Offer", "priceCurrency": "CAD", "priceRange": price }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": getCanonicalUrl("/") },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": getCanonicalUrl("/services") },
      { "@type": "ListItem", "position": 3, "name": "Pre-Listing Inspection", "item": serviceUrl }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASADS Home Inspection",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/logo.png`,
    "sameAs": [
      "https://www.facebook.com/share/1ZhWQk97YY/",
      "https://www.instagram.com/asads_home_inspection"
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": serviceUrl,
    "inLanguage": "en-CA"
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Pre-Listing Audits",
    "image": `${SITE_URL}/images/1000041112.jpg`,
    "priceRange": price,
    "telephone": "+16478019311",
    "url": serviceUrl,
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.9, "reviewCount": 158 }
  };

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
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(professionalServiceSchema)}</script>
      </Helmet>

            <HeroBookingSection
        badge="ASADS Inspection Services · Seller Inspection Specialists"
        title="Pre-Listing Inspection & Pre-Sale Home Inspection"
        subtitle="Don't let a buyer's inspector control your price. Our pre-listing inspection identifies deal-breakers early, allowing sellers to control the narrative and secure higher offers."
        priceCards={[
          { label: "Pre-Listing Inspection", price: "From $399" },
          { label: "Thermal Imaging", price: "Included" },
          { label: "Duration", price: duration },
        ]}
        defaultService="Pre-Listing Inspection"
        formTitle="Book Listing Audit"
        ctaPrimary={{ text: "Book Listing Audit", href: "/booking" }}
      />

      {/* --- MAIN CONTENT: MATCHED DEPTH --- */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Strategic Value of Pre-Listing Audits</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>In Ontario's competitive real estate market, a <strong>Pre-Listing Home Inspection</strong> is the ultimate offensive tool. By commissioning a technical audit before your property hits the MLS, you eliminate the "fear of the unknown" that often derails deals during the buyer's conditional period.</p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Foundation & Structural Integrity</h3>
                  <img src="/images/1000041112.jpg" alt="Foundation Inspection" className="rounded-xl shadow-lg my-6 border border-slate-200" />
                  <p>Our audit includes a rigorous evaluation of your foundation's load-bearing capacity. We identify signs of <strong>hydrostatic pressure</strong>, lateral basement wall displacement, and structural settlement. Addressing minor cracks or moisture seepage now prevents a buyer's inspector from characterizing them as catastrophic structural failures later.</p>

                  <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Electrical Safety & SPIS Compliance</h4>
                  <img src="/images/1000041111.jpg" alt="Electrical Panel Audit" className="rounded-xl shadow-lg my-6 border border-slate-200" />
                  <p>Electrical issues are the leading cause of failed inspections in Ontario. We audit your service panel for <strong>double-tapped breakers</strong>, undersized wiring, and hazardous brands like Zinsco or Federal Pacific. Knowing these facts allows you to complete your Seller Property Information Statement (SPIS) with 100% accuracy, providing a legal shield against post-sale litigation.</p>

                  <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Plumbing & Thermal Moisture Scanning</h4>
                  <img src="/images/1000041110.jpg" alt="Moisture Detection" className="rounded-xl shadow-lg my-6 border border-slate-200" />
                  <p>Hidden leaks are "silent deal killers." We utilize high-sensitivity <strong>Infrared Thermal Imaging</strong> to scan behind finished basement walls and ceilings. This identifies latent moisture issues from aging Polybutylene or Kitec plumbing before they become an expensive negotiation point for the buyer.</p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Attic, Roof & Envelope</h3>
                  <img src="/images/1000041109.jpg" alt="Attic Inspection" className="rounded-xl shadow-lg my-6 border border-slate-200" />
                  <p>We evaluate your roof's remaining service life, identifying damaged flashing and inadequate <strong>attic ventilation</strong> that leads to ice damming and mold growth. Ensuring your building envelope is sound allows you to market your home as "maintenance-free," a high-value selling point in the Ontario market.</p>
                </div>
              </div>

              {/* What We Inspect Grid */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatWeInspect.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Seller FAQ</h2>
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

            {/* --- SIDEBAR --- */}
            <div className="space-y-6">
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Why Pre-List with ASADS?</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button asChild className="w-full" size="lg"><Link to="/booking">Book Your Audit</Link></Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Add-On Services</h3>
                  <ul className="space-y-3">
                    {relatedServices.map((service) => (
                      <li key={service.href}>
                        <Link to={normalizePath(service.href)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <ArrowRight className="h-4 w-4" />{service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICE AREAS GRID --- */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Seller Audits Available Ontario-Wide</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featuredLocations.map((loc) => (
              <Link key={loc.slug} to={`/locations/${loc.slug}`} className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors text-sm text-foreground">
                <MapPin className="h-4 w-4 text-primary" />{loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Ready to Protect Your Equity?</h2>
          <p className="text-xl opacity-90 mb-8">Secure your sale price and prevent last-minute negotiations with a professional Pre-Listing Audit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/booking">Book Your Audit Now</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><a href="tel:+16478019311">(647) 801-9311</a></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
