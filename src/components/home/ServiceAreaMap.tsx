import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
  { name: "Toronto", href: "/locations/toronto", featured: true },
  { name: "Mississauga", href: "/locations/mississauga", featured: true },
  { name: "Brampton", href: "/locations/brampton", featured: true },
  { name: "Vaughan", href: "/locations/vaughan", featured: true },
  { name: "Markham", href: "/locations/markham" },
  { name: "Richmond Hill", href: "/locations/richmond-hill" },
  { name: "Scarborough", href: "/locations/scarborough" },
  { name: "North York", href: "/locations/north-york" },
  { name: "Etobicoke", href: "/locations/etobicoke" },
  { name: "Oakville", href: "/locations/oakville" },
  { name: "Burlington", href: "/locations/burlington" },
  { name: "Milton", href: "/locations/milton" },
  { name: "Pickering", href: "/locations/pickering" },
  { name: "Ajax", href: "/locations/ajax" },
  { name: "Oshawa", href: "/locations/oshawa" },
  { name: "Whitby", href: "/locations/whitby" },
];

export function ServiceAreaMap() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Illustration */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Stylized GTA Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border-2 border-dashed border-primary/20 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full border-2 border-dashed border-primary/30"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg animate-float">
                    <MapPin className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                {/* Location dots */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-accent"></div>
                <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-accent"></div>
                <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-accent"></div>
                <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-accent"></div>
                <div className="absolute top-1/2 left-1/6 w-2 h-2 rounded-full bg-primary/50"></div>
                <div className="absolute top-1/6 right-1/3 w-2 h-2 rounded-full bg-primary/50"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Serving the Greater Toronto Area
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We proudly provide home inspection services across the GTA. No matter where you're 
              buying or selling, our certified inspectors are ready to help.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {locations.map((location) => (
                <Link
                  key={location.href}
                  to={location.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    location.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {location.name}
                </Link>
              ))}
            </div>

            <Button asChild>
              <Link to="/locations">View All Service Areas</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}