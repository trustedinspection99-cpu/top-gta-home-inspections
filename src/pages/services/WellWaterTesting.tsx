import { Droplets } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function WellWaterTesting() {
  return (
    <ServicePageTemplate
      title="Well Water Testing"
      metaTitle="Well Water Testing Toronto & GTA | Private Well Analysis | ASADS"
      metaDescription="Professional well water testing in Toronto & GTA. Comprehensive analysis for bacteria, minerals, and contaminants. Protect your family. From $199."
      heroTitle="Well Water Testing"
      heroSubtitle="Ensure your family's water is safe to drink. Comprehensive laboratory analysis of private wells for bacteria, minerals, and contaminants."
      icon={Droplets}
      price="From $199"
      duration="Sample collection + lab"
      description={
        <div className="space-y-4">
          <p>
            If your home relies on a private well, regular water testing is essential. 
            Unlike municipal water, private wells are not monitored by public health 
            authorities. Well water quality can change seasonally and be affected by 
            agricultural runoff, septic systems, or natural mineral deposits.
          </p>
          <p>
            Our comprehensive well water testing analyzes for bacteria (including E. coli 
            and coliform), nitrates, minerals, pH levels, and other potential contaminants. 
            We follow proper sample collection protocols to ensure accurate laboratory results.
          </p>
          <p>
            Testing is recommended at least annually for existing wells, and essential 
            when buying a property with a private well. We can also test for specific 
            contaminants based on your area's known water quality issues.
          </p>
        </div>
      }
      whatWeInspect={[
        "Total coliform bacteria",
        "E. coli bacteria",
        "Nitrate and nitrite levels",
        "pH and alkalinity",
        "Hardness (calcium/magnesium)",
        "Iron and manganese",
        "Chloride levels",
        "Sulfate content",
        "Total dissolved solids",
        "Arsenic (if requested)",
        "Lead (if requested)",
        "Fluoride levels",
      ]}
      features={[
        {
          title: "Proper Sample Collection",
          description: "We follow strict protocols for sample collection, handling, and transport to ensure accurate laboratory results."
        },
        {
          title: "Accredited Lab Analysis",
          description: "Samples are analyzed by certified laboratories meeting provincial standards for drinking water testing."
        },
        {
          title: "Comprehensive Panels",
          description: "Choose from basic bacteria testing to full mineral and contaminant analysis based on your needs and concerns."
        },
        {
          title: "Treatment Recommendations",
          description: "If problems are found, we provide recommendations for water treatment systems appropriate to your specific issues."
        },
      ]}
      benefits={[
        "Certified lab analysis",
        "Proper collection protocol",
        "Multiple test panels",
        "Health protection",
        "Real estate compliant",
        "Treatment guidance",
        "Annual testing reminders",
        "Fast turnaround",
      ]}
      faqs={[
        {
          question: "How often should I test my well water?",
          answer: "At minimum, test annually for bacteria and nitrates. More comprehensive testing every 3-5 years, or whenever you notice changes in taste, odor, or appearance."
        },
        {
          question: "What are signs of contaminated well water?",
          answer: "Changes in taste, odor, or color can indicate problems. However, many dangerous contaminants like bacteria and nitrates are undetectable without testing."
        },
        {
          question: "Is well water testing required when selling?",
          answer: "While not legally required in all areas, most buyers and lenders request well water testing as a condition of sale. We provide reports suitable for real estate transactions."
        },
        {
          question: "What if my water fails testing?",
          answer: "Many issues can be addressed with treatment systems (filtration, UV sterilization, water softeners). We can recommend solutions based on your specific results."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
      ]}
    />
  );
}
