
import React from "react";
import ProfileDataProvider from "./coding-profiles/ProfileDataProvider";
import CodeProfilesContainer from "./coding-profiles/CodeProfilesContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  // Fetch coding profile data from Supabase
  const { data: codingProfileData } = useQuery({
    queryKey: ['coding-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coding_profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching coding profiles:", error);
        return null;
      }
      
      return data;
    }
  });

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

