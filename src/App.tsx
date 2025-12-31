import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Locations from "./pages/Locations";
import Booking from "./pages/Booking";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Toronto from "./pages/locations/Toronto";
import Mississauga from "./pages/locations/Mississauga";
import Brampton from "./pages/locations/Brampton";
import Vaughan from "./pages/locations/Vaughan";
import Markham from "./pages/locations/Markham";
import RichmondHill from "./pages/locations/RichmondHill";
import Oakville from "./pages/locations/Oakville";
import Burlington from "./pages/locations/Burlington";
import Milton from "./pages/locations/Milton";
import Ajax from "./pages/locations/Ajax";
import Pickering from "./pages/locations/Pickering";
import Newmarket from "./pages/locations/Newmarket";
import Oshawa from "./pages/locations/Oshawa";
import PrePurchase from "./pages/services/PrePurchase";
import PreListing from "./pages/services/PreListing";
import NewConstruction from "./pages/services/NewConstruction";
import Condo from "./pages/services/Condo";
import Commercial from "./pages/services/Commercial";
import RadonTesting from "./pages/services/RadonTesting";
import MoldInspection from "./pages/services/MoldInspection";
import AsbestosTesting from "./pages/services/AsbestosTesting";
import WETT from "./pages/services/WETT";
import ThermalImaging from "./pages/services/ThermalImaging";
import LeadPaintTesting from "./pages/services/LeadPaintTesting";
import WellWaterTesting from "./pages/services/WellWaterTesting";
import SewerScope from "./pages/services/SewerScope";
import AirQuality from "./pages/services/AirQuality";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            {/* Service Pages */}
            <Route path="/services/pre-purchase" element={<PrePurchase />} />
            <Route path="/services/pre-listing" element={<PreListing />} />
            <Route path="/services/new-construction" element={<NewConstruction />} />
            <Route path="/services/condo" element={<Condo />} />
            <Route path="/services/commercial" element={<Commercial />} />
            <Route path="/services/radon-testing" element={<RadonTesting />} />
            <Route path="/services/mold-inspection" element={<MoldInspection />} />
            <Route path="/services/asbestos-testing" element={<AsbestosTesting />} />
            <Route path="/services/wett" element={<WETT />} />
            <Route path="/services/thermal-imaging" element={<ThermalImaging />} />
            <Route path="/services/lead-paint-testing" element={<LeadPaintTesting />} />
            <Route path="/services/well-water-testing" element={<WellWaterTesting />} />
            <Route path="/services/sewer-scope" element={<SewerScope />} />
            <Route path="/services/air-quality" element={<AirQuality />} />
            {/* Location Pages */}
            <Route path="/locations/toronto" element={<Toronto />} />
            <Route path="/locations/mississauga" element={<Mississauga />} />
            <Route path="/locations/brampton" element={<Brampton />} />
            <Route path="/locations/vaughan" element={<Vaughan />} />
            <Route path="/locations/markham" element={<Markham />} />
            <Route path="/locations/richmond-hill" element={<RichmondHill />} />
            <Route path="/locations/oakville" element={<Oakville />} />
            <Route path="/locations/burlington" element={<Burlington />} />
            <Route path="/locations/milton" element={<Milton />} />
            <Route path="/locations/ajax" element={<Ajax />} />
            <Route path="/locations/pickering" element={<Pickering />} />
            <Route path="/locations/newmarket" element={<Newmarket />} />
            <Route path="/locations/oshawa" element={<Oshawa />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
