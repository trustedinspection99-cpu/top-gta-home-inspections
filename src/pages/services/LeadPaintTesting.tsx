import { Droplet } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function LeadPaintTesting() {
  return (
    <ServicePageTemplate
      title="Lead Paint Testing"
      metaTitle="Lead Paint Testing Toronto & GTA | Safe Home Testing | ASADS"
      metaDescription="Professional lead paint testing in Toronto & GTA. Protect your family from lead hazards in pre-1978 homes. Lab-certified results. From $149."
      heroTitle="Lead Paint Testing"
      heroSubtitle="Protect your family from lead hazards. Professional testing identifies lead-based paint in older homes before renovation or purchase."
      icon={Droplet}
      price="From $149"
      duration="1-2 hours"
      description={
        <div className="space-y-4">
          <p>
            Lead-based paint was commonly used in Canadian homes built before 1978. While 
            intact lead paint poses minimal risk, it becomes hazardous when disturbed 
            during renovation, or when paint deteriorates creating lead dust and chips 
            that can be ingested by children.
          </p>
          <p>
            Lead exposure is particularly dangerous for young children, causing 
            developmental delays, learning difficulties, and other health problems. 
            Testing is essential before renovating older homes or when you have 
            children in a pre-1978 property.
          </p>
          <p>
            Our lead paint testing includes XRF (X-ray fluorescence) analysis for instant 
            results on painted surfaces, plus laboratory analysis for paint chips when 
            needed. We can test multiple surfaces to identify all lead hazards in your home.
          </p>
        </div>
      }
      whatWeInspect={[
        "Interior wall paint",
        "Exterior painted surfaces",
        "Window sills and frames",
        "Door frames and trim",
        "Stair railings and balusters",
        "Baseboards and crown molding",
        "Kitchen and bathroom cabinets",
        "Painted metal surfaces",
        "Porches and decks",
        "Garage surfaces",
        "Painted playground equipment",
        "Painted furniture",
      ]}
      features={[
        {
          title: "XRF Technology",
          description: "Our X-ray fluorescence analyzers provide instant, non-destructive results on painted surfaces without damaging your walls."
        },
        {
          title: "Comprehensive Surveying",
          description: "We systematically test all painted surfaces room by room, identifying every lead hazard in your home."
        },
        {
          title: "Lab Verification",
          description: "When needed, paint chip samples are analyzed by an accredited laboratory for confirmation and detailed lead content levels."
        },
        {
          title: "Risk Assessment",
          description: "Beyond testing, we evaluate the condition of lead paint and provide risk-based recommendations for management."
        },
      ]}
      benefits={[
        "Instant XRF results",
        "Non-destructive testing",
        "Complete home coverage",
        "Lab-certified analysis",
        "Child safety focus",
        "Renovation planning",
        "Remediation guidance",
        "Legal documentation",
      ]}
      faqs={[
        {
          question: "When was lead paint banned in Canada?",
          answer: "Lead paint for residential use was restricted in 1976 and banned in 1991. Homes built before 1978 are most likely to contain lead paint."
        },
        {
          question: "Is lead paint dangerous if I don't disturb it?",
          answer: "Intact, well-maintained lead paint poses low risk. However, deteriorating paint, friction surfaces (windows, doors), and renovation activities create hazardous lead dust."
        },
        {
          question: "Do I need to remove lead paint?",
          answer: "Not always. Intact lead paint can be safely encapsulated or covered. Removal is recommended when paint is deteriorating or you're renovating."
        },
        {
          question: "How do I protect my children?",
          answer: "Test before renovating, keep painted surfaces in good condition, clean regularly with a HEPA vacuum, and wash children's hands frequently."
        },
      ]}
      relatedServices={[
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
      ]}
    />
  );
}
