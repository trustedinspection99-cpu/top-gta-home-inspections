import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle, Phone, Clock, Shield, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const inspectionTypes = [
  { value: "pre-purchase", label: "Pre-Purchase Home Inspection", price: "$399+" },
  { value: "pre-listing", label: "Pre-Listing Inspection", price: "$349+" },
  { value: "new-construction", label: "New Construction Inspection", price: "$449+" },
  { value: "condo", label: "Condo Inspection", price: "$299+" },
  { value: "commercial", label: "Commercial Inspection", price: "Custom" },
  { value: "radon", label: "Radon Testing", price: "$499+" },
  { value: "mold", label: "Mold Inspection", price: "$299+" },
  { value: "wett", label: "WETT Inspection", price: "$249+" },
  { value: "thermal", label: "Thermal Imaging (Standalone)", price: "Quoted" },
  { value: "asbestos", label: "Asbestos Testing", price: "$299+" },
  { value: "lead-paint", label: "Lead Paint Testing", price: "$349+" },
  { value: "air-quality", label: "Air Quality Testing", price: "$249+" },
  { value: "well-water", label: "Well Water Testing", price: "$199+" },
  { value: "contractor-oversight", label: "Forensic Renovation Inspection", price: "$249+/visit" },
];

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const propertyTypes = [
  "Detached House", "Semi-Detached", "Townhouse", "Condo Apartment",
  "Condo Townhouse", "Commercial", "Multi-Unit Residential"
];

export default function Booking() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    inspectionType: "",
    timeSlot: "",
    propertyType: "",
    squareFootage: "",
    propertyAge: "",
    address: "",
    city: "",
    postalCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inspectionLabel = inspectionTypes.find(t => t.value === formData.inspectionType)?.label || formData.inspectionType;

    try {
      const response = await fetch("https://formspree.io/f/mnjnzzoz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: inspectionLabel,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          email: formData.email || "Not provided",
          city: formData.city || "Not specified",
          address: formData.address || "Not provided",
          property_type: formData.propertyType || "Not specified",
          preferred_date: date ? format(date, "PPP") : "Flexible",
          preferred_time: formData.timeSlot || "Any time",
          notes: formData.notes || "",
        }),
      });

      if (response.ok) {
        toast({
          title: "Appointment Confirmed!",
          description: "Should any scheduling changes be required, we will contact you within 24 hours.",
        });
        setStep(4);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.inspectionType && date && formData.timeSlot;
    if (step === 2) return formData.propertyType && formData.address && formData.city;
    if (step === 3) return formData.firstName && formData.lastName && formData.email && formData.phone;
    return true;
  };

  // Booking Page Schema - ReservationAction
  const bookingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Book a Home Inspection Online",
    "description": "Schedule your Ontario home inspection in minutes with ASADS.",
    "url": "https://www.asads.ca/booking",
    "mainEntity": {
      "@type": "Service",
      "name": "Home Inspection Booking",
      "provider": {
        "@type": "LocalBusiness",
        "name": "ASADS Home Inspection",
        "telephone": "+16478019311"
      },
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.asads.ca/booking",
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        },
        "result": {
          "@type": "Reservation",
          "name": "Home Inspection Appointment"
        }
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.asads.ca" },
      { "@type": "ListItem", "position": 2, "name": "Book Inspection", "item": "https://www.asads.ca/booking" }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Book a Home Inspection Toronto &amp; Ontario | ASADS</title>
        <meta name="description" content="Book a certified home inspection in Toronto — same-day available. Pre-purchase, condo, mold, radon & more. OAHI certified. Call (647) 801-9311." />
        <link rel="canonical" href="https://www.asads.ca/booking" />
        <meta property="og:title" content="Book a Home Inspection Online in Ontario | ASADS" />
        <meta property="og:description" content="Book your certified Ontario home inspection in minutes. Same-day appointments available. Pre-purchase, condo, radon, mold & more. Call (647) 801-9311." />
        <meta property="og:url" content="https://www.asads.ca/booking" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.asads.ca/images/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book a Home Inspection Online in Ontario | ASADS" />
        <meta name="twitter:description" content="Fast scheduling for certified home inspections across Ontario. Same-day available. Call (647) 801-9311 or book online." />
        <meta name="twitter:image" content="https://www.asads.ca/images/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(bookingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="relative py-16 md:py-24 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=70&auto=format&fit=crop" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/93 to-blue-800/90" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Schedule a Home Inspection in Ontario
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Pick your own date and time below — or call us directly for same-day booking.
            </p>
            {/* Two booking options */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <a
                href="tel:+16478019311"
                className="flex items-center justify-center gap-3 bg-white text-primary font-semibold px-6 py-4 rounded-xl shadow hover:bg-white/90 transition-colors"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-primary/60 font-normal">Call us now</div>
                  <div>(647) 801-9311</div>
                </div>
              </a>
              <div className="flex items-center justify-center gap-3 bg-primary-foreground/20 border border-primary-foreground/30 font-semibold px-6 py-4 rounded-xl">
                <CalendarIcon className="h-5 w-5 shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-primary-foreground/60 font-normal">Book online below</div>
                  <div>Pick your date & time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {["Service & Date", "Property Details", "Contact Info", "Confirmation"].map((label, idx) => (
              <div key={label} className="flex-1 text-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-semibold",
                  step > idx + 1 ? "bg-accent text-accent-foreground" :
                  step === idx + 1 ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {step > idx + 1 ? <CheckCircle className="h-5 w-5" /> : idx + 1}
                </div>
                <p className="text-sm text-muted-foreground hidden sm:block">{label}</p>
              </div>
            ))}
          </div>

          {step < 4 ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Select Service & Date"}
                  {step === 2 && "Property Details"}
                  {step === 3 && "Your Contact Information"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label>Inspection Type *</Label>
                        <Select value={formData.inspectionType} onValueChange={(v) => handleInputChange("inspectionType", v)}>
                          <SelectTrigger><SelectValue placeholder="Select inspection type" /></SelectTrigger>
                          <SelectContent>
                            {inspectionTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label} - {type.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Preferred Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className={cn("w-full justify-start text-left", !date && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} className="pointer-events-auto" />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label>Preferred Time *</Label>
                          <Select value={formData.timeSlot} onValueChange={(v) => handleInputChange("timeSlot", v)}>
                            <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                            <SelectContent>
                              {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Property Type *</Label>
                          <Select value={formData.propertyType} onValueChange={(v) => handleInputChange("propertyType", v)}>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>
                              {propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Approx. Square Footage</Label>
                          <Input placeholder="e.g., 2000" value={formData.squareFootage} onChange={(e) => handleInputChange("squareFootage", e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Property Address *</Label>
                        <Input placeholder="Street address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>City *</Label>
                          <Input placeholder="City" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Postal Code</Label>
                          <Input placeholder="Postal code" value={formData.postalCode} onChange={(e) => handleInputChange("postalCode", e.target.value)} />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>First Name *</Label>
                          <Input value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name *</Label>
                          <Input value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Email *</Label>
                          <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone *</Label>
                          <Input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Additional Notes</Label>
                        <Textarea placeholder="Any special instructions or questions?" value={formData.notes} onChange={(e) => handleInputChange("notes", e.target.value)} />
                      </div>
                    </>
                  )}

                  <div className="flex gap-4 pt-4">
                    {step > 1 && <Button type="button" variant="outline" onClick={() => setStep(s => s - 1)}>Back</Button>}
                    {step < 3 ? (
                      <Button type="button" onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="ml-auto">Continue</Button>
                    ) : (
                      <Button type="submit" disabled={!canProceed() || isSubmitting} className="ml-auto">
                        {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="py-10">
              <CardContent>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-10 w-10 text-accent" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold mb-2">Booking Request Received!</h2>
                  <p className="text-muted-foreground">Thank you, {formData.firstName}! Here's a summary of your booking:</p>
                </div>

                {/* Booking Summary */}
                <div className="bg-muted/50 rounded-xl p-6 max-w-md mx-auto mb-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{inspectionTypes.find(t => t.value === formData.inspectionType)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{date ? format(date, "PPP") : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{formData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address</span>
                    <span className="font-medium text-right">{formData.address}, {formData.city}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-muted-foreground">Confirmation sent to</span>
                    <span className="font-medium text-primary">{formData.email}</span>
                  </div>
                </div>

                {/* Next steps */}
                <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <Phone className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-primary">Confirmation Call</p>
                    <p className="text-xs text-muted-foreground mt-1">Your appointment is confirmed. Should any scheduling changes be required, we will contact you within 24 hours.</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <FileText className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-primary">Email Confirmation</p>
                    <p className="text-xs text-muted-foreground mt-1">Check your inbox for details</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button asChild><a href="tel:+16478019311"><Phone className="mr-2 h-4 w-4" />Call Us Now</a></Button>
                  <Button variant="outline" onClick={() => { setStep(1); setFormData({ inspectionType: "", timeSlot: "", propertyType: "", squareFootage: "", propertyAge: "", address: "", city: "", postalCode: "", firstName: "", lastName: "", email: "", phone: "", notes: "" }); setDate(undefined); }}>Book Another</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Phone, title: "Booking Confirmed", desc: "We'll reach out within 24 hours only if a scheduling change is required" },
              { icon: Clock, title: "Same-Day Booking", desc: "Appointments often available same day" },
              { icon: FileText, title: "24-Hour Reports", desc: "Digital report within 24 hours" },
              { icon: Shield, title: "Certified Inspectors", desc: "InterNACHI certified professionals" },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <item.icon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link>
              <span className="text-border">•</span>
              <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <span className="text-border">•</span>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <span className="text-border">•</span>
              <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">Service Areas</Link>
              <span className="text-border">•</span>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
