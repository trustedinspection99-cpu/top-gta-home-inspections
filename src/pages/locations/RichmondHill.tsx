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
        <title>Home Inspection Richmond Hill | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Richmond Hill. Certified inspectors, same-day reports. Serving Oak Ridges, Bayview Hill & all areas. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/richmond-hill" />
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
