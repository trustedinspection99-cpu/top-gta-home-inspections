import { Thermometer, Zap, Droplets, Home, ShieldCheck, Search } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function ThermalImaging() {
  const pageTitle = "Infrared Thermal Imaging Toronto | Advanced Leak Detection | ASADS";
  const schemaDescription = "Professional infrared thermal imaging inspections in Toronto & GTA. Pinpoint hidden leaks, insulation gaps, and electrical hotspots using FLIR military-grade technology. Book certified thermal scan now for urgent pre-purchase or home inspection add-ons.";

  return (
    <ServicePageTemplate
      title="Infrared Thermal Imaging"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="See the Invisible: Advanced Thermal Leak Detection"
      heroSubtitle="Book a certified thermographer now. Visualize hidden moisture, energy loss, and electrical hazards without invasive testing."
      icon={Search}
      price="Add-on or Standalone"
      duration="1-2 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            Infrared Thermography (IRT) allows our <strong>Certified Thermographers</strong> to detect hidden defects invisible to the naked eye. Using high-resolution FLIR® cameras, we uncover moisture intrusion, insulation gaps, and electrical hotspots before they become costly problems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <Droplets className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Moisture Intrusion</h4>
              <p className="text-xs text-blue-800">Locate leaks behind finished walls, ceilings, or tiling before mold develops.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
              <Zap className="text-orange-600 mb-2" size={32} />
              <h4 className="font-bold text-orange-900">Electrical Hotspots</h4>
              <p className="text-xs text-orange-800">Identify overloaded circuits, loose wire nuts, and fire risks early using infrared detection.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <Home className="text-slate-600 mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Energy Loss</h4>
              <p className="text-xs text-slate-800">Detect insulation voids and air leakage in walls, attics, and windows to save on utility bills.</p>
            </div>
          </div>

          <p>
            Our thermal imaging inspections can be booked as a <strong>standalone service</strong> or added to your <strong>pre-purchase, pre-listing, or condo inspection</strong>. Same-day digital reports ensure immediate actionable insights.
          </p>
        </div>
      }
      whatWeInspect={[
        "Moisture Intrusion in Finished Walls & Ceilings",
        "Roof & Ceiling Leak Detection",
        "Electrical Panel & Circuit Hotspot Analysis",
        "Insulation Voids & Air Leakage",
        "Thermal Bridging in Building Envelopes",
        "Radiant Floor Heating Performance",
        "HVAC Duct Leakage & Airflow Verification",
        "Window & Door Seal Integrity",
        "Plumbing Drips & Slow Seepage",
        "Attic Ventilation & Heat Loss",
        "Foundation & Crawlspace Moisture Profiling",
        "Firewall Continuity & Breaches",
      ]}
      features={[
        {
          title: "FLIR® High-Resolution Thermal Imaging",
          description: "MSX® enhanced images provide crystal-clear diagnostic results suitable for reports and insurance documentation."
        },
        {
          title: "Non-Destructive Testing",
          description: "Locate leaks, heat loss, and moisture without cutting walls or flooring."
        },
        {
          title: "Certified Thermographer Interpretation",
          description: "Ensure accurate readings, avoiding misdiagnosis of cold spots or reflections."
        },
        {
          title: "Insurance & Real Estate Ready Reports",
          description: "Reports provide visual proof of issues for claims, negotiations, or pre-closing inspections."
        },
      ]}
      benefits={[
        "Detect hidden leaks before mold develops",
        "Identify fire hazards from electrical hotspots",
        "Reduce energy bills by locating insulation gaps",
        "Verify radiant heating performance",
        "Non-invasive and fast inspections",
        "Digital report delivered same-day",
        "Supports pre-purchase, pre-listing, or condo inspections",
        "Certified thermographers for accurate results",
      ]}
      faqs={[
        {
          question: "Can thermal imaging see 'through' walls?",
          answer: "Not exactly. It detects surface temperature variations. Changes caused by moisture, missing insulation, or hidden electrical faults allow us to visualize hidden issues behind walls, ceilings, and floors."
        },
        {
          question: "Is thermal imaging included in a standard inspection?",
          answer: "Yes. At ASADS, thermal scanning is integrated as a standard add-on for pre-purchase or pre-listing inspections to ensure hidden defects are identified before closing."
        },
        {
          question: "Can thermal imaging detect mold?",
          answer: "Thermal imaging identifies moisture intrusion that may lead to mold growth. While it cannot detect spores directly, it helps pinpoint areas at risk, ensuring remediation addresses the source."
        },
        {
          question: "Why hire a certified thermographer?",
          answer: "Certified thermographers understand thermal physics, emissivity, and infrared interpretation. This ensures accurate detection of leaks, insulation gaps, and electrical hotspots, avoiding false positives."
        },
        {
          question: "How much does thermal imaging cost in Toronto?",
          answer: "Thermal imaging can be added to any home inspection or booked as a standalone service. Contact us at (647) 801-9311 for current pricing. It's included standard with all pre-purchase inspections."
        },
      ]}
      relatedServices={[
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Condo Inspection", href: "/services/condo" },
        { title: "Commercial Inspection", href: "/services/commercial" },
      ]}
    />
  );
}
