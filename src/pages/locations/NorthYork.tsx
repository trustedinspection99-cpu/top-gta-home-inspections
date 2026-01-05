import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function NorthYork() {
  const neighborhoods = [
    "Willowdale", "Don Mills", "Bayview Village", "York Mills", "Lansing",
    "Newtonbrook", "Bathurst Manor", "Downsview", "Lawrence Manor", "Bedford Park",
    "Hoggs Hollow", "The Bridle Path", "Armour Heights", "Parkwoods", "Henry Farm"
  ];

  return (
    <>
      <Helmet>
        <title>North York Home Inspector | Residential & Condo Audit</title>
        <meta name="description" content="Detailed home inspections in North York. Expert analysis of residential systems and condo units with professional reporting." />
      </Helmet>
      <LocationPageTemplate
        city="North York"
        region="Ontario"
        description="Detailed home inspections in North York. Expert analysis of residential systems and condo units with professional reporting."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}