import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Flame, 
  ShieldCheck, 
  Thermometer, 
  FileText, 
  CheckCircle, 
  Phone, 
  Calendar,
  Clock,
  AlertTriangle,
  Home,
  Search,
  Zap,
  Droplets,
  ArrowRight,
  MapPin,
  PhoneCall,
  Building,
  Users,
  Award,
  Target,
  Eye,
  BookOpen,
  ThumbsUp,
  BadgeCheck,
  ChevronRight,
  Wind,
  Cloud,
  Droplet,
  AlertCircle,
  Heart,
  EyeOff,
  Camera,
  Snowflake,
  Wifi,
  Shield,
  Building2,
  Factory,
  HardHat,
  Gavel,
  Wrench,
  AlertOctagon,
  Bell,
  Battery,
  Compass,
  ClipboardCheck
} from "lucide-react";

// Featured locations for service pages internal linking
const featuredLocations = [
  { name: "Toronto", slug: "toronto" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Brampton", slug: "brampton" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Markham", slug: "markham" },
  { name: "Oakville", slug: "oakville" },
  { name: "Hamilton", slug: "hamilton" },
  { name: "Burlington", slug: "burlington" },
  { name: "Richmond Hill", slug: "richmond-hill" },
  { name: "Oshawa", slug: "oshawa" },
  { name: "Barrie", slug: "barrie" },
  { name: "Newmarket", slug: "newmarket" },
];

const title = "WETT Inspection";
const metaTitle = "WETT Inspection Toronto | Insurance Certified Wood Stove & Fireplace Safety | ASADS";
const metaDescription = "Certified WETT inspections in Toronto & GTA for wood-burning appliances. Insurance-approved safety reports for fireplaces, wood stoves, and pellet stoves. CSA B365 compliant. Same-day certification with thermal imaging included.";
const price = "$249-$399";
const duration = "1-2 Hours";

const whatWeInspect = [
  "Clearance to Combustible Materials – verify minimum safe distances from walls, ceilings, and floors to prevent fire hazards",
  "Hearth & Floor Protection – assess proper extension and construction of non-combustible hearth materials",
  "Chimney Liner Integrity & Flue Gas Temperatures – evaluate chimney liner condition and measure flue gas temperatures for safe operation",
  "Damper Operation & Air Control Systems – test functionality of dampers and combustion air controls",
  "Creosote Accumulation & Soot Deposits – identify dangerous creosote buildup requiring professional chimney sweeping",
  "Masonry & Mortar Condition – assess structural integrity of brickwork and mortar joints in chimneys and fireplaces",
  "Chimney Cap & Spark Arrestor Installation – verify proper termination caps and spark protection",
  "Firebox & Refractory Panels – inspect firebox condition and refractory lining for cracks or deterioration",
  "Appliance Installation & Mounting Security – ensure proper secure mounting and installation according to manufacturer specifications",
  "Chimney Termination Height & Location – verify proper chimney height above roof and distance from obstructions",
  "Smoke & Carbon Monoxide Detector Proximity – confirm proper placement of safety detectors relative to wood-burning appliances",
  "Thermal Imaging Heat Leak Detection – use infrared cameras to identify overheating behind walls and around chimney thimbles"
];

const features = [
  {
    title: "Insurance-Compliant WETT Certification",
    description: "Our WETT inspection reports are specifically formatted to meet the strict documentation requirements of all major Canadian insurance providers including Intact, TD Insurance, Aviva, and Sonnet. We provide clear, detailed certification that satisfies insurance policy riders for wood-burning appliances, ensuring your coverage remains valid and claims won't be denied due to non-compliance with CSA B365 standards."
  },
  {
    title: "Advanced Thermal Imaging Included with Every Inspection",
    description: "Unlike standard visual-only WETT inspections, ASADS includes professional infrared thermal imaging as part of every assessment. Our FLIR® thermal cameras detect hidden heat signatures, compromised flue liners, and dangerous overheating behind walls that visual inspections miss. This enhanced technology provides superior fire safety assessment by revealing thermal anomalies invisible to the naked eye, ensuring comprehensive safety evaluation."
  },
  {
    title: "CSA B365 & Ontario Building Code Compliance Verification",
    description: "Our certified WETT specialists perform comprehensive 50-point assessments against current CSA B365 installation standards and Ontario Building Code requirements. We verify critical safety clearances, proper installation methods, chimney specifications, and ventilation requirements. Our detailed inspection covers every aspect from appliance selection to chimney termination, ensuring complete regulatory compliance for residential and commercial wood-burning systems."
  },
  {
    title: "Real Estate Transaction Support & Emergency Same-Day Service",
    description: "We specialize in WETT inspections for real estate transactions, providing same-day digital reports that keep closings on schedule. Our inspectors work directly with buyers, sellers, and real estate agents to navigate inspection findings and recommend practical solutions for compliance issues. We offer emergency booking for urgent insurance requirements and coordinate with certified installers for any necessary repairs or upgrades identified during inspection."
  }
];

const benefits = [
  "Insurance acceptance with all major Canadian providers for wood-burning appliance coverage",
  "Thermal imaging included at no extra cost for enhanced safety assessment",
  "Same-day digital certification reports delivered via email for immediate proof of compliance",
  "Certified WETT specialists with additional training in building science and infrared thermography",
  "Comprehensive 50-point safety checklist covering all CSA B365 requirements",
  "Detailed documentation with annotated photos and thermal images for insurance submission",
  "Clear remediation recommendations with contractor referrals for any required repairs",
  "Real estate transaction support to ensure closings proceed without delays",
  "Evening and weekend appointments available for minimal disruption",
  "Master Inspector oversight on all complex or multi-appliance installations",
  "Professional chimney sweeping recommendations based on creosote assessment",
  "Emergency 24/7 booking for urgent insurance compliance requirements"
];

const faqs = [
  {
    question: "Why do insurance companies require WETT inspections for wood-burning appliances?",
    answer: "Insurance providers view wood-burning appliances as significant fire risks, accounting for thousands of residential fires annually in Canada. A WETT inspection provides documented proof that your fireplace, wood stove, or pellet stove was installed and maintained according to CSA B365 standards and Ontario Building Code requirements. This certification reduces the insurer's liability by verifying proper installation clearances, chimney specifications, and safety features. Most policies include specific 'Wood-Burning Heat' riders that require current WETT certification for coverage to remain valid, particularly after property transfers or insurance policy renewals."
  },
  {
    question: "How often should I get a WETT inspection, and how long is the certification valid?",
    answer: "WETT certification validity varies by insurance provider, but most companies require renewal every 3 to 5 years. Annual inspections are recommended if you use your wood-burning appliance regularly (more than 30 fires per season) or if you notice performance changes. Mandatory re-inspection is required whenever: 1) Property ownership changes, 2) Insurance policy renews with wood-burning appliance coverage, 3) The appliance is relocated or modified, 4) After chimney sweeping or significant repairs, or 5) If damage is suspected from earthquakes, settling, or weather events. We recommend checking your specific insurance policy for their WETT recertification requirements."
  },
  {
    question: "What happens during a WETT inspection, and what components are examined?",
    answer: "Our certified WETT specialists perform a comprehensive 50-point assessment that includes: 1) Measuring clearances from combustible walls, ceilings, and floors, 2) Assessing hearth extension dimensions and construction, 3) Inspecting chimney liner integrity and measuring flue gas temperatures, 4) Testing damper operation and combustion air controls, 5) Evaluating creosote accumulation and recommending sweeping if needed, 6) Checking masonry and mortar condition, 7) Verifying chimney cap and spark arrestor installation, 8) Inspecting firebox refractory panels, 9) Ensuring proper appliance mounting and security, 10) Confirming chimney termination height and location, 11) Checking smoke and CO detector proximity, and 12) Performing thermal imaging to detect hidden heat issues. Each component is documented with photos and measurements for your report."
  },
  {
    question: "What are the most common reasons a wood-burning appliance fails a WETT inspection?",
    answer: "Common WETT inspection deficiencies include: 1) Insufficient clearance to combustible materials (walls, mantels, furniture), 2) Inadequate hearth extension (minimum 18 inches in front, 8 inches on sides for most appliances), 3) Damaged or missing chimney liners, 4) Excessive creosote accumulation (over ¼ inch thickness), 5) Cracked firebox or refractory panels, 6) Improper chimney termination (too low relative to roof peak or nearby obstructions), 7) Missing spark arrestor or chimney cap, 8) Inoperable dampers or air controls, 9) Unsecured appliance installation, and 10) Missing or improperly placed smoke/CO detectors. Most deficiencies can be corrected by certified installers, and we provide clear remediation steps with our inspection reports."
  },
  {
    question: "Can you inspect the roof and chimney exterior during a WETT inspection?",
    answer: "Yes, a complete WETT inspection includes examination of the chimney exterior and roof penetration. Our certified inspectors safely access roof areas (weather and safety conditions permitting) to visually inspect chimney termination height, flashing integrity, chimney cap condition, and clearance from roof combustibles. We assess chimney structure, mortar condition, and any visible cracks or deterioration. For multi-story buildings or unsafe roof conditions, we may recommend additional specialized inspection services. Thermal imaging from interior spaces can also reveal chimney liner issues without roof access in some cases."
  },
  {
    question: "What is the difference between a WETT inspection and a regular home inspection's fireplace assessment?",
    answer: "A standard home inspection includes only basic visual assessment of fireplaces and wood stoves, while a WETT inspection provides comprehensive technical evaluation against CSA B365 standards by certified specialists. Key differences: 1) WETT inspectors have specialized training in wood energy technology, 2) WETT inspections measure specific clearances and dimensions against code requirements, 3) WETT includes detailed flue and chimney assessment, 4) WETT provides insurance-compliant certification documentation, 5) WETT inspectors can recommend specific corrective actions for compliance, and 6) WETT includes thermal imaging for hidden defect detection. For insurance purposes, only WETT certification is typically accepted."
  },
  {
    question: "How much does a WETT inspection cost in Toronto, and what factors affect the price?",
    answer: "WETT inspections in the GTA typically range from $249 for a single appliance with straightforward access to $399 for complex installations or multiple appliances. Factors affecting price include: 1) Number of wood-burning appliances, 2) Chimney accessibility (roof pitch, height), 3) Property type (single-family, condo, commercial), 4) Location within the GTA, 5) Urgency of service (same-day emergency service may have premium), and 6) Additional services like thermal imaging or moisture assessment. Our standard WETT inspection includes thermal imaging and same-day digital reporting at no extra cost. Contact us at (647) 801-9311 for an accurate quote based on your specific situation."
  },
  {
    question: "What should I do to prepare for a WETT inspection?",
    answer: "For optimal WETT inspection results: 1) Ensure clear access to the fireplace or wood stove (remove furniture, decorations, or screens), 2) Provide access to the chimney chase, attic, or crawlspace if applicable, 3) Have the appliance and chimney professionally cleaned at least 48 hours before inspection (not immediately before, as fresh soot can hide defects), 4) Clear snow and debris from roof access areas in winter, 5) Have installation manuals or previous inspection reports available if possible, 6) Ensure the appliance has not been used for at least 12 hours before inspection (cold system), and 7) Notify us of any known issues or concerns beforehand. Our inspector will guide you through any additional specific preparations upon booking."
  }
];

const relatedServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete property assessment including fireplace safety evaluation and thermal imaging."
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Advanced infrared scanning for hidden heat issues, moisture, and energy efficiency problems."
  },
  { 
    title: "Chimney Inspection & Cleaning", 
    href: "/services/chimney-inspection",
    description: "Professional chimney assessment, cleaning, and repair recommendations for safe operation."
  },
  { 
    title: "Energy Efficiency Audit", 
    href: "/services/energy-audit",
    description: "Comprehensive energy assessment including fireplace efficiency evaluation and heat loss analysis."
  },
];

export default function WETTInspection() {
  const location = useLocation();
  const serviceUrl = getCanonicalUrl(location.pathname);

  // Schema 1: LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection",
    "image": `${SITE_URL}/images/logo.png`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": "+16478019311",
    "email": "info@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M5V",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.653226,
      "longitude": -79.383184
    },
    "areaServed": [
      { "@type": "State", "name": "Ontario" },
      { "@type": "City", "name": "Toronto" },
      { "@type": "City", "name": "Mississauga" },
      { "@type": "City", "name": "Brampton" },
      { "@type": "City", "name": "Vaughan" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "22:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "247"
    }
  };

  // Schema 2: Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "WETT Inspection",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection",
      "telephone": "+16478019311",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "addressCountry": "CA"
      },
      "areaServed": {
        "@type": "State",
        "name": "Ontario"
      }
    },
    "description": "Certified WETT inspections in Toronto and GTA for insurance compliance of wood-burning appliances. CSA B365 standards verification for fireplaces, wood stoves, and pellet stoves. Thermal imaging included with every inspection.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Specialized Safety Inspections",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "WETT Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard WETT Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multiple Appliance WETT Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial WETT Certification"
          }
        }
      ]
    }
  };

  // Schema 3: FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Schema 4: BreadcrumbList
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
        "name": "Services",
        "item": getCanonicalUrl("/services")
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "WETT Inspection",
        "item": serviceUrl
      }
    ]
  };

  // Schema 5: Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASADS Home Inspection",
    "alternateName": "ASADS",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+16478019311",
      "contactType": "customer service",
      "email": "info@asads.ca",
      "areaServed": "CA",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.facebook.com/share/1ZhWQk97YY/",
      "https://www.instagram.com/asads_home_inspection",
      "https://youtube.com/@asadshomeinspection",
      "https://x.com/AsadsInspection",
      "https://tiktok.com/@asads_home_inspection"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    },
    "description": "ASADS Home Inspection provides professional WETT inspections, thermal imaging, and home inspection services across Ontario. Certified WETT specialists for insurance compliance of wood-burning appliances."
  };

  // Schema 6: WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": serviceUrl,
    "inLanguage": "en-CA",
    "isPartOf": {
      "@type": "WebSite",
      "name": "ASADS Home Inspection",
      "url": SITE_URL
    },
    "breadcrumb": breadcrumbSchema,
    "mainEntity": {
      "@type": "Service",
      "serviceType": "WETT Inspection"
    },
    "specialty": "Specialized Safety Inspections",
    "about": {
      "@type": "Thing",
      "name": "WETT Inspection",
      "description": "Certified inspection of wood-burning appliances for insurance compliance and fire safety"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - WETT Inspection Services",
    "image": `${SITE_URL}/images/services/wett-inspection.jpg`,
    "priceRange": price,
    "telephone": "+16478019311",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M5V",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.653226,
      "longitude": -79.383184
    },
    "url": serviceUrl,
    "paymentAccepted": "Cash, Credit Card, Debit, E-Transfer",
    "openingHours": "Mo-Su 07:00-22:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "247"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Homeowner in Mississauga"
        },
        "datePublished": "2025-01-20",
        "reviewBody": "ASADS performed our WETT inspection when we were purchasing a home with a wood stove. The thermal imaging found overheating behind the wall that a visual inspection would have missed. Their detailed report helped us negotiate repairs and get our insurance approved without issues. Highly professional service.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Property Manager in Toronto"
        },
        "datePublished": "2025-02-10",
        "reviewBody": "We manage multiple rental properties with fireplaces and require regular WETT inspections for insurance. ASADS provides consistent, thorough inspections with same-day reports that satisfy our insurance provider. Their thermal imaging add-on has identified several potential fire hazards before they became serious issues.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "WETT Inspection Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Residential WETT Inspections",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Single Appliance WETT Inspection",
                "description": "Certified WETT inspection for one wood-burning appliance with thermal imaging included"
              },
              "price": "249",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Multiple Appliance WETT Inspection",
                "description": "WETT inspection for multiple fireplaces or wood stoves in the same property"
              },
              "price": "349",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Specialized WETT Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Emergency Same-Day WETT Inspection",
                "description": "Urgent WETT certification for real estate closings or immediate insurance requirements"
              },
              "price": "399",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial WETT Certification",
                "description": "WETT inspection for commercial properties, restaurants, or multi-unit buildings"
              },
              "price": "499",
              "priceCurrency": "CAD"
            }
          ]
        }
      ]
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={serviceUrl} />

        {/* Open Graph */}
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={serviceUrl} />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
          
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
          
        {/* Schema 1: LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
          
        {/* Schema 2: Service */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
          
        {/* Schema 3: FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
          
        {/* Schema 4: BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
          
        {/* Schema 5: Organization */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
          
        {/* Schema 6: WebPage */}
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
          
        {/* Schema 7: ProfessionalService */}
        <script type="application/ld+json">
          {JSON.stringify(professionalServiceSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Flame className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  Certified WETT Inspection Services
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  WETT Inspection
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Insurance-compliant safety certification for wood-burning appliances. CSA B365 standards verification with thermal imaging included. Same-day reports accepted by all major insurance providers.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Same-Day Certification</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Insurance Approved</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule WETT Inspection
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
                  (647) 801-9311
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Banner */}
      <section className="py-6 bg-accent text-accent-foreground">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm opacity-90">Starting at</p>
              <p className="font-heading text-3xl font-bold">{price}</p>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5" />
              <span>CSA B365 Compliant • Thermal Imaging Included • Insurance Approved</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book WETT Inspection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Comprehensive WETT Certification for Insurance Compliance & Fire Safety
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    A <strong>WETT (Wood Energy Technology Transfer) inspection</strong> is a mandatory requirement for most Ontario home insurance policies covering wood-burning appliances. Our certified WETT specialists provide comprehensive safety evaluations that verify compliance with <strong>CSA B365 installation standards</strong> and Ontario Building Code requirements. Whether you have a wood stove, pellet stove, or traditional masonry fireplace, proper certification ensures your insurance coverage remains valid and your family remains safe from fire hazards.
                  </p>
                  <p>
                    Unlike standard visual-only inspections, ASADS enhances every WETT assessment with professional <strong>infrared thermal imaging</strong>. This advanced technology detects hidden heat signatures, compromised flue liners, and dangerous overheating behind walls that visual inspections cannot identify. Our integrated approach provides superior fire safety assessment by revealing thermal anomalies invisible to the naked eye, giving you complete confidence in your wood-burning system's safety.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-xl my-6">
                    <h4 className="text-blue-900 font-bold flex items-center gap-2 mb-2">
                      <Thermometer className="text-blue-600" size={20} />
                      Enhanced Thermal Imaging Analysis Included
                    </h4>
                    <p className="text-blue-800">
                      Standard WETT inspections are visual only. ASADS includes <strong>Infrared Thermal Imaging</strong> at no extra cost to detect hidden heat signatures, compromised flue liners, and dangerous overheating behind walls that visual inspections miss. This provides a superior level of fire safety assessment for complete peace of mind.
                    </p>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Insurance Compliance: Why WETT Certification is Mandatory</h3>
                  <p>
                    Insurance providers require WETT certification because wood-burning appliances present significant fire risks. In Ontario, improperly installed or maintained fireplaces and wood stoves account for thousands of residential fires annually. Insurance companies view certified WETT inspections as essential risk management, providing documented proof that installations meet current safety standards. Without valid WETT certification, insurance claims related to wood-burning appliances may be denied, and policies may be cancelled or not renewed.
                  </p>
                  <p>
                    Our WETT inspection reports are specifically formatted to meet the strict documentation requirements of all major Canadian insurance providers including <strong>Intact, TD Insurance, Aviva, Sonnet, and Economical</strong>. We provide clear, detailed certification that satisfies insurance policy riders for wood-burning appliances, ensuring your coverage remains valid. Our reports include annotated photographs, thermal images, measurement documentation, and clear compliance statements that insurance adjusters require for policy validation.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The 50-Point WETT Safety Assessment: What We Examine</h3>
                  <p>
                    Our certified WETT specialists perform comprehensive 50-point assessments against current CSA B365 installation standards. We begin by verifying proper <strong>clearances to combustible materials</strong>—measuring minimum safe distances from walls, ceilings, floors, and furniture. Inadequate clearance is the most common cause of fireplace-related fires, and our precise measurements ensure compliance with manufacturer specifications and building codes.
                  </p>
                  <p>
                    We assess <strong>hearth and floor protection</strong> dimensions and construction, verifying proper extension beyond the appliance (minimum 18 inches in front, 8 inches on sides for most units). The inspection evaluates <strong>chimney liner integrity</strong> through visual examination and thermal imaging, identifying cracks, deterioration, or improper sizing that could allow heat transfer to combustible structures. We measure <strong>flue gas temperatures</strong> to verify safe operating ranges and test <strong>damper operation and air control systems</strong> for proper functionality.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Creosote Assessment & Chimney Safety Evaluation</h3>
                  <p>
                    <strong>Creosote accumulation</strong> represents one of the most significant fire hazards in wood-burning systems. This highly flammable byproduct of incomplete combustion can ignite within chimney flues, causing dangerous chimney fires that can spread to the home structure. During WETT inspections, we assess creosote buildup thickness and distribution patterns, recommending professional chimney sweeping when accumulation exceeds ¼ inch thickness—the threshold considered hazardous by fire safety authorities.
                  </p>
                  <p>
                    Our chimney evaluation includes examination of <strong>masonry and mortar condition</strong>, identifying cracks, spalling, or deterioration that could compromise structural integrity. We verify proper <strong>chimney cap and spark arrestor installation</strong> to prevent water intrusion, animal nesting, and spark emission. The inspection assesses <strong>chimney termination height and location</strong> relative to roof peaks and nearby obstructions, ensuring proper draft and minimizing downdraft issues that could allow smoke or carbon monoxide to enter living spaces.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <ShieldCheck className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Insurance Compliance</h4>
                      <p className="text-xs text-muted-foreground">Reports accepted by all major Canadian insurance providers for policy validation.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Thermometer className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Thermal Imaging</h4>
                      <p className="text-xs text-muted-foreground">Infrared scanning detects hidden heat issues and compromised flue liners.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <FileText className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Same-Day Reports</h4>
                      <p className="text-xs text-muted-foreground">Digital certification delivered within hours for immediate insurance submission.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Appliance-Specific Inspection Protocols</h3>
                  <p>
                    Different wood-burning appliances require specific inspection protocols. For <strong>wood stoves</strong>, we verify proper installation clearances, secure mounting, door gasket integrity, and baffle system condition. <strong>Pellet stoves</strong> require additional assessment of auger mechanisms, hopper systems, exhaust blowers, and control panel functionality. <strong>Masonry fireplaces</strong> demand thorough examination of firebox refractory panels, smoke shelf configuration, and damper sealing effectiveness.
                  </p>
                  <p>
                    <strong>Factory-built fireplaces</strong> (zero-clearance units) require verification of proper chase construction, combustion air provisions, and manufacturer label legibility. <strong>Fireplace inserts</strong> need assessment of proper fit within existing fireboxes, secure mounting systems, and effective sealing to prevent smoke spillage. Our certified inspectors have extensive experience with all wood-burning appliance types, ensuring appropriate inspection protocols for each specific installation.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Real Estate Transaction Support & Emergency Services</h3>
                  <p>
                    WETT inspections are frequently required during real estate transactions involving properties with wood-burning appliances. Insurance companies typically require current certification before issuing new policies, making WETT inspection a critical path item for closing timelines. We specialize in real estate transaction support, providing <strong>same-day digital reports</strong> that keep closings on schedule and prevent delays.
                  </p>
                  <p>
                    Our inspectors work directly with buyers, sellers, and real estate agents to navigate inspection findings and recommend practical solutions for compliance issues. When deficiencies are identified, we provide clear remediation steps and can coordinate with certified installers for necessary repairs. For urgent situations, we offer <strong>emergency 24/7 booking</strong> to accommodate tight closing deadlines or immediate insurance requirements, ensuring your real estate transaction proceeds without unnecessary complications.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Commercial & Multi-Unit WETT Certification</h3>
                  <p>
                    Commercial properties, restaurants, and multi-unit residential buildings with wood-burning appliances require specialized WETT certification approaches. Commercial installations often involve larger appliances, complex venting systems, and additional safety considerations. Multi-unit buildings demand careful assessment of fire separation requirements, shared chimney systems, and individual unit access provisions.
                  </p>
                  <p>
                    Our certified inspectors have extensive experience with commercial WETT certification, understanding the unique requirements of business insurance policies and commercial building codes. We assess restaurant wood-fired ovens, commercial heating appliances, and decorative fireplaces in lobbies or common areas. For condominiums and townhouse complexes, we coordinate with property management to schedule inspections efficiently while minimizing disruption to residents.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Preventative Maintenance Recommendations & Chimney Sweeping Guidance</h3>
                  <p>
                    Beyond certification, our WETT inspections provide valuable preventative maintenance guidance. We recommend optimal burning practices to minimize creosote formation, proper fuel selection for your specific appliance, and seasonal maintenance schedules to ensure ongoing safety. Our reports include specific recommendations for chimney sweeping frequency based on observed creosote accumulation patterns and your usage habits.
                  </p>
                  <p>
                    When professional chimney sweeping is recommended, we provide guidance on selecting qualified chimney service professionals and can refer you to certified sweeps in your area. We explain what to expect during professional sweeping, how to verify proper cleaning completion, and signs that indicate your chimney may require additional repairs beyond routine maintenance. This comprehensive approach ensures your wood-burning system remains safe between formal WETT inspections.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Common WETT Inspection Deficiencies & Remediation Solutions</h3>
                  <p>
                    Most WETT inspection deficiencies fall into several common categories. <strong>Insufficient clearances</strong> to combustible materials are frequently identified, often requiring installation of non-combustible heat shields or appliance relocation. <strong>Inadequate hearth extensions</strong> may necessitate extending existing hearths with approved non-combustible materials to meet minimum dimension requirements.
                  </p>
                  <p>
                    <strong>Chimney liner issues</strong> commonly include cracked or deteriorating clay liners, improperly sized metal liners, or missing liners altogether. Remediation typically involves professional chimney relining with appropriate materials. <strong>Damaged firebox components</strong> may require refractory panel replacement or masonry repair. Our reports provide clear, actionable remediation steps for each identified deficiency, helping you efficiently address compliance issues.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond WETT: Complementary Safety Assessments</h3>
                  <p>
                    Wood-burning appliance safety extends beyond WETT certification requirements. Consider integrating your WETT inspection with complementary assessments including <Link to="/services/air-quality" className="text-primary hover:underline">indoor air quality testing</Link> to evaluate particulate matter from wood burning, <Link to="/services/carbon-monoxide" className="text-primary hover:underline">carbon monoxide assessment</Link> to verify proper ventilation, or <Link to="/services/thermal-imaging" className="text-primary hover:underline">comprehensive thermal imaging</Link> for broader home energy efficiency evaluation.
                  </p>
                  <p>
                    During real estate transactions, consider combining WETT inspection with <Link to="/services/pre-purchase" className="text-primary hover:underline">pre-purchase home inspection</Link> for comprehensive property assessment. For older homes with extensive wood-burning use, <Link to="/services/mold-inspection" className="text-primary hover:underline">moisture and mold assessment</Link> may be warranted to identify condensation issues related to chimney performance. We coordinate these complementary services to provide holistic safety evaluation of your property's wood-burning systems.
                  </p>
                </div>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What We Inspect
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatWeInspect.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Service Features
                </h2>
                <div className="grid gap-6">
                  {features.map((feature) => (
                    <Card key={feature.title} className="border-border/50">
                      <CardContent className="p-6">
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  WETT Inspection FAQ
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-6">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits Card */}
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Why Choose ASADS for WETT Inspection?
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/booking">Schedule WETT Inspection</Link>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-3">
                      or call <a href="tel:+16478019311" className="text-primary hover:underline">(647) 801-9311</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Related Services
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((service) => (
                      <li key={service.href}>
                        <Link 
                          to={normalizePath(service.href)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-4 w-4" />
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section - Internal Linking */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              {title} Available Throughout Ontario
            </h2>
            <p className="text-muted-foreground">
              We provide WETT inspection services across the Greater Toronto Area
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featuredLocations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/locations/home-inspection-${loc.slug}`}
                className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                {loc.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link 
              to="/locations" 
              className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
            >
              View all service areas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ensure Your Wood-Burning Appliance is Safe & Insured
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't risk insurance denial or fire hazards from uncertified wood-burning appliances. Professional WETT inspection provides the certification you need for insurance compliance and family safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your WETT Inspection</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+16478019311">(647) 801-9311</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
    }
