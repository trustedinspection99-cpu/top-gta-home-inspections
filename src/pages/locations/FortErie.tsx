import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function FortErie() {
  const neighborhoods = [
    "Downtown Fort Erie", "Ridgeway", "Crystal Beach", "Stevensville", "Bridgeburg",
    "Point Abino", "Bay Beach", "Waverly Beach", "Erie Road", "Jarvis Street"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Fort Erie | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Fort Erie. Waterfront specialists. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Fort Erie"
        region="Ontario"
        description="Fort Erie's reliable home inspection experts. We specialize in waterfront properties and serve Crystal Beach to Ridgeway."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}