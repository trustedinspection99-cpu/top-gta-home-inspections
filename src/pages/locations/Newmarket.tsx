import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Newmarket() {
  const neighborhoods = [
    "Downtown Newmarket", "Stonehaven", "Summerhill Estates", "Bristol-London",
    "Huron Heights", "Armitage", "Glenway Estates", "Upper Canada Mall Area",
    "College Manor", "Gorham-College Manor", "Woodland Hill", "Sawmill Valley"
  ];

  return (
    <>
      <Helmet>
        <title>Newmarket Home Inspection | Expert Buyer Services</title>
        <meta name="description" content="Professional home inspections in Newmarket helping buyers understand property condition before finalizing their purchase." />
      </Helmet>
      <LocationPageTemplate
        city="Newmarket"
        region="Ontario"
        description="Newmarket's preferred home inspection service. We provide thorough inspections throughout Newmarket with same-day reports and transparent pricing."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
