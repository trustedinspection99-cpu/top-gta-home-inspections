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

  // JSON-LD: LocalBusiness
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

  // JSON-LD: Breadcrumb
  const breadcrumbJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.asads.ca/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.asads.ca/locations/" },
      { "@type": "ListItem", position: 3, name: city, item: url },
    ],
  }), [city, url]);

  // JSON-LD: FAQ
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

  // JSON-LD: Blog Articles
  const blogJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${city} Home Inspection Blog`,
    "url": url,
    "blogPost": [
      {
        "@type": "BlogPosting",
        "headline": "Mold Prevention Tips in " + city,
        "url": `https://www.asads.ca/blog/mold-prevention-tips/`,
        "description": "Learn how to prevent mold growth in your home in " + city + " and maintain a safe environment for your family.",
        "author": { "@type": "Organization", "name": siteName },
        "publisher": { "@type": "Organization", "name": siteName, "logo": { "@type": "ImageObject", "url": "https://www.asads.ca/logo.png" } }
      },
      {
        "@type": "BlogPosting",
        "headline": "New Construction Inspection Importance in " + city,
        "url": `https://www.asads.ca/blog/new-construction-inspection-importance/`,
        "description": "Ensure your new construction in " + city + " meets quality and safety standards with a professional inspection.",
        "author": { "@type": "Organization", "name": siteName },
        "publisher": { "@type": "Organization", "name": siteName, "logo": { "@type": "ImageObject", "url": "https://www.asads.ca/logo.png" } }
      },
      {
        "@type": "BlogPosting",
        "headline": "Condo Inspection Checklist for " + city,
        "url": `https://www.asads.ca/blog/condo-inspection-checklist/`,
        "description": "A complete checklist for condo inspections in " + city + " to protect your investment and avoid surprises.",
        "author": { "@type": "Organization", "name": siteName },
        "publisher": { "@type": "Organization", "name": siteName, "logo": { "@type": "ImageObject", "url": "https://www.asads.ca/logo.png" } }
      },
      {
        "@type": "BlogPosting",
        "headline": "Why Radon Testing is Crucial in " + city,
        "url": `https://www.asads.ca/blog/radon-testing-importance/`,
        "description": "Radon testing in " + city + " protects your family from this invisible health hazard. Learn why it matters.",
        "author": { "@type": "Organization", "name": siteName },
        "publisher": { "@type": "Organization", "name": siteName, "logo": { "@type": "ImageObject", "url": "https://www.asads.ca/logo.png" } }
      },
      {
        "@type": "BlogPosting",
        "headline": "The Importance of Thermal Imaging Inspections in " + city,
        "url": `https://www.asads.ca/blog/thermal-imaging-benefits/`,
        "description": "Discover how thermal imaging inspections in " + city + " reveal hidden problems like leaks, insulation gaps, and electrical hazards.",
        "author": { "@type": "Organization", "name": siteName },
        "publisher": { "@type": "Organization", "name": siteName, "logo": { "@type": "ImageObject", "url": "https://www.asads.ca/logo.png" } }
      },
      {
        "@type": "BlogPosting",
        "headline": "WETT Inspections: Safety for Wood-Burning Appliances in " + city,
        "url": `https://www.asads.ca/blog/wett-inspections/`,
        "description": "Certified WETT inspections in " + city + " ensure your wood-burning appliances are safe and efficient.",
        "author": { "@type": "Organization", "name": siteName },
        "publisher": { "@type": "Organization", "name": siteName, "logo": { "@type": "ImageObject", "url": "https://www.asads.ca/logo.png" } }
      }
    ]
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
        <script type="application/ld+json">{JSON.stringify(blogJSONLD)}</script>
      </Helmet>

      {/* Page Header */}
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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">{city} Home Inspection Services</h1>
        <p className="mb-6">{description}</p>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Our Inspection Services</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {services.map(s => (
            <li key={s} className="flex items-center gap-2">
              <CheckCircle className="text-primary w-6 h-6" /> {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Specialty Services Section */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Specialty Services</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {specialtyServices.map(s => (
            <li key={s.name} className="p-4 border rounded shadow">
              {s.icon && <div className="mb-2">{s.icon}</div>}
              <h3 className="font-bold">{s.name}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Neighborhoods Section */}
      {neighborhoods.length > 0 && (
        <section className="container mx-auto px-6 py-10">
          <h2 className="text-2xl font-semibold mb-4">Neighborhoods We Serve in {city}</h2>
          <ul className="grid md:grid-cols-3 gap-2">
            {neighborhoods.map(n => <li key={n}>{n}</li>)}
          </ul>
        </section>
      )}

      {/* Blog Articles Section */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Helpful Articles for {city} Homeowners</h2>
        <ul className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Mold Prevention Tips", slug: "mold-prevention-tips" },
            { title: "New Construction Inspection Importance", slug: "new-construction-inspection-importance" },
            { title: "Condo Inspection Checklist", slug: "condo-inspection-checklist" },
            { title: "Radon Testing Importance", slug: "radon-testing-importance" },
            { title: "Thermal Imaging Benefits", slug: "thermal-imaging-benefits" },
            { title: "WETT Inspections", slug: "wett-inspections" },
          ].map(a => (
            <li key={a.slug}>
              <Link className="text-primary font-medium underline" to={`/blog/${a.slug}/`}>{a.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Why Choose {siteName} in {city}</h2>
        <ul className="list-disc pl-6">
          {benefits.map(b => <li key={b}>{b}</li>)}
        </ul>
      </section>

      {/* Nearby Locations Section */}
      {nearbyLocations.length > 0 && (
        <section className="container mx-auto px-6 py-10">
          <h2 className="text-2xl font-semibold mb-4">Other Locations Near {city}</h2>
          <ul className="grid md:grid-cols-4 gap-2">
            {nearbyLocations.map(c => <li key={c}><Link to={`/locations/${c.toLowerCase().replace(/\s+/g,'-')}/`}>{c}</Link></li>)}
          </ul>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          {/* Main Pages, Services, Locations, Blog */}
          {/* ... keep your footer lists exactly as before ... */}
        </div>
        <div className="text-center mt-8">
          <p>Phone: <a href={`tel:${phoneNumber}`} className="underline">{phoneNumber}</a></p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://www.facebook.com/share/1ZhWQk97YY/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/asads_home_inspection" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com/@asadshomeinspection" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://tiktok.com/@asads_home_inspection" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://x.com/AsadsInspection" target="_blank" rel="noopener noreferrer">X</a>
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
          textDecoration:
           "none",
zIndex: 1000,
boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
}}
>
Call Now


);
        } 
