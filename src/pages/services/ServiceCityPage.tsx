import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { serviceBySlug } from "@/data/serviceCityData";
import { locationData } from "@/data/locationData";
import { getCanonicalUrl, SITE_NAME } from "@/lib/seo";
import {
  CheckCircle,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";

/** Replace all {city} tokens in a string */
function fill(template: string, city: string) {
  return template.replace(/\{city\}/g, city);
}

export default function ServiceCityPage() {
  const { serviceSlug, citySlug } = useParams<{
    serviceSlug: string;
    citySlug: string;
  }>();

  const service = serviceSlug ? serviceBySlug[serviceSlug] : undefined;
  // citySlug is the clean slug (e.g. "brampton"), location slug is "home-inspection-brampton"
  const location = locationData.find((l) => l.slug === `home-inspection-${citySlug}`);

  if (!service || !location) {
    return <Navigate to="/services" replace />;
  }

  const city = location.city;
  const canonical = getCanonicalUrl(`/services/${service.slug}/${citySlug}`);
  const metaTitle = fill(service.metaTitleTemplate, city);
  const metaDesc = fill(service.metaDescTemplate, city);
  const heroTitle = fill(service.heroTitle, city);
  const whyItMatters = fill(service.whyItMatters, city);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: fill(service.name, city),
    description: metaDesc,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: "(647) 801-9311",
      areaServed: city,
    },
    areaServed: {
      "@type": "City",
      name: city,
    },
    offers: {
      "@type": "Offer",
      price: service.price.replace(/[^0-9]/g, ""),
      priceCurrency: "CAD",
      description: service.price,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: fill(faq.q, city),
      acceptedAnswer: {
        "@type": "Answer",
        text: fill(faq.a, city),
      },
    })),
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-blue-300 text-sm font-medium mb-4">
            <MapPin size={16} />
            <span>{city}, Ontario</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {metaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8"
            >
              <Link to="/booking">Book Your Inspection</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              <a href="tel:6478019311">
                <Phone size={18} className="mr-2" />
                (647) 801-9311
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-blue-200">
            <span className="flex items-center gap-1">
              <DollarSign size={16} className="text-green-400" />
              {service.price}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} className="text-yellow-400" />
              {service.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400" />
              Same-Day Report
            </span>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-5">
            {service.shortName} in {city}
          </h2>
          <p className="text-slate-600 leading-relaxed text-base">{whyItMatters}</p>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
            What We Inspect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.whatWeCheck.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <span className="text-slate-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
            How It Works
          </h2>
          <ol className="space-y-6">
            {service.processSteps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-5">
                <span className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Neighborhoods Served */}
      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <section className="py-12 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              {service.shortName} Across {city}
            </h2>
            <p className="text-slate-600 mb-5 text-sm">
              ASADS provides {service.shortName.toLowerCase()} throughout {city} including:
            </p>
            <div className="flex flex-wrap gap-2">
              {location.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="px-3 py-1 bg-white border border-blue-100 text-slate-700 text-sm rounded-full shadow-sm"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
            {service.shortName} in {city} — FAQs
          </h2>
          <div className="space-y-6">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 mb-2 text-base">
                  {fill(faq.q, city)}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {fill(faq.a, city)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">
            Related Services in {city}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {service.relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                to={`/services/${rel.slug}/${citySlug}`}
                className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                <ArrowRight size={14} className="text-blue-500 flex-shrink-0" />
                {rel.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Book Your {service.shortName} in {city} Today
          </h2>
          <p className="text-blue-100 mb-8">
            Same-day availability · {service.price} · Digital report same day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold"
            >
              <Link to="/booking">
                Book Online
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-600"
            >
              <a href="tel:6478019311">
                <Phone size={18} className="mr-2" />
                Call (647) 801-9311
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
