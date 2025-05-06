
import { Button } from "@/components/ui/button";
import { Plus, Save, Loader2 } from "lucide-react";

interface ProjectsHeaderProps {
  onAddProject: () => void;
  onSaveProjects: () => void;
  isSubmitting: boolean;
}

export default function ProjectsHeader({
  onAddProject,
  onSaveProjects,
  isSubmitting
}: ProjectsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Manage Projects</h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onAddProject}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
        <Button
          onClick={onSaveProjects}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
