import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Pipette, 
  ShieldAlert, 
  FileSearch, 
  HardHat, 
  AlertTriangle, 
  Thermometer,
  Phone, 
  Calendar,
  Clock,
  FileText,
  Home,
  Search,
  Zap,
  Droplets,
  Video,
  Wind,
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
  Cloud,
  Droplet,
  Heart,
  EyeOff,
  Camera,
  Flame,
  Snowflake,
  Wifi,
  Shield,
  Building2,
  Factory,
  Gavel,
  Wrench,
  AlertOctagon,
  Bell,
  Battery,
  Compass,
  ClipboardCheck,
  Flask,
  Filter,
  TestTube2,
  Bug,
  Radiation,
  Waves,
  Skull,
  Navigation,
  Satellite,
  Radio,
  WrenchIcon,
  Ruler,
  Layers,
  Database,
  CloudUpload,
  Download,
  Link as LinkIcon,
  MapPin as MapPinIcon,
  Target as TargetIcon,
  Compass as CompassIcon,
  Navigation2,
  ArrowUpRight,
  CheckCircle,
  TestTube,
  Beaker,
  Atom,
  Biohazard,
  Construction,
  Hammer,
  FileWarning,
  ThermometerSnowflake,
  BuildingIcon,
  HomeIcon,
  Scale,
  GavelIcon,
  FileCheck,
  FileX,
  UserCheck,
  UsersIcon,
  Safety,
  AwardIcon,
  ClipboardX,
  Clipboard,
  FileBarChart,
  FileSpreadsheet,
  FileText as FileTextIcon,
  FileCode,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  Archive,
  Book,
  BookOpenCheck,
  BookMarked,
  BookUp,
  BookDown,
  BookKey,
  BookOpenIcon,
  CloudRain,
  Droplet as DropletIcon,
  ThermometerIcon,
  WindIcon,
  WavesIcon,
  FilterIcon,
  AirVent,
  Fan,
  TreePine,
  Sprout,
  Flower,
  TreeDeciduous,
  CloudSun,
  CloudFog,
  CloudLightning,
  CloudDrizzle,
  CloudSnow,
  CloudHail,
  CloudRainWind,
  Tornado,
  Hurricane,
  SnowflakeIcon,
  Sun,
  Sunset,
  Sunrise,
  Moon,
  Star,
  CloudMoon,
  CloudSunRain,
  Cloudy,
  PartyPopper,
  Sparkles,
  Brain,
  Heart as HeartIcon,
  Lungs,
  Activity,
  Pulse,
  HeartPulse,
  Stethoscope,
  Ambulance,
  Pill,
  Syringe,
  ShieldPlus,
  ShieldMinus,
  ShieldOff,
  ShieldQuestion,
  ShieldX,
  ShieldPlusIcon,
  ShieldCheck,
  AlertCircle,
  BellRing,
  BellOff,
  Volume2,
  VolumeX,
  Music,
  Headphones,
  RadioIcon,
  Tv,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Cpu,
  Server,
  HardDrive,
  DatabaseIcon,
  Network,
  WifiOff,
  Bluetooth,
  BluetoothConnected,
  BluetoothSearching,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  Power,
  PowerOff,
  ZapIcon,
  ZapOff,
  RadiationIcon,
  SkullIcon,
  BrainIcon,
  Baby,
  School,
  GraduationCap,
  BookOpenText,
  BookText,
  BookType,
  BookMark,
  BookCopy,
  BookOpenBookmark,
  BookHeart,
  BookDashed,
  BookKeyIcon,
  BookLock,
  BookMinus,
  BookOpenMinus,
  BookPlus,
  BookOpenPlus,
  BookUp2,
  BookDown2,
  BookX,
  BookOpenX,
  BookCheck,
  BookOpenCheckIcon,
  BookHeadphones,
  BookAudio,
  BookMusic,
  BookImage,
  BookOpenImage,
  BookVideo,
  BookOpenVideo,
  BookCode,
  BookOpenCode,
  BookTerminal,
  BookOpenTerminal,
  BookUser,
  BookOpenUser,
  BookSettings,
  BookOpenSettings,
  BookKanban,
  BookOpenKanban,
  BookTemplate,
  BookOpenTemplate,
  BookPen,
  BookOpenPen,
  BookEdit,
  BookOpenEdit,
  BookAI,
  BookOpenAI,
  BookGlobe,
  BookOpenGlobe,
  BookWorld,
  BookOpenWorld,
  BookCompass,
  BookOpenCompass,
  BookNavigation,
  BookOpenNavigation,
  BookMap,
  BookOpenMap,
  BookMapPin,
  BookOpenMapPin
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

const title = "Lead Paint Testing";
const metaTitle = "Lead Paint Testing Toronto | XRF Certified Inspection & Risk Assessment | ASADS";
const metaDescription = "Professional lead paint testing in Toronto & GTA. XRF certified inspection for homes built before 1990. Ontario Regulation 278/05 compliant reports. Lead dust wipe testing and risk assessment for child safety.";
const price = "$349-$599";
const duration = "1-3 Hours";

const whatWeInspect = [
  "XRF Analysis of Interior Walls & Ceilings – non-destructive testing through multiple paint layers to detect lead content",
  "Window Sashes, Sills & Friction Surfaces – high-risk areas where lead paint deterioration creates hazardous dust",
  "Door Frames, Trim & Baseboards – assessment of painted woodwork where lead-based paint was commonly applied",
  "Radiators, Metal Piping & Heating Components – testing of metal surfaces with lead-based industrial coatings",
  "Exterior Siding, Soffits & Trim – evaluation of exterior paint systems for lead content and weathering condition",
  "Kitchen & Bathroom Cabinetry – testing of pre-1990 cabinets and built-ins with potential lead-based finishes",
  "Lead Dust Wipe Sampling on Floors & Window Troughs – EPA method dust collection for laboratory lead quantification",
  "Soil Contamination Near Foundations & Drip Lines – assessment of exterior soil lead levels from paint deterioration",
  "Child-Occupied Play Areas & Sleeping Quarters – targeted testing in areas where children spend significant time",
  "Paint Chip Laboratory Analysis – destructive sampling for definitive lead concentration measurement when needed",
  "Friction & Impact Surfaces Assessment – identification of areas generating lead dust through normal use",
  "Ontario Regulation 278/05 Compliance Verification – documentation meeting renovation and demolition requirements"
];

const features = [
  {
    title: "XRF (X-Ray Fluorescence) Non-Destructive Testing Technology",
    description: "Our certified inspectors use state-of-the-art XRF analyzers that detect lead content through multiple layers of paint without damaging surfaces. This technology provides instant, on-site results with part-per-million sensitivity, identifying lead concentrations as low as 0.1 mg/cm² (well below the Health Canada threshold of 1.0 mg/cm²). The non-destructive nature allows testing of historic finishes, delicate trim, and occupied spaces without creating lead dust or requiring repair work. All XRF equipment undergoes daily calibration and quarterly certification to ensure measurement accuracy suitable for regulatory compliance and legal documentation."
  },
  {
    title: "EPA Method Dust Wipe Sampling & Laboratory Lead Quantification",
    description: "We conduct comprehensive dust wipe sampling following EPA Method 1005-B for lead in settled dust. Using pre-moistened wipes on standardized templates, we collect samples from floors, window troughs, and other horizontal surfaces where lead dust accumulates. Samples undergo laboratory analysis via inductively coupled plasma mass spectrometry (ICP-MS) for precise lead quantification. Results are compared against Health Canada clearance standards (40 µg/ft² for floors, 250 µg/ft² for interior window sills, 400 µg/ft² for window troughs) to determine if hazardous lead dust conditions exist. This quantitative approach provides objective data for risk assessment, remediation planning, and post-abatement clearance verification."
  },
  {
    title: "Ontario Regulation 278/05 Compliance & Renovation Safety Planning",
    description: "Our lead paint inspections meet all requirements under Ontario Regulation 278/05 (Designated Substance - Lead) for renovation, repair, and demolition projects in pre-1990 buildings. We provide legally compliant lead assessment reports that satisfy municipal permit requirements, protect contractors from Ministry of Labour penalties (up to $500,000 per violation), and ensure occupant safety during construction activities. Our reports include: detailed testing locations and results, lead hazard risk assessment, specific work practice recommendations, occupant protection protocols, and waste disposal guidance. This documentation is essential for property owners, contractors, and property managers undertaking work in Toronto's heritage and mid-century housing stock."
  },
  {
    title: "Certified Lead Risk Assessors with Radiation Safety Officer Qualifications",
    description: "All inspections are conducted by certified Lead Risk Assessors holding Radiation Safety Officer certification for XRF operation, EPA Renovation, Repair and Painting (RRP) certification, and specialized training in Ontario Regulation 278/05 compliance. Our inspectors have extensive experience with Toronto's unique building types including Victorian homes, mid-century bungalows, heritage properties, and multi-unit residential buildings. This specialized expertise ensures accurate interpretation of XRF readings (accounting for substrate effects, multiple paint layers, and environmental conditions), appropriate sample collection, and development of practical risk management strategies tailored to each property's specific conditions and occupancy patterns."
  }
];

const benefits = [
  "XRF non-destructive testing technology providing instant results without damaging painted surfaces",
  "EPA method dust wipe sampling with laboratory analysis for quantitative lead dust hazard assessment",
  "Ontario Regulation 278/05 compliant reports for renovation, repair, and demolition permit requirements",
  "Certified Lead Risk Assessors with Radiation Safety Officer qualifications and EPA RRP certification",
  "Child-focused risk assessment prioritizing play areas, sleeping quarters, and high-contact surfaces",
  "Comprehensive testing of all painted surfaces including friction areas generating lead dust",
  "Soil contamination assessment around foundations and drip lines from exterior paint deterioration",
  "Detailed remediation recommendations including containment methods, worker protection, and waste disposal",
  "Post-abatement clearance testing and verification to ensure safe reoccupancy after lead work",
  "Documentation suitable for real estate transactions, insurance claims, and legal proceedings",
  "Same-day emergency testing for urgent renovation projects or suspected lead poisoning incidents",
  "Peace of mind knowing your family is protected from permanent neurological damage from lead exposure"
];

const faqs = [
  {
    question: "How do I know if my Toronto home has lead paint, and what years are most at risk?",
    answer: "Lead-based paint was commonly used in Canadian homes until it was banned for residential use in 1990. The risk timeline: 1) Pre-1950 homes: Very high risk - lead concentrations often 10-50% by weight, 2) 1950-1970 homes: High risk - lead content typically 1-5%, 3) 1970-1990 homes: Moderate risk - lead use declining but still present, especially in certain applications. In Toronto specifically, approximately 85% of homes built before 1990 contain some lead-based paint. The only definitive way to confirm is professional XRF testing, as DIY test kits often produce false negatives by only detecting surface layers. Our XRF technology detects lead through multiple paint layers, providing accurate identification even when lead paint has been painted over with modern latex paints."
  },
  {
    question: "What are the specific health effects of lead exposure, particularly for children and pregnant women?",
    answer: "Lead exposure causes irreversible neurological damage with no safe blood lead level according to Health Canada. For children: 1) Brain development impairment - each 10 µg/dL increase in blood lead reduces IQ by 4-7 points, 2) Learning disabilities - attention deficits, reduced academic achievement, 3) Behavioral problems - increased aggression, hyperactivity, impulse control issues, 4) Physical effects - hearing loss, slowed growth, anemia. For pregnant women: lead crosses the placenta, affecting fetal brain development and increasing risk of premature birth and low birth weight. For adults: hypertension, kidney damage, reproductive problems, and cognitive decline. The insidious nature of lead poisoning is that symptoms often don't appear until significant damage has occurred, making prevention through professional testing critically important. Even low-level exposure from deteriorating paint or renovation dust can cause cumulative damage over time."
  },
  {
    question: "Is lead paint testing legally required for renovations in Ontario, and what regulations apply?",
    answer: "Yes, lead paint testing is legally required under multiple Ontario regulations: 1) Ontario Regulation 278/05 (Designated Substance - Lead) mandates testing before any renovation, repair, or demolition work that may disturb painted surfaces in buildings constructed before 1990, 2) Occupational Health and Safety Act requires employers to protect workers from lead exposure, 3) Municipal building permits often require lead assessment documentation for renovation projects, 4) Child care licensing regulations require lead testing in facilities serving children. Failure to comply can result in: Ministry of Labour fines up to $500,000 per violation, project shutdowns, worker compensation claims, and personal liability for property owners and contractors. Our inspections provide the legally compliant documentation needed for permit applications, worker safety plans, and regulatory compliance."
  },
  {
    question: "How accurate are DIY lead test kits compared to professional XRF testing?",
    answer: "DIY lead test kits (typically swab-based chemical tests) have significant limitations: 1) They only test the surface layer of paint, missing lead in underlying layers, 2) High false negative rates (up to 50% in studies), 3) Cannot quantify lead concentration, 4) Produce false positives with other metals, 5) Require destructive sampling that creates lead dust. Professional XRF testing provides: 1) Non-destructive analysis through multiple paint layers, 2) Quantitative measurement in mg/cm² or percentage by weight, 3) Part-per-million sensitivity (0.1 mg/cm² vs. Health Canada threshold of 1.0 mg/cm²), 4) Immediate on-site results with digital documentation, 5) Accounted for substrate effects and measurement conditions, 6) Calibrated equipment with certification traceable to NIST standards. For regulatory compliance, health protection, and accurate risk assessment, professional XRF testing is essential. DIY kits may provide preliminary screening but should never replace professional assessment for renovation planning or health concerns."
  },
  {
    question: "What should I do if lead paint is found in my home, especially with children present?",
    answer: "If lead paint is identified: 1) For intact, undamaged paint in good condition: Monitor regularly for deterioration, ensure regular damp cleaning to control dust, and consider encapsulation with specialized coatings, 2) For deteriorating paint or friction surfaces: Professional abatement is recommended - either removal (with strict containment) or encapsulation with approved systems, 3) For renovation areas: Hire EPA RRP-certified contractors who follow lead-safe work practices including containment, HEPA filtration, and proper cleanup, 4) Immediately address: Peeling/chalking paint, friction surfaces (windows, doors), chewable surfaces (window sills, railings), and soil contamination near foundations. Additional protective measures: frequent handwashing for children, regular wet-cleaning of floors and window areas, use of doormats, removing shoes indoors, and providing calcium/iron-rich diets to reduce lead absorption. Never attempt DIY lead paint removal - improper methods create hazardous dust that spreads throughout the home. We provide detailed remediation recommendations and can refer you to licensed lead abatement contractors."
  },
  {
    question: "What is the difference between lead-based paint and lead-contaminated dust, and why is dust more dangerous?",
    answer: "Lead-based paint refers to the paint material itself containing lead pigments or driers. Lead-contaminated dust is microscopic lead particles created when lead paint deteriorates (chalking, peeling) or is disturbed (sanding, scraping, friction). The danger distinction: 1) Bioavailability - lead dust is more readily absorbed when ingested or inhaled compared to paint chips, 2) Exposure pathway - dust becomes airborne or settles on surfaces where hand-to-mouth transfer occurs, especially in children, 3) Particle size - lead dust particles are small enough to penetrate deep into lungs and be absorbed into bloodstream, 4) Cleaning difficulty - lead dust resists normal cleaning and requires specialized HEPA vacuuming and wet-cleaning methods. The most common exposure scenario in Toronto homes is deteriorating window paint creating lead dust on sills and floors, combined with normal opening/closing friction generating additional dust. Our testing assesses both the paint itself (XRF analysis) and the dust hazard (wipe sampling) to provide complete risk assessment."
  },
  {
    question: "How does lead paint testing work during real estate transactions, and what are common negotiation outcomes?",
    answer: "Lead paint testing during real estate transactions typically involves: 1) Pre-purchase testing for homes built before 1990, especially with planned renovations or young children, 2) Documentation for disclosure requirements, 3) Negotiation leverage based on identified hazards. Common scenarios: 1) Intact lead paint in good condition: Often results in seller disclosure and buyer acknowledgment, sometimes with small credit for future monitoring, 2) Deteriorating lead paint or high dust levels: Typically requires seller remediation before closing or substantial price reduction, 3) Planned renovations: Often requires credit for lead-safe renovation practices or postponement of work until proper abatement, 4) Properties with young children: May require complete abatement of accessible lead hazards as condition of sale. Our real estate reports provide: clear documentation of hazards, estimated remediation costs, and recommendations for protective measures. We've facilitated negotiations ranging from $5,000-$50,000+ adjustments based on lead hazard severity and property value."
  },
  {
    question: "How much does professional lead paint testing cost in Toronto, and what factors affect pricing?",
    answer: "Professional lead paint testing in Toronto typically ranges from $349 for basic XRF screening of a single area to $599+ for comprehensive whole-house assessment including dust wipe sampling. Factors affecting cost: 1) Property size and number of surfaces tested, 2) Type of testing (XRF only vs. combined with dust wipes and soil sampling), 3) Number of samples sent for laboratory analysis, 4) Property type (residential vs. commercial/industrial), 5) Urgency of service (standard vs. emergency same-day), 6) Additional services (risk assessment reports, remediation planning, post-abatement clearance). Our standard residential package ($449) includes: XRF testing of 20+ surfaces, 3 dust wipe samples, comprehensive report with risk assessment and recommendations. Commercial properties are priced based on square footage and specific regulatory requirements. Contact us at (647) 801-9311 for a customized quote based on your property characteristics and testing objectives."
  }
];

const relatedServices = [
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "WSIB certified asbestos assessment for pre-1990 properties undergoing renovation or experiencing material deterioration."
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Comprehensive mold assessment including moisture mapping, surface sampling, and hidden growth detection."
  },
  { 
    title: "Air Quality Testing", 
    href: "/services/air-quality",
    description: "Professional indoor air quality assessment for VOCs, allergens, particulate matter, and ventilation adequacy."
  },
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete property assessment including hazardous materials evaluation for older Toronto homes."
  },
];

export default function LeadPaintTesting() {
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
    "serviceType": "Lead Paint Testing",
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
    "description": "Professional lead paint testing in Toronto and GTA. XRF certified inspection for homes built before 1990. Ontario Regulation 278/05 compliant reports with dust wipe sampling and risk assessment.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Hazardous Materials Testing",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lead Paint Testing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Lead Paint Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comprehensive Lead Risk Assessment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Same-Day Lead Testing"
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
        "name": "Lead Paint Testing",
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
    "description": "ASADS Home Inspection provides professional lead paint testing, XRF inspection, and hazardous materials assessment across Ontario. Ontario Regulation 278/05 compliant testing for pre-1990 properties."
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
      "serviceType": "Lead Paint Testing"
    },
    "specialty": "Hazardous Materials Testing",
    "about": {
      "@type": "Thing",
      "name": "Lead Paint Testing",
      "description": "Professional assessment of lead-based paint hazards in pre-1990 buildings"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Lead Paint Testing Services",
    "image": `${SITE_URL}/images/services/lead-paint-testing.jpg`,
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
          "name": "Family in Toronto"
        },
        "datePublished": "2025-01-28",
        "reviewBody": "Before renovating our 1920s home, ASADS conducted lead paint testing and found high lead concentrations in window trim and doors. Their XRF testing was non-destructive and provided instant results. The detailed report helped us hire an EPA-certified contractor who followed proper containment procedures. Post-abatement clearance testing confirmed our home was safe for our young children. Professional service that gave us peace of mind.",
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
          "name": "Property Developer in Hamilton"
        },
        "datePublished": "2025-02-16",
        "reviewBody": "We renovate heritage properties and rely on ASADS for lead paint testing on every project. Their Ontario Regulation 278/05 compliant reports satisfy municipal permit requirements and protect us from Ministry of Labour penalties. The dust wipe sampling identified hidden lead dust hazards we would have missed. Their emergency same-day service has saved multiple projects from delays. Highly recommended for any work on pre-1990 buildings.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lead Paint Testing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Residential Lead Testing",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard Lead Inspection",
                "description": "XRF testing of 20+ surfaces with basic report and risk assessment"
              },
              "price": "349",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Comprehensive Lead Assessment",
                "description": "Full assessment including XRF, dust wipe sampling, soil testing, and detailed remediation plan"
              },
              "price": "549",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Commercial & Emergency Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Emergency Same-Day Testing",
                "description": "Urgent lead testing for renovation deadlines or suspected poisoning incidents"
              },
              "price": "599",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial Lead Survey",
                "description": "Large-scale lead assessment for commercial, industrial, or multi-unit properties"
              },
              "price": "799",
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
                <Pipette className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  XRF Certified Lead Paint Inspection
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Lead Paint Testing
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Protect your family from permanent neurological damage. Professional XRF testing for homes built before 1990. Ontario Regulation 278/05 compliant for renovations.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Instant XRF Results</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                <span>Ontario Regulation 278/05 Compliant</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Lead Testing
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
              <span>XRF Non-Destructive Testing • EPA Dust Wipe Sampling • Ontario Regulation 278/05 Compliant • Certified Risk Assessors</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Lead Testing</Link>
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
                  XRF Certified Lead Paint Assessment for Toronto's Pre-1990 Housing Stock
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    <strong>Lead-based paint represents one of the most significant environmental health hazards in Toronto's older housing</strong>, with approximately 85% of homes built before 1990 containing some lead-based paint. When this paint deteriorates or is disturbed during renovations, it creates toxic lead dust that causes permanent neurological damage, particularly in children under six whose developing brains are most vulnerable. Our XRF certified lead paint testing provides definitive identification of lead hazards, Ontario Regulation 278/05 compliant documentation for renovations, and actionable recommendations for protecting your family from irreversible health consequences.
                  </p>
                  <p>
                    We specialize in Toronto's unique building types including Victorian homes, mid-century bungalows, heritage properties, and multi-unit residential buildings—all constructed during peak lead paint use (pre-1990). Using state-of-the-art XRF (X-Ray Fluorescence) technology, we detect lead content through multiple layers of paint without damaging surfaces, providing instant on-site results with part-per-million sensitivity. Combined with EPA method dust wipe sampling and laboratory analysis, we deliver comprehensive lead hazard assessment that meets Health Canada guidelines, Ministry of Labour requirements, and municipal permit regulations for renovation projects across the GTA.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-xl my-6">
                    <h4 className="text-red-900 font-bold flex items-center gap-2 mb-2">
                      <ShieldAlert className="text-red-600" size={20} />
                      CRITICAL HEALTH WARNING: Lead Poisoning Risk in Pre-1990 Homes
                    </h4>
                    <p className="text-red-800">
                      Lead paint dust is the #1 cause of lead poisoning in children. <strong>85% of homes built before 1990 contain lead-based paint</strong>, with concentrations as high as 50% by weight in pre-1950 properties. Disturbing these surfaces during renovations creates toxic, invisible dust that can cause permanent neurological damage, IQ loss, learning disabilities, and behavioral problems. There is no safe blood lead level according to Health Canada. Professional testing before any renovation or when children are present is essential for family protection.
                    </p>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">XRF Technology: Non-Destructive Lead Detection Through Multiple Paint Layers</h3>
                  <p>
                    <strong>XRF (X-Ray Fluorescence) analyzers</strong> represent the gold standard for professional lead paint testing, providing non-destructive analysis through multiple paint layers without damaging surfaces. Our certified inspectors use handheld XRF units that emit low-energy X-rays, causing lead atoms in paint to fluoresce with characteristic energy signatures. The technology provides: 1) Instant on-site results with part-per-million sensitivity (detecting as low as 0.1 mg/cm² vs. Health Canada's 1.0 mg/cm² threshold), 2) Quantitative measurement in mg/cm² or percentage by weight, 3) Analysis through up to 30 layers of paint, 4) No damage to historic finishes or delicate trim, and 5) Digital documentation with GPS location tagging.
                  </p>
                  <p>
                    The non-destructive nature of XRF testing is particularly valuable for: 1) Heritage properties where preserving original finishes is important, 2) Occupied homes where creating lead dust through destructive sampling would be hazardous, 3) Real estate transactions where damaging surfaces is unacceptable, and 4) Large-scale surveys requiring rapid testing of numerous surfaces. Our XRF equipment undergoes daily calibration with certified reference materials and quarterly certification to ensure measurement accuracy suitable for regulatory compliance, legal documentation, and health protection decisions.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">High-Risk Surfaces: Windows, Doors, and Friction Areas Generating Lead Dust</h3>
                  <p>
                    <strong>Windows, doors, and friction surfaces</strong> represent the highest risk for lead hazard generation in Toronto homes. The opening and closing of painted windows and doors creates friction that grinds lead paint into fine dust that settles on sills, floors, and other horizontal surfaces. This lead dust is particularly hazardous because: 1) Particle size is ideal for inhalation and ingestion, 2) Dust accumulates in window troughs where children play, 3) Normal cleaning often redistributes rather than removes lead dust, and 4) Dust resuspends into air with normal activity.
                  </p>
                  <p>
                    Our inspection prioritizes these high-risk areas: 1) Window sashes, sills, and troughs (interior and exterior), 2) Door frames and friction surfaces, 3) Stair railings and handrails, 4) Baseboards and trim in high-traffic areas, 5) Porches, decks, and exterior railings, and 6) Radiators and heating system components. We conduct both XRF testing of the paint itself and dust wipe sampling of adjacent surfaces to assess both the source material and the resulting contamination. For properties with children, we particularly focus on play areas, bedrooms, and other child-occupied spaces where hand-to-mouth transfer of lead dust is most likely.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Pipette className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">XRF Technology</h4>
                      <p className="text-xs text-muted-foreground">Non-destructive testing through multiple paint layers with instant on-site results.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <FileSearch className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Dust Wipe Sampling</h4>
                      <p className="text-xs text-muted-foreground">EPA method dust collection and laboratory analysis for lead contamination assessment.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <HardHat className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">O.Reg 278/05 Compliant</h4>
                      <p className="text-xs text-muted-foreground">Legally compliant reports for renovation, repair, and demolition permit requirements.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Lead Dust Hazard Assessment: EPA Method Wipe Sampling & Laboratory Analysis</h3>
                  <p>
                    While XRF testing identifies lead-based paint, <strong>dust wipe sampling assesses the actual lead dust hazard</strong> present on surfaces. We follow EPA Method 1005-B for lead in settled dust, using pre-moistened wipes on standardized templates to collect samples from: 1) Floors (particularly in play areas and near windows), 2) Interior window sills and troughs, 3) Window wells and frames, 4) Porches and exterior entryways, and 5) Other horizontal surfaces where dust accumulates. Samples undergo laboratory analysis via inductively coupled plasma mass spectrometry (ICP-MS) for precise lead quantification.
                  </p>
                  <p>
                    Results are compared against Health Canada clearance standards: <strong>40 µg/ft² for floors, 250 µg/ft² for interior window sills, and 400 µg/ft² for window troughs</strong>. Exceeding these levels indicates a lead dust hazard requiring remediation. Our dust assessment helps distinguish between: 1) Intact lead paint (low immediate risk if undisturbed), 2) Deteriorating lead paint generating dust (moderate risk requiring monitoring), and 3) Active lead dust hazards (high risk requiring immediate remediation). This quantitative approach provides objective data for risk prioritization, remediation planning, and post-abatement clearance verification.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Soil Contamination Assessment: Exterior Lead Hazards from Paint Deterioration</h3>
                  <p>
                    <strong>Soil lead contamination</strong> around Toronto homes results from: 1) Exterior paint deterioration depositing lead chips and dust into soil, 2) Historical air pollution from leaded gasoline (though banned since 1990, lead persists in soil), 3) Industrial contamination in certain neighborhoods, and 4) Renovation debris improperly disposed. Soil lead represents a particular hazard for: 1) Children playing in contaminated soil, 2) Gardeners growing vegetables in lead-contaminated soil, and 3) Track-in of contaminated soil into homes.
                  </p>
                  <p>
                    Our soil assessment includes: 1) Sampling from drip lines (soil directly beneath exterior painted surfaces), 2) Play area sampling (where children have direct soil contact), 3) Garden bed sampling (for food safety assessment), and 4) Entryway sampling (for track-in risk assessment). Soil samples undergo laboratory analysis with results compared against Health Canada residential soil guidelines (140 mg/kg for play areas, 260 mg/kg for other residential areas). For elevated levels, we recommend: soil removal and replacement, barrier installation (landscape fabric and clean soil/grass), restricting access to contaminated areas, and thorough cleaning practices to prevent track-in.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Ontario Regulation 278/05 Compliance: Legal Requirements for Renovations</h3>
                  <p>
                    <strong>Ontario Regulation 278/05 (Designated Substance - Lead)</strong> establishes legal requirements for work involving lead-based paint in pre-1990 buildings. Key requirements include: 1) Mandatory testing before any renovation, repair, or demolition that may disturb painted surfaces, 2) Worker protection measures including training, personal protective equipment, and exposure monitoring, 3) Engineering controls (containment, HEPA filtration, wet methods), 4) Proper cleanup and waste disposal as hazardous material, and 5) Documentation and record-keeping for Ministry of Labour inspections.
                  </p>
                  <p>
                    Our inspection services provide the legally compliant documentation needed for: 1) Municipal permit applications for renovation projects, 2) Contractor work plans and safety procedures, 3) Worker notification and training, 4) Waste disposal manifests, and 5) Post-project verification. Failure to comply can result in: Ministry of Labour fines up to $500,000 per violation, project shutdowns, worker compensation claims, and personal liability for property owners and contractors. Our reports include specific work practice recommendations tailored to the identified lead hazards and planned work scope, helping ensure regulatory compliance while protecting workers and occupants.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Child-Focused Risk Assessment: Protecting Developing Brains from Lead Neurotoxicity</h3>
                  <p>
                    <strong>Children under six are particularly vulnerable to lead poisoning</strong> due to: 1) Higher absorption rates (40-50% of ingested lead absorbed vs. 10-15% in adults), 2) Developing neurological systems more susceptible to damage, 3) Hand-to-mouth behavior increasing exposure, 4) Playing on floors and at windows where lead dust accumulates, and 5) Lower body weight resulting in higher dose per pound. The effects are permanent and irreversible: each 10 µg/dL increase in blood lead level reduces IQ by 4-7 points, with no threshold for safe exposure.
                  </p>
                  <p>
                    Our child-focused assessment includes: 1) Testing all child-occupied rooms (bedrooms, playrooms, family rooms), 2) Sampling floors at child height (crawl spaces, play areas), 3) Assessing chewable surfaces (window sills, railings, furniture), 4) Evaluating soil in play areas, and 5) Considering behavioral factors (hand-to-mouth activity, toy mouthing). We provide specific recommendations for families with children: more frequent cleaning protocols, temporary relocation during renovations, nutritional strategies to reduce lead absorption (calcium, iron, vitamin C rich diets), and blood lead level monitoring recommendations. For childcare facilities, schools, and other child-occupied buildings, we develop comprehensive lead management plans meeting licensing requirements.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Real Estate Transaction Lead Assessment: Pre-Purchase Due Diligence</h3>
                  <p>
                    <strong>Lead paint testing has become essential due diligence for pre-1990 property purchases</strong> in Toronto's real estate market. Discovery of lead hazards after purchase can deray renovation plans, create unexpected costs ($5,000-$30,000+ for abatement), affect property value, and pose health risks for families with children. Our pre-purchase lead assessments provide buyers with: 1) Identification of lead hazards before purchase, 2) Realistic abatement cost estimates for negotiation, 3) Documentation for mortgage lender requirements (some require lead assessment for pre-1978 properties), and 4) Planning data for future renovations or family protection measures.
                  </p>
                  <p>
                    Common negotiation outcomes based on our assessments include: 1) Seller completes lead abatement before closing (ideal for deteriorated paint or high dust levels), 2) Price reduction equivalent to abatement costs (common for intact paint requiring future attention), 3) Escrow holdback for post-closing abatement (for planned renovations), or 4) In properties with extensive hazards and young children, buyer withdrawal from transaction. We provide consultation to help interpret findings in specific transaction contexts and can provide referrals to licensed lead abatement contractors for cost estimates during due diligence periods.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Remediation Planning & Contractor Oversight: Ensuring Safe Lead Abatement</h3>
                  <p>
                    When lead hazards are identified, proper remediation planning is critical. We provide: 1) <strong>Risk-based prioritization</strong> addressing immediate hazards first (deteriorated paint, high dust levels, child-occupied areas), 2) <strong>Method selection guidance</strong> (removal vs. encapsulation vs. enclosure based on surface condition, location, and budget), 3) <strong>Contractor selection criteria</strong> and referrals to EPA RRP-certified lead abatement companies, 4) <strong>Project oversight</strong> to ensure Ontario Regulation 278/05 compliance, and 5) <strong>Post-abatement clearance testing</strong> to verify safe reoccupancy.
                  </p>
                  <p>
                    Our oversight services include: review of contractor work plans, periodic site inspections during abatement, verification of containment integrity and HEPA filtration, monitoring of personal protective equipment use, waste disposal documentation review, and final clearance testing using dust wipe sampling. This independent oversight ensures abatement meets regulatory requirements and provides documented verification for insurance, future property transactions, and regulatory compliance. Never rely solely on abatement contractors for testing and clearance—independent verification protects all parties and provides legally defensible documentation of proper hazard reduction.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Lead Paint: Comprehensive Hazardous Materials Assessment</h3>
                  <p>
                    Properties requiring lead paint assessment often benefit from comprehensive hazardous materials testing. Consider integrating lead testing with <Link to="/services/asbestos-testing" className="text-primary hover:underline">asbestos assessment</Link> for pre-1990 properties, <Link to="/services/mold-inspection" className="text-primary hover:underline">mold evaluation</Link> for moisture-damaged areas, or <Link to="/services/air-quality" className="text-primary hover:underline">indoor air quality testing</Link> for comprehensive environmental assessment. During pre-purchase inspections, combine lead assessment with <Link to="/services/pre-purchase" className="text-primary hover:underline">complete home inspection</Link> for comprehensive property evaluation.
                  </p>
                  <p>
                    We coordinate these complementary services to provide holistic hazardous materials assessment. Bundling services often provides cost savings and ensures all environmental hazards are identified and addressed in an integrated manner, particularly important for renovation planning, property transactions, and ongoing building management in Toronto's older housing stock.
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
                  Lead Paint Testing FAQ
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
                    Why Choose ASADS for Lead Testing?
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
                      <Link to="/booking">Schedule Lead Testing</Link>
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
              We provide lead paint testing services across the Greater Toronto Area
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
              Protect Your Family from Permanent Neurological Damage
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Lead poisoning causes irreversible IQ loss, learning disabilities, and behavioral problems in children. Professional testing identifies hazards before they cause damage, providing the information needed for safe renovations and family protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Lead Test</Link>
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
