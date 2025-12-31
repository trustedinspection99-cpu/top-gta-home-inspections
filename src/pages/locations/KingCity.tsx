import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function KingCity() {
  const neighborhoods = [
    "King City", "Nobleton", "Schomberg", "Kettleby", "Pottageville",
    "Laskay", "Snowball", "Ansnorveldt", "Strange", "King Station"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection King City | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in King City. Specializing in estate homes and rural properties. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/king-city" />
      </Helmet>
      <LocationPageTemplate
        city="King City"
        region="Ontario"
        description="King City's premier home inspection service. We specialize in estate homes, equestrian properties, and luxury residences throughout King Township."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}