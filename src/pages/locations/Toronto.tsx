import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Toronto() {
  const neighborhoods = [
    "Downtown Toronto", "North York", "Scarborough", "Etobicoke", "East York",
    "York", "The Beaches", "Yorkville", "Liberty Village", "The Annex",
    "Rosedale", "Forest Hill", "High Park", "Leslieville", "Danforth",
    "Queen West", "King West", "Midtown", "Bloor West Village", "Junction"
  ];

  // NEW: Toronto-specific pain points for SEO "Information Gain"
  const localInsights = [
    {
      title: "Condo HVAC & Fan Coil Maintenance",
      content: "Toronto high-rises in areas like Liberty Village and King West often face aging fan coil units. We inspect for mold growth in insulation and drainage pan leaks that are common in buildings over 10 years old."
    },
    {
      title: "Legacy Plumbing & Kitec Piping",
      content: "Many Toronto properties, particularly those built or renovated between 1995 and 2007, may contain Kitec plumbing. We identify these high-risk systems that are prone to premature failure and affect insurance eligibility."
    },
    {
      title: "Knob & Tube Wiring in Older Districts",
      content: "In neighborhoods like The Annex, Leslieville, and High Park, century homes often have hidden knob-and-tube wiring. We use thermal imaging to detect hotspots and safety risks in these vintage electrical systems."
    }
  ];

  return (
    <>
      <Helmet>
        <title>#1 Toronto Home Inspector | Specialized Condo & Century Home Audits</title>
        <meta name="description" content="Expert home inspections in Toronto. From Liberty Village condos to Rosedale estates. We detect Kitec plumbing, mold, and electrical risks with same-day reports." />
      </Helmet>
      <LocationPageTemplate
        city="Toronto"
        region="Greater Toronto Area"
        description="Providing elite property assessments across the GTA. We specialize in the unique challenges of Toronto real estate, from high-density condo fan-coil systems to the heritage foundations of older neighborhoods."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights} // Injecting the SEO power-up here
      />
    </>
  );
}
