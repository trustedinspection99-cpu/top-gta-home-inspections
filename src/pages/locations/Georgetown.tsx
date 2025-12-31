import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Georgetown() {
  const neighborhoods = [
    "Downtown Georgetown", "Cedarvale", "Delrex", "Park", "Maple Creek",
    "Holy Cross", "Glen Williams", "Silver Creek", "Hungry Hollow", "Trafalgar Sports Park"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Georgetown | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Georgetown. Certified inspectors, same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Georgetown"
        region="Ontario"
        description="Georgetown's trusted home inspection professionals. We provide comprehensive inspections throughout Georgetown and surrounding Halton Hills areas."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}