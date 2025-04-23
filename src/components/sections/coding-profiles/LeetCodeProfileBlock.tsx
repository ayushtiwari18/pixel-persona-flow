
import React from "react";
import LeetCodeProfilePanel from "./LeetCodeProfilePanel";

type LeetCodeProfileBlockProps = {
  leetCodeUsername: string;
  lcStats: any;
  lcLoading: boolean;
  lcError: boolean;
};

export default function LeetCodeProfileBlock(props: LeetCodeProfileBlockProps) {
  return (
    <LeetCodeProfilePanel
      leetCodeUsername={props.leetCodeUsername}
      lcStats={props.lcStats}
      lcLoading={props.lcLoading}
      lcError={props.lcError}
    />
  );
}

