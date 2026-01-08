import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function NorthYork() {
  const neighborhoods = [
    "Willowdale", "Don Mills", "Bayview Village", "York Mills", "Lansing",
    "Newtonbrook", "Bathurst Manor", "Downsview", "Lawrence Manor", "Bedford Park",
    "Hoggs Hollow", "The Bridle Path", "Armour Heights", "Parkwoods", "Henry Farm"
  ];

  const pageTitle = "North York Home Inspector | High-Rise & Ravine Home Specialist";
  const schemaDescription = "Certified home inspection services in North York, Toronto. Specializing in high-rise condos, ravine property slope stability, and mid-century home assessments. Same-day reports & thermal imaging.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What do you look for in North York condo inspections?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in high-rise systems, specifically fan-coil units (HVAC), window seal integrity in wind-exposed units, and sound transmission issues common in North York's concrete towers."
        }
      },
      {
        "@type": "Question",
        "name": "Do you inspect ravine properties in York Mills and Don Mills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Ravine inspections include specialized assessments for slope stability, retaining wall integrity, and erosion risks specific to North York's ravine lot bylaws."
        }
      },
      {
        "@type": "Question",
        "name": "Are mid-century homes in North York safe from aluminum wiring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many homes in neighborhoods like Willowdale and Bathurst Manor (1960s-70s) contain aluminum wiring. We provide full electrical audits and infrared scanning to ensure connections are safe."
        }
      }
    ]
  };

  const localInsights = [
    {
      title: "High-Rise Condo Fan-Coil Systems",
      content: "North York's Yonge-Sheppard corridor features high-rise condos with fan-coil HVAC units. We inspect actuators, valves, and condensation pans that are commonly overlooked in standard condo inspections."
    },
    {
      title: "Ravine Property Slope Stability",
      content: "York Mills and Don Mills estates often sit on ravine lots with unique erosion and retaining wall concerns. Our inspections assess slope stability and drainage to protect your investment."
    },
    {
      title: "Mid-Century Aluminum Wiring",
      content: "Homes built in the 1960s-70s in Willowdale and Bathurst Manor frequently contain aluminum wiring. We perform thermal imaging to identify overheating connections."
    }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
        
        {/* Open Graph / Social */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={schemaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.asads.ca/locations/north-york/" />
        
        {/* Local SEO Geo Tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="North York, Toronto" />
        <meta name="geo.position" content="43.7615;-79.4111" />
        <meta name="ICBM" content="43.7615, -79.4111" />

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <LocationPageTemplate
        city="North York"
        region="Ontario"
        description="Providing specialized home inspections for North York's complex urban landscape. From Yonge-Sheppard high-rise condos with fan-coil systems to York Mills estates requiring ravine slope stability assessments, we deliver the technical expertise national brands miss."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights}
      />
    </>
  );
}
