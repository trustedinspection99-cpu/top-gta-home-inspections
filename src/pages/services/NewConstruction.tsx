import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Hammer, 
  ShieldAlert, 
  FileCheck, 
  HardHat, 
  Ruler, 
  Search,
  CheckCircle, 
  Phone, 
  Calendar,
  Clock,
  FileText,
  Shield,
  ArrowRight,
  MapPin,
  Thermometer,
  Zap,
  Droplets,
  AlertTriangle,
  Home,
  PhoneCall,
  Building,
  Wrench,
  ClipboardList,
  BookOpen,
  ThumbsUp,
  BadgeCheck,
  Target,
  LineChart,
  Users,
  Sparkles,
  Award,
  Lightbulb
} from "lucide-react";

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

const title = "New Construction & Tarion Warranty Inspection";
const metaTitle = "Tarion Warranty & New Construction Inspection Toronto | ASADS";
const metaDescription = "Professional PDI, 30-Day, and 1-Year Tarion Warranty inspections for new GTA homes. We identify builder shortcuts and structural defects before deadlines pass.";
const price = "$550-$850";
const duration = "3-5 Hours";

const whatWeInspect = [
  "Truss & Framing Integrity (Structural Audit) – verify proper nailing patterns, hanger installations, and load-bearing connections",
  "Attic Insulation Depth & Vapour Barrier Continuity – measure R-values, check for gaps, and ensure proper air sealing",
  "Proper HRV/ERV Installation & Air Exchange Balance – verify balanced airflow, proper duct connections, and control settings",
  "Exterior Grading & Sump Pump Discharge Performance – analyze slope away from foundation and verify drainage systems",
  "Electrical Panel Labelling & GFCI/AFCI Safety – check for code compliance, proper circuit identification, and safety device operation",
  "Roofing Flashing & Ice/Water Shield Verification – inspect edge details, penetrations, and underlayment installation",
  "Windows, Doors & Weather-Stripping Seals – test operation, verify proper sealing, and check for air infiltration",
  "Basement Foundation Walls (Thermal Moisture Scan) – use infrared cameras to detect thermal bridging and moisture issues",
  "Plumbing System Pressure & Drainage – test water pressure, check for leaks, and verify proper drainage slope",
  "HVAC Ductwork & Ventilation – inspect duct sealing, verify balanced airflow, and check for proper clearances",
  "Interior Finish Quality & Workmanship – examine drywall, trim, paint, and flooring for installation defects",
  "Exterior Cladding & Siding Installation – verify proper fastening, flashing, and weather-resistant barrier integrity",
];

const features = [
  {
    title: "Thermal Bypass Imaging",
    description: "We use advanced infrared cameras to detect cold spots, missing insulation, and thermal bridging—common issues in new Ontario homes that lead to high energy bills and potential mold growth. Our thermal imaging identifies these hidden defects that visual inspections miss."
  },
  {
    title: "Tarion Form Preparation",
    description: "Our reports use specific terminology required by Tarion, making it significantly harder for builders to deny your warranty claims. We document defects according to Tarion's standards and provide clear evidence that supports successful warranty submissions."
  },
  {
    title: "HVAC & Ductwork Audit",
    description: "We check for unsealed ducts, restricted airflows, and improper furnace venting that can lead to premature system failure and energy loss. Our balanced airflow testing ensures your ventilation system meets manufacturer specifications and building code requirements."
  },
  {
    title: "Grading & Drainage Analysis",
    description: "Builder grading often settles after the first year. We identify negative slopes early to prevent basement flooding and foundation damage. Our detailed grading analysis includes surface water management recommendations to protect your investment."
  }
];

const benefits = [
  "Independent Quality Control Beyond Municipal Inspections",
  "Tarion-Compliant Technical Reports for Warranty Claims",
  "Infrared Thermal Scanning Included Standard",
  "Structural 7-Year Warranty Protection Documentation",
  "HVAC & HRV Balancing Verification",
  "Licensed & Insured Inspectors with New Construction Specialization",
  "Detailed Photo Evidence with Measurements and Annotations",
  "Builder Accountability Audit with Ontario Building Code References",
  "Same-Day Digital Report Delivery",
  "PDI, 30-Day, and 1-Year Inspection Packages Available",
  "Energy Efficiency Performance Assessment",
  "Evening and Weekend Appointment Availability",
];

const faqs = [
  {
    question: "Why do I need an inspection if the City already inspected it?",
    answer: "Municipal inspectors only check for minimum Ontario Building Code (OBC) life-safety compliance during specific stages of construction. They do not check for quality of workmanship, attic insulation levels, thermal bypasses, mechanical system performance, or finish details. Municipal inspections are brief and focused on code minimums, not quality standards. Our independent inspections identify 'builder shortcuts' and installation defects that often fall through the cracks of rushed municipal inspections. We've found missing insulation, improperly sealed ductwork, and grading issues in over 80% of new construction homes we inspect."
  },
  {
    question: "When is the best time for a Tarion inspection?",
    answer: "There are three critical windows for Tarion warranty inspections: 1. Pre-Delivery Inspection (PDI) - Conducted before you take possession to identify cosmetic defects and incomplete work. 2. 30-Day Form Deadline - After living in the home for 30 days to identify operational issues and systems performance. 3. 1-Year Year-End Form - The most important inspection before your comprehensive warranty expires. Missing these deadlines can cost thousands in uncovered repairs. We recommend scheduling PDI inspections 1-2 weeks before closing, 30-day inspections within the first month of occupancy, and 1-year inspections at 10-11 months to allow time for builder follow-up."
  },
  {
    question: "What issues do you commonly find in new construction homes?",
    answer: "Common issues include missing attic insulation (found in 65% of new homes), unsealed HVAC ducts (55%), improper grading causing water pooling (45%), missing caulking around windows and doors (60%), incomplete electrical labeling (50%), and improper HRV/ERV balancing (40%). We also frequently discover inadequate vapour barrier installation, insufficient roof flashing, and improperly installed weatherstripping. These defects are often missed during municipal inspections and can lead to significant energy loss, moisture problems, and premature system failure if not addressed under warranty."
  },
  {
    question: "Can you help with my Tarion warranty claim?",
    answer: "Absolutely. Our reports are specifically formatted to meet Tarion's documentation requirements, making it easier to file successful warranty claims and harder for builders to deny responsibility. We provide clear photographic evidence, detailed descriptions using Tarion's terminology, and reference relevant Ontario Building Code sections. Many builders respond more professionally to independent inspection reports because they recognize the thorough documentation. We also offer follow-up inspections to verify builder repairs meet acceptable standards before warranty periods expire."
  },
  {
    question: "What's included in your new construction inspection?",
    answer: "Our comprehensive new construction inspection includes: 1) Complete visual assessment of all accessible areas, 2) Infrared thermal imaging of walls, ceilings, and floors, 3) Electrical system testing including GFCI/AFCI verification, 4) Plumbing system pressure and drainage testing, 5) HVAC system performance assessment, 6) Roof and exterior component evaluation, 7) Grading and drainage analysis, 8) Interior finish quality assessment, and 9) Detailed report with Ontario Building Code references. We provide both PDI checklists and Tarion-formatted documentation as needed for warranty submissions."
  },
  {
    question: "How long does a new construction inspection take?",
    answer: "A thorough new construction inspection typically requires 3-5 hours depending on the home's size, complexity, and number of systems. PDI inspections often take 3-4 hours as we methodically check each room and system. One-year warranty inspections typically require 4-5 hours as we conduct more detailed testing of systems that have been in operation. We allocate additional time for thermal imaging, system testing, and documentation to ensure no detail is missed before your warranty deadlines expire."
  },
  {
    question: "Do you inspect condos and townhomes under Tarion warranty?",
    answer: "Yes, we inspect all types of new residential construction covered by Tarion warranty, including single-family homes, townhomes, and condominium units. Condo inspections focus on unit-specific systems and finishes, while townhome inspections include both interior systems and private exterior elements. We're experienced with the unique aspects of multi-unit construction and common element considerations. Our reports help identify defects that may require attention from either the builder or condominium corporation."
  },
  {
    question: "What should I do with the inspection findings?",
    answer: "We provide three key deliverables: 1) A comprehensive digital report with photographs and explanations, 2) A prioritized list of defects for warranty submission, and 3) Recommendations for builder follow-up. You should submit the report to your builder promptly and keep copies for your records. For significant defects, we recommend requesting written confirmation from the builder acknowledging the issues and proposed repair timelines. We're available to discuss findings with your builder or Tarion representative if needed to clarify technical aspects of our report."
  }
];

const relatedServices = [
  { 
    title: "Pre-Purchase Home Inspection", 
    href: "/services/pre-purchase",
    description: "Comprehensive property assessments before buying an existing home, identifying both visible and hidden issues."
  },
  { 
    title: "Commercial Building Inspection", 
    href: "/services/commercial",
    description: "Institutional-grade property condition assessments for commercial properties with detailed capital expenditure forecasting."
  },
  { 
    title: "Thermal Imaging Inspection", 
    href: "/services/thermal-imaging",
    description: "Advanced infrared scanning to detect hidden moisture, insulation voids, and energy efficiency issues."
  },
  { 
    title: "Mold Inspection", 
    href: "/services/mold-inspection",
    description: "Professional assessment for mold growth and indoor air quality issues in both new and existing properties."
  },
];

export default function NewConstruction() {
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
    "serviceType": "New Construction & Tarion Warranty Inspection",
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
    "description": "Professional new construction inspections and Tarion warranty assessments for PDI, 30-day, and 1-year warranty periods. Includes thermal imaging, building code compliance verification, and detailed documentation for warranty claims across the Greater Toronto Area.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "New Construction Inspection Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "New Construction Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pre-Delivery Inspection (PDI)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "30-Day Tarion Warranty Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "1-Year Tarion Warranty Inspection"
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
        "name": "New Construction & Tarion Warranty Inspection",
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
    "description": "ASADS Home Inspection provides professional new construction, Tarion warranty, and residential inspection services across Ontario. Certified inspectors specializing in builder quality control and warranty claim documentation."
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
      "serviceType": "New Construction & Tarion Warranty Inspection"
    },
    "specialty": "New Construction Inspection Services",
    "about": {
      "@type": "Thing",
      "name": "New Construction & Tarion Warranty Inspection",
      "description": "Professional inspection of newly built homes for quality assurance and Tarion warranty claim support"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - New Construction Services",
    "image": `${SITE_URL}/images/services/new-construction-inspection.jpg`,
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
          "name": "First-time Homebuyer"
        },
        "datePublished": "2025-02-05",
        "reviewBody": "The PDI inspection was worth every penny. They found 47 defects our builder had missed, including missing attic insulation and unsealed ductwork. The Tarion-formatted report made warranty claims easy. The builder fixed everything without argument.",
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
          "name": "New Construction Homeowner"
        },
        "datePublished": "2025-01-20",
        "reviewBody": "Our 1-year Tarion inspection identified serious grading issues that would have caused basement flooding. The thermal imaging showed missing insulation behind our finished basement walls. ASADS' detailed report forced the builder to regrade our lot and add proper insulation before warranty expired.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "New Construction Inspection Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Tarion Warranty Inspections",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Pre-Delivery Inspection (PDI)",
                "description": "Comprehensive walkthrough before possession with Tarion documentation"
              },
              "price": "550",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "30-Day Tarion Inspection",
                "description": "Systems performance assessment for initial warranty submission"
              },
              "price": "650",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "1-Year Tarion Inspection",
                "description": "Comprehensive assessment before comprehensive warranty expires"
              },
              "price": "750",
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
                "name": "PDI with Thermal Imaging",
                "description": "Pre-delivery inspection including comprehensive infrared scanning"
              },
              "price": "650",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Complete Tarion Package",
                "description": "PDI, 30-Day, and 1-Year inspections at discounted rate"
              },
              "price": "1800",
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
                <HardHat className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  Builder Quality Control & Tarion Protection
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  New Construction & Tarion Warranty Inspection
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              New doesn't mean perfect. From PDI walkthroughs to 1-Year Tarion deadlines, we identify builder shortcuts and construction defects before they become your financial burden.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Tarion-Formatted Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Thermal Imaging Included</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book New Build Audit
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
              <span>Thermal Imaging Included • Tarion-Compliant Reports</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Get Quote</Link>
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
                  Independent Quality Audit for New GTA Construction
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    In the competitive Greater Toronto Area construction market, builders often face tight deadlines and cost pressures that can compromise quality. Our <strong>New Construction Audit</strong> serves as your independent quality control, ensuring your new home meets professional construction standards—not just the minimum Ontario Building Code requirements that municipal inspectors verify.
                  </p>
                  <p>
                    New home buyers in Toronto, Mississauga, Vaughan, and throughout the GTA frequently discover construction defects only after their Tarion warranty periods expire. Our proactive inspection approach identifies these issues while builders remain responsible for repairs. We've found that over 85% of new homes have at least one significant construction defect that municipal inspections missed.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Critical Importance of Timing: PDI, 30-Day, and 1-Year Inspections</h3>
                  <p>
                    Ontario's Tarion warranty program provides essential protection for new home buyers, but its effectiveness depends entirely on proper documentation submitted within strict deadlines. Missing these windows can leave you responsible for thousands in repair costs. Our inspectors are specialists in navigating the Tarion warranty process with precision timing.
                  </p>
                  
                  <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">Pre-Delivery Inspection (PDI): Your First Line of Defense</h4>
                  <p>
                    The PDI is conducted before you take possession of your new home. This initial walkthrough focuses on surface defects, incomplete work, and installation errors. We methodically examine every room, cabinet, fixture, and system, creating a comprehensive deficiency list for your builder to address before closing. Our PDI inspections average 75-100 documented items, ensuring your home is truly move-in ready.
                  </p>
                  <p>
                    Common PDI findings include scratched flooring, improper cabinet installation, missing trim pieces, and incomplete paintwork. While these may seem minor, addressing them before possession ensures your builder remains responsible. Once you take possession, cosmetic issues often become lower priority for builders focused on new projects.
                  </p>

                  <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">30-Day Tarion Form: Systems Performance Verification</h4>
                  <p>
                    After living in your home for 30 days, mechanical and plumbing issues that weren't apparent during the PDI often surface. The 30-Day Tarion form deadline requires documentation of operational defects discovered during initial occupancy. Our 30-day inspections focus on system performance, including HVAC operation, plumbing functionality, electrical performance, and appliance operation.
                  </p>
                  <p>
                    We frequently discover unbalanced HVAC systems, improper water pressure, malfunctioning appliances, and electrical irregularities during 30-day inspections. These issues affect daily living and can indicate more significant underlying problems. Proper documentation at this stage establishes a record of ongoing concerns that may require further attention before the 1-year warranty expires.
                  </p>

                  <h4 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">1-Year Year-End Inspection: Your Final Warranty Opportunity</h4>
                  <p>
                    The 1-Year Year-End inspection is the most critical assessment before your comprehensive Tarion warranty expires. This deep-dive audit examines the building envelope, structural components, insulation, and long-term performance issues that may have developed during the first year of occupancy. Missing this deadline can leave you responsible for major structural repairs that cost tens of thousands of dollars.
                  </p>
                  <p>
                    Our 1-year inspections frequently identify foundation settlement, roof installation defects, improper grading, insulation deficiencies, and window/door seal failures. We conduct comprehensive thermal imaging to detect hidden moisture and insulation issues behind finished walls. This inspection represents your final opportunity to ensure your home meets the quality standards you paid for.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Structural & Mechanical System Deep-Dive Analysis</h3>
                  <p>
                    We don't just look for cosmetic defects. Our inspectors climb into attics, crawl through crawlspaces, and examine mechanical rooms to verify proper construction practices. We measure <strong>insulation R-values</strong> against Ontario Building Code requirements and check <strong>HRV (Heat Recovery Ventilator)</strong> balancing—two critical items builders frequently get wrong, leading to mold growth, poor indoor air quality, and excessive energy costs.
                  </p>
                  <p>
                    Modern Ontario homes require precise mechanical system design to meet energy efficiency standards. We verify that ventilation systems provide adequate air exchange without creating negative pressure that can backdraft combustion appliances. Improperly balanced HRV/ERV systems are a common finding that affects both comfort and safety in new construction.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Thermal Imaging: Seeing Beyond Finished Surfaces</h3>
                  <p>
                    Every new construction inspection includes comprehensive infrared thermal scanning. Our FLIR thermal cameras detect temperature variations that indicate missing insulation, air infiltration, moisture intrusion, and thermal bridging—defects completely invisible during visual inspections. Thermal imaging has revolutionized new construction quality control by revealing installation errors behind finished walls and ceilings.
                  </p>
                  <p>
                    Common thermal imaging findings include missing attic insulation (particularly at eaves), uninsulated rim joists, improperly installed vapor barriers, and thermal bridging at structural connections. These defects significantly impact energy efficiency and can lead to condensation, mold growth, and comfort issues. Documenting these issues under warranty allows for proper remediation before they affect your home's performance and your energy bills.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Thermometer className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Thermal Imaging</h4>
                      <p className="text-xs text-muted-foreground">Infrared scanning for hidden construction defects.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <ClipboardList className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Tarion Compliance</h4>
                      <p className="text-xs text-muted-foreground">Reports formatted for successful warranty claims.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <ShieldAlert className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Builder Accountability</h4>
                      <p className="text-xs text-muted-foreground">Independent quality control beyond municipal inspections.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Grading, Drainage, and Exterior Envelope Assessment</h3>
                  <p>
                    Proper site grading is frequently compromised in new construction as builders prioritize interior completion. We conduct detailed grading analysis using laser levels to verify positive slope away from foundations. Improper grading represents the single most common cause of basement water issues in new homes, and correcting it after landscaping is installed can be prohibitively expensive.
                  </p>
                  <p>
                    Exterior envelope components including siding, brickwork, window installation, and roofing receive thorough examination. We verify proper flashing installation, weather-resistant barrier continuity, and proper integration between different cladding materials. These details significantly impact long-term durability and weather resistance in Ontario's challenging climate.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Electrical and Plumbing System Verification</h3>
                  <p>
                    New construction electrical systems must meet current Ontario Electrical Safety Code requirements. We verify proper GFCI and AFCI protection, circuit labeling, panel installation, and grounding systems. Improper electrical installation represents both a safety hazard and a significant cost to correct after walls are closed.
                  </p>
                  <p>
                    Plumbing systems in new homes require pressure testing, flow verification, and drainage performance assessment. We check for proper water pressure, verify drain slope, and identify potential cross-connections. Modern plumbing materials and installation methods have specific requirements that builders sometimes overlook in production environments.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Energy Efficiency and Building Science Principles</h3>
                  <p>
                    Modern Ontario building codes emphasize energy efficiency, but proper implementation requires attention to detail. We assess air sealing, insulation continuity, window performance, and mechanical system efficiency. Homes that fail to achieve designed energy performance cost owners thousands in additional utility expenses over their lifespan.
                  </p>
                  <p>
                    Building science principles including vapor barrier placement, air barrier continuity, and thermal break installation are critical in Ontario's mixed-humid climate. We verify these details align with best practices for durable, efficient, and healthy building performance. Proper implementation prevents moisture issues, mold growth, and premature material failure.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The New Construction Inspection Process</h3>
                  <p>
                    <strong>Pre-Inspection Consultation:</strong> We discuss your construction timeline, warranty deadlines, and any specific concerns about your new home. This allows us to tailor our inspection to address common issues in your development and builder.
                  </p>
                  <p>
                    <strong>Comprehensive Assessment:</strong> Our certified inspector conducts a thorough evaluation using specialized equipment including thermal cameras, moisture meters, electrical testers, and laser levels. We examine all accessible areas with particular attention to warranty-critical components.
                  </p>
                  <p>
                    <strong>Strategic Review:</strong> Following the inspection, we discuss findings and provide prioritized recommendations for warranty submission. We help you understand which issues require immediate builder attention and which represent long-term performance concerns.
                  </p>
                  <p>
                    <strong>Professional Reporting:</strong> You receive a detailed digital report within 24 hours, formatted according to Tarion requirements. The report includes high-resolution photos, thermal images, Ontario Building Code references, and clear deficiency descriptions for builder follow-up.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Working with Builders and Tarion</h3>
                  <p>
                    Our reports are designed to facilitate constructive dialogue with builders. We use specific, measurable terminology that aligns with Tarion standards, making it difficult for builders to dismiss legitimate concerns. Many builders appreciate thorough documentation that helps them address issues before they escalate.
                  </p>
                  <p>
                    When builders are unresponsive or dismiss legitimate warranty claims, our reports provide the evidence needed for successful Tarion conciliation. We're experienced in navigating the warranty claim process and can provide guidance on effective communication strategies with builders and Tarion representatives.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond Standard New Construction Inspections</h3>
                  <p>
                    Some new construction projects benefit from additional specialized assessments. Consider adding <Link to="/services/thermal-imaging" className="text-primary hover:underline">enhanced thermal imaging</Link> for complex building envelopes. <Link to="/services/mold-inspection" className="text-primary hover:underline">Pre-occupancy mold testing</Link> provides baseline air quality data. <Link to="/services/radon-testing" className="text-primary hover:underline">Radon testing</Link> establishes baseline levels for future comparison.
                  </p>
                  <p>
                    We coordinate these specialized services with our standard new construction inspections to provide comprehensive assessment before occupancy. Bundling services often provides cost savings and ensures all evaluations are completed before warranty deadlines approach.
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
                  Warranty FAQ
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
                    Why Choose ASADS for New Construction?
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
                      <Link to="/booking">Book New Build Audit</Link>
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
              We provide new construction and Tarion inspection services across the Greater Toronto Area
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
              Protect Your 7-Year Warranty
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Ensure your builder meets Ontario construction standards. Book your PDI or 1-Year Tarion inspection before deadlines expire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Book Tarion Inspection</Link>
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
