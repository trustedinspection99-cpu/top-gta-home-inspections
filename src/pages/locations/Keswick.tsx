import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Keswick() {
  const neighborhoods = [
    "Downtown Keswick", "Keswick Gardens", "The Queensway", "Lake Drive", "Glenwoods",
    "Metro Road", "Woodbine", "Riveredge", "Maskinonge", "Ravenshoe"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Keswick | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Keswick. Lake Simcoe waterfront specialists. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Keswick"
        region="Ontario"
        description="Keswick's trusted home inspection service. We specialize in waterfront properties and serve all Keswick neighborhoods with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}