import { ReactNode } from "react";
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
  BarChart,
  Search,
  TrendingUp,
  Users,
  Award,
  Star,
  Building,
  Navigation,
  DollarSign,
  MessageSquare
} from "lucide-react";

// Extracted SEO Data
const seoData = {
  searchVolume: 720,
  costPerClick: 7,
  specificCpc: 5.35,
  cpcRange: "Low",
  
  organicKeywords: [
    "home inspection companies toronto",
    "carson dunlop home inspection toronto",
    "home inspection toronto cost",
    "home inspection course toronto",
    "home inspection condo toronto",
    "home inspection in toronto",
    "home inspection companies in toronto"
  ],
  
  youtubeKeywords: [
    "carson dunlop home inspection toronto",
    "home inspection toronto",
    "home inspection toronto on",
    "best home inspection toronto",
    "home inspection toronto cost",
    "pillar to post home inspection toronto",
    "national home inspection toronto",
    "elements home inspection toronto",
    "structural engineer home inspection toronto",
    "home inspection toronto price"
  ],
  
  aiPrompts: [
    "Best home inspection companies in Toronto",
    "What is included in a standard home inspection in Toronto?",
    "Average cost of a home inspection in Toronto",
    "How much does a typical home inspection cost in the Toronto area?",
    "Top-rated home inspection services near me in Toronto",
    "Find reputable home inspection companies serving Toronto.",
    "What does a home inspection include in Toronto?",
    "Questions to ask a potential home inspector in Toronto.",
    "How to book a home inspection appointment in Toronto online."
  ],
  
  peopleAlsoAsk: [
    "How much does a house inspection cost in Toronto?",
    "What does a home inspection include in Ontario?",
    "How much does a home appraisal cost in Toronto?",
    "What are the biggest red flags in a home inspection?",
    "What is the biggest red flag in a home inspection?",
    "What can landlords look at during an inspection in Ontario?",
    "What is the most common home inspection issue?",
    "What are the most common home inspection fails?"
  ],
  
  keywordCategories: [
    { name: "AI Models", count: 100 },
    { name: "Search Engines", count: 88 },
    { name: "Social Media", count: 16 },
    { name: "Shopping", count: 13 }
  ],
  
  searchFilters: {
    location: "Canada",
    language: "English"
  }
};

// Toronto neighborhoods and suburbs
const torontoNeighborhoods = [
  { name: "Downtown Toronto", slug: "downtown-toronto" },
  { name: "Midtown Toronto", slug: "midtown-toronto" },
  { name: "North York", slug: "north-york" },
  { name: "Scarborough", slug: "scarborough" },
  { name: "Etobicoke", slug: "etobicoke" },
  { name: "York", slug: "york-toronto" },
  { name: "East York", slug: "east-york" },
  { name: "The Beaches", slug: "the-beaches" },
  { name: "Annex", slug: "the-annex" },
  { name: "Liberty Village", slug: "liberty-village" },
  { name: "Distillery District", slug: "distillery-district" },
  { name: "Financial District", slug: "financial-district" }
];

const gtaSuburbs = [
  { name: "Mississauga", slug: "mississauga" },
  { name: "Brampton", slug: "brampton" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Markham", slug: "markham" },
  { name: "Oakville", slug: "oakville" },
  { name: "Richmond Hill", slug: "richmond-hill" },
  { name: "Pickering", slug: "pickering" },
  { name: "Ajax", slug: "ajax" },
  { name: "Whitby", slug: "whitby" },
  { name: "Oshawa", slug: "oshawa" },
  { name: "Burlington", slug: "burlington" },
  { name: "Milton", slug: "milton" }
];

const title = "Home Inspection Toronto";
const metaTitle = "Home Inspection Toronto | Professional House Inspectors | ASADS";
const metaDescription = "Licensed home inspectors in Toronto providing comprehensive pre-purchase, condo, and new construction inspections. Same-day reports, thermal imaging available. Book today.";
const price = "$450-$750";
const duration = "2-4 Hours";

const whatWeInspect = [
  "Foundations & Structural Integrity",
  "Roofing Systems & Attic Ventilation",
  "Plumbing & Water Heating Systems",
  "Electrical Panels & Wiring",
  "HVAC Equipment & Ductwork",
  "Windows, Doors & Exterior Envelope",
  "Insulation & Vapor Barriers",
  "Basement Waterproofing & Drainage",
];

const torontoFeatures = [
  {
    title: "Toronto-Specific Expertise",
    description: "Knowledge of Toronto's architectural styles, from Victorian homes to modern condos, and their common issues."
  },
  {
    title: "Local Building Code Knowledge",
    description: "Familiar with Toronto-specific building codes, bylaws, and heritage property requirements."
  },
  {
    title: "Condo & High-Rise Specialists",
    description: "Specialized inspections for Toronto's extensive condo market, including common elements assessments."
  },
  {
    title: "Seasonal Toronto Considerations",
    description: "Understanding of Toronto's climate effects on homes: winter ice dams, summer humidity, and foundation movement."
  }
];

const benefits = [
  "Licensed Ontario Home Inspectors",
  "Same-Day Digital Reports",
  "Thermal Imaging Available",
  "Condo & High-Rise Expertise",
  "Heritage Property Experience",
  "Flexible Evening & Weekend Appointments",
  "Detailed Photo Documentation",
  "Lifetime Technical Support",
];

const faqs = [
  {
    question: "How much does a home inspection cost in Toronto?",
    answer: "Home inspection costs in Toronto typically range from $450 to $750, depending on property size, age, and additional services like thermal imaging. Condo inspections generally cost less at $350-$550, while larger homes (over 3000 sq ft) or heritage properties may cost $650-$900. Contact us for an exact quote based on your specific Toronto property."
  },
  {
    question: "What's the best time to get a home inspection in Toronto?",
    answer: "The best time is during your offer's conditional period, typically 5-7 business days after acceptance. For seasonal advantages, spring inspections reveal winter damage and drainage issues, while fall inspections prepare homes for Toronto winters. We conduct inspections year-round, with special attention to seasonal concerns like ice damming in winter and foundation movement in summer."
  },
  {
    question: "Are there specific Toronto building code requirements I should know about?",
    answer: "Yes, Toronto has specific bylaws including backflow prevention devices, basement apartment regulations, electrical service upgrades for older homes, and heritage property restrictions. Our inspectors are knowledgeable about Toronto Building Code amendments, Green Standard requirements for new constructions, and local zoning bylaws that affect property modifications."
  },
  {
    question: "How do Toronto condo inspections differ from house inspections?",
    answer: "Condo inspections focus on the unit's interior systems rather than exterior elements managed by the condo corporation. We examine HVAC units, electrical panels within the unit, plumbing fixtures, windows, balconies, and interior finishes. We also review Status Certificates for the building's overall health and reserve fund status, crucial for Toronto's condo market."
  },
  {
    question: "What are common issues in older Toronto homes?",
    answer: "Common issues include knob and tube wiring, galvanized plumbing, foundation settlement in century homes, insufficient insulation in brick walls, aluminum wiring in mid-century homes, and aging clay sewer pipes. Heritage properties may have unique challenges with original materials that require specialized maintenance approaches."
  },
  {
    question: "Do you inspect Toronto basement apartments?",
    answer: "Yes, we inspect legal and potential basement apartments for safety and compliance with Toronto Fire Services requirements, including proper egress windows, ceiling heights, electrical safety, and separate heating controls. We can identify whether basement units meet current standards for legal secondary suites under Toronto's zoning bylaws."
  }
];

const relatedServices = [
  { title: "Condo Inspection Toronto", href: "/services/condo-inspection" },
  { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
  { title: "New Construction Inspection", href: "/services/new-construction" },
  { title: "Thermal Imaging Toronto", href: "/services/thermal-imaging" },
];

export default function Toronto() {
  const location = useLocation();
  const pageUrl = getCanonicalUrl(location.pathname);

  // Schema 1: LocalBusiness for Toronto
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ASADS Home Inspection Toronto",
    "image": `${SITE_URL}/images/toronto-home-inspection.jpg`,
    "@id": `${SITE_URL}/locations/toronto`,
    "url": `${SITE_URL}/locations/toronto`,
    "telephone": "+16478019311",
    "email": "toronto@asads.ca",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Toronto Service Area",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M5H",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.653226,
      "longitude": -79.383184
    },
    "areaServed": {
      "@type": "City",
      "name": "Toronto"
    },
    "serviceArea": {
      "@type": "Place",
      "name": "Greater Toronto Area"
    },
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
      "reviewCount": "128"
    }
  };

  // Schema 2: Service for Toronto
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Home Inspection",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Toronto"
    },
    "description": "Professional home inspection services in Toronto including pre-purchase inspections, condo inspections, new construction phase inspections, and specialized services like thermal imaging and radon testing.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CAD",
      "priceRange": "$450-$750"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Toronto Home Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Standard Home Inspection Toronto"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Condo Inspection Toronto"
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
        "name": "Locations",
        "item": getCanonicalUrl("/locations")
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Toronto",
        "item": pageUrl
      }
    ]
  };

  // Schema 5: Place for Toronto
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Toronto, Ontario",
    "description": "Toronto home inspection services covering all neighborhoods including Downtown, Midtown, North York, Scarborough, and Etobicoke.",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.653226,
      "longitude": -79.383184
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "Ontario",
      "addressCountry": "Canada"
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/images/toronto-og.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/toronto-og.jpg`} />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(placeSchema)}
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
                  Home Inspection Services in
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  Toronto, Ontario
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Professional home inspection services across Toronto's diverse neighborhoods. 
              Licensed inspectors providing detailed assessments for houses, condos, and heritage properties.
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
                <span>Licensed Toronto Inspectors</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Toronto Inspection
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
                  Toronto: (647) 801-9311
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
              <p className="text-xs opacity-80">Toronto & GTA</p>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5" />
              <span>No hidden fees • Toronto-specific expertise</span>
            </div>
            <Button asChild variant="secondary">
              <Link to="/booking">Get Toronto Quote</Link>
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
              {/* Toronto Introduction */}
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Home Inspection Services in Toronto
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Toronto's diverse real estate market requires specialized home inspection expertise. 
                    From century-old Victorian homes in The Annex to modern glass condos downtown, 
                    each property type presents unique challenges that our licensed inspectors understand intimately.
                  </p>
                  <p>
                    With over {seoData.searchVolume.toLocaleString()} monthly searches for home inspection services in Toronto, 
                    property buyers recognize the importance of professional assessments before purchase. 
                    Our inspectors navigate Toronto's specific building codes, heritage regulations, 
                    and seasonal concerns to provide comprehensive evaluations you can trust.
                  </p>
                </div>

                {/* SEO Data Section */}
                <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Toronto Home Inspection Search Data
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Search Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Search Volume:</span>
                          <span className="font-medium">{seoData.searchVolume.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost Per Click:</span>
                          <span className="font-medium">${seoData.specificCpc} ({seoData.cpcRange})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Competition Level:</span>
                          <span className="font-medium">Moderate</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Keyword Categories</h4>
                      <div className="space-y-2">
                        {seoData.keywordCategories.map(cat => (
                          <div key={cat.name} className="flex justify-between">
                            <span className="text-muted-foreground">{cat.name}:</span>
                            <span className="font-medium">{cat.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toronto-Specific Content */}
                <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                  Toronto Home Inspection Considerations
                </h3>
                <div className="space-y-4">
                  <p>
                    <strong>Historic Properties:</strong> Toronto's heritage homes require specialized knowledge. 
                    We understand the maintenance needs of original plaster walls, wood windows, and masonry work 
                    common in neighborhoods like Cabbagetown and Rosedale.
                  </p>
                  <p>
                    <strong>Condo Market:</strong> With Toronto's extensive condo market, we provide thorough 
                    unit inspections plus guidance on reviewing Status Certificates for building health and 
                    reserve fund adequacy.
                  </p>
                  <p>
                    <strong>Seasonal Challenges:</strong> Toronto's climate presents unique challenges: 
                    winter ice damming on roofs, summer humidity affecting older foundations, 
                    and seasonal temperature swings testing HVAC systems.
                  </p>
                  <p>
                    <strong>Urban Infrastructure:</strong> We assess properties in relation to Toronto's 
                    infrastructure, including proximity to subway lines (vibration considerations), 
                    urban tree roots affecting foundations, and municipal service connections.
                  </p>
                </div>

                {/* Popular Toronto Keywords */}
                <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                  Common Toronto Home Inspection Queries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Organic Search Keywords</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {seoData.organicKeywords.slice(0, 5).map(keyword => (
                        <li key={keyword} className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">YouTube Search Terms</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {seoData.youtubeKeywords.slice(0, 5).map(keyword => (
                        <li key={keyword} className="flex items-start gap-2">
                          <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Toronto Home Inspection Scope
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

              {/* Toronto Features */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Toronto-Specific Expertise
                </h2>
                <div className="grid gap-6">
                  {torontoFeatures.map((feature) => (
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

              {/* Toronto FAQs */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Frequently Asked Questions - Toronto
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

              {/* People Also Ask Section */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Toronto Home Buyers Also Ask
                </h2>
                <div className="grid gap-4">
                  {seoData.peopleAlsoAsk.map((question, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{question}</span>
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
                    Why Choose ASADS in Toronto?
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
                      <Link to="/booking">Book Toronto Inspection</Link>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-3">
                      or call <a href="tel:+16478019311" className="text-primary hover:underline">(647) 801-9311</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Toronto Neighborhoods */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Toronto Neighborhoods We Serve
                  </h3>
                  <div className="space-y-2">
                    {torontoNeighborhoods.map((hood) => (
                      <Link 
                        key={hood.slug}
                        to={`/locations/toronto/${hood.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        <Navigation className="h-3 w-3" />
                        {hood.name}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Toronto Inspection Services
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

              {/* SEO Stats Card */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Toronto Market Data
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly Searches</span>
                      <span className="font-bold text-primary">{seoData.searchVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg. Cost Per Click</span>
                      <span className="font-bold text-primary">${seoData.specificCpc}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Competition</span>
                      <span className="font-bold text-primary">Moderate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Toronto Neighborhoods Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Toronto Neighborhoods We Service
            </h2>
            <p className="text-muted-foreground">
              Professional home inspections available across all Toronto neighborhoods
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {torontoNeighborhoods.map((hood) => (
              <Link
                key={hood.slug}
                to={`/locations/toronto/${hood.slug}`}
                className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                {hood.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GTA Service Areas */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Also Serving Greater Toronto Area
            </h2>
            <p className="text-muted-foreground">
              Professional home inspection services throughout the GTA
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gtaSuburbs.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/home-inspection-${city.slug}`}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready for Your Toronto Home Inspection?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Schedule your comprehensive home inspection in Toronto today. 
              Our licensed inspectors provide detailed assessments with same-day reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Toronto Inspection
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
                  Call Toronto Office
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
              }
