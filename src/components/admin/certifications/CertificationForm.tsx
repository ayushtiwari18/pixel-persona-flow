
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Certificate } from "@/types";

interface CertificationFormProps {
  certificate: Certificate | null;
  onSave: (cert: Certificate) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function CertificationForm({ 
  certificate, 
  onSave, 
  onCancel, 
  isSubmitting 
}: CertificationFormProps) {
  const [currentCert, setCurrentCert] = useState<Certificate | null>(certificate);
  
  // Update local state when certificate prop changes
  useEffect(() => {
    setCurrentCert(certificate);
  }, [certificate]);

  if (!currentCert) return null;

  const handleInputChange = (field: keyof Certificate, value: string) => {
    setCurrentCert({ ...currentCert, [field]: value });
  };

  const handleSaveClick = () => {
    if (!currentCert) return;
    onSave(currentCert);
  };

  return (
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

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSaveClick} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {certificate?.id ? 'Update' : 'Add'} Certification
        </Button>
      </DialogFooter>
    </div>
  );
}
