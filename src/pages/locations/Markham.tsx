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
        <title>Markham Property Inspection | Investment Specialists</title>
        <meta name="description" content="In-depth inspections in Markham for investors and families. We check every system from roof to foundation for total protection." />
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
