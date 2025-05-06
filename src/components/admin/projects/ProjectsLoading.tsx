
import { Loader2 } from "lucide-react";

export default function ProjectsLoading() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Loading projects...</span>
    </div>
  );
}
