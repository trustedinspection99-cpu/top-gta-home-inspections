import { Thermometer, Zap, Droplets, Home, ShieldCheck, Search } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function ThermalImaging() {
  const pageTitle = "Thermal Imaging & Thermographic Inspection Toronto | ASADS";
  const schemaDescription = "FLIR infrared inspection finds hidden moisture, missing insulation, electrical hotspots & heat loss without opening walls. Same-day results. GTA & Ontario.";

  return (
    <ServicePageTemplate
      title="Thermal Imaging & Thermographic Inspection"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Thermal Imaging, Thermographic & Infrared Inspection"
      heroSubtitle="See what standard inspections miss. Our certified thermographers use FLIR® technology for thermal imaging, thermographic inspection, and infrared inspection — detecting hidden moisture, energy loss, and electrical hazards without opening walls."
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

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">When Should You Book a Thermal Imaging Inspection?</h3>
            <ul className="space-y-3">
              {[
                "Buying an older home (1960s–1990s) where insulation and air barriers were installed before modern energy codes",
                "After a water leak or flood to confirm all moisture has been fully dried before closing up walls",
                "If you see moisture staining or mold that suggests a larger hidden moisture source behind finished surfaces",
                "Before listing your home — find problems before a buyer's inspector does and address them on your terms",
                "Any home with suspected insulation gaps causing unusually high energy bills or comfort complaints",
                "Commercial properties with flat roofs where ponding water is trapped under the roofing membrane",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="text-blue-600 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">What We Commonly Find in Toronto &amp; GTA Homes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Attic Bypass Air Leaks", body: "Warm interior air escaping around pot lights, plumbing penetrations, and attic hatches — the single largest source of heat loss in most Toronto homes." },
                { title: "Wet Insulation", body: "Moisture-soaked batt or blown insulation inside walls showing as distinctive cold patches — invisible to the naked eye but clearly visible under infrared." },
                { title: "Electrical Hotspots", body: "Overloaded breakers, loose connections, and undersized wiring that register as heat signatures in panels and junction boxes — a leading cause of residential fires." },
                { title: "Basement Water Intrusion", body: "Active moisture migration through foundation walls and floor-wall joints showing as thermal gradients even before visible dampness appears." },
                { title: "HVAC Duct Leaks", body: "Conditioned air escaping into wall cavities and unconditioned spaces, driving up utility costs and reducing HVAC system effectiveness." },
                { title: "Flat Roof Ponding", body: "Water trapped beneath the roofing membrane on commercial buildings, detectable as thermal mass that retains heat well after the surrounding roof dries." },
              ].map((card, i) => (
                <div key={i} className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-1">{card.title}</h4>
                  <p className="text-slate-700 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">The Thermal Imaging Process</h3>
            <ol className="space-y-4">
              {[
                { step: "1", title: "Controlled Conditions Setup", body: "We assess exterior temperature and interior conditions before beginning. A minimum 10°C differential between inside and outside is required for reliable insulation and air leakage results — we advise on optimal booking timing." },
                { step: "2", title: "Room-by-Room FLIR Scan", body: "Every wall, ceiling, floor surface, and electrical panel is systematically scanned. Anomalies are flagged in real time and photographed with both thermal and visible-light cameras simultaneously." },
                { step: "3", title: "Annotated Report with Photos", body: "Each anomaly is presented as a side-by-side thermal and visible-light photo pair with a written explanation of what was found, the likely cause, and the recommended corrective action." },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-700 text-sm mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
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
        {
          question: "What temperature difference is needed for an accurate thermal scan?",
          answer: "A minimum 10°C (18°F) differential between interior and exterior is needed for reliable results. This is why thermal imaging works best in Canadian winters and cooler fall/spring months. Summer thermal scans can still detect active moisture and electrical issues but may miss insulation defects."
        },
        {
          question: "Is thermal imaging useful for new construction homes?",
          answer: "Absolutely. New construction thermal scans often reveal missing or improperly installed insulation, duct leaks, and air barrier failures that pass visual inspections. Catching these before your Tarion warranty expires saves thousands in future energy costs."
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
