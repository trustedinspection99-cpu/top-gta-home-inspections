import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Waterloo() {
  const neighborhoods = [
    "Uptown Waterloo", "Beechwood", "Lakeshore", "Westmount", "Columbia Forest",
    "University District", "Laurelwood", "Westvale", "Lincoln Heights", "Eastbridge"
  ];

  return (
    <>
      <Helmet>
        <title>Waterloo Home Inspector | University District | ASADS</title>
        <meta name="description" content="Waterloo home inspections from Uptown to tech hub condos. Student rentals & family homes. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Waterloo"
        region="Waterloo Region"
        description="Waterloo's comprehensive home inspection service. From historic Uptown properties to modern condos in the tech corridor, and student rentals near the universities, we inspect all property types. Our inspectors understand the unique considerations of Waterloo's diverse housing market."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
