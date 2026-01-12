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
        <title>Stouffville Home Inspections | Newer Home Specialist</title>
        <meta name="description" content="Specialized inspections for Stouffville's newer developments and modern builds. Catch defects before they become costly." />
      </Helmet>
      <LocationPageTemplate
        city="Stouffville"
        region="Ontario"
        description="Specialized inspections for Stouffville's newer developments and modern builds. Catch defects before they become costly."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}