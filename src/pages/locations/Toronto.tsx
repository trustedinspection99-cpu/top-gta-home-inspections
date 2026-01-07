import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Toronto() {
  const neighborhoods = [
    "Downtown Toronto", "North York", "Scarborough", "Etobicoke", "East York",
    "York", "The Beaches", "Yorkville", "Liberty Village", "The Annex",
    "Rosedale", "Forest Hill", "High Park", "Leslieville", "Danforth",
    "Queen West", "King West", "Midtown", "Bloor West Village", "Junction"
  ];

  // Toronto-specific inspection insights (Information Gain)
  const localInsights = [
    {
      title: "Condo Fan Coil & HVAC Issues in Toronto High-Rises",
      content:
        "Toronto condos—especially in Liberty Village, CityPlace, and King West—commonly experience fan coil leaks, blocked condensate drains, and mold growth inside insulation. We inspect HVAC systems for moisture damage, air quality concerns, and maintenance red flags."
    },
    {
      title: "Kitec & Aging Plumbing Systems",
      content:
        "Many Toronto homes and condos built or renovated between 1995 and 2007 may contain Kitec plumbing. These systems are known for premature failure and insurance complications. Our inspections identify Kitec and other aging supply lines before they become costly emergencies."
    },
    {
      title: "Knob-and-Tube Wiring in Older Toronto Homes",
      content:
        "Century homes in areas like The Annex, High Park, Leslieville, and Riverdale often conceal knob-and-tube wiring behind finished walls. Using thermal imaging and visual inspection, we identify overheating risks and safety concerns common in older Toronto properties."
    },
    {
      title: "Foundation Movement & Basement Moisture",
      content:
        "Toronto’s clay-heavy soil and freeze-thaw cycles can contribute to foundation cracking and basement moisture intrusion. We assess visible foundation movement, drainage conditions, and signs of past water entry in both older and newer homes."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Toronto | Certified Condo & House Inspectors</title>
        <meta
          name="description"
          content="Certified home inspection services in Toronto. We inspect condos, houses, and century homes for plumbing, electrical, HVAC, and moisture issues. Same-day reports."
        />
      </Helmet>

      <LocationPageTemplate
        city="Toronto"
        region="Greater Toronto Area"
        description="Certified home inspection services in Toronto for buyers, sellers, and homeowners. We specialize in condo inspections, older Toronto houses, and modern builds—delivering clear, unbiased reports with same-day turnaround."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
        localInsights={localInsights}
      />
    </>
  );
}
