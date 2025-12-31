import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Essa() {
  const neighborhoods = [
    "Angus", "Thornton", "Utopia", "Baxter", "Egbert",
    "Ivy", "Colwell", "Glen Huron", "Sinclair Point", "New Lowell"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Essa Township | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Essa Township. Serving Angus, Thornton & rural properties. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/essa" />
      </Helmet>
      <LocationPageTemplate
        city="Essa"
        region="Ontario"
        description="Essa Township's trusted home inspection service. We serve Angus, Thornton, and all Essa communities with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}