import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Clarington() {
  const neighborhoods = [
    "Bowmanville", "Courtice", "Newcastle", "Orono", "Enniskillen",
    "Tyrone", "Hampton", "Kirby", "Kendal", "Newtonville"
  ];

  return (
    <>
      <Helmet>
        <title>Clarington Home Inspector | Rural & Well Specialist</title>
        <meta name="description" content="Inspections in Clarington for rural homes, wells, and septic systems. Comprehensive reporting for detached properties." />
      </Helmet>
      <LocationPageTemplate
        city="Clarington"
        region="Ontario"
        description="Inspections in Clarington for rural homes, wells, and septic systems. Comprehensive reporting for detached properties."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}