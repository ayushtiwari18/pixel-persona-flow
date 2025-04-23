
import AdminLayout from "@/components/layout/AdminLayout";
import ProfileManager from "@/components/admin/ProfileManager";

export default function AdminProfilePage() {
  return (
    <AdminLayout title="Profile Settings">
      <ProfileManager />
    </AdminLayout>
  );
}
