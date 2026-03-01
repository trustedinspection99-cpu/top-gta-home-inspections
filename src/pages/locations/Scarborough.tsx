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
  Building,
  Thermometer,
  DollarSign,
  ClipboardCheck,
  Users,
  Star,
  Award,
  BadgeCheck,
  ThumbsUp,
  BookOpen,
  PhoneCall,
  Mail,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================
interface Service {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
  anchorText: string;
}

interface Neighborhood {
  name: string;
  service: string;
}

interface ExpertisePoint {
  text: string;
}

interface Benefit {
  text: string;
}

interface FAQ {
  question: string;
  answer: ReactNode; // Now using JSX instead of string with HTML
}

interface Testimonial {
  name: string;
  location: string;
  content: string;
  rating: 5;
}

// ============================================================================
// SEO Constants
// ============================================================================
const SITE_PHONE = "+16478019311";
const SITE_EMAIL = "info@asads.ca";

const metaTitle = "Home Inspection Scarborough | Certified Inspectors & Trusted Reports";
const metaDescription =
  "Looking for the best home inspection in Scarborough? Certified inspectors, pre‑purchase & pre‑listing services, detailed reports, and competitive pricing. Get answers to all your questions here.";

const primaryKeyword = "home inspection scarborough";
const secondaryKeywords = [
  "home inspection scarborough on",
  "best home inspection companies in Scarborough",
  "top-rated home inspectors near Scarborough",
  "certified home inspectors Scarborough area",
  "cost of home inspection in Scarborough",
  "reliable home inspection services with warranty Scarborough",
  "what does a pre-purchase home inspection include Scarborough",
  "how much does a home inspection cost in Scarborough",
  "home inspection scams",
  "red flags in a home inspection",
  "how long does a house inspection take in Ontario",
];

// ============================================================================
// Data Arrays (typed)
// ============================================================================
const allServices: Service[] = [
  {
    title: "Pre-Purchase Home Inspection",
    href: "/services/pre-purchase",
    description:
      "Complete evaluation before buying a home in Scarborough – uncover hidden defects and negotiate with confidence.",
    icon: <Home className="h-6 w-6" aria-hidden="true" />,
    anchorText: "pre-purchase home inspection in Scarborough",
  },
  {
    title: "Pre-Listing Home Inspection",
    href: "/services/pre-listing",
    description:
      "Sell your Scarborough property faster with a professional pre‑listing inspection that builds buyer trust.",
    icon: <FileText className="h-6 w-6" aria-hidden="true" />,
    anchorText: "pre-listing home inspection Scarborough",
  },
  {
    title: "New Construction Inspection",
    href: "/services/new-construction",
    description:
      "Ensure your newly built Scarborough home meets all codes and standards before you move in.",
    icon: <Award className="h-6 w-6" aria-hidden="true" />,
    anchorText: "new construction inspection Scarborough",
  },
];

const scarboroughNeighborhoods: Neighborhood[] = [
  { name: "Agincourt", service: "Home Inspection" },
  { name: "Birch Cliff", service: "Home Inspection" },
  { name: "Cliffside", service: "Home Inspection" },
  { name: "Guildwood", service: "Home Inspection" },
  { name: "Malvern", service: "Home Inspection" },
  { name: "Port Union", service: "Home Inspection" },
  { name: "Rouge", service: "Home Inspection" },
  { name: "West Hill", service: "Home Inspection" },
  { name: "Woburn", service: "Home Inspection" },
];

const expertisePoints: ExpertisePoint[] = [
  { text: "Certified Home Inspectors (Ontario Licensed)" },
  { text: "Top‑rated & Trusted in Scarborough" },
  { text: "10+ Years Local Experience" },
  { text: "Pre‑Purchase, Pre‑Listing & New Construction Specialists" },
  { text: "Thermal Imaging & Moisture Detection Available" },
  { text: "Radon Measurement Certified" },
  { text: "WETT Certified for Wood‑Burning Appliances" },
  { text: "OAHI & InterNACHI Members" },
  { text: "Reliable Services with Warranty" },
  { text: "Detailed Digital Reports with Photos" },
];

const benefits: Benefit[] = [
  { text: "Same‑Day Digital Reports" },
  { text: "Thorough Photo Documentation" },
  { text: "Thermal Imaging Option" },
  { text: "24/7 Online Report Access" },
  { text: "Lifetime Technical Support" },
  { text: "Flexible Scheduling" },
  { text: "Pre‑Inspection Consultation" },
  { text: "Post‑Inspection Review" },
  { text: "E&O Insurance Coverage" },
  { text: "Free Follow‑up Questions" },
];

const whatWeInspect: string[] = [
  "Structural Components & Foundation",
  "Roofing, Flashings & Attic Ventilation",
  "Plumbing Systems & Water Heater",
  "Electrical Systems & Panel",
  "HVAC Equipment & Ductwork",
  "Interior Finishes & Windows",
  "Exterior Envelope & Grading",
  "Basement & Crawl Space",
  "Insulation & Vapor Barrier",
  "Garage & Outbuildings",
];

// FAQ answers are now JSX (with links when needed)
const faqs: FAQ[] = [
  {
    question: "How much does a home inspection cost in Scarborough?",
    answer: (
      <>
        The average <strong>home inspection cost in Scarborough</strong> ranges from $450 to $750
        for a standard single‑family home. Condos typically cost $350‑$550, while larger properties
        may range from $650‑$900. We provide transparent, competitive pricing with no hidden fees.
      </>
    ),
  },
  {
    question: "What does a pre‑purchase home inspection include in Scarborough?",
    answer: (
      <>
        A pre‑purchase home inspection in Scarborough includes a thorough evaluation of all major
        systems: roof, structure, electrical, plumbing, HVAC, insulation, windows, doors, and
        interior finishes. We identify existing defects, safety hazards, and maintenance needs so
        you can make an informed buying decision.
      </>
    ),
  },
  {
    question: "How long does a home inspection take in Scarborough?",
    answer: (
      <>
        Most Scarborough home inspections take <strong>2 to 4 hours</strong>, depending on the
        property’s size, age, and condition. We never rush – we allocate sufficient time to examine
        every accessible area.
      </>
    ),
  },
  {
    question: "What are the most common home inspection scams?",
    answer: (
      <>
        Common scams include unlicensed or uncertified inspectors, missing major defects, or
        offering to perform repairs themselves (a conflict of interest). ASADS inspectors are fully
        licensed, certified, and provide unbiased, third‑party evaluations you can trust.
      </>
    ),
  },
  {
    question: "What are the biggest red flags in a home inspection?",
    answer: (
      <>
        Major red flags include foundation cracks, water damage or mold, outdated electrical
        (knob‑and‑tube, aluminum wiring), roof leaks, and signs of structural movement. Our
        inspectors are trained to spot these issues and explain their implications.
      </>
    ),
  },
  {
    question: "What's the worst thing a home inspector can find?",
    answer: (
      <>
        The most serious findings are major structural defects (e.g., compromised foundation),
        extensive water damage, hazardous electrical systems, or mold infestations. These can be
        costly to repair, but early detection gives you negotiation power or the chance to walk
        away.
      </>
    ),
  },
  {
    question: "What is the most common home inspection fail?",
    answer: (
      <>
        Roof problems, plumbing leaks, and HVAC inefficiencies are among the most common issues
        found. Many homes also have inadequate attic ventilation or insulation. Our detailed
        reports help you prioritize repairs.
      </>
    ),
  },
  {
    question: "Is the seller present during a home inspection in Canada?",
    answer: (
      <>
        In Ontario, sellers are typically not present during the inspection. Buyers and their agents
        are encouraged to attend to ask questions and learn about the property firsthand.
      </>
    ),
  },
  {
    question: "What is the most expensive part of a house to fix?",
    answer: (
      <>
        Foundation repairs, roof replacement, and HVAC system overhauls are typically the most
        costly. That’s why we pay special attention to these areas during your inspection.
      </>
    ),
  },
  {
    question: "Are home inspections required in Scarborough?",
    answer: (
      <>
        No, home inspections are not legally required in Ontario, but they are strongly
        recommended. Most buyers include an inspection condition in their offer to avoid expensive
        surprises after closing.
      </>
    ),
  },
  {
    question: "What are 5 red flag symptoms in a home inspection?",
    answer: (
      <>
        1. Water stains or musty odours (moisture intrusion) 2. Large foundation cracks 3.
        Mismatched or DIY electrical work 4. Sagging roof lines 5. Signs of pest infestation. Our
        inspectors are trained to detect these early.
      </>
    ),
  },
  {
    question: "Do you offer reliable home inspection services with warranty?",
    answer: (
      <>
        Yes, all our inspections come with a satisfaction guarantee and we stand behind our work.
        We also offer optional warranty programs for added peace of mind.
      </>
    ),
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Jennifer Lee",
    location: "Agincourt, Scarborough",
    content:
      "The ASADS home inspection in Scarborough was incredibly thorough. The inspector spent over 3 hours examining every detail and identified several issues we would have missed. The same‑day report helped us negotiate $10,000 in repairs. Highly recommend!",
    rating: 5,
  },
  {
    name: "Mark Williams",
    location: "Birch Cliff, Scarborough",
    content:
      "As first‑time home buyers in Scarborough, we were nervous about the inspection process. ASADS made it easy to understand and provided exceptional service. Their knowledge of older homes was invaluable.",
    rating: 5,
  },
  {
    name: "Susan Chen",
    location: "Guildwood, Scarborough",
    content:
      "We've used ASADS for multiple property inspections in the GTA. Their attention to detail is unmatched, especially with Scarborough's diverse housing stock. The thermal imaging service identified hidden moisture issues that saved us from a major repair.",
    rating: 5,
  },
];

const priceRange = "$450-$750";
const duration = "2-4 Hours";

// ============================================================================
// Schema Markup (unchanged but we'll keep them here)
// ============================================================================

// ============================================================================
// Reusable Components
// ============================================================================

interface ChecklistItemProps {
  item: string;
}

function ChecklistItem({ item }: ChecklistItemProps) {
  return (
    <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
      <div className="bg-primary/10 p-2 rounded-lg">
        <ClipboardCheck className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{item}</h3>
        <p className="text-sm text-muted-foreground">
          Thorough evaluation and detailed reporting of this critical component in your Scarborough
          property.
        </p>
      </div>
    </div>
  );
}

interface NeighborhoodCardProps {
  name: string;
  service: string;
}

function NeighborhoodCard({ name, service }: NeighborhoodCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border text-center">
      <MapPin className="h-5 w-5 text-primary mb-2" aria-hidden="true" />
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground mt-1">{service}</span>
    </div>
  );
}

interface BenefitItemProps {
  text: string;
}

function BenefitItem({ text }: BenefitItemProps) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-foreground">{text}</span>
    </li>
  );
}

interface ExpertisePointProps {
  text: string;
}

function ExpertisePoint({ text }: ExpertisePointProps) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-foreground">{text}</span>
    </li>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" aria-hidden="true" />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface FAQItemProps {
  faq: FAQ;
}

function FAQItem({ faq }: FAQItemProps) {
  return (
    <div className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <h3 className="font-heading font-semibold text-xl text-foreground mb-3">{faq.question}</h3>
      <div className="text-muted-foreground">{faq.answer}</div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================
export default function Scarborough() {
  const location = useLocation();
  const pageUrl = getCanonicalUrl(location.pathname);

  // Schema Markup (LocalBusiness, FAQ, Breadcrumb, WebPage) – unchanged but we need to pass the clean text for FAQ answers
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ASADS Home Inspection",
    image: `${SITE_URL}/images/logo.png`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "Scarborough",
      addressRegion: "ON",
      postalCode: "",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7765,
      longitude: -79.2318,
    },
    areaServed: [
      { "@type": "City", name: "Scarborough" },
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Markham" },
      { "@type": "City", name: "Pickering" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:00",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
    },
  };

  // For schema we need plain text, so we map faqs to extract text from React elements (simplified: we assume answers are plain text or we use a function to strip tags)
  // Since our answers now contain JSX, we need to provide plain text for schema. We'll reuse the previous answer strings (stripped of HTML) for schema.
  // Let's create a separate array of plain-text answers for schema.
  const faqPlainTextAnswers = [
    "The average home inspection cost in Scarborough ranges from $450 to $750 for a standard single‑family home. Condos typically cost $350‑$550, while larger properties may range from $650‑$900. We provide transparent, competitive pricing with no hidden fees.",
    "A pre‑purchase home inspection in Scarborough includes a thorough evaluation of all major systems: roof, structure, electrical, plumbing, HVAC, insulation, windows, doors, and interior finishes. We identify existing defects, safety hazards, and maintenance needs so you can make an informed buying decision.",
    "Most Scarborough home inspections take 2 to 4 hours, depending on the property’s size, age, and condition. We never rush – we allocate sufficient time to examine every accessible area.",
    "Common scams include unlicensed or uncertified inspectors, missing major defects, or offering to perform repairs themselves (a conflict of interest). ASADS inspectors are fully licensed, certified, and provide unbiased, third‑party evaluations you can trust.",
    "Major red flags include foundation cracks, water damage or mold, outdated electrical (knob‑and‑tube, aluminum wiring), roof leaks, and signs of structural movement. Our inspectors are trained to spot these issues and explain their implications.",
    "The most serious findings are major structural defects (e.g., compromised foundation), extensive water damage, hazardous electrical systems, or mold infestations. These can be costly to repair, but early detection gives you negotiation power or the chance to walk away.",
    "Roof problems, plumbing leaks, and HVAC inefficiencies are among the most common issues found. Many homes also have inadequate attic ventilation or insulation. Our detailed reports help you prioritize repairs.",
    "In Ontario, sellers are typically not present during the inspection. Buyers and their agents are encouraged to attend to ask questions and learn about the property firsthand.",
    "Foundation repairs, roof replacement, and HVAC system overhauls are typically the most costly. That’s why we pay special attention to these areas during your inspection.",
    "No, home inspections are not legally required in Ontario, but they are strongly recommended. Most buyers include an inspection condition in their offer to avoid expensive surprises after closing.",
    "1. Water stains or musty odours (moisture intrusion) 2. Large foundation cracks 3. Mismatched or DIY electrical work 4. Sagging roof lines 5. Signs of pest infestation. Our inspectors are trained to detect these early.",
    "Yes, all our inspections come with a satisfaction guarantee and we stand behind our work. We also offer optional warranty programs for added peace of mind.",
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqPlainTextAnswers[index],
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getCanonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: getCanonicalUrl("/locations"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Scarborough Home Inspection",
        item: pageUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    description: metaDescription,
    url: pageUrl,
    inLanguage: "en-CA",
    isPartOf: {
      "@type": "WebSite",
      name: "ASADS Home Inspection",
      url: SITE_URL,
    },
    breadcrumb: breadcrumbSchema,
    mainEntity: {
      "@type": "Service",
      serviceType: "Home Inspection",
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />

        {/* Keywords – optional, not used by Google but harmless */}
        <meta
          name="keywords"
          content={`${primaryKeyword}, ${secondaryKeywords.join(", ")}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/og-scarborough-home-inspection.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/twitter-scarborough-home-inspection.jpg`}
        />

        {/* Geo tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Scarborough" />
        <meta name="geo.position" content="43.7765;-79.2318" />
        <meta name="ICBM" content="43.7765, -79.2318" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 rounded-full text-sm font-medium">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Scarborough's Trusted Home Inspection Company
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Home Inspection Services in{" "}
              <span className="text-secondary">Scarborough</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Looking for the <strong>best home inspection in Scarborough</strong>? ASADS provides
              certified inspectors, same‑day digital reports, and competitive pricing starting at
              $450. We answer all your questions – from cost to red flags – so you can buy or sell
              with confidence.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" aria-hidden="true" />
                <span>{duration} Inspections</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <DollarSign className="h-5 w-5" aria-hidden="true" />
                <span>Starting at {priceRange.split("-")[0]}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/15 px-4 py-3 rounded-xl">
                <Shield className="h-5 w-5" aria-hidden="true" />
                <span>Certified Scarborough Inspectors</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  Schedule Scarborough Inspection
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={`tel:${SITE_PHONE}`}>
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Call {SITE_PHONE}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                When searching for <strong>home inspection companies in Scarborough</strong>,
                choosing certified professionals who know the local market is essential. ASADS
                Home Inspection provides comprehensive property assessments that answer your
                toughest questions and help you avoid costly surprises.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Your Trusted Partner for Home Inspections in Scarborough
              </h2>

              <p className="text-muted-foreground mb-6">
                Our{" "}
                <Link
                  to="/services/pre-purchase"
                  className="text-primary hover:underline font-medium"
                >
                  pre-purchase home inspection in Scarborough
                </Link>{" "}
                is designed to identify both obvious defects and hidden problems. From foundation
                assessments to roofing evaluations, our certified inspectors follow Ontario's
                Standards of Practice and give you the knowledge you need to negotiate with
                confidence.
              </p>

              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" aria-hidden="true" />
                  Scarborough Home Inspection Cost & Value
                </h3>
                <p className="text-muted-foreground">
                  The average <strong>home inspection cost in Scarborough</strong> ranges from $450
                  to $750 for a standard single‑family home. While price matters, the true value
                  comes from a thorough inspection that can save you thousands in unexpected
                  repairs and give you leverage in negotiations.
                </p>
              </div>
            </div>

            {/* What We Inspect */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Complete Scarborough Home Inspection Checklist
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {whatWeInspect.map((item) => (
                  <ChecklistItem key={item} item={item} />
                ))}
              </div>
            </div>

            {/* Core Services Grid */}
            <div>
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Professional Home Inspection Services in Scarborough
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Whether you're buying, selling, or building, our core inspection services give you
                  the clarity and confidence you need.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allServices.map((service, index) => (
                  <Card
                    key={index}
                    className="border-border/50 hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">{service.icon}</div>
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <Link
                        to={normalizePath(service.href)}
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                      >
                        Learn more about {service.anchorText} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  Explore All Home Inspection Services
                </Link>
              </div>
            </div>

            {/* Why Choose ASADS */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Why Choose ASADS for Home Inspection in Scarborough?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                    Professional Expertise & Credentials
                  </h3>
                  <ul className="space-y-3">
                    {expertisePoints.slice(0, 5).map((point) => (
                      <ExpertisePoint key={point.text} text={point.text} />
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-primary" aria-hidden="true" />
                    Customer Benefits & Value
                  </h3>
                  <ul className="space-y-3">
                    {benefits.slice(0, 5).map((benefit) => (
                      <BenefitItem key={benefit.text} text={benefit.text} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Local Service Areas */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Scarborough Neighborhoods We Serve
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {scarboroughNeighborhoods.map((hood) => (
                  <NeighborhoodCard key={hood.name} name={hood.name} service={hood.service} />
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Also serving all GTA communities including Toronto, Markham, Pickering, Ajax, and
                  beyond.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions About Home Inspection in Scarborough
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} faq={faq} />
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                What Scarborough Homeowners Say About Our Inspections
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Ready to Schedule Your Scarborough Home Inspection?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Book your comprehensive home inspection today. Our certified inspectors provide
                detailed assessments, same‑day reports, and the answers you need to move forward
                with confidence.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <PhoneCall className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Call Us</h3>
                  <a href={`tel:${SITE_PHONE}`} className="text-primary hover:underline text-xl font-bold">
                    {SITE_PHONE}
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Available 7 days a week</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Mail className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Email Us</h3>
                  <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline text-lg font-bold">
                    {SITE_EMAIL}
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Response within 2 hours</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Calendar className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">Book Online</h3>
                  <p className="text-muted-foreground">24/7 online booking available</p>
                  <Link
                    to="/booking"
                    className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Schedule Now
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/booking">
                    <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                    Book Your Scarborough Inspection Online
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${SITE_PHONE}`}>
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Call for Immediate Assistance
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
  }
