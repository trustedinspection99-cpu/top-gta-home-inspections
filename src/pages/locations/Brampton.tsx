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
        <title>Appliance Repair Brampton | Same-Day Service | ASADS</title>
        <meta name="description" content="Fast appliance repair in Brampton. Same-day appointments, licensed technicians, all major brands. Refrigerator, washer, dryer repairs. Call (905) 555-0125!" />
        <link rel="canonical" href="https://asads.ca/locations/brampton" />
      </Helmet>
      <LocationPageTemplate
        city="Brampton"
        region="Ontario"
        description="Brampton's trusted appliance repair specialists. We serve all Brampton neighborhoods with fast, professional service for residential and commercial appliances."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0125"
      />
    </>
  );
}
