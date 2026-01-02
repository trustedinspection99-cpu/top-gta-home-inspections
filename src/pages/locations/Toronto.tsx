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
        <title>Toronto Home Inspector | Older Home & Condo Specialist</title>
        <meta name="description" content="Certified inspections for Toronto's older homes and modern condos. Same-day reports and thermal imaging included with every audit." />
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
