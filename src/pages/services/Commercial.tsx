import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl, normalizePath } from "@/lib/seo";
import {
  Factory,
  ShieldCheck,
  BarChart3,
  HardHat,
  Zap,
  Droplets,
  Building2,
  SearchCheck,
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
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react";

// Featured locations for service pages internal linking
const featuredLocations = [
  { name: "Toronto", slug: "home-inspection-toronto" },
  { name: "Mississauga", slug: "home-inspection-mississauga" },
  { name: "Brampton", slug: "home-inspection-brampton" },
  { name: "Vaughan", slug: "home-inspection-vaughan" },
  { name: "Markham", slug: "home-inspection-markham" },
  { name: "Oakville", slug: "home-inspection-oakville" },
  { name: "Hamilton", slug: "home-inspection-hamilton" },
  { name: "Burlington", slug: "home-inspection-burlington" },
  { name: "Richmond Hill", slug: "home-inspection-richmond-hill" },
  { name: "Oshawa", slug: "home-inspection-oshawa" },
  { name: "Barrie", slug: "home-inspection-barrie" },
  { name: "Newmarket", slug: "home-inspection-newmarket" },
];

const title = "Commercial Building Inspection";
const metaTitle = "Commercial Building Inspection Toronto | Building Inspection & PCA | ASADS";
const metaDescription = "Expert commercial building inspection and Property Condition Assessments (PCA) in Toronto & GTA. Commercial inspection for offices, retail, and industrial — ASTM E2018-15 compliant. CapEx forecasting, MEP audits, Phase 1 ESA, and structural evaluations.";
const price = "Quote Based";
const duration = "Expedited Reporting Available";

const whatWeInspect = [
  "Structural Framing, Foundations & Slab Integrity – assess for cracks, settlement, or deterioration",
  "Building Envelope, Curtain Walls & Glazing – evaluate water infiltration, thermal performance, and code compliance",
  "Flat & Low-Slope Roofing Systems – non-destructive testing to identify leaks, membrane wear, and drainage issues",
  "Central HVAC Plants (Chillers, Boilers, Cooling Towers) – operational performance, maintenance history, and efficiency",
  "Electrical Switchgear & Distribution – thermal imaging for hotspots, load testing, and compliance review",
  "Life Safety Systems – fire alarms, sprinklers, emergency egress, and code compliance checks",
  "AODA / ADA Accessibility – barrier-free compliance, entryways, and common area accessibility",
  "Pavement, Parking Structures & Stormwater Management – surface evaluation, drainage, and structural assessment",
  "Industrial Loading Docks, Dock Levelers & Overhead Doors – functional testing, safety, and wear assessment",
  "Plumbing Systems – domestic water supply, commercial backflow, and sanitary drainage inspections",
  "Vertical Transportation – elevators and escalators, logbook review, and code compliance verification",
  "Phase 1 Environmental Site Assessment – soil, groundwater, and hazardous material review per MECP standards"
];

const features = [
  {
    title: "ASTM E2018-15 Compliance",
    description: "Institutional-standard PCA methodology ensuring audits are defensible, comprehensive, and recognized by lenders and investors."
  },
  {
    title: "Infrared Thermography",
    description: "Detect hidden heat anomalies, moisture intrusion, and potential electrical failures with advanced thermal imaging."
  },
  {
    title: "Asset Life Cycle Analysis",
    description: "Calculate Remaining Useful Life (RUL) for major systems to enable accurate long-term CapEx planning."
  },
  {
    title: "Immediate vs Short-Term Needs",
    description: "Prioritize repairs and replacements by urgency to mitigate risk and optimize investment strategies."
  }
];

const benefits = [
  "Identifies undisclosed deferred maintenance and structural liabilities",
  "Detailed 20-year Capital Reserve forecasting for accurate financial planning",
  "Led by InterNACHI & Certified Master Inspector (CMI®) professionals",
  "Expedited executive summaries for rapid negotiations",
  "Comprehensive reports with high-resolution evidence, annotations, and lifecycle analysis",
  "Integrated PCA & Phase 1 ESA for combined physical and environmental risk assessment",
  "Applicable to Industrial, Retail, Office, Multi-Family, and Mixed-Use properties",
  "Serving Toronto, Mississauga, Vaughan, Brampton, and the entire GTA"
];

const faqs = [
  {
    question: "What is the difference between a PCA and a standard home inspection?",
    answer: "A PCA (Property Condition Assessment) is an institutional-grade audit following ASTM E2018-15 standards, designed for investors and lenders. It includes detailed financial forecasting (CapEx), operational assessments, and risk prioritization, unlike residential home inspections which focus on immediate safety and habitability concerns for individual homeowners."
  },
  {
    question: "How long until I receive the full Property Condition Report?",
    answer: "An oral briefing is provided immediately after the inspection. The detailed digital report is delivered within 3-5 business days, with an expedited 48-hour delivery option available for time-sensitive transactions. Reports include executive summaries, detailed findings, high-resolution photos, and comprehensive capital expenditure forecasts."
  },
  {
    question: "Do you include Phase 1 ESA in your services?",
    answer: "Yes. We combine PCA with Phase 1 ESA to provide both physical and environmental risk insights, meeting regulatory and financing requirements. Our environmental assessments comply with MECP standards and identify potential soil/groundwater contamination, hazardous materials, and regulatory compliance issues."
  },
  {
    question: "Can cost estimates for repairs be included?",
    answer: "Absolutely. Each PCA includes an 'Opinion of Probable Cost' for immediate and short-term repairs to inform valuation adjustments and negotiations. We provide detailed cost estimates based on current market rates for materials and labor, helping investors make informed financial decisions."
  },
  {
    question: "Which types of commercial properties are inspected?",
    answer: "All commercial asset classes including industrial warehouses, retail plazas, office buildings, multi-family residential, mixed-use developments, and hospitality properties across the GTA. Our team has experience with properties ranging from 5,000 to 500,000+ square feet."
  },
  {
    question: "What qualifications do your commercial inspectors have?",
    answer: "Our commercial inspectors hold multiple certifications including Certified Master Inspector (CMI®), Level 1 Infrared Thermography Certification, and specialized training in ASTM E2018-15 standards. Many have backgrounds in construction, engineering, and facilities management, providing practical expertise beyond standard inspection training."
  }
];

const relatedServices = [
  { title: "Thermal Imaging", href: "/services/thermal-imaging" },
  { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
  { title: "Asbestos Testing", href: "/services/asbestos-testing" },
  { title: "Mold Inspection", href: "/services/mold-inspection" },
];

export default function Commercial() {
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
    "priceRange": "$$$",
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
    "serviceType": "Commercial Property Condition Assessment & Phase 1 ESA",
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
    "description": "Institutional-grade commercial property condition assessments and Phase 1 environmental site assessments for investors, lenders, and property managers. ASTM E2018-15 compliant PCA with detailed capital expenditure forecasting, MEP system evaluation, structural integrity assessment, and environmental risk analysis.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "price": "Quote Based"
    },
    "category": "Commercial Inspection Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property Condition Assessment (PCA)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Phase 1 Environmental Site Assessment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Combined PCA & Phase 1 ESA"
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
        "name": "Commercial Building Inspection",
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
    "description": "ASADS Home Inspection provides professional commercial and residential inspection services across Ontario. Certified inspectors specializing in pre-purchase, commercial PCA, Phase 1 ESA, and specialized property assessments."
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
      "serviceType": "Commercial Property Condition Assessment & Phase 1 ESA"
    },
    "specialty": "Commercial Inspection Services",
    "about": {
      "@type": "Thing",
      "name": "Commercial Building Inspection",
      "description": "Professional property condition assessments and environmental site assessments for commercial real estate"
    }
  };

  // Schema 7: ProfessionalService
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ASADS Home Inspection - Commercial Services",
    "image": `${SITE_URL}/images/services/commercial-inspection.jpg`,
    "priceRange": "$$$",
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
    "paymentAccepted": "Cash, Credit Card, Debit, E-Transfer, Corporate Billing",
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
          "name": "Commercial Real Estate Investor"
        },
        "datePublished": "2025-01-20",
        "reviewBody": "Exceptional commercial PCA service. The detailed capital expenditure forecast saved us from overpaying on a retail plaza. The thermal imaging identified hidden electrical issues that would have cost thousands to repair.",
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
          "name": "Property Management Firm"
        },
        "datePublished": "2025-01-10",
        "reviewBody": "Professional commercial inspection team that understands investor needs. Their combined PCA and Phase 1 ESA report was comprehensive and helped secure financing. The 20-year CapEx forecast is invaluable for portfolio planning.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Inspection Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Property Condition Assessment",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Standard PCA (up to 50,000 sq ft)",
                "description": "ASTM E2018-15 compliant property condition assessment"
              },
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Large Facility PCA (50,000+ sq ft)",
                "description": "Extended assessment for industrial and large commercial properties"
              },
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
                "name": "PCA with Thermal Imaging",
                "description": "Standard PCA plus comprehensive infrared thermal scanning"
              },
              "priceCurrency": "CAD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Combined PCA & Phase 1 ESA",
                "description": "Complete physical and environmental risk assessment package"
              },
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
                <Factory className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  ASADS Commercial Inspection Services
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Commercial Building Inspection & Property Condition Assessment
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Institutional-grade commercial building inspection and due diligence for Toronto & GTA. Identify structural, MEP, environmental, and lifecycle risks before you invest. Serving Toronto, Mississauga, Hamilton, Kitchener-Waterloo, Guelph, and Cambridge.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Detailed CapEx Forecasting</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>ASTM E2018-15 Compliant</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Request Commercial Quote
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
              <p className="text-sm opacity-90">Commercial Inspection Pricing</p>
              <p className="font-heading text-3xl font-bold">{price}</p>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5" />
              <span>Custom quotes • Volume discounts available</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Get Commercial Quote</Link>
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
                  Comprehensive Commercial Property Evaluation
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Our PCA and Phase 1 ESA services combine visual inspections, forensic evaluation, and environmental review to deliver a complete understanding of potential liabilities and investment risks. Designed for institutional investors, lenders, and property managers, our assessments provide the critical data needed for informed investment decisions.
                  </p>
                  <p>
                    Commercial real estate transactions involve significant capital investments where undisclosed defects can dramatically impact returns. Our institutional-grade assessments identify both immediate concerns and long-term capital requirements, enabling accurate financial modeling and risk-adjusted valuations.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Structural Integrity & Building Envelope</h3>
                  <p>
                    Foundations, slabs, framing, curtain walls, glazing, and roofing are inspected for structural performance, code compliance, and water/thermal protection. We assess load-bearing capacity, identify structural deficiencies, and evaluate envelope performance through detailed visual examination and diagnostic testing.
                  </p>
                  <p>
                    Modern commercial structures often incorporate complex curtain wall systems and specialized roofing assemblies. Our inspectors have specific training in evaluating these systems for proper installation, weathertightness, thermal performance, and compliance with current building codes and manufacturer specifications.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Mechanical, Electrical & Plumbing (MEP) Systems</h3>
                  <p>
                    HVAC, boilers, chillers, electrical panels, plumbing risers, and industrial systems are evaluated. Thermal imaging highlights hidden issues before they escalate into costly failures. We assess system capacity, operational efficiency, maintenance history, and remaining useful life to forecast replacement timelines.
                  </p>
                  <p>
                    Commercial MEP systems represent significant capital investments with complex operational requirements. Our evaluations consider energy efficiency, operational costs, code compliance, and system redundancy. We identify opportunities for operational improvements that can reduce expenses and extend equipment lifecycles.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Life Safety & Accessibility Compliance</h3>
                  <p>
                    Fire suppression, alarms, sprinklers, emergency egress, and accessibility compliance are verified to reduce legal liability and ensure operational safety. Commercial properties must meet stringent life safety requirements that evolve with building codes and occupancy classifications.
                  </p>
                  <p>
                    Accessibility compliance under the AODA and ADA standards requires careful evaluation of entrances, washrooms, circulation paths, and communication systems. Non-compliance creates legal exposure and limits property usability, directly impacting asset value and marketability.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Capital Expenditure Forecasting & Risk Mitigation</h3>
                  <p>
                    5–20 year capital expenditure planning highlights immediate, short-term, and long-term repairs. Estimated costs help guide acquisition negotiations and portfolio planning. Our detailed CapEx forecasts consider both component replacement costs and associated soft costs including design fees, permits, and tenant disruption.
                  </p>
                  <p>
                    Commercial investors require accurate financial projections to assess investment returns. Our capital planning identifies timing and magnitude of future capital requirements, enabling proper reserve funding and strategic asset management. We prioritize recommendations based on risk, cost, and impact on operations.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Phase 1 Environmental Site Assessment</h3>
                  <p>
                    Identify potential environmental risks including soil/groundwater contamination, asbestos, lead, and underground storage tanks, ensuring compliance and informed investment decisions. Environmental liabilities can create significant financial exposure and regulatory obligations for property owners.
                  </p>
                  <p>
                    Our Phase 1 ESAs follow current regulatory standards and include comprehensive site history review, regulatory database searches, and detailed site reconnaissance. We identify Recognized Environmental Conditions (RECs) that may require further investigation or remediation to mitigate environmental liability.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
                      <Thermometer className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Infrared Scanning</h4>
                      <p className="text-xs text-muted-foreground">Advanced thermal imaging for hidden defects.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-accent/10 rounded-xl border border-accent/20 shadow-sm">
                      <TrendingUp className="text-accent mb-2" size={32} />
                      <h4 className="font-bold text-foreground">CapEx Forecasting</h4>
                      <p className="text-xs text-muted-foreground">Detailed 20-year capital expenditure planning.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-xl border border-secondary shadow-sm">
                      <Users className="text-primary mb-2" size={32} />
                      <h4 className="font-bold text-foreground">Investor Focused</h4>
                      <p className="text-xs text-muted-foreground">Reports designed for lenders and investors.</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Commercial Property Types We Assess</h3>
                  <p>
                    <strong>Industrial Properties:</strong> Warehouses, distribution centers, manufacturing facilities with specialized loading docks, high bay storage, and industrial MEP systems. We evaluate clear heights, floor load capacities, sprinkler coverage, and specialized infrastructure.
                  </p>
                  <p>
                    <strong>Office Buildings:</strong> High-rise and low-rise office properties with complex HVAC systems, elevator banks, curtain wall assemblies, and common area amenities. We assess tenant improvement conditions, base building systems, and shared infrastructure.
                  </p>
                  <p>
                    <strong>Retail Properties:</strong> Shopping centers, big box retail, strip plazas, and mixed-use retail with parking structures, storefront systems, and tenant-specific infrastructure. We evaluate common area maintenance, parking lot conditions, and signage structures.
                  </p>
                  <p>
                    <strong>Multi-Family Residential:</strong> Apartment buildings, condominiums, and student housing with shared amenities, centralized systems, and unit-specific components. We assess building envelope performance, life safety systems, and common element conditions.
                  </p>
                  <p>
                    <strong>Hospitality Properties:</strong> Hotels, motels, and extended-stay facilities with specialized guest room systems, food service equipment, and public space requirements. We evaluate guest room conditions, back-of-house operations, and specialized hospitality systems.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">The Commercial Inspection Process</h3>
                  <p>
                    Our commercial assessments follow a systematic approach beginning with document review and site reconnaissance. We examine property records, maintenance logs, system drawings, and previous assessment reports to establish baseline understanding before field evaluation.
                  </p>
                  <p>
                    Field assessment involves comprehensive visual examination supplemented by diagnostic testing. We operate accessible systems, document conditions with high-resolution photography, and use specialized equipment including infrared cameras, moisture meters, and electrical testing devices.
                  </p>
                  <p>
                    Post-inspection analysis includes detailed report preparation with executive summaries for decision-makers and technical appendices for specialists. We provide oral briefings immediately following the inspection and expedited report delivery options for time-sensitive transactions.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">Understanding Commercial Inspection Reports</h3>
                  <p>
                    Commercial PCA reports differ significantly from residential inspection reports. Our deliverables include executive summaries for quick review, detailed condition assessments organized by system, prioritized recommendations with cost estimates, and comprehensive capital expenditure forecasts.
                  </p>
                  <p>
                    Each deficiency is documented with location-specific photos, description of the condition, assessment of significance, and recommended actions. We categorize findings by priority level (immediate, short-term, long-term) to facilitate strategic planning and resource allocation.
                  </p>
                  <p>
                    Capital expenditure forecasts provide detailed projections of major system replacements over 5, 10, and 20-year horizons. These forecasts consider remaining useful life, current condition, and industry-standard replacement costs adjusted for local market conditions.
                  </p>
                </div>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Commercial Inspection Checklist
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
                    Why Choose ASADS for Commercial Inspections?
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
                      <Link to="/booking">Request Commercial Quote</Link>
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
              We provide commercial inspection services across the Greater Toronto Area
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featuredLocations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/locations/${loc.slug}`}
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
              Protect Your Commercial Investment
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Comprehensive PCA and Phase 1 ESA reports delivered with clear repair guidance, CapEx planning, and environmental risk mitigation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Schedule Your Commercial Inspection</Link>
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
