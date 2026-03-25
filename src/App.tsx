import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthContext, useAuthState } from "@/hooks/useAuth";

// Portal Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import RealtorSignupPage from "./pages/auth/RealtorSignupPage";
import HomeownerDashboard from "./pages/dashboard/HomeownerDashboard";
import ReportViewer from "./pages/dashboard/ReportViewer";
import SchedulePage from "./pages/dashboard/SchedulePage";
import ChecklistPage from "./pages/dashboard/ChecklistPage";
import RealtorDashboard from "./pages/realtor/RealtorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NewJobPage from "./pages/admin/NewJobPage";
import ReportGeneratorPage from "./pages/admin/ReportGeneratorPage";
import TrustedRealtorsPage from "./pages/TrustedRealtorsPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Main Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
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
import DesignatedSubstanceSurvey from "./pages/services/DesignatedSubstanceSurvey";
import ServiceCityPage from "./pages/services/ServiceCityPage";
import BlogCityPage from "./pages/blog/BlogCityPage";

const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

// Auth provider wrapper component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authState = useAuthState();
  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/services", element: <Services /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogPost /> },
      { path: "/blog/:blogSlug/:citySlug", element: <BlogCityPage /> },
      { path: "/testimonials", element: <Testimonials /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/booking", element: <Booking /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms", element: <Terms /> },
      { path: "/locations", element: <Locations /> },
      { path: "/locations/:slug", element: <LocationDetail /> },
      { path: "/services/pre-purchase", element: <PrePurchase /> },
      { path: "/services/pre-listing", element: <PreListing /> },
      { path: "/services/new-construction", element: <NewConstruction /> },
      { path: "/services/condo", element: <Condo /> },
      { path: "/services/commercial", element: <Commercial /> },
      { path: "/services/radon-testing", element: <RadonTesting /> },
      { path: "/services/mold-inspection", element: <MoldInspection /> },
      { path: "/services/mould-inspection", element: <Navigate to="/services/mold-inspection" replace /> },
      { path: "/services/asbestos-testing", element: <AsbestosTesting /> },
      { path: "/services/wett", element: <WETT /> },
      { path: "/services/thermal-imaging", element: <ThermalImaging /> },
      { path: "/services/lead-paint-testing", element: <LeadPaintTesting /> },
      { path: "/services/well-water-testing", element: <WellWaterTesting /> },
      { path: "/services/sewer-scope", element: <SewerScope /> },
      { path: "/services/air-quality", element: <AirQuality /> },
      { path: "/services/designated-substance-survey", element: <DesignatedSubstanceSurvey /> },
      { path: "/services/:serviceSlug/:citySlug", element: <ServiceCityPage /> },
      // Portal routes
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/signup/realtor", element: <RealtorSignupPage /> },
      { path: "/dashboard", element: <ProtectedRoute role="homeowner"><HomeownerDashboard /></ProtectedRoute> },
      { path: "/dashboard/reports/:id", element: <ProtectedRoute role="homeowner"><ReportViewer /></ProtectedRoute> },
      { path: "/dashboard/schedule", element: <ProtectedRoute role="homeowner"><SchedulePage /></ProtectedRoute> },
      { path: "/dashboard/checklist", element: <ProtectedRoute role="homeowner"><ChecklistPage /></ProtectedRoute> },
      { path: "/realtor-dashboard", element: <ProtectedRoute role="realtor"><RealtorDashboard /></ProtectedRoute> },
      { path: "/admin", element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute> },
      { path: "/admin/jobs/new", element: <ProtectedRoute role="admin"><NewJobPage /></ProtectedRoute> },
      { path: "/admin/jobs/:id/report", element: <ProtectedRoute role="admin"><ReportGeneratorPage /></ProtectedRoute> },
      { path: "/trusted-realtors", element: <TrustedRealtorsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
