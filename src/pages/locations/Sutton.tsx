import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Sutton() {
  const neighborhoods = [
    "Downtown Sutton", "Jackson's Point", "Hedge Road", "Black River Road", "Baseline Road",
    "Lake Drive", "Duclos Point", "Mossington Park", "High Street", "River Street"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Sutton | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Sutton. Waterfront and cottage specialists. Same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/sutton" />
      </Helmet>
      <LocationPageTemplate
        city="Sutton"
        region="Ontario"
        description="Sutton's dependable home inspection experts. We specialize in waterfront homes and cottages throughout the Lake Simcoe area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}