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
        <title>Kleinburg Home Inspector | Construction Quality Audit</title>
        <meta name="description" content="Professional home inspections in Kleinburg with a focus on luxury construction quality and modern safety standards." />
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