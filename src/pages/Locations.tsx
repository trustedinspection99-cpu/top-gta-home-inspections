import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight, Clock, Shield, Star, Search, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Location {
  name: string;
  href: string;
  popular?: boolean;
}

interface Region {
  name: string;
  locations: Location[];
}

const regions: Region[] = [
  {
    name: "Toronto & Surrounding",
    locations: [
      { name: "Toronto", href: "/locations/toronto", popular: true },
      { name: "North York", href: "/locations/north-york" },
      { name: "Scarborough", href: "/locations/scarborough" },
      { name: "Etobicoke", href: "/locations/etobicoke" },
      { name: "East York", href: "/locations/east-york" },
    ],
  },
  {
    name: "Peel Region",
    locations: [
      { name: "Mississauga", href: "/locations/mississauga", popular: true },
      { name: "Brampton", href: "/locations/brampton", popular: true },
      { name: "Caledon", href: "/locations/caledon" },
      { name: "Bolton", href: "/locations/bolton" },
    ],
  },
  {
    name: "York Region",
    locations: [
      { name: "Vaughan", href: "/locations/vaughan", popular: true },
      { name: "Markham", href: "/locations/markham", popular: true },
      { name: "Richmond Hill", href: "/locations/richmond-hill", popular: true },
      { name: "Newmarket", href: "/locations/newmarket" },
      { name: "Aurora", href: "/locations/aurora" },
      { name: "King City", href: "/locations/king-city" },
      { name: "Stouffville", href: "/locations/stouffville" },
      { name: "Georgina", href: "/locations/georgina" },
      { name: "East Gwillimbury", href: "/locations/east-gwillimbury" },
      { name: "Keswick", href: "/locations/keswick" },
      { name: "Sutton", href: "/locations/sutton" },
      { name: "Woodbridge", href: "/locations/woodbridge" },
      { name: "Thornhill", href: "/locations/thornhill" },
      { name: "Maple", href: "/locations/maple" },
      { name: "Kleinburg", href: "/locations/kleinburg" },
      { name: "Concord", href: "/locations/concord" },
      { name: "Unionville", href: "/locations/unionville" },
    ],
  },
  {
    name: "Halton Region",
    locations: [
      { name: "Oakville", href: "/locations/oakville", popular: true },
      { name: "Burlington", href: "/locations/burlington", popular: true },
      { name: "Milton", href: "/locations/milton" },
      { name: "Halton Hills", href: "/locations/halton-hills" },
      { name: "Georgetown", href: "/locations/georgetown" },
      { name: "Acton", href: "/locations/acton" },
    ],
  },
  {
    name: "Durham Region",
    locations: [
      { name: "Oshawa", href: "/locations/oshawa" },
      { name: "Whitby", href: "/locations/whitby" },
      { name: "Ajax", href: "/locations/ajax" },
      { name: "Pickering", href: "/locations/pickering" },
      { name: "Clarington", href: "/locations/clarington" },
      { name: "Bowmanville", href: "/locations/bowmanville" },
      { name: "Uxbridge", href: "/locations/uxbridge" },
      { name: "Scugog", href: "/locations/scugog" },
      { name: "Port Perry", href: "/locations/port-perry" },
      { name: "Brock", href: "/locations/brock" },
      { name: "Beaverton", href: "/locations/beaverton" },
      { name: "Cannington", href: "/locations/cannington" },
    ],
  },
  {
    name: "Simcoe County",
    locations: [
      { name: "Barrie", href: "/locations/barrie" },
      { name: "Orillia", href: "/locations/orillia" },
      { name: "Innisfil", href: "/locations/innisfil" },
      { name: "Bradford", href: "/locations/bradford" },
      { name: "Alliston", href: "/locations/alliston" },
      { name: "Collingwood", href: "/locations/collingwood" },
      { name: "Wasaga Beach", href: "/locations/wasaga-beach" },
      { name: "Midland", href: "/locations/midland" },
      { name: "Penetanguishene", href: "/locations/penetanguishene" },
      { name: "New Tecumseth", href: "/locations/new-tecumseth" },
      { name: "Essa", href: "/locations/essa" },
      { name: "Springwater", href: "/locations/springwater" },
      { name: "Clearview", href: "/locations/clearview" },
      { name: "Stayner", href: "/locations/stayner" },
    ],
  },
  {
    name: "Hamilton-Niagara",
    locations: [
      { name: "Hamilton", href: "/locations/hamilton" },
      { name: "Stoney Creek", href: "/locations/stoney-creek" },
      { name: "Ancaster", href: "/locations/ancaster" },
      { name: "Dundas", href: "/locations/dundas" },
      { name: "Flamborough", href: "/locations/flamborough" },
      { name: "Grimsby", href: "/locations/grimsby" },
      { name: "Beamsville", href: "/locations/beamsville" },
      { name: "Lincoln", href: "/locations/lincoln" },
      { name: "St. Catharines", href: "/locations/st-catharines" },
      { name: "Niagara Falls", href: "/locations/niagara-falls" },
      { name: "Niagara-on-the-Lake", href: "/locations/niagara-on-the-lake" },
      { name: "Welland", href: "/locations/welland" },
      { name: "Fort Erie", href: "/locations/fort-erie" },
      { name: "Port Colborne", href: "/locations/port-colborne" },
      { name: "Thorold", href: "/locations/thorold" },
    ],
  },
  {
    name: "Waterloo Region",
    locations: [
      { name: "Kitchener", href: "/locations/kitchener" },
      { name: "Waterloo", href: "/locations/waterloo" },
      { name: "Cambridge", href: "/locations/cambridge" },
    ],
  },
  {
    name: "Wellington & Dufferin",
    locations: [
      { name: "Guelph", href: "/locations/guelph" },
      { name: "Orangeville", href: "/locations/orangeville" },
    ],
  },
  {
    name: "Kawartha & Peterborough",
    locations: [
      { name: "Peterborough", href: "/locations/peterborough" },
    ],
  },
  {
    name: "Northumberland & Brant",
    locations: [
      { name: "Cobourg", href: "/locations/cobourg" },
      { name: "Brantford", href: "/locations/brantford" },
    ],
  },
];

// Get all locations flattened
const allLocations = regions.flatMap((region) => region.locations);

export default function Locations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openRegions, setOpenRegions] = useState<string[]>(regions.map((r) => r.name));

  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return regions;

    const query = searchQuery.toLowerCase();
    return regions
      .map((region) => ({
        ...region,
        locations: region.locations.filter((loc) =>
          loc.name.toLowerCase().includes(query)
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

  const expandAll = () => setOpenRegions(regions.map((r) => r.name));
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Our Service Areas
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              Professional home inspection services throughout the Greater Toronto Area.
              Certified inspectors with same-day reports available.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <a href="tel:(647) 801-9311">
                <Phone className="h-5 w-5" />
                Call Now: (647) 801-9311
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-muted/50 py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Certified & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <span>4.9★ Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Same-Day Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Locations Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Serving {totalLocations}+ Communities Within 150km of Toronto
            </h2>
            <p className="text-lg text-muted-foreground">
              From the GTA to Barrie, Hamilton, Kitchener-Waterloo, and beyond.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for your city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
            {searchQuery && (
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Found {matchedLocations} location{matchedLocations !== 1 && "s"}
              </p>
            )}
          </div>

          {/* Expand/Collapse Controls */}
          <div className="mb-6 flex justify-center gap-4">
            <Button variant="outline" size="sm" onClick={expandAll}>
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
              Collapse All
            </Button>
          </div>

          {/* Regional Collapsible Sections */}
          <div className="space-y-4">
            {filteredRegions.map((region) => (
              <Collapsible
                key={region.name}
                open={openRegions.includes(region.name)}
                onOpenChange={() => toggleRegion(region.name)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-lg font-semibold">{region.name}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {region.locations.length} cities
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      openRegions.includes(region.name) ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {region.locations.map((location) => (
                      <Link
                        key={location.name}
                        to={location.href}
                        className={`group flex items-center justify-between rounded-lg border bg-card p-3 transition-all hover:border-primary hover:shadow-md ${
                          location.popular ? "border-primary/30 bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{location.name}</span>
                          {location.popular && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              Popular
                            </span>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {filteredRegions.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-lg text-muted-foreground">
                No locations found matching "{searchQuery}"
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Fast, Thorough Inspections Across the GTA
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Our certified inspectors are strategically located throughout the Greater
                Toronto Area. Most inspections include same-day reports.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Same-day reports available</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Inspectors across the GTA</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>200+ point inspections</span>
                </li>
              </ul>
              <Button className="gap-2" asChild>
                <Link to="/contact">
                  Book Your Inspection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-6xl font-bold text-primary">
                    {totalLocations}+
                  </div>
                  <div className="text-xl font-medium text-muted-foreground">
                    Communities Served
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    150km Radius from Toronto
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute left-1/4 top-1/4 h-3 w-3 animate-pulse rounded-full bg-primary" />
              <div
                className="absolute right-1/3 top-1/3 h-2 w-2 animate-pulse rounded-full bg-accent"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-1/3 left-1/3 h-2 w-2 animate-pulse rounded-full bg-primary"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-1/4 right-1/4 h-3 w-3 animate-pulse rounded-full bg-accent"
                style={{ animationDelay: "1.5s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Don't See Your Area?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              We may still be able to help! Contact us to check if we service your
              location.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href="tel:+16478019311">
                  <Phone className="h-5 w-5" />
                  (647) 801-9311
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
