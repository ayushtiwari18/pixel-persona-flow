
export type CodingProfileData = {
  github: {
    username: string;
    displayStats: boolean;
  };
  leetcode: {
    username: string;
    displayStats: boolean;
  };
  hackerrank: {
    username: string;
    displayStats: boolean;
    badges: HackerRankBadge[];
  };
};

export type HackerRankBadge = {
  id: string;
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};
