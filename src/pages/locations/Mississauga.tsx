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
        <title>Mississauga Home Inspector | House & Condo Services</title>
        <meta name="description" content="Top-rated home inspections in Mississauga. Detailed reports for houses and townhomes with expert system testing." />
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
