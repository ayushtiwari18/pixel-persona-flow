
import React from "react";
import { Loader, Badge as BadgeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type HackerRankBadge = {
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};

type HackerRankBadgesPanelProps = {
  hackerRankUsername: string;
  hackerRankBadges: HackerRankBadge[];
  hackerRankLoading: boolean;
  hackerRankError: boolean;
};

export default function HackerRankBadgesPanel({
  hackerRankUsername,
  hackerRankBadges,
  hackerRankLoading,
  hackerRankError,
}: HackerRankBadgesPanelProps) {
  return (
    <div className="bg-background rounded-xl border shadow-sm px-6 py-6 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4 flex gap-2 items-center">
        <BadgeIcon className="w-5 h-5" /> HackerRank Badges
      </h3>
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
    </div>
  );
}
