
import AdminLayout from "@/components/layout/AdminLayout";
import ProjectsManager from "@/components/admin/ProjectsManager";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AdminProjectsPage() {
  const queryClient = useQueryClient();
  
  // Prefetch projects data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  }, [queryClient]);
  
  return (
    <AdminLayout title="Projects Management">
      <ProjectsManager />
    </AdminLayout>
  );
}
