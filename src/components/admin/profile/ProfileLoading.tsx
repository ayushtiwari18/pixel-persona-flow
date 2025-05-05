
import { Loader2 } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
      <p className="text-lg">Loading profile settings...</p>
    </div>
  );
}
