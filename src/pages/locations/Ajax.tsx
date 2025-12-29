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
        <title>Home Inspection Ajax | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Ajax. Certified inspectors, same-day reports, 200+ point inspections. Call (905) 555-0132!" />
        <link rel="canonical" href="https://asads.ca/locations/ajax" />
      </Helmet>
      <LocationPageTemplate
        city="Ajax"
        region="Ontario"
        description="Ajax's trusted home inspection experts. We provide thorough inspections throughout Ajax with same-day reports and competitive pricing."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0132"
      />
    </>
  );
}
