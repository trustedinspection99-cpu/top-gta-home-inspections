import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Markham() {
  const neighborhoods = [
    "Unionville", "Markham Village", "Cornell", "Berczy", "Cathedraltown",
    "Milliken", "Thornhill", "Angus Glen", "Wismer", "Rouge River Estates",
    "Box Grove", "Greensborough", "Cachet", "Victoria Square", "Buttonville"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Markham | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Markham. Certified inspectors, same-day reports. Serving Unionville, Thornhill & all areas. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/markham" />
      </Helmet>
      <LocationPageTemplate
        city="Markham"
        region="Ontario"
        description="Markham's preferred home inspection experts. We serve Unionville, Cornell, Berczy, and all Markham communities with thorough, reliable inspection services."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
