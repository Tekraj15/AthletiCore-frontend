// /helpers/leaderboardUtils.ts

import {
  AttemptStatus,
  AttemptResult,
  SortConfig,
  LeaderboardEntry,
} from "../constants/Player/liveGameTypes";

/**
 * Get color based on attempt status and result
 */
export const getStatusColor = (
  status: AttemptStatus,
  result: AttemptResult,
  colors: Record<string, string>
): string => {
  if (status === "submitted") {
    return result === "success" ? colors.success : colors.error;
  }
  if (status === "pending") {
    return colors.warning;
  }
  return colors.border;
};

/**
 * Get icon based on attempt status and result
 */
export const getStatusIcon = (
  status: AttemptStatus,
  result: AttemptResult
): string => {
  if (status === "submitted" && result === "success") return "✓";
  if (status === "submitted" && result === "failed") return "✗";
  if (status === "pending") return "⏰";
  return "";
};

/**
 * Sort leaderboard based on key and direction
 */
export const sortLeaderboard = (
  leaderboard: LeaderboardEntry[],
  sortConfig: SortConfig
): LeaderboardEntry[] => {
  return [...leaderboard].sort((a, b) => {
    if (sortConfig.key === "rank") return a.rank - b.rank;
    if (sortConfig.key === "name") return a.name.localeCompare(b.name);
    if (sortConfig.key === "total")
      return sortConfig.direction === "asc"
        ? a.total - b.total
        : b.total - a.total;
    if (sortConfig.key === "glPoints")
      return sortConfig.direction === "asc"
        ? a.glPoints - b.glPoints
        : b.glPoints - a.glPoints;
    return 0;
  });
};

/**
 * Toggle sort direction for a given key
 */
export const toggleSort = (current: SortConfig, key: string): SortConfig => {
  return {
    key,
    direction:
      current.key === key && current.direction === "asc" ? "desc" : "asc",
  };
};
