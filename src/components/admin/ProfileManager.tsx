
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { siteConfig } from "@/data/site-config";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function ProfileManager() {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  
  // Fetch profile settings from Supabase
  const { data: profileSettings, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Not found error
        console.error("Error fetching profile settings:", error);
        toast.error("Failed to load profile settings");
        return null;
      }
      
      return data;
    }
  });

  // State for form values
  const [name, setName] = useState(siteConfig.name);
  const [title, setTitle] = useState(siteConfig.title);
  const [description, setDescription] = useState(siteConfig.description);
  const [resumeUrl, setResumeUrl] = useState(siteConfig.resume);
  const [githubUrl, setGithubUrl] = useState(siteConfig.links.github);
  const [linkedinUrl, setLinkedinUrl] = useState(siteConfig.links.linkedin);
  const [twitterUrl, setTwitterUrl] = useState(siteConfig.links.twitter || "");
  const [formEndpoint, setFormEndpoint] = useState(siteConfig.formEndpoint || "");

  // Update local state when profile data is fetched
  useEffect(() => {
    if (profileSettings) {
      setName(profileSettings.name);
      setTitle(profileSettings.title);
      setDescription(profileSettings.description);
      setResumeUrl(profileSettings.resume_url || siteConfig.resume);
      setGithubUrl(profileSettings.github_url || siteConfig.links.github);
      setLinkedinUrl(profileSettings.linkedin_url || siteConfig.links.linkedin);
      setTwitterUrl(profileSettings.twitter_url || siteConfig.links.twitter || "");
      setFormEndpoint(profileSettings.form_endpoint || siteConfig.formEndpoint || "");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [profileSettings]);

  // Update profile settings mutation
  const updateProfileMutation = useMutation({
    mutationFn: async ({
      section,
      data
    }: {
      section: string;
      data: Record<string, any>;
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
        // Insert new record
        const { error } = await supabase
          .from('profile_settings')
          .insert({
            ...data
          });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-settings'] });
    },
    onError: (error) => {
      console.error("Error saving profile settings:", error);
      toast.error("Failed to save profile settings");
    }
  });

  const handleSavePersonalInfo = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        section: 'personal',
        data: {
          name,
          title,
          description
        }
      });
      toast.success("Personal information saved successfully!");
    } catch (error) {
      console.error("Error saving personal info:", error);
    }
  };

  const handleSaveSocialLinks = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        section: 'social',
        data: {
          github_url: githubUrl,
          linkedin_url: linkedinUrl,
          twitter_url: twitterUrl
        }
      });
      toast.success("Social links saved successfully!");
    } catch (error) {
      console.error("Error saving social links:", error);
    }
  };

  const handleSaveFormEndpoint = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        section: 'contact',
        data: {
          resume_url: resumeUrl,
          form_endpoint: formEndpoint
        }
      });
      toast.success("Form endpoint saved successfully!");
    } catch (error) {
      console.error("Error saving form endpoint:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p className="text-lg">Loading profile settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            onClick={handleSavePersonalInfo}
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending && updateProfileMutation.variables?.section === 'personal' ? (
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
            onClick={handleSaveSocialLinks}
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending && updateProfileMutation.variables?.section === 'social' ? (
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
      </div>
      
      <div className="grid grid-cols-1 gap-6">
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
            onClick={handleSaveFormEndpoint}
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending && updateProfileMutation.variables?.section === 'contact' ? (
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
      </div>
    </div>
  );
}
