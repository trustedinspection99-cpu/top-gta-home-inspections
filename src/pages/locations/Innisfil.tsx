import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Innisfil() {
  const neighborhoods = [
    "Alcona", "Lefroy", "Gilford", "Stroud", "Big Bay Point",
    "Belle Ewart", "Churchill", "Cookstown", "Sandy Cove", "Innisfil Beach"
  ];

  return (
    <>
      <Helmet>
        <title>Home Inspection Innisfil | Certified Inspectors | ASADS</title>
        <meta name="description" content="Professional home inspection in Innisfil. Serving Alcona, Lefroy & all Lake Simcoe communities. Call (647) 801-9311!" />
        <link rel="canonical" href="https://asads.ca/locations/innisfil" />
      </Helmet>
      <LocationPageTemplate
        city="Innisfil"
        region="Ontario"
        description="Innisfil's trusted home inspection professionals. We serve Alcona, Lefroy, and all Innisfil communities along Lake Simcoe."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}