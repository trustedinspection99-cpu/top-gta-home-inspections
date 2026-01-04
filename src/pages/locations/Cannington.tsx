import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Cannington() {
  const neighborhoods = [
    "Downtown Cannington", "Cameron Street", "Laidlaw Street", "Peace Street",
    "Brock Street", "Prince Street", "Albert Street", "Mill Pond", "Beaver River", "Church Street"
  ];

  return (
    <>
      <Helmet>
        <title>Cannington Home Inspector | Brock Township | ASADS</title>
        <meta name="description" content="Cannington & Brock Township home inspections. Rural property experts—wells, septics & century homes. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Cannington"
        region="Brock Township"
        description="Cannington's rural property inspection specialists. We understand Brock Township's unique housing landscape—from historic century homes along Laidlaw Street to modern rural properties. Our inspectors are experienced with well water systems, septic tanks, and agricultural property assessments."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
