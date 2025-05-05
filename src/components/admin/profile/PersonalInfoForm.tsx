
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSettings } from "./types";

interface PersonalInfoFormProps {
  profileSettings: ProfileSettings | null;
  initialName: string;
  initialTitle: string;
  initialDescription: string;
  isLoading: boolean;
}

export default function PersonalInfoForm({
  profileSettings,
  initialName,
  initialTitle,
  initialDescription,
  isLoading
}: PersonalInfoFormProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  
  // Update local state when profile data is fetched
  useEffect(() => {
    if (profileSettings) {
      setName(profileSettings.name);
      setTitle(profileSettings.title);
      setDescription(profileSettings.description);
    }
  }, [profileSettings]);
  
  // Update profile settings mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string; title: string; description: string }) => {
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
          name: data.name,
          title: data.title,
          description: data.description
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
      toast.success("Personal information saved successfully!");
    },
    onError: (error) => {
      console.error("Error saving personal info:", error);
      toast.error("Failed to save personal information");
    }
  });

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        name,
        title,
        description
      });
    } catch (error) {
      console.error("Error saving personal info:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
      <h3 className="text-xl font-bold">Personal Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
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
            Save Personal Info
          </>
        )}
      </Button>
    </div>
  );
}
