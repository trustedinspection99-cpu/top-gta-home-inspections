import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Oshawa() {
  const neighborhoods = [
    "Downtown Oshawa", "Taunton", "Windfields", "Northwood", "Samac",
    "Lakeview", "O'Neill", "McLaughlin", "Pinecrest", "Kedron",
    "Eastdale", "Donevan", "Central", "Farewell", "Harmony"
  ];

  return (
    <>
      <Helmet>
        <title>Appliance Repair Oshawa | Same-Day Service | ASADS</title>
        <meta name="description" content="Trusted appliance repair in Oshawa. Same-day service, certified technicians, 90-day warranty. Refrigerator, washer, dryer repairs. Call (905) 555-0135!" />
        <link rel="canonical" href="https://asads.ca/locations/oshawa" />
      </Helmet>
      <LocationPageTemplate
        city="Oshawa"
        region="Ontario"
        description="Oshawa's dependable appliance repair experts. We serve all Oshawa neighborhoods with professional repairs and a commitment to customer satisfaction."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0135"
      />
    </>
  );
}
