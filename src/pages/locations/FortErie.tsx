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
        <title>Fort Erie Home Inspector | Detached & Rural Homes</title>
        <meta name="description" content="Home inspections in Fort Erie for detached properties and rural-style residences. Thorough system testing." />
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