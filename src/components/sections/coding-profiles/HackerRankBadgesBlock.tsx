
import React from "react";
import HackerRankBadgesPanel from "./HackerRankBadgesPanel";

type HackerRankBadge = {
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};

type HackerRankBadgesBlockProps = {
  hackerRankUsername: string;
  hackerRankBadges: HackerRankBadge[];
  hackerRankLoading: boolean;
  hackerRankError: boolean;
};

export default function HackerRankBadgesBlock(props: HackerRankBadgesBlockProps) {
  return (
    <HackerRankBadgesPanel
      hackerRankUsername={props.hackerRankUsername}
      hackerRankBadges={props.hackerRankBadges}
      hackerRankLoading={props.hackerRankLoading}
      hackerRankError={props.hackerRankError}
    />
  );
}
