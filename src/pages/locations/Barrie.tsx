import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Barrie() {
  const neighborhoods = [
    "Downtown Barrie", "South Barrie", "Holly", "Ardagh Bluffs", "East Bayfield",
    "Painswick", "Letitia Heights", "Georgian Drive", "Sunnidale", "Allandale"
  ];

  return (
    <>
      <Helmet>
        <title>Barrie Home Inspection | Expert Local Property Audit</title>
        <meta name="description" content="Certified inspections for Barrie homes and investments. Same-day reporting helps you close the deal faster." />
      </Helmet>
      <LocationPageTemplate
        city="Barrie"
        region="Ontario"
        description="Certified inspections for Barrie homes and investments. Same-day reporting helps you close the deal faster."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}