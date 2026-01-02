import { Search } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function MoldInspection() {
  return (
    <ServicePageTemplate
      title="Mold Inspection"
      metaTitle="Mold Inspection & Testing Ontario | Certified Experts"
      metaDescription="Professional mold and moisture detection. We identify air quality risks and hidden growth to keep your Ontario home safe."
      heroTitle="Mold Inspection & Testing"
      heroSubtitle="Identify hidden mold growth and moisture issues. Comprehensive visual inspection combined with air sampling for accurate assessment."
      icon={Search}
      price="From $299"
      duration="2-3 hours"
      description={
        <div className="space-y-4">
          <p>
            Mold can cause serious health problems and significant property damage if left 
            untreated. Our professional mold inspections identify visible mold growth, 
            hidden mold behind walls, and the moisture conditions that allow mold to thrive.
          </p>
          <p>
            We use a combination of visual inspection, moisture meters, thermal imaging, 
            and air sampling to provide a complete picture of your home's mold situation. 
            Air samples are analyzed by an accredited laboratory to identify mold species 
            and concentration levels.
          </p>
          <p>
            Whether you're dealing with a known mold problem, buying a home, or concerned 
            about indoor air quality, our mold inspection provides the answers you need 
            to protect your health and property.
          </p>
        </div>
      }
      whatWeInspect={[
        "Visible mold growth areas",
        "Hidden mold behind surfaces",
        "Moisture levels in materials",
        "Water damage history",
        "HVAC system and ductwork",
        "Basement and crawl spaces",
        "Bathroom ventilation",
        "Window condensation areas",
        "Attic ventilation",
        "Plumbing leak sources",
        "Foundation moisture intrusion",
        "Humidity levels throughout",
      ]}
      features={[
        {
          title: "Air Quality Sampling",
          description: "We collect air samples from multiple locations including outdoor baseline samples. Samples are analyzed by an accredited lab for mold species identification."
        },
        {
          title: "Moisture Detection",
          description: "Using moisture meters and thermal imaging, we identify hidden moisture that could lead to mold growth, even behind walls and ceilings."
        },
        {
          title: "Lab Analysis Report",
          description: "Receive detailed laboratory results identifying mold species, spore counts, and comparison to outdoor levels to assess significance."
        },
        {
          title: "Remediation Guidance",
          description: "If mold is found, we provide remediation scope recommendations and can refer you to qualified mold remediation professionals."
        },
      ]}
      benefits={[
        "Accredited lab analysis",
        "Thermal imaging included",
        "Moisture source identification",
        "Species identification",
        "Remediation scope guidance",
        "Health protection focus",
        "Insurance documentation",
        "Re-testing after remediation",
      ]}
      faqs={[
        {
          question: "How do I know if I have mold?",
          answer: "Signs include musty odors, visible growth, water stains, or health symptoms like allergies or respiratory issues that improve when away from home. Testing provides definitive answers."
        },
        {
          question: "Is all mold dangerous?",
          answer: "Not all mold is equally harmful, but any indoor mold growth indicates excess moisture and should be addressed. Some species like Stachybotrys (black mold) are particularly concerning."
        },
        {
          question: "Should I test before buying a home?",
          answer: "If you see water stains, smell mustiness, or the home has a history of water damage, mold testing is highly recommended as part of your due diligence."
        },
        {
          question: "How long does lab analysis take?",
          answer: "Standard lab results are typically available within 3-5 business days. Rush analysis is available for an additional fee if needed."
        },
      ]}
      relatedServices={[
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
      ]}
    />
  );
}
