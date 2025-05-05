
import AdminLayout from "@/components/layout/AdminLayout";
import CodingProfilesManager from "@/components/admin/CodingProfilesManager";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AdminCodingProfilesPage() {
  const queryClient = useQueryClient();
  
  // Prefetch coding profiles data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['admin-coding-profiles'] });
    queryClient.invalidateQueries({ queryKey: ['admin-hackerrank-badges'] });
  }, [queryClient]);
  
  return (
    <AdminLayout title="Coding Profiles Management">
      <CodingProfilesManager />
    </AdminLayout>
  );
}
