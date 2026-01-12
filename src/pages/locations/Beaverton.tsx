import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Beaverton() {
  const neighborhoods = [
    "Downtown Beaverton", "Harbour Street", "Main Street", "Simcoe Street",
    "Osborne Street", "Mara Road", "Beaver River", "Thorah Beach", "Lake Simcoe Waterfront"
  ];

  return (
    <>
      <Helmet>
        <title>Beaverton Home Inspector | Lake Simcoe Specialist</title>
        <meta name="description" content="Certified inspections for Beaverton waterfront and cottage properties. We understand Lake Simcoe homes. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Beaverton"
        region="Brock Township"
        description="Beaverton's waterfront property inspection specialists. From seasonal cottages to year-round Lake Simcoe homes, our certified inspectors understand the unique challenges of lakeside properties including dock systems, moisture control, and seasonal home preparation."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}