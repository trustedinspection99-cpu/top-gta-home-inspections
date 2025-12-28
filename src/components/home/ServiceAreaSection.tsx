import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
  { name: "Toronto", href: "/locations/toronto", popular: true },
  { name: "Mississauga", href: "/locations/mississauga", popular: true },
  { name: "Brampton", href: "/locations/brampton", popular: true },
  { name: "Vaughan", href: "/locations/vaughan", popular: true },
  { name: "Markham", href: "/locations/markham", popular: true },
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

export function ServiceAreaSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Stylized Map */}
              <div className="relative w-full h-full p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="font-heading text-2xl font-bold text-foreground">Greater Toronto Area</p>
                    <p className="text-muted-foreground">Serving 30+ Communities</p>
                  </div>
                </div>
                
                {/* Animated Dots */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-primary rounded-full animate-pulse"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving the Entire GTA
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              From downtown Toronto to the surrounding suburbs, our certified inspectors 
              provide comprehensive home inspection services throughout the Greater Toronto Area.
            </p>

            {/* Location Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {locations.map((location) => (
                <Link
                  key={location.name}
                  to={location.href}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors hover:border-primary hover:bg-primary/5 ${
                    location.popular ? "border-primary/30 bg-primary/5" : "border-border"
                  }`}
                >
                  <MapPin className={`h-4 w-4 ${location.popular ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium text-foreground">{location.name}</span>
                </Link>
              ))}
            </div>

            <Button asChild>
              <Link to="/locations">
                View All Service Areas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
