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
      </Helmet>

      {/* Header (Fully matching HTML fallback nav) */}
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

      {/* Hero, Services, Specialty Services, Neighborhoods, Benefits, Nearby Locations, Other Cities */}
      {/* ... keep all your existing sections here exactly as before ... */}

      {/* Footer (Fully matching HTML fallback nav) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold mb-2">Main Pages</h2>
            <ul>
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
          </div>

          <div>
            <h2 className="font-bold mb-2">Inspection Services</h2>
            <ul>
              {[
                "Pre-Purchase Inspection",
                "Pre-Listing Inspection",
                "Condo Inspection",
                "Commercial Inspection",
                "New Construction Inspection",
                "Radon Testing",
                "Mold Inspection",
                "Asbestos Testing",
                "Lead Paint Testing",
                "Well Water Testing",
                "Thermal Imaging",
                "Air Quality Testing",
                "Sewer Scope Inspection",
                "WETT Inspection"
              ].map(service => (
                <li key={service}><Link to={`/services/${service.toLowerCase().replace(/\s+/g,"-")}/`}>{service}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-2">Service Areas</h2>
            <ul>
              {allCities.map(cityItem => (
                <li key={cityItem}><Link to={`/locations/${cityItem.toLowerCase().replace(/\s+/g,'-')}/`}>{cityItem}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-2">Blog Articles</h2>
            <ul>
              {[
                "Mold Prevention Tips",
                "New Construction Inspection Importance",
                "Condo Inspection Checklist",
                "First Time Home Buyer Inspection Guide",
                "Common Issues in Toronto Homes",
                "Radon Testing Importance",
                "Thermal Imaging Benefits",
                "Pre-Listing Inspection Benefits",
                "What to Expect During a Home Inspection",
                "Winter Home Maintenance Checklist"
              ].map(article => (
                <li key={article}><Link to={`/blog/${article.toLowerCase().replace(/\s+/g,'-')}/`}>{article}</Link></li>
              ))}
            </ul>
          </div>
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
