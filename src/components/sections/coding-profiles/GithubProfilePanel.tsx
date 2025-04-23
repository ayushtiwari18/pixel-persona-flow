
import React from "react";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const CONTRIBUTION_COLORS = [
  "bg-muted",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/60",
  "bg-primary",
];

type GithubProfilePanelProps = {
  githubUsername: string;
  githubData: any;
  githubLoading: boolean;
  githubError: boolean;
  calendarData: Array<Array<number>>;
};

export const GITHUB_CALENDAR_WEEKS = 12;
export const GITHUB_DAYS_IN_WEEK = 7;

export default function GithubProfilePanel({
  githubUsername,
  githubData,
  githubLoading,
  githubError,
  calendarData,
}: GithubProfilePanelProps) {
  return (
    <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
        <Github className="w-5 h-5" /> GitHub Profile
      </h3>
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
          <div className="flex gap-0.5">
            {[...Array(GITHUB_CALENDAR_WEEKS)].map((_, week) => (
              <div key={week} className="flex flex-col gap-0.5">
                {[...Array(GITHUB_DAYS_IN_WEEK)].map((_, day) => {
                  const count = calendarData[day][week] || 0;
                  let colorIndex = 0;
                  if (count >= 10) colorIndex = 4;
                  else if (count >= 7) colorIndex = 3;
                  else if (count >= 4) colorIndex = 2;
                  else if (count >= 1) colorIndex = 1;
                  const color = CONTRIBUTION_COLORS[colorIndex];
                  return (
                    <div
                      key={day}
                      className={cn("w-3 h-3 rounded-sm transition-colors", color)}
                      title={`${count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
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
    </div>
  );
}
