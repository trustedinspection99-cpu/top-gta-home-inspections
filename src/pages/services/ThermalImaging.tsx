import { Thermometer, Zap, Droplets, Home, ShieldCheck, Search } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function ThermalImaging() {
  const pageTitle = "Infrared Thermal Imaging Toronto | Advanced Leak Detection | ASADS";
  const schemaDescription = "Professional infrared thermal imaging inspections in Toronto & GTA. Pinpoint hidden leaks, insulation gaps, and electrical hotspots using FLIR military-grade technology.";

  return (
    <ServicePageTemplate
      title="Infrared Thermal Imaging"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="See the Invisible: Advanced Thermal Leak Detection"
      heroSubtitle="We use military-grade FLIR® high-resolution cameras to visualize hidden moisture, heat loss, and electrical hazards without damaging your walls."
      icon={Search}
      price="Add-on or Standalone"
      duration="1-2 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            Infrared Thermography (IRT) allows our <strong>Certified Thermographers</strong> to visualize temperature variations that are invisible to the naked eye. By capturing heat signatures, we can detect deep-seated building defects before they lead to catastrophic failures.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <Droplets className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Moisture Intrusion</h4>
              <p className="text-xs text-blue-800">Detecting 'cold spots' that indicate active leaks, even behind finished basement walls and tiling.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
              <Zap className="text-orange-600 mb-2" size={32} />
              <h4 className="font-bold text-orange-900">Electrical Risks</h4>
              <p className="text-xs text-orange-800">Identifying overloaded circuits and loose wire nuts that 'glow' on thermal scans before causing fires.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <Home className="text-slate-600 mb-2" size={32} />
              <h4 className="font-bold text-slate-900">Energy Loss</h4>
              <p className="text-xs text-slate-800">Locating insulation voids and air leakage around building envelopes to reduce GTA utility bills.</p>
            </div>
          </div>

          

          <p>
            Every ASADS inspection integrates thermal scanning as a standard of care. This non-invasive building science ensures your investment is protected from the construction challenges specific to Ontario—from <strong>high-rise glass curtain walls</strong> to <strong>century-home masonry</strong>.
          </p>
        </div>
      }
      whatWeInspect={[
        "Moisture Intrusion in Finished Walls",
        "Active Roof & Ceiling Leak Tracking",
        "Electrical Panel Hotspot Analysis",
        "Insulation Voids & Settlement Areas",
        "Thermal Bridging in Building Envelopes",
        "Radiant Floor Heating Uniformity",
        "HVAC Ductwork Leakage & Air Flow",
        "Window & Door Seal Integrity",
        "Plumbing Drips & Slow Seepage",
        "Attic Ventilation & Heat Loss",
        "Foundation Wall Crack Infiltration",
        "Firewall Continuity & Breaches",
      ]}
      features={[
        {
          title: "FLIR® High-Resolution Scans",
          description: "We utilize industry-leading FLIR® cameras with MSX® technology to provide clear, diagnostic thermal images for your report."
        },
        {
          title: "Non-Destructive Testing",
          description: "Identify leaks and hazards without cutting into drywall or peeling back flooring, preserving the integrity of the property."
        },
        {
          title: "Certified Interpretation",
          description: "Our inspectors are trained in thermodynamics and emissivity, ensuring cold spots aren't misidentified as leaks."
        },
        {
          title: "Insurance Documentation",
          description: "Thermal images provide visual proof of damage and source-identification required by many insurance adjusters for claims."
        },
      ]}
      benefits={[
        "Prevent mold growth through moisture mapping",
        "Identify fire risks in aluminum wiring",
        "Lower winter heating & summer cooling bills",
        "Verify radiant floor heating systems",
        "Pinpoint the exact source of mystery leaks",
        "Non-invasive diagnostic technology",
        "Visual evidence for price negotiations",
        "Peace of mind for building envelope integrity",
      ]}
      faqs={[
        {
          question: "Can thermal imaging see 'through' walls?",
          answer: "Not exactly. It sees the surface temperature of the wall. Because water or missing insulation changes that surface temperature through thermal transfer, it allows us to 'visualize' what is happening inside the cavity."
        },
        {
          question: "Is thermal imaging included in a standard inspection?",
          answer: "Yes, at ASADS, we believe thermal scanning is a vital part of a professional technical audit and we integrate it into our comprehensive inspection process."
        },
        {
          question: "Can it detect mold?",
          answer: "Thermal imaging detects the moisture that causes mold. While it cannot identify mold spores, it is the best tool for finding the root cause of a mold problem so it doesn't return after cleaning."
        },
        {
          question: "Why do I need a certified thermographer?",
          answer: "Reading a thermal camera is like reading an X-ray. Reflections, sunlight, and material density (emissivity) can create false readings. Only a trained pro can accurately diagnose the signature."
        },
      ]}
      relatedServices={[
        { title: "Mold Testing", href: "/services/mold-testing" },
        { title: "Home Inspection", href: "/services/home-inspection" },
        { title: "Condo Inspection", href: "/services/condo-inspection" },
        { title: "Commercial Inspection", href: "/services/commercial-inspection" },
      ]}
    />
  );
}
