// Centralized SEO configuration
export const SITE_URL = "https://www.asads.ca";
export const SITE_NAME = "ASADS Home Inspection";

/**
 * Normalizes paths to:
 * - Always have a leading slash
 * - ALWAYS have a trailing slash for directory-style URLs (not for .html files)
 * - Preserve query strings and hash fragments
 * 
 * This ensures canonical URLs match the final destination and prevent 308 redirects.
 */
export function normalizePath(path: string): string {
  if (!path) return "/";

  const match = path.match(/^[^?#]*/);
  const base = match?.[0] ?? path;
  const suffix = path.slice(base.length); // ?query or #hash

  let normalized = base.startsWith("/") ? base : `/${base}`;

  // Root stays root with trailing slash
  if (normalized === "/" || normalized === "") {
    return "/";
  }

  // Don't add trailing slash to files with extensions (e.g., .html, .xml, .json)
  if (/\.[a-zA-Z0-9]+$/.test(normalized)) {
    return `${normalized}${suffix}`;
  }

  // Ensure trailing slash for all directory-style URLs
  if (!normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }

  return `${normalized}${suffix}`;
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}
