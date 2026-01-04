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
        <title>Guelph Home Inspector | Heritage & Modern Homes</title>
        <meta name="description" content="Certified inspections for Guelph homes. Experts in stone heritage buildings and new construction. Same-day reports. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Guelph"
        region="Wellington County"
        description="Guelph's trusted home inspection experts. Our inspectors have extensive experience with the city's unique limestone heritage buildings, university-area rentals, and growing new developments in south Guelph. We understand the specific challenges of Guelph's housing market, from century-home foundations to modern subdivision construction."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}