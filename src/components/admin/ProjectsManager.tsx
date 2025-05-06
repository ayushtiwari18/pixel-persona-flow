
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Project } from "@/types";
import { Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projects as localProjects } from "@/data/projects";
import ProjectForm from "./projects/ProjectForm";
import ProjectsLoading from "./projects/ProjectsLoading";
import ProjectsError from "./projects/ProjectsError";
import EmptyProjects from "./projects/EmptyProjects";

export default function ProjectsManager() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const queryClient = useQueryClient();

  // Fetch projects from Supabase
  const { data: projects, isLoading, error, refetch } = useQuery({
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

  // Update state when data is fetched
  useEffect(() => {
    if (projects) {
      setProjectsList(projects);
    }
  }, [projects]);

  // Create a new project
  const createProjectMutation = useMutation({
    mutationFn: async (newProject: Omit<Project, "id">) => {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: newProject.title,
          description: newProject.description,
          image: newProject.image,
          demourl: newProject.demoUrl,
          githuburl: newProject.githubUrl,
          technologies: newProject.technologies,
          category: newProject.category,
          featured: newProject.featured,
          date: newProject.date,
          submissioncount: newProject.submissionCount
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project created successfully!");
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    }
  });

  // Update an existing project
  const updateProjectMutation = useMutation({
    mutationFn: async (project: Project) => {
      const { data, error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description,
          image: project.image,
          demourl: project.demoUrl,
          githuburl: project.githubUrl,
          technologies: project.technologies,
          category: project.category,
          featured: project.featured,
          date: project.date,
          submissioncount: project.submissionCount
        })
        .eq('id', project.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }
  });

  // Delete a project
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  });

  const handleEdit = (index: number, field: keyof Project, value: any) => {
    const updated = [...projectsList];
    updated[index] = { ...updated[index], [field]: value };
    setProjectsList(updated);
  };

  const handleTechnologiesChange = (index: number, value: string) => {
    const updated = [...projectsList];
    updated[index] = { 
      ...updated[index], 
      technologies: value.split(",").map(tech => tech.trim()) 
    };
    setProjectsList(updated);
  };

  const handleDelete = (index: number) => {
    const projectId = projectsList[index].id;
    deleteProjectMutation.mutate(projectId);
  };

  const handleAdd = () => {
    const newProject: Omit<Project, "id"> = {
      title: "New Project",
      description: "Project description",
      image: "/placeholder.svg",
      technologies: [],
      category: "web",
      featured: false,
      date: new Date().toISOString().split('T')[0],
    };

    createProjectMutation.mutate(newProject);
  };

  const handleSave = () => {
    // Update all projects that have been modified
    const savePromises = projectsList.map(project => {
      return updateProjectMutation.mutateAsync(project);
    });

    Promise.all(savePromises)
      .then(() => {
        toast.success("All projects saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving projects:", error);
        toast.error("Failed to save all projects");
      });
  };

  if (isLoading) {
    return <ProjectsLoading />;
  }

  if (error) {
    return <ProjectsError error={error as Error} refetch={refetch} />;
  }

  if (!projectsList.length) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Projects</h2>
          <Button onClick={handleAdd} disabled={createProjectMutation.isPending}>
            {createProjectMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </>
            )}
          </Button>
        </div>
        <EmptyProjects />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button onClick={handleAdd} disabled={createProjectMutation.isPending}>
          {createProjectMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </>
          )}
        </Button>
      </div>

      <div className="space-y-6">
        {projectsList.map((project, i) => (
          <ProjectForm 
            key={project.id}
            project={project}
            index={i}
            onEdit={handleEdit}
            onTechnologiesChange={handleTechnologiesChange}
            onDelete={handleDelete}
            isDeleting={deleteProjectMutation.isPending}
            deletingId={deleteProjectMutation.variables}
          />
        ))}
      </div>

      {projectsList.length > 0 && (
        <Button 
          size="lg" 
          onClick={handleSave}
          disabled={updateProjectMutation.isPending}
        >
          {updateProjectMutation.isPending ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save All Changes"
          )}
        </Button>
      )}
    </div>
  );
}
