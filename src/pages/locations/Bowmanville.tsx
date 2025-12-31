import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Bowmanville() {
  const neighborhoods = [
    "Downtown Bowmanville", "Bowmanville West", "Bowmanville Creek", "Soper Creek",
    "Darlington", "Liberty Street", "King Street", "Scugog Street", "Baseline Road", "Green Road"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Bowmanville | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Bowmanville. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/bowmanville" />
      </Helmet>
      <LocationPageTemplate
        city="Bowmanville"
        region="Ontario"
        description="Bowmanville's trusted home inspection professionals. We provide thorough inspections throughout Bowmanville and surrounding Clarington areas."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}