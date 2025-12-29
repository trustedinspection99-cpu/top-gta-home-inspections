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
        <title>Appliance Repair Markham | Same-Day Service | ASADS</title>
        <meta name="description" content="Professional appliance repair in Markham. Same-day service in Unionville, Thornhill & all areas. All brands serviced, 90-day warranty. Call (905) 555-0127!" />
        <link rel="canonical" href="https://asads.ca/locations/markham" />
      </Helmet>
      <LocationPageTemplate
        city="Markham"
        region="Ontario"
        description="Markham's preferred appliance repair experts. We serve Unionville, Cornell, Berczy, and all Markham communities with fast, reliable appliance repair services."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0127"
      />
    </>
  );
}
