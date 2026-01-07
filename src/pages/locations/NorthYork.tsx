import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function NorthYork() {
  const neighborhoods = [
    "Willowdale", "Don Mills", "Bayview Village", "York Mills", "Lansing",
    "Newtonbrook", "Bathurst Manor", "Downsview", "Lawrence Manor", "Bedford Park",
    "Hoggs Hollow", "The Bridle Path", "Armour Heights", "Parkwoods", "Henry Farm"
  ];

  // North York Specific SEO Content
  const pageTitle = "North York Home Inspector | High-Rise & Ravine Home Specialist";
  const schemaDescription = "Certified home inspection services in North York, Toronto. Specializing in high-rise condos, ravine property slope stability, and mid-century home assessments. Same-day reports & thermal imaging.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
        
        {/* Open Graph / Social */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={schemaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://asads.ca/services/home-inspection-north-york" />
        
        {/* Local SEO Geo Tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="North York, Toronto" />
        <meta name="geo.position" content="43.7615;-79.4111" />
        <meta name="ICBM" content="43.7615, -79.4111" />
      </Helmet>

      <LocationPageTemplate
        city="North York"
        region="Ontario"
        kicker="High-Rise & Ravine Property Experts"
        description="Toronto's urban property specialists serving North York—from Yonge-Sheppard high-rise condos to York Mills ravine estates. We provide the technical expertise that national brands lack, focusing on fan-coil units, slope stability, and mid-century electrical systems."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        ctaText="Book North York Expert"
        
        // If your template supports specific 'focus areas' or 'highlights'
        highlights={[
          "Condo Fan-Coil & HVAC Specialists",
          "Ravine Slope & Erosion Assessment",
          "Mid-Century Aluminum Wiring Audits",
          "Thermal Imaging Included with Every Inspection"
        ]}
      />
    </>
  );
}
