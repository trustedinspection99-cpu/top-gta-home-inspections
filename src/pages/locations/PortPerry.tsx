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
        <title>Home Inspection Port Perry | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Port Perry. Waterfront and cottage specialists. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/port-perry" />
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