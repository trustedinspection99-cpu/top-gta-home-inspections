import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Brantford() {
  const neighborhoods = [
    "Downtown Brantford", "Eagle Place", "West Brant", "Holmedale", "Terrace Hill",
    "Paris", "St. George", "Burford", "Scotland", "Mount Pleasant"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Brantford | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Brantford & Brant County. Same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/brantford" />
      </Helmet>
      <LocationPageTemplate
        city="Brantford"
        region="Ontario"
        description="Brantford's reliable home inspection experts. We serve Brantford, Paris, and all Brant County communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}