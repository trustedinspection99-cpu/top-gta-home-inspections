import { Factory } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function Commercial() {
  return (
    <ServicePageTemplate
      title="Commercial Inspection"
      metaTitle="Commercial Property Inspection Ontario | Risk Audit"
      metaDescription="Professional risk assessment for offices and retail. Detailed reports to help you understand property condition and manage risk."
      heroTitle="Commercial Property Inspection in Ontario"
      heroSubtitle="Protect your business investment with comprehensive commercial property assessments. Multi-unit, retail, office, and industrial inspections."
      icon={Factory}
      price="Custom Quote"
      duration="Varies by size"
      description={
        <div className="space-y-4">
          <p>
            Commercial property inspections require expertise beyond residential evaluations. 
            Our commercial inspectors understand the unique systems, codes, and concerns 
            associated with commercial, industrial, and multi-unit residential properties.
          </p>
          <p>
            Whether you're purchasing an office building, retail space, industrial warehouse, 
            or multi-unit apartment building, we provide thorough assessments that help you 
            understand the property's condition and potential capital expenditures.
          </p>
          <p>
            Our commercial inspections can be customized to meet your specific needs, from 
            basic property condition assessments to detailed due diligence reports for 
            investment properties. We work with investors, property managers, and business 
            owners across the GTA.
          </p>
        </div>
      }
      whatWeInspect={[
        "Structural systems and foundation",
        "Roof systems and drainage",
        "Building envelope and cladding",
        "Commercial HVAC systems",
        "Electrical service and distribution",
        "Plumbing and fire suppression",
        "Elevators and mechanical systems",
        "Parking structures and lots",
        "Loading docks and doors",
        "Common areas and accessibility",
        "Life safety systems",
        "Site drainage and grading",
        "Tenant improvements",
        "Code compliance concerns",
      ]}
      features={[
        {
          title: "Customized Scope",
          description: "We tailor our inspection to your specific property type and investment needs, from basic assessments to comprehensive due diligence."
        },
        {
          title: "Capital Reserve Planning",
          description: "Our reports include estimated remaining useful life and replacement costs for major systems, helping with capital planning."
        },
        {
          title: "Investment Analysis",
          description: "We provide insights relevant to commercial investors, including deferred maintenance estimates and potential improvement opportunities."
        },
        {
          title: "Multi-Unit Expertise",
          description: "For apartment buildings, we inspect representative units and all common systems, providing a comprehensive property overview."
        },
      ]}
      benefits={[
        "Commercial property specialists",
        "Flexible scheduling",
        "Customized reporting",
        "Capital planning support",
        "Multi-property discounts",
        "Investor-focused insights",
        "Quick turnaround available",
        "Professional liability insured",
      ]}
      faqs={[
        {
          question: "How long does a commercial inspection take?",
          answer: "Duration varies significantly based on property size and type. A small retail space might take 2-3 hours, while a large industrial building could take a full day or more."
        },
        {
          question: "Do you inspect all units in an apartment building?",
          answer: "We typically inspect a representative sample of units (usually 10-20%) plus all common areas and systems. Full unit inspections are available upon request."
        },
        {
          question: "What's the difference from a Phase I ESA?",
          answer: "Our property condition assessment focuses on physical systems and deferred maintenance. Phase I ESAs focus on environmental contamination. Many investors need both."
        },
        {
          question: "Can you provide a cost estimate for repairs?",
          answer: "Yes, we include estimated costs for identified deficiencies and can provide a capital reserve schedule for major systems if requested."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
      ]}
    />
  );
}
