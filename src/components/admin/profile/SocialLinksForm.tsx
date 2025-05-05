
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSettings } from "./types";

interface SocialLinksFormProps {
  profileSettings: ProfileSettings | null;
  initialGithubUrl: string;
  initialLinkedinUrl: string;
  initialTwitterUrl: string;
  isLoading: boolean;
}

export default function SocialLinksForm({
  profileSettings,
  initialGithubUrl,
  initialLinkedinUrl,
  initialTwitterUrl,
  isLoading
}: SocialLinksFormProps) {
  const queryClient = useQueryClient();
  const [githubUrl, setGithubUrl] = useState(initialGithubUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(initialLinkedinUrl);
  const [twitterUrl, setTwitterUrl] = useState(initialTwitterUrl);

  // Update local state when profile data is fetched
  useEffect(() => {
    if (profileSettings) {
      setGithubUrl(profileSettings.github_url || initialGithubUrl);
      setLinkedinUrl(profileSettings.linkedin_url || initialLinkedinUrl);
      setTwitterUrl(profileSettings.twitter_url || initialTwitterUrl);
    }
  }, [profileSettings, initialGithubUrl, initialLinkedinUrl, initialTwitterUrl]);

  // Update profile settings mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { 
      github_url: string; 
      linkedin_url: string; 
      twitter_url: string 
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
      toast.success("Social links saved successfully!");
    },
    onError: (error) => {
      console.error("Error saving social links:", error);
      toast.error("Failed to save social links");
    }
  });

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
        twitter_url: twitterUrl
      });
    } catch (error) {
      console.error("Error saving social links:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
      <h3 className="text-xl font-bold">Social Links</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub</label>
          <Input
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">LinkedIn</label>
          <Input
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Twitter</label>
          <Input
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
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
            Save Social Links
          </>
        )}
      </Button>
    </div>
  );
}
