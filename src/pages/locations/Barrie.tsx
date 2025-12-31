import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Barrie() {
  const neighborhoods = [
    "Downtown Barrie", "South Barrie", "Holly", "Ardagh Bluffs", "East Bayfield",
    "Painswick", "Letitia Heights", "Georgian Drive", "Sunnidale", "Allandale"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Barrie | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Barrie. Certified inspectors serving all Barrie neighborhoods. Same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/barrie" />
      </Helmet>
      <LocationPageTemplate
        city="Barrie"
        region="Ontario"
        description="Barrie's trusted home inspection experts. From downtown to the waterfront, we provide comprehensive inspections throughout the entire city."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}