import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Collingwood() {
  const neighborhoods = [
    "Downtown Collingwood", "Blue Mountain Village", "Cranberry", "Georgian Trails",
    "Pretty River", "Thornbury", "The Shipyards", "Harbour Street", "Sunset Point", "Living Water"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Collingwood | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Collingwood. Ski country & waterfront specialists. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Collingwood"
        region="Ontario"
        description="Collingwood's premier home inspection service. We specialize in ski chalets, waterfront properties, and new construction in the Blue Mountain area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}