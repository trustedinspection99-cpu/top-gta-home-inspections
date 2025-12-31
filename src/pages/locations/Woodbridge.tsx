import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Woodbridge() {
  const neighborhoods = [
    "Woodbridge Core", "Weston Downs", "Sonoma Heights", "Vellore", "Elder Mills",
    "Kipling Heights", "Islington Woods", "Chancellor", "Napa Valley", "Market Lane"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Woodbridge | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Woodbridge, Vaughan. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Woodbridge"
        region="Ontario"
        description="Woodbridge's trusted home inspection professionals. We serve all Woodbridge neighborhoods with thorough inspections and detailed reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}