import { Flame, ShieldCheck, Thermometer, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function WETT() {
  const pageTitle = "WETT Inspection Toronto | Insurance Certified | ASADS";
  const metaDescription = "Certified WETT inspections in Toronto & GTA. Insurance-approved reports for fireplaces and wood stoves. Same-day reports with thermal imaging included.";

  return (
    <ServicePageTemplate
      title="WETT Inspection"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="Certified WETT Inspection Toronto & GTA"
      heroSubtitle="Insurance-Approved Safety Certification for Wood-Burning Appliances. Same-Day Reports and Thermal Imaging included with every inspection."
      icon={Flame}
      price="From $249"
      duration="1-2 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            A WETT (Wood Energy Technology Transfer) inspection is more than a safety check—it is a 
            mandatory requirement for most Ontario home insurance policies. Whether you have a 
            wood stove, pellet stove, or traditional masonry fireplace, insurers require 
            professional certification to verify that your installation meets <strong>CSA B365 
            standards</strong>.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-xl">
            <h4 className="text-blue-900 font-bold flex items-center gap-2">
              <Thermometer className="text-blue-600" size={20} />
              Enhanced Thermal Imaging Analysis
            </h4>
            <p className="text-blue-800 text-sm mt-1">
              Standard WETT inspections are visual only. ASADS includes <strong>Infrared Thermal 
              Imaging</strong> to detect hidden heat signatures and compromised flue liners that 
              the naked eye cannot see, providing a superior level of fire safety.
            </p>
          </div>

          <p>
            Our certified inspectors perform a comprehensive 50-point assessment. We verify 
            critical safety clearances to combustible walls, floor protection (hearth) 
            dimensions, and chimney structural integrity. Our reports are accepted by all 
            major Canadian insurance providers, including Intact, TD, and Aviva.
          </p>
        </div>
      }
      whatWeInspect={[
        "Clearance to combustible walls",
        "Hearth and floor protection",
        "Chimney liner & flue integrity",
        "Damper and air control operation",
        "Creosote & soot accumulation",
        "Masonry & mortar condition",
        "Chimney cap & spark arrestor",
        "Firebox refractory panels",
        "Installation mounting & security",
        "Chimney termination height",
        "Smoke & CO detector proximity",
        "Thermal heat-leak detection",
      ]}
      features={[
        {
          title: "Insurance Compliance",
          description: "Our WETT certificates are specifically formatted to meet the strict documentation requirements of GTA insurance brokers."
        },
        {
          title: "Thermal Scan Included",
          description: "We use FLIR® thermal technology to inspect for overheating behind walls and around chimney thimbles."
        },
        {
          title: "Same-Day Digital Reports",
          description: "Receive your PDF certification the same day as the inspection, complete with high-resolution photo documentation."
        },
        {
          title: "Real Estate Liaison",
          description: "We help buyers and sellers navigate inspection findings to ensure real estate closings proceed without delays."
        },
      ]}
      benefits={[
        "WETT Certified Technicians",
        "All Insurance Providers Accepted",
        "Thermal Imaging Included",
        "50-Point Safety Checklist",
        "Same-Day PDF Reporting",
        "Emergency 24/7 Booking",
        "Clear Remediation Steps",
        "Master Inspector Oversight",
      ]}
      faqs={[
        {
          question: "Why do insurance companies require WETT inspections?",
          answer: "Insurance providers view wood-burning appliances as high-risk. A WETT inspection proves the system was installed according to the Ontario Building Code and CSA B365, reducing fire risk and liability."
        },
        {
          question: "How long is a WETT certificate valid for?",
          answer: "Most insurance companies require a new inspection every 3 to 5 years, or whenever a property changes ownership. Check your specific policy for 'Wood-Burning Heat' riders."
        },
        {
          question: "Do you inspect the roof/top of the chimney?",
          answer: "Yes. Our inspections include a visual check of the chimney termination, flashing, and cap from the roof level (weather and safety permitting)."
        },
        {
          question: "What happens if the fireplace fails the WETT inspection?",
          answer: "If we find deficiencies (e.g., inadequate clearance), we provide a detailed list of required corrections. We can often suggest simple heat-shielding solutions to bring an appliance into compliance."
        },
        {
          question: "How much does a WETT inspection cost in Toronto?",
          answer: "WETT inspections in Toronto start from $249. This includes thermal imaging and same-day digital certification. Contact us at (647) 801-9311 for a quote."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Sewer Scope Inspection", href: "/services/sewer-scope" },
        { title: "Mold Inspection", href: "/services/mold-inspection" },
      ]}
    />
  );
}
