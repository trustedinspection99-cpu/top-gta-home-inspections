import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Flamborough() {
  const neighborhoods = [
    "Waterdown", "Carlisle", "Freelton", "Greensville", "Rockton",
    "Millgrove", "Sheffield", "Lynden", "Clappison's Corners", "Westover"
  ];

  return (
    <>
      <Helmet>
        <title>Flamborough Home Inspector | Rural Property Audit</title>
        <meta name="description" content="Expert inspections for Flamborough's rural properties and Waterdown homes. We assess wells, septics & heritage structures. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Flamborough"
        region="Hamilton Region"
        description="Flamborough's rural property specialists. From historic farmhouses in Carlisle to modern Waterdown subdivisions, we provide thorough inspections that account for private well systems, septic tanks, and the unique construction found in Hamilton's countryside communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}