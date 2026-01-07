import { Microscope, ShieldAlert, Droplets, FlaskConical, ClipboardList, ThermometerSnowflake } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function MoldInspection() {
  const pageTitle = "Mold Testing Toronto | AIHA-Certified Lab Analysis | ASADS";
  const schemaDescription = "Professional mold testing and air quality analysis in Toronto. PCR DNA testing for 36+ species including toxic black mold. Same-day results available.";

  return (
    <ServicePageTemplate
      title="Mold Testing & Air Quality Analysis"
      metaTitle={pageTitle}
      metaDescription={schemaDescription}
      heroTitle="Scientific Mold Detection & Lab-Certified Results"
      heroSubtitle="Protect your health with AIHA-certified laboratory analysis. We detect toxic black mold, hidden moisture, and airborne spore concentrations with 99.9% accuracy."
      icon={Microscope}
      price="From $349"
      duration="2-3 Hours + Lab Time"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            Mold isn't just a property issue—it's a significant health risk. Our Toronto-based specialists go beyond visual checks, utilizing <strong>AIHA-accredited laboratory analysis</strong> and DNA-based <strong>PCR testing</strong> to identify 36+ mold species, including toxigenic <em>Stachybotrys</em> (Black Mold).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center text-center p-5 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
              <FlaskConical className="text-purple-600 mb-2" size={32} />
              <h4 className="font-bold text-purple-900">Lab Certified</h4>
              <p className="text-xs text-purple-800">Samples analyzed by AIHA-accredited labs following strict ISO standards for legal and insurance validity.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <ThermometerSnowflake className="text-blue-600 mb-2" size={32} />
              <h4 className="font-bold text-blue-900">Thermal Imaging</h4>
              <p className="text-xs text-blue-800">Infrared technology identifies hidden moisture patterns inside walls before mold becomes visible.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 bg-red-50 rounded-xl border border-red-100 shadow-sm">
              <ShieldAlert className="text-red-600 mb-2" size={32} />
              <h4 className="font-bold text-red-900">Health First</h4>
              <p className="text-xs text-red-800">Specialized protocols for clients experiencing respiratory issues, allergies, or chronic fatigue.</p>
            </div>
          </div>

          

          <p>
            Whether you are legalizing a basement apartment, dealing with an insurance claim, or protecting a sensitive family member, our detailed reports provide the <strong>spore count quantification</strong> and <strong>species identification</strong> necessary for a professional remediation roadmap.
          </p>
        </div>
      }
      whatWeInspect={[
        "Airborne Spore Count (Indoor vs. Outdoor)",
        "Toxic Species Identification (Stachybotrys/Aspergillus)",
        "Wall Cavity Moisture Profiling",
        "HVAC Ductwork & Filter Contamination",
        "Sump Pit & Floor Drain Bacteria/Mold",
        "Attic Sheathing & Insulation Moisture",
        "Basement Foundation Efflorescence",
        "Window Seal & Condensation Analysis",
        "Hidden Growth via Infrared Scanning",
        "Relative Humidity & Dew Point Mapping",
        "Surface Swab & Tape-Lift Sampling",
        "Post-Remediation Clearance Testing",
      ]}
      features={[
        {
          title: "PCR DNA Analysis",
          description: "Our high-sensitivity DNA testing identifies exactly which species are present, critical for medical professionals treating mold-related illnesses."
        },
        {
          title: "Infrared Moisture Mapping",
          description: "We use FLIR thermal cameras to track 'cold spots' that indicate active leaks or condensation issues hidden behind drywall."
        },
        {
          title: "Court-Admissible Reports",
          description: "Our documentation meets the standards required for Toronto real estate litigation, insurance claims, and landlord-tenant disputes."
        },
        {
          title: "Clearance Certificates",
          description: "After cleaning, we perform 'Clearance Testing' to provide a certificate of air quality, ensuring the remediation was 100% successful."
        },
      ]}
      benefits={[
        "AIHA-Accredited Lab Partners",
        "Same-Day Preliminary Results",
        "36+ Mold Species Profiled",
        "ERMI & HERTSMI-2 Scoring Available",
        "Detailed Remediation Protocols",
        "Insurance-Ready Documentation",
        "Advanced FLIR Thermal Scanning",
        "PCR DNA Technology",
      ]}
      faqs={[
        {
          question: "Can I just use a hardware store mold kit?",
          answer: "Hardware store 'settle plate' kits are notoriously unreliable. They only show that spores exist (which they do in every home). Our calibrated air pumps measure the exact concentration of spores per cubic meter, which is the only way to determine if a health risk exists."
        },
        {
          question: "How long until I get the results?",
          answer: "On-site sampling takes about 2 hours. Standard lab turnaround is 3-5 business days, but we offer a 24-hour 'Rush' service for urgent health or real estate deadlines."
        },
        {
          question: "What is 'Black Mold' and is it in my home?",
          answer: "Stachybotrys chartarum (Black Mold) is a toxigenic species that thrives on high-cellulose materials like drywall. It requires professional identification because it is often hidden and doesn't always show up on simple air tests without aggressive sampling."
        },
        {
          question: "Does insurance cover mold testing?",
          answer: "If the mold is a result of a sudden pipe burst or flood, insurance often covers the testing and remediation. We provide the certified lab reports required to open a claim."
        },
      ]}
      relatedServices={[
        { title: "Air Quality Testing", href: "/services/air-quality" },
        { title: "Asbestos Testing", href: "/services/asbestos-testing" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Radon Testing", href: "/services/radon-testing" },
      ]}
    />
  );
}
