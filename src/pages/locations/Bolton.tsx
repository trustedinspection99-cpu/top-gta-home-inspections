import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Bolton() {
  const neighborhoods = [
    "Downtown Bolton", "North Hill", "South Hill", "Humber Station", "Columbia Way",
    "Harvest Hills", "Cedargrove", "Queensgate", "Glen Eagle", "King's Square"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Bolton | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Bolton, Caledon. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/bolton" />
      </Helmet>
      <LocationPageTemplate
        city="Bolton"
        region="Ontario"
        description="Bolton's reliable home inspection experts. We provide comprehensive property inspections throughout Bolton and surrounding Caledon areas."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}