import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Beamsville() {
  const neighborhoods = [
    "Downtown Beamsville", "Mountain Road", "Ontario Street", "Lincoln Avenue",
    "Greenlane", "King Street", "South Service Road", "Vineland", "Jordan"
  ];

  return (
    <>
      <Helmet>
        <title>Beamsville Home Inspector | Wine Country Specialist</title>
        <meta name="description" content="Expert home inspections in Beamsville's wine country. We understand Niagara Escarpment properties and rural estates. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Beamsville"
        region="Lincoln, Niagara"
        description="Beamsville and Niagara wine country specialists. Our inspectors have deep experience with the unique properties along the Niagara Escarpment—from vineyard estates and historic farmhouses to modern developments in Vineland and Jordan. We understand the region's soil, drainage, and construction patterns."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}