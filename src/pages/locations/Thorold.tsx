import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Thorold() {
  const neighborhoods = [
    "Downtown Thorold", "Thorold South", "Allanburg", "Port Robinson", "Beaverdams",
    "Rolling Meadows", "Confederation Heights", "Keefer Road", "Thorold Tunnel Area"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Thorold | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Thorold. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Thorold"
        region="Ontario"
        description="Thorold's trusted home inspection professionals. We serve all Thorold neighborhoods with thorough property inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}