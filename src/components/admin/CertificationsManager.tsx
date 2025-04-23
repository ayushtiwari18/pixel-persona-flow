
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { certifications } from "@/data/certifications";
import { Certificate } from "@/types";
import { Plus, Trash, Edit } from "lucide-react";

export default function CertificationsManager() {
  const [certsList, setCertsList] = useState<Certificate[]>(certifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState<Certificate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
    setCertsList(certsList.filter(cert => cert.id !== id));
    toast.success("Certificate deleted successfully!");
  };

  const handleSave = () => {
    if (!currentCert) return;

    if (isEditing) {
      // Update existing certificate
      setCertsList(certsList.map(cert => 
        cert.id === currentCert.id ? currentCert : cert
      ));
      toast.success("Certificate updated successfully!");
    } else {
      // Add new certificate
      setCertsList([...certsList, currentCert]);
      toast.success("Certificate added successfully!");
    }
    
    setIsDialogOpen(false);
  };

  const handleInputChange = (field: keyof Certificate, value: string) => {
    if (!currentCert) return;
    setCurrentCert({ ...currentCert, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Certifications</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

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
              {certsList.map((cert) => (
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
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(cert.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
            <Button onClick={handleSave}>
              {isEditing ? 'Update' : 'Add'} Certification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
