export interface IInitializeRequest {
  userId: string;
  eventId: string;
}

import { Attempt } from "@/constants/Player/liveGameTypes"; // or wherever your type is

export interface IInitializeResponse {
  squat: Attempt[];
  bench: Attempt[];
  deadlift: Attempt[];
}
