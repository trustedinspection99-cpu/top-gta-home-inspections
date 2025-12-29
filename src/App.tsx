import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Locations from "./pages/Locations";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/locations" element={<Locations />} />
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
