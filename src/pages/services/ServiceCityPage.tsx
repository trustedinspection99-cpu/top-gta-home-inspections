import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import { InlineBookingForm } from "@/components/InlineBookingForm";
import { serviceBySlug } from "@/data/serviceCityData";
import { locationData } from "@/data/locationData";
import { getCanonicalUrl, SITE_URL } from "@/lib/seo";
import {
  CheckCircle,
  ArrowRight,
  MapPin,
  Clock,
  FileText,
  Shield,
} from "lucide-react";

/** Replace all {city} tokens in a string */
function fill(template: string, city: string) {
  return template.replace(/\{city\}/g, city);
}

const BENEFITS = [
  "OAHI & InterNACHI certified inspectors",
  "Same-day digital report delivery",
  "400-point inspection checklist",
  "Thermal imaging available as add-on",
  "Available 7 days a week",
  "No hidden fees — flat-rate pricing",
  "Phone support after the inspection",
  "Independent — we never do repairs",
];

const ALSO_SERVING: [string, string][] = [
  ["Toronto", "toronto"],
  ["Mississauga", "mississauga"],
  ["Brampton", "brampton"],
  ["Vaughan", "vaughan"],
  ["Markham", "markham"],
  ["Richmond Hill", "richmond-hill"],
  ["Oakville", "oakville"],
  ["Burlington", "burlington"],
  ["Hamilton", "hamilton"],
  ["Kitchener", "kitchener"],
  ["Waterloo", "waterloo"],
  ["Guelph", "guelph"],
  ["Oshawa", "oshawa"],
  ["Barrie", "barrie"],
  ["Pickering", "pickering"],
];

export default function ServiceCityPage() {
  const { serviceSlug, citySlug } = useParams<{
    serviceSlug: string;
    citySlug: string;
  }>();

  const service = serviceSlug ? serviceBySlug[serviceSlug] : undefined;
  const location = locationData.find(
    (l) => l.slug === `home-inspection-${citySlug}`
  );

  if (!service || !location) {
    return <Navigate to="/services" replace />;
  }

  const city = location.city;
  const canonical = getCanonicalUrl(`/services/${service.slug}/${citySlug}`);
  const rawTitle = fill(service.metaTitleTemplate, city);
  const metaTitle = rawTitle.length > 60 ? rawTitle.slice(0, 57) + "…" : rawTitle;
  const rawDesc = fill(service.metaDescTemplate, city);
  const metaDesc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + "…" : rawDesc;
  const heroTitle = fill(service.heroTitle, city);
  const whyItMatters = fill(service.whyItMatters, city);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getCanonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: getCanonicalUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.shortName, item: getCanonicalUrl(`/services/${service.slug}`) },
      { "@type": "ListItem", position: 4, name: city, item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: fill(service.name, city),
    description: metaDesc,
    url: canonical,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "ASADS Home Inspection",
      telephone: "+16478019311",
      email: "info@asads.ca",
    },
    areaServed: { "@type": "City", name: city },
    offers: {
      "@type": "Offer",
      price: parseInt(service.price.replace(/[^0-9]/g, ""), 10),
      priceCurrency: "CAD",
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: fill(faq.q, city),
      acceptedAnswer: { "@type": "Answer", text: fill(faq.a, city) },
    })),
  };

  const relatedForCity = service.relatedServices.map((r) => ({
    title: r.name,
    href: `/services/${r.slug}/${citySlug}`,
  }));

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:locale" content="en_CA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero with inline booking form */}
      <HeroBookingSection
        badge={`ASADS Inspection Services · OAHI & InterNACHI Certified · ${city}, Ontario`}
        title={heroTitle}
        subtitle={
          <>
            {metaDesc}
            <span className="block mt-3 text-blue-200 text-sm">
              <Clock className="inline h-4 w-4 mr-1" />{service.duration} &nbsp;·&nbsp;
              <FileText className="inline h-4 w-4 mr-1" />Same-Day Report &nbsp;·&nbsp;
              <Shield className="inline h-4 w-4 mr-1" />Certified Inspectors &nbsp;·&nbsp;
              Starting at <strong className="text-green-300">{service.price}</strong>
            </span>
          </>
        }
        priceCards={[
          { label: "Starting at", price: service.price },
          { label: "Same-Day", price: "Digital Report" },
          { label: "No Hidden", price: "Fees" },
        ]}
        defaultService={service.name}
        city={city}
        formTitle={`Book ${service.shortName} in ${city}`}
        ctaPrimary={{ text: "Book Your Inspection", href: "/booking" }}
      />

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Main Column ── */}
            <div className="lg:col-span-2 space-y-12">

              {/* About this service in city */}
              <div className="prose prose-lg max-w-none">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {service.shortName} in {city}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{whyItMatters}</p>

                {/* Local insights if available */}
                {location.localInsights && location.localInsights.length > 0 && (
                  <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl not-prose">
                    <h3 className="font-bold text-blue-900 mb-3 text-lg">
                      Local Inspection Insights for {city}
                    </h3>
                    <ul className="space-y-2">
                      {location.localInsights.map((insight, i) => (
                        <li key={i} className="text-blue-800 text-sm">
                          <span className="font-semibold">{insight.title}: </span>
                          <span>{insight.content}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* What We Inspect */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What We Inspect
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.whatWeCheck.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  How It Works
                </h2>
                <div className="grid gap-6">
                  {service.processSteps.map((step, i) => (
                    <Card key={step.title} className="border-border/50">
                      <CardContent className="p-6 flex gap-4 items-start">
                        <span className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground">{step.body}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Neighborhoods */}
              {location.neighborhoods && location.neighborhoods.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                    {service.shortName} Across {city}
                  </h2>
                  <p className="text-muted-foreground mb-5 text-sm">
                    ASADS provides {service.shortName.toLowerCase()} throughout {city} including these neighbourhoods:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {location.neighborhoods.map((n) => (
                      <span
                        key={n}
                        className="px-3 py-1 bg-blue-50 border border-blue-100 text-slate-700 text-sm rounded-full"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {service.shortName} in {city} — FAQs
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="border border-border rounded-lg p-6">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {fill(faq.q, city)}
                      </h3>
                      <p className="text-muted-foreground">{fill(faq.a, city)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* Booking Form */}
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                    Book {service.shortName} in {city}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Same-day availability · 7 days a week
                  </p>
                  <InlineBookingForm defaultService={service.name} />
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Or call{" "}
                    <a
                      href="tel:+16478019311"
                      className="text-primary hover:underline font-medium"
                    >
                      (647) 801-9311
                    </a>
                  </p>
                </CardContent>
              </Card>

              {/* Why Choose ASADS */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Why Choose ASADS?
                  </h3>
                  <ul className="space-y-3">
                    {BENEFITS.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Related Services */}
              {relatedForCity.length > 0 && (
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                      Related Services in {city}
                    </h3>
                    <ul className="space-y-3">
                      {relatedForCity.map((s) => (
                        <li key={s.href}>
                          <Link
                            to={s.href}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4" />
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* View Full Service Page */}
              <Card className="border-blue-100 bg-blue-50/50">
                <CardContent className="p-5">
                  <p className="text-sm text-slate-600 mb-3">
                    Want the complete guide to {service.shortName.toLowerCase()}?
                  </p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Full {service.shortName} Guide
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas — same service, other cities */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              {service.shortName} Available Across Ontario
            </h2>
            <p className="text-muted-foreground">
              We provide {service.shortName.toLowerCase()} in Toronto and all surrounding cities
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {ALSO_SERVING.filter(([, c]) => c !== citySlug).map(([name, slug]) => (
              <Link
                key={slug}
                to={`/services/${service.slug}/${slug}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                {name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/locations"
              className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
            >
              View all service areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Book Your {service.shortName} in {city} Today
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Same-day availability · {service.price} · Digital report delivered same day
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
                <a href="tel:+16478019311">(647) 801-9311</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
