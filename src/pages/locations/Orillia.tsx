import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Orillia() {
  const neighborhoods = [
    "Downtown Orillia", "West Orillia", "Couchiching Point", "Orchard Park",
    "Cedar Island", "Geneva Park", "Bayshore", "West Ridge", "Memorial Avenue", "Uhthoff Trail"
  ];

  return (
    <>
      <Helmet>
        <title>Orillia Home Inspector | Older Home & Safety Audit</title>
        <meta name="description" content="Home inspections in Orillia with a focus on structural condition and safety for the area's unique housing stock." />
      </Helmet>
      <LocationPageTemplate
        city="Orillia"
        region="Ontario"
        description="Orillia's dependable home inspection service. We specialize in lakefront properties and serve all Orillia neighborhoods with thorough inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}