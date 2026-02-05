import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Radio, 
  ShieldAlert, 
  Activity, 
  ClipboardCheck, 
  LayoutList, 
  GraduationCap,
  CheckCircle, 
  Phone, 
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  Thermometer,
  PhoneCall,
  Home,
  AlertTriangle,
  Building,
  Zap,
  Droplets,
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
  Cloud
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

const title = "Radon Gas Testing & Mitigation Consulting";
const metaTitle = "Radon Testing Toronto | C-NRPP Certified Gas Detection | ASADS";
const metaDescription = "Professional C-NRPP certified radon testing in Toronto & GTA. Health Canada compliant long-term and digital monitoring to prevent radon-induced lung cancer.";
const price = "From $199";
const duration = "48-Hour Digital or 91-Day Alpha Track";

const whatWeInspect = [
  "Basement & Lowest Occupied Level Air Quality – strategic placement in lowest lived-in areas",
  "Foundation Crack & Expansion Joint Evaluation – identify potential radon entry points",
  "Sump Pit Cover & Sealing Inspection – check for airtight covers on sump pump systems",
  "Floor Drain & Trap Performance – verify water seals in floor drains prevent radon entry",
  "Wall-Floor Interface (Cove Joint) Assessment – examine where basement walls meet floors",
  "Utility Penetration Points (Water/Gas/Sewer) – inspect openings for pipes and conduits",
  "HVAC Pressure Balancing & Ventilation Rates – assess air exchange and pressure differentials",
  "Crawl Space Vapor Barrier Integrity – examine vapor barriers in crawl space areas",
  "Long-term (91-day) Alpha Track Deployment – extended testing for seasonal average levels",
  "Short-term (48-hour) Digital Data Logging – rapid testing with continuous monitoring",
  "Post-Mitigation Verification Testing – confirm effectiveness of radon reduction systems",
  "Building Envelope & Airtightness Analysis – evaluate overall home sealing and ventilation"
];

const features = [
  {
    title: "Health Canada Compliance",
    description: "All testing protocols follow the 'Guide for Radon Measurements in Residential Dwellings' as mandated by Health Canada. Our procedures meet or exceed national standards for radon testing accuracy and reliability."
  },
  {
    title: "Hourly Data Logging & Analysis",
    description: "Unlike passive charcoal canisters, our digital Continuous Radon Monitors (CRMs) provide hourly data showing exactly when levels spike (typically overnight when homes are closed up). This detailed analysis helps identify patterns and potential entry points."
  },
  {
    title: "Tamper Detection & Security Features",
    description: "Essential for real estate transactions and legal compliance, our monitors include tamper detection that records if devices are moved or if windows are opened to artificially lower readings. This ensures accurate, defensible results for all stakeholders."
  },
  {
    title: "Comprehensive Mitigation Strategy Development",
    description: "When elevated levels are detected, we provide detailed technical roadmaps for remediation, including Active Soil Depressurization (ASD) system design, fan sizing recommendations, and suction point location analysis for optimal radon reduction."
  }
];

const benefits = [
  "Leading lung cancer prevention measure for Ontario homes",
  "C-NRPP / NRPP Certified Lead Inspectors with specialized training",
  "Essential for basement apartment legalization and rental compliance",
  "Required for many high-end real estate transactions in GTA",
  "Clear, defensible professional reports with Health Canada references",
  "24/7 priority monitoring available for time-sensitive transactions",
  "Accurate results within 48 hours with digital continuous monitoring",
  "Seasonal variation analysis with 91-day long-term testing options",
  "Post-mitigation verification testing to confirm system effectiveness",
  "Insurance and mortgage compliance documentation",
  "Evening and weekend appointments for minimal disruption",
  "Free consultation and interpretation of test results"
];

const faqs = [
  {
    question: "Why should I hire a professional instead of buying a store kit?",
    answer: "Store-bought radon test kits are single-use passive devices that require laboratory analysis, often taking weeks for results. Our professional C-NRPP certified testing uses calibrated digital Continuous Radon Monitors (CRMs) that provide hourly data, tamper detection, and immediate results. Professional testing includes certified interpretation, proper device placement according to Health Canada protocols, and documentation acceptable for real estate transactions, insurance requirements, and legal compliance. Store kits cannot provide the detailed analysis, security features, or professional certification required for many applications."
  },
  {
    question: "What is the 'Safe' level of Radon in Canada?",
    answer: "Health Canada has established a guideline of 200 Becquerels per cubic meter (Bq/m³) as the action level for radon in residential buildings. While there is technically no completely 'safe' level of radiation exposure, this guideline represents the concentration at which Health Canada recommends taking action to reduce radon levels. The World Health Organization recommends action at 100 Bq/m³. It's important to understand that radon risk follows a linear no-threshold model—the higher the concentration and longer the exposure, the greater the lung cancer risk. Our reports provide detailed risk assessment based on your specific test results."
  },
  {
    question: "How does radon gas get into my home?",
    answer: "Radon is a naturally occurring radioactive gas produced from uranium decay in soil, rock, and groundwater. It enters homes through various pathways: foundation cracks and expansion joints, construction joints, gaps around service pipes and utility penetrations, sump pits without airtight covers, floor drains with dry traps, and through porous concrete foundations. Your home acts like a vacuum due to stack effect and thermal buoyancy, drawing radon from the soil into living spaces. The pressure differential between indoor and outdoor environments accelerates radon entry, particularly in energy-efficient, tightly sealed modern homes."
  },
  {
    question: "Can radon be fixed if high levels are found?",
    answer: "Yes, radon mitigation is highly effective and typically reduces indoor radon levels by 90-99%. The most common and effective system is Active Soil Depressurization (ASD), which involves installing a ventilation pipe through the foundation slab into the aggregate beneath, connected to an exterior fan that continuously draws radon from beneath the home and vents it above the roofline. Other methods include sub-membrane depressurization for crawl spaces, increased ventilation, and sealing major entry points. Professional mitigation typically costs $2,000-$5,000 in the GTA and can be completed in 1-2 days with minimal disruption."
  },
  {
    question: "How much does professional radon testing cost in Toronto?",
    answer: "Professional radon testing in Toronto and the GTA starts at $199 for a 48-hour digital test using Continuous Radon Monitors. Long-term 91-day alpha track testing for seasonal average analysis is available for $249. Comprehensive testing packages including multiple device placements, detailed reporting, and consultation start at $349. Post-mitigation verification testing to confirm system effectiveness is $175. Pricing varies based on property size, number of test devices required, and specific testing needs such as real estate transaction requirements or legal compliance documentation."
  },
  {
    question: "How long does radon testing take?",
    answer: "We offer two main testing durations: Short-term testing lasts 48-96 hours using digital Continuous Radon Monitors, providing rapid results for real estate transactions or initial screening. Long-term testing lasts 91+ days using alpha track detectors, providing a more accurate annual average by accounting for seasonal variations. Health Canada recommends long-term testing for the most accurate assessment of year-round exposure, as radon levels can fluctuate significantly with weather, soil conditions, and home ventilation patterns."
  },
  {
    question: "Where in my home should radon testing be conducted?",
    answer: "Following Health Canada protocols, radon testing should be conducted in the lowest lived-in level of the home—typically the basement if it's regularly occupied, or the ground floor if the basement is unfinished. Testing devices should be placed in regularly occupied rooms (bedrooms, living areas, home offices) away from drafts, heat sources, and exterior walls. We avoid placement in kitchens, bathrooms, laundry rooms, or areas with high humidity. For comprehensive assessment, we often recommend testing multiple locations to identify variation within the home."
  },
  {
    question: "Is radon testing required for real estate transactions in Ontario?",
    answer: "While radon testing is not legally required for real estate transactions in Ontario, it's increasingly becoming a standard due diligence practice, particularly for homes with basements or in areas known for elevated radon potential. Many buyers include radon testing as a condition in purchase agreements. Mortgage lenders and insurance companies may require radon testing for properties in high-risk areas. Our professional testing provides documentation acceptable for all transaction stakeholders and can be completed within typical conditional periods."
  }
];

const relatedServices = [
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional assessment for mold growth and indoor air quality issues affecting respiratory health."
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Laboratory analysis for asbestos-containing materials that pose respiratory health risks."
  },
  { 
    title: "Indoor Air Quality Testing", 
    href: "/services/air-quality-testing",
    description: "Comprehensive assessment of multiple indoor air contaminants including VOCs and particulates."
  },
  { 
    title: "Thermal Imaging Inspection", 
    href: "/services/thermal-imaging",
    description: "Infrared scanning to detect moisture intrusion, insulation voids, and energy efficiency issues."
  },
];

export default function RadonTesting() {
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
    "serviceType": "Radon Gas Testing & Mitigation Consulting",
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
    "description": "Professional C-NRPP certified radon testing services in Toronto and the GTA. Health Canada compliant short-term and long-term monitoring using digital Continuous Radon Monitors and alpha track detectors for accurate radon level assessment.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Environmental Testing Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Radon Testing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Short-Term Radon Testing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Long-Term Radon Testing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Radon Mitigation Consultation"
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
        "name": "Radon Gas Testing",
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
    "description": "ASADS Home Inspection provides professional radon testing, environmental assessment, and home inspection services across Ontario. C-NRPP certified inspectors specializing in radon detection and mitigation consulting."
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
      "serviceType": "Radon Gas Testing & Mitigation Consulting"
    },
    "specialty": "Environmental Testing Services",
    "about": {
      "@type": "Thing",
      "name": "Radon Gas Testing",
      "description": "Professional testing for radioactive radon gas in residential and commercial buildings"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Radon Testing Services",
    "image": `${SITE_URL}/images/services/radon-testing.jpg`,
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
          "name": "Concerned Homeowner"
        },
        "datePublished": "2025-02-08",
        "reviewBody": "Professional radon testing that gave us peace of mind. The digital monitor provided hourly data showing our levels spiked at night. The detailed report helped us understand our risk level and next steps. C-NRPP certification gave us confidence in the results.",
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
          "name": "Real Estate Buyer"
        },
        "datePublished": "2025-01-30",
        "reviewBody": "Required radon testing for our home purchase in Toronto. ASADS completed the 48-hour test within our conditional period. The tamper detection feature gave our lawyer confidence in the results. Professional service with clear communication throughout.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Radon Testing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Standard Radon Testing",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "48-Hour Digital Radon Test",
                "description": "Short-term testing using Continuous Radon Monitor with hourly data logging"
              },
              "price": "199",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "91-Day Alpha Track Test",
                "description": "Long-term testing for seasonal average radon levels"
              },
              "price": "249",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Enhanced Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Multi-Level Radon Testing",
                "description": "Testing on multiple floors for comprehensive assessment"
              },
              "price": "349",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Post-Mitigation Verification",
                "description": "Testing to confirm effectiveness of radon reduction system"
              },
              "price": "175",
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
                <Radio className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  C-NRPP Certified Environmental Testing
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Radon Gas Testing & Mitigation Consulting
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Radon is the #1 cause of lung cancer in non-smokers. Our C-NRPP certified inspectors use professional-grade digital monitors to provide Health Canada compliant safety audits.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Health Canada Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>C-NRPP Certified</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Radon Test
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
              <span>C-NRPP Certified • Digital Monitoring • Tamper Detection</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Radon Test</Link>
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
                  Understanding Radon: The Silent Health Threat in Ontario Homes
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Radon is a naturally occurring radioactive gas that enters homes through foundation cracks, sump pits, floor drains, and porous concrete. Because it is <strong>colorless, odorless, and tasteless</strong>, radon is impossible to detect without specialized equipment. Long-term exposure to elevated radon levels is the leading cause of lung cancer in non-smokers, responsible for approximately 16% of lung cancer deaths in Canada according to Health Canada statistics.
                  </p>
                  <p>
                    In the Greater Toronto Area, geological conditions create varying radon potential across different neighborhoods. Homes in Toronto, Mississauga, Vaughan, and throughout the GTA can have significantly different radon levels even within the same community. Our professional testing provides accurate assessment of your specific risk, following Health Canada's 'Guide for Radon Measurements in Residential Dwellings' to ensure reliable, defensible results.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">How Radon Enters Your Home: Understanding the Pathways</h3>
                  <p>
                    Radon originates from uranium decay in soil, rock, and groundwater. It enters homes through various pathways: foundation cracks and expansion joints, construction joints between foundation walls and slabs, gaps around service pipes and utility penetrations, sump pits without airtight covers, floor drains with dry or improperly maintained water traps, and through porous concrete foundations. Modern energy-efficient homes with tight building envelopes can actually increase radon concentration by reducing natural ventilation that would otherwise dilute indoor radon levels.
                  </p>
                  <p>
                    The stack effect—warm air rising and escaping through upper levels of your home—creates negative pressure that draws radon from the soil into living spaces. This effect is strongest during colder months when temperature differences between indoor and outdoor environments are greatest, which is why radon levels typically peak in winter when homes are sealed tight against the cold.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Health Canada Guidelines and Risk Assessment</h3>
                  <p>
                    Health Canada has established an action level of <strong>200 Becquerels per cubic meter (Bq/m³)</strong> for radon in residential buildings. This guideline represents the concentration at which Health Canada recommends taking action to reduce radon levels. The World Health Organization recommends a lower action level of 100 Bq/m³. It's important to understand that radon risk follows a linear no-threshold model—there is no completely safe level, and risk increases with both concentration and duration of exposure.
                  </p>
                  <p>
                    Health Canada estimates that approximately 7% of Canadian homes exceed the 200 Bq/m³ guideline. In some areas of Ontario, particularly those with granite bedrock or certain soil types, the percentage can be significantly higher. Our testing provides precise measurement of your home's radon levels, allowing for informed decisions about potential mitigation measures.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Professional Testing Methods: Digital vs. Passive Detection</h3>
                  <p>
                    We offer two primary testing methodologies: <strong>Digital Continuous Radon Monitoring (CRM)</strong> and <strong>Long-Term Alpha Track Detection</strong>. Digital CRMs provide real-time hourly data showing exactly when radon levels fluctuate, typically peaking overnight when homes are closed up and ventilation is minimal. These devices include tamper detection features essential for real estate transactions, recording if devices are moved or if windows are opened to artificially lower readings.
                  </p>
                  <p>
                    Alpha track detectors provide long-term assessment (91+ days) that accounts for seasonal variations in radon levels. Health Canada recommends long-term testing for the most accurate assessment of year-round exposure. Both methods have specific applications: digital testing for rapid results during real estate transactions or initial screening, and long-term testing for comprehensive risk assessment and informed mitigation decisions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <ShieldAlert className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Cancer Prevention</h4>
                      <p className="text-xs text-muted-foreground">Health Canada attributes 16% of lung cancer deaths to radon exposure.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Activity className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Digital Monitoring</h4>
                      <p className="text-xs text-muted-foreground">Continuous radon monitors with hourly data logging and analysis.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <GraduationCap className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">C-NRPP Certified</h4>
                      <p className="text-xs text-muted-foreground">Inspectors certified by Canadian National Radon Proficiency Program.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Radon Mitigation: Effective Solutions for Elevated Levels</h3>
                  <p>
                    When testing reveals elevated radon levels, several effective mitigation options are available. The most common and effective system is <strong>Active Soil Depressurization (ASD)</strong>, which involves installing a ventilation pipe through the foundation slab into the aggregate beneath, connected to an exterior fan that continuously draws radon from beneath the home and vents it above the roofline. ASD systems typically reduce radon levels by 90-99% and can be installed with minimal disruption to your home.
                  </p>
                  <p>
                    Other mitigation methods include sub-membrane depressurization for crawl spaces, increased mechanical ventilation with Heat Recovery Ventilators (HRVs), and sealing major radon entry points. The appropriate solution depends on your home's construction, foundation type, and specific radon entry pathways identified during testing. We provide detailed mitigation recommendations and can refer you to qualified mitigation professionals for system installation.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Testing Protocols and Device Placement</h3>
                  <p>
                    Following Health Canada protocols, radon testing should be conducted in the lowest lived-in level of the home—typically the basement if it's regularly occupied for at least 4 hours per day, or the ground floor if the basement is unfinished. Testing devices should be placed in regularly occupied rooms (bedrooms, living areas, home offices) away from drafts, heat sources, exterior walls, and areas of high humidity. We avoid placement in kitchens, bathrooms, laundry rooms, or direct sunlight.
                  </p>
                  <p>
                    For comprehensive assessment, we often recommend testing multiple locations within the home to identify variation in radon distribution. Basements typically have higher concentrations than upper levels, but radon can migrate through stairwells and ductwork to affect all living areas. Our strategic placement ensures accurate measurement of your actual exposure in spaces where you spend the most time.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Radon Testing for Real Estate Transactions</h3>
                  <p>
                    Radon testing is increasingly becoming standard practice in Ontario real estate transactions, particularly for homes with basements or in areas known for elevated radon potential. Many buyers include radon testing as a condition in purchase agreements. Our professional testing provides documentation acceptable for all transaction stakeholders and can be completed within typical conditional periods.
                  </p>
                  <p>
                    Digital Continuous Radon Monitors with tamper detection are essential for real estate transactions, providing confidence that results haven't been manipulated. We provide clear, comprehensive reports that include Health Canada guidelines, risk assessment, and recommendations. These reports are valuable for negotiations, insurance requirements, and future disclosure obligations.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Standard Radon Testing</h3>
                  <p>
                    Some properties benefit from additional environmental assessments. Consider combining radon testing with <Link to="/services/mold-inspection" className="text-primary hover:underline">mold inspection</Link> for comprehensive indoor air quality assessment. <Link to="/services/asbestos-testing" className="text-primary hover:underline">Asbestos testing</Link> addresses another significant respiratory health risk in older homes. <Link to="/services/air-quality-testing" className="text-primary hover:underline">Comprehensive indoor air quality testing</Link> evaluates multiple contaminants including VOCs, particulates, and carbon monoxide.
                  </p>
                  <p>
                    We coordinate these specialized services with radon testing to provide holistic assessment of your indoor environment. Bundling services often provides cost savings and ensures all evaluations are completed efficiently, particularly important during real estate transactions with tight timelines.
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
                  Radon Testing FAQ
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
                    Why Choose ASADS for Radon Testing?
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
                      <Link to="/booking">Schedule Radon Test</Link>
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
              We provide radon testing services across the Greater Toronto Area
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
              Protect Your Family From Radon Exposure
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't gamble with your family's health. Professional radon testing provides the accurate information needed to make informed decisions about your home's safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Radon Test</Link>
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
