// Centralized SEO configuration
export const SITE_URL = "https://www.asads.ca";
export const SITE_NAME = "ASADS Home Inspection";

/**
 * Normalizes paths to:
 * - Always have a leading slash
 * - NEVER have a trailing slash (except root)
 * - Preserve query strings and hash fragments
 */
export function normalizePath(path: string): string {
  if (!path) return "/";

  const match = path.match(/^[^?#]*/);
  const base = match?.[0] ?? path;
  const suffix = path.slice(base.length); // ?query or #hash

  let normalized = base.startsWith("/") ? base : `/${base}`;

  // Root stays root
  if (normalized === "/") {
    return "/";
  }

  // Remove trailing slash
  if (normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return `${normalized}${suffix}`;
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}
