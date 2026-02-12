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
  Anchor,
  Waves,
  Ship,
  Trees,
  Mountain,
  Castle,
  Leaf,
  Briefcase,
  Building2
} from "lucide-react";

// Primary keyword: "home inspection burlington"
// Secondary keywords: "home inspection burlington ontario", "home inspection halton region", "burlington home inspectors"
const primaryKeyword = "home inspection burlington";
const secondaryKeywords = [
  "home inspection burlington ontario",
  "home inspection halton region", 
  "burlington home inspectors",
  "home inspection oakville burlington",
  "burlington ontario home inspection"
];

// Service pages with optimized anchor text
const allServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete evaluation before buying a home in Burlington",
    icon: <Home className="h-6 w-6" />,
    anchorText: "pre-purchase home inspection in Burlington"
  },
  { 
    title: "New Construction Inspection", 
    href: "/services/new-construction",
    description: "Phase and final inspections for newly built homes in Burlington",
    icon: <Award className="h-6 w-6" />,
    anchorText: "new construction inspection Burlington"
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Home inspection before selling your Burlington property",
    icon: <FileText className="h-6 w-6" />,
    anchorText: "pre-listing home inspection Burlington"
  },
  { 
    title: "Commercial Inspection", 
    href: "/services/commercial",
    description: "Commercial and waterfront property inspections in Burlington",
    icon: <Building className="h-6 w-6" />,
    anchorText: "commercial property inspection Burlington"
  },
  { 
    title: "Condominium Inspection", 
    href: "/services/condo-inspection",
    description: "Condominium inspections in Burlington's luxury waterfront market",
    icon: <Building2 className="h-6 w-6" />,
    anchorText: "condo inspection Burlington"
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Radon gas testing for homes in Burlington and Halton Region",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "radon testing in Burlington"
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold inspection and testing in Burlington waterfront homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "mold inspection Burlington"
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared thermal imaging inspections for Burlington properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "thermal imaging inspection Burlington"
  },
  { 
    title: "WETT Inspection", 
    href: "/services/wett",
    description: "WETT-certified inspections for wood-burning appliances",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "WETT inspection Burlington"
  },
  { 
    title: "Sewer Scope Inspection", 
    href: "/services/sewer-scope",
    description: "Camera sewer line inspections for Burlington homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "sewer scope inspection Burlington"
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Asbestos testing for older homes in Burlington",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "asbestos testing Burlington"
  },
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Lead-based paint testing for heritage Burlington properties",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "lead paint testing Burlington"
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Indoor air quality testing in Burlington homes",
    icon: <Thermometer className="h-6 w-6" />,
    anchorText: "air quality testing Burlington"
  },
  { 
    title: "Investment Property Inspection", 
    href: "/services/investment-property",
    description: "Inspections for rental and investment properties in Burlington",
    icon: <DollarSign className="h-6 w-6" />,
    anchorText: "investment property inspection Burlington"
  }
];

// Burlington areas - NO LINKS, just display
const burlingtonAreas = [
  { name: "Downtown Burlington", service: "Home Inspection" },
  { name: "Aldershot", service: "Home Inspection" },
  { name: "Roseland", service: "Home Inspection" },
  { name: "Shoreacres", service: "Home Inspection" },
  { name: "Mountainside", service: "Home Inspection" },
  { name: "Orchard", service: "Home Inspection" },
  { name: "Headon Forest", service: "Home Inspection" },
  { name: "Millcroft", service: "Home Inspection" },
  { name: "Tansley", service: "Home Inspection" },
  { name: "Alton", service: "Home Inspection" },
  { name: "Elizabeth Gardens", service: "Home Inspection" },
  { name: "Maple", service: "Home Inspection" },
  { name: "Brant Hills", service: "Home Inspection" },
  { name: "Tyandaga", service: "Home Inspection" },
  { name: "Central", service: "Home Inspection" },
  { name: "Palmer", service: "Home Inspection" }
];

// Nearby towns - NO LINKS
const nearbyTowns = [
  "Oakville",
  "Hamilton", 
  "Mississauga",
  "Milton",
  "Waterdown",
  "Ancaster",
  "Dundas",
  "Stoney Creek",
  "Grimsby",
  "St. Catharines",
  "Niagara-on-the-Lake",
  "Toronto"
];

// SEO-optimized metadata
const metaTitle = "Home Inspection Burlington | Professional Property Inspections in Burlington, ON | ASADS";
const metaDescription = "Looking for comprehensive home inspection in Burlington? ASADS provides professional property inspections with licensed inspectors, same-day reports, and thorough evaluations. Serving Burlington, Oakville, Hamilton, and Halton Region.";
const pageTitle = "Professional Home Inspection Services in Burlington, Ontario | ASADS Certified Inspectors";
const price = "$350-$600";
const duration = "2 Hours";

// Comprehensive inspection checklist for Burlington properties
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
  "Waterfront Property & Erosion Assessments"
];

// E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness
const expertisePoints = [
  "Licensed Ontario Home Inspectors",
  "InterNACHI Certified Professionals",
  "15+ Years Burlington Property Inspection Experience",
  "Waterfront Property Specialists",
  "Luxury Home Inspection Experts",
  "New Construction Code Compliance Experts",
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
  "Flexible Scheduling for Busy Professionals",
  "Pre-Inspection Consultation Included",
  "Post-Inspection Review Session",
  "Investment Property Assessments",
  "Free Follow-up Questions for 12 Months"
];

// Burlington-specific content about local considerations
const burlingtonFeatures = [
  {
    icon: <Waves className="h-5 w-5" />,
    title: "Lake Ontario Waterfront Experts",
    description: "Expert inspections for Burlington's waterfront properties with attention to erosion, flooding, and lake effect considerations."
  },
  {
    icon: <Mountain className="h-5 w-5" />,
    title: "Escarpment Property Specialists",
    description: "Comprehensive inspections for properties along the Niagara Escarpment with attention to foundation stability and drainage."
  },
  {
    icon: <Castle className="h-5 w-5" />,
    title: "Luxury Home Experience",
    description: "Detailed inspections for Burlington's high-end properties, custom builds, and estate homes with premium features."
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Heritage District Knowledge",
    description: "Inspections for Burlington's heritage conservation districts and historic properties with preservation requirements."
  }
];

// Comprehensive FAQ based on search intent
const faqs = [
  {
    question: "How much does a home inspection cost in Burlington?",
    answer: `The average <strong>home inspection Burlington cost</strong> ranges from $350 to $600 for a standard residential property. Waterfront properties and luxury homes may range from $750-$1,200, while condominiums typically range from $400-$600. We provide detailed quotes based on your specific property's size, age, location, and inspection requirements.`
  },
  {
    question: "What does a home inspection include in Burlington?",
    answer: `A comprehensive <strong>home inspection in Burlington</strong> includes evaluation of all major systems: structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, windows, doors, insulation, and interior finishes. Our inspections follow the Ontario Association of Home Inspectors (OAHI) Standards of Practice and include specialized assessments for Burlington's waterfront and escarpment properties.`
  },
  {
    question: "How long does a home inspection take in Burlington?",
    answer: `Most <strong>Burlington home inspections</strong> take 2-3 hours depending on property size and complexity. Waterfront properties and larger luxury homes require additional time for thorough assessment of specialized systems and features. We never rush inspections and allocate sufficient time to properly assess every component of your Burlington property.`
  },
  {
    question: "Should I attend the home inspection in Burlington?",
    answer: `Yes, we strongly recommend attending your <strong>Burlington home inspection</strong>. This allows you to walk through the property with our inspector, ask questions in real-time, learn about maintenance requirements for Burlington's specific climate and waterfront considerations, and understand the significance of any issues discovered. We provide valuable insights about property maintenance and local building practices.`
  },
  {
    question: "What are the most common issues found in Burlington home inspections?",
    answer: `Common issues in <strong>Burlington homes</strong> include: foundation settling in waterfront properties, moisture issues in basements due to high water table, erosion concerns near Lake Ontario, aging electrical systems in older homes, roof issues on heritage properties, insulation deficiencies in older construction, and aging plumbing in properties from the 1950s-1970s.`
  },
  {
    question: "How soon will I receive my inspection report in Burlington?",
    answer: `We provide <strong>same-day digital reports</strong> for all Burlington home inspections. You'll receive your comprehensive inspection report via email within 4-6 hours of completing the inspection. Reports include detailed findings, high-resolution photos, maintenance recommendations, and prioritized repair suggestions to help you make informed decisions about your Burlington property.`
  },
  {
    question: "Do you inspect waterfront properties in Burlington?",
    answer: `Yes, we specialize in <strong>waterfront property inspections in Burlington</strong>. Our inspections include assessment of erosion control measures, flood risk evaluation, dock and seawall conditions, and specialized moisture detection for properties along Lake Ontario. We understand the unique requirements of Burlington's waterfront communities.`
  },
  {
    question: "What areas of Burlington do you service?",
    answer: `We provide <strong>home inspection services throughout Burlington</strong> including Downtown, Aldershot, Roseland, Shoreacres, Mountainside, Headon Forest, Millcroft, and all surrounding neighborhoods. We also serve nearby communities in Halton Region including Oakville, Hamilton, Milton, and Waterdown.`
  }
];

// Testimonials for social proof
const testimonials = [
  {
    name: "Robert Johnson",
    location: "Shoreacres, Burlington",
    content: "The ASADS home inspection for our waterfront property in Burlington was exceptional. The inspector understood lake effect considerations and identified several critical foundation and erosion issues we would have missed. The detailed report helped us negotiate repairs and plan proper maintenance. Highly recommended for Burlington's lakefront properties!",
    rating: 5
  },
  {
    name: "Jennifer Lee",
    location: "Roseland",
    content: "As luxury home buyers in Burlington, we needed an inspection that understood high-end features and custom construction. ASADS delivered exactly what we needed. Their attention to detail and knowledge of premium systems gave us complete confidence in our purchase. The thermal imaging identified hidden insulation issues that saved us thousands.",
    rating: 5
  },
  {
    name: "Michael Thompson",
    location: "Aldershot",
    content: "We've used ASADS for multiple property inspections in Burlington's growing market. Their thorough approach and understanding of both heritage requirements and modern luxury features have been invaluable. They identified several code compliance issues in our new construction that the builder had missed.",
    rating: 5
  }
];

export default function Burlington() {
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

  // Comprehensive Schema Markup for Burlington
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Burlington",
    "description": "Professional home inspection services in Burlington, Ontario providing comprehensive property assessments, waterfront home inspections, and luxury property evaluations.",
    "url": pageUrl,
    "telephone": "+16478019311",
    "email": "burlington@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Burlington Service Area",
      "addressLocality": "Burlington",
      "addressRegion": "ON",
      "postalCode": "L7L",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.3255,
      "longitude": -79.7990
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.3255,
        "longitude": -79.7990
      },
      "geoRadius": "40000"
    },
    "serviceArea": [
      {
        "@type": "City",
        "name": "Burlington"
      },
      {
        "@type": "City",
        "name": "Oakville"
      },
      {
        "@type": "City",
        "name": "Hamilton"
      },
      {
        "@type": "City",
        "name": "Mississauga"
      },
      {
        "@type": "City",
        "name": "Milton"
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
    "priceRange": "$$$",
    "image": `${SITE_URL}/images/burlington-home-inspection.jpg`,
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
      "name": "Burlington"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Burlington Home Inspection Services",
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
    "description": "Professional home inspection services in Burlington including pre-purchase inspections, waterfront property assessments, luxury home inspections, radon testing, mold inspection, thermal imaging, and investment property evaluations."
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
        "name": "Burlington Home Inspection Services",
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
        <meta name="keywords" content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}, home inspectors burlington ontario, property inspection halton region`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/images/og-burlington-home-inspection.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/twitter-burlington-home-inspection.jpg`} />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Burlington" />
        <meta name="geo.position" content="43.3255;-79.7990" />
        <meta name="ICBM" content="43.3255, -79.7990" />
        
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
                Burlington's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in <span className="text-secondary">Burlington, Ontario</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for comprehensive <strong>home inspection in Burlington</strong>? ASADS provides professional property assessments with licensed inspectors, waterfront property expertise, and same-day digital reports. Serving Burlington, Oakville, Hamilton, and Halton Region.
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
                <span>Licensed Waterfront Property Inspectors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Burlington Inspection
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

      {/* Burlington Home Inspection Content - SEO Optimized */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction with Primary Keyword */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  When searching for <strong>home inspection companies in Burlington</strong>, choosing licensed professionals with local waterfront and escarpment expertise is essential for protecting your investment in one of Canada's most desirable communities. ASADS Home Inspection provides comprehensive property assessments throughout Burlington and Halton Region, helping homeowners, buyers, and sellers make informed decisions with confidence.
                </p>
                
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Comprehensive Home Inspection Services in Burlington, Ontario
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Our <Link to="/services/pre-purchase" className="text-primary hover:underline font-medium">pre-purchase home inspection in Burlington</Link> is designed to identify both obvious defects and hidden problems that could cost thousands in repairs. From waterfront property evaluations to luxury home assessments, our licensed inspectors examine every accessible component of your property following Ontario's Standards of Practice.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Burlington Home Inspection Cost & Value
                  </h3>
                  <p className="text-muted-foreground">
                    The average <strong>home inspection Burlington cost</strong> ranges from $500 to $850 for a standard residential property. Waterfront properties and luxury homes may range from $750-$1,200, while condominiums typically range from $400-$600. While price is an important consideration, the true value comes from thorough inspection and detailed reporting that can save you thousands in unexpected repairs and provide negotiation leverage during real estate transactions in Burlington's competitive market.
                  </p>
                </div>
              </div>
            </div>

            {/* Burlington-Specific Features */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Burlington-Specific Inspection Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {burlingtonFeatures.map((feature, index) => (
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
                Complete Burlington Home Inspection Checklist
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
                        Thorough evaluation and detailed reporting of this critical component in your Burlington property.
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
                  14+ Professional Home Inspection Services in Burlington
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive inspection solutions for every Burlington property type and concern. Each service includes detailed reporting, expert analysis, and professional recommendations tailored to Burlington's luxury housing market.
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
                Why Choose ASADS for Home Inspection in Burlington?
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
                Burlington Areas We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {burlingtonAreas.map((area, index) => (
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
                  Also serving nearby communities including Oakville, Hamilton, Mississauga, Milton, and throughout Halton Region.
                </p>
              </div>
            </div>

            {/* FAQ Section - Optimized for Featured Snippets */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Burlington
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
                What Burlington Homeowners Say About Our Inspections
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
                Ready to Schedule Your Burlington Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection in Burlington today. Our licensed inspectors provide detailed assessments with same-day reports, competitive pricing, and professional service throughout Burlington and Halton Region.
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
                    Book Your Burlington Inspection Online
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
