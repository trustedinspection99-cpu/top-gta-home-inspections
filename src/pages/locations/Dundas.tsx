import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Dundas() {
  const neighborhoods = [
    "Downtown Dundas", "Dundas Valley", "King Street", "Governors Road",
    "West Dundas", "Cootes Paradise", "McMaster Area", "Binkley Road", "Head Street"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Dundas | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Dundas, Hamilton. Same-day reports available. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/dundas" />
      </Helmet>
      <LocationPageTemplate
        city="Dundas"
        region="Ontario"
        description="Dundas' reliable home inspection experts. We serve Dundas Valley and all surrounding areas with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}