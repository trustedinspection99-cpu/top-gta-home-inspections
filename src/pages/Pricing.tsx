import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mainInspections = [
  {
    title: "Pre-Purchase Inspection",
    description: "Complete home evaluation before buying",
    prices: [
      { size: "Condo/Apartment", price: "$349" },
      { size: "Up to 1,500 sq ft", price: "$399" },
      { size: "1,500 - 2,500 sq ft", price: "$449" },
      { size: "2,500 - 3,500 sq ft", price: "$499" },
      { size: "3,500+ sq ft", price: "$549+" },
    ],
    features: [
      "Visual inspection of all accessible areas",
      "Roof, attic, and insulation assessment",
      "Foundation and structural evaluation",
      "Electrical and plumbing systems check",
      "HVAC system inspection",
      "Same-day digital report with photos",
      "90-day warranty coverage",
    ],
    href: "/services/pre-purchase",
    popular: true,
  },
  {
    title: "Pre-Listing Inspection",
    description: "Sell your home with confidence",
    prices: [
      { size: "Condo/Apartment", price: "$299" },
      { size: "Up to 1,500 sq ft", price: "$349" },
      { size: "1,500 - 2,500 sq ft", price: "$399" },
      { size: "2,500 - 3,500 sq ft", price: "$449" },
      { size: "3,500+ sq ft", price: "$499+" },
    ],
    features: [
      "Identify issues before listing",
      "Avoid surprises during negotiations",
      "Comprehensive condition report",
      "Repair recommendations",
      "Increase buyer confidence",
      "Same-day report delivery",
    ],
    href: "/services/pre-listing",
  },
  {
    title: "New Construction Inspection",
    description: "Verify builder quality before closing",
    prices: [
      { size: "Single inspection", price: "$399" },
      { size: "Pre-drywall + Final", price: "$699" },
      { size: "3-phase package", price: "$999" },
    ],
    features: [
      "Foundation and framing check",
      "Pre-drywall inspection available",
      "Final walkthrough inspection",
      "Builder deficiency documentation",
      "Tarion warranty compliance",
      "Detailed photo documentation",
    ],
    href: "/services/new-construction",
  },
  {
    title: "Condo Inspection",
    description: "Specialized condo unit evaluations",
    prices: [
      { size: "Studio/1 Bedroom", price: "$299" },
      { size: "2 Bedroom", price: "$349" },
      { size: "3+ Bedroom", price: "$399" },
      { size: "Townhouse Condo", price: "$449" },
    ],
    features: [
      "Interior systems inspection",
      "Appliance functionality check",
      "Balcony/terrace assessment",
      "Common area observations",
      "Status certificate review tips",
      "Same-day report",
    ],
    href: "/services/condo",
  },
  {
    title: "Commercial Inspection",
    description: "Business property assessments",
    prices: [
      { size: "Up to 5,000 sq ft", price: "$599" },
      { size: "5,000 - 10,000 sq ft", price: "$899" },
      { size: "10,000+ sq ft", price: "Custom Quote" },
    ],
    features: [
      "Building envelope assessment",
      "Commercial HVAC evaluation",
      "Electrical systems review",
      "Life safety systems check",
      "ADA compliance observations",
      "Detailed commercial report",
    ],
    href: "/services/commercial",
  },
];

const specialtyServices = [
  {
    title: "Radon Testing",
    price: "$149",
    duration: "48-hour test",
    description: "Detect harmful radon gas in your home",
    href: "/services/radon-testing",
  },
  {
    title: "Mold Inspection",
    price: "$299+",
    duration: "Visual + air sampling",
    description: "Identify mold issues and moisture sources",
    href: "/services/mold-inspection",
  },
  {
    title: "Asbestos Testing",
    price: "$99/sample",
    duration: "Lab results in 3-5 days",
    description: "Safe identification of asbestos materials",
    href: "/services/asbestos-testing",
  },
  {
    title: "WETT Inspection",
    price: "$249",
    duration: "Wood-burning appliances",
    description: "Fireplace and wood stove safety inspection",
    href: "/services/wett",
  },
  {
    title: "Thermal Imaging",
    price: "$149",
    duration: "Add-on service",
    description: "Infrared scan for hidden issues",
    href: "/services/thermal-imaging",
  },
  {
    title: "Lead Paint Testing",
    price: "$79/sample",
    duration: "Lab results in 5-7 days",
    description: "Protect your family from lead hazards",
    href: "/services/lead-paint-testing",
  },
  {
    title: "Well Water Testing",
    price: "$199",
    duration: "Comprehensive panel",
    description: "Ensure safe drinking water quality",
    href: "/services/well-water-testing",
  },
  {
    title: "Sewer Scope",
    price: "$199",
    duration: "Video inspection",
    description: "Camera inspection of sewer lines",
    href: "/services/sewer-scope",
  },
  {
    title: "Air Quality Testing",
    price: "$249+",
    duration: "Indoor air analysis",
    description: "Test for VOCs, allergens, and pollutants",
    href: "/services/air-quality",
  },
];

const addOns = [
  { title: "Thermal Imaging Scan", price: "$149", description: "Add to any inspection" },
  { title: "Pool & Spa Inspection", price: "$149", description: "Equipment and safety check" },
  { title: "Detached Structure", price: "$99+", description: "Garage, shed, workshop" },
  { title: "Wood-Destroying Insects", price: "$99", description: "Termite and pest inspection" },
  { title: "Septic System Inspection", price: "$249", description: "Tank and drain field check" },
  { title: "Rush Report (2-hour)", price: "$99", description: "Priority report delivery" },
];

export default function Pricing() {
  // Pricing Page Schema - PriceSpecification
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.asads.ca/pricing#service",
    "name": "Home Inspection Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection",
      "telephone": "+1-647-801-9311"
    },
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Inspection Pricing",
      "itemListElement": mainInspections.map((inspection, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": inspection.title,
          "description": inspection.description
        },
        "priceSpecification": inspection.prices.map(p => ({
          "@type": "UnitPriceSpecification",
          "name": p.size,
          "price": p.price.replace(/[^0-9]/g, ''),
          "priceCurrency": "CAD"
        }))
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.asads.ca" },
      { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://www.asads.ca/pricing" }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Home Inspection Cost Ontario | Clear Rates & Packages</title>
        <meta 
          name="description" 
          content="Transparent home inspection pricing in Ontario. No hidden fees. View our packages for houses, condos, and multi-unit properties."
        />
        <link rel="canonical" href="https://www.asads.ca/pricing" />
        <script type="application/ld+json">{JSON.stringify(pricingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Home Inspection Cost in Ontario
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              No hidden fees. Get a detailed quote instantly based on your property size. 
              All inspections include same-day digital reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/booking">
                  Book Your Inspection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+16478019311">
                  <Phone className="mr-2 h-5 w-5" />
                  (647) 801-9311
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Inspection Packages */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Clear Rates & Packages
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive inspections for every type of property. Prices vary by property size and complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainInspections.map((inspection) => (
              <Card 
                key={inspection.title} 
                className={`relative ${inspection.popular ? 'border-primary shadow-lg' : ''}`}
              >
                {inspection.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-heading">{inspection.title}</CardTitle>
                  <CardDescription>{inspection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {inspection.prices.map((price) => (
                      <div key={price.size} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{price.size}</span>
                        <span className="font-semibold">{price.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-6 space-y-3">
                    {inspection.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-6">
                    <Link to={inspection.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Testing Services */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Specialty Testing & Add-Ons
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Add-on services or standalone testing for specific concerns. Protect your family's health and safety.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialtyServices.map((service) => (
              <Card key={service.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <span className="text-xl font-bold text-primary">{service.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to={service.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Additional Add-On Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your inspection with these optional add-on services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {addOns.map((addon) => (
                <div 
                  key={addon.title} 
                  className="flex justify-between items-center p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{addon.title}</h3>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                  <span className="text-lg font-bold text-primary whitespace-nowrap ml-4">
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-background border-t border-border/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services/" className="text-muted-foreground hover:text-primary transition-colors">All Services</Link>
            <span className="text-border">•</span>
            <Link to="/faq/" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/locations/" className="text-muted-foreground hover:text-primary transition-colors">Service Areas</Link>
            <span className="text-border">•</span>
            <Link to="/testimonials/" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
            <span className="text-border">•</span>
            <Link to="/about/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <span className="text-border">•</span>
            <Link to="/contact/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Book Your Inspection?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Get a custom quote based on your property. Same-day reports available.
              Flexible scheduling to meet your closing deadlines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/booking/">
                  Book Online Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+16478019311">
                  <Phone className="mr-2 h-5 w-5" />
                  (647) 801-9311
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
