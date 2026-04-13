import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SITE_URL, getCanonicalUrl } from "@/lib/seo";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, XCircle, Phone, ChevronRight, AlertTriangle } from "lucide-react";

const metaTitle = "ASADS Independence Promise | Conflict-Free Home Inspection Ontario";
const metaDescription = "ASADS Home Inspection is 100% conflict-free. We do not remediate, do not accept realtor referral fees, and have no financial interest in what we find. Our only job is to tell you the truth.";

export default function OurPromise() {
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
          "name": metaTitle,
          "description": metaDescription,
          "url": canonical,
          "publisher": {
            "@type": "LocalBusiness",
            "name": "ASADS Home Inspection",
            "telephone": "+16478019311"
          }
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Our Independence Promise</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-12 h-12 text-green-400 flex-shrink-0" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">The ASADS Independence Promise</h1>
              <p className="text-slate-300 mt-1">Our only job is to tell you the truth about the property.</p>
            </div>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl">
            A home inspection is only useful if the inspector has no financial stake in the outcome. ASADS is structured to eliminate every common source of inspector bias — so you get an honest assessment, not one shaped by other incentives.
          </p>
        </div>
      </section>

      {/* The Promise — What We Don't Do */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">What Creates Inspector Bias — and Why ASADS Has None of It</h2>
          <p className="text-slate-500 mb-8">These are the five most common conflicts of interest in home inspection. We've deliberately built our business to avoid every one.</p>

          <div className="space-y-6">
            {[
              {
                conflict: "Inspector also offers remediation services",
                risk: "An inspector who does mould remediation, asbestos abatement, or foundation repair has a direct financial incentive to find — or exaggerate — problems that require those services.",
                ourPosition: "ASADS does not perform remediation, abatement, or repair work of any kind. We test and assess. Period. When remediation is needed, we refer you to independent contractors we have no financial relationship with.",
                weDoThis: false,
              },
              {
                conflict: "Inspector receives referral fees from realtors",
                risk: "When a realtor refers clients to an inspector, an inspector dependent on those referrals may soften findings to avoid killing deals — protecting the referral relationship over the buyer's interests.",
                ourPosition: "ASADS does not accept referral fees from realtors, brokerages, or agents. We are hired directly by buyers. We have zero financial incentive to soften a finding to protect a transaction.",
                weDoThis: false,
              },
              {
                conflict: "Inspector is also a licensed contractor or trades person",
                risk: "Inspectors who are also licensed contractors may find work through properties they inspect. This is a direct conflict of interest that can influence what gets flagged — and how urgently.",
                ourPosition: "Our inspectors are certified home inspectors — not contractors looking for work. Inspection is the entire business.",
                weDoThis: false,
              },
              {
                conflict: "Inspector has a financial interest in the transaction closing",
                risk: "Some inspection companies have revenue-sharing arrangements or business relationships with real estate brokerages. Any financial stake in a deal closing creates pressure to minimize negative findings.",
                ourPosition: "ASADS has no financial relationship with any real estate brokerage, agent, or mortgage professional. Our revenue comes entirely from inspection fees paid by clients.",
                weDoThis: false,
              },
              {
                conflict: "Inspector doesn't carry Errors & Omissions insurance",
                risk: "Without E&O insurance, there's no recourse if an inspector misses something significant. It also signals that the inspector isn't confident enough in their work to be insured against mistakes.",
                ourPosition: "ASADS carries full Errors & Omissions insurance. Every inspection is backed by professional liability coverage. If we miss something we should have found, you have recourse.",
                weDoThis: false,
              },
            ].map((item, i) => (
              <div key={i} className="border rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-5 py-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">{item.conflict}</p>
                    <p className="text-sm text-slate-600 mt-1">{item.risk}</p>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">ASADS position:</p>
                    <p className="text-sm text-slate-700">{item.ourPosition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Our Credentials</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                credential: "InterNACHI Certified",
                detail: "International Association of Certified Home Inspectors — the largest inspector certifying body in North America. Requires passing exams, maintaining continuing education, and adhering to the InterNACHI Code of Ethics.",
              },
              {
                credential: "Errors & Omissions Insurance",
                detail: "Professional liability insurance covering claims arising from missed deficiencies. Required by InterNACHI certification. Protects clients if an inspector fails to identify a material defect.",
              },
              {
                credential: "General Liability Insurance",
                detail: "Covers accidental damage to the property during the inspection. Protects both the inspector and the client against claims from inspection-related incidents.",
              },
              {
                credential: "Ontario Consumer Protection Act Compliance",
                detail: "All inspection agreements comply with Ontario consumer protection legislation, including mandatory pre-contract disclosure and a clear written service agreement before inspection begins.",
              },
            ].map((c, i) => (
              <div key={i} className="bg-white border rounded-xl p-5 flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{c.credential}</p>
                  <p className="text-sm text-slate-600 mt-1">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Do */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">What Our Inspectors Are Accountable For</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Inspect and document every accessible component of the property",
              "Report all findings honestly, regardless of impact on the transaction",
              "Categorize findings by severity — safety hazards, major defects, maintenance items",
              "Photograph every deficiency",
              "Use thermal imaging on every inspection at no additional charge",
              "Deliver a written report within 4–6 hours of inspection completion",
              "Be available by phone after report delivery to answer questions",
              "Refer to independent, unaffiliated contractors for any needed follow-up work",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Won't Do */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">What ASADS Will Never Do</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Soften findings to protect a real estate transaction",
              "Accept referral fees from realtors, agents, or brokerages",
              "Perform remediation or repairs on properties we inspect",
              "Recommend specific contractors who pay us for referrals",
              "Adjust a report after delivery based on pressure from any party",
              "Inspect without E&O and general liability insurance in force",
              "Use checkbox-only reports with no written narrative",
              "Conduct an inspection that takes less than 2.5 hours on a standard property",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Shield className="w-10 h-10 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">Hire an Inspector Who Works for You</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Ontario still has no mandatory licensing for home inspectors. Our credentials, insurance, and independence policy are the quality assurance you deserve.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
              Book an Inspection
            </Link>
            <a href="tel:+16478019311" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" />
              (647) 801-9311
            </a>
          </div>
          <p className="text-sm text-white/60 mt-4">
            See also: <Link to="/sample-report" className="underline hover:text-white">Sample inspection report</Link> · <Link to="/about" className="underline hover:text-white">About ASADS</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
