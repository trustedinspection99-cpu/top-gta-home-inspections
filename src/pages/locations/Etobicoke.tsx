import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Etobicoke() {
  const neighborhoods = [
    "Islington", "Kingsway", "Mimico", "New Toronto", "Long Branch",
    "Alderwood", "Rexdale", "Thistletown", "Richview", "Princess Gardens",
    "Humber Bay", "Stonegate", "Markland Wood", "Eatonville", "Sunnylea"
  ];

  return (
    <>
      <Helmet>
        <title>Etobicoke Home Inspector | Electrical & Structural</title>
        <meta name="description" content="Specialized inspections for Etobicoke's housing stock. We focus on electrical safety, structural integrity, and peace of mind." />
      </Helmet>
      <LocationPageTemplate
        city="Etobicoke"
        region="Ontario"
        description="Specialized inspections for Etobicoke's housing stock. We focus on electrical safety, structural integrity, and peace of mind."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}