import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Beaverton() {
  const neighborhoods = [
    "Downtown Beaverton", "Harbour Street", "Main Street", "Simcoe Street",
    "Osborne Street", "Mara Road", "Beaver River", "Thorah Beach", "Lake Simcoe Waterfront"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Beaverton | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Beaverton. Lake Simcoe waterfront specialists. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/beaverton" />
      </Helmet>
      <LocationPageTemplate
        city="Beaverton"
        region="Ontario"
        description="Beaverton's reliable home inspection experts. We specialize in Lake Simcoe waterfront properties and serve all Brock Township areas."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}