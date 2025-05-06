
import React, { useEffect } from "react";
import ProfileDataProvider from "./coding-profiles/ProfileDataProvider";
import CodeProfilesContainer from "./coding-profiles/CodeProfilesContainer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// PROPS: Pass usernames/badges from Admin Panel integration
type CodingProfilesSectionProps = {
  githubUsername?: string;
  leetCodeUsername?: string;
  hackerRankUsername?: string;
};

export function CodingProfilesSection({
  githubUsername,
  leetCodeUsername,
  hackerRankUsername,
}: CodingProfilesSectionProps) {
  const queryClient = useQueryClient();
  
  // Set up realtime subscription to coding profiles changes
  useEffect(() => {
    const channel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'coding_profiles'
        },
        (payload) => {
          console.log('Coding profiles changed:', payload);
          queryClient.invalidateQueries({ queryKey: ['coding-profiles'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
  
  // Fetch coding profile data from Supabase
  const { data: codingProfileData, isError, error } = useQuery({
    queryKey: ['coding-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coding_profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        if (error.code !== 'PGRST116') { // Not found error is acceptable
          console.error("Error fetching coding profiles:", error);
          toast.error("Failed to load coding profile data");
          throw error;
        }
        return null;
      }
      
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (isError) {
    console.error("Error fetching coding profiles:", error);
  }

  // Use database values or fallback to props
  const finalGithubUsername = codingProfileData?.github_username || githubUsername;
  const finalLeetCodeUsername = codingProfileData?.leetcode_username || leetCodeUsername;
  const finalHackerRankUsername = codingProfileData?.hackerrank_username || hackerRankUsername;
  
  return (
    <ProfileDataProvider 
      githubUsername={finalGithubUsername}
      leetCodeUsername={finalLeetCodeUsername}
      hackerRankUsername={finalHackerRankUsername}
    >
      {(profileData) => (
        <CodeProfilesContainer {...profileData} />
      )}
    </ProfileDataProvider>
  );
}

// Named and default export
export default CodingProfilesSection;
