import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Scarborough() {
  const neighborhoods = [
    "Scarborough Village", "Guildwood", "West Hill", "Highland Creek", "Malvern",
    "Agincourt", "Wexford", "Birch Cliff", "Cliffside", "Rouge",
    "Morningside", "Centennial", "Woburn", "Dorset Park", "Bendale"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Scarborough | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Scarborough. Certified inspectors serving Agincourt, Malvern, Highland Creek & all areas. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/scarborough" />
      </Helmet>
      <LocationPageTemplate
        city="Scarborough"
        region="Ontario"
        description="Scarborough's reliable home inspection service. From Agincourt to Highland Creek, we provide thorough inspections with detailed reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}