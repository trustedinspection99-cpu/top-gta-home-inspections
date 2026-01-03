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
        <title>Bolton Home Inspections | Rural Property Specialist</title>
        <meta name="description" content="Professional inspections in Bolton focused on acreage homes, private systems, and detached residential properties." />
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