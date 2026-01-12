import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Home, Phone, MapPin, FileText, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `https://www.google.com/search?q=site:asads.ca+${encodeURIComponent(searchQuery)}`;
    }
  };

  const popularPages = [
    { name: "Home Inspections", href: "/services/pre-purchase", icon: Home },
    { name: "Book an Inspection", href: "/booking", icon: FileText },
    { name: "Service Areas", href: "/locations", icon: MapPin },
    { name: "Contact Us", href: "/contact", icon: Phone },
  ];

  const services = [
    { name: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
    { name: "Pre-Listing Inspection", href: "/services/pre-listing" },
    { name: "Radon Testing", href: "/services/radon-testing" },
    { name: "Mold Inspection", href: "/services/mold-inspection" },
    { name: "Condo Inspection", href: "/services/condo" },
    { name: "Commercial Inspection", href: "/services/commercial" },
  ];

  const topLocations = [
    { name: "Toronto", href: "/locations/toronto" },
    { name: "Mississauga", href: "/locations/mississauga" },
    { name: "Brampton", href: "/locations/brampton" },
    { name: "Markham", href: "/locations/markham" },
    { name: "Vaughan", href: "/locations/vaughan" },
    { name: "Oakville", href: "/locations/oakville" },
  ];

  return (
    <Layout>
      <div className="min-h-[70vh] bg-gradient-to-b from-muted to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Error Message */}
            <div className="mb-8">
              <h1 className="mb-2 text-8xl font-bold text-primary">404</h1>
              <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
                <br />
                <span className="text-sm">Attempted URL: {location.pathname}</span>
              </p>
            </div>

            {/* Search Box */}
            <div className="mb-12 rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Search Our Site</h3>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for services, locations, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {popularPages.map((page) => (
                <Link
                  key={page.href}
                  to={page.href}
                  className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <page.icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">{page.name}</span>
                </Link>
              ))}
            </div>

            {/* Services & Locations */}
            <div className="grid gap-8 text-left md:grid-cols-2">
              {/* Services */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Our Services</h3>
                <ul className="space-y-2">
                  {services.map((service) => (
                    <li key={service.href}>
                      <Link
                        to={service.href}
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  View all services →
                </Link>
              </div>

              {/* Locations */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Service Areas</h3>
                <ul className="space-y-2">
                  {topLocations.map((loc) => (
                    <li key={loc.href}>
                      <Link
                        to={loc.href}
                        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {loc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/locations"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  View all locations →
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <p className="mb-4 text-muted-foreground">
                Need help finding something? We're here to assist.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link to="/">Return to Homepage</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact/">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
