import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
  { value: "radon", label: "Radon Testing", price: "$149+" },
  { value: "mold", label: "Mold Inspection", price: "$299+" },
  { value: "wett", label: "WETT Inspection", price: "$199+" },
  { value: "thermal", label: "Thermal Imaging", price: "$99+" },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Submitted!",
      description: "We'll contact you within 2 hours to confirm your appointment.",
    });
    setStep(4);
  };

  const canProceed = () => {
    if (step === 1) return formData.inspectionType && date && formData.timeSlot;
    if (step === 2) return formData.propertyType && formData.address && formData.city;
    if (step === 3) return formData.firstName && formData.lastName && formData.email && formData.phone;
    return true;
  };

  return (
    <Layout>
      <Helmet>
        <title>Book a Home Inspection | ASADS Inspections Toronto</title>
        <meta name="description" content="Book your home inspection online. Same-day appointments available. Serving Toronto & GTA." />
      </Helmet>

      <section className="py-16 md:py-24 hero-gradient text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Book Your Inspection
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Schedule your professional home inspection in minutes. Same-day appointments available.
            </p>
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
                      <Button type="submit" disabled={!canProceed()} className="ml-auto">Submit Booking Request</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-4">Booking Request Received!</h2>
                <p className="text-muted-foreground mb-8">We'll contact you within 2 hours to confirm your appointment.</p>
                <div className="flex justify-center gap-4">
                  <Button asChild><a href="tel:+14165550123"><Phone className="mr-2 h-4 w-4" />Call Now</a></Button>
                  <Button variant="outline" onClick={() => { setStep(1); setFormData({ inspectionType: "", timeSlot: "", propertyType: "", squareFootage: "", propertyAge: "", address: "", city: "", postalCode: "", firstName: "", lastName: "", email: "", phone: "", notes: "" }); setDate(undefined); }}>Book Another</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
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
        </div>
      </section>
    </Layout>
  );
}
