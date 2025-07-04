import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch projects from Supabase
  const { data: fetchedProjects, isError, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Format data to match Project type
        return data.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          image: project.image,
          date: project.date,
          category: project.category as "web" | "mobile" | "backend" | "machine-learning" | "other",
          technologies: project.technologies,
          featured: project.featured,
          demoUrl: project.demourl,
          githubUrl: project.githuburl,
          submissionCount: project.submissioncount
        })) as Project[];
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    }
  });

  // Update the local state when data is fetched
  useEffect(() => {
    if (fetchedProjects) {
      setProjects(fetchedProjects);
      setIsLoading(false);
    }
  }, [fetchedProjects]);

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async (project: Project) => {
      try {
        // Format project data to match Supabase schema
        const { data, error } = await supabase
          .from('projects')
          .update({
            title: project.title,
            description: project.description,
            image: project.image,
            date: project.date,
            category: project.category,
            technologies: project.technologies,
            featured: project.featured,
            demourl: project.demoUrl,
            githuburl: project.githubUrl,
            submissioncount: project.submissionCount
          })
          .eq('id', project.id);
        
        if (error) {
          console.error("Error updating project:", error);
          throw error;
        }
        
        return project;
      } catch (error) {
        console.error("Error updating project:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Error updating project:", error);
    }
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId);
        
        if (error) throw error;
        return projectId;
      } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
      }
    },
    onSuccess: (projectId) => {
      setProjects(projects.filter(p => p.id !== projectId));
      setDeletingId("");
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
      setDeletingId("");
      toast.error("Failed to delete project");
    }
  });

  const handleAddProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "New Project",
      description: "",
      image: "/placeholder.svg",
      date: new Date().toISOString().split('T')[0],
      category: "web",
      technologies: [],
      featured: false
    };
    setProjects([...projects, newProject]);
  };

  const handleEditProject = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const handleTechnologiesChange = (index: number, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { 
      ...updatedProjects[index], 
      technologies: value.split(",").map(tech => tech.trim()).filter(Boolean)
    };
    setProjects(updatedProjects);
  };

  const handleDeleteProject = (index: number) => {
    const projectId = projects[index].id;
    
    // If it's a new project (not saved to DB yet)
    if (projectId.startsWith('project-')) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
      return;
    }
    
    // Otherwise delete from database
    setDeletingId(projectId);
    deleteProjectMutation.mutate(projectId);
  };

  const handleSaveProjects = async () => {
    try {
      setIsSubmitting(true);
      
      // Filter out projects that need to be created vs updated
      const existingProjects = projects.filter(p => !p.id.startsWith('project-'));
      const newProjects = projects.filter(p => p.id.startsWith('project-'));
      
      // Update existing projects
      if (existingProjects.length > 0) {
        await Promise.all(
          existingProjects.map(project => 
            updateProjectMutation.mutateAsync(project)
          )
        );
      }
      
      // Create new projects
      if (newProjects.length > 0) {
        const { data, error } = await supabase
          .from('projects')
          .insert(
            newProjects.map(project => ({
              title: project.title,
              description: project.description,
              image: project.image,
              date: project.date,
              category: project.category,
              technologies: project.technologies,
              featured: project.featured,
              demourl: project.demoUrl,
              githuburl: project.githubUrl,
              submissioncount: project.submissionCount
            }))
          );
          
        if (error) {
          console.error("Error saving projects:", error);
          toast.error("Failed to save new projects");
          setIsSubmitting(false);
          return;
        }
      }
      
      // Refetch projects to get the updated list with new IDs
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Projects saved successfully!");
    } catch (error) {
      console.error("Error saving projects:", error);
      toast.error("Failed to save projects");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    projects,
    isLoading,
    isError,
    isSubmitting,
    deletingId,
    handleAddProject,
    handleEditProject,
    handleTechnologiesChange,
    handleDeleteProject,
    handleSaveProjects,
    refetch
  };
}
