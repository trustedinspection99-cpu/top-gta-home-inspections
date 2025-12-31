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
        <title>Home Inspection Brampton | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Brampton. Certified inspectors, same-day reports, 200+ point inspections. Serving all Brampton areas. Call (647) 801-9311!" />
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
