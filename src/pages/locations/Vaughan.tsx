import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Vaughan() {
  const neighborhoods = [
    "Woodbridge", "Thornhill", "Maple", "Kleinburg", "Concord",
    "Vaughan Metropolitan Centre", "Vellore Village", "Sonoma Heights", "Carrville",
    "Patterson", "Brownridge", "Crestwood", "Islington Woods", "Pine Valley"
  ];

  return (
    <>
      <Helmet>
        <title>Appliance Repair Vaughan | Same-Day Service | ASADS</title>
        <meta name="description" content="Expert appliance repair in Vaughan. Same-day service in Woodbridge, Thornhill, Maple & more. Licensed technicians, 90-day warranty. Call (905) 555-0126!" />
        <link rel="canonical" href="https://asads.ca/locations/vaughan" />
      </Helmet>
      <LocationPageTemplate
        city="Vaughan"
        region="Ontario"
        description="Vaughan's leading appliance repair company. From Woodbridge to Thornhill, we provide expert repairs with same-day service and a 90-day parts and labor warranty."
        neighborhoods={neighborhoods}
        phoneNumber="(905) 555-0126"
      />
    </>
  );
}
