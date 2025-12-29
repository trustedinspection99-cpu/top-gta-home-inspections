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
        <title>Appliance Repair Mississauga | Same-Day Service | ASADS</title>
        <meta name="description" content="Professional appliance repair in Mississauga. Same-day service, certified technicians, 90-day warranty. All brands serviced. Call (905) 555-0124!" />
        <link rel="canonical" href="https://asads.ca/locations/mississauga" />
      </Helmet>
      <LocationPageTemplate
        city="Mississauga"
        region="Ontario"
        description="Mississauga's premier appliance repair service. From Port Credit to Meadowvale, we provide expert repairs for refrigerators, washers, dryers, and more with same-day availability."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0124"
      />
    </>
  );
}
