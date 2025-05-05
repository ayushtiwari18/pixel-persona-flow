
import { useState } from "react";
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

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const queryClient = useQueryClient();
  
  // Refresh data when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Invalidate relevant query data when switching tabs
    if (value === "overview") {
      queryClient.invalidateQueries({ queryKey: ['projects-count'] });
      queryClient.invalidateQueries({ queryKey: ['hackathons-count'] });
      queryClient.invalidateQueries({ queryKey: ['recent-activity'] });
    } else if (value === "projects") {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } else if (value === "hackathons") {
      queryClient.invalidateQueries({ queryKey: ['hackathons'] });
    }
  };
  
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
