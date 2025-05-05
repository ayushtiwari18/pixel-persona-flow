
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Certificate } from "@/types";
import { Plus, Trash, Edit, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function CertificationsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState<Certificate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  // Fetch certifications from Supabase
  const { data: certsList, isLoading } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error("Error fetching certifications:", error);
        toast.error("Failed to load certifications");
        throw error;
      }
      
      // Map Supabase data to our Certificate type
      return data.map(cert => ({
        id: cert.id,
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        url: cert.url || undefined,
        image: cert.image || undefined,
        description: cert.description || undefined
      }));
    }
  });

  // Add a new certification
  const addCertMutation = useMutation({
    mutationFn: async (cert: Omit<Certificate, "id">) => {
      const { data, error } = await supabase
        .from('certifications')
        .insert([{
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          url: cert.url || null,
          image: cert.image || null,
          description: cert.description || null
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error adding certification:", error);
        toast.error("Failed to add certification");
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success("Certification added successfully!");
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Error adding certification");
    }
  });

  // Update an existing certification
  const updateCertMutation = useMutation({
    mutationFn: async (cert: Certificate) => {
      const { data, error } = await supabase
        .from('certifications')
        .update({
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          url: cert.url || null,
          image: cert.image || null,
          description: cert.description || null
        })
        .eq('id', cert.id)
        .select()
        .single();
      
      if (error) {
        console.error("Error updating certification:", error);
        toast.error("Failed to update certification");
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success("Certification updated successfully!");
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Error updating certification");
    }
  });

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

  const handleAdd = () => {
    setCurrentCert({
      id: `cert-${Date.now()}`,
      title: "",
      issuer: "",
      date: new Date().toISOString().split('T')[0],
      url: "",
      image: "/placeholder.svg",
      description: ""
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (cert: Certificate) => {
    setCurrentCert({ ...cert });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteCertMutation.mutate(id);
  };

  const handleSave = () => {
    if (!currentCert) return;

    if (isEditing) {
      // Update existing certification
      updateCertMutation.mutate(currentCert);
    } else {
      // Add new certification
      const { id, ...certWithoutId } = currentCert;
      addCertMutation.mutate(certWithoutId);
    }
  };

  const handleInputChange = (field: keyof Certificate, value: string) => {
    if (!currentCert) return;
    setCurrentCert({ ...currentCert, [field]: value });
  };

  const isSubmitting = addCertMutation.isPending || updateCertMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Certifications</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
          <p className="text-lg text-muted-foreground">Loading certifications...</p>
        </div>
      ) : (
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
                          <Button variant="outline" size="sm" onClick={() => handleEdit(cert)}>
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
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Certification' : 'Add New Certification'}
            </DialogTitle>
          </DialogHeader>
          
          {currentCert && (
            <div className="space-y-4 py-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={currentCert.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Issuer</label>
                <Input
                  value={currentCert.issuer}
                  onChange={(e) => handleInputChange('issuer', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={currentCert.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">URL (optional)</label>
                <Input
                  value={currentCert.url || ""}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL (optional)</label>
                <Input
                  value={currentCert.image || ""}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description (optional)</label>
                <Textarea
                  value={currentCert.description || ""}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isEditing ? 'Update' : 'Add'} Certification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
