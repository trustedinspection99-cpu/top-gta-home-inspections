import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Bradford() {
  const neighborhoods = [
    "Downtown Bradford", "Bond Head", "Newton Robinson", "Scanlon Creek",
    "Holland River", "Simcoe Road", "Barrie Street", "Canal Road", "Dissette Street"
  ];

  return (
    <>
      <Helmet>
        <title>Bradford Home Inspection | New Construction Experts</title>
        <meta name="description" content="Inspections in Bradford focused on growing developments and modern residential construction. Catch builder issues early." />
      </Helmet>
      <LocationPageTemplate
        city="Bradford"
        region="Ontario"
        description="Inspections in Bradford focused on growing developments and modern residential construction. Catch builder issues early."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}