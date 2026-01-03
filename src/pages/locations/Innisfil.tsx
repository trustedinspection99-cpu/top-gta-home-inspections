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
        <title>Innisfil Home Inspector | Rural & Waterfront Audit</title>
        <meta name="description" content="Home inspections in Innisfil for detached homes, acreage properties, and waterfront seasonal residences." />
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