import { buildLocalExpertise } from "@/lib/localExpertiseGenerator";
import { useParams, Navigate } from "react-router-dom";
import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";
import { locationData } from "@/data/locationData";
export default function LocationDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Find the city in your array
  const data = locationData.find((loc) => loc.slug === slug?.toLowerCase());

  // If no match, go back to main list
  if (!data) return <Navigate to="/locations" replace />;

  return (
    <LocationPageTemplate
      city={data.city}
      region={data.region}
      // This ensures 'description' in the template gets your data
      description={data.description || (data as any).metaDescription} 
      phoneNumber={data.phoneNumber}
      neighborhoods={data.neighborhoods}
      // This ensures 'localInsights' in the template gets your unique data
      localInsights={data.localInsights}
      latitude={data.latitude}
      longitude={data.longitude}
    />
  );
}
