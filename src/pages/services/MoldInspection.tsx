import { Microscope, ShieldAlert, Droplets, FlaskConical, ClipboardList, ThermometerSnowflake } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function MoldInspection() {
  const pageTitle = "Mold Inspection Toronto | Certified Mold Testing & Remediation | ASADS";
  const schemaDescription = "Urgent mold inspection and air quality testing in Toronto. Certified analysis for black mold, water-damaged areas, and indoor air safety. Same-day and emergency services available.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={schemaDescription} />
      </Helmet>

      <ServicePageTemplate
        title="Mold Inspection & Testing Services"
        metaTitle={pageTitle}
        metaDescription={schemaDescription}
        heroTitle="Certified Mold Inspection Near You – Fast, Accurate, and Lab-Certified"
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
            <p className="text-lg leading-relaxed text-slate-700">
              Mold isn’t just a property issue—it's a health risk. Our Toronto specialists go beyond visual checks, providing <strong>AIHA-accredited lab analysis</strong> and <strong>PCR DNA testing</strong> for 36+ species, including toxigenic <em>Stachybotrys</em> (Black Mold).  
              Emergency mold inspections and same-day services are available for urgent concerns.
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
              Whether it’s a water-damaged basement, attic mold, or a home being prepped for sale, our reports provide <strong>species identification</strong> and <strong>spore quantification</strong> to guide safe remediation. 
              We prioritize urgent, local cases with "mold inspection near me" and "emergency mold testing" options for fast bookings.
            </p>
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
            question: "How long until results are ready?",
            answer: "On-site sampling is 2 hours. Standard lab analysis takes 3-5 business days, with 24-hour rush options for urgent cases."
          },
          {
            question: "Is 'Black Mold' present in my home?",
            answer: "Stachybotrys chartarum requires professional sampling. It often hides behind drywall and isn't reliably detected with simple air tests."
          },
          {
            question: "Will insurance cover testing?",
            answer: "Yes, if mold results from a sudden water event. Certified reports help with claims."
          },
        ]}
        relatedServices={[
          { title: "Air Quality Testing", href: "/services/air-quality" },
          { title: "Thermal Imaging", href: "/services/thermal-imaging" },
          { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
          { title: "Pre-Listing Inspection", href: "/services/pre-listing" },
        ]}
      />
    </>
  );
}
