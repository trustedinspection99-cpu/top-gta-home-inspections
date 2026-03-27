import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { HeroBookingSection } from "@/components/HeroBookingSection";
import {
  CheckCircle,
  Phone,
  Clock,
  Zap,
  MapPin,
  Shield,
  FileText,
  Calendar,
  AlertTriangle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const metaTitle = "Same-Day Home Inspection Ontario | Book Today";
const metaDescription = "Need a home inspection today in Ontario? ASADS offers same-day home inspections across the GTA — certified inspectors, thermal imaging, digital report in hours. Call (647) 801-9311.";

const cities = [
  { name: "Toronto", slug: "home-inspection-toronto" },
  { name: "Mississauga", slug: "home-inspection-mississauga" },
  { name: "Brampton", slug: "home-inspection-brampton" },
  { name: "Vaughan", slug: "home-inspection-vaughan" },
  { name: "Markham", slug: "home-inspection-markham" },
  { name: "Richmond Hill", slug: "home-inspection-richmond-hill" },
  { name: "Oakville", slug: "home-inspection-oakville" },
  { name: "Burlington", slug: "home-inspection-burlington" },
  { name: "Hamilton", slug: "home-inspection-hamilton" },
  { name: "Kitchener", slug: "home-inspection-kitchener" },
  { name: "Waterloo", slug: "home-inspection-waterloo" },
  { name: "Cambridge", slug: "home-inspection-cambridge" },
  { name: "Barrie", slug: "home-inspection-barrie" },
  { name: "Oshawa", slug: "home-inspection-oshawa" },
  { name: "Ajax", slug: "home-inspection-ajax" },
  { name: "Whitby", slug: "home-inspection-whitby" },
  { name: "Pickering", slug: "home-inspection-pickering" },
  { name: "Newmarket", slug: "home-inspection-newmarket" },
  { name: "Aurora", slug: "home-inspection-aurora" },
  { name: "Milton", slug: "home-inspection-milton" },
];

const howItWorks = [
  {
    step: "1",
    title: "Call or Book Online",
    description: "Phone (647) 801-9311 or use our online booking form. Tell us your address, property type, and preferred time window — morning, afternoon, or evening.",
    icon: Phone,
  },
  {
    step: "2",
    title: "Confirm in Minutes",
    description: "We confirm your booking within 15 minutes. Our inspectors cover Toronto, Mississauga, Brampton, Hamilton, Kitchener, Barrie, and 100+ Ontario cities.",
    icon: Calendar,
  },
  {
    step: "3",
    title: "Inspection Day",
    description: "Your InterNACHI-certified inspector arrives on time with thermal imaging equipment. Inspection takes 2–4 hours depending on property size.",
    icon: Shield,
  },
  {
    step: "4",
    title: "Report Within Hours",
    description: "Your full digital report with photos, videos, and repair priorities lands in your inbox the same day — typically within 2 hours of inspection completion.",
    icon: FileText,
  },
];

const whenYouNeedSameDay = [
  {
    title: "Waiving Inspection Conditions",
    description: "In competitive offer situations where removing the inspection condition gives you an edge, a same-day inspection lets you know what you're buying before you waive.",
    icon: AlertTriangle,
  },
  {
    title: "Tight Condition Deadlines",
    description: "Most Ontario purchase agreements allow 5–7 days for the inspection condition. If you're at day 4 or 5 and haven't booked yet, same-day is your solution.",
    icon: Clock,
  },
  {
    title: "Pre-Listing Urgency",
    description: "Listing your home this week? A same-day pre-listing inspection lets you fix issues before buyers find them — sellers who disclose defects upfront get better offers.",
    icon: Zap,
  },
  {
    title: "Out-of-Town Buyers",
    description: "Flying or driving in to view properties over a weekend? We accommodate same-day and next-day bookings so your trip isn't wasted on waiting.",
    icon: MapPin,
  },
];

const faqs = [
  {
    question: "How quickly can you do a same-day home inspection in Ontario?",
    answer: "Call us before noon and we can typically get an inspector to your property the same afternoon or evening. We operate 7 days a week, 7am–10pm, across Toronto, the GTA, Hamilton, Kitchener-Waterloo, Barrie, and 100+ Ontario cities. Book online or call (647) 801-9311 for real-time availability."
  },
  {
    question: "Is a same-day home inspection as thorough as a scheduled one?",
    answer: "Yes — 100%. Our same-day inspections follow the identical InterNACHI Standards of Practice as all our inspections: 400+ checkpoints, thermal imaging available, foundation to roof. The only difference is the timeline. We never rush or cut corners to meet a same-day request."
  },
  {
    question: "How much does a same-day home inspection cost?",
    answer: "Same-day inspections are priced identically to our standard inspections: condos from $299, townhouses from $349, detached homes from $399 (up to $599+ for large properties). There is no rush surcharge. Thermal imaging, mold screening, and radon testing are available as add-ons."
  },
  {
    question: "How do I get my same-day inspection report?",
    answer: "Your digital report is delivered by email within 2 hours of the inspection completing — typically the same evening. The report includes photos of every deficiency, severity ratings, and a prioritized repair list you can use immediately in negotiations or seller disclosure."
  },
  {
    question: "Can I get a same-day inspection when waiving a home inspection condition?",
    answer: "Yes — this is one of the most common same-day scenarios we handle. Book first thing in the morning, complete the inspection that afternoon, review the report, then make your decision before your offer expiry. In hot markets where conditions are being waived, a same-day inspection is the smartest risk-management tool available to buyers."
  },
  {
    question: "What areas do you cover for same-day home inspections?",
    answer: "We cover 106 cities across Ontario including: Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Hamilton, Kitchener, Waterloo, Cambridge, Barrie, Oshawa, Ajax, Whitby, Pickering, Newmarket, Aurora, and more. If you're not sure we cover your area, call us — we likely do."
  },
  {
    question: "Do you offer same-day mold inspections or radon testing?",
    answer: "Yes for mold screenings (visual + swab testing). Radon testing requires a minimum 48-hour deployment period for accurate readings — this cannot be compressed into same-day. Asbestos testing (sample collection) can also be done same-day with lab results in 3–5 business days."
  },
  {
    question: "What if I need a same-day inspection on a weekend or holiday?",
    answer: "We operate 7 days a week including weekends and most holidays. Weekend same-day appointments book quickly, especially in spring and fall, so call us as early in the day as possible. Evenings (up to 10pm) are also available for late bookings."
  }
];

const relatedServices = [
  { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
  { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
  { title: "Condo Inspection", href: "/services/condo" },
  { title: "Mold Inspection", href: "/services/mold-inspection" },
];

export default function SameDayInspection() {
  const location = useLocation();
  const serviceUrl = getCanonicalUrl(location.pathname);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Same-Day Home Inspection",
    "name": "Same-Day Home Inspection Ontario",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ASADS Home Inspection",
      "telephone": "+16478019311",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "45 Duckworth Rd",
        "addressLocality": "Cambridge",
        "addressRegion": "ON",
        "postalCode": "N3H 0C1",
        "addressCountry": "CA"
      },
      "areaServed": {
        "@type": "State",
        "name": "Ontario"
      }
    },
    "description": "Same-day home inspection services across Ontario. InterNACHI-certified inspectors available 7 days a week. Digital report delivered within hours. No rush surcharge.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "priceRange": "$299-$599"
    },
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getCanonicalUrl("/")
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": getCanonicalUrl("/services")
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Same-Day Home Inspection",
        "item": serviceUrl
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={serviceUrl} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <HeroBookingSection
        title="Same-Day Home Inspection Ontario"
        subtitle="Call before noon — inspector arrives today. 7 days a week, 7am–10pm, 106 Ontario cities. Same-day digital report. No rush surcharge."
        badgeText="Available Today"
      />

      {/* Trust Strip */}
      <section className="py-6 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-700">
            {[
              { icon: Shield, text: "InterNACHI Certified" },
              { icon: Clock, text: "7 Days a Week, 7am–10pm" },
              { icon: Zap, text: "No Rush Surcharge" },
              { icon: FileText, text: "Report in 2 Hours" },
              { icon: Star, text: "4.9★ Google Rating" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-blue-600" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Intro */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Same-Day Home Inspections Across Ontario — No Waiting
          </h2>
          <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
            <p>
              Ontario's real estate market moves fast. Offer deadlines, waived conditions, pre-listing prep — buyers and sellers often need an inspection <strong>today</strong>, not next week. ASADS Home Inspection operates 7 days a week from 7am to 10pm across 106 Ontario cities so you're never stuck waiting for an available slot.
            </p>
            <p>
              Our same-day service carries zero additional cost. You pay the same rate as any booked inspection: condos from $299, townhouses from $349, detached homes from $399. An InterNACHI-certified inspector arrives with full equipment including thermal imaging camera, and your digital report lands in your inbox within 2 hours of the inspection finishing — typically the same evening.
            </p>
            <p>
              Whether you're buying, selling, or just need to understand what you own before making a major decision, our same-day availability means you don't have to delay. Call <strong>(647) 801-9311</strong> or book online — if you call before noon on most days we can confirm a same-afternoon or same-evening appointment.
            </p>
          </div>
        </section>

        {/* When You Need Same-Day */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            When You Need a Same-Day Home Inspection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whenYouNeedSameDay.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            How Same-Day Booking Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 w-fit mx-auto mb-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Same-Day Inspection Pricing — No Surcharge
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="text-left p-4 font-semibold">Property Type</th>
                  <th className="text-left p-4 font-semibold">Size</th>
                  <th className="text-left p-4 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  ["Condo / Apartment", "Any size", "$299"],
                  ["Townhouse", "Up to 2,000 sq ft", "$349"],
                  ["Detached — Small", "Up to 2,000 sq ft", "$399"],
                  ["Detached — Medium", "2,000–3,500 sq ft", "$449"],
                  ["Detached — Large", "3,500–5,000 sq ft", "$549"],
                  ["Luxury / Estate", "5,000+ sq ft", "$599+"],
                ].map(([type, size, price], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="p-4 font-medium text-slate-800">{type}</td>
                    <td className="p-4 text-slate-600">{size}</td>
                    <td className="p-4 font-bold text-blue-700">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-500 p-4 border-t border-slate-200">
              Thermal imaging included. Add-ons: Mold Screening $149 · Radon Testing $199 (48hr minimum) · Asbestos Sampling $249 · WETT $199
            </p>
          </div>
        </section>

        {/* What We Inspect */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What's Inspected — Same 400-Point Checklist, Same Day
          </h2>
          <p className="text-slate-600 mb-6">
            Same-day inspections are identical in scope to scheduled inspections. There's no abbreviated checklist, no skipped systems. Every inspection covers:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Roof, gutters & flashings",
              "Foundation & structural",
              "Electrical panel & wiring",
              "Plumbing & water heater",
              "Furnace, boiler & HVAC",
              "Air conditioning",
              "Attic insulation & ventilation",
              "Basement & crawl space",
              "Windows, doors & seals",
              "Exterior cladding & grading",
              "Thermal imaging scan",
              "Smoke & CO detectors",
              "Garage structure & opener",
              "Fireplace & chimney",
              "Kitchen & bathroom fixtures",
              "HRV / ERV systems",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Cities */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Same-Day Coverage — 106 Ontario Cities
          </h2>
          <p className="text-slate-600 mb-6">
            We cover the entire Greater Toronto Area, Hamilton-Niagara corridor, Kitchener-Waterloo region, Barrie and Georgian Bay, and communities throughout Central Ontario. Click your city for local availability and pricing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${city.slug}`}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                {city.name}
              </Link>
            ))}
            <Link
              to="/locations"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 italic"
            >
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              + 86 more cities →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 bg-blue-600 text-white rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Need an Inspection Today?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Call before noon for same-afternoon availability. Online booking also available — we'll confirm within 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+16478019311">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                <Phone className="h-5 w-5" />
                (647) 801-9311
              </Button>
            </a>
            <Link to="/booking">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2">
                <Calendar className="h-5 w-5" />
                Book Online Now
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Same-Day Inspection — Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Services */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium text-slate-700 transition-colors"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}
