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
        <title>Appliance Repair Pickering | Same-Day Service | ASADS</title>
        <meta name="description" content="Professional appliance repair in Pickering. Same-day service, certified technicians, all brands. Serving Bay Ridges to Claremont. Call (905) 555-0133!" />
        <link rel="canonical" href="https://asads.ca/locations/pickering" />
      </Helmet>
      <LocationPageTemplate
        city="Pickering"
        region="Ontario"
        description="Pickering's reliable appliance repair professionals. From Bay Ridges to Claremont, we deliver expert repairs with exceptional customer service."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0133"
      />
    </>
  );
}
