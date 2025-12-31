import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Newmarket() {
  const neighborhoods = [
    "Downtown Newmarket", "Stonehaven", "Summerhill Estates", "Bristol-London",
    "Huron Heights", "Armitage", "Glenway Estates", "Upper Canada Mall Area",
    "College Manor", "Gorham-College Manor", "Woodland Hill", "Sawmill Valley"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Newmarket | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Newmarket. Certified inspectors, same-day reports, 200+ point inspections. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/newmarket" />
      </Helmet>
      <LocationPageTemplate
        city="Newmarket"
        region="Ontario"
        description="Newmarket's preferred home inspection service. We provide thorough inspections throughout Newmarket with same-day reports and transparent pricing."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
