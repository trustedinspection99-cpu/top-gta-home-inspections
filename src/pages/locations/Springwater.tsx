import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Springwater() {
  const neighborhoods = [
    "Midhurst", "Minesing", "Anten Mills", "Elmvale", "Phelpston",
    "Hillsdale", "Orr Lake", "Snow Valley", "Grenfel", "Crown Hill"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Springwater | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Springwater Township. Serving Midhurst, Elmvale & area. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/springwater" />
      </Helmet>
      <LocationPageTemplate
        city="Springwater"
        region="Ontario"
        description="Springwater Township's dependable home inspection experts. We serve Midhurst, Elmvale, and all Springwater communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}