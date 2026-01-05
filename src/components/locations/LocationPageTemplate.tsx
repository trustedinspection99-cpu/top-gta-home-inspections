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
  siteName = "ASADS Home Inspections",
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

  // Breadcrumb JSON-LD
  const breadcrumbJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.asads.ca/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.asads.ca/locations/" },
      { "@type": "ListItem", position: 3, name: city, item: url },
    ],
  }), [city, url]);

  // FAQ JSON-LD
  const faqJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `How much does a home inspection cost in ${city}?`, acceptedAnswer: { "@type": "Answer", text: `Home inspection costs in ${city} typically range from $400-$600. Contact us at ${phoneNumber} for a quote.` } },
      { "@type": "Question", name: `How long does a home inspection take in ${city}?`, acceptedAnswer: { "@type": "Answer", text: `A typical home inspection in ${city} takes 2-4 hours depending on the property size.` } },
      { "@type": "Question", name: `Do you offer same-day inspection reports in ${city}?`, acceptedAnswer: { "@type": "Answer", text: `Yes! We deliver detailed inspection reports within 24 hours of completing inspections in ${city}.` } },
      { "@type": "Question", name: `What areas do you serve near ${city}?`, acceptedAnswer: { "@type": "Answer", text: `We serve ${city} and all surrounding ${region} communities.` } },
    ],
  }), [city, region, phoneNumber]);

  const nearbyLocations = allCities.filter((c) => c !== city).slice(0, 8);
  const benefits = ["Same-day reports available","Certified & insured inspectors","200+ point inspections","Upfront, transparent pricing","15+ years experience","Locally owned & operated"];

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
      </Helmet>

      {/* HEADER with Logo + Navigation */}
      <header className="bg-white shadow py-4 px-6 flex items-center justify-between">
        <Link to="/"><img src="/logo.png" alt={siteName} className="h-12" /></Link>
        <nav className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/locations/">Locations</Link>
          <Link to="/services/">Services</Link>
          <Link to="/contact/">Contact</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{city} Home Inspector</h1>
        <p className="mb-6">{description}</p>
        <div className="flex justify-center gap-4">
          <a href={`tel:${phoneNumber}`} className="bg-white text-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
            <Phone className="w-5 h-5" /> {phoneNumber}
          </a>
          <Link to="/contact/" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition">Book Online</Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services in {city}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s} className="border p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold mb-2">{s}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Specialty Services */}
      {specialtyServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">Specialty Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {specialtyServices.map((s) => (
              <div key={s.name} className="flex flex-col items-center text-center p-4 border rounded hover:shadow-md transition">
                {s.icon}
                <h3 className="font-semibold mt-4">{s.name}</h3>
                <p className="mt-2">{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      {neighborhoods.length > 0 && (
        <section className="py-16">
          <h2 className="text-2xl font-bold mb-4 text-center">Neighborhoods We Serve in {city}</h2>
          <ul className="flex flex-wrap justify-center gap-4">
            {neighborhoods.map((n) => (
              <li key={n} className="px-4 py-2 bg-white border rounded">{n}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose {siteName} in {city}</h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 p-4 border rounded shadow-sm hover:shadow-md">
              <CheckCircle className="text-primary w-5 h-5" /> {b}
            </li>
          ))}
        </ul>
      </section>

      {/* Nearby Locations */}
      {nearbyLocations.length > 0 && (
        <section className="py-16 bg-gray-50">
          <h2 className="text-2xl font-bold text-center mb-6">Also Serving Nearby Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {nearbyLocations.map((loc) => {
              const slug = loc.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={loc} to={`/locations/${slug}/`} className="flex items-center gap-2 border p-3 rounded hover:border-primary hover:bg-primary/5 transition">
                  <MapPin className="text-primary w-4 h-4" /> {loc}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Other Cities */}
      {allCities.length > 0 && (
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-6">Other Locations</h2>
          <ul className="flex flex-wrap justify-center gap-4">
            {allCities.filter(c => c !== city).map((c) => {
              const slug = c.toLowerCase().replace(/\s+/g, "-");
              return (
                <li key={c} className="px-4 py-2 border rounded hover:bg-primary/5 transition">
                  <Link to={`/locations/${slug}/`}>{c} Home Inspection</Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">{siteName}</h3>
            <p>Professional home inspections in Ontario since 2015. Trusted, certified, and insured.</p>
          </div>
          <ul className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <li><Link to="/about/">About</Link></li>
            <li><Link to="/services/">Services</Link></li>
            <li><Link to="/locations/">Locations</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
          </ul>
          <div className="mt-4 md:mt-0">
            <p>Phone: <a href={`tel:${phoneNumber}`} className="underline">{phoneNumber}</a></p>
            <ul className="flex gap-4 mt-2">
              <li><a href="https://www.facebook.com/share/1ZhWQk97YY/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/asads_home_inspection" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://youtube.com/@asadshomeinspection" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://tiktok.com/@asads_home_inspection" target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><a href="https://x.com/AsadsInspection" target="_blank" rel="noopener noreferrer">X</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="floating-call-button"
        aria-label={`Call ${siteName} now`}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#ff5a5f",
          color: "#fff",
          padding: "15px 20px",
          borderRadius: "50px",
          fontWeight: "bold",
          textDecoration: "none",
          zIndex: 1000,
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        }}
      >
        Call Now
      </a>
    </div>
  );
      }
