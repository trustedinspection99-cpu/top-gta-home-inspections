import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://asads.ca/#organization",
  "name": "ASADS Home Inspection",
  "alternateName": "ASADS",
  "url": "https://asads.ca",
  "logo": "https://asads.ca/logo.png",
  "image": "https://asads.ca/og-image.jpg",
  "description": "Professional home inspection services in the Greater Toronto Area. Certified inspectors providing pre-purchase, pre-listing, condo, and commercial inspections with same-day reports.",
  "telephone": "+1-647-801-9311",
  "email": "info@asads.ca",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.6532,
    "longitude": -79.3832
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 43.6532,
      "longitude": -79.3832
    },
    "geoRadius": "150000"
  },
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "16:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Home Inspection Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pre-Purchase Home Inspection",
          "description": "Comprehensive inspection before buying a home"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pre-Listing Inspection",
          "description": "Inspection for sellers before listing their property"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Condo Inspection",
          "description": "Specialized inspection for condominium units"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Inspection",
          "description": "Professional inspection for commercial properties"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Radon Testing",
          "description": "Testing for radon gas levels in properties"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mold Inspection",
          "description": "Detection and assessment of mold in properties"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/asadshomeinspection",
    "https://www.instagram.com/asadshomeinspection"
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