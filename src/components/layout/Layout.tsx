import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ASADS Home Inspection",
  "image": "https://asads.ca/images/toronto-home-inspection-hero.webp",
  "@id": "https://asads.ca/#localbusiness",
  "url": "https://asads.ca/",
  "telephone": "+16478019311",
  "priceRange": "$400-$650",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Toronto",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M5V",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.653226,
    "longitude": -79.383184
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "07:00",
    "closes": "22:00"
  },
  "sameAs": [
    "https://www.facebook.com/ASADSHomeInspection",
    "https://www.instagram.com/asads_home_inspection"
  ]
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}