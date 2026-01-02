import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Vaughan() {
  const neighborhoods = [
    "Woodbridge", "Thornhill", "Maple", "Kleinburg", "Concord",
    "Vaughan Metropolitan Centre", "Vellore Village", "Sonoma Heights", "Carrville",
    "Patterson", "Brownridge", "Crestwood", "Islington Woods", "Pine Valley"
  ];

  return (
    <>
      <Helmet>
        <title>Vaughan Home Inspections | Certified Buyer Audits</title>
        <meta name="description" content="Leading home inspections in Vaughan. Get the edge with detailed same-day reports and expert advice for all property types." />
      </Helmet>
      <LocationPageTemplate
        city="Vaughan"
        region="Ontario"
        description="Vaughan's leading home inspection company. From Woodbridge to Thornhill, we provide thorough inspections with same-day reports and detailed findings."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
