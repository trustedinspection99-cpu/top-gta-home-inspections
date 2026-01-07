import { Home, ShieldCheck, Zap, Droplets, Thermometer, Clock, PhoneCall } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Helmet } from "react-helmet-async";

export default function PrePurchase() {
  const pageTitle = "Pre-Purchase Home Inspection Toronto & GTA | Certified Inspectors | ASADS";
  const schemaDescription = "Avoid costly surprises. Our pre-purchase home inspection in Toronto & GTA includes thermal imaging, detailed reports, and expert analysis for houses, condos, and townhouses.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does ASADS detect issues that a standard home inspection misses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We include Infrared Thermal Imaging and moisture analysis as standard. This helps identify hidden roof leaks, insulation gaps, electrical hotspots, and other defects that are often missed in standard visual inspections."
        }
      },
      {
        "@type": "Question",
        "name": "Can you perform a pre-purchase inspection before my offer deadline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our Rapid-Response scheduling ensures same-day or next-day inspections so buyers in Toronto and the GTA can submit confident offers on time."
        }
      },
      {
        "@type": "Question",
        "name": "What common GTA home issues are covered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We focus on high-liability items in Ontario, including Knob-and-Tube or Aluminum wiring, Kitec plumbing, foundation settlement on ravine lots, attic mold from poor ventilation, and condo fan coil risks."
        }
      },
      {
        "@type": "Question",
        "name": "Do you inspect condos, townhouses, and heritage homes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our pre-purchase inspections cover single-family homes, townhouses, condos, and historic/heritage properties throughout Toronto and the GTA."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
        <link rel="canonical" href="https://asads.ca/services/pre-purchase-home-inspection" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <ServicePageTemplate
        title="Pre-Purchase Home Inspection"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="Technical Pre-Purchase Inspections for Toronto & GTA"
        heroSubtitle="Comprehensive audits for houses, condos, and townhouses. Detect hidden risks, negotiate confidently, and avoid costly surprises."
        icon={Home}
        price="All-Inclusive Technical Audit"
        duration="2.5 - 4 Hours"
        description={
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              In Toronto’s competitive real estate market, a standard home inspection can miss critical defects. Our <strong>pre-purchase inspection in Toronto & GTA</strong> identifies high-risk issues including Knob-and-Tube wiring, Kitec plumbing, foundation settlement, HVAC life-cycle problems, roof leaks, and attic mold before you commit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <Thermometer className="text-blue-600 mb-2" size={32} />
                <h4 className="font-bold text-blue-900">Thermal Imaging</h4>
                <p className="text-xs text-blue-800">Included on every inspection to detect hidden moisture, insulation gaps, and leaks.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                <Clock className="text-amber-600 mb-2" size={32} />
                <h4 className="font-bold text-amber-900">Same-Day PDF Reports</h4>
                <p className="text-xs text-amber-800">Rapid delivery so you can submit offers confidently.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl border border-green-100 shadow-sm">
                <PhoneCall className="text-green-600 mb-2" size={32} />
                <h4 className="font-bold text-green-900">Lifetime Support</h4>
                <p className="text-xs text-green-800">Phone & email assistance for as long as you own the home.</p>
              </div>
            </div>

            <p>
              Our certified Master Inspectors use <strong>FLIR High-Resolution Thermal Imaging</strong> and advanced moisture detection to uncover hidden defects in roofs, attics, basements, and electrical systems—empowering you with negotiation-ready knowledge.
            </p>
          </div>
        }
        whatWeInspect={[
          "Full Structural & Foundation Review",
          "Advanced Electrical Audit (Knob/Tube & Aluminum Wiring)",
          "HVAC Performance & Life Expectancy Analysis",
          "Roof, Flashings & Attic Moisture Detection",
          "Plumbing, Drainage & Recalled Pipe Identification",
          "Building Envelope & Grading Assessment",
          "Thermal Imaging & Moisture Scanning",
          "Basement Leak & Mold Spore Risk Analysis",
        ]}
        features={[
          {
            title: "InterNACHI Master Certified",
            description: "Highest standards in North American home inspections."
          },
          {
            title: "Thermal Imaging Included",
            description: "Detects hidden leaks, insulation gaps, and moisture issues without extra cost."
          },
          {
            title: "Negotiation-Ready Reports",
            description: "Detailed repair cost guidance for price negotiations and offer confidence."
          },
          {
            title: "Appliance & HVAC Recall Checks",
            description: "We verify all major appliances and mechanical systems for recalls and safety issues."
          },
        ]}
        benefits={[
          "Rapid 24-Hour Scheduling for Pre-Offers",
          "Same-Day Digital Reports",
          "Thermal Imaging & Moisture Analysis Included",
          "Lifetime Technical Support",
          "Comprehensive Repair & Maintenance Cost Guide",
          "Unbiased 3rd Party Inspection",
          "E&O & General Liability Insured",
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
          { title: "Tarion Warranty", href: "/services/tarion-warranty" },
        ]}
      />
    </>
  );
}
