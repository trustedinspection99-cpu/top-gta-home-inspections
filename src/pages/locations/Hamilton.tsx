import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Hamilton() {
  const neighborhoods = [
    "Downtown Hamilton", "Westdale", "Dundas", "Ancaster", "Stoney Creek",
    "Waterdown", "Flamborough", "Glanbrook", "The Beach Strip", "Locke Street",
    "James Street North", "Bartonville", "Binbrook", "Mount Hope", "Winona"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Hamilton | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Hamilton. Serving Ancaster, Dundas, Stoney Creek & all areas. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/hamilton" />
      </Helmet>
      <LocationPageTemplate
        city="Hamilton"
        region="Ontario"
        description="Hamilton's trusted home inspection experts. From Ancaster to Stoney Creek, we provide comprehensive inspections throughout the entire city."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}