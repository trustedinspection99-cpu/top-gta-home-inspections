import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";

export default function Stayner() {
  const neighborhoods = [
    "Downtown Stayner", "South Stayner", "Airport Road Area", "Sunnidale Road",
    "Main Street", "Station Street", "Hurontario Street", "Victoria Street"
  ];

  return (
    <>
      <Helmet>
        <title>Stayner Home Inspector | Clearview Township | ASADS</title>
        <meta name="description" content="Stayner & Clearview home inspections. Ski country property experts serving Collingwood area. Call (647) 801-9311." />
      </Helmet>
      <LocationPageTemplate
        city="Stayner"
        region="Clearview Township"
        description="Stayner's local home inspection experts. Serving Clearview Township's diverse properties—from downtown Stayner heritage homes to rural acreages near Nottawa and recreational properties in ski country. We understand the unique challenges of Georgian Bay area construction."
        neighborhoods={neighborhoods}
        phoneNumber="(647) 801-9311"
      />
    </>
  );
}
