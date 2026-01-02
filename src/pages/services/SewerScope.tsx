import { Video } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function SewerScope() {
  return (
    <ServicePageTemplate
      title="Sewer Scope Inspection"
      metaTitle="Sewer Scope Inspection | Drain Camera Service"
      metaDescription="Avoid plumbing disasters. Our camera inspections locate blockages and cracks before they become costly failures."
      heroTitle="Sewer Scope Inspection"
      heroSubtitle="See what's hidden underground. Video camera inspection of sewer lines reveals blockages, cracks, root intrusion, and pipe condition."
      icon={Video}
      price="From $249"
      duration="30-60 minutes"
      description={
        <div className="space-y-4">
          <p>
            Sewer line replacement can cost $10,000 to $30,000 or more. A sewer scope 
            inspection gives you a clear view of the condition of underground pipes 
            before you buy a property, potentially saving you from a major unexpected expense.
          </p>
          <p>
            Our technicians insert a waterproof camera into the sewer line, recording 
            video of the entire pipe from house to street. We identify cracks, blockages, 
            root intrusion, bellies (low spots), and deterioration that could lead to 
            backups or failure.
          </p>
          <p>
            Sewer scope inspections are especially important for older homes with clay 
            or cast iron pipes, properties with large trees near the sewer line, or 
            any home with a history of drain problems.
          </p>
        </div>
      }
      whatWeInspect={[
        "Pipe material and condition",
        "Cracks and fractures",
        "Root intrusion",
        "Blockages and debris",
        "Bellies and low spots",
        "Joint separations",
        "Pipe alignment",
        "Connection condition",
        "Corrosion and deterioration",
        "Previous repairs",
        "Pipe diameter changes",
        "Distance to main connection",
      ]}
      features={[
        {
          title: "HD Camera System",
          description: "Our high-definition sewer cameras provide clear images of pipe condition, with self-leveling heads for optimal viewing."
        },
        {
          title: "Complete Video Recording",
          description: "You receive a complete video recording of the inspection that can be shared with contractors or used for insurance claims."
        },
        {
          title: "Distance Tracking",
          description: "Our equipment tracks the camera's distance, allowing us to precisely locate any problems found in the line."
        },
        {
          title: "Clear Reporting",
          description: "Receive a detailed report with screenshots and descriptions of any issues, plus recommendations for repair or maintenance."
        },
      ]}
      benefits={[
        "Avoid surprise repairs",
        "HD video documentation",
        "Precise problem location",
        "Negotiation leverage",
        "Same-day scheduling",
        "Quick turnaround",
        "Contractor referrals",
        "Peace of mind",
      ]}
      faqs={[
        {
          question: "Why should I get a sewer scope inspection?",
          answer: "Sewer line problems are invisible but expensive. Replacement costs $10,000-$30,000+. A $249 inspection can save you from a major unexpected expense."
        },
        {
          question: "What causes sewer line problems?",
          answer: "Tree roots seeking water, ground shifting, corrosion of older pipes, and improper installation are common causes of sewer line failure."
        },
        {
          question: "How do I know if the sewer line needs replacement?",
          answer: "Collapsed sections, severe root intrusion, multiple cracks, or bellied pipes often require replacement. Minor issues may be repairable with lining or spot repairs."
        },
        {
          question: "Is sewer scope included in home inspections?",
          answer: "No, it's a separate service that requires specialized equipment. We recommend it for homes over 25 years old or with trees near the sewer line."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Well Water Testing", href: "/services/well-water-testing" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Commercial Inspection", href: "/services/commercial" },
      ]}
    />
  );
}
