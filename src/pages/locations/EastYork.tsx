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
  Train,
  Subway,
  HomeIcon,
  Castle,
  Tree,
  Factory,
  Warehouse,
  Bridge,
  River,
  Trees,
  Wrench,
  Hammer,
  Zap,
  Droplets,
  Wind
} from "lucide-react";

// Primary keyword: "home inspection east york"
// Secondary keywords: "home inspection east york toronto", "east york home inspectors", "home inspection east york ontario"
const primaryKeyword = "home inspection east york";
const secondaryKeywords = [
  "home inspection east york toronto",
  "east york home inspectors", 
  "home inspection east york ontario",
  "home inspection leaside",
  "east york condo inspection",
  "home inspection east york don mills",
  "east york property inspection"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a home in East York",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in East York"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built homes in East York",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection East York"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your East York property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection East York"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial property inspections in East York's business corridors",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection East York"
  },
  { 
    title: "Condominium Inspection", 
    href: "/services/condo-inspection",
    description: "Condominium inspections in East York's mid-rise buildings",
    icon: <Building className="h-6 w-6" />,
    anchorText: "condo inspection East York"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for East York homes and basements",
    icon: <Wind className="h-6 w-6" />,
    anchorText: "radon testing in East York"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection in East York's older homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection East York"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for East York properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection East York"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection East York"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for East York's tree-root areas",
    icon: <Droplets className="h-6 w-6" />,
    anchorText: "sewer scope inspection East York"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for post-war East York homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing East York"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for older East York properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing East York"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in East York homes",
    icon: <Wind className="h-6 w-6" />,
    anchorText: "air quality testing East York"
  },
  { 
    title: "Investment Property Inspection", 
    href: "/services/investment-property",
    description: "Inspections for rental and investment properties in East York",
    icon: <DollarSign className="h-6 w-6" />,
    anchorText: "investment property inspection East York"
  }
];

// East York neighborhoods - NO LINKS, just display
const eastYorkNeighborhoods = [
  { name: "Leaside", service: "Home Inspection" },
  { name: "Thorncliffe Park", service: "Home Inspection" },
  { name: "Flemingdon Park", service: "Home Inspection" },
  { name: "Don Mills", service: "Home Inspection" },
  { name: "Broadview North", service: "Home Inspection" },
  { name: "Old East York", service: "Home Inspection" },
  { name: "Taylor-Massey", service: "Home Inspection" },
  { name: "Woodbine-Lumsden", service: "Home Inspection" },
  { name: "O'Connor-Parkview", service: "Home Inspection" },
  { name: "Crescent Town", service: "Home Inspection" },
  { name: "East Danforth", service: "Home Inspection" },
  { name: "Broadview South", service: "Home Inspection" },
  { name: "Topham Park", service: "Home Inspection" },
  { name: "Dawes Road", service: "Home Inspection" },
  { name: "Woodbine Gardens", service: "Home Inspection" },
  { name: "Don Valley Parkway Area", service: "Home Inspection" }
];

// Nearby areas - NO LINKS
const nearbyAreas = [
  "Downtown Toronto",
  "North York",
  "Scarborough",
  "Etobicoke",
  "York",
  "Richmond Hill",
  "Markham",
  "Vaughan",
  "Mississauga",
  "Brampton",
  "Pickering",
  "Ajax",
  "Whitby",
  "Oshawa",
  "Aurora",
  "Newmarket"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection East York | Professional Property Inspections in East York, Toronto | ASADS";
const metaDescription = "Looking for comprehensive home inspection in East York? ASADS provides professional property inspections with licensed inspectors, same-day reports, and thorough evaluations. Serving East York, Leaside, Don Mills, and all Toronto neighborhoods.";
const pageTitle = "Professional Home Inspection Services in East York, Toronto | ASADS Certified Inspectors";
const price = "$525-$875";
const duration = "2-4 Hours";

// Comprehensive inspection checklist for East York properties
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
  "Post-War Construction Quality Assessment"
];

// E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
const expertisePoints = [
  "Licensed Ontario Home Inspectors",
  "InterNACHI Certified Professionals",
  "12+ Years East York Property Inspection Experience",
  "Post-War Construction Specialists",
  "Leaside Heritage Home Experts",
  "Don Mills Garden City Community Knowledge",
  "Thermal Imaging Certified Technicians",
  "Radon Measurement Certified",
  "WETT Certified Wood-Burning Appliance Inspectors",
  "OAHI Member in Good Standing"
];

// Benefits for users
const benefits = [
  "Same-Day Digital Inspection Reports",
  "Detailed Photo Documentation (120+ Photos)",
  "Thermal Imaging & Moisture Detection",
  "24/7 Online Report Access",
  "Lifetime Technical Support",
  "Flexible Scheduling for Working Professionals",
  "Pre-Inspection Consultation Included",
  "Post-Inspection Review Session",
  "Investment Property Assessments",
  "Free Follow-up Questions for 12 Months"
];

// East York-specific content about local considerations
const eastYorkFeatures = [
  {
    icon: <Castle className="h-5 w-5" />,
    title: "Leaside Heritage Experts",
    description: "Expert inspections for Leaside's heritage homes and historic properties with attention to original construction methods and materials."
  },
  {
    icon: <Tree className="h-5 w-5" />,
    title: "Don Mills Garden City Specialists",
    description: "Comprehensive inspections for Don Mills' Garden City community with attention to mature landscaping, drainage, and tree root systems."
  },
  {
    icon: <Bridge className="h-5 w-5" />,
    title: "Don Valley Expertise",
    description: "Detailed assessments for properties near the Don Valley with attention to erosion, drainage, and foundation stability in ravine lots."
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Post-War Construction Knowledge",
    description: "Inspections for East York's post-war homes with specialized knowledge of construction methods from the 1940s-1960s."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in East York?",
    answer: `The average <strong>home inspection East York cost</strong> ranges from $525 to $875 for a standard residential property. Heritage homes in Leaside may range from $650-$1,200, while condominiums typically range from $425-$700. We provide detailed quotes based on your specific property's size, age, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in East York?",
    answer: `A comprehensive <strong>home inspection in East York</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice and include specialized assessments for East York's post-war homes and heritage properties.`
  },
  {
    question: "How long does a home inspection take in East York?",
    answer: `Most <strong>East York home inspections</strong> take 2-4 hours depending on property size and complexity. Heritage homes, post-war bungalows, and larger properties require additional time for thorough assessment. We never rush inspections and allocate sufficient time to properly assess every component of your East York property.`
  },
  {
    question: "Should I attend the home inspection in East York?",
    answer: `Yes, we strongly recommend attending your <strong>East York home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for East York's specific heritage and post-war considerations, and understand the significance of any issues discovered. We provide valuable insights about property maintenance and local building practices.`
  },
  {
    question: "What are the most common issues found in East York home inspections?",
    answer: `Common issues in <strong>East York homes</strong> include: foundation settling in ravine lots, aluminum wiring in post-war homes, roof aging in mid-century builds, insulation deficiencies in 1950s-1960s construction, plumbing concerns in older properties, and tree root intrusion in sewer lines in mature neighborhoods like Don Mills.`
  },
  {
    question: "How soon will I receive my inspection report in East York?",
    answer: `We provide <strong>same-day digital reports</strong> for all East York home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your East York property.`
  },
  {
    question: "Do you inspect post-war bungalows in East York?",
    answer: `Yes, we specialize in <strong>post-war home inspections in East York</strong>. Our inspectors have extensive knowledge of construction methods from the 1940s to 1960s, including identifying aluminum wiring, asbestos insulation, and other period-specific concerns common in East York's post-war neighborhoods.`
  },
  {
    question: "What areas of East York do you service?",
    answer: `We provide <strong>home inspection services throughout East York</strong> including Leaside, Thorncliffe Park, Flemingdon Park, Don Mills, Old East York, Taylor-Massey, and all surrounding neighborhoods. We also serve nearby communities throughout Toronto and the GTA.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Michael Thompson",
    location: "Leaside, East York",
    content: "Our heritage home inspection in Leaside was exceptional. The inspector understood the unique challenges of East York's historic properties and identified several issues that other inspectors missed. Their knowledge of original construction methods gave us confidence in our renovation plans. Highly recommended for East York heritage homes!",
    rating: 5
  },
  {
    name: "Sarah Chen",
    location: "Don Mills, East York",
    content: "As first-time home buyers in Don Mills, we needed an inspector who understood the Garden City community's unique characteristics. ASADS delivered exactly what we needed. Their attention to tree root systems and drainage in our ravine lot was invaluable. The detailed report helped us plan preventative maintenance.",
    rating: 5
  },
  {
    name: "David Wilson",
    location: "Thorncliffe Park, East York",
    content: "We've used ASADS for multiple investment property inspections in East York. Their thorough approach and understanding of post-war construction have been invaluable. They identified aluminum wiring and asbestos concerns that could have been expensive surprises. Excellent service for East York properties.",
    rating: 5
  }
];

export default function EastYork() {
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

  // Comprehensive Schema Markup for East York
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection East York",
    "description": "Professional home inspection services in East York, Toronto providing comprehensive property assessments, heritage home inspections, post-war construction evaluations, and investment property inspections.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "eastyork@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "East York Service Area",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M4G-M4C",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.7010,
      "longitude": -79.3472
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.7010,
        "longitude": -79.3472
      },
      "geoRadius": "15000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "East York"
      },
      {
        "@type": "City",
        "name": "Toronto"
      },
      {
        "@type": "City",
        "name": "North York"
      },
      {
        "@type": "City",
        "name": "Scarborough"
      },
      {
        "@type": "City",
        "name": "Markham"
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
    "image": `${SITE_URL}/images/east-york-home-inspection.jpg`,
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
      "name": "East York"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "East York Home Inspection Services",
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
    "description": "Professional home inspection services in East York including pre-purchase inspections, heritage home assessments, post-war construction evaluations, radon testing, mold inspection, thermal imaging, and investment property inspections."
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
        "name": "East York Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors east york toronto, property inspection east york ontario, leaside home inspection`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-east-york-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-east-york-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="East York, Toronto" />
        <meta name="geo.position" content="43.7010;-79.3472" />
        <meta name="ICBM" content="43.7010, -79.3472" />
        
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
                East York's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">East York, Toronto</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in East York</strong>? ASADS provides professional property assessments with licensed inspectors, heritage home expertise, and same-day digital reports. Serving East York, Leaside, Don Mills, and all Toronto neighborhoods.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" />
                <span>2-4 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" />
                <span>Starting at $525</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Shield className="h-5 w-5" />
                <span>Licensed Heritage Home Specialists</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule East York Inspection
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

      {/* East York Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in East York</strong>, choosing licensed professionals with local heritage home, post-war construction, and Don Valley ravine expertise is essential for protecting your investment in one of Toronto's most diverse communities. ASADS Home Inspection provides comprehensive property assessments throughout East York and surrounding areas, helping homeowners, investors, and first-time buyers make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in East York, Toronto
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in East York</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From heritage home evaluations in Leaside to post-war bungalow assessments in Don Mills, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    East York Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection East York cost</strong> ranges from $525 to $875 for a standard residential property. Heritage homes in Leaside may range from $650-$1,200, while condominiums typically range from $425-$700. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in East York's diverse market.
                  </p>
                </div>
              </div>
            </div>

            {/* East York-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                East York-Specific Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {eastYorkFeatures.map((feature, index) => (
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
                Complete East York Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your East York property.
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
                  14+ Professional Home Inspection Services in East York
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every East York property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations tailored to East York's unique housing market.
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
                Why Choose ASADS for Home Inspection in East York?
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
                East York Neighborhoods We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {eastYorkNeighborhoods.map((area, index) => (
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
                  Also serving nearby communities including Downtown Toronto, North York, Scarborough, Markham, and throughout the GTA region.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in East York
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
                What East York Homeowners Say About Our Inspections
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
                Ready to Schedule Your East York Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in East York today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout East York and the surrounding Toronto region.
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
                  <a href="mailto:eastyork@asads.ca" className="text-primary hover:underline text-lg font-bold">
                    eastyork@asads.ca
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
                    Book Your East York Inspection Online
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
