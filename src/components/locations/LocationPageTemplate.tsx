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
  AlertCircle // Added for the new section
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

// Updated Interface to accept localInsights
interface LocalInsight {
  title: string;
  content: string;
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
  allCities?: string[];
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
  allCities = [],
}: LocationPageTemplateProps) {
  const location = useLocation();
  const slugifiedCity = city.toLowerCase().replace(/\s+/g, "-");
  const url = getCanonicalUrl(`/locations/${slugifiedCity}`);

  const schemaOrgJSONLD = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `${siteName} ${city}`,
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
      geo: latitude && longitude ? { "@type": "GeoCoordinates", latitude, longitude } : undefined,
      areaServed: city,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "150"
      },
    }),
    [city, region, description, phoneNumber, address, postalCode, url, siteName, latitude, longitude]
  );

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle || `#1 ${city} Home Inspector | Certified & Same Day Reports`}</title>
        <meta name="description" content={metaDescription || description} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-primary">
               <Star className="fill-current w-5 h-5" />
               <span className="font-bold tracking-widest uppercase text-sm">Top Rated in {city}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              {city} Home Inspector
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>2-4 Hour Inspections</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Same-Day Report</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>$2M Liability Insured</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary" className="bg-primary hover:bg-primary/90 text-white border-none">
                <Link to="/booking/">Book Inspection in {city}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <a href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}>{phoneNumber}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              
              {/* NEW SECTION: This renders the unique Toronto/Waterloo data */}
              {localInsights && localInsights.length > 0 && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <AlertCircle className="text-blue-600 w-6 h-6" />
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
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-none shadow-xl bg-slate-50 sticky top-24">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">Book Your Inspection</h3>
                  <p className="text-sm text-slate-600 mb-6">Same-day digital reports with every {city} property audit.</p>
                  <Button asChild className="w-full bg-primary text-white py-6 shadow-lg shadow-primary/20">
                    <Link to="/booking/">Check Availability</Link>
                  </Button>
                  <p className="mt-4 text-sm text-slate-500">Or call <a href={`tel:${phoneNumber}`} className="text-primary font-bold">{phoneNumber}</a></p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
