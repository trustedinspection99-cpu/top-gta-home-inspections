import { useState } from "react";
import { CheckCircle2, Star, Phone, ArrowRight, Loader2 } from "lucide-react";

const INSPECTION_TYPES = [
  { label: "Pre-Purchase Home Inspection — From $399", value: "Pre-Purchase Home Inspection" },
  { label: "Pre-Listing Inspection — From $399", value: "Pre-Listing Inspection" },
  { label: "Condo Inspection — From $299", value: "Condo Inspection" },
  { label: "New Construction / PDI — From $449", value: "New Construction / PDI" },
  { label: "Mold Inspection & Testing — From $299", value: "Mold Inspection & Testing" },
  { label: "Radon Testing — From $149", value: "Radon Testing" },
  { label: "Thermal Imaging — From $199", value: "Thermal Imaging" },
  { label: "Sewer Scope — From $299", value: "Sewer Scope" },
  { label: "Asbestos Testing", value: "Asbestos Testing" },
  { label: "WETT Inspection", value: "WETT Inspection" },
  { label: "Air Quality Testing — From $299", value: "Air Quality Testing" },
  { label: "Well Water Testing — From $199", value: "Well Water Testing" },
  { label: "Lead Paint Testing", value: "Lead Paint Testing" },
  { label: "Commercial Inspection", value: "Commercial Inspection" },
  { label: "Other / Not Sure", value: "Other / Not Sure" },
];

interface HeroBookingSectionProps {
  /** Small badge text above the h1 */
  badge?: string;
  /** Main heading (h1) */
  title: string;
  /** Paragraph / subtitle below the heading */
  subtitle: React.ReactNode;
  /** Show 4.9★ social proof row (default true) */
  showStars?: boolean;
  /** Price callout chips below the subtitle */
  priceCards?: { label: string; price: string; href?: string }[];
  /** Primary CTA button (defaults to Book Your Inspection → /booking) */
  ctaPrimary?: { text: string; href: string };
  /** Pre-select a service in the booking form dropdown */
  defaultService?: string;
  /** Pre-fill city in the address field */
  city?: string;
  /** Title shown inside the form card header */
  formTitle?: string;
}

export function HeroBookingSection({
  badge = "OAHI Certified · Serving Ontario Since 2009",
  title,
  subtitle,
  showStars = true,
  priceCards,
  ctaPrimary = { text: "Book Your Inspection", href: "/booking" },
  defaultService = "",
  city,
  formTitle = "Get a Free Quote",
}: HeroBookingSectionProps) {
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
      const res = await fetch("https://formspree.io/f/mnjnzzoz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: form.service,
          name: form.name,
          phone: form.phone,
          city: form.city || "Not specified",
          preferred_date: form.preferred_date || "Flexible",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-800 to-blue-900 py-16 md:py-20 text-white overflow-hidden">
      {/* subtle grid texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ── LEFT: copy ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-700/40 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-blue-600/50 text-sm font-medium">
              {badge}
            </div>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              {title}
            </h1>

            {/* Stars */}
            {showStars && (
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-lg">4.9</span>
                <span className="text-blue-200 text-sm">· 1,500+ verified reviews · InterNACHI & OAHI</span>
              </div>
            )}

            {/* Subtitle */}
            <p className="text-lg mb-6 text-blue-100 leading-relaxed">{subtitle}</p>

            {/* Price cards */}
            {priceCards && priceCards.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-7">
                {priceCards.map((c) => {
                  const inner = (
                    <>
                      <span className="text-blue-200">{c.label} — </span>
                      <span className="font-bold text-green-300">{c.price}</span>
                    </>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm hover:bg-white/20 transition-colors">
                      {inner}
                    </a>
                  ) : (
                    <div key={c.label} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm">
                      {inner}
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={ctaPrimary.href}
                className="bg-white text-blue-700 px-7 py-4 rounded-lg font-bold text-base hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                {ctaPrimary.text}
                <ArrowRight className="group-hover:translate-x-1 transition-transform h-5 w-5" />
              </a>
              <a
                href="tel:6478019311"
                className="bg-transparent border-2 border-white px-7 py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                (647) 801-9311
              </a>
            </div>
          </div>

          {/* ── RIGHT: booking form card ── */}
          <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
            {/* Online indicator */}
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                Same-Day Availability
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">{formTitle}</h2>
            <p className="text-sm text-gray-500 mb-4">
              We respond within 30 minutes during business hours.
            </p>

            {status === "sent" ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="font-bold text-xl text-gray-900 mb-2">Quote Request Received!</p>
                <p className="text-gray-500 text-sm">We'll call you within 30 minutes to confirm your booking.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Inspection type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Inspection Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="" disabled>Select a service…</option>
                    {INSPECTION_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Name + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="(647) 555-0100"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* City + Preferred Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="Toronto"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-xs text-center">
                    Something went wrong. Call us at (647) 801-9311.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
                  ) : (
                    "Get a Free Quote →"
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  No payment required · We'll call to confirm within 30 minutes
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
