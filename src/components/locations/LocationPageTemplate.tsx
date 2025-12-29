import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Shield, Star, CheckCircle, ArrowRight } from "lucide-react";

interface LocationPageProps {
  city: string;
  region: string;
  description: string;
  neighborhoods: string[];
  phoneNumber: string;
}

export function LocationPageTemplate({ city, region, description, neighborhoods, phoneNumber }: LocationPageProps) {
  const services = [
    { name: "Residential Appliance Repair", description: "Fast, reliable repairs for all home appliances" },
    { name: "Commercial Appliance Service", description: "Keep your business running with expert commercial repairs" },
    { name: "Emergency Repairs", description: "24/7 emergency service when you need it most" },
    { name: "Preventive Maintenance", description: "Regular maintenance to extend appliance life" },
  ];

  const appliances = [
    "Refrigerators & Freezers",
    "Washing Machines",
    "Dryers",
    "Dishwashers",
    "Ovens & Stoves",
    "Microwaves",
    "Range Hoods",
    "Wine Coolers",
  ];

  const benefits = [
    "Same-day service available",
    "Licensed & insured technicians",
    "90-day parts & labor warranty",
    "Upfront, transparent pricing",
    "All major brands serviced",
    "Locally owned & operated",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              <MapPin className="h-4 w-4" />
              Serving {city}, {region}
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Appliance Repair in {city}
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              {description}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  Call Now: {phoneNumber}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">Book Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-muted/50 py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <span>4.9★ Rating (500+ Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Same-Day Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Our Services in {city}
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive appliance repair services for homes and businesses throughout {city}.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.name} className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appliances We Repair */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Appliances We Repair in {city}
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Our certified technicians are trained to repair all major appliance brands and types. 
                No matter what's broken, we have the expertise to fix it.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {appliances.map((appliance) => (
                  <div key={appliance} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{appliance}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-primary/5 p-8">
              <h3 className="mb-4 text-xl font-semibold">Why Choose ASADS in {city}?</h3>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Areas We Serve in {city}
            </h2>
            <p className="text-lg text-muted-foreground">
              Fast, reliable appliance repair service throughout {city} and surrounding neighborhoods.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {neighborhoods.map((neighborhood) => (
              <span
                key={neighborhood}
                className="rounded-full border bg-card px-4 py-2 text-sm font-medium"
              >
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Need Appliance Repair in {city}?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Don't let a broken appliance disrupt your day. Our expert technicians are ready to help 
              with fast, reliable service throughout {city}.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="h-5 w-5" />
                  {phoneNumber}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary gap-2" asChild>
                <Link to="/contact">
                  Schedule Service
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
