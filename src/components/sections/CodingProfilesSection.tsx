
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Github, PieChart as PieChartIcon, Badge as BadgeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// PROPS: Pass usernames/badges from Admin Panel integration
type CodingProfilesSectionProps = {
  githubUsername: string;
  leetCodeUsername: string;
  hackerRankBadges: Array<{ name: string; level: number; stars: number; colorClass?: string; }>;
};

// Simple colors for the pie chart
const PIE_COLORS = ["#22d3ee", "#fde047", "#f87171"];

// Helper: fallback badges if not provided
const FALLBACK_HACKERRANK_BADGES = [
  { name: "Problem Solving", level: 6, stars: 5, colorClass: "bg-green-100 text-green-800" },
  { name: "JavaScript", level: 5, stars: 5, colorClass: "bg-yellow-100 text-yellow-800" },
  { name: "Python", level: 4, stars: 4, colorClass: "bg-blue-100 text-blue-800" },
  { name: "SQL", level: 3, stars: 3, colorClass: "bg-purple-100 text-purple-800" },
];

export function CodingProfilesSection({
  githubUsername,
  leetCodeUsername,
  hackerRankBadges = FALLBACK_HACKERRANK_BADGES,
}: CodingProfilesSectionProps) {
  // --- LeetCode State & Fetch ---
  const [lcStats, setLcStats] = useState<any>(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [lcError, setLcError] = useState(false);

  useEffect(() => {
    setLcLoading(true); setLcError(false);
    fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => { setLcStats(data); setLcLoading(false); })
      .catch(() => { setLcError(true); setLcLoading(false); });
  }, [leetCodeUsername]);

  // Pie chart data
  const pieData = lcStats
    ? [
        { name: "Easy", value: lcStats.easySolved },
        { name: "Medium", value: lcStats.mediumSolved },
        { name: "Hard", value: lcStats.hardSolved },
      ]
    : [];

  // --- GitHub Contributions Simple Calendar ---
  // For demonstration: random fake data for 5 rows x 12 weeks (like GitHub calendar, for now)
  function renderGithubCalendar() {
    // In real scenario, use a react-github-calendar or real data source
    const weeks = 12, days = 7;
    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-0.5">
          {[...Array(weeks)].map((_, week) => (
            <div key={week} className="flex flex-col gap-0.5">
              {[...Array(days)].map((_, day) => {
                const count = Math.floor(Math.random() * 5);
                const color =
                  count === 0
                    ? "bg-muted"
                    : count === 1
                    ? "bg-primary/20"
                    : count === 2
                    ? "bg-primary/40"
                    : count === 3
                    ? "bg-primary/60"
                    : "bg-primary";
                return (
                  <div
                    key={day}
                    className={cn("w-3 h-3 rounded-sm transition-colors", color)}
                    title={`${count} commits`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          (Sample visualization)<br />
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
    );
  }

  // --- HackerRank Badges display ---
  function renderHackerRankBadges() {
    return (
      <div className="flex flex-wrap gap-2">
        {hackerRankBadges.map((badge, i) => (
          <div
            key={i}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1",
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
      </div>
    );
  }

  return (
    <section id="coding-profiles" className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <PieChartIcon className="inline" />
          Coding Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* GitHub Panel */}
          <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center"><Github className="w-5 h-5"/> GitHub Contributions</h3>
            {renderGithubCalendar()}
          </div>
          {/* LeetCode Panel */}
          <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <PieChartIcon className="w-5 h-5"/> LeetCode Stats
            </h3>
            {lcLoading ? (
              <div className="h-40 flex items-center justify-center w-full text-muted-foreground">Loading...</div>
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
                      cx="50%" cy="50%" outerRadius={50}
                      innerRadius={30}
                      label
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={entry.name} fill={PIE_COLORS[idx]}/>
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  <span className="text-cyan-600 font-semibold">Easy: {lcStats.easySolved}</span>
                  <span className="text-yellow-600 font-semibold">Medium: {lcStats.mediumSolved}</span>
                  <span className="text-red-600 font-semibold">Hard: {lcStats.hardSolved}</span>
                </div>
                <div className="flex justify-center gap-4 mt-2 text-sm">
                  <span className="font-medium">
                    <span className="text-primary">Total:</span> {lcStats.totalSolved}
                  </span>
                  <span className="font-medium">
                    <span className="text-primary">Rank:</span> #{lcStats.ranking}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <a href={`https://leetcode.com/${leetCodeUsername}/`} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                    @{leetCodeUsername}
                  </a>
                </p>
              </>
            ) : null}
          </div>
          {/* HackerRank Panel */}
          <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
              <BadgeIcon className="w-5 h-5"/> HackerRank Badges
            </h3>
            {renderHackerRankBadges()}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default export with fallback data for easy inclusion
export default function CodingProfilesSectionDemo() {
  return (
    <CodingProfilesSection
      githubUsername="janedeveloper"
      leetCodeUsername="janedeveloper"
      hackerRankBadges={FALLBACK_HACKERRANK_BADGES}
    />
  );
}
