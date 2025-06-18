export type PerformanceItem = {
  id: number;
  eventName: string;
  date: string;
  liftType: string;
  attempts: number[];
  best: number;
  points: number;
};
export const performanceTable: PerformanceItem[] = [
  {
    id: 1,
    eventName: "Regional Championship",
    date: "2024-01-12",
    liftType: "Squat",
    attempts: [100, 110, 120],
    best: 120,
    points: 80,
  },
  {
    id: 2,
    eventName: "State Competition",
    date: "2024-02-15",
    liftType: "Bench Press",
    attempts: [90, 95, 100],
    best: 100,
    points: 70,
  },
  {
    id: 3,
    eventName: "National Qualifiers",
    date: "2024-03-22",
    liftType: "Deadlift",
    attempts: [120, 130, 125],
    best: 130,
    points: 85,
  },
];
