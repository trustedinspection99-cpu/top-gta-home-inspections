import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Whitby() {
  const neighborhoods = [
    "Downtown Whitby", "Brooklin", "Port Whitby", "Blue Grass Meadows", "Williamsburg",
    "Pringle Creek", "Taunton", "Lynde Creek", "Rolling Acres", "Whitby Shores"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Whitby | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Whitby. Serving Brooklin to Port Whitby. Same-day reports. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="Whitby"
        region="Ontario"
        description="Whitby's trusted home inspection experts. From Brooklin to Port Whitby, we provide comprehensive inspections with same-day reports."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}