import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Newmarket() {
  const neighborhoods = [
    "Downtown Newmarket", "Stonehaven", "Summerhill Estates", "Bristol-London",
    "Huron Heights", "Armitage", "Glenway Estates", "Upper Canada Mall Area",
    "College Manor", "Gorham-College Manor", "Woodland Hill", "Sawmill Valley"
  ];

  return (
    <>
      <Helmet>
        <title>Appliance Repair Newmarket | Same-Day Service | ASADS</title>
        <meta name="description" content="Expert appliance repair in Newmarket. Same-day service, licensed technicians, 90-day warranty. All major appliances serviced. Call (905) 555-0134!" />
        <link rel="canonical" href="https://asads.ca/locations/newmarket" />
      </Helmet>
      <LocationPageTemplate
        city="Newmarket"
        region="Ontario"
        description="Newmarket's preferred appliance repair service. We provide fast, reliable repairs throughout Newmarket with same-day appointments and transparent pricing."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0134"
      />
    </>
  );
}
