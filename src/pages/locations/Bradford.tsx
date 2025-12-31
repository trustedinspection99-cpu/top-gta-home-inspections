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
        <title>Home Inspection Bradford | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Bradford West Gwillimbury. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Bradford"
        region="Ontario"
        description="Bradford's reliable home inspection experts. We serve Bradford West Gwillimbury and Bond Head with comprehensive property inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}