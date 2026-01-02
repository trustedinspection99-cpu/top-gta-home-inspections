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
        <title>Oshawa Home Inspector | Older Home & System Audits</title>
        <meta name="description" content="Specialized in Oshawa's heritage homes and new builds. Detailed structural, electrical, and safety reporting." />
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
