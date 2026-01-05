import { Home, Thermometer, Leaf, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";

interface SpecialtyService {
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface LocationPageTemplateProps {
  city: string;
  region: string;
  description: string;
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

  // JSON-LD Schemas
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
    services: services.map(s => ({ "@type": "Service", name: s })),
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
      { "@type": "Question", name: `How much does a home inspection cost in ${city}?`, acceptedAnswer: { "@type": "Answer", text: `Home inspections in ${city} typically range $400-$600. Call ${phoneNumber} for a quote.` } },
      { "@type": "Question", name: `How long does a home inspection take in ${city}?`, acceptedAnswer: { "@type": "Answer", text: "A typical inspection takes 2-4 hours depending on property size." } },
      { "@type": "Question", name: `Do you provide same-day inspection reports in ${city}?`, acceptedAnswer: { "@type": "Answer", text: "Yes, detailed reports are delivered within 24 hours of inspection." } },
      { "@type": "Question", name: `Which areas do you serve near ${city}?`, acceptedAnswer: { "@type": "Answer", text: `We serve ${city} and surrounding ${region} communities.` } },
    ],
  }), [city, region, phoneNumber]);

  const articlesJSONLD = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteName} Articles in ${city}`,
    url,
    blogPost: [
      { "@type": "BlogPosting", headline: `Top Tips for Pre-Purchase Inspections in ${city}`, articleBody: `Buying a home in ${city}? Our certified inspectors provide comprehensive pre-purchase inspections.`, url: `${url}#article1` },
      { "@type": "BlogPosting", headline: `How to Prepare Your Home for a Pre-Listing Inspection in ${city}`, articleBody: `Selling your home? Pre-listing inspections highlight repairs needed to attract buyers.`, url: `${url}#article2` },
      { "@type": "BlogPosting", headline: `Understanding Mold Risks in ${city} Homes`, articleBody: `Mold can affect health and property. Our assessments identify risks and provide guidance.`, url: `${url}#article3` },
    ],
  }), [city, siteName, url]);

  return (
    <div className="location-page">

      {/* SEO */}
      <Helmet>
        <title>{`${city} Home Inspection | ${siteName}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
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

      {/* Hero */}
      <section className="bg-gray-50 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Home Inspection Services in {city}</h1>
        <p className="text-lg max-w-2xl mx-auto">{description}</p>
      </section>

      {/* Articles */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Home Inspection Insights in {city}</h2>
        <div className="max-w-5xl mx-auto space-y-12">
          <article id="article1">
            <h3 className="text-2xl font-semibold mb-4">Top Tips for Pre-Purchase Inspections in {city}</h3>
            <p>Buying a home in {city}? Our certified inspectors provide thorough pre-purchase inspections to ensure your investment is safe.</p>
            <h4 className="text-xl font-semibold mb-2">Why a Pre-Purchase Inspection Matters</h4>
            <p>Identify hidden issues early to avoid costly repairs. Learn about structural, electrical, and HVAC risks before you buy.</p>
            <Link to="/services/pre-purchase/" className="text-primary underline mt-2 inline-block">Learn more about Pre-Purchase Inspections</Link>
          </article>
          <article id="article2">
            <h3 className="text-2xl font-semibold mb-4">How to Prepare Your Home for a Pre-Listing Inspection in {city}</h3>
            <p>Selling your home? Pre-listing inspections highlight repairs needed to attract buyers and increase sale value.</p>
            <ul className="list-disc pl-6">
              <li>Ensure utilities are working</li>
              <li>Clean and declutter for inspection</li>
              <li>Fix visible issues before the inspection</li>
            </ul>
            <Link to="/services/pre-listing/" className="text-primary underline mt-2 inline-block">Learn more about Pre-Listing Inspections</Link>
          </article>
          <article id="article3">
            <h3 className="text-2xl font-semibold mb-4">Understanding Mold Risks in {city} Homes</h3>
            <p>Mold can affect health and property. Our assessments identify risks and provide guidance for remediation.</p>
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
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about/" className="hover:underline">About</Link></li>
            <li><Link to="/services/" className="hover:underline">Services</Link></li>
            <li><Link to="/contact/" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
