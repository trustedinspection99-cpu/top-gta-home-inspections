import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function NiagaraOnTheLake() {
  const neighborhoods = [
    "Old Town", "Virgil", "St. Davids", "Queenston", "Glendale",
    "Homer", "McNab", "Niagara-on-the-Green", "Lakeshore Road", "Queen Street"
  ];

  return (
    <>
      <Helmet>
        <title>NOTL Home Inspector | Heritage & Luxury Specialist</title>
        <meta name="description" content="Expert inspections for Niagara-on-the-Lake's heritage and luxury properties. Specialized architectural audits." />
      </Helmet>
      <LocationPageTemplate
        city="Niagara-on-the-Lake"
        region="Ontario"
        description="Expert inspections for Niagara-on-the-Lake's heritage and luxury properties. Specialized architectural audits."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}