
import { Button } from "@/components/ui/button";

interface ProjectsErrorProps {
  error?: Error | null;
  refetch?: () => void;
  onRetry?: () => void;
}

export default function ProjectsError({ error, refetch, onRetry }: ProjectsErrorProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (refetch) {
      refetch();
    }
  };

  return (
    <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-lg">
      <h3 className="text-lg font-medium mb-2">Error loading projects</h3>
      <p className="text-muted-foreground mb-4">There was a problem loading the projects data.</p>
      <Button onClick={handleRetry}>
        Try Again
      </Button>
    </div>
  );
}
