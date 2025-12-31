import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Aurora() {
  const neighborhoods = [
    "Downtown Aurora", "Aurora Highlands", "Bayview Northeast", "Aurora Grove", "Stronach",
    "Town of Aurora", "Aurora Heights", "Industrial Parkway", "Yonge Street Corridor", "Highland Gate"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Aurora | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Aurora. Certified inspectors, same-day reports, 200+ point inspections. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Aurora"
        region="Ontario"
        description="Aurora's trusted home inspection professionals. We serve all Aurora neighborhoods with thorough inspections and exceptional customer service."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}