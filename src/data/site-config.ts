
import { SiteConfig } from "@/types";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Default config as fallback
export const siteConfig: SiteConfig = {
  name: "Ayush Tiwari",
  title: "Full Stack Developer & Creative Technologist",
  description:
    "Portfolio showcasing my work in web development, 3D experiences, games, virtual labs, and community-driven tech projects.",
  url: "https://ayusht.netlify.app", 
  links: {
    github: "https://github.com/ayushtiwari18",
    linkedin: "https://linkedin.com/in/tiwariaayush",
    twitter: "https://twitter.com/_aayush_03__",
    dribbble: "", 
  },
  resume:
    "https://drive.google.com/file/d/1n5ZUWJ0DbY3B6N8SyfugTKysaPfMjP_U/view?usp=drive_link", 
  formEndpoint: "https://formspree.io/f/mgvkylno", 
};

// Hook for fetching dynamic site config from Supabase
export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(siteConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('profile_settings')
          .select('*')
          .limit(1)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching site config:", error);
          return;
        }
        
        if (data) {
          setConfig({
            name: data.name || siteConfig.name,
            title: data.title || siteConfig.title,
            description: data.description || siteConfig.description,
            url: siteConfig.url,
            links: {
              github: data.github_url || siteConfig.links.github,
              linkedin: data.linkedin_url || siteConfig.links.linkedin,
              twitter: data.twitter_url || siteConfig.links.twitter,
              dribbble: siteConfig.links.dribbble,
            },
            resume: data.resume_url || siteConfig.resume,
            formEndpoint: data.form_endpoint || siteConfig.formEndpoint,
          });
        }
      } catch (err) {
        console.error("Error in useSiteConfig:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();

    // Set up realtime subscription
    const channel = supabase
      .channel('profile-settings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profile_settings'
        },
        (payload) => {
          console.log('Profile settings changed:', payload);
          fetchConfig();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { config, isLoading };
}
