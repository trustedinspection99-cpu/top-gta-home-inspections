import { Building, Thermometer, Droplets, Zap, ShieldCheck, ClipboardList } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Condo() {
  const pageTitle = "Condo Inspection Toronto & GTA | Certified Suite Specialist";
  const schemaDescription = "Expert pre-purchase and pre-listing condo inspections. Detect Kitec plumbing, Fan Coil failures, balcony envelope risks, and HOA compliance. Same-day reports.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
      </Helmet>

      <ServicePageTemplate
        title="Condo & Townhome Inspection Services"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="Certified Condo Inspections – Buyer & Seller Ready"
        heroSubtitle={
          <>
            Avoid hidden liabilities in multi-unit properties. From Kitec plumbing and HVAC Fan Coil issues to HOA compliance and balcony envelope risks, we cover the components you’re responsible for.  
            <br />
            <Link to="/services/pre-purchase" className="text-blue-600 underline">
              Pre-Purchase Condo Inspections
            </Link>{" "}
            and{" "}
            <Link to="/services/pre-listing" className="text-blue-600 underline">
              Pre-Listing Condo Inspections
            </Link>{" "}
            ensure buyers and sellers are protected before closing.
          </>
        }
        icon={Building}
        price="GTA Specialist Rates"
        duration="1.5 - 2.5 Hours"
        description={
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              In Toronto, the "Common Elements" stop at your drywall. Everything inside—the plumbing, electrical panel, HVAC, and balcony—is your financial responsibility.  
              Our condo inspection checklist covers HOA rules, structural limits, and in-suite systems, ensuring you know exactly what you’re buying or selling.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="flex flex-col items-center text-center p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
                <Droplets className="text-red-600 mb-2" size={32} />
                <h4 className="font-bold text-red-900">Kitec & Plumbing Audit</h4>
                <p className="text-xs text-red-800">Identify recalled piping that can lead to leaks, insurance issues, and costly repairs.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <Thermometer className="text-blue-600 mb-2" size={32} />
                <h4 className="font-bold text-blue-900">Fan Coil / HVAC Specialist</h4>
                <p className="text-xs text-blue-800">Deep inspection of actuators, valves, and condensation pans to prevent mold growth and system failures.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                <ShieldCheck className="text-amber-600 mb-2" size={32} />
                <h4 className="font-bold text-amber-900">Balcony & Envelope Scan</h4>
                <p className="text-xs text-amber-800">Thermal imaging of window walls and balcony doors to detect heat loss, water intrusion, and structural concerns.</p>
              </div>
            </div>

            <p>
              Our reports complement your <strong>Status Certificate</strong> review, providing evidence to negotiate repairs or credits. High-intent services like "pre-purchase condo inspection near me" and "pre-listing condo inspection for sellers" are designed for immediate bookings to secure your transaction.
            </p>
          </div>
        }
        whatWeInspect={[
          "In-Suite Fan Coil / Heat Pump Operation",
          "Kitec & Polybutylene Plumbing Audit",
          "Main Water Shut-off Valve Functionality",
          "Electrical Panel & Breaker Safety (Thermal Scan)",
          "Appliance Functional Lifetime Analysis",
          "Window Wall Seal & Thermal Performance",
          "Balcony Guardrail & Floor Integrity",
          "Dryer Vent & Exhaust Duct Health",
          "Laundry Room Moisture & Leak Detection",
          "Ceiling/Wall Moisture Mapping (Unit-to-Unit Leaks)",
          "HOA & Common Element Compliance Checks",
          "Status Certificate Contextual Notes",
        ]}
        features={[
          {
            title: "Fan Coil & HVAC Specialist",
            description: "In-suite HVAC systems are often neglected. We check internal actuators, drain pans, and condensate lines."
          },
          {
            title: "Infrared & Moisture Detection",
            description: "FLIR® thermal imaging finds hidden leaks, cold spots, and potential mold risk before they become costly."
          },
          {
            title: "Status Certificate & HOA Review",
            description: "We document condo-specific issues that may affect your HOA disclosure or future special assessments."
          },
          {
            title: "Insurance-Ready Documentation",
            description: "Reports provide proof of in-suite conditions for claims or lender requirements."
          },
        ]}
        benefits={[
          "Prevent costly Kitec plumbing issues",
          "Ensure HVAC systems are mold-free",
          "Verify window wall and balcony performance",
          "Protect against unit-to-unit water damage",
          "Same-day, clear digital PDF reports",
          "InterNACHI Certified Master Inspector",
          "Evening & weekend GTA bookings available",
          "Competitive rates for high-rise suites",
        ]}
        faqs={[
          {
            question: "Do you inspect condos differently than houses?",
            answer: "Yes. We focus on in-suite systems, balcony envelope, and HOA-specific concerns, unlike house inspections that cover entire lot systems."
          },
          {
            question: "Do you check for Kitec plumbing?",
            answer: "Absolutely. Kitec piping is common in condos built 1995-2007. We identify it early so buyers can negotiate replacements."
          },
          {
            question: "Is thermal imaging included?",
            answer: "Yes. Thermal scans detect hidden leaks behind walls, ceilings, and balconies that are not visible to standard inspections."
          },
          {
            question: "How fast will I get my report?",
            answer: "Digital reports are delivered same-day with photos and annotations, essential in fast-moving Toronto condo transactions."
          },
        ]}
        relatedServices={[
          { title: "Infrared Thermal Imaging", href: "/services/thermal-imaging" },
          { title: "Mold & Air Quality Testing", href: "/services/mold-testing" },
          { title: "Pre-Purchase Home Inspection", href: "/services/pre-purchase" },
          { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
        ]}
      />
    </>
  );
}
