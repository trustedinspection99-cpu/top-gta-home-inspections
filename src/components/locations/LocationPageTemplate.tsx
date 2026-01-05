import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, CheckCircle, Phone, Thermometer, Leaf, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface SpecialtyService {
  name: string;
  description: string;
  icon?: React.ReactNode;
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
    { name: "Thermal Imaging", description: "Detect hidden moisture, leaks, and insulation gaps.", icon: <Thermometer className="w-6 h-6 text-primary" /> },
    { name: "Mold Assessment", description: "Identify mold risks and ensure a safe environment.", icon: <Leaf className="w-6 h-6 text-primary" /> },
    { name: "WETT Inspection", description: "Certified wood-burning appliance inspections.", icon: <Shield className="w-6 h-6 text-primary" /> },
  ],
  allCities = [],
}: LocationPageTemplateProps) {

  const slugifiedCity = city.toLowerCase().replace(/\s+/g, "-");
  const url = `https://www.asads.ca/locations/${slugifiedCity}/`;

  // JSON-LD Schema
  const schemaOrgJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    description: description,
    url: url,
    telephone: phoneNumber,
    priceRange: "$$",
    image: "https://www.asads.ca/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      addressRegion: region,
      postalCode: postalCode,
      addressCountry: "Canada",
    },
    geo: latitude && longitude ? { "@type": "GeoCoordinates", latitude, longitude } : undefined,
    areaServed: city,
    sameAs: [
      "https://www.facebook.com/share/1ZhWQk97YY/",
      "https://www.instagram.com/asads_home_inspection",
      "https://youtube.com/@asadshomeinspection",
      "https://tiktok.com/@asads_home_inspection",
      "https://x.com/AsadsInspection",
    ],
    services: services.map((s) => ({ "@type": "Service", name: s })),
  }), [city, region, description, phoneNumber, address, postalCode, services, latitude, longitude]);

  const breadcrumbJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.asads.ca/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.asads.ca/locations/" },
      { "@type": "ListItem", position: 3, name: city, item: url },
    ],
  }), [city, url]);

  const faqJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does a home inspection cost in ${city}?`,
        acceptedAnswer: { "@type": "Answer", text: `Home inspection costs in ${city} typically range from $400-$600. Contact us at ${phoneNumber} for a quote.` },
      },
      {
        "@type": "Question",
        name: `How long does a home inspection take in ${city}?`,
        acceptedAnswer: { "@type": "Answer", text: `A typical home inspection in ${city} takes 2-4 hours depending on the property size.` },
      },
      {
        "@type": "Question",
        name: `Do you offer same-day inspection reports in ${city}?`,
        acceptedAnswer: { "@type": "Answer", text: `Yes! We deliver detailed inspection reports within 24 hours of completing inspections in ${city}.` },
      },
      {
        "@type": "Question",
        name: `What areas do you serve near ${city}?`,
        acceptedAnswer: { "@type": "Answer", text: `We serve ${city} and all surrounding ${region} communities.` },
      },
    ],
  }), [city, region, phoneNumber]);

  const articlesJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteName} Articles in ${city}`,
    url: url,
    blogPost: [
      {
        "@type": "BlogPosting",
        headline: `Top Tips for Pre-Purchase Inspections in ${city}`,
        articleBody: `Buying a home in ${city}? Our certified inspectors provide comprehensive pre-purchase inspections...`,
        url: `${url}#article1`,
      },
      {
        "@type": "BlogPosting",
        headline: `How to Prepare Your Home for a Pre-Listing Inspection in ${city}`,
        articleBody: `Selling your home? A pre-listing inspection highlights repairs needed to attract buyers...`,
        url: `${url}#article2`,
      },
      {
        "@type": "BlogPosting",
        headline: `Understanding Mold Risks in ${city} Homes`,
        articleBody: `Mold can affect your health and damage your property. Our mold assessments in ${city} identify risks...`,
        url: `${url}#article3`,
      },
    ],
  }), [city, siteName, url]);

  const nearbyLocations = allCities.filter((c) => c !== city).slice(0, 8);

  const benefits = [
    "Same-day reports available",
    "Certified & insured inspectors",
    "200+ point inspections",
    "Upfront, transparent pricing",
    "15+ years experience",
    "Locally owned & operated",
  ];

  return (
    <div className="location-page">

      {/* Helmet SEO */}
      <Helmet>
        <link rel="canonical" href={url} />
        <title>{`${city} Home Inspector | ${description.split(".")[0]}`}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${city} Home Inspection | ${siteName}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://www.asads.ca/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${city} Home Inspection | ${siteName}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.asads.ca/logo.png" />
        <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(articlesJSONLD)}</script>
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/"><img src="/logo.png" alt={siteName} className="h-12" /></Link>
          <nav>
            <ul className="flex flex-wrap gap-4 font-medium text-gray-700">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about/">About Us</Link></li>
              <li><Link to="/services/">Services</Link></li>
              <li><Link to="/locations/">Service Areas</Link></li>
              <li><Link to="/pricing/">Pricing</Link></li>
              <li><Link to="/blog/">Blog</Link></li>
              <li><Link to="/contact/">Contact</Link></li>
              <li><Link to="/booking/">Book Inspection</Link></li>
              <li><Link to="/faq/">FAQ</Link></li>
              <li><Link to="/testimonials/">Testimonials</Link></li>
              <li><Link to="/sitemap/">Sitemap</Link></li>
              <li><Link to="/terms/">Terms of Service</Link></li>
              <li><Link to="/privacy-policy/">Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Services & Specialty Services */}
      {/* ... your existing sections ... */}

      {/* Articles Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Home Inspection Insights in {city}</h2>
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Article 1 */}
          <article id="article1">
            <h3 className="text-2xl font-semibold mb-4">Top Tips for Pre-Purchase Inspections in {city}</h3>
            <p className="mb-2">
              Buying a home in {city}? Our certified inspectors provide comprehensive pre-purchase inspections 
              to ensure your investment is safe. From roofing to plumbing, every detail is checked.
            </p>
            <h4 className="text-xl font-semibold mb-2">Why a Pre-Purchase Inspection Matters</h4>
            <p>
              Identifying hidden issues early prevents costly repairs. Learn about structural, electrical, and HVAC risks before you buy.
            </p>
            <Link to="/services/pre-purchase/" className="text-primary underline mt-2 inline-block">Learn more about Pre-Purchase Inspections</Link>
          </article>

          {/* Article 2 */}
          <article id="article2">
            <h3 className="text-2xl font-semibold mb-4">How to Prepare Your Home for a Pre-Listing Inspection in {city}</h3>
            <p className="mb-2">
              Selling your home? A pre-listing inspection highlights repairs needed to attract buyers and increase your sale price.
            </p>
            <h4 className="text-xl font-semibold mb-2">Steps to Get Ready</h4>
            <ul className="list-disc pl-6">
              <li>Ensure all utilities are working</li>
              <li>Clean and declutter areas for inspection</li>
              <li>Fix visible issues before the inspection</li>
            </ul>
            <Link to="/services/pre-listing/" className="text-primary underline mt-2 inline-block">Learn more about Pre-Listing Inspections</Link>
          </article>

          {/* Article 3 */}
          <article id="article3">
            <h3 className="text-2xl font-semibold mb-4">Understanding Mold Risks in {city} Homes</h3>
            <p className="mb-2">
              Mold can affect your health and damage your property. Our mold assessments in {city} identify risks and provide remediation guidance.
            </p>
            <h4 className="text-xl font-semibold mb-2">Common Mold Issues</h4>
            <ul className="list-disc pl-6">
              <li>Hidden leaks behind walls</li>
              <li>Poor ventilation in basements and attics</li>
              <li>High humidity areas like bathrooms</li>
            </ul>
            <Link to="/services/mold-inspection/" className="text-primary underline mt-2 inline-block">Learn more about Mold Assessment</Link>
          </article>

        </div>
      </section>

      {/* Footer */}
      {/* ... your existing footer ... */}

    </div>
  );
}
