import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog-posts";
import { certifications } from "@/data/certifications";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: blogPosts.length,
    certifications: 0,
    featuredProjects: 0,
    hackathons: 0,
  });

  // Fetch projects count from Supabase
  const { data: projectsData, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects-count'],
    queryFn: async () => {
      try {
        // Get total projects count
        const { count: totalCount, error: totalError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        
        if (totalError) throw totalError;
        
        // Get featured projects count
        const { count: featuredCount, error: featuredError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('featured', true);
        
        if (featuredError) throw featuredError;
        
        return {
          total: totalCount || 0,
          featured: featuredCount || 0
        };
      } catch (error) {
        console.error("Error fetching projects count:", error);
        toast.error("Failed to fetch projects count");
        
        // Fallback to local data
        return {
          total: projects.length,
          featured: projects.filter(p => p.featured).length
        };
      }
    }
  });

  // Fetch certifications count from Supabase
  const { data: certificationsCount, isLoading: isLoadingCertifications } = useQuery({
    queryKey: ['certifications-count'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('certifications')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        
        return count || 0;
      } catch (error) {
        console.error("Error fetching certifications count:", error);
        toast.error("Failed to fetch certifications count");
        return 0;
      }
    }
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

  // Fetch recent activity from Supabase (combining projects and hackathons)
  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      try {
        // Get recent hackathons
        const { data: hackathonsData, error: hackathonsError } = await supabase
          .from('hackathons')
          .select('id, name, date')
          .order('date', { ascending: false })
          .limit(3);
        
        if (hackathonsError) throw hackathonsError;
        
        // Get recent projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('id, title, date')
          .order('date', { ascending: false })
          .limit(3);
        
        if (projectsError) throw projectsError;
        
        // Combine and format the data
        const hackathons = hackathonsData.map(h => ({
          id: h.id,
          title: h.name,
          date: h.date,
          type: 'hackathon'
        }));
        
        const projects = projectsData.map(p => ({
          id: p.id,
          title: p.title,
          date: p.date,
          type: 'project'
        }));
        
        // Combine, sort by date, and take the most recent 5
        return [...hackathons, ...projects]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
          
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        toast.error("Failed to fetch recent activity");
        return [];
      }
    }
  });

  useEffect(() => {
    if (projectsData) {
      setStats(prev => ({
        ...prev,
        projects: projectsData.total,
        featuredProjects: projectsData.featured
      }));
    }
  }, [projectsData]);

  useEffect(() => {
    if (certificationsCount !== undefined) {
      setStats(prev => ({
        ...prev,
        certifications: certificationsCount
      }));
    }
  }, [certificationsCount]);

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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{isLoadingProjects ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.projects}</h2>
          <p className="text-muted-foreground">Projects</p>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{stats.blogPosts}</h2>
          <p className="text-muted-foreground">Blog Posts</p>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{isLoadingCertifications ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.certifications}</h2>
          <p className="text-muted-foreground">Certifications</p>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{isLoadingHackathons ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.hackathons}</h2>
          <p className="text-muted-foreground">Hackathons</p>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-2">{isLoadingProjects ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.featuredProjects}</h2>
          <p className="text-muted-foreground">Featured Projects</p>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {isLoadingActivity ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <p className="text-sm text-muted-foreground">Loading recent activity...</p>
            </div>
          ) : recentActivity && recentActivity.length > 0 ? (
            recentActivity.map((item: any) => (
              <div key={item.id} className="py-2 border-b last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    {item.type === 'hackathon' ? 'Hackathon' : 'Project'}
                  </span>
                </div>
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
