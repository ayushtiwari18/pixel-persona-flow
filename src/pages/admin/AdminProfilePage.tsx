
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import ProfileFetch from "@/components/admin/profile/ProfileFetch";

export default function AdminProfilePage() {
  const queryClient = useQueryClient();
  
  // Prefetch profile settings data (consistent with other admin pages)
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['profile-settings'] });
  }, [queryClient]);

  return (
    <AdminLayout title="Profile Settings">
      <ProfileFetch />
    </AdminLayout>
  );
}
