import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function NewTecumseth() {
  const neighborhoods = [
    "Alliston", "Tottenham", "Beeton", "Thornton", "Cookstown",
    "Lisle", "Rosemont", "Everett", "Newton Robinson", "Nottawasaga"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection New Tecumseth | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in New Tecumseth. Serving Alliston, Tottenham & Beeton. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/new-tecumseth" />
      </Helmet>
      <LocationPageTemplate
        city="New Tecumseth"
        region="Ontario"
        description="New Tecumseth's reliable home inspection experts. We serve Alliston, Tottenham, Beeton, and all New Tecumseth communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}