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
        <title>Burlington Home Inspector | Trusted Local Specialist</title>
        <meta name="description" content="Reliable home inspections in Burlington with thorough reporting, thermal imaging, and professional inspection standards." />
      </Helmet>
      <LocationPageTemplate
        city="Burlington"
        region="Ontario"
        description="Reliable home inspections in Burlington with thorough reporting, thermal imaging, and professional inspection standards."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
