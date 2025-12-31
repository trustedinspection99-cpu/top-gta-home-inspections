import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock, Shield, Star, CheckCircle, ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

interface LocationPageProps {
  city: string;
  region: string;
  description: string;
  neighborhoods: string[];
  phoneNumber: string;
}

export function LocationPageTemplate({ city, region, description, neighborhoods, phoneNumber }: LocationPageProps) {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const locationUrl = `${SITE_URL}/locations/${citySlug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": `${SITE_URL}/locations`
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
    { name: "Pre-Purchase Inspection", description: "Thorough evaluation before you buy your new home" },
    { name: "Pre-Listing Inspection", description: "Sell faster with a professional pre-listing report" },
    { name: "New Construction Inspection", description: "Verify builder quality before your final walkthrough" },
    { name: "Specialty Testing", description: "Radon, mold, asbestos, and air quality testing" },
  ];

  const inspectionTypes = [
    "Pre-Purchase Inspections",
    "Pre-Listing Inspections",
    "Condo Inspections",
    "Commercial Inspections",
    "New Construction",
    "Tarion Warranty",
    "Radon & Mold Testing",
    "Thermal Imaging",
  ];

  const benefits = [
    "Same-day reports available",
    "Certified & insured inspectors",
    "200+ point inspections",
    "Upfront, transparent pricing",
    "15+ years experience",
    "Locally owned & operated",
  ];

  return (
    <Layout>
      <Helmet>
        <link rel="canonical" href={locationUrl} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
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
                <Link to="/contact">Book Online</Link>
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
              Comprehensive home inspection services for buyers, sellers, and property owners throughout {city}.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.name} className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
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
                {inspectionTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{type}</span>
                  </div>
                ))}
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
