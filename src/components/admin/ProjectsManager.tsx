
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { Trash, Plus } from "lucide-react";

export default function ProjectsManager() {
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

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
    const updated = [...projectsList];
    updated.splice(index, 1);
    setProjectsList(updated);
    toast.success("Project deleted!", { description: "In a real app, this would be saved to the database." });
  };

  const handleAdd = () => {
    const newProject: Project = {
      id: `new-${Date.now()}`,
      title: "New Project",
      description: "Project description",
      image: "/placeholder.svg",
      technologies: [],
      category: "web",
      featured: false,
      date: new Date().toISOString().split('T')[0],
    };

    setProjectsList([...projectsList, newProject]);
  };

  const handleSave = () => {
    toast.success("Projects saved successfully!", {
      description: "In a real app, this would be saved to the database."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projectsList.map((project, i) => (
          <div key={project.id} className="border rounded-lg p-6 bg-background shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-lg">Project #{i + 1}</h3>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(i)}>
                <Trash className="h-4 w-4 mr-2" />
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
          </div>
        ))}
      </div>

      {projectsList.length > 0 && (
        <Button size="lg" onClick={handleSave}>
          Save All Changes
        </Button>
      )}
    </div>
  );
}
