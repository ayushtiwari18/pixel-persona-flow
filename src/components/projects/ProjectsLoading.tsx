
import { Loader2 } from "lucide-react";

interface ProjectsLoadingProps {
  message?: string;
}

export default function ProjectsLoading({ message = "Loading projects..." }: ProjectsLoadingProps) {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  );
}
