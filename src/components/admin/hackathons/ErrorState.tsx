
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  refetch: () => void;
}

export default function ErrorState({ refetch }: ErrorStateProps) {
  return (
    <div className="p-6 text-center">
      <p className="text-red-500">Failed to load hackathons. Please try again later.</p>
      <Button onClick={refetch} className="mt-4">Retry</Button>
    </div>
  );
}
