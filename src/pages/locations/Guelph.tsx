import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Guelph() {
  const neighborhoods = [
    "Downtown Guelph", "The Ward", "St. Patrick's Ward", "Exhibition Park", "Kortright Hills",
    "Onward Willow", "Clairfields", "Westminster Woods", "Hanlon Creek", "Grange Hill East"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Guelph | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Guelph. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/guelph" />
      </Helmet>
      <LocationPageTemplate
        city="Guelph"
        region="Ontario"
        description="Guelph's trusted home inspection experts. We serve all Guelph neighborhoods with comprehensive inspections and same-day reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}