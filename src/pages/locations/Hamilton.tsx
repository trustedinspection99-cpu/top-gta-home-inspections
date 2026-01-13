import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Hamilton() {
  const neighborhoods = [
    "Downtown Hamilton", "Westdale", "Dundas", "Ancaster", "Stoney Creek",
    "Waterdown", "Flamborough", "Glanbrook", "The Beach Strip", "Locke Street",
    "James Street North", "Bartonville", "Binbrook", "Mount Hope", "Winona"
  ];

  // NEW: Hamilton-specific SEO insights
  const localInsights = [
    {
      title: "Century Home Foundation & Wiring",
      content: "In neighborhoods like Westdale and the North End, Hamilton's heritage homes often feature stone foundations and legacy electrical. We specialize in detecting knob-and-tube wiring and evaluating structural integrity in homes built pre-1940."
    },
    {
      title: "Escarpment Drainage & Grading",
      content: "Properties on the Hamilton 'Mountain' or near the Escarpment face unique hydrostatic pressure. We use moisture detection to check for foundation seepage caused by the area's natural runoff and clay-heavy soil."
    },
    {
      title: "Combined Sewer Systems & Backflow",
      content: "Many older Hamilton districts utilize combined sewer systems. We recommend and perform sewer scope inspections to ensure your backwater valves are functioning correctly to prevent basement flooding."
    }
  ];

  return (
    <>
      <Helmet>
        <title>#1 Hamilton Home Inspector | Certified Century Home Specialist</title>
        <meta name="description" content="Expert home inspections in Hamilton, Ancaster, and Stoney Creek. We specialize in older home audits, mold detection, and Escarpment drainage issues. Same-day reports." />
      </Helmet>
      <LocationPageTemplate
        city="Hamilton"
        region="Hamilton Region"
        description="Hamilton's most trusted inspection team. We provide deep-dive assessments for everything from industrial-lofts downtown to new suburban developments in Binbrook and Mount Hope."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights} // Injecting the new SEO data
      />
    </>
  );
}
