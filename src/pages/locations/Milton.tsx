import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Milton() {
  const neighborhoods = [
    "Downtown Milton", "Old Milton", "Timberlea", "Willmott", "Dorset Park",
    "Scott", "Beaty", "Harrison", "Dempsey", "Clarke",
    "Coates", "Trafalgar", "Campbellville", "Nassagaweya", "Brookville"
  ];

  return (
    <>
      <Helmet>
        <title>Appliance Repair Milton | Same-Day Service | ASADS</title>
        <meta name="description" content="Reliable appliance repair in Milton. Same-day service, certified technicians, 90-day warranty. All major appliances. Call (905) 555-0131!" />
        <link rel="canonical" href="https://asads.ca/locations/milton" />
      </Helmet>
      <LocationPageTemplate
        city="Milton"
        region="Ontario"
        description="Milton's dependable appliance repair service. From Timberlea to Campbellville, we provide fast, professional repairs for all your home and commercial appliances."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0131"
      />
    </>
  );
}
