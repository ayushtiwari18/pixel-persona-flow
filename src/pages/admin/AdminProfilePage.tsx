
import AdminLayout from "@/components/layout/AdminLayout";
import ProfileManager from "@/components/admin/ProfileManager";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AdminProfilePage() {
  const queryClient = useQueryClient();
  
  // Prefetch profile settings data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['profile-settings'] });
  }, [queryClient]);
  
  return (
    <AdminLayout title="Profile Settings">
      <ProfileManager />
    </AdminLayout>
  );
}
