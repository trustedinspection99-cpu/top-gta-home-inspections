import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import {
  MapPin,
  CheckCircle,
  Phone,
  Thermometer,
  Leaf,
  Shield,
  Calendar,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react";

interface SpecialtyService {
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface Article {
  title: string;
  slug: string;
}

interface LocationPageTemplateProps {
  city: string;
  region: string;
  description: string;
  neighborhoods?: string[];
  phoneNumber: string;
  address?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  siteName?: string;
  services?: string[];
  specialtyServices?: SpecialtyService[];
  allCities?: string[];
}

// Featured services for location pages internal linking
const featuredServices = [
  { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
  { name: "Pre-Listing Inspection", slug: "pre-listing" },
  { name: "Condo Inspection", slug: "condo" },
  { name: "New Construction", slug: "new-construction" },
  { name: "Mold Inspection", slug: "mold-inspection" },
  { name: "Thermal Imaging", slug: "thermal-imaging" },
];

export function LocationPageTemplate({
  city,
  region,
  description,
  neighborhoods = [],
  phoneNumber,
  address = "Ontario, Canada",
  postalCode = "",
  latitude,
  longitude,
  siteName = "ASADS Home Inspection",
  services = [
    "Pre-Purchase Inspection",
    "Pre-Listing Inspection",
    "Condo Inspection",
    "Mold Assessment",
    "Thermal Imaging",
    "Warranty Inspection",
  ],
  specialtyServices = [
    {
      name: "Thermal Imaging",
      description:
        "Advanced infrared inspections to detect hidden moisture, leaks, and insulation gaps.",
      icon: <Thermometer className="w-6 h-6 text-primary" />,
    },
    {
      name: "Mold Assessment",
      description:
        "Professional mold inspections to identify risks and protect indoor air quality.",
      icon: <Leaf className="w-6 h-6 text-primary" />,
    },
    {
      name: "WETT Inspection",
      description:
        "Certified WETT inspections for wood-burning stoves and fireplaces.",
      icon: <Shield className="w-6 h-6 text-primary" />,
    },
  ],
  allCities = [],
}: LocationPageTemplateProps) {
  const location = useLocation();
  const slugifiedCity = city.toLowerCase().replace(/\s+/g, "-");
  const url = getCanonicalUrl(`/locations/${slugifiedCity}`);

  /* -------------------- DYNAMIC ARTICLES -------------------- */
  const articles: Article[] = [
    {
      title: "Mold Prevention Tips for Homeowners",
      slug: "mold-prevention-homeowners",
    },
    {
      title: "New Construction Inspection Checklist",
      slug: "new-construction-inspection",
    },
    {
      title: "First-Time Home Buyer Inspection Guide",
      slug: "first-time-buyer-inspection",
    },
  ];

  /* -------------------- SCHEMAS -------------------- */
  const schemaOrgJSONLD = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteName,
      description,
      url,
      telephone: phoneNumber,
      priceRange: "$$",
      image: `${SITE_URL}/logo.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: city,
        addressRegion: region,
        postalCode,
        addressCountry: "Canada",
      },
      geo:
        latitude && longitude
          ? {
              "@type": "GeoCoordinates",
              latitude,
              longitude,
            }
          : undefined,
      areaServed: city,
      sameAs: [
        "https://www.facebook.com/share/1ZhWQk97YY/",
        "https://www.instagram.com/asads_home_inspection",
        "https://youtube.com/@asadshomeinspection",
        "https://tiktok.com/@asads_home_inspection",
        "https://x.com/AsadsInspection",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Home Inspection Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s,
            areaServed: city,
          },
        })),
      },
    }),
    [city, region, description, phoneNumber, address, postalCode, services, url, siteName, latitude, longitude]
  );

  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${SITE_URL}/locations/`,
      },
      { "@type": "ListItem", position: 3, name: city, item: url },
    ],
  };

  const faqJSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does a home inspection cost in ${city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Home inspection prices in ${city} typically range between $400 and $600 depending on property size and inspection type.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does a home inspection take in ${city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Most home inspections in ${city} take between 2 and 4 hours.`,
        },
      },
    ],
  };

  /* -------------------- PAGE -------------------- */
  return (
    <Layout>
      <Helmet>
        <title>{`${city} Home Inspector | Certified Home Inspections`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={`${city} Home Inspector | ASADS`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={`${city} Home Inspector | ASADS`} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJSONLD)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqJSONLD)}
        </script>
      </Helmet>

      {/* Hero Section - Navy Blue matching services */}
      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  ASADS Home Inspection
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-bold">
                  {city} Home Inspector
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>2-4 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Same-Day Report</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Certified Inspectors</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking/">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Inspection in {city}
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {phoneNumber}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Services */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Professional Home Inspection Services in {city}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{service} in {city}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialty Services */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Specialty Home Inspection Services
                </h2>
                <div className="grid gap-6">
                  {specialtyServices.map((s) => (
                    <Card key={s.name} className="border-border/50">
                      <CardContent className="p-6 flex gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {s.icon}
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                            {s.name}
                          </h3>
                          <p className="text-muted-foreground">{s.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Neighborhoods */}
              {neighborhoods.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                    Areas We Serve in {city}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {neighborhoods.map((neighborhood) => (
                      <span
                        key={neighborhood}
                        className="px-4 py-2 rounded-full bg-muted text-foreground text-sm"
                      >
                        {neighborhood}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Section */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Home Inspection Insights in {city}
                </h2>

                <div className="space-y-8">
                  <article>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Top Tips for Pre-Purchase Inspections in {city}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Buying a home in {city} is a major investment. A professional pre-purchase
                      home inspection helps uncover hidden issues that may not be visible during
                      a showing. Our certified inspectors evaluate roofing, structure, plumbing,
                      electrical systems, HVAC, insulation, and more.
                    </p>
                    <Link
                      to="/services/pre-purchase/"
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      Learn more about Pre-Purchase Inspections
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      How to Prepare Your Home for a Pre-Listing Inspection in {city}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      A pre-listing inspection allows sellers in {city} to identify and address
                      potential concerns before putting their home on the market. This proactive
                      approach can increase buyer confidence and reduce last-minute negotiations.
                    </p>
                    <Link
                      to="/services/pre-listing/"
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      Learn more about Pre-Listing Inspections
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Understanding Mold Risks in {city} Homes
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Mold is a common concern in homes throughout {city}, especially in basements,
                      bathrooms, and areas with poor ventilation. Undetected moisture problems can
                      lead to mold growth that affects indoor air quality and occupant health.
                    </p>
                    <Link
                      to="/services/mold-inspection/"
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      Learn more about Mold Assessments
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      How much does a home inspection cost in {city}?
                    </h3>
                    <p className="text-muted-foreground">
                      Home inspection prices in {city} typically range between $400 and $600 depending on property size and inspection type.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      How long does a home inspection take in {city}?
                    </h3>
                    <p className="text-muted-foreground">
                      Most home inspections in {city} take between 2 and 4 hours depending on the size and age of the property.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Book Now Card */}
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Book a Certified Inspector in {city}
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Same-Day Digital Reports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Licensed & Insured</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Thermal Imaging Included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">15+ Years Experience</span>
                    </li>
                  </ul>
                  <div className="pt-6 border-t border-border">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/booking/">Book Now</Link>
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-3">
                      or call <a href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`} className="text-primary hover:underline">{phoneNumber}</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Our Services */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Our Services
                  </h3>
                  <ul className="space-y-3">
                    {featuredServices.map((service) => (
                      <li key={service.slug}>
                        <Link 
                          to={`/services/${service.slug}/`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-4 w-4" />
                          {service.name}
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Book a Certified Home Inspector in {city}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Call us today to schedule your professional home inspection. Get peace of mind before you buy or sell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking/">Book Online Now</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}>{phoneNumber}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
