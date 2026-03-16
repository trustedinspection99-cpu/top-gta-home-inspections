import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { SITE_URL, normalizePath } from "@/lib/seo";
import FloatingCallButton from "@/components/FloatingCallButton";

interface LayoutProps {
  children: ReactNode;
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "ASADS Home Inspection",
  alternateName: "ASADS",
  url: SITE_URL,
  description: "Professional home inspection services in the Greater Toronto Area",
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/locations?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  inLanguage: "en-CA"
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "ASADS Home Inspection",
  alternateName: "ASADS",
  description:
    "Professional home inspection services in the Greater Toronto Area. Certified inspectors providing pre-purchase, pre-listing, condo, commercial, and specialty inspections with same-day reports.",
  image: [
    `${SITE_URL}/images/toronto-home-inspection-hero.webp`,
    `${SITE_URL}/images/home-inspection-service.webp`
  ],
  logo: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+16478019311",
  email: "info@asads.ca",
  priceRange: "$350-$650",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit Card, E-Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "45 Duckworth Rd",
    addressLocality: "Cambridge",
    addressRegion: "ON",
    postalCode: "N3H 0C1",
    addressCountry: "CA"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.3990,
    longitude: -80.3271
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "07:00",
      closes: "22:00"
    }
  ],
  areaServed: [
    "Toronto", "North York", "Scarborough", "Etobicoke", "Mississauga",
    "Brampton", "Markham", "Vaughan", "Richmond Hill", "Aurora",
    "Bolton", "Halton Hills", "Caledon", "Oakville", "Oshawa",
    "Barrie", "Whitby", "Peterborough", "Newmarket", "Burlington",
    "Ajax", "Collingwood", "Stouffville", "Thornhill", "Milton",
    "Pickering", "Clarington", "Orillia", "Innisfil", "Uxbridge",
    "Beaverton", "Cannington", "Cobourg", "East York", "King City",
    "Georgina", "Keswick", "Sutton", "East Gwillimbury", "Unionville",
    "Kleinburg", "Maple", "Woodbridge", "Concord", "Georgetown",
    "Acton", "Scugog", "Port Perry", "Brock", "Bowmanville",
    "Wasaga Beach", "Midland", "Hamilton", "Stoney Creek", "Ancaster",
    "Niagara Falls", "St. Catharines", "Kitchener", "Waterloo", "Guelph",
    "Penetanguishene", "Springwater", "New Tecumseth", "Alliston",
    "Bradford West Gwillimbury", "Essa", "Clearview", "Stayner",
    "Dundas", "Flamborough", "Grimsby", "Niagara-on-the-Lake", "Welland",
    "Thorold", "Fort Erie", "Port Colborne", "Lincoln", "Beamsville",
    "Cambridge", "Brantford", "Orangeville", "Pelham", "Wainfleet",
    "West Lincoln", "Woolwich", "Wilmot", "North Dumfries", "Wellesley",
    "Centre Wellington", "Erin", "Guelph/Eramosa", "Mapleton", "Puslinch",
    "Wellington North", "Minto", "Severn", "Tiny Township", "Tay Township",
    "Shelburne", "Mono", "Woodstock", "Ingersoll", "Tillsonburg", "Paris"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "247",
    bestRating: "5",
    worstRating: "1"
  },
  sameAs: [
    "https://www.facebook.com/share/1ZhWQk97YY/",
    "https://www.instagram.com/asads_home_inspection",
    "https://youtube.com/@asadshomeinspection",
    "https://x.com/AsadsInspection",
    "https://tiktok.com/@asads_home_inspection"
  ]
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Canonical URL without trailing slash (except root)
  const canonicalUrl = `${SITE_URL}${normalizePath(location.pathname)}`;

  return (
    <>
      <Helmet>
        {/* Core SEO Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ASADS Home Inspection" />
        <meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ASADS Home Inspection - Professional Home Inspectors in Toronto & GTA" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="en_CA" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsadsInspection" />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-default.jpg`} />

        <link rel="canonical" href={canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Header />
        <Breadcrumbs />

        <main className="flex-1">{children}</main>

        <FloatingCallButton />

        <Footer />
      </div>
    </>
  );
}
