import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HeroBookingSection } from "@/components/HeroBookingSection";


const serviceOptions = [
  "Pre-Purchase Inspection",
  "Pre-Listing Inspection",
  "New Construction Inspection",
  "Condo Inspection",
  "Commercial Inspection",
  "Radon Testing",
  "Mold Inspection",
  "Thermal Imaging",
  "WETT Inspection",
  "Air Quality Testing",
  "Other / General Inquiry",
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: `${formData.get('firstName')} ${formData.get('lastName')}`,
          email: formData.get('email'),
          phone: formData.get('phone'),
          service: selectedService,
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ASADS Home Inspection",
    "description": "Contact ASADS for fast scheduling and expert home inspections across Ontario.",
    "url": "https://www.asads.ca/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection",
      "telephone": "+16478019311",
      "email": "info@asads.ca",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "45 Duckworth Rd",
        "addressLocality": "Cambridge",
        "addressRegion": "ON",
        "postalCode": "N3H 0C1",
        "addressCountry": "CA"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "08:00",
          "closes": "20:00"
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://www.asads.ca" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.asads.ca/contact" }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact ASADS | Book a Home Inspector in Ontario</title>
        <meta name="description" content="Ready to book? Contact ASADS Home Inspection for fast scheduling across Ontario. Certified inspectors available 7 days a week. Call (647) 801-9311." />
        <link rel="canonical" href="https://www.asads.ca/contact" />
        <meta property="og:title" content="Contact ASADS | Book a Home Inspector in Ontario" />
        <meta property="og:description" content="Ready to book? Contact ASADS Home Inspection for fast scheduling across Ontario. Certified inspectors available 7 days a week. Call (647) 801-9311." />
        <meta property="og:url" content="https://www.asads.ca/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact ASADS | Book a Home Inspector in Ontario" />
        <meta name="twitter:description" content="Fast scheduling for certified home inspections across Ontario. Call (647) 801-9311 or book online." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(contactPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HeroBookingSection
        badge="Fast Scheduling · 7 Days a Week · 106 Cities in Ontario"
        title="Contact ASADS Home Inspectors in Ontario"
        subtitle="Ready to book or have a question? Call, email, or send a message below. We respond within 24 hours and confirm bookings instantly."
        priceCards={[
          { label: "Pre-Purchase", price: "From $399", href: "/services/pre-purchase" },
          { label: "Condo",        price: "From $299", href: "/services/condo" },
          { label: "Available",    price: "7 Days/Week" },
          { label: "Same-Day",     price: "Digital Report" },
        ]}
        formTitle="Send Us a Message"
        ctaPrimary={{ text: "Book Online Now", href: "/booking" }}
        defaultService="Pre-Purchase Home Inspection"
      />

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left: Contact info + Book CTA */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Get in Touch
              </h2>

              {/* Book Now — primary CTA */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-green-300 uppercase tracking-wide">Same-Day Availability</span>
                </div>
                <h3 className="font-bold text-lg mb-1">Ready to Book?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Use our full booking form for fastest confirmation — pick your service, date, and property address.
                </p>
                <a
                  href="/booking"
                  className="flex items-center justify-center gap-2 w-full bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  Open Full Booking Form
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-center text-xs text-blue-200 mt-3">
                  or call <a href="tel:6478019311" className="font-semibold text-white">(647) 801-9311</a>
                </p>
              </div>

              {/* Contact info cards */}
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  primary: "(647) 801-9311",
                  secondary: "Call or text anytime",
                  action: "tel:+16478019311",
                },
                {
                  icon: Mail,
                  title: "Email",
                  primary: "info@asads.ca",
                  secondary: "Response within 24 hours",
                  action: "mailto:info@asads.ca",
                },
                {
                  icon: MapPin,
                  title: "Service Area",
                  primary: "GTA & Ontario",
                  secondary: "106 cities across Ontario",
                  action: null,
                },
                {
                  icon: Clock,
                  title: "Hours",
                  primary: "7 Days a Week",
                  secondary: "8am – 8pm",
                  action: null,
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    {item.action ? (
                      <a href={item.action} className="text-primary hover:underline text-sm">{item.primary}</a>
                    ) : (
                      <p className="text-foreground text-sm">{item.primary}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{item.secondary}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Contact form */}
            <div className="lg:col-span-2">
              <div className="border border-border/50 rounded-2xl p-6 md:p-8 bg-background">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">Send Another Message</Button>
                      <Button asChild>
                        <Link to="/booking">Book an Inspection <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6">
                      For fastest response, call <a href="tel:6478019311" className="text-primary font-semibold">(647) 801-9311</a> or use the <Link to="/booking" className="text-primary font-semibold">booking form</Link>.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" name="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" name="lastName" placeholder="Smith" required />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" type="tel" placeholder="(647) 000-0000" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="service">Service Interested In</Label>
                        <Select value={selectedService} onValueChange={setSelectedService}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((service) => (
                              <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="propertyAddress">Property Address (Optional)</Label>
                        <Input id="propertyAddress" name="propertyAddress" placeholder="123 Main St, Toronto, ON" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea id="message" name="message" placeholder="Tell us about your inspection needs..." rows={4} required />
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : <><Send className="mr-2 h-5 w-5" />Send Message</>}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our{" "}
                        <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              106 Cities Across Ontario
            </h2>
            <p className="text-muted-foreground">
              Mobile inspectors — we come to you, anywhere across the GTA and Ontario.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
            {[
              { name: "Toronto",       slug: "toronto" },
              { name: "Mississauga",   slug: "mississauga" },
              { name: "Brampton",      slug: "brampton" },
              { name: "Vaughan",       slug: "vaughan" },
              { name: "Markham",       slug: "markham" },
              { name: "Richmond Hill", slug: "richmond-hill" },
              { name: "Oakville",      slug: "oakville" },
              { name: "Burlington",    slug: "burlington" },
              { name: "Hamilton",      slug: "hamilton" },
              { name: "Barrie",        slug: "barrie" },
              { name: "Kitchener",     slug: "kitchener" },
              { name: "Oshawa",        slug: "oshawa" },
            ].map((loc) => (
              <Link
                key={loc.slug}
                to={`/locations/home-inspection-${loc.slug}`}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                {loc.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/locations" className="text-primary hover:underline text-sm font-medium">
              View all 106 service areas →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 bg-background border-t border-border/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services"  className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link>
            <span className="text-border">•</span>
            <Link to="/pricing"   className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <span className="text-border">•</span>
            <Link to="/faq"       className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/about"     className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <span className="text-border">•</span>
            <Link to="/booking"   className="text-muted-foreground hover:text-primary transition-colors">Book Online</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
