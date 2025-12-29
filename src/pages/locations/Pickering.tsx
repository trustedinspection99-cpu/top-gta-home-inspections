import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Pickering() {
  const neighborhoods = [
    "Downtown Pickering", "Bay Ridges", "Dunbarton", "Liverpool", "Rosebank",
    "Amberlea", "Brock Ridge", "Duffin Heights", "Highbush", "Village East",
    "West Shore", "Rouge Park", "Claremont", "Cherrywood", "Whitevale"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Pickering | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Pickering. Certified inspectors serving Bay Ridges to Claremont. Same-day reports. Call (905) 555-0133!" />
        <link rel="canonical" href="https://asads.ca/locations/pickering" />
      </Helmet>
      <LocationPageTemplate
        city="Pickering"
        region="Ontario"
        description="Pickering's reliable home inspection professionals. From Bay Ridges to Claremont, we deliver thorough inspections with exceptional customer service."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0133"
      />
    </>
  );
}
