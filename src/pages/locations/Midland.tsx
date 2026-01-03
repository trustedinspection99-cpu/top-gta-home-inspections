import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Midland() {
  const neighborhoods = [
    "Downtown Midland", "Tiffin", "Little Lake", "Georgian Bay Shores", "Wyebridge",
    "Victoria Harbour", "Penetanguishene", "Tiny Beaches", "Balm Beach", "Bayshore Village"
  ];

  return (
    <>
      <Helmet>
        <title>Midland Home Inspection | Detached Home Specialist</title>
        <meta name="description" content="Professional inspections in Midland for detached and semi-rural residential properties. Detailed system audits." />
      </Helmet>
      <LocationPageTemplate
        city="Midland"
        region="Ontario"
        description="Midland's dependable home inspection service. We serve Midland, Penetanguishene, and all Georgian Bay communities with expert inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}