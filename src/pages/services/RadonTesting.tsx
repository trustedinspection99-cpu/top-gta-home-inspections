import { Thermometer } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function RadonTesting() {
  return (
    <ServicePageTemplate
      title="Radon Testing"
      metaTitle="Radon Testing for Homes in Ontario | ASADS"
      metaDescription="Protect your family from radon gas. Accurate professional testing to assess indoor air safety and health risks in your home."
      heroTitle="Radon Gas Testing"
      heroSubtitle="Protect your family from radon, an invisible radioactive gas that's the #1 cause of lung cancer in non-smokers. Professional testing with certified equipment."
      icon={Thermometer}
      price="From $149"
      duration="48-96 hours"
      description={
        <div className="space-y-4">
          <p>
            Radon is a naturally occurring radioactive gas that seeps into homes from the 
            ground. It's colorless, odorless, and tasteless – making it impossible to detect 
            without proper testing. According to Health Canada, radon is the second leading 
            cause of lung cancer after smoking.
          </p>
          <p>
            Many areas in Ontario, including parts of the GTA, have elevated radon levels. 
            The only way to know if your home has a radon problem is to test. We use 
            professional-grade continuous radon monitors that provide accurate readings 
            over a 48-96 hour testing period.
          </p>
          <p>
            If elevated radon levels are detected, mitigation is straightforward and effective. 
            We can recommend qualified radon mitigation professionals who can reduce levels 
            by up to 99% with proper remediation systems.
          </p>
        </div>
      }
      whatWeInspect={[
        "Basement radon levels",
        "Main living area testing",
        "Multiple floor comparison",
        "Entry point identification",
        "Foundation crack assessment",
        "Sump pit evaluation",
        "Floor drain inspection",
        "Ventilation assessment",
      ]}
      features={[
        {
          title: "Continuous Monitoring",
          description: "Our professional-grade monitors take readings every hour for 48-96 hours, providing accurate average concentrations and identifying any tampering."
        },
        {
          title: "Certified Equipment",
          description: "We use NRPP-listed continuous radon monitors that are calibrated annually for accuracy and reliability."
        },
        {
          title: "Detailed Reporting",
          description: "Receive a comprehensive report including hourly readings, averages, Health Canada guidelines, and recommendations if levels exceed safe thresholds."
        },
        {
          title: "Real Estate Compliant",
          description: "Our testing protocol meets real estate transaction requirements, providing the documentation needed for property sales."
        },
      ]}
      benefits={[
        "Health Canada protocol compliant",
        "Professional-grade monitors",
        "Tamper-evident devices",
        "48-96 hour testing period",
        "Quick results turnaround",
        "Mitigation recommendations",
        "Protect your family",
        "Real estate ready",
      ]}
      faqs={[
        {
          question: "How common is radon in Ontario?",
          answer: "Health Canada estimates that 1 in 5 Ontario homes has radon levels above the recommended guideline of 200 Bq/m³. Some areas have higher rates than others."
        },
        {
          question: "When is the best time to test for radon?",
          answer: "Radon levels are typically highest in fall and winter when homes are closed up. However, testing can be done year-round with proper closed-house conditions."
        },
        {
          question: "What if my home has high radon?",
          answer: "Radon mitigation is highly effective. A sub-slab depressurization system can reduce levels by up to 99%. We can refer you to certified mitigation professionals."
        },
        {
          question: "Can I do the test myself?",
          answer: "DIY test kits exist, but professional testing is more accurate and provides documentation accepted for real estate transactions. Our monitors also detect tampering."
        },
      ]}
      relatedServices={[
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
      ]}
    />
  );
}
