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
      const response = await fetch('https://formspree.io/f/mnjnzzoz', {
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
          "opens": "07:00",
          "closes": "22:00"
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

      {/* Hero — info only, no form */}
      <section className="relative py-14 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=70&auto=format&fit=crop" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/93 to-blue-800/90" />
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-700/40 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-blue-600/50 text-sm font-medium">
            Fast Scheduling · 7 Days a Week · 106 Cities in Ontario
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Contact ASADS Home Inspectors in Ontario
          </h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            Ready to book or have a question? Call us directly for the fastest response, or send a message below.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+16478019311"
              className="bg-white text-blue-700 px-7 py-4 rounded-lg font-bold text-base hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              (647) 801-9311
            </a>
            <a
              href="/booking"
              className="bg-transparent border-2 border-white px-7 py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Book Online
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left: Contact info + Book CTA */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Get in Touch
              </h2>

              {/* Phone — primary action */}
              <a
                href="tel:+16478019311"
                className="flex items-center gap-4 bg-primary rounded-2xl p-5 text-primary-foreground hover:opacity-90 transition-opacity group"
              >
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-0.5">Fastest response</p>
                  <p className="font-extrabold text-xl">(647) 801-9311</p>
                  <p className="text-sm opacity-75">Call or text · 7am – 10pm, 7 days</p>
                </div>
              </a>

              {/* Contact info cards */}
              {[
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
                  secondary: "7am – 10pm",
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

              {/* Book Online — secondary CTA */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-green-300 uppercase tracking-wide">Same-Day Availability</span>
                </div>
                <h3 className="font-bold text-base mb-1">Prefer to Book Online?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Pick your service, date, and address — confirmed instantly.
                </p>
                <a
                  href="/booking"
                  className="flex items-center justify-center gap-2 w-full bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  Open Full Booking Form
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
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
                        <Label htmlFor="message">Message (optional)</Label>
                        <Textarea id="message" name="message" placeholder="Tell us about your inspection needs..." rows={4} />
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
