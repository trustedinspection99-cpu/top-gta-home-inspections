import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Uxbridge() {
  const neighborhoods = [
    "Downtown Uxbridge", "Quaker Village", "Zephyr", "Udora", "Leaskdale",
    "Siloam", "Goodwood", "Sandford", "Altona", "Coppins Corners"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Uxbridge | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Uxbridge. Rural property specialists. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Uxbridge"
        region="Ontario"
        description="Uxbridge's premier home inspection service. We specialize in rural properties, hobby farms, and estate homes throughout Uxbridge Township."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}