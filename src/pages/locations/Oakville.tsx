import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Oakville() {
  const neighborhoods = [
    "Downtown Oakville", "Bronte", "Glen Abbey", "River Oaks", "Iroquois Ridge",
    "Clearview", "Palermo", "West Oak Trails", "Eastlake", "Old Oakville",
    "College Park", "Falgarwood", "Joshua Creek", "Uptown Core", "Sheridan"
  ];

  return (
    <>
      <Helmet>
        <title>Oakville Home Inspection | Premium Residential Audit</title>
        <meta name="description" content="High-standard inspections in Oakville. We focus on quality construction and safety for discerning buyers and sellers." />
      </Helmet>
      <LocationPageTemplate
        city="Oakville"
        region="Ontario"
        description="High-standard inspections in Oakville. We focus on quality construction and safety for discerning buyers and sellers."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
