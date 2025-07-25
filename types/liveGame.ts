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

export interface ILiveScoreboardResponse {
  count: number;

  scoreboard: ILiveScoreboard[];

  events: string[];

  groups: string[];

  competitionName: string;

  location: string;
}

export interface IPlayerMeasurement {
  id: string;
  playerName: string;
  initialData: {
    height: string;
    weight: number;
    rackHeight: number;
  };
  weighInData: {
    height: string;
    weight: number;
    rackHeight: number;
  };
}

export interface IPlayerBreakdown {
  id: string;
  name: string;
  data: {
    squat: LiftData;
    benchPress: LiftData;
    deadlift: LiftData;
    overallTotal: number;
  };
}

export interface LiftData {
  attempt1?: { weight: number; ipfgl: number };
  attempt2?: { weight: number; ipfgl: number };
  attempt3?: { weight: number; ipfgl: number };
  total: number;
}
