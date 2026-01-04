import React, { lazy, Suspense } from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { blogPostsData } from './data/blogPosts';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Outlet } from 'react-router-dom';

function RootLayout() {
  const [queryClient] = React.useState(() => new QueryClient());
  
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Outlet />
          </Suspense>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

// Main Pages
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Locations = lazy(() => import('./pages/Locations'));
const Booking = lazy(() => import('./pages/Booking'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Service Pages
const PrePurchase = lazy(() => import('./pages/services/PrePurchase'));
const PreListing = lazy(() => import('./pages/services/PreListing'));
const NewConstruction = lazy(() => import('./pages/services/NewConstruction'));
const Condo = lazy(() => import('./pages/services/Condo'));
const Commercial = lazy(() => import('./pages/services/Commercial'));
const RadonTesting = lazy(() => import('./pages/services/RadonTesting'));
const MoldInspection = lazy(() => import('./pages/services/MoldInspection'));
const AsbestosTesting = lazy(() => import('./pages/services/AsbestosTesting'));
const WETT = lazy(() => import('./pages/services/WETT'));
const ThermalImaging = lazy(() => import('./pages/services/ThermalImaging'));
const LeadPaintTesting = lazy(() => import('./pages/services/LeadPaintTesting'));
const WellWaterTesting = lazy(() => import('./pages/services/WellWaterTesting'));
const SewerScope = lazy(() => import('./pages/services/SewerScope'));
const AirQuality = lazy(() => import('./pages/services/AirQuality'));

// Location Pages
const Toronto = lazy(() => import('./pages/locations/Toronto'));
const NorthYork = lazy(() => import('./pages/locations/NorthYork'));
const Scarborough = lazy(() => import('./pages/locations/Scarborough'));
const Etobicoke = lazy(() => import('./pages/locations/Etobicoke'));
const EastYork = lazy(() => import('./pages/locations/EastYork'));
const Mississauga = lazy(() => import('./pages/locations/Mississauga'));
const Brampton = lazy(() => import('./pages/locations/Brampton'));
const Caledon = lazy(() => import('./pages/locations/Caledon'));
const Bolton = lazy(() => import('./pages/locations/Bolton'));
const Vaughan = lazy(() => import('./pages/locations/Vaughan'));
const Markham = lazy(() => import('./pages/locations/Markham'));
const RichmondHill = lazy(() => import('./pages/locations/RichmondHill'));
const Newmarket = lazy(() => import('./pages/locations/Newmarket'));
const Aurora = lazy(() => import('./pages/locations/Aurora'));
const KingCity = lazy(() => import('./pages/locations/KingCity'));
const Stouffville = lazy(() => import('./pages/locations/Stouffville'));
const Georgina = lazy(() => import('./pages/locations/Georgina'));
const EastGwillimbury = lazy(() => import('./pages/locations/EastGwillimbury'));
const Keswick = lazy(() => import('./pages/locations/Keswick'));
const Sutton = lazy(() => import('./pages/locations/Sutton'));
const Woodbridge = lazy(() => import('./pages/locations/Woodbridge'));
const Thornhill = lazy(() => import('./pages/locations/Thornhill'));
const Maple = lazy(() => import('./pages/locations/Maple'));
const Kleinburg = lazy(() => import('./pages/locations/Kleinburg'));
const Concord = lazy(() => import('./pages/locations/Concord'));
const Unionville = lazy(() => import('./pages/locations/Unionville'));
const Oakville = lazy(() => import('./pages/locations/Oakville'));
const Burlington = lazy(() => import('./pages/locations/Burlington'));
const Milton = lazy(() => import('./pages/locations/Milton'));
const HaltonHills = lazy(() => import('./pages/locations/HaltonHills'));
const Georgetown = lazy(() => import('./pages/locations/Georgetown'));
const Acton = lazy(() => import('./pages/locations/Acton'));
const Oshawa = lazy(() => import('./pages/locations/Oshawa'));
const Whitby = lazy(() => import('./pages/locations/Whitby'));
const Ajax = lazy(() => import('./pages/locations/Ajax'));
const Pickering = lazy(() => import('./pages/locations/Pickering'));
const Clarington = lazy(() => import('./pages/locations/Clarington'));
const Bowmanville = lazy(() => import('./pages/locations/Bowmanville'));
const Uxbridge = lazy(() => import('./pages/locations/Uxbridge'));
const Scugog = lazy(() => import('./pages/locations/Scugog'));
const PortPerry = lazy(() => import('./pages/locations/PortPerry'));
const Brock = lazy(() => import('./pages/locations/Brock'));
const Beaverton = lazy(() => import('./pages/locations/Beaverton'));
const Cannington = lazy(() => import('./pages/locations/Cannington'));
const Barrie = lazy(() => import('./pages/locations/Barrie'));
const Orillia = lazy(() => import('./pages/locations/Orillia'));
const Innisfil = lazy(() => import('./pages/locations/Innisfil'));
const Bradford = lazy(() => import('./pages/locations/Bradford'));
const Alliston = lazy(() => import('./pages/locations/Alliston'));
const Collingwood = lazy(() => import('./pages/locations/Collingwood'));
const WasagaBeach = lazy(() => import('./pages/locations/WasagaBeach'));
const Midland = lazy(() => import('./pages/locations/Midland'));
const Penetanguishene = lazy(() => import('./pages/locations/Penetanguishene'));
const NewTecumseth = lazy(() => import('./pages/locations/NewTecumseth'));
const Essa = lazy(() => import('./pages/locations/Essa'));
const Springwater = lazy(() => import('./pages/locations/Springwater'));
const Clearview = lazy(() => import('./pages/locations/Clearview'));
const Stayner = lazy(() => import('./pages/locations/Stayner'));
const Hamilton = lazy(() => import('./pages/locations/Hamilton'));
const StoneyCreek = lazy(() => import('./pages/locations/StoneyCreek'));
const Ancaster = lazy(() => import('./pages/locations/Ancaster'));
const Dundas = lazy(() => import('./pages/locations/Dundas'));
const Flamborough = lazy(() => import('./pages/locations/Flamborough'));
const Grimsby = lazy(() => import('./pages/locations/Grimsby'));
const Beamsville = lazy(() => import('./pages/locations/Beamsville'));
const Lincoln = lazy(() => import('./pages/locations/Lincoln'));
const StCatharines = lazy(() => import('./pages/locations/StCatharines'));
const NiagaraFalls = lazy(() => import('./pages/locations/NiagaraFalls'));
const NiagaraOnTheLake = lazy(() => import('./pages/locations/NiagaraOnTheLake'));
const Welland = lazy(() => import('./pages/locations/Welland'));
const FortErie = lazy(() => import('./pages/locations/FortErie'));
const PortColborne = lazy(() => import('./pages/locations/PortColborne'));
const Thorold = lazy(() => import('./pages/locations/Thorold'));
const Kitchener = lazy(() => import('./pages/locations/Kitchener'));
const Waterloo = lazy(() => import('./pages/locations/Waterloo'));
const Cambridge = lazy(() => import('./pages/locations/Cambridge'));
const Guelph = lazy(() => import('./pages/locations/Guelph'));
const Orangeville = lazy(() => import('./pages/locations/Orangeville'));
const Peterborough = lazy(() => import('./pages/locations/Peterborough'));
const Cobourg = lazy(() => import('./pages/locations/Cobourg'));
const Brantford = lazy(() => import('./pages/locations/Brantford'));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Index /> },
      // Main Pages - UPDATED WITH SLASHES
      { path: 'about/', element: <About /> },
      { path: 'contact/', element: <Contact /> },
      { path: 'services/', element: <Services /> },
      { path: 'blog/', element: <Blog /> },
      { 
        path: 'blog/:slug/', 
        element: <BlogPost />, 
        getStaticPaths: () => blogPostsData.map(p => `blog/${p.slug}/`) 
      },
      { path: 'testimonials/', element: <Testimonials /> },
      { path: 'faq/', element: <FAQ /> },
      { path: 'locations/', element: <Locations /> },
      { path: 'booking/', element: <Booking /> },
      { path: 'pricing/', element: <Pricing /> },
      { path: 'privacy-policy/', element: <PrivacyPolicy /> },
      { path: 'terms/', element: <Terms /> },
      { path: 'sitemap/', element: <Sitemap /> },

      // Service Pages - UPDATED WITH SLASHES
      { path: 'services/pre-purchase/', element: <PrePurchase /> },
      { path: 'services/pre-listing/', element: <PreListing /> },
      { path: 'services/new-construction/', element: <NewConstruction /> },
      { path: 'services/condo/', element: <Condo /> },
      { path: 'services/commercial/', element: <Commercial /> },
      { path: 'services/radon-testing/', element: <RadonTesting /> },
      { path: 'services/mold-inspection/', element: <MoldInspection /> },
      { path: 'services/asbestos-testing/', element: <AsbestosTesting /> },
      { path: 'services/wett/', element: <WETT /> },
      { path: 'services/thermal-imaging/', element: <ThermalImaging /> },
      { path: 'services/lead-paint-testing/', element: <LeadPaintTesting /> },
      { path: 'services/well-water-testing/', element: <WellWaterTesting /> },
      { path: 'services/sewer-scope/', element: <SewerScope /> },
      { path: 'services/air-quality/', element: <AirQuality /> },

      // Location Pages - UPDATED WITH SLASHES
      { path: 'locations/toronto/', element: <Toronto /> },
      { path: 'locations/north-york/', element: <NorthYork /> },
      { path: 'locations/scarborough/', element: <Scarborough /> },
      { path: 'locations/etobicoke/', element: <Etobicoke /> },
      { path: 'locations/east-york/', element: <EastYork /> },
      { path: 'locations/mississauga/', element: <Mississauga /> },
      { path: 'locations/brampton/', element: <Brampton /> },
      { path: 'locations/caledon/', element: <Caledon /> },
      { path: 'locations/bolton/', element: <Bolton /> },
      { path: 'locations/vaughan/', element: <Vaughan /> },
      { path: 'locations/markham/', element: <Markham /> },
      { path: 'locations/richmond-hill/', element: <RichmondHill /> },
      { path: 'locations/newmarket/', element: <Newmarket /> },
      { path: 'locations/aurora/', element: <Aurora /> },
      { path: 'locations/king-city/', element: <KingCity /> },
      { path: 'locations/stouffville/', element: <Stouffville /> },
      { path: 'locations/georgina/', element: <Georgina /> },
      { path: 'locations/east-gwillimbury/', element: <EastGwillimbury /> },
      { path: 'locations/keswick/', element: <Keswick /> },
      { path: 'locations/sutton/', element: <Sutton /> },
      { path: 'locations/woodbridge/', element: <Woodbridge /> },
      { path: 'locations/thornhill/', element: <Thornhill /> },
      { path: 'locations/maple/', element: <Maple /> },
      { path: 'locations/kleinburg/', element: <Kleinburg /> },
      { path: 'locations/concord/', element: <Concord /> },
      { path: 'locations/unionville/', element: <Unionville /> },
      { path: 'locations/oakville/', element: <Oakville /> },
      { path: 'locations/burlington/', element: <Burlington /> },
      { path: 'locations/milton/', element: <Milton /> },
      { path: 'locations/halton-hills/', element: <HaltonHills /> },
      { path: 'locations/georgetown/', element: <Georgetown /> },
      { path: 'locations/acton/', element: <Acton /> },
      { path: 'locations/oshawa/', element: <Oshawa /> },
      { path: 'locations/whitby/', element: <Whitby /> },
      { path: 'locations/ajax/', element: <Ajax /> },
      { path: 'locations/pickering/', element: <Pickering /> },
      { path: 'locations/clarington/', element: <Clarington /> },
      { path: 'locations/bowmanville/', element: <Bowmanville /> },
      { path: 'locations/uxbridge/', element: <Uxbridge /> },
      { path: 'locations/scugog/', element: <Scugog /> },
      { path: 'locations/port-perry/', element: <PortPerry /> },
      { path: 'locations/brock/', element: <Brock /> },
      { path: 'locations/beaverton/', element: <Beaverton /> },
      { path: 'locations/cannington/', element: <Cannington /> },
      { path: 'locations/barrie/', element: <Barrie /> },
      { path: 'locations/orillia/', element: <Orillia /> },
      { path: 'locations/innisfil/', element: <Innisfil /> },
      { path: 'locations/bradford/', element: <Bradford /> },
      { path: 'locations/alliston/', element: <Alliston /> },
      { path: 'locations/collingwood/', element: <Collingwood /> },
      { path: 'locations/wasaga-beach/', element: <WasagaBeach /> },
      { path: 'locations/midland/', element: <Midland /> },
      { path: 'locations/penetanguishene/', element: <Penetanguishene /> },
      { path: 'locations/new-tecumseth/', element: <NewTecumseth /> },
      { path: 'locations/essa/', element: <Essa /> },
      { path: 'locations/springwater/', element: <Springwater /> },
      { path: 'locations/clearview/', element: <Clearview /> },
      { path: 'locations/stayner/', element: <Stayner /> },
      { path: 'locations/hamilton/', element: <Hamilton /> },
      { path: 'locations/stoney-creek/', element: <StoneyCreek /> },
      { path: 'locations/ancaster/', element: <Ancaster /> },
      { path: 'locations/dundas/', element: <Dundas /> },
      { path: 'locations/flamborough/', element: <Flamborough /> },
      { path: 'locations/grimsby/', element: <Grimsby /> },
      { path: 'locations/beamsville/', element: <Beamsville /> },
      { path: 'locations/lincoln/', element: <Lincoln /> },
      { path: 'locations/st-catharines/', element: <StCatharines /> },
      { path: 'locations/niagara-falls/', element: <NiagaraFalls /> },
      { path: 'locations/niagara-on-the-lake/', element: <NiagaraOnTheLake /> },
      { path: 'locations/welland/', element: <Welland /> },
      { path: 'locations/fort-erie/', element: <FortErie /> },
      { path: 'locations/port-colborne/', element: <PortColborne /> },
      { path: 'locations/thorold/', element: <Thorold /> },
      { path: 'locations/kitchener/', element: <Kitchener /> },
      { path: 'locations/waterloo/', element: <Waterloo /> },
      { path: 'locations/cambridge/', element: <Cambridge /> },
      { path: 'locations/guelph/', element: <Guelph /> },
      { path: 'locations/orangeville/', element: <Orangeville /> },
      { path: 'locations/peterborough/', element: <Peterborough /> },
      { path: 'locations/cobourg/', element: <Cobourg /> },
      { path: 'locations/brantford/', element: <Brantford /> },

      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
