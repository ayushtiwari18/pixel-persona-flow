
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Certificate } from "@/types";
import { Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CertificationForm from "./certifications/CertificationForm";
import CertificationsTable from "./certifications/CertificationsTable";

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

  const handleSave = (cert: Certificate) => {
    if (isEditing) {
      // Update existing certification
      updateCertMutation.mutate(cert);
    } else {
      // Add new certification
      const { id, ...certWithoutId } = cert;
      addCertMutation.mutate(certWithoutId);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
        <CertificationsTable
          certsList={certsList}
          onEdit={handleEdit}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Certification' : 'Add New Certification'}
            </DialogTitle>
          </DialogHeader>
          
          <CertificationForm
            certificate={currentCert}
            onSave={handleSave}
            onCancel={handleCloseDialog}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
