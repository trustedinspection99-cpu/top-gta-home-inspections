
import { Video, Search, Map, AlertCircle, ShieldCheck, Clock } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export default function SewerScope() {
  const pageTitle = "Sewer Camera Inspection Toronto | HD Drain Scope | ASADS";
  const metaDescription = "Professional CCTV sewer camera inspections in Toronto. Detect root intrusion, bellied pipes, and hidden cracks with same-day HD video reports.";

  return (
    <ServicePageTemplate
      title="Sewer Camera Inspection"
      metaTitle={pageTitle}
      metaDescription={metaDescription}
      heroTitle="HD Sewer Scope & Drain Line Inspection"
      heroSubtitle="Don't inherit a $20,000 plumbing disaster. Our 1080p HD camera systems reveal the true condition of your underground lateral lines before you close."
      icon={Video}
      price="From $299"
      duration="1-2 Hours"
      description={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-slate-700">
            In the Greater Toronto Area, sewer line replacements are one of the most expensive 
            "hidden" costs of homeownership, often ranging from <strong>$5,000 to over $25,000</strong>. 
            While a standard home inspection covers interior plumbing, it cannot "see" 
            underground where roots, soil shifting, and age do the most damage.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
            <h4 className="text-blue-900 font-bold flex items-center gap-2">
              <Search className="text-blue-600" size={20} />
              Advanced CCTV Technology
            </h4>
            <p className="text-blue-800 text-sm mt-1">
              We utilize 200ft industrial push-rod cameras with <strong>self-leveling heads</strong>. 
              This ensures we reach the municipal main connection and provide a clear, 
              upright view of defects that standard 720p consumer-grade cameras miss.
            </p>
          </div>

          

          <p>
            Our inspection is critical for Toronto’s older neighborhoods where 
            <strong> clay tiles, cast iron, or "Orangeburg" bituminized fiber pipes</strong> are common. 
            We provide a narrated video file the same day, giving you the immediate 
            leverage needed for real estate negotiations.
          </p>
        </div>
      }
      whatWeInspect={[
        "Structural integrity of pipe walls",
        "Tree root intrusion points",
        "Bellies (low spots causing sediment)",
        "Offset or separated joints",
        "Cracks, fractures, and holes",
        "Corrosion in cast iron lines",
        "Presence of 'Orangeburg' piping",
        "Debris or grease build-up",
        "Proximity to municipal main",
        "Condition of the cleanout",
        "Pipe material transitions",
        "Previous patch or liner repairs",
      ]}
      features={[
        {
          title: "1080p HD Video",
          description: "Crystal clear imaging with high-intensity LED lighting to identify even hairline fractures in clay or PVC."
        },
        {
          title: "Sonde & GPS Mapping",
          description: "If a defect is found, we use a radio frequency transmitter to pinpoint the exact location and depth above ground."
        },
        {
          title: "Same-Day Cloud Delivery",
          description: "Receive a private link to your narrated inspection video and report within hours of the site visit."
        },
        {
          title: "Impartial 3rd Party",
          description: "We don't perform repairs. This ensures our assessment is 100% unbiased, unlike plumbing companies looking for work."
        },
      ]}
      benefits={[
        "Negotiate repair credits",
        "Avoid excavation surprises",
        "Map exact pipe locations",
        "Identify root-prone areas",
        "Same-day video evidence",
        "Verify previous repairs",
        "Commercial-grade reach (200ft)",
        "Peace of mind for older homes",
      ]}
      faqs={[
        {
          question: "Why isn't this included in a standard home inspection?",
          answer: "Sewer scoping requires specialized, expensive CCTV equipment and additional training. Most home inspectors only check if drains are currently flowing; we check if they are about to fail."
        },
        {
          question: "What is a 'belly' in a sewer line?",
          answer: "A belly is a sagging section of pipe caused by ground settling. It creates a pool of standing water that catches debris, eventually leading to chronic backups."
        },
        {
          question: "Can you inspect if there is no cleanout?",
          answer: "Yes. While a dedicated cleanout is ideal, we can often access the line by removing a basement toilet or via a roof vent, though additional fees may apply."
        },
        {
          question: "How far can your camera go?",
          answer: "Our professional systems carry 200 feet of cable, which is more than enough to reach the city's main connection for almost any residential property in the GTA."
        },
      ]}
      relatedServices={[
        { title: "Pre-Purchase Inspection", href: "/services/pre-purchase" },
        { title: "WETT Inspection", href: "/services/wett-inspection-toronto" },
        { title: "Thermal Imaging", href: "/services/thermal-imaging" },
        { title: "Mold Testing", href: "/services/mold-testing-toronto" },
      ]}
    />
  );
}
