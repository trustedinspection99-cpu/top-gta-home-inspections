import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
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
  Building,
  Thermometer,
  DollarSign,
  ClipboardCheck,
  Wrench,
  Search,
  Users,
  Award
} from "lucide-react";

// Toronto neighborhoods and suburbs
const torontoNeighborhoods = [
  { name: "Downtown Toronto", slug: "downtown-toronto" },
  { name: "North York", slug: "north-york" },
  { name: "Scarborough", slug: "scarborough" },
  { name: "Etobicoke", slug: "etobicoke" },
  { name: "Midtown Toronto", slug: "midtown-toronto" },
  { name: "York", slug: "york-toronto" },
  { name: "East York", slug: "east-york" },
  { name: "The Beaches", slug: "the-beaches" },
  { name: "Liberty Village", slug: "liberty-village" },
  { name: "Distillery District", slug: "distillery-district" },
  { name: "Financial District", slug: "financial-district" },
  { name: "Annex", slug: "the-annex" }
];

const gtaSuburbs = [
  { name: "Mississauga", slug: "mississauga" },
  { name: "Brampton", slug: "brampton" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Markham", slug: "markham" },
  { name: "Oakville", slug: "oakville" },
  { name: "Richmond Hill", slug: "richmond-hill" },
  { name: "Pickering", slug: "pickering" },
  { name: "Ajax", slug: "ajax" },
  { name: "Whitby", slug: "whitby" },
  { name: "Oshawa", slug: "oshawa" },
  { name: "Burlington", slug: "burlington" },
  { name: "Milton", slug: "milton" }
];

const title = "Home Inspection Toronto | Professional House & Property Inspectors";
const metaTitle = "Home Inspection Toronto | Best Home Inspection Companies | ASADS";
const metaDescription = "Looking for home inspection in Toronto? ASADS provides professional home inspection services across Toronto with licensed inspectors, same-day reports, and competitive pricing. Book your Toronto home inspection today.";
const price = "$450-$750";
const duration = "2-4 Hours";

const whatWeInspect = [
  "Foundations & Structural Integrity",
  "Roofing Systems & Attic Ventilation",
  "Plumbing & Water Heating Systems",
  "Electrical Panels & Wiring",
  "HVAC Equipment & Ductwork",
  "Windows, Doors & Exterior",
  "Insulation & Vapor Barriers",
  "Basement Waterproofing & Drainage",
];

const torontoFeatures = [
  {
    title: "Toronto-Specific Expertise",
    description: "Our inspectors understand Toronto's diverse architecture, from Victorian homes to modern condos, and common issues in each."
  },
  {
    title: "Local Building Code Knowledge",
    description: "Familiar with Toronto building codes, heritage property regulations, and municipal bylaws affecting home inspections."
  },
  {
    title: "Condo & High-Rise Specialists",
    description: "Specialized in Toronto condo inspections, including unit assessments and building Status Certificate reviews."
  },
  {
    title: "Seasonal Toronto Considerations",
    description: "Understanding of Toronto's climate effects: winter ice damming, summer humidity impacts, and foundation movement."
  }
];

const benefits = [
  "Licensed Toronto Home Inspectors",
  "Same-Day Digital Reports",
  "Thermal Imaging Available",
  "Condo & High-Rise Expertise",
  "Heritage Property Experience",
  "Flexible Evening & Weekend Appointments",
  "Detailed Photo Documentation",
  "Lifetime Technical Support",
];

// FAQs based on actual search queries people use
const faqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer: "Home inspection costs in Toronto typically range from $450 to $750, depending on property size, age, and additional services like thermal imaging. Contact us for an exact quote based on your specific Toronto property."
  },
  {
    question: "What does a home inspection include in Toronto?",
    answer: "A standard home inspection in Toronto includes evaluation of structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, interior finishes, exterior envelope, and basement/crawl space conditions, following Ontario home inspection standards."
  },
  {
    question: "How do I find the best home inspection companies in Toronto?",
    answer: "Look for licensed, insured inspectors with Toronto-specific experience, positive reviews, clear pricing, and comprehensive reporting. ASADS Home Inspection meets all these criteria for Toronto home inspections."
  },
  {
    question: "What is included in a standard home inspection in Toronto?",
    answer: "Our standard inspection covers all major systems including foundation, roof, plumbing, electrical, HVAC, windows, doors, insulation, and interior components. We provide detailed reports with photos and recommendations."
  },
  {
    question: "How much does a typical home inspection cost in the Toronto area?",
    answer: "The typical cost for a home inspection in the Toronto area is $450-$750. Condo inspections are generally $350-$550, while larger homes or heritage properties may cost $650-$900."
  },
  {
    question: "What are the biggest red flags in a home inspection?",
    answer: "Major red flags in Toronto homes include foundation cracks, roof leaks, knob and tube wiring, galvanized plumbing, moisture intrusion, and outdated electrical panels. We identify these issues and explain their significance."
  },
  {
    question: "How to book a home inspection appointment in Toronto online?",
    answer: "You can book your Toronto home inspection online through our website booking system, by calling (647) 801-9311, or by emailing toronto@asads.ca. We offer flexible scheduling including evenings and weekends."
  },
  {
    question: "What are the most common home inspection fails in Toronto?",
    answer: "Common issues in Toronto homes include roofing problems, electrical safety violations, plumbing leaks, foundation cracks, inadequate insulation, and HVAC system deficiencies. Our inspectors are trained to identify these problems."
  }
];

const relatedServices = [
  { title: "Condo Inspection Toronto", href: "/services/condo-inspection" },
  { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
  { title: "New Construction Inspection", href: "/services/new-construction" },
  { title: "Thermal Imaging Toronto", href: "/services/thermal-imaging" },
];

// Popular search terms people actually use
const popularSearches = [
  "home inspection companies toronto",
  "home inspection toronto cost",
  "best home inspection toronto",
  "home inspection condo toronto",
  "home inspection in toronto",
  "house inspection toronto",
  "property inspection toronto",
  "home inspector toronto"
];

export default function Toronto() {
  const location = useLocation();
  const pageUrl = getCanonicalUrl(location.pathname);

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:site_name" content="ASADS Home Inspection Toronto" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/images/toronto-home-inspection-og.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/toronto-home-inspection-twitter.jpg`} />
        
        {/* Geo tags for Toronto */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Toronto" />
        <meta name="geo.position" content="43.653226;-79.383184" />
        <meta name="ICBM" content="43.653226, -79.383184" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ASADS Home Inspection Toronto",
            "image": `${SITE_URL}/images/logo.png`,
            "@id": `${SITE_URL}/locations/toronto`,
            "url": pageUrl,
            "telephone": "+16478019311",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.653226,
              "longitude": -79.383184
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "07:00",
              "closes": "22:00"
            },
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "247"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Home Inspection <span className="text-secondary">Toronto</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Professional home inspection services in Toronto with licensed inspectors, 
              same-day reports, and competitive pricing. Serving Toronto and surrounding areas.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5" />
                <span>Licensed Toronto Inspectors</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span>Same-Day Reports</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <DollarSign className="h-5 w-5" />
                <span>Competitive Pricing</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Toronto Inspection
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+16478019311">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (647) 801-9311
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Searches Section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Search className="h-6 w-6 text-primary" />
              Toronto Home Inspection Services
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Find professional home inspection services in Toronto for all property types. 
              We provide comprehensive assessments for houses, condos, and investment properties throughout Toronto.
            </p>
          </div>
          
          {/* Popular search terms displayed naturally */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Popular Toronto Home Inspection Queries
              </h3>
              <ul className="space-y-2">
                {popularSearches.slice(0, 4).map((search, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {search}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Why Choose ASADS in Toronto
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  Top-rated home inspection services near me in Toronto
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  Find reputable home inspection companies serving Toronto
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  Questions to ask a potential home inspector in Toronto
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  How to book a home inspection appointment in Toronto online
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Professional Home Inspection Services in Toronto
                </h2>
                
                <div className="text-muted-foreground space-y-4">
                  <p>
                    When searching for <strong>home inspection companies in Toronto</strong>, 
                    it's essential to choose licensed professionals with local expertise. 
                    At ASADS, we provide comprehensive <strong>home inspection in Toronto</strong> 
                    that covers all major systems and components of your property.
                  </p>
                  
                  <p>
                    Our <strong>Toronto home inspection</strong> services are designed to give you peace of mind 
                    whether you're buying, selling, or maintaining a property in the GTA. 
                    From <strong>home inspection condo Toronto</strong> assessments to full house inspections, 
                    our licensed inspectors deliver detailed reports with clear recommendations.
                  </p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                    What to Expect from Your Toronto Home Inspection
                  </h3>
                  
                  <p>
                    A typical <strong>home inspection in Toronto</strong> includes evaluation of structural components, 
                    foundation integrity, roofing systems, plumbing, electrical systems, HVAC equipment, 
                    and interior finishes. We're familiar with common issues in Toronto homes, 
                    including those found in heritage properties and modern condos alike.
                  </p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                    Average Cost of Home Inspection in Toronto
                  </h3>
                  
                  <p>
                    The average <strong>home inspection Toronto cost</strong> ranges from ${price.replace('$', '')}, 
                    depending on property size and additional services. While price is important, 
                    the value comes from thorough inspection and detailed reporting that can save 
                    you thousands in unexpected repairs.
                  </p>
                </div>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Comprehensive Toronto Home Inspection Scope
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatWeInspect.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <ClipboardCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toronto-Specific Services */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Specialized Toronto Home Inspection Services
                </h2>
                <div className="grid gap-6">
                  {[
                    {
                      icon: <Building className="h-6 w-6 text-primary" />,
                      title: "Condo Inspection Toronto",
                      description: "Specialized inspections for Toronto's extensive condo market, including unit assessments and building Status Certificate reviews.",
                      href: "/services/condo-inspection"
                    },
                    {
                      icon: <Home className="h-6 w-6 text-primary" />,
                      title: "Pre-Purchase Home Inspection Toronto",
                      description: "Comprehensive evaluations before property purchase to identify issues and provide negotiation leverage.",
                      href: "/services/pre-purchase"
                    },
                    {
                      icon: <Wrench className="h-6 w-6 text-primary" />,
                      title: "Heritage Property Inspection",
                      description: "Expert assessments of Toronto's heritage homes with knowledge of original materials and preservation requirements.",
                      href: "/services/heritage-inspection"
                    },
                    {
                      icon: <Thermometer className="h-6 w-6 text-primary" />,
                      title: "Thermal Imaging Toronto",
                      description: "Infrared scanning to detect hidden moisture, insulation gaps, and electrical issues not visible to the naked eye.",
                      href: "/services/thermal-imaging"
                    }
                  ].map((service) => (
                    <Card key={service.title} className="border-border/50 hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                              {service.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">{service.description}</p>
                            <Link 
                              to={normalizePath(service.href)}
                              className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                            >
                              Learn more <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Frequently Asked Questions About Home Inspection in Toronto
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Booking Card */}
              <Card className="border-border/50 sticky top-24 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Book Your Toronto Inspection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule your home inspection in Toronto today
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Starting Price</span>
                      <span className="font-bold text-xl text-foreground">{price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Inspection Time</span>
                      <span className="font-medium text-foreground">{duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Report Delivery</span>
                      <span className="font-medium text-foreground">Same Day</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full" size="lg">
                    <Link to="/booking">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Toronto Inspection
                    </Link>
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      or call <a href="tel:+16478019311" className="text-primary hover:underline font-medium">(647) 801-9311</a>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Serving Toronto and GTA
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Toronto Service Areas
                  </h3>
                  <div className="space-y-3">
                    {torontoNeighborhoods.slice(0, 8).map((hood) => (
                      <div key={hood.slug} className="flex items-center justify-between">
                        <Link 
                          to={`/locations/toronto/${hood.slug}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {hood.name}
                        </Link>
                        <span className="text-xs bg-muted px-2 py-1 rounded">✓</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link 
                      to="/locations/toronto/neighborhoods"
                      className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      View all Toronto neighborhoods
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Popular Toronto Services
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((service) => (
                      <li key={service.href}>
                        <Link 
                          to={normalizePath(service.href)}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <span>{service.title}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Why Choose ASADS in Toronto
                  </h3>
                  <ul className="space-y-3">
                    {benefits.slice(0, 6).map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Toronto Neighborhoods Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Home Inspection Services Across Toronto Neighborhoods
            </h2>
            <p className="text-muted-foreground">
              Professional home inspection in Toronto available in all neighborhoods
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {torontoNeighborhoods.map((hood) => (
              <Link
                key={hood.slug}
                to={`/locations/toronto/${hood.slug}`}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
              >
                <MapPin className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{hood.name}</span>
                <span className="text-xs text-muted-foreground mt-1">Home Inspection</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GTA Service Areas */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Also Serving GTA Communities Near Toronto
            </h2>
            <p className="text-muted-foreground">
              Looking for home inspection near Toronto? We service all surrounding GTA areas.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gtaSuburbs.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/home-inspection-${city.slug}`}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
              >
                <MapPin className="h-5 w-5 text-primary mb-2 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium text-foreground">{city.name}</span>
                <span className="text-xs text-muted-foreground mt-1">Near Toronto</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Schedule Your Toronto Home Inspection?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              As one of Toronto's leading home inspection companies, we provide comprehensive 
              property assessments with licensed inspectors, same-day reports, and competitive pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Toronto Inspection Online
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+16478019311">
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Toronto Quote
                </a>
              </Button>
            </div>
            
            <p className="text-sm text-primary-foreground/70 mt-6">
              Serving all Toronto neighborhoods and GTA communities with professional home inspection services.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
                          }
