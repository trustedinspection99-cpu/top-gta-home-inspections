import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function PortColborne() {
  const neighborhoods = [
    "Downtown Port Colborne", "Sherkston", "Sherkston Shores", "Humberstone",
    "West Street", "King Street", "Elm Street", "Nickel Beach", "Sugarloaf", "Gravelly Bay"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Port Colborne | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Port Colborne. Lake Erie waterfront specialists. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Port Colborne"
        region="Ontario"
        description="Port Colborne's dependable home inspection service. We serve Port Colborne and Sherkston with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}