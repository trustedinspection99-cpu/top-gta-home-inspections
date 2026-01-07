import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Markham() {
  const neighborhoods = [
    "Unionville", "Markham Village", "Cornell", "Berczy Village", "Cathedraltown",
    "Milliken Mills", "Thornhill", "Angus Glen", "Wismer", "Rouge River Estates",
    "Box Grove", "Greensborough", "Cachet", "Victoria Square", "Buttonville",
    "Innovation District", "Legacy", "Sherwood-Amarinth"
  ];

  // Technical insights derived from Markham's specific building trends
  const localInsights = [
    {
      title: "Luxury Estate Infrastructure",
      content: "Markham's premium markets like Cachet and Angus Glen feature complex systems including multi-zone HVAC, professional-grade appliance integration, and intricate rooflines. We use advanced thermal imaging to verify the performance of these high-value installations."
    },
    {
      title: "Municipal Code & Backwater Valves",
      content: "Markham enforces strict building standards, including mandatory backwater valves in newer developments to prevent basement flooding. We verify these installations and check for R50+ attic insulation levels, which exceed standard provincial requirements."
    },
    {
      title: "Investment & Infill Specialization",
      content: "With the rise of 'tear-down' rebuilds in Unionville and Markham Village, we specialize in assessing how new foundations integrate with older municipal sewer lines and ensuring proper lot grading to prevent drainage issues with neighboring properties."
    }
  ];

  return (
    <>
      <Helmet>
        <title>#1 Markham Home Inspector | Luxury & Investment Property Expert</title>
        <meta name="description" content="Certified Markham home inspections specializing in luxury estates, investment properties & new builds. Same-day thermal reports. Serving Unionville, Cachet & Cornell." />
      </Helmet>
      <LocationPageTemplate
        city="Markham"
        region="York Region"
        description="Markham's premier inspection service for high-value real estate. From historic Unionville heritage homes to the modern, tech-integrated builds of Markham Centre, we provide the discreet, technical expertise required for York Region's most discerning buyers."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights}
      />
    </>
  );
}
