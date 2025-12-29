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
        <title>Appliance Repair Oakville | Same-Day Service | ASADS</title>
        <meta name="description" content="Premium appliance repair in Oakville. Same-day service, certified technicians, 90-day warranty. Serving Bronte, Glen Abbey & all Oakville. Call (905) 555-0129!" />
        <link rel="canonical" href="https://asads.ca/locations/oakville" />
      </Helmet>
      <LocationPageTemplate
        city="Oakville"
        region="Ontario"
        description="Oakville's premium appliance repair service. From downtown to Glen Abbey, we provide expert repairs with attention to detail and superior customer service."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0129"
      />
    </>
  );
}
