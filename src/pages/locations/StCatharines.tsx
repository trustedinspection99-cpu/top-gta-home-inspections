import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function StCatharines() {
  const neighborhoods = [
    "Downtown St. Catharines", "Grantham", "Port Dalhousie", "Martindale", "Merritton",
    "Facer", "Western Hill", "Queenston", "Thorold Stone Road", "Lakeshore"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection St. Catharines | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in St. Catharines. Serving all Niagara neighborhoods. Call (647) 801-9311!" />
      </Helmet>
      <LocationPageTemplate
        city="St. Catharines"
        region="Ontario"
        description="St. Catharines' trusted home inspection experts. From Port Dalhousie to Martindale, we provide thorough inspections throughout the city."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}