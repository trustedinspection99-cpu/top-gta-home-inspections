import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Beamsville() {
  const neighborhoods = [
    "Downtown Beamsville", "Mountain Road", "Ontario Street", "Lincoln Avenue",
    "Greenlane", "King Street", "South Service Road", "Vineland", "Jordan"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Beamsville | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Beamsville. Wine country specialists. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/beamsville" />
      </Helmet>
      <LocationPageTemplate
        city="Beamsville"
        region="Ontario"
        description="Beamsville's trusted home inspection service. We serve Beamsville, Vineland, Jordan, and all Niagara wine country communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}