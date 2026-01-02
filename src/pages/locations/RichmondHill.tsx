import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function RichmondHill() {
  const neighborhoods = [
    "Oak Ridges", "Jefferson", "Mill Pond", "Langstaff", "Bayview Hill",
    "Observatory", "North Richvale", "South Richvale", "Doncrest", "Crosby",
    "Westbrook", "Elgin Mills", "Rouge Woods", "Headford", "Lake Wilcox"
  ];

  return (
    <>
      <Helmet>
        <title>Richmond Hill Home Inspector | House & Condo Audit</title>
        <meta name="description" content="Thorough home inspections in Richmond Hill for detached homes and condos. Detailed reporting and thermal imaging included." />
      </Helmet>
      <LocationPageTemplate
        city="Richmond Hill"
        region="Ontario"
        description="Richmond Hill's reliable home inspection service. We provide thorough inspections throughout Oak Ridges, Bayview Hill, and all Richmond Hill neighborhoods."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
