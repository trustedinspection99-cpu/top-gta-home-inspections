import { useParams, Navigate } from "react-router-dom";
import { locationData } from "@/data/locationData";
import { LocationPageTemplate } from "@/components/templates/LocationPageTemplate";

export default function LocationDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Find the specific city data based on the URL slug
  // We use lowercase to ensure the match works even if the URL is typed with caps
  const data = locationData.find((loc) => loc.slug === slug?.toLowerCase());

  // If the slug doesn't exist, redirect back to the main locations list
  if (!data) return <Navigate to="/locations" replace />;

  return (
    <LocationPageTemplate
      city={data.city}
      region={data.region}
      description={data.description}
      neighborhoods={data.neighborhoods}
      phoneNumber={data.phoneNumber}
      localInsights={data.localInsights}
      latitude={data.latitude}
      longitude={data.longitude}
      // The template handles the Helmet/SEO internally using these props
    />
  );
}
