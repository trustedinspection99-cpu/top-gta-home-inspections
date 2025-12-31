import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

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
  "condo": "Condo Inspection",
  "commercial": "Commercial Inspection",
  "mold-inspection": "Mold Inspection",
  "radon-testing": "Radon Testing",
  "asbestos-testing": "Asbestos Testing",
  "lead-paint-testing": "Lead Paint Testing",
  "air-quality": "Air Quality Testing",
  "thermal-imaging": "Thermal Imaging",
  "sewer-scope": "Sewer Scope",
  "well-water-testing": "Well & Water Testing",
  "wett": "WETT Inspection",
  // Major locations
  toronto: "Toronto",
  mississauga: "Mississauga",
  brampton: "Brampton",
  vaughan: "Vaughan",
  markham: "Markham",
  oakville: "Oakville",
  burlington: "Burlington",
  hamilton: "Hamilton",
  oshawa: "Oshawa",
  barrie: "Barrie",
  guelph: "Guelph",
  cambridge: "Cambridge",
  kitchener: "Kitchener",
  waterloo: "Waterloo",
  "richmond-hill": "Richmond Hill",
  newmarket: "Newmarket",
  ajax: "Ajax",
  pickering: "Pickering",
  whitby: "Whitby",
  milton: "Milton",
  // Add more as needed
};

const formatLabel = (segment: string): string => {
  if (routeLabels[segment]) return routeLabels[segment];
  
  // Convert kebab-case to Title Case
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) return null;

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    const label = formatLabel(segment);

    return { path, label, isLast };
  });

  return (
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
            {breadcrumbItems.map((item, index) => (
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
  );
};

export default Breadcrumbs;
