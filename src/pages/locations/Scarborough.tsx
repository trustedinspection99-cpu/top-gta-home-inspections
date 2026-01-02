import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Scarborough() {
  const neighborhoods = [
    "Scarborough Village", "Guildwood", "West Hill", "Highland Creek", "Malvern",
    "Agincourt", "Wexford", "Birch Cliff", "Cliffside", "Rouge",
    "Morningside", "Centennial", "Woburn", "Dorset Park", "Bendale"
  ];

  return (
    <>
      <Helmet>
        <title>Scarborough Property Inspection | Multi-Unit Experts</title>
        <meta name="description" content="Expert inspections for Scarborough homes, duplexes, and multi-unit properties. Get the facts on your investment with ASADS." />
      </Helmet>
      <LocationPageTemplate
        city="Scarborough"
        region="Ontario"
        description="Scarborough's reliable home inspection service. From Agincourt to Highland Creek, we provide thorough inspections with detailed reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}