import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { Helmet } from "react-helmet-async";
import { getLocationBySlug } from "@/data/locationData";

export default function HaltonHills() {
  const data = getLocationBySlug("halton-hills");

  if (!data) return null;

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
      </Helmet>

      <LocationPageTemplate
        city={data.city}
        region={data.region}
        description={data.description}
        neighborhoods={data.neighborhoods}
        phoneNumber={data.phoneNumber}
        localInsights={data.localInsights}
        latitude={data.latitude}
        longitude={data.longitude}
      />
    </>
  );
}
