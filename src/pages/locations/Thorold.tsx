import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Thorold() {
  const neighborhoods = [
    "Downtown Thorold", "Thorold South", "Allanburg", "Port Robinson", "Beaverdams",
    "Rolling Meadows", "Confederation Heights", "Keefer Road", "Thorold Tunnel Area"
  ];

  return (
    <>
      <Helmet>
        <title>Thorold Home Inspector | Niagara Region | ASADS</title>
        <meta name="description" content="Thorold home inspections near Welland Canal. Niagara Escarpment property experts. Book now: (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Thorold"
        region="Niagara Region"
        description="Thorold's home inspection specialists. We serve the Welland Canal corridor from Port Robinson to Allanburg, with expertise in Niagara Escarpment properties. Our inspectors understand the unique foundation and drainage considerations of homes built along the canal and escarpment."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
