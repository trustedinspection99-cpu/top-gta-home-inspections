import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Thornhill() {
  const neighborhoods = [
    "Thornhill Woods", "Patterson", "Brownridge", "Langstaff", "Thornhill Village",
    "Thornhill City Centre", "Royal Orchard", "Bayview Glen", "German Mills", "Concord"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Thornhill | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Thornhill. Serving Vaughan & Markham sides. Same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/thornhill" />
      </Helmet>
      <LocationPageTemplate
        city="Thornhill"
        region="Ontario"
        description="Thornhill's premier home inspection service. We serve both Vaughan and Markham portions of Thornhill with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}