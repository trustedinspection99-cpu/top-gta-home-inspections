import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { blogPostsData } from "@/data/blogPosts";

const routeLabels: Record<string, string> = {
  services: "Services",
  locations: "Locations",
  blog: "Blog",
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  pricing: "Pricing",
  booking: "Book Now",
  testimonials: "Testimonials",
  "privacy-policy": "Privacy Policy",
  terms: "Terms of Service",
  // Services
  "pre-purchase": "Pre-Purchase Inspection",
  "pre-listing": "Pre-Listing Inspection",
  "new-construction": "New Construction",
  condo: "Condo Inspection",
  commercial: "Commercial Inspection",
  "mold-inspection": "Mold Inspection",
  "radon-testing": "Radon Testing",
  "asbestos-testing": "Asbestos Testing",
  "lead-paint-testing": "Lead Paint Testing",
  "air-quality": "Air Quality Testing",
  "thermal-imaging": "Thermal Imaging",
  "sewer-scope": "Sewer Scope",
  "well-water-testing": "Well & Water Testing",
  wett: "WETT Inspection",
};

const ACRONYMS = new Set(["gta", "faq", "wett"]);
const LOWERCASE_WORDS = new Set(["and", "or", "the", "of", "in", "on", "at", "to", "for"]);

// Build a lookup map for blog post titles by slug
const blogTitlesBySlug: Record<string, string> = {};
blogPostsData.forEach((post) => {
  blogTitlesBySlug[post.slug] = post.title;
});

const toTitleCase = (raw: string): string => {
  const decoded = decodeURIComponent(raw);

  return decoded
    .replace(/[_-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word, idx, arr) => {
      const w = word.toLowerCase();

      if (ACRONYMS.has(w)) return w.toUpperCase();
      if (w === "st" && idx === 0) return "St.";
      if (LOWERCASE_WORDS.has(w) && idx > 0 && idx < arr.length - 1) return w;

      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
};

const formatLabel = (segment: string, isBlogPost: boolean): string => {
  // Check if this is a blog post slug
  if (isBlogPost && blogTitlesBySlug[segment]) {
    return blogTitlesBySlug[segment];
  }
  if (routeLabels[segment]) return routeLabels[segment];
  return toTitleCase(segment);
};

// Pages that already have their own BreadcrumbList schema (to avoid duplication)
const PAGES_WITH_OWN_SCHEMA = new Set(["/blog/"]);

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) return null;

  // Determine if we're on a blog post page (e.g., /blog/some-slug)
  const isBlogPostPage = pathSegments[0] === "blog" && pathSegments.length > 1;

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    const isBlogPost = isBlogPostPage && index === 1;
    const label = formatLabel(segment, isBlogPost);

    return { path, label, isLast };
  });

  // Check if this page already has its own breadcrumb schema
  const hasOwnSchema = Array.from(PAGES_WITH_OWN_SCHEMA).some((prefix) =>
    location.pathname.startsWith(prefix)
  );

  // Generate BreadcrumbList JSON-LD schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://asads.ca/",
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `https://asads.ca${item.path}`,
      })),
    ],
  };

  return (
    <>
      {!hasOwnSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        </Helmet>
      )}
      <nav aria-label="Breadcrumb" className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Home className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbItems.map((item) => (
                <span key={item.path} className="contents">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {item.isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={item.path} className="hover:text-primary transition-colors">
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
