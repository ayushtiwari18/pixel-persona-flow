
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ProjectsManager from "@/components/admin/ProjectsManager";
import BlogManager from "@/components/admin/BlogManager";
import CertificationsManager from "@/components/admin/CertificationsManager";
import CodingProfilesManager from "@/components/admin/CodingProfilesManager";
import ProfileManager from "@/components/admin/ProfileManager";
import HackathonsManager from "@/components/admin/HackathonsManager";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const queryClient = useQueryClient();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Check authentication status
  useEffect(() => {
    if (!user) {
      navigate("/admin");
    } else if (!isAdmin) {
      toast.error("You don't have administrator privileges");
      navigate("/");
    }
  }, [user, isAdmin, navigate]);
  
  // Refresh data when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Invalidate relevant query data when switching tabs
    if (value === "overview") {
      queryClient.invalidateQueries({ queryKey: ['projects-count'] });
      queryClient.invalidateQueries({ queryKey: ['hackathons-count'] });
      queryClient.invalidateQueries({ queryKey: ['certifications-count'] });
      queryClient.invalidateQueries({ queryKey: ['recent-activity'] });
    } else if (value === "projects") {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } else if (value === "blog") {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });  
    } else if (value === "hackathons") {
      queryClient.invalidateQueries({ queryKey: ['hackathons'] });
    } else if (value === "certifications") {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
    } else if (value === "coding") {
      queryClient.invalidateQueries({ queryKey: ['coding-profiles'] });
    } else if (value === "profile") {
      queryClient.invalidateQueries({ queryKey: ['profile-settings'] });
    }
  };
  
  // Initial data refresh when component mounts
  useEffect(() => {
    if (user && isAdmin) {
      // Initial data load based on active tab
      handleTabChange(activeTab);
    }
  }, [user, isAdmin]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Don't render until authentication check completes
  if (!user || !isAdmin) {
    return null;
  }
  
  return (
    <AdminLayout>
      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="coding">Coding Profiles</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DashboardOverview />
        </TabsContent>
        
        <TabsContent value="projects">
          <ProjectsManager />
        </TabsContent>
        
        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>
        
        <TabsContent value="certifications">
          <CertificationsManager />
        </TabsContent>
        
        <TabsContent value="hackathons">
          <HackathonsManager />
        </TabsContent>
        
        <TabsContent value="coding">
          <CodingProfilesManager />
        </TabsContent>
        
        <TabsContent value="profile">
          <ProfileManager />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
