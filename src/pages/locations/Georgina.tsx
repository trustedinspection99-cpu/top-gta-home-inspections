import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Georgina() {
  const neighborhoods = [
    "Keswick", "Sutton", "Jackson's Point", "Pefferlaw", "Udora",
    "Virginia", "Baldwin", "Belhaven", "Willow Beach", "Roches Point"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Georgina | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Georgina. Serving Keswick, Sutton & Lake Simcoe communities. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Georgina"
        region="Ontario"
        description="Georgina's trusted home inspection service. We serve all Lake Simcoe communities including Keswick, Sutton, and Jackson's Point with expert inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}