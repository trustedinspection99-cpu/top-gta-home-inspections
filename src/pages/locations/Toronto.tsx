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
        <title>Appliance Repair Toronto | Same-Day Service | ASADS</title>
        <meta name="description" content="Expert appliance repair in Toronto. Same-day service, licensed technicians, 90-day warranty. Refrigerator, washer, dryer, dishwasher repairs. Call (416) 555-0123!" />
        <link rel="canonical" href="https://asads.ca/locations/toronto" />
      </Helmet>
      <LocationPageTemplate
        city="Toronto"
        region="Ontario"
        description="Toronto's trusted appliance repair experts. We provide fast, reliable service for all major appliances with same-day appointments available across the GTA's largest city."
        neighborhoods={neighborhoods}
        phoneNumber="(416) 555-0123"
      />
    </>
  );
}
