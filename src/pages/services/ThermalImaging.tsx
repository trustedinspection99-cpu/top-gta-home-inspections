import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Thermometer, 
  Zap, 
  Droplets, 
  Home, 
  ShieldCheck, 
  Search,
  CheckCircle, 
  Phone, 
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  PhoneCall,
  AlertTriangle,
  Building,
  Users,
  Sparkles,
  Award,
  LineChart,
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
  Brain,
  EyeOff,
  Camera,
  Flame,
  Snowflake,
  Wifi
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

const title = "Infrared Thermal Imaging";
const metaTitle = "Infrared Thermal Imaging Toronto | Advanced Leak Detection | ASADS";
const metaDescription = "Professional infrared thermal imaging inspections in Toronto & GTA. Pinpoint hidden leaks, insulation gaps, and electrical hotspots using FLIR military-grade technology. Book certified thermal scan now for urgent pre-purchase or home inspection add-ons.";
const price = "$199-$399";
const duration = "1-2 Hours";

const whatWeInspect = [
  "Moisture Intrusion in Finished Walls & Ceilings – detect water damage behind drywall without destructive testing",
  "Roof & Ceiling Leak Detection – identify active roof leaks and moisture accumulation in attic spaces",
  "Electrical Panel & Circuit Hotspot Analysis – locate overheating components and potential fire hazards",
  "Insulation Voids & Air Leakage – visualize missing insulation and air infiltration points in building envelopes",
  "Thermal Bridging in Building Envelopes – identify areas of heat loss through structural components",
  "Radiant Floor Heating Performance – verify proper operation and identify leaks in in-floor heating systems",
  "HVAC Duct Leakage & Airflow Verification – detect air leaks in ductwork and verify proper system performance",
  "Window & Door Seal Integrity – assess thermal performance and identify failing seals and weatherstripping",
  "Plumbing Drips & Slow Seepage – locate hidden plumbing leaks behind walls and under floors",
  "Attic Ventilation & Heat Loss – evaluate attic insulation coverage and ventilation effectiveness",
  "Foundation & Crawlspace Moisture Profiling – detect moisture intrusion through foundation walls and floors",
  "Firewall Continuity & Breaches – verify fire separation integrity in multi-unit buildings and condominiums"
];

const features = [
  {
    title: "FLIR® High-Resolution Thermal Imaging with MSX® Technology",
    description: "We use professional-grade FLIR thermal cameras with MSX® (Multi-Spectral Dynamic Imaging) that overlays visual details onto thermal images, providing crystal-clear diagnostic results suitable for reports, insurance documentation, and legal proceedings. Our equipment detects temperature differences as small as 0.05°C, revealing issues invisible to conventional inspections."
  },
  {
    title: "Non-Destructive Testing & Investigation",
    description: "Thermal imaging allows us to locate leaks, heat loss, and moisture without cutting walls, removing drywall, or causing property damage. This non-invasive approach saves thousands in repair costs by pinpointing exact problem locations before any destructive investigation begins, preserving your property's integrity while identifying hidden defects."
  },
  {
    title: "Certified Thermographer Interpretation & Analysis",
    description: "Our inspectors hold Level I and Level II Infrared Thermography certifications through the Infrared Training Center (ITC). This specialized training ensures accurate interpretation of thermal patterns, avoiding misdiagnosis of cold spots, reflections, or transient thermal phenomena. Certified analysis separates genuine defects from normal thermal variations."
  },
  {
    title: "Insurance & Real Estate Ready Documentation",
    description: "Our comprehensive thermal imaging reports provide visual proof of defects with annotated thermal images, temperature differential measurements, and detailed explanations. These reports meet insurance claim requirements, support real estate negotiations, and provide documentation for warranty claims and legal disputes regarding property conditions."
  }
];

const benefits = [
  "Detect hidden water leaks before mold develops and causes structural damage",
  "Identify electrical fire hazards from overloaded circuits and loose connections",
  "Reduce energy bills by 15-30% through identification of insulation gaps and air leaks",
  "Verify radiant heating system performance and locate hidden pipe leaks",
  "Non-invasive testing preserves property finishes and avoids destructive investigation",
  "Digital report delivered same-day with annotated thermal images and recommendations",
  "Supports pre-purchase, pre-listing, condo, and commercial inspection requirements",
  "Certified thermographers with specialized training in building science applications",
  "Early detection of roof leaks before interior water damage becomes visible",
  "Identification of thermal bridging that leads to condensation and mold growth",
  "Documentation for insurance claims related to water damage and electrical issues",
  "Evening and weekend appointments for minimal disruption to occupants"
];

const faqs = [
  {
    question: "Can thermal imaging see 'through' walls and other building materials?",
    answer: "Thermal imaging does not see through walls in the traditional sense. Instead, it detects surface temperature variations on the exterior of materials. When there is moisture intrusion, missing insulation, air leakage, or electrical issues behind walls, ceilings, or floors, these problems create distinct thermal patterns on the surface. By interpreting these temperature differentials, we can visualize hidden issues without destructive testing. The technology works because different materials and conditions have different thermal properties that affect how heat transfers to surfaces we can scan."
  },
  {
    question: "Is thermal imaging included in a standard home inspection, or is it an add-on service?",
    answer: "At ASADS, thermal imaging is integrated as a standard component of all our pre-purchase and pre-listing home inspections at no additional cost. We believe this advanced technology is essential for thorough property assessment in today's real estate market. For specialized applications like electrical system scans, moisture investigations, or energy audits, we offer standalone thermal imaging services. Whether included or standalone, every thermal scan is conducted by certified thermographers using professional-grade equipment, ensuring comprehensive defect detection beyond what visual inspections alone can achieve."
  },
  {
    question: "Can thermal imaging detect mold directly, or just moisture problems?",
    answer: "Thermal imaging detects moisture intrusion and temperature patterns that indicate conditions conducive to mold growth. While it cannot directly visualize mold spores or colonies, it identifies the moisture sources that enable mold development. By locating hidden moisture behind walls, under floors, or in ceilings before visible signs appear, thermal imaging allows for early intervention to prevent mold establishment. For confirmed mold identification, we recommend combining thermal imaging with air and surface sampling for laboratory analysis. This integrated approach addresses both the symptom (mold) and the cause (moisture)."
  },
  {
    question: "Why is it important to hire a certified thermographer rather than just someone with a thermal camera?",
    answer: "Certified thermographers complete extensive training in thermal physics, emissivity, reflectivity, and infrared interpretation through programs like the Infrared Training Center (ITC). This training is crucial because thermal imaging involves complex variables: different materials emit infrared radiation differently, reflections can create false readings, and environmental conditions affect results. Certified professionals understand how to adjust for these factors, ensuring accurate detection of genuine defects while avoiding false positives from normal thermal variations. Without proper training, operators may misinterpret images, missing real problems or identifying non-issues as defects."
  },
  {
    question: "How much does professional thermal imaging cost in Toronto, and when is it worth the investment?",
    answer: "Professional thermal imaging in Toronto ranges from $199 for targeted scans (like electrical panel inspection) to $399 for comprehensive whole-house thermal assessments. As an add-on to home inspections, it's included at no extra charge with our standard services. The investment is justified when: 1) Investigating suspected hidden moisture issues, 2) Assessing energy efficiency for insulation upgrades, 3) Verifying electrical system safety, 4) Supporting insurance claims for water damage, 5) During real estate transactions to identify hidden defects, or 6) For preventative maintenance in older homes. The cost is typically recovered through energy savings, prevention of major repairs, or negotiation leverage in real estate transactions."
  },
  {
    question: "What types of problems can thermal imaging detect that regular inspections might miss?",
    answer: "Thermal imaging reveals numerous hidden defects that visual inspections cannot detect: 1) Moisture intrusion behind finished walls from roof leaks, plumbing failures, or foundation seepage, 2) Missing or compromised insulation in walls and attics, 3) Air leakage around windows, doors, and electrical penetrations, 4) Overheating electrical components in panels, outlets, and switches, 5) Plumbing leaks behind walls and under slabs, 6) Thermal bridging through structural components causing condensation, 7) HVAC duct leaks and airflow imbalances, 8) In-floor heating system failures, and 9) Pest infestations (rodents and insects create distinct thermal patterns). These issues often remain undetected until they cause significant damage or energy waste."
  },
  {
    question: "How accurate is thermal imaging for detecting electrical problems?",
    answer: "Thermal imaging is exceptionally accurate for electrical system assessment when conducted by certified professionals. Electrical components that are overloaded, loose, corroded, or failing generate excess heat that thermal cameras detect before catastrophic failure occurs. We can identify temperature differentials as small as 1-2°C above ambient conditions, allowing early detection of problems. Common electrical issues found include overloaded circuits, loose connections, failing breakers, undersized wiring, imbalanced loads, and defective electrical equipment. Electrical thermal imaging is considered a best practice by insurance companies and electrical safety authorities for preventative maintenance and fire risk reduction."
  },
  {
    question: "What should I do to prepare my home for a thermal imaging inspection?",
    answer: "For optimal thermal imaging results: 1) Maintain normal indoor temperatures for at least 24 hours before inspection, 2) Ensure HVAC systems are operating normally, 3) Remove furniture or objects blocking walls where possible, 4) For exterior scans, schedule during early morning or evening when temperature differentials are greatest, 5) For electrical scans, ensure normal electrical loads are present (avoid turning everything off), 6) For moisture detection, do not attempt to dry out suspected areas beforehand, 7) Provide access to all rooms, including basements, attics, and crawl spaces. Our certified thermographers will guide you through specific preparation based on your inspection goals. Proper preparation ensures maximum detection capability during the scan."
  }
];

const relatedServices = [
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional mold testing and moisture assessment to identify fungal growth and health risks."
  },
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete property assessment including thermal imaging for comprehensive defect detection."
  },
  { 
    title: "Energy Efficiency Audit", 
    href: "/services/energy-audit",
    description: "Comprehensive energy assessment with blower door testing and thermal imaging analysis."
  },
  { 
    title: "Electrical Safety Inspection", 
    href: "/services/electrical-inspection",
    description: "Detailed electrical system evaluation including thermal scanning of panels and components."
  },
];

export default function ThermalImaging() {
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
    "serviceType": "Infrared Thermal Imaging Inspection",
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
    "description": "Professional infrared thermal imaging inspections in Toronto and the GTA using FLIR thermal cameras. Certified thermographers detect hidden moisture, electrical hotspots, insulation voids, and energy efficiency issues in residential and commercial properties.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Advanced Inspection Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Thermal Imaging Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Thermal Imaging Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electrical System Thermal Scan"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Moisture Detection Thermal Scan"
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
        "name": "Infrared Thermal Imaging",
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
    "description": "ASADS Home Inspection provides professional infrared thermal imaging, home inspection, and environmental testing services across Ontario. Certified thermographers specializing in moisture detection, electrical safety, and energy efficiency assessments."
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
      "serviceType": "Infrared Thermal Imaging Inspection"
    },
    "specialty": "Advanced Inspection Services",
    "about": {
      "@type": "Thing",
      "name": "Infrared Thermal Imaging",
      "description": "Professional thermal imaging using infrared cameras to detect hidden defects in buildings"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Thermal Imaging Services",
    "image": `${SITE_URL}/images/services/thermal-imaging.jpg`,
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
        "datePublished": "2025-02-15",
        "reviewBody": "Thermal imaging found a hidden plumbing leak behind our kitchen wall that was causing mold growth. The thermal camera showed exactly where the moisture was, saving us thousands in drywall removal and guesswork. The report was detailed with annotated images that our plumber used to fix the issue precisely.",
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
          "name": "Commercial Property Manager"
        },
        "datePublished": "2025-01-30",
        "reviewBody": "We use ASADS for annual electrical thermal scans of our commercial buildings. They've identified several overheating panels before they failed, preventing costly downtime and potential fires. The certified thermographers provide thorough reports that help us prioritize maintenance and justify capital expenditures.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Thermal Imaging Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Standard Thermal Imaging",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Whole-House Thermal Scan",
                "description": "Comprehensive thermal imaging of interior and exterior building envelope"
              },
              "price": "399",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Targeted Moisture Detection",
                "description": "Focused thermal scan for suspected water intrusion areas"
              },
              "price": "199",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Specialized Thermal Scans",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Electrical System Thermal Scan",
                "description": "Comprehensive thermal imaging of electrical panels and components"
              },
              "price": "249",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Energy Efficiency Thermal Audit",
                "description": "Thermal imaging for insulation assessment and air leakage detection"
              },
              "price": "349",
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
                <Search className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  Certified Thermography Services
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Infrared Thermal Imaging
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              See the invisible: Advanced thermal leak detection for hidden moisture, energy loss, and electrical hazards. Book a certified thermographer now for non-invasive property assessment.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Same-Day Digital Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Certified Thermographers</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Thermal Scan
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
              <span>FLIR® Thermal Cameras • Certified Thermographers • Non-Destructive Testing</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Thermal Imaging</Link>
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
                  Seeing Beyond the Surface: Advanced Thermal Imaging Technology
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Infrared Thermography (IRT) allows our <strong>Certified Thermographers</strong> to detect hidden defects completely invisible to conventional visual inspections. Using high-resolution FLIR® thermal cameras with MSX® technology, we uncover moisture intrusion, insulation gaps, electrical hotspots, and energy losses before they escalate into costly repairs. This advanced technology transforms how we assess building conditions across Toronto, Mississauga, Vaughan, and throughout the GTA.
                  </p>
                  <p>
                    Every material emits infrared radiation based on its temperature. Thermal cameras detect these infrared emissions and convert them into visual thermal maps called thermograms. Differences in surface temperatures reveal hidden problems: water conducts heat differently than dry materials, electrical resistance creates heat, and missing insulation allows heat transfer. Our certified thermographers interpret these thermal patterns to identify defects with precision unmatched by conventional inspection methods.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Moisture Intrusion Detection: Preventing Water Damage Before It's Visible</h3>
                  <p>
                    Water intrusion is one of the most destructive and costly problems in Ontario homes, particularly during spring thaws and heavy rainfall periods. Thermal imaging detects moisture behind finished walls, ceilings, and floors by identifying temperature differentials caused by evaporative cooling. Wet materials evaporate moisture, creating cooler surface temperatures that thermal cameras visualize as distinct patterns.
                  </p>
                  <p>
                    We regularly identify hidden roof leaks, plumbing failures, foundation seepage, and condensation issues before any visual signs appear. Early detection allows for targeted repairs before moisture causes structural damage, mold growth, or material deterioration. For insurance claims, thermal imaging provides documented evidence of moisture intrusion extent and location, supporting claims and guiding restoration professionals to exact problem areas without destructive exploratory work.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Electrical System Safety: Preventing Fires Before They Start</h3>
                  <p>
                    Electrical failures are a leading cause of residential fires in Ontario. Thermal imaging identifies electrical problems by detecting abnormal heat generation from overloaded circuits, loose connections, failing breakers, and defective components. Electrical resistance creates heat, and thermal cameras visualize this heat before catastrophic failure occurs.
                  </p>
                  <p>
                    Our electrical thermal scans examine service panels, branch circuits, outlets, switches, and electrical equipment. We identify temperature differentials as small as 1-2°C above ambient conditions, allowing early intervention. Insurance companies increasingly require thermal electrical inspections for commercial properties and recommend them for residential electrical safety. By identifying problems during routine inspection, we help prevent electrical fires, equipment damage, and costly emergency repairs.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Energy Efficiency Assessment: Reducing Heating and Cooling Costs</h3>
                  <p>
                    Thermal imaging reveals energy losses that significantly impact utility bills in Toronto's climate. We identify insulation voids, air leakage, thermal bridging, and window/door deficiencies that compromise building envelope performance. These defects are particularly problematic during Ontario's cold winters and humid summers, forcing HVAC systems to work harder and consume more energy.
                  </p>
                  <p>
                    Our energy efficiency thermal scans typically identify opportunities for 15-30% reduction in heating and cooling costs. Common findings include missing attic insulation, uninsulated rim joists, air leakage around windows and doors, thermal bridging through structural components, and ductwork leakage. The thermal images provide visual proof of energy losses, helping homeowners prioritize insulation upgrades, air sealing, and window replacements for maximum return on investment.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Droplets className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Moisture Intrusion</h4>
                      <p className="text-xs text-muted-foreground">Locate hidden leaks behind walls and ceilings before mold develops.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Zap className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Electrical Hotspots</h4>
                      <p className="text-xs text-muted-foreground">Identify overloaded circuits and fire risks with thermal detection.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <Home className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Energy Loss</h4>
                      <p className="text-xs text-muted-foreground">Detect insulation voids and air leakage to reduce utility costs.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Building Envelope Performance: Thermal Bridging and Air Leakage</h3>
                  <p>
                    The building envelope separates conditioned interior spaces from exterior environments. Thermal imaging evaluates envelope performance by identifying thermal bridging (areas where heat transfers directly through building materials) and air leakage (uncontrolled air movement through gaps). These defects cause comfort issues, condensation problems, and energy waste.
                  </p>
                  <p>
                    Thermal bridging occurs where structural components like studs, joists, and concrete penetrate insulation layers. These bridges conduct heat, creating cold spots on interior surfaces that can lead to condensation and mold growth. Air leakage around windows, doors, electrical penetrations, and foundation interfaces allows conditioned air to escape and outdoor air to infiltrate. Our thermal scans identify these envelope deficiencies, guiding targeted air sealing and insulation improvements.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Radiant Heating System Verification and Leak Detection</h3>
                  <p>
                    In-floor radiant heating systems are popular in Toronto homes for their comfort and efficiency. Thermal imaging verifies proper system operation by visualizing heat distribution across floors. We identify cold spots indicating pipe blockages, air pockets, or zone valve failures. More critically, thermal imaging detects hidden leaks in radiant heating pipes before water damage becomes apparent.
                  </p>
                  <p>
                    Radiant system leaks often occur in concrete slabs or under finished floors where visual detection is impossible without destructive testing. Thermal cameras identify temperature anomalies caused by leaking hot water, allowing for precise leak location. This non-invasive approach saves thousands in exploratory demolition and repair costs while minimizing system downtime during repairs.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">HVAC System Performance: Duct Leakage and Airflow Verification</h3>
                  <p>
                    Heating, ventilation, and air conditioning (HVAC) systems account for approximately 40-60% of residential energy consumption in Ontario. Thermal imaging assesses HVAC performance by detecting duct leakage, airflow imbalances, and heat exchanger issues. Leaky ductwork in attics, crawl spaces, and wall cavities wastes conditioned air and reduces system efficiency.
                  </p>
                  <p>
                    We visualize temperature differences along duct runs to identify leakage points and verify proper airflow to registers. Thermal imaging also examines heat exchangers in furnaces and boilers for cracks or hot spots indicating imminent failure. For heat pump systems, we assess defrost cycle performance and refrigerant line insulation. These assessments help optimize HVAC performance, reduce energy consumption, and extend equipment lifespan.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Thermal Imaging Process: From Scan to Solution</h3>
                  <p>
                    <strong>Pre-Inspection Consultation:</strong> We discuss your specific concerns—whether moisture issues, electrical safety, energy efficiency, or general property assessment—to tailor our thermal imaging approach and establish optimal scanning conditions.
                  </p>
                  <p>
                    <strong>Environmental Preparation:</strong> For best results, we may recommend specific temperature differentials between indoor and outdoor environments. In some cases, we temporarily adjust HVAC settings or use controlled heating/cooling to enhance thermal patterns for specific defect detection.
                  </p>
                  <p>
                    <strong>Comprehensive Thermal Scanning:</strong> Our certified thermographers systematically scan all accessible areas using FLIR thermal cameras with MSX® technology. We capture thermal images from multiple angles and distances, ensuring comprehensive coverage of walls, ceilings, floors, electrical systems, and building envelopes.
                  </p>
                  <p>
                    <strong>Real-Time Analysis:</strong> During scanning, we identify and mark areas of concern for further investigation. Our thermographers interpret thermal patterns in real-time, distinguishing genuine defects from normal thermal variations based on building materials, environmental conditions, and thermal physics principles.
                  </p>
                  <p>
                    <strong>Detailed Reporting:</strong> Within 24 hours, you receive a comprehensive digital report with annotated thermal images, temperature differential measurements, defect descriptions, and prioritized recommendations. Reports include both thermal and visual photographs side-by-side for clear understanding.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Certification Matters: Why Thermographer Qualifications Are Critical</h3>
                  <p>
                    Thermal imaging interpretation requires specialized training in infrared science, heat transfer principles, and building construction. Our thermographers hold Level I and Level II certifications through the Infrared Training Center (ITC), the industry's leading training organization. Certification ensures accurate defect identification while avoiding false positives from reflections, emissivity variations, or transient thermal conditions.
                  </p>
                  <p>
                    Without proper certification, operators may misinterpret thermal patterns, missing genuine problems or identifying non-issues as defects. Certified thermographers understand how to adjust for material emissivity, account for reflections, interpret thermal patterns in context, and apply appropriate temperature measurement techniques. This expertise is essential for reliable results that support informed decisions about property conditions and necessary repairs.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Applications Beyond Residential: Commercial and Industrial Thermal Imaging</h3>
                  <p>
                    While residential thermal imaging is our focus, we also provide commercial and industrial thermal scanning services. Commercial applications include roof moisture surveys, electrical preventative maintenance, building envelope assessments, and process equipment monitoring. Thermal imaging helps commercial property managers identify maintenance needs, reduce energy costs, prevent equipment failures, and comply with insurance requirements.
                  </p>
                  <p>
                    Industrial applications include electrical distribution system inspections, mechanical equipment monitoring, steam system assessments, and refractory evaluations. Regular thermal imaging programs identify developing problems before catastrophic failure, reducing downtime, preventing accidents, and optimizing maintenance schedules. Our certified thermographers have experience across property types, adapting techniques to specific applications and environments.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Thermal Imaging: Complementary Assessment Technologies</h3>
                  <p>
                    Thermal imaging is most effective when combined with other diagnostic tools. Consider integrating thermal scanning with <Link to="/services/mold-inspection" className="text-primary hover:underline">moisture meter testing</Link> for quantitative moisture measurement, <Link to="/services/air-quality" className="text-primary hover:underline">air quality assessment</Link> for comprehensive indoor environment evaluation, or <Link to="/services/energy-audit" className="text-primary hover:underline">blower door testing</Link> for quantitative air leakage measurement. <Link to="/services/electrical-inspection" className="text-primary hover:underline">Electrical load testing</Link> complements thermal electrical scans by verifying circuit loading.
                  </p>
                  <p>
                    We coordinate these complementary services to provide holistic property assessment. Bundling services often provides cost savings and ensures all evaluation methods contribute to a complete understanding of property conditions, particularly important during real estate transactions, insurance assessments, or comprehensive property evaluations.
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
                  Thermal Imaging FAQ
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
                    Why Choose ASADS for Thermal Imaging?
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
                      <Link to="/booking">Schedule Thermal Scan</Link>
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
              We provide thermal imaging services across the Greater Toronto Area
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
              See What You've Been Missing
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let hidden defects compromise your property's safety, efficiency, or value. Professional thermal imaging reveals problems invisible to conventional inspections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Thermal Imaging</Link>
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
