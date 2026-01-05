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
        description="Professional home inspections in Newmarket helping buyers understand property condition before finalizing their purchase."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
