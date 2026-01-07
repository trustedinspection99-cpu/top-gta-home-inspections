import { Home, ShieldCheck, Zap, Droplets, Thermometer, Clock, PhoneCall } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // <-- for internal links

export default function PrePurchase() {
  const pageTitle = "Expert Pre-Purchase Home Inspections Toronto & GTA | ASADS";
  const schemaDescription = "Don't buy a money pit. GTA's most technical pre-purchase home inspection. Includes Thermal Imaging as standard, 24-hour reporting, and lifetime technical support.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does ASADS find defects that a standard visual inspection misses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While others charge extra for 'Extended' packages, we include Infrared Thermal Imaging and moisture analysis as standard. This allows us to detect hidden roof leaks, insulation gaps, and overheating electrical circuits that are invisible to the naked eye."
        }
      },
      {
        "@type": "Question",
        "name": "Can you inspect a home before my offer deadline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We specialize in 'Pre-Offer' inspections. With our Rapid-Response scheduling, we provide same-day or next-day appointments to ensure you can submit a confident, clean offer in the GTA's competitive market."
        }
      },
      {
        "@type": "Question",
        "name": "Should sellers consider a pre-listing inspection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sellers can also benefit from a Pre-Listing Home Inspection, which identifies issues before listing and helps set realistic expectations. Learn more at /services/pre-listing."
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
          {`${JSON.stringify(faqSchema)}`}
        </script>
      </Helmet>

      <ServicePageTemplate
        title="Pre-Purchase Inspection"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="The GTA's Most Technical Pre-Purchase Audit"
        heroSubtitle={
          <>
            Beyond a visual walk-through. We provide the technical evidence you need to negotiate price, reduce risk, and avoid the 'Money Pit'. 
            <br />
            <Link to="/services/pre-listing" className="text-blue-600 underline">
              Sellers can also prepare their homes with a Pre-Listing Inspection
            </Link>
            .
          </>
        }
        icon={Home}
        price="All-Inclusive Technical Audit"
        duration="2.5 - 4 Hours"
        description={
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              In Toronto’s aggressive real estate market, a "standard" home inspection is a liability. 
              You need a <strong>Technical Audit</strong> that identifies high-cost issues like 
              Knob-and-Tube wiring, foundation scouring, and HVAC life-cycles before you commit.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <Thermometer className="text-blue-600 mb-2" size={32} />
                <h4 className="font-bold text-blue-900">Thermal Scan</h4>
                <p className="text-xs text-blue-800">Standard on every audit to find hidden moisture.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                <Clock className="text-amber-600 mb-2" size={32} />
                <h4 className="font-bold text-amber-900">Same-Day PDF</h4>
                <p className="text-xs text-amber-800">Digital reports delivered within hours of inspection.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl border border-green-100 shadow-sm">
                <PhoneCall className="text-green-600 mb-2" size={32} />
                <h4 className="font-bold text-green-900">Lifetime Support</h4>
                <p className="text-xs text-green-800">Phone & email support for as long as you own the home.</p>
              </div>
            </div>

            <p>
              Our Master Inspectors utilize <strong>FLIR High-Resolution Imaging</strong> to verify 
              the "unseen" components of the home—detecting active leaks behind finished 
              basements and insulation bypasses in attics.
            </p>
          </div>
        }
        whatWeInspect={[
          "Full Structural Integrity & Foundation Review",
          "Advanced Electrical Audit (Aluminum & Knob/Tube focus)",
          "HVAC Performance & Estimated Life Expectancy",
          "Roofing, Flashings & Attic Moisture Detection",
          "Plumbing, Drainage & Recalled Pipe Identification",
          "Building Envelope & Grading Analysis",
          "Thermal Imaging & Moisture Analysis (Included)",
          "Basement Leak & Mold Spore Risk Assessment",
        ]}
        features={[
          {
            title: "InterNACHI Master Certified",
            description: "Operating at the highest tier of North American inspection standards."
          },
          {
            title: "Thermal Imaging Included",
            description: "Unlike 'Essential' packages elsewhere, we include full thermography as standard to ensure no hidden leaks go unnoticed."
          },
          {
            title: "Negotiation-Ready Reports",
            description: "Our reports prioritize major defects with repair cost guides, giving you the leverage to ask for price reductions."
          },
          {
            title: "Appliance & HVAC Recall Checks",
            description: "We verify every major appliance and mechanical unit for manufacturer safety recalls."
          },
        ]}
        benefits={[
          "Priority 24-Hour Scheduling for Pre-Offers",
          "Same-Day High-Resolution PDF Reports",
          "Thermal Imaging & Moisture Scanning Included",
          "Lifetime Technical Support via Phone/Email",
          "Detailed Repair & Maintenance Cost Guide",
          "Unbiased 3rd Party Independent Evaluation",
          "E&O and General Liability Insured",
          "Seasonal Maintenance Checklist Included",
        ]}
        faqs={faqSchema.mainEntity.map(f => ({
          question: f.name,
          answer: f.acceptedAnswer.text
        }))}
        relatedServices={[
          { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
          { title: "Condo Inspection", href: "/services/condo" },
          { title: "Mold Testing", href: "/services/mold-testing" },
          { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
        ]}
      />
    </>
  );
}
