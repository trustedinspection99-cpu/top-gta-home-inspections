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
  Award,
  Droplets,
  Wind,
  Factory,
  TestTube,
  Water,
  Zap,
  Flame
} from "lucide-react";

// All available service pages based on the provided list
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Comprehensive evaluation before buying a home in Toronto",
    icon: <Home className="h-5 w-5 text-primary" />
  },
  { 
    title: "Condo Inspection", 
    href: "/services/condo",
    description: "Specialized inspections for Toronto condos and high-rises",
    icon: <Building className="h-5 w-5 text-primary" />
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase inspections for newly built Toronto homes",
    icon: <Wrench className="h-5 w-5 text-primary" />
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Toronto property",
    icon: <FileText className="h-5 w-5 text-primary" />
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial property inspections in Toronto",
    icon: <Factory className="h-5 w-5 text-primary" />
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared scanning for hidden moisture and insulation issues",
    icon: <Thermometer className="h-5 w-5 text-primary" />
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for Toronto homes and basements",
    icon: <Wind className="h-5 w-5 text-primary" />
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Mold and moisture assessment in Toronto properties",
    icon: <Droplets className="h-5 w-5 text-primary" />
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos material testing for older Toronto homes",
    icon: <TestTube className="h-5 w-5 text-primary" />
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing in Toronto heritage properties",
    icon: <TestTube className="h-5 w-5 text-primary" />
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "Wood-burning appliance safety inspections in Toronto",
    icon: <Flame className="h-5 w-5 text-primary" />
  },
  { 
    title: "Well Water Testing", 
    href: "/services/well-water-testing",
    description: "Water quality testing for Toronto area wells",
    icon: <Water className="h-5 w-5 text-primary" />
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Sewer line inspection using camera technology in Toronto",
    icon: <Zap className="h-5 w-5 text-primary" />
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality assessments for Toronto homes",
    icon: <Wind className="h-5 w-5 text-primary" />
  }
];

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

// FAQs with natural service page links
const faqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer: `Home inspection costs in Toronto typically range from $450 to $750, depending on property size, age, and additional services like <Link to="/services/thermal-imaging">thermal imaging</Link>. For an exact quote on your Toronto home inspection, contact us directly with your property details.`
  },
  {
    question: "What does a home inspection include in Toronto?",
    answer: `A standard <Link to="/services/pre-purchase">pre-purchase home inspection in Toronto</Link> includes evaluation of structural components, foundation, roof, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior components. We provide detailed reports with photos and recommendations.`
  },
  {
    question: "Do you offer condo inspections in Toronto?",
    answer: `Yes, we specialize in <Link to="/services/condo">condo inspections in Toronto</Link>. Our condo inspections focus on the unit's interior systems, including HVAC units within the unit, electrical panels, plumbing fixtures, windows, balconies, and interior finishes. We also review Status Certificates for building health.`
  },
  {
    question: "What specialized testing do you offer for Toronto homes?",
    answer: `We offer comprehensive specialized testing including <Link to="/services/radon-testing">radon testing</Link> for basements, <Link to="/services/mold-inspection">mold inspection</Link> for moisture issues, <Link to="/services/asbestos-testing">asbestos testing</Link> for older homes, <Link to="/services/lead-paint-testing">lead paint testing</Link> for heritage properties, and <Link to="/services/well-water-testing">well water testing</Link> for rural properties near Toronto.`
  },
  {
    question: "Do you inspect new construction homes in Toronto?",
    answer: `Yes, we provide <Link to="/services/new-construction">new construction inspections in Toronto</Link> at various phases of construction, including pre-drywall and final walkthroughs. This ensures quality construction and identifies issues before closing.`
  },
  {
    question: "What is a WETT inspection and do I need one in Toronto?",
    answer: `A <Link to="/services/wett">WETT inspection</Link> (Wood Energy Technology Transfer) is required for wood-burning fireplaces and stoves in Toronto homes. It verifies safe installation and proper clearances. We recommend this inspection for any Toronto home with wood-burning appliances.`
  },
  {
    question: "Do you offer sewer line inspections in Toronto?",
    answer: `Yes, our <Link to="/services/sewer-scope">sewer scope inspection service</Link> uses camera technology to inspect sewer lines in Toronto homes. This is especially important for older properties with clay pipes that may have root intrusion or damage.`
  },
  {
    question: "Can you test indoor air quality in my Toronto home?",
    answer: `Yes, we offer <Link to="/services/air-quality">air quality testing in Toronto</Link> homes to identify pollutants, allergens, and contaminants that may affect your family's health. This service is especially important for homes with mold concerns or poor ventilation.`
  }
];

export default function Toronto() {
  const location = useLocation();
  const pageUrl = getCanonicalUrl(location.pathname);

  // Function to render links in FAQ answers
  const renderAnswerWithLinks = (answer: string) => {
    const parts = answer.split(/(<Link[^>]*>[^<]*<\/Link>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<Link')) {
        const match = part.match(/<Link to="([^"]+)">([^<]+)<\/Link>/);
        if (match) {
          return (
            <Link 
              key={index} 
              to={normalizePath(match[1])} 
              className="text-primary hover:underline"
            >
              {match[2]}
            </Link>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

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
                "text": faq.answer.replace(/<[^>]+>/g, '') // Remove HTML tags for schema
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

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction with service links */}
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Professional Home Inspection Services in Toronto
                </h2>
                
                <div className="text-muted-foreground space-y-4">
                  <p>
                    When searching for home inspection companies in Toronto, 
                    it's essential to choose licensed professionals with local expertise. 
                    At ASADS, we provide comprehensive <Link to="/services/pre-purchase" className="text-primary hover:underline">pre-purchase home inspection in Toronto</Link> 
                    that covers all major systems and components of your property.
                  </p>
                  
                  <p>
                    Our <strong>Toronto home inspection</strong> services include <Link to="/services/condo" className="text-primary hover:underline">condo inspections</Link>, 
                    <Link to="/services/new-construction" className="text-primary hover:underline"> new construction inspections</Link>, and 
                    specialized services like <Link to="/services/thermal-imaging" className="text-primary hover:underline">thermal imaging</Link> and 
                    <Link to="/services/radon-testing" className="text-primary hover:underline"> radon testing</Link>. 
                    From heritage properties to modern high-rises, our licensed inspectors deliver detailed reports with clear recommendations.
                  </p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                    Comprehensive Toronto Home Inspection Services
                  </h3>
                  
                  <p>
                    We offer a full range of inspection services for Toronto properties. Our 
                    <Link to="/services/pre-purchase" className="text-primary hover:underline"> pre-purchase inspections</Link> help buyers make informed decisions, 
                    while <Link to="/services/pre-listing" className="text-primary hover:underline">pre-listing inspections</Link> give sellers confidence before putting their 
                    homes on the market. For older Toronto homes, we provide 
                    <Link to="/services/asbestos-testing" className="text-primary hover:underline"> asbestos testing</Link> and 
                    <Link to="/services/lead-paint-testing" className="text-primary hover:underline"> lead paint testing</Link> to ensure safety.
                  </p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                    Specialized Testing Services in Toronto
                  </h3>
                  
                  <p>
                    Beyond standard inspections, we offer specialized testing including 
                    <Link to="/services/mold-inspection" className="text-primary hover:underline"> mold inspection</Link> for moisture problems, 
                    <Link to="/services/air-quality" className="text-primary hover:underline"> air quality testing</Link> for indoor pollutants, 
                    <Link to="/services/well-water-testing" className="text-primary hover:underline"> well water testing</Link> for rural properties, and 
                    <Link to="/services/wett" className="text-primary hover:underline"> WETT inspections</Link> for wood-burning appliances. 
                    For sewer line concerns, our <Link to="/services/sewer-scope" className="text-primary hover:underline">sewer scope inspections</Link> use camera technology to identify issues.
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

              {/* Complete Services Grid */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  All Our Toronto Home Inspection Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allServices.map((service) => (
                    <Link 
                      key={service.href}
                      to={normalizePath(service.href)}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Commercial Services Mention */}
              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Factory className="h-6 w-6 text-primary" />
                  Commercial Property Inspections in Toronto
                </h3>
                <p className="text-muted-foreground mb-4">
                  In addition to residential services, we provide comprehensive 
                  <Link to="/services/commercial" className="text-primary hover:underline font-medium"> commercial property inspections in Toronto</Link>. 
                  Our commercial inspections cover retail spaces, office buildings, multi-unit residential buildings, 
                  and industrial properties throughout the GTA.
                </p>
                <Link 
                  to="/services/commercial" 
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Learn about commercial inspections <ArrowRight className="h-4 w-4" />
                </Link>
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
                      <p className="text-muted-foreground">
                        {renderAnswerWithLinks(faq.answer)}
                      </p>
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

              {/* Popular Services */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Popular Toronto Services
                  </h3>
                  <ul className="space-y-3">
                    {allServices.slice(0, 6).map((service) => (
                      <li key={service.href}>
                        <Link 
                          to={normalizePath(service.href)}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <span className="flex items-center gap-2">
                            {service.icon}
                            {service.title}
                          </span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link 
                      to="/services"
                      className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      View all services <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
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

              {/* Service Areas */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Toronto Service Areas
                  </h3>
                  <div className="space-y-3">
                    {torontoNeighborhoods.slice(0, 6).map((hood) => (
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
              Choose from our comprehensive range of Toronto home inspection services, 
              including <Link to="/services/pre-purchase" className="text-secondary hover:underline">pre-purchase inspections</Link>, 
              <Link to="/services/condo" className="text-secondary hover:underline"> condo inspections</Link>, 
              <Link to="/services/new-construction" className="text-secondary hover:underline"> new construction inspections</Link>, 
              and specialized testing services.
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
