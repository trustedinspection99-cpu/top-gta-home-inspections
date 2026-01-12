import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { getLocationBySlug } from "@/data/locationData";

export default function PortPerry() {
  const data = getLocationBySlug("port-perry");

  if (!data) return null;

  return (
    <LocationPageTemplate
      city={data.city}
      region={data.region}
      description={data.description}
      metaTitle={data.metaTitle}
      metaDescription={data.metaDescription}
      neighborhoods={data.neighborhoods}
      phoneNumber={data.phoneNumber}
      localInsights={data.localInsights}
      latitude={data.latitude}
      longitude={data.longitude}
    />
  );
}
