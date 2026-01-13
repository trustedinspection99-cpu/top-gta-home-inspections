// Centralized SEO configuration
export const SITE_URL = "https://www.asads.ca";
export const SITE_NAME = "ASADS Home Inspection";

/**
 * Ensures internal paths consistently use a leading and trailing slash.
 * Preserves query strings and hash fragments.
 */
export function normalizePath(path: string): string {
  if (!path) return "/";

  const match = path.match(/^[^?#]*/);
  const base = match?.[0] ?? path;
  const suffix = path.slice(base.length); // includes ?query and/or #hash

  const withLeading = base.startsWith("/") ? base : `/${base}`;

  // special-case root
  const withTrailing = withLeading === "/" ? "/" : withLeading.endsWith("/") ? withLeading : `${withLeading}/`;

  return `${withTrailing}${suffix}`;
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}

