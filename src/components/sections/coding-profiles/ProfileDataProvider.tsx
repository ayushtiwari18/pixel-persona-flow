
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { GITHUB_CALENDAR_WEEKS, GITHUB_DAYS_IN_WEEK, useSimulatedGithubCalendar } from "./useSimulatedGithubCalendar";

type ProfileDataProviderProps = {
  githubUsername?: string;
  leetCodeUsername?: string;
  hackerRankUsername?: string;
  children: (data: {
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
  }) => React.ReactNode;
};

export default function ProfileDataProvider({
  githubUsername: initialGithubUsername,
  leetCodeUsername: initialLeetCodeUsername,
  hackerRankUsername: initialHackerRankUsername,
  children
}: ProfileDataProviderProps) {
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
    <>
      {children({
        githubUsername,
        githubData,
        githubLoading: githubLoading || isProfileLoading,
        githubError,
        calendarData,
        
        leetCodeUsername,
        lcStats,
        lcLoading: lcLoading || isProfileLoading,
        lcError,
        
        hackerRankUsername,
        hackerRankBadges: hackerRankBadges || [],
        hackerRankLoading: hackerRankLoading || isHackerRankBadgesLoading || isProfileLoading,
        hackerRankError: hackerRankError
      })}
    </>
  );
}
