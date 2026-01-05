import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function EastYork() {
  const neighborhoods = [
    "The Danforth", "Woodbine Heights", "Pape Village", "Leaside", "Thorncliffe Park",
    "Flemingdon Park", "O'Connor-Parkview", "Governor's Bridge", "Bermondsey", "Crescent Town"
  ];

  return (
    <>
      <Helmet>
        <title>East York Home Inspections | Residential Specialist</title>
        <meta name="description" content="Detailed property inspections in East York. Ideal for buyers of semi-detached homes and multi-unit income properties." />
      </Helmet>
      <LocationPageTemplate
        city="East York"
        region="Ontario"
        description="Detailed property inspections in East York. Ideal for buyers of semi-detached homes and multi-unit income properties."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}