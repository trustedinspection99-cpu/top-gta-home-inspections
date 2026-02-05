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
  Factory,
  Trees
} from "lucide-react";

// Primary keyword: "home inspection brampton"
// Secondary keywords: "home inspection companies brampton", "home inspection brampton cost", "brampton home inspectors"
const primaryKeyword = "home inspection brampton";
const secondaryKeywords = [
  "home inspection companies brampton",
  "home inspection brampton cost", 
  "brampton home inspectors",
  "home inspection services brampton",
  "licensed home inspectors brampton"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a property in Brampton",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Brampton"
  },
  { 
    title: "Condo Inspection", 
    href: "/services/condo",
    description: "Specialized condo inspections in Brampton high-rises and apartments",
    icon: <Building className="h-6 w-6" />,
    anchorText: "condo inspection Brampton"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built Brampton homes",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Brampton"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Brampton property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Brampton"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial property inspections throughout Brampton",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Brampton"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for Brampton homes and basements",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "radon testing in Brampton"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Brampton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Brampton"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for Brampton properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Brampton"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances in Brampton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Brampton"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for Brampton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Brampton"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older Brampton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Brampton"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for Brampton properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Brampton"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in Brampton homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Brampton"
  },
  { 
    title: "Well Water Testing", 
    href: "/services/well-water-testing",
    description: "Well water quality testing for properties in Brampton",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "well water testing Brampton"
  }
];

// Brampton neighborhoods - NO LINKS, just display
const bramptonNeighborhoods = [
  { name: "Bramalea", service: "Home Inspection" },
  { name: "Heart Lake", service: "Home Inspection" },
  { name: "Downtown Brampton", service: "Home Inspection" },
  { name: "Springdale", service: "Home Inspection" },
  { name: "Mount Pleasant", service: "Home Inspection" },
  { name: "Snelgrove", service: "Home Inspection" },
  { name: "Churchville", service: "Home Inspection" },
  { name: "Fletcher's Meadow", service: "Home Inspection" },
  { name: "Northwood Park", service: "Home Inspection" },
  { name: "Madoc", service: "Home Inspection" },
  { name: "Century Gardens", service: "Home Inspection" },
  { name: "Professor's Lake", service: "Home Inspection" },
  { name: "Hillsborough", service: "Home Inspection" },
  { name: "Bram East", service: "Home Inspection" },
  { name: "Williams Parkway", service: "Home Inspection" },
  { name: "Queen Street Corridor", service: "Home Inspection" }
];

// Nearby GTA cities - NO LINKS
const nearbyCities = [
  "Mississauga",
  "Caledon", 
  "Bolton",
  "Georgetown",
  "Milton",
  "Vaughan",
  "Toronto",
  "Oakville",
  "Etobicoke",
  "Malton",
  "Orangeville",
  "Acton"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Brampton | Professional House Inspectors & Property Assessments | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Brampton? ASADS provides professional home inspection services with licensed inspectors, same-day reports, and competitive pricing starting at $450. Serving Brampton and all Peel Region communities.";
const pageTitle = "Professional Home Inspection Services in Brampton | ASADS Certified Inspectors";
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
  "10+ Years Brampton Home Inspection Experience",
  "Peel Region Building Code Specialists",
  "New Construction Inspection Experts",
  "Condo & Townhouse Specialists",
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

// Brampton-specific content about local considerations
const bramptonFeatures = [
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Brampton's Growing Communities",
    description: "Expert inspections in Brampton's expanding neighborhoods including Fletcher's Meadow, Springdale, and Mount Pleasant areas."
  },
  {
    icon: <Trees className="h-5 w-5" />,
    title: "Local Environmental Considerations",
    description: "Understanding Brampton's soil conditions, drainage patterns, and environmental factors affecting home foundations."
  },
  {
    icon: <Building className="h-5 w-5" />,
    title: "New Construction Specialists",
    description: "Extensive experience with Brampton's new development areas and modern construction techniques."
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: "Heritage District Knowledge",
    description: "Familiar with Brampton's heritage properties and unique architectural styles in older neighborhoods."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Brampton?",
    answer: `The average <strong>home inspection Brampton cost</strong> ranges from $450 to $750 for a standard single-family home. Townhouse inspections typically cost $400-$600, while larger homes or properties requiring additional services like <Link to="/services/thermal-imaging">thermal imaging</Link> may range from $650-$900. We provide detailed quotes based on your specific Brampton property's size, age, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Brampton?",
    answer: `A comprehensive <strong>home inspection in Brampton</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice and include detailed reporting with high-resolution photos of all findings.`
  },
  {
    question: "How long does a home inspection take in Brampton?",
    answer: `Most <strong>Brampton home inspections</strong> take 2-4 hours depending on property size and complexity. Townhouse inspections typically take 1.5-2.5 hours, while larger homes (over 3,000 sq ft) may require 3-5 hours for thorough evaluation. We never rush inspections and allocate sufficient time to properly assess every component of your Brampton property.`
  },
  {
    question: "Should I attend the home inspection in Brampton?",
    answer: `Yes, we strongly recommend attending your <strong>Brampton home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements, and understand the significance of any issues discovered. We provide valuable insights about your specific Brampton home that you won't get from just reading the report.`
  },
  {
    question: "What are the most common issues found in Brampton home inspections?",
    answer: `Common issues in <strong>Brampton homes</strong> include: foundation settling in newer subdivisions, roofing problems (especially with newer construction materials), outdated electrical panels, HVAC system maintenance issues, basement moisture concerns, and grading/drainage problems common in Brampton's newer developments.`
  },
  {
    question: "How soon will I receive my inspection report in Brampton?",
    answer: `We provide <strong>same-day digital reports</strong> for all Brampton home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your Brampton property.`
  },
  {
    question: "Do you inspect condos and townhouses in Brampton?",
    answer: `Yes, we specialize in <Link to="/services/condo">condo and townhouse inspections in Brampton</Link>. Our inspections focus on the unit's interior systems including HVAC units, electrical panels, plumbing fixtures, windows, balconies, and interior finishes. We also help you understand maintenance responsibilities and common element conditions.`
  },
  {
    question: "What areas of Brampton do you service?",
    answer: `We provide <strong>home inspection services throughout Brampton</strong> including Bramalea, Heart Lake, Downtown Brampton, Springdale, Mount Pleasant, Fletcher's Meadow, and all surrounding neighborhoods. We also serve the entire Peel Region including Mississauga, Caledon, and nearby communities.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Raj Patel",
    location: "Fletcher's Meadow, Brampton",
    content: "The ASADS home inspection in Brampton was incredibly thorough. The inspector identified several issues in our new construction home that the builder had missed. The detailed report helped us get everything fixed before closing. Highly recommended for Brampton home buyers!",
    rating: 5
  },
  {
    name: "Jennifer Liu",
    location: "Springdale, Brampton",
    content: "As first-time home buyers in Brampton, we were nervous about the inspection process. ASADS made it easy to understand and provided exceptional service. Their knowledge of Brampton's newer subdivisions was invaluable.",
    rating: 5
  },
  {
    name: "Carlos Rodriguez",
    location: "Bramalea, Brampton",
    content: "We've used ASADS for multiple property inspections in Brampton. Their attention to detail is unmatched, especially with older Brampton homes. The thermal imaging service identified hidden moisture issues that saved us from major repairs.",
    rating: 5
  }
];

export default function Brampton() {
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

  // Comprehensive Schema Markup for Brampton
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Brampton",
    "description": "Professional home inspection services in Brampton providing comprehensive property assessments, condo inspections, and specialized testing services throughout Peel Region.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "brampton@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Brampton Service Area",
      "addressLocality": "Brampton",
      "addressRegion": "ON",
      "postalCode": "L6T",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.7315,
      "longitude": -79.7624
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.7315,
        "longitude": -79.7624
      },
      "geoRadius": "30000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Brampton"
      },
      {
        "@type": "City",
        "name": "Mississauga"
      },
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
    "image": `${SITE_URL}/images/brampton-home-inspection.jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "186",
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
      "name": "Brampton"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Brampton Home Inspection Services",
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
    "description": "Professional home inspection services in Brampton including pre-purchase inspections, condo inspections, new construction inspections, radon testing, mold inspection, thermal imaging, and specialized property assessments."
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
        "name": "Brampton Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors brampton, property inspection brampton`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-brampton-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-brampton-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Brampton" />
        <meta name="geo.position" content="43.7315;-79.7624" />
        <meta name="ICBM" content="43.7315, -79.7624" />
        
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
                Brampton's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">Brampton</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Brampton</strong>? ASADS provides professional property assessments with licensed inspectors, same-day digital reports, and competitive pricing starting at $450. Serving all Brampton neighborhoods and Peel Region communities.
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
                <span>Licensed Brampton Inspectors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Brampton Inspection
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

      {/* Brampton Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Brampton</strong>, choosing licensed professionals with local expertise is essential for protecting your investment. ASADS Home Inspection provides comprehensive property assessments throughout Peel Region, helping homeowners, buyers, and sellers in Brampton make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in Brampton
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Brampton</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From foundation assessments to roofing evaluations, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Brampton Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Brampton cost</strong> ranges from $450 to $750 for a standard single-family home. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Brampton's competitive market.
                  </p>
                </div>
              </div>
            </div>

            {/* Brampton-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Brampton-Specific Home Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bramptonFeatures.map((feature, index) => (
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
                Complete Brampton Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Brampton property.
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
                  14+ Professional Home Inspection Services in Brampton
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Brampton property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations.
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
                Why Choose ASADS for Home Inspection in Brampton?
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
                Brampton Neighborhoods We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {bramptonNeighborhoods.map((hood, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border text-center"
                  >
                    <MapPin className="h-5 w-5 text-primary mb-2" />
                    <span className="text-sm font-medium text-foreground">{hood.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">{hood.service}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Also serving nearby communities including Mississauga, Caledon, Bolton, Georgetown, and all Peel Region.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Brampton
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
                What Brampton Homeowners Say About Our Inspections
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
                Ready to Schedule Your Brampton Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in Brampton today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Peel Region.
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
                  <a href="mailto:brampton@asads.ca" className="text-primary hover:underline text-lg font-bold">
                    brampton@asads.ca
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
                    Book Your Brampton Inspection Online
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
