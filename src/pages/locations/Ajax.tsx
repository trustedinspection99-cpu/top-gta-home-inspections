import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Ajax() {
  const neighborhoods = [
    "Downtown Ajax", "Pickering Beach", "South Ajax", "Westney Heights", "Village Green",
    "Audley", "Carruthers Creek", "Riverside", "Greenwood", "Salem",
    "Liverpool", "Nottingham", "Woodlands", "Hermitage", "Applecroft"
  ];

  return (
    <>
      <Helmet>
        <title>Ajax Home Inspection | Top-Rated Buyer's Services</title>
        <meta name="description" content="Comprehensive home inspections in Ajax. Understand the true condition of your future home with our expert certified reports." />
      </Helmet>
      <LocationPageTemplate
        city="Ajax"
        region="Ontario"
        description="Comprehensive home inspections in Ajax. Understand the true condition of your future home with our expert certified reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
