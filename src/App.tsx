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
import BlogPost from "./pages/BlogPost";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Locations from "./pages/Locations";
import Booking from "./pages/Booking";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Service Pages
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

// Location Pages
import Toronto from "./pages/locations/Toronto";
import NorthYork from "./pages/locations/NorthYork";
import Scarborough from "./pages/locations/Scarborough";
import Etobicoke from "./pages/locations/Etobicoke";
import EastYork from "./pages/locations/EastYork";
import Mississauga from "./pages/locations/Mississauga";
import Brampton from "./pages/locations/Brampton";
import Caledon from "./pages/locations/Caledon";
import Bolton from "./pages/locations/Bolton";
import Vaughan from "./pages/locations/Vaughan";
import Markham from "./pages/locations/Markham";
import RichmondHill from "./pages/locations/RichmondHill";
import Newmarket from "./pages/locations/Newmarket";
import Aurora from "./pages/locations/Aurora";
import KingCity from "./pages/locations/KingCity";
import Stouffville from "./pages/locations/Stouffville";
import Georgina from "./pages/locations/Georgina";
import EastGwillimbury from "./pages/locations/EastGwillimbury";
import Keswick from "./pages/locations/Keswick";
import Sutton from "./pages/locations/Sutton";
import Woodbridge from "./pages/locations/Woodbridge";
import Thornhill from "./pages/locations/Thornhill";
import Maple from "./pages/locations/Maple";
import Kleinburg from "./pages/locations/Kleinburg";
import Concord from "./pages/locations/Concord";
import Unionville from "./pages/locations/Unionville";
import Oakville from "./pages/locations/Oakville";
import Burlington from "./pages/locations/Burlington";
import Milton from "./pages/locations/Milton";
import HaltonHills from "./pages/locations/HaltonHills";
import Georgetown from "./pages/locations/Georgetown";
import Acton from "./pages/locations/Acton";
import Oshawa from "./pages/locations/Oshawa";
import Whitby from "./pages/locations/Whitby";
import Ajax from "./pages/locations/Ajax";
import Pickering from "./pages/locations/Pickering";
import Clarington from "./pages/locations/Clarington";
import Bowmanville from "./pages/locations/Bowmanville";
import Uxbridge from "./pages/locations/Uxbridge";
import Scugog from "./pages/locations/Scugog";
import PortPerry from "./pages/locations/PortPerry";
import Brock from "./pages/locations/Brock";
import Beaverton from "./pages/locations/Beaverton";
import Cannington from "./pages/locations/Cannington";
import Barrie from "./pages/locations/Barrie";
import Orillia from "./pages/locations/Orillia";
import Innisfil from "./pages/locations/Innisfil";
import Bradford from "./pages/locations/Bradford";
import Alliston from "./pages/locations/Alliston";
import Collingwood from "./pages/locations/Collingwood";
import WasagaBeach from "./pages/locations/WasagaBeach";
import Midland from "./pages/locations/Midland";
import Penetanguishene from "./pages/locations/Penetanguishene";
import NewTecumseth from "./pages/locations/NewTecumseth";
import Essa from "./pages/locations/Essa";
import Springwater from "./pages/locations/Springwater";
import Clearview from "./pages/locations/Clearview";
import Stayner from "./pages/locations/Stayner";
import Hamilton from "./pages/locations/Hamilton";
import StoneyCreek from "./pages/locations/StoneyCreek";
import Ancaster from "./pages/locations/Ancaster";
import Dundas from "./pages/locations/Dundas";
import Flamborough from "./pages/locations/Flamborough";
import Grimsby from "./pages/locations/Grimsby";
import Beamsville from "./pages/locations/Beamsville";
import Lincoln from "./pages/locations/Lincoln";
import StCatharines from "./pages/locations/StCatharines";
import NiagaraFalls from "./pages/locations/NiagaraFalls";
import NiagaraOnTheLake from "./pages/locations/NiagaraOnTheLake";
import Welland from "./pages/locations/Welland";
import FortErie from "./pages/locations/FortErie";
import PortColborne from "./pages/locations/PortColborne";
import Thorold from "./pages/locations/Thorold";
import Kitchener from "./pages/locations/Kitchener";
import Waterloo from "./pages/locations/Waterloo";
import Cambridge from "./pages/locations/Cambridge";
import Guelph from "./pages/locations/Guelph";
import Orangeville from "./pages/locations/Orangeville";
import Peterborough from "./pages/locations/Peterborough";
import Cobourg from "./pages/locations/Cobourg";
import Brantford from "./pages/locations/Brantford";

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
            <Route path="/blog/:slug" element={<BlogPost />} />
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

            {/* Location Pages - Toronto & Surrounding */}
            <Route path="/locations/toronto" element={<Toronto />} />
            <Route path="/locations/north-york" element={<NorthYork />} />
            <Route path="/locations/scarborough" element={<Scarborough />} />
            <Route path="/locations/etobicoke" element={<Etobicoke />} />
            <Route path="/locations/east-york" element={<EastYork />} />

            {/* Location Pages - Peel Region */}
            <Route path="/locations/mississauga" element={<Mississauga />} />
            <Route path="/locations/brampton" element={<Brampton />} />
            <Route path="/locations/caledon" element={<Caledon />} />
            <Route path="/locations/bolton" element={<Bolton />} />

            {/* Location Pages - York Region */}
            <Route path="/locations/vaughan" element={<Vaughan />} />
            <Route path="/locations/markham" element={<Markham />} />
            <Route path="/locations/richmond-hill" element={<RichmondHill />} />
            <Route path="/locations/newmarket" element={<Newmarket />} />
            <Route path="/locations/aurora" element={<Aurora />} />
            <Route path="/locations/king-city" element={<KingCity />} />
            <Route path="/locations/stouffville" element={<Stouffville />} />
            <Route path="/locations/georgina" element={<Georgina />} />
            <Route path="/locations/east-gwillimbury" element={<EastGwillimbury />} />
            <Route path="/locations/keswick" element={<Keswick />} />
            <Route path="/locations/sutton" element={<Sutton />} />
            <Route path="/locations/woodbridge" element={<Woodbridge />} />
            <Route path="/locations/thornhill" element={<Thornhill />} />
            <Route path="/locations/maple" element={<Maple />} />
            <Route path="/locations/kleinburg" element={<Kleinburg />} />
            <Route path="/locations/concord" element={<Concord />} />
            <Route path="/locations/unionville" element={<Unionville />} />

            {/* Location Pages - Halton Region */}
            <Route path="/locations/oakville" element={<Oakville />} />
            <Route path="/locations/burlington" element={<Burlington />} />
            <Route path="/locations/milton" element={<Milton />} />
            <Route path="/locations/halton-hills" element={<HaltonHills />} />
            <Route path="/locations/georgetown" element={<Georgetown />} />
            <Route path="/locations/acton" element={<Acton />} />

            {/* Location Pages - Durham Region */}
            <Route path="/locations/oshawa" element={<Oshawa />} />
            <Route path="/locations/whitby" element={<Whitby />} />
            <Route path="/locations/ajax" element={<Ajax />} />
            <Route path="/locations/pickering" element={<Pickering />} />
            <Route path="/locations/clarington" element={<Clarington />} />
            <Route path="/locations/bowmanville" element={<Bowmanville />} />
            <Route path="/locations/uxbridge" element={<Uxbridge />} />
            <Route path="/locations/scugog" element={<Scugog />} />
            <Route path="/locations/port-perry" element={<PortPerry />} />
            <Route path="/locations/brock" element={<Brock />} />
            <Route path="/locations/beaverton" element={<Beaverton />} />
            <Route path="/locations/cannington" element={<Cannington />} />

            {/* Location Pages - Simcoe County */}
            <Route path="/locations/barrie" element={<Barrie />} />
            <Route path="/locations/orillia" element={<Orillia />} />
            <Route path="/locations/innisfil" element={<Innisfil />} />
            <Route path="/locations/bradford" element={<Bradford />} />
            <Route path="/locations/alliston" element={<Alliston />} />
            <Route path="/locations/collingwood" element={<Collingwood />} />
            <Route path="/locations/wasaga-beach" element={<WasagaBeach />} />
            <Route path="/locations/midland" element={<Midland />} />
            <Route path="/locations/penetanguishene" element={<Penetanguishene />} />
            <Route path="/locations/new-tecumseth" element={<NewTecumseth />} />
            <Route path="/locations/essa" element={<Essa />} />
            <Route path="/locations/springwater" element={<Springwater />} />
            <Route path="/locations/clearview" element={<Clearview />} />
            <Route path="/locations/stayner" element={<Stayner />} />

            {/* Location Pages - Hamilton-Niagara */}
            <Route path="/locations/hamilton" element={<Hamilton />} />
            <Route path="/locations/stoney-creek" element={<StoneyCreek />} />
            <Route path="/locations/ancaster" element={<Ancaster />} />
            <Route path="/locations/dundas" element={<Dundas />} />
            <Route path="/locations/flamborough" element={<Flamborough />} />
            <Route path="/locations/grimsby" element={<Grimsby />} />
            <Route path="/locations/beamsville" element={<Beamsville />} />
            <Route path="/locations/lincoln" element={<Lincoln />} />
            <Route path="/locations/st-catharines" element={<StCatharines />} />
            <Route path="/locations/niagara-falls" element={<NiagaraFalls />} />
            <Route path="/locations/niagara-on-the-lake" element={<NiagaraOnTheLake />} />
            <Route path="/locations/welland" element={<Welland />} />
            <Route path="/locations/fort-erie" element={<FortErie />} />
            <Route path="/locations/port-colborne" element={<PortColborne />} />
            <Route path="/locations/thorold" element={<Thorold />} />

            {/* Location Pages - Waterloo Region */}
            <Route path="/locations/kitchener" element={<Kitchener />} />
            <Route path="/locations/waterloo" element={<Waterloo />} />
            <Route path="/locations/cambridge" element={<Cambridge />} />

            {/* Location Pages - Wellington & Dufferin */}
            <Route path="/locations/guelph" element={<Guelph />} />
            <Route path="/locations/orangeville" element={<Orangeville />} />

            {/* Location Pages - Kawartha & Peterborough */}
            <Route path="/locations/peterborough" element={<Peterborough />} />

            {/* Location Pages - Northumberland & Brant */}
            <Route path="/locations/cobourg" element={<Cobourg />} />
            <Route path="/locations/brantford" element={<Brantford />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
