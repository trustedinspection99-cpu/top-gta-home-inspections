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
        <title>Home Inspection Oshawa | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Oshawa. Certified inspectors, same-day reports, 200+ point inspections. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/oshawa" />
      </Helmet>
      <LocationPageTemplate
        city="Oshawa"
        region="Ontario"
        description="Oshawa's dependable home inspection experts. We serve all Oshawa neighborhoods with comprehensive inspections and a commitment to customer satisfaction."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
