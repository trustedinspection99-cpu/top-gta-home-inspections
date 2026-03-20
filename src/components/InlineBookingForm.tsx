import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const INSPECTION_TYPES = [
  { label: "Pre-Purchase Inspection — from $399", value: "Pre-Purchase Inspection" },
  { label: "Pre-Listing Inspection — from $399", value: "Pre-Listing Inspection" },
  { label: "Condo Inspection — from $299", value: "Condo Inspection" },
  { label: "New Construction / PDI — from $449", value: "New Construction / PDI" },
  { label: "Thermal Imaging — from $199", value: "Thermal Imaging" },
  { label: "Mold Inspection — from $299", value: "Mold Inspection" },
  { label: "Asbestos Testing", value: "Asbestos Testing" },
  { label: "Radon Testing — from $149", value: "Radon Testing" },
  { label: "Sewer Scope — from $299", value: "Sewer Scope" },
  { label: "WETT Inspection", value: "WETT Inspection" },
  { label: "Air Quality Testing — from $299", value: "Air Quality Testing" },
  { label: "Well Water Testing — from $199", value: "Well Water Testing" },
  { label: "Lead Paint Testing", value: "Lead Paint Testing" },
  { label: "Commercial Inspection", value: "Commercial Inspection" },
];

interface InlineBookingFormProps {
  defaultService?: string;
  city?: string;
}

export function InlineBookingForm({ defaultService = "", city }: InlineBookingFormProps) {
  const [form, setForm] = useState({
    service: defaultService,
    address: city ? `, ${city}, ON` : "",
    name: "",
    phone: "",
    email: "",
    preferred_date: "",
    preferred_time: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.service || !form.name || !form.phone) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          address: form.address,
          preferred_date: form.preferred_date,
          preferred_time: form.preferred_time,
        }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
          <p className="font-bold text-lg text-foreground">Appointment Confirmed</p>
        </div>
        <div className="bg-muted rounded-xl border divide-y text-sm mb-4">
          {form.service && (
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-right max-w-[55%]">{form.service}</span>
            </div>
          )}
          {form.address && (
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Address</span>
              <span className="font-medium text-right max-w-[55%]">{form.address}</span>
            </div>
          )}
          {form.preferred_date && (
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{form.preferred_date}</span>
            </div>
          )}
          {form.preferred_time && (
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium">{form.preferred_time}</span>
            </div>
          )}
          {form.email && (
            <div className="flex justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Confirmation</span>
              <span className="font-medium text-right max-w-[55%]">{form.email}</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-xs text-center">Should any scheduling changes be required, we will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Inspection Type <span className="text-red-500">*</span>
        </label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>Select inspection…</option>
          {INSPECTION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Property Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          placeholder="123 Main St, Toronto, ON"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Preferred Date</label>
          <input
            type="date"
            name="preferred_date"
            value={form.preferred_date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Preferred Time</label>
          <select
            name="preferred_time"
            value={form.preferred_time}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Any time</option>
            <option>8:00 AM</option>
            <option>9:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>1:00 PM</option>
            <option>2:00 PM</option>
            <option>3:00 PM</option>
            <option>4:00 PM</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Smith"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="(647) 555-0100"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Email <span className="text-red-500">*</span> <span className="font-normal text-muted-foreground">(confirmation sent here)</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-500">Something went wrong. Call (647) 801-9311 to book.</p>
      )}

      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting…</>
        ) : (
          "Book My Inspection"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Appointment confirmed · We'll only reach out if a scheduling change is required
      </p>
    </form>
  );
}
