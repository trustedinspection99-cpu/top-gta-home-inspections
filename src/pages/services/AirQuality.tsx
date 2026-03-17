import { Wind, Thermometer, ShieldAlert, Microscope, Leaf } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AirQuality() {
  const pageTitle = "Indoor Air Quality Testing Toronto | VOC & Mold | ASADS";
  const schemaDescription = "Indoor air quality testing in Toronto & GTA from $249. Lab analysis for VOCs, mold spores, allergens & CO2. AIHA accredited. Same-day sampling. Call (647) 801-9311.";

  return (
    <ServicePageTemplate
      title="Indoor Air Quality Testing"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Certified Air Quality Testing & Indoor Air Quality Assessment"
      heroSubtitle="Comprehensive indoor air quality testing for VOCs, allergens, particulates, mold spores, and airborne contaminants. Professional air quality testing across Toronto, Hamilton, Brampton, and the GTA."
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

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">When Should You Test Your Indoor Air Quality?</h3>
            <ul className="space-y-3">
              {[
                "Moving into a newly renovated home — fresh paints, adhesives, flooring, and cabinetry off-gas VOCs for months after installation",
                "Persistent headaches, fatigue, or respiratory symptoms that improve when you leave the building",
                "After water damage or mold remediation to confirm airborne spore counts have returned to acceptable levels",
                "Before or after having work done — painting, flooring installation, or new cabinetry significantly elevates VOC levels",
                "Daycare or school environment concerns where children spend extended time in enclosed spaces",
                "Buying a home with visible mold growth, musty odours, or a history of moisture problems",
                "Older homes with suspected asbestos or lead paint where disturbance may have released fibres or dust into the air",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldAlert className="text-amber-600 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">What Our Air Quality Testing Detects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Volatile Organic Compounds (VOCs)", body: "Formaldehyde, benzene, toluene, and xylene released from adhesives, paint, engineered wood products, and furniture — the most common source of 'new home smell'." },
                { title: "Mold Spores", body: "Airborne fungal spores that indicate active mold colonies growing in the building. Elevated spore counts are a reliable indicator of hidden moisture problems." },
                { title: "Fine Particulate Matter (PM2.5)", body: "Dust, smoke, and combustion particles smaller than 2.5 microns that bypass nasal filters and penetrate deep into lung tissue, causing long-term respiratory harm." },
                { title: "Carbon Dioxide (CO2)", body: "High CO2 levels signal inadequate fresh air ventilation — a common problem in tightly sealed modern homes and commercial spaces with insufficient HVAC makeup air." },
                { title: "Allergens", body: "Airborne pet dander, dust mite allergens, and pollen that trigger allergic reactions and asthma — quantified and compared to Health Canada thresholds." },
                { title: "Carbon Monoxide", body: "Odourless, colourless gas produced by faulty furnaces, water heaters, fireplaces, and attached garages — one of the leading causes of unintentional poisoning deaths in Canada." },
              ].map((card, i) => (
                <div key={i} className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 mb-1">{card.title}</h4>
                  <p className="text-slate-700 text-sm">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Air Quality Testing Process</h3>
            <ol className="space-y-4">
              {[
                { step: "1", title: "Pre-Test Assessment", body: "We review the home's HVAC system, ventilation design, occupancy history, and any recent renovation or water damage events to focus sampling on the most relevant contaminants." },
                { step: "2", title: "Calibrated Air Sampling", body: "Professional Photoacoustic Spectroscopy instruments and accredited air cassette samplers are deployed in multiple rooms simultaneously to capture a statistically representative cross-section of the indoor air." },
                { step: "3", title: "Accredited Lab Analysis", body: "All air cassette samples are sealed, labelled, and transported to a CFIA/AIHA-accredited laboratory within 24 hours of collection to maintain sample integrity." },
                { step: "4", title: "Written Health Report", body: "You receive a full written report comparing every measured parameter to Health Canada Residential Indoor Air Quality Guidelines and ASHRAE standards, with specific remediation recommendations for any exceedances." },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-slate-700 text-sm mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
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
        {
          question: "How long does indoor air quality testing take?",
          answer: "A standard residential air quality test takes 2–3 hours on-site. We set up sampling equipment, allow it to run for the required duration, then collect samples for lab analysis. Results are typically available within 48–72 hours of sample submission."
        },
        {
          question: "What are acceptable indoor air quality levels in Canada?",
          answer: "Health Canada publishes Residential Indoor Air Quality Guidelines for common pollutants. Key thresholds include: formaldehyde below 50 μg/m³, PM2.5 below 10 μg/m³ annually, and radon below 200 Bq/m³. We compare all results to these guidelines in our report."
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
