import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight, Clock, Shield, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Major Cities - Popular
const popularLocations = [
  { name: "Toronto", href: "/locations/toronto", popular: true },
  { name: "Mississauga", href: "/locations/mississauga", popular: true },
  { name: "Brampton", href: "/locations/brampton", popular: true },
  { name: "Vaughan", href: "/locations/vaughan", popular: true },
  { name: "Markham", href: "/locations/markham", popular: true },
  { name: "Richmond Hill", href: "/locations/richmond-hill", popular: true },
  { name: "Oakville", href: "/locations/oakville", popular: true },
  { name: "Burlington", href: "/locations/burlington", popular: true },
];

// All locations within 150km radius of Toronto
const allLocations = [
  // Toronto & Surrounding
  { name: "Toronto", href: "/locations/toronto", popular: true },
  { name: "North York", href: "/locations/north-york" },
  { name: "Scarborough", href: "/locations/scarborough" },
  { name: "Etobicoke", href: "/locations/etobicoke" },
  { name: "East York", href: "/locations/east-york" },
  
  // Peel Region
  { name: "Mississauga", href: "/locations/mississauga", popular: true },
  { name: "Brampton", href: "/locations/brampton", popular: true },
  { name: "Caledon", href: "/locations/caledon" },
  { name: "Bolton", href: "/locations/bolton" },
  
  // York Region
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
  
  // Halton Region
  { name: "Oakville", href: "/locations/oakville", popular: true },
  { name: "Burlington", href: "/locations/burlington", popular: true },
  { name: "Milton", href: "/locations/milton" },
  { name: "Halton Hills", href: "/locations/halton-hills" },
  { name: "Georgetown", href: "/locations/georgetown" },
  { name: "Acton", href: "/locations/acton" },
  
  // Durham Region
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
  
  // Simcoe County
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
  
  // Hamilton & Niagara
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
  
  // Wellington County
  { name: "Guelph", href: "/locations/guelph" },
  { name: "Fergus", href: "/locations/fergus" },
  { name: "Elora", href: "/locations/elora" },
  { name: "Erin", href: "/locations/erin" },
  { name: "Centre Wellington", href: "/locations/centre-wellington" },
  
  // Waterloo Region
  { name: "Kitchener", href: "/locations/kitchener" },
  { name: "Waterloo", href: "/locations/waterloo" },
  { name: "Cambridge", href: "/locations/cambridge" },
  { name: "Woolwich", href: "/locations/woolwich" },
  { name: "Elmira", href: "/locations/elmira" },
  
  // Dufferin County
  { name: "Orangeville", href: "/locations/orangeville" },
  { name: "Shelburne", href: "/locations/shelburne" },
  { name: "Grand Valley", href: "/locations/grand-valley" },
  { name: "Mono", href: "/locations/mono" },
  
  // Kawartha Lakes & Peterborough
  { name: "Kawartha Lakes", href: "/locations/kawartha-lakes" },
  { name: "Lindsay", href: "/locations/lindsay" },
  { name: "Bobcaygeon", href: "/locations/bobcaygeon" },
  { name: "Fenelon Falls", href: "/locations/fenelon-falls" },
  { name: "Peterborough", href: "/locations/peterborough" },
  { name: "Lakefield", href: "/locations/lakefield" },
  
  // Northumberland County
  { name: "Cobourg", href: "/locations/cobourg" },
  { name: "Port Hope", href: "/locations/port-hope" },
  { name: "Brighton", href: "/locations/brighton" },
  { name: "Colborne", href: "/locations/colborne" },
  
  // Brant County
  { name: "Brantford", href: "/locations/brantford" },
  { name: "Paris", href: "/locations/paris" },
];

const locations = allLocations;

export default function Locations() {
  return (
    <Layout>
      <Helmet>
        <title>Service Areas | Home Inspection Across the GTA | ASADS</title>
        <meta name="description" content="ASADS provides professional home inspection services across the Greater Toronto Area. Certified inspectors in Toronto, Mississauga, Brampton, Vaughan, Markham & more." />
        <link rel="canonical" href="https://asads.ca/locations" />
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

      {/* Locations Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Serving 100+ Communities Within 150km of Toronto
            </h2>
            <p className="text-lg text-muted-foreground">
              From the GTA to Barrie, Hamilton, Kitchener-Waterloo, and beyond. Click any location below.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {locations.map((location) => (
              <Link
                key={location.name}
                to={location.href}
                className={`group flex items-center justify-between rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md ${
                  location.popular ? "bg-primary/5 border-primary/30" : "bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`h-5 w-5 ${location.popular ? "text-primary" : "text-muted-foreground"}`} />
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
                Our certified inspectors are strategically located throughout the 
                Greater Toronto Area. Most inspections include same-day reports.
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
                  <div className="mb-4 text-6xl font-bold text-primary">100+</div>
                  <div className="text-xl font-medium text-muted-foreground">Communities Served</div>
                  <div className="text-sm text-muted-foreground mt-2">150km Radius from Toronto</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute left-1/4 top-1/4 h-3 w-3 animate-pulse rounded-full bg-primary" />
              <div className="absolute right-1/3 top-1/3 h-2 w-2 animate-pulse rounded-full bg-accent" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-1/3 left-1/3 h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/4 right-1/4 h-3 w-3 animate-pulse rounded-full bg-accent" style={{ animationDelay: "1.5s" }} />
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
              We may still be able to help! Contact us to check if we service your location.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href="tel:+16478019311">
                  <Phone className="h-5 w-5" />
                  (647) 801-9311
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
