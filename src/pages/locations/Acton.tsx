import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Acton() {
  const neighborhoods = [
    "Downtown Acton", "Beardmore", "Prospect Park", "McKenzie-Jackson", "Blue Springs",
    "Fairy Lake", "Churchill Road", "Mill Street", "Eastern Avenue", "Queen Street"
  ];

  return (
    <>
      <Helmet>
        <title>Acton Home Inspector | Halton Hills Specialist | ASADS</title>
        <meta name="description" content="Acton home inspection specialists. We know Halton Hills' heritage homes, wells & septic systems. Book today: (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Acton"
        region="Halton Hills"
        description="Acton's trusted home inspection experts. From charming downtown heritage properties to new developments near Blue Springs, we provide comprehensive inspections tailored to Halton Hills' unique housing stock, including private well and septic assessments."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
