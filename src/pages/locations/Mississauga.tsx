import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Mississauga() {
  const neighborhoods = [
    "Port Credit", "Streetsville", "Clarkson", "Lorne Park", "Meadowvale",
    "Erin Mills", "Cooksville", "Malton", "Dixie", "Mississauga City Centre",
    "Square One", "Hurontario", "Lisgar", "Churchill Meadows", "Creditview"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Mississauga | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Mississauga. Certified inspectors, same-day reports. Serving Port Credit, Meadowvale & all areas. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/mississauga" />
      </Helmet>
      <LocationPageTemplate
        city="Mississauga"
        region="Ontario"
        description="Mississauga's premier home inspection service. From Port Credit to Meadowvale, we provide thorough inspections for all property types with same-day availability."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
