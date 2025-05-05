
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSettings } from "./types";

interface ContactSettingsFormProps {
  profileSettings: ProfileSettings | null;
  initialResumeUrl: string;
  initialFormEndpoint: string;
  isLoading: boolean;
}

export default function ContactSettingsForm({
  profileSettings,
  initialResumeUrl,
  initialFormEndpoint,
  isLoading
}: ContactSettingsFormProps) {
  const queryClient = useQueryClient();
  const [resumeUrl, setResumeUrl] = useState(initialResumeUrl);
  const [formEndpoint, setFormEndpoint] = useState(initialFormEndpoint);

  // Update local state when profile data is fetched
  useEffect(() => {
    if (profileSettings) {
      setResumeUrl(profileSettings.resume_url || initialResumeUrl);
      setFormEndpoint(profileSettings.form_endpoint || initialFormEndpoint);
    }
  }, [profileSettings, initialResumeUrl, initialFormEndpoint]);

  // Update profile settings mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { 
      resume_url: string; 
      form_endpoint: string; 
    }) => {
      // Check if we have existing profile settings
      if (profileSettings?.id) {
        // Update existing record
        const { error } = await supabase
          .from('profile_settings')
          .update({
            ...data,
            updated_at: new Date().toISOString()
          })
          .eq('id', profileSettings.id);
        
        if (error) throw error;
      } else {
        // For a new record, ensure all required fields are included
        const completeData = {
          name: profileSettings?.name || "",
          title: profileSettings?.title || "",
          description: profileSettings?.description || "",
          ...data
        };
        
        // Insert new record
        const { error } = await supabase
          .from('profile_settings')
          .insert(completeData);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-settings'] });
      toast.success("Contact settings saved successfully!");
    },
    onError: (error) => {
      console.error("Error saving contact settings:", error);
      toast.error("Failed to save contact settings");
    }
  });

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        resume_url: resumeUrl,
        form_endpoint: formEndpoint
      });
    } catch (error) {
      console.error("Error saving contact settings:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
      <h3 className="text-xl font-bold">Resume & Contact Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Resume URL</label>
          <Input
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Path to your resume file (e.g., /resume.pdf)
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Form Endpoint</label>
          <Input
            value={formEndpoint}
            onChange={(e) => setFormEndpoint(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your Formspree or other form endpoint URL
          </p>
        </div>
      </div>
      <Button 
        onClick={handleSave}
        disabled={updateProfileMutation.isPending}
      >
        {updateProfileMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Contact Settings
          </>
        )}
      </Button>
    </div>
  );
}
