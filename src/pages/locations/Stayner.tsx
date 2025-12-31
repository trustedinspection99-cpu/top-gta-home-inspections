import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Stayner() {
  const neighborhoods = [
    "Downtown Stayner", "South Stayner", "Airport Road Area", "Sunnidale Road",
    "Main Street", "Station Street", "Hurontario Street", "Victoria Street"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Stayner | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Stayner. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Stayner"
        region="Ontario"
        description="Stayner's reliable home inspection professionals. We provide thorough inspections throughout Stayner and Clearview Township."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}