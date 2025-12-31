import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Toronto() {
  const neighborhoods = [
    "Downtown Toronto", "North York", "Scarborough", "Etobicoke", "East York",
    "York", "The Beaches", "Yorkville", "Liberty Village", "The Annex",
    "Rosedale", "Forest Hill", "High Park", "Leslieville", "Danforth",
    "Queen West", "King West", "Midtown", "Bloor West Village", "Junction"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Toronto | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Toronto. Certified inspectors, same-day reports, 200+ point inspections. Serving all Toronto neighborhoods. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/toronto" />
      </Helmet>
      <LocationPageTemplate
        city="Toronto"
        region="Ontario"
        description="Toronto's trusted home inspection experts. We provide comprehensive inspections for buyers, sellers, and property owners across all Toronto neighborhoods."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
