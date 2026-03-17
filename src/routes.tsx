import React, { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { blogPostsData } from './data/blogPosts';
import { locationData } from './data/locationData';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Outlet } from 'react-router-dom';

function RootLayout() {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
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
const LocationDetail = lazy(() => import('./pages/LocationDetail'));
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
const ServiceCityPage = lazy(() => import('./pages/services/ServiceCityPage'));
const BlogCityPage = lazy(() => import('./pages/blog/BlogCityPage'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Index /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'services', element: <Services /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'blog/:blogSlug/:citySlug', element: <BlogCityPage /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'locations', element: <Locations /> },
      { path: 'locations/:slug', element: <LocationDetail /> },
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
      { path: 'services/mould-inspection', element: <Navigate to="/services/mold-inspection" replace /> },
      { path: 'services/asbestos-testing', element: <AsbestosTesting /> },
      { path: 'services/wett', element: <WETT /> },
      { path: 'services/thermal-imaging', element: <ThermalImaging /> },
      { path: 'services/lead-paint-testing', element: <LeadPaintTesting /> },
      { path: 'services/well-water-testing', element: <WellWaterTesting /> },
      { path: 'services/sewer-scope', element: <SewerScope /> },
      { path: 'services/air-quality', element: <AirQuality /> },
      { path: 'services/:serviceSlug/:citySlug', element: <ServiceCityPage /> },

      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
