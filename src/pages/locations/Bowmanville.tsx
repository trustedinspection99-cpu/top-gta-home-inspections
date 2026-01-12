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
        <title>Bowmanville Home Inspections | Certified Local Audit</title>
        <meta name="description" content="Professional inspections in Bowmanville for newer housing and expanding neighbourhoods. Get the facts before you buy." />
      </Helmet>
      <LocationPageTemplate
        city="Bowmanville"
        region="Ontario"
        description="Professional inspections in Bowmanville for newer housing and expanding neighbourhoods. Get the facts before you buy."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}