import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import {
  Building,
  Thermometer,
  Droplets,
  ShieldCheck,
  CheckCircle,
  Phone,
  Clock,
  AlertTriangle,
  FileText,
  Shield,
  Calendar,
  ArrowRight,
  MapPin,
  Home,
  Wrench,
  Zap,
  Wind
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

const title = "Condo & Townhome Inspection";
const metaTitle = "Condo & Townhome Inspection Toronto | Kitec, Fan Coil & HVAC Specialists | ASADS";
const metaDescription = "Certified condo & townhome inspections in Toronto and the GTA. We identify Kitec plumbing, fan coil failures, moisture intrusion, and in-suite liabilities before you buy.";
const price = "$350+";
const duration = "1.5 – 2.5 Hours";

const whatWeInspect = [
  "In-suite plumbing supply and drain systems",
  "Kitec & Poly-B plumbing identification",
  "Fan coil / heat pump operation and drainage",
  "Electrical panel, breakers & load issues",
  "Appliance safety and functional lifespan",
  "Bathroom and laundry moisture intrusion",
  "Ceiling moisture from unit-above leaks",
  "Window wall seals & thermal performance",
  "Balcony floor, guardrail & door thresholds",
  "Dryer vents and exhaust ducting",
  "Smoke, CO detectors & life-safety items",
  "Owner-responsibility vs HOA responsibility mapping"
];

const features = [
  {
    title: "Kitec Plumbing Specialists",
    description: "Expert identification of recalled Kitec plumbing systems common in Toronto condos built between 1995-2007. We document presence for insurance and replacement planning."
  },
  {
    title: "Thermal Imaging Standard",
    description: "Included thermal scanning detects hidden moisture from unit-above leaks, failing window seals, and condensation issues that visual inspections miss."
  },
  {
    title: "HVAC & Fan Coil Evaluation",
    description: "Comprehensive assessment of in-suite heating and cooling systems including condensate drainage, air handler operation, and maintenance needs."
  },
  {
    title: "Same-Day Digital Reports",
    description: "Receive your comprehensive inspection report within hours of completion, complete with photos, findings, and maintenance recommendations."
  }
];

const benefits = [
  "Avoid hidden in-suite repair costs",
  "Identify recalled Kitec plumbing early",
  "Reduce insurance and financing risk",
  "Protect against unit-to-unit liability",
  "Same-day digital inspection reports",
  "Licensed & Certified Master Inspector",
  "Toronto condo specialist experience",
  "Evening & weekend availability"
];

const faqs = [
  {
    question: "How is a condo inspection different from a house inspection?",
    answer: "A condo inspection focuses entirely on in-suite systems you are legally responsible for. Unlike a house, the roof, foundation, and main structure are excluded — but plumbing, electrical, HVAC, moisture, and balconies can still cost tens of thousands if they fail. Our condo inspections specifically target unit-specific liabilities that aren't covered by the condominium corporation's master insurance policy or Status Certificate."
  },
  {
    question: "Do you check for Kitec plumbing in condos?",
    answer: "Yes. Kitec plumbing is one of the biggest insurance red flags in Toronto condos built between 1995–2007. We visually identify it and document its presence so buyers can negotiate or plan replacement. Many insurers now require Kitec replacement before issuing coverage, making early identification critical for financing and insurance approval."
  },
  {
    question: "Is thermal imaging included?",
    answer: "Yes. Thermal imaging is essential for condos and is included in our standard condo inspection. It allows us to detect moisture from leaking units above, failing window seals, and hidden condensation inside walls and ceilings. These issues are often invisible during visual inspections but can lead to mold growth and structural damage if left undetected."
  },
  {
    question: "Does the condo corporation inspection replace this?",
    answer: "No. A Status Certificate and building inspection do not evaluate your unit's plumbing joints, fan coil condition, electrical panel, or moisture damage. Those liabilities belong to the owner. The Status Certificate only covers common elements and corporation finances, not the condition of your specific unit's systems and components."
  },
  {
    question: "How much does a condo inspection cost?",
    answer: "Pricing depends on unit size, HVAC type, and inspection complexity. Standard condo inspections start at $350 for studio and one-bedroom units, with larger units and townhomes priced accordingly. Contact ASADS at (647) 801-9311 for an exact quote based on your specific property details."
  },
  {
    question: "What should I do if Kitec plumbing is found?",
    answer: "If Kitec is identified, we recommend obtaining quotes for replacement and negotiating with the seller. Many buyers request a price reduction or direct replacement before closing. We also advise contacting your insurance provider immediately, as most require Kitec replacement within 30-60 days of policy issuance."
  }
];

const relatedServices = [
  { title: "Thermal Imaging", href: "/services/thermal-imaging" },
  { title: "Kitec Plumbing Inspection", href: "/services/kitec-plumbing-inspection" },
  { title: "Mold Inspection", href: "/services/mold-inspection" },
  { title: "HVAC System Inspection", href: "/services/hvac-inspection" },
];

export default function CondoInspection() {
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
    "serviceType": "Condo & Townhome Inspection",
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
    "description": "Professional condo and townhome inspections focusing on in-suite liabilities including Kitec plumbing identification, HVAC system evaluation, moisture intrusion detection, and electrical safety assessment. Includes thermal imaging to identify hidden moisture issues between units.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": "$350+"
    },
    "category": "Condominium Inspection Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Condominium Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Condo Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Townhome Inspection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Condo Inspection with Kitec Assessment"
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
        "name": "Condo & Townhome Inspection",
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
    "description": "ASADS Home Inspection provides professional condo, townhome, and residential inspection services across Ontario. Certified inspectors specializing in Kitec plumbing identification, HVAC system evaluation, and thermal imaging for moisture detection."
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
      "serviceType": "Condo & Townhome Inspection"
    },
    "specialty": "Condominium Inspection Services",
    "about": {
      "@type": "Thing",
      "name": "Condo & Townhome Inspection",
      "description": "Professional inspection of condominium units and townhomes focusing on in-suite systems and liability assessment"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Condo & Townhome Services",
    "image": `${SITE_URL}/images/services/condo-inspection.jpg`,
    "priceRange": "$350+",
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
          "name": "First-time Condo Buyer"
        },
        "datePublished": "2025-01-25",
        "reviewBody": "Excellent condo inspection service. The inspector found Kitec plumbing that the seller didn't disclose. The thermal imaging also revealed moisture in the ceiling from a leak in the unit above. This information saved us from major repair costs.",
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
          "name": "Townhome Owner"
        },
        "datePublished": "2025-01-18",
        "reviewBody": "Very thorough townhome inspection. The fan coil system assessment was particularly helpful - they identified a clogged condensate drain that would have caused water damage. Same-day report was detailed with clear photos and explanations.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Condo & Townhome Inspection Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Condo Inspections",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Studio/1 Bedroom Condo",
                "description": "Comprehensive inspection including thermal imaging and Kitec assessment"
              },
              "price": "350",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "2 Bedroom Condo",
                "description": "Extended inspection for larger condominium units"
              },
              "price": "425",
              "priceCurrency": "CAD"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Townhome Inspections",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard Townhome",
                "description": "Complete inspection of interior systems and private exterior elements"
              },
              "price": "475",
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Large Townhome",
                "description": "Extended inspection for multi-level townhomes with private yards"
              },
              "price": "550",
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
                <Building className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  ASADS Condo & Townhome Inspection Services
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Condo & Townhome Inspection
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Condo ownership comes with hidden in-suite liabilities. We identify plumbing failures, HVAC risks, moisture intrusion, and safety issues before they become expensive surprises.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Same-Day Report</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Kitec Plumbing Audit</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Condo Inspection
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
              <span>Thermal imaging included • Kitec assessment</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Get Instant Quote</Link>
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
                  Understanding Condo & Townhome Liability in Ontario
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    In Ontario, condo ownership typically ends at the drywall. While the condominium corporation maintains common elements, the systems hidden behind your walls — plumbing joints, electrical panels, fan coils, and moisture damage — are the unit owner's responsibility. These in-suite liabilities can cost thousands to repair and aren't covered by the building's master insurance policy.
                  </p>
                  <p>
                    Buyers often assume the Status Certificate protects them from defects. In reality, it does not evaluate in-suite conditions. Our condo inspection focuses exclusively on the systems that can trigger insurance claims, special assessments, or personal liability. We identify problems before closing so you can negotiate repairs, adjust your offer, or walk away from a problematic unit.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Kitec Plumbing & Insurance Risk</h3>
                  <p>
                    Kitec plumbing is a recalled aluminum-PEX system widely installed in Toronto condos between the late 1990s and mid-2000s. It is prone to sudden failure and is frequently excluded by insurers. We identify Kitec visually and document it clearly in your inspection report. Many insurance companies now require Kitec replacement within 30-60 days of policy issuance, making early identification essential for both financing and insurance approval.
                  </p>
                  <p>
                    Replacement costs for Kitec plumbing in a typical condo unit range from $3,000 to $8,000 depending on unit size and complexity. Our detailed documentation helps buyers negotiate these costs with sellers or budget appropriately for immediate post-purchase replacement.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Fan Coil & HVAC Failures</h3>
                  <p>
                    Condo HVAC systems are commonly neglected. Blocked condensate drains, mold growth, and failing actuators can cause leaks into neighbouring units — creating liability far beyond your own repair costs. We evaluate fan coil units, heat pumps, and other in-suite HVAC systems for proper operation, maintenance needs, and potential failure points.
                  </p>
                  <p>
                    Condo heating and cooling systems require regular maintenance that many owners neglect. We check for proper airflow, thermostat calibration, filter condition, and drainage performance. Clogged condensate drains are a common issue that can cause water damage to both your unit and those below you.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Moisture & Unit-to-Unit Leaks</h3>
                  <p>
                    Thermal imaging allows us to detect moisture intrusion from plumbing failures above or beside your unit. These issues are often invisible but can result in drywall damage, mold growth, and disputes with neighbours or the condo corporation. Window wall failures, balcony drainage problems, and bathroom leaks are common sources of moisture in condos.
                  </p>
                  <p>
                    Condo living means sharing walls, floors, and ceilings with other units. Water doesn't respect property boundaries, so leaks from neighbouring units can cause significant damage to your property. Our thermal cameras detect temperature differences that indicate hidden moisture, allowing us to identify problems before they become visible water stains or mold outbreaks.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Electrical System Assessment</h3>
                  <p>
                    Condo electrical panels often contain outdated breakers, double-tapped circuits, and inadequate capacity for modern living. We evaluate panel condition, circuit distribution, grounding, and safety devices. Older condos may have aluminum wiring or Federal Pacific panels that present fire hazards requiring immediate attention.
                  </p>
                  <p>
                    Modern condos with open-concept layouts often have insufficient electrical outlets for contemporary living. We identify areas where additional circuits may be needed and check for proper GFCI protection in kitchens and bathrooms where water and electricity create shock hazards.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Balcony & Terrace Evaluation</h3>
                  <p>
                    Private outdoor spaces require careful inspection for water infiltration, structural integrity, and safety compliance. We examine balcony membranes, drainage systems, guardrail stability, and door thresholds. Proper waterproofing is essential to prevent water damage to your unit and those below.
                  </p>
                  <p>
                    Balcony failures have caused significant structural incidents in some condo buildings. We assess balcony structural connections, slab condition, and waterproofing integrity. Proper drainage away from the building envelope prevents water intrusion that can damage interior finishes and structural components.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Thermometer className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Thermal Imaging</h4>
                      <p className="text-xs text-muted-foreground">Included infrared scanning for hidden moisture.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <Wrench className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Kitec Specialists</h4>
                      <p className="text-xs text-muted-foreground">Expert identification of recalled plumbing.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <Wind className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">HVAC Assessment</h4>
                      <p className="text-xs text-muted-foreground">Complete fan coil and HVAC evaluation.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Our Condo & Townhome Inspection Process</h3>
                  <p>
                    <strong>Before the Inspection:</strong> Once booked, we review the property type, age, and known building systems (fan coil vs heat pump, window wall construction, plumbing era). This allows us to anticipate common failure points specific to Toronto condos and townhomes before arriving on site.
                  </p>
                  <p>
                    <strong>During the Inspection:</strong> The inspection focuses exclusively on in-suite systems. We test plumbing supply and drains, evaluate the electrical panel and breakers, inspect HVAC fan coils or heat pumps, and perform thermal imaging to identify hidden moisture from neighbouring units or failed window seals.
                  </p>
                  <p>
                    <strong>After the Inspection:</strong> You receive a same-day digital report outlining defects, risk levels, and recommended actions. Findings are clearly categorized so buyers can prioritize negotiations, future repairs, or insurance concerns before closing.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Understanding Your Condo Inspection Report</h3>
                  <p>
                    Our condo inspection reports differ from standard home inspection reports by focusing specifically on unit-owner responsibilities. Each finding includes photographs, location identification, explanation of the issue, assessment of significance, and recommended actions. We categorize findings by priority (safety, major defect, minor defect, maintenance item) to help you understand what requires immediate attention versus what can be addressed over time.
                  </p>
                  <p>
                    Special attention is given to items that affect insurability, such as Kitec plumbing or outdated electrical panels. We provide clear documentation that you can share with insurance providers and mortgage lenders to demonstrate awareness of conditions and planned remediation.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Condo vs Townhome Inspections</h3>
                  <p>
                    While both fall under condominium ownership, townhomes typically include more private exterior elements like roofs, foundations, and yards that remain corporation responsibilities in high-rise condos. Our townhome inspections evaluate these additional elements while still focusing on in-suite systems. Stacked townhomes present unique challenges with unit-to-unit interfaces that require careful examination for sound transmission, fire separation, and moisture control.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Beyond the Basic Condo Inspection</h3>
                  <p>
                    Some condos require specialized testing beyond our standard evaluation. Properties with wood-burning fireplaces need <Link to="/services/wett" className="text-primary hover:underline">WETT inspections</Link> to verify safe installation and proper clearances. <Link to="/services/mold-inspection" className="text-primary hover:underline">Mold and moisture assessments</Link> use specialized equipment to locate hidden water infiltration and fungal growth. <Link to="/services/asbestos-testing" className="text-primary hover:underline">Asbestos testing</Link> may be necessary in older buildings before renovations.
                  </p>
                  <p>
                    We coordinate these specialized services with our standard inspections whenever possible. Scheduling multiple evaluations during your inspection period saves time and ensures comprehensive property assessment before you commit to purchase.
                  </p>
                </div>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Condo Inspection Checklist
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
                  Frequently Asked Questions
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
                    Why Choose ASADS for Condo Inspections?
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
                      <Link to="/booking">Book Condo Inspection</Link>
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
              We provide condo and townhome inspection services across the Greater Toronto Area
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
              Protect Your Condo Investment
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Identify in-suite risks before closing day. Same-day digital reports with clear repair guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Condo Inspection</Link>
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
