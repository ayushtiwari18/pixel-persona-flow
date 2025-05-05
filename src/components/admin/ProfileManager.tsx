
import { useState, useEffect } from "react";
import { siteConfig } from "@/data/site-config";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PersonalInfoForm from "./profile/PersonalInfoForm";
import SocialLinksForm from "./profile/SocialLinksForm";
import ContactSettingsForm from "./profile/ContactSettingsForm";
import ProfileLoading from "./profile/ProfileLoading";
import { ProfileSettings } from "./profile/types";

export default function ProfileManager() {
  const [isLoading, setIsLoading] = useState(true);
  
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
      
      return data as ProfileSettings | null;
    }
  });

  // Set loading state
  useEffect(() => {
    if (!isLoadingProfile) {
      setIsLoading(false);
    }
  }, [isLoadingProfile]);

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalInfoForm 
          profileSettings={profileSettings}
          initialName={siteConfig.name}
          initialTitle={siteConfig.title}
          initialDescription={siteConfig.description}
          isLoading={isLoading}
        />
        
        <SocialLinksForm 
          profileSettings={profileSettings}
          initialGithubUrl={siteConfig.links.github}
          initialLinkedinUrl={siteConfig.links.linkedin}
          initialTwitterUrl={siteConfig.links.twitter || ""}
          isLoading={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ContactSettingsForm 
          profileSettings={profileSettings}
          initialResumeUrl={siteConfig.resume}
          initialFormEndpoint={siteConfig.formEndpoint || ""}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
