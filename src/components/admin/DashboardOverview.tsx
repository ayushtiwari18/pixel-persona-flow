
import { useState } from "react";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog-posts";
import { certifications } from "@/data/certifications";

export default function DashboardOverview() {
  const [stats] = useState({
    projects: projects.length,
    blogPosts: blogPosts.length,
    certifications: certifications.length,
    featuredProjects: projects.filter(p => p.featured).length,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{stats.projects}</h2>
          <p className="text-muted-foreground">Projects</p>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{stats.blogPosts}</h2>
          <p className="text-muted-foreground">Blog Posts</p>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{stats.certifications}</h2>
          <p className="text-muted-foreground">Certifications</p>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{stats.featuredProjects}</h2>
          <p className="text-muted-foreground">Featured Projects</p>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}
