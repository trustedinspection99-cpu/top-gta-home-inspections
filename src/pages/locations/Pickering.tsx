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
        description="Professional inspections in Pickering for suburban developments and newer residential properties. Same-day reporting."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
