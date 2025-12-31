import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Lincoln() {
  const neighborhoods = [
    "Beamsville", "Vineland", "Jordan", "Jordan Station", "Campden",
    "Tintern", "Rockway", "Ball's Falls", "Victoria Avenue", "King Street"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Lincoln | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Lincoln, Ontario. Serving Beamsville, Vineland & Jordan. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/lincoln" />
      </Helmet>
      <LocationPageTemplate
        city="Lincoln"
        region="Ontario"
        description="Lincoln's reliable home inspection professionals. We serve all Lincoln wine country communities with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}