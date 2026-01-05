import { Building2 } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function PreListing() {
  return (
    <ServicePageTemplate
      title="Pre-Listing Inspection"
      metaTitle="Pre-Listing Home Inspection for Sellers | Ontario"
      metaDescription="Avoid closing delays. Our pre-listing inspections identify repairs early so you can sell your home faster and without surprises."
      heroTitle="Pre-Listing Home Inspection in Ontario"
      heroSubtitle="Sell your home faster and for more money. Address issues before listing and build buyer confidence with a professional inspection report."
      icon={Building2}
      price="From $349"
      duration="2-3 hours"
      description={
        <div className="space-y-4">
          <p>
            A pre-listing inspection gives sellers a significant advantage in today's competitive 
            real estate market. By identifying and addressing issues before you list, you can 
            avoid surprises during buyer inspections that often derail sales or lead to 
            last-minute price negotiations.
          </p>
          <p>
            When you provide buyers with a professional inspection report upfront, it builds 
            trust and demonstrates transparency. Buyers feel more confident making offers, 
            often resulting in faster sales and better prices. Some sellers even use the 
            inspection report as a marketing tool.
          </p>
          <p>
            Our pre-listing inspection includes the same comprehensive evaluation as our 
            pre-purchase inspections. We'll identify issues ranging from minor maintenance 
            items to major concerns, giving you the opportunity to make repairs or disclose 
            known conditions to potential buyers.
          </p>
        </div>
      }
      whatWeInspect={[
        "Foundation and structural integrity",
        "Roof condition and remaining life",
        "Exterior cladding and trim",
        "Windows, doors, and weatherstripping",
        "Electrical panel and wiring",
        "Plumbing system and water heater",
        "HVAC efficiency and condition",
        "Attic insulation and ventilation",
        "Basement moisture and drainage",
        "Kitchen and bathroom fixtures",
        "Safety devices and smoke detectors",
        "Deck and patio structures",
        "Grading and water drainage",
        "Garage door and opener",
      ]}
      features={[
        {
          title: "Seller-Focused Report",
          description: "Our reports are formatted to be shared with potential buyers, highlighting the home's condition in a professional, factual manner."
        },
        {
          title: "Repair Priority List",
          description: "We provide a prioritized list of repairs categorized by urgency and impact on sale, helping you focus your pre-sale improvements."
        },
        {
          title: "Cost-Effective Upgrades",
          description: "Get recommendations for cost-effective repairs and upgrades that can improve your home's appeal and marketability."
        },
        {
          title: "Confidence Building",
          description: "Provide buyers with a professional inspection report to reduce their concerns and speed up the closing process."
        },
      ]}
      benefits={[
        "Sell faster with fewer surprises",
        "Justify your asking price",
        "Avoid last-minute negotiations",
        "Build buyer confidence",
        "Control the repair process",
        "Reduce legal liability",
        "Shareable digital report",
        "Optional re-inspection after repairs",
      ]}
      faqs={[
        {
          question: "Why should sellers get an inspection?",
          answer: "A pre-listing inspection helps you identify and fix issues before buyers discover them. This prevents deals from falling through and gives you more control over the selling process."
        },
        {
          question: "Should I fix everything the inspection finds?",
          answer: "Not necessarily. Focus on safety issues and major defects. Minor items can be disclosed or offered as credits. We'll help you prioritize what's worth fixing."
        },
        {
          question: "Can buyers still request their own inspection?",
          answer: "Yes, and they likely will. However, having your own inspection report shows transparency and often results in smoother negotiations since there are fewer surprises."
        },
        {
          question: "How soon before listing should I get inspected?",
          answer: "Ideally 2-4 weeks before listing. This gives you time to make repairs if needed and have documentation ready when you go to market."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "WETT Inspection", href: "/services/wett" },
      ]}
    />
  );
}
