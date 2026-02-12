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
  Mail,
  Trees,
  Wind,
  Droplets,
  Factory,
  GraduationCap,
  Building2,
  LandPlot,
  FactoryIcon,
  Castle
} from "lucide-react";

// Primary keyword: "home inspection cambridge"
// Secondary keywords: "home inspection cambridge ontario", "home inspection waterloo region", "cambridge home inspectors"
const primaryKeyword = "home inspection cambridge";
const secondaryKeywords = [
  "home inspection cambridge ontario",
  "home inspection waterloo region", 
  "cambridge home inspectors",
  "home inspection kitchener waterloo cambridge",
  "cambridge ontario home inspection"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a home in Cambridge",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Cambridge"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built homes in Cambridge",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Cambridge"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Cambridge property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Cambridge"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial and investment property inspections in Cambridge",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Cambridge"
  },
  { 
    title: "Condominium Inspection", 
    href: "/services/condo-inspection",
    description: "Condominium inspections in Cambridge's growing condo market",
    icon: <Building2 className="h-6 w-6" />,
    anchorText: "condo inspection Cambridge"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for homes in Cambridge and Waterloo Region",
    icon: <Wind className="h-6 w-6" />,
    anchorText: "radon testing in Cambridge"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Cambridge homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Cambridge"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for Cambridge properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Cambridge"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Cambridge"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for Cambridge homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Cambridge"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older homes in Cambridge",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Cambridge"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for heritage Cambridge properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Cambridge"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in Cambridge homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Cambridge"
  },
  { 
    title: "Investment Property Inspection", 
    href: "/services/investment-property",
    description: "Inspections for rental and investment properties in Cambridge",
    icon: <DollarSign className="h-6 w-6" />,
    anchorText: "investment property inspection Cambridge"
  }
];

// Cambridge areas - NO LINKS, just display
const cambridgeAreas = [
  { name: "Galt", service: "Home Inspection" },
  { name: "Preston", service: "Home Inspection" },
  { name: "Hespeler", service: "Home Inspection" },
  { name: "Blair", service: "Home Inspection" },
  { name: "Doon", service: "Home Inspection" },
  { name: "Eastbridge", service: "Home Inspection" },
  { name: "Highland Park", service: "Home Inspection" },
  { name: "Elgin Park", service: "Home Inspection" },
  { name: "Saginaw", service: "Home Inspection" },
  { name: "Chicopee", service: "Home Inspection" },
  { name: "Shade's Mills", service: "Home Inspection" },
  { name: "Riverside Park", service: "Home Inspection" },
  { name: "Moss Park", service: "Home Inspection" },
  { name: "Hidden Valley", service: "Home Inspection" },
  { name: "Sunview", service: "Home Inspection" },
  { name: "Country Hills", service: "Home Inspection" }
];

// Nearby towns - NO LINKS
const nearbyTowns = [
  "Kitchener",
  "Waterloo", 
  "Guelph",
  "Brantford",
  "Woodstock",
  "Paris",
  "Ayr",
  "New Hamburg",
  "Stratford",
  "Elmira",
  "Fergus",
  "Elora"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Cambridge | Professional Property Inspections in Cambridge, ON | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Cambridge? ASADS provides professional property inspections with licensed inspectors, same-day reports, and thorough evaluations. Serving Cambridge, Kitchener, Waterloo, and surrounding areas.";
const pageTitle = "Professional Home Inspection Services in Cambridge, Ontario | ASADS Certified Inspectors";
const price = "$350-$600";
const duration = "2 Hours";

// Comprehensive inspection checklist for Cambridge properties
const whatWeInspect = [
  "Foundations & Structural Integrity Assessment",
  "Roofing Systems & Attic Ventilation Inspection",
  "Plumbing & Water Heating Systems Evaluation",
  "Electrical Panels & Wiring Safety Check",
  "HVAC Equipment & Ductwork Performance Testing",
  "Windows, Doors & Exterior Envelope Examination",
  "Insulation & Vapor Barrier Assessment",
  "Basement Waterproofing & Drainage Analysis",
  "Garage & Outbuilding Evaluations",
  "Deck, Porch & Outdoor Structure Safety Checks"
];

// E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
const expertisePoints = [
  "Licensed Ontario Home Inspectors",
  "InterNACHI Certified Professionals",
  "10+ Years Cambridge Property Inspection Experience",
  "Heritage Home Specialists",
  "New Construction Code Compliance Experts",
  "Condominium Inspection Specialists",
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
  "Flexible Scheduling for Busy Families",
  "Pre-Inspection Consultation Included",
  "Post-Inspection Review Session",
  "Investment Property Assessments",
  "Free Follow-up Questions for 12 Months"
];

// Cambridge-specific content about local considerations
const cambridgeFeatures = [
  {
    icon: <Castle className="h-5 w-5" />,
    title: "Heritage Home Specialists",
    description: "Expert inspections for Cambridge's historic properties in Galt, Preston, and Hespeler with attention to period details."
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Student Rental Property Expertise",
    description: "Comprehensive inspections for investment properties in Cambridge's growing student rental market."
  },
  {
    icon: <FactoryIcon className="h-5 w-5" />,
    title: "New Construction Knowledge",
    description: "Detailed inspections for Cambridge's new developments and subdivisions with modern building code compliance."
  },
  {
    icon: <LandPlot className="h-5 w-5" />,
    title: "Riverfront Property Experience",
    description: "Inspections for properties along the Grand River with attention to flood plain considerations and foundation stability."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Cambridge?",
    answer: `The average <strong>home inspection Cambridge cost</strong> ranges from $350 to $600 for a standard residential property. Condominium inspections typically range from $350-$500, while larger heritage homes or investment properties may range from $650-$950. We provide detailed quotes based on your specific property's size, age, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Cambridge?",
    answer: `A comprehensive <strong>home inspection in Cambridge</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice and include specialized assessments for Cambridge's historic properties when applicable.`
  },
  {
    question: "How long does a home inspection take in Cambridge?",
    answer: `Most <strong>Cambridge home inspections</strong> take 2-3 hours depending on property size and age. Heritage homes and larger properties require additional time for thorough assessment of period features and multiple systems. We never rush inspections and allocate sufficient time to properly assess every component of your Cambridge property.`
  },
  {
    question: "Should I attend the home inspection in Cambridge?",
    answer: `Yes, we strongly recommend attending your <strong>Cambridge home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for Cambridge's specific climate considerations, and understand the significance of any issues discovered. We provide valuable insights about heritage home maintenance and local building practices.`
  },
  {
    question: "What are the most common issues found in Cambridge home inspections?",
    answer: `Common issues in <strong>Cambridge homes</strong> include: foundation settling in older heritage properties, knob-and-tube wiring in pre-1950 homes, roof issues on Victorian and Edwardian houses, basement moisture in century homes along the river, insulation deficiencies in older construction, and aging plumbing in historic districts. Newer homes may have different concerns like modern material failures.`
  },
  {
    question: "How soon will I receive my inspection report in Cambridge?",
    answer: `We provide <strong>same-day digital reports</strong> for all Cambridge home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your Cambridge property.`
  },
  {
    question: "Do you inspect heritage properties in Cambridge?",
    answer: `Yes, we specialize in <strong>heritage home inspections in Cambridge</strong>. Our inspections include assessment of period-specific construction methods, original features preservation, and modern updates compatibility. We understand the unique considerations of Cambridge's historic districts in Galt, Preston, and Hespeler, including heritage designation implications.`
  },
  {
    question: "What areas of Cambridge do you service?",
    answer: `We provide <strong>home inspection services throughout Cambridge</strong> including Galt, Preston, Hespeler, Blair, and all surrounding neighborhoods. We also serve nearby communities in Waterloo Region including Kitchener, Waterloo, Guelph, and Brantford.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Michael Roberts",
    location: "Galt, Cambridge",
    content: "The ASADS home inspection for our heritage property in Galt was exceptional. The inspector understood Victorian construction and identified several critical issues with the foundation and electrical system. The detailed report helped us negotiate a better price and plan essential repairs. Highly recommended for Cambridge heritage homes!",
    rating: 5
  },
  {
    name: "Jennifer Lee",
    location: "Preston Area",
    content: "As first-time home buyers in Cambridge, we were overwhelmed by the process. ASADS made it easy to understand and provided exceptional service. Their knowledge of local building practices and attention to detail gave us confidence in our purchase. The same-day report was incredibly helpful during negotiations.",
    rating: 5
  },
  {
    name: "David Chen",
    location: "Hespeler",
    content: "We've used ASADS for multiple investment property inspections in Cambridge. Their thorough approach and understanding of rental property requirements have saved us thousands in unexpected repairs. The thermal imaging service identified hidden moisture issues in a basement that would have been costly to fix later.",
    rating: 5
  }
];

export default function Cambridge() {
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

  // Comprehensive Schema Markup for Cambridge
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Cambridge",
    "description": "Professional home inspection services in Cambridge, Ontario providing comprehensive property assessments, heritage home inspections, and investment property evaluations.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "cambridge@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cambridge Service Area",
      "addressLocality": "Cambridge",
      "addressRegion": "ON",
      "postalCode": "N3C",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.3616,
      "longitude": -80.3144
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.3616,
        "longitude": -80.3144
      },
      "geoRadius": "40000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Cambridge"
      },
      {
        "@type": "City",
        "name": "Kitchener"
      },
      {
        "@type": "City",
        "name": "Waterloo"
      },
      {
        "@type": "City",
        "name": "Guelph"
      },
      {
        "@type": "City",
        "name": "Brantford"
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
    "image": `${SITE_URL}/images/cambridge-home-inspection.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "142",
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
      "name": "Cambridge"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cambridge Home Inspection Services",
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
    "description": "Professional home inspection services in Cambridge including pre-purchase inspections, heritage property assessments, condominium inspections, radon testing, mold inspection, thermal imaging, and investment property evaluations."
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
        "name": "Cambridge Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors cambridge ontario, property inspection waterloo region`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-cambridge-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-cambridge-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Cambridge" />
        <meta name="geo.position" content="43.3616;-80.3144" />
        <meta name="ICBM" content="43.3616, -80.3144" />
        
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
                Cambridge's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">Cambridge, Ontario</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Cambridge</strong>? ASADS provides professional property assessments with licensed inspectors, heritage home expertise, and same-day digital reports. Serving Cambridge, Kitchener, Waterloo, and surrounding Waterloo Region.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" />
                <span>2-3 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" />
                <span>Starting at $350</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Shield className="h-5 w-5" />
                <span>Licensed Heritage Property Inspectors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Cambridge Inspection
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

      {/* Cambridge Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Cambridge</strong>, choosing licensed professionals with local heritage property expertise is essential for protecting your investment in this historic community. ASADS Home Inspection provides comprehensive property assessments throughout Cambridge and surrounding Waterloo Region, helping homeowners, buyers, and sellers make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in Cambridge, Ontario
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Cambridge</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From heritage home evaluations to modern condominium assessments, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Cambridge Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Cambridge cost</strong> ranges from $450 to $750 for a standard residential property. Heritage homes and larger properties may range from $650-$950. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Cambridge's diverse property market.
                  </p>
                </div>
              </div>
            </div>

            {/* Cambridge-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Cambridge-Specific Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cambridgeFeatures.map((feature, index) => (
                  <div key={index} className="bg-card p-6 rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Inspect - Table Format for Featured Snippet */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Complete Cambridge Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Cambridge property.
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
                  14+ Professional Home Inspection Services in Cambridge
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Cambridge property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations tailored to Cambridge's diverse housing market.
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
                Why Choose ASADS for Home Inspection in Cambridge?
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
                Cambridge Areas We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {cambridgeAreas.map((area, index) => (
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
                  Also serving nearby communities including Kitchener, Waterloo, Guelph, Brantford, and throughout Waterloo Region.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Cambridge
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
                What Cambridge Homeowners Say About Our Inspections
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
                Ready to Schedule Your Cambridge Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in Cambridge today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Waterloo Region.
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
                    Book Your Cambridge Inspection Online
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
