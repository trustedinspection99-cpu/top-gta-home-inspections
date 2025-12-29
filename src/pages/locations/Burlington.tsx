import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Burlington() {
  const neighborhoods = [
    "Downtown Burlington", "Aldershot", "Tyandaga", "Headon Forest", "Palmer",
    "Orchard", "Brant Hills", "Roseland", "Shoreacres", "LaSalle",
    "Millcroft", "Tansley", "Elizabeth Gardens", "Maple", "Kilbride"
  ];

  return (
    <>
      <Helmet>
        <title>Appliance Repair Burlington | Same-Day Service | ASADS</title>
        <meta name="description" content="Expert appliance repair in Burlington. Same-day appointments, licensed technicians, all major brands. Serving Aldershot to Kilbride. Call (905) 555-0130!" />
        <link rel="canonical" href="https://asads.ca/locations/burlington" />
      </Helmet>
      <LocationPageTemplate
        city="Burlington"
        region="Ontario"
        description="Burlington's trusted appliance repair professionals. We serve all Burlington neighborhoods with fast, reliable service and a commitment to quality workmanship."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0130"
      />
    </>
  );
}
