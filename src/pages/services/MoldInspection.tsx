import { Microscope, ShieldAlert, Droplets, FlaskConical, ClipboardList, ThermometerSnowflake } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Link } from "react-router-dom";

export default function MoldInspection() {
  const pageTitle = "Mold Inspection & Mold Testing Toronto | AIHA Certified Lab | Not Remediation | ASADS";
  const schemaDescription = "Certified mold inspection and mold testing in Toronto & GTA — independent third-party assessment, not remediation. AIHA-accredited lab analysis for black mold, basement & HVAC contamination. Air sampling, species ID, and written scope for remediation contractors.";

  return (
    <ServicePageTemplate
      title="Mold Inspection, Testing & Assessment"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Certified Mold Inspection, Testing & Assessment — Lab-Certified Results"
      heroSubtitle={
        <>
          Protect your home and health with AIHA-certified lab testing. We detect toxic black mold, hidden moisture, and water-damage-related spores with 99.9% accuracy.  
          <br />
          <Link to="/services/pre-purchase" className="text-blue-600 underline">
            Pre-Purchase Home Inspections
          </Link>{" "}
          and{" "}
          <Link to="/services/pre-listing" className="text-blue-600 underline">
            Pre-Listing Inspections
          </Link>{" "}
          integrate mold checks for buyer and seller confidence.
        </>
      }
      icon={Microscope}
      price="From $349"
      duration="2-3 Hours + Lab Analysis"
      description={
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-2">
            <p className="text-blue-900 text-sm font-medium">
              <strong>Inspection & testing only — not remediation.</strong> ASADS is an independent third-party inspector. We do not perform mold removal, which means our assessments are fully unbiased. We provide the written scope of work that licensed remediation contractors use to quote your job.
            </p>
          </div>
          <p className="text-lg leading-relaxed text-slate-700">
            Mold isn't just a property issue — it's a health risk. Our Toronto specialists go beyond visual checks, providing <strong>AIHA-accredited lab analysis</strong> and <strong>PCR DNA testing</strong> for 36+ species, including toxigenic <em>Stachybotrys</em> (Black Mold). Emergency mold inspections and same-day services are available for urgent concerns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
              <FlaskConical className="text-purple-600 mb-2" size={32} />
              <h4 className="font-bold text-purple-900">Lab Certified</h4>
              <p className="text-xs text-purple-800">AIHA-accredited lab testing ensures accurate results for legal, insurance, and health purposes.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <ThermometerSnowflake className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Infrared Moisture Scan</h4>
              <p className="text-xs text-blue-800">Detect hidden water damage behind walls, ceilings, and attics before mold spreads.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
              <ShieldAlert className="text-red-600 mb-2" size={32} />
              <h4 className="font-bold text-red-900">Health-Focused</h4>
              <p className="text-xs text-red-800">Specialized protocols for clients with respiratory issues, allergies, or chronic fatigue.</p>
            </div>
          </div>

          <p>
            Whether it's a water-damaged basement, attic mold, or a home being prepped for sale, our reports provide <strong>species identification</strong> and <strong>spore quantification</strong> to guide safe remediation.
            We prioritize urgent, local cases with "mold inspection near me" and "emergency mold testing" options for fast bookings.
          </p>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">When Should You Get a Mold Inspection?</h3>
            <ul className="space-y-2">
              {[
                "Visible mold or mildew anywhere in the home",
                "Musty odours especially in basement or HVAC",
                "After any water damage or flooding",
                "If occupants have unexplained respiratory symptoms",
                "Buying a home with evidence of past water intrusion",
                "After remediation work to confirm clearance",
                "Homes with finished basements and history of humidity problems",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ShieldAlert className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Common Mold Problems in GTA Homes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Basement Rim Joist Mold",
                  body: "Condensation and air leakage causes mold behind insulation in the band joist. Very common in Toronto semi-detached homes.",
                },
                {
                  title: "HVAC & Air Handler Contamination",
                  body: "Mold colonizes drain pans, evaporator coils, and duct liner, spreading spores throughout the home.",
                },
                {
                  title: "Attic Mold",
                  body: "Inadequate ventilation or bath fan vented into the attic causes mold on roof sheathing, potentially affecting the entire roof structure.",
                },
                {
                  title: "Bathroom & Kitchen Caulking",
                  body: "Chronic moisture allows Cladosporium and Penicillium growth in grout and around tubs.",
                },
                {
                  title: "Window Frame Condensation Mold",
                  body: "Single-pane or poorly sealed windows in Toronto winters create perfect mold growth conditions.",
                },
                {
                  title: "Crawl Space Moisture",
                  body: "Ground moisture and lack of vapour barrier creates a high-RH environment conducive to mold on floor joists.",
                },
              ].map((card) => (
                <div key={card.title} className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">{card.title}</h4>
                  <p className="text-sm text-slate-700">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Mold Inspection Process</h3>
            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Visual Assessment & Moisture Mapping",
                  body: "We use a FLIR thermal camera and calibrated moisture meters to find hidden wet areas without opening walls.",
                },
                {
                  step: "2",
                  title: "Air Cassette Sampling",
                  body: "A calibrated pump draws air through cassette filters. Samples are taken inside the home and outside as a control baseline.",
                },
                {
                  step: "3",
                  title: "AIHA-Accredited Lab Analysis",
                  body: "Samples are analyzed using Spore Trap or PCR/DNA method depending on requirements. Results in 24–72 hours.",
                },
                {
                  step: "4",
                  title: "Written Report & Remediation Scope",
                  body: "Results are compared to the outdoor baseline. If elevated, we provide a written remediation scope of work for contractor tender.",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-700">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">What If Mold Is Found?</h3>
            <ul className="space-y-2">
              {[
                "Minor mold (under 1 m²) can often be cleaned by a homeowner following Health Canada guidelines.",
                "Larger infestations require a licensed remediation contractor.",
                "We provide the scope of work document contractors need to quote.",
                "In real estate, a mold report is grounds for price reduction or seller-paid remediation.",
                "We offer post-remediation clearance testing to confirm the job is complete.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Droplets className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      whatWeInspect={[
        "Airborne Spore Count (Indoor vs Outdoor)",
        "Toxic Species Identification (Stachybotrys, Aspergillus)",
        "Hidden Wall & Ceiling Moisture",
        "HVAC Ductwork Contamination",
        "Sump Pit & Floor Drain Mold",
        "Attic Insulation & Sheathing Mold",
        "Basement Foundation Efflorescence",
        "Window Condensation & Seal Analysis",
        "Infrared Detection of Hidden Growth",
        "Relative Humidity & Dew Point Mapping",
        "Surface Swab & Tape-Lift Sampling",
        "Post-Remediation Clearance Testing",
      ]}
      features={[
        {
          title: "PCR DNA Analysis",
          description: "Identify the exact species for precise remediation and medical risk assessment."
        },
        {
          title: "Infrared Moisture Mapping",
          description: "Track hidden leaks and condensation before visible mold develops."
        },
        {
          title: "Court & Insurance Admissible Reports",
          description: "Certified documentation accepted for real estate disputes, insurance claims, and tenant-landlord issues."
        },
        {
          title: "Clearance Certificates",
          description: "Post-remediation testing ensures mold has been safely removed, with official documentation."
        },
      ]}
      benefits={[
        "Certified AIHA Lab Partners",
        "Emergency Mold Inspection Available",
        "Same-Day Preliminary Results",
        "36+ Mold Species Tested",
        "ERMI & HERTSMI-2 Scoring",
        "Detailed Remediation Roadmaps",
        "Insurance-Ready Documentation",
        "Infrared Thermal Scanning & PCR DNA Testing",
      ]}
      faqs={[
        {
          question: "Can I just use a hardware store mold kit?",
          answer: "Hardware store kits are unreliable and cannot quantify spores. Our calibrated testing measures exact concentrations for health safety."
        },
        {
          question: "How long until mold test results are ready?",
          answer: "On-site sampling is 2 hours. Standard lab analysis takes 3-5 business days, with 24-hour rush options for urgent cases."
        },
        {
          question: "Is 'Black Mold' present in my home?",
          answer: "Stachybotrys chartarum requires professional sampling. It often hides behind drywall and isn't reliably detected with simple air tests."
        },
        {
          question: "Will insurance cover mold testing?",
          answer: "Yes, if mold results from a sudden water event. Certified reports help with claims."
        },
        {
          question: "How much does mold inspection cost in Toronto?",
          answer: "Professional mold inspection in Toronto starts from $349, which includes air sampling and lab analysis. Emergency and same-day services are available for urgent concerns."
        },
        {
          question: "How is mold testing different from a visual mold inspection?",
          answer: "A visual inspection identifies visible mold growth. Air sampling goes further — it quantifies airborne spore concentrations even when mold is hidden behind walls, in HVAC systems, or in insulation. A property can have hidden mold colonies with no visible signs. Lab-confirmed air sampling is the only way to know if spore counts are elevated."
        },
        {
          question: "What mold species are most dangerous?",
          answer: "Stachybotrys chartarum (black mold) produces mycotoxins and is associated with serious health effects. However, common species like Aspergillus, Penicillium, and Cladosporium are far more prevalent in GTA homes and can cause respiratory irritation, allergies, and asthma at elevated concentrations. Our lab report identifies species and spore counts for each."
        },
        {
          question: "Do I need a post-remediation test after mold removal?",
          answer: "Yes — a clearance test after remediation is the only way to confirm the work was successful. We take post-remediation air samples and compare them to pre-remediation baselines and outdoor control samples. Without a clearance test, you have no documented proof the mold problem was resolved — which can cause issues when reselling the property."
        },
      ]}
      relatedServices={[
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
      ]}
    />
  );
}
