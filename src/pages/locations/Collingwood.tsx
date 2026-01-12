import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Collingwood() {
  const neighborhoods = [
    "Downtown Collingwood", "Blue Mountain Village", "Cranberry", "Georgian Trails",
    "Pretty River", "Thornbury", "The Shipyards", "Harbour Street", "Sunset Point", "Living Water"
  ];

  return (
    <>
      <Helmet>
        <title>Collingwood Home Inspector | Cottage & Chalet Expert</title>
        <meta name="description" content="Specialized inspections for seasonal homes, cottages, and chalets in Collingwood and the Blue Mountain area." />
      </Helmet>
      <LocationPageTemplate
        city="Collingwood"
        region="Ontario"
        description="Specialized inspections for seasonal homes, cottages, and chalets in Collingwood and the Blue Mountain area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}