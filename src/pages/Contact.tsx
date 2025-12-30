import { useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
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
    secondary: "We reply within 24 hours",
    action: "mailto:info@asads.ca",
  },
  {
    icon: MapPin,
    title: "Service Area",
    primary: "Greater Toronto Area",
    secondary: "30+ communities served",
  },
  {
    icon: Clock,
    title: "Hours",
    primary: "Mon-Fri: 8am - 6pm",
    secondary: "Sat: 9am - 4pm",
  },
];

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions about our services? Ready to book an inspection? 
              We're here to help. Reach out today and we'll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.action ? (
                        <a 
                          href={item.action}
                          className="text-primary hover:underline"
                        >
                          {item.primary}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.primary}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{item.secondary}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Card */}
              <Card className="mt-8 bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Need an Inspection Fast?
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Call us now to check availability for same-day or next-day inspections.
                  </p>
                  <Button asChild variant="secondary" className="w-full">
                    <a href="tel:+1-6478019311">
                      <Phone className="mr-2 h-4 w-4" />
                      (416) 555-0123
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50">
                <CardContent className="p-6 md:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Your message has been sent. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                        Send Us a Message
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input 
                              id="firstName" 
                              placeholder="John" 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input 
                              id="lastName" 
                              placeholder="Smith" 
                              required 
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="john@example.com" 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              placeholder="(647) 801-9311" 
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service">Service Interested In</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map((service) => (
                                <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="propertyAddress">Property Address (Optional)</Label>
                          <Input 
                            id="propertyAddress" 
                            placeholder="123 Main St, Toronto, ON" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea 
                            id="message" 
                            placeholder="Tell us about your inspection needs..."
                            rows={5}
                            required
                          />
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                          By submitting this form, you agree to our{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Service Area
            </h2>
            <p className="text-lg text-muted-foreground">
              We provide home inspection services throughout the Greater Toronto Area, 
              from downtown Toronto to the surrounding suburbs.
            </p>
          </div>

          <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="font-heading text-2xl font-bold text-foreground mb-2">
                Greater Toronto Area
              </p>
              <p className="text-muted-foreground">
                Toronto • Mississauga • Brampton • Vaughan • Markham • Richmond Hill
                <br />
                Scarborough • North York • Etobicoke • Oakville • Burlington • Milton
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
