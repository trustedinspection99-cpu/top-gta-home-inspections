import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  AlertTriangle, 
  Microscope, 
  ShieldCheck, 
  Factory, 
  HardHat, 
  ClipboardList,
  Phone, 
  Calendar,
  Clock,
  FileText,
  Home,
  Search,
  Zap,
  Thermometer,
  Droplets,
  Video,
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
  Heart,
  EyeOff,
  Camera,
  Flame,
  Snowflake,
  Wifi,
  Shield,
  Building2,
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
  Leaf,
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
  ShieldAlert,
  AlertCircle,
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
  BookOpenIcon
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

const title = "Asbestos Testing & Analysis";
const metaTitle = "Asbestos Testing Toronto | WSIB Certified & O.Reg 278/05 Compliance | ASADS";
const metaDescription = "WSIB certified asbestos testing in Toronto & GTA. O.Reg 278/05 compliant sampling for pre-1990 homes, renovations, and demolition. Safe wet-sampling and accredited lab analysis for popcorn ceilings, insulation, and pipe wrap.";
const price = "$299-$599";
const duration = "1-2 Hours + 24-48 Hour Lab Analysis";

const whatWeInspect = [
  "Vermiculite Attic Insulation (Zonolite) – assess friable asbestos-containing insulation common in pre-1990 homes",
  "Popcorn & Stipple Ceilings – test acoustic ceiling textures containing chrysotile asbestos for demolition or renovation",
  "Basement Pipe Wrap & Duct Tape Insulation – evaluate thermal insulation on heating pipes and HVAC ductwork",
  "Vinyl Floor Tiles (9x9 & 12x12) – analyze asbestos content in flooring materials and associated mastic adhesives",
  "Drywall Joint Compound & Texture – test wallboard finishing compounds used in pre-1990 construction",
  "Plaster & Lathe Wall Systems – assess plaster walls and ceilings in heritage and mid-century buildings",
  "Exterior Stucco & Siding Materials – evaluate asbestos content in cementitious exterior finishes",
  "Roofing Shingles & Felt Underlayment – test roofing materials from pre-1990 installations",
  "Electrical Wiring Insulation & Components – assess asbestos-containing electrical insulation and breaker panels",
  "Furnace & Boiler Gaskets – test heat-resistant gaskets and insulation in heating systems",
  "Transite Board & Asbestos Cement Pipe – evaluate asbestos-cement building materials and plumbing pipes",
  "Fireproofing Sprays & Insulation – assess structural fireproofing materials in commercial and multi-unit buildings"
];

const features = [
  {
    title: "O.Reg 278/05 Compliant Asbestos Inventory & WSIB Certified Inspection",
    description: "Our WSIB-certified inspectors provide legally compliant asbestos surveys meeting Ontario Regulation 278/05 requirements for renovation, demolition, and workplace safety. We deliver comprehensive asbestos inventories identifying all suspect materials, their locations, conditions, and asbestos content percentages. These legally defensible reports satisfy municipal permit requirements, protect against WSIB fines up to $500,000, and provide documentation for workplace safety compliance under the Occupational Health and Safety Act."
  },
  {
    title: "Safe Wet-Sampling Protocols & HEPA-Contained Collection Methods",
    description: "We employ strict wet-sampling techniques using amended water sprays to suppress fiber release during collection, combined with HEPA-filtered negative air containment for friable materials. Our inspectors use personal protective equipment (PPE) including P100 respirators, disposable coveralls, and decontamination protocols. Sample collection follows CEPA 1999 guidelines and CSA Z797-18 standards, ensuring zero fiber release into occupied spaces. This meticulous approach protects occupants during testing and provides accurate laboratory samples without cross-contamination."
  },
  {
    title: "Accredited Laboratory Analysis with PLM & TEM Methodologies",
    description: "All samples undergo analysis at AIHA-accredited laboratories using Polarized Light Microscopy (PLM) for bulk material identification and Transmission Electron Microscopy (TEM) for air monitoring and fine fiber analysis. We test for all six regulated asbestos types: chrysotile (white), amosite (brown), crocidolite (blue), tremolite, actinolite, and anthophyllite. Laboratory reports include asbestos type identification, percentage composition, and method detection limits, providing legally defensible data for regulatory compliance, insurance claims, and abatement planning."
  },
  {
    title: "Priority Laboratory Turnaround & Emergency Same-Day Inspection Service",
    description: "We offer flexible turnaround options: standard 48-72 hour laboratory results for routine inspections, 24-hour rush service for urgent real estate transactions, and same-day emergency inspections for immediate renovation or demolition needs. Our same-day service across the GTA includes rapid sample collection, expedited laboratory courier delivery, and preliminary verbal results within hours. This flexibility accommodates tight construction timelines, urgent pre-purchase due diligence, and emergency situations requiring immediate asbestos assessment."
  }
];

const benefits = [
  "WSIB-certified inspectors with specialized training in asbestos identification and safe sampling protocols",
  "O.Reg 278/05 compliant asbestos inventory reports for municipal permits and regulatory compliance",
  "Safe wet-sampling techniques preventing fiber release and protecting building occupants during testing",
  "AIHA-accredited laboratory analysis using PLM and TEM methodologies for definitive asbestos identification",
  "Priority laboratory turnaround options (24-hour rush available) for urgent real estate or renovation timelines",
  "Comprehensive asbestos management plans with risk assessments and abatement recommendations",
  "Legally defensible documentation for insurance claims, property transactions, and workplace safety compliance",
  "Same-day emergency inspection service across the GTA for immediate renovation or demolition needs",
  "Consultation on abatement contractor selection and oversight of remediation projects",
  "Post-abatement clearance testing and air monitoring to verify safe reoccupancy",
  "Historical building material databases for Toronto's pre-1990 residential and commercial properties",
  "Protection against mesothelioma and other asbestos-related disease risks for occupants and workers"
];

const faqs = [
  {
    question: "When is asbestos testing legally required in Ontario, and what regulations apply?",
    answer: "Asbestos testing is legally required under Ontario Regulation 278/05 (Designated Substance - Asbestos) before any renovation, repair, or demolition of buildings constructed before 1990. Key requirements: 1) Mandatory asbestos survey identifying all suspect materials before work begins, 2) Worker training and notification requirements under the Occupational Health and Safety Act, 3) Specific sampling, analysis, and reporting standards, 4) Municipal permit compliance for renovations and demolitions, and 5) WSIB reporting requirements for workplace exposure incidents. Additional regulations include the Canadian Environmental Protection Act (CEPA 1999) for hazardous materials management and local municipal bylaws in Toronto, Mississauga, and other GTA municipalities. Non-compliance can result in WSIB fines up to $500,000 per violation, project shutdowns, and personal liability for building owners and contractors."
  },
  {
    question: "What is the difference between friable and non-friable asbestos, and how does it affect testing and abatement?",
    answer: "Friable asbestos materials can be crumbled, pulverized, or reduced to powder by hand pressure when dry, presenting immediate inhalation hazards. Common friable materials include: vermiculite insulation, acoustic ceiling textures, pipe insulation, and fireproofing sprays. Non-friable (also called bonded) asbestos materials have asbestos fibers embedded in a matrix (like vinyl tiles, cement sheets, or roofing materials) and only become hazardous when sanded, cut, or aggressively disturbed. Testing protocols differ: friable materials require wet-sampling with HEPA containment to prevent fiber release, while non-friable materials may be sampled with less restrictive methods. Abatement requirements also differ significantly: friable asbestos removal requires full containment with negative air pressure, specialized PPE, and air monitoring, while non-friable removal may use less stringent controls. Our inspectors assess material condition and friability to determine appropriate sampling methods and provide accurate risk assessments for safe handling."
  },
  {
    question: "What are the most common asbestos-containing materials found in Toronto homes and buildings?",
    answer: "Common asbestos-containing materials in Toronto properties include: 1) Vermiculite attic insulation (Zonolite brand, pre-1990) – found in approximately 30% of pre-1990 homes, 2) Popcorn/stipple ceilings (pre-1990) – contains chrysotile asbestos in texture compound, 3) Vinyl floor tiles (9\"x9\" and 12\"x12\" pre-1980) – asbestos in tiles and black mastic adhesive, 4) Pipe and duct insulation (pre-1990) – asbestos wrap and tape on heating pipes, 5) Drywall joint compound (pre-1990) – asbestos in taping and finishing compounds, 6) Plaster walls and ceilings (pre-1978) – asbestos in texture and reinforcing fibers, 7) Roofing materials (pre-1990) – asbestos cement shingles and felt underlayment, 8) Exterior stucco (pre-1990) – asbestos in cementitious coatings, 9) Electrical components (pre-1980) – asbestos in wiring insulation and breaker panels, 10) Heating system gaskets (pre-1990) – asbestos in furnace and boiler seals. Toronto's building boom from 1950s-1980s coincides with peak asbestos use, making testing essential for any renovation or demolition in properties from this era."
  },
  {
    question: "How accurate are asbestos test results, and what do PLM and TEM laboratory methods detect?",
    answer: "Accredited laboratory testing provides highly accurate asbestos identification when proper sampling protocols are followed. Polarized Light Microscopy (PLM) identifies asbestos in bulk materials with detection limits of 0.25-1% by weight, sufficient for most regulatory requirements. Transmission Electron Microscopy (TEM) provides higher sensitivity (detection to 0.0001% by weight) and positive identification of individual fiber types, required for air monitoring and certain regulatory applications. PLM analysis identifies the six regulated asbestos types (chrysotile, amosite, crocidolite, tremolite, actinolite, anthophyllite) and provides percentage composition. TEM analysis additionally identifies fiber dimensions and morphology critical for health risk assessment. Our AIHA-accredited laboratories participate in proficiency testing programs, ensuring consistent accuracy. False negatives can occur with inadequate sampling (missing asbestos-containing layers) or improper sample preparation, which we prevent through certified inspector training and strict protocol adherence."
  },
  {
    question: "What should I do if asbestos is found in my home during testing?",
    answer: "If asbestos is detected: 1) Do not disturb the material – intact, undisturbed asbestos often poses minimal risk, 2) Review the laboratory report for asbestos type, percentage, and material condition, 3) For friable materials in poor condition or planned renovation areas, plan professional abatement, 4) For non-friable materials in good condition with no planned disturbance, consider management-in-place with warning labels and periodic monitoring, 5) Obtain quotes from licensed asbestos abatement contractors (we provide referrals to reputable companies), 6) Ensure contractors follow O.Reg 278/05 requirements including containment, negative air, proper disposal, and clearance testing, 7) For real estate transactions, negotiate abatement costs with sellers or arrange post-closing remediation with proper disclosures. We provide comprehensive abatement recommendations including: risk assessment, contractor selection criteria, oversight protocols, and post-abatement verification testing. Never attempt DIY asbestos removal – improper handling creates significant health risks and regulatory violations."
  },
  {
    question: "What is vermiculite attic insulation (Zonolite), and why is it particularly hazardous?",
    answer: "Vermiculite attic insulation, commonly sold as Zonolite brand until 1990, is a lightweight, pebble-like insulation poured between attic joists. A significant portion originated from a Montana mine contaminated with tremolite asbestos. Hazards include: 1) Highly friable material releasing fibers when disturbed, 2) Difficult to contain during removal due to small particle size, 3) Often contaminated with 1-3% asbestos by weight, 4) Fibers can migrate through ceiling penetrations into living spaces, 5) Homeowners often unknowingly disturb it during storage or maintenance activities. Testing requires specialized protocols: we use HEPA vacuum attachments and wet-sampling techniques to prevent fiber release. If positive, we recommend: 1) Professional abatement by licensed contractors, 2) Air monitoring during and after removal, 3) Complete attic cleaning post-removal, and 4) Consideration of the Zonolite Trust reimbursement program (available for certain installations). Never enter attics with vermiculite insulation without proper testing and protection."
  },
  {
    question: "How much does professional asbestos testing cost in Toronto, and what factors affect pricing?",
    answer: "Professional asbestos testing in Toronto typically ranges from $299 for basic sampling (3-5 samples) to $599+ for comprehensive surveys (10-15+ samples). Factors affecting cost: 1) Number of samples collected (laboratory fees per sample $40-$100), 2) Property size and number of suspect materials, 3) Sampling complexity (accessible materials vs. difficult-to-reach areas), 4) Urgency of results (standard 48-72 hours vs. 24-hour rush), 5) Property type (residential vs. commercial/industrial), 6) Additional services (asbestos inventory reports, risk assessments, abatement oversight), and 7) Travel distance within GTA. Our standard residential inspection includes: site assessment, 5-8 samples, wet-sampling protocols, laboratory analysis, and comprehensive report. Commercial/industrial surveys are priced based on square footage and complexity. Contact us at (647) 801-9311 for a customized quote based on your specific property and needs."
  },
  {
    question: "What are the health risks of asbestos exposure, and how do they relate to testing and abatement decisions?",
    answer: "Asbestos exposure causes serious diseases with latency periods of 10-50 years: 1) Mesothelioma – rare cancer of lung/abdominal lining, almost exclusively caused by asbestos, 2) Lung cancer – increased risk especially with smoking, 3) Asbestosis – progressive scarring of lung tissue, and 4) Pleural plaques/thickening – non-cancerous lung lining changes. Risk factors include: exposure duration and intensity, asbestos type (amphiboles like crocidolite are more hazardous than chrysotile), fiber dimensions (long, thin fibers penetrate deeper), and individual susceptibility. Testing informs risk assessment by identifying: asbestos presence, type, percentage, material condition, and friability. Abatement decisions balance: material condition (damaged friable materials pose immediate risk), planned disturbance (renovations require removal), occupancy (children and elderly more vulnerable), and cost-benefit analysis. We provide health risk assessments with our reports, helping prioritize abatement based on actual risk rather than fear. Even low-level exposure during improper DIY renovations can cause future disease, making professional testing essential before any disturbance of pre-1990 building materials."
  }
];

const relatedServices = [
  { 
    title: "Lead Paint Testing", 
    href: "/services/lead-paint-testing",
    description: "Professional lead paint assessment for pre-1978 homes, particularly important for properties with children."
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Comprehensive mold assessment and moisture investigation for indoor air quality concerns."
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Air quality testing for radon gas, particularly relevant for homes with basements or crawl spaces."
  },
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete property assessment including hazardous materials evaluation for older homes."
  },
];

export default function AsbestosTesting() {
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
    "serviceType": "Asbestos Testing",
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
    "description": "WSIB certified asbestos testing in Toronto and GTA. O.Reg 278/05 compliant sampling and AIHA accredited laboratory analysis for pre-1990 homes and buildings. Safe wet-sampling protocols.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Hazardous Materials Testing",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Asbestos Testing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Asbestos Testing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comprehensive Asbestos Survey"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Same-Day Asbestos Inspection"
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
        "name": "Asbestos Testing & Analysis",
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
    "description": "ASADS Home Inspection provides WSIB certified asbestos testing, hazardous materials assessment, and environmental testing services across Ontario. O.Reg 278/05 compliant inspections."
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
      "serviceType": "Asbestos Testing"
    },
    "specialty": "Hazardous Materials Testing",
    "about": {
      "@type": "Thing",
      "name": "Asbestos Testing",
      "description": "Professional asbestos identification and risk assessment for building materials"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Asbestos Testing Services",
    "image": `${SITE_URL}/images/services/asbestos-testing.jpg`,
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
          "name": "Homeowner in Etobicoke"
        },
        "datePublished": "2025-01-18",
        "reviewBody": "Before renovating our 1960s bungalow, ASADS conducted asbestos testing and found chrysotile in the popcorn ceilings and pipe insulation. Their safe wet-sampling prevented any fiber release, and the detailed report helped us get proper permits and select a qualified abatement contractor. The post-abatement clearance testing gave us peace of mind that our home was safe for our family.",
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
          "name": "Property Developer in Toronto"
        },
        "datePublished": "2025-02-08",
        "reviewBody": "We use ASADS for all our pre-demolition asbestos surveys on commercial properties. Their WSIB-certified inspectors provide O.Reg 278/05 compliant reports that satisfy municipal permit requirements. Their emergency same-day service has saved us multiple times when last-minute issues arose before demolition deadlines. Professional, thorough, and reliable.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Asbestos Testing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Residential Asbestos Testing",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard Asbestos Inspection",
                "description": "Testing of 5-8 suspect materials with wet-sampling and PLM laboratory analysis"
              },
              "price": "299",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Comprehensive Asbestos Survey",
                "description": "Full asbestos inventory with 10-15+ samples, risk assessment, and abatement recommendations"
              },
              "price": "499",
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
                "name": "Emergency Same-Day Inspection",
                "description": "Urgent asbestos testing with 24-hour laboratory turnaround for renovation deadlines"
              },
              "price": "599",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial Asbestos Survey",
                "description": "Large-scale asbestos inventory for commercial, industrial, or multi-unit properties"
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
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  WSIB Certified Hazardous Materials Testing
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Asbestos Testing & Analysis
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Protect your family and comply with Ontario Regulation 278/05. Safe asbestos sampling for pre-1990 homes, renovations, and demolition projects. WSIB certified inspectors.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>O.Reg 278/05 Compliant Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>WSIB Certified Inspectors</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Asbestos Testing
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
              <span>WSIB Certified • O.Reg 278/05 Compliant • AIHA Accredited Labs • Safe Wet-Sampling</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Asbestos Testing</Link>
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
                  O.Reg 278/05 Compliant Asbestos Assessment for Toronto's Pre-1990 Buildings
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    <strong>Asbestos exposure represents one of Ontario's most significant occupational and residential health hazards</strong>, directly linked to mesothelioma, lung cancer, and asbestosis. Under Ontario Regulation 278/05, asbestos testing is legally mandatory before any renovation, repair, or demolition of buildings constructed before 1990. Our WSIB-certified inspectors provide comprehensive asbestos assessments meeting all regulatory requirements, protecting property owners from substantial fines (up to $500,000 per violation) and safeguarding occupants from life-threatening exposure risks.
                  </p>
                  <p>
                    Toronto's building boom from the 1950s through the 1980s coincided with peak asbestos use in construction materials. Approximately <strong>30% of pre-1990 Toronto homes contain asbestos in some form</strong>—most commonly in vermiculite attic insulation (Zonolite), popcorn ceilings, vinyl floor tiles, pipe insulation, and drywall compounds. Our safe wet-sampling protocols and HEPA containment methods prevent fiber release during testing, while AIHA-accredited laboratory analysis provides definitive identification of all six regulated asbestos types. We deliver legally defensible asbestos inventory reports that satisfy municipal permit requirements, protect against WSIB penalties, and provide the documentation needed for informed abatement decisions.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl my-6">
                    <h4 className="text-red-900 font-bold flex items-center gap-2 mb-2">
                      <ShieldCheck className="text-red-600" size={20} />
                      Critical Legal Compliance Alert: Ontario Regulation 278/05
                    </h4>
                    <p className="text-red-800">
                      Under <strong>Ontario Regulation 278/05 (Designated Substance - Asbestos)</strong>, testing for asbestos is mandatory before any renovation, demolition, or repair of buildings constructed before 1990. Failure to comply can lead to WSIB fines up to $500,000, project shutdowns, municipal permit denials, and personal liability for building owners and contractors. Our WSIB-certified inspectors provide legally compliant asbestos surveys meeting all regulatory requirements for residential, commercial, and industrial properties across Ontario.
                    </p>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Vermiculite Attic Insulation (Zonolite): Toronto's Most Prevalent Asbestos Hazard</h3>
                  <p>
                    <strong>Vermiculite attic insulation, commonly sold as Zonolite until 1990</strong>, represents one of Toronto's most widespread and hazardous asbestos-containing materials. A significant portion originated from a Montana mine contaminated with tremolite asbestos, resulting in insulation containing 1-3% asbestos by weight. This highly friable material releases dangerous fibers when disturbed during attic access, maintenance, or removal. Approximately 30% of pre-1990 Toronto homes contain vermiculite insulation, often unbeknownst to homeowners.
                  </p>
                  <p>
                    Our specialized vermiculite testing protocols include: 1) HEPA vacuum attachments to prevent fiber release during sampling, 2) Wet-sampling techniques using amended water to suppress dust, 3) Multiple samples from different attic areas to ensure representative testing, and 4) Laboratory analysis using both PLM and TEM methods for definitive identification. If positive, we provide guidance on the Zonolite Trust reimbursement program (available for certain installations) and referrals to licensed abatement contractors experienced in vermiculite removal. Never enter attics with vermiculite insulation without proper testing and personal protective equipment—disturbance releases fibers that can migrate into living spaces through ceiling penetrations.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Popcorn & Stipple Ceilings: Renovation Risks in Mid-Century Homes</h3>
                  <p>
                    <strong>Popcorn (acoustic) ceilings installed before 1990 frequently contain chrysotile asbestos</strong> in the texture material, typically comprising 1-10% asbestos by weight. Common in Toronto's mid-century bungalows, townhouses, and apartment buildings, these ceilings become hazardous during scraping, sanding, or demolition for renovation projects. The fine dust created during disturbance readily becomes airborne, posing significant inhalation risks to occupants and workers.
                  </p>
                  <p>
                    Our ceiling testing protocols include: 1) Wet-sampling techniques that saturate the material before collection, preventing fiber release, 2) Sampling from multiple locations to account for batch variations, 3) Assessment of ceiling condition and accessibility for abatement planning, and 4) Air monitoring recommendations based on planned work scope. For positive results, we provide abatement recommendations ranging from complete removal to encapsulation, depending on ceiling condition, renovation plans, and budget considerations. We also coordinate with qualified abatement contractors to ensure safe removal following O.Reg 278/05 requirements, including proper containment, negative air pressure, and post-abatement clearance testing.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Microscope className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">AIHA Accredited Labs</h4>
                      <p className="text-xs text-muted-foreground">PLM and TEM laboratory analysis for definitive asbestos identification and quantification.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Factory className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Pre-1990 Focus</h4>
                      <p className="text-xs text-muted-foreground">Specialized protocols for Toronto's century homes, mid-century bungalows, and heritage properties.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <HardHat className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Safe Wet-Sampling</h4>
                      <p className="text-xs text-muted-foreground">HEPA containment and wet-sampling techniques prevent fiber release during collection.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Vinyl Floor Tiles & Mastic Adhesives: Hidden Hazards Under Flooring</h3>
                  <p>
                    <strong>9\"x9\" and 12\"x12\" vinyl floor tiles installed before 1980 frequently contain asbestos</strong>, typically 1-5% by weight, with black mastic adhesives containing even higher percentages (5-25%). These non-friable materials become hazardous when sanded during floor preparation or removed during renovations. Tile breaking creates dust containing asbestos fibers, while heat guns used for adhesive removal can vaporize asbestos components, creating inhalation hazards.
                  </p>
                  <p>
                    Our flooring assessment includes: 1) Sampling both tiles and underlying adhesive, 2) Assessment of installation method and condition, 3) Recommendations for removal versus encapsulation, and 4) Coordination with flooring contractors for safe removal procedures. For positive results, we provide specific guidance on: wet removal techniques to suppress dust, proper personal protective equipment for workers, disposal requirements for asbestos-containing flooring, and post-removal cleaning protocols. In some cases, encapsulation with new flooring may be preferable to removal, particularly when tiles are in good condition and adequately bonded to subfloor.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Pipe & Duct Insulation: Heating System Hazards in Basements</h3>
                  <p>
                    <strong>Asbestos-containing pipe wrap and duct insulation</strong> were standard in pre-1990 heating systems for thermal protection. Commonly found in Toronto home basements, these friable materials deteriorate over time, releasing fibers into air circulation systems. Disturbance during plumbing repairs, HVAC upgrades, or basement renovations poses significant exposure risks, as damaged insulation readily releases airborne fibers.
                  </p>
                  <p>
                    Our pipe and duct assessment includes: 1) Visual inspection of insulation condition and integrity, 2) Wet-sampling of both wrap materials and underlying tape, 3) Assessment of accessibility for abatement, and 4) Air monitoring recommendations if disturbance is planned. For positive results with damaged insulation, we recommend immediate abatement to prevent ongoing fiber release. For intact insulation in inaccessible areas, management-in-place with warning labels and periodic monitoring may be appropriate until renovation necessitates removal.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Drywall Joint Compound & Texture: Wall System Hazards</h3>
                  <p>
                    <strong>Asbestos was added to drywall joint compounds (\"mud\") and texture materials</strong> from the 1940s through the 1970s to improve workability and fire resistance. Sanding during drywall repair or demolition creates fine dust containing asbestos fibers that remain airborne for extended periods. This represents a particular hazard during whole-house renovations or room additions in pre-1990 homes.
                  </p>
                  <p>
                    Our wall system testing includes: 1) Sampling from multiple wall areas to account for compound batch variations, 2) Assessment of wall condition and planned disturbance, 3) Recommendations for containment during work, and 4) Air monitoring protocols for renovation projects. For positive results, we provide specific guidance on: wet sanding techniques, HEPA vacuum attachment requirements, worker respiratory protection, and post-work cleaning procedures. In some cases, complete drywall removal may be more appropriate than attempting to work around asbestos-containing compounds.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Commercial & Industrial Asbestos Surveys: Regulatory Compliance for Businesses</h3>
                  <p>
                    <strong>Commercial, industrial, and multi-unit residential properties</strong> face stringent asbestos management requirements under O.Reg 278/05 and the Occupational Health and Safety Act. Regular asbestos surveys are required for building ownership transfers, tenant improvements, and ongoing maintenance programs. Commercial properties often contain additional asbestos materials not found in residences: fireproofing sprays on structural steel, asbestos-cement transite panels, laboratory countertops, and industrial equipment insulation.
                  </p>
                  <p>
                    Our commercial asbestos services include: 1) Comprehensive asbestos inventories meeting O.Reg 278/05 requirements, 2) Risk assessments and management plans for ongoing compliance, 3) Air monitoring during and after abatement projects, 4) Worker training and notification documentation, and 5) Coordination with abatement contractors and regulatory agencies. We maintain databases of Toronto commercial building materials, helping identify likely asbestos locations based on construction era and building type. This systematic approach ensures regulatory compliance while minimizing testing costs through targeted sampling based on material probabilities.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Real Estate Transaction Asbestos Assessment: Pre-Purchase Due Diligence</h3>
                  <p>
                    <strong>Asbestos testing has become essential due diligence for pre-1990 property purchases</strong> in Toronto's real estate market. Discovery of asbestos-containing materials after purchase can deray renovation plans, create unexpected costs ($5,000-$50,000+ for abatement), and affect property value. Our pre-purchase asbestos assessments provide buyers with: 1) Identification of asbestos hazards before purchase, 2) Realistic abatement cost estimates for negotiation, 3) Documentation for mortgage lender requirements, and 4) Planning data for future renovations.
                  </p>
                  <p>
                    Common negotiation outcomes based on our assessments include: 1) Seller completes abatement before closing (ideal for friable materials), 2) Price reduction equivalent to abatement costs (common for non-friable materials), 3) Escrow holdback for post-closing abatement (for materials not immediately hazardous), or 4) In extreme cases with extensive contamination, buyer withdrawal from transaction. We provide consultation to help interpret findings in specific transaction contexts and can provide referrals to qualified abatement contractors for cost estimates during due diligence periods.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Abatement Planning & Contractor Oversight: Ensuring Safe Remediation</h3>
                  <p>
                    When asbestos is identified, proper abatement planning is critical for safe remediation. We provide: 1) <strong>Risk assessments</strong> prioritizing materials based on condition, friability, and location, 2) <strong>Abatement method recommendations</strong> (removal vs. encapsulation vs. enclosure), 3) <strong>Contractor selection criteria</strong> and referrals to licensed abatement companies, 4) <strong>Project oversight</strong> to ensure O.Reg 278/05 compliance, and 5) <strong>Post-abatement clearance testing</strong> and air monitoring to verify safe reoccupancy.
                  </p>
                  <p>
                    Our oversight services include: review of contractor work plans, periodic site inspections during abatement, verification of containment integrity and negative air pressure, monitoring of personal protective equipment use, and final clearance testing using TEM air analysis. This independent oversight ensures abatement meets regulatory requirements and provides documented verification for insurance, future property transactions, and regulatory compliance. Never rely solely on abatement contractors for testing and clearance—independent verification protects all parties and provides legally defensible documentation.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Asbestos: Comprehensive Hazardous Materials Assessment</h3>
                  <p>
                    Properties requiring asbestos assessment often benefit from comprehensive hazardous materials testing. Consider integrating asbestos testing with <Link to="/services/lead-paint-testing" className="text-primary hover:underline">lead paint assessment</Link> for pre-1978 properties, <Link to="/services/mold-inspection" className="text-primary hover:underline">mold evaluation</Link> for moisture-damaged areas, or <Link to="/services/radon-testing" className="text-primary hover:underline">radon testing</Link> for basement areas. During pre-purchase inspections, combine asbestos assessment with <Link to="/services/pre-purchase" className="text-primary hover:underline">complete home inspection</Link> for comprehensive property evaluation.
                  </p>
                  <p>
                    We coordinate these complementary services to provide holistic hazardous materials assessment. Bundling services often provides cost savings and ensures all environmental hazards are identified and addressed in an integrated manner, particularly important for renovation planning, property transactions, and ongoing building management.
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
                  Asbestos Testing FAQ
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
                    Why Choose ASADS for Asbestos Testing?
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
                      <Link to="/booking">Schedule Asbestos Testing</Link>
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
              We provide asbestos testing services across the Greater Toronto Area
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
              Don't Risk Asbestos Exposure During Renovations or Purchases
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Asbestos-related diseases have latency periods of 10-50 years, making today's exposure tomorrow's diagnosis. Professional testing provides the protection and compliance you need for safe renovations and informed property decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Asbestos Test</Link>
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
