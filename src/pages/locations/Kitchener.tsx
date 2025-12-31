import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Kitchener() {
  const neighborhoods = [
    "Downtown Kitchener", "Fairview", "Forest Heights", "Stanley Park", "Doon",
    "Pioneer Park", "Bridgeport", "Grand River South", "Huron Park", "Laurentian West"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Kitchener | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Kitchener. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/kitchener" />
      </Helmet>
      <LocationPageTemplate
        city="Kitchener"
        region="Ontario"
        description="Kitchener's dependable home inspection service. We serve all Kitchener-Waterloo neighborhoods with thorough property inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}