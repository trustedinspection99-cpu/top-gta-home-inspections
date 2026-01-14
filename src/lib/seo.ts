// Centralized SEO configuration
export const SITE_URL = "https://www.asads.ca";
export const SITE_NAME = "ASADS Home Inspection";

/**
 * Ensures internal paths consistently use a leading slash without trailing slash.
 * Preserves query strings and hash fragments.
 */
export function normalizePath(path: string): string {
  if (!path) return "/";

  const match = path.match(/^[^?#]*/);
  const base = match?.[0] ?? path;
  const suffix = path.slice(base.length); // includes ?query and/or #hash

  const withLeading = base.startsWith("/") ? base : `/${base}`;

  // Remove trailing slash except for root
  const normalized = withLeading === "/" ? "/" : withLeading.endsWith("/") ? withLeading.slice(0, -1) : withLeading;

  return `${normalized}${suffix}`;
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}
