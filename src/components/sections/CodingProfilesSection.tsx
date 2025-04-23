import React, { useEffect, useState } from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import { useSimulatedGithubCalendar } from "./coding-profiles/useSimulatedGithubCalendar";
import GithubProfileBlock from "./coding-profiles/GithubProfileBlock";
import LeetCodeProfileBlock from "./coding-profiles/LeetCodeProfileBlock";
import HackerRankBadgesBlock from "./coding-profiles/HackerRankBadgesBlock";

// PROPS: Pass usernames/badges from Admin Panel integration
type CodingProfilesSectionProps = {
  githubUsername?: string;
  leetCodeUsername?: string;
  hackerRankUsername?: string;
};

// Default values
const DEFAULT_GITHUB_USERNAME = "ayushtiwari18";
const DEFAULT_LEETCODE_USERNAME = "_aayush03";
const DEFAULT_HACKERRANK_USERNAME = "ayushtiwari10201";

export function CodingProfilesSection({
  githubUsername = DEFAULT_GITHUB_USERNAME,
  leetCodeUsername = DEFAULT_LEETCODE_USERNAME,
  hackerRankUsername = DEFAULT_HACKERRANK_USERNAME,
}: CodingProfilesSectionProps) {
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

  // --- HackerRank State & Fetch ---
  const [hackerRankBadges, setHackerRankBadges] = useState([
    {
      name: "Problem Solving",
      level: 5,
      stars: 5,
      colorClass: "bg-green-100 text-green-800",
    },
    {
      name: "JavaScript",
      level: 4,
      stars: 4,
      colorClass: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Python",
      level: 3,
      stars: 3,
      colorClass: "bg-blue-100 text-blue-800",
    },
    {
      name: "SQL",
      level: 3,
      stars: 3,
      colorClass: "bg-purple-100 text-purple-800",
    },
  ]);
  const [hackerRankLoading, setHackerRankLoading] = useState(true);
  const [hackerRankError, setHackerRankError] = useState(false);

  const generateSimulatedContributionData = useSimulatedGithubCalendar();

  // Fetch LeetCode Stats using the public API
  useEffect(() => {
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

  // Fetch HackerRank data
  useEffect(() => {
    // In a real application, you would fetch HackerRank data from their API (not public)
    const fetchHackerRankData = async () => {
      setHackerRankLoading(true);
      setHackerRankError(false);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        // Set predefined badges for demo
        const userBadges = [
          {
            name: "Problem Solving",
            level: 5,
            stars: 5,
            colorClass: "bg-green-100 text-green-800",
          },
          {
            name: "JavaScript",
            level: 4,
            stars: 4,
            colorClass: "bg-yellow-100 text-yellow-800",
          },
          {
            name: "Python",
            level: 3,
            stars: 3,
            colorClass: "bg-blue-100 text-blue-800",
          },
          {
            name: "SQL",
            level: 3,
            stars: 3,
            colorClass: "bg-purple-100 text-purple-800",
          },
          {
            name: "30 Days of Code",
            level: 4,
            stars: 4,
            colorClass: "bg-pink-100 text-pink-800",
          },
        ];
        setHackerRankBadges(userBadges);
      } catch (error) {
        console.error("HackerRank Data Error:", error);
        setHackerRankError(true);
      } finally {
        setHackerRankLoading(false);
      }
    };

    fetchHackerRankData();
  }, [hackerRankUsername]);

  return (
    <section id="coding-profiles" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <PieChartIcon className="inline" />
          Coding Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GithubProfileBlock
            githubUsername={githubUsername}
            githubData={githubData}
            githubLoading={githubLoading}
            githubError={githubError}
            calendarData={calendarData}
          />
          <LeetCodeProfileBlock
            leetCodeUsername={leetCodeUsername}
            lcStats={lcStats}
            lcLoading={lcLoading}
            lcError={lcError}
          />
          <HackerRankBadgesBlock
            hackerRankUsername={hackerRankUsername}
            hackerRankBadges={hackerRankBadges}
            hackerRankLoading={hackerRankLoading}
            hackerRankError={hackerRankError}
          />
        </div>
      </div>
    </section>
  );
}

// Named and default export
export default CodingProfilesSection;
