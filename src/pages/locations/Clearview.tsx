import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Clearview() {
  const neighborhoods = [
    "Stayner", "Creemore", "New Lowell", "Nottawa", "Singhampton",
    "Duntroon", "Sunnidale Corners", "Batteaux", "Avening", "Glen Huron"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Clearview | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Clearview Township. Serving Stayner, Creemore & area. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Clearview"
        region="Ontario"
        description="Clearview Township's trusted home inspection service. We serve Stayner, Creemore, and all Clearview communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}