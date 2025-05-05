
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog-posts";
import { certifications } from "@/data/certifications";
import { toast } from "sonner";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: projects.length,
    blogPosts: blogPosts.length,
    certifications: certifications.length,
    featuredProjects: projects.filter(p => p.featured).length,
    hackathons: 0,
  });

  // Fetch hackathons count from Supabase
  const { data: hackathonsData, isLoading: isLoadingHackathons } = useQuery({
    queryKey: ['hackathons-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('hackathons')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error("Error fetching hackathon count:", error);
        toast.error("Failed to fetch hackathons count");
        return 0;
      }
      
      return count || 0;
    }
  });

  // Fetch recent activity from Supabase
  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);
      
      if (error) {
        console.error("Error fetching recent activity:", error);
        toast.error("Failed to fetch recent activity");
        return [];
      }
      
      return data || [];
    }
  });

  useEffect(() => {
    if (hackathonsData !== undefined) {
      setStats(prev => ({
        ...prev,
        hackathons: hackathonsData
      }));
    }
  }, [hackathonsData]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          <h2 className="text-2xl font-bold mb-2">{isLoadingHackathons ? "..." : stats.hackathons}</h2>
          <p className="text-muted-foreground">Hackathons</p>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {isLoadingActivity ? (
            <p className="text-sm text-muted-foreground">Loading recent activity...</p>
          ) : recentActivity && recentActivity.length > 0 ? (
            recentActivity.map((item: any) => (
              <div key={item.id} className="py-2 border-b last:border-0">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}
