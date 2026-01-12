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
        description="Professional home inspections in Thornhill focused on accuracy, electrical safety, and reliable reporting."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}