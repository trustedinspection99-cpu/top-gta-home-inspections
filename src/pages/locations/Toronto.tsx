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
  MessageSquare,
  Target,
  Zap,
  ClipboardCheck,
  ShieldCheck
} from "lucide-react";

// Extracted SEO Data with keyword variations
const seoData = {
  primaryKeywords: [
    "home inspection toronto",
    "home inspection companies toronto", 
    "home inspection toronto cost",
    "home inspection in toronto",
    "home inspection companies in toronto",
    "home inspection near toronto",
    "toronto home inspection",
    "home inspector toronto",
    "house inspection toronto",
    "property inspection toronto"
  ],
  
  brandKeywords: [
    "carson dunlop home inspection toronto",
    "pillar to post home inspection toronto", 
    "national home inspection toronto",
    "elements home inspection toronto"
  ],
  
  specializedKeywords: [
    "home inspection course toronto",
    "home inspection condo toronto",
    "structural engineer home inspection toronto",
    "best home inspection toronto",
    "top home inspection toronto",
    "professional home inspection toronto",
    "licensed home inspection toronto",
    "certified home inspection toronto"
  ],
  
  locationBasedKeywords: [
    "home inspection toronto on",
    "home inspection toronto ontario", 
    "home inspection toronto price",
    "home inspection toronto cost 2024",
    "home inspection services toronto",
    "home inspection toronto area",
    "home inspection toronto region"
  ],
  
  searchVolume: 720,
  costPerClick: 7,
  specificCpc: 5.35,
  cpcRange: "Low",
  
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
  ]
};

// Toronto neighborhoods and suburbs with search-friendly variations
const torontoNeighborhoods = [
  { name: "Downtown Toronto", slug: "downtown-toronto", keywords: ["home inspection downtown toronto", "downtown toronto home inspector"] },
  { name: "North York", slug: "north-york", keywords: ["home inspection north york", "north york house inspection"] },
  { name: "Scarborough", slug: "scarborough", keywords: ["home inspection scarborough", "scarborough property inspection"] },
  { name: "Etobicoke", slug: "etobicoke", keywords: ["home inspection etobicoke", "etobicoke home inspector"] },
  { name: "Midtown Toronto", slug: "midtown-toronto", keywords: ["home inspection midtown toronto", "midtown toronto inspection"] },
  { name: "York", slug: "york-toronto", keywords: ["home inspection york toronto", "york district inspection"] },
  { name: "East York", slug: "east-york", keywords: ["home inspection east york", "east york property inspection"] },
  { name: "The Beaches", slug: "the-beaches", keywords: ["home inspection the beaches toronto", "beaches neighborhood inspection"] }
];

const gtaSuburbs = [
  { name: "Mississauga", slug: "mississauga", keywords: ["home inspection mississauga", "mississauga near toronto"] },
  { name: "Brampton", slug: "brampton", keywords: ["home inspection brampton", "brampton inspection services"] },
  { name: "Vaughan", slug: "vaughan", keywords: ["home inspection vaughan", "vaughan near toronto"] },
  { name: "Markham", slug: "markham", keywords: ["home inspection markham", "markham property inspection"] },
  { name: "Oakville", slug: "oakville", keywords: ["home inspection oakville", "oakville near toronto"] },
  { name: "Richmond Hill", slug: "richmond-hill", keywords: ["home inspection richmond hill", "richmond hill inspection"] }
];

const title = "Home Inspection Toronto | Professional House & Property Inspectors";
const metaTitle = "Home Inspection Toronto | Best House Inspectors | ASADS Home Inspection Services";
const metaDescription = "Looking for home inspection companies in Toronto? ASADS provides professional home inspection services in Toronto. Licensed inspectors, same-day reports, competitive pricing. Book your Toronto home inspection today.";
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
    description: "Our inspectors have extensive knowledge of Toronto's diverse architecture, from Victorian homes to modern condos, and understand the common issues in each."
  },
  {
    title: "Local Building Code Knowledge",
    description: "Familiar with Toronto-specific building codes, heritage property regulations, and municipal bylaws affecting home inspections in Toronto."
  },
  {
    title: "Condo & High-Rise Specialists",
    description: "Specialized in Toronto condo inspections, including assessments of unit interiors and guidance on reviewing building Status Certificates."
  },
  {
    title: "Seasonal Considerations",
    description: "Understanding of Toronto's climate effects: winter ice damming on roofs, summer humidity impacts, and seasonal foundation movement common in the area."
  }
];

const benefits = [
  "Licensed Toronto Home Inspectors",
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
    answer: "Home inspection costs in Toronto typically range from $450 to $750, depending on property size, age, and additional services like thermal imaging. For a precise quote on your Toronto home inspection, contact us directly with your property details."
  },
  {
    question: "What does a home inspection include in Toronto?",
    answer: "A standard home inspection in Toronto includes evaluation of structural components, foundation, roofing, plumbing, electrical systems, HVAC equipment, interior finishes, exterior envelope, and basement/crawl space conditions, following Ontario home inspection standards."
  },
  {
    question: "How do I find the best home inspection companies in Toronto?",
    answer: "Look for licensed, insured inspectors with Toronto-specific experience, positive reviews, clear pricing, and comprehensive reporting. ASADS Home Inspection meets all these criteria for Toronto home inspections."
  },
  {
    question: "What are the biggest red flags in a Toronto home inspection?",
    answer: "Major red flags in Toronto homes include foundation cracks, roof leaks, knob and tube wiring, galvanized plumbing, moisture intrusion, and outdated electrical panels. These issues are common in Toronto's older housing stock."
  },
  {
    question: "How long does a home inspection take in Toronto?",
    answer: "Most home inspections in Toronto take 2-4 hours, depending on property size and complexity. Larger homes or those with multiple systems may require additional time for thorough evaluation."
  },
  {
    question: "Should I attend the home inspection in Toronto?",
    answer: "Yes, we recommend attending your Toronto home inspection to ask questions, learn about your property's systems, and understand maintenance requirements specific to Toronto homes."
  }
];

const relatedServices = [
  { title: "Condo Inspection Toronto", href: "/services/condo-inspection-toronto", keywords: ["condo inspection toronto", "toronto condo inspection"] },
  { title: "Pre-Purchase Home Inspection", href: "/services/pre-purchase", keywords: ["pre purchase home inspection toronto", "home inspection before buying toronto"] },
  { title: "New Construction Inspection", href: "/services/new-construction", keywords: ["new home inspection toronto", "new construction inspection toronto"] },
  { title: "Thermal Imaging Toronto", href: "/services/thermal-imaging", keywords: ["thermal imaging toronto", "infrared inspection toronto"] },
];

export default function Toronto() {
  const location = useLocation();
  const pageUrl = getCanonicalUrl(location.pathname);

  // Generate keyword-rich meta description
  const enhancedMetaDescription = `Professional home inspection services in Toronto. Find the best home inspection companies in Toronto with licensed inspectors, competitive pricing (${price}), and same-day reports. Serving Toronto and surrounding areas.`;

  // Generate title variations
  const titleVariations = [
    "Home Inspection Toronto | Professional House Inspectors",
    "Toronto Home Inspection Services | Licensed Inspectors",
    "Best Home Inspection Companies in Toronto | ASADS",
    "Home Inspection Services Toronto | Competitive Pricing"
  ];

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={enhancedMetaDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Keyword meta tags */}
        <meta name="keywords" content={seoData.primaryKeywords.join(", ")} />
        
        {/* Open Graph */}
        <meta property="og:site_name" content="ASADS Home Inspection Toronto" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={enhancedMetaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/images/toronto-home-inspection-og.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:locale:alternate" content="fr_CA" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={enhancedMetaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/toronto-home-inspection-twitter.jpg`} />
        
        {/* Additional meta tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Toronto" />
        <meta name="geo.position" content="43.653226;-79.383184" />
        <meta name="ICBM" content="43.653226, -79.383184" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "ASADS Home Inspection Toronto",
            "description": "Professional home inspection services in Toronto providing comprehensive property assessments, condo inspections, and specialized testing services.",
            "url": pageUrl,
            "telephone": "+16478019311",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "areaServed": "Toronto and Greater Toronto Area",
            "serviceType": "Home Inspection",
            "keywords": seoData.primaryKeywords.join(", "),
            "makesOffer": {
              "@type": "Offer",
              "name": "Home Inspection Services",
              "description": "Comprehensive home inspection services in Toronto",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "450",
                "priceCurrency": "CAD",
                "valueAddedTaxIncluded": true
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "247",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
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
                "name": "Toronto Home Inspection",
                "item": pageUrl
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section with Keywords */}
      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Home Inspection <span className="text-secondary">Toronto</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Professional <strong>home inspection services in Toronto</strong> with licensed inspectors, 
              same-day reports, and competitive pricing. Serving Toronto and surrounding areas.
            </p>
            
            {/* Keyword-rich subheading */}
            <div className="mb-8">
              <p className="text-lg mb-2">
                Find the <strong>best home inspection companies in Toronto</strong> with ASADS. 
                We provide comprehensive <strong>home inspection in Toronto</strong> for houses, condos, and investment properties.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <ShieldCheck className="h-5 w-5" />
                <span>Licensed Toronto Inspectors</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span>Same-Day Reports</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <DollarSign className="h-5 w-5" />
                <span>Competitive Pricing</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
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
                  Call (647) 801-9311
                </a>
              </Button>
            </div>
            
            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">720+</div>
                <div className="text-sm opacity-80">Monthly Searches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">$5.35</div>
                <div className="text-sm opacity-80">Avg. Cost Per Click</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">2-4</div>
                <div className="text-sm opacity-80">Hours Inspection</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-80">Licensed Inspectors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Keyword Section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Toronto Home Inspection Services
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              As one of the leading <strong>home inspection companies in Toronto</strong>, ASADS provides comprehensive 
              property assessments for buyers, sellers, and homeowners throughout the Greater Toronto Area.
            </p>
          </div>
          
          {/* Keyword Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {seoData.primaryKeywords.slice(0, 8).map((keyword, index) => (
              <div 
                key={index}
                className="bg-background border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">{keyword}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground">
              <strong>Searching for "home inspection near Toronto"?</strong> We service all Toronto neighborhoods 
              and surrounding GTA communities with professional, licensed home inspection services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Introduction with Keywords */}
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Professional Home Inspection in Toronto
                </h2>
                
                <div className="text-muted-foreground space-y-4">
                  <p>
                    When searching for <strong>home inspection companies in Toronto</strong>, it's essential to choose 
                    licensed professionals with local expertise. At ASADS, we provide comprehensive 
                    <strong> home inspection in Toronto</strong> that covers all major systems and components of your property.
                  </p>
                  
                  <p>
                    Our <strong>Toronto home inspection</strong> services are designed to give you peace of mind whether 
                    you're buying, selling, or maintaining a property in the GTA. With over {seoData.searchVolume} monthly 
                    searches for <strong>home inspection Toronto</strong> related terms, Toronto homeowners recognize the 
                    importance of professional property assessments.
                  </p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                    What to Expect from Our Toronto Home Inspections
                  </h3>
                  
                  <p>
                    A typical <strong>home inspection in Toronto</strong> includes evaluation of structural components, 
                    foundation integrity, roofing systems, plumbing, electrical systems, HVAC equipment, and interior finishes. 
                    Our inspectors are familiar with common issues in Toronto homes, including those found in heritage 
                    properties and modern condos alike.
                  </p>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-4">
                    Toronto Home Inspection Cost and Value
                  </h3>
                  
                  <p>
                    The average <strong>home inspection Toronto cost</strong> ranges from ${price.replace('$', '')}, depending on 
                    property size and additional services. While price is important, the value comes from thorough 
                    inspection and detailed reporting that can save you thousands in unexpected repairs.
                  </p>
                  
                  {/* Keyword Integration Section */}
                  <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                    <h4 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Popular Toronto Home Inspection Searches
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {seoData.primaryKeywords.map((keyword, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{keyword}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* What We Inspect with Keywords */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Comprehensive Toronto Home Inspection Scope
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatWeInspect.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <ClipboardCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Our <strong>home inspection services in Toronto</strong> follow the Standards of Practice established 
                  by the Ontario Association of Home Inspectors, ensuring comprehensive evaluation of your property.
                </p>
              </div>

              {/* Toronto-Specific Services */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Specialized Toronto Home Inspection Services
                </h2>
                <div className="grid gap-6">
                  {[
                    {
                      title: "Condo Inspection Toronto",
                      description: "Specialized inspections for Toronto's extensive condo market, including unit assessments and building Status Certificate reviews.",
                      keywords: ["condo inspection toronto", "toronto condo inspection"]
                    },
                    {
                      title: "Pre-Purchase Home Inspection Toronto",
                      description: "Comprehensive evaluations before property purchase to identify issues and provide negotiation leverage.",
                      keywords: ["pre purchase home inspection toronto", "home inspection before buying toronto"]
                    },
                    {
                      title: "Heritage Property Inspection",
                      description: "Expert assessments of Toronto's heritage homes with knowledge of original materials and preservation requirements.",
                      keywords: ["heritage home inspection toronto", "historic home inspection toronto"]
                    },
                    {
                      title: "New Construction Inspection",
                      description: "Phase inspections and final walkthroughs for new Toronto homes and condos to ensure quality construction.",
                      keywords: ["new home inspection toronto", "new construction inspection toronto"]
                    }
                  ].map((service) => (
                    <Card key={service.title} className="border-border/50 hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                              {service.title}
                            </h3>
                            <p className="text-muted-foreground">{service.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {service.keywords.map((kw, idx) => (
                              <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Toronto Home Inspection FAQs
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
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
                  Common Toronto Home Inspection Questions
                </h2>
                <div className="grid gap-4">
                  {seoData.peopleAlsoAsk.map((question, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                      <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-foreground font-medium">{question}</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Our <strong>Toronto home inspectors</strong> can help answer this and other questions during your inspection.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Booking Card */}
              <Card className="border-border/50 sticky top-24 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Book Your Toronto Inspection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule your <strong>home inspection in Toronto</strong> today
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Starting Price</span>
                      <span className="font-bold text-xl text-foreground">{price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Inspection Time</span>
                      <span className="font-medium text-foreground">{duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Report Delivery</span>
                      <span className="font-medium text-foreground">Same Day</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full" size="lg">
                    <Link to="/booking">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Toronto Inspection
                    </Link>
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      or call <a href="tel:+16478019311" className="text-primary hover:underline font-medium">(647) 801-9311</a>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Serving <strong>Toronto and GTA</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Toronto Service Areas
                  </h3>
                  <div className="space-y-3">
                    {torontoNeighborhoods.map((hood) => (
                      <div key={hood.slug} className="flex items-center justify-between">
                        <Link 
                          to={`/locations/toronto/${hood.slug}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {hood.name}
                        </Link>
                        <span className="text-xs bg-muted px-2 py-1 rounded">✓</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Also serving <strong>GTA suburbs near Toronto</strong> including Mississauga, Brampton, Vaughan, and Markham.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Stats */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Toronto Market Insights
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
                      <span className="text-sm text-muted-foreground">Competition Level</span>
                      <span className="font-bold text-primary">Moderate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Top Search Term</span>
                      <span className="font-bold text-primary text-right">home inspection toronto</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Popular Toronto Services
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((service) => (
                      <li key={service.href}>
                        <Link 
                          to={normalizePath(service.href)}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <span>{service.title}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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

      {/* Toronto Neighborhoods Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Home Inspection Services Across Toronto
            </h2>
            <p className="text-muted-foreground">
              Professional <strong>home inspection in Toronto</strong> available in all neighborhoods
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {torontoNeighborhoods.map((hood) => (
              <Link
                key={hood.slug}
                to={`/locations/toronto/${hood.slug}`}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
              >
                <MapPin className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{hood.name}</span>
                <span className="text-xs text-muted-foreground mt-1">Home Inspection</span>
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
              Also Serving GTA Communities Near Toronto
            </h2>
            <p className="text-muted-foreground">
              Looking for <strong>home inspection near Toronto</strong>? We service all surrounding GTA areas.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gtaSuburbs.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/home-inspection-${city.slug}`}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
              >
                <Navigation className="h-5 w-5 text-primary mb-2 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium text-foreground">{city.name}</span>
                <span className="text-xs text-muted-foreground mt-1">Near Toronto</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Search for <strong>"home inspection near Toronto"</strong> and find ASADS services in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Schedule Your Toronto Home Inspection?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              As one of Toronto's leading <strong>home inspection companies</strong>, we provide comprehensive 
              property assessments with licensed inspectors, same-day reports, and competitive pricing.
            </p>
            
            {/* Final keyword emphasis */}
            <div className="mb-8 p-6 bg-primary-foreground/10 rounded-xl">
              <p className="font-medium">
                Search for <strong>"home inspection toronto"</strong>, <strong>"home inspection companies in toronto"</strong>, 
                or <strong>"home inspection toronto cost"</strong> and choose ASADS for professional, reliable service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Toronto Inspection Online
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
                  Call for Toronto Quote
                </a>
              </Button>
            </div>
            
            <p className="text-sm text-primary-foreground/70 mt-6">
              Serving all Toronto neighborhoods and GTA communities with professional home inspection services.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
        }
