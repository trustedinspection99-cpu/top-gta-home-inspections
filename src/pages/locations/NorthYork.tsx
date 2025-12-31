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
        <title>Home Inspection North York | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in North York. Certified inspectors serving Willowdale, Don Mills, Bayview Village & more. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="North York"
        region="Ontario"
        description="North York's trusted home inspection experts. We provide comprehensive inspections throughout all North York neighborhoods with same-day reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}