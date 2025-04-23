
import AdminLayout from "@/components/layout/AdminLayout";
import BlogManager from "@/components/admin/BlogManager";

export default function AdminBlogPage() {
  return (
    <AdminLayout title="Blog Management">
      <BlogManager />
    </AdminLayout>
  );
}
