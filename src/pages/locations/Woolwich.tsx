import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { getLocationBySlug } from "@/data/locationData";

export default function Woolwich() {
  const data = getLocationBySlug("woolwich");

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
