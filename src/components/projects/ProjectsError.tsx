
import { AlertTriangle } from "lucide-react";

interface ProjectsErrorProps {
  message?: string;
}

export default function ProjectsError({ message = "There was an error loading the projects." }: ProjectsErrorProps) {
  return (
    <div className="container py-12 text-center">
      <AlertTriangle className="h-10 w-10 text-destructive mx-auto mb-4" />
      <p className="text-lg text-destructive">{message}</p>
    </div>
  );
}
