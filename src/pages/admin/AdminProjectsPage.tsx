
import AdminLayout from "@/components/layout/AdminLayout";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default function AdminProjectsPage() {
  return (
    <AdminLayout title="Projects Management">
      <ProjectsManager />
    </AdminLayout>
  );
}
