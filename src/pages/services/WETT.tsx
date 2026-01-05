import { Flame } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function WETT() {
  return (
    <ServicePageTemplate
      title="WETT Inspection"
      metaTitle="WETT Certified Inspection | Fireplace & Chimney"
      metaDescription="Ensure your wood stove or fireplace is insurance-compliant. WETT-certified inspections for Ontario homeowners and buyers."
      heroTitle="WETT Certified Inspection in Ontario"
      heroSubtitle="Safety certification for wood-burning appliances. Required for insurance and peace of mind. Certified inspections for fireplaces, wood stoves, and chimneys."
      icon={Flame}
      price="From $199"
      duration="1-2 hours"
      description={
        <div className="space-y-4">
          <p>
            WETT (Wood Energy Technology Transfer) inspections are the Canadian standard 
            for evaluating the safety of wood-burning appliances. Many insurance companies 
            require a WETT inspection before providing coverage for homes with fireplaces, 
            wood stoves, or pellet stoves.
          </p>
          <p>
            Our WETT-certified inspectors examine the complete wood-burning system from 
            appliance to chimney top. We verify proper installation, clearances to 
            combustibles, chimney condition, and overall system safety. You'll receive 
            a detailed report suitable for insurance purposes.
          </p>
          <p>
            Whether you're buying a home with a fireplace, installing a new wood stove, 
            or need insurance documentation, our WETT inspection provides the certification 
            you need.
          </p>
        </div>
      }
      whatWeInspect={[
        "Fireplace or wood stove condition",
        "Chimney liner integrity",
        "Clearances to combustibles",
        "Hearth extension size",
        "Floor protection adequacy",
        "Chimney cap and spark arrestor",
        "Flashing and weather seal",
        "Damper operation",
        "Creosote accumulation",
        "Masonry condition",
        "Chimney height compliance",
        "Smoke and CO detectors",
      ]}
      features={[
        {
          title: "Insurance Compliant",
          description: "Our WETT reports meet insurance company requirements for wood-burning appliance coverage documentation."
        },
        {
          title: "Three Levels Available",
          description: "We offer Level 1 (basic), Level 2 (real estate/insurance), and Level 3 (invasive) inspections based on your needs."
        },
        {
          title: "Certified Inspectors",
          description: "All inspections performed by WETT-certified technicians with current credentials and ongoing training."
        },
        {
          title: "Detailed Documentation",
          description: "Comprehensive report with photos documenting the system condition and any deficiencies found."
        },
      ]}
      benefits={[
        "WETT certified inspectors",
        "Insurance accepted reports",
        "Multiple inspection levels",
        "Same-day appointments",
        "Detailed photo documentation",
        "Clear safety recommendations",
        "Chimney sweep referrals",
        "Peace of mind",
      ]}
      faqs={[
        {
          question: "Why do I need a WETT inspection?",
          answer: "Most insurance companies require WETT certification for homes with wood-burning appliances. It's also recommended when buying a home or after chimney fires."
        },
        {
          question: "What's the difference between inspection levels?",
          answer: "Level 1 is for regularly used systems. Level 2 adds video inspection for sales or after events. Level 3 involves opening walls when problems are suspected."
        },
        {
          question: "How often should I get a WETT inspection?",
          answer: "Insurance typically requires inspection every 5 years. Annual chimney cleaning and visual checks are also recommended."
        },
        {
          question: "What if problems are found?",
          answer: "We provide clear documentation of deficiencies and recommendations. Many issues can be repaired by qualified contractors to bring the system into compliance."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
      ]}
    />
  );
}
