import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Clarington() {
  const neighborhoods = [
    "Bowmanville", "Courtice", "Newcastle", "Orono", "Enniskillen",
    "Tyrone", "Hampton", "Kirby", "Kendal", "Newtonville"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Clarington | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Clarington. Serving Bowmanville, Courtice & Newcastle. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Clarington"
        region="Ontario"
        description="Clarington's dependable home inspection service. We serve Bowmanville, Courtice, Newcastle, and all Clarington communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}