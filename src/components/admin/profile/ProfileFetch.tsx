
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileManager from "@/components/admin/ProfileManager";

export default function ProfileFetch() {
  const queryClient = useQueryClient();
  
  // Prefetch profile settings data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['profile-settings'] });
  }, [queryClient]);
  
  return <ProfileManager />;
}
