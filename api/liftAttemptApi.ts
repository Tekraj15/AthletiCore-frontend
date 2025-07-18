import { IInitializeRequest, IInitializeResponse } from "@/types/liftAttempt";
import { baseFetcher } from "./baseFetcher";
import {
  INITIALIZE_ATTEMPTS,
  GET_LIFT_ATTEMPTS_URL,
} from "@/constants/url/url";
import { Attempt, LiftType } from "@/constants/Player/liveGameTypes";

export const initializeLiftAttemptsAPI = (data: IInitializeRequest) =>
  baseFetcher<IInitializeResponse>(INITIALIZE_ATTEMPTS, {
    method: "POST",
    data,
  });

// Response format: { squat: Attempt[], bench: Attempt[], deadlift: Attempt[] }
export const getLiftAttemptsAPI = (userId: string, eventId: string) => {
  return baseFetcher<Record<LiftType, Attempt[]>>(
    `${GET_LIFT_ATTEMPTS_URL}/${userId}/${eventId}`,
    {
      method: "GET",
    }
  );
};
