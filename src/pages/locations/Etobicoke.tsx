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
  Bus,
  Landmark,
  Hotel,
  University,
  Droplets,
  Wind,
  Sprout,
  Factory,
  Castle,
  TreePine,
  HomeIcon,
  Subway,
  Car,
  Wifi,
  Zap,
  Cloud,
  Sun,
  Moon,
  Activity
} from "lucide-react";

// Primary keyword: "home inspection etobicoke"
// Secondary keywords: "home inspection etobicoke ontario", "etobicoke home inspectors", "home inspection toronto etobicoke"
const primaryKeyword = "home inspection etobicoke";
const secondaryKeywords = [
  "home inspection etobicoke ontario",
  "etobicoke home inspectors", 
  "home inspection toronto etobicoke",
  "home inspection etobicoke waterfront",
  "etobicoke condo inspection",
  "home inspection etobicoke west",
  "etobicoke property inspection"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a home in Etobicoke",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Etobicoke"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built Etobicoke homes",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Etobicoke"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Etobicoke property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Etobicoke"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial property inspections in Etobicoke's business districts",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Etobicoke"
  },
  { 
    title: "Condominium Inspection", 
    href: "/services/condo-inspection",
    description: "Condominium inspections in Etobicoke's high-rise buildings",
    icon: <Building className="h-6 w-6" />,
    anchorText: "condo inspection Etobicoke"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for Etobicoke homes and basements",
    icon: <Cloud className="h-6 w-6" />,
    anchorText: "radon testing in Etobicoke"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection in Etobicoke's older homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Etobicoke"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for Etobicoke properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Etobicoke"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances",
    icon: <Activity className="h-6 w-6" />,
    anchorText: "WETT inspection Etobicoke"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for Etobicoke's older neighborhoods",
    icon: <Droplets className="h-6 w-6" />,
    anchorText: "sewer scope inspection Etobicoke"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for mid-century Etobicoke homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Etobicoke"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for heritage Etobicoke properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Etobicoke"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in Etobicoke homes",
    icon: <Wind className="h-6 w-6" />,
    anchorText: "air quality testing Etobicoke"
  },
  { 
    title: "Investment Property Inspection", 
    href: "/services/investment-property",
    description: "Inspections for rental and investment properties in Etobicoke",
    icon: <DollarSign className="h-6 w-6" />,
    anchorText: "investment property inspection Etobicoke"
  }
];

// Etobicoke neighborhoods - NO LINKS, just display
const etobicokeNeighborhoods = [
  { name: "The Kingsway", service: "Home Inspection" },
  { name: "Mimico", service: "Home Inspection" },
  { name: "Long Branch", service: "Home Inspection" },
  { name: "New Toronto", service: "Home Inspection" },
  { name: "Alderwood", service: "Home Inspection" },
  { name: "Islington", service: "Home Inspection" },
  { name: "Etobicoke West", service: "Home Inspection" },
  { name: "Etobicoke East", service: "Home Inspection" },
  { name: "Humber Bay Shores", service: "Home Inspection" },
  { name: "Humber Valley Village", service: "Home Inspection" },
  { name: "Edenbridge-Humber Valley", service: "Home Inspection" },
  { name: "Stonegate-Queensway", service: "Home Inspection" },
  { name: "Markland Woods", service: "Home Inspection" },
  { name: "High Park North", service: "Home Inspection" },
  { name: "Princess-Rosethorn", service: "Home Inspection" },
  { name: "Waterfront Communities", service: "Home Inspection" }
];

// Nearby areas - NO LINKS
const nearbyAreas = [
  "Toronto Downtown",
  "Mississauga",
  "Brampton",
  "North York",
  "Scarborough",
  "Vaughan",
  "Richmond Hill",
  "Markham",
  "Oakville",
  "Burlington",
  "Hamilton",
  "Pickering",
  "Ajax",
  "Whitby",
  "Oshawa",
  "Guelph"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Etobicoke | Professional Property Inspections in Etobicoke, ON | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Etobicoke? ASADS provides professional property inspections with licensed inspectors, same-day reports, and thorough evaluations. Serving Etobicoke, Toronto, Mississauga, and the GTA.";
const pageTitle = "Professional Home Inspection Services in Etobicoke, Toronto | ASADS Certified Inspectors";
const price = "$550-$950";
const duration = "2-5 Hours";

// Comprehensive inspection checklist for Etobicoke properties
const whatWeInspect = [
  "Foundations & Structural Integrity Assessment",
  "Roofing Systems & Attic Ventilation Inspection",
  "Plumbing & Water Heating Systems Evaluation",
  "Electrical Panels & Wiring Safety Check",
  "HVAC Equipment & Ductwork Performance Testing",
  "Windows, Doors & Exterior Envelope Examination",
  "Insulation & Vapor Barrier Assessment",
  "Basement Waterproofing & Drainage Analysis",
  "Balcony & Terrace Evaluations",
  "High-Rise Building Systems Assessment"
];

// E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
const expertisePoints = [
  "Licensed Ontario Home Inspectors",
  "InterNACHI Certified Professionals",
  "15+ Years GTA Property Inspection Experience",
  "High-Rise Condominium Specialists",
  "Heritage Home Experts in The Kingsway",
  "New Construction Code Compliance Experts",
  "Thermal Imaging Certified Technicians",
  "Radon Measurement Certified",
  "WETT Certified Wood-Burning Appliance Inspectors",
  "OAHI Member in Good Standing"
];

// Benefits for users
const benefits = [
  "Same-Day Digital Inspection Reports",
  "Detailed Photo Documentation (150+ Photos)",
  "Thermal Imaging & Moisture Detection",
  "24/7 Online Report Access",
  "Lifetime Technical Support",
  "Flexible Scheduling for Working Professionals",
  "Pre-Inspection Consultation Included",
  "Post-Inspection Review Session",
  "Investment Property Assessments",
  "Free Follow-up Questions for 12 Months"
];

// Etobicoke-specific content about local considerations
const etobicokeFeatures = [
  {
    icon: <Castle className="h-5 w-5" />,
    title: "Heritage District Specialists",
    description: "Expert inspections for Etobicoke's heritage homes in The Kingsway and Humber Valley with attention to period-appropriate construction."
  },
  {
    icon: <Building className="h-5 w-5" />,
    title: "High-Rise Condominium Experts",
    description: "Comprehensive inspections for Humber Bay Shores and Etobicoke's waterfront condo developments with specialized knowledge of building systems."
  },
  {
    icon: <Sprout className="h-5 w-5" />,
    title: "Green Building Assessment",
    description: "Detailed evaluations for Etobicoke's LEED-certified and energy-efficient homes with sustainability in mind."
  },
  {
    icon: <Train className="h-5 w-5" />,
    title: "Transit-Oriented Development",
    description: "Inspections for properties near Kipling Station, Islington Station, and other TTC/GO Transit hubs with attention to noise and vibration."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Etobicoke?",
    answer: `The average <strong>home inspection Etobicoke cost</strong> ranges from $550 to $950 for a standard residential property. Luxury homes in The Kingsway may range from $800-$1,500, while condominiums typically range from $450-$750. We provide detailed quotes based on your specific property's size, age, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Etobicoke?",
    answer: `A comprehensive <strong>home inspection in Etobicoke</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice and include specialized assessments for Etobicoke's heritage homes and high-rise condos.`
  },
  {
    question: "How long does a home inspection take in Etobicoke?",
    answer: `Most <strong>Etobicoke home inspections</strong> take 2-5 hours depending on property size and complexity. Heritage homes, luxury properties, and larger estates require additional time for thorough assessment. We never rush inspections and allocate sufficient time to properly assess every component of your Etobicoke property.`
  },
  {
    question: "Should I attend the home inspection in Etobicoke?",
    answer: `Yes, we strongly recommend attending your <strong>Etobicoke home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for Etobicoke's specific heritage and high-rise considerations, and understand the significance of any issues discovered. We provide valuable insights about property maintenance and local building practices.`
  },
  {
    question: "What are the most common issues found in Etobicoke home inspections?",
    answer: `Common issues in <strong>Etobicoke homes</strong> include: foundation settling in older neighborhoods, knob and tube wiring in heritage properties, roof issues on century homes, insulation deficiencies in mid-century builds, plumbing concerns in pre-war homes, and balcony/terrace waterproofing issues in waterfront condos.`
  },
  {
    question: "How soon will I receive my inspection report in Etobicoke?",
    answer: `We provide <strong>same-day digital reports</strong> for all Etobicoke home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your Etobicoke property.`
  },
  {
    question: "Do you inspect condominiums in Etobicoke's high-rises?",
    answer: `Yes, we specialize in <strong>condominium inspections in Etobicoke</strong>, particularly in Humber Bay Shores and other waterfront developments. Our inspections include assessment of individual units, balconies, windows, and unit-specific systems. We understand the unique considerations of high-rise living and can identify issues specific to these property types.`
  },
  {
    question: "What areas of Etobicoke do you service?",
    answer: `We provide <strong>home inspection services throughout Etobicoke</strong> including The Kingsway, Mimico, Long Branch, Alderwood, Islington, Humber Bay Shores, and all surrounding neighborhoods. We also serve nearby communities in Toronto, Mississauga, and the entire GTA region.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Jennifer Wong",
    location: "Humber Bay Shores, Etobicoke",
    content: "As a first-time condo buyer in Humber Bay Shores, I was nervous about the process. ASADS provided the most thorough condo inspection I could imagine. Their expertise with high-rise buildings gave me confidence in my purchase, and they identified several balcony issues that needed attention. Highly recommended for Etobicoke condos!",
    rating: 5
  },
  {
    name: "Robert Chen",
    location: "The Kingsway, Etobicoke",
    content: "Our heritage home in The Kingsway required special attention, and ASADS delivered exceptional service. Their knowledge of period construction and heritage materials was impressive. The inspection report was so detailed it helped us negotiate a better price and plan necessary renovations. Truly experts in Etobicoke's heritage properties.",
    rating: 5
  },
  {
    name: "Maria Rodriguez",
    location: "Mimico, Etobicoke",
    content: "We've used ASADS for both our Mimico home purchase and our investment property inspection. Their thorough approach and understanding of Etobicoke's older neighborhoods have been invaluable. They identified knob and tube wiring that other inspectors missed, potentially saving us thousands in future repairs.",
    rating: 5
  }
];

export default function Etobicoke() {
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

  // Comprehensive Schema Markup for Etobicoke
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Etobicoke",
    "description": "Professional home inspection services in Etobicoke, Toronto providing comprehensive property assessments, high-rise condominium inspections, heritage home evaluations, and investment property inspections.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "etobicoke@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Etobicoke Service Area",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M8V-M9C",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.6532,
      "longitude": -79.5672
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.6532,
        "longitude": -79.5672
      },
      "geoRadius": "20000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Etobicoke"
      },
      {
        "@type": "City",
        "name": "Toronto"
      },
      {
        "@type": "City",
        "name": "Mississauga"
      },
      {
        "@type": "City",
        "name": "Brampton"
      },
      {
        "@type": "City",
        "name": "Oakville"
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
    "image": `${SITE_URL}/images/etobicoke-home-inspection.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "167",
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
      "name": "Etobicoke"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Etobicoke Home Inspection Services",
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
    "description": "Professional home inspection services in Etobicoke including pre-purchase inspections, high-rise condominium assessments, heritage home evaluations, radon testing, mold inspection, thermal imaging, and investment property evaluations."
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
        "name": "Etobicoke Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors etobicoke ontario, property inspection toronto, etobicoke waterfront inspection`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-etobicoke-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-etobicoke-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Etobicoke, Toronto" />
        <meta name="geo.position" content="43.6532;-79.5672" />
        <meta name="ICBM" content="43.6532, -79.5672" />
        
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
                Etobicoke's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">Etobicoke, Toronto</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Etobicoke</strong>? ASADS provides professional property assessments with licensed inspectors, high-rise condo expertise, and same-day digital reports. Serving Etobicoke, Toronto, Mississauga, and the entire GTA region.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" />
                <span>2-5 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" />
                <span>Starting at $550</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Shield className="h-5 w-5" />
                <span>Licensed High-Rise Specialists</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Etobicoke Inspection
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

      {/* Etobicoke Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Etobicoke</strong>, choosing licensed professionals with local heritage home and high-rise condominium expertise is essential for protecting your investment in one of Toronto's most desirable neighborhoods. ASADS Home Inspection provides comprehensive property assessments throughout Etobicoke and surrounding areas, helping homeowners, investors, and condo buyers make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in Etobicoke, Toronto
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Etobicoke</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From high-rise condominium evaluations to heritage home assessments in The Kingsway, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Etobicoke Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Etobicoke cost</strong> ranges from $550 to $950 for a standard residential property. Luxury homes in The Kingsway may range from $800-$1,500, while condominiums typically range from $450-$750. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Etobicoke's competitive market.
                  </p>
                </div>
              </div>
            </div>

            {/* Etobicoke-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Etobicoke-Specific Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {etobicokeFeatures.map((feature, index) => (
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
                Complete Etobicoke Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Etobicoke property.
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
                  14+ Professional Home Inspection Services in Etobicoke
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Etobicoke property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations tailored to Etobicoke's unique housing market.
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
                Why Choose ASADS for Home Inspection in Etobicoke?
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
                Etobicoke Neighborhoods We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {etobicokeNeighborhoods.map((area, index) => (
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
                  Also serving nearby communities including Toronto Downtown, Mississauga, Brampton, North York, and throughout the GTA region.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Etobicoke
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
                What Etobicoke Homeowners Say About Our Inspections
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
                Ready to Schedule Your Etobicoke Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in Etobicoke today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Etobicoke and the surrounding GTA region.
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
                  <a href="mailto:etobicoke@asads.ca" className="text-primary hover:underline text-lg font-bold">
                    etobicoke@asads.ca
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
                    Book Your Etobicoke Inspection Online
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
