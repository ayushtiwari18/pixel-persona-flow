
import AdminLayout from "@/components/layout/AdminLayout";
import CertificationsManager from "@/components/admin/CertificationsManager";

export default function AdminCertificationsPage() {
  return (
    <AdminLayout title="Certifications Management">
      <CertificationsManager />
    </AdminLayout>
  );
}
