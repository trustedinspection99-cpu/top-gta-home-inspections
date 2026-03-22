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
import { AuthContext, useAuthState } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';

function RootLayout() {
  const [queryClient] = React.useState(() => new QueryClient());
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
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
    </AuthContext.Provider>
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

// Portal Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const RealtorSignupPage = lazy(() => import('./pages/auth/RealtorSignupPage'));
const HomeownerDashboard = lazy(() => import('./pages/dashboard/HomeownerDashboard'));
const ReportViewer = lazy(() => import('./pages/dashboard/ReportViewer'));
const SchedulePage = lazy(() => import('./pages/dashboard/SchedulePage'));
const ChecklistPage = lazy(() => import('./pages/dashboard/ChecklistPage'));
const RealtorDashboard = lazy(() => import('./pages/realtor/RealtorDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const NewJobPage = lazy(() => import('./pages/admin/NewJobPage'));
const ReportGeneratorPage = lazy(() => import('./pages/admin/ReportGeneratorPage'));
const TrustedRealtorsPage = lazy(() => import('./pages/TrustedRealtorsPage'));

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

      // Portal routes
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'signup/realtor', element: <RealtorSignupPage /> },
      { path: 'dashboard', element: <ProtectedRoute role="homeowner"><HomeownerDashboard /></ProtectedRoute> },
      { path: 'dashboard/reports/:id', element: <ProtectedRoute role="homeowner"><ReportViewer /></ProtectedRoute> },
      { path: 'dashboard/schedule', element: <ProtectedRoute role="homeowner"><SchedulePage /></ProtectedRoute> },
      { path: 'dashboard/checklist', element: <ProtectedRoute role="homeowner"><ChecklistPage /></ProtectedRoute> },
      { path: 'realtor-dashboard', element: <ProtectedRoute role="realtor"><RealtorDashboard /></ProtectedRoute> },
      { path: 'admin', element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute> },
      { path: 'admin/jobs/new', element: <ProtectedRoute role="admin"><NewJobPage /></ProtectedRoute> },
      { path: 'admin/jobs/:id/report', element: <ProtectedRoute role="admin"><ReportGeneratorPage /></ProtectedRoute> },
      { path: 'trusted-realtors', element: <TrustedRealtorsPage /> },

      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
