
import React, { useEffect, useState } from "react";
import { PieChart as PieChartIcon, Github, Code2, Award } from "lucide-react";
import {
  useSimulatedGithubCalendar,
  GITHUB_CALENDAR_WEEKS,
  GITHUB_DAYS_IN_WEEK,
} from "./coding-profiles/useSimulatedGithubCalendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useDarkMode from "@/hooks/useDarkMode";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import GithubProfileBlock from "./coding-profiles/GithubProfileBlock";
import LeetCodeProfileBlock from "./coding-profiles/LeetCodeProfileBlock";
import HackerRankBadgesBlock from "./coding-profiles/HackerRankBadgesBlock";

// PROPS: Pass usernames/badges from Admin Panel integration
type CodingProfilesSectionProps = {
  githubUsername?: string;
  leetCodeUsername?: string;
  hackerRankUsername?: string;
};

// Color constants
const LEETCODE_COLORS = {
  easy: "#00af9b",
  medium: "#ffb800",
  hard: "#ff2d55",
};

export function CodingProfilesSection({
  githubUsername: initialGithubUsername,
  leetCodeUsername: initialLeetCodeUsername,
  hackerRankUsername: initialHackerRankUsername,
}: CodingProfilesSectionProps) {
  const { theme } = useDarkMode();
  const isDark = theme === "dark";

  // Fetch profile data from Supabase
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['coding-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coding_profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.error("Error fetching coding profiles:", error);
        toast.error("Failed to load coding profiles");
        return null;
      }
      
      return data;
    }
  });

  // Fetch HackerRank badges from Supabase
  const { data: hackerRankBadges, isLoading: isHackerRankBadgesLoading } = useQuery({
    queryKey: ['hackerrank-badges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hackerrank_badges')
        .select('*')
        .order('level', { ascending: false });
      
      if (error) {
        console.error("Error fetching HackerRank badges:", error);
        toast.error("Failed to load HackerRank badges");
        return [];
      }
      
      return data.map(badge => ({
        name: badge.name,
        level: badge.level,
        stars: badge.stars,
        colorClass: badge.color_class
      }));
    }
  });

  // Use profile data or fallback to props
  const githubUsername = profileData?.github_display ? 
    profileData?.github_username : initialGithubUsername;
  
  const leetCodeUsername = profileData?.leetcode_display ? 
    profileData?.leetcode_username : initialLeetCodeUsername;
  
  const hackerRankUsername = profileData?.hackerrank_display ? 
    profileData?.hackerrank_username : initialHackerRankUsername;

  // --- LeetCode State & Fetch ---
  const [lcStats, setLcStats] = useState<any>(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [lcError, setLcError] = useState(false);

  // --- GitHub State & Fetch ---
  const [githubData, setGithubData] = useState<any>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(false);
  const [calendarData, setCalendarData] = useState<Array<Array<number>>>(
    Array(GITHUB_DAYS_IN_WEEK)
      .fill(0)
      .map(() => Array(GITHUB_CALENDAR_WEEKS).fill(0))
  );

  const [hackerRankLoading, setHackerRankLoading] = useState(true);
  const [hackerRankError, setHackerRankError] = useState(false);

  const generateSimulatedContributionData = useSimulatedGithubCalendar();

  // Fetch LeetCode Stats using the public API
  useEffect(() => {
    if (!leetCodeUsername) return;
    
    const fetchLeetCodeStats = async () => {
      setLcLoading(true);
      setLcError(false);

      try {
        const response = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch LeetCode data");
        }

        const data = await response.json();
        setLcStats(data);
      } catch (error) {
        console.error("LeetCode API Error:", error);
        setLcError(true);
      } finally {
        setLcLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, [leetCodeUsername]);

  // Fetch GitHub Stats using GitHub API
  useEffect(() => {
    if (!githubUsername) return;
    
    const fetchGitHubData = async () => {
      setGithubLoading(true);
      setGithubError(false);

      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${githubUsername}`
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch GitHub user data");
        }

        const userData = await userResponse.json();
        setGithubData(userData);

        // For contributions data, we'll use simulated data (no auth)
        setCalendarData(generateSimulatedContributionData());
      } catch (error) {
        console.error("GitHub API Error:", error);
        setGithubError(true);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGitHubData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubUsername]);

  // Update HackerRank loading state when badges are loaded
  useEffect(() => {
    if (!isHackerRankBadgesLoading && hackerRankBadges) {
      setHackerRankLoading(false);
    }
  }, [isHackerRankBadgesLoading, hackerRankBadges]);

  // Handle profile data loading error
  useEffect(() => {
    if (isProfileLoading) return;
    
    if (!profileData && !initialGithubUsername && !initialLeetCodeUsername && !initialHackerRankUsername) {
      console.warn("No coding profile data available");
    }
  }, [isProfileLoading, profileData, initialGithubUsername, initialLeetCodeUsername, initialHackerRankUsername]);

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
              githubLoading={githubLoading || isProfileLoading}
              githubError={githubError}
              calendarData={calendarData}
            />
          )}

          {/* LeetCode Profile Block */}
          {leetCodeUsername && (
            <LeetCodeProfileBlock
              leetCodeUsername={leetCodeUsername}
              lcStats={lcStats}
              lcLoading={lcLoading || isProfileLoading}
              lcError={lcError}
            />
          )}

          {/* HackerRank Profile Block */}
          {hackerRankUsername && hackerRankBadges && (
            <HackerRankBadgesBlock
              hackerRankUsername={hackerRankUsername}
              hackerRankBadges={hackerRankBadges}
              hackerRankLoading={hackerRankLoading || isHackerRankBadgesLoading || isProfileLoading}
              hackerRankError={hackerRankError}
            />
          )}
        </div>
      </div>
    </section>
  );
}

// Named and default export
export default CodingProfilesSection;
