import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Grimsby() {
  const neighborhoods = [
    "Downtown Grimsby", "Grimsby Beach", "Casablanca", "Kelson", "Nelles",
    "Mountain Street", "Main Street West", "Livingston Avenue", "South Service Road"
  ];

  return (
    <>
      <Helmet>
        <title>Grimsby Home Inspection | Residential Property Audit</title>
        <meta name="description" content="Professional inspections in Grimsby for newer and established residential neighbourhoods. Same-day reporting." />
      </Helmet>
      <LocationPageTemplate
        city="Grimsby"
        region="Ontario"
        description="Grimsby's dependable home inspection experts. We specialize in waterfront and escarpment properties throughout Grimsby."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}