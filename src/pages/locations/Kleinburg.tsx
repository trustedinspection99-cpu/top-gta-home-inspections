import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Kleinburg() {
  const neighborhoods = [
    "Kleinburg Village", "Nashville", "Elder Mills", "Copper Creek", "Chancellor",
    "The Enclave", "Doctor's Row", "Humber River", "Islington Avenue", "Major Mackenzie"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Kleinburg | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Kleinburg. Estate home specialists. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Kleinburg"
        region="Ontario"
        description="Kleinburg's premier home inspection service. We specialize in estate homes and luxury properties throughout the Kleinburg village area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}