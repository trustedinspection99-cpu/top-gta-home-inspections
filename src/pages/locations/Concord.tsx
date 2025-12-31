import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Concord() {
  const neighborhoods = [
    "Concord West", "Concord East", "Vaughan Metropolitan Centre", "Keele-Rutherford",
    "Highway 7 Corridor", "Interchange Way", "Edgeley", "Dufferin-Rutherford", "Bass Pro Mills"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Concord | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Concord, Vaughan. Certified inspectors, same-day reports. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/concord" />
      </Helmet>
      <LocationPageTemplate
        city="Concord"
        region="Ontario"
        description="Concord's reliable home inspection professionals. We serve Concord and the Vaughan Metropolitan Centre area with comprehensive inspections."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}