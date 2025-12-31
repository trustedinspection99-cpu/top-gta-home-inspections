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
        <title>Home Inspection East York | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in East York. Certified inspectors serving Leaside, Danforth & all neighborhoods. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="East York"
        region="Ontario"
        description="East York's dependable home inspection experts. We provide thorough inspections throughout the Danforth, Leaside, and all East York communities."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}