import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  MapPin,
  CheckCircle,
  Phone,
  Thermometer,
  Leaf,
  Shield,
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
  const slugifiedCity = city.toLowerCase().replace(/\s+/g, "-");
  const url = `https://www.asads.ca/locations/${slugifiedCity}/`;

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
      image: "https://www.asads.ca/logo.png",
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
    [city, region, description, phoneNumber, address, postalCode, services]
  );

  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.asads.ca/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://www.asads.ca/locations/",
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
    <div className="location-page">
      <Helmet>
        <title>{`${city} Home Inspector | Certified Home Inspections`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

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

      {/* ================= HERO ================= */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">
          Home Inspection Services in {city}, {region}
        </h1>

        <p className="text-lg text-gray-700 max-w-3xl mb-10">
          {description}
        </p>

        {/* ================= SERVICES ================= */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Professional Home Inspection Services in {city}
          </h2>

          <ul className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <li key={service} className="flex gap-2 items-start">
                <CheckCircle className="text-primary mt-1" />
                <span>{service} in {city}</span>
              </li>
            ))}
          </ul>
        </section>


        {/* ================= SPECIALTY SERVICES ================= */}
        <section className="specialty-services py-12 px-6 bg-gray-50 mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Specialty Home Inspection Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {specialtyServices.map((s) => (
              <div
                key={s.name}
                className="p-4 border rounded shadow-sm flex gap-4"
              >
                {s.icon}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                  <p className="text-gray-700">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= ARTICLES ================= */}
        <section className="articles my-16 px-6">
          <h2 className="text-3xl font-bold mb-6">
            Articles & Guides for Homeowners in {city}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div
                key={article.slug}
                className="article-card p-4 border rounded shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {article.title} – {city}
                </h3>
                <p className="text-gray-700 mb-2">
                  Learn how {article.title.toLowerCase()} can help protect your
                  home in {city}.
                </p>
                <Link
                  to={`/blog/${article.slug}/`}
                  className="text-primary underline"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </section>
        {/* In-Depth Home Inspection Articles (SEO Content Layer) */}
<section className="inspection-articles my-16 px-6 max-w-5xl mx-auto">
  <h2 className="text-3xl font-bold mb-8">
    Home Inspection Insights in {city}
  </h2>

  {/* Article 1 */}
  <article className="mb-12">
    <h3 className="text-2xl font-semibold mb-3">
      Top Tips for Pre-Purchase Inspections in {city}
    </h3>
    <p className="text-gray-700 mb-4">
      Buying a home in {city} is a major investment. A professional pre-purchase
      home inspection helps uncover hidden issues that may not be visible during
      a showing. Our certified inspectors evaluate roofing, structure, plumbing,
      electrical systems, HVAC, insulation, and more to ensure you make an informed
      decision.
    </p>

    <h4 className="text-xl font-semibold mb-2">
      Why a Pre-Purchase Inspection Matters
    </h4>
    <p className="text-gray-700 mb-3">
      Homes in {city} can experience issues related to moisture, aging building
      materials, foundation settlement, and ventilation. Identifying problems
      early can help buyers negotiate repairs, avoid costly surprises, and plan
      future maintenance with confidence.
    </p>

    <Link
      to="/services/pre-purchase/"
      className="text-primary underline font-medium"
    >
      Learn more about Pre-Purchase Inspections
    </Link>
  </article>

  {/* Article 2 */}
  <article className="mb-12">
    <h3 className="text-2xl font-semibold mb-3">
      How to Prepare Your Home for a Pre-Listing Inspection in {city}
    </h3>
    <p className="text-gray-700 mb-4">
      A pre-listing inspection allows sellers in {city} to identify and address
      potential concerns before putting their home on the market. This proactive
      approach can increase buyer confidence and reduce last-minute negotiations.
    </p>

    <h4 className="text-xl font-semibold mb-2">
      Steps to Get Ready for a Pre-Listing Inspection
    </h4>
    <ul className="list-disc pl-6 text-gray-700 mb-4">
      <li>Ensure utilities (water, gas, electricity) are turned on</li>
      <li>Clear access to attic hatches, electrical panels, and crawlspaces</li>
      <li>Repair minor visible issues such as leaks or damaged fixtures</li>
      <li>Replace burnt-out light bulbs and HVAC filters</li>
    </ul>

    <Link
      to="/services/pre-listing/"
      className="text-primary underline font-medium"
    >
      Learn more about Pre-Listing Inspections
    </Link>
  </article>

  {/* Article 3 */}
  <article>
    <h3 className="text-2xl font-semibold mb-3">
      Understanding Mold Risks in {city} Homes
    </h3>
    <p className="text-gray-700 mb-4">
      Mold is a common concern in homes throughout {city}, especially in basements,
      bathrooms, and areas with poor ventilation. Undetected moisture problems can
      lead to mold growth that affects indoor air quality and occupant health.
    </p>

    <h4 className="text-xl font-semibold mb-2">
      Common Mold Issues Found During Inspections
    </h4>
    <ul className="list-disc pl-6 text-gray-700 mb-4">
      <li>Hidden plumbing leaks behind walls</li>
      <li>High humidity and condensation in basements</li>
      <li>Poor attic ventilation causing moisture buildup</li>
      <li>Improper grading leading to water intrusion</li>
    </ul>

    <Link
      to="/services/mold-inspection/"
      className="text-primary underline font-medium"
    >
      Learn more about Mold Assessments
    </Link>
  </article>
</section>
        {/* ================= CTA ================= */}
        <section className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            Book a Certified Home Inspector in {city}
          </h2>
          <p className="mb-6">
            Call us today to schedule your professional home inspection.
          </p>
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded"
          >
            <Phone /> {phoneNumber}
          </a>
        </section>
      </main>
    </div>
  );
          }
