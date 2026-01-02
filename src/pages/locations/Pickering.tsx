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
        <title>Pickering Home Inspection | Suburban Property Audit</title>
        <meta name="description" content="Professional inspections in Pickering for suburban developments and newer residential properties. Same-day reporting." />
      </Helmet>
      <LocationPageTemplate
        city="Pickering"
        region="Ontario"
        description="Pickering's reliable home inspection professionals. From Bay Ridges to Claremont, we deliver thorough inspections with exceptional customer service."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
