import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Shield
} from "lucide-react";

const mainServices = [
  {
    icon: Home,
    title: "Pre-Purchase Home Inspection",
    description: "Comprehensive evaluation before you buy. Identify issues, understand the property condition, and negotiate with confidence.",
    href: "/services/pre-purchase/",
    features: [
      "200+ point inspection",
      "Detailed photo report",
      "Cost estimates for repairs",
      "Same-day booking available",
    ],
    price: "From $399",
  },
  {
    icon: Building2,
    title: "Pre-Listing Inspection",
    description: "Sell your home faster and for more. Address issues before listing and build buyer confidence with a pre-inspection report.",
    href: "/services/pre-listing/",
    features: [
      "Identify issues before buyers do",
      "Reduce negotiation surprises",
      "Faster closing times",
      "Shareable report for buyers",
    ],
    price: "From $349",
  },
  {
    icon: Hammer,
    title: "New Construction Inspection",
    description: "Don't assume new means perfect. We catch builder defects and incomplete work before your final walkthrough.",
    href: "/services/new-construction/",
    features: [
      "Pre-delivery inspection",
      "Tarion warranty support",
      "Builder defect identification",
      "Detailed punch list",
    ],
    price: "From $449",
  },
  {
    icon: Building,
    title: "Condo Inspection",
    description: "Specialized inspections for condos, townhomes, and stacked townhouses. Know exactly what you're buying.",
    href: "/services/condo/",
    features: [
      "Unit-specific inspection",
      "HVAC and plumbing review",
      "Electrical system check",
      "Window and balcony assessment",
    ],
    price: "From $299",
  },
  {
    icon: Factory,
    title: "Commercial Inspection",
    description: "Protect your business investment with comprehensive commercial property assessments for all property types.",
    href: "/services/commercial/",
    features: [
      "Multi-unit buildings",
      "Retail and office spaces",
      "Industrial properties",
      "Investment analysis",
    ],
    price: "Custom Quote",
  },
];

const specialtyServices = [
  {
    icon: Thermometer,
    title: "Radon Testing",
    description: "Radon is the #1 cause of lung cancer in non-smokers. We test for this invisible, odorless gas to protect your family.",
    href: "/services/radon-testing/",
    duration: "48-96 hours",
    price: "From $149",
  },
  {
    icon: Search,
    title: "Mold Inspection",
    description: "Identify hidden mold growth and moisture issues. Air sampling and visual inspection for comprehensive assessment.",
    href: "/services/mold-inspection/",
    duration: "2-3 hours",
    price: "From $299",
  },
  {
    icon: Flame,
    title: "Thermal Imaging",
    description: "See beyond walls. Infrared technology reveals hidden moisture, insulation gaps, and electrical hot spots.",
    href: "/services/thermal-imaging/",
    duration: "Included with inspection",
    price: "From $99",
  },
  {
    icon: Flame,
    title: "WETT Inspection",
    description: "Safety certification for wood stoves, fireplaces, and chimneys. Required for insurance and peace of mind.",
    href: "/services/wett/",
    duration: "1-2 hours",
    price: "From $199",
  },
  {
    icon: Wind,
    title: "Air Quality Testing",
    description: "Comprehensive indoor air quality assessment including VOCs, allergens, and particulate matter.",
    href: "/services/air-quality/",
    duration: "2-4 hours",
    price: "From $249",
  },
  {
    icon: Search,
    title: "Asbestos Testing",
    description: "Safe identification and lab testing for asbestos in older homes. Protect your family from harmful fibers.",
    href: "/services/asbestos-testing/",
    duration: "Lab results 3-5 days",
    price: "From $99/sample",
  },
  {
    icon: Search,
    title: "Lead Paint Testing",
    description: "Essential for pre-1978 homes. Identify lead paint hazards to protect children and families.",
    href: "/services/lead-paint-testing/",
    duration: "Lab results 5-7 days",
    price: "From $79/sample",
  },
  {
    icon: Search,
    title: "Well Water Testing",
    description: "Comprehensive water quality analysis for rural properties. Ensure safe drinking water for your family.",
    href: "/services/well-water-testing/",
    duration: "Lab results 5-7 days",
    price: "From $199",
  },
  {
    icon: Search,
    title: "Sewer Scope Inspection",
    description: "Camera inspection of sewer lines to identify blockages, root intrusion, and damage before costly repairs.",
    href: "/services/sewer-scope/",
    duration: "30-60 minutes",
    price: "From $199",
  },
];

const processSteps = [
  {
    icon: Clock,
    title: "1. Book Online",
    description: "Select your service, choose a convenient time, and provide property details.",
  },
  {
    icon: Search,
    title: "2. Inspection Day",
    description: "Our certified inspector thoroughly examines your property (2-4 hours).",
  },
  {
    icon: FileText,
    title: "3. Detailed Report",
    description: "Receive your comprehensive report with photos within 24 hours.",
  },
  {
    icon: Shield,
    title: "4. Expert Support",
    description: "We're available to answer questions and explain findings.",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Inspection Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive home inspection services for buyers, sellers, and property investors. 
              Certified inspectors, detailed reports, and peace of mind guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/booking/">Book an Inspection</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pricing/">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Home Inspection Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Our core inspection services cover everything you need to make informed property decisions.
            </p>
          </div>

          <div className="space-y-8">
            {mainServices.map((service, index) => (
              <Card 
                key={service.title}
                className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Service Info */}
                  <div className="md:col-span-2 p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {service.description}
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                              <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button asChild>
                          <Link to={service.href}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Price Panel */}
                  <div className="bg-muted/50 p-6 md:p-8 flex flex-col justify-center items-center text-center border-t md:border-t-0 md:border-l border-border/50">
                    <p className="text-sm text-muted-foreground mb-2">Starting at</p>
                    <p className="font-heading text-3xl font-bold text-primary mb-4">
                      {service.price}
                    </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/booking/">Book Now</Link>
                      </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Services */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Specialty Testing Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Additional testing services to ensure your home is safe and healthy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialtyServices.map((service, index) => (
              <Card 
                key={service.title}
                className="border-border/50 hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-muted-foreground">Duration: {service.duration}</span>
                    <span className="font-semibold text-primary">{service.price}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              From booking to report, we make the inspection process simple and stress-free.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={step.title}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Service Areas
            </h2>
            <p className="text-lg text-muted-foreground">
              We provide professional home inspection services throughout the Greater Toronto Area and beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Toronto", slug: "toronto" },
              { name: "Brampton", slug: "brampton" },
              { name: "Mississauga", slug: "mississauga" },
              { name: "Markham", slug: "markham" },
              { name: "Vaughan", slug: "vaughan" },
              { name: "Scarborough", slug: "scarborough" },
              { name: "North York", slug: "north-york" },
              { name: "Etobicoke", slug: "etobicoke" },
              { name: "Ajax", slug: "ajax" },
              { name: "Pickering", slug: "pickering" },
              { name: "Whitby", slug: "whitby" },
              { name: "Oshawa", slug: "oshawa" },
              { name: "Barrie", slug: "barrie" },
              { name: "Hamilton", slug: "hamilton" },
              { name: "Oakville", slug: "oakville" },
              { name: "Burlington", slug: "burlington" },
              { name: "Waterloo", slug: "waterloo" },
              { name: "Kitchener", slug: "kitchener" },
              { name: "Guelph", slug: "guelph" },
              { name: "Cambridge", slug: "cambridge" },
              { name: "St. Catharines", slug: "st-catharines" },
              { name: "Niagara Falls", slug: "niagara-falls" },
              { name: "Richmond Hill", slug: "richmond-hill" },
              { name: "Newmarket", slug: "newmarket" },
            ].map((location) => (
              <Link
                key={location.slug}
                to={`/locations/${location.slug}/`}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
              >
                {location.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/locations/">
                View All 80+ Locations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Pages Section */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/about/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <span className="text-border">•</span>
            <Link to="/pricing/" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <span className="text-border">•</span>
            <Link to="/faq/" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/testimonials/" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
            <span className="text-border">•</span>
            <Link to="/blog/" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <span className="text-border">•</span>
            <Link to="/contact/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Inspection?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Get the peace of mind you deserve. Book online or call us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/booking/">Book Online Now</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+16478019311">(647) 801-9311</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
