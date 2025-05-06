
import { Project } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash, Loader2 } from "lucide-react";

interface ProjectFormProps {
  project: Project;
  index: number;
  onEdit: (index: number, field: keyof Project, value: any) => void;
  onTechnologiesChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  isDeleting: boolean;
  deletingId?: string;
}

export default function ProjectForm({
  project,
  index,
  onEdit,
  onTechnologiesChange,
  onDelete,
  isDeleting,
  deletingId
}: ProjectFormProps) {
  return (
    <div className="border rounded-lg p-6 bg-background shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-lg">Project #{index + 1}</h3>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => onDelete(index)}
          disabled={isDeleting}
        >
          {isDeleting && deletingId === project.id ? (
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
            onChange={(e) => onEdit(index, 'title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Input
            type="date"
            value={project.date}
            onChange={(e) => onEdit(index, 'date', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={project.description}
          onChange={(e) => onEdit(index, 'description', e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={project.image}
            onChange={(e) => onEdit(index, 'image', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select 
            value={project.category} 
            onValueChange={(value: "web" | "mobile" | "backend" | "machine-learning" | "other") => onEdit(index, 'category', value)}
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
            onChange={(e) => onTechnologiesChange(index, e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Demo URL (optional)</label>
          <Input
            value={project.demoUrl || ""}
            onChange={(e) => onEdit(index, 'demoUrl', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub URL (optional)</label>
          <Input
            value={project.githubUrl || ""}
            onChange={(e) => onEdit(index, 'githubUrl', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Submission Count (optional)</label>
          <Input
            type="number"
            value={project.submissionCount || ""}
            onChange={(e) => onEdit(index, 'submissionCount', e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-6">
        <Switch
          id={`featured-${index}`}
          checked={project.featured}
          onCheckedChange={(checked) => onEdit(index, 'featured', checked)}
        />
        <label htmlFor={`featured-${index}`} className="text-sm font-medium">
          Featured Project
        </label>
      </div>
    </div>
  );
}
