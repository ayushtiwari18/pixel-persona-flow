
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SiteConfigProvider } from "@/components/SiteConfigProvider";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import CertificationsPage from "./pages/CertificationsPage";
import CodingProfilePage from "./pages/CodingProfilePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminProjectsPage from "./pages/admin/AdminProjectsPage";
import AdminBlogPage from "./pages/admin/AdminBlogPage";
import AdminCertificationsPage from "./pages/admin/AdminCertificationsPage";
import AdminCodingProfilesPage from "./pages/admin/AdminCodingProfilesPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminHackathonsPage from "./pages/admin/AdminHackathonsPage";
import NotFound from "./pages/NotFound";
import HackathonsPage from "./pages/HackathonsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <SiteConfigProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/coding-profile" element={<CodingProfilePage />} />
              <Route path="/hackathons" element={<HackathonsPage />} />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/projects" element={<AdminProjectsPage />} />
              <Route path="/admin/blog" element={<AdminBlogPage />} />
              <Route path="/admin/certifications" element={<AdminCertificationsPage />} />
              <Route path="/admin/hackathons" element={<AdminHackathonsPage />} />
              <Route path="/admin/coding-profiles" element={<AdminCodingProfilesPage />} />
              <Route path="/admin/profile" element={<AdminProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </SiteConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
