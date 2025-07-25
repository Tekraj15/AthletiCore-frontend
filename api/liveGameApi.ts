import { ILiveScoreboard } from "@/types/liveGame";
import { baseFetcher } from "./baseFetcher"; // assuming you already use this
import { GET_LIVE_SCOREBOARD_URL } from "@/constants/url/url";

export const getLiveScoreboardAPI = (eventId: string) => {
  const url = GET_LIVE_SCOREBOARD_URL.replace(":eventId", eventId);
  return baseFetcher<ILiveScoreboard[]>(url, {
    method: "GET",
  });
};
