// mockLiftData.ts

import { LiftType } from "./liveGameTypes";
import { Attempt } from "./liveGameTypes";
import { LeaderboardEntry } from "./liveGameTypes";
export const mockLiftData: Record<LiftType, Attempt[]> = {
  squat: [
    {
      round: 1,
      weight: 120,
      status: "submitted",
      result: "success",
      locked: true,
      changes: 0,
    },
    {
      round: 2,
      weight: 127.5,
      status: "submitted",
      result: "success",
      locked: true,
      changes: 0,
    },
    {
      round: 3,
      weight: 135,
      status: "pending",
      result: null,
      locked: false,
      changes: 2,
    },
  ],
  bench: [
    {
      round: 1,
      weight: 70,
      status: "pending",
      result: null,
      locked: false,
      changes: 2,
    },
    {
      round: 2,
      weight: 75,
      status: "available",
      result: null,
      locked: false,
      changes: 2,
    },
    {
      round: 3,
      weight: 80,
      status: "available",
      result: null,
      locked: false,
      changes: 2,
    },
  ],
  deadlift: [
    {
      round: 1,
      weight: 150,
      status: "available",
      result: null,
      locked: false,
      changes: 2,
    },
    {
      round: 2,
      weight: 160,
      status: "available",
      result: null,
      locked: false,
      changes: 2,
    },
    {
      round: 3,
      weight: 167.5,
      status: "available",
      result: null,
      locked: false,
      changes: 2,
    },
  ],
};

export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Maria Rodriguez",
    weightClass: "63kg",
    bodyWeight: "62.1kg",
    squat: { best: 140, attempts: ["140✓", "147.5✓", "152.5✗"] },
    bench: { best: 85, attempts: ["80✓", "85✓", "90✗"] },
    deadlift: { best: 170, attempts: ["165✓", "170✓", "175✗"] },
    total: 395,
    glPoints: 425.8,
    isRecord: true,
    recentChange: false,
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    weightClass: "63kg",
    bodyWeight: "62.4kg",
    squat: { best: 127.5, attempts: ["120✓", "127.5✓", "135○"] },
    bench: { best: 0, attempts: ["70○", "75○", "80○"] },
    deadlift: { best: 0, attempts: ["150○", "160○", "167.5○"] },
    total: 127.5,
    glPoints: 137.2,
    isRecord: false,
    recentChange: true,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Emma Thompson",
    weightClass: "63kg",
    bodyWeight: "61.8kg",
    squat: { best: 125, attempts: ["120✓", "125✓", "130✗"] },
    bench: { best: 77.5, attempts: ["72.5✓", "77.5✓", "82.5✗"] },
    deadlift: { best: 155, attempts: ["150✓", "155✓", "162.5✗"] },
    total: 357.5,
    glPoints: 385.7,
    isRecord: false,
    recentChange: false,
  },
];