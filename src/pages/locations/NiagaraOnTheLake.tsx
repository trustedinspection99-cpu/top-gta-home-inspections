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
        <title>Home Inspection Niagara-on-the-Lake | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Niagara-on-the-Lake. Heritage & wine country specialists. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Niagara-on-the-Lake"
        region="Ontario"
        description="Niagara-on-the-Lake's premier home inspection service. We specialize in heritage homes, wine country properties, and luxury estates."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}