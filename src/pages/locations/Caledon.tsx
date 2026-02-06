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
  Mountain,
  Horse,
  Tent,
  Droplets,
  FactoryIcon,
  Castle,
  Wind,
  LandPlot
} from "lucide-react";

// Primary keyword: "home inspection caledon"
// Secondary keywords: "home inspection caledon ontario", "home inspection peel region", "caledon home inspectors"
const primaryKeyword = "home inspection caledon";
const secondaryKeywords = [
  "home inspection caledon ontario",
  "home inspection peel region", 
  "caledon home inspectors",
  "home inspection brampton caledon",
  "caledon ontario home inspection"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a rural property in Caledon",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Caledon"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built homes in Caledon",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Caledon"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Caledon property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Caledon"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial and farm property inspections in Caledon",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Caledon"
  },
  { 
    title: "Equestrian Property Inspection", 
    href: "/services/equestrian-property",
    description: "Specialized inspections for horse farms and equestrian facilities",
    icon: <Horse className="h-6 w-6" />,
    anchorText: "equestrian property inspection Caledon"
  },
  { 
    title: "Well Water Testing", 
    href: "/services/well-water-testing",
    description: "Well water quality testing for rural Caledon properties",
    icon: <Droplets className="h-6 w-6" />,
    anchorText: "well water testing Caledon"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for homes in Caledon's escarpment area",
    icon: <Wind className="h-6 w-6" />,
    anchorText: "radon testing in Caledon"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Caledon homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Caledon"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for rural properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Caledon"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Caledon"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera septic and sewer line inspections for rural homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Caledon"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older farmhouses in Caledon",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Caledon"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for heritage farm properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Caledon"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in rural Caledon homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Caledon"
  },
  { 
    title: "Septic System Inspection", 
    href: "/services/septic-inspection",
    description: "Septic system evaluations for rural Caledon properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "septic inspection Caledon"
  }
];

// Caledon areas - NO LINKS, just display
const caledonAreas = [
  { name: "Bolton", service: "Home Inspection" },
  { name: "Caledon East", service: "Home Inspection" },
  { name: "Caledon Village", service: "Home Inspection" },
  { name: "Cheltenham", service: "Home Inspection" },
  { name: "Inglewood", service: "Home Inspection" },
  { name: "Alton", service: "Home Inspection" },
  { name: "Mono Mills", service: "Home Inspection" },
  { name: "Palgrave", service: "Home Inspection" },
  { name: "Terra Cotta", service: "Home Inspection" },
  { name: "Belfountain", service: "Home Inspection" },
  { name: "Caledon South", service: "Home Inspection" },
  { name: "Forks of the Credit", service: "Home Inspection" },
  { name: "Castlemore", service: "Home Inspection" },
  { name: "Humber Station", service: "Home Inspection" },
  { name: "Mayfield", service: "Home Inspection" },
  { name: "Snelgrove", service: "Home Inspection" }
];

// Nearby towns - NO LINKS
const nearbyTowns = [
  "Brampton",
  "Orangeville", 
  "Caledon",
  "Mississauga",
  "Georgetown",
  "Erin",
  "Acton",
  "Mono",
  "Shelburne",
  "Alliston",
  "Schomberg",
  "Kleinburg",
  "Woodbridge",
  "Vaughan"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Caledon | Professional Rural Property Inspections in Caledon, ON | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Caledon? ASADS provides professional rural property inspections with licensed inspectors, well water testing, septic inspections, and same-day reports. Serving Caledon, Bolton, Orangeville, and Peel Region.";
const pageTitle = "Professional Rural Home Inspection Services in Caledon, Ontario | ASADS Certified Inspectors";
const price = "$550-$950";
const duration = "3-5 Hours";

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
  "12+ Years Rural Caledon Property Inspection Experience",
  "Well Water System Specialists",
  "Septic System Evaluation Experts",
  "Equestrian Property Specialists",
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

// Caledon-specific content about local considerations
const caledonFeatures = [
  {
    icon: <Horse className="h-5 w-5" />,
    title: "Equestrian Property Specialists",
    description: "Expert inspections for Caledon's horse farms, riding arenas, and equestrian facilities with attention to specialized structures."
  },
  {
    icon: <Mountain className="h-5 w-5" />,
    title: "Escarpment Property Expertise",
    description: "Comprehensive inspections for properties along the Niagara Escarpment with attention to geological considerations and foundation stability."
  },
  {
    icon: <Droplets className="h-5 w-5" />,
    title: "Rural Water Systems Knowledge",
    description: "Detailed assessments of well water systems, septic systems, and other rural utilities common in Caledon's countryside properties."
  },
  {
    icon: <Trees className="h-5 w-5" />,
    title: "Country Estate Experience",
    description: "Inspections for Caledon's luxury country estates, acreages, and rural retreat properties with extensive outbuildings and amenities."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Caledon?",
    answer: `The average <strong>home inspection Caledon cost</strong> ranges from $550 to $950 for a standard rural property. This includes well water and septic system evaluations. Larger country estates or equestrian properties may range from $750-$1,500. We provide detailed quotes based on your specific property's size, systems, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Caledon?",
    answer: `A comprehensive <strong>home inspection in Caledon</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. For rural properties, we also assess well water systems, septic systems, outbuildings, equestrian facilities, and other rural-specific components. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice.`
  },
  {
    question: "How long does a home inspection take in Caledon?",
    answer: `Most <strong>Caledon home inspections</strong> take 3-5 hours depending on property size and complexity. Rural properties require additional time for well water system checks, septic system evaluations, outbuilding inspections, and equestrian facility assessments. We never rush inspections and allocate sufficient time to properly assess every component of your rural property.`
  },
  {
    question: "Should I attend the home inspection in Caledon?",
    answer: `Yes, we strongly recommend attending your <strong>Caledon home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for rural systems, and understand the significance of any issues discovered. We provide valuable insights about well maintenance, septic care, and other rural property concerns.`
  },
  {
    question: "What are the most common issues found in Caledon home inspections?",
    answer: `Common issues in <strong>Caledon homes</strong> include: well water system maintenance (pressure tanks, pumps), septic system concerns, foundation settling in older farmhouses, aging electrical systems in rural properties, roof issues on agricultural buildings, basement moisture in century homes, and insulation deficiencies. Equestrian properties may have additional considerations like arena floor conditions and stable safety.`
  },
  {
    question: "How soon will I receive my inspection report in Caledon?",
    answer: `We provide <strong>same-day digital reports</strong> for all Caledon home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your rural property.`
  },
  {
    question: "Do you inspect equestrian properties in Caledon?",
    answer: `Yes, we specialize in <Link to="/services/equestrian-property">equestrian property inspections in Caledon</Link>. Our inspections include assessment of stables, riding arenas, fencing, paddocks, hay storage, and other equestrian-specific facilities. We understand the unique requirements of horse farms and can identify issues specific to equestrian properties.`
  },
  {
    question: "What areas of Caledon do you service?",
    answer: `We provide <strong>home inspection services throughout Caledon</strong> including Bolton, Caledon East, Caledon Village, Cheltenham, Inglewood, Alton, Mono Mills, Palgrave, Terra Cotta, and all surrounding rural areas. We also serve nearby communities in Peel Region and Dufferin County.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "William Thompson",
    location: "Inglewood, Caledon",
    content: "The ASADS home inspection for our equestrian property in Caledon was incredibly thorough. The inspector understood both residential and equestrian facility requirements and identified several issues with our arena footing and stable ventilation. The detailed report helped us plan essential upgrades. Highly recommended for Caledon's horse farms!",
    rating: 5
  },
  {
    name: "Elizabeth Parker",
    location: "Bolton Area",
    content: "As first-time rural property buyers in Caledon, we were overwhelmed by the well and septic systems. ASADS made it easy to understand and provided exceptional service. Their knowledge of rural water systems and escarpment properties gave us complete confidence in our country home purchase.",
    rating: 5
  },
  {
    name: "James Wilson",
    location: "Caledon Village",
    content: "We've used ASADS for multiple property inspections in Caledon's countryside. Their attention to detail is unmatched, especially with older farmhouses and heritage properties. The thermal imaging service identified hidden moisture issues in our stone foundation that saved us from major structural repairs.",
    rating: 5
  }
];

export default function Caledon() {
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

  // Comprehensive Schema Markup for Caledon
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Caledon",
    "description": "Professional rural home inspection services in Caledon, Ontario providing comprehensive property assessments, equestrian property inspections, well water testing, septic inspections, and rural property evaluations.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "caledon@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Caledon Service Area",
      "addressLocality": "Bolton",
      "addressRegion": "ON",
      "postalCode": "L7E",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.8668,
      "longitude": -79.8663
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.8668,
        "longitude": -79.8663
      },
      "geoRadius": "40000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Caledon"
      },
      {
        "@type": "City",
        "name": "Bolton"
      },
      {
        "@type": "City",
        "name": "Orangeville"
      },
      {
        "@type": "City",
        "name": "Brampton"
      },
      {
        "@type": "City",
        "name": "Georgetown"
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
    "image": `${SITE_URL}/images/caledon-home-inspection.jpg`,
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
    "serviceType": "Rural Home Inspection",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection"
    },
    "areaServed": {
      "@type": "City",
      "name": "Caledon"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Caledon Home Inspection Services",
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
    "description": "Professional rural home inspection services in Caledon including pre-purchase inspections, equestrian property assessments, well water testing, septic system evaluations, radon testing, mold inspection, thermal imaging, and specialized rural property evaluations."
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
        "name": "Caledon Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors caledon ontario, rural property inspection peel region`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-caledon-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-caledon-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Caledon" />
        <meta name="geo.position" content="43.8668;-79.8663" />
        <meta name="ICBM" content="43.8668, -79.8663" />
        
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
                Caledon's Trusted Rural Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Rural Home Inspection Services in <span className="text-secondary">Caledon, Ontario</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Caledon</strong>? ASADS provides professional rural property assessments with licensed inspectors, equestrian property expertise, well water testing, septic inspections, and same-day digital reports. Serving Caledon, Bolton, Orangeville, and Peel Region.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" />
                <span>3-5 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" />
                <span>Starting at $550</span>
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
                  Schedule Caledon Inspection
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

      {/* Caledon Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Caledon</strong>, choosing licensed professionals with rural property and equestrian facility expertise is essential for protecting your investment in Ontario's premier countryside community. ASADS Home Inspection provides comprehensive property assessments throughout Caledon and surrounding areas, helping rural homeowners, equestrian property buyers, and country estate investors make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Rural Home Inspection Services in Caledon, Ontario
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Caledon</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From equestrian facility evaluations to escarpment property assessments, our licensed inspectors examine every accessible component of your rural property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Caledon Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Caledon cost</strong> ranges from $550 to $950 for a standard rural property. This typically includes well water and septic system evaluations. Equestrian properties and larger country estates may range from $750-$1,500. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Caledon's unique rural market.
                  </p>
                </div>
              </div>
            </div>

            {/* Caledon-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Caledon-Specific Rural Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {caledonFeatures.map((feature, index) => (
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
                Complete Caledon Rural Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Caledon property.
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
                  15+ Professional Home Inspection Services in Caledon
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Caledon property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations tailored to Caledon's unique rural housing market.
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
                Why Choose ASADS for Home Inspection in Caledon?
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
                Caledon Areas We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {caledonAreas.map((area, index) => (
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
                  Also serving nearby communities including Brampton, Orangeville, Georgetown, Erin, and throughout Dufferin and Peel Regions.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Caledon
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
                What Caledon Homeowners Say About Our Inspections
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
                Ready to Schedule Your Caledon Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive rural home inspection in Caledon today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Caledon and surrounding countryside communities.
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
                  <a href="mailto:caledon@asads.ca" className="text-primary hover:underline text-lg font-bold">
                    caledon@asads.ca
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
                    Book Your Caledon Inspection Online
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
