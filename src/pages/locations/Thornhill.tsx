import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { getLocationBySlug } from "@/data/locationData";

export default function Thornhill() {
  const data = getLocationBySlug("thornhill");

  if (!data) return null;

  return (
    <LocationPageTemplate
      slug={data.slug}
      city={data.city}
      region={data.region}
      description={data.description}
      metaTitle={data.metaTitle}
      metaDescription={data.metaDescription}
      neighborhoods={data.neighborhoods}
      phoneNumber={data.phoneNumber}
      localInsights={data.localInsights}
      localExpertise={data.localExpertise}
      latitude={data.latitude}
      longitude={data.longitude}
    />
  );
}
