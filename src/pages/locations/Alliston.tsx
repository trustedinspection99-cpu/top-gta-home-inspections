import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Alliston() {
  const neighborhoods = [
    "Downtown Alliston", "Tottenham", "Beeton", "Cookstown", "Everett",
    "Lisle", "Rosemont", "Thornton", "Newton Robinson", "Nottawasaga"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Alliston | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Alliston & New Tecumseth. Same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/alliston" />
      </Helmet>
      <LocationPageTemplate
        city="Alliston"
        region="Ontario"
        description="Alliston's trusted home inspection service. We serve Alliston, Tottenham, Beeton, and all New Tecumseth communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}