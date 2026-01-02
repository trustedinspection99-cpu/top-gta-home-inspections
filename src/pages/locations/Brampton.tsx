import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Brampton() {
  const neighborhoods = [
    "Downtown Brampton", "Bramalea", "Heart Lake", "Springdale", "Castlemore",
    "Gore Meadows", "Sandalwood", "Mount Pleasant", "Bram West", "Fletcher's Creek",
    "Credit Valley", "Madoc", "Snelgrove", "Caledon East", "Churchville"
  ];

  return (
    <>
      <Helmet>
        <title>Brampton Home Inspection | New Build & Warranty Audit</title>
        <meta name="description" content="Trusted Brampton home inspections. We specialize in newer developments and pre-delivery audits for confident home buying." />
      </Helmet>
      <LocationPageTemplate
        city="Brampton"
        region="Ontario"
        description="Brampton's trusted home inspection specialists. We serve all Brampton neighborhoods with comprehensive inspections for residential and commercial properties."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
