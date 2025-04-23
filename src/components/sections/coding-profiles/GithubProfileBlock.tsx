
import React from "react";
import GithubProfilePanel, {
  GITHUB_CALENDAR_WEEKS,
  GITHUB_DAYS_IN_WEEK,
} from "./GithubProfilePanel";

type GithubProfileBlockProps = {
  githubUsername: string;
  githubData: any;
  githubLoading: boolean;
  githubError: boolean;
  calendarData: Array<Array<number>>;
};

export default function GithubProfileBlock(props: GithubProfileBlockProps) {
  return (
    <GithubProfilePanel
      githubUsername={props.githubUsername}
      githubData={props.githubData}
      githubLoading={props.githubLoading}
      githubError={props.githubError}
      calendarData={props.calendarData}
    />
  );
}
