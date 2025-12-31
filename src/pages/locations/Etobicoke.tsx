import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Etobicoke() {
  const neighborhoods = [
    "Islington", "Kingsway", "Mimico", "New Toronto", "Long Branch",
    "Alderwood", "Rexdale", "Thistletown", "Richview", "Princess Gardens",
    "Humber Bay", "Stonegate", "Markland Wood", "Eatonville", "Sunnylea"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Etobicoke | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Etobicoke. Certified inspectors serving Islington, Kingsway, Mimico & all areas. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/etobicoke" />
      </Helmet>
      <LocationPageTemplate
        city="Etobicoke"
        region="Ontario"
        description="Etobicoke's trusted home inspection professionals. We serve all Etobicoke neighborhoods with comprehensive inspections and same-day reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}