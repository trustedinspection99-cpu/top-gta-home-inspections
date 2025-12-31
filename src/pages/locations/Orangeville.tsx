import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Orangeville() {
  const neighborhoods = [
    "Downtown Orangeville", "Montgomery Village", "Credit Valley", "Greenwood",
    "Hansen", "Westside", "Eastview", "Rolling Hills", "Alder Recreation"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Orangeville | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Orangeville. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/orangeville" />
      </Helmet>
      <LocationPageTemplate
        city="Orangeville"
        region="Ontario"
        description="Orangeville's trusted home inspection service. We serve Orangeville and all Dufferin County communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}