
/**
 * Utility hook to generate simulated GitHub contributions grid.
 */
export const GITHUB_CALENDAR_WEEKS = 12;
export const GITHUB_DAYS_IN_WEEK = 7;

export function useSimulatedGithubCalendar() {
  function generate() {
    const weeks = GITHUB_CALENDAR_WEEKS;
    const days = GITHUB_DAYS_IN_WEEK;
    const calendar = Array(days)
      .fill(0)
      .map(() => Array(weeks).fill(0));
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
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
  return generate;
}
