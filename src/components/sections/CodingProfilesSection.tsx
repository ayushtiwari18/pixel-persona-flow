
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Github,
  PieChart as PieChartIcon,
  Badge as BadgeIcon,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// PROPS: Pass usernames/badges from Admin Panel integration
type CodingProfilesSectionProps = {
  githubUsername?: string;
  leetCodeUsername?: string;
  hackerRankUsername?: string;
};

// Simple colors for the pie chart
const PIE_COLORS = ["#22d3ee", "#fde047", "#f87171"];

// Default values
const DEFAULT_GITHUB_USERNAME = "ayushtiwari18";
const DEFAULT_LEETCODE_USERNAME = "_aayush03";
const DEFAULT_HACKERRANK_USERNAME = "ayushtiwari10201";

// GitHub contribution calendar constants
const GITHUB_CALENDAR_WEEKS = 12; // Last 12 weeks
const GITHUB_DAYS_IN_WEEK = 7;
const CONTRIBUTION_COLORS = [
  "bg-muted", // 0 contributions
  "bg-primary/20", // 1-3 contributions
  "bg-primary/40", // 4-6 contributions
  "bg-primary/60", // 7-9 contributions
  "bg-primary", // 10+ contributions
];

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

        // For contributions data, we'll use simulated data since accessing real
        // contribution data requires authentication
        setCalendarData(generateSimulatedContributionData());
      } catch (error) {
        console.error("GitHub API Error:", error);
        setGithubError(true);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGitHubData();
  }, [githubUsername]);

  // For demo purposes - generate simulated GitHub contribution data
  function generateSimulatedContributionData() {
    const weeks = GITHUB_CALENDAR_WEEKS;
    const days = GITHUB_DAYS_IN_WEEK;

    // Create an empty calendar
    const calendar = Array(days)
      .fill(0)
      .map(() => Array(weeks).fill(0));

    // Fill with simulated data
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        // Generate a random number of contributions (weighted toward fewer)
        const rand = Math.random();
        let count = 0;

        if (rand > 0.6) count = Math.floor(Math.random() * 3) + 1;
        if (rand > 0.8) count = Math.floor(Math.random() * 6) + 4;
        if (rand > 0.95) count = Math.floor(Math.random() * 15) + 10;

        calendar[d][w] = count;
      }
    }

    return calendar;
  }

  // Fetch HackerRank data
  useEffect(() => {
    // In a real application, you would fetch HackerRank data from their API
    // However, HackerRank doesn't provide a public API for badges
    // So we'll simulate fetching based on the provided username
    const fetchHackerRankData = async () => {
      setHackerRankLoading(true);
      setHackerRankError(false);

      try {
        // Simulate an API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // For ayushtiwari10201, set predefined badges
        // In a real app, you'd fetch these from HackerRank's API
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

  // Pie chart data for LeetCode
  const pieData = lcStats
    ? [
        { name: "Easy", value: lcStats.easySolved },
        { name: "Medium", value: lcStats.mediumSolved },
        { name: "Hard", value: lcStats.hardSolved },
      ]
    : [];

  // --- GitHub Contributions Calendar ---
  function renderGithubCalendar() {
    return (
      <div className="flex flex-col items-center">
        {githubLoading ? (
          <div className="grid grid-cols-12 gap-0.5 h-[85px] w-full max-w-[200px]">
            {Array.from({ length: 7 * 12 }).map((_, i) => (
              <Skeleton key={i} className="w-3 h-3 rounded-sm" />
            ))}
          </div>
        ) : githubError ? (
          <div className="h-20 flex items-center justify-center text-red-500">
            Failed to load GitHub data
          </div>
        ) : (
          <>
            <div className="flex gap-0.5">
              {[...Array(GITHUB_CALENDAR_WEEKS)].map((_, week) => (
                <div key={week} className="flex flex-col gap-0.5">
                  {[...Array(GITHUB_DAYS_IN_WEEK)].map((_, day) => {
                    // Get contribution count from our processed data
                    const count = calendarData[day][week] || 0;

                    // Determine color based on contribution count
                    let colorIndex = 0;
                    if (count >= 10) colorIndex = 4;
                    else if (count >= 7) colorIndex = 3;
                    else if (count >= 4) colorIndex = 2;
                    else if (count >= 1) colorIndex = 1;

                    const color = CONTRIBUTION_COLORS[colorIndex];

                    return (
                      <div
                        key={day}
                        className={cn(
                          "w-3 h-3 rounded-sm transition-colors",
                          color
                        )}
                        title={`${count} contributions`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}

        {githubData && (
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="font-medium">
                {githubData.public_repos} repositories
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="font-medium">
                {githubData.followers} followers
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                @{githubUsername}
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }

  // --- HackerRank Badges display ---
  function renderHackerRankBadges() {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {hackerRankLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-14 rounded-full" />
            ))}
          </div>
        ) : hackerRankError ? (
          <div className="h-20 flex items-center justify-center text-red-500">
            Failed to load HackerRank data
          </div>
        ) : (
          <>
            {hackerRankBadges.map((badge, i) => (
              <div
                key={i}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-1",
                  badge.colorClass || "bg-green-100 text-green-800"
                )}
              >
                {badge.name} – {badge.level}{" "}
                <span className="ml-1">
                  {"★".repeat(badge.stars)}
                  {"☆".repeat(5 - badge.stars)}
                </span>
              </div>
            ))}
            <div className="w-full mt-3 text-center">
              <a
                href={`https://www.hackerrank.com/profile/${hackerRankUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary underline hover:text-primary/80"
              >
                @{hackerRankUsername}
              </a>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <section id="coding-profiles" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <PieChartIcon className="inline" />
          Coding Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* GitHub Panel */}
          <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <Github className="w-5 h-5" /> GitHub Profile
            </h3>
            {renderGithubCalendar()}
          </div>
          
          {/* LeetCode Panel */}
          <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <PieChartIcon className="w-5 h-5" /> LeetCode Stats
            </h3>
            {lcLoading ? (
              <div className="h-40 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Loader className="w-6 h-6 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading stats...</p>
                </div>
              </div>
            ) : lcError ? (
              <div className="h-40 flex items-center justify-center w-full text-red-500">
                Failed to fetch stats.
              </div>
            ) : lcStats ? (
              <>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      innerRadius={30}
                      label
                    >
                      {pieData.map((entry, idx) => (
                        <Cell
                          key={entry.name}
                          fill={PIE_COLORS[idx % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  <span className="text-cyan-600 font-semibold">
                    Easy: {lcStats.easySolved}
                  </span>
                  <span className="text-yellow-600 font-semibold">
                    Medium: {lcStats.mediumSolved}
                  </span>
                  <span className="text-red-600 font-semibold">
                    Hard: {lcStats.hardSolved}
                  </span>
                </div>
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  <span className="font-medium">
                    <span className="text-primary">Total:</span>{" "}
                    {lcStats.totalSolved} / {lcStats.totalQuestions}
                  </span>
                  {lcStats.ranking && <span className="font-medium">
                    <span className="text-primary">Rank:</span> #
                    {lcStats.ranking.toLocaleString()}
                  </span>}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <a
                    href={`https://leetcode.com/${leetCodeUsername}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    @{leetCodeUsername}
                  </a>
                </p>
              </>
            ) : null}
          </div>
          
          {/* HackerRank Panel */}
          <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <BadgeIcon className="w-5 h-5" /> HackerRank Badges
            </h3>
            {renderHackerRankBadges()}
          </div>
        </div>
      </div>
    </section>
  );
}

// Modified default export to accept the same props as the named export
export default CodingProfilesSection;
