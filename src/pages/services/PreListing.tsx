import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import { 
  Home,
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
  TrendingUp,
  Scale,
  Zap,
  Droplets,
  HardHat,
  Search,
  DollarSign,
  ShieldCheck,
  LineChart,
  Target,
  Building,
  Users
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

const title = "Pre-Listing Home Inspection";
const metaTitle = "Pre-Listing Home Inspection Ontario | Sell for More | ASADS";
const metaDescription = "Maximize your GTA home sale price with a professional Pre-Listing Audit. Identify defects early, provide accurate SPIS disclosures, and secure firm offers. Same-day reports.";
const price = "$350-$600";
const duration = "2-4 Hours";

const whatWeInspect = [
  "Structural Foundation & Support Beams",
  "Roof Shingles, Flashing & Attic Health",
  "Main Supply Plumbing & Drainage Lines",
  "Electrical Panel Capacity & Safety Wiring",
  "HVAC System Longevity & Efficiency",
  "Basement Moisture & Envelope Integrity",
  "Exterior Grading & Water Diversion",
  "Interior Safety & Disclosure Items",
];

const features = [
  {
    title: "The Disclosure Shield",
    description: "Our technical audit provides the data required for an accurate SPIS (Seller Property Information Statement), reducing post-sale liability and providing legal protection against future claims."
  },
  {
    title: "Infrared Moisture Scans",
    description: "Every pre-listing audit includes comprehensive thermal imaging to find hidden leaks, insulation voids, and moisture intrusion before the buyer's inspector discovers them."
  },
  {
    title: "Equity Protection Strategy",
    description: "Identify high-ROI repairs you can address affordably before listing, preventing buyer demands for costly credits or price reductions during negotiations."
  },
  {
    title: "Marketing-Ready Reports",
    description: "Receive a professional, high-resolution digital report with clear photos and explanations that builds buyer confidence and demonstrates full transparency."
  }
];

const benefits = [
  "Maximize Resale Value",
  "Facilitate Unconditional Offers",
  "Full SPIS Disclosure Data",
  "Infrared Thermal Scanning",
  "Detailed Photo Documentation",
  "Licensed & Insured Inspectors",
  "24/7 Seller Technical Support",
  "Flexible Listing Schedule",
];

const faqs = [
  {
    question: "Why should I get an inspection before listing my home?",
    answer: "A pre-listing inspection puts you in the driver's seat. Instead of a buyer's inspector finding a major issue and using it to kill the deal or demand a $10,000 credit, you find it first. You can then fix it on your own budget or price the home accordingly, which encourages firm, unconditional offers. This proactive approach eliminates surprises and creates a competitive advantage in the GTA real estate market."
  },
  {
    question: "Do I have to fix everything found in the report?",
    answer: "Absolutely not. We categorize findings into 'Safety Hazards,' 'Major Defects,' and 'Maintenance Items.' You can choose to address safety issues and major defects while simply disclosing maintenance items. This transparency builds buyer confidence and prevents the 'fear of the unknown' that stalls sales. Our reports help you prioritize repairs based on impact and cost-effectiveness."
  },
  {
    question: "How does this report help with my legal liability?",
    answer: "In Ontario, sellers are legally obligated to disclose latent defects they are aware of. An ASADS Pre-Listing Audit provides a professional technical record that demonstrates due diligence. By providing this report to buyers, you demonstrate full transparency, which acts as a legal shield against future claims of non-disclosure. This documentation is especially valuable for completing the Seller Property Information Statement accurately."
  },
  {
    question: "Will buyers still want their own inspection?",
    answer: "In many cases, buyers will still want their own inspection. However, when you provide an ASADS report upfront—complete with infrared scans and high-resolution photos—many buyers feel comfortable enough to submit firm offers or rely on your report, especially in competitive GTA markets. Some buyers may opt for a limited review inspection rather than a full assessment, saving time and moving your sale forward faster."
  },
  {
    question: "Does the report include a repair estimate?",
    answer: "As third-party neutral inspectors, we do not provide cost estimates to avoid conflicts of interest. However, we clearly explain the severity of each issue, which helps you obtain accurate quotes from contractors before the house hits the market. We categorize repairs by priority and complexity, making it easy to get competitive bids from qualified professionals."
  },
  {
    question: "What if the inspection finds a serious structural issue?",
    answer: "Finding it now is much better than discovering it while you're under contract. You can hire a structural engineer to provide a remediation plan, which you can show to buyers as 'work already assessed and managed.' This preserves your sale price better than a last-minute discovery. Many sellers address major issues before listing to eliminate negotiation points and demonstrate responsible ownership."
  }
];

const relatedServices = [
  { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
  { title: "Mold & Air Quality Audit", href: "/services/mold-inspection" },
  { title: "Thermal Imaging Scan", href: "/services/thermal-imaging" },
  { title: "Commercial Building Audit", href: "/services/commercial" },
];

export default function PreListing() {
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
    "serviceType": "Pre-Listing Home Inspection",
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
    "description": "Professional pre-listing home inspections designed to maximize sale price, reduce negotiation risks, and provide accurate SPIS disclosure data. Includes thermal imaging, detailed reporting, and strategic repair recommendations for sellers.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": price
    },
    "category": "Home Inspection Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pre-Listing Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Pre-Listing Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enhanced Pre-Listing Package"
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
        "name": "Pre-Listing Home Inspection",
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
    "description": "ASADS Home Inspection provides professional pre-listing, pre-purchase, and specialized inspection services across Ontario. Certified inspectors helping sellers maximize property value and protect against post-sale liability."
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
      "serviceType": "Pre-Listing Home Inspection"
    },
    "specialty": "Home Inspection Services",
    "about": {
      "@type": "Thing",
      "name": "Pre-Listing Home Inspection",
      "description": "Professional property evaluation before real estate listing to maximize sale price and reduce negotiation risks"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Pre-Listing Services",
    "image": `${SITE_URL}/images/services/pre-listing-inspection.jpg`,
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
          "name": "Home Seller in Toronto"
        },
        "datePublished": "2025-01-22",
        "reviewBody": "The pre-listing inspection was invaluable. They found a hidden plumbing leak that we fixed before listing. The comprehensive report gave buyers confidence and we received multiple firm offers. Definitely increased our sale price.",
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
          "name": "Property Investor"
        },
        "datePublished": "2025-01-15",
        "reviewBody": "As someone who sells multiple properties a year, ASADS pre-listing inspections are essential. Their thermal imaging catches issues buyers would otherwise use to negotiate thousands off. Professional reports make properties more marketable.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pre-Listing Inspection Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Standard Pre-Listing",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard Pre-Listing Inspection (up to 2000 sq ft)",
                "description": "Comprehensive evaluation with thermal imaging and SPIS compliance data"
              },
              "price": "450",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Large Home Pre-Listing (2000-3500 sq ft)",
                "description": "Extended inspection for larger properties with detailed reporting"
              },
              "price": "550",
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
                "name": "Pre-Listing with Sewer Scope",
                "description": "Standard inspection plus video sewer line inspection"
              },
              "price": "650",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Executive Pre-Listing Package",
                "description": "Complete inspection with all add-ons for premium properties"
              },
              "price": "750",
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
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  Equity Protection Audit
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Pre-Listing Home Inspection
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Don't let a buyer's inspector control your price. Our Pre-Listing Audit identifies "deal-breakers" early, allowing you to control the narrative and secure higher offers.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Marketing-Ready Report</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>SPIS Compliance</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Listing Audit
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
              <span>Thermal Imaging Included • Fast 24Hr Delivery</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Get Started</Link>
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
                  Strategic Value of Pre-Listing Audits
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    In the competitive Greater Toronto Area real estate market, a <strong>Pre-Listing Home Inspection</strong> is the ultimate offensive tool. By commissioning a technical audit before your property hits the MLS, you eliminate the "fear of the unknown" that often derails deals during the buyer's conditional period. This proactive approach gives you control over negotiations and helps maximize your sale price.
                  </p>
                  <p>
                    Smart sellers understand that transparency builds buyer confidence. When you provide a professional inspection report upfront, buyers perceive your property as well-maintained and honestly represented. This perception can translate into higher offers, fewer conditions, and faster closings in markets across Toronto, Mississauga, Vaughan, and throughout the GTA.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Foundation & Structural Integrity Assessment</h3>
                  <p>
                    Our audit includes a rigorous evaluation of your foundation's load-bearing capacity. We identify signs of <strong>hydrostatic pressure</strong>, lateral basement wall displacement, and structural settlement. Addressing minor cracks or moisture seepage now prevents a buyer's inspector from characterizing them as catastrophic structural failures later. Many sellers choose to address foundation issues proactively to eliminate negotiation points.
                  </p>
                  <p>
                    Basement waterproofing systems, sump pumps, and drainage tiles receive careful examination. Properly functioning basement systems protect against water damage and mold growth—two common deal-breakers in Ontario real estate transactions. Documenting these systems' condition provides valuable assurance to potential buyers.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Electrical Safety & SPIS Compliance</h3>
                  <p>
                    Electrical issues are the leading cause of failed inspections in Ontario. We audit your service panel for <strong>double-tapped breakers</strong>, undersized wiring, and hazardous brands like Zinsco or Federal Pacific. Knowing these facts allows you to complete your Seller Property Information Statement (SPIS) with 100% accuracy, providing a legal shield against post-sale litigation.
                  </p>
                  <p>
                    Ground fault circuit interrupters (GFCIs) and arc fault circuit interrupters (AFCIs) are critical safety devices required by current electrical codes. We verify proper installation and operation of these devices in kitchens, bathrooms, and bedrooms. Upgrading missing or non-functional safety devices before listing demonstrates your commitment to property safety and reduces buyer concerns.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Plumbing & Thermal Moisture Scanning</h3>
                  <p>
                    Hidden leaks are "silent deal killers." We utilize high-sensitivity <strong>Infrared Thermal Imaging</strong> to scan behind finished basement walls and ceilings. This identifies latent moisture issues from aging Polybutylene or Kitec plumbing before they become an expensive negotiation point for the buyer. Thermal imaging also detects insulation deficiencies that affect energy efficiency—a growing concern for environmentally conscious buyers.
                  </p>
                  <p>
                    Water heater age and condition significantly impact buyer perceptions. We document the manufacturer's date, assess remaining useful life, and verify proper safety valve operation. Replacing an aging water heater before listing often yields positive returns by eliminating a common buyer objection.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Attic, Roof & Building Envelope</h3>
                  <p>
                    We evaluate your roof's remaining service life, identifying damaged flashing and inadequate <strong>attic ventilation</strong> that leads to ice damming and mold growth. Ensuring your building envelope is sound allows you to market your home as "maintenance-free," a high-value selling point in the Toronto market. Proper attic insulation and ventilation also contribute to energy efficiency—an increasingly important factor for buyers.
                  </p>
                  <p>
                    Exterior components including siding, trim, windows, and doors receive thorough examination. We identify moisture intrusion points, deterioration, and maintenance needs that could become negotiation points. Addressing these issues before listing enhances curb appeal and demonstrates meticulous property care.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Thermometer className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Thermal Imaging</h4>
                      <p className="text-xs text-muted-foreground">Hidden moisture and insulation scanning.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Scale className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">SPIS Compliance</h4>
                      <p className="text-xs text-muted-foreground">Accurate disclosure documentation.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <LineChart className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Value Maximization</h4>
                      <p className="text-xs text-muted-foreground">Strategic repair recommendations.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Pre-Listing Inspection Process</h3>
                  <p>
                    <strong>Initial Consultation:</strong> We discuss your property specifics, any known issues, and your selling timeline. This allows us to tailor our inspection to address common concerns in your neighborhood and property type.
                  </p>
                  <p>
                    <strong>Comprehensive Assessment:</strong> Our certified inspector conducts a thorough evaluation using specialized equipment including thermal cameras, moisture meters, and electrical testers. We examine all accessible areas from roof to foundation.
                  </p>
                  <p>
                    <strong>Strategic Review:</strong> Following the inspection, we discuss findings and provide recommendations categorized by priority. We help you understand which issues require immediate attention and which can be disclosed as-is.
                  </p>
                  <p>
                    <strong>Professional Reporting:</strong> You receive a detailed digital report within 24 hours, complete with high-resolution photos, clear explanations, and maintenance recommendations. This report becomes a powerful marketing tool and liability protection document.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">When to Schedule Your Pre-Listing Inspection</h3>
                  <p>
                    Schedule your pre-listing inspection 2-4 weeks before your planned listing date. This provides adequate time to address any issues identified and obtain contractor quotes if repairs are needed. Avoid scheduling too close to your listing date, as this can create unnecessary pressure and limit your options.
                  </p>
                  <p>
                    For sellers planning renovations before listing, consider scheduling the inspection after major work is completed but before final staging. This ensures renovated systems receive proper evaluation and any installation issues can be addressed before showings begin.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond the Standard Pre-Listing Inspection</h3>
                  <p>
                    Some properties benefit from additional specialized assessments. Consider adding a <Link to="/services/sewer-scope" className="text-primary hover:underline">sewer scope inspection</Link> for older homes to identify potential drainage issues. <Link to="/services/mold-inspection" className="text-primary hover:underline">Mold testing</Link> provides peace of mind in properties with moisture history. <Link to="/services/radon-testing" className="text-primary hover:underline">Radon testing</Link> addresses growing buyer concerns about indoor air quality in certain Ontario regions.
                  </p>
                  <p>
                    We coordinate these specialized services with our standard pre-listing inspection to provide comprehensive property assessment. Bundling services often provides cost savings and ensures all evaluations are completed before your property hits the market.
                  </p>
                </div>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What's Included
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
                  Seller FAQ
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
                    Why Pre-List with ASADS?
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
                      <Link to="/booking">Book Your Audit</Link>
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
                    Add-On Services
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
              Seller Audits Available GTA-Wide
            </h2>
            <p className="text-muted-foreground">
              We provide pre-listing inspection services across the Greater Toronto Area
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
              Ready to Protect Your Equity?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Secure your sale price and prevent last-minute negotiations with a professional Pre-Listing Audit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Book Your Audit Now</Link>
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
