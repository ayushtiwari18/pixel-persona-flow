
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { projects as localProjects } from "@/data/projects";
import { Project } from "@/types";
import { Trash, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProjectsManager() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const queryClient = useQueryClient();

  // Fetch projects from Supabase
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
        demoUrl: project.demoUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        technologies: project.technologies || [],
        category: project.category as "web" | "mobile" | "backend" | "machine-learning" | "other",
        featured: project.featured,
        date: project.date,
        submissionCount: project.submissionCount || undefined
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
        .insert([newProject])
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
          demoUrl: project.demoUrl,
          githubUrl: project.githubUrl,
          technologies: project.technologies,
          category: project.category,
          featured: project.featured,
          date: project.date,
          submissionCount: project.submissionCount
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
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    console.error("Error loading projects:", error);
    return (
      <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Error loading projects</h3>
        <p className="text-muted-foreground mb-4">There was a problem loading the projects data.</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['projects'] })}>
          Try Again
        </Button>
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
          <div key={project.id} className="border rounded-lg p-6 bg-background shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-lg">Project #{i + 1}</h3>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleDelete(i)}
                disabled={deleteProjectMutation.isPending}
              >
                {deleteProjectMutation.isPending && deleteProjectMutation.variables === project.id ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4 mr-2" />
                )}
                Delete
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={project.title}
                  onChange={(e) => handleEdit(i, 'title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={project.date}
                  onChange={(e) => handleEdit(i, 'date', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={project.description}
                onChange={(e) => handleEdit(i, 'description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={project.image}
                  onChange={(e) => handleEdit(i, 'image', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select 
                  value={project.category} 
                  onValueChange={(value: "web" | "mobile" | "backend" | "machine-learning" | "other") => handleEdit(i, 'category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="machine-learning">Machine Learning</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies (comma separated)</label>
                <Input
                  value={project.technologies.join(", ")}
                  onChange={(e) => handleTechnologiesChange(i, e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Demo URL (optional)</label>
                <Input
                  value={project.demoUrl || ""}
                  onChange={(e) => handleEdit(i, 'demoUrl', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL (optional)</label>
                <Input
                  value={project.githubUrl || ""}
                  onChange={(e) => handleEdit(i, 'githubUrl', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Submission Count (optional)</label>
                <Input
                  type="number"
                  value={project.submissionCount || ""}
                  onChange={(e) => handleEdit(i, 'submissionCount', e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <Switch
                id={`featured-${i}`}
                checked={project.featured}
                onCheckedChange={(checked) => handleEdit(i, 'featured', checked)}
              />
              <label htmlFor={`featured-${i}`} className="text-sm font-medium">
                Featured Project
              </label>
            </div>
          </div>
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
