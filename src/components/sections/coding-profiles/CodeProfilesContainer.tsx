
import React from "react";
import { PieChartIcon } from "lucide-react";
import useDarkMode from "@/hooks/useDarkMode";

import GithubProfileBlock from "./GithubProfileBlock";
import LeetCodeProfileBlock from "./LeetCodeProfileBlock";
import HackerRankBadgesBlock from "./HackerRankBadgesBlock";

// PROPS: Pass usernames/badges from Admin Panel integration
type CodeProfilesContainerProps = {
  githubUsername?: string;
  githubData: any;
  githubLoading: boolean;
  githubError: boolean;
  calendarData: Array<Array<number>>;
  
  leetCodeUsername?: string;
  lcStats: any;
  lcLoading: boolean;
  lcError: boolean;
  
  hackerRankUsername?: string;
  hackerRankBadges: any[];
  hackerRankLoading: boolean;
  hackerRankError: boolean;
};

export default function CodeProfilesContainer({
  githubUsername,
  githubData,
  githubLoading,
  githubError,
  calendarData,
  
  leetCodeUsername,
  lcStats,
  lcLoading,
  lcError,
  
  hackerRankUsername,
  hackerRankBadges,
  hackerRankLoading,
  hackerRankError,
}: CodeProfilesContainerProps) {
  const { theme } = useDarkMode();
  const isDark = theme === "dark";
  
  return (
    <section
      id="coding-profiles"
      className={`py-20 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold mb-10 flex items-center gap-3 ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          <PieChartIcon className="inline" />
          Coding Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* GitHub Profile Block */}
          {githubUsername && (
            <GithubProfileBlock
              githubUsername={githubUsername}
              githubData={githubData}
              githubLoading={githubLoading}
              githubError={githubError}
              calendarData={calendarData}
            />
          )}

          {/* LeetCode Profile Block */}
          {leetCodeUsername && (
            <LeetCodeProfileBlock
              leetCodeUsername={leetCodeUsername}
              lcStats={lcStats}
              lcLoading={lcLoading}
              lcError={lcError}
            />
          )}

          {/* HackerRank Profile Block */}
          {hackerRankUsername && hackerRankBadges && (
            <HackerRankBadgesBlock
              hackerRankUsername={hackerRankUsername}
              hackerRankBadges={hackerRankBadges}
              hackerRankLoading={hackerRankLoading}
              hackerRankError={hackerRankError}
            />
          )}
        </div>
      </div>
    </section>
  );
}
