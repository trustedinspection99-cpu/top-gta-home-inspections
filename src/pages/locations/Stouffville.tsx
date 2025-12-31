import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Stouffville() {
  const neighborhoods = [
    "Downtown Stouffville", "Main Street", "Hoover Park", "Ballantrae", "Musselman Lake",
    "Ringwood", "Lincolnville", "Whitchurch", "Vandorf", "Lemonville"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Stouffville | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Stouffville. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/stouffville" />
      </Helmet>
      <LocationPageTemplate
        city="Stouffville"
        region="Ontario"
        description="Stouffville's dependable home inspection experts. We provide thorough inspections throughout Whitchurch-Stouffville and surrounding areas."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}