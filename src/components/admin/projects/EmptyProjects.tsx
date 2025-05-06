
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyProjectsProps {
  onAddProject: () => void;
}

export default function EmptyProjects({ onAddProject }: EmptyProjectsProps) {
  return (
    <div className="text-center p-8 border border-dashed rounded-lg">
      <div className="mx-auto w-14 h-14 rounded-full bg-muted/80 flex items-center justify-center mb-4">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No projects yet</h3>
      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
        Add your first project to showcase your work, highlight your skills, and share your accomplishments.
      </p>
      <Button onClick={onAddProject}>
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
