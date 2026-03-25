import { Wind, Thermometer, ShieldAlert, Microscope, Leaf } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function AirQuality() {
  const pageTitle = "Air Quality Testing Ontario | VOC, Mold & Allergens | ASADS";
  const schemaDescription = "Certified air quality testing Ontario from $249. Lab analysis for VOCs, mold spores & allergens. AIHA accredited. Toronto, GTA & Ontario. Same-day sampling.";

  return (
    <ServicePageTemplate
      title="Air Quality Testing"
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

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Air Quality Testing by City — Toronto & Ontario</h3>
            <p className="text-slate-700 mb-6">Indoor air quality concerns vary by city, housing era, and local environment. Here is what our inspectors most commonly find across Ontario's major markets.</p>
            <div className="space-y-4">
              {[
                {
                  city: "Air Quality Testing — Toronto",
                  body: "Toronto's diverse housing stock creates a wide range of indoor air quality concerns. High-rise condominiums along the downtown core and midtown corridors present VOC off-gassing from new finishes, inadequate fresh air exchange in sealed building envelopes, and particulate infiltration from urban traffic and construction. Toronto's older detached housing stock in Etobicoke, North York, Scarborough, and East York — particularly post-war bungalows — commonly presents elevated mold spore counts from poor attic ventilation, basement moisture, and aging HVAC systems with contaminated ductwork. Radon infiltration through foundation cracks is a growing concern in Toronto's lower-level living spaces. ASADS provides same-day air quality testing across all Toronto neighbourhoods including Etobicoke, North York, Scarborough, East York, and the downtown core.",
                },
                {
                  city: "Air Quality Testing — Hamilton",
                  body: "Hamilton's industrial heritage and geography create unique indoor air quality challenges not found elsewhere in the GTA. Properties near Hamilton's steel industry corridor on the waterfront can exhibit elevated particulate infiltration and VOC readings linked to ambient industrial emissions — a concern particularly for homes and commercial properties in the lower city and near the Escarpment face. Hamilton's older housing stock — much of it pre-1960 — also presents elevated mold spore risks from aging building envelopes, lead paint dust from deteriorating surfaces, and asbestos fibre release from deteriorating insulation. ASADS provides comprehensive indoor air quality testing in Hamilton, Stoney Creek, Dundas, Ancaster, and Binbrook, with same-day sampling and AIHA-accredited lab analysis.",
                },
                {
                  city: "Air Quality Testing — Brampton & Mississauga",
                  body: "Brampton and Mississauga's residential markets present air quality concerns primarily driven by the age of the housing stock and renovation activity. Brampton's large tracts of 1970s through 1990s housing contain original HVAC equipment approaching end-of-life, where contaminated evaporator coils, mold-colonized drain pans, and deteriorated duct liner distribute airborne contaminants throughout the home. Mississauga's Port Credit, Cooksville, and Malton neighbourhoods — older housing near the lake — present basement mold and VOC concerns from below-grade finished spaces with inadequate ventilation. New construction areas in both cities can exhibit elevated formaldehyde and VOC levels from fresh cabinetry, flooring adhesives, and spray foam insulation in the first 12–18 months after occupancy.",
                },
                {
                  city: "Air Quality Testing — York Region (Markham, Vaughan, Richmond Hill, Newmarket)",
                  body: "York Region's mix of new construction and established housing presents two distinct air quality profiles. Markham and Vaughan's newer subdivisions — particularly homes built within the last five years — are sealed building envelopes where fresh-build VOC off-gassing from engineered wood products, adhesives, and coatings can be significantly elevated. Without adequate HRV ventilation, these compounds accumulate to levels that cause headaches, eye irritation, and chronic fatigue. Older areas of Richmond Hill, Thornhill, and Newmarket present the classic pre-1990 concerns: attic mold from bathroom fan exhaust vented into attic spaces, basement particulate from crawl space vapour barrier failures, and allergen accumulation in ductwork from decades of use. ASADS provides professional air quality assessment across all of York Region with same-day scheduling.",
                },
                {
                  city: "Air Quality Testing — Barrie & Simcoe County",
                  body: "Barrie and Simcoe County's cold climate creates year-round indoor air quality pressures not seen in southern Ontario. Extended heating seasons mean Barrie homes run with windows sealed for 6-7 months of the year — dramatically reducing natural air exchange and allowing VOCs, carbon dioxide, and airborne particulates to accumulate. Radon levels in Barrie and surrounding Simcoe County are among the highest in Ontario due to the region's granite and uranium-bearing bedrock, making radon testing an essential component of any Barrie air quality assessment. ASADS provides comprehensive air quality testing across Barrie, Innisfil, Collingwood, Midland, Orillia, and all of Simcoe County.",
                },
              ].map((item) => (
                <div key={item.city} className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{item.city}</h4>
                  <p className="text-sm text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
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
        { title: "Designated Substance Survey", href: "/services/designated-substance-survey" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
        { title: "Radon Testing", href: "/services/radon-testing" },
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
      ]}
    />
  );
}
