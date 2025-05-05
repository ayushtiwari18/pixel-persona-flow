
import AdminLayout from "@/components/layout/AdminLayout";
import CertificationsManager from "@/components/admin/CertificationsManager";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AdminCertificationsPage() {
  const queryClient = useQueryClient();
  
  // Prefetch certifications data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['certifications'] });
  }, [queryClient]);
  
  return (
    <AdminLayout title="Certifications Management">
      <CertificationsManager />
    </AdminLayout>
  );
}
