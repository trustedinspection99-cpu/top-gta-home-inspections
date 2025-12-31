import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function HaltonHills() {
  const neighborhoods = [
    "Georgetown", "Acton", "Glen Williams", "Limehouse", "Norval",
    "Stewarttown", "Hornby", "Ballinafad", "Silver Creek", "Speyside"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Halton Hills | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Halton Hills. Serving Georgetown, Acton & Glen Williams. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Halton Hills"
        region="Ontario"
        description="Halton Hills' dependable home inspection experts. We serve Georgetown, Acton, and all Halton Hills communities with thorough property inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}