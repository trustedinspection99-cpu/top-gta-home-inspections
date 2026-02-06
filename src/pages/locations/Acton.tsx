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
  Factory
} from "lucide-react";

// Primary keyword: "home inspection acton"
// Secondary keywords: "home inspection companies acton", "home inspection acton ontario", "acton home inspectors"
const primaryKeyword = "home inspection acton";
const secondaryKeywords = [
  "home inspection companies acton",
  "home inspection acton ontario", 
  "acton home inspectors",
  "home inspection services acton",
  "licensed home inspectors acton"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a property in Acton",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Acton"
  },
  { 
    title: "Condo Inspection", 
    href: "/services/condo",
    description: "Specialized inspections for Acton condos and townhouses",
    icon: <Building className="h-6 w-6" />,
    anchorText: "condo inspection Acton"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built Acton homes",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Acton"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Acton property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Acton"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial property inspections in Acton",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Acton"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for Acton homes and basements",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "radon testing in Acton"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Acton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Acton"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for Acton properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Acton"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances in Acton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Acton"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for Acton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Acton"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older Acton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Acton"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for Acton heritage properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Acton"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in Acton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Acton"
  },
  { 
    title: "Well Water Testing", 
    href: "/services/well-water-testing",
    description: "Well water quality testing for rural Acton properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "well water testing Acton"
  }
];

// Acton areas - NO LINKS, just display
const actonAreas = [
  { name: "Downtown Acton", service: "Home Inspection" },
  { name: "Mill Street", service: "Home Inspection" },
  { name: "Elora Street", service: "Home Inspection" },
  { name: "Willow Street", service: "Home Inspection" },
  { name: "Church Street", service: "Home Inspection" },
  { name: "Main Street North", service: "Home Inspection" },
  { name: "Main Street South", service: "Home Inspection" },
  { name: "Acton Heights", service: "Home Inspection" },
  { name: "Esquesing Township", service: "Home Inspection" },
  { name: "Acton Rural", service: "Home Inspection" },
  { name: "Silver Creek", service: "Home Inspection" },
  { name: "Guelph Line", service: "Home Inspection" },
  { name: "Trafalgar Road", service: "Home Inspection" },
  { name: "Winston Churchill", service: "Home Inspection" },
  { name: "Steeles Avenue", service: "Home Inspection" },
  { name: "Ballinafad", service: "Home Inspection" }
];

// Nearby towns - NO LINKS
const nearbyTowns = [
  "Georgetown",
  "Milton", 
  "Erin",
  "Rockwood",
  "Guelph",
  "Halton Hills",
  "Norval",
  "Hornby",
  "Brampton",
  "Mississauga",
  "Cambridge",
  "Kitchener"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Acton | Professional House Inspectors & Property Assessments | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Acton? ASADS provides professional home inspection services with licensed inspectors, same-day reports, and competitive pricing starting at $450. Serving Acton, Halton Hills, and surrounding rural communities.";
const pageTitle = "Professional Home Inspection Services in Acton | ASADS Certified Inspectors";
const price = "$450-$750";
const duration = "2-4 Hours";

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
  "10+ Years Rural Home Inspection Experience",
  "Acton & Halton Hills Building Code Specialists",
  "Heritage Property Inspection Experts",
  "Rural & Well Water System Specialists",
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

// Acton-specific content about local considerations
const actonFeatures = [
  {
    icon: <Trees className="h-5 w-5" />,
    title: "Rural Property Expertise",
    description: "Specialized inspections for Acton's rural properties including wells, septic systems, and acreage assessments."
  },
  {
    icon: <Mountain className="h-5 w-5" />,
    title: "Heritage Home Specialists",
    description: "Expert knowledge of Acton's historic limestone homes and heritage district properties."
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Local Environmental Factors",
    description: "Understanding Acton's unique topography, soil conditions, and environmental considerations."
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: "Small Town Service",
    description: "Personalized attention and thorough inspections tailored to Acton's community needs."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Acton?",
    answer: `The average <strong>home inspection Acton cost</strong> ranges from $450 to $750 for a standard single-family home. Rural properties with additional systems may cost $500-$850, while properties requiring specialized services like <Link to="/services/thermal-imaging">thermal imaging</Link> or <Link to="/services/well-water-testing">well water testing</Link> may range from $600-$950. We provide detailed quotes based on your specific Acton property's size, age, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Acton?",
    answer: `A comprehensive <strong>home inspection in Acton</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. For rural properties, we also assess well water systems, septic systems, and other rural-specific components. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice.`
  },
  {
    question: "How long does a home inspection take in Acton?",
    answer: `Most <strong>Acton home inspections</strong> take 2-4 hours depending on property size and complexity. Rural properties may require 3-5 hours due to additional systems like wells and septic systems. Heritage homes often need extra time for thorough assessment of unique architectural features. We allocate sufficient time to properly assess every component of your Acton property.`
  },
  {
    question: "Should I attend the home inspection in Acton?",
    answer: `Yes, we strongly recommend attending your <strong>Acton home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for Acton's unique properties, and understand the significance of any issues discovered. We provide valuable insights about your specific Acton home that you won't get from just reading the report.`
  },
  {
    question: "What are the most common issues found in Acton home inspections?",
    answer: `Common issues in <strong>Acton homes</strong> include: foundation settling in older limestone homes, well water system maintenance, septic system concerns, aging electrical systems, roof issues on heritage properties, basement moisture in older homes, and insulation deficiencies in historic properties. Rural properties may have additional considerations like private road maintenance and drainage challenges.`
  },
  {
    question: "How soon will I receive my inspection report in Acton?",
    answer: `We provide <strong>same-day digital reports</strong> for all Acton home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your Acton property.`
  },
  {
    question: "Do you inspect rural properties with wells and septic systems in Acton?",
    answer: `Yes, we specialize in <Link to="/services/well-water-testing">rural property inspections in Acton</Link>. Our inspections include assessment of well water systems, septic systems, and other rural-specific components. We can also coordinate with certified specialists for detailed water testing and septic evaluations when needed.`
  },
  {
    question: "What areas of Acton and Halton Hills do you service?",
    answer: `We provide <strong>home inspection services throughout Acton</strong> including Downtown Acton, Acton Heights, rural Acton properties, and all surrounding areas. We also serve the entire Halton Hills region including Georgetown, Norval, Hornby, and nearby communities in Wellington and Halton counties.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Thomas Wilson",
    location: "Downtown Acton",
    content: "The ASADS home inspection in Acton was incredibly thorough. The inspector understood the unique challenges of our heritage limestone home and identified several issues we would have missed. The detailed report helped us negotiate repairs and gave us peace of mind. Highly recommended for Acton home buyers!",
    rating: 5
  },
  {
    name: "Margaret Chen",
    location: "Acton Heights",
    content: "As first-time home buyers in Acton, we were nervous about the rural property inspection process. ASADS made it easy to understand and provided exceptional service. Their knowledge of well water systems and rural property maintenance was invaluable.",
    rating: 5
  },
  {
    name: "James O'Reilly",
    location: "Rural Acton",
    content: "We've used ASADS for multiple property inspections in Acton and Halton Hills. Their attention to detail is unmatched, especially with older Acton homes. The thermal imaging service identified hidden moisture issues in our century home that saved us from major repairs.",
    rating: 5
  }
];

export default function Acton() {
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

  // Comprehensive Schema Markup for Acton
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Acton",
    "description": "Professional home inspection services in Acton providing comprehensive property assessments, heritage home inspections, and rural property testing throughout Halton Hills region.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "acton@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Acton Service Area",
      "addressLocality": "Acton",
      "addressRegion": "ON",
      "postalCode": "L7J",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.6306,
      "longitude": -80.0387
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.6306,
        "longitude": -80.0387
      },
      "geoRadius": "25000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Acton"
      },
      {
        "@type": "City",
        "name": "Georgetown"
      },
      {
        "@type": "City",
        "name": "Milton"
      },
      {
        "@type": "City",
        "name": "Erin"
      },
      {
        "@type": "City",
        "name": "Rockwood"
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
    "image": `${SITE_URL}/images/acton-home-inspection.jpg`,
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
      "name": "Acton"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Acton Home Inspection Services",
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
    "description": "Professional home inspection services in Acton including pre-purchase inspections, heritage home inspections, rural property assessments, well water testing, radon testing, mold inspection, thermal imaging, and specialized property assessments."
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
        "name": "Acton Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors acton, property inspection acton`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-acton-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-acton-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Acton" />
        <meta name="geo.position" content="43.6306;-80.0387" />
        <meta name="ICBM" content="43.6306, -80.0387" />
        
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
                Acton's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">Acton</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Acton</strong>? ASADS provides professional property assessments with licensed inspectors, same-day digital reports, and competitive pricing starting at $450. Serving Acton, Halton Hills, and surrounding rural communities.
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
                <span>Licensed Acton Inspectors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Acton Inspection
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

      {/* Acton Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Acton</strong>, choosing licensed professionals with rural property expertise is essential for protecting your investment in Halton Hills. ASADS Home Inspection provides comprehensive property assessments throughout Acton and surrounding communities, helping homeowners, buyers, and sellers make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in Acton
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Acton</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From heritage limestone foundation assessments to rural property evaluations, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Acton Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Acton cost</strong> ranges from $450 to $750 for a standard single-family home. Rural properties with wells and septic systems may cost $500-$850. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Acton's unique market.
                  </p>
                </div>
              </div>
            </div>

            {/* Acton-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Acton-Specific Home Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {actonFeatures.map((feature, index) => (
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
                Complete Acton Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Acton property.
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
                  14+ Professional Home Inspection Services in Acton
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Acton property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations.
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
                Why Choose ASADS for Home Inspection in Acton?
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
                Acton Areas We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {actonAreas.map((area, index) => (
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
                  Also serving nearby communities including Georgetown, Milton, Erin, Rockwood, and all Halton Hills region.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Acton
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
                What Acton Homeowners Say About Our Inspections
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
                Ready to Schedule Your Acton Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in Acton today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Halton Hills.
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
                  <a href="mailto:acton@asads.ca" className="text-primary hover:underline text-lg font-bold">
                    acton@asads.ca
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
                    Book Your Acton Inspection Online
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
