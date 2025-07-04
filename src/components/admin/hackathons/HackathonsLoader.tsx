
import { Loader2 } from "lucide-react";

export default function HackathonsLoader() {
  return (
    <div className="text-center py-8">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p>Loading hackathons...</p>
    </div>
  );
}
