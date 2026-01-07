import { Building, Thermometer, Droplets, Zap, ShieldCheck, ClipboardList } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Helmet } from "react-helmet-async";

export default function Condo() {
  const pageTitle = "Condo Inspection Toronto & GTA | Certified Suite Specialist";
  const schemaDescription = "Expert high-rise suite inspections. We detect Kitec plumbing, Fan Coil (HVAC) failures, and balcony envelope risks. Same-day digital reports.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
      </Helmet>

      <ServicePageTemplate
        title="Condo & Townhome Inspection"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="Specialized Suite Audits for High-Rise Living"
        heroSubtitle="Don't inherit the previous owner's liabilities. From Kitec plumbing to failing HVAC actuators, we inspect the components you are legally responsible for."
        icon={Building}
        price="GTA Specialist Rates"
        duration="1.5 - 2.5 Hours"
        description={
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              In the Toronto condo market, the "Common Elements" stop at your drywall. Everything inside—the plumbing, the electrical, and the critical **Fan Coil Unit (HVAC)**—is your financial responsibility. 
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="flex flex-col items-center text-center p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
                <Droplets className="text-red-600 mb-2" size={32} />
                <h4 className="font-bold text-red-900">Kitec Identification</h4>
                <p className="text-xs text-red-800">We verify the presence of recalled piping that often leads to insurance denials and leaks.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <Thermometer className="text-blue-600 mb-2" size={32} />
                <h4 className="font-bold text-blue-900">HVAC Health Check</h4>
                <p className="text-xs text-blue-800">Deep audit of actuators, valves, and mold-prone condensate pans in your Fan Coil Unit.</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                <ShieldCheck className="text-amber-600 mb-2" size={32} />
                <h4 className="font-bold text-amber-900">Envelope Scan</h4>
                <p className="text-xs text-amber-800">Thermal imaging of window walls and balcony doors to detect heat loss and moisture.</p>
              </div>
            </div>

            <p>
              Our reports are designed to complement your <strong>Status Certificate</strong> review, providing the physical evidence you need to negotiate repairs or credits before your condition period expires.
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
        ]}
        features={[
          {
            title: "Fan Coil Unit Specialist",
            description: "Condo HVACs are notoriously neglected. We check the internal actuators and drain pans that standard inspectors often skip."
          },
          {
            title: "Infrared Leak Detection",
            description: "We use FLIR® thermal imaging to find active leaks from units above before they become visible to the naked eye."
          },
          {
            title: "Insurance-Ready Reports",
            description: "We document the age and condition of your water heater and plumbing, data your insurance provider will demand."
          },
          {
            title: "Status Certificate Context",
            description: "We note visible exterior issues that may indicate future Special Assessments mentioned in your legal docs."
          },
        ]}
        benefits={[
          "Identify high-cost Kitec plumbing issues",
          "Prevent mold growth from HVAC condensation",
          "Verify the performance of window wall systems",
          "Protect against unit-to-unit water liability",
          "Clear, same-day digital PDF reports",
          "InterNACHI Certified Master Inspector",
          "Weekend and evening bookings available",
          "Competitive pricing for GTA high-rises",
        ]}
        faqs={[
          {
            question: "Why can't I just rely on the building's maintenance?",
            answer: "The building only maintains the exterior and main pipes. You are personally responsible for the 'branch' lines, the electrical panel, and the HVAC unit. One small leak can cause thousands in damages to the unit below you."
          },
          {
            question: "Do you look for Kitec plumbing?",
            answer: "Yes. Kitec was widely used in Toronto condos built between 1995 and 2007. We identify it immediately so you can negotiate a replacement credit."
          },
          {
            question: "Does the inspection include thermal imaging?",
            answer: "Absolutely. Thermal imaging is the only way to find cold spots in window walls or slow moisture leaks behind the laundry room drywall."
          },
          {
            question: "How fast can I get the report?",
            answer: "In the fast-moving Toronto market, speed is key. You will receive your full digital report with photos by the end of the day."
          },
        ]}
        relatedServices={[
          { title: "Infrared Thermal Imaging", href: "/services/thermal-imaging" },
          { title: "New Construction (PDI)", href: "/services/new-construction" },
          { title: "Mold & Air Quality", href: "/services/mold-testing" },
          { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        ]}
      />
    </>
  );
}
