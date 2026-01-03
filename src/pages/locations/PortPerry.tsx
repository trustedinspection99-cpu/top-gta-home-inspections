import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function PortPerry() {
  const neighborhoods = [
    "Downtown Port Perry", "Queen Street", "Lakeshore", "North Port Perry",
    "Water Street", "Old Scugog Road", "Island Road", "Palmer Park", "Carnegie Beach", "Scugog Shores"
  ];

  return (
    <>
      <Helmet>
        <title>Port Perry Home Inspection | Rural Property Experts</title>
        <meta name="description" content="Home inspections in Port Perry focused on detached and semi-rural residential properties and private systems." />
      </Helmet>
      <LocationPageTemplate
        city="Port Perry"
        region="Ontario"
        description="Port Perry's dependable home inspection service. We specialize in waterfront homes, cottages, and heritage properties throughout the Lake Scugog area."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}