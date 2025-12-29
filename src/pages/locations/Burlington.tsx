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
        <title>Home Inspection Burlington | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Burlington. Certified inspectors, same-day reports. Serving Aldershot to Kilbride. Call (905) 555-0130!" />
        <link rel="canonical" href="https://asads.ca/locations/burlington" />
      </Helmet>
      <LocationPageTemplate
        city="Burlington"
        region="Ontario"
        description="Burlington's trusted home inspection professionals. We serve all Burlington neighborhoods with thorough inspections and a commitment to quality service."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0130"
      />
    </>
  );
}
