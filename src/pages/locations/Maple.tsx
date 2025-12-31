import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Maple() {
  const neighborhoods = [
    "Historic Maple", "Maple Downs", "Crestwood", "Eagles Landing", "Maple Village",
    "Rutherford", "Carrville", "Vellore Woods", "Maple Creek", "Mackenzie Glen"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Maple | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Maple, Vaughan. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Maple"
        region="Ontario"
        description="Maple's dependable home inspection experts. We provide thorough inspections throughout Maple and the Canada's Wonderland area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}