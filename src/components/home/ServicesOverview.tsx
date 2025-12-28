import { Link } from "react-router-dom";
import { 
  Home, 
  Building2, 
  Hammer, 
  Building, 
  Factory,
  Thermometer,
  Wind,
  Flame,
  Search,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mainServices = [
  {
    icon: Home,
    title: "Pre-Purchase Inspection",
    description: "Complete evaluation before you buy. Identify issues and negotiate with confidence.",
    href: "/services/pre-purchase",
  },
  {
    icon: Building2,
    title: "Pre-Listing Inspection",
    description: "Sell your home faster with a pre-listing inspection that builds buyer trust.",
    href: "/services/pre-listing",
  },
  {
    icon: Hammer,
    title: "New Construction",
    description: "Verify builder quality and catch defects before your final walkthrough.",
    href: "/services/new-construction",
  },
  {
    icon: Building,
    title: "Condo Inspection",
    description: "Specialized inspections for condos, townhomes, and stacked units.",
    href: "/services/condo",
  },
  {
    icon: Factory,
    title: "Commercial Inspection",
    description: "Comprehensive assessments for commercial and investment properties.",
    href: "/services/commercial",
  },
];

const specialtyServices = [
  {
    icon: Thermometer,
    title: "Radon Testing",
    description: "Protect your family from this invisible cancer-causing gas.",
    href: "/services/radon-testing",
  },
  {
    icon: Search,
    title: "Mold Inspection",
    description: "Identify hidden mold growth and potential health hazards.",
    href: "/services/mold-inspection",
  },
  {
    icon: Flame,
    title: "Thermal Imaging",
    description: "See beyond walls to find hidden moisture and insulation issues.",
    href: "/services/thermal-imaging",
  },
  {
    icon: Flame,
    title: "WETT Inspection",
    description: "Safety certification for wood stoves, fireplaces, and chimneys.",
    href: "/services/wett",
  },
  {
    icon: Wind,
    title: "Air Quality Testing",
    description: "Ensure healthy indoor air for your family or employees.",
    href: "/services/air-quality",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Inspection Services
          </h2>
          <p className="text-lg text-muted-foreground">
            From pre-purchase inspections to specialized testing, we provide thorough 
            assessments to protect your investment and ensure your safety.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainServices.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  to={service.href}
                  className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specialty Services */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <h3 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
            Specialty Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {specialtyServices.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="group flex flex-col items-center text-center p-4 rounded-xl hover:bg-background transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                  <service.icon className="h-5 w-5 text-secondary" />
                </div>
                <span className="font-medium text-foreground text-sm">{service.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
