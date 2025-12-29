import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Ajax() {
  const neighborhoods = [
    "Downtown Ajax", "Pickering Beach", "South Ajax", "Westney Heights", "Village Green",
    "Audley", "Carruthers Creek", "Riverside", "Greenwood", "Salem",
    "Liverpool", "Nottingham", "Woodlands", "Hermitage", "Applecroft"
  ];

  return (
    <>
      <Helmet>
        <title>Appliance Repair Ajax | Same-Day Service | ASADS</title>
        <meta name="description" content="Fast appliance repair in Ajax. Same-day service, licensed technicians, 90-day warranty. Refrigerator, washer, dryer repairs. Call (905) 555-0132!" />
        <link rel="canonical" href="https://asads.ca/locations/ajax" />
      </Helmet>
      <LocationPageTemplate
        city="Ajax"
        region="Ontario"
        description="Ajax's trusted appliance repair experts. We provide prompt, professional service throughout Ajax with same-day appointments and competitive pricing."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0132"
      />
    </>
  );
}
