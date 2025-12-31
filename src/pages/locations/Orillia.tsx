import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Orillia() {
  const neighborhoods = [
    "Downtown Orillia", "West Orillia", "Couchiching Point", "Orchard Park",
    "Cedar Island", "Geneva Park", "Bayshore", "West Ridge", "Memorial Avenue", "Uhthoff Trail"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Orillia | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Orillia. Lake country specialists. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Orillia"
        region="Ontario"
        description="Orillia's dependable home inspection service. We specialize in lakefront properties and serve all Orillia neighborhoods with thorough inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}