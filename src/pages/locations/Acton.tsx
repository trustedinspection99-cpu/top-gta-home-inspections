import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Acton() {
  const neighborhoods = [
    "Downtown Acton", "Beardmore", "Prospect Park", "McKenzie-Jackson", "Blue Springs",
    "Fairy Lake", "Churchill Road", "Mill Street", "Eastern Avenue", "Queen Street"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Acton | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Acton. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Acton"
        region="Ontario"
        description="Acton's reliable home inspection service. We serve all Acton neighborhoods with thorough inspections and detailed reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
