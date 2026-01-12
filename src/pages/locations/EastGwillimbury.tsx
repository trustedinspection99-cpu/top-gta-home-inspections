import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function EastGwillimbury() {
  const neighborhoods = [
    "Holland Landing", "Sharon", "Queensville", "Mount Albert", "River Drive Park",
    "Brown Hill", "Holt", "Ravenshoe", "Coulson's Hill", "Anchor Park"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection East Gwillimbury | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in East Gwillimbury. Serving Holland Landing, Sharon & Mount Albert. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="East Gwillimbury"
        region="Ontario"
        description="East Gwillimbury's reliable home inspection experts. We provide thorough inspections throughout Holland Landing, Sharon, and all East Gwillimbury communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}