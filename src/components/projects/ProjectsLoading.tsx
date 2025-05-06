
import { Loader2 } from "lucide-react";

export default function ProjectsLoading() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
      <p className="text-lg text-muted-foreground">Loading projects...</p>
    </div>
  );
}
