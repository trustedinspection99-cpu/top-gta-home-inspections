import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Welland() {
  const neighborhoods = [
    "Downtown Welland", "Dain City", "Crowland", "Cooks Mills", "Humberstone",
    "River Road", "Quaker Road", "Niagara Street", "Division Street", "Prince Charles"
  ];

  return (
    <>
      <Helmet>
        <title>Welland Home Inspector | Certified System Audits</title>
        <meta name="description" content="Home inspections in Welland emphasizing aging homes, building systems, and structural integrity." />
      </Helmet>
      <LocationPageTemplate
        city="Welland"
        region="Ontario"
        description="Welland's trusted home inspection professionals. We serve all Welland neighborhoods with thorough property inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}