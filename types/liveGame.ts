export interface ILiveScoreboard {
  firstName: string;
  lastName: string;
  team: string;
  birthYear: string;
  division: string;
  bodyWeight: number;
  weightClass: number;
  squat: (number | string)[];
  bestSquat: number;
  bench: (number | string)[];
  bestBench: number;
  deadlift: (number | string)[];
  bestDeadlift: number;
  total: number;
  ipfGLPts: number;
  ipfCoeff: number;
}
