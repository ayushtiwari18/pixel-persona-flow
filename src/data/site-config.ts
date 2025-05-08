
import { SiteConfig } from "@/types";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
  const { data: profileSettings, isLoading, refetch } = useQuery({
    queryKey: ['site-config'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('profile_settings')
          .select('*')
          .limit(1)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching site config:", error);
          throw error;
        }
        
        return data;
      } catch (err) {
        console.error("Error in useSiteConfig:", err);
        return null;
      }
    }
  });

  // Create the final config by merging the database values with defaults
  const config: SiteConfig = {
    name: profileSettings?.name || siteConfig.name,
    title: profileSettings?.title || siteConfig.title,
    description: profileSettings?.description || siteConfig.description,
    url: siteConfig.url,
    links: {
      github: profileSettings?.github_url || siteConfig.links.github,
      linkedin: profileSettings?.linkedin_url || siteConfig.links.linkedin,
      twitter: profileSettings?.twitter_url || siteConfig.links.twitter,
      dribbble: siteConfig.links.dribbble,
    },
    resume: profileSettings?.resume_url || siteConfig.resume,
    formEndpoint: profileSettings?.form_endpoint || siteConfig.formEndpoint,
  };

  return { config, isLoading, refetch };
}
