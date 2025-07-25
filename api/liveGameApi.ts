import {
  ILiveScoreboardResponse,
  IPlayerBreakdown,
  IPlayerMeasurement,
} from "@/types/liveGame";
import { baseFetcher } from "./baseFetcher"; // assuming you already use this
import { GET_LIVE_SCOREBOARD_URL } from "@/constants/url/url";

export const getLiveScoreboardAPI = (eventId: string) => {
  const url = GET_LIVE_SCOREBOARD_URL.replace(":eventId", eventId);
  return baseFetcher<ILiveScoreboardResponse[]>(url, {
    method: "GET",
  });
};

export const getIndividualBreakdownAPI = (
  eventId: string
): Promise<IPlayerBreakdown[]> => {
  return baseFetcher<IPlayerBreakdown[]>(
    `/live-scoreboard/scoreboard/breakdown/${eventId}`
  );
};

export const getPlayerMeasurementsAPI = (
  eventId: string
): Promise<IPlayerMeasurement[]> => {
  return baseFetcher<IPlayerMeasurement[]>(
    `/live-scoreboard/scoreboard/measurements/${eventId}`
  );
};
