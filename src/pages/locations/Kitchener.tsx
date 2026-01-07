import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Kitchener() {
  const neighborhoods = [
    "Downtown Kitchener", "Fairview", "Forest Heights", "Stanley Park", "Doon South",
    "Pioneer Park", "Bridgeport", "Grand River South", "Huron Park", "Laurentian West",
    "Innovation District", "Victoria Park", "Chicopee", "Breslau", "Hidden Valley"
  ];

  // NEW: Kitchener-specific SEO insights
  const localInsights = [
    {
      title: "Tech-Smart Home Infrastructure",
      content: "With Kitchener's rise as a tech hub, many homes in the Innovation District and Downtown feature advanced smart home integration. We evaluate networking hardware, EV charger installations, and automated systems for proper code compliance."
    },
    {
      title: "Poly-B & Aluminum Wiring Surveys",
      content: "Properties in Forest Heights and Laurentian West built in the 70s and 80s often contain aluminum wiring or Polybutylene (Poly-B) plumbing. We provide specialized assessments for these materials to assist with your insurance requirements."
    },
    {
      title: "New Construction Phase Inspections",
      content: "The rapid growth in Doon and Huron Park often leads to builder rush-jobs. We conduct 30-day and 1-year Tarion warranty inspections, focusing on attic insulation levels and foundation grading common in newer Kitchener subdivisions."
    }
  ];

  return (
    <>
      <Helmet>
        <title>#1 Kitchener Home Inspector | Tech-Hub & Heritage Specialist</title>
        <meta name="description" content="Certified Kitchener home inspections. Specializing in tech-smart homes, Poly-B plumbing checks, and Tarion warranty audits in the Waterloo Region. Same-day reports." />
      </Helmet>
      <LocationPageTemplate
        city="Kitchener"
        region="Waterloo Region"
        description="Kitchener's premier inspection team. We bridge the gap between historic Victoria Park century homes and the high-tech modern builds of the Innovation District. Our detailed reports provide the local clarity you need for a confident purchase in the Tri-Cities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights} // Injecting the new SEO data
      />
    </>
  );
}
