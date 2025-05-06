
import AdminLayout from "@/components/layout/AdminLayout";
import ProfileFetch from "@/components/admin/profile/ProfileFetch";

export default function AdminProfilePage() {
  return (
    <AdminLayout title="Profile Settings">
      <ProfileFetch />
    </AdminLayout>
  );
}
