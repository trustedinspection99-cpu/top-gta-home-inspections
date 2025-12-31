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
        <title>Home Inspection Milton | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Milton. Certified inspectors, same-day reports. Serving Timberlea to Campbellville. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/milton" />
      </Helmet>
      <LocationPageTemplate
        city="Milton"
        region="Ontario"
        description="Milton's dependable home inspection service. From Timberlea to Campbellville, we provide comprehensive inspections for all property types."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
