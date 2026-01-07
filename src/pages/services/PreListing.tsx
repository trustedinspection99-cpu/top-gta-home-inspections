import { Building2, TrendingUp, ShieldCheck, ClipboardCheck, Clock, Zap } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Helmet } from "react-helmet-async";

export default function PreListing() {
  const pageTitle = "Pre-Listing Home Inspection Toronto | Sell Faster & For More";
  const schemaDescription = "Maximize your sale price with a GTA Pre-Listing Inspection. We identify deal-breakers early, build buyer confidence, and help with SPIS disclosure prep.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why should Toronto sellers get a pre-listing inspection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It eliminates 11th-hour surprises. By identifying issues like knob-and-tube wiring or foundation cracks early, you can fix them on your own terms or disclose them to prevent buyers from 'chipping' away at your price."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help with my Seller Property Information Statement (SPIS)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our report provides the technical documentation you need to accurately fill out your disclosure forms, protecting you from future legal liability."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
        <script type="application/ld+json">
          {` ${JSON.stringify(faqSchema)} `}
        </script>
      </Helmet>

      <ServicePageTemplate
        title="Pre-Listing Inspection"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="The Seller's Edge: Pre-Listing Technical Audits"
        heroSubtitle="Don't let a buyer's inspector control the deal. Find the issues first, justify your asking price, and build unconditional buyer confidence."
        icon={Building2}
        price="ROI-Driven Packages"
        duration="2.5 - 4 Hours"
        description={
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              In a volatile market, **transparency is your greatest marketing tool.** A Pre-Listing (Seller's) Inspection identifies "deal-breaker" defects before they hit the MLS, allowing you to control the narrative and the repair costs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="flex flex-col items-center text-center p-5 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
                <TrendingUp className="text-orange-600 mb-2" size={32} />
                <h4 className="font-bold text-orange-900">Maximize Equity</h4>
                <p className="text-xs text-orange-800">Pre-inspected homes often sell for 3-5% more by preventing last-minute price drops.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <ShieldCheck className="text-blue-600 mb-2" size={32} />
                <h4 className="font-bold text-blue-900">Legal Protection</h4>
                <p className="text-xs text-blue-800">Accurate technical data for your SPIS disclosure reduces post-sale liability.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-green-50 rounded-xl border border-green-100 shadow-sm">
                <Clock className="text-green-600 mb-2" size={32} />
                <h4 className="font-bold text-green-900">Faster Closing</h4>
                <p className="text-xs text-green-800">Reduce time-on-market by 30% by encouraging clean, unconditional offers.</p>
              </div>
            </div>

            <p>
              Our <strong>Buyer-Ready Reports</strong> include high-resolution photos and repair cost estimates, designed to be left on the counter during showings to prove the integrity of your home.
            </p>
          </div>
        }
        whatWeInspect={[
          "Roofing System Integrity & Life Expectancy",
          "Foundation & Structural Load-Bearing Analysis",
          "Electrical Audit (Knob & Tube / Aluminum Scan)",
          "HVAC Efficiency & Mechanical Reliability",
          "Plumbing, Drainage & Recalled Pipe Identification",
          "Attic Insulation, Ventilation & Mold Scan",
          "Building Envelope & Grading Performance",
          "Thermal Imaging for Hidden Moisture Detection",
        ]}
        features={[
          {
            title: "Repair Priority Roadmap",
            description: "We categorize findings by 'Urgency,' showing you what needs to be fixed to sell and what can simply be disclosed."
          },
          {
            title: "SPIS Disclosure Support",
            description: "We provide the specific data required to accurately complete your Seller's Property Information Statement."
          },
          {
            title: "Marketing-Ready PDF",
            description: "A professional summary report designed for realtors to include in the listing package and share with serious buyers."
          },
          {
            title: "Thermal Imaging Included",
            description: "We use infrared cameras to prove to buyers that the basement is dry and the insulation is performing correctly."
          },
        ]}
        benefits={[
          "Eliminate 11th-hour price renegotiations",
          "Justify a higher listing price",
          "Control the cost of repairs using your contractors",
          "Minimize stress during the conditional period",
          "Increase the likelihood of unconditional offers",
          "Detailed repair cost guides for transparency",
          "InterNACHI Master Certified expertise",
          "Same-day digital report delivery",
        ]}
        faqs={faqSchema.mainEntity.map(f => ({
          question: f.name,
          answer: f.acceptedAnswer.text
        }))}
        relatedServices={[
          { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
          { title: "Infrared Thermal Imaging", href: "/services/thermal-imaging" },
          { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
          { title: "Mold Testing", href: "/services/mold-testing" },
        ]}
      />
    </>
  );
}
