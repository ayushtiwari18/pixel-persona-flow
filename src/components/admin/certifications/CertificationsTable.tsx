
import { Button } from "@/components/ui/button";
import { Certificate } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CertificationsTableProps {
  certsList: Certificate[] | undefined;
  onEdit: (cert: Certificate) => void;
}

export default function CertificationsTable({ certsList, onEdit }: CertificationsTableProps) {
  const queryClient = useQueryClient();

  // Delete a certification
  const deleteCertMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting certification:", error);
        toast.error("Failed to delete certification");
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success("Certification deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting certification");
    }
  });

  const handleDelete = (id: string) => {
    deleteCertMutation.mutate(id);
  };

  return (
    <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Issuer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certsList && certsList.length > 0 ? (
              certsList.map((cert) => (
                <tr key={cert.id} className="border-b">
                  <td className="p-4">{cert.title}</td>
                  <td className="p-4">{cert.issuer}</td>
                  <td className="p-4">{cert.date}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(cert)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(cert.id)}
                        disabled={deleteCertMutation.isPending}
                      >
                        {deleteCertMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Trash className="h-4 w-4 mr-2" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                  No certifications found. Add some using the button above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
