import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Cobourg() {
  const neighborhoods = [
    "Downtown Cobourg", "Cobourg Beach", "Victoria Park", "Baltimore", "Grafton",
    "Port Hope", "Campbellford", "Brighton", "Colborne", "Northumberland County"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Cobourg | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Cobourg. Northumberland County specialists. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Cobourg"
        region="Ontario"
        description="Cobourg's trusted home inspection service. We serve Cobourg, Port Hope, and all Northumberland County communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}