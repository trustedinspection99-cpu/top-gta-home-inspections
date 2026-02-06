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
  GraduationCap,
  Building2,
  Briefcase,
  Wifi,
  University,
  Microscope,
  Cpu,
  Brain,
  TrendingUp
} from "lucide-react";

// Primary keyword: "home inspection waterloo"
// Secondary keywords: "home inspection waterloo ontario", "home inspection waterloo region", "waterloo home inspectors"
const primaryKeyword = "home inspection waterloo";
const secondaryKeywords = [
  "home inspection waterloo ontario",
  "home inspection waterloo region", 
  "waterloo home inspectors",
  "home inspection kitchener waterloo",
  "waterloo ontario home inspection"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a home in Waterloo",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Waterloo"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built homes in Waterloo",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Waterloo"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Waterloo property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Waterloo"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial and investment property inspections in Waterloo",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Waterloo"
  },
  { 
    title: "Condominium Inspection", 
    href: "/services/condo-inspection",
    description: "Condominium inspections in Waterloo's growing tech corridor",
    icon: <Building2 className="h-6 w-6" />,
    anchorText: "condo inspection Waterloo"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for homes in Waterloo Region",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "radon testing in Waterloo"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Waterloo homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Waterloo"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for Waterloo properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Waterloo"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Waterloo"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for Waterloo homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Waterloo"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older homes in Waterloo",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Waterloo"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for heritage Waterloo properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Waterloo"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in Waterloo homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Waterloo"
  },
  { 
    title: "Investment Property Inspection", 
    href: "/services/investment-property",
    description: "Inspections for rental and investment properties in Waterloo",
    icon: <DollarSign className="h-6 w-6" />,
    anchorText: "investment property inspection Waterloo"
  }
];

// Waterloo areas - NO LINKS, just display
const waterlooAreas = [
  { name: "Uptown Waterloo", service: "Home Inspection" },
  { name: "Downtown Kitchener", service: "Home Inspection" },
  { name: "Laurelwood", service: "Home Inspection" },
  { name: "Beechwood", service: "Home Inspection" },
  { name: "Westvale", service: "Home Inspection" },
  { name: "Clair Hills", service: "Home Inspection" },
  { name: "Lincoln Heights", service: "Home Inspection" },
  { name: "Lakeshore North", service: "Home Inspection" },
  { name: "Columbia Forest", service: "Home Inspection" },
  { name: "University District", service: "Home Inspection" },
  { name: "Westmount", service: "Home Inspection" },
  { name: "Victoria Hills", service: "Home Inspection" },
  { name: "Erb'sville", service: "Home Inspection" },
  { name: "Bridgeport", service: "Home Inspection" },
  { name: "Rosemount", service: "Home Inspection" },
  { name: "Forest Heights", service: "Home Inspection" }
];

// Nearby towns - NO LINKS
const nearbyTowns = [
  "Kitchener",
  "Cambridge", 
  "Guelph",
  "Brantford",
  "Elmira",
  "New Hamburg",
  "Stratford",
  "Ayr",
  "Baden",
  "St. Jacobs",
  "Paris",
  "Fergus",
  "Elora"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Waterloo | Professional Property Inspections in Waterloo, ON | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Waterloo? ASADS provides professional property inspections with licensed inspectors, same-day reports, and thorough evaluations. Serving Waterloo, Kitchener, Cambridge, and the tech corridor.";
const pageTitle = "Professional Home Inspection Services in Waterloo, Ontario | ASADS Certified Inspectors";
const price = "$450-$800";
const duration = "2-4 Hours";

// Comprehensive inspection checklist for Waterloo properties
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
  "Smart Home System & Technology Assessments"
];

// E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
const expertisePoints = [
  "Licensed Ontario Home Inspectors",
  "InterNACHI Certified Professionals",
  "15+ Years Waterloo Property Inspection Experience",
  "Tech Corridor & Innovation District Specialists",
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
  "Flexible Scheduling for Tech Professionals",
  "Pre-Inspection Consultation Included",
  "Post-Inspection Review Session",
  "Investment Property Assessments",
  "Free Follow-up Questions for 12 Months"
];

// Waterloo-specific content about local considerations
const waterlooFeatures = [
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Innovation District Experts",
    description: "Expert inspections for Waterloo's tech innovation district properties with attention to modern construction and smart systems."
  },
  {
    icon: <University className="h-5 w-5" />,
    title: "University Property Specialists",
    description: "Comprehensive inspections for properties near University of Waterloo and Wilfrid Laurier University campuses."
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "High-Tech Home Systems",
    description: "Detailed assessments of smart home systems, home automation, and energy-efficient technologies common in Waterloo."
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Investment Property Focus",
    description: "Inspections for Waterloo's growing rental and investment property market with attention to rental compliance and ROI potential."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Waterloo?",
    answer: `The average <strong>home inspection Waterloo cost</strong> ranges from $450 to $800 for a standard residential property. Condominium inspections typically range from $350-$550, while larger homes or investment properties in the tech corridor may range from $650-$1,000. We provide detailed quotes based on your specific property's size, age, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Waterloo?",
    answer: `A comprehensive <strong>home inspection in Waterloo</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice and include specialized assessments for Waterloo's tech-focused properties.`
  },
  {
    question: "How long does a home inspection take in Waterloo?",
    answer: `Most <strong>Waterloo home inspections</strong> take 2-4 hours depending on property size and complexity. Larger homes and properties with extensive smart home systems require additional time for thorough assessment. We never rush inspections and allocate sufficient time to properly assess every component of your Waterloo property.`
  },
  {
    question: "Should I attend the home inspection in Waterloo?",
    answer: `Yes, we strongly recommend attending your <strong>Waterloo home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for Waterloo's specific climate and tech considerations, and understand the significance of any issues discovered. We provide valuable insights about property maintenance and local building practices.`
  },
  {
    question: "What are the most common issues found in Waterloo home inspections?",
    answer: `Common issues in <strong>Waterloo homes</strong> include: foundation settling in older properties, improper smart home installations, roof issues on newer rapid-construction homes, basement moisture in properties near the Grand River, insulation deficiencies in converted student housing, and aging infrastructure in older neighborhoods near universities.`
  },
  {
    question: "How soon will I receive my inspection report in Waterloo?",
    answer: `We provide <strong>same-day digital reports</strong> for all Waterloo home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your Waterloo property.`
  },
  {
    question: "Do you inspect properties in Waterloo's innovation district?",
    answer: `Yes, we specialize in <strong>tech corridor property inspections in Waterloo</strong>. Our inspections include assessment of modern construction methods, smart home integrations, energy-efficient systems, and compliance with current building codes for Waterloo's innovation-focused developments.`
  },
  {
    question: "What areas of Waterloo do you service?",
    answer: `We provide <strong>home inspection services throughout Waterloo</strong> including Uptown Waterloo, University District, Laurelwood, Beechwood, Westvale, Columbia Forest, and all surrounding neighborhoods. We also serve nearby communities in Waterloo Region including Kitchener, Cambridge, and Guelph.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Jessica Wong",
    location: "Uptown Waterloo",
    content: "The ASADS home inspection for our tech corridor condo was exceptional. The inspector understood modern building systems and identified several installation issues with our smart home features. The detailed report helped us negotiate with the builder. Highly recommended for Waterloo's new developments!",
    rating: 5
  },
  {
    name: "Alex Thompson",
    location: "University District",
    content: "As a professor moving to Waterloo, we needed an inspection that understood both heritage homes and modern updates. ASADS delivered exactly what we needed. Their knowledge of both old and new construction gave us complete confidence in our century home purchase.",
    rating: 5
  },
  {
    name: "Raj Patel",
    location: "Laurelwood",
    content: "We've used ASADS for multiple investment property inspections in Waterloo's student rental market. Their thorough approach and understanding of both safety requirements and rental property ROI have been invaluable. They identified several issues that saved us thousands in potential repairs.",
    rating: 5
  }
];

export default function Waterloo() {
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

  // Comprehensive Schema Markup for Waterloo
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Waterloo",
    "description": "Professional home inspection services in Waterloo, Ontario providing comprehensive property assessments, tech corridor property inspections, and innovation district property evaluations.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "waterloo@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Waterloo Service Area",
      "addressLocality": "Waterloo",
      "addressRegion": "ON",
      "postalCode": "N2L",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.4643,
      "longitude": -80.5204
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.4643,
        "longitude": -80.5204
      },
      "geoRadius": "40000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Waterloo"
      },
      {
        "@type": "City",
        "name": "Kitchener"
      },
      {
        "@type": "City",
        "name": "Cambridge"
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
    "image": `${SITE_URL}/images/waterloo-home-inspection.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "168",
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
      "name": "Waterloo"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Waterloo Home Inspection Services",
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
    "description": "Professional home inspection services in Waterloo including pre-purchase inspections, tech corridor property assessments, university district inspections, radon testing, mold inspection, thermal imaging, and investment property evaluations."
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
        "name": "Waterloo Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors waterloo ontario, property inspection tech corridor`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-waterloo-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-waterloo-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Waterloo" />
        <meta name="geo.position" content="43.4643;-80.5204" />
        <meta name="ICBM" content="43.4643, -80.5204" />
        
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
                Waterloo's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">Waterloo, Ontario</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Waterloo</strong>? ASADS provides professional property assessments with licensed inspectors, tech corridor expertise, and same-day digital reports. Serving Waterloo, Kitchener, Cambridge, and the innovation district.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" />
                <span>2-4 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" />
                <span>Starting at $450</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Shield className="h-5 w-5" />
                <span>Licensed Tech Corridor Inspectors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Waterloo Inspection
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

      {/* Waterloo Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Waterloo</strong>, choosing licensed professionals with tech corridor and innovation district expertise is essential for protecting your investment in Canada's technology capital. ASADS Home Inspection provides comprehensive property assessments throughout Waterloo Region, helping tech professionals, academics, and investors make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in Waterloo, Ontario
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Waterloo</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From smart home system evaluations to university district property assessments, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Waterloo Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Waterloo cost</strong> ranges from $450 to $800 for a standard residential property. Condominiums in Uptown may range from $350-$550, while larger tech corridor homes or investment properties may range from $650-$1,000. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Waterloo's competitive market.
                  </p>
                </div>
              </div>
            </div>

            {/* Waterloo-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Waterloo-Specific Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {waterlooFeatures.map((feature, index) => (
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
                Complete Waterloo Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Waterloo property.
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
                  14+ Professional Home Inspection Services in Waterloo
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Waterloo property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations tailored to Waterloo's innovative housing market.
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
                Why Choose ASADS for Home Inspection in Waterloo?
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
                Waterloo Areas We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {waterlooAreas.map((area, index) => (
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
                  Also serving nearby communities including Kitchener, Cambridge, Guelph, and throughout Waterloo Region's tech corridor.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Waterloo
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
                What Waterloo Homeowners Say About Our Inspections
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
                Ready to Schedule Your Waterloo Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in Waterloo today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Waterloo Region's tech corridor.
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
                  <a href="mailto:waterloo@asads.ca" className="text-primary hover:underline text-lg font-bold">
                    waterloo@asads.ca
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
                    Book Your Waterloo Inspection Online
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
