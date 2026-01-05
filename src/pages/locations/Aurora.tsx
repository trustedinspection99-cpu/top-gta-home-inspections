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
        <title>Aurora Home Inspection | Certified Safety Standards</title>
        <meta name="description" content="Certified home inspections in Aurora following the highest standards for safety, performance, and structural integrity." />
      </Helmet>
      <LocationPageTemplate
        city="Aurora"
        region="Ontario"
        description="Certified home inspections in Aurora following the highest standards for safety, performance, and structural integrity."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}