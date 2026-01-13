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
        <title>King City Home Inspector | Luxury & Rural Specialist</title>
        <meta name="description" content="Specialized inspections for King City's estates and rural homes, including private system checks and structural audits." />
      </Helmet>
      <LocationPageTemplate
        city="King City"
        region="Ontario"
        description="Specialized inspections for King City's estates and rural homes, including private system checks and structural audits."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}