/**
 * Returns the number of full calendar days between a past date string
 * (YYYY-MM-DD) and today (in local time).
 */
export function daysSince(dateString: string): number {
  const past = new Date(dateString + 'T00:00:00');
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const pastMidnight = new Date(past.getFullYear(), past.getMonth(), past.getDate());
  const diffMs = todayMidnight.getTime() - pastMidnight.getTime();
  return Math.max(0, Math.floor(diffMs / 86400000));
}
