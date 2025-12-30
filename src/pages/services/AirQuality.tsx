import { Wind } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AirQuality() {
  return (
    <ServicePageTemplate
      title="Air Quality Testing"
      metaTitle="Indoor Air Quality Testing Toronto | IAQ Assessment | ASADS"
      metaDescription="Professional indoor air quality testing in Toronto & GTA. Test for VOCs, allergens, particulates, and more. Protect your family's health. From $249."
      heroTitle="Indoor Air Quality Testing"
      heroSubtitle="Breathe easier with comprehensive indoor air quality assessment. Testing for VOCs, allergens, particulates, and other airborne contaminants."
      icon={Wind}
      price="From $249"
      duration="2-4 hours"
      description={
        <div className="space-y-4">
          <p>
            We spend up to 90% of our time indoors, yet indoor air can be 2-5 times more 
            polluted than outdoor air. Poor indoor air quality has been linked to allergies, 
            asthma, headaches, fatigue, and other health problems.
          </p>
          <p>
            Our comprehensive indoor air quality testing identifies common pollutants 
            including volatile organic compounds (VOCs), particulate matter, allergens, 
            carbon dioxide, and humidity levels. We test throughout your home to identify 
            problem areas and sources.
          </p>
          <p>
            Whether you're experiencing unexplained health symptoms, concerned about 
            new construction off-gassing, or simply want to ensure your home is healthy, 
            our air quality testing provides the answers you need.
          </p>
        </div>
      }
      whatWeInspect={[
        "Volatile organic compounds (VOCs)",
        "Particulate matter (PM2.5, PM10)",
        "Carbon dioxide levels",
        "Carbon monoxide",
        "Relative humidity",
        "Temperature distribution",
        "Formaldehyde",
        "Airborne allergens",
        "Mold spore counts",
        "Dust mite allergens",
        "Pet dander levels",
        "Ventilation adequacy",
      ]}
      features={[
        {
          title: "Professional Equipment",
          description: "We use laboratory-grade air sampling equipment and real-time monitors to accurately measure indoor air quality parameters."
        },
        {
          title: "Comprehensive Testing",
          description: "Our assessments cover multiple pollutant categories, providing a complete picture of your indoor air quality."
        },
        {
          title: "Source Identification",
          description: "We don't just measure pollution levels – we help identify sources so you can take targeted action to improve air quality."
        },
        {
          title: "Actionable Recommendations",
          description: "Receive specific recommendations for improving your indoor air quality, from ventilation changes to product substitutions."
        },
      ]}
      benefits={[
        "Comprehensive pollutant testing",
        "Real-time monitoring",
        "Source identification",
        "Health protection",
        "Improvement recommendations",
        "Before/after comparisons",
        "Ventilation assessment",
        "Peace of mind",
      ]}
      faqs={[
        {
          question: "What symptoms indicate poor air quality?",
          answer: "Symptoms include headaches, fatigue, allergies, respiratory issues, and eye/throat irritation that improve when you leave the building."
        },
        {
          question: "What are VOCs and why do they matter?",
          answer: "Volatile organic compounds are chemicals released by paints, cleaning products, new furniture, and building materials. High levels can cause health problems."
        },
        {
          question: "How can I improve my indoor air quality?",
          answer: "Common improvements include increasing ventilation, using air purifiers, reducing chemical products, controlling humidity, and regular cleaning."
        },
        {
          question: "Is new home air quality worse?",
          answer: "Often yes – new construction materials off-gas VOCs and formaldehyde. Testing is especially valuable in new or recently renovated homes."
        },
      ]}
      relatedServices={[
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
      ]}
    />
  );
}
