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
  Factory
} from "lucide-react";

// Primary keyword: "home inspection adelaide metcalfe"
// Secondary keywords: "home inspection adelaide metcalfe township", "home inspection strathroy", "rural home inspection ontario"
const primaryKeyword = "home inspection adelaide metcalfe";
const secondaryKeywords = [
  "home inspection adelaide metcalfe township",
  "home inspection strathroy area", 
  "adelaide metcalfe home inspectors",
  "rural home inspection ontario",
  "well water testing adelaide metcalfe"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a rural property in Adelaide Metcalfe",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Adelaide Metcalfe"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built homes in Adelaide Metcalfe",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Adelaide Metcalfe"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Adelaide Metcalfe property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Adelaide Metcalfe"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial and farm property inspections in Adelaide Metcalfe",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Adelaide Metcalfe"
  },
  { 
    title: "Well Water Testing", 
    href: "/services/well-water-testing",
    description: "Well water quality testing for rural Adelaide Metcalfe properties",
    icon: <Droplets className="h-6 w-6" />,
    anchorText: "well water testing Adelaide Metcalfe"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for homes in Adelaide Metcalfe",
    icon: <Wind className="h-6 w-6" />,
    anchorText: "radon testing in Adelaide Metcalfe"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Adelaide Metcalfe homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Adelaide Metcalfe"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for rural properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Adelaide Metcalfe"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Adelaide Metcalfe"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera septic and sewer line inspections for rural homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Adelaide Metcalfe"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older farmhouses in Adelaide Metcalfe",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Adelaide Metcalfe"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for heritage farm properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Adelaide Metcalfe"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in rural Adelaide Metcalfe homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Adelaide Metcalfe"
  },
  { 
    title: "Septic System Inspection", 
    href: "/services/septic-inspection",
    description: "Septic system evaluations for rural Adelaide Metcalfe properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "septic inspection Adelaide Metcalfe"
  }
];

// Adelaide Metcalfe areas - NO LINKS, just display
const adelaideMetcalfeAreas = [
  { name: "Strathroy", service: "Home Inspection" },
  { name: "Adelaide Township", service: "Home Inspection" },
  { name: "Metcalfe Township", service: "Home Inspection" },
  { name: "Kerwood", service: "Home Inspection" },
  { name: "Ailsa Craig", service: "Home Inspection" },
  { name: "Nairn", service: "Home Inspection" },
  { name: "Cedar Springs", service: "Home Inspection" },
  { name: "Littlewood", service: "Home Inspection" },
  { name: "Longwood", service: "Home Inspection" },
  { name: "Poplar Hill", service: "Home Inspection" },
  { name: "Wardsville", service: "Home Inspection" },
  { name: "Melbourne", service: "Home Inspection" },
  { name: "Ilderton", service: "Home Inspection" },
  { name: "Lucan", service: "Home Inspection" },
  { name: "Komoka", service: "Home Inspection" },
  { name: "Mount Brydges", service: "Home Inspection" }
];

// Nearby towns - NO LINKS
const nearbyTowns = [
  "London",
  "St. Thomas", 
  "Sarnia",
  "Glencoe",
  "Parkhill",
  "Exeter",
  "Grand Bend",
  "Watford",
  "Forest",
  "Petrolia",
  "Wallaceburg",
  "Chatham"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Adelaide Metcalfe | Rural Property Inspections & Well Water Testing | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Adelaide Metcalfe? ASADS provides professional rural property inspections with licensed inspectors, well water testing, septic inspections, and same-day reports. Serving Adelaide Metcalfe Township and surrounding areas.";
const pageTitle = "Professional Rural Home Inspection Services in Adelaide Metcalfe | ASADS Certified Inspectors";
const price = "$350-$600";
const duration = "2 Hours";

// Comprehensive inspection checklist for rural properties
const whatWeInspect = [
  "Foundations & Structural Integrity Assessment",
  "Roofing Systems & Attic Ventilation Inspection",
  "Plumbing & Water Heating Systems Evaluation",
  "Electrical Panels & Wiring Safety Check",
  "HVAC Equipment & Ductwork Performance Testing",
  "Windows, Doors & Exterior Envelope Examination",
  "Insulation & Vapor Barrier Assessment",
  "Basement Waterproofing & Drainage Analysis",
  "Well Water System & Pressure Tank Evaluation",
  "Septic System & Drain Field Assessment"
];

// E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
const expertisePoints = [
  "Licensed Ontario Home Inspectors",
  "InterNACHI Certified Professionals",
  "15+ Years Rural Property Inspection Experience",
  "Well Water System Specialists",
  "Septic System Evaluation Experts",
  "Farm & Acreage Property Specialists",
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
  "Flexible Scheduling for Rural Properties",
  "Pre-Inspection Consultation Included",
  "Post-Inspection Review Session",
  "Well Water & Septic System Assessments",
  "Free Follow-up Questions for 12 Months"
];

// Adelaide Metcalfe-specific content about local considerations
const adelaideMetcalfeFeatures = [
  {
    icon: <Trees className="h-5 w-5" />,
    title: "Rural Property Specialists",
    description: "Expert inspections for Adelaide Metcalfe's farmhouses, acreages, and rural properties with well and septic systems."
  },
  {
    icon: <Droplets className="h-5 w-5" />,
    title: "Well Water System Expertise",
    description: "Comprehensive well water system evaluations, pressure tank assessments, and water quality testing."
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Septic System Knowledge",
    description: "Detailed septic system inspections and drain field evaluations for rural Adelaide Metcalfe properties."
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: "Agricultural Building Experience",
    description: "Inspections of barns, outbuildings, and agricultural structures common in Adelaide Metcalfe."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Adelaide Metcalfe?",
    answer: `The average <strong>home inspection Adelaide Metcalfe cost</strong> ranges from $350 to $600 for a standard rural property. This includes well water and septic system evaluations. Larger farm properties or those requiring additional services like <Link to="/services/thermal-imaging">thermal imaging</Link> or <Link to="/services/radon-testing">radon testing</Link> may range from $650-$1,000. We provide detailed quotes based on your specific property's size, systems, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Adelaide Metcalfe?",
    answer: `A comprehensive <strong>home inspection in Adelaide Metcalfe</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. For rural properties, we also assess well water systems, septic systems, outbuildings, and other rural-specific components. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice.`
  },
  {
    question: "How long does a home inspection take in Adelaide Metcalfe?",
    answer: `Most <strong>Adelaide Metcalfe home inspections</strong> take 2-3 hours depending on property size and complexity. Rural properties require additional time for well water system checks, septic system evaluations, and outbuilding inspections. We never rush inspections and allocate sufficient time to properly assess every component of your rural property.`
  },
  {
    question: "Should I attend the home inspection in Adelaide Metcalfe?",
    answer: `Yes, we strongly recommend attending your <strong>Adelaide Metcalfe home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for rural systems, and understand the significance of any issues discovered. We provide valuable insights about well maintenance, septic care, and other rural property concerns.`
  },
  {
    question: "What are the most common issues found in Adelaide Metcalfe home inspections?",
    answer: `Common issues in <strong>Adelaide Metcalfe homes</strong> include: well water system maintenance (pressure tanks, pumps), septic system concerns, foundation settling in older farmhouses, aging electrical systems in rural properties, roof issues on older buildings, basement moisture in century homes, and insulation deficiencies. Rural properties may have additional considerations like private road maintenance and drainage challenges.`
  },
  {
    question: "How soon will I receive my inspection report in Adelaide Metcalfe?",
    answer: `We provide <strong>same-day digital reports</strong> for all Adelaide Metcalfe home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your rural property.`
  },
  {
    question: "Do you inspect properties with wells and septic systems in Adelaide Metcalfe?",
    answer: `Yes, we specialize in <Link to="/services/well-water-testing">rural property inspections in Adelaide Metcalfe</Link>. Our inspections include assessment of well water systems (pressure tanks, pumps, water quality), septic systems (tanks, drain fields), and other rural-specific components. We can also coordinate with certified specialists for detailed water testing and septic evaluations when needed.`
  },
  {
    question: "What areas of Adelaide Metcalfe Township do you service?",
    answer: `We provide <strong>home inspection services throughout Adelaide Metcalfe Township</strong> including Strathroy, Kerwood, Ailsa Craig, Nairn, Cedar Springs, and all surrounding rural areas. We also serve nearby communities in Middlesex County including London, St. Thomas, Glencoe, and Parkhill.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Robert Johnson",
    location: "Kerwood, Adelaide Metcalfe",
    content: "The ASADS home inspection for our Adelaide Metcalfe farm property was incredibly thorough. The inspector understood rural property challenges and identified several issues with our well and septic system that we would have missed. The detailed report helped us negotiate repairs and gave us peace of mind. Highly recommended for rural property buyers!",
    rating: 5
  },
  {
    name: "Susan Miller",
    location: "Strathroy Area",
    content: "As first-time rural property buyers in Adelaide Metcalfe, we were nervous about the inspection process. ASADS made it easy to understand and provided exceptional service. Their knowledge of well water systems and septic maintenance was invaluable for our new country home.",
    rating: 5
  },
  {
    name: "David Thompson",
    location: "Ailsa Craig",
    content: "We've used ASADS for multiple property inspections in Adelaide Metcalfe and Middlesex County. Their attention to detail is unmatched, especially with older farmhouses. The thermal imaging service identified hidden moisture issues in our century home that saved us from major structural repairs.",
    rating: 5
  }
];

export default function AdelaideMetcalfe() {
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

  // Comprehensive Schema Markup for Adelaide Metcalfe
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Adelaide Metcalfe",
    "description": "Professional rural home inspection services in Adelaide Metcalfe Township providing comprehensive property assessments, well water testing, septic inspections, and rural property evaluations.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "adelaide@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Adelaide Metcalfe Service Area",
      "addressLocality": "Strathroy",
      "addressRegion": "ON",
      "postalCode": "N7G",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.9556,
      "longitude": -81.6295
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.9556,
        "longitude": -81.6295
      },
      "geoRadius": "40000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Strathroy"
      },
      {
        "@type": "City",
        "name": "Adelaide Metcalfe"
      },
      {
        "@type": "City",
        "name": "London"
      },
      {
        "@type": "City",
        "name": "St. Thomas"
      },
      {
        "@type": "City",
        "name": "Glencoe"
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
    "image": `${SITE_URL}/images/adelaide-metcalfe-home-inspection.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
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
    "serviceType": "Rural Home Inspection",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection"
    },
    "areaServed": {
      "@type": "City",
      "name": "Adelaide Metcalfe"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Adelaide Metcalfe Home Inspection Services",
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
    "description": "Professional rural home inspection services in Adelaide Metcalfe including pre-purchase inspections, well water testing, septic system evaluations, radon testing, mold inspection, thermal imaging, and specialized rural property assessments."
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
        "name": "Adelaide Metcalfe Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors adelaide metcalfe, rural property inspection ontario`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-adelaide-metcalfe-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-adelaide-metcalfe-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Adelaide Metcalfe" />
        <meta name="geo.position" content="42.9556;-81.6295" />
        <meta name="ICBM" content="42.9556, -81.6295" />
        
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
                Adelaide Metcalfe's Trusted Rural Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Rural Home Inspection Services in <span className="text-secondary">Adelaide Metcalfe</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Adelaide Metcalfe</strong>? ASADS provides professional rural property assessments with licensed inspectors, well water testing, septic inspections, and same-day digital reports. Serving Adelaide Metcalfe Township and surrounding rural communities.
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
                <span>Licensed Rural Property Inspectors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Adelaide Metcalfe Inspection
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

      {/* Adelaide Metcalfe Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Adelaide Metcalfe</strong>, choosing licensed professionals with rural property expertise is essential for protecting your investment in this agricultural community. ASADS Home Inspection provides comprehensive property assessments throughout Adelaide Metcalfe Township and surrounding areas, helping rural homeowners, buyers, and sellers make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Rural Home Inspection Services in Adelaide Metcalfe
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Adelaide Metcalfe</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From well water system evaluations to septic system assessments, our licensed inspectors examine every accessible component of your rural property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Adelaide Metcalfe Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Adelaide Metcalfe cost</strong> ranges from $500 to $850 for a standard rural property. This typically includes well water and septic system evaluations. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Adelaide Metcalfe's unique rural market.
                  </p>
                </div>
              </div>
            </div>

            {/* Adelaide Metcalfe-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Adelaide Metcalfe-Specific Rural Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adelaideMetcalfeFeatures.map((feature, index) => (
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
                Complete Adelaide Metcalfe Rural Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Adelaide Metcalfe rural property.
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
                  14+ Professional Home Inspection Services in Adelaide Metcalfe
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Adelaide Metcalfe property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations tailored to rural properties.
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
                Why Choose ASADS for Home Inspection in Adelaide Metcalfe?
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
                Adelaide Metcalfe Areas We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {adelaideMetcalfeAreas.map((area, index) => (
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
                  Also serving nearby communities including London, St. Thomas, Sarnia, Glencoe, and throughout Middlesex County.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Adelaide Metcalfe
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
                What Adelaide Metcalfe Homeowners Say About Our Inspections
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
                Ready to Schedule Your Adelaide Metcalfe Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive rural home inspection in Adelaide Metcalfe today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Middlesex County.
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
                    Book Your Adelaide Metcalfe Inspection Online
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
