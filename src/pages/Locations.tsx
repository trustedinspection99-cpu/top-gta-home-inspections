import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Star,
  ChevronDown,
  Search as SearchIcon,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { OrphanLocationLinks } from "@/components/seo/OrphanLocationLinks";
import { locationData } from "@/data/locationData";

/* ---------------------------------------------------
   HELPER: Group flat data by Region
--------------------------------------------------- */
const getRegionList = () => {
  if (!Array.isArray(locationData)) return [];

  const groups = locationData.reduce((acc, loc) => {
    const regionName = loc.region || "Other Areas";
    if (!acc[regionName]) acc[regionName] = [];
    acc[regionName].push({
      city: loc.city,
      slug: loc.slug,
      href: `/locations/${loc.slug}/`,
      popular: (loc as any).popular || false,
      region: regionName,
    });
    return acc;
  }, {} as Record<string, any[]>);

  return Object.entries(groups).map(([name, locations]) => ({
    name,
    locations,
  }));
};

const regionList = getRegionList();
const allLocations = locationData || [];

/* ---------------------------------------------------
   COMPONENT
--------------------------------------------------- */
export default function Locations() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Default all regions to open
  const [openRegions, setOpenRegions] = useState<string[]>(
    regionList.map((r) => r.name)
  );

  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return regionList;

    const query = searchQuery.toLowerCase();

    return regionList
      .map((region) => ({
        ...region,
        locations: region.locations.filter((loc) =>
          loc.city.toLowerCase().includes(query)
        ),
      }))
      .filter((region) => region.locations.length > 0);
  }, [searchQuery]);

  const totalLocations = allLocations.length;
  const matchedLocations = filteredRegions.reduce(
    (sum, region) => sum + region.locations.length,
    0
  );

  const toggleRegion = (regionName: string) => {
    setOpenRegions((prev) =>
      prev.includes(regionName)
        ? prev.filter((r) => r !== regionName)
        : [...prev, regionName]
    );
  };

  const expandAll = () => setOpenRegions(regionList.map((r) => r.name));
  const collapseAll = () => setOpenRegions([]);

  return (
    <Layout>
      <Helmet>
        <title>Service Areas | Home Inspection Across the GTA | ASADS</title>
        <meta
          name="description"
          content="ASADS provides professional home inspection services across the Greater Toronto Area. Certified inspectors in Toronto, Mississauga, Brampton, Vaughan, Markham & 80+ more cities."
        />
        <link rel="canonical" href="https://www.asads.ca/locations/" />
      </Helmet>

      {/* HERO */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">
            Home Inspection Service Areas
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            ASADS proudly provides certified home inspection services across the
            Greater Toronto Area and surrounding regions.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Same-Day Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Certified Inspectors</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span>5-Star Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="container py-12">
        <div className="max-w-xl mx-auto relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search city or town..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Showing {matchedLocations} of {totalLocations} locations
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>

        {/* REGIONS */}
        <div className="mt-10 space-y-6">
          {filteredRegions.map((region) => (
            <Collapsible
              key={region.name}
              open={openRegions.includes(region.name)}
              onOpenChange={() => toggleRegion(region.name)}
            >
              <CollapsibleTrigger asChild>
                <button
                  className="w-full flex justify-between items-center bg-muted px-6 py-4 rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <h2 className="text-xl font-semibold">{region.name}</h2>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openRegions.includes(region.name) ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-2">
                  {region.locations.map((loc) => (
                    <Link
                      key={loc.slug}
                      to={loc.href}
                      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition group"
                    >
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span className="flex-1 truncate">{loc.city}</span>
                      {loc.popular && (
                        <span className="text-[10px] uppercase tracking-wider bg-primary text-white px-1.5 py-0.5 rounded font-bold">
                          Popular
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Book Your Home Inspection Today
          </h2>
          <p className="max-w-2xl mx-auto mb-6">
            Serving all GTA cities with fast scheduling and detailed reports.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="secondary">
              <a href="tel:6478019311">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact/">Request Inspection</Link>
            </Button>
          </div>
        </div>
      </section>

      <OrphanLocationLinks />
    </Layout>
  );
}
