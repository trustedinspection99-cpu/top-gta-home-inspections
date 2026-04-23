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
  { label: "Radon Testing — From $499", value: "Radon Testing" },
  { label: "Sewer Scope — from $299", value: "Sewer Scope" },
  { label: "WETT Inspection", value: "WETT Inspection" },
  { label: "Air Quality Testing — from $299", value: "Air Quality Testing" },
  { label: "Well Water Testing — from $199", value: "Well Water Testing" },
  { label: "Lead Paint Testing", value: "Lead Paint Testing" },
  { label: "Commercial Inspection", value: "Commercial Inspection" },
  { label: "Forensic Renovation Inspection — from $249/visit", value: "Forensic Renovation Inspection" },
];

interface InlineBookingFormProps {
  defaultService?: string;
  city?: string;
}

export function InlineBookingForm({ defaultService = "", city }: InlineBookingFormProps) {
  const [form, setForm] = useState({
    service: defaultService,
    name: "",
    phone: "",
    city: city || "",
    preferred_date: "",
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
      const res = await fetch("https://wjxbojjhyocrxqkfnxmz.supabase.co/functions/v1/save-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGJvampoeW9jcnhxa2ZueG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTY3NzMsImV4cCI6MjA4OTc3Mjc3M30.-QlS8qmiGs5cqlUOZP5_iMGbBoPyeimXhLOU6lwO-fQ",
        },
        body: JSON.stringify({
          service: form.service,
          name: form.name,
          phone: form.phone,
          city: form.city || "",
          preferred_date: form.preferred_date || "Flexible",
        }),
      });
      if (res.ok) { setStatus("sent"); } else { setStatus("error"); }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-4 text-center">
        <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
        <p className="font-bold text-lg text-foreground mb-1">Quote Request Received!</p>
        <p className="text-muted-foreground text-sm">We'll call you within 30 minutes to confirm.</p>
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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="Toronto"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
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
        No payment required · We'll call within 30 minutes
      </p>
    </form>
  );
}
