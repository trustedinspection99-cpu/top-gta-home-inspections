import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, ChevronRight, Zap, Clock, Calendar, AlertTriangle, MapPin, FileText } from "lucide-react";

const metaTitle = "Urgent Home Inspection Ontario | Same-Day & Next-Day Booking";
const metaDescription = "Need a home inspection fast in Ontario? ASADS offers same-day and next-day inspection appointments across the GTA. Condition expiring soon? Call (647) 801-9311 now.";

const cities = [
  "Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Richmond Hill",
  "Oakville", "Burlington", "Hamilton", "Kitchener", "Waterloo", "Cambridge",
  "Guelph", "Barrie", "Oshawa", "Ajax", "Whitby", "Pickering", "Newmarket", "Milton",
];

export default function UrgentInspection() {
  const location = useLocation();
  const canonical = getCanonicalUrl(SITE_URL, location.pathname);

  return (
    <Layout>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Urgent Same-Day Home Inspection Ontario",
          "provider": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" },
          "description": metaDescription,
          "areaServed": "Ontario, Canada",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://www.asads.ca/booking",
            "availableLanguage": "English"
          }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-red-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Urgent Home Inspection</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Zap className="w-10 h-10 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Need a Home Inspection Fast? We Book Same-Day and Next-Day.</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                Condition expiring in 48 hours. Offer deadline tomorrow. Pre-offer inspection before noon. Whatever your timeline, ASADS moves fast — without cutting corners on what we check.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:+16478019311" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors text-lg">
              <Phone className="w-5 h-5" /> Call Now: (647) 801-9311
            </a>
            <Link to="/booking" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
              Book Online
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-3">Phones answered 7 days a week · Same-day confirmation</p>
        </div>
      </section>

      {/* How fast */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">How Fast Can We Book?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Same-Day",
                detail: "Call before 10 AM and we'll schedule for the same afternoon in most GTA cities. Subject to availability.",
                color: "text-red-500",
                bg: "bg-red-50 border-red-200",
              },
              {
                icon: Clock,
                title: "Next-Day",
                detail: "Book anytime today for a morning or afternoon slot tomorrow. Available 7 days a week including weekends.",
                color: "text-orange-500",
                bg: "bg-orange-50 border-orange-200",
              },
              {
                icon: Calendar,
                title: "Scheduled",
                detail: "Need a specific date within the week? Book online and pick your preferred window — morning, afternoon, or evening.",
                color: "text-blue-500",
                bg: "bg-blue-50 border-blue-200",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`border rounded-xl p-6 ${item.bg}`}>
                  <Icon className={`w-8 h-8 ${item.color} mb-3`} />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Report timing */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Report Delivered the Same Day as the Inspection</h2>
          <p className="text-slate-500 mb-8">Your written report — with photos, thermal imaging, and findings categorized by severity — is emailed within 4–6 hours of the inspection completing. Always before a standard condition deadline.</p>
          <div className="bg-white border rounded-xl p-6">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">2.5–4 hrs</div>
                <p className="text-sm text-slate-500">Time on site (standard detached)</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">4–6 hrs</div>
                <p className="text-sm text-slate-500">Report delivery after inspection</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">Same day</div>
                <p className="text-sm text-slate-500">Total turnaround from inspection to report in hand</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common urgent scenarios */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios Where Buyers Need a Fast Inspection</h2>
          <div className="space-y-4">
            {[
              {
                scenario: "Condition period is expiring in 2–3 days",
                detail: "The most common urgent situation. Call immediately — we confirm within 15 minutes and can often book for the following morning. Report arrives the same day as the inspection, leaving you time to review and decide.",
              },
              {
                scenario: "Pre-offer inspection before an offer deadline",
                detail: "Inspect before you offer to waive the inspection condition. This is the right move in competitive markets — you go in fully informed, with an unconditional offer backed by real knowledge. Book for the day before your offer deadline.",
              },
              {
                scenario: "Seller accepted your offer and the clock started today",
                detail: "Condition periods in Ontario typically run 3–5 business days. Book the inspection for day 1 or 2 — not day 4. This leaves time to get contractor quotes if something significant is found before deciding to proceed.",
              },
              {
                scenario: "Received an inspection report and want a second opinion fast",
                detail: "Not satisfied with a previous inspector's report? We can re-inspect quickly. We work independently and don't anchor to another inspector's findings.",
              },
              {
                scenario: "Investor acquiring multiple properties on a tight timeline",
                detail: "Coordinate multiple inspections across multiple addresses. Call to discuss — we can schedule across consecutive days and have reports ready for each.",
              },
            ].map((item, i) => (
              <div key={i} className="border rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">{item.scenario}</p>
                    <p className="text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's NOT cut */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Fast Booking Doesn't Mean a Faster Inspection</h2>
          <p className="text-slate-300 mb-6">We move quickly on scheduling. The inspection itself takes exactly as long as it needs to. We do not rush the on-site assessment to accommodate urgency — that would defeat the purpose.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Full 2.5–4 hours on site for a standard detached home",
              "Thermal imaging scan included — every inspection",
              "Attic inspection, crawl space access where available",
              "All plumbing fixtures, electrical panel, HVAC fully assessed",
              "Every finding photographed and documented",
              "Report narrative written — not a checkbox form",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Ontario Cities We Cover for Urgent Inspections</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {cities.map(city => (
              <Link key={city} to={`/locations/home-inspection-${city.toLowerCase().replace(/ /g, '-')}`}
                className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors">
                {city}
              </Link>
            ))}
            <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-500">+ 80 more Ontario cities</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Zap className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-3">Don't Wait — Book Now</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Condition expiring soon or offer deadline approaching? Call directly for the fastest response. We confirm within 15 minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+16478019311" className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-5 h-5" /> (647) 801-9311
            </a>
            <Link to="/booking" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="w-4 h-4" /> Book Online
            </Link>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also: <Link to="/sample-report" className="underline hover:text-white">Sample report</Link> · <Link to="/our-promise" className="underline hover:text-white">Our independence promise</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
