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
        <title>Home Inspection Midland | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Midland. Georgian Bay waterfront specialists. Call (647) 801-9311!" />
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