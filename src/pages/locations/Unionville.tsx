import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Unionville() {
  const neighborhoods = [
    "Historic Unionville", "Unionville Main Street", "Carlton", "Wismer Commons", "Village Walk",
    "Kennedy-McCowan", "Unionville South", "Cedarwood", "Rouge Fairways", "Markland"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Unionville | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Unionville, Markham. Historic and new homes. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Unionville"
        region="Ontario"
        description="Unionville's trusted home inspection service. We serve historic Unionville and all surrounding Markham neighborhoods with expert inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}