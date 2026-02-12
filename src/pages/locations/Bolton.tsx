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
  Users,
  Star,
  Award,
  BadgeCheck,
  ThumbsUp,
  BookOpen,
  PhoneCall,
  Mail
} from "lucide-react";

// Primary keyword: "home inspection bolton"
// Secondary keywords: "home inspection bolton ontario", "home inspection caledon", "bolton home inspectors"
const primaryKeyword = "home inspection bolton";
const secondaryKeywords = [
  "home inspection bolton ontario",
  "home inspection caledon", 
  "bolton home inspectors",
  "home inspection brampton bolton",
  "bolton ontario home inspection"
];

// Service pages with optimized anchor text - EXACTLY 14 SERVICES LIKE TORONTO
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a property in Bolton",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Bolton"
  },
  { 
    title: "Condo Inspection", 
    href: "/services/condo",  // FIXED: Match Toronto's route
    description: "Specialized condo inspections in Bolton buildings",
    icon: <Building className="h-6 w-6" />,
    anchorText: "condo inspection Bolton"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built Bolton homes",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Bolton"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Bolton property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Bolton"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial property inspections throughout Bolton",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Bolton"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for Bolton homes and basements",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "radon testing in Bolton"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Bolton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Bolton"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for Bolton properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Bolton"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances in Bolton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Bolton"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for Bolton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Bolton"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older Bolton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Bolton"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for Bolton properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Bolton"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in Bolton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Bolton"
  },
  { 
    title: "Well Water Testing", 
    href: "/services/well-water-testing",  // LAST ITEM - POSITION 14
    description: "Well water quality testing for properties near Bolton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "well water testing Bolton"
  }
];

// Bolton areas - NO LINKS, just display
const boltonAreas = [
  { name: "Downtown Bolton", service: "Home Inspection" },
  { name: "North Hill", service: "Home Inspection" },
  { name: "Rural Bolton", service: "Home Inspection" },
  { name: "Industrial Area", service: "Home Inspection" },
  { name: "Heritage District", service: "Home Inspection" },
  { name: "Residential Core", service: "Home Inspection" },
  { name: "Commercial District", service: "Home Inspection" },
  { name: "Suburban Bolton", service: "Home Inspection" },
  { name: "Humber River Area", service: "Home Inspection" },
  { name: "Nearby Farmlands", service: "Home Inspection" },
  { name: "New Developments", service: "Home Inspection" },
  { name: "Established Neighborhoods", service: "Home Inspection" },
  { name: "Mixed-Use Areas", service: "Home Inspection" },
  { name: "Waterfront Properties", service: "Home Inspection" },
  { name: "Transit-Oriented Areas", service: "Home Inspection" },
  { name: "Historical Sections", service: "Home Inspection" }
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Bolton | Professional House Inspectors & Property Assessments | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Bolton? ASADS provides professional home inspection services with licensed inspectors, same-day reports, and competitive pricing starting at $500. Serving Bolton, Caledon, Brampton, and all Peel Region communities.";
const pageTitle = "Professional Home Inspection Services in Bolton | ASADS Certified Inspectors";
const price = "$350-$600";
const duration = "2 Hours";

// Comprehensive inspection checklist
const whatWeInspect = [
  "Foundations & Structural Integrity Assessment",
  "Roofing Systems & Attic Ventilation Inspection",
  "Plumbing & Water Heating Systems Evaluation",
  "Electrical Panels & Wiring Safety Check",
  "HVAC Equipment & Ductwork Performance Testing",
  "Windows, Doors & Exterior Envelope Examination",
  "Insulation & Vapor Barrier Assessment",
  "Basement Waterproofing & Drainage Analysis",
  "Interior Finishes & Safety Features Review",
  "Exterior Grading & Landscaping Evaluation"
];

// E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
const expertisePoints = [
  "Licensed Ontario Home Inspectors",
  "InterNACHI Certified Professionals",
  "10+ Years Bolton Home Inspection Experience",
  "Bolton Building Code Specialists",
  "Industrial Property Inspection Experts",
  "Condo & Building Specialists",
  "Thermal Imaging Certified Technicians",
  "Radon Measurement Certified",
  "WETT Certified Wood-Burning Appliance Inspectors",
  "OAHI Member in Good Standing"
];

// Benefits for users
const benefits = [
  "Same-Day Digital Inspection Reports",
  "Detailed Photo Documentation (100+ Photos)",
  "Thermal Imaging & Moisture Detection",
  "24/7 Online Report Access",
  "Lifetime Technical Support",
  "Flexible Evening & Weekend Appointments",
  "Pre-Inspection Consultation Included",
  "Post-Inspection Review Session",
  "Priority Emergency Re-inspections",
  "Free Follow-up Questions for 12 Months"
];

// Comprehensive FAQ based on search intent - EXACTLY 8 LIKE TORONTO
const faqs = [
  {
    question: "How much does a home inspection cost in Bolton?",
    answer: `The average <strong>home inspection Bolton cost</strong> ranges from $350 to $600 for a standard single-family home. Condo inspections typically cost $450-$650, while larger homes or properties requiring additional services like <Link to="/services/thermal-imaging">thermal imaging</Link> may range from $600-$950. We provide detailed quotes based on your specific Bolton property's size, age, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Bolton?",
    answer: `A comprehensive <strong>home inspection in Bolton</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice and include detailed reporting with high-resolution photos of all findings.`
  },
  {
    question: "How long does a home inspection take in Bolton?",
    answer: `Most <strong>Bolton home inspections</strong> take 2-3 hours depending on property size and complexity. Condominium unit inspections typically take 1.5-2.5 hours, while larger homes (over 3,000 sq ft) may require 3-5 hours for thorough evaluation. We never rush inspections and allocate sufficient time to properly assess every component of your Bolton property.`
  },
  {
    question: "Should I attend the home inspection in Bolton?",
    answer: `Yes, we strongly recommend attending your <strong>Bolton home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements, and understand the significance of any issues discovered. We provide valuable insights about your specific Bolton home that you won't get from just reading the report.`
  },
  {
    question: "What are the most common issues found in Bolton home inspections?",
    answer: `Common issues in <strong>Bolton homes</strong> include: foundation settling in older properties, moisture issues in basements, aging electrical systems in heritage homes, roof issues on older buildings, insulation deficiencies, plumbing concerns in industrial properties, and updates needed in older homes.`
  },
  {
    question: "How soon will I receive my inspection report in Bolton?",
    answer: `We provide <strong>same-day digital reports</strong> for all Bolton home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your Bolton property.`
  },
  {
    question: "Do you inspect condos and industrial properties in Bolton?",
    answer: `Yes, we specialize in <Link to="/services/condo">condo inspections in Bolton</Link>. Our condo inspections focus on the unit's interior systems including HVAC units, electrical panels, plumbing fixtures, windows, and interior finishes. We also provide comprehensive industrial property inspections with attention to commercial considerations.`
  },
  {
    question: "What areas of Bolton do you service?",
    answer: `We provide <strong>home inspection services throughout Bolton</strong> including Downtown Bolton, North Hill, Industrial Area, Heritage District, and all surrounding neighborhoods. We also serve the entire Greater Toronto Area including Caledon, Brampton, Vaughan, Mississauga, and beyond.`
  }
];

// Testimonials for social proof - EXACTLY 3 LIKE TORONTO
const testimonials = [
  {
    name: "Michael Roberts",
    location: "Downtown Bolton",
    content: "The ASADS home inspection in Bolton was incredibly thorough. The inspector spent over 3 hours examining every detail of our property and identified several issues we would have missed. The same-day report helped us negotiate $12,000 in repairs. Highly recommend for any Bolton home buyer!",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    location: "North Hill, Bolton",
    content: "As first-time home buyers in Bolton, we were nervous about the inspection process. ASADS made it easy to understand and provided exceptional service. Their Bolton-specific knowledge of industrial properties was invaluable. The detailed report gave us complete confidence in our purchase.",
    rating: 5
  },
  {
    name: "David Chen",
    location: "Rural Bolton",
    content: "We've used ASADS for multiple property inspections in the GTA. Their attention to detail is unmatched, especially with industrial Bolton homes. The thermal imaging service identified hidden moisture issues that saved us from a major repair down the line. Professional, knowledgeable, and worth every penny.",
    rating: 5
  }
];

export default function Bolton() {
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
              className="text-primary hover:underline font-medium"
            >
              {match[2]}
            </Link>
          );
        }
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  // Comprehensive Schema Markup
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Bolton",
    "description": "Professional home inspection services in Bolton providing comprehensive property assessments, condo inspections, and specialized testing services throughout Bolton and the Greater Toronto Area.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "bolton@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bolton Service Area",
      "addressLocality": "Bolton",
      "addressRegion": "ON",
      "postalCode": "L7E",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.8797,
      "longitude": -79.7373
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.8797,
        "longitude": -79.7373
      },
      "geoRadius": "50000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Bolton"
      },
      {
        "@type": "City",
        "name": "Caledon"
      },
      {
        "@type": "City",
        "name": "Brampton"
      },
      {
        "@type": "City",
        "name": "Vaughan"
      },
      {
        "@type": "City",
        "name": "Mississauga"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "$$",
    "image": `${SITE_URL}/images/bolton-home-inspection.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "138",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.content,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating.toString(),
        "bestRating": "5"
      },
      "datePublished": "2024-01-15"
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Home Inspection",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bolton"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bolton Home Inspection Services",
      "itemListElement": allServices.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        },
        "position": index + 1
      }))
    },
    "description": "Professional home inspection services in Bolton including pre-purchase inspections, condo inspections, new construction inspections, radon testing, mold inspection, thermal imaging, and specialized property assessments."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]+>/g, '')
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getCanonicalUrl("/")
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": getCanonicalUrl("/locations")
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bolton Home Inspection Services",
        "item": pageUrl
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Keywords for search engines */}
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors bolton, property inspection bolton`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-bolton-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-bolton-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Bolton" />
        <meta name="geo.position" content="43.8797;-79.7373" />
        <meta name="ICBM" content="43.8797, -79.7373" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero Section with Primary Keyword in H1 */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 rounded-full text-sm font-medium">
                <BadgeCheck className="h-4 w-4" />
                Bolton's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">Bolton</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Bolton</strong>? ASADS provides professional property assessments with licensed inspectors, same-day digital reports, and competitive pricing starting at $500. Serving all Bolton areas and Peel Region communities.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" />
                <span>2-4 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" />
                <span>Starting at $500</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Shield className="h-5 w-5" />
                <span>Licensed Bolton Inspectors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Bolton Inspection
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

      {/* Bolton Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Bolton</strong>, choosing licensed professionals with local expertise is essential for protecting your investment. ASADS Home Inspection provides comprehensive property assessments throughout the Greater Toronto Area, helping homeowners, buyers, and sellers make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in Bolton
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Bolton</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From foundation assessments to roofing evaluations, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Bolton Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Bolton cost</strong> ranges from $500 to $800 for a standard single-family home. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* What We Inspect - Table Format for Featured Snippet */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Complete Bolton Home Inspection Checklist
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {whatWeInspect.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <ClipboardCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item}</h3>
                      <p className="text-sm text-muted-foreground">
                        Thorough evaluation and detailed reporting of this critical component in your Bolton property.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Grid with Internal Linking */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  14+ Professional Home Inspection Services in Bolton
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Bolton property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices.map((service, index) => (
                  <Card key={index} className="border-border/50 hover:border-primary hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <Link 
                        to={normalizePath(service.href)}
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                      >
                        Learn more about {service.anchorText} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link 
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <BookOpen className="h-5 w-5" />
                  Explore All Home Inspection Services
                </Link>
              </div>
            </div>

            {/* Why Choose ASADS - E-E-A-T Section */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Why Choose ASADS for Home Inspection in Bolton?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Professional Expertise & Credentials
                  </h3>
                  <ul className="space-y-3">
                    {expertisePoints.slice(0, 5).map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    Customer Benefits & Value
                  </h3>
                  <ul className="space-y-3">
                    {benefits.slice(0, 5).map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Local Service Areas - NO LINKS, just display */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Bolton Areas We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {boltonAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border text-center"
                  >
                    <MapPin className="h-5 w-5 text-primary mb-2" />
                    <span className="text-sm font-medium text-foreground">{area.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">{area.service}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Also serving all GTA communities including Caledon, Brampton, Vaughan, Mississauga, and beyond.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Bolton
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <div className="text-muted-foreground">
                      {renderAnswerWithLinks(faq.answer)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials - Social Proof */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                What Bolton Homeowners Say About Our Inspections
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Final CTA with Multiple Contact Options */}
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Ready to Schedule Your Bolton Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in Bolton today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout the GTA.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <PhoneCall className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Call Us</h3>
                  <a href="tel:+16478019311" className="text-primary hover:underline text-xl font-bold">
                    (647) 801-9311
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Available 7 days a week</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Email Us</h3>
                  <a href="mailto:info@asads.ca" className="text-primary hover:underline text-lg font-bold">
                    info@asads.ca
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Response within 2 hours</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Book Online</h3>
                  <p className="text-muted-foreground">24/7 online booking available</p>
                  <Link 
                    to="/booking"
                    className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Schedule Now
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/booking">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Your Bolton Inspection Online
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                >
                  <a href="tel:+16478019311">
                    <Phone className="mr-2 h-5 w-5" />
                    Call for Immediate Assistance
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
        }
