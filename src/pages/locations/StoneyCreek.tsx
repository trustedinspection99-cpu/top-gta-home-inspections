import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function StoneyCreek() {
  const neighborhoods = [
    "Downtown Stoney Creek", "Winona", "Fruitland", "Fifty Point", "Vinemount",
    "Heritage Green", "Battlefield", "Jones Road", "Nash Road", "Centennial Parkway"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Stoney Creek | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Stoney Creek. Serving all neighborhoods. Same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/stoney-creek" />
      </Helmet>
      <LocationPageTemplate
        city="Stoney Creek"
        region="Ontario"
        description="Stoney Creek's dependable home inspection service. We serve all Stoney Creek neighborhoods from Winona to Fruitland."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}