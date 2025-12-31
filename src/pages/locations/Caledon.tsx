import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Caledon() {
  const neighborhoods = [
    "Bolton", "Caledon East", "Palgrave", "Inglewood", "Cheltenham",
    "Terra Cotta", "Belfountain", "Albion", "Mono Road", "Caledon Village",
    "Valleywood", "Southfields", "Tullamore", "Sandhill", "Wildfield"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Caledon | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Caledon. Certified inspectors serving Bolton, Palgrave & rural properties. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/caledon" />
      </Helmet>
      <LocationPageTemplate
        city="Caledon"
        region="Ontario"
        description="Caledon's trusted home inspection service. From Bolton to Palgrave, we specialize in rural properties, estate homes, and new construction."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}