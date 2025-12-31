import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Scugog() {
  const neighborhoods = [
    "Port Perry", "Seagrave", "Greenbank", "Caesarea", "Blackstock",
    "Prince Albert", "Utica", "Manchester", "Epsom", "Nestleton"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Scugog | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Scugog. Serving Port Perry & Lake Scugog communities. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Scugog"
        region="Ontario"
        description="Scugog's trusted home inspection experts. We serve Port Perry, Lake Scugog waterfront properties, and all Scugog Township communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}