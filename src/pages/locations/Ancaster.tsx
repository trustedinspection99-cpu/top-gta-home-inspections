import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Ancaster() {
  const neighborhoods = [
    "Ancaster Village", "Meadowlands", "Fieldstone", "Harmony Hall",
    "Ancaster Heights", "Southcote", "Jerseyville Road", "Wilson Street", "Garner Road"
  ];

  return (
    <>
      <Helmet>
        <title>Ancaster Home Inspector | Hamilton Escarpment | ASADS</title>
        <meta name="description" content="Ancaster home inspections on the Hamilton Escarpment. Heritage & estate property specialists. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Ancaster"
        region="Hamilton"
        description="Ancaster's premier home inspection service. We specialize in Hamilton's upscale Escarpment properties—from historic Wilson Street homes to estate properties in Meadowlands and Fieldstone. Our inspectors understand the unique drainage and foundation considerations of escarpment living."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
