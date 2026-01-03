import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function WasagaBeach() {
  const neighborhoods = [
    "Beach Area 1", "Beach Area 2", "Beach Area 3", "Beach Area 4", "Beach Area 5",
    "Beach Area 6", "Oxbow Park", "Sunnidale Corners", "Riverdale", "Wasaga Sands"
  ];

  return (
    <>
      <Helmet>
        <title>Wasaga Beach Home Inspection | Cottage Specialists</title>
        <meta name="description" content="Professional inspections for cottages, seasonal homes, and residential properties in Wasaga Beach." />
      </Helmet>
      <LocationPageTemplate
        city="Wasaga Beach"
        region="Ontario"
        description="Wasaga Beach's trusted home inspection experts. We specialize in waterfront cottages, vacation properties, and year-round homes."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}