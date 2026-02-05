import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { 
  Home, Search, FileText, Construction, Building2, Camera, 
  Droplets, Microscope, Radiation, Pipette, AlertOctagon, 
  Flame, ChevronRight 
} from "lucide-react";

const Index = () => {
  // Verified Active Services - Strictly matching your confirmed list
  const coreServices = [
    { title: "Pre-Purchase", icon: Search, desc: "200+ point audit for buyers.", href: "/services/pre-purchase" },
    { title: "Pre-Listing", icon: FileText, desc: "Sellers disclosure reports.", href: "/services/pre-listing" },
    { title: "New Construction", icon: Construction, desc: "Tarion warranty & PDI checks.", href: "/services/new-construction" },
    { title: "Commercial", icon: Building2, desc: "Building Condition Assessments (BCA).", href: "/services/commercial-inspection" },
    { title: "Thermal Imaging", icon: Camera, desc: "Infrared leak & heat loss detection.", href: "/services/thermal-imaging" }
  ];

  const environmentalServices = [
    { title: "Well Water Testing", icon: Droplets, desc: "MOH Lab analysis for bacteria/nitrates.", href: "/services/well-water-testing" },
    { title: "Mold & Air Quality", icon: Microscope, desc: "Spore count & DNA air sampling.", href: "/services/mold-inspection" },
    { title: "Radon Gas", icon: Radiation, desc: "48hr digital toxicity monitoring.", href: "/services/radon-testing" },
    { title: "Asbestos Sampling", icon: Pipette, desc: "Verified identification of hazmat.", href: "/services/asbestos-testing" },
    { title: "Lead Paint Testing", icon: AlertOctagon, desc: "XRF & swab testing for older homes.", href: "/services/lead-testing" },
    { title: "Sewer Scope", icon: Search, desc: "Lateral line video inspections.", href: "/services/sewer-scope" }
  ];

  const safetyServices = [
    { title: "WETT Inspection", icon: Flame, desc: "Wood stove & fireplace insurance certs.", href: "/services/wett-inspection" }
  ];

  return (
    <Layout>
      <Helmet>
        <title>ASADS Home Inspection | Professional Property Inspections Toronto</title>
        <meta name="description" content="Expert Home, WETT, Mold, Radon, and Well Water inspections across Toronto & GTA. Same-day digital reports." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-blue-700 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Inspections. <br/>Precision Results.</h1>
          <p className="text-xl mb-10 max-w-4xl mx-auto opacity-90">
            Certified technical audits for residential and commercial properties throughout the GTA.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/booking" className="bg-white text-blue-700 px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">Book Now</Link>
            <a href="tel:6478019311" className="border-2 border-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all">Call Us</a>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Finalized Service Matrix */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* Section: Real Estate */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-blue-600"></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-700">Real Estate & Structural</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {coreServices.map((s) => (
              <Link key={s.title} to={s.href} className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-500 transition-all shadow-sm hover:shadow-md">
                <s.icon className="text-blue-600 mb-3 h-8 w-8 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 mb-1 leading-tight">{s.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                <span className="text-blue-600 text-xs font-bold flex items-center group-hover:underline">
                  View Service <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>

          {/* Section: Environmental */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-cyan-500"></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-700">Health & Environmental</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {environmentalServices.map((s) => (
              <Link key={s.title} to={s.href} className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-cyan-500 transition-all shadow-sm hover:shadow-md">
                <s.icon className="text-cyan-500 mb-3 h-8 w-8 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 mb-1 leading-tight">{s.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                <span className="text-cyan-600 text-xs font-bold flex items-center group-hover:underline">
                  View Service <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>

          {/* Section: Safety */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-orange-500"></div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-700">Safety & Compliance</h2>
          </div>
          <div className="flex">
            {safetyServices.map((s) => (
              <Link key={s.title} to={s.href} className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-orange-500 transition-all shadow-sm hover:shadow-md w-full md:w-1/3">
                <s.icon className="text-orange-500 mb-3 h-8 w-8 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 mb-1 leading-tight">{s.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                <span className="text-orange-600 text-xs font-bold flex items-center group-hover:underline">
                  View Service <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
