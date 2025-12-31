import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Flamborough() {
  const neighborhoods = [
    "Waterdown", "Carlisle", "Freelton", "Greensville", "Rockton",
    "Millgrove", "Sheffield", "Lynden", "Clappison's Corners", "Westover"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Flamborough | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Flamborough. Serving Waterdown, Carlisle & rural properties. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/flamborough" />
      </Helmet>
      <LocationPageTemplate
        city="Flamborough"
        region="Ontario"
        description="Flamborough's trusted home inspection service. We serve Waterdown, Carlisle, and all Flamborough communities with expert inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}