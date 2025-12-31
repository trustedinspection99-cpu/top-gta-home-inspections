import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Peterborough() {
  const neighborhoods = [
    "Downtown Peterborough", "East City", "Otonabee", "Lakefield", "Bridgenorth",
    "Chemong Park", "Jackson Park", "Ashburnham", "North End", "Kawartha Heights"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Peterborough | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Peterborough. Kawartha region specialists. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Peterborough"
        region="Ontario"
        description="Peterborough's dependable home inspection experts. We serve the entire Kawarthas region with thorough property inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}