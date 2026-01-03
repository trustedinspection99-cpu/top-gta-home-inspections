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
        <title>Thornhill Home Inspection | Trusted Safety Reporting</title>
        <meta name="description" content="Professional home inspections in Thornhill focused on accuracy, electrical safety, and reliable reporting." />
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