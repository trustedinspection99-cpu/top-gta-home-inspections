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
        <title>St. Catharines Home Inspector | Older Home Specialist</title>
        <meta name="description" content="Home inspections in St. Catharines focused on older housing stock, structural safety, and electrical systems." />
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