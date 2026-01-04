import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Kitchener() {
  const neighborhoods = [
    "Downtown Kitchener", "Fairview", "Forest Heights", "Stanley Park", "Doon",
    "Pioneer Park", "Bridgeport", "Grand River South", "Huron Park", "Laurentian West"
  ];

  return (
    <>
      <Helmet>
        <title>Kitchener Home Inspector | Tri-Cities Expert | ASADS</title>
        <meta name="description" content="Kitchener home inspections from Downtown to Doon. Waterloo Region's trusted inspectors. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Kitchener"
        region="Waterloo Region"
        description="Kitchener's trusted home inspection service. From century homes in Victoria Hills to new construction in Doon and tech hub developments, we inspect all property types. Our Waterloo Region expertise covers the unique considerations of this diverse and growing market."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
