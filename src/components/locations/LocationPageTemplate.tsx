import { buildLocalExpertise } from "@/lib/localExpertise";
import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { InlineBookingForm } from "@/components/InlineBookingForm";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import {
  MapPin,
  CheckCircle,
  Phone,
  Thermometer,
  Leaf,
  Shield,
  Clock,
  FileText,
  ArrowRight,
  Star,
  AlertCircle,
  Award,
  BadgeCheck,
  DollarSign,
  ClipboardList
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
  address = "45 Duckworth Rd",
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
  // Use slug from data directly (already has home-inspection- prefix), fallback to derived
  const locationSlug = slug ?? `home-inspection-${city.toLowerCase().replace(/\s+/g, "-")}`;
  const url = getCanonicalUrl(`/locations/${locationSlug}`);
  const schemaPhone = `+1${phoneNumber.replace(/\D/g, '')}`;
  const rawPageTitle = metaTitle || `Home Inspection ${city} | Certified Inspector | ASADS`;
  const pageTitle = rawPageTitle.length > 60 ? rawPageTitle.slice(0, 57) + "..." : rawPageTitle;
  const rawPageDescription =
    metaDescription ||
    `Professional home inspection services in ${city}. Certified inspectors, same-day reports, and comprehensive inspections. Call ${phoneNumber}.`;
  const pageDescription = rawPageDescription.length > 160 ? rawPageDescription.slice(0, 157) + "..." : rawPageDescription;

  // LocalBusiness Schema
  const localBusinessSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}#localbusiness`,
      name: `${siteName} ${city}`,
      description: pageDescription,
      url,
      telephone: schemaPhone,
      priceRange: "$$",
      image: `${SITE_URL}/logo.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: city,
        addressRegion: region,
        postalCode,
        addressCountry: "CA",
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
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "22:00"
      }
    }),
    [city, region, pageDescription, phoneNumber, address, postalCode, url, siteName, latitude, longitude]
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
        telephone: schemaPhone,
        url,
        address: {
          "@type": "PostalAddress",
          streetAddress: "45 Duckworth Rd",
          addressLocality: "Cambridge",
          addressRegion: "ON",
          postalCode: "N3H 0C1",
          addressCountry: "CA"
        }
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
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Hero with inline booking form */}
      <HeroBookingSection
        badge={`Top Rated Home Inspector in ${city} · OAHI & InterNACHI Certified`}
        title={`${city} Home Inspector`}
        subtitle={
          <>
            {description}
            <span className="block mt-3 text-blue-200 text-sm">
              <Clock className="inline h-4 w-4 mr-1" />2–4 Hour Inspections &nbsp;·&nbsp;
              <FileText className="inline h-4 w-4 mr-1" />Same-Day Report &nbsp;·&nbsp;
              <Shield className="inline h-4 w-4 mr-1" />$2M Liability Insured
            </span>
          </>
        }
        priceCards={[
          { label: "Pre-Purchase", price: "From $399", href: "/services/pre-purchase" },
          { label: "Condo", price: "From $299", href: "/services/condo" },
          { label: "New Construction", price: "From $449", href: "/services/new-construction" },
        ]}
        city={city}
        formTitle={`Book in ${city}`}
        ctaPrimary={{ text: `Book Inspection in ${city}`, href: "/booking" }}
      />

      {/* Trust Badge Strip */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-semibold">
              <BadgeCheck className="w-5 h-5 text-primary" />
              InterNACHI Certified
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Award className="w-5 h-5 text-primary" />
              CAHPI Standards
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="w-5 h-5 text-primary" />
              $2M Liability Insured
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span>4.9★ &nbsp;·&nbsp; 150+ Reviews</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Clock className="w-5 h-5 text-primary" />
              Same-Day Report
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

              {/* Pricing Table */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-primary" aria-hidden="true" />
                  Home Inspection Cost in {city}
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">All-inclusive pricing · No hidden fees · HST included</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="text-left p-3 rounded-tl-lg">Property Type</th>
                        <th className="text-left p-3">Size</th>
                        <th className="text-right p-3 rounded-tr-lg">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium">Condo / Apartment</td>
                        <td className="p-3 text-muted-foreground">Any size</td>
                        <td className="p-3 text-right font-bold text-primary">From $299</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium">Townhouse</td>
                        <td className="p-3 text-muted-foreground">Up to 1,600 sq ft</td>
                        <td className="p-3 text-right font-bold text-primary">From $349</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium">Semi-Detached / Detached</td>
                        <td className="p-3 text-muted-foreground">Up to 1,600 sq ft</td>
                        <td className="p-3 text-right font-bold text-primary">From $399</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium">Detached Home</td>
                        <td className="p-3 text-muted-foreground">1,600–2,500 sq ft</td>
                        <td className="p-3 text-right font-bold text-primary">From $449</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium">Detached Home</td>
                        <td className="p-3 text-muted-foreground">2,500–4,000 sq ft</td>
                        <td className="p-3 text-right font-bold text-primary">From $499</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium">Luxury / 4,000+ sq ft</td>
                        <td className="p-3 text-muted-foreground">4,000+ sq ft</td>
                        <td className="p-3 text-right font-bold text-primary">From $599</td>
                      </tr>
                      <tr className="bg-blue-50 border-t-2 border-primary">
                        <td className="p-3 font-medium text-primary">Mold Inspection</td>
                        <td className="p-3 text-muted-foreground">Air sampling + lab</td>
                        <td className="p-3 text-right font-bold text-primary">From $299</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">* Thermal imaging included at no extra charge. Add-ons: Radon $499+ (2 visits) · Asbestos from $249 · WETT $249. <Link to="/pricing" className="text-primary underline">Full pricing →</Link></p>
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <ClipboardList className="w-6 h-6 text-primary" aria-hidden="true" />
                  What's Inspected in Every {city} Home Inspection
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Roof, gutters & drainage",
                    "Foundation & structure",
                    "Electrical panel & wiring",
                    "Plumbing supply & drain",
                    "Furnace & heat exchanger",
                    "Air conditioning system",
                    "Attic insulation & ventilation",
                    "Basement & crawlspace",
                    "Windows, doors & sealing",
                    "Exterior cladding & grading",
                    "Thermal imaging (IR scan)",
                    "Smoke & CO detector locations",
                    "Garage & fire separation",
                    "Fireplace & chimney (visual)",
                    "Kitchen & bathroom fixtures",
                    "HRV / ERV ventilation system",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">400+ checkpoints total · Delivered as a same-day digital PDF report with photos</p>
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
                      to={`/services/${service.slug}/${locationSlug.replace(/^home-inspection-/, '')}`}
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
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">Book in {city}</h3>
                  <p className="text-sm text-slate-600 mb-4">Same-day availability · 7 days a week</p>
                  <InlineBookingForm city={city} />
                  <p className="mt-3 text-center text-sm text-slate-500">Or call <a href={`tel:${phoneNumber}`} className="text-primary font-bold">{phoneNumber}</a></p>
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
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">Are ASADS home inspectors certified in {city}?</h3>
                <p className="text-muted-foreground">Yes. ASADS inspectors are InterNACHI certified, carry $2M liability insurance, and follow CAHPI standards of practice. We are experienced with the specific housing stock and construction eras found in {city} and throughout {region}.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">How soon can I get a home inspection in {city}?</h3>
                <p className="text-muted-foreground">ASADS offers same-day and next-day home inspection booking in {city}, available 7 days a week including evenings. Book online in minutes or call {phoneNumber} for immediate scheduling confirmation.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="font-bold text-lg mb-2">Do you provide a written report after the {city} home inspection?</h3>
                <p className="text-muted-foreground">Yes. Every inspection includes a detailed digital PDF report with photos, prioritized findings, maintenance recommendations, and repair cost guidance — delivered the same day as the inspection, typically within 2–4 hours of completion.</p>
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
