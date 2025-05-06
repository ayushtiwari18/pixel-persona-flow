
import React from "react";
import ProfileDataProvider from "./coding-profiles/ProfileDataProvider";
import CodeProfilesContainer from "./coding-profiles/CodeProfilesContainer";

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
  return (
    <ProfileDataProvider 
      githubUsername={githubUsername}
      leetCodeUsername={leetCodeUsername}
      hackerRankUsername={hackerRankUsername}
    >
      {(profileData) => (
        <CodeProfilesContainer {...profileData} />
      )}
    </ProfileDataProvider>
  );
}

// Named and default export
export default CodingProfilesSection;
