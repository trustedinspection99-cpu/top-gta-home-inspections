import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Cannington() {
  const neighborhoods = [
    "Downtown Cannington", "Cameron Street", "Laidlaw Street", "Peace Street",
    "Brock Street", "Prince Street", "Albert Street", "Mill Pond", "Beaver River", "Church Street"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Cannington | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Cannington. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Cannington"
        region="Ontario"
        description="Cannington's trusted home inspection service. We provide thorough property inspections throughout Cannington and Brock Township."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}