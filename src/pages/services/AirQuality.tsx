import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Wind, 
  Thermometer, 
  ShieldAlert, 
  Microscope, 
  Leaf,
  Phone, 
  Calendar,
  Clock,
  FileText,
  Home,
  Search,
  Zap,
  Droplets,
  Video,
  AlertTriangle,
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
  ZapOff
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

const title = "Indoor Air Quality Testing";
const metaTitle = "Indoor Air Quality Testing Toronto | VOC, Allergen & Particulate Analysis | ASADS";
const metaDescription = "Professional indoor air quality testing in Toronto & GTA. Laboratory analysis for VOCs, allergens, mold spores, formaldehyde, and particulate matter. Protect your family's health with certified air testing and improvement recommendations.";
const price = "$249-$599";
const duration = "2-4 Hours + Laboratory Analysis";

const whatWeInspect = [
  "Volatile Organic Compounds (VOCs) – analyze chemical off-gassing from paints, cleaning products, furniture, and building materials",
  "Particulate Matter (PM2.5 & PM10) – measure fine and coarse airborne particles affecting respiratory health and cardiovascular function",
  "Carbon Dioxide (CO2) Levels – assess ventilation adequacy and occupancy comfort through CO2 concentration monitoring",
  "Carbon Monoxide (CO) – detect dangerous combustion byproduct from improperly vented appliances and heating systems",
  "Relative Humidity & Temperature – evaluate moisture conditions affecting mold growth, dust mites, and occupant comfort",
  "Formaldehyde & Aldehydes – test for specific carcinogenic compounds from pressed wood products and household items",
  "Airborne Mold Spore Counts – identify fungal contamination through volumetric air sampling and species identification",
  "Dust Mite Allergens – assess presence of Dermatophagoides allergens in settled dust samples affecting allergic individuals",
  "Pet Dander & Animal Allergens – measure Fel d 1 (cat) and Can f 1 (dog) allergens in indoor environments",
  "Pollen & Outdoor Allergens – evaluate infiltration of seasonal allergens affecting indoor air quality",
  "Ventilation Rate & Air Exchange – calculate air changes per hour and identify inadequate ventilation scenarios",
  "Total Microbial Count – assess overall bacterial and fungal load through culture-based and non-culture methods"
];

const features = [
  {
    title: "Laboratory-Grade Air Sampling Equipment & Real-Time Monitoring Technology",
    description: "We utilize professional-grade air sampling equipment including calibrated photoionization detectors (PID) for VOC measurement, laser particle counters for PM2.5/PM10 quantification, infrared CO2 analyzers, electrochemical CO sensors, and formaldehyde-specific monitors. Our real-time monitoring provides immediate data on pollutant fluctuations, source identification, and ventilation effectiveness. All equipment undergoes regular calibration against NIST-traceable standards, ensuring measurement accuracy suitable for health assessments, legal documentation, and before/after remediation verification."
  },
  {
    title: "Comprehensive Multi-Pollutant Analysis Covering Chemical, Biological & Physical Parameters",
    description: "Our air quality assessments examine all major pollutant categories: chemical (VOCs, formaldehyde, CO, CO2), biological (mold spores, bacteria, allergens), and physical (particulate matter, temperature, humidity). We collect air samples using calibrated pumps with appropriate media (activated carbon tubes for VOCs, cassettes for mold, filters for particulates) and settled dust samples for allergen analysis. Laboratory analysis includes GC/MS for VOC speciation, microscopy for mold identification, ELISA for allergen quantification, and gravimetric analysis for particulate mass. This comprehensive approach identifies interacting pollutants and provides complete indoor air quality characterization."
  },
  {
    title: "Source Identification & Root Cause Analysis for Targeted Remediation Strategies",
    description: "Beyond measuring pollutant levels, we conduct systematic source investigations to identify contamination origins. Our methodology includes: 1) Building material assessment for VOC and formaldehyde sources, 2) HVAC system evaluation for microbial amplification sites, 3) Moisture mapping for mold growth conditions, 4) Occupancy pattern analysis for CO2 and particulate generation, and 5) Product inventory for chemical emission sources. We correlate pollutant measurements with identified sources to develop targeted remediation strategies—addressing root causes rather than symptoms. This approach proves more effective and cost-efficient than generalized air purification solutions."
  },
  {
    title: "Health-Based Interpretation & Actionable Improvement Recommendations",
    description: "We interpret results against Health Canada indoor air quality guidelines, WHO exposure limits, ASHRAE ventilation standards, and allergen threshold values for sensitized individuals. Our reports include: 1) Clear explanations of health implications for each exceedance, 2) Prioritized recommendations addressing immediate health risks first, 3) Cost-benefit analysis of various remediation options, 4) Step-by-step implementation guidance, and 5) Verification testing protocols to confirm improvement. Recommendations span source control (eliminating or reducing pollutant sources), ventilation improvements (increasing fresh air exchange), air cleaning (selecting appropriate filtration technologies), and occupant behavior modifications (changing cleaning practices or product choices)."
  }
];

const benefits = [
  "Laboratory-grade air sampling equipment with NIST-traceable calibration ensuring accurate, defensible results",
  "Comprehensive multi-pollutant analysis covering chemical, biological, and physical air quality parameters",
  "Real-time monitoring capabilities providing immediate data on pollutant levels and ventilation effectiveness",
  "Source identification methodology addressing root causes rather than just symptoms of poor air quality",
  "Health-based interpretation against Canadian guidelines and WHO standards for meaningful risk assessment",
  "Actionable improvement recommendations with cost-benefit analysis and step-by-step implementation guidance",
  "Before-and-after testing capabilities to verify remediation effectiveness and indoor air quality improvements",
  "Specialized testing for sensitive populations (children, elderly, immunocompromised, allergy sufferers)",
  "Rapid response testing for suspected sick building syndrome or unexplained occupant health complaints",
  "Documentation for real estate transactions, insurance claims, workplace safety compliance, and legal proceedings",
  "Integration with other environmental assessments (mold, asbestos, radon) for comprehensive indoor environment evaluation",
  "Peace of mind knowing your indoor air supports rather than compromises your family's health and wellbeing"
];

const faqs = [
  {
    question: "What are the most common signs and symptoms of poor indoor air quality affecting my family?",
    answer: "Poor indoor air quality manifests through both immediate symptoms and chronic health effects. Immediate symptoms (often improving when leaving the building) include: headaches, dizziness, fatigue, eye/nose/throat irritation, coughing, sneezing, skin irritation, and difficulty concentrating. Chronic effects from long-term exposure include: worsening of asthma and allergies, respiratory infections, cardiovascular issues, and in cases of specific pollutants like formaldehyde or radon, increased cancer risk. Particularly vulnerable populations include children (higher breathing rates relative to body size), elderly (reduced respiratory capacity), pregnant women (fetal development concerns), and individuals with pre-existing respiratory or cardiovascular conditions. Symptoms often follow patterns: worsening at specific times (after cleaning, during heating season), in specific locations (basements, newly renovated rooms), or with specific activities (cooking, hobby work). Our assessment includes occupant symptom questionnaires to correlate complaints with specific pollutant measurements for targeted investigation."
  },
  {
    question: "What are Volatile Organic Compounds (VOCs) and why are they particularly concerning in new or renovated homes?",
    answer: "Volatile Organic Compounds (VOCs) are carbon-based chemicals that evaporate at room temperature, releasing gases into indoor air. Common sources in homes include: paints, varnishes, adhesives, cleaning products, air fresheners, cosmetics, building materials (plywood, particleboard), furnishings (carpets, upholstery), and office equipment. Health effects range from eye/nose/throat irritation and headaches to liver/kidney/central nervous system damage, with some VOCs classified as carcinogens. New or renovated homes experience 'off-gassing' where building materials and finishes release VOCs at higher rates initially, with emissions decreasing over months or years. Formaldehyde (a specific VOC of concern) is common in pressed wood products, insulation, and certain fabrics. Our VOC testing includes: 1) Total VOC measurements using PID technology, 2) Formaldehyde-specific monitoring, 3) Laboratory GC/MS analysis for compound identification, and 4) Source identification through material assessment. Remediation strategies include: source removal/replacement, increased ventilation during and after installation, use of low-VOC products, and air purification with activated carbon filters."
  },
  {
    question: "How does indoor air quality testing differ between residential homes and commercial/workplace environments?",
    answer: "Residential and commercial air quality testing differ in scope, standards, and objectives. Residential testing focuses on: 1) Family health protection with emphasis on allergens, VOCs from household products, and combustion byproducts, 2) 24-hour living environment considering sleeping areas and continuous exposure, 3) Guidelines based on Health Canada residential standards, and 4) Solutions practical for homeowners (air purifiers, ventilation improvements, product substitutions). Commercial testing addresses: 1) Occupational health regulations under OHSA and building codes, 2) Higher occupant density affecting CO2 levels and infectious disease transmission, 3) Specific industrial processes or office equipment emissions, 4) ASHRAE ventilation rate compliance for commercial buildings, 5) Productivity and absenteeism concerns, and 6) Liability protection for building owners/employers. Commercial assessments often include: ventilation system performance testing, indoor air quality management plans, ongoing monitoring programs, and documentation for regulatory compliance. We tailor our approach based on occupancy type, building use, and specific concerns raised by occupants or management."
  },
  {
    question: "What is the relationship between humidity levels, mold growth, and indoor air quality?",
    answer: "Relative humidity directly influences mold growth and indoor air quality through multiple mechanisms: 1) Mold requires moisture to grow—sustained indoor relative humidity above 60% supports mold growth on surfaces, 2) Dust mites thrive at 70-80% relative humidity, increasing allergen levels, 3) High humidity causes condensation on cold surfaces (windows, exterior walls) creating moisture for hidden mold growth, 4) Low humidity (below 30%) dries mucous membranes, increasing susceptibility to respiratory infections and irritation, 5) Humidity affects VOC emissions—higher temperatures and humidity increase off-gassing from materials. Ideal indoor relative humidity ranges from 30-50%. Our assessment includes: temperature and humidity mapping throughout the property, identification of condensation-prone surfaces, calculation of dew point temperatures, and correlation with mold spore measurements. Humidity control recommendations include: proper ventilation, dehumidification in damp areas, vapor barriers in crawl spaces, and addressing moisture sources (leaks, groundwater intrusion, humidifier overuse)."
  },
  {
    question: "Can air quality testing identify the source of mysterious odors or 'sick building syndrome' symptoms?",
    answer: "Yes, specialized air quality testing can systematically investigate mysterious odors and sick building syndrome (SBS) complaints. Our investigative approach includes: 1) Detailed occupant questionnaires mapping symptoms to locations/times/activities, 2) Real-time monitoring to capture pollutant fluctuations, 3) Source identification through building material assessment and product inventory, 4) Targeted sampling for suspected compounds (musty odors indicate microbial volatile organic compounds from mold, chemical odors suggest VOCs, sewage odors may indicate dry trap or bacterial growth in drains), 5) Ventilation system inspection for contamination or inadequate fresh air, 6) Pressure relationship testing to identify pollutant pathways between spaces. Common odor sources identified include: hidden mold growth in walls or HVAC systems, off-gassing from new materials, combustion appliance backdrafting, sewer gas infiltration, and chemical storage in occupied spaces. For SBS investigations, we often measure multiple parameters simultaneously to identify correlations between symptoms and specific environmental conditions. Successful resolution typically requires both pollutant measurement and systematic source elimination through controlled interventions."
  },
  {
    question: "How effective are air purifiers, and what type should I choose based on air quality test results?",
    answer: "Air purifier effectiveness depends on matching technology to specific pollutants identified in testing: 1) HEPA filters capture 99.97% of particles ≥0.3 microns—effective for pollen, dust, mold spores, and pet dander, 2) Activated carbon filters adsorb gases and odors—effective for VOCs, formaldehyde, and cooking odors, 3) UV-C light damages microbial DNA—effective against bacteria and viruses when properly designed, 4) Ionizers charge particles for collection—but may produce ozone (a lung irritant), 5) Photocatalytic oxidation breaks down chemicals—but may produce intermediate compounds. Based on your test results, we recommend: For high particulate levels: HEPA filtration with adequate CADR (Clean Air Delivery Rate) for room size. For VOC concerns: Substantial activated carbon beds (weight matters—more carbon = greater capacity). For microbial issues: HEPA plus UV-C in HVAC system or portable units. For multiple concerns: Multi-stage units combining technologies. Important considerations: regular filter replacement, noise levels, energy consumption, and ozone-free operation. We provide specific recommendations including optimal placement, required air changes per hour, and maintenance schedules based on your pollutant profile and room characteristics."
  },
  {
    question: "What should I expect during an indoor air quality assessment, and how should I prepare my home?",
    answer: "During our assessment: 1) We conduct a walkthrough interview about concerns, symptoms, and building history, 2) Deploy real-time monitors for CO2, CO, particulates, temperature, and humidity, 3) Collect air samples using calibrated pumps (VOCs, mold spores, formaldehyde), 4) Take settled dust samples for allergen analysis, 5) Inspect HVAC systems, moisture sources, and potential pollutant reservoirs, 6) Measure ventilation rates and air exchange, 7) Review cleaning products and household chemicals. Preparation: Maintain normal occupancy patterns (don't alter ventilation or cleaning before testing), Avoid major cleaning or painting for 48 hours before testing (to capture typical conditions), Have HVAC systems operating normally, Provide access to all rooms including basements and crawl spaces, Note any recent changes or concerns. Testing typically takes 2-4 hours on-site, with laboratory analysis requiring 3-7 days depending on parameters. We provide verbal preliminary findings same-day and comprehensive written reports with laboratory data within 7-10 days. For urgent health concerns, expedited laboratory services are available."
  },
  {
    question: "How much does professional indoor air quality testing cost in Toronto, and what factors affect pricing?",
    answer: "Professional indoor air quality testing in Toronto typically ranges from $249 for basic screening (real-time parameters only) to $599+ for comprehensive analysis including laboratory testing. Factors affecting cost: 1) Number of parameters tested (real-time vs. laboratory analysis), 2) Number of sampling locations (single room vs. whole house), 3) Type of laboratory analysis required (VOC speciation, mold identification, allergen quantification), 4) Property size and complexity, 5) Urgency of results (standard vs. expedited laboratory turnaround), 6) Additional services (source investigation, remediation planning, post-remediation verification). Our most popular residential package ($399) includes: real-time monitoring of 6 parameters, VOC screening, mold spore air sampling, settled dust allergen test, and comprehensive report with recommendations. Commercial assessments are priced based on square footage and specific compliance requirements. Contact us at (647) 801-9311 for a customized quote based on your specific concerns, property characteristics, and testing objectives."
  }
];

const relatedServices = [
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Comprehensive mold assessment including moisture mapping, surface sampling, and hidden growth detection."
  },
  { 
    title: "Radon Testing", 
    href: "/services/radon-testing",
    description: "Long-term radon gas measurement for cancer risk assessment, particularly important for basement areas."
  },
  { 
    title: "Asbestos Testing", 
    href: "/services/asbestos-testing",
    description: "Hazardous material assessment for pre-1990 properties undergoing renovation or experiencing material deterioration."
  },
  { 
    title: "Thermal Imaging", 
    href: "/services/thermal-imaging",
    description: "Infrared scanning for hidden moisture sources, insulation voids, and energy efficiency issues affecting air quality."
  },
];

export default function AirQualityTesting() {
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
    "serviceType": "Indoor Air Quality Testing",
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
    "description": "Professional indoor air quality testing in Toronto and GTA. Laboratory analysis for VOCs, allergens, mold spores, formaldehyde, and particulate matter. Real-time monitoring and source identification.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Environmental Testing Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Air Quality Testing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basic Air Quality Screening"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Comprehensive Air Quality Analysis"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial IAQ Assessment"
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
        "name": "Indoor Air Quality Testing",
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
    "description": "ASADS Home Inspection provides professional indoor air quality testing, environmental assessment, and health-focused inspection services across Ontario. Laboratory analysis for residential and commercial properties."
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
      "serviceType": "Indoor Air Quality Testing"
    },
    "specialty": "Environmental Testing Services",
    "about": {
      "@type": "Thing",
      "name": "Indoor Air Quality Testing",
      "description": "Professional assessment of indoor air pollutants affecting health and comfort"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Indoor Air Quality Testing Services",
    "image": `${SITE_URL}/images/services/air-quality-testing.jpg`,
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
          "name": "Family in North York"
        },
        "datePublished": "2025-01-22",
        "reviewBody": "Our daughter's asthma symptoms were worsening at home. ASADS air quality testing identified high levels of dust mite allergens and poor ventilation. Their recommendations included specific HEPA air purifiers, humidity control measures, and ventilation improvements. Within weeks, her symptoms improved dramatically. The detailed report helped us prioritize changes and provided evidence for our insurance claim for the air purification system.",
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
          "name": "Office Manager in Downtown Toronto"
        },
        "datePublished": "2025-02-14",
        "reviewBody": "After several employees complained of headaches and fatigue, we hired ASADS for commercial air quality testing. They identified elevated CO2 levels from inadequate ventilation and VOC emissions from new office furniture. Their recommendations included HVAC adjustments and air purifier placement. Post-remediation testing showed significant improvement, and employee complaints dropped by 80%. Professional, thorough service with clear documentation for our health and safety records.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Indoor Air Quality Testing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Residential Air Quality Testing",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Basic Air Quality Screening",
                "description": "Real-time monitoring of CO2, CO, particulates, temperature, and humidity with immediate results"
              },
              "price": "249",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Comprehensive Air Quality Analysis",
                "description": "Full assessment including VOC testing, mold spore analysis, allergen testing, and laboratory analysis"
              },
              "price": "499",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Specialized Air Quality Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sick Building Syndrome Investigation",
                "description": "Comprehensive investigation for unexplained occupant symptoms including source identification"
              },
              "price": "599",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial IAQ Assessment",
                "description": "Workplace air quality testing meeting OHSA requirements and ASHRAE ventilation standards"
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
                <Wind className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  Certified Indoor Environmental Assessment
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Indoor Air Quality Testing
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Breathe easier knowing your indoor air supports health. Professional testing for VOCs, allergens, mold spores, and particulate matter with actionable improvement recommendations.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Laboratory Analysis Included</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                <span>Health-Based Recommendations</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Air Quality Test
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
              <span>Laboratory-Grade Equipment • Real-Time Monitoring • Source Identification • Health-Based Recommendations</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Book Air Quality Test</Link>
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
                  Comprehensive Indoor Air Quality Assessment for Healthier Living Environments
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Canadians spend approximately <strong>90% of their time indoors</strong>, where air pollution levels can be 2-5 times higher than outdoor air according to Health Canada studies. Poor indoor air quality contributes to allergies, asthma exacerbations, respiratory infections, headaches, fatigue, and reduced cognitive function. Our professional air quality testing provides scientific validation of your indoor environment, identifying specific pollutants and their sources to create targeted improvement strategies for healthier living and working spaces.
                  </p>
                  <p>
                    We assess all major pollutant categories: <strong>chemical pollutants (VOCs, formaldehyde, carbon monoxide), biological contaminants (mold spores, bacteria, allergens), and physical parameters (particulate matter, temperature, humidity)</strong>. Using laboratory-grade equipment with NIST-traceable calibration, we provide accurate measurements against Health Canada guidelines, WHO standards, and ASHRAE ventilation requirements. Beyond measurement, we conduct systematic source investigations to identify root causes—addressing pollutants at their origin rather than relying solely on air purification as a band-aid solution.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                      <Microscope className="text-blue-600 mb-2" size={32} />
                      <h4 className="font-bold text-blue-900">Lab-Grade Equipment</h4>
                      <p className="text-xs text-blue-800">Professional air sampling with NIST-traceable calibration for accurate, defensible results.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-5 bg-green-50 rounded-xl border border-green-100 shadow-sm">
                      <Leaf className="text-green-600 mb-2" size={32} />
                      <h4 className="font-bold text-green-900">Comprehensive Testing</h4>
                      <p className="text-xs text-green-800">Multiple pollutant categories assessed for complete indoor air quality characterization.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-5 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                      <ShieldAlert className="text-amber-600 mb-2" size={32} />
                      <h4 className="font-bold text-amber-900">Health Protection</h4>
                      <p className="text-xs text-amber-800">Results interpreted against Health Canada guidelines with actionable improvement recommendations.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Volatile Organic Compounds (VOCs): Chemical Off-Gassing from Modern Materials</h3>
                  <p>
                    <strong>Volatile Organic Compounds (VOCs)</strong> represent one of the most significant chemical threats in modern indoor environments. These carbon-based chemicals evaporate at room temperature from sources including: paints, varnishes, adhesives, cleaning products, air fresheners, cosmetics, building materials (plywood, particleboard), furnishings (carpets, upholstery), and office equipment. Health effects range from immediate symptoms (eye/nose/throat irritation, headaches, nausea) to long-term risks (liver/kidney damage, central nervous system effects, cancer with specific compounds like formaldehyde).
                  </p>
                  <p>
                    Our VOC testing includes: 1) <strong>Total VOC measurements</strong> using photoionization detectors (PID) for immediate screening, 2) <strong>Formaldehyde-specific monitoring</strong> for this particularly hazardous compound common in pressed wood products, 3) <strong>Laboratory GC/MS analysis</strong> for compound identification and quantification, and 4) <strong>Source identification</strong> through material assessment and product inventory. New or renovated homes experience 'off-gassing' where materials release VOCs at higher rates initially, with emissions decreasing over months or years. Our testing helps determine if levels exceed Health Canada residential air quality guidelines and provides specific recommendations for source control, increased ventilation, and appropriate air purification technologies.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Particulate Matter (PM2.5 & PM10): Invisible Particles with Visible Health Effects</h3>
                  <p>
                    <strong>Particulate matter (PM)</strong> refers to microscopic solid or liquid particles suspended in air, categorized by size: PM10 (particles ≤10 microns) and PM2.5 (particles ≤2.5 microns). These particles penetrate deep into respiratory systems, with PM2.5 reaching lung alveoli and potentially entering bloodstream. Sources include: outdoor air infiltration, cooking, smoking, candle burning, fireplaces, dust resuspension, and biological material (pollen, mold fragments, insect debris). Health effects include aggravated asthma, decreased lung function, respiratory symptoms, cardiovascular issues, and premature death in sensitive populations.
                  </p>
                  <p>
                    Our particulate assessment includes: 1) <strong>Real-time laser particle counting</strong> providing size distribution data, 2) <strong>Gravimetric sampling</strong> for mass concentration measurements, 3) <strong>Microscopic analysis</strong> for particle composition identification, and 4) <strong>Source apportionment</strong> through activity correlation and outdoor comparisons. We interpret results against Health Canada residential guidelines (30 µg/m³ for 24-hour PM2.5) and WHO more stringent recommendations (10 µg/m³ annual mean). Recommendations focus on source control (improved cooking ventilation, reducing combustion sources), filtration (HEPA air purifiers, upgraded HVAC filters), and cleaning practices (high-efficiency vacuuming, damp dusting).
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Carbon Dioxide (CO2) & Ventilation Assessment: The Fresh Air Equation</h3>
                  <p>
                    <strong>Carbon dioxide (CO2) levels</strong> serve as an excellent indicator of ventilation adequacy and occupancy density. While CO2 itself becomes directly hazardous only at very high concentrations (above 5,000 ppm), elevated levels (above 1,000 ppm) indicate insufficient fresh air exchange, allowing other pollutants to accumulate. ASHRAE Standard 62.1 recommends maintaining indoor CO2 levels no more than 700 ppm above outdoor concentrations (typically 400-500 ppm outdoors, suggesting 1,100-1,200 ppm maximum indoors).
                  </p>
                  <p>
                    Our ventilation assessment includes: 1) <strong>Continuous CO2 monitoring</strong> throughout occupancy periods, 2) <strong>Air exchange rate calculations</strong> using tracer gas decay methods, 3) <strong>HVAC system evaluation</strong> for fresh air intake functionality, and 4) <strong>Pressure relationship testing</strong> between spaces. We identify common ventilation problems: blocked or closed fresh air intakes, unbalanced HVAC systems, inadequate exhaust ventilation in kitchens/bathrooms, and over-reliance on infiltration rather than mechanical ventilation. Recommendations range from simple behavioral changes (opening windows regularly) to mechanical solutions (installing heat recovery ventilators, upgrading HVAC controls).
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Biological Contaminants: Mold, Allergens, and Microbial Volatile Compounds</h3>
                  <p>
                    <strong>Biological air contaminants</strong> include: mold spores and fragments, bacteria, viruses, pollen, dust mite allergens, pet dander, and insect debris. These contaminants cause allergic reactions, asthma exacerbations, respiratory infections, and in some cases, toxic effects from mycotoxins produced by certain mold species. Microbial volatile organic compounds (mVOCs) from mold and bacteria create characteristic musty odors and may cause irritation even at low concentrations.
                  </p>
                  <p>
                    Our biological assessment includes: 1) <strong>Volumetric air sampling</strong> for mold spore quantification and identification, 2) <strong>Settled dust sampling</strong> for allergen analysis (dust mite, cat, dog, cockroach), 3) <strong>Surface sampling</strong> for mold identification on materials, 4) <strong>Humidity and temperature mapping</strong> to identify microbial growth conditions, and 5) <strong>Moisture assessment</strong> using thermal imaging and moisture meters. We interpret results against established guidelines (IICRC S520 for mold, allergen threshold values for sensitized individuals) and provide targeted remediation recommendations addressing both the biological contaminants and the moisture conditions enabling their growth.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Formaldehyde & Aldehydes: Specific Chemical Hazards in Modern Homes</h3>
                  <p>
                    <strong>Formaldehyde</strong> represents a particularly hazardous VOC classified as a known human carcinogen by Health Canada and IARC. Common sources in homes include: pressed wood products (particleboard, medium-density fiberboard, hardwood plywood), insulation materials (urea-formaldehyde foam insulation), household products (glues, permanent press fabrics, paper products), and combustion sources (cooking, smoking, candles). Health effects include eye/nose/throat irritation, coughing, wheezing, allergic reactions, and cancer with long-term exposure.
                  </p>
                  <p>
                    Our formaldehyde testing uses: 1) <strong>Real-time electrochemical sensors</strong> for immediate screening, 2) <strong>Passive diffusion samplers</strong> for time-weighted average concentrations, 3) <strong>Active sampling with DNPH-coated cartridges</strong> for laboratory HPLC analysis, and 4) <strong>Source identification</strong> through material assessment. We compare results against Health Canada residential guideline of 50 µg/m³ (40 ppb) for long-term exposure. Recommendations include: source removal/replacement, increased ventilation particularly after new material installation, use of formaldehyde-scavenging products, and air purification with substantial activated carbon filtration specifically rated for formaldehyde removal.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Sick Building Syndrome & Building-Related Illness Investigations</h3>
                  <p>
                    <strong>Sick Building Syndrome (SBS)</strong> describes situations where building occupants experience acute health and comfort effects that appear linked to time spent in a building, but no specific illness or cause can be identified. <strong>Building-Related Illness (BRI)</strong> involves diagnosable diseases (like Legionnaires' disease or hypersensitivity pneumonitis) with identifiable causes. Our investigative approach includes: 1) Detailed occupant questionnaires mapping symptoms to locations/times/activities, 2) Comprehensive multi-parameter air quality assessment, 3) HVAC system inspection for contamination and performance issues, 4) Building material and product inventory, and 5) Controlled interventions with before/after testing.
                  </p>
                  <p>
                    Common SBS/BRI causes we identify include: inadequate ventilation (high CO2, stuffiness), chemical contamination (VOCs from new materials or cleaning products), biological contamination (hidden mold, bacteria in HVAC systems), thermal comfort issues (temperature/humidity extremes, drafts), and psychosocial factors (lighting, noise, ergonomics). Our systematic approach helps distinguish between air quality issues and other environmental factors, providing targeted recommendations that actually resolve occupant complaints rather than temporary symptom management.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Commercial & Workplace Air Quality: Regulatory Compliance & Productivity</h3>
                  <p>
                    <strong>Commercial and workplace air quality</strong> involves additional considerations beyond residential testing: regulatory compliance under Occupational Health and Safety Act (OHSA), higher occupant density affecting CO2 and infectious disease transmission, specific industrial processes or office equipment emissions, ASHRAE ventilation standard compliance, productivity and absenteeism concerns, and liability protection for employers. Common workplace air quality issues include: inadequate ventilation for occupancy loads, contamination from printing/copying equipment, microbial growth in HVAC systems, off-gassing from new furniture or finishes, and outdoor air pollution infiltration.
                  </p>
                  <p>
                    Our commercial services include: ventilation system performance testing, indoor air quality management plan development, ongoing monitoring program design, documentation for regulatory compliance, and employee education. We help employers meet their duty of care obligations while creating healthier, more productive work environments. For facilities with specific processes (labs, manufacturing, healthcare), we develop customized assessment protocols addressing unique contaminant profiles and exposure scenarios.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Real Estate Transaction Air Quality Due Diligence</h3>
                  <p>
                    <strong>Air quality testing has become increasingly important in real estate transactions</strong>, particularly for properties with known issues (previous water damage, recent renovations, proximity to industrial sources) or for buyers with health concerns (allergies, asthma, chemical sensitivities). Our pre-purchase air quality assessments provide: 1) Identification of existing air quality issues before purchase, 2) Documentation for negotiation of remediation or price adjustment, 3) Baseline data for future improvements, and 4) Peace of mind for health-conscious buyers.
                  </p>
                  <p>
                    Common findings affecting property transactions include: elevated mold spore counts from undisclosed water damage, formaldehyde emissions from new kitchen cabinets or flooring, inadequate ventilation in energy-efficient homes, and allergen reservoirs from previous occupants' pets. We provide clear documentation suitable for real estate negotiations and can coordinate with remediation professionals for cost estimates during due diligence periods. For new construction, we recommend testing after completion but before occupancy to identify and address off-gassing issues proactively.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Air Purification & Ventilation System Recommendations</h3>
                  <p>
                    Based on test results, we provide specific recommendations for air purification and ventilation improvements: 1) <strong>Air purifier selection</strong> matching technology to identified pollutants (HEPA for particles, activated carbon for gases, UV-C for microbes), 2) <strong>Proper sizing</strong> based on room dimensions and air changes per hour requirements, 3) <strong>Optimal placement</strong> considering air flow patterns and pollutant sources, 4) <strong>Ventilation improvements</strong> from simple window strategies to mechanical system upgrades, 5) <strong>Maintenance schedules</strong> for sustained effectiveness, and 6) <strong>Before/after testing</strong> to verify improvement.
                  </p>
                  <p>
                    We help navigate the confusing air purifier market by recommending specific models with proven performance for your pollutant profile, avoiding ineffective or potentially harmful technologies (ozone generators, inadequate filtration). For ventilation, we calculate required fresh air rates based on occupancy and provide cost-effective solutions ranging from exhaust fan upgrades to heat/energy recovery ventilator installation. Our recommendations always prioritize source control first (eliminating or reducing pollutants at their origin), followed by ventilation improvements (diluting remaining pollutants), with air purification as a supplemental strategy for specific concerns.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Air Quality: Comprehensive Indoor Environmental Assessment</h3>
                  <p>
                    Air quality exists within the broader context of indoor environmental quality, which includes thermal comfort, lighting, acoustics, and ergonomics. Consider integrating air quality testing with complementary services: <Link to="/services/mold-inspection" className="text-primary hover:underline">comprehensive mold assessment</Link> for moisture-related issues, <Link to="/services/radon-testing" className="text-primary hover:underline">radon testing</Link> for cancer risk assessment, <Link to="/services/asbestos-testing" className="text-primary hover:underline">asbestos testing</Link> for pre-1990 properties, or <Link to="/services/thermal-imaging" className="text-primary hover:underline">thermal imaging</Link> for identifying hidden moisture sources and insulation issues affecting air quality.
                  </p>
                  <p>
                    We coordinate these services to provide holistic indoor environmental assessment. Bundling assessments often provides cost savings and ensures all interacting factors are considered in improvement planning, particularly important for addressing complex indoor environmental complaints or creating comprehensive healthy building strategies.
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
                  Air Quality Testing FAQ
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
                    Why Choose ASADS for Air Quality Testing?
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
                      <Link to="/booking">Schedule Air Quality Test</Link>
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
              We provide air quality testing services across the Greater Toronto Area
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
              Don't Guess About the Air You Breathe 90% of Your Time
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Indoor air pollution affects health, comfort, and cognitive function. Professional testing provides the data you need to create a healthier indoor environment for your family or workplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Air Quality Test</Link>
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
