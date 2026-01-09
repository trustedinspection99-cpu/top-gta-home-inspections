import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { SITE_URL } from "@/lib/seo";
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
  url: `${SITE_URL}/`,
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
  url: `${SITE_URL}/`,
  telephone: "+16478019311",
  email: "info@asads.ca",
  priceRange: "$350-$650",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit Card, E-Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Toronto",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5V",
    addressCountry: "CA"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.653226,
    longitude: -79.383184
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

  // Canonical with trailing slash
  const path =
    location.pathname === "/"
      ? "/"
      : location.pathname.endsWith("/")
      ? location.pathname
      : `${location.pathname}/`;

  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
<meta property="og:site_name" content="ASADS Home Inspection" />
<meta property="og:image" content={`${SITE_URL}/images/og-default.jpg`} />
<meta property="og:url" content={canonicalUrl} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@AsadsInspection" />
    
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
