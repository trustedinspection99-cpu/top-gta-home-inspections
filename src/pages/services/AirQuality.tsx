import { Wind, Thermometer, ShieldAlert, Microscope, Leaf } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AirQuality() {
  const pageTitle = "Indoor Air Quality Testing Toronto | VOC & Allergen Analysis | ASADS";
  const schemaDescription = "Professional indoor air quality testing in Toronto & GTA. Laboratory analysis for VOCs, allergens, particulates, and pollutants. Protect your family's health with certified air testing.";

  return (
    <ServicePageTemplate
      title="Indoor Air Quality Testing"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Breathe Easier: Certified Air Quality Analysis"
      heroSubtitle="Comprehensive indoor air quality assessment for VOCs, allergens, particulates, and airborne contaminants. Protect your family's health with professional testing."
      icon={Wind}
      price="From $249"
      duration="2-4 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            We spend up to 90% of our time indoors, yet indoor air can be <strong>2-5 times more 
            polluted</strong> than outdoor air. Poor indoor air quality has been linked to allergies, 
            asthma, headaches, fatigue, and other chronic health problems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <Microscope className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Lab-Grade Equipment</h4>
              <p className="text-xs text-blue-800">Professional air sampling equipment and real-time monitors for accurate measurements.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-green-50 rounded-xl border border-green-100 shadow-sm">
              <Leaf className="text-green-600 mb-2" size={32} />
              <h4 className="font-bold text-green-900">Comprehensive Testing</h4>
              <p className="text-xs text-green-800">Multiple pollutant categories covered for a complete indoor air quality picture.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
              <ShieldAlert className="text-amber-600 mb-2" size={32} />
              <h4 className="font-bold text-amber-900">Health Protection</h4>
              <p className="text-xs text-amber-800">Identify sources of pollution so you can take targeted action to improve air quality.</p>
            </div>
          </div>

          <p>
            Whether you're experiencing unexplained health symptoms, concerned about 
            new construction off-gassing, or simply want to ensure your home is healthy, 
            our air quality testing provides the answers you need with actionable recommendations.
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
          question: "What symptoms indicate poor indoor air quality?",
          answer: "Symptoms include headaches, fatigue, allergies, respiratory issues, and eye/throat irritation that improve when you leave the building. Chronic exposure can lead to more serious health conditions."
        },
        {
          question: "What are VOCs and why do they matter?",
          answer: "Volatile organic compounds are chemicals released by paints, cleaning products, new furniture, and building materials. High levels can cause short-term irritation and long-term health problems."
        },
        {
          question: "How can I improve my indoor air quality?",
          answer: "Common improvements include increasing ventilation, using air purifiers with HEPA filters, reducing chemical products, controlling humidity levels, and regular cleaning with low-VOC products."
        },
        {
          question: "Is new home air quality worse than older homes?",
          answer: "Often yes – new construction materials off-gas VOCs and formaldehyde for months or years. Testing is especially valuable in new or recently renovated homes to ensure safe air quality."
        },
        {
          question: "How much does air quality testing cost in Toronto?",
          answer: "Indoor air quality testing in Toronto starts from $249. Pricing depends on the scope of testing and number of pollutants analyzed. Contact us at (647) 801-9311 for a personalized quote."
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
