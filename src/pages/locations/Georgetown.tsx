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
        <title>Georgetown Home Inspections | Residential Specialists</title>
        <meta name="description" content="Expert residential inspections in Georgetown with a focus on newer family builds and property safety." />
      </Helmet>
      <LocationPageTemplate
        city="Georgetown"
        region="Ontario"
        description="Expert residential inspections in Georgetown with a focus on newer family builds and property safety."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}