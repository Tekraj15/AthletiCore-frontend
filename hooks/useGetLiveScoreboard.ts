import { getLiveScoreboardAPI } from "@/api/liveGameApi";
import { useQuery } from "@tanstack/react-query";

export const useGetLiveScoreboard = (eventId: string) => {
  return useQuery({
    queryKey: ["live-scoreboard", eventId],
    queryFn: () => getLiveScoreboardAPI(eventId),
    enabled: !!eventId,
  });
};
