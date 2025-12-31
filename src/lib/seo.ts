// Centralized SEO configuration
export const SITE_URL = "https://www.asads.ca";
export const SITE_NAME = "ASADS Home Inspection";

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const pathWithSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${SITE_URL}${pathWithSlash}`;
}
