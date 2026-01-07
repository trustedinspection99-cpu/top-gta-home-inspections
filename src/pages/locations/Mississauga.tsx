import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Mississauga() {
  const neighborhoods = [
    "Port Credit", "Streetsville", "Clarkson", "Lorne Park", "Meadowvale",
    "Erin Mills", "Cooksville", "Malton", "Dixie", "Mississauga City Centre",
    "Square One", "Hurontario", "Lisgar", "Churchill Meadows", "Creditview"
  ];

  // Mississauga-specific inspection insights (Information Gain)
  const localInsights = [
    {
      title: "Condo & High-Rise Inspections in Mississauga",
      content:
        "Condos around Square One, City Centre, and Hurontario commonly experience fan coil leaks, HVAC drainage issues, and moisture buildup. We inspect in-suite systems and visible common elements for defects that impact safety and comfort."
    },
    {
      title: "Flood & Moisture Risks Near the Credit River",
      content:
        "Homes in Port Credit, Creditview, and areas near the Credit River may be vulnerable to basement moisture and past flooding. Our inspections focus on drainage, foundation conditions, and signs of previous water intrusion."
    },
    {
      title: "Older Electrical & Plumbing Systems",
      content:
        "Established neighborhoods like Streetsville and Clarkson often contain aging electrical panels, aluminum wiring, or outdated plumbing. We identify safety risks and components that may affect insurance or future renovations."
    },
    {
      title: "Suburban Homes & Newer Developments",
      content:
        "In growing areas like Erin Mills, Meadowvale, and Churchill Meadows, we inspect newer homes for grading issues, builder deficiencies, and early wear concerns common in modern construction."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Mississauga | Certified Condo & House Inspectors</title>
        <meta
          name="description"
          content="Certified home inspection services in Mississauga. We inspect condos, houses, and suburban properties for electrical, plumbing, HVAC, and moisture issues. Same-day reports."
        />
      </Helmet>

      <LocationPageTemplate
        city="Mississauga"
        region="Peel Region"
        description="Certified home inspection services in Mississauga for buyers, sellers, and homeowners. We inspect condos, waterfront homes, and suburban properties with clear reporting and same-day turnaround."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights}
      />
    </>
  );
}
