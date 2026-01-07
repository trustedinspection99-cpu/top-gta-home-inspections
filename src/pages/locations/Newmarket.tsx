import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Newmarket() {
  const neighborhoods = [
    "Glenway", "Stonehaven", "Wyndham", "Summerhill Estates", 
    "Central Newmarket", "Main Street Heritage", "Old Davis Drive", 
    "Gorham Street", "Park Avenue", "Eagle Street", "Bayview Parkway", 
    "Mulock Drive", "Yonge Street Corridor", "Davis Drive East", 
    "Leslie Valley", "Armitage", "Woodland Hill", "Huron Heights"
  ];

  const localInsights = [
    {
      title: "Heritage & Century Home Expertise",
      content: "Specialized in Newmarket's historic Main Street district. We identify critical legacy issues like knob-and-tube wiring, stone foundation mortar deterioration, and lath-and-plaster moisture intrusion."
    },
    {
      title: "Holland River Watershed Risks",
      content: "Properties near the river require specific flood-plain awareness. Our inspections prioritize high water table management, sump pump redundancy, and foundation waterproofing effectiveness."
    },
    {
      title: "New Development Warranty (Tarion)",
      content: "Expert phase inspections for communities like Glenway and Stonehaven. We help homeowners document builder deficiencies for Tarion 30-day and 1-year warranty submissions."
    },
    {
      title: "Multi-Unit & Basement Suites",
      content: "Verification of legal secondary suite requirements according to Newmarket bylaws, focusing on fire separation, egress windows, and independent HVAC zoning."
    }
  ];

  return (
    <>
      <Helmet>
        <title>🏆 #1 Newmarket Home Inspector | Heritage & New Build Experts</title>
        <meta name="description" content="Top-rated Newmarket home inspections. Specialist in heritage homes, Glenway developments, and Holland River watershed risks. Same-day reports. Call (647) 801-9311." />
        <link rel="canonical" href="https://asads.ca/locations/newmarket" />
        
        {/* Local SEO Meta */}
        <meta property="og:title" content="Expert Home Inspection Newmarket | ASADS Certified" />
        <meta property="og:description" content="Trusted by Newmarket buyers for century homes and new builds. Thermal imaging included with every inspection." />
        <meta property="og:type" content="website" />
      </Helmet>

      <LocationPageTemplate
        city="Newmarket"
        region="Ontario"
        description="Newmarket's highest-rated home inspector specializing in historic heritage properties and premier new developments. We provide the technical expertise York Region buyers trust."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights}
        // Additional props if your template supports them
        address="Newmarket, ON"
        postalCode="L3Y"
        latitude={44.0522}
        longitude={-79.4590}
      />
    </>
  );
}
