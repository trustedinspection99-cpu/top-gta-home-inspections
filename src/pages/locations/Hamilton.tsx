import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Hamilton() {
  const neighborhoods = [
    "Downtown Hamilton", "Westdale", "Dundas", "Ancaster", "Stoney Creek",
    "Waterdown", "Flamborough", "Glanbrook", "The Beach Strip", "Locke Street",
    "James Street North", "Bartonville", "Binbrook", "Mount Hope", "Winona"
  ];

  return (
    <>
      <Helmet>
        <title>Hamilton Home Inspector | Older Home & Condo Audit</title>
        <meta name="description" content="Expert inspections for Hamilton's century homes, mountain properties & modern condos. 15+ years experience. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Hamilton"
        region="Hamilton Region"
        description="Hamilton's most experienced home inspection team. From century homes in the North End to new construction in Binbrook, we understand the diverse housing stock across the mountain, waterfront, and suburban communities. Our inspectors are trained to identify issues common to Hamilton's older properties including knob-and-tube wiring, stone foundations, and heritage construction methods."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}