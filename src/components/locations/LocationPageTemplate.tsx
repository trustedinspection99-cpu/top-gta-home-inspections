import { buildLocalExpertise } from "@/lib/localExpertise";
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
  Star,
  AlertCircle
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

interface LocalInsight {
  title: string;
  content: string;
}

interface LocalExpertise {
  title: string;
  paragraphs: string[];
}

interface LocationPageTemplateProps {
  city: string;
  region: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  neighborhoods?: string[];
  phoneNumber: string;
  address?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  siteName?: string;
  services?: string[];
  specialtyServices?: SpecialtyService[];
  localInsights?: LocalInsight[];
  localExpertise?: LocalExpertise;
  allCities?: string[];
  slug?: string;
}

const featuredServices = [
  { name: "Pre-Purchase Inspection", slug: "pre-purchase" },
  { name: "Pre-Listing Inspection", slug: "pre-listing" },
  { name: "Condo Inspection", slug: "condo" },
  { name: "New Construction", slug: "new-construction" },
  { name: "Commercial Inspection", slug: "commercial" },
  { name: "Mold Inspection", slug: "mold-inspection" },
  { name: "Radon Testing", slug: "radon-testing" },
  { name: "Air Quality Testing", slug: "air-quality" },
  { name: "Asbestos Testing", slug: "asbestos-testing" },
  { name: "Thermal Imaging", slug: "thermal-imaging" },
  { name: "Sewer Scope", slug: "sewer-scope" },
  { name: "Well Water Testing", slug: "well-water-testing" },
  { name: "WETT Inspection", slug: "wett" },
  { name: "Lead Paint Testing", slug: "lead-paint-testing" },
];

export function LocationPageTemplate({
  city,
  region,
  description,
  metaTitle,
  metaDescription,
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
      description: "Advanced infrared inspections to detect hidden moisture, leaks, and insulation gaps.",
      icon: <Thermometer className="w-6 h-6 text-primary" />,
    },
    {
      name: "Mold Assessment",
      description: "Professional mold inspections to identify risks and protect indoor air quality.",
      icon: <Leaf className="w-6 h-6 text-primary" />,
    },
    {
      name: "WETT Inspection",
      description: "Certified WETT inspections for wood-burning stoves and fireplaces.",
      icon: <Shield className="w-6 h-6 text-primary" />,
    },
  ],
  localInsights = [],
  localExpertise,
  allCities = [],
  slug,
}: LocationPageTemplateProps) {
  // Use provided slug, fallback to generating from city name
  const locationSlug = slug || `home-inspection-${city.toLowerCase().replace(/\s+/g, "-")}`;
  const url = getCanonicalUrl(`/locations/${locationSlug}`);
  const pageTitle = metaTitle || `${city} Home Inspection | Certified Home Inspector`;
  const pageDescription =
    metaDescription ||
    `Professional home inspection services in ${city}. Certified inspectors, same-day reports, and comprehensive inspections. Call ${phoneNumber}.`;

  // LocalBusiness Schema
  const localBusinessSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}#localbusiness`,
      name: `${siteName} ${city}`,
      description: pageDescription,
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
      geo: latitude && longitude ? { "@type": "GeoCoordinates", latitude, longitude } : undefined,
      areaServed: {
        "@type": "City",
        name: city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: region
        }
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "150",
        bestRating: "5",
        worstRating: "1"
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "22:00"
      }
    }),
    [city, region, pageDescription, phoneNumber, address, postalCode, url, siteName, latitude, longitude]
  );

  // Breadcrumb Schema
  const breadcrumbSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: `${SITE_URL}/locations`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: city,
          item: url
        }
      ]
    }),
    [city, url]
  );

  // FAQ Schema - 5 questions for rich snippets
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How much does a home inspection cost in ${city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Home inspection costs in ${city} typically range from $400-$600 for a standard single-family home. Condos usually cost $350-$450. Contact ASADS at ${phoneNumber} for a personalized quote.`
          }
        },
        {
          "@type": "Question",
          name: `How long does a home inspection take in ${city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `A thorough home inspection in ${city} typically takes 2-4 hours depending on the property size and condition. You'll receive a same-day digital report.`
          }
        },
        {
          "@type": "Question",
          name: `What areas of ${city} do you serve?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `We serve all neighborhoods in ${city}${neighborhoods.length > 0 ? ` including ${neighborhoods.slice(0, 5).join(", ")}` : ""}. Our certified inspectors are familiar with local building practices and common issues.`
          }
        },
        {
          "@type": "Question",
          name: `Do I need to be present during my ${city} home inspection?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `While not required, we encourage ${city} buyers to attend the final hour of the inspection. This allows you to ask questions, see issues firsthand, and learn about the property's systems and maintenance needs.`
          }
        },
        {
          "@type": "Question",
          name: `What does a home inspection in ${city} include?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Our ${city} home inspections cover 400+ checkpoints including roof, foundation, plumbing, electrical, HVAC, insulation, windows, doors, and structural components. We also offer optional add-ons like radon testing, mold inspection, and thermal imaging.`
          }
        }
      ]
    }),
    [city, phoneNumber, neighborhoods]
  );

  // Service Schema with hasOfferCatalog
  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Home Inspection Services in ${city}`,
      serviceType: "Home Inspection",
      provider: {
        "@type": "LocalBusiness",
        name: siteName,
        telephone: phoneNumber,
        url
      },
      areaServed: {
        "@type": "City",
        name: city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: region
        }
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Home Inspection Services in ${city}`,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pre-Purchase Home Inspection",
              description: `Comprehensive buyer inspection for ${city} properties`
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pre-Listing Home Inspection",
              description: `Seller inspection services for ${city} homeowners`
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Thermal Imaging Inspection",
              description: `Advanced infrared diagnostics for ${city} properties`
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mold & Air Quality Testing",
              description: `Certified mold inspections for ${city} homes`
            }
          }
        ]
      }
    }),
    [city, region, phoneNumber, siteName, url]
  );

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={url} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`Home Inspection Services in ${city}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content={city} />
        {latitude && longitude && (
          <meta name="geo.position" content={`${latitude};${longitude}`} />
        )}
        
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-amber-300">
               <Star className="fill-current w-5 h-5" aria-hidden="true" />
               <span className="font-bold tracking-widest uppercase text-sm">Top Rated in {city}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              {city} Home Inspector
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-200" aria-hidden="true" />
                <span>2-4 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-200" aria-hidden="true" />
                <span>Same-Day Report</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-200" aria-hidden="true" />
                <span>$2M Liability Insured</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary" className="bg-white hover:bg-gray-100 text-blue-700 border-none font-bold">
                <Link to="/booking">Book Inspection in {city}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <a href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`} aria-label={`Call ${phoneNumber}`}>{phoneNumber}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Local Expertise Section */}
      {localExpertise && (
        <section className="py-16 bg-background">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
              {localExpertise.title}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {localExpertise.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              {/* Local Insights Section */}
              {localInsights && localInsights.length > 0 && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <AlertCircle className="text-blue-600 w-6 h-6" aria-hidden="true" />
                    Property Specifics for {city} Buyers
                  </h2>
                  <div className="grid gap-8">
                    {localInsights.map((insight, i) => (
                      <div key={i} className="border-l-2 border-blue-200 pl-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-2">{insight.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{insight.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Professional Inspection Services in {city}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-foreground font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialty Services */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Specialty Testing
                </h2>
                <div className="grid gap-6">
                  {specialtyServices.map((s) => (
                    <Card key={s.name} className="border-border/50">
                      <CardContent className="p-6 flex gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                          {s.icon}
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{s.name}</h3>
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
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Serving all of {city}</h2>
                  <div className="flex flex-wrap gap-2">
                    {neighborhoods.map((n) => (
                      <span key={n} className="px-3 py-1 bg-muted rounded-md text-sm text-muted-foreground border border-border/50">{n}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Available - Internal Linking */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Services Available in {city}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {featuredServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-colors text-sm"
                    >
                      <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-foreground">{service.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-none shadow-xl bg-slate-50 sticky top-24">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">Book Your Inspection</h3>
                  <p className="text-sm text-slate-600 mb-6">Same-day digital reports with every {city} property audit.</p>
                  <Button asChild className="w-full bg-primary text-white py-6 shadow-lg shadow-primary/20">
                    <Link to="/booking">Check Availability</Link>
                  </Button>
                  <p className="mt-4 text-sm text-slate-500">Or call <a href={`tel:${phoneNumber}`} className="text-primary font-bold">{phoneNumber}</a></p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions About {city} Home Inspections
            </h2>
            <div className="space-y-6">
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">How much does a home inspection cost in {city}?</h3>
                <p className="text-muted-foreground">Home inspection costs in {city} typically range from $400-$600 for a standard single-family home. Condos usually cost $350-$450. Contact us at {phoneNumber} for a personalized quote.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">How long does a home inspection take in {city}?</h3>
                <p className="text-muted-foreground">A thorough home inspection typically takes 2-4 hours depending on the property size and condition. You'll receive a same-day digital report with photos and detailed findings.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">What areas of {city} do you serve?</h3>
                <p className="text-muted-foreground">We serve all neighborhoods in {city}{neighborhoods.length > 0 ? ` including ${neighborhoods.slice(0, 5).join(", ")}` : ""}. Our certified inspectors are familiar with local building practices and common issues in the area.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">Do I need to be present during my {city} home inspection?</h3>
                <p className="text-muted-foreground">While not required, we encourage {city} buyers to attend the final hour of the inspection. This allows you to ask questions, see issues firsthand, and learn about the property's systems and maintenance needs.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">What does a home inspection in {city} include?</h3>
                <p className="text-muted-foreground">Our {city} home inspections cover 400+ checkpoints including roof, foundation, plumbing, electrical, HVAC, insulation, windows, doors, and structural components. We also offer optional add-ons like radon testing, mold inspection, and thermal imaging.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your {city} Home Inspection?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Get peace of mind with a thorough professional inspection. Book online or call today for same-day scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking">Book Online Now</Link>
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
