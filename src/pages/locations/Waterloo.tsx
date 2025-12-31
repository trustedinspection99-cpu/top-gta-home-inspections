import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Waterloo() {
  const neighborhoods = [
    "Uptown Waterloo", "Beechwood", "Lakeshore", "Westmount", "Columbia Forest",
    "University District", "Laurelwood", "Westvale", "Lincoln Heights", "Eastbridge"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Waterloo | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Waterloo. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/waterloo" />
      </Helmet>
      <LocationPageTemplate
        city="Waterloo"
        region="Ontario"
        description="Waterloo's trusted home inspection professionals. We serve all Waterloo neighborhoods with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}