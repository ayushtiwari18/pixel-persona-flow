
import AdminLayout from "@/components/layout/AdminLayout";
import CodingProfilesManager from "@/components/admin/CodingProfilesManager";

export default function AdminCodingProfilesPage() {
  return (
    <AdminLayout title="Coding Profiles Management">
      <CodingProfilesManager />
    </AdminLayout>
  );
}
