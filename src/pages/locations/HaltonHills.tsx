import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function HaltonHills() {
  const neighborhoods = [
    "Georgetown", "Acton", "Glen Williams", "Limehouse", "Norval",
    "Stewarttown", "Hornby", "Ballinafad", "Silver Creek", "Speyside"
  ];

  return (
    <>
      <Helmet>
        <title>Halton Hills Home Inspector | Modern Home Experts</title>
        <meta name="description" content="Professional inspections in Halton Hills for modern housing and growing communities. Same-day reports included." />
      </Helmet>
      <LocationPageTemplate
        city="Halton Hills"
        region="Ontario"
        description="Professional inspections in Halton Hills for modern housing and growing communities. Same-day reports included."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}