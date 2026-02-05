import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Microscope, 
  ShieldAlert, 
  Droplets, 
  FlaskConical, 
  ClipboardList, 
  ThermometerSnowflake,
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
  Brain
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

const title = "Mold Inspection & Testing Services";
const metaTitle = "Mold Inspection Toronto | Certified Mold Testing & Remediation | ASADS";
const metaDescription = "Urgent mold inspection and air quality testing in Toronto. Certified analysis for black mold, water-damaged areas, and indoor air safety. Same-day and emergency services available.";
const price = "From $349";
const duration = "2-3 Hours + Lab Analysis";

const whatWeInspect = [
  "Airborne Spore Count (Indoor vs Outdoor) – comparative analysis to identify elevated indoor mold levels",
  "Toxic Species Identification (Stachybotrys, Aspergillus) – PCR DNA testing for dangerous mold species",
  "Hidden Wall & Ceiling Moisture – infrared thermal imaging to detect moisture behind finished surfaces",
  "HVAC Ductwork Contamination – air sampling from supply and return vents for systemic mold assessment",
  "Sump Pit & Floor Drain Mold – examination of high-humidity areas prone to microbial growth",
  "Attic Insulation & Sheathing Mold – assessment of roof leaks and condensation issues in attic spaces",
  "Basement Foundation Efflorescence – identification of water intrusion through foundation walls",
  "Window Condensation & Seal Analysis – evaluation of window performance and condensation control",
  "Infrared Detection of Hidden Growth – thermal scanning to locate mold behind walls and ceilings",
  "Relative Humidity & Dew Point Mapping – environmental monitoring to identify mold-friendly conditions",
  "Surface Swab & Tape-Lift Sampling – direct collection from visible mold growth for species identification",
  "Post-Remediation Clearance Testing – verification testing after mold removal to ensure complete remediation"
];

const features = [
  {
    title: "PCR DNA Analysis & Species Identification",
    description: "Advanced Polymerase Chain Reaction (PCR) DNA testing identifies exact mold species present, including toxigenic varieties like Stachybotrys chartarum (black mold). This precise identification enables targeted remediation and accurate health risk assessment for sensitive individuals."
  },
  {
    title: "Infrared Moisture Mapping & Thermal Imaging",
    description: "We use infrared thermal cameras to detect hidden moisture intrusion behind walls, ceilings, and floors before visible mold develops. This non-invasive technology identifies temperature differentials that indicate water damage, allowing for early intervention and prevention of widespread mold growth."
  },
  {
    title: "Court & Insurance Admissible Documentation",
    description: "Our certified laboratory reports are accepted by insurance companies, real estate attorneys, and housing authorities. We provide defensible documentation with chain of custody protocols, essential for insurance claims, real estate disputes, tenant-landlord conflicts, and legal proceedings."
  },
  {
    title: "Post-Remediation Clearance Certification",
    description: "After mold remediation is completed, we conduct follow-up testing to verify that mold levels have returned to normal indoor ranges. Our clearance certificates provide official documentation that the property is safe for occupancy and that remediation was successful."
  }
];

const benefits = [
  "AIHA-Accredited Laboratory Partners with ISO 17025 Certification",
  "Emergency Mold Inspection Available Within 24 Hours",
  "Same-Day Preliminary Results with Immediate Recommendations",
  "36+ Mold Species Testing Including Toxigenic Varieties",
  "ERMI & HERTSMI-2 Scoring for Comprehensive Risk Assessment",
  "Detailed Remediation Roadmaps with Contractor Specifications",
  "Insurance-Ready Documentation for Water Damage Claims",
  "Infrared Thermal Scanning & PCR DNA Testing in Every Inspection",
  "Health-Focused Protocols for Allergy and Asthma Sufferers",
  "Real Estate Transaction Compliance for Buyers and Sellers",
  "Evening and Weekend Appointments for Minimal Disruption",
  "Free Consultation and Report Interpretation Service"
];

const faqs = [
  {
    question: "Can I just use a hardware store mold test kit instead of professional testing?",
    answer: "Hardware store mold test kits are notoriously unreliable and provide limited information. They cannot quantify spore concentrations, identify specific mold species, or determine if levels are elevated compared to outdoor baselines. Professional testing uses calibrated equipment, follows standardized protocols, and provides laboratory analysis with quantification and species identification. For health concerns, insurance claims, or real estate transactions, professional testing is essential for accurate, defensible results that meet industry standards."
  },
  {
    question: "How long until mold test results are ready, and what's the process?",
    answer: "Our mold inspection process includes on-site sampling (2-3 hours), followed by laboratory analysis. Standard laboratory turnaround is 3-5 business days, with 24-hour rush options available for urgent cases. We provide preliminary findings immediately after inspection, including moisture mapping results and visual assessment. The comprehensive laboratory report includes spore counts by species, indoor/outdoor comparisons, photographs, infrared images, and detailed recommendations. For health emergencies or real estate transactions with tight deadlines, we prioritize processing and offer expedited reporting."
  },
  {
    question: "Is 'Black Mold' (Stachybotrys) commonly found in Toronto homes, and how dangerous is it?",
    answer: "Stachybotrys chartarum (black mold) is found in approximately 5-10% of mold-contaminated Toronto homes, typically in areas with chronic water damage from roof leaks, plumbing failures, or foundation seepage. This toxigenic mold produces mycotoxins that can cause serious health effects, particularly in immunocompromised individuals, children, and the elderly. Symptoms may include respiratory issues, chronic fatigue, headaches, and cognitive difficulties. Professional testing is required for accurate identification, as Stachybotrys often grows hidden behind drywall, under flooring, or in wall cavities where simple air tests may not detect it without proper sampling techniques."
  },
  {
    question: "Will my home insurance cover mold testing and remediation?",
    answer: "Insurance coverage for mold varies by policy and cause. Most standard home insurance policies cover mold testing and remediation if it results from a sudden, accidental water event (like a burst pipe or storm damage). However, mold resulting from long-term neglect, maintenance issues, or gradual water intrusion is typically excluded. Our certified reports help substantiate insurance claims by documenting the source and extent of mold growth. We work with adjusters to provide the technical documentation needed for claim approval and can recommend remediation contractors who work directly with insurance companies."
  },
  {
    question: "How much does professional mold inspection cost in Toronto?",
    answer: "Professional mold inspection in Toronto starts at $349 for a basic assessment including air sampling and visual inspection. Comprehensive testing with infrared scanning, surface sampling, and detailed laboratory analysis ranges from $499-$799 depending on property size and number of samples required. Emergency same-day service is available at a premium. Post-remediation verification testing starts at $299. We provide detailed quotes based on your specific situation, and many clients find the investment worthwhile for health protection, property preservation, and insurance/real estate compliance."
  },
  {
    question: "What health symptoms are associated with mold exposure?",
    answer: "Mold exposure symptoms vary by individual sensitivity and mold type. Common symptoms include respiratory issues (coughing, wheezing, asthma exacerbation), allergic reactions (sneezing, runny nose, itchy eyes), sinus congestion, headaches, fatigue, skin irritation, and cognitive difficulties like brain fog. Individuals with asthma, allergies, or compromised immune systems are particularly vulnerable. Prolonged exposure to toxigenic molds like Stachybotrys or Aspergillus can lead to more serious health effects. If occupants experience symptoms that improve when away from the property, professional mold testing is recommended."
  },
  {
    question: "How do you determine if mold levels are dangerous in my home?",
    answer: "We use multiple assessment methods: 1) Indoor/outdoor spore count comparison (indoor levels should not significantly exceed outdoor levels), 2) Species identification (certain molds are more hazardous), 3) ERMI/HERTSMI-2 scoring (standardized mold risk indices), 4) Visual assessment of mold growth extent, and 5) Occupant health symptoms. No single metric determines danger—we consider all factors holistically. Health Canada and the EPA don't establish safe/unsafe mold thresholds due to individual sensitivity variations, but we follow industry guidelines for interpretation and provide clear risk assessments in our reports."
  },
  {
    question: "What should I do if I find visible mold in my home?",
    answer: "For small areas (less than 10 square feet), you can clean with appropriate precautions using detergent and water, then dry completely. However, professional assessment is recommended because: 1) Visible mold often indicates larger hidden growth, 2) Improper cleaning can spread spores, 3) Some molds require specialized remediation, and 4) Documentation may be needed for health or insurance purposes. Do not disturb mold (avoid brushing, vacuuming without HEPA filters), contain the area if possible, and maintain low humidity. For extensive visible mold, health concerns, or uncertainty about mold type, contact professionals immediately."
  }
];

const relatedServices = [
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Comprehensive indoor air quality assessment including VOCs, particulates, and chemical contaminants."
  },
  { 
    title: "Thermal Imaging Inspection", 
    href: "/services/thermal-imaging",
    description: "Infrared scanning to detect hidden moisture, insulation voids, and energy efficiency issues."
  },
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete property assessment including mold and moisture evaluation for home buyers."
  },
  { 
    title: "Pre-Listing Inspection", 
    href: "/services/pre-listing",
    description: "Seller-focused inspection to identify issues including mold before listing your property."
  },
];

export default function MoldInspection() {
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
    "serviceType": "Mold Inspection & Testing Services",
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
    "description": "Professional mold inspection and testing services in Toronto and the GTA. AIHA-accredited laboratory analysis, infrared moisture detection, and PCR DNA testing for accurate mold identification and health risk assessment.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Environmental Testing Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mold Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Mold Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comprehensive Mold Testing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Mold Assessment"
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
        "name": "Mold Inspection & Testing",
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
    "description": "ASADS Home Inspection provides professional mold inspection, environmental testing, and home inspection services across Ontario. Certified inspectors specializing in mold detection, moisture mapping, and indoor air quality assessment."
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
      "serviceType": "Mold Inspection & Testing Services"
    },
    "specialty": "Environmental Testing Services",
    "about": {
      "@type": "Thing",
      "name": "Mold Inspection & Testing",
      "description": "Professional assessment and laboratory testing for mold contamination in residential and commercial buildings"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Mold Testing Services",
    "image": `${SITE_URL}/images/services/mold-inspection.jpg`,
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
          "name": "Allergy Sufferer"
        },
        "datePublished": "2025-02-12",
        "reviewBody": "Professional mold inspection that identified hidden mold behind our bathroom tiles. The PCR testing confirmed it was Aspergillus, which explained my chronic sinus issues. The remediation plan was clear, and follow-up testing confirmed the mold was gone. My health has improved significantly.",
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
          "name": "Home Buyer"
        },
        "datePublished": "2025-01-25",
        "reviewBody": "Mold inspection saved us from buying a home with serious water damage. The infrared scanning showed moisture throughout the basement walls that wasn't visible. The lab report gave us the evidence needed to negotiate or walk away. Professional, thorough, and worth every penny.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mold Inspection Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Standard Mold Testing",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Basic Mold Assessment",
                "description": "Visual inspection with air sampling and laboratory analysis"
              },
              "price": "349",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Comprehensive Mold Inspection",
                "description": "Includes infrared scanning, surface sampling, and detailed lab report"
              },
              "price": "499",
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
                "name": "Emergency Mold Assessment",
                "description": "Same-day service for urgent mold concerns with expedited lab processing"
              },
              "price": "649",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Post-Remediation Verification",
                "description": "Clearance testing to confirm successful mold removal"
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
                <Microscope className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  AIHA-Accredited Environmental Testing
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Mold Inspection & Testing Services
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Protect your home and health with AIHA-certified lab testing. We detect toxic black mold, hidden moisture, and water-damage-related spores with 99.9% accuracy. 
              <span className="block mt-2">
                <Link to="/services/pre-purchase" className="text-primary-foreground underline hover:opacity-90">
                  Pre-Purchase Home Inspections
                </Link>{" "}
                and{" "}
                <Link to="/services/pre-listing" className="text-primary-foreground underline hover:opacity-90">
                  Pre-Listing Inspections
                </Link>{" "}
                integrate mold checks for buyer and seller confidence.
              </span>
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>AIHA-Accredited Lab Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Emergency Services Available</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Mold Inspection
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
              <span>AIHA-Accredited Labs • Infrared Scanning • PCR DNA Testing</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Mold Inspection</Link>
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
                  Understanding Mold: Health Risks and Property Damage in Ontario Homes
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Mold isn't just a property issue—it's a significant health risk that affects thousands of Toronto and GTA residents annually. Our Toronto mold specialists go beyond basic visual checks, providing <strong>AIHA-accredited laboratory analysis</strong> and <strong>PCR DNA testing</strong> for 36+ mold species, including toxigenic varieties like <em>Stachybotrys chartarum</em> (Black Mold). Emergency mold inspections and same-day services are available for urgent health concerns and time-sensitive real estate transactions.
                  </p>
                  <p>
                    In the humid Ontario climate, particularly during spring thaw and summer months, homes across Toronto, Mississauga, Vaughan, and throughout the GTA are vulnerable to mold growth. Basements, attics, and bathrooms provide ideal environments for mold when combined with common water intrusion issues. Our comprehensive approach addresses both visible mold and hidden growth that can compromise indoor air quality and structural integrity.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Health Impacts of Mold Exposure: Beyond Allergies</h3>
                  <p>
                    Mold exposure affects individuals differently based on sensitivity, exposure duration, and mold type. While many people experience allergic reactions like sneezing, itchy eyes, and respiratory irritation, prolonged exposure to certain mold species can cause more serious health effects. Toxigenic molds produce mycotoxins that may lead to neurological symptoms, chronic fatigue, immune system suppression, and in extreme cases, organ damage.
                  </p>
                  <p>
                    Vulnerable populations including children, elderly individuals, pregnant women, and those with pre-existing respiratory conditions (asthma, COPD) or compromised immune systems are at greatest risk. The World Health Organization recognizes indoor mold as a significant public health concern, with studies linking mold exposure to increased asthma development in children and exacerbation of existing respiratory conditions.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Common Mold Sources in GTA Homes: Identification and Prevention</h3>
                  <p>
                    Mold requires three elements to grow: moisture, organic material (food source), and suitable temperature. In Toronto homes, common moisture sources include basement seepage, roof leaks, plumbing failures, condensation on cold surfaces, and inadequate ventilation in bathrooms and kitchens. Building materials like drywall, wood, insulation, and carpet provide ideal organic substrates for mold growth when moisture is present.
                  </p>
                  <p>
                    High-risk areas in GTA homes include basements (foundation cracks, sump pump failures), attics (roof leaks, inadequate ventilation), bathrooms (shower leaks, poor exhaust), kitchens (appliance leaks, condensation), and around windows (failed seals, condensation). Older homes in Toronto's historic neighborhoods often have additional vulnerabilities like original plaster walls, aged plumbing, and less effective moisture barriers compared to modern construction.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Advanced Testing Methodologies: Beyond Visual Inspection</h3>
                  <p>
                    Our mold inspection process employs multiple advanced testing methodologies: <strong>Air Sampling</strong> to quantify airborne spore concentrations with indoor/outdoor comparisons, <strong>Surface Sampling</strong> using tape lifts and swabs for species identification, <strong>Infrared Thermal Imaging</strong> to detect hidden moisture behind finished surfaces, and <strong>PCR DNA Analysis</strong> for precise identification of mold species including difficult-to-culture varieties.
                  </p>
                  <p>
                    We also conduct environmental monitoring including relative humidity measurement, dew point calculation, and temperature mapping to identify conditions conducive to mold growth. The ERMI (Environmental Relative Moldiness Index) and HERTSMI-2 scoring systems provide standardized assessment of mold contamination levels, useful for comparing properties and tracking remediation effectiveness over time.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <FlaskConical className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Lab Certified</h4>
                      <p className="text-xs text-muted-foreground">AIHA-accredited lab testing for accurate, defensible results.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <ThermometerSnowflake className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Infrared Moisture Scan</h4>
                      <p className="text-xs text-muted-foreground">Detect hidden water damage before mold becomes visible.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <ShieldAlert className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Health-Focused</h4>
                      <p className="text-xs text-muted-foreground">Specialized protocols for allergy and respiratory concerns.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Black Mold (Stachybotrys): Facts vs. Myths</h3>
                  <p>
                    Stachybotrys chartarum, commonly called "black mold" or "toxic black mold," receives significant media attention but is often misunderstood. While it's true that Stachybotrys produces potent mycotoxins and can cause serious health effects, it's less common than other mold species and requires specific conditions to grow—typically chronic water damage with cellulose-rich materials (drywall, paper, wood) remaining wet for extended periods.
                  </p>
                  <p>
                    Not all black-colored mold is Stachybotrys—many common molds appear dark. Accurate identification requires laboratory analysis. When Stachybotrys is present, professional remediation is essential due to the health risks and difficulty of complete removal. Our testing identifies Stachybotrys when present and provides guidance on appropriate remediation protocols to ensure safe, effective removal.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Mold Inspection Process: Step-by-Step Assessment</h3>
                  <p>
                    <strong>Initial Consultation & History Review:</strong> We discuss occupant health concerns, property history of water damage, and areas of concern to tailor our inspection approach.
                  </p>
                  <p>
                    <strong>Comprehensive Visual Assessment:</strong> Systematic examination of all accessible areas including basements, attics, crawl spaces, bathrooms, kitchens, and living areas for visible mold, water stains, and moisture indicators.
                  </p>
                  <p>
                    <strong>Environmental Monitoring:</strong> Measurement of temperature, relative humidity, and dew point throughout the property to identify mold-conducive conditions.
                  </p>
                  <p>
                    <strong>Infrared Thermal Imaging:</strong> Non-invasive scanning of walls, ceilings, and floors to detect hidden moisture and temperature anomalies indicating potential mold growth behind finished surfaces.
                  </p>
                  <p>
                    <strong>Strategic Sampling:</strong> Collection of air, surface, and bulk samples from representative areas following industry-standard protocols for laboratory analysis.
                  </p>
                  <p>
                    <strong>Laboratory Analysis & Reporting:</strong> Samples processed by AIHA-accredited laboratories with detailed reporting including spore counts, species identification, and interpretation.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Interpretation of Results: Understanding Your Report</h3>
                  <p>
                    Our comprehensive reports include: 1) Laboratory data with spore counts by species, 2) Indoor/outdoor comparisons to identify elevated levels, 3) Photographic documentation of inspection findings, 4) Infrared images showing moisture patterns, 5) Species identification with health implications, 6) ERMI/HERTSMI-2 scores for standardized assessment, and 7) Detailed recommendations for remediation, moisture control, and prevention.
                  </p>
                  <p>
                    We provide clear interpretation of results, explaining what levels are concerning for your specific situation. Reports are structured to be understandable for homeowners while containing the technical detail needed for insurance claims, real estate transactions, and legal proceedings. Follow-up consultation ensures you understand the findings and recommended next steps.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Mold Remediation Guidance and Contractor Referrals</h3>
                  <p>
                    When remediation is needed, we provide detailed specifications outlining the scope of work, containment requirements, removal methods, and clearance criteria. These specifications help ensure remediation contractors complete work to professional standards. We can recommend qualified remediation professionals in the Toronto area who follow industry best practices and have experience with insurance claims.
                  </p>
                  <p>
                    For smaller mold issues, we provide guidance on safe do-it-yourself approaches with appropriate personal protective equipment and containment measures. For extensive mold growth, structural damage, or toxigenic mold species, professional remediation is strongly recommended to ensure complete removal and prevent recurrence.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Prevention Strategies: Keeping Your Toronto Home Mold-Free</h3>
                  <p>
                    Effective mold prevention focuses on moisture control: maintaining indoor humidity below 50%, ensuring proper ventilation in bathrooms and kitchens, addressing plumbing leaks promptly, grading soil away from foundations, maintaining roof and gutter systems, and using dehumidifiers in damp basements. Regular maintenance and prompt response to water incidents are key to preventing mold establishment.
                  </p>
                  <p>
                    For new construction or renovations, we recommend mold-resistant building materials, proper vapor barrier installation, and attention to building envelope details. In existing homes, improving ventilation, adding insulation to prevent condensation, and addressing drainage issues can significantly reduce mold risk.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Standard Mold Testing: Comprehensive Indoor Air Quality</h3>
                  <p>
                    Mold is just one component of indoor air quality. Consider combining mold testing with <Link to="/services/air-quality" className="text-primary hover:underline">comprehensive indoor air quality assessment</Link> to evaluate volatile organic compounds (VOCs), particulates, carbon monoxide, and other contaminants. <Link to="/services/radon-testing" className="text-primary hover:underline">Radon testing</Link> addresses another significant environmental health risk in Ontario homes. <Link to="/services/asbestos-testing" className="text-primary hover:underline">Asbestos testing</Link> is important in homes built before 1990.
                  </p>
                  <p>
                    We coordinate these specialized services to provide holistic assessment of your indoor environment. Bundling services often provides cost savings and ensures all evaluations are completed efficiently, particularly important during real estate transactions or when addressing specific health concerns.
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
                  Mold Inspection FAQ
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
                    Why Choose ASADS for Mold Testing?
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
                      <Link to="/booking">Schedule Mold Inspection</Link>
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
              We provide mold inspection services across the Greater Toronto Area
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
              Protect Your Health and Property From Mold
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't ignore mold concerns. Professional testing provides the accurate information needed to protect your family's health and your home's value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Mold Inspection</Link>
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
