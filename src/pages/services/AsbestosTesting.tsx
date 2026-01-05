import { AlertTriangle } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AsbestosTesting() {
  return (
    <ServicePageTemplate
      title="Asbestos Testing"
      metaTitle="Asbestos Testing & Identification | Ontario Services"
      metaDescription="Certified asbestos testing to identify hazardous materials before renovations or property transactions. Stay safe and compliant."
      heroTitle="Asbestos Testing & Identification in Ontario"
      heroSubtitle="Safe, professional asbestos sampling for homes and buildings. Lab-certified analysis identifies asbestos-containing materials before renovation or purchase."
      icon={AlertTriangle}
      price="From $199"
      duration="1-2 hours"
      description={
        <div className="space-y-4">
          <p>
            Asbestos was commonly used in Canadian homes built before 1990. While asbestos 
            is safe when undisturbed, it becomes hazardous when materials are damaged, 
            disturbed during renovation, or deteriorate over time. Inhaling asbestos fibers 
            can cause serious diseases including lung cancer and mesothelioma.
          </p>
          <p>
            Our asbestos testing service safely collects samples from suspected materials 
            and sends them to an accredited laboratory for analysis. We test common 
            asbestos-containing materials including insulation, floor tiles, ceiling tiles, 
            pipe wrap, and vermiculite.
          </p>
          <p>
            Testing is essential before any renovation work in older homes. If asbestos 
            is confirmed, professional abatement may be required. We can help you understand 
            your options and connect you with certified removal contractors.
          </p>
        </div>
      }
      whatWeInspect={[
        "Vermiculite insulation (attic)",
        "Pipe and duct insulation",
        "Floor tiles and adhesive",
        "Ceiling tiles and textures",
        "Drywall joint compound",
        "Plaster and stucco",
        "Roofing materials",
        "Siding materials",
        "Boiler and furnace insulation",
        "Electrical panel backing",
        "Window caulking and glazing",
        "Fireproofing materials",
      ]}
      features={[
        {
          title: "Safe Sampling Protocol",
          description: "Our technicians follow strict safety protocols to minimize fiber release during sample collection, protecting you and your family."
        },
        {
          title: "Accredited Lab Analysis",
          description: "Samples are analyzed by an NVLAP-accredited laboratory using PLM or TEM methods for definitive identification."
        },
        {
          title: "Multiple Material Testing",
          description: "We can test multiple materials in a single visit, providing comprehensive results for renovation planning."
        },
        {
          title: "Expert Recommendations",
          description: "If asbestos is found, we provide guidance on management options: encapsulation, enclosure, or professional removal."
        },
      ]}
      benefits={[
        "NVLAP accredited lab",
        "Safe sampling methods",
        "Fast turnaround times",
        "Renovation planning support",
        "Abatement contractor referrals",
        "Pre-purchase due diligence",
        "Insurance documentation",
        "Peace of mind",
      ]}
      faqs={[
        {
          question: "How do I know if my home has asbestos?",
          answer: "Homes built before 1990 may contain asbestos. You cannot identify asbestos by looking at it – laboratory testing is the only way to confirm its presence."
        },
        {
          question: "Is asbestos dangerous if I don't disturb it?",
          answer: "Intact, undisturbed asbestos materials generally pose low risk. Danger increases when materials are damaged, deteriorating, or disturbed during renovation."
        },
        {
          question: "Do I need to remove asbestos?",
          answer: "Not always. Intact materials can often be safely managed in place or encapsulated. Removal is recommended when materials are damaged or will be disturbed by renovation."
        },
        {
          question: "How long does lab analysis take?",
          answer: "Standard results are available within 3-5 business days. Rush 24-hour service is available for urgent situations."
        },
      ]}
      relatedServices={[
        { title: "Lead Paint Testing", href: "/services/lead-paint-testing" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
      ]}
    />
  );
}
