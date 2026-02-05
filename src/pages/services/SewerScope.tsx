import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Video, 
  Search, 
  Map, 
  AlertCircle, 
  ShieldCheck, 
  Clock,
  Phone, 
  Calendar,
  FileText,
  Home,
  Zap,
  Thermometer,
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
  AlertTriangle,
  CheckCircle
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

const title = "Sewer Camera Inspection";
const metaTitle = "Sewer Camera Inspection Toronto | HD Drain Scope & Pipe Assessment | ASADS";
const metaDescription = "Professional CCTV sewer camera inspections in Toronto and GTA. Detect root intrusion, bellied pipes, cracks, and Orangeburg piping with 1080p HD video. Same-day reports for real estate negotiations.";
const price = "$299-$499";
const duration = "1-2 Hours";

const whatWeInspect = [
  "Structural Integrity of Pipe Walls – assess cracks, fractures, holes, and deterioration in all pipe materials",
  "Tree Root Intrusion Points – identify root penetration locations and severity for targeted remediation planning",
  "Bellied Pipes & Low Spot Sedimentation – detect sagging sections causing chronic backups and standing water accumulation",
  "Offset or Separated Pipe Joints – locate misaligned connections allowing soil infiltration and potential collapse",
  "Corrosion & Scale Buildup in Cast Iron Lines – evaluate metal pipe deterioration and mineral deposit accumulation",
  "Orangeburg Bituminized Fiber Pipe Condition – assess this problematic 1950s-1970s piping material known for collapse",
  "Grease, Debris & Obstruction Buildup – identify accumulation points causing flow restriction and blockage risks",
  "Proximity to Municipal Main Connection – verify proper connection and distance to city sewer infrastructure",
  "Cleanout Accessibility & Condition – evaluate access point functionality for maintenance and future inspections",
  "Pipe Material Transitions & Compatibility – assess connections between different materials (clay to PVC, etc.)",
  "Previous Patch & Liner Repair Integrity – evaluate existing repair work quality and remaining lifespan",
  "Pipe Slope & Hydraulic Performance – assess proper drainage gradient and identify areas prone to sediment buildup"
];

const features = [
  {
    title: "1080p HD Camera Systems with Self-Leveling Technology & LED Lighting",
    description: "We utilize industrial-grade CCTV camera systems with 1080p high-definition resolution, self-leveling camera heads that maintain proper orientation, and high-intensity LED lighting. This advanced technology provides crystal-clear imaging of pipe interiors, revealing hairline fractures in clay tiles, early corrosion in cast iron, and subtle defects in PVC that standard 720p consumer-grade cameras miss. The self-leveling feature ensures the camera always maintains the correct upright position, providing consistent, interpretable video footage regardless of pipe orientation or bends."
  },
  {
    title: "Sonde & GPS Mapping for Precise Defect Location & Depth Measurement",
    description: "When defects are identified, we deploy radio frequency transmitter sondes that attach to the camera head, allowing precise above-ground location mapping. Our GPS-enabled equipment pinpoints exact defect locations, depths, and distances from property landmarks. This critical information eliminates guesswork for excavation planning, providing contractors with precise coordinates for targeted repairs. The mapping data is integrated into our reports with annotated diagrams showing defect locations relative to property lines, structures, and utilities, saving thousands in unnecessary exploratory digging."
  },
  {
    title: "200-Foot Professional Push-Rod Systems & Municipal Main Reach Capability",
    description: "Our professional systems carry 200 feet of heavy-duty push-rod cable, sufficient to reach the municipal main connection for virtually any residential property in the GTA. Unlike limited-range systems that only inspect partial lines, we routinely assess the entire lateral from house to street, identifying problems at the far end where many failures occur. The industrial push-rod design provides superior control, allowing us to navigate multiple bends, navigate through standing water and debris, and maintain consistent inspection quality throughout the entire pipe length."
  },
  {
    title: "Impartial Third-Party Assessment with No Repair Conflicts of Interest",
    description: "As an independent inspection company with no plumbing repair services, we provide 100% unbiased assessments without the conflict of interest inherent when plumbing companies perform inspections. Our recommendations are based solely on observed conditions, not potential repair revenue. This impartiality ensures you receive honest evaluations of pipe conditions, realistic repair vs. replacement recommendations, and accurate cost estimates without inflated scope recommendations. Our detailed reports provide the objective evidence needed for fair real estate negotiations and informed repair decisions."
  }
];

const benefits = [
  "Negotiate substantial repair credits or seller repairs before closing based on documented video evidence",
  "Avoid unexpected $5,000-$25,000 sewer replacement costs that aren't covered by standard home inspections",
  "Precise GPS mapping of defect locations eliminates guesswork and reduces excavation costs for repairs",
  "Identify tree root intrusion patterns for targeted root treatment without unnecessary pipe replacement",
  "Same-day cloud delivery of narrated HD video and comprehensive condition reports for immediate action",
  "Professional 200-foot reach ensures inspection of entire lateral line to municipal connection, not just partial assessment",
  "Early detection of Orangeburg piping or failing clay tiles allows proactive replacement before catastrophic failure",
  "Documentation of pre-existing conditions prevents false claims of damage after property purchase",
  "Assessment of pipe slope and hydraulic performance identifies chronic drainage issues before backups occur",
  "Verification of previous repairs ensures work was completed properly and identifies remaining problem areas",
  "Peace of mind for older homes in Toronto neighborhoods with aging clay tile and cast iron infrastructure",
  "Support for insurance claims with professionally documented evidence of pipe conditions and failure causes"
];

const faqs = [
  {
    question: "Why isn't sewer scope inspection included in standard home inspections, and how critical is it?",
    answer: "Sewer scope inspections require specialized, expensive CCTV equipment (typically $10,000-$20,000 investment), specific training in pipe defect recognition, and additional time (1-2 hours) beyond standard home inspections. Most home inspectors only verify that drains are currently flowing via visual observation of fixtures, which fails to assess underground pipe conditions. Sewer scope inspections are critically important because: 1) Sewer line replacements are among the most expensive hidden costs in homeownership ($5,000-$25,000+), 2) Standard inspections cannot detect 90% of sewer problems occurring underground, 3) Many municipalities hold homeowners responsible for lateral lines to the municipal main, 4) Sewer backups cause extensive property damage and health hazards, and 5) Insurance often excludes sewer line damage without proper documentation of pre-existing conditions. For properties over 20 years old or with large trees nearby, sewer scoping is arguably more important than many standard inspection components."
  },
  {
    question: "What are the most common sewer line problems found in Toronto and GTA properties, and what do they cost to repair?",
    answer: "Common Toronto sewer line problems include: 1) Tree root intrusion ($1,500-$4,000 for hydro-jetting and root cutting; $8,000-$15,000 if pipe replacement needed) – roots seek moisture and nutrients through pipe joints, 2) Bellied pipes or low spots ($3,000-$7,000 to excavate and replace sagging sections) – caused by ground settling that creates sediment traps, 3) Offset or separated joints ($2,500-$6,000 depending on access) – misalignment from ground movement or improper installation, 4) Orangeburg pipe failure ($8,000-$15,000 for full replacement) – this 1950s-1970s bituminized fiber pipe collapses under soil pressure, 5) Clay tile cracks and fractures ($4,000-$10,000 depending on length) – common in pre-1970s construction, 6) Cast iron corrosion ($5,000-$12,000) – particularly problematic in homes built 1950s-1980s, and 7) Grease and debris buildup ($300-$800 for hydro-jetting). Costs vary based on property location, depth, access challenges, and municipal permit requirements. Early detection through camera inspection allows less invasive, more affordable solutions before complete failures require full excavation and replacement."
  },
  {
    question: "How does the camera inspection process work, and what happens if there's no cleanout access point?",
    answer: "Our sewer camera inspection process: 1) We locate and assess the cleanout access point (preferred) or determine alternative access via toilet removal or roof vent, 2) The high-definition camera head is inserted and advanced through the pipe while recording 1080p video with audio narration, 3) We systematically inspect the entire lateral to the municipal connection, documenting distances, conditions, and any defects, 4) When defects are found, we deploy the sonde transmitter for precise above-ground location mapping, 5) After retrieval, we provide immediate verbal summary of findings, and 6) Within hours, you receive a private cloud link with the narrated HD video, annotated report, and GPS mapping data. If no cleanout exists, we can typically access via: a) Removing a basement toilet (most common alternative), b) Accessing through a roof vent (requires specific equipment), or c) Using an existing cleanout on the municipal side. Alternative access may involve additional time and minimal additional cost, which we discuss before proceeding. In rare cases where no access is possible, we may recommend installing a temporary cleanout for inspection purposes."
  },
  {
    question: "What is Orangeburg pipe, why is it problematic, and how can I identify if my home has it?",
    answer: "Orangeburg pipe (also called 'bituminized fiber pipe' or 'No-Corode') was manufactured from wood fibers and pitch pressed into pipe form, used primarily from the 1940s through the 1970s as a low-cost alternative to cast iron and clay. It's problematic because: 1) It collapses under soil pressure over time (typically 30-50 year lifespan), 2) It's susceptible to deformation from root pressure and ground movement, 3) Joints often separate, allowing soil infiltration, 4) It's difficult to detect without camera inspection since it was often installed without proper documentation, and 5) Many municipalities now require its replacement due to high failure rates. Identification methods: 1) Camera inspection reveals its distinctive layered appearance like rolled cardboard, 2) Homes built 1945-1975 are most likely to have it, 3) It was commonly used in post-WWII housing developments, 4) Property records sometimes mention 'fiber conduit' or 'composition pipe,' and 5) Exposed sections (if accessible) appear dark brown/black with a fibrous texture. If Orangeburg is detected, we typically recommend full replacement due to its inevitable failure, with costs ranging from $8,000-$20,000 depending on property specifics."
  },
  {
    question: "Can sewer camera inspection identify all potential problems, and what are its limitations?",
    answer: "Sewer camera inspection identifies most common pipe problems but has specific limitations: It effectively identifies: 1) Visible cracks, fractures, and holes, 2) Root intrusion (when roots have entered the pipe), 3) Bellies, offsets, and misalignments, 4) Corrosion and scale buildup, 5) Obstructions and debris, 6) Pipe material type and condition, and 7) Previous repair quality. Limitations include: 1) Cannot detect external soil conditions or groundwater infiltration unless water is actively entering, 2) May not identify hairline cracks in filled pipes or during dry conditions, 3) Cannot assess pipe bedding or surrounding soil stability, 4) May miss problems in pipes completely filled with debris or water (requires cleaning first), 5) Cannot verify structural adequacy of pipes under load without additional testing, and 6) May not detect very early-stage root intrusion before penetration occurs. For comprehensive assessment, we sometimes recommend complementary services: smoke testing for leak detection, dye testing for infiltration verification, or mandrel testing for structural adequacy. We discuss these options when conditions suggest they might provide additional valuable information."
  },
  {
    question: "How far can your sewer camera travel, and what if my lateral line is longer than 200 feet?",
    answer: "Our standard professional systems carry 200 feet of heavy-duty push-rod cable, which reaches the municipal main connection for approximately 95% of residential properties in the GTA. The average residential lateral length is 50-100 feet from house to street. For properties with exceptionally long laterals (deep lots, unusual topography, or commercial properties), we have extended systems capable of 300-foot inspections. If a property's lateral exceeds our capabilities (extremely rare in residential settings), we can: 1) Inspect the critical first 200 feet where most problems occur (near trees, under driveways, near the house), 2) Use alternative access points (multiple cleanouts, municipal connection access), or 3) Recommend specialized equipment for extraordinary situations. During our initial consultation, we assess property specifics to ensure appropriate equipment selection. For commercial or industrial properties with longer runs, we discuss requirements in advance to ensure proper equipment availability."
  },
  {
    question: "What should I do with the inspection results, especially if problems are found during a real estate transaction?",
    answer: "If problems are identified during a real estate transaction: 1) Review the narrated video and detailed report to understand defect severity and implications, 2) Share the professional documentation with your real estate agent for negotiation strategy, 3) Obtain repair estimates from licensed plumbing contractors (we can provide referrals to reputable companies), 4) Determine negotiation approach: request seller repairs before closing, request price reduction/credit, or request sewer line warranty purchase, 5) Consider sewer line insurance if available in your area (typically $50-$150/year covering repairs), 6) For minor issues, negotiate an allowance for immediate post-closing remediation, 7) For major issues (Orangeburg, collapsed pipes, extensive root damage), consider making repair a condition of sale or reconsidering the purchase. We provide: a) Professional documentation acceptable to lenders and insurers, b) Clear explanations of defect implications, c) Typical repair cost ranges for negotiation reference, and d) Consultations to help interpret findings in the context of your specific transaction. Our reports have successfully facilitated six-figure negotiations on commercial properties and five-figure adjustments on residential transactions."
  },
  {
    question: "How much does professional sewer camera inspection cost in Toronto, and when is it most valuable?",
    answer: "Professional sewer camera inspection in Toronto typically ranges from $299 for standard residential inspections to $499 for complex properties, commercial assessments, or emergency same-day service. Factors affecting cost: 1) Property type (residential vs. commercial), 2) Access complexity (cleanout availability, need for alternative access), 3) Property location within GTA, 4) Urgency of service (standard scheduling vs. same-day for real estate deadlines), 5) Lateral length and depth, and 6) Additional services like sonde/GPS mapping or detailed CAD drawings. The inspection is most valuable when: 1) Purchasing any property over 20 years old, 2) Properties with large trees near sewer lines, 3) Before landscaping or construction projects near sewer paths, 4) Experiencing chronic slow drains or backups, 5) Purchasing investment or rental properties, 6) Before sewer line warranty expiration, 7) After earthquake or ground settlement events, or 8) When neighboring properties have experienced sewer problems. The relatively low inspection cost (typically 1-5% of potential repair costs) provides substantial risk mitigation and negotiation leverage in real estate transactions."
  }
];

const relatedServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Complete property assessment including plumbing system evaluation and drain flow testing."
  },
  { 
    title: "Hydro-Jetting & Drain Cleaning", 
    href: "/services/drain-cleaning",
    description: "Professional drain cleaning services to clear obstructions and restore proper flow capacity."
  },
  { 
    title: "Plumbing Inspection", 
    href: "/services/plumbing-inspection",
    description: "Comprehensive assessment of interior plumbing systems, fixtures, and water supply lines."
  },
  { 
    title: "Foundation Inspection", 
    href: "/services/foundation-inspection",
    description: "Structural assessment of foundation conditions often related to sewer line settlement issues."
  },
];

export default function SewerScopeInspection() {
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
    "serviceType": "Sewer Camera Inspection",
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
    "description": "Professional CCTV sewer camera inspections in Toronto and GTA. HD video assessment of sewer lines for root intrusion, bellied pipes, cracks, and Orangeburg piping. GPS mapping and same-day reports.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Specialized Inspection Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sewer Camera Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Sewer Scope Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Sewer Camera Assessment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Same-Day Sewer Inspection"
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
        "name": "Sewer Camera Inspection",
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
    "description": "ASADS Home Inspection provides professional sewer camera inspections, drain assessments, and plumbing evaluation services across Ontario. CCTV technology for underground pipe condition assessment."
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
      "serviceType": "Sewer Camera Inspection"
    },
    "specialty": "Specialized Inspection Services",
    "about": {
      "@type": "Thing",
      "name": "Sewer Camera Inspection",
      "description": "CCTV camera assessment of underground sewer lines for defect detection and condition evaluation"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Sewer Camera Inspection Services",
    "image": `${SITE_URL}/images/services/sewer-camera-inspection.jpg`,
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
          "name": "Home Buyer in Toronto"
        },
        "datePublished": "2025-01-25",
        "reviewBody": "The sewer scope inspection saved us from a $15,000 disaster. The camera found a completely collapsed Orangeburg pipe that wasn't visible during our regular home inspection. The HD video evidence allowed us to negotiate the full repair cost from the seller. The GPS mapping helped the plumbing contractor locate and repair the exact section without unnecessary excavation.",
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
          "name": "Property Manager in Mississauga"
        },
        "datePublished": "2025-02-12",
        "reviewBody": "We manage multiple rental properties and use ASADS for annual sewer inspections. Their detailed reports help us plan preventative maintenance and avoid emergency calls. The camera quality is exceptional—they identified early root intrusion that we treated before it caused backups. The cloud delivery of videos makes it easy to share with maintenance contractors.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sewer Camera Inspection Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Residential Sewer Inspections",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard Sewer Scope Inspection",
                "description": "Complete CCTV inspection of residential sewer lateral with HD video and basic report"
              },
              "price": "299",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Premium Sewer Inspection with GPS",
                "description": "Includes sonde/GPS mapping for precise defect location and detailed CAD diagrams"
              },
              "price": "399",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Specialized Sewer Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Emergency Same-Day Inspection",
                "description": "Urgent sewer camera service for real estate deadlines or active backup situations"
              },
              "price": "499",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial Sewer Assessment",
                "description": "CCTV inspection for commercial properties, multi-unit buildings, or industrial sites"
              },
              "price": "599",
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
                <Video className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  CCTV Sewer Camera Inspection
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Sewer Camera Inspection
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Don't inherit a $20,000 plumbing disaster. HD camera inspection reveals hidden underground sewer line defects before they become catastrophic failures. Real estate negotiation evidence.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Same-Day HD Video Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>GPS Defect Location Mapping</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Sewer Inspection
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
              <span>1080p HD Camera • GPS Mapping • 200ft Reach • Same-Day Cloud Delivery</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Sewer Inspection</Link>
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
                  Underground Sewer Line Assessment: Preventing Costly Plumbing Catastrophes
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    In the Greater Toronto Area, <strong>sewer line replacement ranks among the most expensive hidden costs of homeownership</strong>, typically ranging from $5,000 for simple repairs to over $25,000 for full lateral replacement with excavation and municipal reconnection. While standard home inspections evaluate interior plumbing fixtures and visible drainage, they cannot assess the critical underground sewer lateral running from your home to the municipal main—where 90% of costly problems occur. Our professional CCTV sewer camera inspection provides the definitive assessment needed to avoid inheriting these substantial, unexpected expenses.
                  </p>
                  <p>
                    We specialize in Toronto's older neighborhoods where aging infrastructure presents particular risks: <strong>clay tile pipes (pre-1970s) prone to root intrusion and cracking, cast iron pipes (1950s-1980s) susceptible to corrosion, and Orangeburg bituminized fiber pipes (1940s-1970s) known for catastrophic collapse</strong>. Using 1080p high-definition camera systems with self-leveling technology and 200-foot reach capability, we document the entire lateral line condition, providing narrated HD video evidence and GPS-mapped defect locations. This objective documentation becomes powerful negotiation leverage in real estate transactions and essential planning data for preventative maintenance.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl my-6">
                    <h4 className="text-blue-900 font-bold flex items-center gap-2 mb-2">
                      <Search className="text-blue-600" size={20} />
                      Advanced CCTV Technology with Self-Leveling & GPS Mapping
                    </h4>
                    <p className="text-blue-800">
                      We utilize industrial 1080p HD camera systems with <strong>self-leveling heads that maintain proper orientation</strong> and high-intensity LED lighting for crystal-clear pipe imaging. When defects are identified, we deploy radio frequency transmitter sondes for <strong>precise GPS mapping of exact defect locations and depths</strong>, eliminating guesswork for excavation planning. This technology provides contractors with exact coordinates for targeted repairs, saving thousands in unnecessary exploratory digging.
                    </p>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Tree Root Intrusion: The Most Common Sewer Line Problem in Toronto</h3>
                  <p>
                    <strong>Tree root intrusion affects approximately 60% of Toronto properties with mature trees near sewer lines</strong>. Roots seek moisture and nutrients, penetrating pipe joints, cracks, and even sound pipes through hydrostatic pressure. Once inside, roots expand, causing blockages, pipe deformation, and eventual structural failure. Early detection through camera inspection allows non-invasive solutions: hydro-jetting and root cutting ($1,500-$4,000) can extend pipe life for years, while chemical root treatments can retard regrowth. Without early detection, root damage typically progresses to the point requiring full pipe replacement ($8,000-$15,000+).
                  </p>
                  <p>
                    Our cameras clearly identify root penetration patterns, severity, and locations. We assess whether roots have merely entered through joints (potentially treatable) or have caused structural damage requiring replacement. For properties with recurrent root issues, we map intrusion patterns to identify specific problem trees for removal or barrier installation. The GPS mapping capability allows precise above-ground location of root penetration points, enabling targeted excavation if mechanical root removal becomes necessary while preserving unaffected sections of pipe and landscape.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Bellied Pipes & Low Spot Sedimentation: Chronic Drainage Problems</h3>
                  <p>
                    <strong>Bellied pipes (sagging sections) occur when soil settles unevenly beneath pipes</strong>, creating low spots that trap water, sediment, and debris. These sections cause chronic slow drains, periodic backups, and accelerated pipe deterioration as standing water promotes corrosion and root growth. Bellies are particularly problematic in Toronto's clay soils, which expand when wet and contract when dry, creating continuous ground movement that affects pipe alignment over decades.
                  </p>
                  <p>
                    Our camera systems clearly identify bellied sections through visual assessment of sediment accumulation patterns and water pooling. We measure the severity of sagging and assess whether spot repair (digging up and replacing just the sagging section) or full lateral replacement is warranted. For minor bellies without active blockage, periodic hydro-jetting may provide adequate maintenance. For severe bellies causing recurrent backups, we provide precise GPS coordinates for targeted excavation and repair, typically costing $3,000-$7,000 versus $8,000-$15,000+ for full replacement.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Camera className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">1080p HD Camera</h4>
                      <p className="text-xs text-muted-foreground">High-definition video with self-leveling technology for clear pipe assessment.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Navigation className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">GPS Mapping</h4>
                      <p className="text-xs text-muted-foreground">Precise defect location mapping with depth measurement for targeted repairs.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <Ruler className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">200ft Reach</h4>
                      <p className="text-xs text-muted-foreground">Professional push-rod systems that reach municipal connections on most properties.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Orangeburg Pipe Identification: The Time Bomb in Older Toronto Homes</h3>
                  <p>
                    <strong>Orangeburg pipe (bituminized fiber conduit)</strong> was widely installed in Toronto from the 1940s through the 1970s as a low-cost alternative to cast iron and clay. Made from wood fibers impregnated with coal tar pitch, this material has a typical lifespan of 30-50 years before collapsing under soil pressure. Properties built between 1945-1975 may have Orangeburg laterals, which now represent ticking time bombs for catastrophic failure. Unlike gradual failure modes of other materials, Orangeburg typically fails suddenly and completely, causing immediate sewage backups and requiring emergency replacement.
                  </p>
                  <p>
                    Our camera inspection clearly identifies Orangeburg piping by its distinctive layered appearance (similar to rolled cardboard). When detected, we typically recommend immediate replacement due to its inevitable failure mode, with costs ranging from $8,000-$20,000 depending on property specifics. Early identification allows planned, budgeted replacement rather than emergency excavation. For real estate transactions, Orangeburg detection provides substantial negotiation leverage, as most buyers (and their lenders) will require replacement before closing or substantial price adjustments.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Clay Tile & Cast Iron Assessment: Aging Infrastructure Evaluation</h3>
                  <p>
                    <strong>Clay tile pipes</strong> (vitrified clay) were standard in Toronto construction until the 1970s. While durable, they're brittle and susceptible to cracking from ground movement, root pressure at joints, and freeze-thaw cycles. <strong>Cast iron pipes</strong> (used from early 1900s through 1980s) corrode from the inside, gradually reducing diameter until complete blockage occurs. Both materials present distinct failure patterns that our cameras expertly identify.
                  </p>
                  <p>
                    For clay tiles, we assess joint integrity (the weakest points), look for longitudinal cracks (indicating ground pressure), and evaluate overall pipe roundness (deformation indicates imminent failure). For cast iron, we measure remaining wall thickness, identify pitting corrosion patterns, and assess scale accumulation that reduces effective diameter. Based on condition assessment, we provide realistic remaining life estimates and recommend appropriate interventions: spot repair for isolated damage, cured-in-place pipe lining for extensive corrosion without structural failure, or full replacement for advanced deterioration.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Real Estate Transaction Support: Negotiation Evidence & Due Diligence</h3>
                  <p>
                    Sewer camera inspection has become standard due diligence for Toronto real estate transactions, particularly for properties over 20 years old. <strong>Most mortgage lenders now recognize sewer line failure as a substantial risk</strong>, and many require inspection documentation for properties in known problem areas. Our inspection provides the objective evidence needed for informed negotiations: clear video documentation of defects, professional assessment of repair urgency, and realistic cost estimates for required work.
                  </p>
                  <p>
                    Common negotiation outcomes based on our inspections include: 1) Seller completes repairs before closing (ideal for minor-moderate issues), 2) Price reduction equivalent to repair costs (common for major issues where buyers prefer to manage repairs themselves), 3) Escrow holdback for post-closing repairs (for issues that can be addressed after possession), 4) Purchase of sewer line warranty (typically $50-$150/year covering future repairs), or 5) In extreme cases, buyer withdrawal from transaction (for catastrophic issues like complete Orangeburg collapse). We provide consultation to help interpret findings in your specific transaction context and can provide referrals to reputable plumbing contractors for repair estimates.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Preventative Maintenance Planning & Long-Term Sewer Management</h3>
                  <p>
                    Beyond transaction due diligence, sewer camera inspection provides essential data for long-term sewer line management. For property owners, we recommend: 1) <strong>Establishing baseline condition documentation</strong> for comparison during future inspections, 2) <strong>Developing preventative maintenance schedules</strong> based on observed conditions (hydro-jetting frequency, root treatment timing, etc.), 3) <strong>Mapping sewer line locations</strong> relative to other utilities and structures to avoid damage during future landscaping or construction, and 4) <strong>Identifying risk factors</strong> (problem tree species, soil conditions, pipe materials) for proactive management.
                  </p>
                  <p>
                    For investment or rental properties, regular sewer inspections (every 2-3 years) help prevent emergency calls, plan capital expenditures, and maintain property value. For properties with known issues, we provide monitoring inspections to assess whether conditions are stable, improving with treatment, or deteriorating toward failure. This proactive approach transforms sewer line management from reactive crisis response to planned, budgeted maintenance—saving substantial costs and preventing property damage from unexpected backups.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Commercial & Multi-Unit Property Sewer Assessments</h3>
                  <p>
                    Commercial properties, restaurants, and multi-unit residential buildings present unique sewer challenges: larger diameter pipes, longer lateral runs, grease interceptor requirements, and higher consequence of failure. Our commercial sewer inspection services include: 1) <strong>Large diameter camera systems</strong> (up to 24-inch pipes), 2) <strong>Extended reach capability</strong> for deep or distant municipal connections, 3) <strong>Grease accumulation assessment</strong> for compliance with municipal bylaws, 4) <strong>Flow capacity evaluation</strong> for expansion planning, and 5) <strong>Infiltration/inflow assessment</strong> for stormwater management compliance.
                  </p>
                  <p>
                    For restaurants and food service establishments, we assess grease interceptor functionality and main line grease accumulation—common causes of sanitary sewer overflows and municipal fines. For multi-unit properties, we identify which units contribute to specific problems and assess common line conditions affecting all residents. Our commercial reports include capacity calculations, regulatory compliance assessments, and prioritized repair recommendations suitable for capital budgeting and municipal permit applications.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Complementary Services: Comprehensive Drainage Assessment</h3>
                  <p>
                    While sewer camera inspection focuses on the main sanitary sewer lateral, comprehensive drainage assessment may include complementary services: <Link to="/services/hydro-jetting" className="text-primary hover:underline">hydro-jetting</Link> to clear obstructions before camera inspection, <Link to="/services/drain-cleaning" className="text-primary hover:underline">drain cleaning</Link> for recurrent minor blockages, <Link to="/services/plumbing-inspection" className="text-primary hover:underline">full plumbing inspection</Link> of interior systems, or <Link to="/services/foundation-inspection" className="text-primary hover:underline">foundation assessment</Link> when ground movement is suspected. During real estate transactions, consider combining sewer scope with <Link to="/services/pre-purchase" className="text-primary hover:underline">pre-purchase home inspection</Link> for comprehensive property evaluation.
                  </p>
                  <p>
                    We coordinate these services based on your specific concerns and property characteristics. For properties experiencing chronic drainage issues, we often recommend starting with camera inspection to identify root causes, followed by targeted treatments addressing specific problems identified. This systematic approach proves more cost-effective than repeated attempts at symptom treatment without understanding underlying conditions.
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
                      <Search className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
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
                  Sewer Camera Inspection FAQ
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
                    Why Choose ASADS for Sewer Inspection?
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
                      <Link to="/booking">Schedule Sewer Inspection</Link>
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
              We provide sewer camera inspection services across the Greater Toronto Area
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
              Don't Let Underground Problems Become Above-Ground Disasters
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Sewer line failures are among the most expensive hidden defects in homeownership. Professional camera inspection provides the evidence you need for informed decisions and fair negotiations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Sewer Inspection</Link>
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
