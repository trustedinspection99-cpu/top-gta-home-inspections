import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock, Shield, Star, CheckCircle, ArrowRight } from "lucide-react";
import { getCanonicalUrl, normalizePath } from "@/lib/seo";

interface LocationPageProps {
  city: string;
  region: string;
  description: string;
  neighborhoods: string[];
  phoneNumber: string;
}

// All locations for cross-linking
const allLocations = [
  // Toronto & Surrounding
  { name: "Toronto", slug: "toronto", region: "Toronto" },
  { name: "North York", slug: "north-york", region: "Toronto" },
  { name: "Scarborough", slug: "scarborough", region: "Toronto" },
  { name: "Etobicoke", slug: "etobicoke", region: "Toronto" },
  { name: "East York", slug: "east-york", region: "Toronto" },
  // Peel Region
  { name: "Mississauga", slug: "mississauga", region: "Peel" },
  { name: "Brampton", slug: "brampton", region: "Peel" },
  { name: "Caledon", slug: "caledon", region: "Peel" },
  { name: "Bolton", slug: "bolton", region: "Peel" },
  // York Region
  { name: "Vaughan", slug: "vaughan", region: "York" },
  { name: "Markham", slug: "markham", region: "York" },
  { name: "Richmond Hill", slug: "richmond-hill", region: "York" },
  { name: "Newmarket", slug: "newmarket", region: "York" },
  { name: "Aurora", slug: "aurora", region: "York" },
  { name: "King City", slug: "king-city", region: "York" },
  { name: "Stouffville", slug: "stouffville", region: "York" },
  { name: "Georgina", slug: "georgina", region: "York" },
  { name: "East Gwillimbury", slug: "east-gwillimbury", region: "York" },
  { name: "Keswick", slug: "keswick", region: "York" },
  { name: "Sutton", slug: "sutton", region: "York" },
  { name: "Woodbridge", slug: "woodbridge", region: "York" },
  { name: "Thornhill", slug: "thornhill", region: "York" },
  { name: "Maple", slug: "maple", region: "York" },
  { name: "Kleinburg", slug: "kleinburg", region: "York" },
  { name: "Concord", slug: "concord", region: "York" },
  { name: "Unionville", slug: "unionville", region: "York" },
  // Halton Region
  { name: "Oakville", slug: "oakville", region: "Halton" },
  { name: "Burlington", slug: "burlington", region: "Halton" },
  { name: "Milton", slug: "milton", region: "Halton" },
  { name: "Halton Hills", slug: "halton-hills", region: "Halton" },
  { name: "Georgetown", slug: "georgetown", region: "Halton" },
  { name: "Acton", slug: "acton", region: "Halton" },
  // Durham Region
  { name: "Oshawa", slug: "oshawa", region: "Durham" },
  { name: "Whitby", slug: "whitby", region: "Durham" },
  { name: "Ajax", slug: "ajax", region: "Durham" },
  { name: "Pickering", slug: "pickering", region: "Durham" },
  { name: "Clarington", slug: "clarington", region: "Durham" },
  { name: "Bowmanville", slug: "bowmanville", region: "Durham" },
  { name: "Uxbridge", slug: "uxbridge", region: "Durham" },
  { name: "Scugog", slug: "scugog", region: "Durham" },
  { name: "Port Perry", slug: "port-perry", region: "Durham" },
  { name: "Brock", slug: "brock", region: "Durham" },
  { name: "Beaverton", slug: "beaverton", region: "Durham" },
  { name: "Cannington", slug: "cannington", region: "Durham" },
  // Simcoe County
  { name: "Barrie", slug: "barrie", region: "Simcoe" },
  { name: "Orillia", slug: "orillia", region: "Simcoe" },
  { name: "Innisfil", slug: "innisfil", region: "Simcoe" },
  { name: "Bradford", slug: "bradford", region: "Simcoe" },
  { name: "Alliston", slug: "alliston", region: "Simcoe" },
  { name: "Collingwood", slug: "collingwood", region: "Simcoe" },
  { name: "Wasaga Beach", slug: "wasaga-beach", region: "Simcoe" },
  { name: "Midland", slug: "midland", region: "Simcoe" },
  { name: "Penetanguishene", slug: "penetanguishene", region: "Simcoe" },
  { name: "New Tecumseth", slug: "new-tecumseth", region: "Simcoe" },
  { name: "Essa", slug: "essa", region: "Simcoe" },
  { name: "Springwater", slug: "springwater", region: "Simcoe" },
  { name: "Clearview", slug: "clearview", region: "Simcoe" },
  { name: "Stayner", slug: "stayner", region: "Simcoe" },
  // Hamilton-Niagara
  { name: "Hamilton", slug: "hamilton", region: "Hamilton-Niagara" },
  { name: "Stoney Creek", slug: "stoney-creek", region: "Hamilton-Niagara" },
  { name: "Ancaster", slug: "ancaster", region: "Hamilton-Niagara" },
  { name: "Dundas", slug: "dundas", region: "Hamilton-Niagara" },
  { name: "Flamborough", slug: "flamborough", region: "Hamilton-Niagara" },
  { name: "Grimsby", slug: "grimsby", region: "Hamilton-Niagara" },
  { name: "Beamsville", slug: "beamsville", region: "Hamilton-Niagara" },
  { name: "Lincoln", slug: "lincoln", region: "Hamilton-Niagara" },
  { name: "St. Catharines", slug: "st-catharines", region: "Hamilton-Niagara" },
  { name: "Niagara Falls", slug: "niagara-falls", region: "Hamilton-Niagara" },
  { name: "Niagara-on-the-Lake", slug: "niagara-on-the-lake", region: "Hamilton-Niagara" },
  { name: "Welland", slug: "welland", region: "Hamilton-Niagara" },
  { name: "Fort Erie", slug: "fort-erie", region: "Hamilton-Niagara" },
  { name: "Port Colborne", slug: "port-colborne", region: "Hamilton-Niagara" },
  { name: "Thorold", slug: "thorold", region: "Hamilton-Niagara" },
  // Waterloo Region
  { name: "Kitchener", slug: "kitchener", region: "Waterloo" },
  { name: "Waterloo", slug: "waterloo", region: "Waterloo" },
  { name: "Cambridge", slug: "cambridge", region: "Waterloo" },
  // Wellington & Dufferin
  { name: "Guelph", slug: "guelph", region: "Wellington" },
  { name: "Orangeville", slug: "orangeville", region: "Dufferin" },
  // Kawartha & Peterborough
  { name: "Peterborough", slug: "peterborough", region: "Peterborough" },
  // Northumberland & Brant
  { name: "Cobourg", slug: "cobourg", region: "Northumberland" },
  { name: "Brantford", slug: "brantford", region: "Brant" },
];

// Get nearby locations based on current city
function getNearbyLocations(currentCitySlug: string, count: number = 8) {
  const currentLocation = allLocations.find(loc => loc.slug === currentCitySlug);
  if (!currentLocation) return allLocations.slice(0, count);
  
  // First, get locations from the same region
  const sameRegion = allLocations.filter(
    loc => loc.region === currentLocation.region && loc.slug !== currentCitySlug
  );
  
  // Then get locations from other regions
  const otherRegions = allLocations.filter(
    loc => loc.region !== currentLocation.region && loc.slug !== currentCitySlug
  );
  
  // Combine: same region first, then others, limited to count
  return [...sameRegion, ...otherRegions].slice(0, count);
}

export function LocationPageTemplate({ city, region, description, neighborhoods, phoneNumber }: LocationPageProps) {
  const location = useLocation();
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const locationUrl = getCanonicalUrl(location.pathname);
  const nearbyLocations = getNearbyLocations(citySlug, 8);

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
        "name": `Home Inspection ${city}`,
        "item": locationUrl
      }
    ]
  };

  const services = [
    { name: "Pre-Purchase Inspection", description: "Thorough evaluation before you buy your new home", href: "/services/pre-purchase" },
    { name: "Pre-Listing Inspection", description: "Sell faster with a professional pre-listing report", href: "/services/pre-listing" },
    { name: "New Construction Inspection", description: "Verify builder quality before your final walkthrough", href: "/services/new-construction" },
    { name: "Specialty Testing", description: "Radon, mold, asbestos, and air quality testing", href: "/services/radon-testing" },
  ];

  // Location-specific FAQs for schema markup
  const locationFaqs = [
    {
      question: `How much does a home inspection cost in ${city}?`,
      answer: `Home inspection costs in ${city} typically range from $400-$600 for a standard single-family home, depending on size and age. Condos are usually $350-$450. Contact us at ${phoneNumber} for a personalized quote.`
    },
    {
      question: `How long does a home inspection take in ${city}?`,
      answer: `A typical home inspection in ${city} takes 2-4 hours depending on the property size and age. Larger homes or those with additional features may take longer. We recommend buyers attend to ask questions.`
    },
    {
      question: `Do you offer same-day inspection reports in ${city}?`,
      answer: `Yes! We deliver detailed inspection reports within 24 hours of completing inspections in ${city}, often same-day. Reports include photos, descriptions of issues, and recommendations.`
    },
    {
      question: `What areas do you serve near ${city}?`,
      answer: `We serve ${city} and all surrounding ${region} communities. Our certified inspectors cover the entire Greater Toronto Area within a 150km radius.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": locationFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };


  const benefits = [
    "Same-day reports available",
    "Certified & insured inspectors",
    "200+ point inspections",
    "Upfront, transparent pricing",
    "15+ years experience",
    "Locally owned & operated",
  ];

  // Generate unique location-specific intro paragraph
  const locationIntro = `Looking for a certified home inspector in ${city}? ASADS provides comprehensive property inspections throughout ${city} and ${region}, helping buyers and sellers make informed decisions. Our local expertise means we understand the specific housing challenges in your area.`;

  return (
    <Layout>
      <Helmet>
        <link rel="canonical" href={locationUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Home Inspection ${city} | ASADS`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={locationUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={`${getCanonicalUrl("/")}/og-image.jpg`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={`Home Inspection ${city} | ASADS`} />
        <meta name="twitter:description" content={description} />
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              <MapPin className="h-4 w-4" />
              Serving {city}, {region}
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Home Inspection in {city}
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              {description}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  Call Now: {phoneNumber}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to={normalizePath("/contact")}>Book Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-muted/50 py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <span>4.9★ Rating (500+ Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Same-Day Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Our Services in {city}
            </h2>
            <p className="text-lg text-muted-foreground">
              {locationIntro}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.name} to={normalizePath(service.href)} className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md hover:border-primary">
                <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="gap-2" asChild>
              <Link to={normalizePath("/services")}>
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Inspection Services */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Inspection Services in {city}
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Our certified inspectors provide comprehensive property assessments for all types of homes.
                From condos to commercial properties, we have you covered.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: "Pre-Purchase Inspections", href: "/services/pre-purchase" },
                  { name: "Pre-Listing Inspections", href: "/services/pre-listing" },
                  { name: "Condo Inspections", href: "/services/condo" },
                  { name: "Commercial Inspections", href: "/services/commercial" },
                  { name: "New Construction", href: "/services/new-construction" },
                  { name: "WETT Inspections", href: "/services/wett" },
                  { name: "Radon & Mold Testing", href: "/services/radon-testing" },
                  { name: "Thermal Imaging", href: "/services/thermal-imaging" },
                ].map((type) => (
                  <Link key={type.name} to={normalizePath(type.href)} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{type.name}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link to={normalizePath("/locations")}>
                    <MapPin className="h-4 w-4" />
                    View All Locations
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl bg-primary/5 p-8">
              <h3 className="mb-4 text-xl font-semibold">Why Choose ASADS in {city}?</h3>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Areas We Serve in {city}
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional home inspection services throughout {city} and surrounding neighborhoods.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {neighborhoods.map((neighborhood) => (
              <span
                key={neighborhood}
                className="rounded-full border bg-card px-4 py-2 text-sm font-medium"
              >
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Locations - Internal Linking */}
      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Also Serving Nearby Areas
            </h2>
            <p className="text-muted-foreground">
              Need an inspection in a neighboring community? We serve all of these areas too.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {nearbyLocations.map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}/`}
                className="flex items-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:border-primary hover:bg-primary/5"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{location.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="gap-2" asChild>
              <Link to={normalizePath("/locations")}>
                View All {allLocations.length} Locations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Need a Home Inspection in {city}?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Protect your investment with a thorough home inspection. Our certified inspectors provide 
              detailed reports throughout {city}.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  {phoneNumber}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary gap-2" asChild>
                <Link to="/contact">
                  Schedule Service
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
