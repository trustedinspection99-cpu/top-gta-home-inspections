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
        <title>Orangeville Home Inspector | Dufferin County | ASADS</title>
        <meta name="description" content="Orangeville & Dufferin County home inspections. Rural properties, heritage homes & new builds. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Orangeville"
        region="Dufferin County"
        description="Orangeville's comprehensive home inspection service. We serve all of Dufferin County—from historic downtown properties to rural estates in Mono Mills and Amaranth. Our inspectors are experienced with well systems, septic tanks, and the unique construction of Headwaters region homes."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
