import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Ancaster() {
  const neighborhoods = [
    "Ancaster Village", "Meadowlands", "Fieldstone", "Harmony Hall",
    "Ancaster Heights", "Southcote", "Jerseyville Road", "Wilson Street", "Garner Road"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Ancaster | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Ancaster. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Ancaster"
        region="Ontario"
        description="Ancaster's trusted home inspection professionals. We serve all Ancaster neighborhoods with thorough inspections and detailed reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}