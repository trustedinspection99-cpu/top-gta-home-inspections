import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustBadges } from "@/components/home/TrustBadges";
import { 
  Search, FileText, Construction, Building2, Camera, 
  Droplets, Microscope, Radiation, Pipette, AlertOctagon, 
  Flame, ChevronRight 
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ASADS Home Inspection | Toronto & GTA</title>
      </Helmet>

      <section className="bg-blue-700 py-16 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Expert Property Inspections</h1>
        <Link to="/booking" className="bg-white text-blue-700 px-6 py-2 rounded font-bold">Book Now</Link>
      </section>

      <TrustBadges />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* REAL ESTATE SECTION */}
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-blue-600 pl-4">Real Estate & Structural</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* These must match your App.tsx paths exactly */}
            <Link to="/services/pre-purchase" className="p-6 bg-white border rounded-xl hover:shadow-md block">
              <Search className="text-blue-600 mb-2" />
              <h3 className="font-bold">Pre-Purchase</h3>
            </Link>
            <Link to="/services/pre-listing" className="p-6 bg-white border rounded-xl hover:shadow-md block">
              <FileText className="text-blue-600 mb-2" />
              <h3 className="font-bold">Pre-Listing</h3>
            </Link>
            <Link to="/services/commercial-inspection" className="p-6 bg-white border rounded-xl hover:shadow-md block border-blue-400 bg-blue-50/30">
              <Building2 className="text-blue-600 mb-2" />
              <h3 className="font-bold">Commercial</h3>
              <p className="text-xs text-blue-600 font-bold mt-2">Click to View Service →</p>
            </Link>
          </div>

          {/* HEALTH SECTION */}
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-cyan-500 pl-4">Health & Environmental</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link to="/services/well-water-testing" className="p-6 bg-white border rounded-xl hover:shadow-md block">
              <Droplets className="text-cyan-500 mb-2" />
              <h3 className="font-bold">Well Water Testing</h3>
            </Link>
            <Link to="/services/lead-testing" className="p-6 bg-white border rounded-xl hover:shadow-md block border-cyan-400 bg-cyan-50/30">
              <AlertOctagon className="text-cyan-600 mb-2" />
              <h3 className="font-bold">Lead Paint Testing</h3>
              <p className="text-xs text-cyan-600 font-bold mt-2">Click to View Service →</p>
            </Link>
            <Link to="/services/sewer-scope" className="p-6 bg-white border rounded-xl hover:shadow-md block">
              <Search className="text-cyan-500 mb-2" />
              <h3 className="font-bold">Sewer Scope</h3>
            </Link>
          </div>

          {/* SAFETY SECTION */}
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-orange-500 pl-4">Safety & Compliance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/services/wett-inspection" className="p-6 bg-white border rounded-xl hover:shadow-md block border-orange-400 bg-orange-50/30">
              <Flame className="text-orange-500 mb-2" />
              <h3 className="font-bold">WETT Inspection</h3>
              <p className="text-xs text-orange-600 font-bold mt-2">Click to View Service →</p>
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Index;
