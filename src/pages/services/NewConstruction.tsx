import { Hammer } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function NewConstruction() {
  return (
    <ServicePageTemplate
      title="New Construction Inspection"
      metaTitle="New Construction Inspection Ontario | Tarion Warranty"
      metaDescription="Catch builder defects before your warranty expires. Professional inspections for new Ontario homes ensuring quality and safety."
      heroTitle="New Construction Home Inspection in Ontario"
      heroSubtitle="Don't assume new means perfect. We catch builder defects and incomplete work before your final walkthrough and Tarion warranty registration."
      icon={Hammer}
      price="From $449"
      duration="2-4 hours"
      description={
        <div className="space-y-4">
          <p>
            Just because a home is brand new doesn't mean it's free from defects. In fact, 
            construction defects are common in new builds, from minor cosmetic issues to 
            serious structural problems. Our new construction inspection identifies these 
            issues before you take possession, while the builder is still responsible for repairs.
          </p>
          <p>
            We specialize in pre-delivery inspections (PDI) for new homes in Ontario. Our 
            inspectors understand Tarion warranty requirements and know what builders are 
            obligated to fix. We'll create a comprehensive punch list that you can present 
            to your builder before closing.
          </p>
          <p>
            Our inspection goes far beyond the cursory walkthrough that builders provide. 
            We examine workmanship, building code compliance, and proper installation of 
            all systems. Many defects, like improper grading or missing insulation, aren't 
            visible without professional inspection tools.
          </p>
        </div>
      }
      whatWeInspect={[
        "Foundation and concrete work",
        "Framing quality and alignment",
        "Roof installation and flashing",
        "Siding and exterior finishes",
        "Window and door installation",
        "Electrical system and fixtures",
        "Plumbing and drainage",
        "HVAC installation and ductwork",
        "Insulation and vapor barriers",
        "Drywall and paint finish",
        "Flooring installation",
        "Kitchen and bathroom fixtures",
        "Grading and drainage slopes",
        "Garage and driveway",
      ]}
      features={[
        {
          title: "Detailed Punch List",
          description: "Receive a comprehensive list of defects formatted for builder submission, ensuring all issues are documented and addressed before closing."
        },
        {
          title: "Tarion Warranty Knowledge",
          description: "Our inspectors understand Ontario's Tarion warranty program and can identify issues covered under your 1-year, 2-year, and 7-year warranties."
        },
        {
          title: "Code Compliance Check",
          description: "We verify that construction meets Ontario Building Code requirements, catching violations that municipal inspectors may have missed."
        },
        {
          title: "Photo Documentation",
          description: "Every defect is photographed and documented, providing clear evidence for discussions with your builder."
        },
      ]}
      benefits={[
        "Independent third-party evaluation",
        "Comprehensive punch list for builder",
        "Tarion warranty documentation",
        "Identifies hidden defects",
        "Protects your investment",
        "Leverage for negotiations",
        "Peace of mind at closing",
        "30-day warranty inspection available",
      ]}
      faqs={[
        {
          question: "When should I schedule a new construction inspection?",
          answer: "Schedule the inspection during your pre-delivery inspection (PDI) period, typically 1-2 weeks before closing. This gives the builder time to address issues."
        },
        {
          question: "Doesn't the city inspect new homes?",
          answer: "Municipal inspections are limited in scope and focus on code minimums. Our inspection is much more comprehensive and focuses on quality and completeness."
        },
        {
          question: "What if the builder won't fix something?",
          answer: "We document all defects thoroughly. If the builder refuses legitimate repairs, you can file a claim with Tarion using our inspection report as evidence."
        },
        {
          question: "Do you offer warranty inspections?",
          answer: "Yes! We recommend inspections before your 30-day, 1-year, and 2-year Tarion warranty deadlines to identify issues while they're still covered."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Condo Inspection", href: "/services/condo" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "WETT Inspection", href: "/services/wett" },
      ]}
    />
  );
}
