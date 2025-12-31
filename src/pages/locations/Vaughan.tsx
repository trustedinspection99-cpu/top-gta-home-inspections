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
        <title>Home Inspection Vaughan | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Vaughan. Certified inspectors serving Woodbridge, Thornhill, Maple & more. Same-day reports. Call (647) 801-9311!" />
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
