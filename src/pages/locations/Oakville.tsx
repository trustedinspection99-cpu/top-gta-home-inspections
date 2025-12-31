import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Oakville() {
  const neighborhoods = [
    "Downtown Oakville", "Bronte", "Glen Abbey", "River Oaks", "Iroquois Ridge",
    "Clearview", "Palermo", "West Oak Trails", "Eastlake", "Old Oakville",
    "College Park", "Falgarwood", "Joshua Creek", "Uptown Core", "Sheridan"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Oakville | Certified Inspectors | ASADS</title>
        <meta name="description" content="Premium home inspection in Oakville. Certified inspectors, same-day reports. Serving Bronte, Glen Abbey & all Oakville areas. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/oakville" />
      </Helmet>
      <LocationPageTemplate
        city="Oakville"
        region="Ontario"
        description="Oakville's premium home inspection service. From downtown to Glen Abbey, we provide thorough inspections with attention to detail and superior customer service."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
