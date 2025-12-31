import { Helmet } from "react-helmet-async";

export interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration format (e.g., "PT1M33S" for 1 min 33 sec)
  contentUrl?: string;
  embedUrl?: string;
  expires?: string;
  hasPart?: {
    name: string;
    startOffset: number;
    endOffset?: number;
    url?: string;
  }[];
}

/**
 * VideoObject Schema Component
 * 
 * Use this component to add VideoObject structured data to pages with embedded videos.
 * This helps Google understand video content and can lead to rich video snippets in search results.
 * 
 * @example
 * <VideoSchema
 *   name="Home Inspection Walkthrough"
 *   description="Watch our certified inspector perform a comprehensive home inspection."
 *   thumbnailUrl="https://asads.ca/images/video-thumbnail.jpg"
 *   uploadDate="2024-01-15"
 *   duration="PT5M30S"
 *   embedUrl="https://www.youtube.com/embed/VIDEO_ID"
 * />
 */
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  expires,
  hasPart,
}: VideoSchemaProps) {
  const videoSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "publisher": {
      "@type": "Organization",
      "name": "ASADS Home Inspection",
      "logo": {
        "@type": "ImageObject",
        "url": "https://asads.ca/logo.png"
      }
    }
  };

  if (duration) {
    videoSchema.duration = duration;
  }

  if (contentUrl) {
    videoSchema.contentUrl = contentUrl;
  }

  if (embedUrl) {
    videoSchema.embedUrl = embedUrl;
  }

  if (expires) {
    videoSchema.expires = expires;
  }

  // Add clip markers for key moments (if provided)
  if (hasPart && hasPart.length > 0) {
    videoSchema.hasPart = hasPart.map((part) => ({
      "@type": "Clip",
      "name": part.name,
      "startOffset": part.startOffset,
      ...(part.endOffset && { endOffset: part.endOffset }),
      ...(part.url && { url: part.url })
    }));
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(videoSchema)}
      </script>
    </Helmet>
  );
}

/**
 * Helper function to convert seconds to ISO 8601 duration format
 * @param seconds - Total duration in seconds
 * @returns ISO 8601 duration string (e.g., "PT1H30M45S")
 */
export function secondsToIsoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  let duration = "PT";
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0 || (hours === 0 && minutes === 0)) duration += `${secs}S`;
  
  return duration;
}
