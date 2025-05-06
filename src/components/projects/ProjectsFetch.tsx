
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types";
import { toast } from "sonner";
import { projects as localProjects } from "@/data/projects";
import ProjectsLoading from "./ProjectsLoading";
import ProjectsError from "./ProjectsError";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function ProjectsFetch() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
        // Fallback to local data if Supabase query fails
        return localProjects;
      }
      
      // Map Supabase data to our Project type
      return data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        
        demoUrl: project.demourl || undefined,
        githubUrl: project.githuburl || undefined,
        technologies: project.technologies || [],
        category: project.category as "web" | "mobile" | "backend" | "machine-learning" | "other",
        featured: project.featured,
        date: project.date,
        submissionCount: project.submissioncount || undefined
      }));
    }
  });

  if (isLoading) {
    return <ProjectsLoading />;
  }

  if (error) {
    return <ProjectsError />;
  }

  return <ProjectsSection projects={projects} />;
}
