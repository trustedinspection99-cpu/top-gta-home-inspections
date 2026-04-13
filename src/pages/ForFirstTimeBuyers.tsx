import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import {
  CheckCircle, Phone, ChevronRight, BookOpen, MessageCircle,
  Eye, Clock, FileText, HelpCircle, Star, AlertTriangle
} from "lucide-react";

const metaTitle = "First-Time Home Buyer Inspection Ontario | ASADS";
const metaDescription = "First home in Ontario? ASADS walks first-time buyers through every step of the inspection — what we check, what findings mean, and what questions to ask. Book same-day in the GTA.";

const steps = [
  {
    number: "1",
    title: "Book as soon as your offer is accepted",
    detail: "Condition periods in Ontario typically run 3–5 business days. Book day 1 or 2 — not day 4. This leaves time to review the report, get follow-up quotes if needed, and make a real decision before the deadline.",
  },
  {
    number: "2",
    title: "Attend the inspection in person",
    detail: "This is not optional for first-time buyers. Walking through the home with the inspector while they assess is the fastest way to understand what you're buying. Ask every question you have — that's what we're there for.",
  },
  {
    number: "3",
    title: "The inspector checks every accessible component",
    detail: "Roof, attic, foundation, structure, electrical panel, plumbing, HVAC, insulation, windows, doors, and more. We use thermal imaging cameras on every inspection — no extra charge — which reveals moisture, heat loss, and hidden issues not visible to the eye.",
  },
  {
    number: "4",
    title: "All findings are explained on-site, then delivered in writing",
    detail: "Every deficiency is documented with photos, explained in plain language, and categorized by severity. Your report arrives within 4–6 hours of the inspection. You'll know exactly what's a deal-breaker, what needs work, and what can wait.",
  },
  {
    number: "5",
    title: "Call us after you read the report",
    detail: "Most first-time buyers have questions after reading the report. That's normal. Call us — we're available to walk through findings, explain repair urgency, and help you decide whether to proceed, negotiate, or walk away.",
  },
];

const whatWeMean = [
  {
    term: "Safety Hazard",
    meaning: "A condition that poses an immediate risk to occupants. Examples: live ungrounded wiring, carbon monoxide risk, structural failure. These are the most serious findings.",
    action: "Address before moving in or use to negotiate with the seller.",
  },
  {
    term: "Major Defect",
    meaning: "A significant deficiency that affects function or value but isn't immediately dangerous. Examples: failing roof, cracked heat exchanger, active water infiltration.",
    action: "Get contractor quotes before deciding whether to proceed.",
  },
  {
    term: "Maintenance Item",
    meaning: "Normal wear items that need attention in the short or medium term. Examples: caulking, worn weatherstripping, minor gutter issues.",
    action: "Plan for these in your first year of ownership. Not deal-breakers.",
  },
  {
    term: "Monitor",
    meaning: "A condition we observed but cannot fully assess — such as a crack that isn't currently active but should be watched. We explain what to look for and when to act.",
    action: "Note the location and recheck in 6–12 months.",
  },
];

const commonQuestions = [
  {
    q: "Should I walk away if the inspection finds problems?",
    a: "Almost every home has deficiencies — even new ones. The question is whether the problems are priced into the offer or whether they represent unexpected risk. Most inspection findings are negotiating points, not deal-breakers. We'll help you distinguish between the two.",
  },
  {
    q: "What if the seller or realtor says 'it's fine' about something in the report?",
    a: "Your inspector's written assessment is the objective record. If a seller or agent disputes a finding, ask for a licensed trade professional to inspect that specific item. Trust the written report.",
  },
  {
    q: "Can I use the inspection report to renegotiate the price?",
    a: "Yes. In Ontario, buyers with a home inspection condition can use findings to request repairs, a price reduction, or credits. A clear, detailed written report is your negotiating document.",
  },
  {
    q: "What's the difference between a home inspection and an appraisal?",
    a: "An appraisal tells you what the property is worth to a lender. A home inspection tells you the physical condition of the property. They serve completely different purposes — both are often required.",
  },
  {
    q: "Does the inspection include the condo building exterior and common areas?",
    a: "For condo inspections, we inspect everything inside your unit plus what's accessible — balcony, windows, in-suite HVAC, electrical panel, plumbing. The building exterior and common areas are managed by the condo corporation and covered by the status certificate review.",
  },
  {
    q: "How long does a home inspection take?",
    a: "For a standard detached house, 2.5–4 hours. Larger homes or those with add-on tests (radon, mold, asbestos) take longer. Condo inspections typically run 1.5–2.5 hours.",
  },
];

export default function ForFirstTimeBuyers() {
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
          "@type": "WebPage",
          "name": "First-Time Home Buyer Inspection Guide — Ontario",
          "description": metaDescription,
          "url": canonical,
          "publisher": { "@type": "LocalBusiness", "name": "ASADS Home Inspection", "telephone": "+16478019311" },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": commonQuestions.map(({ q, a }) => ({
              "@type": "Question",
              "name": q,
              "acceptedAnswer": { "@type": "Answer", "text": a }
            }))
          }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>For First-Time Buyers</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="w-10 h-10 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Your First Home Inspection in Ontario — What to Expect</h1>
              <p className="text-lg text-slate-300 max-w-2xl">
                First-time buyers ask a lot of questions. That's exactly what you should do. ASADS inspectors walk you through every finding on-site, in plain language — no jargon, no rushing you out the door. Here's what the whole process looks like.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:+16478019311" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-lg transition-colors">
              <Phone className="w-5 h-5" /> Call (647) 801-9311
            </a>
            <Link to="/booking" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
              Book Online
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-3">Same-day and next-day availability · You're welcome to attend and ask anything</p>
        </div>
      </section>

      {/* The 5 steps */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">The Inspection Process, Step by Step</h2>
          <p className="text-slate-500 mb-8">From offer accepted to report in hand — what happens, in order.</p>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-lg">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What findings mean */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">What the Findings in Your Report Actually Mean</h2>
          <p className="text-slate-500 mb-8">Every ASADS report categorizes findings so you know exactly what needs immediate attention and what can wait.</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {whatWeMean.map((item, i) => (
              <div key={i} className="bg-white border rounded-xl p-5">
                <p className="font-bold text-base mb-2">{item.term}</p>
                <p className="text-sm text-slate-600 mb-3">{item.meaning}</p>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 font-medium">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What first-time buyers get */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">What's Included on Every ASADS Inspection</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Eye, label: "Full visual inspection of all accessible areas — roof, attic, foundation, crawl space" },
              { icon: Eye, label: "Thermal imaging scan on every inspection — reveals moisture, heat loss, hidden issues" },
              { icon: FileText, label: "Written report with photos within 4–6 hours of inspection" },
              { icon: FileText, label: "Findings categorized by severity in plain English — no checkbox-only forms" },
              { icon: MessageCircle, label: "On-site walkthrough of every finding — you see it, we explain it" },
              { icon: MessageCircle, label: "Post-report phone consult — call us after you read the report" },
              { icon: Clock, label: "2.5–4 hours on site for a standard detached home — we do not rush" },
              { icon: Star, label: "InterNACHI-certified inspector, E&O insured, with no financial stake in the outcome" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* First-time buyer FAQ */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-7 h-7 text-blue-400" />
            <h2 className="text-2xl font-bold">Questions First-Time Buyers Ask Us</h2>
          </div>
          <div className="space-y-6">
            {commonQuestions.map((item, i) => (
              <div key={i} className="border-b border-slate-700 pb-6 last:border-0 last:pb-0">
                <p className="font-semibold text-white mb-2">{item.q}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to bring / how to prepare */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">How to Get the Most Out of Your Inspection</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Attend in person",
                detail: "Walk through with the inspector. Seeing findings in context is far more useful than reading about them later.",
              },
              {
                title: "Bring your questions",
                detail: "Write down anything that concerned you when you first viewed the property. Bring the list. We'll address every item.",
              },
              {
                title: "Ask about maintenance",
                detail: "Beyond defects, ask what the home needs in years 1–3. Our inspectors can give you a realistic picture of what ownership will actually require.",
              },
            ].map((item, i) => (
              <div key={i} className="border rounded-xl p-5">
                <CheckCircle className="w-6 h-6 text-green-500 mb-3" />
                <p className="font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <BookOpen className="w-10 h-10 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">Book Your First Home Inspection in Ontario</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Same-day and next-day availability across the GTA and Southern Ontario. You're welcome to attend and ask as many questions as you want — that's what we're here for.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
              Book Online
            </Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> (647) 801-9311
            </a>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also: <Link to="/sample-report" className="underline hover:text-white">Sample report</Link> · <Link to="/our-promise" className="underline hover:text-white">Our independence promise</Link> · <Link to="/pricing" className="underline hover:text-white">Pricing</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
