import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Milton() {
  const neighborhoods = [
    "Downtown Milton", "Old Milton", "Timberlea", "Willmott", "Dorset Park",
    "Scott", "Beaty", "Harrison", "Dempsey", "Clarke",
    "Coates", "Trafalgar", "Campbellville", "Nassagaweya", "Brookville"
  ];

  return (
    <>
      <Helmet>
        <title>Milton Home Inspector | New Development Specialists</title>
        <meta name="description" content="Expert inspections for Milton's newer subdivisions. Catch builder defects and warranty issues before they cost you." />
      </Helmet>
      <LocationPageTemplate
        city="Milton"
        region="Ontario"
        description="Expert inspections for Milton's newer subdivisions. Catch builder defects and warranty issues before they cost you."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
