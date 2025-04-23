
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Loader, PieChart as PieChartIcon } from "lucide-react";

type LeetCodeProfilePanelProps = {
  leetCodeUsername: string;
  lcStats: any;
  lcLoading: boolean;
  lcError: boolean;
};

const PIE_COLORS = ["#22d3ee", "#fde047", "#f87171"];

export default function LeetCodeProfilePanel({
  leetCodeUsername,
  lcStats,
  lcLoading,
  lcError,
}: LeetCodeProfilePanelProps) {
  // Pie chart data for LeetCode
  const pieData = lcStats
    ? [
        { name: "Easy", value: lcStats.easySolved },
        { name: "Medium", value: lcStats.mediumSolved },
        { name: "Hard", value: lcStats.hardSolved },
      ]
    : [];

  return (
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
            {lcStats.ranking && (
              <span className="font-medium">
                <span className="text-primary">Rank:</span> #
                {lcStats.ranking.toLocaleString()}
              </span>
            )}
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
  );
}
