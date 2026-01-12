import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Caledon() {
  const neighborhoods = [
    "Bolton", "Caledon East", "Palgrave", "Inglewood", "Cheltenham",
    "Terra Cotta", "Belfountain", "Albion", "Mono Road", "Caledon Village",
    "Valleywood", "Southfields", "Tullamore", "Sandhill", "Wildfield"
  ];

  return (
    <>
      <Helmet>
        <title>Caledon Home Inspector | Rural, Well & Septic Audit</title>
        <meta name="description" content="Specialist in Caledon rural properties. We inspect private wells, septic systems, and large detached homes for total security." />
      </Helmet>
      <LocationPageTemplate
        city="Caledon"
        region="Ontario"
        description="Specialist in Caledon rural properties. We inspect private wells, septic systems, and large detached homes for total security."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}