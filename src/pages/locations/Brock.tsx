import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Brock() {
  const neighborhoods = [
    "Beaverton", "Cannington", "Sunderland", "Wilfrid", "Gamebridge",
    "Thorah Island", "Vroomanton", "Vallentyne", "Bolsover", "Woodville"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Brock | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Brock Township. Serving Beaverton, Cannington & Sunderland. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/brock" />
      </Helmet>
      <LocationPageTemplate
        city="Brock"
        region="Ontario"
        description="Brock Township's trusted home inspection service. We serve Beaverton, Cannington, Sunderland, and all Lake Simcoe waterfront communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}