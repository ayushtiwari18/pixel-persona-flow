
import AdminLayout from "@/components/layout/AdminLayout";
import HackathonsManager from "@/components/admin/HackathonsManager";

export default function AdminHackathonsPage() {
  return (
    <AdminLayout title="Hackathons Management">
      <HackathonsManager />
    </AdminLayout>
  );
}
