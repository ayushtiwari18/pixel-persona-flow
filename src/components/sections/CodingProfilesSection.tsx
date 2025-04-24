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

// Color constants
const GITHUB_COLORS = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const LEETCODE_COLORS = {
  easy: "#00af9b",
  medium: "#ffb800",
  hard: "#ff2d55",
};

export function CodingProfilesSection({
  githubUsername = DEFAULT_GITHUB_USERNAME,
  leetCodeUsername = DEFAULT_LEETCODE_USERNAME,
  hackerRankUsername = DEFAULT_HACKERRANK_USERNAME,
}: CodingProfilesSectionProps) {
  const { theme } = useDarkMode();
  const isDark = theme === "dark";

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
      colorClass: "bg-green-500 dark:bg-green-600",
      textColorClass: "text-white",
      icon: "🧩",
    },
    {
      name: "JavaScript",
      level: 4,
      stars: 4,
      colorClass: "bg-yellow-500 dark:bg-yellow-600",
      textColorClass: "text-white",
      icon: "🌐",
    },
    {
      name: "Python",
      level: 3,
      stars: 3,
      colorClass: "bg-blue-500 dark:bg-blue-600",
      textColorClass: "text-white",
      icon: "🐍",
    },
    {
      name: "SQL",
      level: 3,
      stars: 3,
      colorClass: "bg-purple-500 dark:bg-purple-600",
      textColorClass: "text-white",
      icon: "📊",
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
        // Set predefined badges for demo with improved styling
        const userBadges = [
          {
            name: "Problem Solving",
            level: 5,
            stars: 5,
            colorClass: "bg-green-500 dark:bg-green-600",
            textColorClass: "text-white",
            icon: "🧩",
          },
          {
            name: "JavaScript",
            level: 4,
            stars: 4,
            colorClass: "bg-yellow-500 dark:bg-yellow-600",
            textColorClass: "text-white",
            icon: "🌐",
          },
          {
            name: "Python",
            level: 3,
            stars: 3,
            colorClass: "bg-blue-500 dark:bg-blue-600",
            textColorClass: "text-white",
            icon: "🐍",
          },
          {
            name: "SQL",
            level: 3,
            stars: 3,
            colorClass: "bg-purple-500 dark:bg-purple-600",
            textColorClass: "text-white",
            icon: "📊",
          },
          {
            name: "30 Days of Code",
            level: 4,
            stars: 4,
            colorClass: "bg-pink-500 dark:bg-pink-600",
            textColorClass: "text-white",
            icon: "📅",
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

  // Generate LeetCode chart data
  const getLeetCodeChartData = () => {
    if (!lcStats) return [];

    return [
      {
        name: "Easy",
        solved: lcStats.easySolved,
        total: lcStats.totalEasy,
        color: LEETCODE_COLORS.easy,
      },
      {
        name: "Medium",
        solved: lcStats.mediumSolved,
        total: lcStats.totalMedium,
        color: LEETCODE_COLORS.medium,
      },
      {
        name: "Hard",
        solved: lcStats.hardSolved,
        total: lcStats.totalHard,
        color: LEETCODE_COLORS.hard,
      },
    ];
  };

  // Generate LeetCode pie chart data
  const getLeetCodePieData = () => {
    if (!lcStats) return [];

    return [
      { name: "Easy", value: lcStats.easySolved, color: LEETCODE_COLORS.easy },
      {
        name: "Medium",
        value: lcStats.mediumSolved,
        color: LEETCODE_COLORS.medium,
      },
      { name: "Hard", value: lcStats.hardSolved, color: LEETCODE_COLORS.hard },
    ];
  };

  // Get GitHub contribution colors based on current theme
  const getGitHubColors = () => {
    return isDark ? GITHUB_COLORS.dark : GITHUB_COLORS.light;
  };

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
          <div
            className={`rounded-lg shadow-lg overflow-hidden border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Github
                  size={24}
                  className={isDark ? "text-gray-300" : "text-gray-700"}
                />
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  GitHub
                </h3>
              </div>

              {githubLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div
                    className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                      isDark ? "border-gray-300" : "border-gray-800"
                    }`}
                  ></div>
                </div>
              ) : githubError ? (
                <div
                  className={
                    isDark
                      ? "bg-red-900 p-4 rounded-md"
                      : "bg-red-50 p-4 rounded-md"
                  }
                >
                  <p className="text-red-500">Failed to load GitHub data</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={githubData?.avatar_url || "/api/placeholder/80/80"}
                      alt="GitHub Avatar"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <a
                        href={`https://github.com/${githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {githubData?.name || githubUsername}
                      </a>
                      <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                        @{githubUsername}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                      className={
                        isDark
                          ? "bg-gray-700 rounded-md p-3"
                          : "bg-gray-50 rounded-md p-3"
                      }
                    >
                      <p
                        className={
                          isDark
                            ? "text-gray-400 text-sm"
                            : "text-gray-500 text-sm"
                        }
                      >
                        Repositories
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {githubData?.public_repos || 0}
                      </p>
                    </div>
                    <div
                      className={
                        isDark
                          ? "bg-gray-700 rounded-md p-3"
                          : "bg-gray-50 rounded-md p-3"
                      }
                    >
                      <p
                        className={
                          isDark
                            ? "text-gray-400 text-sm"
                            : "text-gray-500 text-sm"
                        }
                      >
                        Followers
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {githubData?.followers || 0}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4
                      className={`text-sm font-medium mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Contribution Activity
                    </h4>
                    <div className="flex flex-col gap-1">
                      {calendarData.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex gap-1">
                          {week.map((day, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className="w-3 h-3 rounded-sm"
                              style={{
                                backgroundColor: getGitHubColors()[day],
                              }}
                              title={`${day} contributions`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* LeetCode Profile Block */}
          <div
            className={`rounded-lg shadow-lg overflow-hidden border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Code2
                  size={24}
                  className={isDark ? "text-gray-300" : "text-gray-700"}
                />
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  LeetCode
                </h3>
              </div>

              {lcLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div
                    className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                      isDark ? "border-gray-300" : "border-gray-800"
                    }`}
                  ></div>
                </div>
              ) : lcError ? (
                <div
                  className={
                    isDark
                      ? "bg-red-900 p-4 rounded-md"
                      : "bg-red-50 p-4 rounded-md"
                  }
                >
                  <p className="text-red-500">Failed to load LeetCode data</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <a
                      href={`https://leetcode.com/${leetCodeUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {leetCodeUsername}
                    </a>
                    <div
                      className={`mt-3 p-4 rounded-md ${
                        isDark ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <p
                          className={
                            isDark
                              ? "text-sm text-gray-400"
                              : "text-sm text-gray-600"
                          }
                        >
                          Rank
                        </p>
                        <p
                          className={
                            isDark
                              ? "font-semibold text-gray-200"
                              : "font-semibold"
                          }
                        >
                          {lcStats?.ranking || "N/A"}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p
                          className={
                            isDark
                              ? "text-sm text-gray-400"
                              : "text-sm text-gray-600"
                          }
                        >
                          Total Solved
                        </p>
                        <p
                          className={
                            isDark
                              ? "font-semibold text-gray-200"
                              : "font-semibold"
                          }
                        >
                          {lcStats?.totalSolved || 0} /{" "}
                          {lcStats?.totalQuestions || 0}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p
                          className={
                            isDark
                              ? "text-sm text-gray-400"
                              : "text-sm text-gray-600"
                          }
                        >
                          Acceptance Rate
                        </p>
                        <p
                          className={
                            isDark
                              ? "font-semibold text-gray-200"
                              : "font-semibold"
                          }
                        >
                          {lcStats?.acceptanceRate || "0%"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4
                      className={`text-sm font-medium mb-3 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Problem Solving Progress
                    </h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getLeetCodePieData()}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {getLeetCodePieData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, name) => [
                              `${value} solved`,
                              name,
                            ]}
                            contentStyle={
                              isDark
                                ? {
                                    backgroundColor: "#374151",
                                    borderColor: "#4B5563",
                                    color: "#E5E7EB",
                                  }
                                : undefined
                            }
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="p-2 rounded-md"
                      style={{
                        backgroundColor:
                          LEETCODE_COLORS.easy + (isDark ? "30" : "20"),
                        borderLeft: `4px solid ${LEETCODE_COLORS.easy}`,
                      }}
                    >
                      <p
                        className={
                          isDark
                            ? "text-xs text-gray-400"
                            : "text-xs text-gray-600"
                        }
                      >
                        Easy
                      </p>
                      <p
                        className={
                          isDark
                            ? "font-semibold text-gray-200"
                            : "font-semibold"
                        }
                      >
                        {lcStats?.easySolved || 0} / {lcStats?.totalEasy || 0}
                      </p>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{
                        backgroundColor:
                          LEETCODE_COLORS.medium + (isDark ? "30" : "20"),
                        borderLeft: `4px solid ${LEETCODE_COLORS.medium}`,
                      }}
                    >
                      <p
                        className={
                          isDark
                            ? "text-xs text-gray-400"
                            : "text-xs text-gray-600"
                        }
                      >
                        Medium
                      </p>
                      <p
                        className={
                          isDark
                            ? "font-semibold text-gray-200"
                            : "font-semibold"
                        }
                      >
                        {lcStats?.mediumSolved || 0} /{" "}
                        {lcStats?.totalMedium || 0}
                      </p>
                    </div>
                    <div
                      className="p-2 rounded-md"
                      style={{
                        backgroundColor:
                          LEETCODE_COLORS.hard + (isDark ? "30" : "20"),
                        borderLeft: `4px solid ${LEETCODE_COLORS.hard}`,
                      }}
                    >
                      <p
                        className={
                          isDark
                            ? "text-xs text-gray-400"
                            : "text-xs text-gray-600"
                        }
                      >
                        Hard
                      </p>
                      <p
                        className={
                          isDark
                            ? "font-semibold text-gray-200"
                            : "font-semibold"
                        }
                      >
                        {lcStats?.hardSolved || 0} / {lcStats?.totalHard || 0}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* HackerRank Profile Block */}
          <div
            className={`rounded-lg shadow-lg overflow-hidden border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Award
                  size={24}
                  className={isDark ? "text-gray-300" : "text-gray-700"}
                />
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  HackerRank
                </h3>
              </div>

              {hackerRankLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div
                    className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                      isDark ? "border-gray-300" : "border-gray-800"
                    }`}
                  ></div>
                </div>
              ) : hackerRankError ? (
                <div
                  className={
                    isDark
                      ? "bg-red-900 p-4 rounded-md"
                      : "bg-red-50 p-4 rounded-md"
                  }
                >
                  <p className="text-red-500">Failed to load HackerRank data</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <a
                      href={`https://www.hackerrank.com/${hackerRankUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {hackerRankUsername}
                    </a>
                  </div>

                  <h4
                    className={`text-sm font-medium mb-3 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Skill Badges
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {hackerRankBadges.map((badge, index) => (
                      <div
                        key={index}
                        className={`${badge.colorClass} rounded-lg p-4 flex items-center justify-between shadow-sm`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{badge.icon}</span>
                          <div>
                            <h5
                              className={`font-medium ${badge.textColorClass}`}
                            >
                              {badge.name}
                            </h5>
                            <div className="flex mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${
                                    i < badge.stars
                                      ? "text-yellow-300"
                                      : "text-gray-400 dark:text-gray-600"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-xl font-bold ${badge.textColorClass}`}
                        >
                          {badge.level}/5
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Named and default export
export default CodingProfilesSection;
