
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ProjectsManager from "@/components/admin/ProjectsManager";
import BlogManager from "@/components/admin/BlogManager";
import CertificationsManager from "@/components/admin/CertificationsManager";
import CodingProfilesManager from "@/components/admin/CodingProfilesManager";
import ProfileManager from "@/components/admin/ProfileManager";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <AdminLayout>
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
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
