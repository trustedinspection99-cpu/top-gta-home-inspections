import { Building } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function Condo() {
  return (
    <ServicePageTemplate
      title="Condo Inspection"
      metaTitle="Condo Inspection Toronto & GTA | Townhouse Inspection | ASADS"
      metaDescription="Professional condo and townhouse inspection in Toronto & GTA. Unit-specific evaluation for condos, stacked towns, and lofts. From $299."
      heroTitle="Condo & Townhouse Inspection"
      heroSubtitle="Specialized inspections for condos, townhomes, and stacked townhouses. Know exactly what you're buying inside your unit."
      icon={Building}
      price="From $299"
      duration="1-2 hours"
      description={
        <div className="space-y-4">
          <p>
            Condo inspections require a different approach than traditional home inspections. 
            While the condo corporation is responsible for common elements, you're responsible 
            for everything inside your unit. Our specialized condo inspection focuses on the 
            components that are your responsibility as an owner.
          </p>
          <p>
            We examine all systems and components within your unit, from the electrical panel 
            to plumbing fixtures, HVAC equipment, windows, and appliances. We also look for 
            signs of past water damage, which is one of the most common issues in condos.
          </p>
          <p>
            Our condo inspections are perfect for high-rise apartments, low-rise condos, 
            stacked townhouses, and loft conversions. We understand the unique challenges 
            of each property type and provide relevant, actionable information for your purchase.
          </p>
        </div>
      }
      whatWeInspect={[
        "Electrical panel and outlets",
        "Plumbing fixtures and drains",
        "HVAC system (in-suite)",
        "Hot water heater (if applicable)",
        "Windows and balcony doors",
        "Balcony or terrace condition",
        "Kitchen appliances",
        "Bathroom exhaust fans",
        "Flooring condition",
        "Walls and ceilings for damage",
        "Smoke and CO detectors",
        "Unit entry door and locks",
        "Storage locker (if accessible)",
        "Visible common elements",
      ]}
      features={[
        {
          title: "Unit-Specific Focus",
          description: "We concentrate on components within your unit that are your responsibility, providing relevant information for condo ownership."
        },
        {
          title: "Water Damage Detection",
          description: "Using moisture meters and thermal imaging, we identify past or present water damage from leaks, flooding, or humidity issues."
        },
        {
          title: "Status Certificate Review",
          description: "We can help you understand the status certificate in conjunction with our inspection findings for a complete picture."
        },
        {
          title: "Quick Turnaround",
          description: "Condo inspections typically take 1-2 hours with same-day report delivery, perfect for fast-moving condo markets."
        },
      ]}
      benefits={[
        "Specialized condo expertise",
        "Fast scheduling and reporting",
        "Moisture detection included",
        "Appliance testing",
        "Competitive pricing",
        "Perfect for investors",
        "First-time buyer friendly",
        "Weekend availability",
      ]}
      faqs={[
        {
          question: "Why do condos need inspections?",
          answer: "Even though the building is maintained by the corporation, you're responsible for everything inside your unit. Issues like faulty wiring, plumbing leaks, or damaged windows can be expensive to repair."
        },
        {
          question: "What about the status certificate?",
          answer: "The status certificate covers the building's financial and legal status. Our inspection covers the physical condition of your unit. Both are important for a complete picture."
        },
        {
          question: "Do you inspect common elements?",
          answer: "We note visible issues with common elements you'd use (hallways, garage), but a detailed common element inspection would require condo board approval."
        },
        {
          question: "Can you access my storage locker?",
          answer: "Yes, if you can provide access. We'll inspect the locker condition and note any issues with ventilation, moisture, or security."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "New Construction Inspection", href: "/services/new-construction" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
      ]}
    />
  );
}
