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
const Mapleton = lazy(() => import('./pages/locations/Mapleton'));
const Woodstock = lazy(() => import('./pages/locations/Woodstock'));
const AdelaideMetcalfe = lazy(() => import('./pages/locations/AdelaideMetcalfe'));
const Erin = lazy(() => import('./pages/locations/Erin'));
const Puslinch = lazy(() => import('./pages/locations/Puslinch'));
const Shelburne = lazy(() => import('./pages/locations/Shelburne'));
const NorthDumfries = lazy(() => import('./pages/locations/NorthDumfries'));
const WellingtonNorth = lazy(() => import('./pages/locations/WellingtonNorth'));
const TayTownship = lazy(() => import('./pages/locations/TayTownship'));
const Minto = lazy(() => import('./pages/locations/Minto'));
const CentreWellington = lazy(() => import('./pages/locations/CentreWellington'));
const Ingersoll = lazy(() => import('./pages/locations/Ingersoll'));
const Woolwich = lazy(() => import('./pages/locations/Woolwich'));
const Pelham = lazy(() => import('./pages/locations/Pelham'));
const TinyTownship = lazy(() => import('./pages/locations/TinyTownship'));
const WestLincoln = lazy(() => import('./pages/locations/WestLincoln'));
const Mono = lazy(() => import('./pages/locations/Mono'));
const Severn = lazy(() => import('./pages/locations/Severn'));
const Wellesley = lazy(() => import('./pages/locations/Wellesley'));
const Wainfleet = lazy(() => import('./pages/locations/Wainfleet'));
const GuelphEramosa = lazy(() => import('./pages/locations/GuelphEramosa'));
const Wilmot = lazy(() => import('./pages/locations/Wilmot'));
const Tillsonburg = lazy(() => import('./pages/locations/Tillsonburg'));
const Paris = lazy(() => import('./pages/locations/Paris'));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Index /> },
      // Main Pages - No trailing slashes (consistent with URL policy)
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'services', element: <Services /> },
      { path: 'blog', element: <Blog /> },
      { 
        path: 'blog/:slug', 
        element: <BlogPost />, 
        getStaticPaths: () => blogPostsData.map(p => `blog/${p.slug}`) 
      },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'locations', element: <Locations /> },
      { path: 'booking', element: <Booking /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'sitemap', element: <Sitemap /> },

      // Service Pages
      { path: 'services/pre-purchase', element: <PrePurchase /> },
      { path: 'services/pre-listing', element: <PreListing /> },
      { path: 'services/new-construction', element: <NewConstruction /> },
      { path: 'services/condo', element: <Condo /> },
      { path: 'services/commercial', element: <Commercial /> },
      { path: 'services/radon-testing', element: <RadonTesting /> },
      { path: 'services/mold-inspection', element: <MoldInspection /> },
      { path: 'services/asbestos-testing', element: <AsbestosTesting /> },
      { path: 'services/wett', element: <WETT /> },
      { path: 'services/thermal-imaging', element: <ThermalImaging /> },
      { path: 'services/lead-paint-testing', element: <LeadPaintTesting /> },
      { path: 'services/well-water-testing', element: <WellWaterTesting /> },
      { path: 'services/sewer-scope', element: <SewerScope /> },
      { path: 'services/air-quality', element: <AirQuality /> },

      // Location Pages
      { path: 'locations/home-inspection-toronto', element: <Toronto /> },
      { path: 'locations/home-inspection-north-york', element: <NorthYork /> },
      { path: 'locations/home-inspection-scarborough', element: <Scarborough /> },
      { path: 'locations/home-inspection-etobicoke', element: <Etobicoke /> },
      { path: 'locations/home-inspection-east-york', element: <EastYork /> },
      { path: 'locations/home-inspection-mississauga', element: <Mississauga /> },
      { path: 'locations/home-inspection-brampton', element: <Brampton /> },
      { path: 'locations/home-inspection-caledon', element: <Caledon /> },
      { path: 'locations/home-inspection-bolton', element: <Bolton /> },
      { path: 'locations/home-inspection-vaughan', element: <Vaughan /> },
      { path: 'locations/home-inspection-markham', element: <Markham /> },
      { path: 'locations/home-inspection-richmond-hill', element: <RichmondHill /> },
      { path: 'locations/home-inspection-newmarket', element: <Newmarket /> },
      { path: 'locations/home-inspection-aurora', element: <Aurora /> },
      { path: 'locations/home-inspection-king-city', element: <KingCity /> },
      { path: 'locations/home-inspection-stouffville', element: <Stouffville /> },
      { path: 'locations/home-inspection-georgina', element: <Georgina /> },
      { path: 'locations/home-inspection-east-gwillimbury', element: <EastGwillimbury /> },
      { path: 'locations/home-inspection-keswick', element: <Keswick /> },
      { path: 'locations/home-inspection-sutton', element: <Sutton /> },
      { path: 'locations/home-inspection-woodbridge', element: <Woodbridge /> },
      { path: 'locations/home-inspection-thornhill', element: <Thornhill /> },
      { path: 'locations/home-inspection-maple', element: <Maple /> },
      { path: 'locations/home-inspection-kleinburg', element: <Kleinburg /> },
      { path: 'locations/home-inspection-concord', element: <Concord /> },
      { path: 'locations/home-inspection-unionville', element: <Unionville /> },
      { path: 'locations/home-inspection-oakville', element: <Oakville /> },
      { path: 'locations/home-inspection-burlington', element: <Burlington /> },
      { path: 'locations/home-inspection-milton', element: <Milton /> },
      { path: 'locations/home-inspection-halton-hills', element: <HaltonHills /> },
      { path: 'locations/home-inspection-georgetown', element: <Georgetown /> },
      { path: 'locations/home-inspection-acton', element: <Acton /> },
      { path: 'locations/home-inspection-oshawa', element: <Oshawa /> },
      { path: 'locations/home-inspection-whitby', element: <Whitby /> },
      { path: 'locations/home-inspection-ajax', element: <Ajax /> },
      { path: 'locations/home-inspection-pickering', element: <Pickering /> },
      { path: 'locations/home-inspection-clarington', element: <Clarington /> },
      { path: 'locations/home-inspection-bowmanville', element: <Bowmanville /> },
      { path: 'locations/home-inspection-uxbridge', element: <Uxbridge /> },
      { path: 'locations/home-inspection-scugog', element: <Scugog /> },
      { path: 'locations/home-inspection-port-perry', element: <PortPerry /> },
      { path: 'locations/home-inspection-brock', element: <Brock /> },
      { path: 'locations/home-inspection-beaverton', element: <Beaverton /> },
      { path: 'locations/home-inspection-cannington', element: <Cannington /> },
      { path: 'locations/home-inspection-barrie', element: <Barrie /> },
      { path: 'locations/home-inspection-orillia', element: <Orillia /> },
      { path: 'locations/home-inspection-innisfil', element: <Innisfil /> },
      { path: 'locations/home-inspection-bradford', element: <Bradford /> },
      { path: 'locations/home-inspection-alliston', element: <Alliston /> },
      { path: 'locations/home-inspection-collingwood', element: <Collingwood /> },
      { path: 'locations/home-inspection-wasaga-beach', element: <WasagaBeach /> },
      { path: 'locations/home-inspection-midland', element: <Midland /> },
      { path: 'locations/home-inspection-penetanguishene', element: <Penetanguishene /> },
      { path: 'locations/home-inspection-new-tecumseth', element: <NewTecumseth /> },
      { path: 'locations/home-inspection-essa', element: <Essa /> },
      { path: 'locations/home-inspection-springwater', element: <Springwater /> },
      { path: 'locations/home-inspection-clearview', element: <Clearview /> },
      { path: 'locations/home-inspection-stayner', element: <Stayner /> },
      { path: 'locations/home-inspection-hamilton', element: <Hamilton /> },
      { path: 'locations/home-inspection-stoney-creek', element: <StoneyCreek /> },
      { path: 'locations/home-inspection-ancaster', element: <Ancaster /> },
      { path: 'locations/home-inspection-dundas', element: <Dundas /> },
      { path: 'locations/home-inspection-flamborough', element: <Flamborough /> },
      { path: 'locations/home-inspection-grimsby', element: <Grimsby /> },
      { path: 'locations/home-inspection-beamsville', element: <Beamsville /> },
      { path: 'locations/home-inspection-lincoln', element: <Lincoln /> },
      { path: 'locations/home-inspection-st-catharines', element: <StCatharines /> },
      { path: 'locations/home-inspection-niagara-falls', element: <NiagaraFalls /> },
      { path: 'locations/home-inspection-niagara-on-the-lake', element: <NiagaraOnTheLake /> },
      { path: 'locations/home-inspection-welland', element: <Welland /> },
      { path: 'locations/home-inspection-fort-erie', element: <FortErie /> },
      { path: 'locations/home-inspection-port-colborne', element: <PortColborne /> },
      { path: 'locations/home-inspection-thorold', element: <Thorold /> },
      { path: 'locations/home-inspection-kitchener', element: <Kitchener /> },
      { path: 'locations/home-inspection-waterloo', element: <Waterloo /> },
      { path: 'locations/home-inspection-cambridge', element: <Cambridge /> },
      { path: 'locations/home-inspection-guelph', element: <Guelph /> },
      { path: 'locations/home-inspection-orangeville', element: <Orangeville /> },
      { path: 'locations/home-inspection-peterborough', element: <Peterborough /> },
      { path: 'locations/home-inspection-cobourg', element: <Cobourg /> },
      { path: 'locations/home-inspection-brantford', element: <Brantford /> },
      { path: 'locations/home-inspection-mapleton', element: <Mapleton /> },
      { path: 'locations/home-inspection-woodstock', element: <Woodstock /> },
      { path: 'locations/home-inspection-adelaide-metcalfe', element: <AdelaideMetcalfe /> },
      { path: 'locations/home-inspection-erin', element: <Erin /> },
      { path: 'locations/home-inspection-puslinch', element: <Puslinch /> },
      { path: 'locations/home-inspection-shelburne', element: <Shelburne /> },
      { path: 'locations/home-inspection-north-dumfries', element: <NorthDumfries /> },
      { path: 'locations/home-inspection-wellington-north', element: <WellingtonNorth /> },
      { path: 'locations/home-inspection-tay-township', element: <TayTownship /> },
      { path: 'locations/home-inspection-minto', element: <Minto /> },
      { path: 'locations/home-inspection-centre-wellington', element: <CentreWellington /> },
      { path: 'locations/home-inspection-ingersoll', element: <Ingersoll /> },
      { path: 'locations/home-inspection-woolwich', element: <Woolwich /> },
      { path: 'locations/home-inspection-pelham', element: <Pelham /> },
      { path: 'locations/home-inspection-tiny-township', element: <TinyTownship /> },
      { path: 'locations/home-inspection-west-lincoln', element: <WestLincoln /> },
      { path: 'locations/home-inspection-mono', element: <Mono /> },
      { path: 'locations/home-inspection-severn', element: <Severn /> },
      { path: 'locations/home-inspection-wellesley', element: <Wellesley /> },
      { path: 'locations/home-inspection-wainfleet', element: <Wainfleet /> },
      { path: 'locations/home-inspection-guelph-eramosa', element: <GuelphEramosa /> },
      { path: 'locations/home-inspection-wilmot', element: <Wilmot /> },
      { path: 'locations/home-inspection-tillsonburg', element: <Tillsonburg /> },
      { path: 'locations/home-inspection-paris', element: <Paris /> },

      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
