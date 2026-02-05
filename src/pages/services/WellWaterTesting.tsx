import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Droplets, 
  TestTube, 
  Beaker, 
  ShieldCheck, 
  Microscope, 
  AlertTriangle,
  Phone, 
  Calendar,
  Clock,
  FileText,
  Home,
  Search,
  Zap,
  Thermometer,
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
  Flame,
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
  ClipboardCheck,
  Flask,
  Filter,
  ThermometerSun,
  TestTube2,
  Virus,
  Bug,
  Radiation,
  Leaf,
  DropletIcon,
  Waves,
  Fish,
  Skull
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

const title = "Well Water Testing";
const metaTitle = "Well Water Testing Toronto | MOH Accredited Lab Analysis | ASADS";
const metaDescription = "Certified well water testing in Toronto and GTA. MOH accredited laboratory analysis for E.coli, nitrates, lead, arsenic, and 40+ contaminants. Same-day lab courier service for real estate transactions.";
const price = "$149-$349";
const duration = "Sample Collection + 24-48 Hour Lab Analysis";

const whatWeInspect = [
  "E.coli & Total Coliform Bacteria – identify dangerous fecal bacteria indicating sewage contamination and gastrointestinal illness risks",
  "Nitrate-Nitrogen (MAC 10mg/L) – test for agricultural runoff contamination that causes Blue Baby Syndrome in infants",
  "Lead & Heavy Metal Concentrations – detect lead from plumbing, arsenic from bedrock, and uranium from natural geological sources",
  "Nitrites & Ammonia Compounds – identify indicators of animal waste, fertilizer contamination, or septic system failure",
  "Sodium & Chloride Levels – measure road salt contamination from winter road maintenance affecting groundwater quality",
  "Iron & Manganese Concentrations – assess staining minerals that discolor fixtures and affect water taste and appearance",
  "Water Hardness & Alkalinity – measure calcium and magnesium levels affecting soap efficiency and appliance scaling",
  "pH Levels & Corrosivity – test acidity/alkalinity balance affecting pipe corrosion and heavy metal leaching",
  "Turbidity & Suspended Solids – evaluate cloudiness indicating surface water infiltration or disturbed sediment",
  "Total Dissolved Solids (TDS) – measure overall mineral content affecting water taste and treatment system performance",
  "Sulphate & Hydrogen Sulphide – identify rotten egg odor compounds and minerals affecting water palatability",
  "Fluoride & Other Trace Elements – assess naturally occurring elements with potential health implications at elevated levels"
];

const features = [
  {
    title: "MOH Accredited Laboratory Analysis & O.Reg. 170/03 Compliance",
    description: "All water samples are processed by Ontario Ministry of Health licensed laboratories following strict O.Reg. 170/03 drinking water standards. Our accredited partners maintain ISO 17025 certification for testing accuracy, ensuring results are legally defensible for real estate transactions, insurance claims, and health authority reporting. Each analysis includes method detection limits, quality control data, and Health Canada Maximum Acceptable Concentration (MAC) comparisons for every parameter tested."
  },
  {
    title: "Clinical-Grade Sampling Protocols & Chain of Custody Documentation",
    description: "Our certified technicians use sterile, DNA-free sampling protocols to prevent cross-contamination and ensure result accuracy. We maintain unbroken chain of custody from sample collection through laboratory analysis, with tamper-evident seals, temperature-controlled transport, and precise documentation of collection time, location, and conditions. This rigorous protocol meets forensic standards required for legal proceedings and ensures samples reach the laboratory within strict 6-24 hour holding windows critical for accurate microbiological analysis."
  },
  {
    title: "Real Estate Transaction Support & Mortgage Lender Certification",
    description: "Most Canadian mortgage lenders require a Certificate of Potability issued within 30 days of closing for properties with private wells. Our 'Real Estate Full Analysis' package meets all lender requirements for bacteria, nitrate, and heavy metal testing. We provide same-day courier service to ensure rapid results, formal laboratory reports formatted specifically for mortgage underwriters, and consultation on any remediation needed to satisfy lending conditions before closing deadlines."
  },
  {
    title: "Comprehensive Treatment System Consultation & Remediation Planning",
    description: "When contaminants exceed Health Canada MAC limits, we provide unbiased, manufacturer-independent advice on appropriate treatment solutions. Our recommendations cover UV sterilization systems for bacterial contamination, reverse osmosis for nitrate and heavy metal removal, water softeners for hardness issues, and specialized filtration for specific contaminants. We help homeowners understand treatment system maintenance, ongoing monitoring requirements, and cost-effective solutions tailored to their specific water quality challenges."
  }
];

const benefits = [
  "MOH accredited laboratory analysis with legally defensible results for real estate and insurance purposes",
  "Same-day courier service ensuring samples reach the lab within critical holding windows for accurate analysis",
  "Clinical-grade sterile sampling protocols preventing cross-contamination and false positive/negative results",
  "Mortgage lender-approved reports formatted specifically for real estate transaction requirements",
  "Comprehensive testing covering 40+ parameters including emerging contaminants like PFAS and pharmaceuticals",
  "Unbiased third-party analysis with no ties to water treatment equipment manufacturers or sales",
  "Emergency priority testing for suspected contamination events or urgent real estate closing deadlines",
  "Annual testing reminder service to maintain ongoing water quality monitoring and health protection",
  "Detailed interpretation of laboratory results with plain-language explanations of health implications",
  "Referrals to certified water treatment professionals for installation of recommended remediation systems",
  "Historical trend analysis when repeat testing identifies changing water quality patterns over time",
  "Peace of mind knowing your family's drinking water meets Health Canada safety standards"
];

const faqs = [
  {
    question: "How often should private well water be tested in Ontario, and what parameters are most critical?",
    answer: "Public Health Ontario recommends testing private wells for bacterial contamination (E.coli and total coliforms) at least twice per year—typically in spring after snowmelt and in fall after heavy rainfall. Comprehensive chemical analysis including nitrates, heavy metals, and minerals should be conducted every 2-3 years, or immediately if: 1) Water taste, odor, or appearance changes, 2) A family member experiences recurrent gastrointestinal illness, 3) Nearby agricultural or industrial activities increase, 4) Construction or drilling occurs near the well, or 5) The well is repaired or modified. Critical parameters include bacteria (immediate health risk), nitrates (especially for infants and pregnant women), lead (neurotoxin), and arsenic (carcinogen). Regular testing establishes baseline water quality and identifies contamination trends before reaching dangerous levels."
  },
  {
    question: "What's the difference between free public health well water testing and professional laboratory analysis?",
    answer: "Free public health testing typically covers only basic bacteriological analysis (E.coli and total coliforms) through local health units. While valuable for detecting immediate health threats, this limited testing misses critical chemical contaminants. Professional laboratory analysis includes: 1) Expanded bacterial testing with quantification, 2) Nitrate/nitrite analysis (essential for infant safety), 3) Heavy metal screening (lead, arsenic, uranium), 4) Mineral content assessment (hardness, iron, manganese), 5) Physical parameters (pH, turbidity, conductivity), and 6) Emerging contaminant testing when indicated. Mortgage lenders almost always require comprehensive professional analysis, and health authorities recommend full chemical testing every 2-3 years. Professional testing also provides quantitative results with detection limits, quality control data, and Health Canada MAC comparisons—information not included in basic public health reports."
  },
  {
    question: "What should I do if my well water tests positive for E.coli or other contaminants?",
    answer: "If E.coli is detected: 1) Immediately stop drinking, cooking with, or brushing teeth with the water (use bottled water), 2) Boil all water for at least one minute before use until resolved, 3) Shock chlorinate the well system following Ontario Ministry of Health guidelines, 4) Retest the water 1-2 weeks after treatment to confirm elimination, and 5) Investigate potential contamination sources (damaged well cap, nearby septic systems, surface water infiltration). For chemical contaminants exceeding MAC limits: 1) Install appropriate point-of-use or whole-house treatment (UV for bacteria, reverse osmosis for nitrates/heavy metals, specialized filtration for specific issues), 2) Consider deeper well drilling if shallow aquifer contamination is widespread, 3) Address source contamination if possible (improve manure management, relocate septic systems), and 4) Establish more frequent monitoring. We provide detailed remediation roadmaps specific to your contamination profile and can refer you to certified well professionals and treatment specialists."
  },
  {
    question: "What are the most common sources of well water contamination in Ontario, and how can they be prevented?",
    answer: "Common contamination sources include: 1) Agricultural runoff (nitrates, pesticides, bacteria from manure) – maintain proper setbacks from fields and manure storage, 2) Failing septic systems (bacteria, nitrates) – ensure regular septic pumping and proper system maintenance, 3) Road salt and de-icing chemicals (sodium, chloride) – improve drainage away from wellheads, use well caps with proper seals, 4) Natural geological sources (arsenic, uranium, radon) – test specifically for these and install appropriate treatment, 5) Plumbing corrosion (lead, copper) – replace older plumbing components, adjust pH to reduce corrosivity, 6) Surface water infiltration (bacteria, turbidity) – ensure proper well construction with sanitary seals and surface diversion. Prevention strategies include: maintaining proper well construction (watertight casing, above-grade well cap, concrete pad), protecting the wellhead area (no chemicals, livestock, or waste storage within 30 meters), regular inspection and maintenance, proper abandonment of unused wells, and establishing protective wellhead protection areas through municipal planning."
  },
  {
    question: "How does well water testing for real estate transactions differ from routine annual testing?",
    answer: "Real estate well water testing requires more comprehensive analysis and faster turnaround times. Key differences: 1) Mortgage lenders typically require testing within 30 days of closing with specific parameters (bacteria, nitrates, lead, arsenic at minimum), 2) Real estate reports must include formal laboratory certificates with clear pass/fail determinations against Health Canada MACs, 3) Chain of custody documentation is critical for legal defensibility in transaction disputes, 4) Faster turnaround is needed (24-48 hours vs. standard 5-7 days) to meet closing deadlines, 5) Additional testing may be required based on property location (uranium in granite bedrock areas, fluoride in specific geological formations), and 6) Clear interpretation for non-technical parties (buyers, sellers, agents, lawyers) is essential. We specialize in real estate testing with same-day courier service, lender-approved report formats, and consultation on remediation options if needed to satisfy purchase conditions before closing."
  },
  {
    question: "What is the Maximum Acceptable Concentration (MAC) for nitrates in Ontario well water, and why is it particularly dangerous for infants?",
    answer: "The Health Canada Maximum Acceptable Concentration (MAC) for nitrate-nitrogen in drinking water is 10 mg/L (or 45 mg/L expressed as nitrate). Nitrates are particularly dangerous for infants under 6 months because their digestive systems convert nitrates to nitrites, which bind to hemoglobin in red blood cells to form methemoglobin. This condition, called methemoglobinemia or 'Blue Baby Syndrome,' reduces the blood's oxygen-carrying capacity, causing cyanosis (bluish skin), shortness of breath, and potentially death if untreated. Pregnant women are also at increased risk as nitrates can cross the placenta. Nitrate contamination typically comes from agricultural fertilizer runoff, septic system effluent, or animal manure. Treatment options include reverse osmosis systems, distillation, or ion exchange specifically designed for nitrate removal. Regular testing is critical for households with infants, pregnant women, or those planning pregnancy."
  },
  {
    question: "How much does professional well water testing cost in the GTA, and what factors affect pricing?",
    answer: "Professional well water testing in the GTA typically ranges from $149 for basic bacteriological analysis to $349 for comprehensive testing including 40+ parameters. Factors affecting price include: 1) Number of parameters tested (basic bacteria vs. full chemical suite), 2) Testing methodology (culture-based vs. PCR for faster bacteria results), 3) Sample location and travel requirements, 4) Urgency of results (standard 5-7 days vs. 24-48 hour rush), 5) Number of sampling points (kitchen tap vs. multiple locations), and 6) Additional services (chain of custody documentation, consultation, treatment recommendations). Our most popular 'Real Estate Full Analysis' package is priced at $249 and includes all parameters required by mortgage lenders with 48-hour turnaround. For specialized testing (pesticides, pharmaceuticals, PFAS), additional costs apply. Contact us at (647) 801-9311 for a customized quote based on your specific needs and location."
  },
  {
    question: "What should homeowners do to prepare for a well water test, and how are samples properly collected?",
    answer: "For accurate well water testing: 1) Use an approved, sterile sample bottle provided by the laboratory (not household containers), 2) Sample from the kitchen cold water tap after removing aerators or filters, 3) Let the water run for 5-10 minutes to clear standing water from pipes before sampling, 4) Avoid touching the inside of the bottle or cap, 5) Fill to the indicated line (not overfilled), 6) Keep samples refrigerated and deliver to the lab within 6-24 hours (critical for bacteria), 7) Note the exact sampling time, date, and location, 8) For bacteria testing, avoid sampling during or immediately after heavy rainfall when contamination risk is highest, 9) For lead testing, sample first-draw water that has stood in pipes overnight, and 10) For comprehensive analysis, collect separate samples for different tests as required. Our technicians handle all these protocols professionally, ensuring proper collection, preservation, and chain of custody for legally defensible results. We recommend scheduling testing during normal business hours to ensure same-day laboratory delivery."
  }
];

const relatedServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete property assessment including well and septic system evaluation for rural properties."
  },
  { 
    title: "Septic System Inspection", 
    href: "/services/septic-inspection",
    description: "Professional assessment of septic tank, drain field, and overall system functionality."
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Air quality testing for radon gas, particularly relevant for homes with basements or crawl spaces."
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Comprehensive mold assessment and moisture investigation for indoor air quality concerns."
  },
];

export default function WellWaterTesting() {
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
    "serviceType": "Well Water Testing",
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
    "description": "MOH accredited well water testing in Toronto and GTA. Professional laboratory analysis for E.coli, nitrates, lead, arsenic, and 40+ contaminants. Real estate transaction certification and treatment system consultation.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Environmental Testing Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Well Water Testing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basic Bacteriological Testing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comprehensive Chemical Analysis"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Real Estate Full Analysis Package"
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
        "name": "Well Water Testing",
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
    "description": "ASADS Home Inspection provides professional well water testing, environmental assessment, and home inspection services across Ontario. MOH accredited laboratory analysis for private well safety."
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
      "serviceType": "Well Water Testing"
    },
    "specialty": "Environmental Testing Services",
    "about": {
      "@type": "Thing",
      "name": "Well Water Testing",
      "description": "Professional laboratory analysis of private well water for health and safety compliance"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Well Water Testing Services",
    "image": `${SITE_URL}/images/services/well-water-testing.jpg`,
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
          "name": "Homeowner in Caledon"
        },
        "datePublished": "2025-01-15",
        "reviewBody": "Our well water testing revealed high nitrate levels we never knew about. ASADS not only provided the lab results but also recommended a specific reverse osmosis system that solved the problem. Their comprehensive report helped us get a rebate from the municipality for the treatment system installation.",
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
          "name": "Real Estate Agent in King City"
        },
        "datePublished": "2025-02-05",
        "reviewBody": "I work with rural properties and rely on ASADS for well water testing during transactions. Their same-day courier service and lender-approved reports have saved multiple deals from falling through due to timing issues. When problems are found, they provide clear remediation steps that help negotiations proceed smoothly.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Well Water Testing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Standard Testing Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Basic Bacteriological Test",
                "description": "E.coli and total coliform analysis with MOH accredited laboratory reporting"
              },
              "price": "149",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Real Estate Full Analysis",
                "description": "Comprehensive testing including bacteria, nitrates, lead, arsenic, and 15+ parameters"
              },
              "price": "249",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Advanced Testing Options",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Comprehensive Chemical Suite",
                "description": "40+ parameter analysis including heavy metals, minerals, and emerging contaminants"
              },
              "price": "349",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Emergency Priority Testing",
                "description": "24-48 hour turnaround for urgent real estate deadlines or health concerns"
              },
              "price": "299",
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
                <Droplets className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  MOH Accredited Laboratory Testing
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Well Water Testing
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Protect your family from hidden contaminants in private well water. Professional laboratory analysis for E.coli, nitrates, lead, arsenic, and 40+ parameters. Mortgage lender approved.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>MOH Accredited Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Real Estate Certified</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Water Testing
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
              <ShieldCheck className="h-5 w-5" />
              <span>MOH Accredited • Same-Day Courier • Mortgage Lender Approved</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Water Testing</Link>
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
                  Comprehensive Well Water Safety Analysis for Ontario Rural Properties
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    <strong>Private well water in Ontario is completely unregulated</strong>, placing 100% responsibility for water safety on homeowners. According to Public Health Ontario, approximately <strong>1 in 4 private wells</strong> test positive for bacterial contamination that can cause serious gastrointestinal illness, while many more contain elevated levels of nitrates, heavy metals, or other contaminants with long-term health implications. Our MOH accredited laboratory testing provides the scientific validation needed to ensure your family's drinking water meets Health Canada safety standards.
                  </p>
                  <p>
                    Unlike municipal water systems that undergo daily testing and treatment, private wells are vulnerable to contamination from agricultural runoff, failing septic systems, road salt infiltration, and natural geological sources. Contaminants like <strong>E.coli, nitrates, lead, and arsenic</strong> are often invisible—they don't change water taste, odor, or appearance. Regular professional testing is the only way to detect these hidden threats before they affect your family's health. Our comprehensive analysis covers 40+ parameters using Ministry of Health accredited laboratories following strict O.Reg. 170/03 drinking water standards.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
                    <h4 className="text-amber-900 font-bold flex items-center gap-2 mb-2">
                      <AlertTriangle className="text-amber-600" size={20} />
                      Critical Real Estate & Mortgage Requirements
                    </h4>
                    <p className="text-amber-800">
                      Most Canadian mortgage lenders require a <strong>Certificate of Potability</strong> issued within 30 days of closing for properties with private wells. Our 'Real Estate Full Analysis' package meets all lender requirements for bacteria, nitrate, and heavy metal testing. We provide same-day courier service to ensure rapid results, formal laboratory reports formatted specifically for mortgage underwriters, and consultation on remediation if needed to satisfy purchase conditions before closing deadlines.
                    </p>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Bacteriological Contamination: The Immediate Health Threat</h3>
                  <p>
                    <strong>E.coli and total coliform bacteria</strong> indicate fecal contamination from human or animal waste entering the water supply. These pathogens can cause severe gastrointestinal illnesses including diarrhea, vomiting, cramps, and in vulnerable populations (children, elderly, immunocompromised), potentially life-threatening conditions. Bacterial contamination typically enters wells through: 1) Damaged or improperly sealed well caps allowing surface water infiltration, 2) Failing septic systems located too close to wells, 3) Agricultural runoff containing animal manure, or 4) Direct animal access to wellheads.
                  </p>
                  <p>
                    Our bacteriological testing uses both traditional culture methods and advanced PCR technology for faster, more accurate results. We maintain strict 6-24 hour holding times for samples, as bacteria can multiply or die during transport, affecting result accuracy. When E.coli is detected, we provide immediate guidance on boiling water, shock chlorination procedures, and retesting protocols to confirm contamination elimination. Regular bacteriological testing (recommended every 6 months) establishes baseline water quality and identifies seasonal contamination patterns related to rainfall, snowmelt, or agricultural activities.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Nitrate Contamination: The Silent Threat to Infants and Pregnant Women</h3>
                  <p>
                    <strong>Nitrate contamination</strong> represents one of the most serious chemical threats in Ontario well water, particularly in agricultural regions. The Health Canada Maximum Acceptable Concentration (MAC) for nitrate-nitrogen is 10 mg/L (45 mg/L as nitrate). Nitrates are converted to nitrites in the body, which bind to hemoglobin in red blood cells to form methemoglobin. This condition, called <strong>methemoglobinemia or 'Blue Baby Syndrome,'</strong> reduces the blood's oxygen-carrying capacity, causing cyanosis (bluish skin), shortness of breath, and potentially death in infants under 6 months.
                  </p>
                  <p>
                    Nitrates primarily enter groundwater from: 1) Agricultural fertilizer runoff, 2) Failing septic system effluent, 3) Animal manure storage and spreading, and 4) Decomposing organic matter. Unlike bacteria, nitrates cannot be removed by boiling—in fact, boiling concentrates nitrates as water evaporates. Effective treatment requires specialized systems like reverse osmosis, distillation, or ion exchange specifically designed for nitrate removal. We provide quantitative nitrate analysis with detection limits well below the MAC, allowing early detection of rising nitrate trends before reaching dangerous levels.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <TestTube className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">MOH Accredited</h4>
                      <p className="text-xs text-muted-foreground">Laboratory analysis following strict O.Reg. 170/03 drinking water standards.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Microscope className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">40+ Parameters</h4>
                      <p className="text-xs text-muted-foreground">Comprehensive testing for bacteria, chemicals, metals, and emerging contaminants.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <FileText className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Lender Approved</h4>
                      <p className="text-xs text-muted-foreground">Real estate certification reports formatted for mortgage requirements.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Heavy Metal Contamination: Long-Term Health Implications</h3>
                  <p>
                    <strong>Lead, arsenic, and uranium</strong> are naturally occurring heavy metals that can leach into groundwater from bedrock or enter through corroded plumbing components. Lead is a potent neurotoxin particularly dangerous to children's developing brains, causing learning disabilities, behavioral issues, and reduced IQ. Arsenic is a known carcinogen linked to skin, bladder, and lung cancers. Uranium poses both chemical toxicity to kidneys and radiological hazards from radioactive decay.
                  </p>
                  <p>
                    Heavy metal contamination often shows no immediate symptoms, with health effects accumulating over years of exposure. Our comprehensive metal analysis includes: 1) Lead from solder, pipes, and fixtures, 2) Arsenic from specific geological formations, 3) Uranium from granite bedrock, 4) Copper from plumbing corrosion, 5) Iron and manganese causing staining and taste issues, and 6) Other trace elements with health implications. We provide speciated arsenic analysis (distinguishing between more toxic inorganic forms and less toxic organic forms) and guidance on appropriate treatment systems like reverse osmosis, activated alumina, or specialized filtration media.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Water Quality Parameters: Beyond Health to Practical Concerns</h3>
                  <p>
                    Beyond health-related contaminants, well water quality affects appliance performance, plumbing longevity, and overall usability. <strong>Water hardness</strong> (calcium and magnesium) causes scale buildup in pipes, water heaters, and appliances, reducing efficiency and increasing energy costs. <strong>Low pH (acidity)</strong> corrodes plumbing fixtures, leaching metals like lead and copper into water while causing pinhole leaks in copper pipes. <strong>High iron and manganese</strong> stain fixtures and laundry brown, while <strong>hydrogen sulphide</strong> creates rotten egg odors making water unpalatable.
                  </p>
                  <p>
                    Our comprehensive testing includes all major water quality parameters: hardness, alkalinity, pH, turbidity, total dissolved solids (TDS), chloride, sodium, sulphate, and fluoride. These parameters help determine appropriate treatment systems—water softeners for hardness, acid neutralizers for low pH, oxidizing filters for iron/manganese, and activated carbon for taste/odor issues. We provide detailed interpretation of how each parameter affects your specific situation, including recommendations for cost-effective treatment solutions tailored to your water chemistry profile.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Real Estate Transaction Testing: Meeting Mortgage Lender Requirements</h3>
                  <p>
                    Purchasing a property with a private well involves specific due diligence requirements. Most mortgage lenders require a <strong>Certificate of Potability</strong> issued within 30 days of closing, confirming the water is safe for human consumption. Lenders typically require testing for: 1) E.coli and total coliform bacteria, 2) Nitrate-nitrogen, 3) Lead, and 4) Arsenic as minimum parameters. Some lenders in specific regions may also require testing for uranium, fluoride, or other location-specific contaminants.
                  </p>
                  <p>
                    We specialize in real estate well water testing with: 1) Same-day courier service ensuring 24-48 hour turnaround, 2) Lender-approved report formats with clear pass/fail determinations against Health Canada MACs, 3) Chain of custody documentation for legal defensibility, 4) Consultation on remediation options if contamination is found, and 5) Coordination with real estate agents, lawyers, and mortgage brokers to ensure smooth transaction completion. Our 'Real Estate Full Analysis' package includes all required parameters plus additional screening to identify potential issues that could affect property value or insurability.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Clinical Sampling Protocols & Chain of Custody Integrity</h3>
                  <p>
                    Accurate well water testing begins with proper sample collection. Our certified technicians follow clinical-grade protocols: 1) Using sterile, DNA-free sample bottles provided by accredited laboratories, 2) Flushing pipes appropriately before sampling (first-draw for lead, flushed for most other parameters), 3) Avoiding cross-contamination by not touching bottle interiors or caps, 4) Preserving samples with appropriate chemicals when required, 5) Maintaining proper temperatures during transport, and 6) Delivering to laboratories within strict holding times (6-24 hours for bacteria, 14-28 days for most chemicals).
                  </p>
                  <p>
                    We maintain unbroken <strong>chain of custody documentation</strong> tracking samples from collection through analysis. This includes: sample identification, collection date/time, collector information, preservation methods, holding conditions, and laboratory receipt confirmation. Chain of custody is essential for legal defensibility in real estate disputes, insurance claims, or regulatory actions. Our rigorous protocols ensure results accurately represent your well water quality, not artifacts of improper collection or handling.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Treatment System Consultation: Unbiased Recommendations</h3>
                  <p>
                    When contaminants exceed Health Canada MACs, appropriate treatment is essential. We provide <strong>unbiased, manufacturer-independent recommendations</strong> based solely on your water chemistry and specific needs. Common treatment solutions include: 1) UV sterilization systems for bacterial contamination, 2) Reverse osmosis for nitrate, lead, arsenic, and general contaminant reduction, 3) Water softeners for hardness issues, 4) Acid neutralizers for corrosive water, 5) Iron/manganese filters for staining problems, and 6) Whole-house activated carbon systems for taste/odor improvement.
                  </p>
                  <p>
                    Our consultation considers: treatment effectiveness for specific contaminants, system maintenance requirements, operating costs, installation complexity, space requirements, and waste water production. We help homeowners navigate rebate programs (some municipalities offer incentives for nitrate or arsenic treatment systems) and provide referrals to certified water treatment professionals for installation. We also recommend appropriate post-treatment monitoring to verify system effectiveness and establish maintenance schedules.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Seasonal & Long-Term Monitoring: Establishing Water Quality Trends</h3>
                  <p>
                    Well water quality often varies seasonally with rainfall, snowmelt, agricultural activities, and groundwater level changes. <strong>Spring testing</strong> after snowmelt typically shows highest contamination risks as surface water infiltrates aquifers. <strong>Fall testing</strong> after summer rainfall and agricultural activities provides another critical data point. Establishing baseline water quality through regular testing allows identification of trends—gradually rising nitrate levels may indicate increasing agricultural intensity nearby, while sudden bacterial contamination may signal well damage or septic system failure.
                  </p>
                  <p>
                    We offer <strong>annual testing reminder services</strong> and historical trend analysis for repeat clients. By comparing current results with previous tests, we can identify emerging problems before they reach critical levels. For properties with existing treatment systems, we recommend periodic testing to verify continued effectiveness and identify when filter replacement or system maintenance is needed. This proactive approach prevents unexpected contamination events and ensures ongoing water safety for your family.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Basic Testing: Emerging Contaminants & Specialized Analysis</h3>
                  <p>
                    Beyond standard parameters, we offer testing for emerging contaminants of concern including: 1) <strong>PFAS (per- and polyfluoroalkyl substances)</strong> from firefighting foam, industrial discharges, and consumer products, 2) <strong>Pesticides and herbicides</strong> from agricultural and lawn care applications, 3) <strong>Pharmaceuticals and personal care products</strong> from wastewater contamination, 4) <strong>Volatile organic compounds (VOCs)</strong> from industrial solvents and fuel components, and 5) <strong>Radon in water</strong> which can release into indoor air during water use.
                  </p>
                  <p>
                    Specialized testing is recommended when: 1) Properties are located near known contamination sites, 2) Unexplained health issues occur among household members, 3) Water shows unusual taste, odor, or appearance not explained by standard parameters, or 4) Historical land use suggests potential contamination (former industrial sites, orchards with legacy pesticide use, etc.). We help determine when specialized testing is warranted based on property history, location, and specific concerns.
                  </p>
                </div>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What We Test For
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatWeInspect.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <TestTube className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
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
                  Well Water Testing FAQ
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
                    Why Choose ASADS for Well Water Testing?
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/booking">Schedule Water Testing</Link>
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
              We provide well water testing services across rural and suburban Ontario
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
              Don't Gamble With Your Family's Drinking Water
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Contaminants in private well water are often invisible—they don't change taste, odor, or appearance. Professional testing is the only way to know your water is safe for drinking, cooking, and bathing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Water Test</Link>
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
