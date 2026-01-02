import { Home } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function PrePurchase() {
  return (
    <ServicePageTemplate
      title="Pre-Purchase Inspection"
      metaTitle="Pre-Purchase Home Inspection Ontario | Same-Day Report"
      metaDescription="Buying a home? Our certified inspectors find hidden defects with thermal imaging. Get your detailed report delivered the same day."
      heroTitle="Pre-Purchase Home Inspection"
      heroSubtitle="Make informed buying decisions with a comprehensive property evaluation. Identify issues before you buy and negotiate with confidence."
      icon={Home}
      price="From $399"
      duration="2-4 hours"
      description={
        <div className="space-y-4">
          <p>
            A pre-purchase home inspection is the most important step in the home buying process. 
            Our certified inspectors conduct a thorough evaluation of the property's condition, 
            identifying existing issues and potential problems that could cost you thousands of dollars.
          </p>
          <p>
            We examine over 200 components of the home, from the foundation to the roof, 
            providing you with a detailed report that includes photos, descriptions, and 
            recommendations. This information empowers you to make an informed decision about 
            your purchase and negotiate repairs or price adjustments with the seller.
          </p>
          <p>
            Our inspectors are InterNACHI certified and have years of experience in residential 
            construction. We use the latest technology including thermal imaging cameras to 
            detect hidden issues that aren't visible to the naked eye.
          </p>
        </div>
      }
      whatWeInspect={[
        "Foundation and structural components",
        "Roof, gutters, and downspouts",
        "Exterior siding and trim",
        "Windows and doors",
        "Electrical system and panel",
        "Plumbing system and fixtures",
        "HVAC systems",
        "Attic insulation and ventilation",
        "Basement and crawl spaces",
        "Kitchen appliances",
        "Bathroom fixtures and ventilation",
        "Garage and attached structures",
        "Grading and drainage",
        "Decks, patios, and walkways",
      ]}
      features={[
        {
          title: "200+ Point Inspection",
          description: "Our comprehensive checklist covers every major system and component of the home, ensuring nothing is overlooked during the evaluation."
        },
        {
          title: "Same-Day Digital Report",
          description: "Receive your detailed inspection report within 24 hours, complete with photos, descriptions, and prioritized recommendations."
        },
        {
          title: "Thermal Imaging Included",
          description: "We use infrared cameras to detect hidden moisture, insulation gaps, and electrical hot spots that aren't visible to the naked eye."
        },
        {
          title: "On-Site Consultation",
          description: "Walk through the property with our inspector as they explain findings in real-time. Ask questions and understand the home's condition."
        },
      ]}
      benefits={[
        "InterNACHI certified inspectors",
        "Same-day report delivery",
        "Thermal imaging included",
        "100% satisfaction guarantee",
        "Weekend and evening availability",
        "Detailed repair cost estimates",
        "Phone support after inspection",
        "Client attends inspection",
      ]}
      faqs={[
        {
          question: "How long does a pre-purchase inspection take?",
          answer: "A typical home inspection takes 2-4 hours depending on the size and age of the property. Larger homes or homes with more issues may take longer."
        },
        {
          question: "Should I attend the inspection?",
          answer: "Yes! We encourage all buyers to attend the last hour of the inspection. This allows you to see any issues firsthand and ask questions about the property."
        },
        {
          question: "What if the inspection reveals problems?",
          answer: "Finding problems is exactly why you get an inspection. You can use the report to negotiate repairs with the seller, ask for a price reduction, or in some cases, walk away from the deal."
        },
        {
          question: "How soon can you inspect my property?",
          answer: "We offer same-day and next-day appointments when available. During busy periods, we recommend booking 2-3 days in advance."
        },
      ]}
      relatedServices={[
        { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
        { title: "Condo Inspection", href: "/services/condo" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
      ]}
    />
  );
}
