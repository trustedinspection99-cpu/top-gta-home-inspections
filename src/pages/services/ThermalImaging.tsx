import { Eye } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function ThermalImaging() {
  return (
    <ServicePageTemplate
      title="Thermal Imaging"
      metaTitle="Thermal Imaging Home Inspection | Find Hidden Issues"
      metaDescription="We use infrared technology to detect leaks and insulation gaps not visible to the eye. Included in every full home inspection."
      heroTitle="Thermal Imaging Home Inspection in Ontario"
      heroSubtitle="See what's hidden behind walls. Infrared technology reveals moisture intrusion, missing insulation, electrical hot spots, and energy loss."
      icon={Eye}
      price="From $99"
      duration="Included with inspection"
      description={
        <div className="space-y-4">
          <p>
            Thermal imaging, also known as infrared inspection, allows us to see temperature 
            differences that are invisible to the naked eye. This powerful technology reveals 
            hidden problems like moisture intrusion, missing insulation, air leaks, and 
            overheating electrical components.
          </p>
          <p>
            Our inspectors use professional-grade FLIR thermal cameras to scan walls, 
            ceilings, floors, and building systems. Temperature anomalies often indicate 
            problems that would otherwise go undetected until they cause visible damage.
          </p>
          <p>
            Thermal imaging is included with many of our home inspections and can also 
            be booked as a standalone service for energy audits, moisture investigations, 
            or electrical system evaluations.
          </p>
        </div>
      }
      whatWeInspect={[
        "Exterior wall insulation",
        "Ceiling and attic insulation",
        "Air leaks around windows/doors",
        "Moisture behind walls",
        "Roof leak detection",
        "Plumbing leak sources",
        "Radiant floor heating",
        "HVAC duct leakage",
        "Electrical panel hot spots",
        "Overheating circuits",
        "Foundation moisture",
        "Pest activity patterns",
      ]}
      features={[
        {
          title: "Professional FLIR Equipment",
          description: "We use commercial-grade FLIR thermal cameras with high resolution and sensitivity for accurate detection."
        },
        {
          title: "Non-Invasive Detection",
          description: "Find hidden problems without cutting into walls or causing damage. Thermal imaging is completely non-destructive."
        },
        {
          title: "Comprehensive Coverage",
          description: "We scan the entire home systematically, covering all accessible walls, ceilings, and building systems."
        },
        {
          title: "Visual Documentation",
          description: "Thermal images are included in your report alongside regular photos, clearly showing temperature anomalies."
        },
      ]}
      benefits={[
        "Reveals hidden moisture",
        "Identifies insulation gaps",
        "Detects electrical hot spots",
        "Finds air leakage points",
        "Non-invasive testing",
        "Included in home inspections",
        "Energy efficiency insights",
        "Preventive maintenance tool",
      ]}
      faqs={[
        {
          question: "What can thermal imaging detect?",
          answer: "Thermal imaging detects temperature differences that indicate moisture, missing insulation, air leaks, electrical hot spots, radiant heating problems, and pest activity."
        },
        {
          question: "Is thermal imaging included in home inspections?",
          answer: "Yes, we include basic thermal scanning in our comprehensive home inspections. Enhanced thermal scanning is available as an add-on for detailed analysis."
        },
        {
          question: "Can thermal imaging see through walls?",
          answer: "Not exactly – it detects temperature differences on surfaces. But those differences often reveal what's happening behind walls, like moisture or missing insulation."
        },
        {
          question: "When is thermal imaging most effective?",
          answer: "Best results occur when there's at least 10°C difference between indoor and outdoor temperatures. This creates the thermal contrast needed for detection."
        },
      ]}
      relatedServices={[
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "WETT Inspection", href: "/services/wett" },
      ]}
    />
  );
}
