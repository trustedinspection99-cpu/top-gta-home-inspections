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
        <title>Appliance Repair Richmond Hill | Same-Day Service | ASADS</title>
        <meta name="description" content="Trusted appliance repair in Richmond Hill. Same-day service, licensed technicians, 90-day warranty. All major appliances serviced. Call (905) 555-0128!" />
        <link rel="canonical" href="https://asads.ca/locations/richmond-hill" />
      </Helmet>
      <LocationPageTemplate
        city="Richmond Hill"
        region="Ontario"
        description="Richmond Hill's reliable appliance repair service. We provide expert repairs throughout Oak Ridges, Bayview Hill, and all Richmond Hill neighborhoods."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0128"
      />
    </>
  );
}
